# Metadata

- **ID**: 1744
- **Title**: Itertools Module: Product Function
- **Difficulty**: Medium
- **Category**: Standard Library
- **Subcategory**: Itertools Module
- **Similar Questions**: Combinations, Permutations
- **Real Life Domains**: Data Analysis, Combinatorics, Machine Learning, Game Development

# Problem Description

The `itertools.product()` function is used to generate the Cartesian product of input iterables. It's equivalent to nested for-loops, but more efficient and versatile. The goal is to understand and apply this function in various scenarios.

# Versions

## Version 1: Basic Cartesian Product

Given two or more lists, generate all possible combinations taking one element from each list.

Example:
- Input: [1, 2], ['A', 'B']
- Output: [(1, 'A'), (1, 'B'), (2, 'A'), (2, 'B')]

## Version 2: Product with Repeat

Generate the Cartesian product of a single iterable with itself, repeated a specified number of times.

Example:
- Input: [0, 1], repeat=3
- Output: [(0, 0, 0), (0, 0, 1), (0, 1, 0), (0, 1, 1), (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1)]

## Version 3: Custom Iterator

Implement a custom iterator that mimics the behavior of `itertools.product()` for educational purposes.

## Version 4: Real-Life Domain Cases

### Scenario 1: E-commerce Product Variations
An online store needs to generate all possible variations of a product based on its attributes (e.g., size, color, material).

### Scenario 2: Password Cracking
A security researcher is testing password strength by generating all possible combinations of characters up to a certain length.

### Scenario 3: Game State Generation
A game developer needs to generate all possible game states for a simple board game to analyze optimal strategies.

### Scenario 4: DNA Sequence Analysis
A bioinformatics researcher is generating all possible DNA sequences of a certain length for analysis.

### Scenario 5: Menu Combination
A restaurant is creating all possible meal combinations from appetizers, main courses, and desserts for a fixed-price menu.

# Constraints

- The number of input iterables can vary.
- Each input iterable can have a different length.
- Memory usage should be considered for large inputs.

# Notes

- The time complexity of `itertools.product()` is O(n^r), where n is the number of elements in each iterable and r is the number of iterables.
- For large inputs, consider using `itertools.product()` as an iterator to avoid storing all results in memory at once.
- The function can be combined with other itertools functions for more complex operations.