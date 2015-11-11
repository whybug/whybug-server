/* @flow weak */
module.exports = (dependencies) => {
  var {express, routes} = dependencies;
  var store = require('../app/index')(dependencies).getStore();
  var app = express.Router();

  // Add rest endpoint
  app.use(require('./rest')(express, store, routes));

  // Add react server rendering
  app.use(require('./react')(express));

  return app;
};

///**
// * Returns configured server ready to start.
// *
// * @param dependencies
// * @returns {*}
// */
//export default (dependencies) => {
//  console.log('server.js');
//
//}