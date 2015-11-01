/* @flow weak */
import {VALIDATION_ERROR_OCCURED} from '../../Constants';

export function validationErrorOccured(error) {
  return {
    type: VALIDATION_ERROR_OCCURED,
    error
  };
}
