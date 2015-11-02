/* @flow weak */

import {searchSolutions} from '../app/Solution/Action/SearchSolutions';

/**
 * REST API for the domain.
 *
 * Takes actions and passes them to the domain to be handled.
 */
module.exports = (express, store, routes) => {
  var app = express.Router();
  var dispatch = wrapDispatch.bind(null, store);

  app.get(routes.api.search_solutions.path, (req, res) => {
    dispatch(res, searchSolutions(req.params.q || ""));
  });

  app.post('/api/rest/actions', (req, res) => {
    dispatch(res, req.body);
  });

  return app;
};

/**
 *
 * @param store
 * @param res
 * @param action
 * @returns {*}
 */
async function wrapDispatch(store, res, action) {
  try {
    var body = await store.dispatch({
      ...action,
      source: 'rest'
    });
    res.status(200).send(body);
  } catch(e) {
    res.status(400).send({
      error: e.message,
      details: e.details,
      payload: action
    });
  }
}
