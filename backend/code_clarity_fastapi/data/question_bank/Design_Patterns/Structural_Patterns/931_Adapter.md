**Adapter Design Pattern**

# Metadata

- **ID**: 931
- **Title**: Adapter Design Pattern
- **Difficulty**: Medium
- **Category**: Design Patterns
- **Subcategory**: Structural Patterns
- **Similar Questions**: LeetCode: 146. LRU Cache (conceptually similar in terms of adapting interfaces), HackerRank: Java Interface, GeeksforGeeks: Adapter Pattern, CodeChef: ADAPTERDESIGN (Adapter Design Implementation)
- **Real Life Domains**: Legacy System Integration, Third-party Library Adaptation, Cross-platform Development, API Design

# Problem Description

You are tasked with integrating two incompatible interfaces. The challenge is to create a way for these interfaces to work together without modifying their source code. This often occurs when integrating new systems with legacy code, working with third-party libraries, or designing systems that need to be flexible to change.

# Versions

## Version 1: Basic Adapter Pattern

Create a simple adapter that allows a client to use a service with an incompatible interface.

Questions to consider:
- How would you handle method name discrepancies between the adaptee and the target interface?
- What approach would you take if the adapter needs to transform data types between the client and the adaptee?
- How would you design the adapter to be reusable for similar adaptee classes?

## Version 2: Two-way Adapter

Implement an adapter that not only allows the client to use the adaptee but also allows the adaptee to be used where the client interface is expected.

Questions to consider:
- How would you handle scenarios where the two interfaces have methods with similar names but different behaviors?
- What strategies can be used to minimize code duplication in a two-way adapter?
- How would you ensure that the adapter maintains consistency when used in both directions?

## Version 3: Class Adapter vs Object Adapter

Compare and contrast the implementation of a class adapter (using inheritance) with an object adapter (using composition).

Questions to consider:
- In what scenarios would you prefer a class adapter over an object adapter, and vice versa?
- How does each approach affect the flexibility and reusability of the adapter?
- What are the implications of using each approach in languages with single vs multiple inheritance?

## Version 4: Adaptive Data Streaming

Design an adapter for a data streaming scenario where incoming data needs to be transformed and adapted in real-time for consumption by different systems.

Questions to consider:
- How would you handle varying data rates between the source and the consuming systems?
- What strategies would you use to ensure data integrity during the adaptation process?
- How would you design the adapter to be scalable for high-volume data streams?

## Version 5: Real-life Scenarios

1. **Payment Gateway Integration**:
   Design an adapter to integrate multiple payment gateways (PayPal, Stripe, Square) into an e-commerce platform.
   
   Questions:
   - How would you handle differences in payment flow (redirect vs API-based) between different gateways?
   - What approach would you take to standardize error handling across different payment providers?
   - How would you design the adapter to easily add new payment gateways in the future?

2. **Legacy Database Migration**:
   Create an adapter to allow a modern ORM system to work with a legacy database that doesn't follow current best practices.
   
   Questions:
   - How would you handle mapping between modern object-oriented models and legacy table structures?
   - What strategies would you use to optimize performance when the legacy schema isn't well-indexed?
   - How would you design the adapter to gradually phase out as the legacy database is modernized?

3. **Cross-platform Mobile Development**:
   Implement adapters to allow a single codebase to interact with platform-specific APIs on both iOS and Android.
   
   Questions:
   - How would you handle platform-specific features that don't have a direct equivalent on the other platform?
   - What approach would you take to minimize the adapter layer's impact on application performance?
   - How would you structure the adapters to make it easy to support new platforms in the future?

4. **IoT Device Integration**:
   Design an adapter system to integrate various IoT devices with different communication protocols into a smart home management system.
   
   Questions:
   - How would you handle differences in data formats and communication frequencies between devices?
   - What strategies would you use to ensure the adapter can operate reliably on low-power edge devices?
   - How would you design the adapter to be resilient to network interruptions and device failures?

5. **Multi-cloud Service Abstraction**:
   Create an adapter layer to abstract away differences between cloud service providers (AWS, Azure, Google Cloud) for common services like object storage or serverless functions.
   
   Questions:
   - How would you handle differences in authentication mechanisms between cloud providers?
   - What approach would you take to optimize cost and performance when operating across multiple cloud platforms?
   - How would you design the adapter to allow easy switching or simultaneous use of multiple cloud providers?

These scenarios and questions aim to explore the Adapter pattern in depth, considering real-world complexities and challenges. They encourage thinking about scalability, maintainability, and broader system architecture when applying the Adapter pattern in various domains.

# Constraints

- The adapter should not require changes to the existing client code or the adaptee class.
- Consider performance implications, especially for frequently called methods or large-scale data transformations.
- The adapter should be designed to be maintainable and easily extendable for future interface changes.
- Consider thread-safety in multi-threaded environments.
- The adapter should handle error scenarios gracefully, translating exceptions if necessary.

# Notes

- Use the Adapter pattern when you want to use an existing class, but its interface isn't compatible with the rest of your code.
- This pattern is particularly useful for integrating third-party libraries or legacy systems.
- Consider using the Facade pattern instead if you need to simplify a complex subsystem interface.
- Be cautious of overuse, as too many adapters can make a system hard to understand and maintain.
- In some cases, it might be better to refactor the client code to use the adaptee's interface directly, if possible.