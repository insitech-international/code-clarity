# InsiTech International Design System v1.1

This document outlines the InsiTech International Design System, providing guidelines for creating a professional, cool, inviting, and user-friendly experience.  This version incorporates UI enhancements and best practices.

## 1. Brand Overview

### Mission Statement
*(To be defined by InsiTech leadership)*

### Target Market
Africa

### Brand Personality
- Professional
- Trustworthy
- Innovative
- Approachable
- Energetic

## 2. Color Palette

### Primary Color: Deep Blue
- **Hex:** `#0047AB`
- **Variants:**
  - Primary: `#0047AB`
  - Secondary: `#034975` (For subtle backgrounds or accents)
  - Tertiary: `#005582` (For very dark backgrounds, use sparingly)
- **Semantic Meaning:** Trust, Professionalism, Stability, Intelligence

### Secondary Color: Off-White / Light Beige
- **Hex:** `#F8F8F8` (Consider `#FFFFFF` for very clean look, or `#FAF9F6` for a warmer feel)
- **Variants:**
  - Primary: `#F8F8F8`
  - Secondary: `#F9F9F9` (For very subtle differentiation)
  - Tertiary: `#FFFFFF` 
- **Semantic Meaning:** Cleanliness, Openness, Calmness, Approachability

### Accent Color: Deep Orange / Coral
- **Hex:** `#E99361` (Consider `#F29A76` for a slightly softer look)
- **Variants:**
  - Primary: `#E99361`
  - Secondary: `#ECAB81` (For hover states or secondary actions)
  - Tertiary: `#F0C3A1` (For subtle highlights)
- **Semantic Meaning:** Warmth, Energy, Enthusiasm, Attention (use strategically)

### Interactive Color (for active states, highlights, links)
- **Hex:** `#4DB6AC` (Teal / Light Blue - evokes innovation)
- **Variants:**
    - Primary:  `#4DB6AC`
    - Secondary:  `#26A69A` (Darker version for contrast on light backgrounds)
    - Tertiary: `#80CBC4` (Lighter version for subtle highlights)

### Grayscale
- Light Gray: `#EEEEEE` (Consider `#F2F2F2` for a warmer tone)
- Medium Gray: `#9E9E9E` (For subtle dividers or secondary text)
- Dark Gray: `#424242` (For primary text on light backgrounds)

### Color Usage Guidelines:
- **Primary:** Used for main branding elements, headers, and key actions.
- **Secondary:** Used for backgrounds, secondary elements, and to create visual hierarchy.
- **Accent:** Used sparingly to highlight important elements, calls to action, and interactive components.
- **Interactive:** Used for links, active states, hover effects, and interactive elements.
- **Grayscale:** Used for text, borders, dividers, and to create visual balance.

### Accessibility Considerations
- Maintain WCAG 2.1 AA contrast ratios. Use a contrast checker tool (e.g., WebAIM).
- Provide color adaptations for dark mode (consider using CSS variables for easy switching).
- Consider accessibility in color combinations (e.g., for color blindness).  Test with different accessibility tools.

## 3. Typography

### Primary Font
- **Font:** Montserrat (Sans-Serif)
- **Google Fonts:** `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');`  (Include all weights)

### Font Weights and Usage
- **Headings (H1-H6):** Bold (700) or SemiBold (600)
- **Subheadings:** SemiBold (600) or Medium (500)
- **Body Text:** Regular (400)
- **Captions/Small Text:** Regular (400) or Light (300)

### Typography Scale (Examples - Adapt as needed)

#### Headings (Responsive)
- **H1:** 
  - Size: 48-60px (adjust for smaller screens)
  - Weight: Bold (700)
  - Line Height: 1.3-1.4
  - Letter Spacing: 0.02em

- **H2:**
  - Size: 36-48px (adjust for smaller screens)
  - Weight: SemiBold (600)
  - Line Height: 1.3-1.4

- **H3:**
  - Size: 24-32px (adjust for smaller screens)
  - Weight: SemiBold (600)
  - Line Height: 1.3

- **H4 - H6:** Scale down proportionally from H3.

#### Body Text (Responsive)
- **Primary Body Text:**
  - Size: 16-18px (consider 14px minimum on smaller screens)
  - Weight: Regular (400)
  - Line Height: 1.5-1.6
  - Color: Dark Gray (`#424242`)

### Accessibility Considerations
- Minimum font size: 16px for body text (consider responsive scaling).
- Contrast ratio: Minimum 4.5:1 (Use a contrast checker).
- Support system font scaling.
- Responsive typography (adjust font sizes, line heights, and letter spacing for different screen sizes).

## 4. Website Design Guidelines (UI Focused)

### General Principles
- Mobile-First Approach
- Prioritize Accessibility (WCAG 2.1 AA compliance)
- Consistent User Experience
- Clean and Modern Design
- Intuitive Navigation and Information Architecture
- Focus on User Needs and Goals

### Header Design
- **Background:** Deep Blue (`#0047AB`)
- **Logo:** Prominently displayed on the left side (Use SVG format for scalability and crispness).  Ensure sufficient spacing around the logo.
- **Navigation:**
  - Font: Montserrat SemiBold (600)
  - Link Color: White (`#FFFFFF`)
  - Hover Color: Light Gray (`#EEEEEE` or `#F2F2F2`)
  - Active Link: Interactive Color (`#4DB6AC`) with Darker version for text (`#26A69A`).  Consider a subtle background highlight or underline for active links.
  - Use clear and concise labels for navigation items.
  - Keep the number of navigation items to a reasonable amount (consider a "More" menu for secondary items).

### Hero Section
- **Background:** High-quality, relevant image or Deep Blue/Off-White combination.  Use a subtle overlay if needed to ensure text readability.
- **Headline:** Montserrat Bold (700), White or Deep Blue (depending on background).  Keep headlines concise and impactful.
- **Subheadline:** Montserrat SemiBold (600), Dark Gray.  Provide context and clarify the value proposition.
- **CTA Button:** Deep Orange (`#E99361`) background, White text.  Rounded corners (4-6px).  Use action-oriented verbs in button text (e.g., "Get Started," "Learn More").

### Content Sections
- **Background:** Off-White (`#F8F8F8`).  Consider using subtle background variations (e.g., slightly darker or lighter shades) to differentiate sections.
- **Headings:** Montserrat Bold/SemiBold, Deep Blue.  Use a clear hierarchy of headings (H2-H4) to structure content.
- **Body Text:** Montserrat Regular, Dark Gray (`#424242`).  Ensure good readability with appropriate line height and spacing.
- **Links:** Interactive Color (`#4DB6AC`), Hover to a darker shade (`#26A69A`).  Use clear link styles (e.g., underline or different color).

### Cards (for displaying information in a visually appealing way)
- **Background:** White (`#FFFFFF`) with a subtle box shadow for depth.
- **Border:** Light Gray (`#EEEEEE`) or transparent.
- **Content:** Follow the general typography and color guidelines.
- **Hover Effect:**  A subtle lift or background color change can enhance interactivity.

### Forms
- **Labels:** Dark Gray (`#424242`), Montserrat Regular.  Ensure labels are clearly associated with their respective input fields.
- **Input Fields:** White background, Light Gray border.  Use clear placeholder text.
- **Button:** Primary CTA style for submit buttons.

### Call to Action (CTA) Buttons
- **Primary CTA:**
  - Background: Deep Orange (`#E99361`)
  - Text: White
  - Font: Montserrat SemiBold (600)
  - Corners: Rounded (4-6px)
  - Hover Effect:  Slightly darker orange.

- **Secondary CTA:**
  - Border: Deep Orange
  - Background: Transparent
  - Text: Deep Orange
  - Font: