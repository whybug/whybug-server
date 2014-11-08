import {Error} from './Error';
import {ErrorRepository} from './ErrorRepository';

export class ErrorService {

  /**
   * @param {ErrorRepository} errorRepository
   */
  constructor(errorRepository) {
    this.errorRepository = errorRepository;
  }

  /**
   * Hides a specified error.
   *
   * @param {Error} Error
   * @return {boolean} True if error is hidden, false otherwise.
   */
  async hideError(error) {
    var errorToHide = await this.errorRepository.findByUuid(error.uuid);

    if (!errorToHide) {
      return false;
    }

    errorToHide.hidden = 1;
    this.errorRepository.store(errorToHide, true);

    return true;
  }
}
