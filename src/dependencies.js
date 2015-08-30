/**
 * Wires up all dependencies.
 */

var EventStoreClient = require('event-store-client');
export var config = require('../config/config');
export var routes = require('../config/routes');
import EventStore from './persistance/EventStore';

export var elasticSearch = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port
});

export var eventStore = new EventStore(
  new EventStoreClient.Connection({
    host: '127.0.0.1',
    port: 1113,
    debug: false
  }),
  {
    username: 'admin',
    password: 'changeit',
    stream: '$stats-127.0.0.1:2113' // ????
  }
);

export var persistances = {
  elasticSearch,
  eventStore
};

