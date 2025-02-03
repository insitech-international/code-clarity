# Metadata

- **ID**: 1332
- **Title**: Properties in Object-Oriented Programming
- **Difficulty**: Medium
- **Category**: Object-Oriented Programming
- **Subcategory**: Encapsulation
- **Similar Concepts**: Getters and Setters, Computed Properties, Auto-implemented Properties
- **Real Life Domains**: Financial Systems, Game Development, Data Analytics Platforms, IoT Device Management

# Problem Description

Design and implement systems that effectively utilize properties to create flexible, maintainable, and efficient code structures. The goal is to demonstrate a deep understanding of how properties can be used to enhance encapsulation, provide computed values, and implement complex behaviors in real-world scenarios.

# Versions

## Version 1: Financial Portfolio Management System

Design a class-based portfolio management system with a focus on effective use of properties:

1. Create an `Asset` class with:

   - Basic properties: name, purchase_date, purchase_price
   - Computed property: current_value (fetches real-time value)
   - Property with validation: quantity (must be non-negative)
   - Read-only property: unique_identifier
   - Write-only property: set_valuation_source (sets the source for value computation)

2. Implement a `Portfolio` class with:

   - Collection property: assets (allows adding/removing assets)
   - Computed property: total_value (sum of all asset values)
   - Computed property: performance (percentage change since inception)
   - Property with side effects: risk_profile (adjusts asset allocations when set)

3. Design a `Transaction` class with:

   - Auto-implemented properties: date, type (buy/sell), asset_id
   - Computed property: impact_on_portfolio (calculates effect on portfolio value)
   - Property with lazy loading: detailed_transaction_record

4. Create an `Investor` class with:

   - Properties with backing fields: name, contact_info
   - Computed property: net_worth (sum of all portfolio values)
   - Property with change notification: investment_strategy

5. Implement a `MarketData` class with:
   - Indexed property: price[asset_symbol] (retrieves price for a given asset)
   - Computed property: market_trend (analyzes overall market direction)
   - Property with caching: historical_data (caches retrieved historical data)

How would you design these properties to ensure efficient computation, proper encapsulation, and real-time updates where necessary? How would you handle scenarios where properties depend on external data sources that might be temporarily unavailable?

## Version 2: Game Character Progression System

Design a character progression system for a role-playing game using properties:

1. Create a `Character` class with:

   - Basic properties: name, level, experience_points
   - Computed property: strength (based on level and equipment)
   - Property with level-up trigger: level (triggers level-up actions when increased)
   - Collection property: skills (manages character skills)
   - Computed property: combat_power (based on all attributes and skills)

2. Implement an `Equipment` class with:

   - Properties with validation: durability (0-100), enchantment_level
   - Computed property: effectiveness (based on durability and enchantment)
   - Property with wear-and-tear simulation: condition (degrades over time)

3. Design a `Skill` class with:

   - Auto-implemented properties: name, base_power
   - Computed property: actual_power (based on character attributes)
   - Property with cooldown: last_used (enforces usage restrictions)

4. Create an `Inventory` class with:

   - Indexed property: items[slot] (manages equipped and stored items)
   - Computed property: total_weight (sum of all item weights)
   - Property with capacity check: add_item (checks inventory capacity before adding)

5. Implement a `GameWorld` class with:
   - Property with event triggering: current_location (triggers events on change)
   - Computed property: difficulty_level (based on character level and location)
   - Property with dynamic generation: available_quests (generates quests based on location and character level)

How would you design these properties to create a dynamic and responsive game system? How would you handle complex interactions between properties, such as equipment affecting character attributes?

## Version 3: IoT Sensor Network Management System

Design an IoT sensor network management system using properties:

1. Create a `Sensor` class with:

   - Basic properties: id, type, location
   - Computed property: status (based on last_reading_time and battery_level)
   - Property with throttling: current_reading (limits read frequency)
   - Property with alert triggering: battery_level (triggers alert when low)

2. Implement a `SensorNetwork` class with:

   - Collection property: sensors (manages network of sensors)
   - Computed property: network_health (percentage of active sensors)
   - Property with load balancing: add_sensor (distributes sensors across network)

3. Design a `DataStream` class with:

   - Computed property: average_value (moving average of sensor readings)
   - Property with buffering: add_reading (buffers readings before processing)
   - Indexed property: historical_data[timestamp] (retrieves historical data points)

4. Create an `AlertSystem` class with:

   - Property with priority queue: pending_alerts (manages alerts by priority)
   - Computed property: alert_frequency (calculates alert frequency over time)
   - Property with callback: set_alert_handler (sets callback for alert processing)

5. Implement a `Dashboard` class with:
   - Computed property: system_summary (generates overall system status)
   - Property with caching: sensor_data_visualization (caches complex visualizations)
   - Property with lazy loading: detailed_reports (generates reports on-demand)

How would you design these properties to ensure efficient real-time monitoring and data processing in an IoT environment? How would you handle scenarios where network connectivity is intermittent?

# Real-Life Scenarios

1. **E-commerce Inventory Management System**
   Design a class structure for an e-commerce platform's inventory system, using properties to manage stock levels, price adjustments, and product variations while ensuring data consistency across distributed systems.

2. **Weather Forecasting and Analysis Platform**
   Create a class hierarchy for a weather forecasting system that uses properties to handle real-time data ingestion, statistical analysis, and predictive modeling, with a focus on performance and accuracy.

3. **Adaptive Learning System**
   Develop a class-based system for an adaptive learning platform that uses properties to track student progress, adjust difficulty levels, and personalize content delivery based on learning patterns and performance metrics.

4. **Distributed Version Control System**
   Design a class structure for a distributed version control system, using properties to manage file states, conflict resolution, and branch management across multiple repositories and users.

5. **Smart Grid Energy Management System**
   Create a class hierarchy for a smart grid energy management system that uses properties to handle real-time power distribution, consumption forecasting, and dynamic pricing, while ensuring grid stability and efficiency.

For each scenario, consider:

- How would you use computed properties to derive complex values efficiently?
- What strategies would you employ to ensure thread-safety for properties accessed by multiple threads?
- How would you implement properties that interact with external systems or databases?
- What patterns could you use to implement property change notifications and propagate changes through the system?
- How would you design properties to support data binding in user interfaces?

# Constraints

- Ensure that properties provide appropriate encapsulation, avoiding direct access to backing fields where necessary.
- Design for performance, considering the computational cost of computed properties.
- Implement proper validation and error handling for property setters.
- Consider the implications of property accessibility (public, protected, private) on system design.
- Be mindful of the potential for circular dependencies between properties.

# Notes

- Reflect on how different programming languages implement properties and how this might influence your design decisions.
- Consider the trade-offs between using properties and traditional getter/setter methods.
- Think about how properties can be used to implement aspects of functional programming, such as immutability and side-effect management.
- Explore how properties can be used in conjunction with other OOP concepts like inheritance and polymorphism to create more expressive and maintainable code.
