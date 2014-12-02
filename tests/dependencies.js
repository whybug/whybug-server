export var config = require('../config/config');
export var es = new (require('elasticsearch')).Client({
  host: config.elasticsearch.host + ':' + config.elasticsearch.port,
  log: 'info'
});


export var knex = require('knex')({
  debug: false,
  client: 'mysql',
  connection: {
    host:     config.mysql.host,
    port:     config.mysql.port,
    database: config.mysql.db,
    user:     config.mysql.user,
    password: config.mysql.pass,
    charset:  'utf8',
    timezone: 'UTC'
  }
});

export var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
