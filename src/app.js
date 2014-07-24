var hapi = require('hapi'),
    elasticsearch = require('elasticsearch'),
//    mysql = require('mysql-promise'),
    ReactAsync = require('react-async');

// Setup dependencies.
import {config} from './config';
import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
import {WebApp} from './web/Webapp';

//var mysqlPool =  mysql.createPool({
//  host : 'localhost',
//  user : 'root',
//  password: ''
//});
var server = new hapi.Server(config.node.host, config.node.port);
var es = new elasticsearch.Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: config.debug ? 'trace' : 'warning'
});
var errorLogRepository = new ErrorLogRepository(es);
var errorRepository = new ErrorRepository(es);
var errorService = new ErrorService(errorRepository, errorLogRepository);
var cache_unlimited = {privacy: 'public', expiresIn: 24 * 60 * 60 * 1000};
var cache_2min = {privacy: 'public', expiresIn: 2 * 60 * 1000};

var route = (route, options) => {
  for (var name in options) {
    route[name] = options[name];
  }
  server.route(route);
};

/**
 * If a request is non ajax, return the server rendered html, otherwise call the callback.
 *
 * @param callback
 * @returns {Function}
 */
var reactProxy = (callback) => {
  return (request, reply) => {
    if ("X-Requested-With" in request.headers) {
      // is ajax request
      callback(request, reply);
    } else {
      ReactAsync.renderComponentToStringWithAsyncState(WebApp({path: request.path}), (err, markup, data) => {
        if (err) {
          console.log(err);
          reply(err);
        } else {
          markup = ReactAsync.injectIntoMarkup(markup, data);
          console.log('render', request.path);
          // Todo: Extract somewhere else!!!
          var deferScript = '<script type="text/javascript"> \
          function downloadJSAtOnload() { \
            var element = document.createElement("script"); \
            element.src = "js/bundle.js"; \
            document.body.appendChild(element); \
          } \
          if (window.addEventListener) \
            window.addEventListener("load", downloadJSAtOnload, false); \
          else if (window.attachEvent) \
            window.attachEvent("onload", downloadJSAtOnload); \
          else window.onload = downloadJSAtOnload; \
        </script>';
          reply("<!DOCTYPE html>" + markup.replace('</body>', deferScript + '$&'));
        }
      });
    }
  }
};

// Api routes.
route(config.route.api.create_error, { handler: (request, reply) => {
  errorService
    .handleNewErrorLog(new ErrorLog(null, request.payload))
    .then(reply)
    .catch((validation) => {
      reply({error: validation.errors});
    });
}});

route(config.route.api.search_errors, { handler: (request, reply) => {
  errorLogRepository.getLatest()
    .then(reply)
    .catch((err) => {reply(err)});
}});

// Web routes.
route(config.route.web.startpage, {
  config: cache_2min,
  handler: reactProxy((request, reply) => {
    reply({});
  })
});

// Serve static files from `static` dir.
server.route({ method: 'GET', path: '/css/{p*}', config: {cache: cache_unlimited,  handler: { directory: { path: './src/web/static/css', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/js/{p*}', config: {cache: cache_unlimited, handler: { directory: { path: './src/web/static/js', listing: false, index: true } } } });
server.route({ method: 'GET', path: '/font/{p*}', config: {cache: cache_unlimited, handler: { directory: { path: './src/web/static/font', listing: false, index: true } } } });

// Handler for 404
server.route({ method: '*', path: '/{p*}', handler: reactProxy((request, reply) => {
  reply('The page was not found');
})});

// Start the server.
server.start();

