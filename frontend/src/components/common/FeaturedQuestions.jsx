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

const DifficultyChip = ({ difficulty }) => {
  const color = {
    Hard: "error",
    Medium: "warning",
    Easy: "success"
  }[difficulty] || "default";

  return (
    <Chip
      label={`Difficulty: ${difficulty}`}
      color={color}
      size="small"
      sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
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
        transition: '0.3s',
        '&:hover': { 
          boxShadow: 6,
          transform: 'translateY(-5px)'
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom noWrap>
          {question.title || "Untitled Question"}
        </Typography>
        <Box sx={{ mb: 2 }}>
          {question.subcategory && (
            <Chip
              label={`${question.subcategory}`}
              color="primary"
              size="small"
              sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
            />
          )}
          <DifficultyChip difficulty={question.difficulty} />
        </Box>
        <Typography 
          variant="body2" 
          paragraph 
          sx={{ 
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
          {question.real_life_domains && question.real_life_domains.slice(0, isMobile ? 2 : 3).map((domain, index) => (
            <Chip 
              key={index} 
              label={domain} 
              variant="outlined" 
              size="small" 
              sx={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} 
            />
          ))}
        </Box>
        <Button 
          component={Link} 
          to={`/question/${question.question_id}`} 
          variant="outlined" 
          size="small"
          sx={{ mt: 2, alignSelf: 'flex-centre' }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

const CategorySection = ({ category, questions, onViewAll }) => (
  <Box mb={4}>
    <Typography variant="h5" gutterBottom>
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
      sx={{ marginTop: '1rem' }}
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
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (Object.keys(categorizedQuestions).length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h5" gutterBottom>
          No Featured Questions Available
        </Typography>
        <Typography variant="body1">
          Check back later for exciting new questions!
        </Typography>
      </Box>
    );
  }

  return (
    <section>
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