/* @flow weak */
import {FIND_SOLUTIONS_FOR_ERROR} from '../../Constants';
import {recordErrorValidator} from '../../Error/Action/RecordError';

export function findSolutionsForErrorValidator(Joi) {
    return recordErrorValidator(Joi);
}

export function findSolutionsForError(error:Error) {
    return {type: FIND_SOLUTIONS_FOR_ERROR, error};
}
