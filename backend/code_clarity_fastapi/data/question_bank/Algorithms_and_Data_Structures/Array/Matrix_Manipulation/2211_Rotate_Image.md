**Rotate Image**

# Metadata

- **ID**: 2211
- **Title**: Rotate Image
- **Difficulty**: Medium
- **Category**: Array
- **Subcategory**: Matrix Manipulation
- **Similar Questions**: LeetCode: 48. Rotate Image, HackerRank: Matrix Rotation, CodeForces: Rotate Matrix
- **Real Life Domains**: Image Processing, Computer Graphics, Satellite Imaging

# Problem Description

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

This problem involves manipulating a 2D array (matrix) to achieve a 90-degree clockwise rotation. The key aspects of this problem are:

1. In-place rotation: You must modify the original matrix without using additional space (except for a few variables).
2. Understanding the pattern: How elements move during a 90-degree rotation.
3. Handling different sizes of matrices: The solution should work for any n x n matrix.

The rotation can be achieved through a combination of transformations:
1. Transpose the matrix (swap elements across the main diagonal)
2. Reverse each row

Alternatively, it can be done in a single pass by rotating four elements at a time in a circular manner.

# Versions

## Version 1: Classic 90-degree Clockwise Rotation

Rotate the given matrix 90 degrees clockwise.

Example:

Input: 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
Output:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]

## Version 2: Arbitrary Degree Rotation

Rotate the matrix by k * 90 degrees clockwise, where k is a given integer.

Example:

Input: 
matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
k = 2

Output:
[
  [9,8,7],
  [6,5,4],
  [3,2,1]
]

## Version 3: Spiral Rotation

Rotate the outer layers of the matrix clockwise by one position, creating a spiral effect.

Example:

Input:
[
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
]

Output:
[
  [5,1,2,3],
  [9,10,6,4],
  [13,11,7,8],
  [14,15,16,12]
]

## Version 4: Real-Life Scenarios

### Scenario 1: Satellite Image Processing

You're developing software for processing satellite imagery:

a) Implement an algorithm to rotate satellite images to align them with map coordinates.
b) Extend the algorithm to handle arbitrary rotation angles for images taken from different orbital positions.
c) Develop a feature to create spiral scan visualizations of circular weather patterns like hurricanes.

Implementation considerations:
- Optimize for very large images (matrices with millions of elements).
- Implement interpolation techniques for non-90-degree rotations to maintain image quality.
- Handle metadata like geotags and timestamps that need to be transformed along with the image.

### Scenario 2: Robotic Arm Control

You're programming a robotic arm for a manufacturing plant:

a) Create an algorithm to rotate the arm's end-effector orientation by 90 degrees.
b) Modify the algorithm to rotate the end-effector by arbitrary angles for precise positioning.
c) Implement a spiral movement pattern for tasks like applying sealant or paint.

Implementation considerations:
- Ensure high precision to meet manufacturing tolerances.
- Optimize for real-time performance to allow smooth, continuous motion.
- Incorporate collision detection to prevent the arm from hitting obstacles during rotation.

### Scenario 3: Game Development (Tetris-like Puzzle Game)

You're creating a block-rotating puzzle game:

a) Develop an algorithm to rotate game pieces (represented as matrices) clockwise.
b) Extend the system to allow players to rotate pieces by varying degrees (90, 180, 270).
c) Create a special game mode where pieces undergo a spiral transformation.

Implementation considerations:
- Optimize for real-time performance on mobile devices.
- Implement collision detection to prevent rotated pieces from overlapping with placed blocks.
- Create smooth animations for the rotation process.

# Constraints

- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000
- Time limit: 1 second

# Notes

- The key to solving this problem efficiently is to recognize the pattern of how elements move during rotation.
- For the basic 90-degree rotation, you can use the formula: rotated[j][n-1-i] = original[i][j]
- Be careful about the order of operations when rotating in-place to avoid overwriting values before they're used.
- For arbitrary angle rotations, consider breaking it down into 90-degree rotations or use trigonometric functions.
- In real-world applications, consider issues like maintaining aspect ratios and handling interpolation for image quality.

**Pseudo-code for Basic 90-degree Rotation**

```
function rotate(matrix):
    n = matrix.length
    
    // Transpose the matrix
    for i in range(n):
        for j in range(i, n):
            temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
    
    // Reverse each row
    for i in range(n):
        for j in range(n/2):
            temp = matrix[i][j]
            matrix[i][j] = matrix[i][n-1-j]
            matrix[i][n-1-j] = temp
```

This pseudo-code demonstrates the two-step approach of transposing and then reversing rows. It can be adapted for the various versions and real-life scenarios described above.