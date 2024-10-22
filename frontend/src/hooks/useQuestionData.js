import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://code-clarity.insitechinternational.com"
    : "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const fetchData = async (url, params) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.detail || "An error occurred");
  }
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchData("/categories/");
        setCategories(data);
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

  const fetchQuestions = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData("/questions/", params);
      setQuestions(data.questions || []);
      return {
        questions: data.questions || [],
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      };
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions. Please try again later.");
      return { questions: [], total: 0, skip: 0, limit: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuestionDetails = useCallback(async (questionId) => {
    const data = await fetchData(`/questions/${questionId}/`);
    console.log(`Data: ${JSON.stringify(data)}`);
    return data;
  }, []);

  const fetchSolution = useCallback(async (questionId) => {
    return await fetchData(`/solutions/${questionId}/`);
  }, []);

  const fetchFeaturedQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData("/featured_questions/");
      return data;
    } catch (err) {
      console.error("Error fetching featured questions:", err);
      setError("Failed to fetch featured questions. Please try again later.");
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  const testDbConnection = useCallback(async () => {
    try {
      const data = await fetchData("/test-db-connection");
      return data;
    } catch (err) {
      console.error("Error testing DB connection:", err);
      throw new Error("Failed to test DB connection");
    }
  }, []);

  const triggerDatabaseUpdate = useCallback(async () => {
    try {
      const data = await api.post("/update-database");
      return data.data;
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
