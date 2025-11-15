Feature: Specify Number of Events

  Scenario: Default number of events is 32
    Given the user opens the app
    When the list of events is displayed
    Then 32 events should be shown by default

  Scenario: User can change the number of events displayed
    Given the list of events is visible
    When the user sets the number of events to 2
    Then only 2 events should be displayed
