# Point in Polygon

## Metadata

- **ID**: 2504
- **Title**: Point in Polygon
- **Difficulty**: Medium
- **Category**: Computational Geometry
- **Subcategory**: Polygon Algorithms
- **Similar Questions**: LeetCode: 1453. Maximum Number of Darts Inside of a Circular Dartboard
- **Real Life Domains**: Geographic Information Systems (GIS), Computer Graphics, Game Development, Robotics

## Problem Description

The Point in Polygon problem involves determining whether a given point lies inside, outside, or on the boundary of a polygon.

## Versions

### Version 1: Ray Casting Algorithm

Implement the ray casting algorithm to determine if a point is inside a simple polygon (not self-intersecting).

Example:
- Input: 
  Polygon: [(0,0), (2,0), (2,2), (0,2)]
  Point: (1,1)
- Output: Inside

### Version 2: Winding Number Algorithm

Implement the winding number algorithm, which works for both simple and complex (self-intersecting) polygons.

Example:
- Input:
  Polygon: [(0,0), (2,0), (1,1), (2,2), (0,2), (1,1)]
  Point: (1,0.5)
- Output: Inside

### Version 3: Points in Polygon

Given a polygon and a set of points, efficiently determine which points are inside the polygon.

Example:
- Input:
  Polygon: [(0,0), (4,0), (4,4), (0,4)]
  Points: [(2,2), (3,1), (5,2), (1,3)]
- Output: [Inside, Inside, Outside, Inside]

### Version 4: Polygon Containment

Determine if one polygon is completely contained within another polygon.

Example:
- Input:
  Polygon1: [(0,0), (3,0), (3,3), (0,3)]
  Polygon2: [(1,1), (2,1), (2,2), (1,2)]
- Output: Polygon2 is contained within Polygon1

## Constraints

- For Version 1 and 2:
  - The polygon has 3 to 1000 vertices
  - Coordinates are integers in the range [-10^4, 10^4]

- For Version 3:
  - The polygon has 3 to 1000 vertices
  - Up to 10^5 points to check

- For Version 4:
  - Each polygon has 3 to 1000 vertices
  - Coordinates are floats in the range [-1000, 1000]

## Notes

- The ray casting algorithm works by casting a ray from the point and counting intersections with polygon edges.
- The winding number algorithm is more robust for complex polygons but can be more computationally intensive.
- For checking multiple points, consider preprocessing the polygon to speed up point location queries.
- In the polygon containment problem, you might need to check if all vertices of one polygon are inside the other and if there are no intersections between edges.
- Be careful about edge cases, such as points exactly on edges or vertices.
- These algorithms have applications in geographic analysis, computer graphics (e.g., determining if a mouse click is inside a button), and collision detection in games.
- Consider floating-point precision issues, especially when dealing with edge cases or very large coordinates.