**Reorganize String**

# Metadata

- **ID**: 21284
- **Title**: Reorganize String
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Greedy String Manipulation
- **Similar Questions**: LeetCode (767. Reorganize String)
- **Real Life Domains**: Text Processing, Data Compression, Caching Systems

# Problem Description

Given a string s and an integer k, reorganize the string s such that the character at each position is at least k positions away from the next character in the string. Return the reorganized string.

If it's impossible to reorganize the string according to the rule (i.e., this is possible only if and only if s is a palindrome), return an empty string "".

Examples:
Input: s = "aabbc", k = 2
Output: "abc"

Input: s = "aaabc", k = 3
Output: ""

# Versions

## Version 1: LeetCode - Reorganize String

Given a string s and an integer k, reorganize the string s such that the character at each position is at least k positions away from the next character in the string. Return the reorganized string.

If it's impossible to reorganize the string according to the rule (i.e., this is possible only if and only if s is a palindrome), return an empty string "".

Example 1:
Input: s = "aabbc", k = 2
Output: "abc"

Example 2:
Input: s = "aaabc", k = 3
Output: ""

## Version 2: Text Processing Scenario

You're developing a text editor that allows users to rearrange words in a document while maintaining a specific pattern. The pattern specifies that each word should be at least k positions away from the next word in the sequence. Implement an algorithm that takes a string of words and an integer k as input, and returns the rearranged string following the given pattern.

Example:
Input: s = ["word1", "word2", "word3"], k = 2
Output: ["word1", "word3", "word2"]

## Version 3: Data Compression Scenario

In a data compression system, you need to reorder a series of symbols to minimize the likelihood of adjacent symbols appearing together frequently. This helps in creating more efficient compression algorithms. Given a string of symbols and a parameter k, reorganize the string such that no symbol appears within k positions of another instance of the same symbol.

Example:
Input: s = "aabbc", k = 2
Output: "abc"

Input: s = "aaabc", k = 3
Output: ""

## Version 4: Caching System Scenario

In a high-performance caching system, you need to optimize cache eviction policies to maintain a balance between different types of data. The system categorizes data into different levels based on their importance and frequency of access. Given a string of data categories and an integer k, reorganize the categories such that no category appears within k positions of another instance of the same category.

Example:
Input: s = ["cat", "dog", "bird"], k = 2
Output: ["cat", "bird", "dog"]

## Version 5: Genetic Sequence Alignment

In bioinformatics, researchers often need to align genetic sequences to identify similarities and differences. Given a DNA sequence and an integer k, reorganize the nucleotides such that no nucleotide appears within k positions of another instance of the same nucleotide.

Example:
Input: s = "ATCG", k = 2
Output: "ACGT"

# Constraints

1 <= s.length <= 5000
s contains only lowercase English letters.
1 <= k <= s.length
At most s.length / 4 characters will be moved.

# Notes

This problem requires careful consideration of string manipulation and graph theory. Key insights include:

1. The problem can be modeled as a graph where nodes represent characters and edges represent distances between characters.
2. The goal is to find a Hamiltonian path in this graph, which represents the reorganized string.
3. If no such path exists, the string is impossible to reorganize according to the given rules.

Approaches to solve this problem include:

1. Graph-based approach: Construct the graph and find a Hamiltonian path.
2. Priority queue-based approach: Use a priority queue to manage character frequencies and build the string incrementally.
3. Two-pointer technique: Maintain two pointers to track the current position and the next valid position for characters.

Understanding this problem helps in developing efficient algorithms for text processing, data compression, caching systems, and bioinformatics applications where maintaining distance between elements is crucial.
