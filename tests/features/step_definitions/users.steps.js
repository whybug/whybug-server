var myStepDefinitionsWrapper = function () {

    this.When(/^I select "([^"]*)" as login service$/, function (arg1, callback) {
        callback.pending();
    });

    this.When(/^I (accept|reject) whybug accessing my account$/, function (callback) {
        callback.pending();
    });

    this.Then(/^I should( not)? be signed up$/, function (callback) {
        events.contains(USER_SIGNED_UP);
        callback.pending();
    });

    this.Then(/^I should( not)? be logged in$/, function (callback) {
        events.contains(USER_LOGGED_IN);
        callback.pending();
    });

    this.Given(/^I'm signed up using "([^"]*)"$/, function (data, callback) {
        console.log(data);
        callback.pending();
    });
};
module.exports = myStepDefinitionsWrapper;
