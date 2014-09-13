var superagent = require('superagent'),
  config = require('../../config/config'),
  routes = require('../../config/routes');

export class WhybugApi {

  static searchErrors(query, callback) {
    return request(routes.api.search_errors)
      .query({query: query})
      .end(notify(callback));
  }

}

var notify = (callback) => {
  return (error, result) => callback(error, result.body);
};

var request = (route) => {
  return superagent(route.method, config.web.url + route.path)
    .set('Accept', 'application/json');
};
