import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';

// Mock event data
const mockEvent = {
    summary: 'Mock Event Title',
    location: 'Mock City, Mock Country',
    created: '2023-04-25T10:00:00.000Z',
    description: 'This is a detailed description of the mock event.'
};

describe('<Event /> component', () => {
    test('renders event title, location, and start time', () => {
        render(<Event event={mockEvent} />);

        // Check if event's title is rendered
        expect(screen.getByText('Mock Event Title')).toBeInTheDocument();

        // Check if event's location is rendered
        expect(screen.getByText('Mock City, Mock Country')).toBeInTheDocument();

        // Check if event's created time is rendered
        expect(screen.getByText('2023-04-25T10:00:00.000Z')).toBeInTheDocument();
    });

    test('event details are collapsed by default', () => {
        render(<Event event={mockEvent} />);

        // Details should NOT be visible initially
        const descriptionElement = screen.queryByText('This is a detailed description of the mock event.');
        expect(descriptionElement).not.toBeInTheDocument();
    });

    test('clicking "Show Details" button expands event details', async () => {
        render(<Event event={mockEvent} />);

        const showButton = screen.getByRole('button', { name: /show details/i });
        fireEvent.click(showButton);

        // After clicking, the description should be visible
        expect(screen.getByText('This is a detailed description of the mock event.')).toBeInTheDocument();
    });

    test('clicking "Hide Details" button collapses event details', async () => {
        render(<Event event={mockEvent} />);

        const showButton = screen.getByRole('button', { name: /show details/i });
        fireEvent.click(showButton); // Expand first

        const hideButton = screen.getByRole('button', { name: /hide details/i });
        fireEvent.click(hideButton); // Then collapse

        // After clicking hide, the description should NOT be visible
        const descriptionElement = screen.queryByText('This is a detailed description of the mock event.');
        expect(descriptionElement).not.toBeInTheDocument();
    });
});
