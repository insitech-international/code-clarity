# Metadata

- **ID**: 212
- **Title**: Number of Islands II: Dynamic Island Formation
- **Difficulty**: Hard
- **Category**: Advanced Data Structures
- **Subcategory**: Disjoint Set Union
- **Similar Questions**: LeetCode: 305. Number of Islands II, 200. Number of Islands
- **Real Life Domains**: Geographic Information Systems (GIS), Network Topology, Image Processing, Social Network Analysis

# Problem Description

You are given an m x n 2D grid initialized with all zeros. Design an algorithm to perform an addLand operation which turns a water cell (0) into a land cell (1). You are also asked to count the number of islands after each addLand operation. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

# Versions

## Version 1: Basic Dynamic Island Formation

Implement a system with the following operations:

1. `addLand(r, c)`: Add a piece of land at position (r, c).
2. `numIslands()`: Return the current number of islands.

Example:

```
Input: m = 3, n = 3
addLand(0, 0): Number of islands = 1
addLand(0, 1): Number of islands = 1
addLand(1, 2): Number of islands = 2
addLand(2, 1): Number of islands = 3
addLand(1, 1): Number of islands = 1
```

## Version 2: Island Properties and Queries

Extend the system to support queries about island properties:

1. `addLand(r, c)`: Same as Version 1.
2. `numIslands()`: Same as Version 1.
3. `islandSize(r, c)`: Return the size of the island containing (r, c).
4. `largestIsland()`: Return the size of the largest island.
5. `areConnected(r1, c1, r2, c2)`: Check if (r1, c1) and (r2, c2) are on the same island.

Example:

```
addLand(0, 0)
addLand(0, 1)
addLand(1, 0)
print(islandSize(0, 0))  # Output: 3
print(largestIsland())   # Output: 3
print(areConnected(0, 0, 1, 0))  # Output: True
addLand(2, 2)
print(numIslands())  # Output: 2
```

## Version 3: Dynamic Land Operations

Implement a system that supports both adding and removing land:

1. `addLand(r, c)`: Add a piece of land at (r, c).
2. `removeLand(r, c)`: Remove the land at (r, c), turning it back into water.
3. `numIslands()`: Return the current number of islands.
4. `undoLastOperation()`: Undo the last add or remove operation.
5. `redoOperation()`: Redo the last undone operation.

Example:

```
addLand(0, 0)
addLand(0, 1)
addLand(1, 0)
print(numIslands())  # Output: 1
removeLand(0, 1)
print(numIslands())  # Output: 2
undoLastOperation()
print(numIslands())  # Output: 1
redoOperation()
print(numIslands())  # Output: 2
```

## Version 4: Probabilistic Island Formation

Design a system that simulates probabilistic island formation:

1. `setLandProbability(r, c, p)`: Set the probability of land formation at (r, c) to p.
2. `simulateStep()`: Simulate one step of island formation based on probabilities.
3. `runSimulation(steps)`: Run the simulation for a given number of steps.
4. `getIslandDistribution()`: Return the distribution of island sizes.
5. `resetSimulation()`: Reset the grid to initial state.

Example:

```
setLandProbability(0, 0, 0.8)
setLandProbability(0, 1, 0.6)
setLandProbability(1, 0, 0.7)
runSimulation(1000)
print(getIslandDistribution())  # Output: {1: 0.3, 2: 0.5, 3: 0.2}
resetSimulation()
```

# Real-Life Scenarios

1. **Archipelago Formation Modeling**:
   Create a system to model the formation and evolution of archipelagos:

   - Simulate rising sea levels and their impact on island formation.
   - Model the effects of erosion and volcanic activity on island shapes.
   - Predict the formation of land bridges during glacial periods.
   - Analyze the impact of island formation on biodiversity and species migration.

2. **Network Topology Analysis**:
   Implement a tool for analyzing dynamic network topologies:

   - Model the addition and removal of network nodes and connections.
   - Identify isolated subnetworks and potential points of failure.
   - Simulate network growth and analyze its resilience to random failures.
   - Optimize network design for better connectivity and fault tolerance.

3. **Social Network Community Detection**:
   Develop a system to analyze the formation and evolution of communities in social networks:

   - Model users as "islands" and connections as "land bridges".
   - Detect the emergence of new communities as connections are formed.
   - Analyze the impact of influential users on community structure.
   - Predict potential connections to suggest friend recommendations.

4. **Urban Development and Sprawl Analysis**:
   Create a tool for urban planners to model city growth and sprawl:

   - Simulate the development of new urban areas over time.
   - Analyze the connectivity between different neighborhoods.
   - Model the impact of new transportation infrastructure on urban connectivity.
   - Predict potential areas of future development based on current growth patterns.

5. **Epidemic Spread Modeling**:
   Design a system to model the spread of epidemics across interconnected regions:
   - Represent regions as "islands" and travel routes as connections.
   - Simulate the spread of a disease based on connectivity and population density.
   - Model the impact of travel restrictions on disease spread.
   - Analyze the effectiveness of different quarantine strategies.

# Constraints

- For all versions:

  - 1 ≤ m, n ≤ 1000
  - 0 ≤ r < m, 0 ≤ c < n
  - At most 10^5 addLand operations will be performed.

- For Version 2:

  - Maximum island size: 10^6

- For Version 3:

  - Maximum number of undo/redo operations: 1000

- For Version 4:
  - 0.0 ≤ probability ≤ 1.0
  - Maximum number of simulation steps: 10^6

# Notes

- Consider using a disjoint set union (DSU) data structure for efficient island merging and queries.
- For the dynamic version, think about how to efficiently split islands when removing land.
- In the probabilistic version, consider using techniques from percolation theory for analysis.
- Optimize for both time and space complexity, especially for large grids and long simulations.
- For real-world applications, consider implementing visualization tools to help users interpret the results.
