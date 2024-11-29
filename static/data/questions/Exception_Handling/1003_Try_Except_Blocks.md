**Exception Handling: Try-Except Blocks**

# Metadata

- **ID**: 1003
- **Title**: Try-Except Blocks
- **Difficulty**: Easy
- **Category**: Exception Handling
- **Subcategory**: Error Handling
- **Similar Questions**: Raising Exceptions, Catching Multiple Exceptions
- **Real Life Domains**: File Operations, Database Queries, User Input Validation, API Integrations, Network Communications

# Problem Description

Exception handling is a crucial aspect of programming that allows developers to gracefully manage runtime errors and exceptions. This problem focuses on implementing try-except blocks in Python, exploring their syntax, and addressing common challenges in error handling.

The challenge involves understanding the concept of exceptions, identifying potential error scenarios, and developing robust error handling strategies. It requires a solid grasp of Python's exception hierarchy, understanding different types of exceptions, and knowing how to handle them appropriately.

# Versions

## Version 1: Basic Exception Handling

Implement basic try-except blocks for common error scenarios.

Tasks:

1. Create a function that reads a text file and handles potential IOErrors.
2. Develop a function that performs division and catches ZeroDivisionError.
3. Implement a function that connects to a database and handles ConnectionError.
4. Create a function that parses JSON data and catches ValueError.
5. Develop a function that makes API calls and handles ConnectionError and TimeoutError.
6. Implement a function that processes user input and catches TypeError and ValueError.
7. Explain the difference between catch-all except clause and specific exception catching.

## Version 2: Nested Try-Except Blocks

Practice using nested try-except blocks for more complex error scenarios.

Tasks:

1. Implement a function that reads a directory recursively and handles both FileNotFoundError and PermissionError.
2. Develop a function that performs multiple database operations and handles TransactionRollbackError.
3. Create a function that processes multiple API calls sequentially and handles TimeoutError and ConnectionError.
4. Implement a function that reads and writes to a file, handling both IOError and PermissionError.
5. Develop a function that validates user input at multiple stages and catches various exceptions.
6. Create a function that performs complex calculations and handles OverflowError and ZeroDivisionError.
7. Explain the concept of exception chaining and how to use it effectively.

## Version 3: Custom Exceptions

Learn to create and handle custom exceptions for domain-specific error scenarios.

Tasks:

1. Define a custom exception class for invalid login attempts.
2. Implement a function that calculates compound interest and raises a custom exception for negative rates.
3. Create a function that processes payment transactions and defines custom exceptions for insufficient funds and declined cards.
4. Develop a function that generates random passwords and raises a custom exception for weak passwords.
5. Implement a function that validates email addresses and creates a custom exception for invalid formats.
6. Create a function that converts currency and defines custom exceptions for unsupported currencies or invalid exchange rates.
7. Explain the benefits and drawbacks of using custom exceptions versus built-in exceptions.

## Version 4: Logging and Reporting Exceptions

Implement effective logging and reporting mechanisms for exceptions.

Tasks:

1. Develop a logging system that captures and reports all caught exceptions.
2. Create a function that logs exceptions with stack traces and severity levels.
3. Implement a system that categorizes and counts different types of exceptions.
4. Develop a function that sends exception reports via email or a centralized logging service.
5. Create a system that stores exception information in a database for later analysis.
6. Implement a feature that generates human-readable error messages from raw exception data.
7. Develop a function that filters and prioritizes exceptions based on their impact on the system.

## Version 5: Real-World Applications

Apply exception handling principles to various real-world scenarios, demonstrating its importance in robust software development.

### Scenario 1: File Backup System

Build a file backup system that handles various file operations and potential errors.

Tasks:

1. Develop a function to read and copy files, handling both IOError and PermissionError.
2. Implement a system to compress and encrypt backups, raising custom exceptions for invalid compression algorithms or encryption keys.
3. Create a function to verify backup integrity, catching IntegrityError and HashMismatchError.
4. Develop a system to restore backups, handling both IOError and PermissionError.
5. Implement a feature to log and report all exceptions encountered during backup and restore operations.
6. Create a function to schedule backups, catching TimeOutError and ScheduleConflictError.
7. Develop a system to notify administrators of critical errors or warnings.

### Scenario 2: E-commerce Payment Gateway

Create an e-commerce payment gateway that securely processes payments and handles various error scenarios.

Tasks:

1. Develop a function to validate credit card numbers, catching ValueError and InvalidCardNumberError.
2. Implement a system to communicate with the bank's API, handling ConnectionError and TimeoutError.
3. Create a function to process refunds, catching InsufficientFundsError and DeclinedTransactionError.
4. Develop a system to handle recurring payments, catching SubscriptionCancellationError and PaymentFailedError.
5. Implement a feature to log and report all exceptions encountered during payment processing.
6. Create a function to generate transaction receipts, catching PrintError and PaperJamError.
7. Develop a system to notify customers of successful payments and any errors that occurred during processing.

### Scenario 3: Scientific Calculator

Build a scientific calculator that handles mathematical operations and potential numerical errors.

Tasks:

1. Develop a function to calculate square roots, catching ValueError and ZeroDivisionError.
2. Implement a system to handle logarithmic calculations, catching NegativeArgumentError and DomainError.
3. Create a function to perform matrix operations, catching MatrixDimensionMismatchError and SingularMatrixError.
4. Develop a system to calculate statistical measures, catching ZeroDivisionError and NonNumericDataError.
5. Implement a feature to detect and handle overflow and underflow situations.
6. Create a function to convert between different number systems, catching InvalidBaseError and InvalidDigitError.
7. Develop a system to log and report all exceptions encountered during calculations, allowing for debugging and error analysis.

### Scenario 4: Web Scraper

Create a web scraper that fetches data from various websites and handles potential errors.

Tasks:

1. Develop a function to scrape product listings, catching TimeoutError and ConnectionError.
2. Implement a system to handle anti-scraping measures, catching RateLimitExceededError and CaptchaRequiredError.
3. Create a function to extract structured data from HTML, catching BeautifulSoupParseError and TagNotFoundError.
4. Develop a system to handle dynamic content loading, catching JavaScriptError and DOMContentLoadedError.
5. Implement a feature to log and report all exceptions encountered during scraping, allowing for quick identification of problematic websites.
6. Create a function to handle authentication for password-protected websites, catching LoginFailureError and IncorrectCredentialsError.
7. Develop a system to rotate user agents and handle CAPTCHAs automatically.

### Scenario 5: Distributed System Monitor

Build a monitor for a distributed system that tracks the health and performance of multiple components.

Tasks:

1. Develop a function to ping remote servers and raise custom exceptions for unreachable hosts.
2. Implement a system to collect performance metrics from various services, catching MetricCollectionError and DataConversionError.
3. Create a function to analyze and visualize system health, catching DataAnalysisError and VisualizationError.
4. Develop a system to trigger alerts based on predefined thresholds, catching AlertGenerationError and NotificationDeliveryError.
5. Implement a feature to log and report all exceptions encountered during monitoring, allowing for troubleshooting.
6. Create a function to handle periodic maintenance tasks, catching MaintenanceError and ResourceAllocationError.
7. Develop a system to recover from component failures, catching RecoveryError and ReconfigurationError.

# Constraints

- Ensure that exception handling does not mask important errors that need to be addressed.
- Avoid overly broad exception catching that could hide unexpected errors.
- Balance between thorough error handling and maintaining clean, readable code.
- Consider the performance impact of extensive exception handling in performance-critical sections.
- Ensure that custom exceptions clearly describe the nature of the error they represent.

# Notes

- Explore the use of context managers for resource management and automatic exception handling.
- Investigate the benefits and drawbacks of using try-finally blocks for cleanup operations.
- Research and discuss the concept of "fail-fast" vs. "fail-safe" approaches in exception handling.
- Consider the role of logging frameworks in capturing and analyzing exceptions in production environments.
- Explore the integration of static type checking tools to identify potential exception-raising code paths.
