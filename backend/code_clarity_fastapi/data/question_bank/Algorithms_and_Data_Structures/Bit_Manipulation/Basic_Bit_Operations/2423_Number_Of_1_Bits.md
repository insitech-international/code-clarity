# Number of 1 Bits

## Metadata

- **ID**: 2423
- **Title**: Number of 1 Bits
- **Difficulty**: Easy
- **Category**: Bit Manipulation
- **Subcategory**: Counting Bits
- **Similar Questions**: LeetCode: 338. Counting Bits, 461. Hamming Distance
- **Real Life Domains**: Digital Circuit Design, Data Compression, Error Detection and Correction

## Problem Description

The "Number of 1 Bits" problem, also known as the Hamming Weight problem, asks you to count the number of '1' bits in a given integer's binary representation.

## Versions

### Version 1: Basic Bit Counting

Given an unsigned integer, count the number of '1' bits it has.

Example:
- Input: n = 00000000000000000000000000001011
- Output: 3
- Explanation: The input binary string has three '1' bits.

### Version 2: Signed Integer Bit Counting

Extend the problem to handle signed integers. Count the number of '1' bits in the two's complement representation of a given integer.

Example:
- Input: n = 11111111111111111111111111111101 (-3 in two's complement)
- Output: 31
- Explanation: The two's complement representation of -3 has thirty-one '1' bits.

### Version 3: Bit Counting in a Bit Stream

Given a stream of bits, implement a system that can efficiently count the number of '1' bits seen so far at any point in the stream.

Example:
- Input: Stream = 1011011101...
- Query 1: Count after 4 bits = 3
- Query 2: Count after 8 bits = 5

### Version 4: Sparse Bit Counting

Given a very large integer (up to 10^18) with relatively few '1' bits, implement an algorithm to count the '1' bits efficiently without iterating through all bits.

Example:
- Input: n = 1000000000000000000 (10^18)
- Output: 1
- Explanation: Only the 60th bit is set to '1'.

## Constraints

- For Version 1 and 2:
  - The input must be a 32-bit unsigned integer or a 32-bit signed integer, respectively.

- For Version 3:
  - The bit stream can be arbitrarily long.
  - Queries can come at any point during the stream processing.

- For Version 4:
  - 0 ≤ n ≤ 10^18

## Notes

- The basic approach involves iterating through each bit of the number, but more efficient solutions exist.
- For signed integers, be aware of how negative numbers are represented in two's complement.
- In the streaming version, consider how to update the count efficiently as new bits arrive.
- For very large sparse integers, think about ways to skip over large ranges of '0' bits quickly.
- This problem has applications in various areas of computer science and electrical engineering, including error detection and correction in data transmission.