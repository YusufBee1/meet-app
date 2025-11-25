// src/api.js
import { mockData } from './mock-data';

/**
 * Always return mock events in every environment (local, test, production).
 * Also seeds localStorage for offline fallback/use in tests.
 */
export const getEvents = async () => {
  try {
    localStorage.setItem('lastEvents', JSON.stringify(mockData));
  } catch {}
  return mockData;
};

/**
 * Unique location list for charts/CitySearch
 */
export const extractLocations = (events = []) => {
  const locations = (Array.isArray(events) ? events : [])
    .map((e) => e && e.location)
    .filter(Boolean);
  return [...new Set(locations)];
};

export default { getEvents, extractLocations };
