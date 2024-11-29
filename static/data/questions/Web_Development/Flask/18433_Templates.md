# Metadata

- **ID**: 18433
- **Title**: Flask: Templates
- **Difficulty**: Medium
- **Category**: Web Development
- **Subcategory**: Flask
- **Similar Questions**: Jinja2 Templating, Frontend Integration
- **Real Life Domains**: Web Design, Content Management, Dynamic Web Applications

# Problem Description

Flask uses the Jinja2 templating engine to render dynamic HTML pages. The goal is to understand and implement effective template strategies to create flexible, maintainable, and dynamic web pages in Flask applications.

# Versions

## Version 1: Basic Templates

Create and render simple HTML templates.

Example:
```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

## Version 2: Template Inheritance

Implement template inheritance to create a consistent layout across multiple pages.

Example:
```html
<!-- base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    {% block content %}{% endblock %}
</body>
</html>

<!-- child.html -->
{% extends "base.html" %}
{% block title %}Index{% endblock %}
{% block content %}
<h1>Hello, World!</h1>
{% endblock %}
```

## Version 3: Macros and Includes

Use Jinja2 macros and includes to create reusable template components.

## Version 4: Real-Life Domain Cases

### Scenario 1: News Website
Design a template system for a news website with different layouts for homepage, article pages, and category listings.

### Scenario 2: Dashboard Application
Create a flexible template system for a data dashboard with various widgets and customizable layouts.

### Scenario 3: E-learning Platform
Implement templates for an e-learning platform, including course pages, quizzes, and user profiles.

### Scenario 4: Restaurant Menu System
Design a template-based menu system for restaurants with customizable themes and layouts.

### Scenario 5: Social Media Platform
Create a template system for a social media platform, handling different post types and user interactions.

# Constraints

- Ensure templates are responsive and work across different devices.
- Optimize template rendering performance for large-scale applications.
- Implement proper escaping to prevent XSS vulnerabilities.

# Notes

- Use `render_template()` to render Jinja2 templates in Flask.
- Leverage Jinja2's powerful features like loops, conditionals, and filters.
- Consider using template caching for improved performance.
- Use the `safe` filter cautiously when rendering user-generated content.