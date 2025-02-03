**Word Search**

# Metadata

- **ID**: 2333
- **Title**: Word Search
- **Difficulty**: Medium
- **Category**: Backtracking
- **Subcategory**: Grid Backtracking
- **Similar Questions**:
  - LeetCode: 79. Word Search
  - HackerRank: Grid Search
  - CodeForces: Good Sequences
- **Real Life Domains**: Text Processing, Game Development, Image Analysis

# Problem Description

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

In this problem, you are given a 2D grid of characters and a target word. Your task is to determine if the word can be formed by traversing the grid, moving only horizontally or vertically (not diagonally) between adjacent cells. Each cell in the grid can only be used once in forming the word.

The search process typically involves:

1. Finding a starting point (a cell that matches the first letter of the word).
2. Exploring the neighboring cells recursively to match subsequent letters.
3. Backtracking when a path doesn't lead to a solution.
4. Marking visited cells to avoid using them more than once.

# Versions

## Version 1: Classic Word Search

Find if a given word exists in the grid.

Example:

Input:
board = [
['A','B','C','E'],
['S','F','C','S'],
['A','D','E','E']
]
word = "ABCCED"

Output: true

## Version 2: Multiple Word Search

Find all words from a given dictionary that exist in the grid.

Example:

Input:
board = [
['o','a','a','n'],
['e','t','a','e'],
['i','h','k','r'],
['i','f','l','v']
]
words = ["oath","pea","eat","rain"]

Output: ["eat","oath"]

## Version 3: Longest Word Search

Find the longest word from a given dictionary that exists in the grid.

Example:

Input:
board = [
['a','b','c','d'],
['e','f','g','h'],
['i','j','k','l'],
['m','n','o','p']
]
dictionary = ["abef", "abcdefgh", "aceg", "acegikos"]

Output: "abcdefgh"

## Version 4: Real-Life Scenarios

### Scenario 1: DNA Sequence Analysis

You're developing a bioinformatics tool for analyzing DNA sequences:

a) Implement an algorithm to find specific gene sequences (represented as strings of A, C, G, T) within a larger DNA strand (2D grid of nucleotides).
b) Extend the algorithm to identify all known gene markers from a database within a given DNA sample.
c) Develop a feature to find the longest potential gene sequence that matches patterns from a gene database.

Implementation considerations:

- Optimize for very large DNA strands (grids with millions of cells).
- Handle circular DNA structures where the search can wrap around edges.
- Incorporate wildcards or fuzzy matching to account for genetic mutations.

### Scenario 2: Satellite Image Analysis

You're building an image processing system for satellite imagery:

a) Create an algorithm to detect specific terrain patterns (represented as character sequences) in satellite image data (2D grid of terrain classifications).
b) Modify the algorithm to identify all known geographic features from a database in a given satellite image.
c) Implement a feature to find the largest contiguous geographic feature that matches known patterns.

Implementation considerations:

- Handle very large images (grids with billions of pixels).
- Implement multi-scale search to detect patterns at different zoom levels.
- Incorporate noise tolerance to handle imperfect or partially obscured features.

### Scenario 3: Augmented Reality Game Development

You're designing a word-finding game for an augmented reality platform:

a) Develop an algorithm to check if player-submitted words exist in the AR-generated letter grid overlaid on the real world.
b) Extend the system to automatically find all valid words in the AR grid based on a game dictionary.
c) Create a feature to generate AR grids guaranteed to contain words of a certain length or complexity.

Implementation considerations:

- Optimize for real-time performance on mobile devices.
- Handle dynamically changing grids as the player moves through the AR environment.
- Implement difficulty scaling by controlling the complexity of generated grids.

# Constraints

- m == board.length
- n = board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15
- board and word consists of only lowercase and uppercase English letters
- Time limit: 2 seconds

# Notes

- The classic approach to solving this problem is using depth-first search (DFS) with backtracking.
- For efficiency, consider the following optimizations:
  1. Early termination: Stop the search if the remaining letters can't be found.
  2. Trie data structure: For multiple word search, use a trie to efficiently store and search the dictionary.
  3. Bit manipulation: Use bit masks to mark visited cells, which can be faster than modifying the grid.
- In real-world applications, consider memory constraints when dealing with large grids or dictionaries.
- For 3D or higher-dimensional data (like voxel representations in medical imaging), the algorithm can be extended to search in additional directions.
- In some applications, allowing diagonal movements or even knight's moves (as in chess) might be relevant.
- For fuzzy matching scenarios, consider using algorithms like Levenshtein distance in combination with the grid search.

**Pseudo-code for Basic DFS Approach**

```
function exist(board, word):
    for i in range(board.rows):
        for j in range(board.cols):
            if dfs(board, i, j, word, 0):
                return true
    return false

function dfs(board, i, j, word, k):
    if k == word.length:
        return true

    if i < 0 or i >= board.rows or j < 0 or j >= board.cols or board[i][j] != word[k]:
        return false

    temp = board[i][j]
    board[i][j] = '#'  // mark as visited

    result = dfs(board, i+1, j, word, k+1) or
             dfs(board, i-1, j, word, k+1) or
             dfs(board, i, j+1, word, k+1) or
             dfs(board, i, j-1, word, k+1)

    board[i][j] = temp  // restore the cell

    return result
```

This pseudo-code demonstrates the basic DFS approach with backtracking. It can be optimized and adapted for the various versions and real-life scenarios described above.
