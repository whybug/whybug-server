require("babel/register")({
  stage: 0,
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables'
  ]
});

// Include keymetrics modul
var pmx = require('pmx').init();
// Include keymetrics modul

require('./src/app.js');
