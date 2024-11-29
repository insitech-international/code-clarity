# Metadata

- **ID**: 1503
- **Title**: Unicode Strings
- **Difficulty**: Medium
- **Category**: Python 2 to 3 Migration
- **Subcategory**: Data Types
- **Similar Questions**: String Encoding/Decoding, Internationalization in Python
- **Real Life Domains**: Software Localization, Web Development, Data Processing, Natural Language Processing

# Problem Description

One of the most significant changes in Python 3 was the handling of strings, particularly regarding Unicode support. This problem focuses on understanding and adapting to these changes in various scenarios involving text processing and internationalization.

# Versions

## Version 1: Basic String Types

Compare the behavior of string types in Python 2 (str and unicode) with Python 3 (str and bytes). Demonstrate how to create and manipulate strings containing non-ASCII characters in both versions.

Example:

- Input: Create a string containing "Hello" in English, "Здравствуйте" in Russian, and "こんにちは" in Japanese
- Output:
  - Describe how to create and print these strings in Python 2
  - Describe how to create and print these strings in Python 3
  - Explain the differences in internal representation and behavior

## Version 2: String Operations and Comparisons

Explore how common string operations and comparisons behave differently with Unicode strings in Python 2 vs Python 3. Include scenarios involving sorting, case conversion, and regular expressions.

Example:

- Input:
  - Sort a list of strings: ["café", "apple", "Zürich", "banana"]
  - Convert "İstanbul" to uppercase and lowercase
  - Use a regular expression to find all word characters in "Hello, 世界!"
- Output:
  - Describe the results and any differences between Python 2 and 3
  - Explain how to achieve consistent behavior across both versions

## Version 3: File I/O and Encoding

Address the challenges of reading from and writing to files with Unicode content in Python 2 and 3. Include scenarios with different file encodings and error handling.

Example:

- Input:
  - Read a file containing text in UTF-8 encoding
  - Write Unicode content to a file in UTF-16 encoding
  - Handle a file with unknown or incorrect encoding
- Output:
  - Provide code snippets for both Python 2 and 3
  - Describe best practices for handling encoding issues in each version

## Version 4: Real-Life Domain Cases

### Scenario 1: Multilingual Web Application

You're developing a web application that needs to support multiple languages. The application involves user input, database storage, and display of multilingual content.

Tasks:
a) Handle user input of names in various scripts (e.g., Latin, Cyrillic, Arabic, Chinese)
b) Store and retrieve multilingual product descriptions from a database
c) Generate dynamic content with correct encoding for different language settings
d) Implement URL parsing and generation with Unicode characters

### Scenario 2: Natural Language Processing

You're working on a natural language processing project that analyzes text in multiple languages.

Tasks:
a) Tokenize text containing a mix of languages and scripts
b) Implement a case-insensitive search function that works across different alphabets
c) Calculate text statistics (e.g., character count, word count) for Unicode text
d) Handle text normalization for comparison and analysis

### Scenario 3: Data Import and Export

You're building a data processing pipeline that needs to handle various text formats and encodings.

Tasks:
a) Import CSV files with different encodings (UTF-8, UTF-16, ISO-8859-1)
b) Parse JSON data containing Unicode escape sequences
c) Generate XML output with proper encoding declarations
d) Implement a robust error handling system for decoding failures

### Scenario 4: Localization and Internationalization

You're internationalizing an existing Python 2 application for a global market.

Tasks:
a) Refactor hard-coded strings into a localization system
b) Implement plural forms handling for different languages
c) Ensure proper collation (sorting) of strings for different locales
d) Handle bidirectional text for languages like Arabic and Hebrew

### Scenario 5: Text Processing in Scientific Computing

You're working on a scientific computing project that involves processing text data from various sources.

Tasks:
a) Parse scientific notation and mathematical symbols from Unicode text
b) Handle subscripts and superscripts in chemical formulas
c) Process astronomical names containing Greek letters and special characters
d) Implement a custom codec for a domain-specific text format

# Constraints

- For all versions:

  - Consider the differences in default string types between Python 2 (ASCII) and Python 3 (Unicode)
  - Be aware of the potential for UnicodeEncodeError and UnicodeDecodeError
  - Consider performance implications, especially for large texts

- For Version 4 (Real-Life Domain Cases):
  - Ensure solutions are scalable for large datasets
  - Consider memory constraints when dealing with large Unicode strings
  - Address potential security issues related to Unicode handling (e.g., Unicode normalization attacks)

# Notes

- The transition from Python 2 to 3 fundamentally changed how strings are handled, with all strings in Python 3 being Unicode by default.
- Python 2's `u''` prefix for Unicode strings is unnecessary in Python 3 but can be used for compatibility.
- The `encode()` and `decode()` methods behave differently in Python 2 and 3, especially regarding default encodings.
- Be aware of the `__unicode__` vs `__str__` methods in Python 2, and how they're unified in Python 3.
- Consider using libraries like `six` or `future` for writing compatible code.
- Discuss best practices for handling encoding issues, such as always specifying encodings explicitly.
- Address the challenges of maintaining code that needs to run on both Python 2 and 3, especially regarding string handling.
