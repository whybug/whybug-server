/* @flow weak */

/**
 * REST API for the domain.
 *
 * Takes actions and passes them to the domain to be handled.
 */
export default (express, store) => {
  var app = express.Router();

  app.post('/api/rest/actions', (req, res) => {
    const action = {
      ...req.body,
      source: 'rest'
    };

    try {
      store.dispatch(action);
      res.send({});
    } catch(e) {
      res.send({
        error: e.message,
        details: e.details,
        payload: request.payload
      });
    }
  });

  return app;
}
