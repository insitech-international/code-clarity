import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

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

// Styling for the Footer
const Footer = () => {
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(to right,
          ${COLORS.gold.primary},
          ${COLORS.prussianBlue.primary} 25%,
          ${COLORS.prussianBlue.primary} 75%,
          ${COLORS.gold.primary})`,
        color: COLORS.offWhite.primary,
        padding: "3rem 0",
        width: "100%",
        marginTop: "auto", // Push footer to bottom
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        // Ensure footer stays at bottom
        position: "relative",
        bottom: 0,
        left: 0,
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        {/* Footer Navigation Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            marginBottom: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {["Privacy", "Terms", "Contact", "About"].map((item) => (
            <Button
              key={item}
              component={Link}
              to={`/${item.toLowerCase().replace(/\s+/g, '')}`}
              sx={{
                color: COLORS.offWhite.primary,
                backgroundColor: COLORS.prussianBlue.secondary,
                "&:hover": {
                  backgroundColor: COLORS.prussianBlue.tertiary,
                },
                padding: "0.75rem 1.5rem",
                borderRadius: "20px",
              }}
            >
              {`${item} ${item === "About" ? "Us" : item === "Contact" ? "Us" : "Policy"}`}
            </Button>
          ))}
        </Stack>

        {/* Social Media Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            marginBottom: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((platform) => (
            <Button
              key={platform}
              href={`https://${platform.toLowerCase()}.com/`}
              target="_blank"
              sx={{
                color: COLORS.prussianBlue.primary,
                backgroundColor: COLORS.offWhite.primary,
                "&:hover": {
                  backgroundColor: COLORS.gold.tertiary,
                  color: COLORS.prussianBlue.primary
                },
                padding: "0.75rem 1.5rem",
                borderRadius: "20px",
              }}
            >
              {platform}
            </Button>
          ))}
        </Stack>

        {/* Parent Company */}
        <Typography
          variant="body2"
          sx={{
            color: COLORS.blueGray.secondary,
            fontSize: "0.9rem"
          }}
        >
          © 2024 InsiTech International. All rights reserved.
        </Typography>
      </Box>

      {/* Back to Top Button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: COLORS.offWhite.primary,
          color: COLORS.prussianBlue.primary,
          "&:hover": {
            backgroundColor: COLORS.gold.tertiary,
            color: COLORS.prussianBlue.primary
          },
          borderRadius: "50%",
          padding: "1rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 1000, // Ensure it's above other elements
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default Footer;