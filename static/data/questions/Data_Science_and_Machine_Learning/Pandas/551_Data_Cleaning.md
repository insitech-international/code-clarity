**Data Cleaning with Pandas**

# Metadata

- **ID**: 551
- **Title**: Data Cleaning with Pandas
- **Difficulty**: Intermediate
- **Category**: Data Science and Machine Learning
- **Subcategory**: Data Wrangling
- **Similar Questions**: "Pandas Data Cleaning Techniques", "Dealing with Missing Data"
- **Real Life Domains**: Finance, Marketing, Healthcare

# Problem Description

Data cleaning is a crucial step in any data analysis pipeline. Pandas provides powerful tools to handle missing data, correct data types, and remove outliers. This problem set focuses on using Pandas for effective data preparation and cleaning.

# Versions

## Version 1: Handling Missing Data

### Scenario

A marketing firm has a dataset with customer demographics, but some fields are missing. Clean the data by handling missing values appropriately.

### Learning Objectives

- Understand different types of missing data
- Master various imputation techniques
- Learn when to drop vs. fill missing values

### Questions

1. What are the different techniques for handling missing data?
2. When should you use imputation versus dropping?
3. How do you identify patterns in missing data?
4. What are the implications of different missing data strategies?
5. How do you validate imputation results?

### Coding Tasks

1. Missing Data Analysis:

   ```python
   def analyze_missing_data(df):
       # Identify missing values
       # Calculate missing percentages
       # Visualize missing patterns
       pass
   ```

2. Data Imputation:

   ```python
   def impute_missing_values(df):
       # Mean/median imputation
       # Forward/backward fill
       # Advanced imputation methods
       pass
   ```

3. Validation and Reporting:
   ```python
   def validate_cleaning(df_original, df_cleaned):
       # Compare distributions
       # Check data quality
       # Generate cleaning report
       pass
   ```

## Version 2: Data Type Conversion and Parsing

### Scenario

A financial analysis project requires data in the correct format for time series analysis. Ensure that columns with date strings are properly converted and numerical values are formatted.

### Learning Objectives

- Master data type conversions
- Understand datetime handling
- Learn string parsing techniques

### Questions

1. How do you convert data types in Pandas?
2. What are the best practices for parsing dates?
3. How do you handle mixed data types?
4. What are common string parsing challenges?
5. How do you validate converted data?

### Coding Tasks

1. Type Conversion:

   ```python
   def convert_data_types(df):
       # Convert numeric columns
       # Parse date/time columns
       # Handle categorical data
       pass
   ```

2. String Parsing:

   ```python
   def parse_string_data(df):
       # Clean string columns
       # Extract information
       # Standardize formats
       pass
   ```

3. Validation Checks:
   ```python
   def validate_conversions(df):
       # Check data types
       # Verify parsing results
       # Handle conversion errors
       pass
   ```

## Version 3: Outlier Detection and Removal

### Scenario

An e-commerce company wants to analyze its revenue data, but there are significant outliers that could skew the analysis.

### Learning Objectives

- Master outlier detection methods
- Understand statistical approaches
- Learn visualization techniques

### Questions

1. What methods can be used to detect outliers?
2. How do you balance outlier removal?
3. What are the statistical tests for outliers?
4. How do you handle multivariate outliers?
5. What are the best visualization techniques?

### Coding Tasks

1. Outlier Detection:

   ```python
   def detect_outliers(df):
       # Calculate z-scores
       # Use IQR method
       # Implement statistical tests
       pass
   ```

2. Outlier Treatment:

   ```python
   def treat_outliers(df):
       # Remove outliers
       # Cap extreme values
       # Transform variables
       pass
   ```

3. Visualization and Reporting:
   ```python
   def visualize_outliers(df):
       # Create box plots
       # Generate scatter plots
       # Produce summary reports
       pass
   ```

# Constraints

- Handle large DataFrames efficiently
- Consider memory usage
- Maintain data integrity
- Document all transformations
- Provide validation methods

## Additional Resources

- Pandas documentation
- Statistical testing guides
- Visualization tutorials
- Best practices for data cleaning

# Notes

- Include visualization validation
- Document assumptions
- Handle edge cases
- Consider scalability
- Maintain audit trail
