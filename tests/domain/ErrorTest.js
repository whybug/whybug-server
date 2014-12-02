import {Error} from '../../src/domain/Error.js';

describe('Error', () => {
  var error;

  beforeEach(() => {
    error = {
      "programminglanguage": "php",
      "programminglanguage_version": "5.4.24",
      "message": "Cannot access empty property",
      "code": "1",
      "level": "exception",
      "file_path": "/Volumes/com_mit/frontend/vendor/whybug-php/test.php",
      "line": 10,
      "os": "Darwin",
      "os_version": "13.3.0",
      "protocol_version": 1,
      "created_at": new Date("2014-09-20T14:54:17.792Z"),
      "client_ip": "127.0.0.1"
    };
  });

  describe('#constructor', () => {

    it('should generate uuid', () => {
      new Error(error).uuid.should.be.a('string');
    });

    it('should assign existing uuid', () => {
      error.uuid = "1eb138f8-850e-4555-970b-93470604de87";
      new Error(error).uuid.should.equal(error.uuid);
    });

    it('should assign passed data', () => {
      new Error(error).should.contain(error);
    });

    it('should not assign invalid data', () => {
      error.invalid = 'data';
      (() => new Error(error)).should.throw('invalid is not allowed');
    });

  });

  describe('#properties', () => {

    it('should return properties', () => {
      Error.properties().should.include.keys('protocol_version', 'uuid', 'message', 'programminglanguage');
    });

  });
});
