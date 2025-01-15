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
  
      console.log('DataFetcher initialized:', {
        environment: isProduction ? 'production' : 'development',
        API_BASE_URL: this.API_BASE_URL,
        STATIC_BASE_URL: this.STATIC_BASE_URL,
        DEVELOPMENT_MODE: this.DEVELOPMENT_MODE
      });
    }
  
    async fetchData(apiPath, staticFallback = null, params = null) {
      const cacheKey = `${apiPath}-${JSON.stringify(params)}`;
      const cachedData = this._getFromCache(cacheKey);
      if (cachedData) return cachedData;
  
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
        
        // If in development mode, throw error
        if (this.DEVELOPMENT_MODE) {
          throw new Error('API is required in development mode');
        }
  
        // In production, fall back to static files
        console.log('Falling back to static files');
        try {
          const data = await this._handleStaticFetch(apiPath, params);
          this._saveToCache(cacheKey, data);
          return data;
        } catch (staticError) {
          console.error('Static file fetch error:', staticError);
          throw staticError;
        }
      }
    }
  
    async _handleStaticFetch(apiPath, params) {
      switch (apiPath) {
        case '/featured_questions/':
          return this._getFeaturedQuestionsStatic();
        case '/categories/':
          return this._getCategoriesStatic();
        case '/questions/':
          return this._getQuestionsListStatic(params);
        default:
          if (apiPath.startsWith('/questions/')) {
            const id = parseInt(apiPath.split('/').pop());
            return this._getQuestionDetailStatic(id);
          }
          if (apiPath.startsWith('/solutions/')) {
            const id = parseInt(apiPath.split('/').pop());
            return this._getSolutionDetailStatic(id);
          }
          throw new Error(`No static handler for ${apiPath}`);
      }
    }
  
    async _getIndex() {
      const response = await fetch(`${this.STATIC_BASE_URL}/index.json`);
      if (!response.ok) throw new Error('Failed to fetch index.json');
      const data = await response.json();
      
      // Only filter null IDs for questions, keep all solutions
      return {
        questions: data.questions.filter(q => q.id !== null),
        solutions: data.solutions
      };
    }
  
    async _fetchMarkdownContent(path) {
      // Clean up the path
      const cleanPath = path.replace(/^.*?\/static\/data/, '');
      const response = await fetch(`${this.STATIC_BASE_URL}${cleanPath}`);
      if (!response.ok) throw new Error(`Failed to fetch content: ${cleanPath}`);
      const content = await response.text();
      return this._parseMarkdownContent(content);
    }
  
    _parseMarkdownContent(content) {
      const sections = {};
      let currentSection = null;
      const lines = content.split('\n');
      let metadata = {};
      let inMetadata = false;
  
      for (const line of lines) {
        if (line.trim() === '# Metadata') {
          inMetadata = true;
          continue;
        }
  
        if (inMetadata) {
          if (line.trim() === '') {
            inMetadata = false;
            continue;
          }
          const match = line.match(/^\s*-\s*\*\*([\w\s-]+)\*\*:\s*(.+)$/);
          if (match) {
            const [, key, value] = match;
            metadata[key.toLowerCase().replace(/\s+/g, '_')] = value.trim();
          }
          continue;
        }
  
        const sectionMatch = line.match(/^#\s+(.+)$/);
        if (sectionMatch) {
          currentSection = sectionMatch[1].toLowerCase().replace(/\s+/g, '_');
          sections[currentSection] = '';
          continue;
        }
  
        if (currentSection) {
          sections[currentSection] += line + '\n';
        }
      }
  
      return { metadata, ...sections };
    }
  
    async _getFeaturedQuestionsStatic() {
      const { questions } = await this._getIndex();
      
      // Get full content for each question and group by category
      const detailedQuestions = await Promise.all(
        questions.map(async q => {
          const content = await this._fetchMarkdownContent(q.path);
          return { ...q, ...content };
        })
      );
  
      // Group by category
      const groupedQuestions = detailedQuestions.reduce((acc, question) => {
        const category = question.metadata.category;
        if (!acc[category]) acc[category] = [];
        if (acc[category].length < 6) acc[category].push(question);
        return acc;
      }, {});
  
      return groupedQuestions;
    }
  
    async _getCategoriesStatic() {
      const { questions } = await this._getIndex();
      const categories = new Set();
      
      for (const question of questions) {
        const content = await this._fetchMarkdownContent(question.path);
        if (content.metadata.category) {
          categories.add(content.metadata.category);
        }
      }
  
      return Array.from(categories);
    }
  
    async _getQuestionsListStatic({ category, skip = 0, limit = 10 } = {}) {
      const { questions } = await this._getIndex();
      
      const detailedQuestions = await Promise.all(
        questions.map(async q => {
          const content = await this._fetchMarkdownContent(q.path);
          return { ...q, ...content };
        })
      );
  
      let filteredQuestions = detailedQuestions;
      if (category) {
        filteredQuestions = detailedQuestions.filter(
          q => q.metadata.category.toLowerCase() === category.toLowerCase()
        );
      }
  
      return {
        questions: filteredQuestions.slice(skip, skip + limit),
        total: filteredQuestions.length,
        skip,
        limit
      };
    }
  
    async _getQuestionDetailStatic(id) {
      const { questions } = await this._getIndex();
      const question = questions.find(q => q.id === id);
      if (!question) throw new Error(`Question not found: ${id}`);
      
      const content = await this._fetchMarkdownContent(question.path);
      return { ...question, ...content };
    }
  
    async _getSolutionDetailStatic(id) {
      const { solutions } = await this._getIndex();
      // Only filter for null ID when specifically fetching a solution
      const solution = solutions.find(s => s.id === id);
      if (!solution) throw new Error(`Solution not found: ${id}`);
      
      const content = await this._fetchMarkdownContent(solution.path);
      return { ...solution, ...content };
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
  }
  
  const dataFetcher = new DataFetcher();
  export { DataFetcher };
  export default dataFetcher;