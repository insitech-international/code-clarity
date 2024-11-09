// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000";

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// const fetchData = async (url, params) => {
//   try {
//     const response = await api.get(url, { params });
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error);
//     throw new Error(error.response?.data?.detail || "An error occurred");
//   }
// };

// export const useCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchData("/categories/");
//         setCategories(data);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError(err.message);
//         setCategories([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return { categories, loading, error };
// };

// export const useQuestionData = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchQuestions = useCallback(async (params = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await fetchData("/questions/", params);
//       setQuestions(data.questions || []);
//       return {
//         questions: data.questions || [],
//         total: data.total,
//         skip: data.skip,
//         limit: data.limit
//       };
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       setError("Failed to fetch questions. Please try again later.");
//       return { questions: [], total: 0, skip: 0, limit: 0 };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const fetchQuestionDetails = useCallback(async (questionId) => {
//     const data = await fetchData(`/questions/${questionId}/`);
//     console.log(`Data: ${JSON.stringify(data)}`);
//     return data;
//   }, []);

//   const fetchSolution = useCallback(async (questionId) => {
//     return await fetchData(`/solutions/${questionId}/`);
//   }, []);

//   const fetchFeaturedQuestions = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await fetchData("/featured_questions/");
//       return data;
//     } catch (err) {
//       console.error("Error fetching featured questions:", err);
//       setError("Failed to fetch featured questions. Please try again later.");
//       return {};
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const testDbConnection = useCallback(async () => {
//     try {
//       const data = await fetchData("/test-db-connection");
//       return data;
//     } catch (err) {
//       console.error("Error testing DB connection:", err);
//       throw new Error("Failed to test DB connection");
//     }
//   }, []);

//   const triggerDatabaseUpdate = useCallback(async () => {
//     try {
//       const data = await api.post("/update-database");
//       return data.data;
//     } catch (err) {
//       console.error("Error triggering database update:", err);
//       throw new Error("Failed to trigger database update");
//     }
//   }, []);

//   return {
//     questions,
//     loading,
//     error,
//     fetchQuestions,
//     fetchQuestionDetails,
//     fetchSolution,
//     fetchFeaturedQuestions,
//     testDbConnection,
//     triggerDatabaseUpdate
//   };
// };

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FileManager from "../services/fileManager";

const API_BASE_URL = "http://127.0.0.1:8000";
const FILE_BASE_URL =
  "https://raw.githubusercontent.com/insitech-international/code-clarity/gh-pages/static/data";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Combined fetch function that tries API first, then falls back to file system
const fetchData = async (apiPath, filePath = null, params = null) => {
  try {
    // Try API first
    const response = await api.get(apiPath, params ? { params } : undefined);
    return response.data;
  } catch (apiError) {
    console.warn("API fetch failed, falling back to file system:", apiError);

    if (!filePath) {
      throw apiError;
    }

    try {
      // Fall back to file system
      const fileResponse = await fetch(`${FILE_BASE_URL}${filePath}`);
      if (!fileResponse.ok) {
        throw new Error(`HTTP error! status: ${fileResponse.status}`);
      }
      return await fileResponse.json();
    } catch (fileError) {
      console.error("File system fetch also failed:", fileError);
      throw new Error("Both API and file system fetches failed");
    }
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
        // Try API categories endpoint first, fall back to index.json
        const data = await fetchData("/categories/", "/index.json");

        // Handle both API and file system response formats
        if (Array.isArray(data)) {
          // API response
          setCategories(data);
        } else if (data.questions) {
          // File system response - extract categories from questions
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

  // Load index data for file system fallback
  useEffect(() => {
    const loadIndexData = async () => {
      try {
        const data = await fetchData(null, "/index.json");
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
        const data = await fetchData("/questions/", null, params);
        setQuestions(data.questions || []);
        return data;
      } catch (apiError) {
        // Fall back to file system implementation
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
              const content = await fetch(`${FILE_BASE_URL}${questionPath}`);
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
        return await fetchData(`/questions/${questionId}/`);
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
        const response = await fetch(`${FILE_BASE_URL}${questionPath}`);
        const content = await response.text();
        return FileManager.parseQuestionFile(content, questionInfo.path);
      }
    },
    [indexData]
  );

  const fetchSolution = useCallback(
    async (questionId) => {
      try {
        return await fetchData(`/solutions/${questionId}/`);
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
        const response = await fetch(`${FILE_BASE_URL}${solutionPath}`);
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
      return await fetchData("/featured_questions/");
    } catch (apiError) {
      try {
        if (!indexData) {
          throw new Error("Index data not loaded");
        }

        const featuredIds = indexData.questions
          .filter((q) => q.id != null)
          .slice(0, 5)
          .map((q) => q.id);

        const featuredQuestions = await Promise.all(
          featuredIds.map((id) => fetchQuestionDetails(id))
        );

        return { featured_questions: featuredQuestions };
      } catch (err) {
        console.error("Error fetching featured questions:", err);
        setError("Failed to fetch featured questions. Please try again later.");
        return { featured_questions: [] };
      }
    } finally {
      setLoading(false);
    }
  }, [indexData, fetchQuestionDetails]);

  // API-only functions
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
