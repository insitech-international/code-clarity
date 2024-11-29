# Metadata

- **ID**: 202
- **Title**: Skip List: Probabilistic Alternative to Balanced Trees
- **Difficulty**: Hard
- **Category**: Advanced Data Structures
- **Subcategory**: Probabilistic Data Structures
- **Similar Questions**: LeetCode: 1206. Design Skiplist, HackerRank: Self Balancing Tree
- **Real Life Domains**: Database Indexing, File Systems, Peer-to-Peer Networks, Memory Management, Blockchain

# Problem Description

A Skip List is a probabilistic data structure that allows for fast search, insertion, and deletion operations. It's an alternative to balanced trees and provides expected O(log n) time complexity for these operations. The challenge is to implement a Skip List and use it to solve various problems efficiently.

# Versions

## Version 1: Basic Skip List Implementation

Implement a Skip List with the following operations:
1. `insert(key, value)`: Insert a key-value pair into the Skip List.
2. `search(key)`: Find and return the value associated with the key.
3. `delete(key)`: Remove the key-value pair from the Skip List.
4. `display()`: Print the Skip List structure for debugging.

Example:
```
skip_list = SkipList()
skip_list.insert(3, "apple")
skip_list.insert(6, "banana")
skip_list.insert(7, "cherry")
print(skip_list.search(6))  # Output: "banana"
skip_list.delete(3)
print(skip_list.search(3))  # Output: None
```

## Version 2: Range Queries in Skip List

Extend the Skip List to support efficient range queries:
1. `range_search(start_key, end_key)`: Return all key-value pairs within the given range.
2. `count_in_range(start_key, end_key)`: Count the number of elements within the given range.
3. `delete_range(start_key, end_key)`: Remove all elements within the given range.

Example:
```
skip_list.insert(10, "A")
skip_list.insert(20, "B")
skip_list.insert(30, "C")
skip_list.insert(40, "D")
print(skip_list.range_search(15, 35))  # Output: [(20, "B"), (30, "C")]
print(skip_list.count_in_range(5, 25))  # Output: 2
skip_list.delete_range(25, 45)
```

## Version 3: Concurrent Skip List

Implement a thread-safe Skip List that supports concurrent operations:
1. `concurrent_insert(key, value)`: Thread-safe insertion.
2. `concurrent_search(key)`: Thread-safe search.
3. `concurrent_delete(key)`: Thread-safe deletion.
4. `lock_free_contains(key)`: Lock-free containment check.

Example:
```
concurrent_skip_list = ConcurrentSkipList()
threads = [
    Thread(target=concurrent_skip_list.concurrent_insert, args=(i, f"value_{i}"))
    for i in range(1000)
]
[t.start() for t in threads]
[t.join() for t in threads]
print(concurrent_skip_list.concurrent_search(500))  # Output: "value_500"
```

## Version 4: Persistent Skip List

Design a persistent Skip List that maintains historical versions:
1. `insert_version(key, value)`: Insert a key-value pair and create a new version.
2. `search_version(key, version)`: Search for a key in a specific version.
3. `revert_to_version(version)`: Revert the Skip List to a previous version.
4. `merge_versions(version1, version2)`: Create a new version by merging two existing versions.

Example:
```
persistent_skip_list = PersistentSkipList()
persistent_skip_list.insert_version(1, "A")  # Version 1
persistent_skip_list.insert_version(2, "B")  # Version 2
persistent_skip_list.insert_version(1, "C")  # Version 3
print(persistent_skip_list.search_version(1, 2))  # Output: "A"
print(persistent_skip_list.search_version(1, 3))  # Output: "C"
persistent_skip_list.revert_to_version(1)
```

# Real-Life Scenarios

1. **Database Indexing System**:
   Implement a Skip List-based indexing system for a large-scale database. The system should support:
   - Efficient insertion and deletion of index entries as records are added or removed.
   - Fast range queries for paginated results.
   - Concurrent access for multi-user environments.
   - Versioning for point-in-time recovery.

2. **Peer-to-Peer Network Routing**:
   Design a Skip List-based routing table for a peer-to-peer network. The system should:
   - Maintain a distributed Skip List of network nodes.
   - Support fast lookups for routing decisions.
   - Handle dynamic node joins and leaves efficiently.
   - Implement a gossip protocol for maintaining the Skip List across the network.

3. **In-Memory Cache with TTL**:
   Create an in-memory caching system using Skip Lists. Features should include:
   - Efficient key-value storage with support for millions of entries.
   - Time-to-live (TTL) functionality for automatic entry expiration.
   - Least Recently Used (LRU) eviction policy when memory limit is reached.
   - Thread-safe operations for high-concurrency environments.

4. **Financial Order Book**:
   Implement a high-performance order book for a financial trading system using Skip Lists. Requirements:
   - Fast insertion and deletion of buy/sell orders.
   - Efficient matching of orders based on price and time priority.
   - Support for different order types (market, limit, stop).
   - Real-time aggregated view of the order book at different price levels.

5. **Blockchain Ledger**:
   Design a Skip List-based structure for maintaining a blockchain ledger. The system should:
   - Support fast insertion of new blocks while maintaining historical integrity.
   - Provide efficient proof-of-inclusion for transactions.
   - Allow for quick verification of the entire blockchain.
   - Support forking and merging of chains in case of conflicts.

# Constraints

- For all versions:
  - 1 ≤ number of elements ≤ 10^6
  - Keys are integers in the range [-10^9, 10^9]
  - Maximum Skip List level: 32

- For Version 2:
  - 1 ≤ range size ≤ 10^5

- For Version 3:
  - Maximum number of concurrent threads: 100

- For Version 4:
  - Maximum number of versions: 1000

# Notes

- The probability of promoting an element to a higher level in the Skip List is typically 1/2 or 1/4.
- Consider the trade-offs between memory usage and search efficiency when choosing the promotion probability.
- For the concurrent Skip List, think about fine-grained locking or lock-free techniques to maximize parallelism.
- In the persistent Skip List, efficient space management is crucial as the number of versions grows.
- For real-world applications, consider implementing compression techniques for large datasets and optimizing for cache-friendly memory access patterns.