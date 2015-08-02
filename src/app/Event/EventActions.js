/* @flow */
var Joi = require('joi');
var uuidGenerator = require('node-uuid');

import {InternalSources} from './../Sources';

// Action validators

export var actions = {
  raiseEvent: {
    type: Joi.string().valid('raiseEvent'),
    source: Joi.string().valid(InternalSources),
    action: Joi.object(),
    event: Joi.object().required()
  }
};

// Action creators

export function raiseEvent(event, action) {
  return {type: 'raiseEvent', source: 'internal', action, event };
}



