**Activity Selection: Efficient Meeting Scheduling**

# Metadata

- **ID**: 212101
- **Title**: Activity Selection: Efficient Meeting Scheduling
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Activity Selection
- **Similar Questions**: LeetCode (252. Meeting Rooms), GeeksforGeek (Activity Selection Problem)
- **Real Life Domains**: Resource Management, Event Planning, Time Management, Project Scheduling

# Problem Description

You are given a set of activities with their start and finish times. The goal is to select the maximum number of non-overlapping activities that can be performed by a single person or allocated to a single resource.

# Versions

## Version 1: LeetCode - Meeting Rooms

Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

Example 1:

- Input: intervals = [[0,30],[5,10],[15,20]]
- Output: false
- Explanation: The person cannot attend all meetings as there are overlaps.

Example 2:

- Input: intervals = [[7,10],[2,4]]
- Output: true
- Explanation: The person can attend all meetings as there are no overlaps.

## Version 2: GeeksforGeeks - Activity Selection Problem

You are given n activities with their start and finish times. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.

Example:

- Input:
  start[] = {1, 3, 0, 5, 8, 5}
  finish[] = {2, 4, 6, 7, 9, 9}
- Output: 4
- Explanation: The maximum set of activities that can be executed is {0, 1, 3, 4}
  [Note: Activity indexes are from 0 to n-1 for this example]

## Version 3: Real-Life Scheduling Scenarios

**Scenario 1: Conference Talk Scheduling**:
You're organizing a single-track conference and have received more talk proposals than the available time slots. Given a list of proposed talks with their durations:
a) Determine the maximum number of talks that can be scheduled.
b) Create an optimal schedule that maximizes the number of talks.
c) If there are multiple optimal solutions, prioritize diversity (e.g., different speakers or topics).

**Scenario 2: Project Task Sequencing**:
In a project with multiple tasks, each task has a start time, duration, and a set of prerequisites. Given these constraints:
a) Determine the maximum number of tasks that can be completed by a single team.
b) Create a schedule that maximizes task completion while respecting prerequisites.
c) Identify critical path tasks that, if delayed, would affect the project timeline.

**Scenario 3: Shared Equipment Allocation in a Lab**:
A research lab has expensive equipment that must be shared among multiple experiments. Given a list of experiment requests with start times and durations:
a) Determine the maximum number of experiments that can be run.
b) Create an allocation schedule for the equipment.
c) Suggest optimal maintenance windows that minimize disruption to experiments.

For all scenarios, develop greedy algorithms that efficiently handle the scheduling challenges while considering real-world constraints and optimization goals.

Example (for Conference Talk Scheduling):

```python
Input:
talks = [
    {"id": 1, "title": "AI Ethics", "duration": 30, "speaker": "Dr. Smith"},
    {"id": 2, "title": "Quantum Computing", "duration": 45, "speaker": "Prof. Johnson"},
    {"id": 3, "title": "Blockchain", "duration": 30, "speaker": "Ms. Lee"},
    {"id": 4, "title": "Cybersecurity", "duration": 40, "speaker": "Mr. Brown"},
    {"id": 5, "title": "IoT", "duration": 35, "speaker": "Dr. Garcia"}
]
total_available_time = 120  # minutes

Output:
{
    "max_talks": 3,
    "schedule": [
        {"id": 1, "title": "AI Ethics", "start_time": 0, "end_time": 30},
        {"id": 3, "title": "Blockchain", "start_time": 30, "end_time": 60},
        {"id": 5, "title": "IoT", "start_time": 60, "end_time": 95}
    ],
    "unused_time": 25
}
```

# Constraints

- For all versions:

  - 0 <= start < end
  - 1 <= number of activities <= 10^5
  - All start and end times are non-negative integers.

- For Version 3:
  - Additional constraints may apply based on the specific scenario (e.g., prerequisites, equipment limitations).

# Notes

- The core principle of the Activity Selection problem is to greedily select the next activity with the earliest finish time that doesn't overlap with the previously selected activity.
- Consider using sorting as a pre-processing step to order activities by finish time.
- In real-world scenarios, consider additional factors like setup time between activities, priority of certain activities, or the possibility of partial overlaps.
- For the project task sequencing scenario, you may need to combine the greedy approach with topological sorting to handle prerequisites.
- In practical applications, the algorithm should be able to handle dynamic updates (new activities, cancellations) efficiently.
- While the greedy approach often yields optimal results for basic activity selection, more complex scenarios might require dynamic programming or other advanced techniques to handle all constraints.
