**Combination Sum**

# Metadata

- **ID**: 2311
- **Title**: Combination Sum
- **Difficulty**: Medium
- **Category**: Backtracking
- **Subcategory**: Combination Problems
- **Similar Questions**:
  - LeetCode: 39. Combination Sum
  - HackerRank: Recursive Digit Sum
  - CodeForces: Sum of Digits
- **Real Life Domains**: Financial Planning, Resource Allocation, Game Development

# Problem Description

Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

# Versions

## Version 1: Classic Combination Sum

Find all unique combinations in candidates where the candidate numbers sum to target.

Example:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]

## Version 2: Combination Sum with Limited Use

Each number in candidates may only be used once in the combination.

Example:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

## Version 3: Combination Sum with Negative Numbers

Candidates can include negative numbers, and the combination can include both positive and negative numbers.

Example:

Input: candidates = [1,-1,2,-2,3,-3], target = 3
Output: [[1,1,1],[1,2],[3]]

## Version 4: Real-Life Scenarios

### Scenario 1: Investment Portfolio Optimization

You're developing a financial planning tool:

a) Create an algorithm to find all combinations of investments that reach a target return, allowing multiple investments in the same asset.
b) Modify the algorithm to limit the number of times each investment can be chosen, based on available funds.
c) Extend the solution to handle both long (positive return) and short (negative return) positions, aiming for a specific net return.

### Scenario 2: Recipe Generation

You're building a smart kitchen application:

a) Develop an algorithm to find all combinations of ingredients that add up to a target nutritional value (e.g., protein content), allowing repeated use of ingredients.
b) Adapt the algorithm to respect serving size limitations for each ingredient.
c) Extend the solution to balance positive and negative health effects of ingredients, aiming for a net positive health score.

### Scenario 3: Team Formation in a Strategy Game

You're designing an AI for a strategy game:

a) Create an algorithm to form teams of units that add up to a specific power level, allowing multiple copies of the same unit.
b) Modify the algorithm to respect unit availability limits in the player's army.
c) Extend the solution to balance teams considering both offensive (positive) and defensive (negative) unit stats, aiming for a target overall effectiveness score.

# Constraints

- 1 ≤ candidates.length ≤ 30
- 1 ≤ candidates[i] ≤ 200
- All elements of candidates are distinct
- 1 ≤ target ≤ 500
- Time limit: 5 seconds

# Notes

- This problem is typically solved using backtracking or dynamic programming approaches.
- Consider sorting the candidates array to optimize the backtracking process.
- In real-world applications, additional constraints such as budget limits, risk factors, or dependencies between items may need to be considered.
- The problem can be extended to multi-objective optimization scenarios where multiple targets need to be satisfied simultaneously.
