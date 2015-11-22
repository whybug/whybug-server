import {REST} from '../app/Common/Domain/Sources';

export function wrapQuery(store, query) {
  return store.query(setSource(query));
}

export function wrapDispatch(store, action) {
  return store.dispatch(setSource(action));
}

/**
 * Catch errors and transform them to responses.
 *
 * @param {Object} app Express app
 * @param {{method: string, path: string}} route
 * @param {Func} handler Callback returning promise.
 */
export function wrapRoute(app, route, handler: Function) {
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
  return {...item, source: REST};
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
