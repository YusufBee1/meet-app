import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import EventGenresChart from './components/EventGenresChart';
import CityEventsChart from './components/CityEventsChart';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [currentNOE, setCurrentNOE] = useState(32);

  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchEvents = async () => {
    try {
      const all = await getEvents();
      const locations = extractLocations(all);
      setAllLocations(locations);

      const filtered =
        currentCity === 'See all cities'
          ? all
          : all.filter((event) => event.location === currentCity);

      setEvents(filtered.slice(0, currentNOE));
    } catch (error) {
      setErrorAlert('Failed to load events.');
    }
  };

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('You are offline. The displayed event list has been loaded from the cache.');
    }

    fetchEvents();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
      </div>

      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />

      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />

      <div className="charts-container">
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;
