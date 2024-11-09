# Investment Portfolio Optimization

# Metadata

- **ID**: 21221
- **Title**: Investment Portfolio Optimization
- **Difficulty**: Easy
- **Category**: Greedy Algorithms
- **Subcategory**: Fractional Knapsack
- **Similar Questions**: LeetCode (1710. maximum Units on a Truck), GeeksforGeeks (Fractional Knapsack Problem), HackerRank (Fractional Knapsack Problem)
- **Real Life Domains**: Financial Planning and Portfolio Management, Logistics and Supply Chain Management, Manufacturing and Production Planning

# Problem Description

The general task in fractional knapsack problems is to optimize resource allocation or item selection within a given constraint.

# Versions

## Version 1: LeetCode - Maximum Units on a Truck

Given n items where every item has a weight and a value, determine the items taking up exactly one truckload (of capacity w). The truck has unlimited space after the w capacity. What items should be picked?

## Version 2: GeeksforGeeks - Fractional Knapsack Problem

Given weights and profits of N items, in the form of {profit, weight}, put these items in a knapsack of capacity W to get the maximum total profit in the knapsack. In Fractional Knapsack, we can break items for maximizing the total value of the knapsack.

## Version 3: HackerRank - Fractional Knapsack Problem

Given n items, each with a weight wi and a value vi, determine the number of each item to include in a collection so that the total weight is less than or equal to W and the total value is as large as possible.

- Example:
  arr = [[60, 10], [100, 20], [120, 30]]
  W = 50

- Common Input:
  Array of items, each represented as {profit, weight} or [value, weight]
  Capacity/constraint value (W)

- Common Output:
  Total maximum profit/value achievable within the given capacity

While there are slight variations in how the problems are presented across platforms, these elements remain consistent across the examples provided. The core concept of maximizing value within a given capacity constraint is common to all these problems.

## Version 4: Real Life Scenario

**Scenario 1. Investment Portfolio Optimization**

Imagine you're a financial advisor tasked with creating an investment portfolio for a client with a budget of $100,000. You have several investment options available, each with its own potential return and risk level:

Stock A: Potential return 8%, Risk level 6/10
Bond B: Potential return 5%, Risk level 3/10
Real Estate Fund C: Potential return 9%, Risk level 8/10
Index Fund D: Potential return 7%, Risk level 5/10
Your goal is to maximize returns while staying within the budget constraint. This scenario represents a fractional knapsack problem where you can invest partial amounts in each option.

**Scenario 2. Resource Allocation in Manufacturing**

A manufacturing company produces three products: Widget X, Gadget Y, and Gizmo Z. Each product has different production costs and profit margins:

Widget X: Production cost $50/unit, Profit margin $30/unit
Gadget Y: Production cost $75/unit, Profit margin $45/unit
Gizmo Z: Production cost $40/unit, Profit margin $25/unit
The company has a daily production capacity of 500 units. How should they allocate their resources to maximize profits?

This scenario illustrates a fractional knapsack problem where the company can produce fractions of each product type.

**Scenario 3. Cargo Loading for Shipping**

A shipping company has a cargo ship with a maximum weight capacity of 20 tons. They receive orders for transporting different types of cargo:

Electronics: Weight 5 tons, Value $15,000
Machinery: Weight 8 tons, Value $24,000
Textiles: Weight 3 tons, Value $9,000
Furniture: Weight 4 tons, Value $12,000

The company wants to maximize the total value of cargo they transport within the weight limit. This scenario represents a fractional knapsack problem where partial loads of each cargo type can be accepted.

In all these scenarios, the fractional knapsack algorithm would help determine the optimal allocation of resources or selection of items to maximize the objective function (profit, returns, or cargo value) within the given constraints.

# Constraints

- Number of items (N) is typically in the range of 1 to 1000.
- Weights and profits/values are positive integers.
- Capacity W is usually in the range of 1 to 100,000.
- The algorithm must maximize the total value/profit within the given capacity constraint.

# Notes

Fractional selection: Unlike traditional 0/1 knapsack problems, fractional knapsack allows partial selections of items.
Greedy approach: These problems are typically solved using a greedy algorithm, sorting items based on their value-to-weight ratio and selecting them accordingly.
Infinite divisibility: Items can be broken or divided infinitely, allowing for precise optimization.
Real-world applications: These problems have practical uses in fields like finance, logistics, and manufacturing.
Optimization goal: The main objective is to maximize the total value or profit achieved within the given capacity constraint.
Efficiency: The greedy algorithm typically solves these problems in O(n log n) time complexity, where n is the number of items.
Proof of optimality: The correctness of the greedy algorithm can often be proven by contradiction, showing that the algorithm achieves the optimal solution.
Variations: While the classic formulation deals with maximizing profit, variations exist for other objectives, such as minimizing cost or maximizing efficiency.
These constraints and notes provide a comprehensive overview of the fractional knapsack problem, highlighting its unique features and practical applications across various domains.
