// Load environment variables.
require('dotenv').load();

require('babel/register')({
  stage: 0,
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables'
  ]
});

require('./src/app.js');
