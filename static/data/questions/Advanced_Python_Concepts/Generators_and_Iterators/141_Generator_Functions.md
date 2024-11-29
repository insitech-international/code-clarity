# Metadata

- **ID**: 141
- **Title**: Generator Functions in Python
- **Difficulty**: Medium
- **Category**: Advanced Python Concepts
- **Subcategory**: Generators and Iterators
- **Similar Questions**: LeetCode: 284. Peeking Iterator, HackerRank: Iterables and Iterators
- **Real Life Domains**: Data Processing, Memory Optimization, Streaming Data, Lazy Evaluation

# Problem Description

Implement and utilize generator functions in Python to solve various problems efficiently. Generator functions allow you to declare a function that behaves like an iterator, providing a powerful way to work with large datasets or infinite sequences without loading everything into memory at once.

# Versions

## Version 1: HackerRank - Prime Factor Generator

Implement a generator function that yields the prime factors of a given number in ascending order. Optimize the function to handle large numbers efficiently.

## Version 2: HackerRank - Sequence Flattening

Create a generator function that flattens a nested sequence (which can contain lists, tuples, and other iterables) into a flat sequence of elements. The generator should work with arbitrarily deep nesting.

## Version 3: Real-Life Scenario - Log File Analyzer

Develop a log file analyzer that uses generator functions to efficiently process large log files. Implement generators for reading the file line by line, parsing log entries, filtering based on various criteria (e.g., time range, log level), and generating summary statistics.

## Version 4: Real-Life Scenario - Data Stream Processing

Create a data stream processing system that uses generators to handle potentially infinite streams of data (e.g., sensor readings, financial ticks). Implement windowing operations, running statistics, and alerting mechanisms using generator functions and coroutines.

## Version 5: Real-Life Scenario - Memory-Efficient Data Pipeline

Design a memory-efficient data processing pipeline for a big data application. Use generator functions to implement each stage of the pipeline (e.g., data extraction, transformation, loading). The pipeline should be able to process datasets larger than available RAM by leveraging lazy evaluation.

# Constraints

- For all versions:
  - Use Python's generator syntax (yield keyword) to create generator functions.
  - Ensure memory efficiency, especially when dealing with large datasets.
  - Consider the trade-offs between eager and lazy evaluation.
  - Implement proper error handling and resource management.

# Notes

- Generator functions are memory-efficient as they generate values on-the-fly instead of storing them all in memory.
- The `yield` keyword is used to define a generator function. When called, it returns a generator object.
- Generator expressions provide a concise way to create generators, similar to list comprehensions.
- In real-world scenarios, generators are particularly useful for processing large datasets, implementing data pipelines, and working with infinite sequences.
- Consider using the `itertools` module from the Python standard library for additional tools to work with iterators and generators efficiently.
- For advanced use cases, explore libraries like `asyncio` for asynchronous generators and `yield from` for delegating to sub-generators.