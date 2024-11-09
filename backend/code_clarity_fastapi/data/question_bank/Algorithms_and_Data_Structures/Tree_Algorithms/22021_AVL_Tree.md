# AVL Tree

# Metadata

- **ID**: 22021
- **Title**: AVL Tree: Self-Balancing Binary Search Tree
- **Difficulty**: Medium
- **Category**: Tree Algorithms
- **Subcategory**: Self-Balancing Trees
- **Similar Questions**: Red-Black Tree, 2-3 Tree, B-Tree
- **Real Life Domains**: Database Indexing, File Systems, In-Memory Caches

# Problem Description

An AVL tree is a self-balancing binary search tree where the height of the left and right subtrees of any node differs by at most one. The goal is to maintain this balance property to ensure O(log n) time complexity for insertion, deletion, and search operations.

# Versions

## Version 1: Basic AVL Tree Operations

Implement an AVL tree with the following operations:
1. Insertion
2. Deletion
3. Search
4. In-order traversal

Ensure that the tree remains balanced after each insertion and deletion operation.

Example:

- Input: Insert 10, 20, 30, 40, 50
- Output: Balanced AVL tree with root 30
- Explanation: After inserting these values, the tree will automatically balance itself.

## Version 2: AVL Tree with Range Queries

Extend the basic AVL tree to support range queries:
1. findInRange(low, high): Find all elements in the tree between low and high (inclusive).
2. countInRange(low, high): Count the number of elements in the tree between low and high (inclusive).

Example:

- Input: Tree with elements 10, 20, 30, 40, 50; findInRange(15, 35)
- Output: [20, 30]
- Explanation: The values 20 and 30 are within the given range.

## Version 3: Real-Life Scenarios

**Scenario 1: Database Indexing**:
You're designing a database index structure using AVL trees.
a) Implement efficient range queries for database records.
b) Handle concurrent insertions and deletions while maintaining tree balance.
c) Optimize memory usage for large-scale indexes.

**Scenario 2: File System Directory Structure**:
Implement a file system directory structure using AVL trees.
a) Efficiently handle file and directory insertions and deletions.
b) Implement a fast search mechanism for files and directories.
c) Support moving entire subtrees (e.g., moving a directory with all its contents).

**Scenario 3: In-Memory Cache**:
Design an in-memory cache using AVL trees for fast access and efficient memory utilization.
a) Implement a Least Recently Used (LRU) eviction policy using AVL tree properties.
b) Support efficient range-based cache invalidation.
c) Implement a mechanism to limit the maximum memory usage of the cache.

For all scenarios, develop algorithms that efficiently handle the challenges while maintaining the AVL tree properties and optimizing for the specific use case.

Example (for Database Indexing):

```python
class AVLTreeIndex:
    def __init__(self):
        self.root = None

    def insert(self, key, value):
        ### Implementation details...

    def delete(self, key):
        ### Implementation details...

    def search(self, key):
        ### Implementation details...

    def range_query(self, low, high):
        ### Implementation details...

 **Usage**
index = AVLTreeIndex()
index.insert(1001, "Record 1")
index.insert(1002, "Record 2")
index.insert(1003, "Record 3")

result = index.range_query(1001, 1002)
print(result)  # Output: ["Record 1", "Record 2"]
```

# Constraints

- For Version 1:
  - 1 <= number of nodes <= 10^6
  - -10^9 <= node values <= 10^9

- For Version 2:
  - Same as Version 1
  - 1 <= number of range queries <= 10^5

- For Version 3:
  - Constraints may vary based on the specific scenario (e.g., available memory, concurrent operations)

# Notes

- The core principle of AVL trees is to maintain balance through rotations after insertions and deletions.
- For database indexing, consider using a B-tree or B+ tree for better performance with on-disk storage.
- In file system implementations, consider the trade-offs between AVL trees and other data structures like B-trees or hash tables.
- For in-memory caches, AVL trees can provide a good balance between search speed and memory efficiency, but may not be the best choice for all use cases.
- While AVL trees guarantee O(log n) time complexity for basic operations, they may have higher constant factors compared to other self-balancing trees like Red-Black trees.
- In real-world implementations, consider using lazy deletion or batch updates to improve performance in scenarios with frequent modifications.