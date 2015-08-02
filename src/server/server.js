/* @flow */
var Joi = require('joi');
var Hapi = require('hapi');
var config = require('../../config/config');

import {RestPlugin} from './rest';
import {GraphQLPlugin} from './graphql';
import {store} from '../app/index';

var server = new Hapi.Server({debug: { request: ['error']} });
server.connection({
  host: config.node.host,
  port: config.node.port
});

const options = {
  store
};

server.register([
  { register: RestPlugin, options },
  { register: GraphQLPlugin, options }
], () => {

  // Start the server.
  server.start(() => {
    console.log('Server started at: ' + server.info.uri);
  });
});

// Iojs unhandled rejections.
process.on('unhandledRejection', function (err, p) {
  console.error('Caught an unhandled rejection, make sure to always `catch`.');
  console.error(err.stack)
});
