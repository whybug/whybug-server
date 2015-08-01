var Joi = require('joi');
var Hapi = require('hapi');
var server = new Hapi.Server({debug: { request: ['error']} });
server.connection({host: "127.0.0.1", port: 51422});

import {actions as solutionActions } from './solution_actions';

var handlers = {
  'CHANGE_SOLUTION': (store, action) => store('solution', action.solutionId).set(action.key, action.value),
  //'HIDE_SOLUTION': (store, action) => store('solution', action.solutionId).set('hidden', true),
  'HIDE_SOLUTION': (store, action) => ({success: true}),
  'SHOW_SOLUTION': (store, action) => store('solution', action.solutionId).set('hidden', false),
  'ADD_IMAGE_TO_SOLUTION': (store, action) => {
    var url = upload(action.fileName, action.data);

    return store('solution', action.solutionId)
          .set('image.url', url);
  }
};

var valid = createValidator(solutionActions);
var handle = createHandler(handlers);
var store = (document, key) => {

  return {
    set: (attribute, value) => {
      // call database
      return this;
    }
  }
};

server.route({method: 'POST', path: '/api/actions', handler: function(request, reply) {
  try {
    var action = request.payload;

    reply(handle(store, valid(action)));
  } catch(e) {
    console.error(e.stack);
    reply({'error': e.message, payload: request.payload});
  }
}});

// Start the server.
server.start(() => {
  console.log('Server started at: ' + server.info.uri);
});


process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
});

// ---------- Helpers

function createValidator(...actionValidations) {
  var validations = Object.assign(...actionValidations);

  return (action) => {
    if (!validations[action.type]) {
      throw Error(`Action "${action.type}" not found.`);
    }

    var {error, value} = Joi.validate(
      action,
      validations[action.type],
      { abortEarly: false }
    );

    if (error) {
      throw error;
    }

    return value;
  };
}

function createHandler(...actionHandlers) {
  var handler = Object.assign(...actionHandlers);

  return (store, action) => {
    if (!handlers[action.type]) {
      throw Error(`No handler for action "${action.type}".`);
    }

    return handlers[action.type]();
  };
}
