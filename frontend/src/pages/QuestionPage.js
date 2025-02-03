import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuestionData } from "../hooks/useQuestionData";
import QuestionSolutionView from "../components/category/QuestionSolutionView";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper
} from "@mui/material";

// InsiTech Color Palette
const COLORS = {
  primary: '#0047AB',      // Deep Blue
  secondary: {
    primary: '#F5EFE7',    // Beige
    secondary: '#F7EFE5',
    tertiary: '#FFFFFF'
  },
  accent: '#DA8359',       // Deep Orange
  gray: {
    light: '#EEEEEE',
    dark: '#666666'
  }
};

const QuestionPage = () => {
  const { id } = useParams();
  const { fetchQuestionDetails, fetchSolution } = useQuestionData();
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [questionData, solutionData] = await Promise.all([
          fetchQuestionDetails(id),
          fetchSolution(id),
        ]);
        setQuestion(questionData);
        setSolution(solutionData);
      } catch (err) {
        console.error("Error loading question or solution:", err);
        setError(
          "Failed to load question or solution. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, fetchQuestionDetails, fetchSolution]);

  if (loading) return <LoadingSpinner />;

  if (error || !question || !solution) {
    return (
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: COLORS.secondary.primary,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 3,
            textAlign: "center",
            backgroundColor: COLORS.secondary.secondary,
            color: COLORS.primary
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: COLORS.accent,
              fontFamily: 'Montserrat, sans-serif',
              gutterBottom: true
            }}
          >
            {error || "Question or solution not found."}
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: COLORS.accent,
              color: COLORS.secondary.tertiary,
              fontFamily: 'Montserrat, sans-serif',
              '&:hover': {
                backgroundColor: COLORS.primary
              }
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: COLORS.secondary.primary,
        minHeight: '100vh',
        py: 4
      }}
    >
      <Box my={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: COLORS.primary,
            textAlign: 'center',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700
          }}
        >
          {question.title}
        </Typography>
        <QuestionSolutionView question={question} solution={solution} />
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: COLORS.accent,
              color: COLORS.secondary.tertiary,
              fontFamily: 'Montserrat, sans-serif',
              '&:hover': {
                backgroundColor: COLORS.primary
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionPage;