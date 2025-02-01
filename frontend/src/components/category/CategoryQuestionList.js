import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Visibility,
  Tag,
  Error,
  PriorityHigh,
  CheckCircle,
} from "@mui/icons-material";

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

const headingColors = [
  COLORS.gold.primary,
  COLORS.gold.secondary,
  COLORS.gold.tertiary,
  COLORS.blueGray.primary,
  COLORS.blueGray.secondary,
  COLORS.prussianBlue.secondary
];

const CategoryQuestionList = ({
  questionsBySubcategory,
  category,
  page,
  setPage,
  perPage = 10,
  totalCount,
}) => {
  const totalPages = Math.ceil(totalCount / perPage);

  const getHeadingColor = (index) =>
    headingColors[index % headingColors.length];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Hard': return COLORS.gold.primary;
      case 'Medium': return COLORS.gold.secondary;
      case 'Easy': return COLORS.gold.tertiary;
      default: return COLORS.blueGray.secondary;
    }
  };

  const renderQuestion = (question) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={question._id.$oid || question.question_id}
    >
      <Card
        sx={{
          mb: 3,
          backgroundColor: COLORS.prussianBlue.secondary,
          color: COLORS.offWhite.primary,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: `0 8px 16px ${COLORS.prussianBlue.primary}`,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingBottom: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
              color: COLORS.gold.secondary
            }}
          >
            <Visibility
              fontSize="small"
              sx={{ color: COLORS.gold.primary }}
            />
            {question.title || question.content.split("\n")[0]}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 0.5,
            }}
          >
            <Chip
              label={question.difficulty || "N/A"}
              size="small"
              icon={
                question.difficulty === "Hard" ? (
                  <Error />
                ) : question.difficulty === "Medium" ? (
                  <PriorityHigh />
                ) : (
                  <CheckCircle />
                )
              }
              sx={{
                backgroundColor: getDifficultyColor(question.difficulty),
                color: COLORS.offWhite.primary
              }}
            />
            {question.tags &&
              question.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  icon={<Tag fontSize="small" />}
                  sx={{
                    backgroundColor: COLORS.blueGray.tertiary,
                    color: COLORS.prussianBlue.primary
                  }}
                />
              ))}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            component={Link}
            to={`/question/${question.question_id}`}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: COLORS.gold.secondary,
              color: COLORS.offWhite.primary,
              "&:hover": {
                backgroundColor: COLORS.gold.primary,
              },
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{
      p: 3,
      backgroundColor: COLORS.prussianBlue.primary,
      minHeight: '100vh'
    }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: COLORS.gold.primary
        }}
      >
        {category
          ? `${category.replace(/_/g, " ")} Questions (${totalCount})`
          : `All Questions (${totalCount})`}
      </Typography>

      {Object.entries(questionsBySubcategory).map(
        ([subcategory, questions], index) => (
          <Paper
            key={subcategory}
            elevation={3}
            sx={{
              mb: 4,
              overflow: "hidden",
              borderRadius: 2,
              backgroundColor: COLORS.prussianBlue.secondary
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(90deg, ${getHeadingColor(
                  index
                )} 30%, rgba(0,0,0,0) 100%)`,
                p: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: COLORS.offWhite.primary,
                  fontWeight: "medium",
                }}
              >
                {subcategory}
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{ p: 2 }}>
              {questions.map(renderQuestion)}
            </Grid>
          </Paper>
        )
      )}

      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </Box>
      )}
    </Box>
  );
};

export default CategoryQuestionList;