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
import { motion, AnimatePresence, color } from "framer-motion";
import CategoryCarousel from "../components/category/CategoryCarousel";
import FeaturedQuestions from "../components/common/FeaturedQuestions";
import { useQuestionData, useCategories } from "../hooks/useQuestionData";
import BucesrCarousel from "../components/common/BucesrCarousel";

const HomePage = () => {
  const [featuredQuestions, setFeaturedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { fetchQuestions } = useQuestionData();
  const theme = useTheme();

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const phrases = [
    { text: "Pythonic Implementation", color: "#FF9800" },
    { text: "Mathematical Abstraction", color: "#00BCD4" },
    { text: "Real-World Analogies", color: "#FFEB3B" },
    { text: "Storytelling Approach", color: "#8BC34A" },
    { text: "Visual Representation", color: "#B39DDB" }
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );

  if (error || categoriesError) return (
    <Container>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error || categoriesError}
      </Alert>
    </Container>
  );

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Paper 
        elevation={0}
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          py: 8,
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Code Clarity: The 5 How Approach
          </Typography>
          <Typography variant="body1" align="center" paragraph>
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
                <Typography variant="h5" align="center" style={{ color: phrases[currentPhraseIndex].color }}>
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
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <CategoryCarousel categories={categories} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="BUCESR Framework" />
              <CardContent>
              <Typography variant="body1" paragraph>
                  The BUCESR <i style={{ color: "purple", fontWeight: "bold" }}>(Be Unique, Create Easy Solutions Regularly)</i> Framework is a systematic approach to break down and solve complex problems efficiently.
                </Typography>
                <BucesrCarousel />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Featured Questions" />
              <CardContent>
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



