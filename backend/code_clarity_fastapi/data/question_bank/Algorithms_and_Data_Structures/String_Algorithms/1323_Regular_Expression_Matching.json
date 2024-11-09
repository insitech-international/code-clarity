{
    "id": 1323,
    "title": "Search Engine Query Pattern Matching",
    "difficulty": "Hard",
    "category": "String Manipulation",
    "subcategory": "Pattern Matching",
    "similar_question": {
        "platforms": [{"Leetcode": 10}, {"HackerRank": "Regex Challenge"}],
        "companies": ["Google", "Microsoft", "Amazon", "Meta", "Spotify"]
    },
    "real_life_domains": ["Search Engines", "Log Analysis", "Data Validation"],
    "scenario": "You are tasked with building an advanced search query system for a search engine platform. The system must allow users to enter complex search patterns, including the use of wildcards ('*' to match multiple characters, '?' to match a single character). Your system should be able to accurately determine whether a query matches a specific set of search results in real-time. Another domain would be developing a system for log file pattern matching where you are required to detect specific logs that match certain error or warning patterns across large files.",
    "task": [
        {
            "description": "Search Engine Query Pattern Matching",
            "details": "Given a user's search query and a set of website names or descriptions, determine whether each website matches the user's search pattern.",
            "input": "Query: 'go*le', Websites: ['google', 'giggle', 'gobble']",
            "output": "['google']",
            "explanation": "The query 'go*le' only matches 'google' because '*' represents multiple characters."
        },
        {
            "description": "Log File Pattern Matching",
            "details": "You are developing a system to analyze server logs and identify specific patterns of error messages, where wildcards ('*', '?') are used to represent variable parts of the error.",
            "input": "Pattern: 'Error: Connection * failed at 10.0.0.1', Logs: ['Error: Connection timeout failed at 10.0.0.1', 'Error: Connection reset failed at 10.0.0.1']",
            "output": "['Error: Connection timeout failed at 10.0.0.1', 'Error: Connection reset failed at 10.0.0.1']",
            "explanation": "Both logs match the pattern because '*' matches variable text."
        }
    ],
    "examples": [
        {
            "input": "Pattern: 'a*b', String: 'aaab'",
            "output": "True",
            "explanation": "'*' matches 'aaa'."
        },
        {
            "input": "Pattern: 'a?b', String: 'acb'",
            "output": "True",
            "explanation": "'?' matches 'c'."
        },
        {
            "input": "Pattern: 'a*', String: 'abcdef'",
            "output": "True",
            "explanation": "'*' matches 'bcdef'."
        }
    ],
    "constraints": [
        "Pattern can include '*' and '?' only",
        "String length is between 1 and 1000 characters",
        "The solution should efficiently handle complex patterns and large sets of strings"
    ]
}
