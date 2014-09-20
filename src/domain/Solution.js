var Joi = require('joi'),
    uuidGenerator = require('node-uuid');

/**
 * An Error is a description of an error which groups ErrorLogs and Solutions.
 *
 * The description of an Error consists of an error message (preferably without dynamic details like line numbers or
 * file paths), an error level and a programming language.
 *
 * Errors group related Errors (at least one). 
 *
 * @param {ErrorLog} errorLog
 */
export class Solution {

  constructor(data = {}) {
    // Assert valid data and initalize.
    Joi.validate(data, Solution.properties, {skipFunctions: true, abortEarly: false}, (err, values) => {
      if (err) { throw err; }
      for (var value in values) { this[value] = values[value]};    
    }):
  }

  static properties() {
    return {
      uuid: Joi.string().guid().default(uuidGenerator.v4()),
      slug_long: Joi.string().required(),
      slug_short: Joi.string().required(),
      level: Joi.string().max(255).required(),
      code: Joi.string().max(255).required(),
      message: Joi.string().min(5).required(),
      programminglanguage: Joi.string().max(255).required(),
      programminglanguage_version: Joi.string().max(255).required(),
      os: Joi.string().max(255).notNullable(),
      os_version: Joi.string().max(255).notNullable(),
      created: Joi.string().isoDate()
    };
  }

  static bookshelf() {
    return {
      tableName: 'solutions',
      idAttribute: 'uuid',
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

  /**
   * Associates the specified errorLog to this error.
   *
   * @param {Error} error
   */
  addError(error) {
    errorLog.errorUuid = this.uuid;

    // If this error is new, get the error description from the error log.
    if (this.isNew()) {
      this.message = error.message;
      this.code = error.code;
      this.level = error.level;
      this.programminglanguage = error.programminglanguage;
      this.programminglanguage_version = error.programminglanguage_version;
      this.os = error.os;
      this.os_version = error.os_version;
    }

    this.seen_count = ++this.seen_count || 1;
  }
}
