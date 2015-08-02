var Joi = require('joi');

import {Solution} from './Solution';

/**
 * @param {es.Client} esClient
 * @constructor
 */
export class SolutionRepository {

  static get INDEX() { return 'solutions'; }
  static get TYPE() { return 'solution'; }

  constructor(es, knex) {
    this.es = es;
    this.index = SolutionRepository.INDEX;
    this.type = SolutionRepository.TYPE;
    this.knex = knex;
  }

  table() {
    return this.knex('solutions');
  }

  /**
   * Finds suitable solutions for an Error.
   *
   * Solutions are registered as 'searches' in the elastic search percolate api.
   * We match the current error against those searches.
   *
   * @param {Error} error
   * @return [Solution]
   */
  async findByError(error) {
    var result = await this.es.percolate({
      index: this.index,
      type: this.type,
      body: {
        doc: error
      }
    });

    var solutions = this.table().where({
      uuid: result.matches.map((match) => match._id)
    });

    return solutions.map((solution) => new Solution(solution));
  }

  /**
   * Returns the Solution for specified uuid or null if not found.
   *
   * @return {Solution} Error matching UUID, or null if not found.
   */
  async findByUuid(uuid) {
    var solution = await this.table()
      .where({uuid: uuid})
      .first()
      .then().catch(e => { throw e });

    return solution ? new Solution(solution) : null;
  }

  /**
   * Search solutions
   *
   * @param string query
   * @return {Promise}
   */
  async search(query = '*') {
    var result = await this.es.search({
      index: this.index,
      type: this.type,
      body: {
        size: 10,
        sort: {created_at: 'desc'},
        query: {
          filtered: {
            query: {
              match: {
                message: {
                  query: query,
                  operator: 'and',
                  minimum_should_match: '10%',
                  zero_terms_query: 'all'
                }
              }
            },
            filter: {
              exists: { field: 'created_at' }
            }
          }
        },
        aggregations: {
          programminglanguage: {terms: {field: "programminglanguage"}},
          level: {terms: {field: "level"}},
          os: {terms: {field: "os"}}
        }
      }
    });

    return {
      total: result.hits.total,
      solutions: result.hits.hits.map(solution => new Solution(solution._source)),
      aggregations: result.aggregations
    };
  }

  /**
   * @param {Solution} solution
   *
   * @returns {Promise}
   */
  async store(solution) {
    Joi.assert(solution, Joi.object().type(Solution));

    try {
      await this.storeMysql(solution);

      await Promise.all([
        this.storeEs(solution),
        this.storePercolator(solution)
      ]);

      return solution;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param solution
   * @returns {Promise}
   */
  storeMysql(solution) {
    Joi.assert(solution, Joi.object().type(Solution));

    return this.table().insert(solution).then().catch(e => { throw e });
  }

  /**
   *
   * @param solution
   * @returns {Promise}
   */
  storeEs(solution) {
    Joi.assert(solution, Joi.object().type(Solution));

    return this.es.index({
      index: this.index,
      type: this.type,
      id: solution.uuid,
      body: solution
    });
  }

  /**
   *
   * @param solution
   * @returns {Promise}
   */
  storePercolator(solution) {
    Joi.assert(solution, Joi.object().type(Solution));

    return this.es.index({
      index: this.index,
      type: '.percolator',
      id: solution.uuid,
      body: this.getQueryForSolution(solution)
    });
  }

  getQueryForSolution(solution) {
    Joi.assert(solution, Joi.object().type(Solution));

    var terms = {};
    var match = {};

    if (solution.code) { terms.code = solution.code; }
    if (solution.level) { terms.level = solution.level; }
    if (solution.message) { match.message = solution.message; }
    if (solution.os) { terms.os = solution.os }
    if (solution.os_version) { terms.os_version = solution.os_version }
    if (solution.programminglanguage) { terms.programminglanguage = solution.programminglanguage }
    if (solution.programminglanguage_version) { terms.programminglanguage_version = solution.programminglanguage_version }

    return {
      query: {
        filtered: {
          query: {match: match},
          filter: {term: terms}
        }
      }
    };
  }

  async reindex() {
    try {
      var exists = await this.es.indices.exists({index: this.index});
      if (exists) {
        await this.es.indices.delete({index: this.index, force: true});
      }
      await this.es.indices.create({index: this.index});
      await this.es.indices.putMapping({
        index: this.index,
        type: this.type,
        body: require('../../config/elasticsearch/'  + this.index + '.js')
      });

      var entries = await this.table().select().then();

      await Promise.all(
        entries
          .map(entry => new Solution(entry))
          .map(solution => Promise.all([
            this.storeEs(solution),
            this.storePercolator(solution)
          ]))
      );

    } catch(e) {
      console.log('error while reindexing: ', e);
      throw e;
    }
  }
}
