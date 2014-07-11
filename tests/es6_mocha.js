var Traceur = require('traceur'),
    chai = require("chai"),
    should = chai.should();

// Traceur will compile all JS aside from node modules
Traceur.require.makeDefault(function(filename) {
  return !(/node_modules/.test(filename));
});
