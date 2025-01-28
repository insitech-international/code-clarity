// Define the correct base URL for production
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages';

class DataFetcher {
  constructor(config = {}) {
    // Determine if the environment is production
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    // Initialize properties
    this.API_BASE_URL = "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = isProduction ? GITHUB_BASE_URL : '';
    this.DEVELOPMENT_MODE = !isProduction;
    this.API_TIMEOUT = 5000;

    // Content mappings
    this.questions = new Map();
    this.solutions = new Map();

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      API_BASE_URL: this.API_BASE_URL,
      STATIC_BASE_URL: this.STATIC_BASE_URL,
      DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
    });
  }

  async fetchFromGitHub(path) {
    if (!path) return null;

    const url = `${this.STATIC_BASE_URL}/${path}`;
    console.log('Fetching from GitHub:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status}`);
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

  async loadIndex() {
    try {
      // In development, get data from API. In production, from static files
      let indexData;
      if (this.DEVELOPMENT_MODE) {
        // In development, construct index from API questions list
        const response = await this.fetchFromAPI('/questions/');
        indexData = {
          questions: response.questions.map(q => ({
            id: q.question_id,
            path: `static/data/questions/${q.question_id}_${q.title.replace(/\s+/g, '_')}.md`
          }))
        };
      } else {
        // In production, get from static index.json
        indexData = await this.fetchFromGitHub('static/data/index.json');
      }

      // Map the paths
      this.questions.clear();
      this.solutions.clear();

      if (indexData?.questions) {
        indexData.questions.forEach(item => {
          if (item?.id) {
            this.questions.set(item.id.toString(), item.path);
          }
        });
      }

      if (indexData?.solutions) {
        indexData.solutions.forEach(item => {
          if (item?.id) {
            this.solutions.set(item.id.toString(), item.path);
          }
        });
      }

      console.log('Loaded paths:', {
        questions: this.questions.size,
        solutions: this.solutions.size
      });

      return indexData;
    } catch (error) {
      console.error('Error loading index:', error);
      throw error;
    }
  }

  async getContent(id, type = 'question') {
    if (!id) return null;

    // Load index if paths aren't loaded
    if (this.questions.size === 0) {
      await this.loadIndex();
    }

    if (this.DEVELOPMENT_MODE) {
      // In development, use API directly
      return this.fetchFromAPI(`/${type}s/${id}`);
    }

    // In production, get path from index and fetch static file
    const pathMap = type === 'question' ? this.questions : this.solutions;
    const path = pathMap.get(id.toString());

    if (!path) {
      console.warn(`No ${type} found for ID: ${id}`);
      return null;
    }

    return this.fetchFromGitHub(path);
  }

  async getCategories() {
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI('/categories');
    }

    // In production, derive categories from paths
    if (this.questions.size === 0) {
      await this.loadIndex();
    }

    return Array.from(new Set(
      Array.from(this.questions.values())
        .map(path => path.split('/')[3])
        .filter(Boolean)
    ));
  }

  async getFeaturedQuestions() {
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI('/featured_questions');
    }

    // In production, get first 6 questions from each category
    if (this.questions.size === 0) {
      await this.loadIndex();
    }

    const questionsByCategory = {};
    Array.from(this.questions.entries()).forEach(([id, path]) => {
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

  // Additional helper methods
  async testConnection() {
    try {
      const response = await this.fetchFromAPI('/test-connection');
      return response?.status === 'success';
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  clearCache() {
    this.questions.clear();
    this.solutions.clear();
    console.log('Cache cleared');
  }
}

// Create a singleton instance
const dataFetcher = new DataFetcher();

export { DataFetcher };
export default dataFetcher;