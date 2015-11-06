/* @flow weak */

import {searchSolutions} from '../app/Solution/Query/SearchSolutions';
import {recordError} from '../app/Error/Action/RecordError';
import {findSolutionsForError} from '../app/Solution/Query/FindSolutionForError';

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
  route(routes.api.search_solutions, (req) =>
    // todo: frontend could also use the query endpoint
    // maybe remove this later
    query(searchSolutions(req.params.q))
  );

  return app;
};

function wrapQuery(store, query) {
  return store.query(setSource(query));
}

function wrapDispatch(store, action) {
  return store.dispatch(setSource(action));
}

/**
 * Catch errors and transform them to responses.
 *
 * @param {Object} app Express app
 * @param {{method: string, path: string}} route
 * @param {Func} handler Callback returning promise.
 */
function wrapRoute(app, route, handler: Function) {
  var method = route.method.toLowerCase();

  app[method](route.path, async (req, res) => {
    try {
      res.status(200).send(await handler(req, res));
    } catch(e) {
      res.status(400).send(formatException(e, req.body));
    }
  });
}

/**
 * Sets source of the action/query/event to rest.
 *
 * @param item
 * @returns {{source: string}}
 */
function setSource(item) {
  return {...item, source: 'rest'};
}

/**
 * Formats an exception to a JSON response.
 *
 * @param {Error} e exception object
 * @param {Object} payload Payload sent to the API.
 * @returns {{error: string, details: Object, payload: Object}}
 */
function formatException(e, payload = {}) {
  return {
    error: e.message || 'Unknown error',
    details: e.details || {},
    payload: payload
  };
}
