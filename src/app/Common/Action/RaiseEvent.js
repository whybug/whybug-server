/* @flow weak */
import {RAISE_EVENT} from '../../Constants';
import {INTERNAL_SOURCES, INTERNAL} from '../Domain/Sources';

export function raiseEvent(event, action) {
  return {type: RAISE_EVENT, source: INTERNAL, action, event };
}

export function raiseEventValidator(Joi) {
  return {
    type: Joi.string().valid(RAISE_EVENT),
    source: Joi.string().valid(INTERNAL_SOURCES),
    action: Joi.object(),
    event: Joi.object().required()
  };
}


