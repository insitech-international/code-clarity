import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Container, Box, Modal, Typography, Button, CircularProgress, TextField, MenuItem, IconButton, InputAdornment, Chip } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { useCategories, useQuestionData } from "../../hooks/useQuestionData";

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

const SearchBar = styled(TextField)(({ theme }) => ({
  backgroundColor: COLORS.offWhite.primary,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  [`& fieldset`]: {
    borderColor: COLORS.gold.tertiary,
  },
  [`&:hover fieldset`]: {
    borderColor: COLORS.gold.secondary,
  },
  [`&.Mui-focused fieldset`]: {
    borderColor: COLORS.gold.primary,
  },
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: COLORS.prussianBlue.primary,
  boxShadow: 'none',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: COLORS.prussianBlue.secondary,
  color: COLORS.offWhite.primary,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 0,
  [theme.breakpoints.up('sm')]: {
    width: '60%',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(COLORS.offWhite.primary, 0.15),
  '&:hover': {
    backgroundColor: alpha(COLORS.offWhite.primary, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLORS.offWhite.primary,
}));

const StyledInputBase = styled(TextField)(() => ({
  color: COLORS.offWhite.primary,
  '& .MuiInputBase-input': {
    color: COLORS.offWhite.primary,
    padding: '8px 8px 8px 0',
    paddingLeft: 'calc(1em + 32px)',
    transition: 'width 0.3s',
    width: '100%',
  },
}));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: "",
    category: "",
    subcategory: "",
  });
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [subcategories, setSubcategories] = useState({});

  const { fetchQuestions } = useQuestionData();

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", searchTerm);
    setSearchParams(newSearchParams);
    navigate(`/search?${newSearchParams.toString()}`);
    setIsModalOpen(true);

    setLoading(true);
    try {
      const results = await fetchQuestions({ search: searchTerm, ...filters });
      console.log('Search Results:', results);
      setSearchResults(Array.isArray(results) ? results : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters, searchParams, navigate, fetchQuestions]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
    if (filterName === 'category') {
      setFilters(prevFilters => ({
        ...prevFilters,
        subcategory: '',
      }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (filters.category) {
      const selectedCategorySubcategories = categories.find(
        (category) => category === filters.category
      )?.subcategories || [];
      setSubcategories(selectedCategorySubcategories);
    } else {
      setSubcategories({});
    }
  }, [filters.category, categories]);

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setSearchTerm("")}
                        edge="end"
                        size="small"
                        sx={{ color: COLORS.offWhite.primary }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Search>
            <Button
              sx={{
                backgroundColor: COLORS.gold.secondary,
                color: COLORS.offWhite.primary,
                ml: 2,
                '&:hover': {
                  backgroundColor: COLORS.gold.primary
                }
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="search-modal">
        <ModalContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              id="search-modal"
              variant="h5"
              component="h2"
              sx={{ color: COLORS.offWhite.primary }}
            >
              Search Results
            </Typography>
            <IconButton onClick={handleCloseModal} sx={{ color: COLORS.offWhite.primary }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <TextField
              select
              label="Difficulty"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              sx={{
                minWidth: 120,
                '& .MuiInputLabel-root': { color: COLORS.blueGray.secondary },
                '& .MuiSelect-icon': { color: COLORS.blueGray.secondary },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: COLORS.gold.tertiary
                }
              }}
              InputProps={{
                sx: {
                  color: COLORS.offWhite.primary,
                  '& .MuiSelect-icon': { color: COLORS.offWhite.primary }
                }
              }}
            >
              <MenuItem value="" sx={{ backgroundColor: COLORS.prussianBlue.secondary, color: COLORS.offWhite.primary }}>All</MenuItem>
              <MenuItem
                value="easy"
                sx={{
                  backgroundColor: COLORS.prussianBlue.secondary,
                  color: COLORS.offWhite.primary,
                  '&:hover': { backgroundColor: COLORS.darkSlate.primary }
                }}
              >
                Easy
              </MenuItem>
              <MenuItem
                value="medium"
                sx={{
                  backgroundColor: COLORS.prussianBlue.secondary,
                  color: COLORS.offWhite.primary,
                  '&:hover': { backgroundColor: COLORS.darkSlate.primary }
                }}
              >
                Medium
              </MenuItem>
              <MenuItem
                value="hard"
                sx={{
                  backgroundColor: COLORS.prussianBlue.secondary,
                  color: COLORS.offWhite.primary,
                  '&:hover': { backgroundColor: COLORS.darkSlate.primary }
                }}
              >
                Hard
              </MenuItem>
            </TextField>

            <TextField
              select
              label="Category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              sx={{
                minWidth: 200,
                '& .MuiInputLabel-root': { color: COLORS.blueGray.secondary },
                '& .MuiSelect-icon': { color: COLORS.blueGray.secondary },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: COLORS.gold.tertiary
                }
              }}
              InputProps={{
                sx: { color: COLORS.offWhite.primary }
              }}
            >
              <MenuItem value="" sx={{ backgroundColor: COLORS.prussianBlue.secondary, color: COLORS.offWhite.primary }}>All</MenuItem>
              {categoriesLoading ? (
                <MenuItem
                  disabled
                  sx={{
                    backgroundColor: COLORS.prussianBlue.secondary,
                    color: COLORS.blueGray.secondary
                  }}
                >
                  Loading categories...
                </MenuItem>
              ) : categoriesError ? (
                <MenuItem
                  disabled
                  sx={{
                    backgroundColor: COLORS.prussianBlue.secondary,
                    color: COLORS.blueGray.secondary
                  }}
                >
                  Error loading categories
                </MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    sx={{
                      backgroundColor: COLORS.prussianBlue.secondary,
                      color: COLORS.offWhite.primary,
                      '&:hover': { backgroundColor: COLORS.darkSlate.primary }
                    }}
                  >
                    {category.replace(/_/g, ' ')}
                  </MenuItem>
                ))
              )}
            </TextField>

            {filters.category && (
              <TextField
                select
                label="Subcategory"
                value={filters.subcategory}
                onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                sx={{
                  minWidth: 200,
                  '& .MuiInputLabel-root': { color: COLORS.blueGray.secondary },
                  '& .MuiSelect-icon': { color: COLORS.blueGray.secondary },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS.gold.tertiary
                  }
                }}
                InputProps={{
                  sx: { color: COLORS.offWhite.primary }
                }}
              >
                <MenuItem value="" sx={{ backgroundColor: COLORS.prussianBlue.secondary, color: COLORS.offWhite.primary }}>All</MenuItem>
                {subcategories.length > 0 ? (
                  subcategories.map((subcategory) => (
                    <MenuItem
                      key={subcategory}
                      value={subcategory}
                      sx={{
                        backgroundColor: COLORS.prussianBlue.secondary,
                        color: COLORS.offWhite.primary,
                        '&:hover': { backgroundColor: COLORS.darkSlate.primary }
                      }}
                    >
                      {subcategory.replace(/_/g, ' ')}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    disabled
                    sx={{
                      backgroundColor: COLORS.prussianBlue.secondary,
                      color: COLORS.blueGray.secondary
                    }}
                  >
                    No subcategories available
                  </MenuItem>
                )}
              </TextField>
            )}
          </Box>

          {loading ? (
            <CircularProgress sx={{ color: COLORS.gold.primary }} />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box>
              {searchResults.map((result) => (
                <Chip
                  key={result.id}
                  label={result.question}
                  sx={{
                    margin: 1,
                    backgroundColor: COLORS.gold.tertiary,
                    color: COLORS.offWhite.primary
                  }}
                />
              ))}
            </Box>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;