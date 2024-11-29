# Fast Exponentiation

## Metadata
- **ID**: 8012
- **Title**: Fast Exponentiation (Modular Exponentiation)
- **Difficulty**: Medium
- **Category**: Mathematical Algorithms
- **Subcategory**: Number Theory, Divide and Conquer
- **Similar Questions**: 
  - LeetCode: 50. Pow(x, n)
  - LeetCode: 372. Super Pow
  - CodeForces: 630I - Parking Lot
- **Real Life Domains**: 
  - Cryptography (RSA algorithm)
  - Computer Graphics (Matrix transformations)
  - Financial Modeling (Compound interest calculations)
  - Physics Simulations (Particle systems)

## Problem Description

Fast Exponentiation, also known as Exponentiation by Squaring or Binary Exponentiation, is an efficient algorithm for calculating large powers of a number, especially when dealing with modular arithmetic. The goal is to compute a^b mod m, where a is the base, b is the exponent, and m is the modulus.

The naive approach of multiplying a by itself b times has a time complexity of O(b), which becomes impractical for large values of b. Fast Exponentiation reduces this to O(log b), making it possible to compute very large powers efficiently.

## Versions

### Version 1: Basic Fast Exponentiation

Implement the basic Fast Exponentiation algorithm to calculate a^b mod m.

Example:
- Input: a = 2, b = 10, m = 1000
- Output: 24
- Explanation: 2^10 = 1024, 1024 mod 1000 = 24

Constraints:
- 0 <= a < m
- 0 <= b <= 10^9
- 1 <= m <= 10^9

Implementation Notes:
- Use the binary representation of the exponent to decide when to multiply.
- Remember to apply the modulus at each step to prevent integer overflow.

### Version 2: Matrix Exponentiation

Extend the Fast Exponentiation concept to matrix multiplication. Given a square matrix A and an integer n, compute A^n mod m.

Example:
- Input: 
  A = [[1, 1], [1, 0]], n = 10, m = 1000
- Output: 
  [[55, 34], [34, 21]]
- Explanation: This is the 10th power of the Fibonacci matrix mod 1000.

Constraints:
- 1 <= matrix size <= 100
- 0 <= matrix elements < m
- 0 <= n <= 10^9
- 1 <= m <= 10^9

Implementation Notes:
- Implement matrix multiplication with modular arithmetic.
- Use the same principle as in Version 1, but with matrices instead of scalars.
- This technique is particularly useful for solving linear recurrence relations.

### Version 3: Fast Exponentiation with Updates

Implement a data structure that supports fast exponentiation queries and base updates efficiently.

Operations:
1. `update(new_base)`: Update the base to a new value.
2. `query(exponent)`: Compute base^exponent mod m for the current base.

Example:
- `update(2)`
- `query(10)` -> 24 (2^10 mod 1000)
- `update(3)`
- `query(5)` -> 243 (3^5 mod 1000)

Constraints:
- Number of operations <= 10^5
- 0 <= base, new_base < m
- 0 <= exponent <= 10^9
- 1 <= m <= 10^9

Implementation Notes:
- Consider using a segment tree or Fenwick tree for efficient updates.
- Precompute powers of the base to speed up queries.
- Balance between update time and query time based on the frequency of each operation.

### Version 4: Tetration (Hyperexponentiation)

Implement a function to compute tetration, which is iterated exponentiation. The tetration of a and b, denoted as ⁿa, is defined as:

ⁿa = a^(a^(a^(...))) (b times)

For example, ²4 = 4^4 = 256, and ³2 = 2^(2^2) = 2^4 = 16.

Example:
- Input: a = 2, b = 3, m = 1000
- Output: 16
- Explanation: ³2 mod 1000 = 16

Constraints:
- 1 <= a <= 10
- 1 <= b <= 5
- 1 <= m <= 10^9

Implementation Notes:
- Use Fast Exponentiation as a subroutine.
- Be aware that results can grow extremely large, even for small inputs.
- Consider using properties of modular arithmetic to handle overflow.

## Notes

- The Fast Exponentiation algorithm is a fundamental technique in computer science and mathematics, with applications ranging from cryptography to graphics rendering.
- When implementing these algorithms, always be mindful of potential integer overflow. Use appropriate data types (e.g., long long in C++) or implement your own big integer arithmetic if necessary.
- In cryptographic applications, it's crucial to implement these algorithms in a way that resists timing attacks. Consider using constant-time algorithms when security is a concern.
- For Version 2 (Matrix Exponentiation), this technique can be used to solve various problems involving linear recurrences, such as finding the nth Fibonacci number in O(log n) time.
- Version 3 (Fast Exponentiation with Updates) is particularly useful in competitive programming scenarios where you need to handle multiple queries efficiently.
- Version 4 (Tetration) introduces you to the concept of hyperoperations, which generalizes the operations of addition, multiplication, and exponentiation to higher levels of iteration.

Remember, mastering these algorithms and their variations will greatly enhance your problem-solving toolkit, especially for tasks involving large numbers and modular arithmetic.