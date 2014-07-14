var validator = require('revalidator'),
  uuidGenerator = require('node-uuid');

/**
 * An Error is a description of an error which groups ErrorLogs and Solutions.
 *
 * The description of an Error consists of an error message (preferably without dynamic details like line numbers or
 * file paths), an error level and a programming language.
 *
 * Errors group related ErrorLogs (at least one) and provide (hopefully) a Solution.
 *
 * @param {ErrorLog} errorLog
 * @constructor
 */
export class Error {

  constructor(uuid, data = {}) {
    this.uuid = uuid || uuidGenerator.v4();
    // created?

    for (var name in Error.properties()) {
      this[name] = data[name] || Error.properties()[name].default;
    }
  }

  static properties() {
    return {
      errorLogCount: {required: true, type: 'int', default: 0},
      errorMessage: {required: true, type: 'string', minLength: 10},
      errorLevel: {required: true, type: 'string', minLength: 3},
      programmingLanguage: {required: true, type: 'string', minLength: 5},
      framework: {type: 'string', minLength: 5, default: ''},
      errorCode: {type: 'string', minLength: 5, default: ''}
    };
  }

  validate() {
    return validator.validate(this, { properties: Error.properties() });
  }

  /**
   * Associates the specified errorLog to this error.
   *
   * @param {ErrorLog} errorLog
   */
  addErrorLog(errorLog) {
    errorLog.errorUuid = this.uuid;

    // If this error is new, get the error description from the error log.
    if (!this.errorLogCount) {
      this.errorMessage = errorLog.errorMessage;
      this.errorCode = errorLog.errorCode;
      this.errorLevel = errorLog.errorLevel;
      this.programmingLanguage = errorLog.programmingLanguage;
    }

    this.errorLogCount = ++this.errorLogCount || 1;
  }
}
