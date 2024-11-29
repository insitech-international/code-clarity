# Metadata

- **ID**: 2831
- **Title**: Quick Sort: Efficient Divide and Conquer Sorting
- **Difficulty**: Medium
- **Category**: Sorting Algorithms
- **Subcategory**: Divide and Conquer, Comparison Sorts
- **Similar Questions**: LeetCode: 912. Sort an Array, 215. Kth Largest Element in an Array
- **Real Life Domains**: Database Systems, File Systems, Big Data Processing, Network Routing

# Problem Description

Quick Sort is an efficient, recursive divide-and-conquer approach to sorting an array. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.

# Versions

## Version 1: Classic Quick Sort

Implement the classic Quick Sort algorithm to sort an array of integers in ascending order.

Example:
- Input: nums = [64, 34, 25, 12, 22, 11, 90]
- Output: [11, 12, 22, 25, 34, 64, 90]

## Version 2: Quick Sort with Different Pivot Selections

Implement Quick Sort with three different pivot selection strategies:
a) First element as pivot
b) Last element as pivot
c) Median-of-three as pivot (first, middle, last elements)

Compare the performance of these strategies on different input arrays.

## Version 3: Three-Way Quick Sort (Dutch National Flag Partitioning)

Implement a version of Quick Sort that handles duplicate elements efficiently using three-way partitioning.

Example:
- Input: nums = [4, 2, 4, 1, 3, 4, 5, 2, 3, 1]
- Output: [1, 1, 2, 2, 3, 3, 4, 4, 4, 5]

## Version 4: External Quick Sort

Design an external sorting algorithm based on Quick Sort for sorting large files that don't fit into memory. Consider how to efficiently manage disk I/O operations.

## Version 5: Parallel Quick Sort

Develop a parallel version of Quick Sort that can utilize multiple processors or cores. Consider load balancing and synchronization issues.

# Real-Life Scenarios

## Scenario 1: E-commerce Product Sorting

You're developing an e-commerce platform that needs to sort products based on various criteria. Implement a Quick Sort-based algorithm that can efficiently sort products by:

a) Price (numeric sorting)
b) Name (string sorting)
c) Customer rating (float sorting)
d) Release date (date sorting)

The algorithm should be able to handle millions of products and allow for both ascending and descending order. Additionally, implement a feature that allows sorting by multiple criteria (e.g., first by category, then by price).

## Scenario 2: Financial Data Analysis

A financial analysis firm needs to process large datasets of stock market transactions. Design a Quick Sort-based system that can:

a) Sort transactions by timestamp to analyze market trends
b) Sort by transaction volume to identify major market movers
c) Sort by price to determine daily highs and lows
d) Implement a custom comparator that sorts based on a complex financial metric combining multiple factors

The system should be able to handle datasets with billions of entries and provide options for partial sorting (e.g., finding the top 1000 transactions by value).

## Scenario 3: Genomic Sequence Analysis

A bioinformatics research lab is working on analyzing large genomic sequences. Develop a Quick Sort-based algorithm that can:

a) Sort DNA sequences by length
b) Sort by GC content (percentage of G and C bases)
c) Sort by similarity to a reference sequence
d) Implement a hybrid approach that uses Quick Sort for large partitions and insertion sort for small partitions to optimize performance

The algorithm should be able to handle millions of sequences, each potentially thousands of base pairs long. Additionally, implement a feature to identify and group similar sequences during the sorting process.

## Scenario 4: Network Packet Routing

A network equipment manufacturer needs an efficient algorithm for routing packets in a large-scale network. Design a Quick Sort-based system that can:

a) Sort packets by priority for quality of service management
b) Sort by destination IP address for efficient routing table lookups
c) Sort by packet size for load balancing across multiple links
d) Implement a multi-dimensional sort that considers both priority and arrival time

The system should be able to handle millions of packets per second and adapt to changing network conditions. Consider how to handle out-of-order packets and maintain stability in the sorting process.

# Constraints

- 1 ≤ nums.length ≤ 5 * 10^4
- -5 * 10^4 ≤ nums[i] ≤ 5 * 10^4

# Notes

- Quick Sort has an average time complexity of O(n log n), making it efficient for large datasets.
- The choice of pivot can significantly affect performance, especially for nearly sorted or reverse sorted inputs.
- Quick Sort is not stable in its classic form, meaning the relative order of equal elements may change.
- In practice, many standard library sort functions use a hybrid of Quick Sort and other algorithms like Insertion Sort for small partitions.
- For external sorting scenarios, consider combining Quick Sort with a merge-based approach to efficiently handle data that doesn't fit in memory.