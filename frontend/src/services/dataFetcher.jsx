class DataFetcher {
    constructor(config = {}) {
      const isProduction = !window.location.hostname.includes('localhost') && 
                          !window.location.hostname.includes('127.0.0.1');
      
      this.API_BASE_URL = "http://127.0.0.1:8000";
      this.STATIC_BASE_URL = '/static/data';
      this.DEVELOPMENT_MODE = !isProduction;
      this.CACHE_DURATION = config.cacheDuration || 3600000;
      this.API_TIMEOUT = 5000;
      this.cache = new Map();
  
      // Bind methods to this instance
      this.fetchData = this.fetchData.bind(this);
      this._getFromCache = this._getFromCache.bind(this);
      this._saveToCache = this._saveToCache.bind(this);
  
      console.log('DataFetcher initialized:', {
        environment: isProduction ? 'production' : 'development',
        API_BASE_URL: this.API_BASE_URL,
        STATIC_BASE_URL: this.STATIC_BASE_URL,
        DEVELOPMENT_MODE: this.DEVELOPMENT_MODE
      });
    }
  
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
        return await this._handleStaticPath(staticPath, params);
      } catch (staticError) {
        console.error('Static file error:', staticError);
        throw staticError;
      }
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
  
    async _handleStaticPath(staticPath, params) {
      // Production only
      if (this.DEVELOPMENT_MODE) {
        throw new Error('Static paths not available in development mode');
      }
  
      switch (staticPath) {
        case '/index.json':
          return this._getIndex();
        case '/featured_questions':
          return this._getFeaturedQuestionsStatic();
        case '/categories':
          return this._getCategoriesStatic();
        case '/questions':
          return this._getQuestionsListStatic(params);
        default:
          if (staticPath.includes('/questions/')) {
            const id = parseInt(staticPath.split('/').pop());
            return this._getQuestionDetailStatic(id);
          }
          if (staticPath.includes('/solutions/')) {
            const id = parseInt(staticPath.split('/').pop());
            return this._getSolutionDetailStatic(id);
          }
          throw new Error(`Unhandled static path: ${staticPath}`);
      }
    }
  
    // ... rest of the static file handlers ...
  }
  
  const dataFetcher = new DataFetcher();
  export { DataFetcher };
  export default dataFetcher;