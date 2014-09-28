import {Solution} from './Solution';

/**
 * @param {es.Client} esClient
 * @constructor
 */
export class SolutionRepository {

  constructor(es, bookshelf) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'solutions';
    this.model = bookshelf.model('Solution', Solution.bookshelf());
  }

  /**
   * Finds suitable solutions for an Error.
   *
   * Solutions are registered as 'searches' in the elastic search percolate api.
   * We match the current error against those searches.
   *
   * @param {Error} error
   * @return Promise
   */
  async findByError(error) {
    var result = await this.es.percolate({
      index: this.index,
      type: this.type,
      body: {
        doc: error
      }
    });

    return result.matches.map((match) => {
      // todo: Find matched solutions in mysql.
      return new Solution({});
    });
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
    await Promise.all([
      this.storeMysql(solution),
      this.storeEs(solution),
      this.storePercolator(solution)
    ]);

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
}

//return this.es.search({
//  index: this.index,
//  type: this.type,
//  body: {
//    query: {
//      bool: {
//        must: {
//          term: {
//            language: errorLog.data.language,
//            errorLevel: errorLog.data.errorLevel
//          },
//          match: {
//            errorMessage: errorLog.data.errorMessage
//          }
//        },
//        should: {
//          term: {
//            languageVersion: errorLog.data.languageVersion,
//            framework: errorLog.data.framework
//          }
//        }
//      }
//    }
//  }
//});
