# Metadata

- **ID**: 28310
- **Title**: Radix Sort: Non-Comparative Integer Sorting Algorithm
- **Difficulty**: Medium
- **Category**: Sorting Algorithms
- **Subcategory**: Non-Comparative Sorts, Distribution Sorts
- **Similar Questions**: LeetCode: 164. Maximum Gap, 561. Array Partition I
- **Real Life Domains**: Numeric Data Processing, String Sorting, Image Processing, Network Routing

# Problem Description

Radix Sort is a non-comparative sorting algorithm that sorts integers by processing each digit position. It can be implemented to work from the least significant digit (LSD) to the most significant digit (MSD), or vice versa.

# Versions

## Version 1: LSD Radix Sort for Integers

Implement the Least Significant Digit (LSD) Radix Sort algorithm to sort an array of non-negative integers.

Example:
- Input: nums = [170, 45, 75, 90, 802, 24, 2, 66]
- Output: [2, 24, 45, 66, 75, 90, 170, 802]

## Version 2: MSD Radix Sort for Strings

Implement the Most Significant Digit (MSD) Radix Sort algorithm to sort an array of strings lexicographically.

Example:
- Input: words = ["apple", "banana", "cherry", "date", "elderberry"]
- Output: ["apple", "banana", "cherry", "date", "elderberry"]

## Version 3: Radix Sort for Floating-Point Numbers

Extend the Radix Sort algorithm to handle floating-point numbers, considering both the integer and fractional parts.

Example:
- Input: nums = [170.45, 45.75, 75.90, 90.802, 24.2, 2.66]
- Output: [2.66, 24.2, 45.75, 75.90, 90.802, 170.45]

## Version 4: Parallel Radix Sort

Develop a parallel version of Radix Sort that can utilize multiple processors or cores. Consider how to parallelize the counting and distribution steps efficiently.

## Version 5: External Radix Sort

Design an external sorting algorithm based on Radix Sort for sorting large files that don't fit into memory. Consider how to efficiently manage disk I/O operations and minimize the number of passes over the data.

# Real-Life Scenarios

## Scenario 1: Large-Scale Log Analysis in Cybersecurity

A cybersecurity firm needs to analyze massive log files from various network devices to detect potential security threats. Design a Radix Sort-based system that can:

a) Sort log entries by timestamp with millisecond precision
b) Sort IP addresses for network traffic analysis
c) Sort and categorize event types and severity levels
d) Implement a multi-level sort that considers both timestamp and event type

The system should be able to handle petabytes of log data from millions of devices. Consider how to perform the sort in a distributed manner and how to handle real-time log ingestion and analysis.

## Scenario 2: Genomic Sequence Assembly

A bioinformatics research lab is working on assembling large genomic sequences from short DNA reads. Develop a Radix Sort-based algorithm that can:

a) Sort DNA sequences by their prefix or suffix for efficient overlap detection
b) Handle variable-length sequences and ambiguous bases
c) Implement a parallel sorting approach for processing massive datasets
d) Integrate with other sequence assembly algorithms for improved performance

The algorithm should be able to handle billions of short reads, each typically 100-300 base pairs long. Consider how to optimize for the specific characteristics of DNA sequences (4-letter alphabet) and how to handle error correction during the assembly process.

## Scenario 3: High-Performance Database Indexing

A database management system needs to build and maintain indexes for fast query processing. Create a Radix Sort-based system that can:

a) Sort database keys of various types (integers, strings, composite keys)
b) Handle incremental updates to the index as data is inserted or deleted
c) Implement a concurrent sorting mechanism for multi-user environments
d) Optimize for cache efficiency and minimize memory allocations

The system should be able to handle databases with billions of records and support high-throughput transactional workloads. Consider how to balance index update costs with query performance and how to handle variable-length keys efficiently.

## Scenario 4: Computer Vision - Image Pixel Sorting

A computer vision application needs to efficiently process and analyze large sets of images. Design a Radix Sort-based algorithm that can:

a) Sort pixels by color intensity for image segmentation
b) Implement a multi-channel sort for RGB or RGBA images
c) Handle high bit-depth images (e.g., 16-bit per channel)
d) Optimize for parallel processing on GPUs

The algorithm should be able to process high-resolution images (e.g., 4K or 8K) in real-time for video applications. Consider how to handle different color spaces and how to integrate the sorting process with other image processing operations for improved efficiency.

# Constraints

- 1 ≤ nums.length ≤ 5 * 10^4
- 0 ≤ nums[i] < 2^31

# Notes

- Radix Sort has a time complexity of O(d * (n + k)), where d is the number of digits, n is the number of elements, and k is the range of each digit.
- It is efficient for sorting integers or strings with fixed-length keys.
- Radix Sort is stable, preserving the relative order of elements with equal keys.
- The algorithm can be more efficient than comparison-based sorts for certain types of data, especially when the range of possible key values is limited.
- Consider the trade-off between the number of passes and the size of the count array when choosing the radix (base) for the sort.