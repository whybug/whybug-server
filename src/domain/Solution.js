var Joi = require('joi'),
    slug = require('slug'),
    uuidGenerator = require('node-uuid');

/**
 * A solution is a description how to solve a group of errors.
 *
 */
export class Solution {

  /**
   * Creates a new solution.
   *
   * @param data
   * @throws ValidationError if provided data is invalid.
   */
  constructor(data = {}) {
    // Assert valid data and initialize.
    Joi.validate(data, Solution.properties(), {skipFunctions: true, abortEarly: false}, (err, values) => {
      if (err) { throw err; }
      for (var value in values) { this[value] = values[value]; }
    });
  }

  /**
   * Returns a hash of valid properties and their Joi validation.
   *
   * @returns {Object} Hash of valid properties and their Joi validatoin.
   */
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
    return this._slug_long || slug(this.message).toLowerCase();
  }

  set slug_long(slug_long) {
    this._slug_long = slug_long;
  }

  get slug_short() {
    return this._slug_short || this.uuid;
  }

  set slug_short(slug_short) {
    this._slug_short = slug_short;
  }
}
