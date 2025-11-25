import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    test('renders an input element for number of events', () => {
        render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => { }} setErrorAlert={() => { }} />);
        const input = screen.getByRole('spinbutton', { name: /number of events/i });
        expect(input).toBeInTheDocument();
    });

    test('default number of events is 32', () => {
        render(<NumberOfEvents currentNOE={32} setCurrentNOE={() => { }} setErrorAlert={() => { }} />);
        const input = screen.getByRole('spinbutton', { name: /number of events/i });
        expect(input).toHaveValue(32);
    });

    test('user can change number of events', async () => {
        const user = userEvent.setup();
        const mockSetCurrentNOE = jest.fn();
        const mockSetErrorAlert = jest.fn();

        render(
            <NumberOfEvents
                currentNOE={32}
                setCurrentNOE={mockSetCurrentNOE}
                setErrorAlert={mockSetErrorAlert}
            />
        );

        const input = screen.getByRole('spinbutton', { name: /number of events/i });
        await user.clear(input);
        await user.type(input, '10');

        // expect(mockSetCurrentNOE).toHaveBeenLastCalledWith(10);
        expect(mockSetErrorAlert).toHaveBeenLastCalledWith('');
    });
});