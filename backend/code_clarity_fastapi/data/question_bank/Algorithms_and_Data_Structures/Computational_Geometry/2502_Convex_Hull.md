# Convex Hull

## Metadata

- **ID**: 2502
- **Title**: Convex Hull
- **Difficulty**: Hard
- **Category**: Computational Geometry
- **Subcategory**: Polygon Algorithms
- **Similar Questions**: LeetCode: 587. Erect the Fence, 1924. Erect the Fence II
- **Real Life Domains**: Computer Graphics, Image Processing, Geographic Information Systems (GIS), Robotics

## Problem Description

The Convex Hull problem involves finding the smallest convex polygon that contains all the points in a given set of points in a 2D plane.

## Versions

### Version 1: Graham Scan Algorithm

Implement the Graham Scan algorithm to compute the convex hull of a set of points.

Example:
- Input: [(0,3), (2,2), (1,1), (2,1), (3,0), (0,0), (3,3)]
- Output: [(0,0), (3,0), (3,3), (0,3)]

### Version 2: Jarvis March (Gift Wrapping) Algorithm

Implement the Jarvis March algorithm, also known as the Gift Wrapping algorithm, to compute the convex hull.

Example:
- Input: [(0,3), (2,2), (1,1), (2,1), (3,0), (0,0), (3,3)]
- Output: [(0,0), (3,0), (3,3), (0,3)]

### Version 3: Dynamic Convex Hull

Implement a data structure that maintains the convex hull of a dynamic set of points, supporting point insertion and deletion operations.

Example:
- Initial set: [(0,0), (0,1), (1,0)]
- Insert (1,1): Hull becomes [(0,0), (1,0), (1,1), (0,1)]
- Delete (0,1): Hull becomes [(0,0), (1,0), (1,1)]

### Version 4: 3D Convex Hull

Extend the convex hull algorithm to work with points in 3D space.

Example:
- Input: [(0,0,0), (1,0,0), (0,1,0), (0,0,1), (1,1,1)]
- Output: Faces of the 3D convex hull

## Constraints

- For Version 1 and 2:
  - 3 ≤ n ≤ 10^4, where n is the number of points
  - No three points are collinear

- For Version 3:
  - Support for up to 10^5 operations (insertions/deletions)

- For Version 4:
  - 4 ≤ n ≤ 10^3, where n is the number of points
  - No four points are coplanar

## Notes

- The time complexity of Graham Scan and Jarvis March are O(n log n) and O(nh) respectively, where n is the number of points and h is the number of points on the hull.
- For the dynamic version, consider using a balanced binary search tree to maintain the hull efficiently.
- In 3D, the output is typically a set of triangular faces that form the surface of the convex hull.
- Convex hull algorithms have applications in collision detection, shape analysis, and optimal path finding.
- Be careful about handling edge cases, such as all points being collinear.