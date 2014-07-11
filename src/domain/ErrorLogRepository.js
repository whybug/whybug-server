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


