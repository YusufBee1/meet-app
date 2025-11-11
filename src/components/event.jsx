import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => setShowDetails((prev) => !prev);

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>

      <button onClick={handleToggle}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
        </div>
      )}
    </div>
  );
};

export default Event;
