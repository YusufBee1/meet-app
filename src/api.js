// src/api.js
import { mockData } from './mock-data';

// ------------------------------
// FORCE MOCK DATA IN ALL ENVIRONMENTS
// ------------------------------

export const getAccessToken = async () => {
  return "mock-token";
};

export const getEvents = async () => {
  // Always return mockData no matter what environment (local / Vercel / test)
  localStorage.setItem("lastEvents", JSON.stringify(mockData));
  return mockData;
};

export const extractLocations = (events) => {
  if (!Array.isArray(events)) return [];
  const locations = events.map(e => e.location).filter(Boolean);
  return [...new Set(locations)];
};

export default {
  getAccessToken,
  getEvents,
  extractLocations,
};
