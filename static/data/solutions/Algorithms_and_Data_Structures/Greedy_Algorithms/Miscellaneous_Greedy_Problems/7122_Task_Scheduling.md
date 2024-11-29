# Task Scheduling: Optimizing Resource Allocation

## Metadata

- **ID**: 7122
- **Title**: Task Scheduling: Optimizing Resource Allocation
- **Difficulty**: Medium
- **Category**: Greedy Algorithms
- **Subcategory**: Miscellaneous Greedy Problems
- **Similar Questions**: LeetCode: 1353. Maximum Number of Events That Can Be Attended, HackerRank: Greedy Florist
- **Real Life Domains**: Project Management, Resource Allocation, Time Management, Factory Scheduling

# Introduction

Imagine you're a manager responsible for assigning tasks to workers or machines. You want to do this efficiently so that you can get the most work done in the least amount of time, using the resources you have available. This is essentially what resource optimization is about.

## The Basic Idea

The basic idea is to find the best way to allocate limited resources (like workers, machines, or time slots) to various tasks or projects. You want to maximize efficiency, minimize waste, and meet deadlines or goals.

## How to Solve It: The "Keep Moving Forward" Method

1. Start at any gas station.
2. Track your gas as you drive.
3. If you run out, start over from the next station.
4. If you make it all the way around, you've found your starting point!

## Core Similarities and Problem Variations

1. Core Similarity: All these problems involve resource management and optimization in scenarios where resources (fuel, energy, time) are consumed and replenished at various points.

2. Greedy Algorithm Applicability: Greedy algorithms are often effective for these problems because they make locally optimal choices at each step, which often leads to a globally optimal solution in these scenarios.

3. Problem Variations:

   - Version 1 (LeetCode): This is the classic circular route gas station problem, directly solvable with a greedy approach.
   - Version 2 (HackerRank): A linear version of the gas station problem, also amenable to a greedy solution.
   - Version 3 (Real-Life Scenarios): These are more complex variations that build upon the core gas station problem, incorporating additional constraints and variables.

4. Common Greedy Strategy: In all cases, the core greedy strategy involves choosing the best option at each step (e.g., the most efficient starting point, the optimal allocation of resources) without backtracking.

5. Complexity Spectrum: The problems range from simple (Version 1 and 2) to complex (Version 3), but all share the fundamental characteristic of resource management over a series of points or time periods.

While greedy algorithms are often suitable for these problems, it's worth noting that the more complex scenarios in Version 3 might benefit from additional techniques like dynamic programming or advanced scheduling algorithms in conjunction with greedy approaches.

# Classification Rationale

This problem falls under the "Greedy Algorithms" category, specifically in the "Miscellaneous Greedy Problems" subcategory, for the following reasons:

1. **Optimal Substructure**: The problem can be broken down into smaller subproblems, where each decision (selecting a task or event) contributes to the overall optimal solution.

2. **Greedy Choice Property**: At each step, we make the locally optimal choice (e.g., selecting the event that ends earliest or the highest priority task that fits within the remaining capacity) without reconsidering previous choices.

3. **Iterative Decision Making**: The algorithm progresses through the input, making decisions one at a time without backtracking.

4. **Optimization Goal**: The aim is to maximize the number of tasks completed or minimize a cost function, which is characteristic of greedy algorithms.

5. **Sorting as a Pre-processing Step**: Many greedy algorithms for scheduling problems involve sorting the input as a first step, which we see in our solutions.

6. **Unique Problem Structure**: Unlike classical activity selection problems, this problem involves a circular route (in the gas station version) or multiple resource constraints (in the task scheduling versions), which places it in the miscellaneous category.

7. **Multiple Variations**: The problem has several variations (gas stations, events, task scheduling) that all share a common greedy approach but differ in their specific constraints and objectives, making it a more general, miscellaneous greedy problem.

# Pythonic Implementation

Here are the implementations for all three versions of the problem:

```python

from typing import List, Dict
import heapq

### Version 1: LeetCode - Maximum Number of Events That Can Be Attended

class Solution:
    def maxEvents(self, events: List[List[int]]) -> int:
        events.sort(reverse=True)  ### Sort events in reverse order of start time
        heap = []
        day = 0
        attended = 0

        while events or heap:
            if not heap:
                day = events[-1][0]

            while events and events[-1][0] <= day:
                heapq.heappush(heap, events.pop()[1])

            heapq.heappop(heap)
            attended += 1
            day += 1

            while heap and heap[0] < day:
                heapq.heappop(heap)

        return attended

#### Explanation:

1. Sort the events in reverse order of start time.
2. Use a min-heap to keep track of end times of current events.
3. Iterate through each day:
   - Add all events starting on or before the current day to the heap.
   - Attend the event ending earliest (top of the heap).
   - Remove all ended events from the heap.
4. Return the total number of events attended.

Time Complexity: O(NlogN), where N is the number of events.
Space Complexity: O(N) for the heap.

### Version 2: HackerRank - Greedy Florist

def getMinimumCost(k, c):
    c.sort(reverse=True)  ### Sort flower costs in descending order
    total_cost = 0
    for i in range(len(c)):
        total_cost += (i // k + 1) * c[i]
    return total_cost

#### Explanation:

1. Sort the flower costs in descending order.
2. Iterate through the sorted costs:
   - Calculate the multiplier based on the number of flowers already bought by each friend.
   - Add the cost of the current flower multiplied by its multiplier to the total cost.
3. Return the total minimum cost.

Time Complexity: O(NlogN), where N is the number of flowers.
Space Complexity: O(1) (ignoring the space used for sorting).

### Version 3: Real-Life Task Scheduling Scenarios

#### 3.1: Software Development Sprint Planning

def plan_sprint(tasks: List[Dict], team_capacity: int) -> Dict:
    ### Sort tasks by priority (High > Medium > Low) and then by story points (ascending)
    sorted_tasks = sorted(tasks, key=lambda x: (-priority_value(x['priority']), x['story_points']))

    scheduled_tasks = []
    total_story_points = 0
    unscheduled_tasks = []

    for task in sorted_tasks:
        if total_story_points + task['story_points'] <= team_capacity:
            scheduled_tasks.append(task)
            total_story_points += task['story_points']
        else:
            unscheduled_tasks.append(task)

    return {
        "scheduled_tasks": scheduled_tasks,
        "total_story_points": total_story_points,
        "remaining_capacity": team_capacity - total_story_points,
        "unscheduled_tasks": unscheduled_tasks
    }

def priority_value(priority: str) -> int:
    return {"High": 3, "Medium": 2, "Low": 1}.get(priority, 0)

#### Explanation:

1. Sort tasks by priority (High > Medium > Low) and then by story points (ascending).
2. Iterate through sorted tasks:
   - Add tasks to the sprint until team capacity is reached.
   - Keep track of scheduled and unscheduled tasks.
3. Return a dictionary with the sprint plan details.

Time Complexity: O(NlogN), where N is the number of tasks.
Space Complexity: O(N) for storing the sorted and scheduled tasks.

#### 3.2: Factory Production Line Scheduling

def schedule_production(orders: List[Dict], num_production_lines: int) -> Dict: ### Sort orders by deadline
sorted_orders = sorted(orders, key=lambda x: x['deadline'])

    production_lines = [[] for _ in range(num_production_lines)]
    completion_times = [0] * num_production_lines
    scheduled_orders = []
    unscheduled_orders = []

    for order in sorted_orders:
        ### Find the production line that can complete the order earliest
        line_index = min(range(num_production_lines), key=lambda i: completion_times[i])

        if completion_times[line_index] + order['production_time'] <= order['deadline']:
            production_lines[line_index].append(order)
            completion_times[line_index] += order['production_time']
            scheduled_orders.append(order)
        else:
            unscheduled_orders.append(order)

    return {
        "scheduled_orders": scheduled_orders,
        "unscheduled_orders": unscheduled_orders,
        "production_lines": production_lines,
        "completion_times": completion_times
    }

#### Explanation:

1. Sort orders by deadline.
2. Iterate through sorted orders:
   - Find the production line that can complete the order earliest.
   - If the order can be completed before its deadline, schedule it on that line.
   - Otherwise, add it to unscheduled orders.
3. Return a dictionary with the production schedule details.

Time Complexity: O(NlogN + NM), where N is the number of orders and M is the number of production lines.
Space Complexity: O(N + M) for storing the sorted orders and production line schedules.

#### 3.3: University Course Timetabling

def schedule_courses(courses: List[Dict], time_slots: List[str], rooms: List[str]) -> Dict: ### Sort courses by the number of students (descending) to prioritize larger classes
sorted_courses = sorted(courses, key=lambda x: x['num_students'], reverse=True)

    schedule = {room: {slot: None for slot in time_slots} for room in rooms}
    scheduled_courses = []
    unscheduled_courses = []

    for course in sorted_courses:
        scheduled = False
        for room in rooms:
            if course['num_students'] <= room['capacity']:
                for slot in time_slots:
                    if schedule[room['name']][slot] is None:
                        schedule[room['name']][slot] = course
                        scheduled_courses.append(course)
                        scheduled = True
                        break
            if scheduled:
                break

        if not scheduled:
            unscheduled_courses.append(course)

    return {
        "schedule": schedule,
        "scheduled_courses": scheduled_courses,
        "unscheduled_courses": unscheduled_courses
    }

#### Explanation:

1. Sort courses by the number of students (descending) to prioritize larger classes.
2. Iterate through sorted courses:
   - Find a suitable room and time slot for each course.
   - If a slot is found, schedule the course.
   - Otherwise, add it to unscheduled courses.
3. Return a dictionary with the course schedule details.

Time Complexity: O(NlogN + NMT), where N is the number of courses, M is the number of rooms, and T is the number of time slots.
Space Complexity: O(N + MT) for storing the sorted courses and the schedule.

## Real-world Considerations

- **Task Dependencies**: In real scenarios, tasks often have dependencies. Consider using a topological sort to handle dependencies before applying the greedy algorithm.
- **Resource Constraints**: Real-world problems might have multiple resource constraints (e.g., different skill sets in software development). Implement a more complex resource allocation system if needed.
- **Dynamic Priority Changes**: Implement a system to handle priority changes mid-sprint or mid-production.
- **Optimization Goals**: Real-world scenarios often have multiple, sometimes conflicting, optimization goals. Consider using multi-objective optimization techniques or weighted scoring systems.
- **Uncertainty and Risk**: Incorporate risk assessment and buffers in scheduling to account for unexpected delays or issues.
- **Continuous Optimization**: Implement a system for continuous monitoring and re-optimization of schedules as conditions change.

Remember, while these greedy algorithms provide good solutions, they may not always yield the optimal solution for all scenarios. For more complex real-world problems, consider combining greedy approaches with other techniques like dynamic programming, constraint programming, or even machine learning-based approaches.

```

# Mathematical Abstraction

Let's define the problem mathematically for the general case of task scheduling:

Given a set of tasks T = {t₁, t₂, ..., tₙ}, where each task tᵢ is characterized by:

- sᵢ: start time
- eᵢ: end time (or deadline)
- pᵢ: priority (or value)

And given a set of resources R = {r₁, r₂, ..., rₘ}, each with capacity cⱼ.

The goal is to find a subset S ⊆ T and an assignment function f: S → R that maximizes:

Σ(tᵢ ∈ S) pᵢ

Subject to the constraints:

1. ∀tᵢ, tⱼ ∈ S, i ≠ j: eᵢ ≤ sⱼ or eⱼ ≤ sᵢ (non-overlapping tasks)
2. ∀rₖ ∈ R: Σ(tᵢ ∈ S, f(tᵢ) = rₖ) 1 ≤ cₖ (resource capacity constraint)

For the specific case of maximizing the number of events attended (Version 1), this simplifies to maximizing |S| with pᵢ = 1 for all tasks and |R| = 1 with c₁ = 1.

# Real World Analogies

1. **Buffet Line Optimization**
   Imagine a buffet where dishes are constantly being replaced. Each dish has a "freshness window" (start and end time). You want to taste as many dishes as possible, but you can only eat one at a time. This is analogous to the event attendance problem, where you're trying to maximize the number of "fresh" dishes you can taste.

2. **TV Show Recording with a Single DVR**
   You have a list of TV shows with their start and end times, but only one DVR. You want to record as many shows as possible. This directly maps to the event scheduling problem, where each show is an event and the DVR is your single resource.

3. **Airport Runway Scheduling**
   An airport has to schedule landings for incoming flights. Each flight has a time window during which it can land safely (based on fuel). The runway is the resource, and the goal is to safely land as many planes as possible within their respective time windows.

# Storytelling Approach

The Time Traveler's Dilemma

Once upon a time, there was a time traveler named Alex who discovered an amazing yet limited power. Alex could visit any historical event, but with three catches:

1. They could only stay at an event from its start to its end.
2. They couldn't be at two events simultaneously.
3. Their time machine needed recalibration after each jump, so they could only attend events in chronological order.

Alex had a list of all the exciting events in history with their start and end times. Their goal was to witness as many events as possible during their grand time-traveling adventure.

Alex realized they needed a clever strategy. They decided to:

1. Sort all events by their end times.
2. Start with the event that ended earliest.
3. After each event, jump to the next event that started after the current one ended.

By following this strategy, Alex maximized the number of historical events they could attend, making their time-traveling adventure as rich and varied as possible.

This story mirrors our event scheduling algorithm, where Alex is our scheduler, historical events are our tasks, and Alex's strategy is our greedy algorithm.

# Visual Representation

Here's a textual representation of how the algorithm would process a set of events, along with a stepwise guide on how it solves the problem:

```
Events: [(1,4), (2,5), (3,6), (4,7), (5,8), (6,9)]
Timeline: 1  2  3  4  5  6  7  8  9
Event 1:  [-----]
Event 2:     [-----]
Event 3:        [-----]
Event 4:           [-----]
Event 5:              [-----]
Event 6:                 [-----]

Stepwise Guide:

Step 1: Sort events by end time
The events are already sorted in this case. If they weren't, we would sort them based on their end times in ascending order.

Step 2: Initialize variables
current_time = 0
events_attended = 0

Step 3: Iterate through sorted events
For each event (start, end):
    If start >= current_time:
        Attend this event
        current_time = end
        events_attended += 1

Processing:
1. Event (1,4): start (1) >= current_time (0), so attend
   current_time = 4, events_attended = 1
   Timeline: 1  2  3  4  5  6  7  8  9
             [-----]

2. Event (2,5): start (2) < current_time (4), skip

3. Event (3,6): start (3) < current_time (4), skip

4. Event (4,7): start (4) >= current_time (4), so attend
   current_time = 7, events_attended = 2
   Timeline: 1  2  3  4  5  6  7  8  9
             [-----]     [-----]

5. Event (5,8): start (5) < current_time (7), skip

6. Event (6,9): start (6) < current_time (7), skip

Step 4: Return result
events_attended = 2

Final Result: Attended 2 events - (1,4), (4,7)

This approach ensures we always choose the event that ends earliest among the available options at each step, maximizing the number of non-overlapping events we can attend.
```

This visual representation and stepwise guide demonstrate how the greedy algorithm processes the events one by one, always making the locally optimal choice (the event that ends earliest and doesn't overlap with previously chosen events). This approach leads to the globally optimal solution of attending the maximum number of non-overlapping events.
