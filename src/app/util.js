
var Joi = require('joi');

export function createValidator(...actionValidations) {
  var validations = Object.assign(...actionValidations);

  return (action) => {
    if (!validations[action.type]) {
      throw Error(`Action "${action.type}" not found.`);
    }

    var {error, value} = Joi.validate(action, validations[action.type], { abortEarly: false });

    if (error) {
      throw {message: error.name, details: error.details};
    }

    return value;
  };
}

export function createHandler(...actionHandlers) {
  var handlers = Object.assign(...actionHandlers);

  return (store, action) => {
    if (!handlers[action.type]) {
      throw Error(`No handler for action "${action.type}".`);
    }

    return handlers[action.type](store, action);
  };
}

export function createStore(handleAction) {
  // todo move to Store/Store.js
 const db = {
   update: (id, rev, attributes) => {
     //db(dbName).update(id, rev, attributes);
   },
   insert: (attributes) => {
     //db(dbName).update(id, rev, attributes);
   },
   get: (id) => {

   },
   index: (config) => {
     // es.index(config);
   }
 };

  const store = {
    solutions: db,
    errors: db,
    events: db,

    /**
     * Handles an action.
     *
     * @param action
     * @returns {Promise}
     */
    dispatch: (action) => {
      return handleAction(store, action);
    }
  };

  return store;
}
