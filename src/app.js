var hapi = require('hapi'),
    elasticsearch = require('elasticsearch'),
//    mysql = require('mysql-promise'),
    ReactAsync = require('react-async');

// Create a server with a host and port.
var server = new hapi.Server('localhost', 8000);

// Setup classes and resolve dependencies.
var es = new elasticsearch.Client({
  host: 'localhost:9200'
  , log: 'trace'
});
//var mysqlPool =  mysql.createPool({
//  host : 'localhost',
//  user : 'root',
//  password: ''
//});

// Setup dependencies.
import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
import {WebApp} from './web/Webapp';

var errorLogRepository = new ErrorLogRepository(es);
var errorRepository = new ErrorRepository(es);
var errorService = new ErrorService(errorRepository, errorLogRepository);

// Add the routes.

/*
Client endpoints:
  POST /error {payload} ; returns solutions
*/

/*
Web endpoints:
 Return either HTML (non-ajax) or JSON (ajax).

 GET /  ; web, StartPage, HTML or JSON
 GET /error/{programmingLanguage}/{errorMessageSlug}  ; ErrorPage, HTML or JSON

 POST /api/error/{error_uuid} {payload}  ; update error

 PUT /api/error/{error_uuid}/solution/ {payload}  ; add a solution to an error
 POST /api/error/{error_uuid}/solution/{solution_uuid} {payload}  ; change a solution to an error
 DELETE /api/error/{error_uuid}/solution/{solution_uuid}  ; delete a solution from an error
 */


// Client routes.
server.route({
  method: 'POST',
  path: '/error',
  handler: (request, reply) => {
    errorService
      .handleNewErrorLog(new ErrorLog(null, request.payload))
      .then(reply)
      .catch((validation) => {
        reply({error: validation.errors}).code(400);
      });
  }
});

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
          reply(err).code(500);
        } else {
          markup = ReactAsync.injectIntoMarkup(markup, data);
          console.log('render', request.path);
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

// Web routes.

// Startpage
server.route({ method: 'GET', path: '/', handler: reactProxy((request, reply) => { reply({}); }) });

// Api routes.
server.route({
  method: 'GET',
  path: '/api/error_logs/latest',
  config: {
    handler: (request, reply) => {
      errorLogRepository.getLatest()
        .then(reply)
        .catch((err) => {reply(err).code(500)});
    },
    cache: {
      expiresIn: 60 * 60 * 1000 // 1 hour
    }
  }
});

// Serve static files from `static` dir.
server.route({ method: 'GET', path: '/css/{p*}', handler: { directory: { path: './src/web/static/css', listing: false, index: true } } });
server.route({ method: 'GET', path: '/js/{p*}', handler: { directory: { path: './src/web/static/js', listing: false, index: true } } });
server.route({ method: 'GET', path: '/font/{p*}', handler: { directory: { path: './src/web/static/font', listing: false, index: true } } });

// Handler for 404
server.route({ method: '*', path: '/{p*}', handler: reactProxy((request, reply) => {
  reply('The page was not found').code(404);
})});


// Start the server.
server.start();

