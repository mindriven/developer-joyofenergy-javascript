Feature: Meter data storage and retrieval

    Scenario: Data retrieval after storage returns same entries
        Given I have stored the following data for "test-meter-2"
            | time       | reading |
            | 1606636800 | 0.34    |
            | 1606636900 | 0.35    |
            | 1606636300 | 0.36    |
        When I retrieval the data for "test-meter-2"
        Then I get following readings
            | time       | reading |
            | 1606636800 | 0.34    |
            | 1606636900 | 0.35    |
            | 1606636300 | 0.36    |
