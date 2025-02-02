import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Paper,
  Grid,
  useTheme,
  Alert,
  AlertTitle
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCarousel from "../components/category/CategoryCarousel";
import FeaturedQuestions from "../components/common/FeaturedQuestions";
import { useQuestionData, useCategories } from "../hooks/useQuestionData";
import BucesrCarousel from "../components/common/BucesrCarousel";

// Import fonts
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/source-code-pro/400.css';
import '@fontsource/source-code-pro/500.css';

// Enhanced Corporate Color Palette
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
    primary: '#D4784D',
    secondary: '#E69B75',
    tertiary: '#F2BD9B'
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
  },
  emeraldGreen: {
    primary: '#2ecc71',
    secondary: '#27ae60',
    tertiary: '#2980b9'
  }
};

// Typography Styles
const typographyStyles = {
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '3rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: COLORS.offWhite.primary
  },
  h2: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '2.25rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    color: COLORS.offWhite.primary
  },
  h5: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLORS.offWhite.primary
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: COLORS.blueGray.primary
  },
  code: {
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '0.875rem',
    fontWeight: 400,
    color: COLORS.gold.primary
  }
};

const HomePage = () => {
  const [featuredQuestions, setFeaturedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { fetchQuestions } = useQuestionData();
  const theme = useTheme();

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    { text: "Pythonic Implementation", color: COLORS.gold.primary },
    { text: "Mathematical Abstraction", color: COLORS.offWhite.primary },
    { text: "Real-World Analogies", color: COLORS.gold.primary },
    { text: "Storytelling Approach", color: COLORS.offWhite.primary },
    { text: "Visual Representation", color: COLORS.gold.primary }
  ];

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadFeaturedQuestions = useCallback(async () => {
    try {
      const questionsData = await fetchQuestions({ limit: 10 });
      setFeaturedQuestions(questionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchQuestions]);

  useEffect(() => {
    loadFeaturedQuestions();
  }, [loadFeaturedQuestions]);

  if (loading || categoriesLoading) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: COLORS.prussianBlue.primary,
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: COLORS.darkSlate.primary
        }
      }}
    >
      <CircularProgress
        sx={{
          color: COLORS.gold.primary,
          '@media (prefers-color-scheme: dark)': {
            color: COLORS.emeraldGreen.primary
          }
        }}
      />
    </Box>
  );

  if (error || categoriesError) return (
    <Container
      sx={{
        backgroundColor: COLORS.prussianBlue.primary,
        minHeight: '100vh',
        pt: 4,
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: COLORS.darkSlate.primary
        }
      }}
    >
      <Alert
        severity="error"
        sx={{
          backgroundColor: COLORS.darkSlate.primary,
          color: COLORS.offWhite.primary,
          '& .MuiAlert-icon': {
            color: COLORS.emeraldGreen.primary
          },
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: COLORS.prussianBlue.secondary
          }
        }}
      >
        <AlertTitle sx={{
          color: COLORS.offWhite.primary,
          ...typographyStyles.h5
        }}>
          Error
        </AlertTitle>
        {error || categoriesError}
      </Alert>
    </Container>
  );

  return (
    <Box sx={{
      bgcolor: COLORS.prussianBlue.primary,
      minHeight: "100vh",
      color: COLORS.offWhite.primary,
      '@media (prefers-color-scheme: dark)': {
        bgcolor: COLORS.darkSlate.primary,
        color: COLORS.offWhite.secondary
      }
    }}>
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(to right,
            ${COLORS.gold.primary},
            ${COLORS.prussianBlue.primary} 10%,
            ${COLORS.prussianBlue.primary} 90%,
            ${COLORS.gold.primary})`,
          color: COLORS.offWhite.primary,
          py: 8,
          mb: 4,
          borderRadius: "16px",
          boxShadow: 6,
          '@media (prefers-color-scheme: dark)': {
            background: `linear-gradient(to right,
              ${COLORS.gold.secondary},
              ${COLORS.darkSlate.primary} 10%,
              ${COLORS.darkSlate.primary} 90%,
              ${COLORS.gold.secondary})`
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            align="center"
            sx={typographyStyles.h1}
          >
            Qode Clarity: The 5 How Approach
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={typographyStyles.body1}
          >
            Master complex algorithmic and data structure challenges using
            <Typography
              component="span"
              sx={{
                ...typographyStyles.code,
                fontStyle: 'italic',
                ml: 1,
                mr: 1
              }}
            >
              BUCESR Framework
            </Typography>
            and the '5 How Approach':
          </Typography>
          <Box height="60px" display="flex" justifyContent="center" alignItems="center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhraseIndex}
                variants={typewriterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    ...typographyStyles.h5,
                    color: phrases[currentPhraseIndex].color,
                    fontWeight: "bold"
                  }}
                >
                  {phrases[currentPhraseIndex].text.split('').map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: 'transparent',
              py: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '1px',
                backgroundColor: COLORS.gold.primary,
                opacity: 0.2
              }
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={typographyStyles.h5}
            >
              Categories
            </Typography>
            <CategoryCarousel categories={categories} />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: 'transparent',
              py: 4,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '1px',
                backgroundColor: COLORS.gold.primary,
                opacity: 0.2
              }
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={typographyStyles.h5}
            >
              BUCESR Framework
            </Typography>
            <Typography
              variant="body1"
              paragraph
              align="center"
              sx={{
                ...typographyStyles.body1,
                mb: 4,
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              The BUCESR
              <Typography
                component="span"
                sx={{
                  ...typographyStyles.code,
                  fontStyle: 'italic',
                  ml: 1,
                  mr: 1
                }}
              >
                (Be Unique, Create Easy Solutions Regularly)
              </Typography>
              Framework is a systematic approach to break down and solve complex problems efficiently.
            </Typography>
            <BucesrCarousel />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: 'transparent',
              py: 4
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={typographyStyles.h5}
            >
              Featured Questions
            </Typography>
            <FeaturedQuestions questions={featuredQuestions} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;