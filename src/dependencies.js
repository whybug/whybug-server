/**
 * Wires up all dependencies.
 *
 * @flow weak
 */

// Load .env file
require('dotenv').load();

var config = require('../config/config');
var routes = require('../config/routes');
var uuid = require('node-uuid');
var elasticSearch = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port
});
var bus = require('./adapters/ServiceBus');
var search = require('./adapters/Search')(elasticSearch);
var mailer = require('./adapters/Mailer')();
var db = require('./adapters/Db')();
var express = require('express');
var expressApp = express();

// Configure express middleware
var bodyParser = require('body-parser');
expressApp.use(bodyParser.json());
var helmet = require('helmet');
expressApp.use(helmet());
if (config.web.csp) {
  var csp = require('helmet-csp');
  expressApp.use(csp(config.web.csp));
}

var server = require('http').createServer(expressApp);

// provides a method to start the server
server.listenApp = function (callback) {
  return server.listen(config.node.port, config.node.host, callback)
};

export default {
  bus,
  express,
  expressApp,
  db,
  mailer,
  routes,
  search,
  server
};

