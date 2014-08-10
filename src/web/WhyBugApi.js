var superagent = require('superagent');

import {config} from '../../config/config';

export class WhybugApi {

  static searchErrors(query, callback) {
    return request(config.route.api.search_errors)
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
