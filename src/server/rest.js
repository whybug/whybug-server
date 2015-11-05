/* @flow weak */

import {searchSolutions} from '../app/Solution/Query/SearchSolutions';

/**
 * REST API for the domain.
 *
 * Takes actions and passes them to the domain to be handled.
 */
module.exports = (express, store, routes) => {
  var app = express.Router();
  var dispatch = wrapDispatch.bind(null, store);
  var query = wrapQuery.bind(null, store);

  app.get(routes.api.search_solutions.path, async (req, res) => {
    query(res, searchSolutions(req.params.q));
  });

  app.post('/api/rest/queries', async (req, res) => {
    query(res, req.body);
  });

  app.post('/api/rest/actions', (req, res) => {
    dispatch(res, req.body);
  });

  return app;
};


async function wrapQuery(store, res, query) {
  try {
    var body = await store.query({
      ...query,
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
