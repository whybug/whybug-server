/**
 * Wires up all dependencies.
 */
export var ReactAsync = require('react-async');
export var config = require('../config/config');
export var routes = require('../config/routes');

export var server = new (require('hapi')).Server(config.node.host, config.node.port, {
  views: {
    engines: {
      html: require('handlebars')
    },
    path: 'src/web/templates'
  },
  debug:{ request: ['error'] }
});

export var es = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: config.debug ? 'trace' : 'warning'
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
    charset  : 'utf8'
  }
});

export var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
