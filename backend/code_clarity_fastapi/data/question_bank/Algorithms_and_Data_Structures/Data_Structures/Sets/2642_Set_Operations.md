# Metadata

- **ID**: 2642
- **Title**: Set Operations: Mastering Python Set Manipulations
- **Difficulty**: Easy
- **Category**: Data Structures
- **Subcategory**: Sets
- **Similar Questions**: Hash Table Design, Bit Manipulation
- **Real Life Domains**: Data Analysis, Database Queries, Network Analysis

# Problem Description

Set operations in Python involve various methods and techniques for manipulating sets, which are unordered collections of unique elements. These operations are fundamental to many programming tasks, especially those involving comparisons, deduplication, and logical operations on collections.

# Versions

## Version 1: Basic Set Operations

Implement a class that supports the following basic set operations:
1. Create a set from a list or other iterable
2. Add an element to the set
3. Remove an element from the set
4. Check if an element is in the set
5. Perform union, intersection, and difference operations
6. Find the symmetric difference between two sets
7. Check if one set is a subset or superset of another

Example:
```python
set_ops = SetOperations()
s1 = set_ops.create([1, 2, 3, 3, 4])
set_ops.add(s1, 5)
set_ops.remove(s1, 3)
print(set_ops.contains(s1, 4))  # True

s2 = set_ops.create([3, 4, 5, 6])
print(set_ops.union(s1, s2))  # {1, 2, 4, 5, 6}
print(set_ops.intersection(s1, s2))  # {4, 5}
print(set_ops.difference(s1, s2))  # {1, 2}
print(set_ops.symmetric_difference(s1, s2))  # {1, 2, 3, 6}
print(set_ops.is_subset(set_ops.create([1, 2]), s1))  # True
```

## Version 2: Advanced Set Operations

Implement a set of functions that perform more advanced set operations:
1. Find the power set of a given set
2. Implement a disjoint-set data structure (union-find)
3. Find the Cartesian product of two or more sets
4. Implement a multi-set (bag) using a set and counter
5. Find the longest common subsequence of two lists using sets

Example:
```python
advanced_ops = AdvancedSetOps()

s = {1, 2, 3}
print(advanced_ops.power_set(s))  # [set(), {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}]

disjoint_set = advanced_ops.DisjointSet(5)
disjoint_set.union(0, 2)
disjoint_set.union(4, 2)
disjoint_set.union(3, 1)
print(disjoint_set.find(4) == disjoint_set.find(0))  # True

print(advanced_ops.cartesian_product({1, 2}, {'a', 'b'}))  # {(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')}

bag = advanced_ops.Multiset([1, 2, 2, 3, 3, 3])
print(bag.count(3))  # 3

seq1 = [1, 2, 3, 4, 5]
seq2 = [2, 4, 5, 6, 7]
print(advanced_ops.longest_common_subsequence(seq1, seq2))  # [2, 4, 5]
```

## Version 3: Set-based Algorithms for Real-world Problems

Implement set-based solutions for the following real-world problems:
1. Friend recommendation system based on mutual friends
2. Efficient spell checker using sets of valid words
3. Network packet filtering using set operations on IP addresses
4. Gene sequence analysis using set operations on DNA sequences
5. Implementing a simple database join operation using sets

Example:
```python
real_world_ops = RealWorldSetOps()

# Friend recommendation
friends = {
    'Alice': {'Bob', 'Charlie', 'David'},
    'Bob': {'Alice', 'Charlie', 'Eve'},
    'Charlie': {'Alice', 'Bob', 'David', 'Eve'},
    'David': {'Alice', 'Charlie', 'Frank'},
    'Eve': {'Bob', 'Charlie'},
    'Frank': {'David'}
}
print(real_world_ops.recommend_friends('Alice', friends))  # ['Eve', 'Frank']

# Spell checker
valid_words = {'apple', 'banana', 'cherry', 'date'}
print(real_world_ops.spell_check('aple', valid_words))  # Did you mean 'apple'?

# Network packet filtering
allowed_ips = {'192.168.1.1', '10.0.0.1', '172.16.0.1'}
incoming_packet = '192.168.1.1'
print(real_world_ops.filter_packet(incoming_packet, allowed_ips))  # Allow

# Gene sequence analysis
seq1 = 'ATCG'
seq2 = 'GTCA'
print(real_world_ops.common_subsequences(seq1, seq2))  # ['A', 'C', 'G', 'T']

# Database join
table1 = [('1', 'Alice'), ('2', 'Bob'), ('3', 'Charlie')]
table2 = [('2', 'Developer'), ('3', 'Designer'), ('4', 'Manager')]
print(real_world_ops.simple_join(table1, table2))  # [('2', 'Bob', 'Developer'), ('3', 'Charlie', 'Designer')]
```

# Constraints

- For Version 1:
  - The sets can contain any hashable Python objects.
  - The maximum number of elements in a set should not exceed 10^5.
- For Version 2:
  - For the power set operation, the input set should have at most 20 elements.
  - The disjoint-set should support up to 10^5 elements.
- For Version 3:
  - The friend recommendation system should support up to 10^4 users.
  - The spell checker should handle a dictionary of up to 10^5 words.
  - The gene sequences should have a maximum length of 10^4 characters.

# Notes

- When implementing set operations, consider the time complexity of each operation, especially for large sets.
- The power set operation grows exponentially with the size of the input set, so be cautious with large inputs.
- In the disjoint-set implementation, consider using union by rank and path compression for optimal performance.
- For the spell checker, consider using techniques like Levenshtein distance or soundex algorithms for more advanced matching.
- In gene sequence analysis, be aware that set operations on strings create sets of individual characters, which might not always be the desired behavior for biological sequences.
- When working with large datasets, consider using generators or iterators to reduce memory usage where applicable.
- Set operations can be very efficient for certain types of problems, but be aware of their limitations, such as the inability to store duplicate elements or maintain order.