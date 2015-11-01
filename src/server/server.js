/* @flow weak */
import {getStore} from '../app/index';

/**
 * Returns configured server ready to start.
 *
 * @param dependencies
 * @returns {*}
 */
export default (dependencies) => {
  var {express} = dependencies;
  var store = getStore(dependencies);
  var app = express.Router();

  // Add rest endpoint
  app.use(require('./rest')(express, store));

  // Add react server rendering
  app.use(require('./react')(express));

  return app;
}
