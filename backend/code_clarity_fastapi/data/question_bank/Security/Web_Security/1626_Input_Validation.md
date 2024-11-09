# Metadata

- **ID**: 1626
- **Title**: Input Validation
- **Difficulty**: Medium
- **Category**: Security
- **Subcategory**: Web Security
- **Similar Questions**: XSS Prevention, SQL Injection Prevention, OWASP Top 10 Mitigation
- **Real Life Domains**: Web Applications, APIs, Form Processing, Database Operations

# Problem Description

Input validation is a critical security measure to ensure that only properly formed data enters an application's workflow. This problem focuses on implementing robust input validation techniques to prevent various types of injection attacks and data integrity issues.

# Versions

## Version 1: Basic Form Input Validation

Implement client-side and server-side validation for a typical web form (e.g., registration form) with fields like username, email, password, and date of birth.

Example:

- Input: Form data including username, email, password, and date of birth
- Output: Describe the validation process, including regex patterns, length checks, and format validations

## Version 2: API Input Validation

Design and implement input validation for a RESTful API that accepts JSON payloads. Include type checking, range validation, and structure validation.

Example:

- Input: JSON payload for a user profile update API endpoint
- Output: Describe the validation process, including how to handle invalid inputs and provide meaningful error messages

## Version 3: File Upload Validation

Implement a secure file upload system with proper validation of file types, sizes, and contents.

Example:

- Input: File upload request with metadata
- Output: Describe the validation process, including MIME type checking, file size limits, and potential malware scanning

## Version 4: Real-Life Domain Cases

### Scenario 1: E-commerce Platform

You're building an e-commerce platform that needs to handle various types of user inputs securely.

Tasks:
a) Implement input validation for product listings (including prices, descriptions, and categories)
b) Design a secure search functionality that prevents SQL injection and XSS attacks
c) Implement validation for user reviews and ratings, including protection against spam and abusive content
d) Design a system for validating and sanitizing product import data from various sources (CSV, XML, API)

### Scenario 2: Financial Transaction System

You're developing a system for processing financial transactions that requires strict input validation.

Tasks:
a) Implement validation for monetary amounts, ensuring precision and preventing manipulation
b) Design a secure way to validate and process international bank account numbers (IBAN) and routing numbers
c) Implement validation for stock trading orders, including price, quantity, and timing constraints
d) Design a system for validating and normalizing different date and time formats in transaction logs

### Scenario 3: Healthcare Data Management System

You're creating a system for managing sensitive healthcare data with stringent validation requirements.

Tasks:
a) Implement validation for patient data entry, including medical history and prescription information
b) Design a secure way to validate and process medical test results from various lab equipment
c) Implement validation for doctor's notes and diagnoses, including medical terminology checking
d) Design a system for validating and anonymizing patient data for research purposes

### Scenario 4: Content Management System (CMS)

You're building a CMS that needs to handle various types of user-generated content securely.

Tasks:
a) Implement validation for rich text content, allowing safe HTML while preventing XSS attacks
b) Design a system for validating and processing markdown or wiki-style syntax
c) Implement validation for user-submitted metadata and tags, preventing injection and ensuring consistency
d) Design a secure way to validate and render user-submitted templates or themes

### Scenario 5: IoT Data Collection Platform

You're developing a platform to collect and process data from various IoT devices.

Tasks:
a) Implement validation for sensor data, including range checking and anomaly detection
b) Design a system for validating and normalizing data from devices with different firmware versions
c) Implement validation for device configuration updates, ensuring compatibility and preventing malicious alterations
d) Design a secure way to validate and process batch uploads of historical device data

# Constraints

- For all versions:

  - Implement both client-side and server-side validation where applicable
  - Consider performance implications of validation processes
  - Ensure validation doesn't inadvertently expose sensitive information

- For Version 4 (Real-Life Domain Cases):
  - Comply with relevant data protection regulations (e.g., GDPR, HIPAA)
  - Consider scalability for systems handling large volumes of data
  - Implement proper error logging without exposing sensitive information

# Notes

- Always validate input on the server side, even if client-side validation is present
- Use parameterized queries or prepared statements to prevent SQL injection
- Implement context-sensitive output encoding to prevent XSS attacks
- Consider using input validation frameworks or libraries to ensure comprehensive coverage
- Validate not just for malicious inputs, but also for data integrity and business logic constraints
- Implement proper error handling that provides useful feedback without revealing sensitive details
- Regularly update validation rules to address new types of attacks or vulnerabilities
- Consider implementing a content security policy (CSP) as an additional layer of protection
