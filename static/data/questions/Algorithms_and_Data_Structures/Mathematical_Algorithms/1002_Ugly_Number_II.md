# Ugly Number II

## Metadata

- **ID**: 1012
- **Title**: Ugly Number II and Its Applications
- **Difficulty**: Medium
- **Category**: Mathematical Algorithms
- **Subcategory**: Number Theory
- **Similar Questions**:
  - LeetCode: 264. Ugly Number II
  - LeetCode: 313. Super Ugly Number
  - LeetCode: 1201. Ugly Number III
- **Real Life Domains**:
  - Software Versioning Systems
  - Financial Modeling (Compound Interest Calculations)
  - Chemistry (Molecular Structure Generation)
  - Music Theory (Harmonic Series Generation)
  - Computer Graphics (Fractal Generation)

## Problem Description

An ugly number is a positive integer whose prime factors are limited to a specific set of primes. In the classic problem, these are 2, 3, and 5. The task is to find the nth ugly number, given that 1 is considered the first ugly number.

## Versions

### Version 1: Classic Ugly Numbers

Implement an algorithm to find the nth ugly number, where an ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Example:

- Input: n = 10
- Output: 12
- Explanation: The first 10 ugly numbers are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12.

Constraints:

- 1 <= n <= 1690

Implementation Notes:

- Consider using dynamic programming to generate ugly numbers efficiently.
- Maintain three pointers to track multiples of 2, 3, and 5.

### Version 2: Super Ugly Numbers

Extend the algorithm to handle a custom set of prime factors. Given a set of k prime numbers, find the nth super ugly number.

Example:

- Input: n = 12, primes = [2, 7, 13, 19]
- Output: 32
- Explanation: [1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32] is the sequence of super ugly numbers.

Constraints:

- 1 <= n <= 10^6
- 1 <= primes.length <= 100
- 2 <= primes[i] <= 1000
- primes[i] is guaranteed to be a prime number.

Implementation Notes:

- Use a min-heap to efficiently select the next ugly number.
- Consider using a hash set to avoid duplicate calculations.

### Version 3: Ugly Number Queries

Develop a system to handle multiple queries for ugly numbers efficiently. Given a series of queries asking for the nth ugly number, optimize for fast response times.

Example:

- Input: queries = [1, 10, 100, 1000]
- Output: [1, 12, 1536, 51200000]

Constraints:

- 1 <= queries.length <= 10^5
- 1 <= queries[i] <= 10^9

Implementation Notes:

- Precompute ugly numbers up to a certain threshold.
- Implement binary search for efficient lookups.
- Consider using segmented generation for handling very large n.

### Version 4: Real-Life Applications

#### Scenario 1: Software Versioning System

Design a versioning system for software releases based on the concept of ugly numbers. Each version number is an "ugly number" composed of factors representing major, minor, and patch releases.

Input:

- Current version number
- Type of release (major, minor, or patch)

Output:

- Next version number

Implementation Notes:

- Adapt the ugly number generation to handle three "prime" factors representing major, minor, and patch versions.
- Implement rules for incrementing each factor based on the release type.

#### Scenario 2: Chemical Compound Generation

Create a system to generate possible molecular structures based on a set of basic building blocks. Use the concept of ugly numbers to represent different combinations of atoms or functional groups.

Input:

- Set of basic building blocks (analogous to prime factors)
- Desired molecular weight range

Output:

- List of possible molecular structures within the given weight range

Implementation Notes:

- Extend the ugly number concept to handle multiple "factors" representing different atoms or groups.
- Implement constraints to ensure chemical validity of the generated structures.

#### Scenario 3: Harmonic Series in Music Theory

Develop an algorithm to generate harmonic series in music theory. Use ugly numbers to represent the frequency ratios of harmonics, with prime factors corresponding to basic frequency multipliers.

Input:

- Base frequency
- Number of harmonics to generate
- Set of allowed frequency ratios (e.g., [2, 3, 5] for natural harmonics)

Output:

- List of frequencies in the harmonic series

Implementation Notes:

- Adapt the ugly number generation to produce floating-point results for frequencies.
- Implement a system to convert generated ratios to musical notation (e.g., cents or note names).

#### Scenario 4: Fractal Generation in Computer Graphics

Create a system for generating fractal patterns based on the concept of ugly numbers. Use the factors to determine branching or iteration rules in fractal generation.

Input:

- Set of "fractal primes" determining the basic shapes or transformations
- Number of iterations or complexity level

Output:

- Data structure representing the fractal pattern (e.g., a set of points or transformation matrices)

Implementation Notes:

- Extend the ugly number concept to generate sequences of transformations or shape parameters.
- Implement a rendering system to visualize the generated fractal patterns.

## Notes

- The Ugly Number problem is a classic example of how simple rules can generate complex and interesting sequences. It's an excellent illustration of dynamic programming and efficient sequence generation.
- When implementing ugly number algorithms, consider the trade-off between time and space complexity. Precomputation can significantly speed up queries but may require substantial memory.
- For very large n, consider using modular arithmetic to avoid integer overflow. This is particularly important in scenarios where you need to find the nth ugly number modulo some value.
- In real-world applications, the concept of "ugly numbers" can be generalized to any sequence generated by combining a set of basic factors or elements. This makes it applicable to a wide range of problems beyond simple number theory.
- When dealing with custom sets of primes or factors, be aware of potential overflow issues, especially if the factors can be large.
- For applications requiring real-time generation or queries of ugly numbers, consider implementing a caching mechanism or using approximation techniques for very large values of n.

Understanding and implementing efficient algorithms for generating ugly numbers and their variants provides insights into sequence generation, dynamic programming, and optimization techniques applicable to various domains in computer science and beyond.
