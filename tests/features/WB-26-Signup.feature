Feature: WB-26 Signup
  As a visitor
  I want to sign up
  So that I can start using whybug.

  Scenario: Signup using google
    When I select "google" as authentication provider
    And I authorize whybug
    Then I should be signed up
    And I should be logged in

  Scenario: Signup using github
    When I select "github" as authentication provider
    And I authorize whybug
    Then I should be signed up
    Then I should be logged in

  Scenario: Signup using twitter
    When I select "twitter" as authentication provider
    And I authorize whybug
    Then I should be signed up
    Then I should be logged in

#  Move to login
#  Scenario: Automatic login
#    Given I have previously selected an authentication provider
#    When I visit the website
#    Then I should be logged in

