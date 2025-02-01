import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuestionData } from "../hooks/useQuestionData";
import QuestionSolutionView from "../components/category/QuestionSolutionView";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

// Refined Corporate Color Palette
const COLORS = {
  prussianBlue: {
    primary: '#003153',
    secondary: '#034975',
    tertiary: '#005582'
  },
  blueGray: {
    primary: '#6E7F80',
    secondary: '#8A9A9B',
    tertiary: '#A4B4B6'
  },
  gold: {
    primary: '#CD9575',
    secondary: '#D8A791',
    tertiary: '#E3B9A7'
  },
  offWhite: {
    primary: '#F5F5F5',
    secondary: '#FAFAFA',
    tertiary: '#FFFFFF'
  },
  darkSlate: {
    primary: '#2F4F4F',
    secondary: '#3A5A5A',
    tertiary: '#456666'
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
          backgroundColor: COLORS.prussianBlue.primary,
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
            backgroundColor: COLORS.prussianBlue.secondary,
            color: COLORS.offWhite.primary
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: COLORS.gold.primary,
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
              backgroundColor: COLORS.gold.secondary,
              color: COLORS.offWhite.primary,
              '&:hover': {
                backgroundColor: COLORS.gold.primary
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
        backgroundColor: COLORS.prussianBlue.primary,
        minHeight: '100vh',
        py: 4
      }}
    >
      <Box my={4}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: COLORS.gold.primary,
            textAlign: 'center'
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
              backgroundColor: COLORS.gold.secondary,
              color: COLORS.offWhite.primary,
              '&:hover': {
                backgroundColor: COLORS.gold.primary
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