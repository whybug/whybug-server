/**
 * REST API for the domain.
 *
 * Takes actions and passes them to the domain to be handled.
 */
export var RestPlugin = {

  register: (server, options, next) => {
    server.route({method: 'POST', path: '/rest/actions', handler: (request, reply) => {
      try {
        const action = {
          ...request.payload,
          source: 'rest'
        };
        //userId: request.auth.userId,
        //apiKey: request.auth.apiKey,

        reply(options.store.dispatch(action) || {});
      } catch(e) {
        if (e.stack) {
          console.error(e.stack);
        }

        reply({
          error: e.message,
          details: e.details,
          payload: request.payload
        });
      }
    }});

    next();
  }
};

RestPlugin.register.attributes = {
  name: 'Rest API'
};
