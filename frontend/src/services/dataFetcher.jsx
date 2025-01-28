/**
 * Base URL for GitHub Pages content
 */
const GITHUB_BASE_URL = 'https://insitech-international.github.io/code-clarity';

/**
 * DataFetcher class for handling API and static content requests
 */
class DataFetcher {
  /**
   * Initialize the DataFetcher with configuration options
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    // Environment detection
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    // Core configuration
    this.API_BASE_URL = config.API_BASE_URL || "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = isProduction ? GITHUB_BASE_URL : '';
    this.DEVELOPMENT_MODE = !isProduction;
    this.CACHE_DURATION = config.cacheDuration || 3600000; // 1 hour default
    this.API_TIMEOUT = config.apiTimeout || 5000; // 5 seconds default
    this.RETRY_ATTEMPTS = config.retryAttempts || 3;
    this.RETRY_DELAY = config.retryDelay || 1000; // 1 second default

    // Content paths
    this.QUESTIONS_PATH = '/static/data/questions';
    this.SOLUTIONS_PATH = '/static/data/solutions';

    // Initialize cache
    this.cache = new Map();

    // Debug logging
    this.DEBUG = config.debug || false;
    this._logInit();
  }

  /**
   * Log initialization details
   * @private
   */
  _logInit() {
    if (this.DEBUG) {
      console.log('DataFetcher initialized:', {
        environment: this.DEVELOPMENT_MODE ? 'development' : 'production',
        API_BASE_URL: this.API_BASE_URL,
        STATIC_BASE_URL: this.STATIC_BASE_URL,
        DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
        CACHE_DURATION: this.CACHE_DURATION,
        API_TIMEOUT: this.API_TIMEOUT,
        RETRY_ATTEMPTS: this.RETRY_ATTEMPTS
      });
    }
  }

  /**
   * Get cached data if available and not expired
   * @private
   * @param {string} key - Cache key
   * @returns {Object|null} Cached data or null
   */
  _getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      this._log('Cache hit:', key);
      return cached.data;
    }
    this._log('Cache miss:', key);
    return null;
  }

  /**
   * Set data in cache
   * @private
   * @param {string} key - Cache key
   * @param {Object} data - Data to cache
   */
  _setCacheData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    this._log('Cached data for:', key);
  }

  /**
   * Logging utility
   * @private
   * @param {...any} args - Arguments to log
   */
  _log(...args) {
    if (this.DEBUG) {
      console.log('[DataFetcher]', ...args);
    }
  }

  /**
   * Construct content URL based on type and path
   * @param {string} type - Content type ('question' or 'solution')
   * @param {string} path - Content path
   * @returns {string} Complete URL
   */
  getContentURL(type, path) {
    const basePath = type === 'question' ? this.QUESTIONS_PATH : this.SOLUTIONS_PATH;
    const fullPath = `${this.STATIC_BASE_URL}${basePath}${path}`;
    this._log('Constructed URL:', fullPath);
    return fullPath;
  }

  /**
   * Sleep utility for retry delay
   * @private
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise} Promise that resolves after delay
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Make a fetch request with timeout and retry logic
   * @private
   * @param {string} url - URL to fetch
   * @param {Object} options - Fetch options
   * @returns {Promise} Promise that resolves with response
   */
  async _fetchWithRetry(url, options = {}) {
    let lastError;

    for (let attempt = 1; attempt <= this.RETRY_ATTEMPTS; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        lastError = error;
        this._log(`Attempt ${attempt} failed:`, error.message);

        if (attempt < this.RETRY_ATTEMPTS) {
          await this._sleep(this.RETRY_DELAY * attempt); // Exponential backoff
        }
      }
    }

    throw new Error(`Failed after ${this.RETRY_ATTEMPTS} attempts: ${lastError.message}`);
  }

  /**
   * Fetch content (questions or solutions)
   * @param {string} path - Content path
   * @param {string} type - Content type ('question' or 'solution')
   * @param {boolean} useCache - Whether to use cache
   * @returns {Promise} Promise that resolves with content
   */
  async fetchContent(path, type = 'question', useCache = true) {
    const cacheKey = `${type}:${path}`;

    if (useCache) {
      const cached = this._getCachedData(cacheKey);
      if (cached) return cached;
    }

    const url = this.getContentURL(type, path);
    this._log(`Fetching ${type}:`, url);

    try {
      const response = await this._fetchWithRetry(url);
      const content = await response.text(); // Since it's markdown content

      if (useCache) {
        this._setCacheData(cacheKey, content);
      }

      return content;
    } catch (error) {
      this._log(`Error fetching ${type}:`, error);
      throw new Error(`Failed to fetch ${type} content: ${error.message}`);
    }
  }

  /**
   * Core data fetching method with API and static fallback
   * @param {string} apiPath - API endpoint path
   * @param {string} staticPath - Static file path
   * @param {Object} params - Query parameters
   * @param {boolean} useCache - Whether to use cache
   * @returns {Promise} Promise that resolves with data
   */
  async fetchData(apiPath, staticPath = null, params = null, useCache = true) {
    const cacheKey = `data:${apiPath}:${staticPath}:${JSON.stringify(params)}`;

    if (useCache) {
      const cached = this._getCachedData(cacheKey);
      if (cached) return cached;
    }

    // Development mode: API only
    if (this.DEVELOPMENT_MODE) {
      if (!apiPath) {
        throw new Error('API path is required in development mode');
      }

      try {
        const url = new URL(`${this.API_BASE_URL}${apiPath}`);
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
          });
        }

        const response = await this._fetchWithRetry(url.toString());
        const data = await response.json();

        if (useCache) {
          this._setCacheData(cacheKey, data);
        }

        return data;
      } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
      }
    }

    // Production mode: Try API first, then fallback to static
    try {
      if (apiPath) {
        const url = new URL(`${this.API_BASE_URL}${apiPath}`);
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
          });
        }

        const response = await this._fetchWithRetry(url.toString());
        const data = await response.json();

        if (useCache) {
          this._setCacheData(cacheKey, data);
        }

        return data;
      }
    } catch (apiError) {
      this._log('API fetch failed, falling back to static files:', apiError);
    }

    // Static file fallback (production only)
    if (!staticPath) {
      throw new Error('No static path provided for fallback');
    }

    try {
      const staticURL = `${this.STATIC_BASE_URL}${staticPath.startsWith('/') ? staticPath : '/' + staticPath}`;
      const response = await this._fetchWithRetry(staticURL);

      // Handle different content types
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (useCache) {
        this._setCacheData(cacheKey, data);
      }

      return data;
    } catch (staticError) {
      throw new Error(`Static file fetch failed: ${staticError.message}`);
    }
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
    this._log('Cache cleared');
  }

  /**
   * Test API connection
   * @returns {Promise<boolean>} Promise that resolves with connection status
   */
  async testConnection() {
    try {
      const response = await this._fetchWithRetry(`${this.API_BASE_URL}/test-connection`);
      return response.ok;
    } catch (error) {
      this._log('Connection test failed:', error);
      return false;
    }
  }
}

// Create singleton instance
const dataFetcher = new DataFetcher();

// Export both class and singleton instance
export { DataFetcher };
export default dataFetcher;