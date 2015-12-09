Feature: Search solutions
    As website user
    I want to search for solutions
    So that I can solve the error I have without using a client.

    Background:
        Given There are the following solutions
            | id | message           | programing language | os    | error level |
            | 1  | Invalid Argument  | php                 | osx   | error       |
            | 2  | Runtime Exception | php                 | win   | notice      |
            | 3  | Invalid Argument  | javascript          | linux | warning     |

    Scenario: Search for error message
        When I search for "Invalid Argument"
        Then I should see solutions 1 and 3

    Scenario: No search yet
        When I search for ""
        Then I should see solutions 1, 2 and 3

    Scenario: No solution found
        When I search for "not existing"
        Then I should see no solutions

    Scenario: Filter for programming language
        When I filter for the programming language "php"
        Then I should see solutions 1 and 2

    Scenario: Filter for operating system
        When I filter for the operating system "osx"
        Then I should see solution 1

    Scenario: Filter for error level
        When I filter for the error level "warning"
        Then I should see solution 3

    Scenario: Combine search and filter
        When I search for "Invalid Argument"
        And I filter for the programming language "php"
        Then I should see solution 1
