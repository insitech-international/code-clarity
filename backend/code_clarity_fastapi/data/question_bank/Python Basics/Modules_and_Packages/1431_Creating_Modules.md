**Creating Modules: Organizing Code in Python**

# Metadata

- **ID**: 1431
- **Title**: Creating Modules: Organizing Code in Python
- **Difficulty**: Easy
- **Category**: Python Basics
- **Subcategory**: Modules and Packages
- **Similar Questions**: LeetCode: 70, HackerRank: Module Creation
- **Real Life Domains**: Large-Scale Projects, Code Reusability, API Development

# Problem Description

Modules in Python are files containing related functions, classes, and variables. They serve as a way to organize code, promote reusability, and encapsulate functionality.

# Versions

## Version 1: LeetCode - Climbing Stairs

An integer array is a stair case like: [....1....2....3....] Its pre Previous element of each step can climb to either the previous or the step 2 numbers above it. Each turn, it could reach either the previous step or go back to two steps index below it, and return the number of stairs it eventually climbed to.

Example:

- Input: nums = [1, 2, 3, ..., 100]
- Output: 100

## Version 2: HackerRank - Module Creation

Create a module called `math_operations.py` that defines three functions: `add`, `subtract`, and `multiply`. Each function should take two arguments and return their product.

Example:

- Input: math_operations.add(5, 3)
- Output: 8

## Version 3: Real-Life Scenario - Scientific Calculator

Develop a scientific calculator module that implements common mathematical functions like sine, cosine, tangent, square root, and logarithm. Export the module and demonstrate its usage in another script.

Example:

- Input: from calculator import sin, cos, sqrt
- Output: Result of trigonometric calculations and square root computation

# Constraints

- For Version 1:

  - 1 <= nums.length <= 10 ^ 4
  - 1 <= nums[i] <= 10 ^ 4

- For Version 2:

  - Inputs are integers

- For Version 3:
  - Ensure proper documentation and type hints are used
  - Implement error handling for invalid inputs

# Notes

- Modules are created by defining functions, classes, and variables in a .py file.
- Import modules using the `import` statement or the `from` keyword.
- Use relative imports (`.`) for local modules and absolute imports (`__package__`) for external packages.
- Consider using `__init__.py` files to expose only necessary functions or classes from a module.
- Always test imported modules to ensure they work correctly in different contexts.
