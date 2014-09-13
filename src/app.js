import {
  config,
  routes,
  server,
  ReactAsync,
  es,
  bookshelf
} from './dependencies';

import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
import {UserRepository} from './domain/UserRepository';
import {UserProfile} from './domain/UserProfile';
import {UserProfileRepository} from './domain/UserProfileRepository';
import {UserService} from './domain/UserService.js';
import {WebApp} from './web/WebApp';

var errorLogRepository = new ErrorLogRepository(es);
var errorRepository = new ErrorRepository(es);
export var errorService = new ErrorService(errorRepository, errorLogRepository);
var userRepository = new UserRepository(bookshelf);
var userProfileRepository = new UserProfileRepository(bookshelf);
export var userService = new UserService(userRepository, userProfileRepository);

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
      // Forward ajax request to the proxied function.
      callback(request, reply);
    } else {
      var app = new WebApp({
        path: request.path,
        user: request.auth.credentials
      });
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
 */
var route = (route, handler) => {
  route.config = route.config || {};
  route.config.handler = handler;
  server.route(route);
};

/**
 * API routes.
 *
 * These all return JSON.
 */
route(routes.api.create_error, (request, reply) => {
  errorService
    .handleNewErrorLog(new ErrorLog(null, request.payload))
    .then(reply)
    .catch((validation) => {
      reply({error: validation.errors});
    });
});

route(routes.api.search_errors, (request, reply) => {
  errorLogRepository.findByQuery(request.query.query)
    .then(reply)
    .catch((err) => {reply(err)});
});

/**
 * Web routes.
 *
 * For AJAX requests these return JSON, otherwise HTML.
 */
// Routes which might need a session.
server.pack.register(require('hapi-auth-cookie'), (err) => {
  if (err) { throw err; }

  server.auth.strategy('session', 'cookie', {
    password: 'worldofwalmart', // cookie secret
    cookie: 'session', // Cookie name
    isSecure: config.debug ? false : true,
    ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
  });

  // Generic handler for server rendering.
  route({ method: '*', path: '/{p*}', config: { auth: { mode: 'try', strategy: 'session' } } }, reactProxy((request, reply) => {
    reply({});
  }));

  // Logout.
  route(routes.web.logout, (request, reply) => {
    request.auth.session.clear();
    return reply.redirect('/');
  });
});

// Login routes.
server.pack.register(require('bell'), (err) => {

  // Register providers.
  UserProfile.providers().forEach((provider) => {
    server.auth.strategy(provider, 'bell', {
      provider: provider,
      password: config[provider].password, // random, for cookie encryption
      clientId: config[provider].clientId, // from the provider
      clientSecret: config[provider].clientSecret, // from the provider
      isSecure: config.debug ? false : true // Terrible idea but required if not using HTTPS
    });
  });

  /**
   * Login handler for all providers.
   */
  var login = (provider) => async (request, reply) => {
    var credentials = request.auth.credentials;

    // 1. Perform account lookup or registration.
    try {
      var user = await userService.loginWithProvider(provider, credentials.profile);
    } catch(e) {
      console.log('error', e);
      throw e;
    }

    // 2. Setup local session.
    request.auth.session.set(user);

    // 3. Redirect to the application.
    return reply.redirect(credentials.query.redirect || '/');
  };

  route(routes.web.login_github, login('github'));
  //route(routes.web.login_twitter, login);
});

// Serve static files from `static` dir.
var SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * SECOND, DAY = 24 * HOUR, WEEK = 7 * DAY;
var cache_2weeks = {privacy: 'public', expiresIn: 2 * WEEK};
server.route({ method: 'GET', path: '/css/{p*}', config: {cache: cache_2weeks,  handler: { directory: { path: './build/css/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/js/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './build/js/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/fonts/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './src/web/static/fonts/', listing: false, index: true } } } });

// Start the server.
server.start(() => {
  console.log('Server started at: ' + server.info.uri);
});
