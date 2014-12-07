/**
 * Wires up all dependencies.
 */
export var ReactAsync = require('react-async');
export var config = require('../config/config');
export var routes = require('../config/routes');
export var Joi = require('joi');
export var Hapi = require('hapi');

export var server = new Hapi.Server(config.node.host, config.node.port, {
  debug: { request: ['error'] },
  cors: {
    methods: ['POST']
  }
});

// Register main layout.
server.views({
  engines: {
    html: require('handlebars')
  },
  path: 'src/web/common'
});


export var es = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: require('elasticsearch-hapi-logger')(server)
});

var knex = require('knex')({
  debug: config.debug,
  client: 'mysql',
  connection: {
    host:     config.mysql.host,
    port:     config.mysql.port,
    database: config.mysql.db,
    user:     config.mysql.user,
    password: config.mysql.pass,
    charset  : 'utf8',
    timezone: 'UTC'
  }
});

export var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

import {ErrorRepository} from './domain/ErrorRepository';
import {ErrorService} from './domain/ErrorService';
import {SolutionRepository} from './domain/SolutionRepository';
import {SolutionService} from './domain/SolutionService';
import {UserRepository} from './domain/UserRepository';
import {UserProfile} from './domain/UserProfile';
import {UserProfileRepository} from './domain/UserProfileRepository';
import {UserService} from './domain/UserService.js';

export var solutionRepository = new SolutionRepository(es, bookshelf);
export var errorRepository = new ErrorRepository(es, bookshelf);
export var errorService = new ErrorService(errorRepository);
export var solutionService = new SolutionService(solutionRepository, errorRepository);
var userRepository = new UserRepository(bookshelf);
var userProfileRepository = new UserProfileRepository(bookshelf);
export var userService = new UserService(userRepository, userProfileRepository);
