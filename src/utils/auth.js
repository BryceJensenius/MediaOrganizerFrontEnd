// Authentication utility functions

const TOKEN_EXPIRY_HOURS = 24;
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1']);
const DEFAULT_REMOTE_API_BASE_URL = 'https://tradelens.space/media-organizer';

const normalizeBaseUrl = (url) => url.replace(/\/+$/, '');

const getApiBaseUrl = () => {
    const configuredBaseUrl = process.env.REACT_APP_API_BASE_URL?.trim();
    if (configuredBaseUrl) {
        return normalizeBaseUrl(configuredBaseUrl);
    }

    if (typeof window !== 'undefined' && !LOCAL_HOSTNAMES.has(window.location.hostname)) {
        return normalizeBaseUrl(`${window.location.origin}/media-organizer`);
    }

    return DEFAULT_REMOTE_API_BASE_URL;
};

export const buildApiUrl = (path = '') => {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${getApiBaseUrl()}${normalizedPath}`;
};

/**
 * Get the stored session token
 * @returns {string|null} The session token or null if not found
 */
export const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
};

/**
 * Set the session token with expiration timestamp
 * @param {string} token - The session token to store
 */
export const setSessionToken = (token) => {
    const expiryTime = new Date().getTime() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000); // 24 hours in milliseconds
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
};

/**
 * Remove the session token (logout)
 */
export const clearSessionToken = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('tokenExpiry');
};

/**
 * Check if the token has expired
 * @returns {boolean} True if token has expired
 */
const isTokenExpired = () => {
    const expiryTime = localStorage.getItem('tokenExpiry');
    if (!expiryTime) {
        return true; // No expiry time means token is invalid
    }
    
    const currentTime = new Date().getTime();
    return currentTime > parseInt(expiryTime);
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid, non-expired session token
 */
export const isAuthenticated = () => {
    const token = getSessionToken();
    
    // Check if token exists and is valid
    if (!token || token === 'null' || token.trim() === '') {
        return false;
    }
    
    // Check if token has expired
    if (isTokenExpired()) {
        clearSessionToken(); // Auto-clear expired token
        return false;
    }
    
    return true;
};

/**
 * Make an authenticated API request
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} The fetch promise
 */
export const authenticatedFetch = (url, options = {}) => {
    // Check if token is still valid before making request
    if (!isAuthenticated()) {
        // Token is expired or invalid, reject the request
        return Promise.reject(new Error('Session expired. Please log in again.'));
    }
    
    const token = getSessionToken();
    
    const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
    };
    
    // Add authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        // Or use a custom header if your backend expects it differently:
        // headers['Session-Token'] = token;
    }
    
    return fetch(buildApiUrl(url), {
        ...options,
        headers
    });
};
