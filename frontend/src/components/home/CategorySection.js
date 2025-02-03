import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  CardMedia
} from "@mui/material";

// InsiTech Color Palette
const COLORS = {
  primary: '#0047AB',      // Deep Blue
  secondary: {
    primary: '#F5EFE7',    // Beige
    secondary: '#F7EFE5',
    tertiary: '#FFFFFF'
  },
  accent: '#DA8359',       // Deep Orange
  gray: {
    light: '#EEEEEE',
    dark: '#666666'
  }
};

const CategorySection = ({ category }) => {
  const urlSlug = category.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");

  return (
    <Card
      sx={{
        backgroundColor: COLORS.secondary.primary,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }}
    >
      <Link
        to={`/category/${urlSlug}`}
        style={{ textDecoration: 'none' }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              color: COLORS.primary,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              mb: 1
            }}
          >
            {category.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.gray.dark,
              fontFamily: 'Montserrat, sans-serif',
              mb: 2
            }}
          >
            {category.description}
          </Typography>

          <Grid container spacing={1} sx={{ mb: 2 }}>
            {category.sampleQuestions.slice(0, 5).map((question, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: COLORS.gray.light,
                    borderRadius: 1,
                    p: 1
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: COLORS.primary,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {question.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: COLORS.gray.dark,
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {question.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <CardMedia
            component="img"
            image={`/images/mindmaps/${category.id}.svg`}
            alt={`Mindmap for ${category.name}`}
            sx={{
              borderRadius: 1,
              maxHeight: 200,
              objectFit: 'cover',
              mb: 2
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.accent,
              color: COLORS.secondary.tertiary,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: COLORS.primary
              }
            }}
          >
            Explore
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategorySection;