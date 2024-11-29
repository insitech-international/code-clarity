**Binary Search: Efficient Search in Sorted Arrays**

# Metadata

- **ID**: 2821
- **Title**: Binary Search: Efficient Search in Sorted Arrays
- **Difficulty**: Easy
- **Category**: Divide and Conquer
- **Subcategory**: Search Algorithms
- **Similar Questions**: LeetCode: 704. Binary Search, LeetCode: 35. Search Insert Position, 74. Search a 2D Matrix
- **Real Life Domains**: Database Indexing, Computer Science, Information Retrieval, Computational Biology

# Problem Description

Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half until the target value is found or it is clear that the value is not in the array.

# Versions

## Version 1: Classic Binary Search

Given a sorted array of integers `nums` and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1.

Example:

- Input: nums = [-1,0,3,5,9,12], target = 9
- Output: 4
- Explanation: 9 exists in nums and its index is 4

## Version 2: Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

Example:

- Input: nums = [1,3,5,6], target = 5
- Output: 2

# Version 3: Real-Life Scenarios

## Scenario 1: Library Catalog System

You're developing a digital catalog system for a large university library with millions of books.

**Case 1: Basic Book Search**
Implement a search function that allows users to find a book by its ISBN (International Standard Book Number). ISBNs are unique and stored in a sorted array.

Question: How would you use binary search to quickly locate a book given its ISBN?

**Case 2: Page Number Lookup**
The library has a special collection of very long books, each with thousands of pages. Users often need to know which book contains a specific page number.

Question: Given a sorted array of cumulative page counts for each book, how would you use binary search to determine which book contains a given page number?

**Case 3: Time-based Event Lookup**
The library maintains a chronological log of all check-out events. Each event has a timestamp and is stored in order.

Question: How would you implement a function that, given a specific timestamp, returns the most recent check-out event that occurred before or at that time?

## Scenario 2: E-commerce Product Catalog

You're working on an e-commerce platform with millions of products.

**Case 1: Price-based Product Search**
Users want to find products within a specific price range.

Question: Given a sorted array of product prices, how would you use binary search to efficiently find the index of the first product that falls within a user-specified price range?

**Case 2: Product Version History**
For each product, you maintain a sorted list of all its previous prices, along with the dates they were effective.

Question: How would you implement a function that, given a product ID and a past date, returns the price of the product on that specific date?

**Case 3: Inventory Restock Predictions**
The system predicts future inventory levels based on past sales data. Sales data is stored chronologically.

Question: Given a sorted array of cumulative sales data and a target sales quantity, how would you use binary search to predict the date when you'll need to restock?

## Scenario 3: Geolocation Services

You're developing a geolocation service for a mapping application.

**Case 1: Nearest Point of Interest**
Given a user's latitude, find the nearest point of interest from a sorted list of locations.

Question: How would you use binary search to efficiently find the closest point of interest based on latitude?

**Case 2: Time Zone Determination**
You have a sorted list of longitude boundaries for time zones.

Question: How would you implement a function that, given a specific longitude, determines which time zone it falls into?

**Case 3: Elevation Profile Analysis**
For a road trip planning feature, you need to analyze elevation changes. You have a sorted array of distance markers with their corresponding elevations.

Question: Given a specific distance along the route, how would you use binary search to find the two nearest elevation data points for interpolation?

# Constraints

- For Version 1:

  - 1 <= nums.length <= 10^4
  - -10^4 < nums[i], target < 10^4
  - All the integers in nums are unique.
  - nums is sorted in ascending order.

- For Version 2:

  - 1 <= nums.length <= 10^4
  - -10^4 <= nums[i] <= 10^4
  - nums contains distinct values sorted in ascending order.
  - -10^4 <= target <= 10^4

- For Version 3:
  - 1 <= index.length <= 10^6
  - Keys in the index are unique and sorted in ascending order.

# Notes

- The key to implementing binary search correctly is to carefully manage the search boundaries and the middle index calculation.
- Be cautious of integer overflow when calculating the middle index. Use `mid = left + (right - left) // 2` instead of `mid = (left + right) // 2`.
- Binary search can be implemented both iteratively and recursively. The iterative version is often preferred for better space complexity.
- In real-world applications, binary search is fundamental to many efficient data structures and algorithms, such as binary search trees and database indexing.
- For the database indexing scenario, consider how to handle cases where the search key is not found and how to determine the correct insertion point.
- Time complexity of binary search is O(log n), making it significantly faster than linear search for large datasets.
- When implementing binary search, always ensure that the input array is sorted. Applying binary search on an unsorted array will lead to incorrect results.
