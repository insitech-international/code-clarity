# Metadata

- **ID**: 201
- **Title**: Bloom Filter: Probabilistic Set Membership
- **Difficulty**: Hard
- **Category**: Advanced Data Structures
- **Subcategory**: Probabilistic Data Structures
- **Similar Questions**: LeetCode: 705. Design HashSet, HackerRank: Spell Checker
- **Real Life Domains**: Web Crawling, Database Systems, Network Security, Caching Systems

# Problem Description

A Bloom filter is a space-efficient probabilistic data structure used to test whether an element is a member of a set. It can have false positive matches but no false negatives. The challenge is to implement a Bloom filter and use it to solve various set membership problems efficiently.

# Versions

## Version 1: Basic Bloom Filter Implementation

Implement a Bloom filter with the following operations:
1. `add(item)`: Add an item to the set.
2. `contains(item)`: Check if an item might be in the set.
3. `union(other_filter)`: Merge two Bloom filters.

Example:
```python
bloom_filter = BloomFilter(size=1000, hash_functions=3)
bloom_filter.add("apple")
bloom_filter.add("banana")
print(bloom_filter.contains("apple"))  # True
print(bloom_filter.contains("cherry"))  # False (or True, with small probability)
```

## Version 2: Web Crawler URL Deduplication

You're building a web crawler. To avoid revisiting the same URLs, implement a Bloom filter-based system to keep track of visited URLs. The system should:

1. Efficiently store visited URLs.
2. Quickly check if a URL has been visited before.
3. Minimize memory usage while handling millions of URLs.

Example:
```python
crawler = WebCrawler(bloom_filter_size=10_000_000, hash_functions=5)
crawler.visit("https://example.com")
print(crawler.has_visited("https://example.com"))  # True
print(crawler.has_visited("https://newsite.com"))  # False
```

## Version 3: Distributed Spell Checker

Design a distributed spell checker using Bloom filters. The system should:

1. Efficiently store a large dictionary (millions of words) across multiple servers.
2. Quickly check if a word is likely to be in the dictionary.
3. Minimize network communication for spell-checking operations.
4. Handle updates to the dictionary without full recomputation.

Example:
```python
spell_checker = DistributedSpellChecker(servers=5, words_per_server=1_000_000)
spell_checker.add_to_dictionary("cryptocurrency")
print(spell_checker.is_word_valid("cryptocurrency"))  # True
print(spell_checker.is_word_valid("cryptocurency"))   # False
```

# Constraints

- For all versions:
  - 1 ≤ number of items ≤ 10^9
  - 1 ≤ size of Bloom filter ≤ 10^8
  - 1 ≤ number of hash functions ≤ 20

- For Version 2:
  - URLs are valid and unique strings
  - Maximum URL length: 2048 characters

- For Version 3:
  - Words consist of lowercase English letters only
  - 1 ≤ word length ≤ 50
  - 1 ≤ number of servers ≤ 100

# Notes

- The false positive rate of a Bloom filter can be adjusted by changing its size and the number of hash functions used.
- For the web crawler, consider using domain-specific hash functions that work well with URL structures.
- In the distributed spell checker, think about how to distribute the dictionary evenly across servers and handle server failures.
- Consider the trade-offs between memory usage, lookup speed, and false positive rate when designing your Bloom filter implementations.
- For real-world applications, you might need to implement count-min sketch or quotient filter for more advanced probabilistic queries.