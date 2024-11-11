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
} from "@mui/icons-material"; // Replace with Material Icons or your preferred icons

const headingColors = [
  "#1E88E5",
  "#43A047",
  "#FB8C00",
  "#8E24AA",
  "#D81B60",
  "#3949AB",
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
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Center content
            textAlign: "center", // Ensure text is centered
            paddingBottom: 2, // Add bottom padding for spacing
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2, // Add margin-bottom to separate from other elements
            }}
          >
            <Visibility fontSize="small" sx={{ color: "primary.main" }} />
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
              color={
                question.difficulty === "Hard"
                  ? "error"
                  : question.difficulty === "Medium"
                  ? "warning"
                  : "success"
              }
            />
            {question.tags &&
              question.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  icon={<Tag fontSize="small" />}
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
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
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
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
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
            sx={{ mb: 4, overflow: "hidden", borderRadius: 2 }}
          >
            <Box
              sx={{
                background: `linear-gradient(90deg, ${getHeadingColor(
                  index
                )} 30%, rgba(255, 255, 255, 0) 100%)`,
                p: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
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
