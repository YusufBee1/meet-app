Feature: Specify Number of Events

    Scenario: Default number of events is 32
        Given the app is loaded
        When the user hasn’t specified a number
        Then the default number of events displayed should be 32

    Scenario: User can change the number of events
        Given the user wants to change the number of events
        When the user types a new number in the textbox
        Then the app should display the specified number of events