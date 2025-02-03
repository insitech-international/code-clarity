# Metadata

- **ID**: 2835
- **Title**: Counting Sort: Efficient Integer Sorting for Limited Ranges
- **Difficulty**: Easy
- **Category**: Sorting Algorithms
- **Subcategory**: Non-Comparative Sorts, Distribution Sorts
- **Similar Questions**: LeetCode: 912. Sort an Array, 1122. Relative Sort Array
- **Real Life Domains**: Data Deduplication, Histogram Creation, Ranking Systems, Frequency Analysis

# Problem Description

Counting Sort is an efficient, non-comparative sorting algorithm that sorts elements by counting the number of occurrences of each unique element in the array. It is particularly useful when the range of potential values is not significantly larger than the number of elements.

# Versions

## Version 1: Basic Counting Sort

Implement the basic Counting Sort algorithm to sort an array of non-negative integers.

Example:

- Input: nums = [4, 2, 2, 8, 3, 3, 1]
- Output: [1, 2, 2, 3, 3, 4, 8]

## Version 2: Counting Sort for Objects

Extend the Counting Sort algorithm to sort objects based on a specific integer attribute.

Example:

- Input: students = [{name: "Alice", age: 22}, {name: "Bob", age: 20}, {name: "Charlie", age: 22}]
- Output: Sorted by age

## Version 3: Stable Counting Sort

Implement a stable version of Counting Sort that preserves the relative order of elements with equal keys.

Example:

- Input: nums = [{value: 4, id: 1}, {value: 2, id: 2}, {value: 2, id: 3}, {value: 3, id: 4}]
- Output: Sorted by value, preserving order of equal elements

## Version 4: Parallel Counting Sort

Develop a parallel version of Counting Sort that can utilize multiple processors or cores.

## Version 5: External Counting Sort

Design an external sorting algorithm based on Counting Sort for sorting large files with a limited range of values.

# Real-Life Scenarios

## Scenario 1: Network Packet Analysis

A network monitoring system needs to analyze packet sizes for traffic optimization. Design a Counting Sort-based system that can:

a) Sort packets by size into predefined ranges (e.g., 0-64 bytes, 65-128 bytes, etc.)
b) Count and categorize packets based on protocol type
c) Identify the most common packet sizes for different applications
d) Generate real-time histograms of packet size distributions

The system should handle millions of packets per second and provide instant insights into network traffic patterns.

## Scenario 2: E-commerce Product Ranking

An e-commerce platform needs to rank products based on various integer metrics. Create a Counting Sort-based system that can:

a) Rank products by number of sales in different time periods (daily, weekly, monthly)
b) Sort products by customer ratings (1-5 stars)
c) Categorize products by price ranges
d) Generate top N lists for different product categories

The system should efficiently handle millions of products and provide real-time updates to rankings as new sales data comes in.

## Scenario 3: Genomic Sequence Analysis

A bioinformatics tool needs to analyze short DNA sequences (k-mers). Develop a Counting Sort-based algorithm that can:

a) Sort k-mers by their frequency in a genome
b) Identify overrepresented and underrepresented k-mers
c) Generate a frequency spectrum of k-mers
d) Compare k-mer distributions between different genomes

The algorithm should handle billions of k-mers efficiently, considering the limited alphabet size of DNA (A, C, G, T).

# Constraints

- 1 ≤ nums.length ≤ 5 \* 10^4
- 0 ≤ nums[i] ≤ 10^4

# Notes

- Counting Sort has a time complexity of O(n + k), where n is the number of elements and k is the range of input.
- It is very efficient for sorting integers or objects with integer keys when the range is not significantly larger than the number of elements.
- Counting Sort is not an in-place sorting algorithm and requires extra space proportional to the range of input.
- For large ranges, consider using a modified version or combining with other algorithms to reduce space complexity.
