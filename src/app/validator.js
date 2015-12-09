var Joi = require('joi');
var Promise = require('bluebird');
var joiValidate = Promise.promisify(Joi.validate);

export function validation(schemas, message, options = {abortEarly: false}) {
    if (!message.type) {
        throw Error(`Message has no type.`);
    }
    if (!schemas[message.type]) {
        throw Error(`No validator found for type "${message.type}".`);
    }

    return joiValidate(message, schemas[message.type], options);
}

export function merge(validatorsList) {
    let schemas = {};
    let validators = Object.assign(...validatorsList);

    for (var key in validators) {
        schemas[key] = compile(validators[key]);
    }

    return schemas;
}

function compile(schema:Function) {
    return Joi.compile(schema(Joi));
}


