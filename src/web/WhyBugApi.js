var superagent = require('superagent');

import {config} from '../../config/config';

export class WhybugApi {

  static searchErrors(callback) {
    return WhybugApi.request(config.route.api.search_errors, callback);
  }

  static request(route, callback) {
    return superagent(route.method, config.web.url + route.path)
          .set('Accept', 'application/json')
          .end((error, result) => callback(error, result.body));
  }

}


