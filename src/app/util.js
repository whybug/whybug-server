var Joi = require('joi');

export function createActionValidator(...actionValidations) {
  var validations = Object.assign(...actionValidations);

  return (action) => {
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
  console.log('Action handlers', handlers);

  return (store, action) => {
    if (!handlers[action.type]) {
      throw Error(`No handler for action "${action.type}".`);
    }

    return handlers[action.type](store, action);
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

  console.log('Event handlers', handlers);

  return (store, event) => {
    if (!handlers[event.type]) {
      return console.log(`No handler for event "${event.type}"`);
      //throw Error(`No handler for event "${events.type}".`);
    }

    return handlers[event.type](store, event);
  };
}

export function createStore(handleAction, handleEvent, persistances) {
  const store = {
    ...persistances,

    /**
     * Handles an action.
     *
     * @param action
     * @returns {Promise}
     */
    dispatch: (action) => {
      return handleAction(store, action);
    },

    raise: (event) => {
      return handleEvent(store, event);
    }
  };

  return store;
}
