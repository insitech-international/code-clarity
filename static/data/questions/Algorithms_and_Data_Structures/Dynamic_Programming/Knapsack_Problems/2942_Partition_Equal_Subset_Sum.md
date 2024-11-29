**Knapsack Problem: Optimal Item Selection**

# Metadata

- **ID**: 2942
- **Title**: Knapsack Problem: Optimal Item Selection
- **Difficulty**: Medium
- **Category**: Dynamic Programming
- **Subcategory**: Knapsack Problems
- **Similar Questions**: LeetCode: 416. Partition Equal Subset Sum, 474. Ones and Zeroes
- **Real Life Domains**: Resource Allocation, Cargo Loading, Investment Portfolio Optimization, Budget Planning

# Problem Description

The Knapsack Problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

# Versions

## Version 1: 0/1 Knapsack Problem

Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. You cannot break an item, either pick the complete item or don't pick it (0-1 property).

Example:

- Input: values = [60, 100, 120], weights = [10, 20, 30], W = 50
- Output: 220
- Explanation: We can take the second and third items to maximize value

## Version 2: Unbounded Knapsack Problem

Similar to the 0/1 knapsack, but here we can pick an item multiple times.

Example:

- Input: values = [10, 30, 20], weights = [5, 10, 15], W = 100
- Output: 300
- Explanation: We can take 10 instances of the second item

## Version 3: Fractional Knapsack Problem

In this version, we can take fractions of items to maximize the value.

Example:

- Input: values = [60, 100, 120], weights = [10, 20, 30], W = 50
- Output: 240
- Explanation: We take the full first two items and 2/3 of the third item

# Real-Life Scenarios

## Scenario 1: Cargo Loading Optimization

A logistics company needs to optimize the loading of a cargo plane.

Question: How would you implement an algorithm to determine the most valuable combination of cargo items to load onto a plane, given weight limits and the values of different cargo types?

## Scenario 2: Investment Portfolio Optimization

A financial advisor needs to create optimal investment portfolios for clients.

Question: How would you design a system that uses the knapsack algorithm to select the best combination of investments, considering expected returns (values) and risk levels (weights) within a client's risk tolerance (capacity)?

## Scenario 3: Project Selection under Budget Constraints

A company needs to select projects to undertake given limited resources.

Question: How would you develop an algorithm to choose the most beneficial set of projects to pursue, considering each project's potential value and resource requirements, while staying within the company's budget and resource constraints?

# Constraints

- 1 <= n <= 1000 (number of items)
- 1 <= W <= 10^5 (knapsack capacity)
- 1 <= weights[i], values[i] <= 10^5

# Notes

- The 0/1 Knapsack Problem is NP-hard, but it can be solved in pseudo-polynomial time using dynamic programming.
- The fractional knapsack problem can be solved efficiently using a greedy approach.
- In practice, heuristic approaches are often used for large instances of the problem.
- The knapsack problem has many variations and applications in resource allocation, scheduling, and optimization problems.
- Real-world applications often involve additional constraints or multiple dimensions (e.g., multiple resource types), which can increase the complexity of the problem.
