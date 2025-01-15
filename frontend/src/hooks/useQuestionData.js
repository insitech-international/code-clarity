import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FileManager from "../services/fileManager";

class DataFetcher {
  constructor(config) {
    this.API_BASE_URL = config.apiBaseUrl || "http://127.0.0.1:8000";
    this.FILE_BASE_URL =
      config.fileBaseUrl ||
      "https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data";
    this.CACHE_DURATION = config.cacheDuration || 3600000;

    this.api = axios.create({
      baseURL: this.API_BASE_URL,
      timeout: 5000,
    });

    this.cache = new Map();
  }

  async fetchData(apiPath, filePath = null, params = null) {
    const cacheKey = this._generateCacheKey(apiPath, filePath, params);

    const cachedData = this._getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const apiData = await this._fetchFromAPI(apiPath, params);
      this._saveToCache(cacheKey, apiData);
      return apiData;
    } catch (apiError) {
      console.warn(
        `API fetch failed for ${apiPath}, falling back to static files:`,
        apiError
      );

      if (!filePath) {
        throw new Error(`No static file fallback path provided for ${apiPath}`);
      }

      try {
        const fileData = await this._fetchFromStatic(filePath);
        this._saveToCache(cacheKey, fileData);
        return fileData;
      } catch (fileError) {
        console.error("Static file fetch also failed:", fileError);
        throw new Error(
          `Failed to fetch data from both API and static files: ${apiPath}`
        );
      }
    }
  }

  async _fetchFromAPI(apiPath, params) {
    const response = await this.api.get(
      apiPath,
      params ? { params } : undefined
    );
    return response.data;
  }

  async _fetchFromStatic(filePath) {
    const fullPath = `${this.FILE_BASE_URL}${filePath}`;
    const response = await fetch(fullPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  }

  _generateCacheKey(apiPath, filePath, params) {
    return JSON.stringify({ apiPath, filePath, params });
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
      timestamp: Date.now(),
    });
  }

  clearCache() {
    this.cache.clear();
  }

  async postData(apiPath, data) {
    try {
      const response = await this.api.post(apiPath, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${apiPath}:`, error);
      throw error;
    }
  }
}

// Create a singleton instance
const dataFetcher = new DataFetcher({
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  fileBaseUrl: process.env.REACT_APP_FILE_BASE_URL,
  cacheDuration: 3600000,
});

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await dataFetcher.fetchData("/categories/", "/index.json");

        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data.questions) {
          const uniqueCategories = [
            ...new Set(
              data.questions
                .filter((q) => q.path)
                .map((q) => {
                  const pathParts = q.path.split("/");
                  return pathParts[pathParts.indexOf("questions") + 1];
                })
            ),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useQuestionData = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [indexData, setIndexData] = useState(null);

  useEffect(() => {
    const loadIndexData = async () => {
      try {
        const data = await dataFetcher.fetchData(null, "/index.json");
        setIndexData(data);
      } catch (err) {
        console.error("Error loading index data:", err);
        setError("Failed to load index data");
      }
    };

    if (!indexData) {
      loadIndexData();
    }
  }, [indexData]);

  const fetchQuestions = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const data = await dataFetcher.fetchData("/questions/", null, params);
        setQuestions(data.questions || []);
        return data;
      } catch (apiError) {
        try {
          if (!indexData) {
            throw new Error("Index data not loaded");
          }

          let filteredQuestions = indexData.questions.filter(
            (q) => q.id != null
          );

          if (params.category) {
            filteredQuestions = filteredQuestions.filter((q) =>
              q.path.includes(`/questions/${params.category}/`)
            );
          }

          const skip = params.skip || 0;
          const limit = params.limit || 10;
          const paginatedQuestions = filteredQuestions.slice(
            skip,
            skip + limit
          );

          const questionDetails = await Promise.all(
            paginatedQuestions.map(async (q) => {
              const questionPath = q.path.replace(/^.*?\/static\/data/, "");
              const content = await fetch(
                `${dataFetcher.FILE_BASE_URL}${questionPath}`
              );
              const text = await content.text();
              return FileManager.parseQuestionFile(text, q.path);
            })
          );

          setQuestions(questionDetails);
          return {
            questions: questionDetails,
            total: filteredQuestions.length,
            skip,
            limit,
          };
        } catch (err) {
          console.error("Error fetching questions:", err);
          setError("Failed to fetch questions. Please try again later.");
          return { questions: [], total: 0, skip: 0, limit: 0 };
        }
      } finally {
        setLoading(false);
      }
    },
    [indexData]
  );

  const fetchQuestionDetails = useCallback(
    async (questionId) => {
      try {
        return await dataFetcher.fetchData(`/questions/${questionId}/`);
      } catch (apiError) {
        if (!indexData) {
          throw new Error("Index data not loaded");
        }

        const questionInfo = indexData.questions.find(
          (q) => q.id === parseInt(questionId)
        );
        if (!questionInfo) {
          throw new Error(`Question with ID ${questionId} not found`);
        }

        const questionPath = questionInfo.path.replace(
          /^.*?\/static\/data/,
          ""
        );
        const response = await fetch(
          `${dataFetcher.FILE_BASE_URL}${questionPath}`
        );
        const content = await response.text();
        return FileManager.parseQuestionFile(content, questionInfo.path);
      }
    },
    [indexData]
  );

  const fetchSolution = useCallback(
    async (questionId) => {
      try {
        return await dataFetcher.fetchData(`/solutions/${questionId}/`);
      } catch (apiError) {
        if (!indexData) {
          throw new Error("Index data not loaded");
        }

        const solutionInfo = indexData.solutions.find(
          (s) => s.id === parseInt(questionId)
        );
        if (!solutionInfo) {
          throw new Error(`Solution for question ID ${questionId} not found`);
        }

        const solutionPath = solutionInfo.path.replace(
          /^.*?\/static\/data/,
          ""
        );
        const response = await fetch(
          `${dataFetcher.FILE_BASE_URL}${solutionPath}`
        );
        const content = await response.text();
        return FileManager.parseSolutionFile(content, solutionInfo.path);
      }
    },
    [indexData]
  );

  const fetchFeaturedQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // First attempt: Try to get featured questions from API
      const apiResponse = await dataFetcher.fetchData(
        "/featured_questions/",
        "/index.json"
      );
      console.log(`API Response: ${JSON.stringify(apiResponse)}`);
      if (apiResponse) {
        // && apiResponse.featured_questions
        return apiResponse;
      }

      // Load or use existing index data
      let workingIndexData = indexData;
      if (!workingIndexData) {
        workingIndexData = await dataFetcher.fetchData(null, "/index.json");
        if (!workingIndexData) {
          throw new Error("Failed to load index data");
        }
        setIndexData(workingIndexData);
      }

      // Check if workingIndexData.questions exists before accessing it
      if (!workingIndexData.questions) {
        throw new Error("Index data does not contain questions");
      }

      // Get the first 5 questions from index data
      const featuredIds = workingIndexData.questions
        .filter((q) => q.id != null)
        .slice(0, 5)
        .map((q) => q.id);

      // Fetch full details for each featured question
      const featuredQuestions = await Promise.all(
        featuredIds.map(async (id) => {
          try {
            const questionInfo = workingIndexData.questions.find(
              (q) => q.id === id
            );
            if (!questionInfo) {
              throw new Error(`Question with ID ${id} not found`);
            }

            const questionPath = questionInfo.path.replace(
              /^.*?\/static\/data/,
              ""
            );
            const content = await dataFetcher.fetchData(
              `/questions/${id}/`,
              questionPath
            );

            if (typeof content === "string") {
              return FileManager.parseQuestionFile(content, questionInfo.path);
            }

            return content;
          } catch (err) {
            console.error(`Error fetching featured question ${id}:`, err);
            return null;
          }
        })
      );

      const validFeaturedQuestions = featuredQuestions.filter(
        (q) => q !== null
      );

      if (validFeaturedQuestions.length === 0) {
        throw new Error("No featured questions could be loaded");
      }

      return { featured_questions: validFeaturedQuestions };
    } catch (err) {
      console.error("Error fetching featured questions:", err);
      setError("Failed to fetch featured questions. Please try again later.");
      return { featured_questions: [] };
    } finally {
      setLoading(false);
    }
  }, [indexData, dataFetcher]);

  const testDbConnection = useCallback(async () => {
    try {
      return await dataFetcher.fetchData("/test-db-connection");
    } catch (err) {
      console.error("Error testing DB connection:", err);
      throw new Error("Failed to test DB connection");
    }
  }, []);

  const triggerDatabaseUpdate = useCallback(async () => {
    try {
      return await dataFetcher.postData("/update-database");
    } catch (err) {
      console.error("Error triggering database update:", err);
      throw new Error("Failed to trigger database update");
    }
  }, []);

  return {
    questions,
    loading,
    error,
    fetchQuestions,
    fetchQuestionDetails,
    fetchSolution,
    fetchFeaturedQuestions,
    testDbConnection,
    triggerDatabaseUpdate,
  };
};
