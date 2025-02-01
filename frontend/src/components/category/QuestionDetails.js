import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
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

const QuestionDetails = ({ question }) => {
  if (!question) {
    return (
      <Card sx={{
        backgroundColor: COLORS.prussianBlue.secondary,
        color: COLORS.offWhite.primary
      }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ color: COLORS.offWhite.primary }}
          >
            Question details not available
          </Typography>
        </CardContent>
      </Card>
    );
  }

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
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        backgroundColor: COLORS.prussianBlue.secondary,
        color: COLORS.offWhite.primary
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: COLORS.gold.primary }}
        >
          {question.title || "Untitled Question"}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Chip
            label={`Difficulty: ${question.difficulty || "Unknown"}`}
            sx={{
              backgroundColor: getDifficultyColor(),
              color: COLORS.offWhite.primary
            }}
          />
          <Chip
            label={`Category: ${question.category || "Uncategorized"}`}
            sx={{
              backgroundColor: COLORS.blueGray.tertiary,
              color: COLORS.prussianBlue.primary
            }}
          />
        </Box>

        <Section title="Problem Description">
          <Typography
            variant="body1"
            sx={{ color: COLORS.blueGray.secondary }}
          >
            {question.problem_description || "No description available"}
          </Typography>
        </Section>

        {question.real_life_domains &&
          question.real_life_domains.length > 0 && (
            <Section title="Real-life Domains">
              <Box display="flex" gap={1} flexWrap="wrap">
                {question.real_life_domains.map((domain, index) => (
                  <Chip
                    key={index}
                    label={domain}
                    variant="outlined"
                    sx={{
                      borderColor: COLORS.gold.tertiary,
                      color: COLORS.blueGray.secondary
                    }}
                  />
                ))}
              </Box>
            </Section>
          )}

        {question.problem_versions && question.problem_versions.length > 0 && (
          <Section title="Problem Versions">
            {question.problem_versions.map((version, index) => (
              <Box key={index} mb={2}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: COLORS.gold.secondary }}
                >
                  {`Version ${index + 1}`}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: COLORS.blueGray.secondary }}
                >
                  {version}
                </Typography>
              </Box>
            ))}
          </Section>
        )}

        {question.constraints && question.constraints.length > 0 && (
          <Section title="Constraints">
            <List>
              {question.constraints.map((constraint, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={constraint}
                    primaryTypographyProps={{
                      sx: { color: COLORS.blueGray.secondary }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Section>
        )}

        {question.notes && question.notes.length > 0 && (
          <Section title="Notes">
            <List>
              {question.notes.map((note, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={note}
                    primaryTypographyProps={{
                      sx: { color: COLORS.blueGray.secondary }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Section>
        )}
      </CardContent>
    </Card>
  );
};

const Section = ({ title, children }) => (
  <Box mb={4}>
    <Typography
      variant="h5"
      gutterBottom
      sx={{ color: COLORS.gold.secondary }}
    >
      {title}
    </Typography>
    <Divider sx={{
      mb: 2,
      backgroundColor: COLORS.gold.tertiary
    }} />
    {children}
  </Box>
);

export default QuestionDetails;