/* @flow */
var Joi = require('joi');
var uuidGenerator = require('node-uuid');

import {RAISE_EVENT} from '../../Constants';
import {InternalSources, INTERNAL} from '../Domain/Sources';

export function raiseEvent(event, action) {
  return {type: RAISE_EVENT, source: INTERNAL, action, event };
}

export function raiseEventValidator() {
  return {
    type: Joi.string().valid('raiseEvent'),
    source: Joi.string().valid(InternalSources),
    action: Joi.object(),
    event: Joi.object().required()
  }
}


