{
    "id": 112,
    "title": "Financial Transaction Analysis System Using 'Range Sum Query Mutable'",
    "difficulty": "Hard",
    "category": "Advanced Data Structure",
    "subcategory": "Segment Tree and BIT Manipulation",
        "similar_question": {
        "platforms": [{"LeetCode": 307}, {"HackerRank": 1}],
        "companies": [""]
    },
    "real_life_domains": [""],
    "scenario": [
        "Imagine you're working for a large financial institution that processes millions of transactions daily. You need to develop a system that can efficiently handle two main operations:",
        "1. Updating transaction amounts",
        "2. Calculating the total value of transactions within a specific time range",

        "The system should be able to perform these operations quickly, even with a massive volume of data."
    ],
    "task": [
        "Your task is to design a system that can:",
        "1. Store a large array of transaction amounts",
        "2. Quickly update individual transaction amounts",
        "3. Efficiently calculate the sum of transaction amounts within any given date range."
],
    "examples": [
        "Let's say we have the following list of exam scores for a math class:",
    "[85, 90, 75, 95, 80]",
    "Your task would be to generate a new list based on this input, where each value represents the count of students scoring lower than that student in the overall class ranking.",
"Expected Output:",
"[2, 1, 3, 0, 1]",

"Explanation:",
"To the right of 85, there are 2 students (90 and 75) who scored higher.",
"To the right of 90, there is only 1 student (95) who scored higher.",
"To the right of 75, there are 3 students (85, 90, and 95) who scored higher.",
"To the right of 95, there are 0 students who scored higher.",
"To the right of 80, there is 1 student (85) who scored higher."
],

"constraints": [
"1 <= nums.length <= 10^5",
"-10^4 <= nums[i] <= 10^4"  
]
}