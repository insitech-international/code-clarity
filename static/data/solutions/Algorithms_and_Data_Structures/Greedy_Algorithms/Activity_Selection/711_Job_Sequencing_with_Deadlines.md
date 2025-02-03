# Job Sequencing: Maximizing Profit

## Metadata

- **ID**: 715
- **Title**: Job Sequencing: Maximizing Profit
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Job Scheduling
- **Similar Questions**:
  - LeetCode: 1235. Maximum Profit in Job Scheduling
  - GeeksforGeeks: Job Sequencing Problem
- **Real Life Domains**: Project Management, Manufacturing, Time Management, Resource Allocation

## Problem Description

You are given a set of jobs. Each job has a deadline and a profit associated with it. The goal is to schedule the jobs in such a way that maximum profit can be obtained. Each job takes 1 unit of time and can only be performed before its deadline.

# Classification Rationale

Greedy algorithm (GA) problems can be broadly classified based on four core characteristics - Problem Domain Specificity, Algorithmic Techniques, Data Structure Focus and Problem Complexicity:

Problem Domain Specificity: This refers to the specific area where GAs are used. E.g: Activity Selection, Task Sheduling - This category of GA deal with scheduling tasks.

This problem is a classical example of an Activity Selection problem and fits the GA approach for a few reasons:

Optimal Substructure: You can break down the problem into smaller parts, solving each part step by step.
Greedy Choice Property: At each step, you can make a choice that seems best at the moment, without worrying about future consequences.
Linear Traversal: You only need to go through the data once to find a solution, which is common in greedy algorithms.
Efficiency: These algorithms can solve problems quickly, often in linear time (O(n)), making them suitable for scheduling.
Resource Management: They help efficiently manage limited resources, like time or fuel.
By using greedy algorithms, we can find optimal solutions to scheduling and other related problems effectively.

## Versions

### Version 1: LeetCode - Maximum Profit in Job Scheduling

You have a list of jobs where each job is represented as a tuple `[start, end, profit]`, meaning that a job starts at time `start`, ends at time `end`, and provides a profit of `profit`. The task is to maximize the profit by scheduling jobs without overlap.

Return the maximum profit possible.

Example:

Input: `jobs = [[1,2,50],[3,5,20],[6,19,100],[2,100,200]]`
Output: 250
Explanation: Schedule jobs `[1,2,50]` and `[6,19,100]` for maximum profit.

### Version 2: GeeksforGeeks - Job Sequencing Problem

Given a set of n jobs where each job i has a deadline and a profit associated with it. Each job takes 1 unit of time to complete and can only be performed before its deadline. The task is to maximize the total profit if only one job can be scheduled at a time.

Example:

Input: `jobs = [(Job 1: profit = 35, deadline = 3), (Job 2: profit = 30, deadline = 4), (Job 3: profit = 25, deadline = 4), (Job 4: profit = 20, deadline = 2), (Job 5: profit = 15, deadline = 3)]`
Output: 80
Explanation: Job sequence: `[Job 1, Job 3, Job 2]` gives maximum profit.

### Version 3: Real-Life Job Scheduling Scenarios

1. **Freelance Project Management**: As a freelancer, you are given multiple projects, each with a deadline and a fixed payment upon completion. The goal is to select projects that maximize your total earnings while ensuring no deadlines are missed.
   a) Schedule the projects to maximize your total income.
   b) Handle urgent projects that must be completed first.
   c) Manage overlapping projects that may require a trade-off between profit and completion time.

2. **Factory Production Line**: A factory is given a set of orders, each with a due date and a profit margin. The objective is to prioritize orders that maximize profit while ensuring no order misses its due date.
   a) Develop a production plan that maximizes profit.
   b) Schedule maintenance windows that least impact high-profit orders.
   c) Minimize idle time between orders.

3. **Contractor Time Management**: A contractor has multiple job offers, each with different pay and deadlines. The contractor has to decide which jobs to take to maximize earnings, while ensuring deadlines are respected.
   a) Prioritize high-paying jobs.
   b) Avoid taking too many jobs that cannot be completed on time.
   c) Handle last-minute urgent tasks that disrupt planned schedules.

For all scenarios, the goal is to implement greedy algorithms that select the most profitable jobs that can be completed within their deadlines.

Example (for Freelance Project Management):

Input:
projects = [
{"id": 1, "name": "Website Design", "payment": 500, "deadline": 3},
{"id": 2, "name": "Mobile App Development", "payment": 1000, "deadline": 1},
{"id": 3, "name": "SEO Optimization", "payment": 300, "deadline": 2},
{"id": 4, "name": "Digital Marketing", "payment": 700, "deadline": 4}
]
time_available = 3 # number of jobs the freelancer can take

Output:
{
"selected_projects": [
{"id": 2, "name": "Mobile App Development", "payment": 1000},
{"id": 3, "name": "SEO Optimization", "payment": 300},
{"id": 1, "name": "Website Design", "payment": 500}
],
"total_payment": 1800,
"unscheduled_projects": [
{"id": 4, "name": "Digital Marketing", "payment": 700}
]
}

## Constraints

- For Version 1:

  - 1 <= jobs.length <= 10^4
  - 0 <= start < end <= 10^9
  - 1 <= profit <= 10^4

- For Version 2:

  - 1 <= jobs.length <= 100
  - 1 <= profit <= 10^5
  - 1 <= deadline <= 100

- For Version 3:
  - Constraints may vary depending on the scenario (e.g., available time, number of projects or orders).

## Notes

- The essence of the job sequencing problem is to make the optimal choice at each step, focusing on maximizing profit without missing any deadlines.
- For Version 1, consider dynamic programming techniques along with sorting based on the ending times of jobs.
- For Version 2, a greedy algorithm works by sorting jobs based on profit and scheduling them in reverse order, ensuring deadlines are met.
- Real-world scenarios might require you to consider more complex constraints such as multitasking, resource availability, or dynamic deadlines.
- While greedy algorithms offer efficient solutions, in some cases they might need to be combined with other approaches to handle more complex scheduling constraints.
