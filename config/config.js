export var config = {
  debug: process.env.DEBUG || false
};

var cache_2min = {privacy: 'public', expiresIn: 2 * 60 * 1000};

/**
 * Routes for frontend (client) and backend (server).
 *
 * Uses hapijs style declarations, see http://hapijs.com/tutorials.
 */
config.route = {

  /**
   * Client endpoints.
   *
   * These routes are available on the client (single page app) and on the server (returns rendered HTML).
   */
  web: {
    // StartPage, returns HTML.
    startpage: { method: 'GET', path: '/', config: { cache: cache_2min }},

    // LoginPage, returns HTML.
    login: { method: 'GET', path: '/login' },

    // SearchPage, returns HTML.
    search_errors: { method: 'GET', path: '/solutions' },

    // ErrorPage, returns HTML.
    read_error: { method: 'GET', path: '/error/{programmingLanguage}/{errorMessageSlug}' },

    // URL shortener, redirects to error.
    url_shortener: { method: 'GET', path: '/e/{p*}' }
  },

  /**
   * Web API endpoints.
   *
   * These routes are available only on the server. They may be used internally
   * when rendering HTML on the server.
   */
  api: {
    // Create a new error, with JSON payload. Returns solutions as JSON.
    create_error: { method: 'POST', path: '/api/errors' },

    // Update an existing error, with JSON payload. Returns nothing.
    update_error: { method: 'PUT', path: '/api/errors/{error_uuid}' },

    // Search for errors.
    search_errors: { method: 'GET', path: '/api/errors' },

    // Create a solution to an error, with JSON payload.
    create_solution: { method: 'POST', path: '/api/errors/{error_uuid}/solutions' },

    // Update a solution, with JSON payload.
    update_solution: { method: 'PUT', path: '/api/errors/{error_uuid}/solutions/{solution_uuid}' },

    // Update a solution, with JSON payload.
    delete_solution: { method: 'DELETE', path: '/api/errors/{error_uuid}/solutions/{solution_uuid}' }
  }
};

config.web = {
  // Url where to access whybug, NO trailing slash.
  url: process.env.WEB_URL || 'http://whybug.com'
};

config.node = {
  host: process.env.WEB_HOST || '127.0.0.1',
  port: process.env.WEB_PORT || 8000
};

config.mysql = {
  host: process.env.MYSQL_URL || 'localhost',
  port: process.env.MYSQL_URL || 3360,
  user: process.env.MYSQL_USER || '',
  pass: process.env.MYSQL_PASS || ''
};

config.elasticsearch = {
  host: process.env.ES_URL || 'localhost',
  port: process.env.ES_URL || 9200
};
