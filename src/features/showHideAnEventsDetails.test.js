import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

// Mock API
jest.mock('../api', () => ({
  getEvents: jest.fn(() =>
    Promise.resolve([
      { id: 1, summary: 'Event 1', location: 'Berlin', description: 'Event 1 details', start: { dateTime: '' } },
      { id: 2, summary: 'Event 2', location: 'Berlin', description: 'Event 2 details', start: { dateTime: '' } },
      { id: 3, summary: 'Event 3', location: 'Berlin', description: 'Event 3 details', start: { dateTime: '' } },
      { id: 4, summary: 'Event 4', location: 'Berlin', description: 'Event 4 details', start: { dateTime: '' } },
    ])
  ),
  extractLocations: jest.fn(() => ['Berlin'])
}));

const feature = loadFeature('src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user opens the Meet app', async () => {
      render(<App />);
    });

    when('the list of upcoming events is displayed', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
      });
    });

    then('each event element should be collapsed by default', async () => {
      const items = await screen.findAllByRole('listitem');
      items.forEach(event => {
        const details = within(event).queryByTestId('event-details');
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let firstEvent;

    given('the list of events is displayed', async () => {
      render(<App />);
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
        firstEvent = items[0];
      });
    });

    when('the user clicks on “Show Details” on an event', async () => {
      const showButton = within(firstEvent).getByRole('button', { name: /show details/i });
      fireEvent.click(showButton);
    });

    then('that event’s details should be displayed', async () => {
      const details = await within(firstEvent).findByTestId('event-details');
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let firstEvent;

    given('the event details are displayed', async () => {
      render(<App />);
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
        firstEvent = items[0];
      });
      const showButton = within(firstEvent).getByRole('button', { name: /show details/i });
      fireEvent.click(showButton);
      await screen.findByTestId('event-details');
    });

    when('the user clicks on “Hide Details”', async () => {
      const hideButton = within(firstEvent).getByRole('button', { name: /hide details/i });
      fireEvent.click(hideButton);
    });

    then('that event’s details should be hidden', async () => {
      await waitFor(() => {
        const details = within(firstEvent).queryByTestId('event-details');
        expect(details).not.toBeInTheDocument();
      });
    });
  });
});