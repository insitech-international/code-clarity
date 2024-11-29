**Single Number: Efficient Element Identification using Bit Manipulation**

# Metadata

- **ID**: 2422
- **Title**: Single Number
- **Difficulty**: Medium
- **Category**: Bit Manipulation
- **Subcategory**: Basic Bit Operations
- **Similar Questions**: LeetCode: 136. Single Number, HackerRank: Lonely Integer, CodeChef: XORCIST
- **Real Life Domains**: Error Detection, Cryptography, Data Integrity, Signal Processing

# Problem Description

Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

# Versions

## Version 1: LeetCode 136 - Single Number

Implement a function that finds the element that appears only once in an array where every other element appears twice.

Example:

```
Input: nums = [4,1,2,1,2]
Output: 4
```

## Version 2: HackerRank - Lonely Integer

Given an array of integers, where all elements but one occur twice, find the unique element.

Example:

```
Input: a = [1,2,3,4,3,2,1]
Output: 4
```

## Version 3: CodeChef - XORCIST

Given an array A of N integers. All elements appear even number of times except one element which appears odd number of times. Find that element.

Example:

```
Input: N = 5, A = [1,2,3,2,1]
Output: 3
```

## Version 4: Codeforces - Single Number Triple

You are given an array of integers where every number appears three times, except for one number which appears only once. Find that single number.

Example:

```
Input: [5,3,4,3,5,5,3]
Output: 4
```

## Version 5: Real-Life Applications

### Scenario 1: Network Packet Integrity

You're designing a network protocol for ensuring packet integrity:
a) Implement a function to detect a corrupted packet in a stream where all packets are sent in duplicate except for the corrupted one.
b) Extend the algorithm to handle cases where packets are sent in triplicate for increased reliability.
c) Analyze the trade-off between redundancy and error detection capability.

### Scenario 2: Cryptographic Key Verification

You're working on a secure communication system:
a) Implement a function to verify the integrity of cryptographic keys where each valid key is represented twice in the key store.
b) Develop a method to identify potentially compromised keys that don't follow the duplication pattern.
c) Design a key rotation scheme that uses the single number property to detect and replace outdated keys.

### Scenario 3: Sensor Data Anomaly Detection

You're building an IoT system for environmental monitoring:
a) Implement an algorithm to detect faulty sensor readings in a system where each sensor reports twice for redundancy.
b) Extend the algorithm to handle cases where sensors report three times, with majority voting for increased accuracy.
c) Develop a method to identify sensors that are consistently producing anomalous readings.

### Scenario 4: DNA Sequence Analysis

You're working on a bioinformatics project:
a) Implement a function to find unique DNA sequences in a dataset where most sequences appear in pairs due to diploid organisms.
b) Extend the algorithm to handle polyploid organisms where sequences may appear more than twice.
c) Develop a method to identify potential mutations or sequencing errors based on the single number property.

# Constraints

- For Version 1 (LeetCode):

  - 1 <= nums.length <= 3 \* 10^4
  - -3 _ 10^4 <= nums[i] <= 3 _ 10^4
  - Each element in the array appears twice except for one element which appears only once.

- For Version 2 (HackerRank):

  - 1 <= n < 100
  - It is guaranteed that n is odd and that there is one unique element.
  - 0 <= a[i] <= 100, where 0 <= i < n

- For Version 3 (CodeChef):

  - 1 <= T <= 10
  - 1 <= N <= 10^5
  - 1 <= A[i] <= 10^9

- For Version 4 (Codeforces):

  - 1 <= n <= 10^5
  - 1 <= a[i] <= 10^9

- For Version 5 (Real-Life Scenarios):
  - Consider handling large datasets efficiently (millions of entries)
  - Optimize for both time and space complexity

# Notes

- The XOR operation is particularly useful for solving this problem efficiently.
- Consider the properties of XOR: a ^ a = 0 and a ^ 0 = a.
- For versions where elements appear more than twice, consider using a combination of bit manipulation techniques.
- In real-world applications, be aware of potential issues with floating-point representations when using XOR.
- For cryptographic applications, ensure that your implementation doesn't introduce vulnerabilities through side-channel attacks.
- In sensor data analysis, consider how to handle noise and small variations in readings that might affect the single number detection.
- For DNA sequence analysis, be mindful of the scale of data and optimize your algorithm accordingly.
- When implementing in hardware, XOR operations are often very efficient and can be parallelized for better performance.
