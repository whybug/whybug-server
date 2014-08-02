var hapi = require('hapi'),
    elasticsearch = require('elasticsearch'),
    ReactAsync = require('react-async');

import {config} from '../config/config';

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

// Setup dependencies.
import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
import {WebApp} from './web/Webapp';

var errorLogRepository = new ErrorLogRepository(es);
var errorRepository = new ErrorRepository(es);
var errorService = new ErrorService(errorRepository, errorLogRepository);

/**
 * If a request is non ajax, return the server rendered html, otherwise call the callback.
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
      ReactAsync.renderComponentToStringWithAsyncState(WebApp({path: request.path}), (err, markup, data) => {
        if (err) {
          console.log('error', err);
          reply(err);
        } else {
          console.log('render', request.path);
          reply.view('index', { content: ReactAsync.injectIntoMarkup(markup, data)});
        }
      });
    }
  }
};

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
  errorLogRepository.getLatest()
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
var cache_unlimited = {privacy: 'public', expiresIn: 24 * 60 * 60 * 1000};
server.route({ method: 'GET', path: '/css/{p*}', config: {cache: cache_unlimited,  handler: { directory: { path: './build/css', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/js/{p*}', config: {cache: cache_unlimited, handler: { directory: { path: './build/js', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/font/{p*}', config: {cache: cache_unlimited, handler: { directory: { path: './src/web/static/font', listing: false, index: true } } } });

// Handler for 404.
server.route({ method: '*', path: '/{p*}', handler: reactProxy((request, reply) => {
  reply('The page was not found');
})});

// Start the server.
server.start();
