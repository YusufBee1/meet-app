import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents />', () => {
  let setCurrentNOE;
  let setErrorAlert;

  beforeEach(() => {
    setCurrentNOE = jest.fn();
    setErrorAlert = jest.fn();

    render(
      <NumberOfEvents
        currentNOE={32}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
    );
  });

  test('renders number input with default value of 32', () => {
    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(32);
  });

  test('updates value and calls setCurrentNOE with valid input', async () => {
    const input = screen.getByRole('spinbutton');
    await userEvent.clear(input);
    await userEvent.type(input, '10');

    expect(input).toHaveValue(10);
    expect(setCurrentNOE).toHaveBeenLastCalledWith(10);
    expect(setErrorAlert).toHaveBeenLastCalledWith('');
  });

  test('shows error alert for invalid (non-number) input', async () => {
    const input = screen.getByRole('spinbutton');
    await userEvent.clear(input);
    await userEvent.type(input, 'abc');

    expect(setErrorAlert).toHaveBeenLastCalledWith(
      'Please enter a valid number to see the events.'
    );
    expect(setCurrentNOE).not.toHaveBeenCalled();
  });

  test('shows error alert for zero or negative input', async () => {
    const input = screen.getByRole('spinbutton');
    await userEvent.clear(input);
    await userEvent.type(input, '-1');

    expect(setErrorAlert).toHaveBeenLastCalledWith(
      'Please enter a number greater than zero.'
    );
    expect(setCurrentNOE).not.toHaveBeenCalled();
  });
});
