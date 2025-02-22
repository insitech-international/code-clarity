import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const CarouselWrapper = ({ children }) => {
  const dotColors = [
    COLORS.gold.primary,
    COLORS.gold.secondary,
    COLORS.gold.tertiary,
    COLORS.blueGray.primary,
    COLORS.blueGray.secondary,
  ];

  return (
    <div className="mb-12 max-w-[80vw] mx-auto">
      <Carousel
        showArrows={true}
        showStatus={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showIndicators={false}
        centerMode={false}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full text-white hover:opacity-80"
              style={{
                backgroundColor: COLORS.prussianBlue.secondary,
              }}
            >
              <FaArrowLeft size={20} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full text-white hover:opacity-80"
              style={{
                backgroundColor: COLORS.prussianBlue.secondary,
              }}
            >
              <FaArrowRight size={20} />
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const colorClass = dotColors[index % dotColors.length];
          return (
            <li
              className={`inline-block mx-1 w-3 h-3 rounded-full cursor-pointer ${
                isSelected ? "opacity-100" : "opacity-50"
              }`}
              style={{ backgroundColor: colorClass }}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          );
        }}
      >
        {children}
      </Carousel>
    </div>
  );
};

const CategoryCard = ({ reverse, children }) => (
  <div
    className={`flex ${
      reverse ? "flex-row-reverse" : "flex-row"
    } rounded-lg p-8 h-[400px] items-center justify-center transition-transform duration-300 ease-in-out hover:scale-102 shadow-lg`}
    style={{
      backgroundColor: COLORS.offWhite.primary,
      boxShadow: `0 4px 6px rgba(0,49,83,0.1)`
    }}
  >
    {children}
  </div>
);

const MindMapImage = ({ category }) => (
  <div
    className="w-full h-full max-w-[50%] max-h-[95%] rounded-lg flex items-center justify-center p-4"
    style={{
      background: `linear-gradient(45deg, ${COLORS.prussianBlue.primary} 0%, ${COLORS.prussianBlue.secondary} 100%)`,
    }}
  >
    <h3 className="text-white font-bold text-xl text-center break-words p-4">
      {category.replace(/_/g, " ")}
    </h3>
  </div>
);

const CategoryContent = ({ children }) => (
  <div className="w-3/5 p-4 px-8 flex flex-col justify-center items-center text-center">
    {children}
  </div>
);

const CategoryName = ({ children }) => (
  <h3
    className="text-3xl font-semibold mb-4"
    style={{ color: COLORS.gold.primary }}
  >
    {children}
  </h3>
);

const CategoryDescription = ({ children }) => (
  <p
    className="text-lg mb-6 leading-relaxed"
    style={{ color: COLORS.darkSlate.secondary }}
  >
    {children}
  </p>
);

const CTAButton = ({ to, children }) => (
  <Link
    to={to}
    className="text-white py-3 px-6 rounded-md font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md self-center"
    style={{
      backgroundColor: COLORS.gold.secondary,
      '&:hover': {
        backgroundColor: COLORS.gold.primary
      }
    }}
  >
    {children}
  </Link>
);

const CategoryCarousel = () => {
  return (
    <CarouselWrapper>
      {categories.map((category, index) => (
        <CategoryCard key={index} reverse={index % 2 !== 0}>
          <CategoryContent>
            <CategoryName>{category.name}</CategoryName>
            <CategoryDescription>
              {getCategoryDescription(category)}
            </CategoryDescription>
            <CTAButton
              to={`/category/${category.name
                .toLowerCase()
                .replace(/\s+/g, "_")}/questions`}
            >
              View Questions
            </CTAButton>
          </CategoryContent>
          <MindMapImage category={category.name} />
        </CategoryCard>
      ))}
    </CarouselWrapper>
  );
};

const categories = [
  {
    name: "Algorithms and Data Structures",
    subcategories: [
      "Advanced Data Structures",
      "Array",
      "Backtracking",
      "Bit Manipulation",
      "Computational Geometry",
      "Data Structures",
      "Design",
      "Divide and Conquer",
      "Dynamic Programming",
      "Graph Algorithms",
      "Greedy Algorithms",
      "Heap",
      "Linked List",
      "Mathematical Algorithms",
      "Searching",
      "Sorting",
      "String Algorithms",
      "Tree Algorithms",
      "Two Pointers",
    ],
  },
  {
    name: "Advanced Python Concepts",
    subcategories: [
      "Context Managers",
      "Coroutines and AsyncIO",
      "Descriptors",
      "Generators and Iterators",
      "Metaclasses",
    ],
  },
  {
    name: "Basics",
    subcategories: [
      "Control Flow",
      "Data Types",
      "Functions",
      "Modules and Packages",
    ],
  },
  {
    name: "Best Practices and Code Style",
    subcategories: ["Code Documentation", "Code Organization"],
  },
  {
    name: "Concurrency",
    subcategories: [
      "Asyncio",
      "Concurrent Futures",
      "Mixing Concurrency Models",
      "Multiprocessing",
      "Threading",
    ],
  },
  {
    name: "Database Operations",
    subcategories: ["NoSQL Databases", "ORM", "SQL Databases"],
  },
  {
    name: "Data Science and Machine Learning",
    subcategories: [
      "Deep Learning",
      "Machine Learning Pipelines",
      "Matplotlib and Seaborn",
      "NumPy",
      "Pandas",
      "Scikit-learn",
    ],
  },
  {
    name: "Deployment and DevOps",
    subcategories: [
      "CI/CD",
      "Containerization",
      "Orchestration and Automation",
      "Package Management",
      "Serverless",
      "Virtual Environments",
    ],
  },
  {
    name: "Design Patterns",
    subcategories: [
      "Behavioral Patterns",
      "Creational Patterns",
      "Structural Patterns",
    ],
  },
  {
    name: "Exception Handling",
    subcategories: [],
  },
  {
    name: "File Handling",
    subcategories: [],
  },
  {
    name: "Networking",
    subcategories: ["HTTP Requests", "Socket Programming", "Web Scraping"],
  },
  {
    name: "Object Oriented Programming",
    subcategories: [
      "Abstract Classes and Interfaces",
      "Classes and Objects",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
    ],
  },
  {
    name: "Performance Optimization",
    subcategories: ["Code Optimization", "Profiling"],
  },
  {
    name: "Python 2 to 3 Migration",
    subcategories: [],
  },
  {
    name: "Security",
    subcategories: ["Cryptography", "Web Security"],
  },
  {
    name: "Standard Library Deep Dive",
    subcategories: [
      "Collections Module",
      "Concurrent Module",
      "Functools Module",
      "Itertools Module",
      "Re Module",
      "Typing Module",
    ],
  },
  {
    name: "Testing",
    subcategories: ["Mocking", "Test Coverage", "Unit Testing"],
  },
  {
    name: "Web Development",
    subcategories: ["Django", "FastAPI", "Flask"],
  },
];

const getCategoryDescription = (category) => {
  const descriptions = {
    "Algorithms and Data Structures":
      "Fundamental techniques for solving computational problems efficiently and organizing data for optimal access and manipulation.",
    "Advanced Python Concepts":
      "Sophisticated Python features that enable powerful programming paradigms and enhance code flexibility and efficiency.",
    Basics:
      "Core Python concepts and syntax, essential for building a strong foundation in the language.",
    "Best Practices and Code Style":
      "Guidelines and techniques for writing clean, maintainable, and efficient Python code.",
    Concurrency:
      "Techniques for executing multiple tasks simultaneously or managing asynchronous operations in Python.",
    "Database Operations":
      "Methods for interacting with various types of databases using Python, including SQL and NoSQL solutions.",
    "Data Science and Machine Learning":
      "Python tools and libraries for data analysis, visualization, and building machine learning models.",
    "Deployment and DevOps":
      "Practices and tools for deploying, managing, and scaling Python applications in production environments.",
    "Design Patterns":
      "Reusable solutions to common problems in software design, adapted for Python programming.",
    "Exception Handling":
      "Techniques for gracefully managing and responding to errors in Python programs.",
    "File Handling":
      "Methods for reading, writing, and manipulating files and file systems using Python.",
    Networking:
      "Python tools and techniques for network programming, web scraping, and making HTTP requests.",
    "Object Oriented Programming":
      "Principles and practices of object-oriented design and implementation in Python.",
    "Performance Optimization":
      "Strategies and tools for improving the speed and efficiency of Python code.",
    "Python 2 to 3 Migration":
      "Guidelines and best practices for transitioning codebases from Python 2 to Python 3.",
    Security:
      "Techniques and best practices for writing secure Python code and protecting against common vulnerabilities.",
    "Standard Library Deep Dive":
      "Detailed exploration of Python's built-in modules and their advanced usage.",
    Testing:
      "Methodologies and tools for ensuring the correctness and reliability of Python code through automated testing.",
    "Web Development":
      "Frameworks and techniques for building web applications and APIs using Python.",
  };
  return (
    descriptions[category.name] ||
    "Explore advanced concepts and techniques in Python programming."
  );
};

export default CategoryCarousel;
