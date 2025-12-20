// Authentication utility functions

/**
 * Get the stored session token
 * @returns {string|null} The session token or null if not found
 */
export const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
};

/**
 * Set the session token
 * @param {string} token - The session token to store
 */
export const setSessionToken = (token) => {
    localStorage.setItem('sessionToken', token);
};

/**
 * Remove the session token (logout)
 */
export const clearSessionToken = () => {
    localStorage.removeItem('sessionToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a session token
 */
export const isAuthenticated = () => {
    const token = getSessionToken();
    return token !== null && token !== 'null' && token.trim() !== '';
};

/**
 * Make an authenticated API request
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise} The fetch promise
 */
export const authenticatedFetch = (url, options = {}) => {
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
    
    return fetch(url, {
        ...options,
        headers
    });
};
