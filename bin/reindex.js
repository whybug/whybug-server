#!/usr/bin/env node
require("babel/register")({
  stage: 0,
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables'
  ]
});

var solutionRepository = require('../src/dependencies').solutionRepository;
solutionRepository.reindex().then(function() {
  process.exit();
});



