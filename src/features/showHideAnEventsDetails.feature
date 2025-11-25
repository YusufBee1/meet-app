Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default
        Given the app is loaded
        When the user sees an event
        Then the event element should be collapsed by default

    Scenario: User can expand an event to see details
        Given the event element is collapsed
        When the user clicks on the "Show Details" button
        Then the event element should expand to show more details

    Scenario: User can collapse an event to hide details
        Given the event element is expanded
        When the user clicks on the "Hide Details" button
        Then the event element should collapse to hide details
