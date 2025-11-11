import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = allLocations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase())
    );

    setSuggestions(filtered);
  };

  const handleSuggestionClicked = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setCurrentCity(suggestion);
  };

  return (
    <div className="CitySearch">
      <input
        type="text"
        role="textbox"
        value={query}
        onChange={handleInputChanged}
        placeholder="Search for a city"
      />
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionClicked(suggestion)}
          >
            {suggestion}
          </li>
        ))}
        <li onClick={() => handleSuggestionClicked('all')}>
          <b>See all cities</b>
        </li>
      </ul>
    </div>
  );
};

export default CitySearch;
