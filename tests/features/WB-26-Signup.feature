Feature: WB-26 Signup
  As a visitor
  I want to sign up
  So that I can start using whybug.

  Scenario: Signup using google
    When I select "google" as login service
    And I accept whybug accessing my account
    Then I should be signed up
    And I should be logged in

  Scenario: Signup using github
    When I select "github" as login service
    And I accept whybug accessing my account
    Then I should be signed up
    And I should be logged in

  Scenario: Signup using twitter
    When I select "twitter" as login service
    And I accept whybug accessing my account
    Then I should be signed up
    And I should be logged in

  Scenario: Reject signup
    When I select "google" as login service
    And I reject whybug accessing my account
    Then I should not be signed up
    And I should not be logged in

  Scenario: Login when already signed up
    Given I'm signed up using "google"
    When I select "google" as login service
    And I accept whybug accessing my account
    Then I should not be signed up
    And I should be logged in

#  Move to login
#  Scenario: Automatic login
#    Given I have previously selected an authentication provider
#    When I visit the website
#    Then I should be logged in

