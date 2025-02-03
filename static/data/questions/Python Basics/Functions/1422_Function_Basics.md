**Function Basics: Creating and Using Functions in Programming**

# Metadata

- **ID**: 1422
- **Title**: Function Basics: Creating and Using Functions in Programming
- **Difficulty**: Easy
- **Category**: Python Basics
- **Subcategory**: Functions
- **Similar Questions**: LeetCode: 20, HackerRank: Basic Programming
- **Real Life Domains**: Data Processing, Algorithm Implementation, Game Development

# Problem Description

Functions are reusable blocks of code that perform specific tasks. Understanding how to define and call functions is essential for writing efficient and organized programs.

# Versions

## Version 1: LeetCode - Valid Parentheses

Given a string containing just the characters '(' and ')', return true if the input string is valid, otherwise return false.

Example:
- Input:```

# Versions

## Version 1: LeetCode - Valid Parentheses

Given a string containing just the characters '(' and ')', return true if the input string is valid, otherwise return false.

Example:
- Input: "()"
- Output: true
- Explanation: Even though we open a parenthesis and immediately close it, since it matches, we can still parse it.

## Version 2: HackerRank - Basic Programming

Given an integer n, calculate the sum of all integers from 1 to n.

Example:
- Input: n = 5
- Output: 15
- Explanation: Sum of 1 + 2 + 3 + 4 + 5 = 15

## Version 3: Real-Life Scenario - Calculator Program

Implement a simple calculator that performs addition, subtraction, multiplication, and division of two numbers. Handle potential division by zero errors.

Example:
- Input: operation = "+", num1 = 5, num2 = 3
- Output: 8

# Constraints

- For Version 1:
  - 0 <= s.length <= 4 * 10 ^ 4
  - s consists of parentheses only, as described in the problem statement

- For Version 2:
  - 1 <= n <= 10 ^ 4

- For Version 3:
  - All inputs are valid numbers
  - Division by zero should raise an exception

# Notes

- Functions can take parameters and return values.
- Proper naming conventions and comments improve code readability.
- Consider error handling for unexpected inputs or edge cases.
- Test functions with various input combinations to ensure correctness.
