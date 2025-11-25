import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
    let AppComponent;
    let AppDOM;
    let eventItems;

    beforeEach(async () => {
        await act(async () => {
            AppComponent = render(<App />);
        });
        AppDOM = AppComponent.container.firstChild;

        await waitFor(() => {
            eventItems = within(AppDOM).queryAllByRole('listitem');
            expect(eventItems.length).toBeGreaterThan(0);
        });
    });

    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the app is loaded', () => {

        });

        when('the user sees an event', () => {

        });

        then('the event element should be collapsed by default', () => {
            const eventDetails = AppDOM.querySelector('.event .details');
            expect(eventDetails).toBeNull();
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        given('the event element is collapsed', () => {

        });

        when('the user clicks on the "Show Details" button', async () => {
            const user = userEvent.setup();
            const firstEvent = eventItems[0];
            const showDetailsButton = within(firstEvent).getByText('Show Details');

            await act(async () => {
                await user.click(showDetailsButton);
            });
        });

        then('the event element should expand to show more details', async () => {
            await waitFor(() => {
                const eventDetails = AppDOM.querySelector('.event .details');
                expect(eventDetails).toBeDefined();
            });
        });
    });

    test('User can collapse an event to hide details', ({ given, when, then }) => {
        given('the event element is expanded', async () => {
            const user = userEvent.setup();
            const firstEvent = eventItems[0];
            const showDetailsButton = within(firstEvent).getByText('Show Details');

            await act(async () => {
                await user.click(showDetailsButton);
            });

            await waitFor(() => {
                const eventDetails = AppDOM.querySelector('.event .details');
                expect(eventDetails).toBeDefined();
            });
        });

        when('the user clicks on the "Hide Details" button', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = within(AppDOM).getByText('Hide Details');

            await act(async () => {
                await user.click(hideDetailsButton);
            });
        });

        then('the event element should collapse to hide details', async () => {
            await waitFor(() => {
                const eventDetails = AppDOM.querySelector('.event .details');
                expect(eventDetails).toBeNull();
            });
        });
    });
});