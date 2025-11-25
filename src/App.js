import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningText, setWarningText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.onLine) {
        setWarningText("");

        const allEvents = await getEvents();


        localStorage.setItem('lastEvents', JSON.stringify(allEvents));

        const filteredEvents =
          currentCity === 'See all cities'
            ? allEvents
            : allEvents.filter((event) => event.location === currentCity);

        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } else {
        setWarningText("You are currently offline. Displayed events may not be up to date.");


        const savedEvents = localStorage.getItem('lastEvents');
        if (savedEvents) {
          const parsedEvents = JSON.parse(savedEvents);

          const filteredEvents =
            currentCity === 'See all cities'
              ? parsedEvents
              : parsedEvents.filter((event) => event.location === currentCity);

          setEvents(filteredEvents.slice(0, currentNOE));
          setAllLocations(extractLocations(parsedEvents));
        }
      }
    };

    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
        {errorAlert.length > 0 && <ErrorAlert text={errorAlert} />}
        {warningText.length > 0 && <WarningAlert text={warningText} />}
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
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventGenresChart events={events} />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;