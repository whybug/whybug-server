/* @flow weak */

import {searchSolutions} from '../app/Solution/Query/SearchSolutions';
import {recordError} from '../app/Error/Action/RecordError';

/**
 * REST API for the domain.
 *
 * Takes actions and passes them to the domain to be handled.
 */
module.exports = (express, store, routes) => {
  var app = express.Router();
  var route = wrapRoute.bind(null, app);
  var dispatch = wrapDispatch.bind(null, store);
  var query = wrapQuery.bind(null, store);

  route(routes.api.create_query, (req) => query(req.body));
  route(routes.api.create_action, (req) => dispatch(req.body));
  route(routes.api.search_solutions, (req) => query(searchSolutions(req.params.q)));

  return app;
};

function wrapQuery(store, query) {
  return store.query(setSource(query));
}

function wrapDispatch(store, action) {
  return store.dispatch(setSource(action));
}

function wrapRoute(app, route, callback) {
  var method = route.method.toLowerCase();

  app[method](route.path, async (req, res) => {
    try {
      res.status(200).send(await callback(req, res));
    } catch(e) {
      res.stats(400).send(formatException(e, req.body));
    }
  });
}

function setSource(item) {
  return {...item, source: 'rest'};
}

function formatException(e, payload) {
  return {
    error: e.message,
    details: e.details,
    payload: payload
  };
}
