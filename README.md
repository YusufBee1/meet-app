# Meet App

**Meet** is a serverless, progressive web app (PWA) built using React. It allows users to search for upcoming events by city and view event details, supporting both desktop and mobile use cases.

---

## User Stories

### Feature 2: Filter events by city  
**As a user**,  
**I should be able to** search for events in a specific city  
**So that** I can see relevant events near me

### Feature 3: Show/hide event details  
**As a user**,  
**I should be able to** expand or collapse event details  
**So that** I can see more information without leaving the page

### Feature 4: Specify number of events  
**As a user**,  
**I should be able to** choose how many events are displayed  
**So that** I’m not overwhelmed by too much data

### Feature 5: Use the app offline  
**As a user**,  
**I should be able to** access previously loaded events offline  
**So that** I can still view them without an internet connection

### Feature 6: Visualize events data  
**As a user**,  
**I should be able to** see a chart of event distribution  
**So that** I understand the density of events by city or topic

---

## Gherkin Scenarios

### Feature 2: Filter events by city  
Scenario: Filter events by city  
Given the user has opened the main page  
When the user types a city name in the search field  
Then only events in that city should be shown  

### Feature 3: Show/hide event details  
Scenario: Expand event details  
Given the list of events is displayed  
When the user clicks on an event’s “Details” button  
Then the event’s full details should be shown  

Scenario: Collapse event details  
Given the event details are expanded  
When the user clicks the “Details” button again  
Then the event’s details should be hidden  

### Feature 4: Specify number of events  
Scenario: Set number of events displayed  
Given the main page is open  
When the user enters a number in the events field  
Then that number of events should be displayed  

### Feature 5: Use the app offline  
Scenario: Load app without internet  
Given the user has previously opened the app online  
When the user opens the app without internet  
Then the last loaded events should be available  

### Feature 6: Visualize events data  
Scenario: View chart of events  
Given the app has loaded event data  
When the user views the statistics section  
Then a chart showing the event distribution should be displayed  
