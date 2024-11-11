import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material"; // Arrow icon for back-to-top functionality

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
        background: "linear-gradient(to right, #5e4b8b, #3a5a99, #8a2be2)", // Gradient from purple to blue to violet
        color: "#f3f3f3", // Light color for text to create contrast
        padding: "3rem 0", // Increased padding for a more spacious design
        width: "100%",
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centering content vertically and horizontally
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        {/* Footer Navigation Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            marginBottom: 3,
            justifyContent: "center", // Centers items horizontally
            alignItems: "center", // Centers items vertically
          }}
        >
          <Button
            component={Link}
            to="/privacy"
            sx={{
              color: "#fff", // White text
              backgroundColor: "#5e4b8b", // Purple background
              "&:hover": {
                backgroundColor: "#3a5a99", // Blue on hover
              },
              padding: "0.75rem 1.5rem", // Enhanced padding for buttons
              borderRadius: "20px", // Rounded corners for buttons
            }}
          >
            Privacy Policy
          </Button>
          <Button
            component={Link}
            to="/terms"
            sx={{
              color: "#fff",
              backgroundColor: "#5e4b8b",
              "&:hover": {
                backgroundColor: "#3a5a99",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            Terms of Service
          </Button>
          <Button
            component={Link}
            to="/contact"
            sx={{
              color: "#fff",
              backgroundColor: "#5e4b8b",
              "&:hover": {
                backgroundColor: "#3a5a99",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            Contact Us
          </Button>
          <Button
            component={Link}
            to="/about"
            sx={{
              color: "#fff",
              backgroundColor: "#5e4b8b",
              "&:hover": {
                backgroundColor: "#3a5a99",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            About Us
          </Button>
        </Stack>

        {/* Social Media Links */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            marginBottom: 3,
            justifyContent: "center", // Centers items horizontally
            alignItems: "center", // Centers items vertically
          }}
        >
          <Button
            href="https://twitter.com/"
            target="_blank"
            sx={{
              color: "#5e4b8b", // Purple text
              backgroundColor: "#fff", // White background
              "&:hover": {
                backgroundColor: "#d0a0e3", // Soft purple on hover
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            Twitter
          </Button>
          <Button
            href="https://facebook.com/"
            target="_blank"
            sx={{
              color: "#5e4b8b",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#d0a0e3",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            Facebook
          </Button>
          <Button
            href="https://instagram.com/"
            target="_blank"
            sx={{
              color: "#5e4b8b",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#d0a0e3",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            Instagram
          </Button>
          <Button
            href="https://www.linkedin.com/company/104499086/admin/dashboard/"
            target="_blank"
            sx={{
              color: "#5e4b8b",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#d0a0e3",
              },
              padding: "0.75rem 1.5rem",
              borderRadius: "20px",
            }}
          >
            LinkedIn
          </Button>
        </Stack>

        {/* Parent Company */}
        <Typography
          variant="body2"
          sx={{ color: "#e4e4e4", fontSize: "0.9rem" }}
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
          backgroundColor: "#f3f3f3", // Light background for contrast with dark purple
          color: "#5e4b8b", // Violet color for the icon
          "&:hover": {
            backgroundColor: "#d0a0e3", // Soft purple on hover
          },
          borderRadius: "50%",
          padding: "1rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default Footer;
