import {Solution} from './Solution';

/**
 * @param {es.Client} esClient
 * @constructor
 */
export class SolutionRepository {

  static get INDEX() { return 'solutions'; }
  static get TYPE() { return 'solution'; }

  constructor(es, bookshelf) {
    this.es = es;
    this.index = SolutionRepository.INDEX;
    this.type = SolutionRepository.TYPE;
    this.model = bookshelf.model('Solution', Solution.bookshelf());
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

    var solutions = await new (this.model)({
      uuid: result.matches.map((match) => match._id)
    }).fetchAll();

    return solutions.map((solution) => new Solution(solution.attributes));
  }

  /**
   * Returns the Error for specified uuid or null if not found.
   *
   * @return {Error} Error matching UUID, or null if not found.
   */
  async findByUuid(uuid) {
    var solution = await new (this.model)({uuid: uuid}).fetch();

    return solution ? new Solution(solution.attributes) : null;
  }
  /**
   * Suggests error messages that could match
   * the given message.
   *
   * @param message
   *
   * @return {Promise}
   */
  suggestErrorMessages(message) {

  }

  /**
   * Search solutions
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
      solutions: result.hits.hits.map((solution) => new Solution(solution._source)),
      aggregations: result.aggregations
    };
  }

  /**
   * @param {Solution} solution
   * @returns {Promise}
   */
  async store(solution) {
    try {
      await this.storeMysql(solution);

      await Promise.all([
        this.storeEs(solution),
        this.storePercolator(solution)
      ]);
    } catch (e) {
      throw e;
    }

    return solution;
  }

  storeMysql(solution) {
    return new (this.model)(solution).save({}, {method: 'insert'});
  }

  storeEs(solution) {
    return this.es.index({
      index: this.index,
      type: this.type,
      id: solution.uuid,
      body: solution
    });
  }

  storePercolator(solution) {
    return this.es.index({
      index: this.index,
      type: '.percolator',
      id: solution.uuid,
      body: this.getQueryForSolution(solution)
    });
  }

  getQueryForSolution(solution) {
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

      var entries = await new (this.model)().fetchAll();
      await Promise.all(entries.map(entry => Promise.all([
        this.storeEs(entry.attributes),
        this.storePercolator(entry.attributes)
      ])));

    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}

