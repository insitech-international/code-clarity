**Remove K Digits for Inventory Management**

# Metadata

- **ID**: 21281
- **Title**: Remove K Digits for Inventory Management
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Greedy String Manipulation
- **Similar Questions**: LeetCode (402. Remove K Digits)
- **Real Life Domains**: Inventory Management, Data Compression, Resource Allocation, Financial Analysis

# Problem Description

Imagine you're managing a warehouse full of products, each identified by a long numerical code. Due to a system upgrade, you need to shorten these codes by removing some digits. The catch? You want to keep the resulting codes as small as possible while still being unique.

This problem is all about efficiently reducing numbers by selectively removing digits. It's like simplifying complex identifiers or compressing data while maintaining essential information. The goal is to find the smartest way to trim down these numbers, keeping them as low as possible after removing the required number of digits.

# Versions

## Version 1: LeetCode - Remove K Digits

Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.

Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.

## Version 2: Real Life Scenario Cases

### Scenario 1: Inventory Management

You are managing an inventory system where each item is represented by a unique identification number as a string of digits. Due to a recent inventory audit, you need to streamline these ID numbers by removing a specified number of digits. The goal is to ensure the smallest possible ID number remains after removing these digits while preserving the order of the remaining digits.

### Scenario 2: Financial Analysis

In a financial analysis tool, you're working with large numbers representing monetary values. To simplify reports, you need to reduce these numbers by removing a certain number of digits while keeping the value as small as possible. Develop an algorithm to achieve this digit removal optimization.

### Scenario 3: Data Compression

You're developing a lossy compression algorithm for numeric data. The algorithm needs to remove a specified number of digits from each number to reduce data size while minimizing the change in value. Create a function that removes K digits from a number to produce the smallest possible result.

For all scenarios, create an algorithm that removes K digits from the given string to produce the smallest possible number. If K is equal to or larger than the length of the string, return '0'.

Example 1:
Input: {"num": "1432219", "k": 3}
Output: "1219"
Explanation: Removing the digits '4', '3', and '2' results in the smallest number '1219'.

Example 2:
Input: {"num": "10200", "k": 1}
Output: "200"
Explanation: Removing the digit '1' gives '0200', but '200' is the smallest possible representation.

# Constraints

The input string will only contain digits (0-9).
K will be a non-negative integer less than or equal to the length of the string.

# Notes

This problem demonstrates the concept of greedy algorithms applied to string manipulation. The key challenge lies in determining which digits to remove to achieve the smallest possible number.

Key concepts involved:

Greedy decision-making
Stack-based solutions
String manipulation
Digit comparison
The optimal solution typically involves iterating through the number once, comparing adjacent digits and deciding whether to keep or remove them based on the remaining removals allowed. This approach ensures a time complexity of O(n), where n is the length of the input string.

Understanding this problem helps in developing efficient algorithms for data compression, inventory management systems, and financial analysis tools where simplifying numerical representations is crucial.
