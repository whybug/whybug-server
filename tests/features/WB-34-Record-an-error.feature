Feature: WB-34 Record an error
  As a API user
  I want to record an error that happened on my computer
  So that I can get a solution for it

  Scenario: Successfully record an error
    When An error with message "Undefined index" occurs
    Then The error should be recorded

  Scenario: Solution found
    Given There is a solution for "Undefined index"
    When An error with message "Undefined index" occurs
    Then I should get a solution for the error

  Scenario: Solution not found
    When An error with message "Undefined index" occurs
    Then I should not get a solution for the error

