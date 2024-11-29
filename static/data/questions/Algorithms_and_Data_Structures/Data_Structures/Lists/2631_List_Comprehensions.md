**List Comprehensions: Concise Data Manipulation in Python**

# Metadata

- **ID**: 2631
- **Title**: List Comprehensions: Concise Data Manipulation in Python
- **Difficulty**: Medium
- **Category**: Data Structures
- **Subcategory**: Lists
- **Similar Questions**: LeetCode: 88, HackerRank: List Comprehension
- **Real Life Domains**: Data Cleaning, Filtering, Transformation, Performance Optimization

# Problem Description

List comprehensions are a powerful feature in Python that allow for concise and readable ways to create new lists based on existing ones. They provide a compact syntax for expressing iteration, selection, and transformation operations on sequences.

# Versions

## Version 1: LeetCode - Merge Two Sorted Lists

Merge two sorted linked lists and return it as a new sorted list.

Example:
- Input: l1 = [1,2,4], l2 = [1,3,4]
- Output: [1,1,2,3,4,4]

## Version 2: HackerRank - List Comprehension

Given a list of integers, create a new list that includes only the even numbers from the original list.

Example:
- Input: numbers = [1, 2, 3, 4, 5, 6, 7, 8]
- Output: [2, 4, 6, 8]

## Version 3: Real-Life Scenario - Data Preprocessing Pipeline

Develop a data preprocessing pipeline that reads a CSV file, filters out rows with missing values, transforms categorical variables, and selects relevant features. Use list comprehensions to implement these operations efficiently.

Example:
- Input: csv_file = "raw_data.csv", target_column = "target"
- Output: Preprocessed DataFrame ready for modeling

# Constraints

- For Version 1:
  - Both lists have the same length
  - Nodes have the same structure (each node has a value and a pointer to the next node)

- For Version 2:
  - numbers is a list of integers
  - There are no duplicate numbers in the list

- For Version 3:
  - CSV file exists and contains relevant data
  - Target column exists in the CSV file
  - Missing values are represented as NaN or None

# Notes

- List comprehensions offer a more concise alternative to for loops for creating new lists.
- They support conditional expressions and multiple transformations in a single line.
- List comprehensions are generally faster than equivalent for loops, especially for large datasets.
- When dealing with large datasets, consider using generators instead of creating full lists in memory.
- Always test list comprehensions with edge cases and large datasets to ensure performance and correctness.
