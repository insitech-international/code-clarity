class DataFetcher {
  constructor(config = {}) {
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    this.API_BASE_URL = "http://127.0.0.1:8000";
    this.GITHUB_BASE_URL = 'https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages';
    this.DEVELOPMENT_MODE = !isProduction;
    this.API_TIMEOUT = 5000;

    // Constants for static content paths
    this.STATIC_PATHS = {
      INDEX: 'static/data/index.json',
      QUESTIONS_DIR: 'static/data/questions',
      SOLUTIONS_DIR: 'static/data/solutions'
    };

    // Store content paths for production mode
    this.contentPaths = {
      questions: new Map(),
      solutions: new Map()
    };

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      API_BASE_URL: this.API_BASE_URL,
      GITHUB_BASE_URL: this.GITHUB_BASE_URL,
      DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
    });
  }

  constructGitHubUrl(relativePath) {
    if (!relativePath) return null;
    // Remove any leading slashes and combine with base URL
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${this.GITHUB_BASE_URL}/${cleanPath}`;
  }

  async fetchFromGitHub(path) {
    if (!path) return null;

    const url = this.constructGitHubUrl(path);
    console.log('Fetching from GitHub:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status} for ${url}`);
    }

    const content = await response.text();
    return path.endsWith('.json') ? JSON.parse(content) : content;
  }

  async fetchFromAPI(path, params = null) {
    if (!path) return null;

    console.log('Attempting API fetch:', `${this.API_BASE_URL}${path}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

    try {
      const response = await fetch(`${this.API_BASE_URL}${path}`, {
        signal: controller.signal,
        ...(params && { params }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async loadContentPaths() {
    try {
      if (this.DEVELOPMENT_MODE) return;

      // First, fetch the index.json which contains relative paths
      console.log('Loading index from:', this.STATIC_PATHS.INDEX);
      const indexData = await this.fetchFromGitHub(this.STATIC_PATHS.INDEX);

      // Clear existing paths
      this.contentPaths.questions.clear();
      this.contentPaths.solutions.clear();

      // Store paths with their IDs
      indexData?.questions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.questions.set(item.id.toString(), item.path);
        }
      });

      indexData?.solutions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.solutions.set(item.id.toString(), item.path);
        }
      });

      console.log('Loaded paths:', {
        questions: Array.from(this.contentPaths.questions.entries()),
        solutions: Array.from(this.contentPaths.solutions.entries())
      });
    } catch (error) {
      console.error('Error loading content paths:', error);
      throw error;
    }
  }

  async getContent(id, type = 'question') {
    if (!id) return null;

    // Development mode: use API only
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI(`/${type}s/${id}`);
    }

    // Production mode: try API first
    try {
      const apiResult = await this.fetchFromAPI(`/${type}s/${id}`);
      if (apiResult) return apiResult;
    } catch (error) {
      console.log('API fetch failed, falling back to static content');
    }

    // Load paths if not loaded
    if (this.contentPaths[type + 's'].size === 0) {
      await this.loadContentPaths();
    }

    // Get relative path from contentPaths
    const relativePath = this.contentPaths[type + 's'].get(id.toString());
    if (!relativePath) {
      console.warn(`No ${type} found for ID: ${id}`);
      return null;
    }

    console.log(`Fetching ${type} content from:`, relativePath);
    return this.fetchFromGitHub(relativePath);
  }

  async fetchData(apiPath, staticPath = null, params = null) {
    if (!apiPath && !staticPath) return null;

    if (this.DEVELOPMENT_MODE) {
      try {
        return await this.fetchFromAPI(apiPath, params);
      } catch (error) {
        console.error('API fetch failed in development mode:', error);
        throw error;
      }
    }

    // Production mode: try API first, then fallback to static
    try {
      const apiResult = await this.fetchFromAPI(apiPath, params);
      if (apiResult) return apiResult;
    } catch (error) {
      console.warn('API fetch failed, falling back to static file');
    }

    if (!staticPath) {
      console.warn('No static path provided for fallback');
      return null;
    }

    return this.fetchFromGitHub(staticPath);
  }

  async fetchFromAPI(path, params = null) {
    if (!path) return null;

    console.log('Attempting API fetch:', `${this.API_BASE_URL}${path}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

    try {
      const response = await fetch(`${this.API_BASE_URL}${path}`, {
        signal: controller.signal,
        ...(params && { params }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('API request failed');
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async loadContentPaths() {
    try {
      // Only load paths in production mode
      if (this.DEVELOPMENT_MODE) return;

      // Fetch and parse index.json
      const indexData = await this.fetchFromGitHub('static/data/index.json');

      // Clear existing paths
      this.contentPaths.questions.clear();
      this.contentPaths.solutions.clear();

      // Store question paths
      indexData?.questions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.questions.set(item.id.toString(), item.path);
        }
      });

      // Store solution paths
      indexData?.solutions?.forEach(item => {
        if (item?.id && item?.path) {
          this.contentPaths.solutions.set(item.id.toString(), item.path);
        }
      });

      console.log('Loaded content paths:', {
        questions: this.contentPaths.questions.size,
        solutions: this.contentPaths.solutions.size
      });
    } catch (error) {
      console.error('Error loading content paths:', error);
      throw error;
    }
  }

  async getContent(id, type = 'question') {
    if (!id) return null;

    // Development mode: use API only
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI(`/${type}s/${id}`);
    }

    // Production mode: try API first
    try {
      const apiResult = await this.fetchFromAPI(`/${type}s/${id}`);
      if (apiResult) return apiResult;
    } catch (error) {
      console.log('API fetch failed, falling back to static content');
    }

    // Load paths if not loaded
    if (this.contentPaths[type + 's'].size === 0) {
      await this.loadContentPaths();
    }

    // Get content path
    const contentPath = this.contentPaths[type + 's'].get(id.toString());
    if (!contentPath) {
      console.warn(`No ${type} found for ID: ${id}`);
      return null;
    }

    // Fetch the actual content using the path from index.json
    return this.fetchFromGitHub(contentPath);
  }

  async getCategories() {
    try {
      // Try fetchData first (this handles both dev and prod modes)
      const result = await this.fetchData('/categories', 'static/data/categories.json');
      if (result) return result;
    } catch (error) {
      console.warn('Failed to fetch categories directly, falling back to path extraction');
    }

    // Fallback: extract from paths
    if (this.contentPaths.questions.size === 0) {
      await this.loadContentPaths();
    }

    return Array.from(new Set(
      Array.from(this.contentPaths.questions.values())
        .map(path => path.split('/')[3])
        .filter(Boolean)
    ));
  }

  async getFeaturedQuestions() {
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI('/featured_questions');
    }

    // Load paths if not loaded
    if (this.contentPaths.questions.size === 0) {
      await this.loadContentPaths();
    }

    // Get first 6 questions from each category
    const questionsByCategory = {};
    Array.from(this.contentPaths.questions.entries()).forEach(([id, path]) => {
      const category = path.split('/')[3];
      if (!questionsByCategory[category]) {
        questionsByCategory[category] = [];
      }
      if (questionsByCategory[category].length < 6) {
        questionsByCategory[category].push(parseInt(id));
      }
    });

    return questionsByCategory;
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

