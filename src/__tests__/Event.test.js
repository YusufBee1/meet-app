import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';

const mockEvent = {
  summary: 'Meeting with Chiquita',
  created: '2023-12-01T10:00:00Z',
  location: 'Paris, France',
  description: 'Discuss deployment of the app to production.',
};

describe('<Event />', () => {
  beforeEach(() => {
    render(<Event event={mockEvent} />);
  });

  test('renders summary, created, location, and "Show Details" button initially', () => {
    expect(screen.getByText(mockEvent.summary)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.created)).toBeInTheDocument();
    expect(screen.getByText(mockEvent.location)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show details/i })).toBeInTheDocument();
    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
  });

  test('shows event details when "Show Details" is clicked', async () => {
    const button = screen.getByRole('button', { name: /show details/i });
    await userEvent.click(button);

    expect(screen.getByText(mockEvent.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hide details/i })).toBeInTheDocument();
  });

  test('hides event details when "Hide Details" is clicked', async () => {
    const button = screen.getByRole('button', { name: /show details/i });
    await userEvent.click(button); // show
    await userEvent.click(button); // hide

    expect(screen.queryByText(mockEvent.description)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show details/i })).toBeInTheDocument();
  });
});
