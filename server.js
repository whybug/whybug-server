require("babel/register")({
  stage: 0,
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables'
  ]
});

// Include keymetrics modul
var pmx = require('pmx').init();

require('./src/app.js');
