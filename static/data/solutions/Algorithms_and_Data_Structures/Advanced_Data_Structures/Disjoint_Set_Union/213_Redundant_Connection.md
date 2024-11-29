# Metadata

- **ID**: 213
- **Title**: Redundant Connection: Cycle Detection and Network Optimization
- **Difficulty**: Hard
- **Category**: Advanced Data Structures
- **Subcategory**: Disjoint Set Union
- **Similar Questions**: LeetCode: 684. Redundant Connection, 685. Redundant Connection II, 1192. Critical Connections in a Network
- **Real Life Domains**: Network Design, Circuit Analysis, Social Network Analysis, Supply Chain Optimization

# Problem Description

In this problem, you are given an undirected graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed. The task is to find the redundant connection, which is the last edge that was added to the graph and can be removed to turn the graph back into a tree.

# Versions

## Version 1: Basic Redundant Connection

Implement a function to find the redundant connection in an undirected graph:

1. The input is an array of edges, where edges[i] = [u, v] represents an undirected edge between nodes u and v.
2. Return the edge that can be
   [Continuing from where we left off...]

3. Return the edge that can be removed to turn the graph back into a tree.
4. If there are multiple answers, return the edge that occurs last in the input.

Example:

```
Input: edges = [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The edge [2,3] can be removed to form a tree.
```

## Version 2: Weighted Redundant Connection

Extend the problem to handle weighted edges:

1. Each edge now has a weight associated with it.
2. Find the redundant connection that, when removed, minimizes the total weight of the resulting tree.
3. If there are multiple such edges, return the one that occurs last in the input.

Example:

```
Input: edges = [[1,2,3], [1,3,4], [2,3,5]]
Output: [2,3,5]
Explanation: Removing [2,3,5] results in a tree with total weight 7, which is minimal.
```

## Version 3: Dynamic Redundant Connection

Implement a system that can handle dynamic edge additions and removals:

1. `addEdge(u, v, weight)`: Add an edge to the graph.
2. `removeEdge(u, v)`: Remove an edge from the graph.
3. `findRedundantConnection()`: Find the current redundant connection.
4. `isTree()`: Check if the current graph is a tree.
5. `optimize()`: Remove edges to convert the graph into a minimum spanning tree.

Example:

```
addEdge(1, 2, 3)
addEdge(1, 3, 4)
addEdge(2, 3, 5)
print(findRedundantConnection())  # Output: [2,3,5]
removeEdge(2, 3)
print(isTree())  # Output: True
addEdge(2, 4, 2)
addEdge(3, 4, 1)
print(optimize())  # Output: Removed edge [2,4,2]
```

## Version 4: Redundant Connection in Directed Graphs

Extend the problem to handle directed graphs:

1. The input is now a directed graph.
2. Find a redundant directed connection that can be removed to make the graph a directed acyclic graph (DAG).
3. If multiple such connections exist, return the one that occurs last in the input.
4. If no such connection exists (the graph is already a DAG), return an empty array.

Example:

```
Input: edges = [[1,2], [2,3], [3,1], [1,4]]
Output: [3,1]
Explanation: Removing [3,1] breaks the cycle and results in a DAG.
```

# Real-Life Scenarios

1. **Network Infrastructure Optimization**:
   Develop a system for optimizing network infrastructure:

   - Identify redundant connections in a computer network.
   - Suggest removal of unnecessary links to reduce maintenance costs.
   - Ensure the network remains fully connected after optimization.
   - Handle dynamic addition and removal of network nodes and links.
   - Consider bandwidth and latency when optimizing connections.

2. **Social Network Analysis**:
   Create a tool for analyzing and optimizing social networks:

   - Identify redundant connections in friend networks.
   - Suggest potential new connections to improve network efficiency.
   - Analyze the impact of removing influential nodes on network structure.
   - Detect and visualize community structures within the network.
   - Model information flow and optimize for faster spreading of information.

3. **Supply Chain Optimization**:
   Design a system to optimize supply chain networks:

   - Model suppliers, manufacturers, and distributors as nodes in a graph.
   - Identify redundant or inefficient connections in the supply chain.
   - Optimize the network to minimize transportation costs and delivery times.
   - Handle dynamic changes in supply and demand.
   - Ensure robustness of the supply chain against potential disruptions.

4. **Circuit Design and Analysis**:
   Implement a tool for electronic circuit optimization:

   - Represent electronic components as nodes and connections as edges.
   - Identify redundant connections that can be safely removed.
   - Optimize circuits for power efficiency and signal integrity.
   - Ensure the circuit remains functional after optimization.
   - Handle both analog and digital circuit topologies.

5. **Urban Transportation Planning**:
   Create a system for optimizing urban transportation networks:
   - Model roads and intersections as a graph.
   - Identify redundant routes that contribute to traffic congestion.
   - Suggest new connections to improve overall traffic flow.
   - Optimize traffic light timings based on network structure.
   - Simulate the impact of road closures or new construction on traffic patterns.

# Constraints

- For all versions:

  - 3 ≤ number of nodes ≤ 1000
  - number of edges = number of nodes
  - No self-loops or repeated edges

- For Version 2:

  - 1 ≤ edge weight ≤ 10^5

- For Version 3:

  - Maximum number of operations (add/remove): 10^5

- For Version 4:
  - The graph may have multiple valid solutions

# Notes

- Consider using a disjoint set union (DSU) data structure for efficient cycle detection.
- For the weighted version, think about how to adapt the algorithm to consider weights.
- In the dynamic version, optimize data structures for frequent updates and queries.
- For the directed graph version, consider using topological sorting or depth-first search for cycle detection.
- In real-world applications, consider implementing visualization tools to help users understand the network structure and optimizations.
