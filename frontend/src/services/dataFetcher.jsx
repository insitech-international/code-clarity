// Define the correct base URL for production
const GITHUB_BASE_URL = 'https://insitech-international.github.io/code-clarity/';

class DataFetcher {
  constructor(config = {}) {
    // Determine if the environment is production
    const isProduction = !window.location.hostname.includes('localhost') &&
                         !window.location.hostname.includes('127.0.0.1');

    // Initialize properties
    this.API_BASE_URL = "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = isProduction
      ? GITHUB_BASE_URL + 'static/data'
      : '/static/data'; // Use local static data in development
    this.DEVELOPMENT_MODE = !isProduction;
    this.CACHE_DURATION = config.cacheDuration || 3600000; // Cache for 1 hour by default
    this.API_TIMEOUT = 5000; // Timeout for API requests
    this.cache = new Map();

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      API_BASE_URL: this.API_BASE_URL,
      STATIC_BASE_URL: this.STATIC_BASE_URL,
      DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
    });
  }

  // Core data fetching method
  async fetchData(apiPath, staticPath = null, params = null) {
    // Development mode: Fetch from API only
    if (this.DEVELOPMENT_MODE) {
      if (!apiPath) {
        throw new Error('API path is required in development mode');
      }

      try {
        console.log('Attempting API fetch:', `${this.API_BASE_URL}${apiPath}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, {
          signal: controller.signal,
          ...(params && { params }),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API request failed:', error);
        throw new Error('API is required in development mode');
      }
    }

    // Production mode: Try API first, then fallback to static files
    try {
      if (apiPath) {
        console.log('Attempting API fetch:', `${this.API_BASE_URL}${apiPath}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, {
          signal: controller.signal,
          ...(params && { params }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          return data;
        }
      }
    } catch (apiError) {
      console.warn('API fetch failed, falling back to static files');
    }

    // Static file fallback (production only)
    if (!staticPath) {
      throw new Error('No static path provided for fallback');
    }

    try {
      const staticURL = `${this.STATIC_BASE_URL}${staticPath.startsWith('/') ? staticPath.slice(1) : staticPath}`;
      console.log('Fetching static file:', staticURL);

      const response = await fetch(staticURL);

      if (!response.ok) {
        throw new Error(`Static file fetch failed: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let data;

      // Try JSON first, fallback to text
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return data;
    } catch (staticError) {
      console.error('Static file error:', staticError);
      throw staticError;
    }
  }

  // Helper method for testing API connection
  async testConnection() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/test-connection`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Create a singleton instance of the DataFetcher class
const dataFetcher = new DataFetcher();

// Export both the instance and the class
export { DataFetcher };
export default dataFetcher;
