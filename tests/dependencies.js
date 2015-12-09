var chai = require("chai"),
    sinonChai = require("sinon-chai"),
    chaiAsPromised = require("chai-as-promised"),
    React = require('react/addons'),
    chaiReact = require("chai-react"),
    should = chai.should();

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(function (chai, utils) {
    return chaiReact(chai, utils, React)
});

