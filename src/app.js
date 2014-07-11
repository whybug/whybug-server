var hapi = require('hapi'),
    elasticsearch = require('elasticsearch');

// Create a server with a host and port.
var server = new hapi.Server('localhost', 8080);

// Setup classes and resolve dependencies.
var es = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// Setup dependencies.
import {ErrorService} from './domain/ErrorService';
import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorLogRepository} from './domain/ErrorLogRepository';
import {ErrorLog} from './domain/ErrorLog';
var errorService = new ErrorService(new ErrorRepository(es), new ErrorLogRepository(es));

// Add the routes.
server.route({
  method: 'POST',
  path: '/error',
  handler: (request, reply) => {
    errorService.handleNewErrorLog(new ErrorLog(null, request.payload))
      .then((solutions) => {
        reply(solutions);
      }).catch((validation) => {
        reply({error: validation.errors}).code(400);
      });
  }
});

// Start the server.
server.start();

