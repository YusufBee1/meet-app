// src/api.js

// === BASE URL (Local or Deployed Lambda) ===
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://YOUR_AWS_LAMBDA_DEPLOYMENT_URL' // replace when deploying
    : 'http://localhost:3005';

// === TOKEN HANDLERS ===
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenValid = accessToken && (await checkToken(accessToken));

  if (tokenValid) return accessToken;

  localStorage.removeItem('access_token');
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');

  // Step 1: Request Auth URL
  if (!code) {
    try {
      const response = await fetch(`${API_BASE_URL}/get-auth-url`);
      const { authUrl } = await response.json();
      window.location.href = authUrl;
      return null;
    } catch (err) {
      console.error('Error fetching auth URL:', err);
      return null;
    }
  }

  // Step 2: Exchange Code for Token
  try {
    const tokenResponse = await fetch(`${API_BASE_URL}/token/${code}`);
    const { access_token } = await tokenResponse.json();
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (err) {
    console.error('Error fetching access token:', err);
    return null;
  }
};

// === CHECK TOKEN VALIDITY ===
export const checkToken = async (accessToken) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await res.json();
    return !result.error;
  } catch (err) {
    console.error('Error checking token validity:', err);
    return false;
  }
};

// === FETCH EVENTS ===
export const getEvents = async () => {
  // Offline fallback
  if (!navigator.onLine) {
    const cached = localStorage.getItem('lastEvents');
    return cached ? JSON.parse(cached) : [];
  }

  // Retrieve access token
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/get-events/${token}`);
    const result = await response.json();

    if (result && result.events) {
      localStorage.setItem('lastEvents', JSON.stringify(result.events));
      return result.events;
    }

    return [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// === LOCATION UTILITY ===
export const extractLocations = (events) => {
  if (!Array.isArray(events)) return [];
  const locations = events.map((event) => event.location);
  return [...new Set(locations)];
};

// === SIMPLE STUB FOR TEST COVERAGE ===
// (This allows Jest tests to import getEvents and extractLocations safely)
export default {
  getAccessToken,
  checkToken,
  getEvents,
  extractLocations,
};
