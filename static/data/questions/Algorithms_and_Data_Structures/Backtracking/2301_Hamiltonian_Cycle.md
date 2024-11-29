**Hamiltonian Cycle**

# Metadata

- **ID**: 2301
- **Title**: Hamiltonian Cycle
- **Difficulty**: Hard
- **Category**: Backtracking
- **Subcategory**: Graph Theory
- **Similar Questions**:
  - LeetCode: 980. Unique Paths III
  - HackerRank: Journey to the Moon
  - CodeForces: Tourist's Notes
- **Real Life Domains**: Network Design, Transportation Routing, Genome Sequencing

# Problem Description

Given an undirected graph, determine whether it contains a Hamiltonian cycle. A Hamiltonian cycle is a cycle that visits each vertex exactly once and returns to the starting vertex.

The Hamiltonian Cycle problem is a classic graph theory problem that involves finding a path in an undirected graph that visits each vertex exactly once and returns to the starting vertex. Key aspects of this problem include:

1. Graph representation: Usually represented as an adjacency matrix or adjacency list.
2. Backtracking: The solution typically involves exploring all possible paths.
3. Cycle detection: Ensuring the path forms a cycle by returning to the start vertex.
4. Vertex uniqueness: Each vertex must be visited exactly once.

The problem is NP-complete, meaning there's no known polynomial-time algorithm to solve it for all cases. For small to medium-sized graphs, backtracking is often used, while heuristic approaches are employed for larger graphs.

# Versions

## Version 1: Hamiltonian Cycle Existence

Determine if a Hamiltonian cycle exists in the given graph.

Example:

Input:
Graph represented as adjacency matrix:
[
[0, 1, 0, 1, 0],
[1, 0, 1, 1, 1],
[0, 1, 0, 0, 1],
[1, 1, 0, 0, 1],
[0, 1, 1, 1, 0]
]

Output: true (A Hamiltonian cycle exists: 0-1-2-4-3-0)

## Version 2: Find a Hamiltonian Cycle

If a Hamiltonian cycle exists, return one such cycle.

Example:

Input: (Same graph as Version 1)
Output: [0, 1, 2, 4, 3, 0]

## Version 3: Count Hamiltonian Cycles

Count the number of distinct Hamiltonian cycles in the graph.

Example:

Input: (A smaller graph for simplicity)
[
[0, 1, 1, 1],
[1, 0, 1, 1],
[1, 1, 0, 1],
[1, 1, 1, 0]
]
Output: 3 (The cycles are: 0-1-2-3-0, 0-1-3-2-0, 0-2-1-3-0)

## Version 4: Real-Life Scenarios

### Scenario 1: Optimizing Delivery Routes

You're developing a routing system for a package delivery company:

a) Implement an algorithm to find a route that visits all delivery locations exactly once and returns to the depot.
b) Extend the algorithm to handle time windows for deliveries, ensuring each location is visited during its specified time slot.
c) Develop a feature to count and compare multiple valid routes to select the most
