import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const CarouselWrapper = ({ children }) => (
  <div className="mb-12 max-w-[80vw] mx-auto">
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showIndicators={true}
      centerMode={false}
    >
      {children}
    </Carousel>
  </div>
);

const CategoryCard = ({ reverse, children }) => (
  <div
    className={`flex ${
      reverse ? "flex-row-reverse" : "flex-row"
    } bg-white rounded-lg p-8 h-[400px] items-center justify-center transition-transform duration-300 ease-in-out hover:scale-102`}
  >
    {children}
  </div>
);

const MindMapImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-full max-w-[50%] max-h-[95%] object-contain rounded-lg"
  />
);

const CategoryContent = ({ children }) => (
  <div className="w-3/5 p-4 px-8 flex flex-col justify-center items-center text-center">
    {children}
  </div>
);

const CategoryName = ({ children }) => (
  <h3 className="text-3xl font-semibold mb-4 text-slate-800">{children}</h3>
);

const CategoryDescription = ({ children }) => (
  <p className="text-lg text-slate-700 mb-6 leading-relaxed">{children}</p>
);

const CTAButton = ({ to, children }) => (
  <Link
    to={to}
    className="bg-blue-500 text-white py-3 px-6 rounded-md font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-md self-center"
  >
    {children}
  </Link>
);

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

const CategoryCarousel = () => {
  return (
    <CarouselWrapper>
      {categories.map((category, index) => (
        <CategoryCard key={index} reverse={index % 2 !== 0}>
          <MindMapImage
            src={`/images/category_diagrams/${category.name
              .toLowerCase()
              .replace(/\s+/g, "_")}.png`}
            alt={`${category.name} mind map`}
          />
          <CategoryContent>
            <CategoryName>{category.name}</CategoryName>
            <CategoryDescription>
              {getCategoryDescription(category)}
            </CategoryDescription>
          </CategoryContent>
        </CategoryCard>
      ))}
    </CarouselWrapper>
  );
};

export default CategoryCarousel;