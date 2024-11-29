# Metadata

- **ID**: 214
- **Title**: Disjoint Set Union (DSU) / Union-Find: Dynamic Connectivity
- **Difficulty**: Medium
- **Category**: Advanced Data Structures
- **Subcategory**: Disjoint Set Union
- **Similar Questions**: LeetCode: 547. Number of Provinces, 684. Redundant Connection, 1319. Number of Operations to Make Network Connected
- **Real Life Domains**: Network Analysis, Image Processing, Social Networks, Compiler Design, Distributed Systems

# Problem Description

Disjoint Set Union (DSU), also known as Union-Find, is a data structure that keeps track of a partition of a set into disjoint subsets. It provides near-constant time operations to add new sets, merge existing sets, and determine whether elements are in the same set. The challenge is to implement an efficient DSU and use it to solve various connectivity problems.

# Versions

## Version 1: Basic DSU Implementation

Implement a DSU with the following operations:

1. `makeSet(x)`: Create a new set containing only element x.
2. `find(x)`: Determine which set an element x belongs to.
3. `union(x, y)`: Merge the sets containing elements x and y.
4. `connected(x, y)`: Determine if elements x and y are in the same set.

Example:

```
dsu = DisjointSetUnion()
dsu.makeSet(1)
dsu.makeSet(2)
dsu.makeSet(3)
dsu.union(1, 2)
print(dsu.connected(1, 2))  # Output: True
print(dsu.connected(1, 3))  # Output: False
```

## Version 2: Optimized DSU with Path Compression and Union by Rank

Implement an optimized version of DSU using path compression and union by rank:

1. `find(x)`: Implement path compression during the find operation.
2. `union(x, y)`: Implement union by rank to keep the tree balanced.
3. `getSetSize(x)`: Return the size of the set containing element x.
4. `getTotalSets()`: Return the total number of disjoint sets.

Example:

```
optimized_dsu = OptimizedDSU()
for i in range(1, 6):
    optimized_dsu.makeSet(i)
optimized_dsu.union(1, 2)
optimized_dsu.union(3, 4)
optimized_dsu.union(1, 3)
print(optimized_dsu.getSetSize(1))  # Output: 4
print(optimized_dsu.getTotalSets())  # Output: 2
```

## Version 3: Dynamic DSU with Undo Operations

Extend the DSU to support dynamic operations and undo functionality:

1. `undo()`: Revert the last union operation.
2. `split(x, y)`: Split the set containing x and y into two sets if they are connected.
3. `snapshot()`: Create a snapshot of the current DSU state.
4. `restore(snapshot_id)`: Restore the DSU to a previous snapshot.

Example:

```
dynamic_dsu = DynamicDSU()
for i in range(1, 6):
    dynamic_dsu.makeSet(i)
dynamic_dsu.union(1, 2)
dynamic_dsu.union(2, 3)
snapshot_id = dynamic_dsu.snapshot()
dynamic_dsu.union(3, 4)
print(dynamic_dsu.connected(1, 4))  # Output: True
dynamic_dsu.undo()
print(dynamic_dsu.connected(1, 4))  # Output: False
dynamic_dsu.restore(snapshot_id)
```

## Version 4: Persistent DSU

Implement a persistent version of DSU that maintains the history of all operations:

1. `unionAndGetVersion(x, y)`: Perform union and return a new version number.
2. `findAtVersion(x, version)`: Find the set of x at a specific version.
3. `connectedAtVersion(x, y, version)`: Check if x and y were connected at a specific version.
4. `getLargestSetAtVersion(version)`: Get the size of the largest set at a specific version.

Example:

```
persistent_dsu = PersistentDSU()
for i in range(1, 6):
    persistent_dsu.makeSet(i)
v1 = persistent_dsu.unionAndGetVersion(1, 2)
v2 = persistent_dsu.unionAndGetVersion(3, 4)
v3 = persistent_dsu.unionAndGetVersion(1, 3)
print(persistent_dsu.connectedAtVersion(1, 4, v2))  # Output: False
print(persistent_dsu.connectedAtVersion(1, 4, v3))  # Output: True
print(persistent_dsu.getLargestSetAtVersion(v2))  # Output: 2
```

# Real-Life Scenarios

1. **Social Network Friend Circles**:
   Implement a system to analyze friend circles in a social network:

   - Efficiently determine if two users are in the same friend circle.
   - Find the largest friend circle.
   - Detect when two previously separate circles merge.
   - Analyze how friend circles evolved over time.

2. **Image Segmentation and Object Recognition**:
   Use DSU for image processing tasks:

   - Group similar pixels to identify distinct objects in an image.
   - Implement a flood fill algorithm using DSU.
   - Track object boundaries as more pixels are processed.
   - Allow for interactive refinement of segmentation by merging or splitting regions.

3. **Network Topology and Fault Tolerance**:
   Apply DSU to manage and analyze computer network topology:

   - Quickly determine if two nodes are connected in the network.
   - Identify isolated subnetworks.
   - Simulate link failures and assess network resilience.
   - Plan network upgrades by analyzing the impact of adding new connections.

4. **Compiler Design - Equivalence Classes**:
   Use DSU in a compiler's type inference system:

   - Group variables with the same inferred type.
   - Handle type unification as the program is analyzed.
   - Support generics and subtyping by allowing set splits.
   - Provide debugging information by tracking the history of type decisions.

5. **Distributed Systems Consensus**:
   Implement a consensus algorithm for distributed systems using DSU:
   - Track node agreements in a distributed computation.
   - Detect when consensus is reached across all nodes.
   - Handle dynamic node joins and leaves.
   - Implement a rollback mechanism for handling network partitions.

# Constraints

- For all versions:

  - 1 ≤ number of elements ≤ 10^5
  - 1 ≤ number of operations ≤ 10^6

- For Version 2:

  - Achieve near-constant time complexity for all operations.

- For Version 3:

  - Maximum depth of undo operations: 1000

- For Version 4:
  - Maximum number of versions: 10^5

# Notes

- The basic DSU operations (make_set, find, union) should have a time complexity of O(α(n)), where α(n) is the inverse Ackermann function.
- For the optimized version, focus on implementing both path compression and union by rank to achieve optimal performance.
- In the dynamic DSU, consider using a stack or a more sophisticated data structure to efficiently support undo operations.
- For the persistent DSU, think about space-efficient ways to store the version history, possibly using techniques like path copying or fat nodes.
- In real-world applications, consider implementing batch operations for better performance when dealing with large datasets.
