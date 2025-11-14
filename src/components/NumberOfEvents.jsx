import React from 'react';

const NumberOfEvents = ({ eventCount, setEventCount }) => {
  return (
    <div className="NumberOfEvents">
      <input
        id="number-of-events"
        type="number"
        role="spinbutton"
        value={eventCount}
        onChange={(e) => setEventCount(Number(e.target.value))}
      />
    </div>
  );
};

export default NumberOfEvents;
