/* @flow weak */
/**
 * Returns configured server ready to start.
 *
 * @param dependencies
 * @returns {*}
 */
module.exports = (dependencies) => {
    var {express, routes, search, db} = dependencies;
    var store = require('../app/index')(dependencies).getStore();
    var app = express.Router();

    // Add healthcheck endpoint
    app.use(require('./healthcheck')(express, db, search));

    // Add rest endpoint
    app.use(require('./rest')(express, store, routes));

    // Add react server rendering
    app.use(require('./react')(express));

    return app;
};
