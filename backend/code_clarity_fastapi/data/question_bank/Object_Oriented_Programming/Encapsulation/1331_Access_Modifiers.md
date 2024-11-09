# Metadata

- **ID**: 1331
- **Title**: Access Modifiers in Object-Oriented Programming
- **Difficulty**: Medium to Hard
- **Category**: Object-Oriented Programming
- **Subcategory**: Encapsulation
- **Similar Concepts**: Visibility, Information Hiding, Data Protection
- **Real Life Domains**: Enterprise Software Systems, Security Frameworks, API Design, Database Management Systems

# Problem Description

Design and implement systems that effectively utilize access modifiers to create secure, maintainable, and well-encapsulated code structures. The goal is to demonstrate a deep understanding of how different levels of access control can be used to model complex real-world scenarios while adhering to principles of information hiding and modularity.

# Versions

## Version 1: Enterprise Resource Planning (ERP) System

Design a class-based ERP system with a focus on appropriate use of access modifiers:

1. Create an `Employee` class with:

   - Private attributes: ssn, salary_history
   - Protected attributes: current_salary, performance_ratings
   - Public attributes: name, job_title, department
   - Private methods: calculate_bonus(), update_salary_history()
   - Protected methods: evaluate_performance()
   - Public methods: promote(), transfer_department()

2. Implement a `Department` class with:

   - Private attributes: budget_allocation, strategic_plans
   - Protected attributes: employee_list, performance_metrics
   - Public attributes: name, manager, location
   - Private methods: reallocate_budget(), plan_strategy()
   - Protected methods: evaluate_department_performance()
   - Public methods: add_employee(), remove_employee(), get_headcount()

3. Design a `Project` class with:

   - Private attributes: risk_assessment, client_communications
   - Protected attributes: timeline, resource_allocation
   - Public attributes: name, status, project_manager
   - Private methods: update_risk_assessment(), log_client_communication()
   - Protected methods: adjust_timeline(), reallocate_resources()
   - Public methods: assign_team_member(), update_status(), generate_report()

4. Create a `FinancialRecord` class with strict access control:

   - Private attributes: transaction_details, account_balances
   - Protected attributes: financial_statements, audit_logs
   - Public attributes: reporting_period, currency
   - Private methods: record_transaction(), reconcile_accounts()
   - Protected methods: generate_financial_statements(), log_audit_entry()
   - Public methods: get_summary_report(), set_reporting_period()

5. Implement a `SystemAdmin` class that needs to interact with protected members of other classes:
   - Private attributes: admin_credentials, system_logs
   - Protected attributes: user_access_levels, system_configurations
   - Public attributes: name, role
   - Private methods: encrypt_credentials(), analyze_logs()
   - Protected methods: modify_user_access(), update_system_config()
   - Public methods: create_user(), delete_user(), reset_password()

How would you design the interaction between these classes to ensure proper encapsulation while allowing necessary access for system functionality? How would you handle scenarios where certain operations need elevated access rights?

## Version 2: Banking Security System

Design a secure banking system with a strong focus on data protection using access modifiers:

1. Create an `Account` class with:

   - Private attributes: account_number, pin, balance
   - Protected attributes: transaction_history, account_status
   - Public attributes: account_type, creation_date
   - Private methods: validate_pin(), update_balance()
   - Protected methods: log_transaction(), change_account_status()
   - Public methods: get_balance(), deposit(), withdraw()

2. Implement a `Customer` class with:

   - Private attributes: ssn, credit_score
   - Protected attributes: contact_information, account_list
   - Public attributes: name, customer_id
   - Private methods: update_credit_score(), encrypt_ssn()
   - Protected methods: add_account(), remove_account()
   - Public methods: update_contact_info(), get_account_summary()

3. Design a `Transaction` class with:

   - Private attributes: transaction_id, amount
   - Protected attributes: transaction_type, timestamp
   - Public attributes: status, description
   - Private methods: generate_transaction_id(), validate_amount()
   - Protected methods: process_transaction(), revert_transaction()
   - Public methods: get_transaction_details(), update_description()

4. Create a `BankTeller` class that needs limited access to customer information:

   - Private attributes: teller_id, terminal_id
   - Protected attributes: daily_transaction_log, cash_drawer_balance
   - Public attributes: name, status
   - Private methods: authenticate_teller(), balance_cash_drawer()
   - Protected methods: access_customer_account(), override_transaction_limit()
   - Public methods: serve_customer(), end_shift()

5. Implement an `AuditSystem` class that needs broad but controlled access:
   - Private attributes: audit_logs, flagged_activities
   - Protected attributes: audit_rules, compliance_checklist
   - Public attributes: last_audit_date, audit_status
   - Private methods: analyze_logs(), flag_suspicious_activity()
   - Protected methods: access_all_records(), generate_audit_report()
   - Public methods: start_audit(), get_audit_summary()

How would you design the interactions between these classes to maintain a high level of security while allowing necessary operations to occur? How would you handle scenarios where emergency access to private data is required?

## Version 3: Medical Records Management System

Design a medical records system that balances patient privacy with healthcare provider needs:

1. Create a `Patient` class with:

   - Private attributes: ssn, medical_history
   - Protected attributes: current_medications, allergies
   - Public attributes: name, date_of_birth, patient_id
   - Private methods: update_medical_history(), encrypt_sensitive_data()
   - Protected methods: add_medication(), update_allergy_info()
   - Public methods: get_basic_info(), schedule_appointment()

2. Implement a `MedicalRecord` class with:

   - Private attributes: diagnosis_details, treatment_plans
   - Protected attributes: lab_results, physician_notes
   - Public attributes: record_id, last_updated
   - Private methods: update_diagnosis(), create_treatment_plan()
   - Protected methods: add_lab_result(), append_physician_note()
   - Public methods: get_record_summary(), update_last_visited()

3. Design a `HealthcareProfessional` class with varying access levels:

   - Private attributes: employee_id, specialization
   - Protected attributes: patient_list, schedule
   - Public attributes: name, title, department
   - Private methods: access_full_patient_record(), prescribe_medication()
   - Protected methods: update_patient_status(), refer_to_specialist()
   - Public methods: get_available_slots(), update_profile()

4. Create a `Pharmacy` class with limited access to patient information:

   - Private attributes: inventory, supplier_contracts
   - Protected attributes: prescription_records, patient_medication_history
   - Public attributes: name, location, operating_hours
   - Private methods: update_inventory(), place_supplier_order()
   - Protected methods: verify_prescription(), check_drug_interactions()
   - Public methods: fill_prescription(), get_medication_info()

5. Implement a `ResearchAnalyst` class that needs anonymized data access:
   - Private attributes: research_project_details, data_analysis_tools
   - Protected attributes: anonymized_patient_data, research_findings
   - Public attributes: name, research_area, publications
   - Private methods: anonymize_data(), run_statistical_analysis()
   - Protected methods: access_aggregate_health_data(), generate_research_report()
   - Public methods: publish_findings(), request_data_access()

How would you design these classes to ensure patient privacy while allowing healthcare professionals appropriate access to necessary information? How would you handle scenarios where immediate access to private information could be life-saving?

# Real-Life Scenarios

1. **Autonomous Vehicle Control System**
   Design a class structure for an autonomous vehicle's control system, using access modifiers to protect critical driving functions while allowing necessary interactions between subsystems like navigation, sensor processing, and vehicle control.

2. **Social Media Platform with Privacy Controls**
   Create a class hierarchy for a social media platform that uses access modifiers to implement robust privacy controls, allowing users to finely tune the visibility of their personal information and posts to different groups of connections.

3. **Industrial IoT System for Manufacturing**
   Develop a class-based system for an industrial IoT network in a manufacturing setting, using access modifiers to secure sensitive machine operations and data while allowing for monitoring, maintenance, and data analytics.

4. **Online Learning Platform with Multi-level Access**
   Design a class structure for an online learning platform that uses access modifiers to manage access rights for different user roles (students, teachers, administrators) to course content, grading systems, and user data.

5. **Smart Home Automation System with Security Features**
   Create a class hierarchy for a smart home system that uses access modifiers to protect critical home security features while allowing convenient control of home devices and integration with third-party services.

For each scenario, consider:

- How would you use access modifiers to implement the principle of least privilege?
- What strategies would you employ to allow for code extensibility while maintaining encapsulation?
- How would you design internal APIs that provide controlled access to protected functionality?
- What testing strategies would you use to ensure that access controls are working as intended?
- How would you handle scenarios where runtime changes to access levels might be necessary?

# Constraints

- Strictly adhere to the principle of encapsulation, exposing only what is necessary through public interfaces.
- Design for extensibility, considering how future subclasses might need to interact with protected members.
- Consider the implications of your access modifier choices on testability.
- Be mindful of the potential for reduced flexibility when using overly restrictive access modifiers.
- Consider how your choice of access modifiers affects the ability to refactor code in the future.

# Notes

- Reflect on how different programming languages implement access control and how this might influence your design decisions.
- Consider the trade-offs between security and convenience when designing class interfaces.
- Think about how access modifiers can be used in conjunction with design patterns to create more robust and flexible systems.
- Explore how access modifiers relate to other object-oriented principles like inheritance and polymorphism.
