var superagent = require('superagent'),
  config = require('../../config/config'),
  routes = require('../../config/routes');

/**
 * Convenience API to access whybug data.
 */
export class WhybugApi {

  /**
   *
   * @param errorUuid
   * @param callback
   * @returns {Promise}
   */
  static findErrorByUuid(errorUuid, callback) {
    return request(routes.api.read_error, {error_uuid: errorUuid})
      .end(notify(callback));
  }

  /**
   *
   * @param callback
   * @returns {Promise}
   */
  static findUnsolvedErrors(callback) {
    return request(routes.api.unsolved_errors)
      .end(notify(callback));
  }

  /**
   *
   * @param solutionUuid
   * @param callback
   * @returns {Promise}
   */
  static findSolutionByUuid(solutionUuid, callback) {
    return request(routes.api.read_solution, {solution_uuid: solutionUuid})
      .end(notify(callback));
  }

  /**
   * Creates a new solution.
   *
   * @param solution
   * @param callback
   * @returns {*}
   */
  static createSolution(solution, callback) {
    return request(routes.api.create_solution)
      .send(solution)
      .end(notify(callback));
  }

  /**
   * Hides an error.
   *
   * @param error
   * @param callback
   * @returns {Promise}
   */
  static hideError(error, callback) {
    return request(routes.api.hidden_errors)
      .send(error)
      .end(notify(callback));
  }

  /**
   * Search for errors by specified query.
   *
   * @param query
   * @param callback
   * @returns {*}
   */
  static searchSolutions(query, callback) {
    return request(routes.api.search_solutions)
      .query({query: query})
      .end(notify(callback));
  }

  static setCookie(cookie) {
    WhybugApi.cookie = cookie;
  }
}

/**
 * Calls specified callback with the response body.
 *
 * @param callback
 * @returns {Function}
 */
var notify = (callback) => {
  return (error, response) => {
    if (response.status !== 200) {
      callback(response.body, null);
    } else {
      callback(error, response.body);
    }
  }
};

/**
 * Creates a superagent request with specified route definition
 * and path parameters.
 *
 * @param route
 * @param pathParams
 *
 * @returns {superagent}
 */
var request = (route, pathParams = {}) => {
  // Replace params in path.
  var path = route.path;
  for (var param in pathParams) {
    if (pathParams.hasOwnProperty(param)) {
      path = path.replace("{" + param + "}", pathParams[param]);
    }
  }

  var http = superagent(route.method, config.web.url + path)
    .set('Accept', 'application/json');

  if (WhybugApi.cookie) {
    http.set('Cookie', WhybugApi.cookie);
  }

  return http;
};

