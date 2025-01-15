import { useState, useEffect, useCallback, useMemo } from "react";
import DataFetcher from "../services/dataFetcher";
import FileManager from "../services/fileManager";

// Categories Hook
export const useCategories = (options = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await DataFetcher.fetchData(
          "/categories/",
          "/index.json",
          null,
          options
        );

        let processedCategories = [];
        if (Array.isArray(data)) {
          processedCategories = data;
        } else if (data.questions) {
          processedCategories = [
            ...new Set(
              data.questions
                .filter((q) => q.path)
                .map((q) => {
                  const pathParts = q.path.split("/");
                  return pathParts[pathParts.indexOf("questions") + 1];
                })
            ),
          ];
        }

        setCategories(processedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [JSON.stringify(options)]);

  return { categories, loading, error };
};

// Detailed debug logging function
const logDetailedError = (context, error) => {
  console.error(`[Featured Questions Debug] ${context}`, {
    errorMessage: error.message,
    errorStack: error.stack,
    indexDataStatus: !!window.__DEBUG_INDEX_DATA,
  });
};

// Enhanced fetchFeaturedQuestionsLogic with proper offline fallback
export const fetchFeaturedQuestionsLogic = async (indexData = null) => {
  console.log("Starting featured questions fetch...");

  try {
    // First try the API endpoint
    const apiResponse = await fetch(
      "http://127.0.0.1:8000/featured_questions/",
      {
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      console.log("Successfully fetched from API");
      return data;
    }
  } catch (apiError) {
    console.log("API unavailable, falling back to static files");
  }

  // Fallback to static files
  try {
    // If no index data provided, fetch it
    if (!indexData) {
      const response = await fetch("/static/data/index.json");
      if (!response.ok) throw new Error("Failed to fetch index data");
      indexData = await response.json();
    }

    // Organize questions by category
    const questionsByCategory = {};

    // Process each question in parallel
    const questionPromises = indexData.questions.map(async (questionInfo) => {
      try {
        const response = await fetch(`/static/data/${questionInfo.path}`);
        if (!response.ok) return null;

        const content = await response.text();
        // Parse markdown content to extract metadata
        const metadata = parseMarkdownMetadata(content);
        return {
          ...questionInfo,
          ...metadata,
          content,
        };
      } catch (error) {
        console.error(`Failed to fetch question ${questionInfo.id}:`, error);
        return null;
      }
    });

    const questions = (await Promise.all(questionPromises)).filter(
      (q) => q !== null
    );

    // Group questions by category
    questions.forEach((question) => {
      if (!question.category) return;

      if (!questionsByCategory[question.category]) {
        questionsByCategory[question.category] = [];
      }

      if (questionsByCategory[question.category].length < 6) {
        questionsByCategory[question.category].push(question);
      }
    });

    return questionsByCategory;
  } catch (error) {
    console.error("Failed to process static files:", error);
    throw new Error("Failed to fetch featured questions");
  }
};

// Helper function to parse markdown metadata
const parseMarkdownMetadata = (content) => {
  const metadata = {};
  const lines = content.split("\n");
  let inMetadata = false;

  for (const line of lines) {
    if (line.trim() === "# Metadata") {
      inMetadata = true;
      continue;
    }

    if (inMetadata) {
      if (line.trim() === "") {
        break;
      }

      const match = line.match(/^\s*-\s*\*\*([\w\s-]+)\*\*:\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        metadata[key.toLowerCase().replace(/\s+/g, "_")] = value.trim();
      }
    }
  }

  return metadata;
};

// Modified hook with improved error handling
export const useQuestionData = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [indexData, setIndexData] = useState(null);

  // Load index data (existing logic)
  useEffect(() => {
    const loadIndexData = async () => {
      try {
        const data = await DataFetcher.fetchData(null, "/index.json");
        setIndexData(data);
        // Debug: Store index data globally for inspection
        window.__DEBUG_INDEX_DATA = data;
      } catch (err) {
        console.error("Error loading index data:", err);
        setError("Failed to load index data");
      }
    };

    if (!indexData) {
      loadIndexData();
    }
  }, [indexData]);

  // Fetch Featured Questions with comprehensive error handling
  const fetchFeaturedQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // First, try API
      const apiResponse = await DataFetcher.fetchData(
        "/featured_questions/",
        "/index.json"
      );

      if (apiResponse && apiResponse.featured_questions) {
        return apiResponse;
      }

      // Fallback to index data logic
      return await fetchFeaturedQuestionsLogic(
        indexData || (await DataFetcher.fetchData(null, "/index.json"))
      );
    } catch (err) {
      console.error("Error fetching featured questions:", err);
      setError(
        err.message ||
          "Failed to fetch featured questions. Please try again later."
      );
      return { featured_questions: [] };
    } finally {
      setLoading(false);
    }
  }, [indexData]);

  // Load index data
  useEffect(() => {
    const loadIndexData = async () => {
      try {
        const data = await DataFetcher.fetchData(null, "/index.json");
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

  // Fetch Questions
  const fetchQuestions = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);

      try {
        // First, try to fetch from API
        const apiResult = await DataFetcher.fetchData(
          "/questions/",
          "/index.json",
          params
        );

        if (apiResult.questions) {
          setQuestions(apiResult.questions);
          return apiResult;
        }

        // If API fails, use index data
        if (!indexData) {
          throw new Error("Index data not loaded");
        }

        let filteredQuestions = indexData.questions.filter((q) => q.id != null);

        // Apply category filter if provided
        if (params.category) {
          filteredQuestions = filteredQuestions.filter((q) =>
            q.path.includes(`/questions/${params.category}/`)
          );
        }

        // Pagination
        const skip = params.skip || 0;
        const limit = params.limit || 10;
        const paginatedQuestions = filteredQuestions.slice(skip, skip + limit);

        // Fetch full details for paginated questions
        const questionDetails = await Promise.all(
          paginatedQuestions.map(async (q) => {
            const questionPath = q.path.replace(/^.*?\/static\/data/, "");
            try {
              const content = await DataFetcher.fetchData(null, questionPath);
              return FileManager.parseQuestionFile(content, q.path);
            } catch (parseError) {
              console.error(`Error parsing question ${q.id}:`, parseError);
              return null;
            }
          })
        );

        // Filter out any null results
        const validQuestionDetails = questionDetails.filter(Boolean);

        setQuestions(validQuestionDetails);
        return {
          questions: validQuestionDetails,
          total: filteredQuestions.length,
          skip,
          limit,
        };
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions. Please try again later.");
        return { questions: [], total: 0, skip: 0, limit: 0 };
      } finally {
        setLoading(false);
      }
    },
    [indexData]
  );

  // Fetch Question Details
  const fetchQuestionDetails = useCallback(
    async (questionId) => {
      try {
        // Try API first
        const apiResult = await DataFetcher.fetchData(
          `/questions/${questionId}/`
        );

        if (apiResult) return apiResult;

        // Fallback to index data
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
        const content = await DataFetcher.fetchData(null, questionPath);

        return FileManager.parseQuestionFile(content, questionInfo.path);
      } catch (err) {
        console.error(
          `Error fetching question details for ${questionId}:`,
          err
        );
        throw err;
      }
    },
    [indexData]
  );

  // Fetch Solution
  const fetchSolution = useCallback(
    async (questionId) => {
      try {
        // Try API first
        const apiResult = await DataFetcher.fetchData(
          `/solutions/${questionId}/`
        );

        if (apiResult) return apiResult;

        // Fallback to index data
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
        const content = await DataFetcher.fetchData(null, solutionPath);

        return FileManager.parseSolutionFile(content, solutionInfo.path);
      } catch (err) {
        console.error(`Error fetching solution for ${questionId}:`, err);
        throw err;
      }
    },
    [indexData]
  );

  // Database Connection Test
  const testDbConnection = useCallback(async () => {
    try {
      return await DataFetcher.fetchData("/test-db-connection");
    } catch (err) {
      console.error("Error testing DB connection:", err);
      throw new Error("Failed to test DB connection");
    }
  }, []);

  // Trigger Database Update
  const triggerDatabaseUpdate = useCallback(async () => {
    try {
      return await DataFetcher.postData("/update-database");
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

// Convenience hook for offline mode
export const useOfflineMode = (initialMode = false) => {
  const [offlineMode, setOfflineMode] = useState(initialMode);

  useEffect(() => {
    // Update DataFetcher's offline mode when the state changes
    DataFetcher.setOfflineMode(offlineMode);
  }, [offlineMode]);

  return [offlineMode, setOfflineMode];
};
