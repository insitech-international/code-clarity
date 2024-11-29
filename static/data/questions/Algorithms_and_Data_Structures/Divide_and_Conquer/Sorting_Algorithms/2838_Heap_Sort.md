# Metadata

- **ID**: 2838
- **Title**: Heap Sort: Efficient Comparison-Based Sorting Using a Binary Heap
- **Difficulty**: Medium
- **Category**: Sorting Algorithms
- **Subcategory**: Comparison Sorts, Tree-Based Sorts
- **Similar Questions**: LeetCode: 215. Kth Largest Element in an Array, 973. K Closest Points to Origin
- **Real Life Domains**: Operating Systems, Database Management, Graph Algorithms, Priority Queues

# Problem Description

Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.

# Versions

## Version 1: Classic Heap Sort

Implement the classic Heap Sort algorithm to sort an array of integers in ascending order.

Example:
- Input: nums = [12, 11, 13, 5, 6, 7]
- Output: [5, 6, 7, 11, 12, 13]

## Version 2: Heap Sort with Custom Comparator

Implement Heap Sort with a custom comparator that allows sorting objects based on multiple criteria.

Example:
- Input: students = [{name: "Alice", grade: 85, age: 22}, {name: "Bob", grade: 92, age: 20}, {name: "Charlie", grade: 85, age: 21}]
- Output: Sorted by grade (descending), then by age (ascending)

## Version 3: External Heap Sort

Design an external sorting algorithm based on Heap Sort for sorting large files that don't fit into memory. Consider how to efficiently manage disk I/O operations and minimize memory usage.

## Version 4: Parallel Heap Sort

Develop a parallel version of Heap Sort that can utilize multiple processors or cores. Consider how to parallelize the heapify process and merge the results efficiently.

## Version 5: Adaptive Heap Sort

Implement an adaptive version of Heap Sort that performs well on partially sorted inputs. This version should detect existing order in the input and adjust its strategy accordingly.

# Real-Life Scenarios

## Scenario 1: Operating System Process Scheduling

An operating system needs to efficiently schedule processes based on their priority and other attributes. Design a Heap Sort-based system that can:

a) Sort processes by priority for CPU allocation
b) Consider process arrival time and execution time in the scheduling decision
c) Implement dynamic priority adjustment based on waiting time (aging)
d) Handle real-time processes with deadline constraints

The system should be able to manage thousands of processes concurrently, with the ability to quickly insert new processes and extract the highest priority process. Consider how to handle priority inversion and ensure fairness in process execution.

## Scenario 2: Network Packet Scheduling in Quality of Service (QoS) Systems

A network router needs to implement Quality of Service by efficiently scheduling packet transmission. Create a Heap Sort-based system that can:

a) Sort packets by priority class (e.g., real-time, interactive, bulk)
b) Consider packet deadline and size in transmission decisions
c) Implement fair queuing among different traffic flows
d) Adapt to changing network conditions and traffic patterns

The system should be able to handle millions of packets per second, with minimal latency for high-priority traffic. Consider how to balance between different QoS requirements and prevent starvation of low-priority traffic.

## Scenario 3: Data Warehouse Query Optimization

A large-scale data warehouse system needs to optimize query execution plans. Develop a Heap Sort-based algorithm that can:

a) Sort potential query plans based on estimated cost
b) Consider multiple factors in cost estimation (CPU usage, I/O operations, memory consumption)
c) Adapt the sorting criteria based on current system load and resource availability
d) Implement a multi-level sort that considers both cost and potential for parallelization

The system should be able to handle complex queries on petabyte-scale databases, with the ability to quickly generate and evaluate thousands of potential execution plans. Consider how to balance between optimization time and potential performance gains.

## Scenario 4: Real-time Stock Trading System

A high-frequency trading platform needs to efficiently manage and execute trade orders. Design a Heap Sort-based system that can:

a) Sort orders by price and timestamp to maintain a fair order book
b) Implement order matching algorithms for different types of orders (market, limit, stop)
c) Handle order cancellations and modifications efficiently
d) Adapt to rapid market changes and high-volume trading periods

The system should be able to process millions of orders per second with microsecond-level latency. Consider how to ensure fairness, prevent market manipulation, and handle regulatory compliance requirements.

# Constraints

- 1 ≤ nums.length ≤ 5 * 10^4
- -5 * 10^4 ≤ nums[i] ≤ 5 * 10^4

# Notes

- Heap Sort has a worst-case and average time complexity of O(n log n), making it efficient for large datasets.
- It sorts in-place, requiring only a constant amount of additional memory.
- Heap Sort is not a stable sort, meaning the relative order of equal elements may change.
- The algorithm can be efficiently used to find the k largest or smallest elements in an array.
- In practice, Heap Sort is often used in hybrid sorting algorithms, combining it with other techniques for improved performance.