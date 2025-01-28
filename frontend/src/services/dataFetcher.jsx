// Define the correct base URL for production
const GITHUB_BASE_URL = 'https://insitech-international.github.io/code-clarity';

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

    return path.endsWith('.json') ? response.json() : response.text();
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

  async loadIndex() {
    try {
      let indexData;

      if (this.DEVELOPMENT_MODE) {
        indexData = await this.fetchFromAPI('/api/index');
      } else {
        try {
          indexData = await this.fetchFromAPI('/api/index');
        } catch {
          indexData = await this.fetchFromGitHub('static/data/index.json');
        }
      }

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
    // Return null for invalid/null IDs
    if (!id) return null;

    // Load index if not already loaded
    if (this.questions.size === 0) {
      await this.loadIndex();
    }

    const pathMap = type === 'question' ? this.questions : this.solutions;
    const path = pathMap.get(id.toString());

    // Return null if no path found for the ID
    if (!path) {
      console.warn(`No ${type} found for ID: ${id}`);
      return null;
    }

    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI(`/api/${type}s/${id}`);
    }

    // Production: try API first, then GitHub
    try {
      const apiResult = await this.fetchFromAPI(`/api/${type}s/${id}`);
      if (apiResult) return apiResult;
    } catch {
      return this.fetchFromGitHub(path);
    }
  }

  async getCategories() {
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI('/categories');
    }

    try {
      const apiResult = await this.fetchFromAPI('/categories');
      if (apiResult) return apiResult;
    } catch {
      return this.fetchFromGitHub('static/data/categories.json');
    }
  }

  async getFeaturedQuestions() {
    if (this.DEVELOPMENT_MODE) {
      return this.fetchFromAPI('/featured_questions');
    }

    try {
      const apiResult = await this.fetchFromAPI('/featured_questions');
      if (apiResult) return apiResult;
    } catch {
      return this.fetchFromGitHub('static/data/featured.json');
    }
  }
}

// Create a singleton instance
const dataFetcher = new DataFetcher();

export { DataFetcher };
export default dataFetcher;