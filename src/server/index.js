/**
 * Server entry point.
 *
 * Starts a node process.
 */

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

server.listenApp(function(err) {
  if (err) throw err;

  var address = server.address();
  console.log('Listening at http://%s:%d', address.address, address.port);
});

// Iojs unhandled rejections.
process.on('unhandledRejection', function (err, p) {
  console.error('Caught an unhandled rejection, make sure to always `catch`.');
  console.error(err.stack)
});


