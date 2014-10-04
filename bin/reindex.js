#!/usr/bin/env node

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
}, {experimental: true});


var solutionRepository = require('../src/dependencies').solutionRepository;
solutionRepository.reindex();


