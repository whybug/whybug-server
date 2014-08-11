var hapi = require('hapi'),
    elasticsearch = require('elasticsearch'),
    ReactAsync = require('react-async');

// Setup dependencies.
import {config} from '../config/config';
import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
import {WebApp} from './web/WebApp';

var server = new hapi.Server(config.node.host, config.node.port, {
  views: {
    engines: {
      html: require('handlebars')
    },
    path: 'src/web/templates'
  }
});
var es = new elasticsearch.Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: config.debug ? 'trace' : 'warning'
});
var errorLogRepository = new ErrorLogRepository(es);
var errorRepository = new ErrorRepository(es);
var errorService = new ErrorService(errorRepository, errorLogRepository);

/**
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
      ReactAsync.renderComponentToStringWithAsyncState(new WebApp({path: request.path}), (err, markup) => {
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
route(config.route.api.create_error, (request, reply) => {
  errorService
    .handleNewErrorLog(new ErrorLog(null, request.payload))
    .then(reply)
    .catch((validation) => {
      reply({error: validation.errors});
    });
});

route(config.route.api.search_errors, (request, reply) => {
  errorLogRepository.findByQuery(request.query.query)
    .then(reply)
    .catch((err) => {reply(err)});
});

/**
 * Web routes.
 *
 * For AJAX requests these return JSON, otherwise HTML.
 */
route(config.route.web.startpage, reactProxy((request, reply) => {
  reply({});
}));

// Serve static files from `static` dir.
var SECOND = 1000, MINUTE = 60 * SECOND, HOUR = 60 * SECOND, DAY = 24 * HOUR, WEEK = 7 * DAY;
var cache_2weeks = {privacy: 'public', expiresIn: 2 * WEEK};
server.route({ method: 'GET', path: '/css/{p*}', config: {cache: cache_2weeks,  handler: { directory: { path: './build/css/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/js/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './build/js/', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/fonts/{p*}', config: {cache: cache_2weeks, handler: { directory: { path: './src/web/static/fonts/', listing: false, index: true } } } });

// Handler for 404.
server.route({ method: '*', path: '/{p*}', handler: reactProxy((request, reply) => {
  reply('The page was not found');
})});

// Start the server.
server.start();
