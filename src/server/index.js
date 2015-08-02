require("babel/register")({
  stage: 0,
  optional: [
    'runtime',
    'utility.inlineEnvironmentVariables'
  ]
});

require('./server');
