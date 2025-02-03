# Metadata

- **ID**: 2632
- **Title**: List Operations: Mastering Python List Manipulations
- **Difficulty**: Easy
- **Category**: Data Structures
- **Subcategory**: Lists
- **Similar Questions**: Array Manipulation, Linked List Operations
- **Real Life Domains**: Data Processing, Algorithm Implementation, Sequence Handling

# Problem Description

List operations in Python encompass a wide range of techniques for creating, modifying, and analyzing lists. These operations are crucial for efficient data manipulation and form the backbone of many algorithms and data processing tasks.

# Versions

## Version 1: Basic List Operations

Implement a class that supports the following basic list operations:
1. Append an element to the end of the list
2. Insert an element at a specific index
3. Remove an element by value (first occurrence)
4. Remove an element by index
5. Find the index of an element
6. Count the occurrences of an element
7. Reverse the list in-place
8. Sort the list in ascending and descending order

Example:
```python
list_ops = ListOperations([1, 2, 3, 2, 4])
list_ops.append(5)  # [1, 2, 3, 2, 4, 5]
list_ops.insert(0, 0)  # [0, 1, 2, 3, 2, 4, 5]
list_ops.remove_value(2)  # [0, 1, 3, 2, 4, 5]
list_ops.remove_index(3)  # [0, 1, 3, 4, 5]
print(list_ops.find(4))  # 3
print(list_ops.count(1))  # 1
list_ops.reverse()  # [5, 4, 3, 1, 0]
list_ops.sort_asc()  # [0, 1, 3, 4, 5]
list_ops.sort_desc()  # [5, 4, 3, 1, 0]
```

## Version 2: Advanced List Slicing and Manipulation

Implement a set of functions that perform advanced list slicing and manipulation:
1. Get every nth element of the list
2. Rotate the list by k positions (both left and right)
3. Find the longest increasing subsequence
4. Flatten a nested list structure
5. Create a sliding window iterator over the list

Example:
```python
advanced_ops = AdvancedListOps([1, 2, 3, 4, 5, 6, 7, 8, 9])
print(advanced_ops.every_nth(3))  # [1, 4, 7]
print(advanced_ops.rotate(2))  # [8, 9, 1, 2, 3, 4, 5, 6, 7]
print(advanced_ops.longest_increasing_subsequence())  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

nested = [1, [2, 3, [4, 5]], 6, [7, 8]]
print(advanced_ops.flatten(nested))  # [1, 2, 3, 4, 5, 6, 7, 8]

for window in advanced_ops.sliding_window(3):
    print(window)  # [1, 2, 3], [2, 3, 4], [3, 4, 5], ...
```

## Version 3: List-based Data Structure Implementation

Implement a more complex data structure using lists as the underlying storage mechanism. Choose one of the following:

a) Implement a Stack with push, pop, and peek operations, along with a method to find the maximum element in O(1) time.

b) Implement a Queue with enqueue, dequeue operations, and a method to get the moving average of the last N elements.

c) Implement a Sparse Vector, supporting addition with another sparse vector and dot product operation.

Example (for Stack with max element):
```python
stack = MaxStack()
stack.push(3)
stack.push(1)
stack.push(5)
print(stack.max())  # 5
stack.pop()
print(stack.max())  # 3
stack.push(4)
print(stack.peek())  # 4
print(stack.max())  # 4
```

# Constraints

- For Version 1:
  - The list can contain any valid Python objects.
  - The maximum length of the list should not exceed 10^5.
- For Version 2:
  - The maximum depth of nested lists should not exceed 100.
  - The total number of elements across all nested levels should not exceed 10^6.
- For Version 3:
  - For Stack and Queue: Support up to 10^5 operations.
  - For Sparse Vector: Support vectors with up to 10^6 dimensions, with at most 10^4 non-zero elements.

# Notes

- When implementing list operations, consider the time complexity of each operation, especially for large lists.
- For advanced slicing operations, be aware of the memory implications of creating new lists vs. modifying in place.
- In the flatten operation, consider using recursion or a stack-based approach for deeply nested structures.
- For the Sparse Vector implementation, consider using a dictionary to store non-zero elements for efficiency.
- When working with large lists, consider using iterators or generators to reduce memory usage.
- Some operations like sorting or finding the longest increasing subsequence have more efficient algorithms that could be explored for optimization.