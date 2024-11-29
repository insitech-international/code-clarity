# Metadata

- **ID**: 2833
- **Title**: Bubble Sort: Simple Comparison-Based Sorting
- **Difficulty**: Easy
- **Category**: Sorting Algorithms
- **Subcategory**: Comparison Sorts
- **Similar Questions**: LeetCode: 912. Sort an Array, 905. Sort Array By Parity
- **Real Life Domains**: Educational Purposes, Small Dataset Sorting, Introductory Programming

# Problem Description

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

# Versions

## Version 1: Classic Bubble Sort

Given an unsorted array of n elements, sort the array in ascending order using the Bubble Sort algorithm.

Example:
- Input: nums = [64, 34, 25, 12, 22, 11, 90]
- Output: [11, 12, 22, 25, 34, 64, 90]

## Version 2: Optimized Bubble Sort

Implement an optimized version of Bubble Sort that stops the algorithm if inner loop didn't cause any swap.

Example:
- Input: nums = [8, 5, 2, 9, 5, 6, 3]
- Output: [2, 3, 5, 5, 6, 8, 9]

## Version 3: Recursive Bubble Sort

Implement a recursive version of Bubble Sort.

Example:
- Input: nums = [64, 34, 25, 12, 22, 11, 90]
- Output: [11, 12, 22, 25, 34, 64, 90]

## Version 4: Cocktail Shaker Sort

Implement a variation of Bubble Sort called Cocktail Shaker Sort (also known as bidirectional bubble sort), which traverses the list in both directions alternately.

Example:
- Input: nums = [5, 1, 4, 2, 8, 0, 2]
- Output: [0, 1, 2, 2, 4, 5, 8]

## Version 5: Odd-Even Sort

Implement Odd-Even Sort, a variation of Bubble Sort where the sorting is divided into two phases: odd and even.

Example:
- Input: nums = [34, 2, 10, 6, 8, 1, 5]
- Output: [1, 2, 5, 6, 8, 10, 34]

# Constraints

- 1 ≤ nums.length ≤ 10^4
- -10^6 ≤ nums[i] ≤ 10^6

# Notes

- Bubble Sort has a worst-case and average time complexity of O(n^2), where n is the number of items being sorted.
- It is not suitable for large data sets as its average and worst-case time complexity is quite high.
- Bubble Sort is considered as one of the simplest sorting algorithms and often used to introduce the concept of sorting algorithms.
- In practice, more efficient algorithms like QuickSort, MergeSort, or HeapSort are preferred for larger datasets.
- Bubble Sort can be useful when the input is in mostly sorted order with only a few elements out of place.