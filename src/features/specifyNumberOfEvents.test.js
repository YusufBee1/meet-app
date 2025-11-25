import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test('Default number of events is 32', ({ given, when, then }) => {
        given('the app is loaded', async () => {
            await act(async () => render(<App />));
        });

        when('the user hasn’t specified a number', () => {
            // Nothing needed
        });

        then('the default number of events displayed should be 32', () => {
            const input = screen.getByRole('spinbutton', { name: /number of events/i });
            expect(input).toHaveValue(32);
        });
    });

    test('User can change the number of events', ({ given, when, then }) => {
        given('the user wants to change the number of events', async () => {
            await act(async () => render(<App />));
        });

        when('the user types a new number in the textbox', async () => {
            const user = userEvent.setup();
            const input = screen.getByRole('spinbutton', { name: /number of events/i });
            await user.clear(input);
            await user.type(input, '10');
        });

        then('the app should display the specified number of events', async () => {
            const eventList = screen.getByRole('list');
            const eventItems = within(eventList).getAllByRole('listitem');
            expect(eventItems.length).toBeLessThanOrEqual(10);
        });
    });
});