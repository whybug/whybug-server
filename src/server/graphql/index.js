/**
 * GraphQL for the domain.
 *
 * Passes actions (mutations in GraphQL speak) and queries
 * to the domain to be handled.
 */
export var GraphQLPlugin = {
    register: (server, options, next) => {
        server.route({
            method: 'POST',
            path: '/graphql',
            handler: function (request, reply) {
                try {
                    const action = {
                        ...request.payload,
                        source: 'graphql'
                    };
                    //graphql();
                    reply(options.store.dispatch(action));
                } catch (e) {
                    if (e.stack) {
                        console.error(e.stack);
                    }
                    reply({
                        error: e.message,
                        details: e.details,
                        payload: request.payload
                    });
                }
            }
        });
        next();
    }
};
GraphQLPlugin.register.attributes = {
    name: 'GraphQL API'
};
