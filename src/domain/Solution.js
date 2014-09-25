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
    // Assert valid data and initialize.
    Joi.validate(data, Solution.properties(), {skipFunctions: true, abortEarly: false}, (err, values) => {
      if (err) { throw err; }
      for (var value in values) { this[value] = values[value]; }
    });
  }

  static properties() {
    return {
      uuid: Joi.string().guid().default(uuidGenerator.v4()),
      slug_long: Joi.string().regex(/^[a-z0-9\-]+$/), // a slug is: small chars, numbers and dashes
      slug_short: Joi.string().alphanum(),
      description: Joi.string().required(),
      level: Joi.string().max(255).required(),
      //code: Joi.string().max(255).required(),
      message: Joi.string().min(5).required(),
      programminglanguage: Joi.string().max(255).required(),
      programminglanguage_version: Joi.string().max(255).required(),
      os: Joi.string().max(255).required(),
      os_version: Joi.string().max(255).required(),
      created_at: Joi.date().default(new Date)
    };
  }

  static bookshelf() {
    return {
      tableName: 'solutions',
      idAttribute: 'uuid'
    };
  }

  get slug_long() {
    return this.uuid;//this.message;
  }

  get slug_short() {
    return this.uuid; //this.message;
  }

  /**
   * Creates a solution with a context of specified error.
   *
   * @param {Error} error
   */
  //static forError(error) {
  //  return new Solution({
  //    message: error.message,
  //    code: error.code,
  //    level: error.level,
  //    programminglanguage: error.programminglanguage,
  //    programminglanguage_version: error.programminglanguage_version,
  //    os: error.os,
  //    os_version: error.os_version
  //  });
  //}
}
