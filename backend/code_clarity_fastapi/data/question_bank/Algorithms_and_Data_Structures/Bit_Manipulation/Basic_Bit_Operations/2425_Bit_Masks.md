**Bit Masks: Efficient Set Representation and Manipulation**

# Metadata

- **ID**: 2425
- **Title**: Bit Masks: Efficient Set Representation and Manipulation
- **Difficulty**: Medium
- **Category**: Bit Manipulation
- **Subcategory**: Basic Bit Operations
- **Similar Questions**: LeetCode: 78. Subsets, 1125. Smallest Sufficient Team
- **Real Life Domains**: Cryptography, Network Protocols, Compiler Optimizations, Game Development

# Problem Description

Bit masks are a powerful technique for representing and manipulating sets of elements efficiently using bitwise operations. In this problem, you'll explore various applications and operations involving bit masks.

# Versions

## Version 1: Set Representation and Basic Operations

Given a universe of n elements (0 to n-1), implement the following operations using bit masks:

1. Add an element to the set
2. Remove an element from the set
3. Check if an element is in the set
4. Find the union of two sets
5. Find the intersection of two sets
6. Find the complement of a set

Example:

```
Input: n = 5
Operations:
1. Add 2 to set A
2. Add 4 to set A
3. Add 1 to set B
4. Add 3 to set B
5. Check if 2 is in set A
6. Find union of A and B
7. Find intersection of A and B

Output:
5. true
6. {1, 2, 3, 4}
7. {}
```

## Version 2: LeetCode 78 - Subsets

Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

Example:

```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

## Version 3: LeetCode 1125 - Smallest Sufficient Team

In a project, you have a list of required skills `req_skills`, and a list of people. The i-th person `people[i]` contains a list of skills that person has.

Consider a sufficient team: a set of people such that for every required skill in `req_skills`, there is at least one person in the team who has that skill. We can represent these teams by the index of each person.

Return any sufficient team of the smallest possible size, represented by the index of each person. You may return the answer in any order.

Example:

```
Input:
req_skills = ["java","nodejs","reactjs"]
people = [["java"],["nodejs"],["nodejs","reactjs"]]

Output: [0,2]
Explanation:
Person 0 has the "java" skill
Person 2 has the "nodejs" and "reactjs" skills
Together, they form the smallest sufficient team.
```

## Version 4: Network Packet Analysis

You're developing a network analysis tool. Each network packet has a set of flags represented by bits in a 32-bit integer. Implement functions to:

1. Set specific flags in a packet
2. Clear specific flags in a packet
3. Check if a packet has all flags from a given set
4. Find packets that match any flag from a given set
5. Implement a simple packet filter based on flag combinations

Example:

```
Flags:
0x01: SYN
0x02: ACK
0x04: FIN
0x08: RST

Input:
Packets: [0x03, 0x05, 0x0A, 0x0F]
Filter: SYN and (FIN or RST)

Output:
Matching packets: [0x05, 0x0F]
```

# Constraints

- For Version 1:
  - 1 <= n <= 32
- For Version 2:
  - 1 <= nums.length <= 10
  - -10 <= nums[i] <= 10
  - All the numbers of nums are unique.
- For Version 3:
  - 1 <= req_skills.length <= 16
  - 1 <= people.length <= 60
  - 1 <= people[i].length, req_skills[i].length, people[i][j].length <= 16
- For Version 4:
  - Assume 32-bit integers for flag representation

# Notes

- Bit masks are particularly efficient for small sets (typically up to 32 or 64 elements, depending on the integer size used).
- When working with bit masks, be cautious of integer overflow, especially when using shifts with signed integers.
- In real-world applications, consider the trade-off between the space efficiency of bit masks and the readability of the code.
- For larger sets, consider using more advanced data structures like Bloom filters or bitmap indexes.
- In cryptography and security applications, be aware that bit manipulation operations might be vulnerable to timing attacks if not implemented carefully.
