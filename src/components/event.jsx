import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <li className="event">
            <h2>{event.summary}</h2>
            <p>{event.created}</p>
            <p>{event.location}</p>

            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>

            {showDetails && (
                <div className="event-details">
                    <p>{event.description}</p>
                </div>
            )}
        </li>
    );
};

export default Event;