{
    "id": 716,
    "title": "Non-Overlapping Intervals for Conference Room Scheduling",
    "difficulty": "Medium",
    "category": "Greedy Algorithms",
    "subcategory": "Interval Scheduling",
    "similar_question": {
        "platforms": [{"Leetcode": 435}, "PlatformB"],
        "companies": ["Amazon", "Microsoft", "Apple", "Google", "Bloomberg", "Oracle", "Goldman Sachs", "Uber", "Meta", "Atlassian"]
    },
    "real_life_domains": ["Event Management", "Resource Allocation", "Office Management"], 
    "scenario": "You are tasked with scheduling meetings in a limited number of conference rooms. Each meeting has a specific start and end time. To maximize the use of available rooms, you need to determine the maximum number of meetings that can be scheduled without overlapping. Your goal is to avoid scheduling conflicts and ensure efficient use of resources.",
    "task": "Create an algorithm that finds the maximum number of non-overlapping meetings that can be scheduled given their start and end times.",
    "examples": [
        {
            "input": [[1,2], [2,3], [3,4], [1,3]],
            "output": 3,
            "explanation": "Three meetings can be scheduled: [1,2], [2,3], and [3,4]. The meeting [1,3] overlaps with both [1,2] and [2,3], so it cannot be included."
        },
        {
            "input": [[1,2], [1,2], [1,2]],
            "output": 1,
            "explanation": "All meetings overlap with each other, so only one meeting can be scheduled."
        },
        {
            "input": [[1,2], [3,4], [5,6], [7,8], [5,9]],
            "output": 5,
            "explanation": "Five meetings can be scheduled: [1,2], [3,4], [5,6], [7,8], and [5,9] because [5,9] overlaps with [5,6]."
        }
    ],
    "constraints": [
        "Each meeting is represented by a start and end time, with the start being less than the end.",
        "The input array can contain up to 10^4 meetings."
    ]
}
