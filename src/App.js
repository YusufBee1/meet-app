// src/App.js
import React, { useState, useEffect } from 'react';
import Event from './components/event';
import CitySearch from './components/citysearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

function App() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eventCount, setEventCount] = useState(32);

  // Fetch events once on initial load
  useEffect(() => {
    const fetchData = async () => {
      const all = await getEvents();
      const locations = extractLocations(all);
      setAllEvents(all);
      setLocations(locations);
      setEvents(all.slice(0, eventCount));
    };

    fetchData();
  }, []);

  // Adjust event list when count or allEvents change
  useEffect(() => {
    setEvents(allEvents.slice(0, eventCount));
  }, [eventCount, allEvents]);

  // Filter by city
  const filterEventsByCity = (city) => {
    const filtered =
      city === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === city);

    setEvents(filtered.slice(0, eventCount));
  };

  return (
    <div className="App">
      <h1>Meet App</h1>
      <CitySearch allLocations={locations} setCurrentCity={filterEventsByCity} />
      <NumberOfEvents eventCount={eventCount} setEventCount={setEventCount} />
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

export default App;
