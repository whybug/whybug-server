var events = require('events'),
    emitter = new events.EventEmitter(),
    hapi = require('hapi'),
    elasticsearch = require('elasticsearch');

// Create a server with a host and port.
var server = new hapi.Server('localhost', 8080);

// Setup classes and resolve dependencies.
var es = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// Setup event logging.
Array.prototype.map(function(eventName) {
  emitter.on(eventName, function() {
    server.log([eventName], arguments);
  });
}, [
  'ErrorLog.invalid',
  'ErrorLog.foundSimilar',
  'ErrorLog.created',
  'ErrorLog.error'
]);

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
    var errorLog = new ErrorLog(null, request.payload);

    // Validate ErrorLog.
    var validation = errorLog.validate();
    if (!validation.valid) {
      emitter.emit('ErrorLog.invalid', errorLog, validation.errors);
      return reply(400, {}, {'error': validation.errors});
    }

    errorService.handleNewErrorLog(errorLog, (error) => {
      reply(error);
    });
  }
});

// Start the server.
server.start();

