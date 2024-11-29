# Title
Student Performance Ranking

# Difficulty
Hard

# Category
Advanced Data Structure

# Subcategory
Segment Tree and BIT Manipulation

# Similar Questions
{"LeetCode": "315(Count of Smaller Numbers After Self)", "HackerRank": 1}

# Real Life Domains
Education, Data Analysis, Performance Evaluation

# Version 1
LeetCode Version
Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

Example 1:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]

Example 2:
Input: nums = [-1]
Output: [0]

# Version 2
School Performance Analysis
Imagine you're a school administrator tasked with analyzing student performance across various subjects. You have collected data on the final exam scores of all students in a particular class. Now, you need to create a report that shows how many students scored lower than each individual student in their subject-specific ranking.

Example 1:
Input: [85, 90, 75, 95, 80]
Output: [2, 1, 3, 0, 1]

# Version 3
Corporate Employee Ranking
In a large corporation, HR wants to analyze employee performance based on their annual review scores. They need to determine, for each employee, how many of their peers (hired after them) have lower performance scores.

Example 1:
Input: [7.5, 8.2, 6.9, 9.0, 7.8]
Output: [2, 1, 3, 0, 1]

# Constraints
1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4