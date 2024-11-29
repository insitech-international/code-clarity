**Spiral Matrix**

# Metadata

- **ID**: 2221
- **Title**: Spiral Matrix
- **Difficulty**: Medium
- **Category**: Array
- **Subcategory**: Matrix Traversal
- **Similar Questions**: LeetCode: 54. Spiral Matrix, HackerRank: Print Spiral Array, CodeForces: Spiral Walk
- **Real Life Domains**: Data Visualization, Robotics, Image Processing

# Problem Description

Given an m x n matrix, return all elements of the matrix in spiral order.

This problem involves traversing a 2D array (matrix) in a spiral pattern, starting from the top-left corner and moving clockwise. The key aspects of this problem are:

1. Understanding the spiral pattern: Moving right, then down, then left, then up, and repeating.
2. Keeping track of boundaries: As you traverse, the boundaries of the unvisited portion of the matrix shrink.
3. Handling different matrix shapes: The solution should work for both square and rectangular matrices.

The traversal typically involves four steps in each cycle:

1. Traverse from left to right
2. Traverse from top to bottom
3. Traverse from right to left
4. Traverse from bottom to top

Each step needs to check if there are still elements to be traversed in that direction.

# Versions

### Version 1: Classic Spiral Matrix

Return all elements of the matrix in spiral order.

Example:

Input:
[
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]
]
Output: [1,2,3,6,9,8,7,4,5]

### Version 2: Generate Spiral Matrix

Given an integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.

Example:

Input: n = 3
Output:
[
[1,2,3],
[8,9,4],
[7,6,5]
]

### Version 3: Spiral Matrix III

You start at the cell (rStart, cStart) of an rows x cols grid facing east. Return a list of coordinates representing the positions of the grid in the order they were visited.

Example:

Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]

## Version 4: Real-Life Scenarios

### Scenario 1: Robotic Vacuum Path Planning

You're designing a path planning algorithm for a robotic vacuum cleaner:

a) Implement an algorithm to generate a spiral cleaning pattern for rectangular rooms.
b) Extend the algorithm to generate an outward spiral pattern starting from the center of the room.
c) Develop a feature to handle rooms with obstacles, adjusting the spiral pattern accordingly.

Implementation considerations:

- Optimize for rooms of varying sizes and shapes.
- Incorporate sensor data to detect and avoid obstacles in real-time.
- Implement efficiency measures to minimize overlap in the cleaning path.

### Scenario 2: Data Visualization for Hard Drive Defragmentation

You're creating a visualization tool for a disk defragmentation software:

a) Design an algorithm to display file fragments in a spiral pattern, representing the disk sectors.
b) Modify the algorithm to highlight file fragments that need to be moved for optimal arrangement.
c) Implement an animation that shows the defragmentation process as a transformation of the spiral pattern.

Implementation considerations:

- Handle very large disks with millions of sectors.
- Implement zooming and panning features for detailed inspection.
- Optimize rendering for smooth real-time updates during the defragmentation process.

### Scenario 3: Spiral Antenna Design

You're developing software for designing spiral antennas:

a) Create an algorithm to generate a spiral pattern for a flat antenna design.
b) Extend the algorithm to create 3D spiral patterns for helical antennas.
c) Implement a feature to optimize the spiral parameters for specific frequency ranges.

Implementation considerations:

- Ensure high precision to meet antenna design specifications.
- Implement calculations for electromagnetic properties along the spiral path.
- Create visualizations of radiation patterns based on the spiral design.

# Constraints

- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100
- Time limit: 1 second

# Notes

- Keep track of four variables: top, bottom, left, and right boundaries of the current sub-matrix.
- Update these boundaries after each complete cycle of the spiral.
- Be careful about the exit condition - make sure to handle both even and odd dimensioned matrices correctly.
- For generating spiral matrices, consider using a direction array to simplify the logic.
- In real-world applications, consider optimizations for very large matrices and handling of sparse matrices.

**Pseudo-code for Basic Spiral Traversal**

```
function spiralOrder(matrix):
    result = []
    if matrix is empty:
        return result

    top, bottom = 0, matrix.length - 1
    left, right = 0, matrix[0].length - 1

    while top <= bottom and left <= right:
        // Traverse right
        for col from left to right:
            result.append(matrix[top][col])
        top++

        // Traverse down
        for row from top to bottom:
            result.append(matrix[row][right])
        right--

        if top <= bottom:
            // Traverse left
            for col from right to left:
                result.append(matrix[bottom][col])
            bottom--

        if left <= right:
            // Traverse up
            for row from bottom to top:
                result.append(matrix[row][left])
            left++

    return result
```

This pseudo-code demonstrates the basic approach for spiral traversal. It can be adapted for the various versions and real-life scenarios described above.
