import {
  config,
  routes,
  server,
  ReactAsync,
  Joi,
  Hapi,
  es,
  bookshelf,
  userService,
  errorService,
  solutionService,
  solutionRepository,
  errorRepository
} from './dependencies';

import {UserProfile} from './domain/UserProfile';
import {WebApp} from './web/WebApp';
import {Error} from './domain/Error';
import {Solution} from './domain/Solution';
import {WhybugApi} from './web/WhybugApi';

/**
* Helper to render HTML or return JSON.
*
* If a request is non ajax, return the server rendered HTML, otherwise call the callback.
*
* @param callback
* @returns {Function}
*/
var reactProxy = (callback) => {
  return (request, reply) => {
    if ("X-Requested-With" in request.headers) {
      // Forward the ajax request to the proxied function.
      callback(request, reply);
    } else {
      var app = new WebApp({
        path: request.path,
        params: request.params,
        query: request.query,
        user: request.auth.credentials
      });

      WhybugApi.setCookie(request.headers.cookie);

      ReactAsync.renderComponentToStringWithAsyncState(app, (err, markup) => {
        console.log('render', request.path);
        if (err) { console.log('error', err);
          return reply(err);
        }

        return reply.view('index', { content: markup });
      });
    }
  }
};

/**
* Helper to add a handler to a route definition and add it to the server.
*
* @param route
* @param handler
* @param config
*/
var route = (route, handler, config = {}) => {
  route.config = route.config || {};
  route.config.handler = handler;
  if (config) {
    for (var setting in config) {
      route.config[setting] = config[setting];
    }
  }
  if (!route.config.cors) {
    route.config.cors = false;
  }
  server.route(route);
};

server.pack.register([
  require('bell'),
  require('hapi-as-promised'),
  require('hapi-auth-cookie'),
  require('hapi-cache-buster')
], (err) => {
  if (err) { throw err; }

  // Register session cookie strategy.
  server.auth.strategy('session', 'cookie', {
    password: config.web.session_password,
    cookie: 'session', // Cookie name
    isSecure: false, // Terrible idea but required if not using HTTPS
    ttl: 24 * 60 * 60 * 1000 * 30 // Set session to 30 days
  });

  /**
   * API routes.
   *
   * These all return JSON.
   */
  route(routes.api.create_error, (request, reply) => {
    // Delete info a client cannot provide.
    delete request.payload.uuid;
    delete request.payload.errorgroup_uuid;
    request.payload.client_ip = request.headers['x-forwarded-for'] || request.info.remoteAddress;

    reply(solutionService.solve(new Error(request.payload)));
  }, { validate: {payload: Error.properties()}});

  // Get a single error.
  route(routes.api.read_error, async (request, reply) => {
    try {
      reply(await errorRepository.findByUuid(request.params.error_uuid) || Hapi.error.notFound());
    } catch(e) {
      reply(Hapi.error.internal(e))
    }
  }, {validate: { params: {error_uuid: Joi.string().guid() }}});


  // Get unsolved errors.
  route(routes.api.unsolved_errors, (request, reply) => {
    reply(errorRepository.findUnsolvedErrors());
  });

  // Post hidden error.
  route(routes.api.hidden_errors, async (request, reply) => {
    reply(await errorService.hideError(new Error(request.payload)) || Hapi.error.notFound());
  }, { validate: {payload: Error.properties()}});

  // Get a single solution.
  route(routes.api.read_solution, async (request, reply) => {
    try {
      reply(await solutionRepository.findByUuid(request.params.solution_uuid) || Hapi.error.notFound());
    } catch(e) {
      reply(Hapi.error.internal(e))
    }
  }, {validate: { params: {solution_uuid: Joi.string().guid() }}});

  // Create a solution.
  route(routes.api.create_solution, (request, reply) => {
    reply(solutionRepository.store(new Solution(request.payload)));
  }, { validate: {payload: Solution.properties()}});

  // Update a solution.
  route(routes.api.update_solution, (request, reply) => {
    reply(solutionRepository.store(new Solution(request.payload)));
  }, { validate: {payload: Solution.properties()}});

  // Search solutions.
  route(routes.api.search_solutions, (request, reply) => {
    reply(solutionService.search(request.query.query));
  });

  /**
   * Web routes.
   *
   * For AJAX requests these return JSON, otherwise HTML.
   */


  // Generic handler for server rendering.
  route({ method: '*', path: '/{p*}', config: { auth: { mode: 'try', strategy: 'session' } } }, reactProxy((request, reply) => {
    reply({});
  }));


  //route(routes.web.url_shortener, (request, reply) => {
    //var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    //private static final int    BASE     = ALPHABET.length();
    //reply({});
  //});

  // Logout.
  route(routes.web.logout, (request, reply) => {
    request.auth.session.clear();
    return reply.redirect('/');
  });

  // Login handler for all providers.
  var login = (provider) => async (request, reply) => {
    var credentials = request.auth.credentials;

    // 1. Perform account lookup or registration.
    var user = await userService.loginWithProvider(provider, credentials.profile);

    // 2. Setup local session.
    delete user.attributes.email;
    delete user.attributes.created_at;
    delete user.attributes.updated_at;
    request.auth.session.set(user);

    // 3. Redirect to the application.
    return reply.redirect(credentials.query.redirect || '/');
  };

  // Register providers.
  UserProfile.providers().forEach((provider) => {
    if (!config[provider].clientId) {return;}

    server.auth.strategy(provider, 'bell', {
      provider: provider,
      password: config[provider].password, // random, for cookie encryption
      clientId: config[provider].clientId, // from the provider
      clientSecret: config[provider].clientSecret, // from the provider
      isSecure: false // Terrible idea but required if not using HTTPS
    });

    route(routes.web.login[provider], login(provider));
  });
});

// Serve static files from `static` dir.
var SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * SECOND, DAY = 24 * HOUR, WEEK = 7 * DAY;
var cache_2weeks = {privacy: 'public', expiresIn: 2 * WEEK};
server.route({ method: 'GET', path: '/css/{p*}', config: {cache: cache_2weeks,  handler: { directory: { path: './build/css/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/js/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './build/js/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/fonts/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './src/web/assets/fonts/', listing: false, index: true } } } });


// Setup logging.
server.pack.register({
  plugin: require('good'),
  options: {
    opsInterval: 60 * 1000, // every minute
    extendedRequests: true,
    reporters: [{
        reporter: require('good-console'),
        args: config.log[config.debug ? 'debug' : 'prod']
      }
    ]
  }
}, (err) => {
  if (err) {
    console.log(err);
  }
});
// Start the server.
server.start(() => {
  console.log('Server started at: ' + server.info.uri);
});
