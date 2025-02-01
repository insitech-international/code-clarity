import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Paper,
  Divider,
} from "@mui/material";

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

const QuestionCard = ({ question }) => {
  console.log(`Question: ${JSON.stringify(question, null, 2)}`);

  if (!question) {
    return <Typography sx={{ color: COLORS.offWhite.secondary }}>No question data available</Typography>;
  }

  const renderArrayItems = (array, title) => {
    if (!array?.length) return null;

    return (
      <Section title={title}>
        <Box display="flex" gap={1} flexWrap="wrap">
          {array.map((item, index) => (
            <Chip
              key={index}
              label={item}
              variant="outlined"
              sx={{
                borderColor: COLORS.gold.tertiary,
                color: COLORS.blueGray.secondary
              }}
            />
          ))}
        </Box>
      </Section>
    );
  };

  const getDifficultyColor = () => {
    switch(question.difficulty) {
      case 'Hard': return COLORS.gold.primary;
      case 'Medium': return COLORS.gold.secondary;
      case 'Easy': return COLORS.gold.tertiary;
      default: return COLORS.blueGray.secondary;
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: COLORS.prussianBlue.secondary,
        color: COLORS.offWhite.primary
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Paper
            elevation={2}
            sx={{
              padding: "4px 8px",
              backgroundColor: COLORS.darkSlate.primary,
              color: COLORS.offWhite.primary,
            }}
          >
            <Typography variant="body1">
              ID: {question.question_id || "N/A"}
            </Typography>
          </Paper>

          <Box
            sx={{
              flex: 1,
              mx: 2,
              padding: "8px",
              backgroundColor: COLORS.prussianBlue.tertiary,
              borderRadius: 1,
              border: `1px solid ${COLORS.blueGray.tertiary}`,
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{ color: COLORS.gold.primary }}
            >
              {question.title || "Untitled"}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ color: COLORS.blueGray.secondary }}
            >
              Category: {question.category || "Unknown"} - Subcategory:{" "}
              {question.subcategory || "N/A"}
            </Typography>
          </Box>

          <Chip
            label={question.difficulty || "Difficulty Unknown"}
            sx={{
              backgroundColor: getDifficultyColor(),
              color: COLORS.offWhite.primary
            }}
          />
        </Box>

        <Divider sx={{ my: 2, backgroundColor: COLORS.gold.tertiary }} />

        {renderArrayItems(question.similar_questions, "Similar Questions")}

        {renderArrayItems(question.real_life_domains, "Real-life Domains")}

        {renderArrayItems(question.problem_versions, "Problem Versions")}

        {renderArrayItems(question.constraints, "Constraints")}
      </CardContent>
    </Card>
  );
};

const Section = ({ title, children }) => (
  <Typography
    variant="h6"
    gutterBottom
    sx={{ color: COLORS.gold.secondary }}
  >
    {title}
    {children}
  </Typography>
);

export default QuestionCard;