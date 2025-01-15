import axios from "axios";
import FileManager from "./fileManager";

class DataFetcher {
  constructor(config = {}) {
    // Base URLs
    this.API_BASE_URL = config.apiBaseUrl || 
      process.env.REACT_APP_API_BASE_URL || 
      "http://127.0.0.1:8000";
    
    this.FILE_BASE_URL = config.fileBaseUrl || 
      process.env.REACT_APP_FILE_BASE_URL || 
      "https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data";
    
    // Caching configuration
    this.CACHE_DURATION = config.cacheDuration || 3600000; // 1 hour
    this.OFFLINE_MODE = config.offlineMode || false;

    // Axios instance for API calls
    this.api = axios.create({
      baseURL: this.API_BASE_URL,
      timeout: 5000,
    });

    // Internal cache
    this.cache = new Map();
  }

  // Generate a unique cache key
  _generateCacheKey(apiPath, filePath, params) {
    return JSON.stringify({ apiPath, filePath, params });
  }

  // Check and retrieve from cache
  _getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  // Save to cache
  _saveToCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // Fetch data with comprehensive fallback mechanism
  async fetchData(apiPath, filePath = null, params = null, options = {}) {
    // Determine effective offline mode
    const isOffline = options.offlineOnly || this.OFFLINE_MODE;

    // Generate cache key
    const cacheKey = this._generateCacheKey(apiPath, filePath, params);
    
    // Check cache first
    const cachedData = this._getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Offline mode or API disabled
    if (isOffline) {
      if (!filePath) {
        throw new Error("No static file path provided for offline mode");
      }
      const fileData = await this._fetchFromStatic(filePath);
      this._saveToCache(cacheKey, fileData);
      return fileData;
    }

    try {
      // Attempt API fetch
      const apiData = await this._fetchFromAPI(apiPath, params);
      this._saveToCache(cacheKey, apiData);
      return apiData;
    } catch (apiError) {
      console.warn(
        `API fetch failed for ${apiPath}, falling back to static files:`,
        apiError
      );

      // No static file fallback
      if (!filePath) {
        throw new Error(`No static file fallback path provided for ${apiPath}`);
      }

      try {
        // Fetch from static files
        const fileData = await this._fetchFromStatic(filePath);
        this._saveToCache(cacheKey, fileData);
        return fileData;
      } catch (fileError) {
        console.error("Static file fetch also failed:", fileError);
        throw new Error(
          `Failed to fetch data from both API and static files: ${apiPath}`
        );
      }
    }
  }

  // API data fetching
  async _fetchFromAPI(apiPath, params) {
    const response = await this.api.get(
      apiPath,
      params ? { params } : undefined
    );
    return response.data;
  }

  // Static file fetching
  async _fetchFromStatic(filePath) {
    const fullPath = `${this.FILE_BASE_URL}${filePath.replace(/^.*?\/static\/data/, '')}`;
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  }

  // POST data method
  async postData(apiPath, data, options = {}) {
    // If in offline mode or offlineOnly is set, throw an error
    if (this.OFFLINE_MODE || options.offlineOnly) {
      throw new Error("Cannot post data in offline mode");
    }

    try {
      const response = await this.api.post(apiPath, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${apiPath}:`, error);
      
      // Optional fallback mechanism
      if (options.fallbackToStatic) {
        try {
          // Construct a static fallback path based on API path
          const fallbackPath = `${apiPath.replace(/^\//, '')}.json`;
          return await this._fetchFromStatic(fallbackPath);
        } catch (staticFallbackError) {
          console.error("Static fallback also failed:", staticFallbackError);
        }
      }

      throw error;
    }
  }

  // Clear specific cache entry or entire cache
  clearCache(key = null) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Set offline mode
  setOfflineMode(mode) {
    this.OFFLINE_MODE = Boolean(mode);
    console.log(`Offline mode ${this.OFFLINE_MODE ? 'enabled' : 'disabled'}`);
  }

  // Get current configuration
  getConfig() {
    return {
      apiBaseUrl: this.API_BASE_URL,
      fileBaseUrl: this.FILE_BASE_URL,
      cacheDuration: this.CACHE_DURATION,
      offlineMode: this.OFFLINE_MODE
    };
  }

  // Reset to default configuration
  reset(config = {}) {
    this.API_BASE_URL = config.apiBaseUrl || 
      process.env.REACT_APP_API_BASE_URL || 
      "http://127.0.0.1:8000";
    
    this.FILE_BASE_URL = config.fileBaseUrl || 
      process.env.REACT_APP_FILE_BASE_URL || 
      "https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data";
    
    this.CACHE_DURATION = config.cacheDuration || 3600000;
    this.OFFLINE_MODE = config.offlineMode || false;

    // Recreate axios instance
    this.api = axios.create({
      baseURL: this.API_BASE_URL,
      timeout: 5000,
    });

    // Clear existing cache
    this.cache.clear();
  }
}

// Singleton instance
const dataFetcher = new DataFetcher();

export default dataFetcher;

// Utility for creating multiple data fetcher instances
export const createDataFetcher = (config) => {
  return new DataFetcher(config);
};