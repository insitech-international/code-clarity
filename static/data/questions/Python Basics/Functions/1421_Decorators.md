**Decorators: Enhancing Function Behavior in Python**

# Metadata

- **ID**: 1421
- **Title**: Decorators: Enhancing Function Behavior in Python
- **Difficulty**: Medium
- **Category**: Python Basics
- **Subcategory**: Functions
- **Similar Questions**: LeetCode: 198, HackerRank: Decorator Factory
- **Real Life Domains**: Logging, Authentication, Performance Measurement

# Problem Description

Decorators are a powerful feature in Python that allow programmers to modify function behavior without changing the function's source code. They wrap functions to add new functionality or alter their execution.

# Versions

## Version 1: LeetCode - Number of Islands

Count the number of islands represented by a grid.

Example:
- Input: grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
- Output: 1

## Version 2: HackerRank - Decorator Factory

Create a decorator factory that takes a parameter and returns a decorator. The returned decorator should print the name of the function being decorated.

Example:
- Input: 
  @factory_decorator("test")
  def test_function():
      pass
- Output:
  test_function()
  # Should print: test_function

## Version 3: Real-Life Scenario - Logging Decorator

Implement a decorator that logs the execution time of a function. Create a class-level variable to store the total execution time and update it for each decorated function call.

Example:
- Input: 
  @log_execution_time
  def complex_calculation(a, b):
      time.sleep(1)
      return a + b
- Output:
  complex_calculation(5, 10)
  # Should print: Execution time: 1.0 seconds
  # Total execution time: 1.0 seconds

# Constraints

- For Version 1:
  - grid.length == m
  - grid[i].length == n
  - 1 <= m, n <= 300
  - grid[i][j] contains only '0' or '1'

- For Version 2:
  - No input provided, focus on implementing the decorator factory

- For Version 3:
  - Functions decorated with @log_execution_time should be called at least once

# Notes

- Decorators are defined using the @decorator_name syntax before a function definition.
- They can be used to add logging, authentication, caching, or any other functionality to functions.
- When using decorators, remember to import them properly and ensure they are defined before usage.
- Always test decorated functions thoroughly to ensure they behave as expected.
