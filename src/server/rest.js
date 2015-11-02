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

  app.get(routes.api.search_solutions.path, async (req, res) => {
    res.send(await dispatch(searchSolutions(req.params.q || "")));
  });

  app.post('/api/rest/actions', async (req, res) => {
    res.send(await dispatch(req.body));
  });

  return app;
};

/**
 *
 * @param store
 * @param action
 * @returns {*}
 */
async function wrapDispatch(store, action) {
  try {
    return await store.dispatch({
      ...action,
      source: 'rest'
    });
  } catch(e) {
    return {
      error: e.message,
      details: e.details,
      payload: action
    };
  }
}
