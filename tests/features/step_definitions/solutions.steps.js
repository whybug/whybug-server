var myStepDefinitionsWrapper = function () {
  this.Given(/^There are no solutions$/, function (callback) {
    callback.pending();
  });

  this.When(/^I search for "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });

  this.Then(/^I should see no solutions$/, function (callback) {
    callback.pending();
  });

  this.Given(/^There are the following solutions$/, function (callback) {
    callback.pending();
  });

  this.When(/^I filter for the (programming\ language|operating\ system|error\ level) "([^"]*)"$/, function (arg1, callback) {
    callback.pending();
  });

  this.Then(/^I should see solution[s]? ([^$]*)$/, function (arg1, arg2, callback) {
    callback.pending();
  });
};
module.exports = myStepDefinitionsWrapper;
