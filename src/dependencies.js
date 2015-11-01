/**
 * Wires up all dependencies.
 *
 * @flow weak
 */

var config = require('../config/config');
var uuid = require('node-uuid');
var elasticSearch = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port
});
var bus = require('./adapters/ServiceBus');
var search = require('./adapters/Search')(elasticSearch);
var mailer = require('./adapters/Mailer')();
var db = require('./adapters/Db')();

//var EventStoreClient = require('event-store-client');
//var eventStore = new EventStore(
//  new EventStoreClient.Connection({
//    host: '127.0.0.1',
//    port: 1113,
//    debug: false
//  }),
//  {
//    username: 'admin',
//    password: 'changeit',
//    stream: '$stats-127.0.0.1:2113' // ????
//  }
//);

export default {
  bus,
  db,
  mailer,
  search
};

