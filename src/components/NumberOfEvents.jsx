import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const [number, setNumber] = useState(32);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value);

        if (value < 1 || value > 100) {
            setErrorAlert('Please enter a number between 1 and 100.');
        } else {
            setErrorAlert(''); // Clear error
            setCurrentNOE(value);
        }
    };

    return (
        <div className="number-of-events">
            <label htmlFor="numberOfEvents">Number of events:</label>
            <input
                id="numberOfEvents"
                type="number"
                className="number"
                value={number}
                onChange={handleInputChanged}
                min="1"
                max="100"
            />
        </div>
    );
};

NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    setErrorAlert: PropTypes.func.isRequired,
};

export default NumberOfEvents;