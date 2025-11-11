// src/App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './api';
import userEvent from '@testing-library/user-event';

jest.mock('./api');

const mockEvents = [
  {
    id: '1',
    location: 'Paris',
    summary: 'Event in Paris',
    start: { dateTime: '2025-11-12T10:00:00' },
    description: 'Fun times in Paris!',
  },
  {
    id: '2',
    location: 'Berlin',
    summary: 'Event in Berlin',
    start: { dateTime: '2025-11-13T12:00:00' },
    description: 'Chill vibes in Berlin!',
  },
  {
    id: '3',
    location: 'Paris',
    summary: 'Another Event in Paris',
    start: { dateTime: '2025-11-14T09:00:00' },
    description: 'More fun in Paris!',
  },
];

beforeEach(() => {
  api.getEvents.mockResolvedValue(mockEvents);
});

test('renders NumberOfEvents component', async () => {
  render(<App />);
  const input = await screen.findByRole('textbox');
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue(32);
});

test('loads and displays event data from API', async () => {
  render(<App />);
  const eventCards = await screen.findAllByText(/event in/i);
  expect(eventCards.length).toBeGreaterThan(0);
  expect(api.getEvents).toHaveBeenCalled();
});

test('filters events by city using CitySearch', async () => {
  render(<App />);
  const parisEvent = await screen.findByText(/Paris/i);
  expect(parisEvent).toBeInTheDocument();

  const cityOption = await screen.findByText('Berlin');
  await userEvent.click(cityOption);

  await waitFor(() => {
    const berlinEvent = screen.getByText(/Berlin/i);
    expect(berlinEvent).toBeInTheDocument();
    expect(screen.queryByText(/Paris/i)).not.toBeInTheDocument();
  });
});
