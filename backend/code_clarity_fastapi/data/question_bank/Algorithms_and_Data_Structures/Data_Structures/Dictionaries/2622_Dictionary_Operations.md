# Metadata

- **ID**: 2622
- **Title**: Dictionary Operations: Mastering Python Dictionary Manipulations
- **Difficulty**: Easy
- **Category**: Data Structures
- **Subcategory**: Dictionaries
- **Similar Questions**: Hash Table Design, LRU Cache
- **Real Life Domains**: Data Management, Caching Systems, Configuration Handling

# Problem Description

Dictionary operations in Python involve various methods and techniques for manipulating, accessing, and modifying dictionary data structures. These operations are fundamental to many programming tasks and can greatly impact the efficiency and readability of your code.

# Versions

## Version 1: Basic Dictionary Operations

Implement a set of functions that perform the following basic dictionary operations:
1. Add a new key-value pair
2. Update the value of an existing key
3. Remove a key-value pair
4. Check if a key exists
5. Get the value of a key with a default value if the key doesn't exist

Example:
```python
dict_ops = DictOperations({'a': 1, 'b': 2})
dict_ops.add('c', 3)  # {'a': 1, 'b': 2, 'c': 3}
dict_ops.update('b', 4)  # {'a': 1, 'b': 4, 'c': 3}
dict_ops.remove('a')  # {'b': 4, 'c': 3}
dict_ops.contains('b')  # True
dict_ops.get('d', 0)  # 0
```

## Version 2: Advanced Dictionary Merging

Implement a function that merges multiple dictionaries with the following rules:
1. If a key exists in multiple dictionaries, keep the value from the last dictionary.
2. If a value is itself a dictionary, recursively merge these nested dictionaries.
3. If a value is a list, concatenate the lists from all dictionaries for that key.

Example:
```python
dict1 = {'a': 1, 'b': {'x': 10, 'y': 20}, 'c': [1, 2]}
dict2 = {'b': {'y': 30, 'z': 40}, 'c': [3, 4], 'd': 5}
dict3 = {'a': 2, 'c': [5, 6]}

merged = merge_dicts(dict1, dict2, dict3)
# Result: {
#   'a': 2,
#   'b': {'x': 10, 'y': 30, 'z': 40},
#   'c': [1, 2, 3, 4, 5, 6],
#   'd': 5
# }
```

## Version 3: Dictionary-based Cache with Expiration

Implement a dictionary-based cache system with the following features:
1. Add key-value pairs with an optional expiration time.
2. Retrieve values, automatically removing expired entries.
3. Implement a cleanup method to remove all expired entries.
4. Implement a method to get all non-expired keys.

Example:
```python
cache = ExpiringCache()
cache.set('a', 1, expiration=5)  # Expires in 5 seconds
cache.set('b', 2, expiration=10)  # Expires in 10 seconds
cache.set('c', 3)  # No expiration

print(cache.get('a'))  # 1 (assuming within 5 seconds)
time.sleep(6)
print(cache.get('a'))  # None (expired)
print(cache.get('b'))  # 2 (still valid)

cache.cleanup()  # Removes expired entries
print(cache.get_valid_keys())  # ['b', 'c']
```

# Constraints

- For Version 1:
  - The dictionary can contain any valid Python objects as keys and values.
- For Version 2:
  - The depth of nested dictionaries should not exceed 100 levels.
  - The total number of elements across all dictionaries should not exceed 10^6.
- For Version 3:
  - The cache should be able to handle at least 10^5 entries.
  - Expiration times should be in seconds, with a maximum value of 2^31 - 1.

# Notes

- When implementing dictionary operations, consider the time complexity of each operation.
- For the merging operation, be cautious about deep copies vs. shallow copies of nested structures.
- In the cache implementation, consider using a heap or similar data structure to efficiently track and remove expired entries.
- Dictionary views (keys(), values(), items()) provide a dynamic view of the dictionary's entries, which can be useful for certain operations.
- When dealing with large dictionaries, consider memory usage and potential optimization techniques like using `__slots__` for custom classes used as dictionary values.