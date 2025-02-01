import React, { useEffect, useState, useCallback } from "react";
import { 
  Typography, 
  Container, 
  Box, 
  CircularProgress, 
  Paper,
  Grid,
  useTheme,
  Card,
  CardContent,
  CardHeader,
  Alert,
  AlertTitle
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCarousel from "../components/category/CategoryCarousel";
import FeaturedQuestions from "../components/common/FeaturedQuestions";
import { useQuestionData, useCategories } from "../hooks/useQuestionData";
import BucesrCarousel from "../components/common/BucesrCarousel";

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
      sx={{ backgroundColor: COLORS.prussianBlue.primary }}
    >
      <CircularProgress sx={{ color: COLORS.gold.primary }} />
    </Box>
  );

  if (error || categoriesError) return (
    <Container sx={{ backgroundColor: COLORS.prussianBlue.primary, minHeight: '100vh', pt: 4 }}>
      <Alert
        severity="error"
        sx={{
          backgroundColor: COLORS.darkSlate.primary,
          color: COLORS.offWhite.primary,
          '& .MuiAlert-icon': { color: COLORS.gold.primary }
        }}
      >
        <AlertTitle sx={{ color: COLORS.offWhite.primary }}>Error</AlertTitle>
        {error || categoriesError}
      </Alert>
    </Container>
  );

  return (
    <Box sx={{
      bgcolor: COLORS.prussianBlue.primary,
      minHeight: "100vh",
      color: COLORS.offWhite.primary
    }}>
      <Paper
        elevation={0}
        sx={{
          background: `linear-gradient(to right,
            ${COLORS.gold.primary},
            ${COLORS.prussianBlue.primary} 25%,
            ${COLORS.prussianBlue.primary} 75%,
            ${COLORS.gold.primary})`,
          color: COLORS.offWhite.primary,
          py: 8,
          mb: 4,
          borderRadius: "16px",
          boxShadow: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: COLORS.offWhite.primary
            }}
          >
            Qode Clarity: The 5 How Approach
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            sx={{ color: COLORS.blueGray.primary }}
          >
            Master complex algorithmic and data structure challenges using BUCESR Framework and the '5 How Approach':
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
                  style={{
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Card
              sx={{
                backgroundColor: COLORS.darkSlate.primary,
                color: COLORS.offWhite.primary,
                boxShadow: 3,
                borderRadius: "12px"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                  sx={{ color: COLORS.offWhite.primary }}
                >
                  Categories
                </Typography>
                <CategoryCarousel categories={categories} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Card
              sx={{
                backgroundColor: COLORS.darkSlate.primary,
                color: COLORS.offWhite.primary,
                boxShadow: 3,
                borderRadius: "12px"
              }}
            >
              <CardHeader
                title="BUCESR Framework"
                sx={{
                  backgroundColor: COLORS.gold.primary,
                  color: COLORS.prussianBlue.primary
                }}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: COLORS.blueGray.secondary }}
                >
                  The BUCESR <i style={{ color: COLORS.gold.secondary, fontWeight: "bold" }}>(Be Unique, Create Easy Solutions Regularly)</i> Framework is a systematic approach to break down and solve complex problems efficiently.
                </Typography>
                <BucesrCarousel />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Card
              sx={{
                backgroundColor: COLORS.darkSlate.primary,
                color: COLORS.offWhite.primary,
                boxShadow: 3,
                borderRadius: "12px"
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                  sx={{ color: COLORS.offWhite.primary }}
                >
                  Featured Questions
                </Typography>
                <FeaturedQuestions questions={featuredQuestions} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;