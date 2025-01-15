import axios from "axios";
import FileManager from "./fileManager";

class DataFetcher {
    constructor(config = {}) {
      // Determine environment
      const isProduction = !window.location.hostname.includes('localhost') && 
                          !window.location.hostname.includes('127.0.0.1');
      
      // In both environments, try API first
      this.API_BASE_URL = "http://127.0.0.1:8000";
      this.STATIC_BASE_URL = '/static/data';
      
      // In development: Only use API
      // In production: Try API first, fallback to static
      this.DEVELOPMENT_MODE = !isProduction;
      this.CACHE_DURATION = config.cacheDuration || 3600000;
      this.API_TIMEOUT = 5000;
      this.cache = new Map();
  
      console.log('DataFetcher initialized:', {
        environment: isProduction ? 'production' : 'development',
        API_BASE_URL: this.API_BASE_URL,
        STATIC_BASE_URL: this.STATIC_BASE_URL,
        DEVELOPMENT_MODE: this.DEVELOPMENT_MODE
      });
    }
  
    async fetchData(apiPath, filePath = null, params = null) {
      if (!apiPath) {
        throw new Error('API path is required');
      }
  
      const cacheKey = this._generateCacheKey(apiPath, filePath, params);
      const cachedData = this._getFromCache(cacheKey);
      
      if (cachedData) {
        console.log('Using cached data for:', apiPath);
        return cachedData;
      }
  
      // Always try API first
      try {
        console.log('Attempting API fetch:', `${this.API_BASE_URL}${apiPath}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);
  
        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, {
          signal: controller.signal,
          ...(params && { params })
        });
        
        clearTimeout(timeoutId);
  
        if (response.ok) {
          const data = await response.json();
          this._saveToCache(cacheKey, data);
          console.log('API fetch successful');
          return data;
        }
        throw new Error('API request failed');
      } catch (apiError) {
        console.warn('API fetch failed:', apiError);
  
        // In development mode, don't fall back to static files
        if (this.DEVELOPMENT_MODE) {
          throw new Error('API is required in development mode');
        }
  
        // In production, try static files as fallback
        if (!filePath) {
          throw new Error('No static file path provided for fallback');
        }
  
        // Attempt static file fallback
        try {
          console.log('Falling back to static file:', `${this.STATIC_BASE_URL}${filePath}`);
          const response = await fetch(`${this.STATIC_BASE_URL}${filePath}`);
  
          if (!response.ok) {
            throw new Error(`Static file fetch failed: ${response.status}`);
          }
  
          // Clone the response before reading it
          const responseClone = response.clone();
  
          try {
            // Try to parse as JSON first
            const jsonData = await response.json();
            this._saveToCache(cacheKey, jsonData);
            console.log('Static file fetch successful');
            return jsonData;
          } catch (jsonError) {
            // If JSON parsing fails, get as text
            const textData = await responseClone.text();
            this._saveToCache(cacheKey, textData);
            return textData;
          }
        } catch (staticError) {
          console.error('Static file fetch error:', staticError);
          throw new Error(`Failed to fetch from both API and static files: ${staticError.message}`);
        }
      }
    }
  
    _generateCacheKey(apiPath, filePath, params) {
      return JSON.stringify({ apiPath, filePath, params });
    }
  
    _getFromCache(key) {
      const cached = this.cache.get(key);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }
      return null;
    }
  
    _saveToCache(key, data) {
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
    }
  
    clearCache(key = null) {
      if (key) this.cache.delete(key);
      else this.cache.clear();
    }
  
    getConfig() {
      return {
        apiBaseUrl: this.API_BASE_URL,
        staticBaseUrl: this.STATIC_BASE_URL,
        developmentMode: this.DEVELOPMENT_MODE,
        environment: this.DEVELOPMENT_MODE ? 'development' : 'production'
      };
    }
  }
  
  // Create singleton instance
  const dataFetcher = new DataFetcher();
  
  // Export both the instance and the class
  export { DataFetcher };
  export default dataFetcher;