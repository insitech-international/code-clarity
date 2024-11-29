# Classroom Allocation: Optimizing Resource Allocation

# Metadata

- **ID**: 21212
- **Title**: Classroom Allocation
- **Difficulty**: Hard
- **Category**: Greedy Algorithms
- **Subcategory**: Activity Selection
- **Similar Questions**: LeetCode: 1386. Cinema Seat Allocation, HackerRank: Classroom Allocation, Project Euler: 48. Maximum Perimeter Triangle, Codeforces: 1520A - School Schedule
- **Real Life Domains**: Educational Planning, Resource Management, Space Optimization

# Problem Description:

Given a set of courses and available classrooms, the objective is to determine the optimal allocation of courses to classrooms while considering constraints such as course durations, classroom capacities, and time slots. The goal is to maximize the utilization of available resources and minimize scheduling conflicts.

# Versions

## Version 1: LeetCode 1386. Cinema Seat Allocation

A cinema has n rows of seats, numbered from 1 to n, and there are ten seats in each row, labeled from 1 to 10 as shown in the figure above.

Given the array `reservedSeats` containing the numbers of seats already reserved, for example, `reservedSeats[i] = [3,8]` means the seat located in row 3 and labeled with 8 is already reserved.

Return the maximum number of four-person groups you can assign to the cinema seats. A four-person group occupies four adjacent seats in one single row. Seats across an aisle (such as `[3,3]` and `[3,4]`) are not considered to be adjacent, but there is an exceptional case where an aisle can split a four-person group, allowing two people on each side.

**Example**

**Input:**

n = 3 reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]

**Output:** 4

Explanation: The figure above shows the optimal allocation for four groups, where seats marked in blue are already reserved and contiguous seats marked in orange are for one group.

**Time Complexity**

The time complexity of this solution is O(m log m), where m is the number of reserved seats. This is due to the sorting operation performed during the initialization of the `rows` dictionary.

**Space Complexity**

The space complexity is O(m) as we need to store all reserved seats in the `rows` dictionary.

## Version 2: HackerRank - Classroom Allocation

There are n courses scheduled. Each course has an integer duration and takes place in a classroom. There are m classrooms available, each with a capacity to hold a specific number of students. All courses take place simultaneously and last for the same duration.

Your task is to allocate the courses to classrooms such that the maximum number of students can be accommodated in total.

Example:

Input: courses = [[100, 20], [200, 30]], maxStudents = 70, minCapacity = 4
Output: 6

## Version 3: Real-Life Classroom Allocation Scenarios

**Scenario 1: University Lecture Hall Scheduling_**

A university has multiple lecture halls with varying capacities. Given a list of courses, their durations, and the required audience sizes:

Allocate courses to lecture halls to maximize overall attendance.
Ensure that the total capacity of assigned rooms equals or exceeds the sum of audience requirements.
Identify potential overflow situations and suggest alternative room assignments.

**Scenario 2: Corporate Training Room Booking_**

A company has several training rooms with different capacities. Given a list of training sessions, their durations, and participant requirements:

Allocate sessions to rooms to maximize overall utilization of training facilities.
Ensure that the capacity of assigned rooms meets or exceeds participant requirements for each session.
Suggest alternative room assignments for sessions that cannot fit in the available rooms.

**Scenario 3: School Event Planning_**

A school needs to plan various events throughout the year. Given a list of events, their durations, and expected attendee counts:

Allocate events to school facilities to maximize overall attendance.
Ensure that the capacity of assigned rooms meets or exceeds expected attendee counts for each event.
Identify potential overbooking situations and suggest alternative venue options.

# Constraints

1 ≤ 𝑛,𝑚 ≤ 2000
1 ≤ 𝑑𝑢𝑟𝑎𝑡𝑖𝑜𝑛 ≤ 1000
1 ≤ 𝑚𝑎𝑥𝑆𝑡𝑢𝑑𝑒𝑛𝑡𝑠 ≤ 10^5
1 ≤ 𝑚𝑖𝑛𝐶𝑎𝑝𝑎𝑐𝑖𝑡𝑦 ≤ 10

# Notes

**Solution Strategy for Resource Allocation**

To solve real-life allocation scenarios efficiently, we can use a combination of greedy algorithms and heuristics:

1. **Sort Items**: Organize courses, sessions, or events by their durations or requirements in descending order.
2. **Initialize Priority Queue**: Maintain a priority queue to track available rooms.
3. **Allocate Resources**:
   - Iterate through the sorted items.
   - Allocate each item to the room with the highest remaining capacity.
   - Update the room's capacity and reinsert it into the priority queue.
4. **Handle Overflows**: Suggest alternative room assignments if necessary.
5. **Capacity Check**: Ensure that the total capacity of assigned rooms meets or exceeds the sum of audience or participant requirements.

**Pseudocode Implementation for Resource Allocation**

```pseudocode
class ResourceAllocator:
    initialize(rooms)
        available_rooms = sorted(rooms in descending order)

    method allocate_resources(items)
        for each item in sorted(items in descending order)
            if available_rooms is not empty
                room = remove highest capacity from available_rooms
                room = room - item (update room capacity)
                if room > 0
                    insert room back into available_rooms
        sort available_rooms in descending order

    method find_overflow_situations()
        // Identify cases where an item cannot fit in any available room
        pass

    method optimize_allocation(items)
        allocate_resources(items)

**Example Usage**
allocator = ResourceAllocator([10, 20, 30])
allocator.optimize_allocation([5, 15, 25])
```
