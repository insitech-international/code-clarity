**Single Inheritance: Understanding and Applying Hierarchical Relationships**

# Metadata

- **ID**: 1342
- **Title**: Single Inheritance: Understanding and Applying Hierarchical Relationships
- **Difficulty**: Medium
- **Category**: Object-Oriented Programming
- **Subcategory**: Inheritance
- **Similar Questions**: Method Overriding, Multiple Inheritance, Interface Implementation
- **Real Life Domains**: Software Design, Game Development, Financial Systems, E-commerce Platforms

# Problem Description

Single inheritance is a fundamental concept in object-oriented programming where a derived class inherits properties and methods from a single parent class. This problem set explores various aspects and applications of single inheritance, challenging you to design and implement class hierarchies that effectively model real-world relationships and solve practical programming problems.

# Versions

## Version 1: Basic Single Inheritance

Design a class hierarchy for a simple shape system. Create a base class `Shape` with common properties like `color` and `area()`. Then, create derived classes for specific shapes such as `Circle`, `Rectangle`, and `Triangle`. Each derived class should inherit from `Shape` and implement its own `area()` method.

Questions to consider:
1. How would you structure the `Shape` class to ensure it's abstract and can't be instantiated directly?
2. What properties and methods should be in the base `Shape` class versus the derived classes?
3. How would you implement method overriding for the `area()` calculation in each derived class?

## Version 2: Inheritance with Constructor Chaining

Expand the shape system to include more complex shapes like `RegularPolygon`. This class should inherit from `Shape` but require additional parameters in its constructor (e.g., number of sides, side length).

Questions to consider:
1. How do you properly chain constructors from the derived class to the base class?
2. What happens if you forget to call the base class constructor? How would you handle this?
3. How can you ensure that all derived classes properly initialize the base class properties?

## Version 3: Inheritance and Access Modifiers

Create a class hierarchy for a banking system with a base `Account` class and derived classes like `SavingsAccount` and `CheckingAccount`. The base class should have protected members for balance and account number.

Questions to consider:
1. How do access modifiers (public, protected, private) affect inheritance?
2. Can derived classes access private members of the base class? If not, how can you provide controlled access?
3. How would you implement a method in the base class that can be accessed by derived classes but not by external code?

## Version 4: Inheritance and Polymorphism

Design a class hierarchy for a game engine with a base `GameObject` class and derived classes for different game entities (e.g., `Player`, `Enemy`, `Item`). Implement a common `update()` method that behaves differently for each type of game object.

Questions to consider:
1. How can you use inheritance to create a flexible and extensible game object system?
2. How would you implement the `update()` method to allow for polymorphic behavior?
3. What are the advantages and potential pitfalls of using inheritance in this scenario compared to composition?

## Version 5: Real-Life Domain Scenarios

### Scenario 1: E-commerce Product Catalog
Design a class hierarchy for an e-commerce platform's product catalog. Start with a base `Product` class and create derived classes for different product categories (e.g., `Electronics`, `Clothing`, `Books`).

Questions to consider:
1. What common attributes and methods should the base `Product` class have?
2. How would you handle category-specific attributes (e.g., `size` for clothing, `author` for books)?
3. How can you use inheritance to implement a flexible pricing strategy that allows for category-specific discounts?

### Scenario 2: Employee Management System
Create a class hierarchy for an employee management system with a base `Employee` class and derived classes for different employee types (e.g., `Manager`, `Developer`, `SalesRepresentative`).

Questions to consider:
1. How would you implement a `calculateSalary()` method that accounts for different compensation structures (e.g., base salary, bonuses, commissions)?
2. How can you use inheritance to handle different types of employee benefits?
3. What challenges might you face when trying to represent employees with multiple roles using single inheritance?

### Scenario 3: Vehicle Rental System
Design a class hierarchy for a vehicle rental system with a base `Vehicle` class and derived classes for different vehicle types (e.g., `Car`, `Motorcycle`, `Truck`).

Questions to consider:
1. How would you implement a `calculateRentalCost()` method that considers vehicle-specific factors?
2. How can you use inheritance to handle different maintenance schedules for various vehicle types?
3. What challenges might you face when trying to represent hybrid vehicles (e.g., a vehicle that's both a car and a truck) using single inheritance?

### Scenario 4: Smart Home Device System
Create a class hierarchy for a smart home system with a base `SmartDevice` class and derived classes for different types of smart devices (e.g., `SmartLight`, `SmartThermostat`, `SmartLock`).

Questions to consider:
1. How would you implement a common `connect()` method that handles device-specific connection protocols?
2. How can you use inheritance to manage different power consumption models for various device types?
3. What challenges might you face when trying to represent multi-function devices (e.g., a smart speaker with a built-in light) using single inheritance?

### Scenario 5: University Course Management System
Design a class hierarchy for a university course management system with a base `Course` class and derived classes for different course types (e.g., `LectureCourse`, `LabCourse`, `SeminarCourse`).

Questions to consider:
1. How would you implement an `assignGrade()` method that accounts for different grading schemes across course types?
2. How can you use inheritance to handle different attendance tracking methods for various course types?
3. What challenges might you face when trying to represent interdisciplinary courses that combine multiple course types using single inheritance?

# Constraints

- Ensure that your class hierarchies follow the Liskov Substitution Principle (LSP).
- Consider the impact of deep inheritance hierarchies on code maintainability and flexibility.
- Be mindful of the limitations of single inheritance when designing your class structures.

# Notes

- Single inheritance provides a clear and straightforward way to model hierarchical relationships, but it can become limiting in complex scenarios.
- Consider how you might use interfaces or composition alongside inheritance to create more flexible designs.
- Be aware of the potential for tight coupling between base and derived classes, and strive for designs that allow for easy extension and modification.
- Think about how you would handle scenarios where multiple inheritance might seem more appropriate, given the constraint of single inheritance.
- Consider the implications of inheritance on code reuse, and be cautious of creating overly specialized derived classes that might limit flexibility.