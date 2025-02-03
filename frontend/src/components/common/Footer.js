import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, Grid, IconButton, Paper } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

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

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Documentation", path: "/docs" },
        { name: "Support", path: "/support" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookies", path: "/cookies" }
      ]
    }
  ];

  return (
    <Paper
      component="footer"
      elevation={4}
      sx={{
        backgroundColor: COLORS.secondary.primary,
        color: COLORS.primary,
        py: { xs: 4, md: 6 },
        position: 'relative',
        borderTop: `4px solid ${COLORS.accent}`,
        borderRadius: 0
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                color: COLORS.primary,
                mb: 2
              }}
            >
              Qode Clarity
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.gray.dark,
                fontFamily: 'Montserrat, sans-serif',
                pr: { xs: 0, md: 4 }
              }}
            >
              Empowering developers to solve complex problems with structured, innovative approaches.
            </Typography>
          </Grid>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  color: COLORS.primary,
                  mb: 2
                }}
              >
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Typography
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{
                    display: 'block',
                    color: COLORS.gray.dark,
                    textDecoration: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    mb: 1,
                    '&:hover': {
                      color: COLORS.accent
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: `1px solid ${COLORS.gray.light}`,
            mt: { xs: 3, md: 4 },
            pt: 3,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: COLORS.gray.dark,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            © {new Date().getFullYear()} InsiTech International. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Back to Top Button */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: { xs: 16, md: 30 },
          right: { xs: 16, md: 30 },
          backgroundColor: COLORS.accent,
          color: COLORS.secondary.tertiary,
          "&:hover": {
            backgroundColor: COLORS.primary
          },
          boxShadow: 3,
          zIndex: 1000
        }}
      >
        <ArrowUpward />
      </IconButton>
    </Paper>
  );
};

export default Footer;