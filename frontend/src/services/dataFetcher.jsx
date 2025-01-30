class DataFetcher {
  constructor(config = {}) {
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    this.config = {
      apiBaseUrl: "http://127.0.0.1:8000",
      githubBaseUrl: 'https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages',
      isDevelopment: !isProduction,
      apiTimeout: 5000,
      staticPaths: {
        index: 'static/data/index.json',
        categories: 'static/data/categories.json',
        questions: 'static/data/questions',
        solutions: 'static/data/solutions'
      }
    };

    // Cache for content paths
    this.contentPaths = {
      questions: new Map(),
      solutions: new Map()
    };

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      apiBaseUrl: this.config.apiBaseUrl,
      githubBaseUrl: this.config.githubBaseUrl,
      isDevelopment: this.config.isDevelopment,
    });
  }

  constructGitHubUrl(relativePath) {
    if (!relativePath) return null;
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${this.config.githubBaseUrl}/${cleanPath}`;
  }

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.apiTimeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const isJson = response.headers.get('content-type')?.includes('application/json');
      return isJson ? response.json() : response.text();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchData(apiPath, staticPath = null, params = null) {
    if (!apiPath && !staticPath) return null;

    try {
      // Development mode: API only
      if (this.config.isDevelopment) {
        return await this.fetchApi(apiPath, params);
      }

      // Production mode: Static first, then API fallback
      if (staticPath) {
        try {
          const staticResult = await this.fetchStatic(staticPath);
          if (staticResult) return staticResult;
        } catch (error) {
          console.warn('Static fetch failed, trying API:', error);
        }
      }

      // API fallback
      return await this.fetchApi(apiPath, params);
    } catch (error) {
      console.error('fetchData failed:', error);
      return null;
    }
  }
  
  async fetchStatic(path) {
    if (!path) return null;
    const url = this.constructGitHubUrl(path);
    console.log('Fetching static content:', url);
    return this.fetchWithTimeout(url);
  }

  async fetchApi(path, params = null) {
    if (!path) return null;
    const url = `${this.config.apiBaseUrl}${path}`;
    console.log('Fetching from API:', url);
    
    try {
      return await this.fetchWithTimeout(url, {
        ...(params && { params })
      });
    } catch (error) {
      console.warn('API fetch failed:', error);
      return null;
    }
  }

  async loadContentPaths() {
    if (this.contentPaths.questions.size > 0) return;

    try {
      const indexData = await this.fetchStatic(this.config.staticPaths.index);
      
      // Process questions
      indexData?.questions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.questions.set(item.id.toString(), item.path);
        }
      });

      // Process solutions
      indexData?.solutions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.solutions.set(item.id.toString(), item.path);
        }
      });

      console.log('Content paths loaded:', {
        questions: this.contentPaths.questions.size,
        solutions: this.contentPaths.solutions.size
      });
    } catch (error) {
      console.error('Failed to load content paths:', error);
      throw error;
    }
  }

  async getContent(id, type = 'question') {
    if (!id) return null;

    try {
      // Development mode: API only
      if (this.config.isDevelopment) {
        return await this.fetchApi(`/${type}s/${id}`);
      }

      // Production mode: Static first, API fallback
      await this.loadContentPaths();
      const contentPath = this.contentPaths[type + 's'].get(id.toString());
      
      if (!contentPath) {
        console.warn(`No ${type} found for ID: ${id}`);
        return await this.fetchApi(`/${type}s/${id}`);
      }

      try {
        return await this.fetchStatic(contentPath);
      } catch (error) {
        console.warn('Static content fetch failed, trying API fallback');
        return await this.fetchApi(`/${type}s/${id}`);
      }
    } catch (error) {
      console.error(`Failed to get ${type} content for ID ${id}:`, error);
      return null;
    }
  }

  async getCategories() {
    try {
      if (this.config.isDevelopment) {
        return await this.fetchApi('/categories');
      }

      // Production: Try static categories.json first
      try {
        const categories = await this.fetchStatic(this.config.staticPaths.categories);
        if (categories) return categories;
      } catch (error) {
        console.warn('Failed to fetch static categories, falling back to API');
      }

      // Fallback to API
      const apiCategories = await this.fetchApi('/categories');
      if (apiCategories) return apiCategories;

      // Last resort: Extract from paths
      await this.loadContentPaths();
      const uniqueCategories = new Set();
      
      for (const path of this.contentPaths.questions.values()) {
        const category = path.split('/')[3];
        if (category) uniqueCategories.add(category);
      }

      return Array.from(uniqueCategories);
    } catch (error) {
      console.error('Failed to get categories:', error);
      return [];
    }
  }

  async getFeaturedQuestions() {
    try {
      if (this.config.isDevelopment) {
        return await this.fetchApi('/featured_questions');
      }

      await this.loadContentPaths();
      const questionsByCategory = {};

      // Group questions by category and take first 6 from each
      for (const [id, path] of this.contentPaths.questions) {
        const category = path.split('/')[3];
        if (!category) continue;

        if (!questionsByCategory[category]) {
          questionsByCategory[category] = [];
        }

        if (questionsByCategory[category].length < 6) {
          questionsByCategory[category].push(parseInt(id));
        }
      }

      return questionsByCategory;
    } catch (error) {
      console.error('Failed to get featured questions:', error);
      return {};
    }
  }

  clearCache() {
    this.contentPaths.questions.clear();
    this.contentPaths.solutions.clear();
    console.log('Cache cleared');
  }
}

// Create singleton instance
const dataFetcher = new DataFetcher();

export { DataFetcher };
export default dataFetcher;