var cluster = require('cluster');
var numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  var System = require('es6-module-loader').System;
  require('./build/app.js');
}

