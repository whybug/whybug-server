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

    // Solutions, returns HTML.
    solution: {
      search: { method: 'GET', path: '/solutions' },
      create: { method: 'GET', path: '/solutions/create/:error_uuid' },
      view: { method: 'GET', path: '/solutions/:language/:slug' }
    },

    // Installation, returns HTML.
    installation: {
      index: { method: 'GET', path: '/installation', config: { cache: cache_2min} },
      language: { method: 'GET', path: '/installation/:language', config: { cache: cache_2min} }
    },

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
    create_action: { method: 'POST', path: '/api/rest/actions' },

    create_query: { method: 'POST', path: '/api/rest/queries' },

    // Read a error.
    //read_error: { method: 'GET', path: '/api/errors/{error_uuid}' },

    // List of unsolved errors.
    //unsolved_errors: { method: 'GET', path: '/api/errors/unsolved', config: { auth: 'session' } },

    // Add an error to the list of hidden errors.
    //hidden_errors: { method: 'POST', path: '/api/errors/hidden' },

    // Search for errors.
    search_solutions: { method: 'GET', path: '/api/solutions' },

    // Create a new error, with JSON payload. Returns solutions as JSON.
    find_solutions_for_error: { method: 'POST', path: '/api/solutions/error', config: { cors: true } },

    // Create a solution, with JSON payload.
    //create_solution: { method: 'POST', path: '/api/solutions' },

    // Read a solution.
    //read_solution: { method: 'GET', path: '/api/solutions/{solution_uuid}' },

    // Update a solution, with JSON payload.
    //update_solution: { method: 'PUT', path: '/api/solutions/{solution_uuid}', config: { auth: 'session' } },

    // Delete a solution, with JSON payload.
    //delete_solution: { method: 'DELETE', path: '/api/solutions/{error_uuid}' }
  }
};
