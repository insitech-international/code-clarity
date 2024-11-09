**Strategy Design Pattern**

# Metadata

- **ID**: 912
- **Title**: Strategy Design Pattern
- **Difficulty**: Medium
- **Category**: Design Patterns
- **Subcategory**: Behavioral Patterns
- **Similar Questions**: LeetCode: 146. LRU Cache, HackerRank: Algorithms: Sorting, GeeksforGeeks: Strategy Pattern, CodeChef: LRUCACHE (LRU Cache Implementation)
- **Real Life Domains**: Game Development, Route Planning, Payment Processing, Compression Algorithms

# Problem Description

You are tasked with designing a system that needs to perform a specific operation, but the exact algorithm for this operation can vary and may need to be selected or switched at runtime. The challenge is to implement a flexible structure that allows different algorithms to be used interchangeably without affecting the client code that uses these algorithms.

# Versions

## Version 1: Basic Strategy Pattern

Implement a basic strategy pattern where different algorithms can be selected and used for a specific operation.

## Version 2: Strategy Pattern with Configuration

Extend the basic strategy pattern to allow for configuration of strategies, enabling more flexible algorithm selection.

## Version 3: Dynamic Strategy Selection

Implement a system where strategies are dynamically selected based on input or context.

## Version 4: Real life Scenarios

# Constraints

- The context should not be aware of the concrete strategy classes.
- Strategies should be interchangeable without affecting the context.
- Adding new strategies should not require modifying the context or existing strategy classes.
- The strategy interface should be generic enough to accommodate various algorithm implementations.
- Consider the performance implications of strategy switching, especially in performance-critical applications.

# Notes

- Use the Strategy pattern when you have multiple algorithms for a specific task and you want to switch between them dynamically.
- This pattern is particularly useful when you have a lot of similar classes that only differ in their behavior.
- Consider using a factory method or dependency injection to create and inject strategies into the context.
- Be cautious of overusing this pattern, as it can lead to an increased number of classes in your system.
- In some cases, lambda functions or function pointers can be used as lightweight strategies, especially for simple algorithms.
- When implementing in statically-typed languages, consider using generics to provide type-safety for different types of input data or results.
