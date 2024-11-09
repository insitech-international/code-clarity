**Lambda Functions: Anonymous Functions in Python**

# Metadata

- **ID**: 1423
- **Title**: Lambda Functions: Anonymous Functions in Python
- **Difficulty**: Medium
- **Category**: Python Basics
- **Subcategory**: Functions
- **Similar Questions**: LeetCode: 199, HackerRank: Lambda Function
- **Real Life Domains**: Event Handlers, Data Transformations, Functional Programming

# Problem Description

Lambda functions are anonymous functions in Python that can be defined inline. They are useful for creating small, one-off functions without declaring a separate named function.

# Versions

## Version 1: LeetCode - Remove Element

Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. Return the length of the modified array.

Example:
- Input: nums = [3,2,2,3], val = 3
- Output: 2
- Explanation: Your function should return length = 2, with the first two elements of nums being 3.

## Version 2: HackerRank - Lambda Function

Given a list of integers, find the sum of all even numbers in the list using a lambda function.

Example:
- Input: numbers = [1, 2, 3, 4, 5, 6]
- Output: 12

## Version 3: Real-Life Scenario - Data Transformation Pipeline

Implement a data transformation pipeline using lambda functions. Read a CSV file, filter rows based on a condition, and transform specific columns. Finally, write the transformed data to a new CSV file.

Example:
- Input: csv_file = "input_data.csv", condition = lambda row: int(row['age']) > 30
- Output: Transformed data saved in "output_data.csv"

# Constraints

- For Version 1:
  - 0 <= nums.length <= 10 ^ 4
  - 0 <= val <= 10 ^ 4
  - nums[i] != val

- For Version 2:
  - numbers is a list of integers
  - There are at least two even numbers in the list

- For Version 3:
  - CSV file exists and contains relevant data
  - Condition for filtering rows is provided as a lambda function

# Notes

- Lambda functions are limited to a single expression and cannot contain statements.
- They are particularly useful for short, simple operations.
- In real-world applications, consider performance implications when using lambda functions for complex operations.
- Always test lambda functions thoroughly, especially when dealing with large datasets or complex transformations.
