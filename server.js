// Load environment variables.
require('dotenv').load();
require("babel/register");

// Include keymetrics modul
var pmx = require('pmx').init();

require('./src/app.js');
