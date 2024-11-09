**Loops: Iterative Execution in Programming**

# Metadata

- **ID**: 1412
- **Title**: Loops: Iterative Execution in Programming
- **Difficulty**: Medium
- **Category**: Python Basics
- **Subcategory**: Control Flow
- **Similar Questions**: LeetCode: 189, HackerRank: Loop Detection in Linked Lists
- **Real Life Domains**: Data Processing, Web Scraping, File Handling

# Problem Description

Loops allow programs to execute a block of code repeatedly for a specified number of iterations or until a condition is met. Understanding and effectively using loops is crucial for efficient and readable code.

# Versions

## Version 1: LeetCode - Rotate Array

Given an integer array, rotate the array to the right by k steps, and return the result.

Example:
- Input: nums = [1,2,3,4,5,6,7], k = 3
- Output: [5,6,7,1,2,3,4]

## Version 2: HackerRank - Loop Detection in Linked Lists

Detect a loop in a linked list.

Example:
- Input: head = [1,2,3,4], loop_start = 0
- Output: 0

## Version 3: Real-Life Scenario - Web Crawler

Develop a web crawler that visits a series of URLs and extracts specific information from each page. Implement a function that crawls up to N pages deep, extracting unique titles from each webpage.

Example:
- Input: base_url = "https://example.com", max_depth = 2
- Output: List of unique titles extracted from crawled pages

# Constraints

- For Version 1:
  - 1 <= nums.length <= 10^4
  - 0 <= k <= 10^4

- For Version 2:
  - 1 <= m <= 104; 1 <= n <= 104
  - 0 <= start <= n

- For Version 3:
  - Base URL is valid and accessible
  - Max depth is a positive integer

# Notes

- Common types of loops include for-loops, while-loops, and do-while loops.
- When working with large datasets, consider using generators or iterators for memory efficiency.
- In web crawling, be mindful of rate limiting and robots.txt to avoid overloading servers or violating terms of service.
- Always handle potential errors and exceptions in loop-based operations.
