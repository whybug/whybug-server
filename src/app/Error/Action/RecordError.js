/* @flow weak */
var uuidGenerator = require('node-uuid');

import {RECORD_ERROR} from '../../Constants';
import {ErrorLevels} from '../Domain/Error';

export function recordErrorValidator(Joi) {
  return {
    type: Joi.string().valid(RECORD_ERROR).required(),
    protocol_version: Joi.number().required(),
    uuid: Joi.string().guid().default(uuidGenerator.v4()),
    solution_uuid: Joi.string().guid(),
    api_key: Joi.string().guid().allow(null),
    client_ip: Joi.string().max(255),
    checksum: Joi.string().max(255),
    level: Joi.string().valid(ErrorLevels).required(),
    code: Joi.string().max(255).required(),
    message: Joi.string().min(5).required(),
    programminglanguage: Joi.string().max(255).required(),
    programminglanguage_version: Joi.string().max(255).required(),
    os: Joi.string().max(255).required(),
    os_version: Joi.string().max(255).required(),
    file_path: Joi.string().max(255).required(),
    line: Joi.number().integer().required(),
    hidden: Joi.number().integer().min(0).max(1).default(0),
    created_at: Joi.date().default(new Date)
  };
}

export function recordError(solutionId: string) :Object {
  return { type: RECORD_ERROR, solutionId };
}
