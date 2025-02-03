# Metadata

- **ID**: 1312
- **Title**: Protocols in Object-Oriented Programming
- **Difficulty**: Medium
- **Category**: Object-Oriented Programming
- **Subcategory**: Abstract Classes and Interfaces
- **Similar Concepts**: Swift Protocols, TypeScript Interfaces, Rust Traits
- **Real Life Domains**: API Design, Cross-platform Development, Plugin Systems, Microservices

# Problem Description

Design and implement a system using Protocols (also known as Interfaces in some languages) to create flexible, decoupled, and interoperable components in various real-world scenarios. The goal is to define common behaviors that can be adopted by disparate types, enabling polymorphism and enhancing code reusability.

# Versions

## Version 1: Cross-Platform UI Component Library

Design a protocol-based system for a cross-platform UI component library with the following requirements:

1. Create a set of protocols defining common UI components:

   - `Clickable`: Methods for handling click events
   - `Draggable`: Methods for drag-and-drop functionality
   - `Resizable`: Methods for resizing components
   - `Animatable`: Methods for applying animations

2. Design the following concrete types that implement various combinations of these protocols:

   - `Button`: Implements `Clickable` and `Animatable`
   - `Window`: Implements `Draggable`, `Resizable`, and `Animatable`
   - `Slider`: Implements `Draggable` and `Clickable`
   - `Icon`: Implements `Clickable` and `Draggable`

3. Implement a `UIManager` type that can work with any object conforming to these protocols, demonstrating protocol-based polymorphism.

4. Create a protocol `ThemableComponent` with methods for applying different visual themes. How would you integrate this with the existing components?

5. Design a way to compose these protocols to create more complex behaviors (e.g., a `DraggableWindow` that is both `Draggable` and `Resizable`).

How would you structure this system to maximize flexibility across different platforms while minimizing code duplication?

## Version 2: Modular Robot Control System

Create a protocol-based system for controlling various types of robots with these specifications:

1. Design the following core protocols:

   - `Movable`: Methods for controlling movement (e.g., move forward, turn)
   - `Sensor`: Methods for reading sensor data
   - `Programmable`: Methods for uploading and executing custom programs
   - `Communicable`: Methods for sending and receiving data

2. Implement the following robot types, each adopting relevant protocols:

   - `GroundRobot`: Implements `Movable`, `Sensor`, and `Programmable`
   - `FlyingDrone`: Implements `Movable`, `Sensor`, and `Communicable`
   - `StaticSensor`: Implements `Sensor` and `Communicable`
   - `RoboticArm`: Implements `Movable` and `Programmable`

3. Create a `MissionControl` type that can manage and coordinate multiple robots, regardless of their specific types.

4. Design a `SelfDiagnosable` protocol that defines methods for running self-diagnostic routines. How would you integrate this with the existing robot types?

5. Implement a way to dynamically add new capabilities to robots at runtime through protocol extensions or compositions.

How would you structure this system to allow for easy addition of new robot types and capabilities while ensuring interoperability?

## Version 3: Financial Instrument Trading System

Design an extensible trading system using protocols with the following criteria:

1. Create the following core protocols:

   - `Tradable`: Methods for buying, selling, and quoting prices
   - `RiskAssessable`: Methods for calculating risk metrics
   - `Taxable`: Methods for calculating tax implications
   - `Reportable`: Methods for generating financial reports

2. Implement the following financial instrument types, each adopting relevant protocols:

   - `Stock`: Implements `Tradable`, `RiskAssessable`, and `Reportable`
   - `Bond`: Implements `Tradable`, `Taxable`, and `Reportable`
   - `Derivative`: Implements `Tradable`, `RiskAssessable`, and `Taxable`
   - `Cryptocurrency`: Implements `Tradable` and `Reportable`

3. Design a `TradingEngine` type that can execute trades for any `Tradable` instrument.

4. Create a `ComplexInstrument` protocol that composes multiple basic protocols. How would you use this to represent complex financial products?

5. Implement a `MarketDataProvider` protocol for supplying real-time market data. How would you integrate this with the existing financial instruments?

How would you design this system to allow for easy addition of new financial instruments and ensure consistency across different trading operations?

# Real-Life Scenarios

1. **IoT Device Ecosystem**
   Design a protocol-based system for an IoT ecosystem that supports various types of smart devices (e.g., thermostats, lights, security cameras) from different manufacturers. Consider interoperability, device discovery, data synchronization, and security aspects.

2. **Game Engine Component System**
   Create a protocol-based architecture for a game engine's component system, allowing for the creation of game objects with various behaviors (e.g., renderable, collidable, audible). Focus on performance, extensibility, and ease of use for game developers.

3. **Microservices Communication Framework**
   Develop a protocol-based framework for communication between microservices in a distributed system. Consider aspects like service discovery, load balancing, fault tolerance, and data serialization.

4. **Plugin System for a Digital Audio Workstation (DAW)**
   Design a protocol-based plugin system for a DAW that allows third-party developers to create audio effects, virtual instruments, and analysis tools. Focus on real-time performance, standardized parameter controls, and audio routing capabilities.

5. **Modular Industrial Control System**
   Create a protocol-based architecture for a modular industrial control system that can integrate various sensors, actuators, and control algorithms. Consider real-time constraints, fault tolerance, and the ability to hot-swap components.

For each scenario, consider:

- How would you define protocols to represent the core behaviors and capabilities?
- What mechanisms would you use to compose multiple protocols into more complex behaviors?
- How would you handle versioning and backwards compatibility of protocols?
- What strategies would you employ to optimize performance while maintaining the flexibility of the protocol-based design?
- How would you design the system to facilitate unit testing and mocking of protocol-conforming objects?

# Constraints

- Protocols should define only method signatures and properties, not implementations.
- The system should allow types to adopt multiple protocols.
- Consider how to handle protocol inheritance or composition, if applicable in the chosen language.
- The design should facilitate easy addition of new types that conform to existing protocols.
- Consider how to handle optional protocol requirements, if supported by the language.

# Notes

- Focus on creating a robust and flexible architecture rather than implementation details.
- Consider how protocols can be used to achieve loose coupling between components.
- Think about how protocol-oriented design compares to class-based inheritance for achieving polymorphism.
- Reflect on how the use of protocols can improve code organization, testability, and maintainability in large systems.
