import React, { useState, useEffect } from "react";
import { useTheme, Box, Typography, Paper, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

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

// Data for the content (unchanged)
const bucesrContent = {
  B: {
    title: "Break the Problem Down",
    description: "Understand the problem before attempting to solve it.",
    questions: [
      "What is the core task, including inputs and key conditions?",
      "What is the final result or output required?",
    ],
  },
  U: {
    title: "Use Examples",
    description: "Work with examples to internalize the approach.",
    questions: [
      "Can I manually work through examples to detect patterns?",
      "Do the examples cover all edge cases, or do I need additional ones?",
    ],
  },
  C: {
    title: "Check for Existing Tools",
    description:
      "Identify built-in tools or algorithms to simplify the solution.",
    questions: [
      "Are there built-in functions, libraries, or known algorithms I can use?",
      "What data structures or mathematical concepts would make this task easier?",
    ],
  },
  E: {
    title: "Edge Case Awareness",
    description: "Ensure your solution works in all scenarios.",
    questions: [
      "What are the extreme inputs (e.g., empty, maximum, all same, none matching)?",
      "Are there unexpected inputs that could cause errors or infinite loops?",
    ],
  },
  S: {
    title: "Start Simple",
    description: "Build the simplest version and progressively refine it.",
    questions: [
      "What's the simplest version of this problem I can solve?",
      "Does my basic solution handle the core functionality and solve the provided examples?",
    ],
  },
  R: {
    title: "Review the Constraints",
    description: "Ensure your solution is efficient and meets constraints.",
    questions: [
      "Does my solution fit within time and space constraints, even for large inputs?",
      "Can I refactor to improve efficiency or readability after validation?",
    ],
  },
};

// Color palette using gold tones
const colors = [
  COLORS.gold.primary,
  COLORS.gold.secondary,
  COLORS.gold.tertiary,
  COLORS.blueGray.primary,
  COLORS.blueGray.secondary,
  COLORS.prussianBlue.secondary
];

const BucesrCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // Auto-slide logic using useEffect
  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, 5000); // Slide every 5 seconds

    // Clear interval on component unmount
    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  // Go to the next slide
  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Object.keys(bucesrContent).length
    );
  };

  // Go to the previous slide
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Object.keys(bucesrContent).length) %
        Object.keys(bucesrContent).length
    );
  };

  const keys = Object.keys(bucesrContent);
  const currentKey = keys[currentIndex];
  const currentItem = bucesrContent[currentKey];

  return (
    <Box sx={{ position: "relative", height: 400, overflow: "hidden" }}>
      {/* Content Display */}
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          padding: 3,
          backgroundColor: COLORS.prussianBlue.secondary,
          color: COLORS.offWhite.primary,
          borderRadius: 2,
          transition: "all 0.5s ease",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: colors[currentIndex % colors.length] }}
        >
          {currentKey}: {currentItem.title}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: COLORS.blueGray.secondary }}
        >
          {currentItem.description}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: colors[currentIndex % colors.length],
            mt: 2,
          }}
        >
          Key Questions:
        </Typography>
        {/* Removing bullet points by not using <ul> */}
        {currentItem.questions.map((question, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              mb: 1,
              color: COLORS.blueGray.secondary
            }}
          >
            {index + 1}. {question}
          </Typography>
        ))}
      </Paper>

      {/* Left Arrow */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: COLORS.gold.primary
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          color: COLORS.gold.primary
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default BucesrCarousel;