import React, { useEffect, useState, useMemo } from "react";
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
  h6: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
    color: COLORS.offWhite.primary
  },
  body1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: COLORS.blueGray.primary
  },
  body2: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.4,
    color: COLORS.blueGray.secondary
  },
  code: {
    fontFamily: 'Source Code Pro, monospace',
    fontSize: '0.875rem',
    fontWeight: 400,
    color: COLORS.gold.primary
  }
};

const DifficultyChip = ({ difficulty }) => {
  const color = {
    Hard: COLORS.gold.primary,
    Medium: COLORS.gold.secondary,
    Easy: COLORS.gold.tertiary
  }[difficulty] || "default";

  return (
    <Chip
      label={`Difficulty: ${difficulty}`}
      sx={{
        backgroundColor: color,
        color: COLORS.offWhite.primary,
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
        backgroundColor: COLORS.darkSlate.primary,
        color: COLORS.offWhite.primary,
//         borderColor: COLORS.gold.tertiary,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-5px)',
          borderColor: COLORS.gold.primary,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            ...typographyStyles.h6,
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
                backgroundColor: COLORS.gold.tertiary,
                color: COLORS.offWhite.primary,
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
                  borderColor: COLORS.gold.tertiary,
                  color: COLORS.blueGray.secondary,
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
            color: COLORS.offWhite.primary,
            borderColor: COLORS.gold.tertiary,
            fontFamily: typographyStyles.body1.fontFamily,
            fontSize: typographyStyles.body1.fontSize,
            '&:hover': {
              backgroundColor: COLORS.gold.tertiary,
              color: COLORS.prussianBlue.primary
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
      color: COLORS.offWhite.primary
    }}
  >
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        ...typographyStyles.h5,
        color: COLORS.gold.secondary
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
        backgroundColor: COLORS.gold.secondary,
        color: COLORS.offWhite.primary,
        fontFamily: typographyStyles.body1.fontFamily,
        fontSize: typographyStyles.body1.fontSize,
        '&:hover': {
          backgroundColor: COLORS.gold.primary
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

  useEffect(() => {
    const loadFeaturedQuestions = async () => {
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
    };

    loadFeaturedQuestions();
  }, [fetchFeaturedQuestions]);

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
                backgroundColor: COLORS.darkSlate.primary,
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
          color: COLORS.gold.primary,
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
          backgroundColor: COLORS.prussianBlue.primary,
          color: COLORS.offWhite.primary
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            ...typographyStyles.h5,
            color: COLORS.offWhite.primary
          }}
        >
          No Featured Questions Available
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...typographyStyles.body1,
            color: COLORS.blueGray.secondary
          }}
        >
          Check back later for exciting new questions!
        </Typography>
      </Box>
    );
  }

  return (
    <section style={{
      backgroundColor: COLORS.prussianBlue.primary,
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