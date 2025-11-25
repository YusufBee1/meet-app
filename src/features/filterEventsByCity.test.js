import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    let suggestionListItems;

    test('When user hasn’t searched for a city, show upcoming events from all cities', ({ given, when, then }) => {
        given('user hasn’t searched for any city', () => {
            // No action needed
        });

        when('the user opens the app', async () => {
            await act(async () => {
                AppComponent = render(<App />);
            });
        });

        then('the user should see the list of all upcoming events', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0); // flexible
            });
        });
    });

    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
        given('the main page is open', async () => {
            await act(async () => {
                AppComponent = render(<App />);
            });
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
        });

        when('user starts typing in the city textbox', async () => {
            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");
        });

        then('the user should receive a list of cities (suggestions) that match what they’ve typed', async () => {
            await waitFor(() => {
                suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionListItems.length).toBeGreaterThan(0);
            });
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        given('user was typing “Berlin” in the city textbox', async () => {
            await act(async () => {
                AppComponent = render(<App />);
            });
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");

            await waitFor(() => {
                suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionListItems.length).toBeGreaterThan(0);
            });
        });

        and('the list of suggested cities is showing', () => {
            expect(suggestionListItems.length).toBeGreaterThan(0);
        });

        when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
            const user = userEvent.setup();
            await act(async () => {
                await user.click(suggestionListItems[0]);
            });
        });

        then('their city should be changed to that city (i.e., “Berlin, Germany”)', async () => {
            await waitFor(() => {
                expect(citySearchInput.value).toBe('Berlin, Germany');
            });
        });

        and('the user should receive a list of upcoming events in that city', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();
            const berlinEvents = allEvents.filter(event => event.location === "Berlin, Germany");

            expect(EventListItems.length).toBe(berlinEvents.length);
        });
    });
});