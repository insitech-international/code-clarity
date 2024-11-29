**Minimum Number of Deletions to Make a String Balanced**

# Metadata

- **ID**: 21283
- **Title**: Minimum Number of Deletions to Make a String Balanced
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Greedy String Manipulation
- **Similar Questions**: LeetCode (1201. Ugly Numbers III)
- **Real Life Domains**: Text Processing, Data Cleaning, Information Retrieval

# Problem Description

Given a string s, return the minimum number of deletions needed to make s balanced. A string is balanced if every character appears an equal number of times.

Examples:
Input: s = "aabaaab"
Output: 0
Explanation: The string is already balanced.

Input: s = "abbaba"
Output: 1
Explanation: We can delete one 'b' to get "aabbba".

Input: s = "abc"
Output: 2
Explanation: We can delete 'c' twice to get "aa".

# Versions

## Version 1: LeetCode - Ugly Numbers III

Given an integer n, return true if there exists a digit k such that when we take this digit k from n repeatedly, the resulting number is divisible by 3. Otherwise, return false.

Example 1:
Input: n = 10
Output: true
Explanation: When we repeatedly remove a digit 1 from 10, we get 11. The sum of the digits is 1 + 1 = 2. 2 is not divisible by 3. But we can also repeatedly remove a digit 0 from 10, and we get 1. The sum of the digits is 1. 1 is not divisible by 3. Therefore, we cannot make 10 divisible by 3 even if we can make 10 equal to the sum of its digits.

Example 2:
Input: n = 12
Output: true
Explanation: When we remove all the digits during the first two rounds, we get 1. Summing up the digits we removed in steps 1 and 2 gives 1 + 2 = 3. 3 is divisible by 3, so we can make n divisible by 3.

Example 3:
Input: n = 30
Output: false
Explanation: No matter what digits we remove, we will never get a number divisible by 3.

## Version 2: Text Processing Scenario

You're working on a text processing tool that needs to clean up a large corpus of historical documents. Each document is represented as a string of characters, and you want to balance the frequency of each character in the document. Write an algorithm that takes a string and returns the minimum number of characters that need to be deleted to make the character frequency equal.

Example:
Input: s = "aabaaab"
Output: 0
Explanation: The string is already balanced.

Input: s = "abbaba"
Output: 1
Explanation: Delete one 'b' to get "aabbba".

Input: s = "abc"
Output: 2
Explanation: Delete 'c' twice to get "aa".

## Version 3: Data Cleaning Scenario

A database administrator has noticed that some of the primary keys in the system are not properly formatted. The keys are stored as strings, and they should ideally have an equal number of occurrences for each character. However, due to human error or data entry issues, some keys may have imbalanced character distributions. Write a function that calculates the minimum number of characters that need to be deleted from each key to make it balanced.

Example:
Input: s = "aabaaab"
Output: 0
Explanation: The key is already balanced.

Input: s = "abbaba"
Output: 1
Explanation: Delete one 'b' to get "aabbba".

Input: s = "abc"
Output: 2
Explanation: Delete 'c' twice to get "aa".

## Version 4: Information Retrieval Scenario

In an information retrieval system, documents are often indexed using hash functions. One common hashing technique involves converting a string into a fixed-size hash by counting the frequency of each character modulo a prime number. However, sometimes the resulting hashes may not be evenly distributed. To address this issue, you need to develop an algorithm that minimizes the number of characters to delete from a string to make it evenly distributed among a set of buckets.

Example:
Input: s = "aabaaab"
Output: 0
Explanation: The string is already balanced.

Input: s = "abbaba"
Output: 1
Explanation: Delete one 'b' to get "aabbba".

Input: s = "abc"
Output: 2
Explanation: Delete 'c' twice to get "aa".

# Constraints

1 <= n <= 105
n does not contain any leading zeroes.

# Notes

This problem requires careful consideration of string manipulation and combinatorics. Key insights include:

1. The problem can be solved using dynamic programming or greedy algorithms.
2. The optimal solution involves finding the largest power of 2 that divides the count of each character.
3. The minimum number of deletions is equal to the sum of the differences between the count of each character and the largest power of 2 that divides it.
