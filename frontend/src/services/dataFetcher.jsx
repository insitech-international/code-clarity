class DataFetcher {
    constructor(config = {}) {
      // Initialize properties
      const isProduction = !window.location.hostname.includes('localhost') && 
                          !window.location.hostname.includes('127.0.0.1');
      
      this.API_BASE_URL = "http://127.0.0.1:8000";
      this.STATIC_BASE_URL = '/static/data';
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
  
    // Core data fetching method
    async fetchData(apiPath, staticPath = null, params = null) {
      // Development mode: Only use API
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
            ...(params && { params })
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
  
      // Production mode: Try API first, then fallback to static
      try {
        if (apiPath) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);
  
          const response = await fetch(`${this.API_BASE_URL}${apiPath}`, {
            signal: controller.signal,
            ...(params && { params })
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
        console.log('Fetching static file:', `${this.STATIC_BASE_URL}${staticPath}`);
        const response = await fetch(`${this.STATIC_BASE_URL}${staticPath}`);
  
        if (!response.ok) {
          throw new Error(`Static file fetch failed: ${response.status}`);
        }
  
        const contentType = response.headers.get('content-type');
        let data;
        
        // Try JSON first, fallback to text
        try {
          data = await response.json();
        } catch {
          data = await response.text();
        }
  
        return data;
      } catch (staticError) {
        console.error('Static file error:', staticError);
        throw staticError;
      }
    }
  
    // Helper method for testing connection
    async testConnection() {
      try {
        const response = await fetch(`${this.API_BASE_URL}/test-connection`);
        return response.ok;
      } catch {
        return false;
      }
    }
  }
  
  // Create singleton instance
  const dataFetcher = new DataFetcher();
  
  // Export both the instance and the class
  export { DataFetcher };
  export default dataFetcher;