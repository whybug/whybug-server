var config = require('./config');

module.exports = {
  production: {
    client: 'mysql2',
    connection: {
      host:     config.mysql.host,
      port:     config.mysql.port,
      database: config.mysql.db,
      user:     config.mysql.user,
      password: config.mysql.password,
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
