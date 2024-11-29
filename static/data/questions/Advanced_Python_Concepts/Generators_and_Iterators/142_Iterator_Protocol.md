# Metadata

- **ID**: 142
- **Title**: Iterator Protocol in Python
- **Difficulty**: Medium
- **Category**: Advanced Python Concepts
- **Subcategory**: Generators and Iterators
- **Similar Questions**: LeetCode: 173. Binary Search Tree Iterator, HackerRank: Compress the String!
- **Real Life Domains**: Custom Data Structures, Database Cursors, File I/O, Streaming APIs

# Problem Description

Implement custom iterator classes in Python that adhere to the iterator protocol. Understand and utilize the `__iter__()` and `__next__()` methods to create objects that can be used in for loops and other contexts where iterables are expected.

# Versions

## Version 1: HackerRank - Circular Buffer Iterator

Implement a circular buffer data structure with a custom iterator. The iterator should allow continuous iteration over the buffer, wrapping around to the beginning when it reaches the end.

## Version 2: HackerRank - Combination Iterator

Create an iterator class that generates all possible combinations of k elements from a given list of n elements. The iterator should generate combinations in lexicographical order.

## Version 3: Real-Life Scenario - Pagination Iterator

Develop a pagination iterator for a large dataset (e.g., database query results, API responses). The iterator should fetch data in chunks (pages) as needed, implementing lazy loading to minimize memory usage and API calls.

## Version 4: Real-Life Scenario - Time Series Data Iterator

Implement an iterator for time series data that supports various resampling operations (e.g., daily to weekly aggregation). The iterator should handle large datasets efficiently, performing aggregations on-the-fly without loading all data into memory.

## Version 5: Real-Life Scenario - File System Traversal Iterator

Create a file system traversal iterator that allows iteration over files and directories in a given path. Implement options for depth-first or breadth-first traversal, filtering based on file attributes, and handling of symbolic links.

# Constraints

- For all versions:
  - Implement the `__iter__()` and `__next__()` methods correctly.
  - Raise `StopIteration` when the iteration is complete.
  - Ensure proper resource management (e.g., closing file handles, database connections).
  - Consider thread-safety for iterators that might be used in concurrent environments.

# Notes

- The iterator protocol in Python consists of the `__iter__()` method, which returns the iterator object itself, and the `__next__()` method, which returns the next value in the iteration.
- Custom iterators can provide more memory-efficient alternatives to generating all values upfront, especially for large or infinite sequences.
- Consider implementing the `__len__()` method if the total number of items is known in advance.
- For reversible iterators, you can also implement the `__reversed__()` method.
- In Python 3, iterators are their own iterables (i.e., `__iter__()` can return `self`).
- Explore the `itertools` module for functions that work with iterators and can be combined with your custom iterators.