import {recordErrorValidator} from '../../src/app/Error/Action/RecordError';
var Joi = require('joi');
var jsc = require("jsverify");

describe('recordErrorValidator', () => {
    var error;
    var schema = Joi.compile(recordErrorValidator(Joi));
    var validate = (error) => {
        return Joi.validate(error, schema);
    };

    beforeEach(() => {
        error = {
            "type": 'RECORD_ERROR',
            "source": 'REST',
            "programminglanguage": "php",
            "programminglanguage_version": "5.4.24",
            "message": "Cannot access empty property",
            "code": "1",
            "level": "warning",
            "file_path": "/Volumes/com_mit/frontend/vendor/whybug-php/test.php",
            "line": 10,
            "os": "Darwin",
            "os_version": "13.3.0",
            "protocol_version": 1,
            "created_at": new Date("2014-09-20T14:54:17.792Z"),
            "client_ip": "127.0.0.1",
            "solution_uuid": "1eb138f8-850e-4555-970b-93470604de87",
            "api_key": '1eb138f8-850e-4555-970b-93470604de87',
            "checksum": '12345'
        };
    });

    it('should generate uuid', () => {
        validate(error).value.uuid.should.be.a('string');
    });

    it('should assign existing uuid', () => {
        error.uuid = "1eb138f8-850e-4555-970b-93470604de87";
        validate(error).value.uuid.should.equal(error.uuid);
    });

    it('should assign passed data', () => {
        validate(error).value.should.contain(error);
    });

    it('should not assign invalid data', () => {
        error.invalid = 'data';
        validate(error).error.message.should.equal('invalid is not allowed');
    });

    it('should be allowed for CLI', () => {
        error.source = 'CLI';
        validate(error).value.should.contain(error);
    });

    it('should be allowed for GRAPHQL', () => {
        error.source = 'GRAPHQL';
        validate(error).value.should.contain(error);
    });

    jsc.property("message", "nestring", function (message) {
        return validate({...error, message}).value.message == message;
    });

});
