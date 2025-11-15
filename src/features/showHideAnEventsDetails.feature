Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user opens the Meet app
    When the list of upcoming events is displayed
    Then each event element should be collapsed by default

  Scenario: User can expand an event to see its details
    Given the list of events is displayed
    When the user clicks on “Show Details” on an event
    Then that event’s details should be displayed

  Scenario: User can collapse an event to hide its details
    Given the event details are displayed
    When the user clicks on “Hide Details”
    Then that event’s details should be hidden
