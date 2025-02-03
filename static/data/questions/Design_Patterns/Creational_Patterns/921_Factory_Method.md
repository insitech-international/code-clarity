**Factory Method Design Pattern**

# Metadata

- **ID**: 921
- **Title**: Factory Method Design Pattern
- **Difficulty**: Medium
- **Category**: Design Patterns
- **Subcategory**: Creational Patterns
- **Similar Questions**: LeetCode: 355. Design Twitter, HackerRank: Java Factory Pattern, GeeksforGeeks: Factory Method Design Pattern, CodeChef: FACTORY (Factory Design Problem)
- **Real Life Domains**: GUI Libraries, Database Connectors, Game Character Creation, Document Generation

# Problem Description

You are tasked with designing a system that needs to create objects, but the exact types of objects and the decision of which type to create should be determined at runtime. The challenge is to implement a flexible structure that allows for the creation of different types of objects without tightly coupling the client code to specific classes.

# Versions

## Version 1: Basic Factory Method Pattern

Implement a basic factory method pattern where subclasses decide which class to instantiate.


## Version 2: Parameterized Factory Method

Extend the basic factory method to accept parameters that determine which type of object to create.

## Version 3: Abstract Factory with Factory Method

Implement an abstract factory that uses factory methods to create families of related objects.

## Version 4: Real life Scenarios

# Constraints

- The creator class should not know the specific classes of products it creates.
- New product types should be able to be added without modifying existing creator classes.
- The factory method should return an object of a class that implements a common interface or base class.
- Consider the impact on code complexity when using this pattern, especially for simple object creation scenarios.
- Ensure that the pattern doesn't lead to an excessive number of small, similar subclasses.

# Notes

- Use the Factory Method pattern when you don't know beforehand the exact types and dependencies of the objects your code should work with.
- This pattern is particularly useful when you want to provide users of your library or framework with a way to extend its internal components.
- Consider using a Simple Factory (a static method that creates objects) for less complex scenarios where a full Factory Method pattern might be overkill.
- In some languages, you can use generics to create a more flexible and type-safe factory method.
- Be aware of the potential for this pattern to introduce unnecessary complexity in simple scenarios - sometimes direct instantiation is clearer and more appropriate.
- Factory Methods can be combined with other patterns like Template Method or Abstract Factory for more complex object creation scenarios.