/**
 * Credentials and general configuration.
 *
 * Can be overwritten by a `envvars` file.
 */
var config = {
  debug: process.env.DEBUG || false,
  web: {
    // Url where to access whybug, NO trailing slash.
    url: process.env.WEB_URL || 'http://127.0.0.1:8000'
  }
};

if (typeof __BROWSER__ == 'undefined' || __BROWSER__ === false) {

  config.web.session_password = process.env.SESSION_PASSWORD || '';

  config.node = {
    host: process.env.WEB_HOST || '127.0.0.1',
    port: process.env.WEB_PORT || 8000
  };

  config.mysql = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    db:   process.env.MYSQL_DB || 'whybug',
    user: process.env.MYSQL_USER || '',
    pass: process.env.MYSQL_PASS || ''
  };

  config.elasticsearch = {
    host: process.env.ES_URL || '127.0.0.1',
    port: process.env.ES_URL || 9200
  };

  // For authentication options see https://github.com/hapijs/bell
  config.github = {
    password: process.env.GITHUB_COOKIE_PASSWORD || 'some-pw-for-testing',
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
  };

  config.twitter = {
    password: process.env.TWITTER_COOKIE_PASSWORD || 'some-pw-for-testing',
    clientId: process.env.TWITTER_CLIENT_ID || '',
    clientSecret: process.env.TWITTER_CLIENT_SECRET || ''
  };

  config.google = {
    password: process.env.GOOGLE_COOKIE_PASSWORD || 'some-pw-for-testing',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  };
}

module.exports = config;

