# Title

Group Anagrams for Inventory Management

# Difficulty

Medium

# Category

String Algorithms

# Subcategory

String Manipulation

# Similar Questions

{"LeetCode": "49", "PlatformB": 1}

# Real Life Domains

E-commerce, Inventory Management

# Version 1

LeetCode Version
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

# Version 2

E-commerce Product Grouping
In an e-commerce platform, you have a feature that allows users to search for products using tags. However, many products have similar names that can be rearranged. For example, "bat" can be confused with "tab." To enhance user experience, the platform wants to group products based on their anagrams so that when a user searches for a product, they also see similar products that may not have the exact same name but are rearrangements of each other.

Given an array of product names, write a function that groups the product names that are anagrams of each other. You can return the grouped names in any order.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

# Constraints

1 <= strs.length <= 10^4
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
