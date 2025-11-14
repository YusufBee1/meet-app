import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails(prev => !prev);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>

      <button onClick={toggleDetails}>
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
