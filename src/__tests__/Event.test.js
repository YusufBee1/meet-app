// src/__tests__/Event.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { mockEvents } from '../__mocks__/mock-events';

describe('<Event />', () => {
  const mockEvent = mockEvents[0]; // Use the first mock event

  beforeEach(() => {
    render(<Event event={mockEvent} />);
  });

  test('renders summary, location, and "Show Details" button initially', () => {
    expect(screen.getByText(mockEvent.summary)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /show details/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockEvent.description)
    ).not.toBeInTheDocument();
  });

  test('shows event description when "Show Details" is clicked', () => {
    fireEvent.click(screen.getByRole('button', { name: /show details/i }));
    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
  });

  test('hides event description when "Hide Details" is clicked', () => {
    const button = screen.getByRole('button', { name: /show details/i });
    fireEvent.click(button); // Show
    fireEvent.click(screen.getByRole('button', { name: /hide details/i })); // Hide
    expect(
      screen.queryByText(mockEvent.description)
    ).not.toBeInTheDocument();
  });
});
