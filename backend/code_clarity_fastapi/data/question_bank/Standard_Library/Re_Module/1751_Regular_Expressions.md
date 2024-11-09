# Metadata

- **ID**: 1751
- **Title**: Re Module: Regular Expressions
- **Difficulty**: Hard
- **Category**: Standard Library
- **Subcategory**: Text Processing
- **Similar Questions**: String Manipulation, Pattern Matching
- **Real Life Domains**: Data Validation, Text Mining, Web Scraping, Log Analysis

# Problem Description

The `re` module in Python provides support for regular expressions. Regular expressions are powerful tools for pattern matching and text manipulation. The goal is to understand and apply various regular expression techniques to solve complex text processing problems.

# Versions

## Version 1: Basic Pattern Matching

Given a text and a pattern, find all occurrences of the pattern in the text.

Example:
- Input: Text = "The quick brown fox jumps over the lazy dog", Pattern = "the"
- Output: [0, 31] (case-insensitive match)

## Version 2: Advanced Pattern Matching

Implement a function that can handle complex patterns including metacharacters, character classes, and quantifiers.

Example:
- Input: Text = "Email: john@example.com, Phone: 123-456-7890", Pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
- Output: ['john@example.com']

## Version 3: Substitution and Transformation

Create a function that can substitute patterns in text and apply transformations to the matched groups.

Example:
- Input: Text = "Date: 2023-10-15", Pattern = r'(\d{4})-(\d{2})-(\d{2})', Replacement = r'\3/\2/\1'
- Output: "Date: 15/10/2023"

## Version 4: Real-Life Domain Cases

### Scenario 1: Log File Analysis
Parse complex log files to extract specific information such as IP addresses, timestamps, and error messages.

### Scenario 2: Data Cleaning
Clean and standardize messy data by removing unwanted characters, formatting dates, and normalizing phone numbers.

### Scenario 3: Web Scraping
Extract specific information from HTML content, such as all links, images, or structured data.

### Scenario 4: Code Analysis
Analyze source code to find patterns, such as function definitions, variable declarations, or potential security vulnerabilities.

### Scenario 5: Natural Language Processing
Implement basic NLP tasks such as tokenization, named entity recognition, or part-of-speech tagging using regular expressions.

### Scenario 6: Form Validation
Create a robust form validation system that checks various fields (email, phone, password strength) using regular expressions.

# Constraints

- Regular expressions should be optimized for performance, especially for large texts.
- Consider the trade-off between regex complexity and readability.
- Be aware of the limitations of regular expressions (e.g., parsing HTML or nested structures).

# Notes

- Regular expressions can become complex quickly. Always comment your regex patterns for maintainability.
- Use raw strings (r'pattern') in Python to avoid issues with backslashes.
- For very complex text processing tasks, consider using specialized libraries or parsers instead of relying solely on regex.
- Be cautious with greedy vs. lazy quantifiers and their impact on performance and results.# Solution for Regular Expressions

