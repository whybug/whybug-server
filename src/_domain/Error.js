var Joi = require('joi'),
    uuidGenerator = require('node-uuid'),
    crypto = require('crypto');

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
        Joi.validate(data, Error.properties(), {
            skipFunctions: true,
            abortEarly: false
        }, (err, values) => {
            if (err) {
                throw err;
            }
            for (var value in values) {
                this[value] = values[value];
            }
        });
    }

    get checksum() {
        var text = this.level
            + this.code
            + this.message
            + this.programminglanguage
            + this.programminglanguage_version
            + this.os
            + this.os_version
            + this.file_path
            + this.line;

        return this._checksum || crypto.createHash('sha1')
                .update(text, 'utf8')
                .digest('hex');
    }

    set checksum(checksum) {
    }

    static properties() {
        return {
            protocol_version: Joi.number().required(),
            uuid: Joi.string().guid().default(uuidGenerator.v4()),
            solution_uuid: Joi.string().guid(),
            api_key: Joi.string().guid().allow(null),
            client_ip: Joi.string().max(255),
            checksum: Joi.string().max(255),
            level: Joi.string().max(255).required(),
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

    static bookshelf() {
        return {
            tableName: 'errors',
            idAttribute: 'uuid'
        };
    }
}

