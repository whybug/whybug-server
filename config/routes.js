var cache_2min = {privacy: 'public', expiresIn: 2 * 60 * 1000};

/**
 * Routes for frontend (client) and backend (server).
 *
 * Uses hapijs style declarations, see http://hapijs.com/tutorials.
 */
module.exports =  {
  /**
   * Client endpoints.
   *
   * These routes are available on the client (single page app) and on the server (returns rendered HTML).
   */
  web: {
    // StartPage, returns HTML.
    startpage: { method: 'GET', path: '/', config: { cache: cache_2min, auth: { mode: 'try', strategy: 'session'} } },

    // Login, only redirect.
    login: {
      github: { method: ['GET', 'POST'], path: '/login/github', config: { auth: 'github' } },
      twitter: { method: ['GET', 'POST'], path: '/login/twitter', config: { auth: 'twitter' } },
      google: { method: ['GET', 'POST'], path: '/login/google', config: { auth: 'google' } }
    },

    // Logout, only redirect.
    logout: { method: 'GET', path: '/logout', config: { auth: 'session' } },

    // SolutionPage, returns HTML.
    solution_search: { method: 'GET', path: '/solutions' },

    // ErrorPage, returns HTML.
    solution: { method: 'GET', path: '/solutions/:programmingLanguage/:errorMessageSlug' },

    // URL shortener, redirects to a solution.
    url_shortener: { method: 'GET', path: '/s/{p*}' }
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
    //update_error: { method: 'PUT', path: '/api/errors/{error_uuid}' },

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
