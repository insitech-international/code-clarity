import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Typography, Box } from "@mui/material";

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

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={{
                ...vscDarkPlus,
                'code[class*="language-"]': {
                  background: COLORS.prussianBlue.secondary,
                  color: COLORS.offWhite.primary,
                },
                'pre[class*="language-"]': {
                  background: COLORS.prussianBlue.secondary,
                  color: COLORS.offWhite.primary,
                }
              }}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={className}
              {...props}
              style={{
                backgroundColor: COLORS.darkSlate.tertiary,
                color: COLORS.gold.primary,
                padding: '2px 4px',
                borderRadius: '4px'
              }}
            >
              {children}
            </code>
          );
        },
        h1: (props) => (
          <Typography
            variant="h4"
            {...props}
            gutterBottom
            sx={{
              textAlign: "left",
              color: COLORS.gold.primary
            }}
          />
        ),
        h2: (props) => (
          <Typography
            variant="h5"
            {...props}
            gutterBottom
            sx={{
              textAlign: "left",
              color: COLORS.gold.secondary
            }}
          />
        ),
        h3: (props) => (
          <Typography
            variant="h6"
            {...props}
            gutterBottom
            sx={{
              textAlign: "left",
              color: COLORS.gold.tertiary
            }}
          />
        ),
        p: (props) => (
          <Typography
            variant="body1"
            {...props}
            paragraph
            sx={{
              textAlign: "left",
              color: COLORS.offWhite.secondary
            }}
          />
        ),
        ul: (props) => (
          <Box
            component="ul"
            sx={{
              pl: 2,
              textAlign: "left",
              color: COLORS.blueGray.secondary,
              '& li': {
                color: COLORS.offWhite.secondary
              }
            }}
            {...props}
          />
        ),
        ol: (props) => (
          <Box
            component="ol"
            sx={{
              pl: 2,
              textAlign: "left",
              color: COLORS.blueGray.secondary,
              '& li': {
                color: COLORS.offWhite.secondary
              }
            }}
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;