import {ErrorLog} from './ErrorLog';

/**
 * @param {es.Client} es
 * @constructor
 */
export class ErrorRepository
{
  constructor(es, bookshelf) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'error_log';
    this.model = bookshelf.model('ErrorLog', ErrorLog.bookshelf());
  }

  findByQuery(query = '*') {
    return this.search(
      ErrorLog,
      {
        size: 10,
        sort: {created: 'desc'},
        query: {
          filtered: {
            query: {
              match: {
                errorMessage: {
                  query: query,
                  operator: 'and',
                  minimum_should_match: '70%',
                  zero_terms_query: 'all'
                }
              }
            },
            filter: {
              exists: { field: 'created' }
            }
          }
        }
      }
    );
  }

  search(entity, request) {
    return new Promise((resolve, reject) => {
      this.es.search({
        index: this.index,
        type: this.type,
        body: request
      }).then((result) => {
        resolve(result.hits.hits.map((hit) => {
          return new entity(hit._id, hit._source);
        }));
      }).catch((err) => {
        console.log('fail', err);
        reject(err)
      });
    });
  }

  /**
   * Stores a ErrorLog.
   *
   * @param {ErrorLog} errorLog
   */
  store(errorLog) {
    this.es.index({
      index: this.index,
      type: this.type,
      id: errorLog.uuid,
      body: errorLog
    }, function (error) {

    });

    // Store in Mysql.
    new (this.model)(errorLog).save();
  }

}


