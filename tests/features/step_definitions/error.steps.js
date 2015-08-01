var myStepDefinitionsWrapper = function () {

  var error;

  this.Given(/^An error with message "([^"]*)" occurs$/, function (arg1, callback) {
    callback.pending();
  });

  this.Then(/^The error should be recorded$/, function (callback) {
    callback.pending();
  });

  this.Given(/^There is a solution for "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });

  this.Then(/^I should get a solution for the error$/, function (callback) {
    callback.pending();
  });

  this.Then(/^I should not get a solution for the error$/, function (callback) {
    callback.pending();
  });
};
module.exports = myStepDefinitionsWrapper;
