var Joi = require('joi');
var Promise = require('bluebird');
var joiValidate = Promise.promisify(Joi.validate);

export function validation(schemas, item, options = {abortEarly: false}) {
    if (!schemas[item.type]) {
        throw Error(`Item "${item.type}" not found for validation.`);
    }

    return joiValidate(item, schemas[item.type], options);
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


