var Traceur = require('traceur'),
    chai = require("chai"),
    sinonChai = require("sinon-chai"),
    chaiAsPromised = require("chai-as-promised"),
    should = chai.should();

chai.use(sinonChai);
chai.use(chaiAsPromised);

// Traceur will compile all JS aside from node modules
Traceur.require.makeDefault(function(filename) {
  return !(/node_modules/.test(filename));
}, {experimental: true});

