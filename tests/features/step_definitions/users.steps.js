var myStepDefinitionsWrapper = function () {

  this.When(/^I select "([^"]*)" as authentication provider$/, function (arg1, callback) {
    callback.pending();
  });

  this.When(/^I authorize whybug$/, function (callback) {
    callback.pending();
  });

  this.Then(/^I should be signed up$/, function (callback) {
    events.contains(USER_SIGNED_UP);
    callback.pending();
  });

  this.Then(/^I should be logged in$/, function (callback) {
    events.contains(USER_LOGGED_IN);
    callback.pending();
  });
};
module.exports = myStepDefinitionsWrapper;
