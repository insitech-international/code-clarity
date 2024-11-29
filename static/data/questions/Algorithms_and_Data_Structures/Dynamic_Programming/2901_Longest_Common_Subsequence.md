**Longest Common Subsequence: Finding Shared Patterns**

# Metadata

- **ID**: 2901
- **Title**: Longest Common Subsequence: Finding Shared Patterns
- **Difficulty**: Medium
- **Category**: Dynamic Programming
- **Subcategory**: String Algorithms
- **Similar Questions**: LeetCode: 1143. Longest Common Subsequence, 583. Delete Operation for Two Strings
- **Real Life Domains**: Bioinformatics, Text Comparison, Version Control Systems, Spell Checking

# Problem Description

The Longest Common Subsequence (LCS) problem involves finding the longest subsequence common to all sequences in a set of sequences. Unlike substrings, subsequences are not required to occupy consecutive positions within the original sequences.

# Versions

## Version 1: Basic LCS

Given two strings, find the length of their longest common subsequence.

Example:

- Input: text1 = "abcde", text2 = "ace"
- Output: 3
- Explanation: The longest common subsequence is "ace"

## Version 2: Printing the LCS

Given two strings, find and return one of the longest common subsequences.

Example:

- Input: text1 = "AGGTAB", text2 = "GXTXAYB"
- Output: "GTAB"

## Version 3: LCS of Multiple Sequences

Given k strings, find the length of the longest common subsequence present in all of them.

Example:

- Input: texts = ["AGGT", "AGXGTXAYB", "AGGTAB"]
- Output: 3
- Explanation: "AGT" is a longest common subsequence

## Version 4: Real-Life Scenarios

### Scenario 1: DNA Sequence Alignment

Biologists need to align DNA sequences to identify common genetic patterns.

Question: How would you implement an algorithm to find the longest common subsequence of multiple DNA sequences, allowing for gaps in the alignment?

### Scenario 2: Plagiarism Detection

A university wants to check student essays for potential plagiarism.

Question: How would you design a system that uses LCS to identify significant similar passages between a submitted essay and a database of existing documents?

### Scenario 3: Version Control Diff Tool

A version control system needs to show the differences between two versions of a file.

Question: How would you use LCS to create a diff tool that highlights the changes (additions, deletions, and modifications) between two versions of a text file?

# Constraints

- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters.

# Notes

- The LCS problem is a classic example of dynamic programming and has applications in various fields, particularly in bioinformatics and text processing.
- The time complexity of the basic LCS algorithm is O(mn) for two sequences of lengths m and n. For k sequences, the complexity grows exponentially with k.
- In practice, optimizations and heuristics are often used to handle longer sequences or multiple sequence alignments.
- The LCS problem is related to other string similarity measures, such as edit distance and longest common substring.
- Real-world applications often require considering additional factors, such as scoring matrices for DNA alignment or allowing for small mismatches in plagiarism detection.
