var Joi = require('joi');

export function createActionValidator(...actionValidations) {
  var validations = Object.assign(...actionValidations);

  return async (action) => {
    if (!validations[action.type]) {
      throw Error(`Action "${action.type}" not found.`);
    }

    var {error, value} = Joi.validate(
      action,
      validations[action.type](Joi),
      { abortEarly: false }
    );

    if (error) {
      throw {message: error.name, details: error.details};
    }

    return value;
  };
}

export function createActionHandler(...actionHandlers) {
  var handlers = Object.assign(...actionHandlers);
  //console.log("Action handlers\n", handlers);

  return async (store, action) => {
    if (!handlers[action.type]) {
      return console.log(`No handler for event "${action.type}"`);
      //throw Error(`No handler for action "${action.type}".`);
    }

    return await handlers[action.type](store, action);
  };
}

export function createEventHandler(...eventHandlers) {
  const subscribers = Object.assign(...eventHandlers);
  var handlers = {};

  subscribers.forEach(subscriber => {
    subscriber.events.forEach((event) => {
      handlers[event] = subscriber.handler;
    })
  });

  //console.log('Event handlers\n', handlers);

  return async (store, event) => {
    if (!handlers[event.type]) {
      //return console.log(`No handler for event "${event.type}"`);
      throw Error(`No handler for event "${event.type}".`);
    }

    return await handlers[event.type](store, event);
  };
}

export function createQueryHandler(...queryHandlers) {
  var handlers = Object.assign(...queryHandlers);
  //console.log("Query handlers\n", handlers);

  return async (store, query) => {
    if (!handlers[query.type]) {
      //return console.log(`No handler for query "${query.type}"`);
      throw Error(`No handler for query "${query.type}".`);
    }

    return await handlers[query.type](store, query);
  };
}

export function createStore(handleAction, handleEvent, handleQuery) {
  const store = {
    /**
     * Handles an action.
     *
     * @param action
     * @returns {Promise}
     */
    dispatch: (action) => {
      return handleAction(store, action);
    },

    query: (query) => {
      return handleQuery(store, query);
    },

    raise: (event) => {
      return handleEvent(store, event);
    }
  };

  return store;
}
