# Line Intersection

## Metadata

- **ID**: 2503
- **Title**: Line Intersection
- **Difficulty**: Medium
- **Category**: Computational Geometry
- **Subcategory**: Line Algorithms
- **Similar Questions**: LeetCode: 1232. Check If It Is a Straight Line, 149. Max Points on a Line
- **Real Life Domains**: Computer Graphics, Game Development, GIS, Computer-Aided Design (CAD)

## Problem Description

The Line Intersection problem involves determining if and where two or more lines intersect in a 2D or 3D space.

## Versions

### Version 1: 2D Line Segment Intersection

Given two line segments in 2D space, determine if they intersect and if so, find the point of intersection.

Example:
- Input: Line1 = [(0,0), (2,2)], Line2 = [(0,2), (2,0)]
- Output: Intersects at (1,1)

### Version 2: Multiple Line Intersections

Given a set of line segments in 2D space, find all intersection points among them.

Example:
- Input: [(0,0,2,2), (0,2,2,0), (1,0,1,2)]
- Output: [(1,1), (1,1)]

### Version 3: Ray Casting

Implement a ray casting algorithm. Given a ray (a line with a starting point that extends infinitely in one direction) and a set of line segments, find the first intersection point of the ray with any of the line segments.

Example:
- Input: 
  Ray: Start = (0,0), Direction = (1,1)
  Segments: [(1,0,2,2), (3,0,3,3), (0,2,2,2)]
- Output: Intersection at (1,1) with segment (1,0,2,2)

### Version 4: 3D Line Intersection

Extend the line intersection algorithm to work with lines in 3D space.

Example:
- Input:
  Line1: Point = (0,0,0), Direction = (1,1,1)
  Line2: Point = (1,0,1), Direction = (0,1,0)
- Output: Intersects at (1,1,1)

## Constraints

- For Version 1 and 2:
  - Coordinates are integers in the range [-10^4, 10^4]
  - No more than 1000 line segments in Version 2

- For Version 3:
  - The ray's starting point is within the range [-10^4, 10^4]
  - Up to 1000 line segments

- For Version 4:
  - Coordinates and direction vectors are floats in the range [-1000, 1000]

## Notes

- For 2D line intersection, consider using the cross product method or the slope-intercept form of lines.
- In the multiple line intersections problem, an efficient sweep line algorithm can be used to reduce time complexity.
- Ray casting is fundamental in computer graphics for rendering and collision detection.
- 3D line intersection is more complex as lines might not intersect even if they're not parallel. Consider finding the point of closest approach.
- Be careful about floating-point precision issues, especially in 3D calculations.
- These algorithms have wide applications in computer graphics, gaming, and geometric modeling software.