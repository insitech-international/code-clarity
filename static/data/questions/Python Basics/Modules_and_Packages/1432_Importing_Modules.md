**Importing Modules: Accessing External Code in Python**

# Metadata

- **ID**: 1432
- **Title**: Importing Modules: Accessing External Code in Python
- **Difficulty**: Easy
- **Category**: Python Basics
- **Subcategory**: Modules and Packages
- **Similar Questions**: LeetCode: 71, HackerRank: Importing Modules
- **Real Life Domains**: Large-Scale Projects, Code Reusability, API Integration

# Problem Description

Importing modules allows programmers to access and utilize code defined in other files. This feature enables code reuse, promotes modularity, and facilitates collaboration in software development.

# Versions

## Version 1: LeetCode - Insert Delete GetRandom O(1)

Design a data structure that supports insert, delete, getrandomO(1) operations in O(1) time complexity.

Example:
- Input: ["insert", "delete", "getRandomElement"]
- Output: [null, null, 2]

## Version 2: HackerRank - Importing Modules

Create a script that imports the `math` module and uses its `sqrt` function to calculate the square root of a given number.

Example:
- Input: number = 25
- Output: 5.0

## Version 3: Real-Life Scenario - API Client Module

Develop an API client module that interacts with a weather service. Import necessary libraries, define helper functions, and create a main function to fetch current temperature and humidity for a given location.

Example:
- Input: location = "New York"
- Output: Temperature: 22°C, Humidity: 60%

# Constraints

- For Version 1:
  - 1 <= len(nums) <= 10 ^ 4
  - 1 <= nums[i] <= 10 ^ 4

- For Version 2:
- For Version 3:
  - Ensure proper error handling for network issues or API rate limits
  - Use environment variables or configuration files for API keys

# Notes

- Imports can be done using absolute paths or relative paths.
- Use `__all__` in module files to control what gets imported when using `from module import *`.
- Consider using virtual environments to manage dependencies and avoid conflicts between projects.
- Always test imported modules to ensure compatibility with different Python versions and operating systems.
