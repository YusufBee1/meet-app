import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [allLocations]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setQuery(value);

        const filteredSuggestions = allLocations
            ? allLocations.filter((location) =>
                location.toUpperCase().includes(value.toUpperCase())
            )
            : [];

        setSuggestions(filteredSuggestions);


        if (filteredSuggestions.length === 0) {
            setInfoAlert(
                'We can not find the city you are looking for. Please try another city.'
            );
        } else {
            setInfoAlert('');
        }
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
        setInfoAlert('');
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onChange={handleInputChanged}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul className="suggestions" aria-label="suggestions" >
                    {suggestions.map((suggestion) => (
                        <li onClick={handleItemClicked} key={suggestion}>
                            {suggestion}
                        </li>
                    ))}
                    <li key="See all cities" onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default CitySearch;