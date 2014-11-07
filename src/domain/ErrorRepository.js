import {Error} from './Error';
import {SolutionRepository} from './SolutionRepository';

export class ErrorRepository {

  constructor(es, bookshelf) {
    this.es = es;
    this.model = bookshelf.model('Error', Error.bookshelf());
  }

  /**
   * Returns the Error for specified uuid or null if not found.
   *
   * @return {Error} Error matching UUID, or null if not found.
   */
  async findByUuid(uuid) {
    var error = await new (this.model)({uuid: uuid}).fetch();

    return error ? new Error(error.attributes) : null;
  }

  /**
   * Returns a list of unsolved errors.
   *
   * @return {Error[]} List of unsolved errors.
   */
  async findUnsolvedErrors() {
    var errors = await this.model.query().groupBy('checksum').havingRaw('SUM(hidden) = 0').select();
    let query = {
      "percolate" : {
        "index" : SolutionRepository.INDEX,
        "type" : SolutionRepository.TYPE
      }
    };

    // http://www.elasticsearch.org/guide/en/elasticsearch/reference/1.x/search-percolate.html
    var result = await this.es.mpercolate({
      index : SolutionRepository.INDEX,
      type : SolutionRepository.TYPE,
      body: errors.map((error) => {
        // Construct line based format for the mpercolate api.
        // 1. line is the query
        // 2. line is the doc
        return JSON.stringify(query) + "\n"
             + JSON.stringify(error);
      })
    });

    return errors.filter((error, index) => {
      if (result.responses[index].total === 0) {
        return new Error(error);
      }
      return false;
    });
  }

  /**
   * Stores an error.
   *
   * @param {Error} error
   */
  store(error) {
    return new (this.model)(error).save({}, {method: 'insert'});
  }
}
