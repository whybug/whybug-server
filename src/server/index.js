//require("babel/register");
require("babel-core/register");

var dependencies = require('../dependencies');
require('./server')(dependencies);
