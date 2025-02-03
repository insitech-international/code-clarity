# Metadata

- **ID**: 1761
- **Title**: Typing Module: Generic Types
- **Difficulty**: Hard
- **Category**: Standard Library
- **Subcategory**: Type Hinting
- **Similar Questions**: Type Annotations, Protocol Classes
- **Real Life Domains**: Software Development, API Design, Library Creation

# Problem Description

Generic types in Python, provided by the `typing` module, allow you to write flexible, reusable code that works with multiple types while maintaining type safety. The goal is to understand and implement generic types in various scenarios to improve code quality and maintainability.

# Versions

## Version 1: Basic Generic Functions

Implement a generic function that can work with any type of data.

Example:
```python
from typing import TypeVar, List

T = TypeVar('T')

def first_element(lst: List[T]) -> T:
    if lst:
        return lst[0]
    raise IndexError("List is empty")
```

## Version 2: Generic Classes

Create a generic class that can work with multiple types.

Example:
```python
from typing import Generic, TypeVar

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, content: T):
        self.content = content

    def get_content(self) -> T:
        return self.content
```

## Version 3: Bounded Type Variables

Implement generic types with bounds to restrict the types that can be used.

Example:
```python
from typing import TypeVar, List

T = TypeVar('T', int, float)

def sum_list(lst: List[T]) -> T:
    return sum(lst)
```

## Version 4: Real-Life Domain Cases

### Scenario 1: Data Structures Implementation
Implement generic data structures like linked lists, trees, or graphs that can work with any data type.

### Scenario 2: API Client Library
Design a flexible API client that can handle different types of requests and responses using generics.

### Scenario 3: Plugin System
Create a plugin system where plugins can be of different types but adhere to a common interface using generics.

### Scenario 4: Database ORM
Implement a simple ORM (Object-Relational Mapping) system using generics to handle different model types.

### Scenario 5: Event System
Design an event system where events and handlers can be of various types, managed using generics.

# Constraints

- Ensure backward compatibility with Python versions that don't support generics.
- Consider the impact on runtime performance when using extensive type checking.
- Balance between type safety and code flexibility.

# Notes

- Generic types are mainly used for static type checking and don't affect runtime behavior.
- Use `mypy` or similar tools to check for type consistency in your code.
- Combine generics with other typing features like `Union`, `Optional`, or `Callable` for more complex type hints.
- Be aware of the differences between invariance, covariance, and contravariance in generic types.