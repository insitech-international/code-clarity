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
  AlertTitle,
  Button // Import Button component
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCarousel from "../components/category/CategoryCarousel";
import FeaturedQuestions from "../components/common/FeaturedQuestions";
import { useQuestionData, useCategories } from "../hooks/useQuestionData";
import BucesrCarousel from "../components/common/BucesrCarousel";

// Import fonts
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

// Color Palette - Aligned with InsiTech Design System (Updated Colors)
const COLORS = {
  primary: '#0047AB',      // Deep Blue
  secondary: '#F8F8F8',    // Off-White
  accent: '#E99361',       // Deep Orange / Coral
  interactive: '#4DB6AC',  // Teal / Light Blue
  gray: {
    light: '#EEEEEE',      // Light Gray
    medium: '#9E9E9E',    // Medium Gray
    dark: '#424242'       // Dark Gray
  }
};

// Typography Styles - Aligned with Design System (Updated Sizes and Styles)
const typographyStyles = {
  h1: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '3rem',    // Adjusted size
    fontWeight: 700,        // Bold
    lineHeight: 1.3,        // Adjusted line height
    letterSpacing: '0.02em',
    color: COLORS.primary
  },
  h2: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '2.25rem',    // Adjusted size
    fontWeight: 600,        // SemiBold
    lineHeight: 1.3,        // Adjusted line height
    letterSpacing: '0.02em',
    color: COLORS.primary
  },
  h5: {  // Using h5 for section titles
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',     // Adjusted size
    fontWeight: 600,        // SemiBold
    lineHeight: 1.3,        // Adjusted line height
    color: COLORS.primary
  },
  body1: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',       // 16px
    fontWeight: 400,        // Regular
    lineHeight: 1.5,        // Adjusted line height
    color: COLORS.gray.dark
  },
  button: { // Style for buttons
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none' // Prevent uppercase transformation
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

  // Maintained the existing phrases with slight color adjustment
  const phrases = [
    { text: "Pythonic Implementation", color: COLORS.accent },
    { text: "Mathematical Abstraction", color: COLORS.primary },
    { text: "Real-World Analogies", color: COLORS.accent },
    { text: "Storytelling Approach", color: COLORS.primary },
    { text: "Visual Representation", color: COLORS.accent }
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

  // Loading State - Aligned with Design System
  if (loading || categoriesLoading) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: COLORS.secondary
      }}
    >
      <CircularProgress
        sx={{
          color: COLORS.accent
        }}
      />
    </Box>
  );

  // Error State - Aligned with Design System
  if (error || categoriesError) return (
    <Container
      sx={{
        backgroundColor: COLORS.secondary,
        minHeight: '100vh',
        pt: 4
      }}
    >
      <Alert
        severity="error"
        sx={{
          backgroundColor: COLORS.gray.dark,
          color: COLORS.secondary,
          '& .MuiAlert-icon': {
            color: COLORS.accent
          }
        }}
      >
        <AlertTitle sx={{
          color: COLORS.secondary,
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
      bgcolor: COLORS.secondary,
      minHeight: "100vh",
      color: COLORS.primary
    }}>
      {/* Hero Section - Aligned with Design System (Updated) */}
      <Paper
        elevation={0}
        sx={{
          background: COLORS.secondary,
          color: COLORS.primary,
          py: 8,
          mb: 4,
          borderRadius: "0px" // Removed border radius
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
                fontFamily: 'monospace',
                fontStyle: 'italic',
                ml: 1,
                mr: 1,
                color: COLORS.accent
              }}
            >
              BUCESR Framework
            </Typography>
            and the '5 How Approach':
          </Typography>

          {/* Typewriter Effect (Updated with correct styles) */}
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
                  variant="h5" // Use h5 for the phrases
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

          {/* Added a CTA Button */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                ...typographyStyles.button, // Apply button styles
                backgroundColor: COLORS.accent,
                color: COLORS.secondary,
                padding: '12px 24px',
                borderRadius: '4px', // Rounded corners
                '&:hover': {
                  backgroundColor: COLORS.accent // Darker shade on hover
                }
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Paper>
      {/* Content Sections - Aligned with Design System */}
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Categories Section */}
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
                backgroundColor: COLORS.accent,
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

          {/* BUCESR Framework Section */}
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
                backgroundColor: COLORS.accent,
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
                  fontFamily: 'monospace',
                  fontStyle: 'italic',
                  ml: 1,
                  mr: 1,
                  color: COLORS.accent
                }}
              >
                (Be Unique, Create Easy Solutions Regularly)
              </Typography>
              Framework is a systematic approach to break down and solve complex problems efficiently.
            </Typography>
            <BucesrCarousel />
          </Grid>

          {/* Featured Questions Section */}
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