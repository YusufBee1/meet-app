// src/components/NumberOfEvents.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from './NumberOfEvents';

describe('<NumberOfEvents />', () => {
  test('calls setEventCount with the final typed value', async () => {
    const setEventCount = jest.fn();
    render(<NumberOfEvents eventCount={32} setEventCount={setEventCount} />);

    const input = screen.getByRole('spinbutton');

    await userEvent.clear(input);
    await userEvent.type(input, '10');

    expect(setEventCount).toHaveBeenLastCalledWith(10);
  });
});
