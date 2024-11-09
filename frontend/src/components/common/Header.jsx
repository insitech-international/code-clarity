  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Modal,
    Box,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import CloseIcon from '@mui/icons-material/Close';
  import MenuIcon from '@mui/icons-material/Menu';
  
  // Styled components
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.primary,
    boxShadow: 'none', // Remove AppBar shadow for a cleaner look
  }));
  
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: theme.spacing(2),
  }));
  
  const NavLinks = styled('nav')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1, 3),
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.primary.main,
    },
    transition: 'background-color 0.3s, color 0.3s',
  }));
  
  const modalStyle = (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      p: 2,
    },
  });
  
  // Color generator for subcategory headings
  const getRandomColor = () => {
    const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

// bucesrContent object
const bucesrContent = {
  'B': {
    title: 'Break the Problem Down',
    description: 'This is the foundation of understanding the problem before attempting to solve it.',
    questions: [
      "What is the core task I'm being asked to do?",
      'What are the inputs and outputs? How do they relate to each other?',
      'Are there any special conditions or key instructions in the problem statement?',
      'What is the final result I need to return (or output)?'
    ]
  },
  'U': {
    title: 'Use Examples',
    description: 'Working with examples helps you internalize how to approach the solution.',
    questions: [
      'Can I manually work through the examples? What do the examples look like before and after solving the problem?',
      'What does a step-by-step solution look like for each example?',
      'Can I detect a pattern from these examples that might suggest a general approach?',
      'Are the examples covering all possible edge cases, or do I need to come up with additional cases?'
    ]
  },
  'C': {
    title: 'Check for Existing Tools',
    description: 'Before reinventing the wheel, check if there are built-in tools or algorithms that can simplify the solution.',
    questions: [
      'Is there a built-in function or library in my programming language that can help here?',
      "Can I reuse a known algorithm or a solution from a similar problem I've solved before?",
      'What data structures would make this task easier (e.g., arrays, hashmaps, stacks, etc.)?',
      'Are there any mathematical formulas or tricks that simplify the problem?'
    ]
  },
  'E': {
    title: 'Edge Case Awareness',
    description: 'Considering edge cases ensures that your solution works in all scenarios.',
    questions: [
      'What are the minimum and maximum inputs for this problem (e.g., smallest/empty array, largest numbers)?',
      'What happens if I get empty or invalid input?',
      'What if all elements are the same? What if none match?',
      'Could there be unusual or unexpected inputs that would cause an error or infinite loop?'
    ]
  },
  'S': {
    title: 'Start Simple',
    description: 'Start by building the simplest version of the solution and progressively refine it.',
    questions: [
      'What is the simplest possible version of this problem that I can solve?',
      'Can I create a basic solution that handles the core functionality, without worrying about optimization?',
      'Can I write pseudocode or break down my logic step by step to clarify the approach?',
      'Does my solution solve the provided examples correctly?'
    ]
  },
  'R': {
    title: 'Review the Constraints',
    description: "Finally, ensure your solution is efficient and meets the problem's constraints.",
    questions: [
      'What are the time and space constraints? Can my solution fit within these limits?',
      'Is my current approach efficient enough, or do I need to optimize it?',
      'Does my solution handle large inputs, such as arrays with many elements or long strings?',
      'Can I refactor my code to improve readability or efficiency after validating it?'
    ]
  }
};

  const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
    const navItems = [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "BUCESR Framework", action: openModal },
    ];
  
    return (
      <>
        <StyledAppBar position="static">
          <StyledToolbar>
          <Typography 
              variant="h6" 
              component="div" 
              sx={{
                fontWeight: 'bold',
                color: '#1976d2', // change the color
                backgroundColor: '#e3f2fd', // add a light background
                padding: '8px 16px', // add some padding
                borderRadius: '4px', // give it rounded corners
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // add a subtle shadow
              }}
            >
              Qode Clarity
            </Typography>

            {isMobile ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <NavLinks>
                {navItems.map((item) => (
                  item.action ? (
                    <StyledButton key={item.name} onClick={item.action}>
                      {item.name}
                    </StyledButton>
                  ) : (
                    <StyledButton key={item.name} component={Link} to={item.path}>
                      {item.name}
                    </StyledButton>
                  )
                ))}
              </NavLinks>
            )}
          </StyledToolbar>
        </StyledAppBar>
  
        {/* Mobile Menu */}
        <Modal
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          aria-labelledby="mobile-menu-modal"
        >
          <Box sx={modalStyle(theme)}>
            <IconButton
              onClick={toggleMobileMenu}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <List>
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.name}
                  onClick={() => {
                    if (item.action) item.action();
                    toggleMobileMenu();
                  }}
                  component={item.path ? Link : 'li'}
                  to={item.path}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
  
        {/* BUCESR Framework Modal */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="bucesr-modal-title"
        >
          <Paper elevation={24} sx={modalStyle(theme)}>
            <IconButton
              onClick={closeModal}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="bucesr-modal-title" variant="h4" component="h2" gutterBottom>
              BUCESR Framework
            </Typography>
            <Typography variant="h6" gutterBottom>
              When solving coding problems, it's essential to have a structured approach that can guide you through the process effectively.
            </Typography>
            <Divider sx={{ my: 2 }} />
            {Object.entries(bucesrContent).map(([letter, content], index) => (
              <Box key={letter} mt={index > 0 ? 4 : 2}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: getRandomColor() }} // Apply random color to each subcategory heading
                >
                  <strong>{letter} - {content.title}</strong>
                </Typography>
                <Typography variant="body1" paragraph>
                  {content.description}
                </Typography>
                <List>
                  {content.questions.map((question, qIndex) => (
                    <ListItem key={qIndex}>
                      <ListItemText primary={`- ${question}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Paper>
        </Modal>
      </>
    );
  };
  
  export default Header;
  