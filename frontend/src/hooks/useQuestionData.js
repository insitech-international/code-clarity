import { useState, useEffect, useCallback } from "react";
import DataFetcher from "../services/dataFetcher";

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
          "/categories/", // API path
          "/categories", // Static path
          options
        );

        // Process categories based on the response format
        let processedCategories = Array.isArray(data) ? data : [];

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

// Main Question Data Hook
export const useQuestionData = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [indexData, setIndexData] = useState(null);

  // Load index data
  const loadIndexData = useCallback(async () => {
    try {
      if (DataFetcher.DEVELOPMENT_MODE) {
        // In development, get initial data from questions endpoint
        const data = await DataFetcher.fetchData("/questions/");
        setIndexData({ questions: data.questions || [] });
      } else {
        // In production, try static files
        const data = await DataFetcher.fetchData(
          null, // No API path
          "/index.json" // Static path
        );
        setIndexData(data);
      }
    } catch (err) {
      console.error("Error loading index data:", err);
      setError("Failed to load index data");
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (!indexData) {
      loadIndexData();
    }
  }, [indexData, loadIndexData]);

  // Fetch Featured Questions
  const fetchFeaturedQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await DataFetcher.fetchData(
        "/featured_questions/", // API path
        "/featured_questions" // Static path
      );
      return response;
    } catch (err) {
      console.error("Error fetching featured questions:", err);
      setError(err.message || "Failed to fetch featured questions");
      return { featured_questions: [] };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Question List
  const fetchQuestions = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const result = await DataFetcher.fetchData(
        "/questions/", // API path
        "/questions", // Static path
        params
      );

      setQuestions(result.questions || []);
      return result;
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions");
      return { questions: [], total: 0, skip: 0, limit: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Single Question
  const fetchQuestionDetails = useCallback(async (questionId) => {
    try {
      return await DataFetcher.fetchData(
        `/questions/${questionId}/`, // API path
        `/questions/${questionId}` // Static path
      );
    } catch (err) {
      console.error(`Error fetching question details for ${questionId}:`, err);
      throw err;
    }
  }, []);

  // Fetch Solution
  const fetchSolution = useCallback(async (questionId) => {
    try {
      return await DataFetcher.fetchData(
        `/solutions/${questionId}/`, // API path
        `/solutions/${questionId}` // Static path
      );
    } catch (err) {
      console.error(`Error fetching solution for ${questionId}:`, err);
      throw err;
    }
  }, []);

  // Development-only operations
  const testDbConnection = useCallback(async () => {
    if (!DataFetcher.DEVELOPMENT_MODE) {
      throw new Error("Database operations only available in development mode");
    }
    try {
      return await DataFetcher.fetchData("/test-db-connection");
    } catch (err) {
      console.error("Error testing DB connection:", err);
      throw err;
    }
  }, []);

  const triggerDatabaseUpdate = useCallback(async () => {
    if (!DataFetcher.DEVELOPMENT_MODE) {
      throw new Error("Database operations only available in development mode");
    }
    try {
      return await DataFetcher.fetchData("/update-database", null, null, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error triggering database update:", err);
      throw err;
    }
  }, []);

  return {
    // State
    questions,
    loading,
    error,
    indexData,

    // Data fetching methods
    loadIndexData,
    fetchQuestions,
    fetchQuestionDetails,
    fetchSolution,
    fetchFeaturedQuestions,

    // Development-only methods
    testDbConnection,
    triggerDatabaseUpdate,
  };
};

// Optional offline mode hook
export const useOfflineMode = (initialMode = false) => {
  const [offlineMode, setOfflineMode] = useState(initialMode);

  useEffect(() => {
    if ("setOfflineMode" in DataFetcher) {
      DataFetcher.setOfflineMode(offlineMode);
    }
  }, [offlineMode]);

  return [offlineMode, setOfflineMode];
};
