
/**
 * @param {es.Client} esClient
 * @constructor
 */
export class SolutionRepository {

  constructor(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'solutions';
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
   * @param {Solution} solution
   * @returns {Promise}
   */
  store(solution) {
    // todo: store to mysql

    this.es.index({
      index: this.index,
      type: this.type,
      id: solution.uuid,
      body: solution
    });

    console.log('solution', solution);
    var terms = {};
    var match = {};
    var query = {
      filtered: {query: {match: match},
      filter: {terms: terms}}
    };

    if (solution.code) { terms.code = solution.code; }
    if (solution.level) { terms.level = solution.level; }
    if (solution.message) { match.message = solution.message; }
    if (solution.os) { terms.os = solution.os }
    if (solution.os_version) { terms.os_version = solution.os_version }
    if (solution.programminglanguage) { terms.programminglanguage = solution.programminglanguage }
    if (solution.programminglanguage_version) { terms.programminglanguage_version = solution.programminglanguage_version }

    return this.es.index({
      index: this.index,
      type: '.percolator',
      id: solution.uuid,
      body: query
    });
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
