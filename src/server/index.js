/**
 * Server entry point.
 *
 * Starts a node process.
 */
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

