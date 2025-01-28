// Define the correct base URL for production
const GITHUB_BASE_URL = 'https://insitech-international.github.io/code-clarity/';

class DataFetcher {
  constructor(config = {}) {
    // Determine if the environment is production
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    // Initialize properties
    this.API_BASE_URL = "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = isProduction
      ? GITHUB_BASE_URL
      : ''; // Use local static data in development
    this.DEVELOPMENT_MODE = !isProduction;
    this.CACHE_DURATION = config.cacheDuration || 3600000; // Cache for 1 hour by default
    this.API_TIMEOUT = 5000; // Timeout for API requests
    this.cache = new Map();

    // Store valid question/solution mappings
    this.questionPaths = new Map();
    this.solutionPaths = new Map();

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      API_BASE_URL: this.API_BASE_URL,
      STATIC_BASE_URL: this.STATIC_BASE_URL,
      DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
    });
  }

  // Initialize paths from index data
  async initializeIndex() {
    try {
      const indexData = await this.fetchData('/api/index', 'static/data/index.json');

      // Clear existing mappings
      this.questionPaths.clear();
      this.solutionPaths.clear();

      // Store question paths
      if (indexData.questions) {
        indexData.questions.forEach(item => {
          if (item.id && item.path) {
            this.questionPaths.set(item.id.toString(), item.path);
          }
        });
      }

      // Store solution paths (assuming similar structure)
      if (indexData.solutions) {
        indexData.solutions.forEach(item => {
          if (item.id && item.path) {
            this.solutionPaths.set(item.id.toString(), item.path);
          }
        });
      }

      console.log('Index initialized:', {
        questions: this.questionPaths.size,
        solutions: this.solutionPaths.size
      });
    } catch (error) {
      console.error('Failed to initialize index:', error);
      throw error;
    }
  }

  // Core data fetching method
  async fetchData(apiPath, staticPath = null, params = null) {
    // Development mode: Fetch from API only
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
          ...(params && { params }),
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

    // Production mode: Try API first, then fallback to static files
    try {
      if (apiPath) {
        console.log('Attempting API fetch:', `${this.API_BASE_URL}${apiPath}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.API_TIMEOUT);

        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, {
          signal: controller.signal,
          ...(params && { params }),
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
      const staticURL = `${this.STATIC_BASE_URL}${staticPath}`;
      console.log('Fetching static file:', staticURL);

      const response = await fetch(staticURL);

      if (!response.ok) {
        throw new Error(`Static file fetch failed: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let data;

      // Try JSON first, fallback to text
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return data;
    } catch (staticError) {
      console.error('Static file error:', staticError);
      throw staticError;
    }
  }

  // Get question by ID
  async getQuestion(id) {
    if (!this.questionPaths.size) {
      await this.initializeIndex();
    }

    const path = this.questionPaths.get(id.toString());
    if (!path) {
      throw new Error(`Invalid question ID: ${id}`);
    }

    return this.fetchData(`/api/questions/${id}`, path);
  }

  // Get solution by ID
  async getSolution(id) {
    if (!this.solutionPaths.size) {
      await this.initializeIndex();
    }

    const path = this.solutionPaths.get(id.toString());
    if (!path) {
      throw new Error(`Invalid solution ID: ${id}`);
    }

    return this.fetchData(`/api/solutions/${id}`, path);
  }

  // Get all valid question IDs
  getValidQuestionIds() {
    return Array.from(this.questionPaths.keys());
  }

  // Get all valid solution IDs
  getValidSolutionIds() {
    return Array.from(this.solutionPaths.keys());
  }

  // Helper method for testing API connection
  async testConnection() {
    try {
      const response = await fetch(`${this.API_BASE_URL}/test-connection`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Create a singleton instance of the DataFetcher class
const dataFetcher = new DataFetcher();

// Export both the instance and the class
export { DataFetcher };
export default dataFetcher;