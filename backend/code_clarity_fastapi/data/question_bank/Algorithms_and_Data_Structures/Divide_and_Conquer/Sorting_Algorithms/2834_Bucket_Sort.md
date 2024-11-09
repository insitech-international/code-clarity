# Metadata

- **ID**: 2834
- **Title**: Bucket Sort: Efficient Sorting for Uniformly Distributed Data
- **Difficulty**: Medium
- **Category**: Sorting Algorithms
- **Subcategory**: Distribution Sorts
- **Similar Questions**: LeetCode: 164. Maximum Gap, 451. Sort Characters By Frequency
- **Real Life Domains**: Data Analytics, Image Processing, Numerical Simulations, Network Traffic Analysis

# Problem Description

Bucket Sort is a distribution sort algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.

# Versions

## Version 1: Basic Bucket Sort

Implement the basic Bucket Sort algorithm for sorting an array of floating-point numbers uniformly distributed over a range.

Example:
- Input: nums = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]
- Output: [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]

## Version 2: Bucket Sort for Integers

Adapt the Bucket Sort algorithm to efficiently sort integers over a given range.

## Version 3: Adaptive Bucket Sort

Develop an adaptive version of Bucket Sort that adjusts the number and size of buckets based on the input distribution.

## Version 4: Parallel Bucket Sort

Design a parallel version of Bucket Sort that can utilize multiple processors or cores.

## Version 5: External Bucket Sort

Implement an external sorting version of Bucket Sort for sorting large files that don't fit into memory.

# Real-Life Scenarios

## Scenario 1: Data Analytics - Customer Segmentation

A data analytics firm needs to segment customers based on various metrics. Design a Bucket Sort-based system that can:

a) Sort customers into predefined segments based on spending habits
b) Categorize customers by frequency of purchases
c) Group customers by lifetime value ranges
d) Adapt to changing distribution of customer metrics over time

The system should handle millions of customer records and provide quick insights for marketing strategies.

## Scenario 2: Image Processing - Color Quantization

An image processing application needs to perform color quantization. Create a Bucket Sort-based algorithm that can:

a) Sort pixels by color intensity for each channel (R, G, B)
b) Group similar colors into buckets for palette generation
c) Adapt to different color distributions in various types of images
d) Handle large, high-resolution images efficiently

The algorithm should process images in real-time for video applications and support various color spaces and bit depths.

## Scenario 3: Financial Data Analysis - Stock Price Movements

A financial analysis tool needs to analyze stock price movements. Develop a Bucket Sort-based system that can:

a) Sort stock price changes into predefined ranges (e.g., -5% to +5% in 0.5% increments)
b) Categorize stocks by trading volume into buckets
c) Group stocks by market capitalization ranges
d) Adapt to changing market volatility by adjusting bucket ranges dynamically

The system should handle real-time data for thousands of stocks and provide instant insights into market trends.

# Constraints

- 1 ≤ nums.length ≤ 5 * 10^4
- 0 ≤ nums[i] < 1

# Notes

- Bucket Sort has an average time complexity of O(n + k), where n is the number of elements and k is the number of buckets.
- It is very efficient for sorting data with uniform distribution.
- The choice of bucket size and number significantly affects the algorithm's performance.
- Bucket Sort can be unstable if the individual buckets are sorted using an unstable algorithm.
- Consider combining Bucket Sort with other algorithms for sorting individual buckets in hybrid approaches.