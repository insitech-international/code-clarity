import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage"; // Add this import
import AboutPage from "./pages/AboutPage.js";
import ContactPage from "./pages/ContactPage.js";
import TermsPage from "./pages/TermsPage.js";
import PrivacyPage from "./pages/PrivacyPage.js";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route
            path="/category/:categoryName/questions"
            element={<CategoryPage />}
          />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/search" element={<SearchPage />} />{" "}
          {/* Add this new route */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
