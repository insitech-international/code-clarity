# Metadata

- **ID**: 2825
- **Title**: Jump Search: Block-Based Search Algorithm for Sorted Arrays
- **Difficulty**: Easy
- **Category**: Divide and Conquer
- **Subcategory**: Search Algorithms
- **Similar Questions**: LeetCode: 704. Binary Search, 35. Search Insert Position
- **Real Life Domains**: Database Systems, Information Retrieval, Sensor Networks, Cryptography

# Problem Description

Jump Search is a searching algorithm for sorted arrays. It works by skipping some elements to reduce the time complexity compared to linear search. The basic idea is to check fewer elements by jumping ahead by fixed steps or skips.

# Versions

## Version 1: Basic Jump Search

Implement the basic Jump Search algorithm for searching a key in a sorted array of integers.

Example:
- Input: nums = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377], target = 55
- Output: 10 (index of target)

## Version 2: Adaptive Jump Search

Implement an adaptive version of Jump Search that adjusts the jump step size based on the array length and distribution.

## Version 3: Jump Search with Binary Search

Combine Jump Search with Binary Search for the final step to potentially improve performance.

## Version 4: Reverse Jump Search

Modify the Jump Search algorithm to work efficiently on reverse-sorted arrays.

## Version 5: 2D Jump Search

Extend the Jump Search algorithm to work on a 2D sorted array.

# Real-Life Scenarios

## Scenario 1: Library Catalog System

A large library needs an efficient system for locating books. Design a Jump Search-based system that can:

a) Quickly find books by catalog number in sorted shelves
b) Adapt to different shelf sizes and book distributions
c) Handle multiple sorted criteria (e.g., author, title, publication date)
d) Support efficient updates when new books are added or removed

The system should work efficiently for libraries with millions of books across multiple locations.

## Scenario 2: Time-Series Sensor Data Analysis

An IoT system needs to analyze time-series data from multiple sensors. Create a Jump Search-based algorithm that can:

a) Quickly locate specific timestamps or value ranges in sorted sensor data
b) Handle data with varying time intervals between readings
c) Adapt to different data distributions from various types of sensors
d) Support searching across multiple related sensor datasets simultaneously

The algorithm should work with terabytes of historical sensor data and provide fast insights for real-time monitoring and anomaly detection.

## Scenario 3: Cryptographic Key Search

A cryptographic system needs to search through a large, sorted list of public keys. Develop a Jump Search-based system that can:

a) Efficiently find matching public keys for signature verification
b) Handle keys of different lengths and formats
c) Adapt to the distribution of keys in the key space
d) Support concurrent searches from multiple users

The system should perform millions of key lookups per second with minimal latency, ensuring fast cryptographic operations.

# Constraints

- 1 ≤ nums.length ≤ 10^6
- -10^9 ≤ nums[i] ≤ 10^9
- nums is sorted in ascending order

# Notes

- Jump Search has a time complexity of O(√n), where n is the number of elements in the array.
- It performs better than linear search and can be a good choice when binary search is expensive (e.g., for arrays stored on slower storage media).
- The optimal jump step is √n, where n is the length of the array.
- Jump Search can be particularly useful in systems where jumping back is costly.
- Consider combining Jump Search with other search algorithms for improved performance in specific scenarios.