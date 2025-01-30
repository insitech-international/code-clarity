import FileManager from './fileManager';

class DataFetcher {
  constructor(config = {}) {
    const isProduction = !window.location.hostname.includes('localhost') &&
                        !window.location.hostname.includes('127.0.0.1');

    this.config = {
      apiBaseUrl: "http://127.0.0.1:8000",
      isDevelopment: !isProduction,
      apiTimeout: 5000
    };

    console.log('DataFetcher initialized:', {
      environment: isProduction ? 'production' : 'development',
      apiBaseUrl: this.config.apiBaseUrl,
      isDevelopment: this.config.isDevelopment,
    });
  }

  async fetchApi(path, params = null) {
    if (!path) return null;
    const cleanPath = path.replace(/\/$/, '');
    const url = `${this.config.apiBaseUrl}${cleanPath}`;
    
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(this.config.apiTimeout)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.warn('API fetch failed:', error);
      return null;
    }
  }

  // Add back fetchData method for backward compatibility
  async fetchData(apiPath, staticPath = null, params = null) {
    if (!apiPath && !staticPath) return null;

    try {
      // Development mode: API only
      if (this.config.isDevelopment) {
        return await this.fetchApi(apiPath, params);
      }

      // Production mode: Try static first, then API fallback
      if (staticPath) {
        try {
          // Use FileManager to get static content
          if (staticPath.includes('questions/')) {
            const questionId = this.extractIdFromPath(staticPath);
            if (questionId) {
              const result = await FileManager.findQuestionById(questionId);
              if (result) return result;
            }
          } else if (staticPath.includes('categories')) {
            const questions = await FileManager.getAllQuestions();
            const categories = new Set(questions.map(q => q.category).filter(Boolean));
            return Array.from(categories).sort();
          }
        } catch (error) {
          console.warn('Static content fetch failed, trying API:', error);
        }
      }

      // API fallback
      return await this.fetchApi(apiPath, params);
    } catch (error) {
      console.error('fetchData failed:', error);
      return null;
    }
  }

  // Helper method to extract ID from path
  extractIdFromPath(path) {
    const match = path.match(/\/(\d+)_/);
    return match ? parseInt(match[1]) : null;
  }

  async getContent(id, type = 'question') {
    try {
      if (this.config.isDevelopment) {
        return await this.fetchApi(`/${type}s/${id}`);
      }

      // Use FileManager for production
      const result = type === 'question' 
        ? await FileManager.findQuestionById(id)
        : await FileManager.findSolutionById(id);

      if (!result) {
        // Fallback to API if file not found
        return await this.fetchApi(`/${type}s/${id}`);
      }

      return result;
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

      const questions = await FileManager.getAllQuestions();
      const categories = new Set(questions.map(q => q.category).filter(Boolean));
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  async getFeaturedQuestions() {
    try {
      if (this.config.isDevelopment) {
        return await this.fetchApi('/featured_questions');
      }

      const allQuestions = await FileManager.getAllQuestions();
      const questionsByCategory = {};

      // Group questions by category and take first 6 from each
      allQuestions.forEach(question => {
        if (!question?.category) return;

        if (!questionsByCategory[question.category]) {
          questionsByCategory[question.category] = [];
        }

        if (questionsByCategory[question.category].length < 6) {
          questionsByCategory[question.category].push(question);
        }
      });

      return questionsByCategory;
    } catch (error) {
      console.error('Error getting featured questions:', error);
      return {};
    }
  }

  clearCache() {
    FileManager.clearCache();
  }
}

// Create singleton instance
const dataFetcher = new DataFetcher();

export { DataFetcher };
export default dataFetcher;