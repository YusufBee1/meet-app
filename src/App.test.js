// src/App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { mockEvents } from './__mocks__/mock-events';
import * as api from './api';

jest.mock('./api');

describe('<App /> Integration', () => {
  beforeEach(() => {
    api.getEvents.mockResolvedValue(mockEvents);
    api.extractLocations.mockImplementation(events => {
      return [...new Set(events.map(event => event.location))];
    });
  });

  test('User can change the number of events displayed', async () => {
    render(<App />);

    // Wait for input field to appear and change to 2
    const numberInput = await screen.findByRole('spinbutton');
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '2');

    // Wait until the rendered event items (with className="event") are filtered
    const eventItems = await screen.findAllByRole('listitem');
    const visibleEvents = eventItems.filter((item) =>
      item.className.includes('event')
    );

    expect(visibleEvents).toHaveLength(2);
  });
});
