# Bento Layout Project Template

Ready-to-copy example: `templates/bento-project.template.md` (copy into `src/content/projects/<order>_<Domain>/your-project.md` and edit `assetsFolder`).

Hero subtitle color
- Optional per-project color: set `bento.hero.subtitleColor` to any CSS color (e.g., `"#ff6b00"`, `"#ff6b00cc"`, `"rgb(255, 107, 0)"`).
- Defaults to `bento.accentColor` if not provided.
- Example:
  - `bento.hero.subtitleColor: "#ff6b00"`

Copy this template to create a new project using the Bento layout system.

## File: `src/content/projects/[domain]/your-project.md`

```yaml
---
title: "Your Project Title"
description: "Brief description that appears in the hero card and project listings"
tech: ["Technology", "Stack", "Used", "In", "Project"]
status: "completed" # or "in-progress" or "planned"
link: "https://your-live-project.com" # Optional
github: "https://github.com/you/project" # Optional
date: 2024-03-15 # Project completion date
useBentoLayout: true # Enable bento layout

# Bento Layout Configuration
bento:
  # Theme color (supports any hex color)
  accentColor: "#ff6b00" # Change to match your project's branding
  
  # Card visibility toggles - set to false to hide cards
  cards:
    hero: true      # Main banner with title/description
    stats: true     # Project statistics
    actions: true   # Action buttons (play, demo, etc.)
    tech: true      # Technology stack pills
    process: true   # Development process steps
    gallery: true   # Image gallery
    challenges: true # Technical challenges faced
    results: true   # Results and impact
  
  # Hero card configuration
  hero:
    subtitle: "Project Category or Type"
    backgroundImage: "/path/to/your/hero-image.jpg" # Optional
    logo: "/path/to/your/logo.png" # Optional
  
  # Project statistics (customize as needed)
  stats:
    - value: "6"
      label: "Months"
    - value: "98%"
      label: "Score"
    - value: "15k"
      label: "Users"
    - value: "5"
      label: "Features"
  
  # Action buttons
  actions:
    title: "Experience" # Optional, defaults to "Experience"
    primary:
      text: "View Live"
      url: "https://your-project.com"
    secondary:
      text: "Source Code"
      url: "https://github.com/you/project" # Optional URL
  
  # Development process steps
  process:
    title: "Process" # Optional
    subtitle: "How the project was built" # Optional
    steps:
      - "Research and planning phase"
      - "Core development and iteration"
      - "Testing and user feedback"
      - "Deployment and optimization"
  
  # Gallery images
  gallery:
    title: "Gallery" # Optional
    images:
      - src: "/path/to/main-image.jpg"
        alt: "Main project screenshot"
      - src: "/path/to/detail-1.jpg"
        alt: "Feature detail view"
      - src: "/path/to/detail-2.jpg"
        alt: "Another project view"
  
  # Technical challenges overcome
  challenges:
    title: "Key Challenges" # Optional
    subtitle: "Problems solved during development" # Optional
    items:
      - title: "Performance Optimization"
        description: "How you solved performance issues or scaling challenges"
      - title: "User Experience"
        description: "UX challenges and design decisions that improved usability"
      - title: "Technical Integration"
        description: "Complex integrations or technical hurdles overcome"
  
  # Results and impact
  results:
    title: "Results" # Optional
    subtitle: "Project impact and outcomes" # Optional
    items:
      - icon: "🚀" # Use any emoji
        text: "Achieved 98% user satisfaction rating"
      - icon: "📈"
        text: "Increased efficiency by 40% for target users"
      - icon: "🏆"
        text: "Won 'Best Innovation' award at Tech Conference"
      - icon: "💡"
        text: "Featured in 5+ industry publications"
---

# Your Project Title

Your full project description and content goes here. This content appears 
when someone visits the direct project URL (`/projects/your-project`).

You can use markdown formatting, add images, code blocks, etc.

## Features

- List your key features
- Highlight main accomplishments
- Include technical details

## Technology Stack

The tech array above will be displayed as pills in the bento layout, 
but you can also elaborate here.

```

## Usage Instructions

### 1. Copy the Template
- Copy the template above to a new `.md` file
- Place it in the appropriate domain folder: `src/content/projects/[order]_[Domain]/your-project.md`

### 2. Customize Content
- **Title & Description**: Update with your project details
- **Tech Stack**: List all technologies used
- **Accent Color**: Choose a color that matches your project's branding
- **Assets**: Add your images to the same folder or Assets subfolder

### 3. Card Configuration
- **Toggle Cards**: Set any card to `false` to hide it
- **Stats**: Customize metrics that best represent your project
- **Process**: Adjust steps to match your development workflow
- **Gallery**: Add project screenshots and images
- **Challenges**: Highlight technical problems you solved
- **Results**: Show the impact and outcomes

### 4. Color Themes
Popular accent color suggestions:
- `#ff6b00` - Orange (energetic, creative)
- `#007bff` - Blue (professional, tech)
- `#28a745` - Green (growth, success)
- `#dc3545` - Red (bold, attention-grabbing)
- `#6f42c1` - Purple (innovative, creative)
- `#fd7e14` - Amber (warm, approachable)

### 5. Asset Organization
Recommended folder structure:
```
src/content/projects/3_YourDomain/
├── your-project.md
└── Assets_YourProject/
    ├── hero.jpg        # reserved filename for hero background
    ├── logo.png        # reserved filename for hero logo
    ├── screenshot-1.jpg
    ├── screenshot-2.jpg
    └── screenshot-3.jpg
```

### 6. Test Your Project
- Enable `useBentoLayout: true`
- Visit `http://localhost:4321/projects/your-project` to see the full page
- Test the overlay by clicking the project from the atom view
- Check responsive behavior on different screen sizes

### 7. Assets Folder Pattern (auto gallery)

To simplify image management, you can let the Bento template auto-build the hero and gallery from a single folder.

Frontmatter:

```
useBentoLayout: true
bento:
  assetsFolder: "/src/content/projects/3_YourDomain/Assets_YourProject"
  hero:
    subtitle: "Project Category or Type"
  gallery:
    title: "Gallery"
```

Rules:
- The template scans `assetsFolder` and includes all images (jpg/jpeg/png/webp/gif) in the gallery.
- Files named `hero.*` and `logo.*` are reserved for the hero background and logo and are excluded from the gallery.
- Matching is case-insensitive on the base name (e.g., `Logo.PNG` works).
- If you set `bento.hero.backgroundImage` or `bento.hero.logo`, those explicit values override auto-detected files.

## Tips

- **Hero Image**: Use high-quality, wide images (1400x400px recommended)
- **Gallery**: First image becomes the hero, others become thumbnails
- **Stats**: Keep values short and impactful
- **Process**: 3-5 steps work best for readability
- **Results**: Use descriptive emojis that relate to your achievements

The bento layout automatically adapts to different screen sizes and maintains 
the visual hierarchy across all devices.
