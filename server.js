require('newrelic');

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});

//var System = require('es6-module-loader').System;
require('./src/app.js');
