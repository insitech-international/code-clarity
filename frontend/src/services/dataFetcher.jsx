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

    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const url = `${this.STATIC_BASE_URL}/${cleanPath}`;

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
      let indexData = await this.fetchData(
        '/api/index',
        'static/data/index.json'
      );

      // Map the paths
      this.questions.clear();
      this.solutions.clear();

      if (indexData?.questions) {
        indexData.questions.forEach(item => {
          if (item?.id && item?.path) {
            this.questions.set(item.id.toString(), item.path);
          }
        });
      }

      if (indexData?.solutions) {
        indexData.solutions.forEach(item => {
          if (item?.id && item?.path) {
            this.solutions.set(item.id.toString(), item.path);
          }
        });
      }

      return indexData;
    } catch (error) {
      console.error('Error loading index:', error);
      throw error;
    }
  }

  async getContent(id, type = 'question') {
    if (!id) return null;

    if (this.questions.size === 0) {
      await this.loadIndex();
    }

    const pathMap = type === 'question' ? this.questions : this.solutions;
    const path = pathMap.get(id.toString());

    if (!path) {
      console.warn(`No ${type} found for ID: ${id}`);
      return null;
    }

    return this.fetchData(`/api/${type}s/${id}`, path);
  }

  async getCategories() {
    return this.fetchData('/categories', 'static/data/categories.json');
  }

  async getFeaturedQuestions() {
    return this.fetchData('/featured_questions', 'static/data/featured.json');
  }
}

// Create a singleton instance
const dataFetcher = new DataFetcher();

export { DataFetcher };
export default dataFetcher;