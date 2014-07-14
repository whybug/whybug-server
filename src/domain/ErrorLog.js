var validator = require('revalidator'),
    uuidGenerator = require('node-uuid');

/**
 * An ErrorLog contains info on an error which occurred on a Client.
 *
 * This info can be the error message, error level, used programming language and so on.
 *
 * @param {array} data
 * @constructor
 */
export class ErrorLog {

  constructor(uuid, data = {}) {
    this.uuid = uuid || uuidGenerator.v4();
    for (var name in ErrorLog.properties()) {
        this[name] = data[name] || ErrorLog.properties()[name].default;
    }
  }

  static properties() {
    return {
      version: {required: true, type: 'string', minLength: 5},
      errorLevel: {required: true, type: 'string'},
      errorMessage: {required: true, type: 'string', minLength: 5},
      programmingLanguage: {required: true, type: 'string'},
      programmingLanguageVersion: {required: true, type: 'string'},
      errorCode: {type: 'string'},
      line: {type: 'number'},
      created: {type: 'string', default: (new Date()).toJSON()},
      filePath: {type: 'string', default: ''},
      framework: {type: 'string', default: ''}
    }
  }

  /**
   *
   */
  replaceDynamicMessageParts() {
    this.line;
    this.filePath;
    this.errorMessage;
  }

  /**
   * Validate current object.
   *
   * @return {object} Object containing 'valid' (boolean) and 'errors'.
   */
  validate() {
    return validator.validate(this, { properties: ErrorLog.properties() });
  };

}

