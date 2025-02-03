import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Box,
  Button,
  Skeleton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useQuestionData } from "../../hooks/useQuestionData";

// Color Palette - Aligned with InsiTech Design System
const COLORS = {
  primary: '#0047AB',      // Deep Blue
  secondary: '#F5EFE7',    // Beige
  accent: '#DA8359',       // Deep Orange
  gray: {
    light: '#EEEEEE',      // Light Gray
    dark: '#666666'        // Dark Gray
  }
};

// Typography Styles - Aligned with InsiTech Design System
const typographyStyles = {
  h1: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '3.75rem',    // Between 48-60px
    fontWeight: 700,        // Bold
    lineHeight: 1.5,
    letterSpacing: '0.02em',
    color: COLORS.primary
  },
  h5: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',     // Between 24-32px
    fontWeight: 600,        // SemiBold
    lineHeight: 1.4,
    color: COLORS.primary
  },
  body1: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem',       // 16-18px
    fontWeight: 400,        // Regular
    lineHeight: 1.6,
    color: COLORS.gray.dark
  },
  body2: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.875rem',   // Small text
    fontWeight: 400,        // Regular
    lineHeight: 1.4,
    color: COLORS.gray.dark
  }
};

const DifficultyChip = ({ difficulty }) => {
  const color = {
    Hard: COLORS.accent,
    Medium: COLORS.primary,
    Easy: COLORS.gray.secondary
  }[difficulty] || COLORS.gray.light;

  return (
    <Chip
      label={`Difficulty: ${difficulty}`}
      sx={{
        backgroundColor: color,
        color: COLORS.secondary,
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
        fontFamily: typographyStyles.body2.fontFamily,
        fontSize: typographyStyles.body2.fontSize
      }}
      size="small"
    />
  );
};

const QuestionCard = ({ question }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-5px)',
          borderColor: COLORS.accent,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: COLORS.primary,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            wordWrap: 'break-word',
            mb: 1,
          }}
        >
          {question.title || "Untitled Question"}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {question.subcategory && (
            <Chip
              label={`${question.subcategory}`}
              sx={{
                backgroundColor: COLORS.accent,
                color: COLORS.secondary,
                size: "small",
                marginRight: '0.5rem',
                marginBottom: '0.5rem',
                fontFamily: typographyStyles.body2.fontFamily,
                fontSize: typographyStyles.body2.fontSize
              }}
            />
          )}
          <DifficultyChip difficulty={question.difficulty} />
        </Box>
        <Typography
          variant="body2"
          paragraph
          sx={{
            ...typographyStyles.body2,
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {question.problem_description || "No description available."}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          {question.real_life_domains &&
            question.real_life_domains.slice(0, isMobile ? 2 : 3).map((domain, index) => (
              <Chip
                key={index}
                label={domain}
                variant="outlined"
                size="small"
                sx={{
                  marginRight: '0.5rem',
                  marginBottom: '0.5rem',
                  borderColor: COLORS.accent,
                  color: COLORS.primary,
                  fontFamily: typographyStyles.body2.fontFamily,
                  fontSize: typographyStyles.body2.fontSize
                }}
              />
            ))}
        </Box>
        <Button
          component={Link}
          to={`/question/${question.question_id}`}
          variant="outlined"
          size="small"
          sx={{
            mt: 2,
            alignSelf: 'flex-wrap',
            color: COLORS.primary,
            borderColor: COLORS.accent,
            fontFamily: typographyStyles.body1.fontFamily,
            fontSize: typographyStyles.body1.fontSize,
            '&:hover': {
              backgroundColor: COLORS.accent,
              color: COLORS.secondary
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const CategorySection = ({ category, questions, onViewAll }) => (
  <Box
    sx={{
      mb: 4,
      p: 2,
      backgroundColor: 'transparent',
      color: COLORS.primary
    }}
  >
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        ...typographyStyles.h5,
        color: COLORS.primary
      }}
    >
      {category}
    </Typography>
    <Grid container spacing={3}>
      {questions.slice(0, 3).map((question) => (
        <Grid item xs={12} sm={6} md={4} key={question.question_id}>
          <QuestionCard question={question} />
        </Grid>
      ))}
    </Grid>
    <Button
      variant="contained"
      sx={{
        marginTop: '1rem',
        backgroundColor: COLORS.accent,
        color: COLORS.secondary,
        fontFamily: typographyStyles.body1.fontFamily,
        fontSize: typographyStyles.body1.fontSize,
        '&:hover': {
          backgroundColor: COLORS.primary
        }
      }}
      onClick={() => onViewAll(category)}
    >
      View All Questions in {category}
    </Button>
  </Box>
);

const FeaturedQuestions = () => {
  const { fetchFeaturedQuestions, loading, error } = useQuestionData();
  const [categorizedQuestions, setCategorizedQuestions] = useState({});
  const navigate = useNavigate();

  const loadFeaturedQuestions = useCallback(async () => {
    try {
      const questions = await fetchFeaturedQuestions();
      const flattenedQuestions = Object.values(questions).reduce((acc, category) => {
        category.forEach(question => {
          if (!acc[question.category]) {
            acc[question.category] = [];
          }
          acc[question.category].push(question);
        });
        return acc;
      }, {});
      setCategorizedQuestions(flattenedQuestions);
    } catch (error) {
      console.error("Error fetching featured questions:", error);
    }
  }, [fetchFeaturedQuestions]);

  useEffect(() => {
    loadFeaturedQuestions();
  }, [loadFeaturedQuestions]);

  const handleViewAll = (category) => {
    navigate(`/category/${encodeURIComponent(category)}/questions`);
  };

  const sortedCategories = useMemo(() =>
    Object.entries(categorizedQuestions).sort(([a], [b]) => a.localeCompare(b)),
    [categorizedQuestions]
  );

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{
                backgroundColor: COLORS.secondary,
                borderRadius: 2
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        sx={{
          color: COLORS.accent,
          ...typographyStyles.body1
        }}
      >
        {error}
      </Typography>
    );
  }

  if (Object.keys(categorizedQuestions).length === 0) {
    return (
      <Box
        textAlign="center"
        py={4}
        sx={{
          backgroundColor: COLORS.secondary,
          color: COLORS.primary
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            ...typographyStyles.h5,
            color: COLORS.primary
          }}
        >
          No Featured Questions Available
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...typographyStyles.body1,
            color: COLORS.gray.dark
          }}
        >
          Check back later for exciting new questions!
        </Typography>
      </Box>
    );
  }

  return (
    <section style={{
      backgroundColor: COLORS.secondary,
      padding: '1rem'
    }}>
      {sortedCategories.map(([category, questions]) => (
        <CategorySection
          key={category}
          category={category}
          questions={questions}
          onViewAll={handleViewAll}
        />
      ))}
    </section>
  );
};

export default FeaturedQuestions;