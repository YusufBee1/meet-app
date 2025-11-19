import React, { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const value = Number(event.target.value);
    setNumber(value);

    if (isNaN(value)) {
      setErrorAlert('Please enter a valid number to see the events.');
    } else if (value <= 0) {
      setErrorAlert('Please enter a number greater than zero.');
    } else {
      setErrorAlert('');
      setCurrentNOE(value);
    }
  };

  return (
    <div className="NumberOfEvents">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        type="number"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
