var config = require('./config');

module.exports = {
  production: {
    client: 'mysql',
    connection: {
      host:     config.mysql.host,
      port:     config.mysql.port,
      database: config.mysql.db,
      user:     config.mysql.user,
      password: config.mysql.pass
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
