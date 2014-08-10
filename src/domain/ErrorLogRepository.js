var ejs = require('elastic.js');

import {ErrorLog} from './ErrorLog';

/**
 * @param {es.Client} esClient
 * @constructor
 */
export class ErrorLogRepository
{
  constructor(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'error_log';
  }

  findByQuery(query = '*') {
    return this.search(
      ErrorLog,
      ejs.Request()
      .size(10)
      .sort(ejs.Sort('created').order('desc'))
      .query(
        ejs.FilteredQuery(
          ejs.MatchQuery('errorMessage', query)
            .operator('and')
            .minimumShouldMatch('70%')
            .zeroTermsQuery('all'),
          ejs.ExistsFilter('created')
        )
      )
    );
  }

  search(entity, request) {
    return new Promise((resolve, reject) => {
      this.es.search({
        index: this.index,
        type: this.type,
        body: request.toString()
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


