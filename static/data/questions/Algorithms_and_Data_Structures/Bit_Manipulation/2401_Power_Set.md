**Power Set: Generating All Subsets**

# Metadata

- **ID**: 2401
- **Title**: Power Set: Generating All Subsets
- **Difficulty**: Hard
- **Category**: Bit Manipulation
- **Subcategory**: Set Theory
- **Similar Questions**: LeetCode: 78. Subsets, HackerRank: The Power Sum, CodeChef: STRPOW
- **Real Life Domains**: Combinatorial Optimization, Data Analysis, Machine Learning Feature Selection, Cryptography

# Problem Description

The power set of a set S is the set of all subsets of S, including the empty set and S itself. Given a set of n elements, generate its power set efficiently.

# Versions

## Version 1: LeetCode 78 - Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

Example:

```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

## Version 2: HackerRank - The Power Sum

Find the number of ways that a given integer, X, can be expressed as the sum of the Nth powers of unique, natural numbers. For example, if X=13 and N=2, we have to find all combinations of unique squares adding up to 13. The only solution is 2^2 + 3^2.

Example:

```
Input: X = 10, N = 2
Output: 1
Explanation: 1^2 + 3^2 = 10
```

## Version 3: CodeChef - STRPOW (String Power Set)

Given a string S consisting of lowercase English letters, find the lexicographically smallest string in its power set (excluding the empty string).

Example:

```
Input: S = "abc"
Output: "a"
Explanation: The power set is {"a", "b", "c", "ab", "ac", "bc", "abc"}, and "a" is the lexicographically smallest.
```

## Version 4: Codeforces - Subset XOR

You are given a set of n non-negative integers. Your task is to find a subset with the maximum possible XOR sum. The XOR sum of a set is the XOR of all its elements.

Example:

```
Input: [1, 2, 3, 4]
Output: 7
Explanation: The subset {3, 4} gives the maximum XOR sum of 7.
```

## Version 5: Real-Life Applications

### Scenario 1: Feature Selection in Machine Learning

You're developing a machine learning model for predicting house prices. You have 20 potential features (e.g., size, location, age, number of rooms). Your task is to:
a) Generate all possible feature combinations.
b) Train models on each combination and evaluate their performance.
c) Find the optimal subset of features that gives the best prediction accuracy while minimizing overfitting.

### Scenario 2: Network Security Policy Configuration

You're a network administrator configuring firewall rules. You have 10 different security policies (e.g., block specific ports, allow certain IP ranges). Your tasks are:
a) Generate all possible combinations of these policies.
b) Evaluate each combination for its security strength and performance impact.
c) Implement a system that can quickly switch between different policy sets based on the current threat level.

### Scenario 3: Menu Planning for a Restaurant

You're a chef planning a new menu. You have 15 dishes, and you want to create various set menu options. Your tasks are:
a) Generate all possible combinations of dishes for 3-course, 4-course, and 5-course meals.
b) Evaluate each combination for nutritional balance, cost, and flavor pairings.
c) Develop a system that can suggest menu combinations based on available ingredients and customer preferences.

### Scenario 4: Investment Portfolio Optimization

You're a financial advisor with 25 different investment options (stocks, bonds, ETFs, etc.). Your tasks are:
a) Generate all possible portfolio combinations.
b) Evaluate each combination for risk, return, and diversification.
c) Develop a system that can recommend personalized portfolio allocations based on a client's risk tolerance and investment goals.

# Constraints

- For Version 1 (LeetCode):

  - 1 <= nums.length <= 10
  - -10 <= nums[i] <= 10
  - All the numbers of nums are unique.

- For Version 2 (HackerRank):

  - 1 <= X <= 1000
  - 2 <= N <= 10

- For Version 3 (CodeChef):

  - 1 <= |S| <= 10
  - S consists of lowercase English letters

- For Version 4 (Codeforces):

  - 1 <= n <= 20
  - 0 <= a[i] <= 10^6

- For Version 5 (Real-Life Scenarios):
  - The number of elements can be much larger (e.g., 20-100 elements)
  - Consider time and space complexity for large inputs

# Notes

- The power set of a set with n elements has 2^n subsets. This grows exponentially, so be cautious with large inputs.
- Bit manipulation techniques can be very efficient for generating power sets, especially for smaller sets.
- For larger sets, consider using iterative or lazy evaluation approaches to generate subsets on-demand.
- In real-world applications, full enumeration of the power set may be impractical. Consider using heuristics, sampling, or incremental generation techniques.
- When dealing with strings or arrays, be mindful of the ordering of elements in the subsets, especially if lexicographic order is important.
- In optimization problems (like feature selection or portfolio optimization), you may need to use advanced algorithms like genetic algorithms or simulated annealing to explore the power set efficiently.
