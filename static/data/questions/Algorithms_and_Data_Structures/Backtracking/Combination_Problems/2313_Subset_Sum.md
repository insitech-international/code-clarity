**Subset Sum Problem**

# Metadata

- **ID**: 2313
- **Title**: Subset Sum Problem
- **Difficulty**: Medium
- **Category**: Backtracking
- **Subcategory**: Combinatorial Optimization
- **Similar Questions**:
  - LeetCode: 416. Partition Equal Subset Sum
  - HackerRank: Subset Sum
  - CodeForces: Subset Sums
- **Real Life Domains**: Financial Planning, Resource Allocation, Cryptography

# Problem Description

Given a set of non-negative integers and a value sum, determine if there is a subset of the given set with sum equal to given sum.

# Versions

## Version 1: Existence Check

Given an array of integers and a target sum, determine if there exists a subset of the array that adds up to the target sum.

Example:

Input: arr = [3, 34, 4, 12, 5, 2], sum = 9
Output: True (subset [4, 5] sums to 9)

## Version 2: Find All Subsets

Given an array of integers and a target sum, find all subsets of the array that add up to the target sum.

Example:

Input: arr = [3, 34, 4, 12, 5, 2], sum = 9
Output: [[4, 5], [3, 4, 2]]

## Version 3: Minimize Subset Size

Given an array of integers and a target sum, find the smallest subset that adds up to at least the target sum.

Example:

Input: arr = [3, 34, 4, 12, 5, 2], sum = 13
Output: [12, 3] (sum is 15, which is the smallest sum ≥ 13)

## Version 4: Real-Life Scenarios

### Scenario 1: Investment Portfolio Balancing

You're developing a financial planning tool:

a) Create an algorithm to determine if a given return can be achieved with a subset of available investments.
b) Extend the algorithm to find all possible investment combinations that meet a target return.
c) Develop a feature that suggests the smallest number of investments to reach a minimum target return while considering risk factors.

### Scenario 2: Cargo Loading Optimization

You're optimizing a logistics system for a shipping company:

a) Design an algorithm to check if a specific cargo weight can be achieved using available packages.
b) Modify the algorithm to list all possible combinations of packages that exactly fill a container's weight capacity.
c) Implement a solution that minimizes the number of packages used to meet a minimum weight requirement, considering package dimensions and fragility.

### Scenario 3: Power Grid Load Balancing

You're working on a smart grid management system:

a) Develop an algorithm to determine if a specific power demand can be met by activating a subset of available power sources.
b) Extend the solution to find all combinations of power sources that can meet the current demand.
c) Create a feature that suggests the most efficient combination of power sources to meet demand, considering factors like startup time and operational costs.

# Constraints

- 1 ≤ arr.length ≤ 20
- 1 ≤ arr[i] ≤ 1000
- 1 ≤ sum ≤ 10000
- Time limit: 5 seconds

# Notes

- The Subset Sum problem is NP-complete, but can be solved efficiently for small to medium-sized inputs using dynamic programming or backtracking.
- For larger inputs, consider using approximation algorithms or heuristics.
- In real-world applications, consider additional constraints such as dependencies between items, or maximum subset size.
- The problem has variations like the Knapsack problem, where items have both weight and value.
