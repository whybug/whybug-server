/**
 * Server entry point.
 *
 * Starts a node process.
 */

var process = require('process');
require('babel-runtime/core-js/promise').default = require('bluebird');

//if (process.env.NODE_ENV === 'production') {
//  var raven = require('raven');
//  var SENTRY_DSN = 'https://<DSN>@app.getsentry.com/...';
//  var client = new raven.Client(SENTRY_DSN);
//  client.patchGlobal();
//}

var dependencies = require('../dependencies');
var {expressApp, server} = dependencies;

expressApp.use(require('./server')(dependencies));

// Startup HTTP server
server.listenApp(function (err) {
    if (err) throw err;

    var address = server.address();
    if (process.send) process.send('online');
    console.log('Listening at http://%s:%d', address.address, address.port);
});

// Register shutdown hooks
process.on('message', function(message) {
    const {db, search} = dependencies;
    // db.close();
    // search.close();
    server.close();

    if (message === 'shutdown') {
        process.exit(0);
    }
});

// Iojs unhandled rejections.
process.on('unhandledRejection', function (err, p) {
    console.error('Caught an unhandled rejection, make sure to always `catch`.');
    console.error(err.stack)
});


