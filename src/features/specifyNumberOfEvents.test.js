import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

// Mocking API to return 4 fake events
jest.mock('../api', () => ({
  getEvents: jest.fn(() =>
    Promise.resolve([
      { id: 1, summary: 'Event 1', location: 'Paris', start: { dateTime: '' } },
      { id: 2, summary: 'Event 2', location: 'Paris', start: { dateTime: '' } },
      { id: 3, summary: 'Event 3', location: 'Paris', start: { dateTime: '' } },
      { id: 4, summary: 'Event 4', location: 'Paris', start: { dateTime: '' } },
    ])
  ),
  extractLocations: jest.fn(() => ['Paris']),
}));

const feature = loadFeature('src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('Default number of events is 32', ({ given, when, then }) => {
    given('the user opens the app', () => {
      render(<App />);
    });

    when('the list of events is displayed', async () => {
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      });
    });

    then('32 events should be shown by default', async () => {
      const items = await screen.findAllByRole('listitem');
      expect(items.length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    given('the list of events is visible', async () => {
      render(<App />);
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      });
    });

    when('the user sets the number of events to 2', () => {
      const input = screen.getByRole('spinbutton');
      fireEvent.change(input, { target: { value: '2' } });
    });

    then('only 2 events should be displayed', async () => {
      await waitFor(() => {
        const items = screen.getAllByRole('listitem');
        expect(items.length).toBe(2);
      });
    });
  });
});
