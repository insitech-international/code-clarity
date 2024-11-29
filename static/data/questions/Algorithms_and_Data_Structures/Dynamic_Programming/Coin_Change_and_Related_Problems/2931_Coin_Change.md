**Coin Change Problem: Optimal Coin Selection**

# Metadata

- **ID**: 2931
- **Title**: Coin Change Problem: Optimal Coin Selection
- **Difficulty**: Medium
- **Category**: Dynamic Programming
- **Subcategory**: Coin Change and Other Related Problems
- **Similar Questions**: LeetCode: 322. Coin Change, 518. Coin Change 2
- **Real Life Domains**: Finance, Vending Machines, Currency Exchange, Game Development

# Problem Description

The Coin Change Problem is a classic optimization problem in computer science and mathematics. Given a set of coin denominations and a target amount, the goal is to find the minimum number of coins needed to make up that amount, or determine if it's not possible.

# Versions

## Version 1: Minimum Number of Coins

Given an array of coin denominations and a target amount, find the minimum number of coins needed to make up that amount. If the amount cannot be made up by any combination of the coins, return -1.

Example:

- Input: coins = [1, 2, 5], amount = 11
- Output: 3
- Explanation: 11 = 5 + 5 + 1

## Version 2: Number of Ways to Make Change

Given an array of coin denominations and a target amount, find the number of different ways you can make up that amount using the given coins. You may assume you have an infinite number of each kind of coin.

Example:

- Input: coins = [1, 2, 5], amount = 5
- Output: 4
- Explanation: There are four ways to make up the amount:
  5 = 5
  5 = 2 + 2 + 1
  5 = 2 + 1 + 1 + 1
  5 = 1 + 1 + 1 + 1 + 1

## Version 3: Coin Change with Limited Supply

Given an array of coin denominations, their quantities, and a target amount, find the minimum number of coins needed to make up that amount. If the amount cannot be made up by the available coins, return -1.

Example:

- Input: coins = [1, 2, 5], quantities = [5, 3, 2], amount = 11
- Output: 4
- Explanation: 11 = 5 + 5 + 1

# Real-Life Scenarios

## Scenario 1: Automated Teller Machine (ATM) Cash Dispensing

An ATM needs to dispense cash with the minimum number of banknotes.

Question: How would you implement an algorithm that determines the optimal combination of available banknotes to dispense a requested amount, minimizing the total number of notes?

## Scenario 2: Vending Machine Change Return

A vending machine needs to return change using available coins.

Question: How would you design an algorithm that calculates the optimal combination of coins to return as change, considering the available coin denominations and their quantities in the machine?

## Scenario 3: Foreign Currency Exchange Optimization

A currency exchange service wants to optimize its operations.

Question: How would you develop an algorithm that determines the best combination of foreign currency notes and coins to provide a customer, given the exchange rate, available denominations, and the amount requested?

# Constraints

- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4

# Notes

- The Coin Change Problem is a classic example of a problem that can be solved efficiently using dynamic programming.
- The problem has variations that can affect the approach, such as whether coins can be used multiple times or if there are limits on coin quantities.
- In real-world applications, additional constraints like preferring certain denominations or handling multiple currencies simultaneously may need to be considered.
- The problem can be extended to other domains, such as minimizing the number of operations in certain algorithms or optimizing resource allocation in various scenarios.
