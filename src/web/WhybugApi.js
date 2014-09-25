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
   * Search for errors by specified query.
   *
   * @deprecated
   * @param query
   * @param callback
   * @returns {*}
   */
  static searchErrors(query, callback) {
    return request(routes.api.search_errors)
      .query({query: query})
      .end(notify(callback));
  }
}

/**
 * Calls specified callback with the response body.
 *
 * @param callback
 * @returns {Function}
 */
var notify = (callback) => {
  return (error, response) => callback(error, response.body);
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

  return superagent(route.method, config.web.url + path)
    .set('Accept', 'application/json');
};
