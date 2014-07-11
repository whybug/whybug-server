import {Error} from './Error';
import {ErrorLog} from './ErrorLog';
import {ErrorRepository} from './ErrorRepository';
import {ErrorLogRepository} from './ErrorLogRepository';

export class ErrorService {

  /**
   * @param {ErrorRepository} errorRepository
   * @param {ErrorLogRepository} errorLogRepository
   */
  constructor(errorRepository, errorLogRepository) {
    this.errorRepository = errorRepository;
    this.errorLogRepository = errorLogRepository;
  }

  /**
   * An ErrorLog is either added as a variation to a similar Error or is a new Error.
   *
   * @param {ErrorLog} errorLog
   * @param callback
   */
  handleNewErrorLog(errorLog, callback) {
    this.errorRepository.findSimilarError(errorLog, (err, error) => {
      if (!error) {
        error = new Error();
      }

      error.addErrorLog(errorLog);

      this.errorRepository.store(error);
      this.errorLogRepository.store(errorLog);
      callback(error);
    });
  }
}
