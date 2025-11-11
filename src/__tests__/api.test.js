/**
 * @file api.test.js
 * Tests for src/api.js with mocks for fetch, localStorage, navigator, and window.location
 */

import {
  getAccessToken,
  checkToken,
  getEvents,
  extractLocations,
} from '../api';

// ===== Mock Setup =====
const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => (store[key] = value.toString())),
    removeItem: jest.fn((key) => delete store[key]),
    clear: jest.fn(() => (store = {})),
  };
})();
Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

Object.defineProperty(global.navigator, 'onLine', { value: true, writable: true });

delete window.location;
window.location = { href: '' };

// ===== Tests =====
describe('extractLocations', () => {
  test('returns unique locations from events', () => {
    const events = [
      { location: 'Paris' },
      { location: 'Berlin' },
      { location: 'Paris' },
    ];
    const locations = extractLocations(events);
    expect(locations).toEqual(['Paris', 'Berlin']);
  });
});

describe('checkToken', () => {
  beforeEach(() => mockFetch.mockReset());

  test('returns true for valid token', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({}), // no error
    });
    const result = await checkToken('mockToken');
    expect(result).toBe(true);
  });

  test('returns false for invalid token', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ error: 'Invalid token' }),
    });
    const result = await checkToken('badToken');
    expect(result).toBe(false);
  });
});

describe('getAccessToken', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockLocalStorage.clear();
  });

  test('returns cached token if valid', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce('cachedToken');
    mockFetch.mockResolvedValueOnce({ json: async () => ({}) }); // valid
    const token = await getAccessToken();
    expect(token).toBe('cachedToken');
  });

  test('redirects to auth URL if no code and no token', async () => {
    mockLocalStorage.getItem.mockReturnValueOnce(null);
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ authUrl: 'http://auth.url' }),
    });

    await getAccessToken();
    expect(window.location.href).toBe('http://auth.url');
  });

  test('exchanges code for token when code is present', async () => {
    const params = new URLSearchParams();
    params.set('code', 'mockCode');
    delete window.location;
    window.location = { search: `?${params.toString()}`, href: '' };

    mockFetch
      .mockResolvedValueOnce({ json: async () => ({ access_token: 'newToken' }) }) // token exchange
      .mockResolvedValueOnce({ json: async () => ({}) }); // validity check

    const token = await getAccessToken();
    expect(token).toBe('newToken');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('access_token', 'newToken');
  });
});

describe('getEvents', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockLocalStorage.clear();
    window.location.href = '';
  });

  test('returns cached events when offline', async () => {
    navigator.onLine = false;
    mockLocalStorage.getItem.mockReturnValueOnce(
      JSON.stringify([{ id: 1, location: 'Paris' }])
    );
    const events = await getEvents();
    expect(events).toEqual([{ id: 1, location: 'Paris' }]);
    navigator.onLine = true;
  });

  test('fetches and caches events when online', async () => {
    mockFetch
      .mockResolvedValueOnce({ json: async () => ({}) }) // checkToken
      .mockResolvedValueOnce({
        json: async () => ({ events: [{ id: 1, location: 'Paris' }] }),
      });

    mockLocalStorage.getItem.mockReturnValueOnce('mockAccessToken');
    const events = await getEvents();
    expect(events[0].location).toBe('Paris');
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
});
