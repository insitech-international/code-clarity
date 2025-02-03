# Metadata

- **ID**: 2826
- **Title**: Linear Search: Simple Sequential Search Algorithm
- **Difficulty**: Easy
- **Category**: Searching Algorithms
- **Subcategory**: Sequential Search
- **Similar Questions**: LeetCode: 704. Binary Search, 1295. Find Numbers with Even Number of Digits
- **Real Life Domains**: File Systems, Small Datasets, Unsorted Data, Real-time Systems

# Problem Description

Linear Search is the simplest searching algorithm that sequentially checks each element of the list until a match is found or the whole list has been searched.

# Versions

## Version 1: Basic Linear Search

Implement the basic Linear Search algorithm for searching a key in an array of integers.

Example:
- Input: nums = [4, 2, 7, 1, 9, 5], target = 7
- Output: 2 (index of target)

## Version 2: Linear Search with Sentinel

Implement Linear Search using a sentinel to eliminate the need for boundary checking in each iteration.

## Version 3: Linear Search on Multiple Criteria

Modify the Linear Search algorithm to search based on multiple criteria simultaneously.

## Version 4: Parallel Linear Search

Develop a parallel version of Linear Search that can utilize multiple processors or cores.

## Version 5: Adaptive Linear Search

Create an adaptive Linear Search that learns from previous searches to improve performance on subsequent searches.

# Real-Life Scenarios

## Scenario 1: File System Search

A file system needs to search for files based on various attributes. Design a Linear Search-based system that can:

a) Search for files based on name, type, size, or modification date
b) Handle hierarchical directory structures
c) Support wildcard and regex pattern matching
d) Provide real-time results as the search progresses

The system should work efficiently for personal computers and small servers with thousands of files.

## Scenario 2: Network Packet Inspection

A network security system needs to inspect packets for potential threats. Create a Linear Search-based algorithm that can:

a) Search packet payloads for specific byte patterns or signatures
b) Handle variable-length packets and fragmented data
c) Support multiple simultaneous pattern matches
d) Adapt to new threat signatures in real-time

The algorithm should process network traffic in real-time for small to medium-sized networks.

## Scenario 3: IoT Sensor Data Monitoring

An IoT system needs to monitor sensor data for specific conditions. Develop a Linear Search-based system that can:

a) Search through real-time sensor data streams for anomalies or specific patterns
b) Handle multiple sensor types with different data formats
c) Support sliding window searches for time-based patterns
d) Adapt to changing normal baselines for each sensor

The system should work efficiently for networks of hundreds of sensors, providing real-time alerts and analysis.

# Constraints

- 1 ≤ nums.length ≤ 10^4
- -10^4 < nums[i], target < 10^4

# Notes

- Linear Search has a time complexity of O(n), making it efficient for small datasets or unsorted data.
- It's simple to implement and doesn't require the data to be sorted.
- Linear Search can be more efficient than complex algorithms for small datasets due to lower constant factors.
- Consider using Linear Search when the dataset is small, unsorted, or when simplicity is preferred over optimization.