import React from "react";
import {
  Box,
  BoxProps
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

const Card: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.offWhite.primary,
        borderRadius: 2,
        boxShadow: 2,
        border: `1px solid ${COLORS.blueGray.secondary}`,
        margin: '1.5rem 0',
        padding: '2rem',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-4px)'
        },
        ...props.sx // Allow additional styling to be passed
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;