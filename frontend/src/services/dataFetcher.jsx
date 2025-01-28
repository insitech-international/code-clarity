// DataFetcher.js
const GITHUB_BASE_URL = 'https://insitech-international.github.io/code-clarity';

class DataFetcher {
  constructor(config = {}) {
    // Environment detection
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    // Core configuration
    this.API_BASE_URL = config.API_BASE_URL || "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = isProduction ? GITHUB_BASE_URL : '';
    this.DEVELOPMENT_MODE = !isProduction;
    this.CACHE_DURATION = config.cacheDuration || 3600000;
    this.API_TIMEOUT = config.apiTimeout || 5000;
    this.RETRY_ATTEMPTS = config.retryAttempts || 3;
    this.RETRY_DELAY = config.retryDelay || 1000;

    // Content paths
    this.QUESTIONS_PATH = '/static/data/questions';
    this.SOLUTIONS_PATH = '/static/data/solutions';
    this.INDEX_PATH = '/static/data/index.json';
    this.CATEGORIES_PATH = '/static/data/categories.json';

    // Initialize cache
    this.cache = new Map();

    // Debug logging
    this.DEBUG = config.debug || false;
    this._logInit();
  }

  // Core fetch method with retries
  async fetchData(path, options = {}) {
    let url = path;
    if (!path.startsWith('http')) {
      url = `${this.STATIC_BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
    }

    this._log('Fetching:', url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      this._log('Fetch error:', error);
      throw error;
    }
  }

  // Specific methods for different content types
  async getIndex() {
    try {
      return await this.fetchData(this.INDEX_PATH);
    } catch (error) {
      this._log('Error fetching index:', error);
      throw error;
    }
  }

  async getCategories() {
    try {
      return await this.fetchData(this.CATEGORIES_PATH);
    } catch (error) {
      this._log('Error fetching categories:', error);
      throw error;
    }
  }

  async getQuestions(category) {
    try {
      const path = category
        ? `${this.QUESTIONS_PATH}/${category}.json`
        : this.QUESTIONS_PATH + '/index.json';
      return await this.fetchData(path);
    } catch (error) {
      this._log('Error fetching questions:', error);
      throw error;
    }
  }

  async getSolutions(category) {
    try {
      const path = category
        ? `${this.SOLUTIONS_PATH}/${category}.json`
        : this.SOLUTIONS_PATH + '/index.json';
      return await this.fetchData(path);
    } catch (error) {
      this._log('Error fetching solutions:', error);
      throw error;
    }
  }

  _log(...args) {
    if (this.DEBUG) {
      console.log('[DataFetcher]', ...args);
    }
  }

  _logInit() {
    if (this.DEBUG) {
      console.log('DataFetcher initialized:', {
        environment: this.DEVELOPMENT_MODE ? 'development' : 'production',
        API_BASE_URL: this.API_BASE_URL,
        STATIC_BASE_URL: this.STATIC_BASE_URL,
        DEVELOPMENT_MODE: this.DEVELOPMENT_MODE
      });
    }
  }

  clearCache() {
    this.cache.clear();
    this._log('Cache cleared');
  }
}

// Create and export singleton instance
const dataFetcher = new DataFetcher({ debug: true });

export { DataFetcher };  // Export class
export default dataFetcher;  // Export singleton instance