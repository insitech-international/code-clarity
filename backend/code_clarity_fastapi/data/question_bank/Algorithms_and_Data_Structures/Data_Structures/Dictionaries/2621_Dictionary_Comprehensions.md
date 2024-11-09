# Metadata

- **ID**: 2621
- **Title**: Dictionary Comprehensions: Efficient Dictionary Creation
- **Difficulty**: Easy
- **Category**: Data Structures
- **Subcategory**: Dictionaries
- **Similar Questions**: List Comprehensions, Set Comprehensions
- **Real Life Domains**: Data Processing, Configuration Management, Data Analysis

# Problem Description

Dictionary comprehensions provide a concise way to create dictionaries in Python. They allow you to generate dictionary key-value pairs using a single line of code, often resulting in more readable and efficient code compared to traditional loop-based methods.

# Versions

## Version 1: Basic Dictionary Comprehension

Create a dictionary comprehension that generates a dictionary where the keys are numbers from 1 to 10, and the values are their squares.

Example:
- Input: None
- Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}

## Version 2: Conditional Dictionary Comprehension

Given a list of words, create a dictionary where the keys are the words and the values are their lengths, but only for words with more than 3 characters.

Example:
- Input: ["apple", "banana", "cherry", "date", "elderberry", "fig"]
- Output: {'apple': 5, 'banana': 6, 'cherry': 6, 'elderberry': 10}

## Version 3: Nested Dictionary Comprehension

Given two lists, one containing student names and another containing their respective scores in multiple subjects, create a nested dictionary where the outer keys are student names and the inner keys are subject names with their corresponding scores.

Example:
- Input:
  students = ["Alice", "Bob", "Charlie"]
  scores = [
    [85, 90, 78],
    [92, 88, 95],
    [78, 85, 80]
  ]
  subjects = ["Math", "Science", "History"]
- Output:
  {
    'Alice': {'Math': 85, 'Science': 90, 'History': 78},
    'Bob': {'Math': 92, 'Science': 88, 'History': 95},
    'Charlie': {'Math': 78, 'Science': 85, 'History': 80}
  }

# Constraints

- For Version 1:
  - The range of numbers should be customizable (e.g., from 1 to n)
- For Version 2:
  - 1 <= len(words) <= 10^5
  - 1 <= len(word) <= 20 for each word
- For Version 3:
  - 1 <= len(students) <= 1000
  - The number of scores for each student should match the number of subjects

# Notes

- Dictionary comprehensions can significantly reduce the amount of code needed to create dictionaries, especially when transforming or filtering data.
- They can be combined with conditional statements to filter out unwanted key-value pairs.
- Nested dictionary comprehensions can be used to create more complex data structures, but be cautious about readability.
- When working with large datasets, consider the memory implications of dictionary comprehensions, as they create the entire dictionary in memory at once.
- Dictionary comprehensions can be a powerful tool for data preprocessing and feature engineering in machine learning applications.