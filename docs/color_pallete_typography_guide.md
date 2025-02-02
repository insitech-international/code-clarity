# Qode Clarity Design System: Color Palette & Typography Guide

## 🎨 Color Philosophy
Our color palette is designed to create a cohesive, professional, and engaging visual experience across all digital platforms.

## 🌈 Color Palette
## 🌈 Primary Color Palette

### 1. Prussian Blue
- **Semantic Meaning**: Trust, Professionalism, Stability
- **Hex Codes**:
  - Primary: `#003153`
  - Secondary: `#034975`
  - Tertiary: `#005582`
- **Usage**:
  - Primary backgrounds
  - Headers
  - Navigation elements
  - Key call-to-action areas

### 2. Blue Gray
- **Semantic Meaning**: Neutrality, Calm, Readability
- **Hex Codes**:
  - Primary: `#6E7F80`
  - Secondary: `#8A9A9B`
  - Tertiary: `#A4B4B6`
- **Usage**:
  - Body text
  - Subheadings
  - Border colors
  - Secondary components

### 3. Gold
- **Semantic Meaning**: Warmth, Luxury, Attention
- **Hex Codes**:
  - Primary: `#D4784D`
  - Secondary: `#E69B75`
  - Tertiary: `#F2BD9B`
- **Usage**:
  - Accent elements
  - Highlight sections
  - Interactive elements
  - Icons and dividers

### 4. Off-White
- **Semantic Meaning**: Clarity, Cleanliness, Minimalism
- **Hex Codes**:
  - Primary: `#F5F5F5`
  - Secondary: `#FAFAFA`
  - Tertiary: `#FFFFFF`
- **Usage**:
  - Background sections
  - Text on dark backgrounds
  - Light mode components

### 5. Dark Slate
- **Semantic Meaning**: Depth, Sophistication, Focus
- **Hex Codes**:
  - Primary: `#2F4F4F`
  - Secondary: `#3A5A5A`
  - Tertiary: `#456666`
- **Usage**:
  - Dark mode backgrounds
  - Footer sections
  - Alert and notification backgrounds

### 6. Emerald Green (Status Color)
- **Semantic Meaning**: Success, Positivity, Growth
- **Hex Codes**:
  - Primary: `#2ECC71`
  - Secondary: `#27AE60`
  - Tertiary: `#2980B9`
- **Usage**:
  - Success messages
  - Positive confirmations
  - Progress indicators
  - Validation states

## 🖌️ Color Application Guidelines

### Accessibility Principles
- Maintain minimum WCAG 2.1 AA contrast ratios
- Test color combinations across different devices
- Provide alternative color states for different interaction modes

### Dark Mode Considerations
- Use media queries to adapt color palette
- Ensure readability and visual comfort
- Maintain brand consistency across light and dark modes

### Interaction States
- **Default**: Primary color
- **Hover**: Secondary color with 10% brightness increase
- **Active/Pressed**: Tertiary color with 20% brightness decrease
- **Disabled**: 40% opacity of the default state color

## 📐 Color Combination Rules

### Text on Background
- **Dark Backgrounds**: Use Off-White or Blue Gray for text
- **Light Backgrounds**: Use Prussian Blue or Dark Slate for text
- Always check contrast ratio (minimum 4.5:1 for normal text)

### Gradient and Overlay Techniques
- Use gold and prussian blue for smooth, professional gradients
- Limit gradient usage to hero sections, headers, and key visual breaks
- Maintain 10-20% color transition zones

## 🔍 Design Token Example (for developers)
```javascript
const QODE_COLORS = {
  prussianBlue: {
    primary: '#003153',
    secondary: '#034975',
    tertiary: '#005582'
  },
  blueGray: { ... },
  gold: { ... },
  offWhite: { ... },
  darkSlate: { ... },
  emeraldGreen: { ... }
};
```

## 📦 Implementation Recommendations
- Use CSS custom properties
- Create a centralized color management system
- Develop a Figma/design system library
- Implement theme providers in React/Vue applications

## 🚀 Version Control
- **Current Version**: 1.0
- **Last Updated**: February 2024
- **Review Cycle**: Quarterly

---

**Note to Design and Development Teams**:
This color palette is the visual DNA of our brand. Consistent application ensures recognizability and professional presentation across all platforms.

## 🔤 Typography System

### Font Family Selection
#### Primary Font: Inter
- **Category**: Geometric Sans-Serif
- **Usage**: Primary body text, headings, and interfaces
- **Strengths**: 
  - Excellent readability
  - Modern, clean aesthetic
  - Wide language support
  - Optimized for digital screens

#### Secondary Font: Source Code Pro
- **Category**: Monospaced Font
- **Usage**: Code snippets, technical annotations, special callouts
- **Strengths**:
  - Crisp rendering in programming contexts
  - Clear distinction for technical content
  - Consistent character width

### Typography Scale

#### Heading Styles
```
h1: 48px / 3rem
    - Weight: 700 (Bold)
    - Line Height: 1.2
    - Letter Spacing: -0.02em

h2: 36px / 2.25rem
    - Weight: 700 (Bold)
    - Line Height: 1.3
    - Letter Spacing: -0.01em

h3: 24px / 1.5rem
    - Weight: 600 (Semi-Bold)
    - Line Height: 1.4
    - Letter Spacing: -0.005em

h4: 20px / 1.25rem
    - Weight: 600 (Semi-Bold)
    - Line Height: 1.5

h5: 18px / 1.125rem
    - Weight: 500 (Medium)
    - Line Height: 1.5

h6: 16px / 1rem
    - Weight: 500 (Medium)
    - Line Height: 1.6
```

#### Body Text Styles
```
Body Large: 18px / 1.125rem
    - Weight: 400 (Regular)
    - Line Height: 1.6
    - Used for main content paragraphs

Body Medium: 16px / 1rem
    - Weight: 400 (Regular)
    - Line Height: 1.5
    - Default body text

Body Small: 14px / 0.875rem
    - Weight: 400 (Regular)
    - Line Height: 1.4
    - Annotations, captions
```

#### Functional Text
```
Caption: 12px / 0.75rem
    - Weight: 400 (Regular)
    - Line Height: 1.3
    - Used for metadata, timestamps

Overline: 10px / 0.625rem
    - Weight: 500 (Medium)
    - Text Transform: UPPERCASE
    - Used for section identifiers
```

### Typography Web Implementation

#### CSS Custom Properties
```css
:root {
  /* Font Families */
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Source Code Pro', monospace;

  /* Font Sizes */
  --text-size-h1: 3rem;
  --text-size-h2: 2.25rem;
  --text-size-h3: 1.5rem;
  --text-size-body-large: 1.125rem;
  --text-size-body-medium: 1rem;
  --text-size-body-small: 0.875rem;
}
```

#### React/Tailwind Implementation
```jsx
const typographyClasses = {
  h1: 'text-[3rem] font-bold leading-tight tracking-tighter',
  h2: 'text-[2.25rem] font-bold leading-tight tracking-tight',
  bodyLarge: 'text-[1.125rem] font-normal leading-relaxed',
  // ... other classes
};
```

### Accessibility Considerations
- Minimum font size: 16px for body text
- Contrast ratio: Minimum 4.5:1 for text
- Support for system font scaling
- Responsive typography that adapts to screen sizes

### Font Loading Strategy
1. Use `font-display: swap`
2. Implement system font fallbacks
3. Preload critical fonts
4. Consider variable fonts for performance

### Performance Optimization
- Use WOFF2 font format
- Subset fonts to reduce file size
- Implement font-loading techniques

## 🚀 Version Control
- **Typography Version**: 1.0
- **Last Updated**: February 2024
- **Review Cycle**: Quarterly

---

**Design Principle**: 
Typography is the visual representation of our voice. Clean, precise, and purposeful—just like our code.