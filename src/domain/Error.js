var Joi = require('joi');
    uuidGenerator = require('node-uuid');

/**
 * An Error contains info on an error which occurred on a Client.
 *
 * This info can be the error message, error level, used programming language and so on.
 *
 * @param {array} data
 * @constructor
 */
export class Error {

  constructor(data = {}) {
    // Assert valid data and initalize.
    Joi.validate(data, Error.properties(), {skipFunctions: true, abortEarly: false}, (err, values) => {
      if (err) { throw err; }
      for (var value in values) { this[value] = values[value]; }
    }):
  }

  static bookshelf() {
    return {
      tableName: 'errors',
      idAttribute: 'uuid',
    };
  }

  static properties() {
  {
    return {
      protocol_version: Joi.number().required(),
      uuid: Joi.string().guid().default(uuidGenerator.v4()),
      solution_uuid: Joi.string().guid(),
      api_key: Joi.string().guid(),
      client_ip: Joi.string().max(255),
      level: Joi.string().max(255).required(),
      code: Joi.string().max(255).required(),
      message: Joi.string().min(5).required(),
      programminglanguage: Joi.string().max(255).required(),
      programminglanguage_version: Joi.string().max(255).required(),
      os: Joi.string().max(255).notNullable(),
      os_version: Joi.string().max(255).notNullable(),
      file_path: Joi.string().max(255).notNullable(),
      line: Joi.number().integer().required(),
      created: Joi.string().isoDate().default((new Date).toISOString())
    };
  }

  /**
   * Validate current object.
   *
   * @return null
   * @throws {Error} If validation fails.
   */
  validate() {
    Joi.assert(this, Error.properties());
  };
}

