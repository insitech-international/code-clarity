# Investment Portfolio Optimization

# Metadata

- **ID**: 21221
- **Title**: Investment Portfolio Optimization
- **Difficulty**: Easy
- **Category**: Greedy Algorithms
- **Subcategory**: Fractional Knapsack
- **Similar Questions**: LeetCode (1710. maximum Units on a Truck), GeeksforGeeks (Fractional Knapsack Problem), HackerRank (Fractional Knapsack Problem)
- **Real Life Domains**: Financial Planning and Portfolio Management, Logistics and Supply Chain Management, Manufacturing and Production Planning

# Introduction

Imagine you have a big toy box, and you want to fill it up with toys. But the box isn't big enough for all the toys you have. So, you have to choose some toys to put in the box. But here's the cool part: you can cut some toys in half! Like, if you have a toy car that's too big, you can cut it in half and put both halves in the box.

The goal is to pick just the right toys so that you fill up the box completely, but also so that you have the most fun toys inside. It's like solving a puzzle to make sure you have the best mix of toys in your box!

This explanation captures the essence of fractional knapsack problems by introducing the concept of filling a container with items, the limitation of space, and the possibility of partial selections (cutting toys in half)

## How to Solve it:

Each of these implementations follows the standard approach for fractional knapsack problems:

1. Sort the items based on their value-to-weight ratio in descending order.
2. Iterate through the sorted items.
3. For each item, check if it can fit entirely in the remaining capacity.
4. If it can fit entirely, add it completely.
5. If it can't fit entirely, calculate the fraction needed and add that fraction of the item.
6. Keep track of the total value added.

The main differences lie in the input formats and the exact constraints, but the core logic remains the same across all versions.

# Classification Rationale

This problem fits into the fractional knapsack subcategory of Greedy Algorithms because:

1. Resource Constraint: There's always a limited capacity (e.g., weight limit of a knapsack, truck capacity, budget).
2. Multiple Items: Various items or options are available, each with its own characteristics (weight, profit, size, etc.).
3. Optimization: The aim is to find the optimal combination of items that maximizes the total value or profit.
4. Fractional Selection: Unlike traditional 0/1 knapsack problems, fractional knapsack allows partial selections of items.
5. Greedy Approach: These problems are typically solved using a greedy algorithm, sorting items based on their value-to-weight ratio and selecting them accordingly.
6. Maximization: The ultimate goal is to maximize the total value or profit within the given constraints.

In essence, whether it's investing money, loading cargo, or producing goods, the fundamental task is to make the most efficient use of limited resources to achieve the highest possible outcome.

# Pythonic Implementation

Here are the Python implementations for each version:

```python
"Version 1: LeetCode (1710. Maximum Units on a Truck)"

class Solution:
    def maximumUnits(self, boxTypes: List[List[int]], truckSize: int) -> int:
        boxTypes.sort(key=lambda x: x[1], reverse=True)

        units = 0
        for weight, units_per_box in boxTypes:
            if truckSize > 0:
                units += min(units_per_box, truckSize) * units_per_box
                truckSize -= min(weight, truckSize)
            else:
                break

        return units

"Version 2: GeeksforGeeks (Fractional Knapsack Problem)"
class Item:
    def __init__(self, profit, weight):
        self.profit = profit
        self.weight = weight

def fractionalKnapsack(W, arr):
    arr.sort(key=lambda x: x.profit/x.weight, reverse=True)

    final_value = 0.0
    for item in arr:
        if item.weight <= W:
            W -= item.weight
            final_value += item.profit
        else:
            fraction = W / item.weight
            final_value += item.profit * fraction
            break

    return final_value

"Version 3: HackerRank (Fractional Knapsack Problem)"
def maxProfit(prices):
    n = len(prices)
    if n == 0:
        return 0

    dp = [[0 for _ in range(n)] for _ in range(n)]

    for gap in range(1, n):
        for s in range(gap):
            for l in range(s, gap):
                if prices[s] < prices[l]:
                    dp[gap][l] = max(dp[gap][l], dp[s][l-1] + prices[l])

    return dp[n-1][n-1]

def fractionalKnapsack(W, values, weights):
    n = len(values)
    ratio = [v/w for v,w in zip(values, weights)]
    sorted_items = sorted(zip(ratio, values, weights), reverse=True)

    totalValue = 0.0
    for r,v,w in sorted_items:
        if w <= W:
            totalValue += v
            W -= w
        else:
            fraction = W/w
            totalValue += v * fraction
            break

    return totalValue

"Version 4: Real Life Scenario"
"Scenario 1: Investment Portfolio Optimization"
def investment_portfolio_optimization(budget, options):
    options.sort(key=lambda x: x['return'] / x['risk'], reverse=True)

    total_return = 0
    remaining_budget = budget

    for option in options:
        if remaining_budget >= option['cost']:
            fraction = min(option['cost'] / option['cost'], remaining_budget / option['cost'])
            total_return += option['return'] * fraction
            remaining_budget -= option['cost'] * fraction
        else:
            fraction = remaining_budget / option['cost']
            total_return += option['return'] * fraction
            break

    return total_return

# Example usage
budget = 100000
options = [
    {'name': 'Stock A', 'return': 0.08, 'risk': 6, 'cost': 80000},
    {'name': 'Bond B', 'return': 0.05, 'risk': 3, 'cost': 10000},
    {'name': 'Index Fund D', 'return': 0.07, 'risk': 5, 'cost': 10000}
]

result = investment_portfolio_optimization(budget, options)
print(f"Total expected return: {result:.2%}")

"Scenario 2: Resource Allocation in Manufacturing"
def manufacturing_resource_allocation(daily_capacity, products):
    products.sort(key=lambda x: x['profit'] / x['cost'], reverse=True)

    total_profit = 0
    remaining_capacity = daily_capacity

    for product in products:
        if remaining_capacity >= product['cost']:
            quantity = min(product['cost'] // product['cost'], remaining_capacity // product['cost'])
            total_profit += product['profit'] * quantity
            remaining_capacity -= product['cost'] * quantity
        else:
            fraction = remaining_capacity / product['cost']
            total_profit += product['profit'] * fraction
            break

    return total_profit

# Example usage
daily_capacity = 500
products = [
    {'name': 'Widget X', 'profit': 30, 'cost': 50},
    {'name': 'Gadget Y', 'profit': 45, 'cost': 75},
    {'name': 'Gizmo Z', 'profit': 25, 'cost': 40}
]

result = manufacturing_resource_allocation(daily_capacity, products)
print(f"Daily profit: ${result:.2f}")

"Scenario 3: Cargo Loading for Shipping"
def cargo_loading(capacity, items):
    items.sort(key=lambda x: x['value'] / x['weight'], reverse=True)

    total_value = 0
    remaining_capacity = capacity

    for item in items:
        if remaining_capacity >= item['weight']:
            value_added = item['value']
            remaining_capacity -= item['weight']
        else:
            fraction = remaining_capacity / item['weight']
            value_added = item['value'] * fraction
            break

    return value_added

# Example usage
capacity = 20
items = [
    {'name': 'Electronics', 'weight': 5, 'value': 15000},
    {'name': 'Machinery', 'weight': 8, 'value': 24000},
    {'name': 'Textiles', 'weight': 3, 'value': 9000},
    {'name': 'Furniture', 'weight': 4, 'value': 12000}
]

result = cargo_loading(capacity, items)
print(f"Maximum value of cargo: ${result:.2f}")
```

# Mathematical Abstraction

Let's denote:

W: The capacity of the knapsack
N: The number of items
P_i: The profit of the i-th item
W_i: The weight of the i-th item
V: The total value in the knapsack
Mathematical formulation:

Maximize V subject to:

Σ P*i * x*i = V
Σ W_i * x_i ≤ W
0 ≤ x_i ≤ 1 for all i
Where x_i represents the fraction of the i-th item to be included.

Solution steps:

Sort the items based on their profit-to-weight ratio (P*i / W_i) in descending order.
Initialize variables:
V = 0
Remaining capacity = W
Iterate through the sorted items:
For each item i: a. If the entire item fits in the remaining capacity:
Add the entire item: V += P_i, Remaining capacity -= W_i b. Otherwise:
Calculate the fraction of the item to include: f = min(Remaining capacity / W_i, 1)
Add the fraction of the item: V += P_i * f, Remaining capacity -= W*i * f
Return the total value V.
Mathematical representation:

Let S be the set of selected items. Then:

V(S) = Σ P*i * x*i where x_i = 1 if item i is fully included, otherwise x_i = (W_i * x_i) / W

The optimal solution is achieved by iteratively applying this formula, starting with an empty set and adding items one by one until the knapsack is full or all items are considered.

This solution ensures that we always choose the item with the highest profit-to-weight ratio first, which guarantees the optimal solution for the fractional knapsack problem.

# Real World Analogies

Nomadic Traveler's Packing Problem: Imagine you're a traveler packing for a trip with a strict weight limit (e.g., 10 kg for carry-on luggage). You need to select items from your belongings, considering their utility and weight. This analogy captures the essence of the knapsack problem, where you want to maximize the value of items you can carry while adhering to a weight constraint.
To solve this problem:

Sort your belongings based on their value-to-weight ratio in descending order.
Start with the item having the highest value-to-weight ratio.
If it fits entirely in your luggage, pack it completely.
If it doesn't fit entirely, calculate the fraction needed and pack that fraction of the item.
Repeat steps 2-4 until your luggage is full or you run out of items.
Keep track of the total value of items packed.
Factory Production Planning: Consider a factory that produces paints in various colors. The factory has a limited production capacity (e.g., 1000 liters per day) and different colors have different production costs and selling prices. The goal is to determine the mix of production that maximizes profit within the given capacity.
To solve this problem:

Sort the paint colors based on their profit-to-cost ratio in descending order.
Start with the color having the highest profit-to-cost ratio.
If it can be produced entirely within the capacity, produce it completely.
If it can't be produced entirely, calculate the fraction needed and produce that fraction of the color.
Repeat steps 2-4 until the capacity is reached or you run out of colors.
Calculate the total profit from the produced colors.
Supermarket Shopping: Think of yourself as a shopper trying to buy as much valuable food as possible within a budget constraint. Different items have different prices and quantities, and you can't exceed your budget or the weight limit of your shopping bags.
To solve this problem:

Sort the grocery items based on their value-to-price ratio in descending order.
Start with the item having the highest value-to-price ratio.
If it fits entirely within your budget and bag limits, buy it completely.
If it doesn't fit entirely, calculate the fraction needed and buy that fraction of the item.
Repeat steps 2-4 until your budget is spent or your bags are full.
Calculate the total value of groceries bought.
Advertising Campaign Optimization: Picture a media planner allocating advertising slots to different products. Each product has a different price and duration for the advertisement. The goal is to maximize the total revenue from ads within a fixed time slot.
To solve this problem:

Sort the advertising campaigns based on their revenue-to-time ratio in descending order.
Start with the campaign having the highest revenue-to-time ratio.
If it can be aired entirely within the time slot, air it completely.
If it can't be aired entirely, calculate the fraction needed and air that fraction of the campaign.
Repeat steps 2-4 until the time slot is filled or you run out of campaigns.
Calculate the total revenue from aired campaigns.
Network Bandwidth Allocation: Consider a network administrator who needs to allocate fixed bandwidth among different users or services. Each user/service has a different demand and value, and the total allocated bandwidth cannot exceed the network's capacity.
To solve this problem:

Sort the users/services based on their value-to-demand ratio in descending order.
Start with the user/service having the highest value-to-demand ratio.
If it can be allocated entirely within the capacity, allocate it completely.
If it can't be allocated entirely, calculate the fraction needed and allocate that fraction of the user/service.
Repeat steps 2-4 until the capacity is reached or you run out of users/services.
Calculate the total value from allocated bandwidth.
Investment Portfolio Construction: Imagine a financial advisor building an investment portfolio for a client with a limited budget. Different investments offer varying returns and risks, and the goal is to maximize returns while managing risk within the budget constraint.
To solve this problem:

Sort the investment options based on their return-to-risk ratio in descending order.
Start with the investment having the highest return-to-risk ratio.
If it can be invested in entirely within the budget, invest in it completely.
If it can't be invested in entirely, calculate the fraction needed and invest that fraction of the investment.
Repeat steps 2-4 until the budget is exhausted or you run out of investment options.
Calculate the total return and risk of the constructed portfolio.
Cargo Shipping: Picture a shipping company that needs to load cargo onto a vessel with a weight limit. Different types of cargo have different weights and values, and the goal is to maximize the total value of cargo loaded within the weight limit.
To solve this problem:

Sort the cargo types based on their value-to-weight ratio in descending order.
Start with the cargo type having the highest value-to-weight ratio.
If it can be loaded entirely within the weight limit, load it completely.
If it can't be loaded entirely, calculate the fraction needed and load that fraction of the cargo type.
Repeat steps 2-4 until the weight limit is reached or you run out of cargo types.
Calculate the total value of cargo loaded.
These analogies demonstrate how the fractional knapsack problem-solving strategy can be applied to various real-world scenarios involving constrained optimization and resource allocation. They highlight the challenge of making the most efficient use of limited resources to achieve the highest possible outcome.

# Storytelling Approach

A storytelling approach to explain the solution to the fractional knapsack problem:

Once upon a time, in a magical kingdom, there was a clever merchant named Max. Max had stumbled upon a mysterious golden knapsack with a secret power – it could hold an infinite number of items, but only up to a certain weight limit. The catch was that Max couldn't simply choose or reject items whole; he could only take fractions of them.

One day, a mischievous fairy appeared to Max and said, "Ah ha! I shall test your wisdom. Gather all the treasures of our kingdom, but remember, you can only bring what fits in this enchanted knapsack." With a wave of her wand, she vanished, leaving behind a list of all the treasures along with their values and weights.

Max looked at the list and realized that some treasures were incredibly valuable compared to their weight, while others were less so. He knew he had to be strategic about which treasures to bring.

First, Max decided to create a special treasure map. On this map, he listed all the treasures along with their value-to-weight ratios. He sorted this map from highest to lowest ratio – the treasures with the highest value per unit of weight were at the top.

Next, Max imagined himself standing in front of his magical knapsack. He thought, "Ah, my golden friend, you can hold W units of weight." With a twinkle in his eye, he began to fill you up.

Max started at the top of his treasure map. The first treasure he picked was the one with the highest value-to-weight ratio. He asked himself, "Can I fit this entire treasure in my knapsack?" If yes, he took it whole. But if no, he calculated how much of it he could fit and took only that fraction.

As he moved down the list, Max repeated this process for each treasure. He always chose the next treasure on the list until either his knapsack was full or he had considered all treasures.

Finally, Max counted up all the fractions of treasures he had collected. This sum represented the maximum total value he could bring back to the kingdom.

And so, with his clever strategy, Max filled his magical knapsack with the most valuable treasures possible, proving once again that sometimes, taking a little bit of everything can lead to great rewards!

This storytelling approach captures the essence of the fractional knapsack problem-solving strategy:

Sort items based on their value-to-weight ratio.
Start with the item having the highest value-to-weight ratio.
Determine if the entire item fits in the remaining capacity.
If it fits entirely, add it completely.
If it doesn't fit entirely, calculate the fraction needed and add that fraction of the item.
Repeat steps 2-5 until the knapsack is full or all items are considered.
Calculate the total value of the selected items.
This approach ensures that Max (and you) make the most efficient use of limited resources to achieve the highest possible outcome.

# Visual Representation

```
              +------------------+
              |    Start         |
              +------------------+
                        |
                        |
                        v
             +-------------+-------------+
             |             |             |
             |  Yes        |  No          |
             +-------------+-------------+
                |               |
                |               |
                v               v
   +------------------+   +------------------+
   |                   |   |                   |
   |  Sort items by   |   |  Return 0         |
   |  P/W ratio        |   |                   |
   +------------------+   +------------------+
                |               |
                |               |
                v               v
  +------------------+   +------------------+
  |                   |   |                   |
  |  Initialize:      |   |  Return 0         |
  |    Value = 0      |   |                   |
  |    Remaining cap =|   |                   |
  |                   |   +------------------+
  |                   |
  |                   |
  v                   v
+-------+---------+   +------------------+
|       |         |   |                   |
|  Yes  |  No     |   |  Return 0         |
|       |         |   |                   |
+-------+---------+   +------------------+
                       |
                       |
                       v
                   +------------------+
                   |                   |
                   |  Return total value|
                   |                   |
                   +------------------+

```

This decision tree-like representation illustrates the key steps of the fractional knapsack algorithm:

Start with the initial state.
Sort items by P/W ratio.
For each item: a. Check if it fits entirely in the remaining capacity:
If yes, add it completely.
If no, calculate the fraction needed and add that fraction.
After processing all items, return the total value.
Key points:

The tree branches represent the decision-making process at each step.
The "Yes" and "No" branches represent the outcome of each decision.
The final branch leads to returning the total value.
This representation shows how the algorithm iteratively processes items until the knapsack is full or all items are considered.
This visual approach helps to understand the flow of the algorithm and how decisions are made at each step, making it easier to implement and analyze the fractional knapsack problem solution.
