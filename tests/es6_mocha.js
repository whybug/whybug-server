var Traceur = require('traceur'),
    chai = require("chai"),
    sinonChai = require("sinon-chai"),
    chaiAsPromised = require("chai-as-promised"),
    React = require('react/addons'),
    chaiReact = require("chai-react"),
    should = chai.should();

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(function (chai, utils) { return chaiReact(chai, utils, React) });

// Traceur will compile all JS aside from node modules
Traceur.require.makeDefault(function(filename) {
  return !(/node_modules/.test(filename));
}, {asyncFunctions: true});

