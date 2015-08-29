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
    Then I should be logged in

  Scenario: Signup using twitter
    When I select "twitter" as authentication provider
    And I authorize whybug
    Then I should be logged in

#  Move to login
#  Scenario: Automatic login
#    When A visitor has previously selected an authentication provider
#    Then The visitor should be logged in

