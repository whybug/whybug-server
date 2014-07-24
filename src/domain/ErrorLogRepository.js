var ejs = require('elastic.js/dist/elastic.js');

import {ErrorLog} from './ErrorLog';

/**
 * @param {es.Client} esClient
 * @constructor
 */
export class ErrorLogRepository
{
  constructor(es) {
    this.es = es;
    this.index = 'wtf';
    this.type = 'error_log';
  }

  getLatest() {
    return this.search(ErrorLog, ejs.Request()
        .sort(ejs.Sort('created').order('desc'))
        .query(ejs.ConstantScoreQuery().filter(
          ejs.ExistsFilter('created')
        ))
        .size(10)
    );
  }

  search(entity, body) {
    return new Promise((resolve, reject) => {
      this.es.search({
        index: this.index,
        type: this.type,
        body: body
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
  }

}


