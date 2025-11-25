import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<App /> integration', () => {

    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        render(<App />);

        const citySearchInput = screen.getByPlaceholderText(/search for a city/i);
        await user.type(citySearchInput, 'Berlin');

        // Now your app has aria-label="suggestions"
        const suggestionsList = screen.getByRole('list', { name: /suggestions/i });
        const berlinSuggestionItem = within(suggestionsList).getByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        // Now your app has aria-label="event list"
        const eventList = screen.getByRole('list', { name: /event list/i });
        const eventItems = within(eventList).getAllByRole('listitem');

        expect(eventItems.length).toBeGreaterThan(0);
        eventItems.forEach(item => {
            expect(item.textContent).toContain('Berlin, Germany');
        });
    });

    test('user can change the number of events displayed', async () => {
        const user = userEvent.setup();
        render(<App />);

        const numberOfEventsInput = screen.getByRole('spinbutton', { name: /number of events/i });
        await user.clear(numberOfEventsInput);
        await user.type(numberOfEventsInput, '10');

        const eventList = screen.getByRole('list', { name: /event list/i });
        const eventItems = within(eventList).getAllByRole('listitem');

        expect(eventItems.length).toBeLessThanOrEqual(10);
    });

});