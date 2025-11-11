import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('renders the textbox element', () => {
    render(<NumberOfEvents eventCount={32} setEventCount={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('textbox has default value of 32', () => {
    render(<NumberOfEvents eventCount={32} setEventCount={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(32);
  });

  test('updates value when user types a new number', async () => {
    const setEventCount = jest.fn();
    render(<NumberOfEvents eventCount={32} setEventCount={setEventCount} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, '{backspace}{backspace}10');

    expect(setEventCount).toHaveBeenCalledWith(1);
    expect(setEventCount).toHaveBeenCalledWith(10);
  });
});

