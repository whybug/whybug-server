
/**
 * @param {es.Client} esClient
 * @constructor
 */
class SolutionRepository {

  constructor(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'solution';
  }


  /**
   * Stores a ErrorLog.
   *
   * @param {ErrorLog} solution
   */
  async store(solution) {
    // todo: validate solution
    return this.es.index({
      index: this.index,
      type: this.type,
      id: solution.uuid,
      body: solution
    });
  }


  /**
   * Finds suitable solutions for an Error.
   *
   * @param {Error} error
   */
  async findByError(error) {
    return this.es.search({
      index: this.index,
      type: this.type,
      body: {
        query: {
          bool: {
            must: {
              term: {
                language: errorLog.data.language,
                errorLevel: errorLog.data.errorLevel
              },
              match: {
                errorMessage: errorLog.data.errorMessage
              }
            },
            should: {
              term: {
                languageVersion: errorLog.data.languageVersion,
                framework: errorLog.data.framework
              }
            }
          }
        }
      }
    });
  }

  create(solution) {
  }

}