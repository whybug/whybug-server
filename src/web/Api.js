var superagent = require('superagent');

import {config} from '../../config/config';

export class Api {

  static searchErrors(cb) {
    return Api.request(config.route.api.search_errors).end((err, result) => {
      if (err) {
        cb(err, {error_logs: []});
        return;
      }

      cb(err, {error_logs: result.body});
    });
  }

  static request(route) {
    return superagent(route.method, config.web.url + route.path)
          .set('Accept', 'application/json')
  }

}


