Feature: Comparing plans for a meter

    Scenario: Rates calculation
        Given I have stored the following data for "test-meter-3"
            | time       | reading |
            | 1606633200 | 0.5     |
            | 1606636800 | 0.1     |
        When I compare all the plans recommendations for "test-meter-3"
        Then I get following recommendations
            | plan         | rate |
            | price-plan-2 | 0.3  |
            | price-plan-1 | 0.6  |
            | price-plan-0 | 3.0  |