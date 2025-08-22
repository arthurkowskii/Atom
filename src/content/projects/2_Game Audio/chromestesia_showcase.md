---
title: "Chromestesia"
description: "Plongez dans Chromestesia, platformer-combat à l’énergie punk forgé en moins d’un mois. Incarnez Michèle et basculez les couleurs pour métamorphoser les plateformes… et la musique !"
tech: ["FMOD", "Reaper", "Unity"]
status: "completed" # or "in-progress" | "planned"
link: "https://example.com"
github: "https://github.com/you/repo"
date: 2024-08-22
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Theme color
  accentColor: "#dfdb00ff"

  # REQUIRED for auto hero/logo + gallery
  # Put images here and name hero.* and logo.* for the hero card
  assetsFolder: "/src/content/projects/2_Game Audio/Assets_Chromestesia"

  # Toggle cards
  cards:
    hero: true
    stats: true
    actions: true
    tech: true
    process: true
    gallery: true
    challenges: true
    results: true

  # Hero subtitle only; hero/background/logo auto from assetsFolder
  hero:
    subtitle: "Musicien, Sound-Designer et Intégrateur Audio"
    subtitleColor: "#faf525"

  # Optional stats
  stats:
    - value: "1 Month"
      label: "DURATION"
    - value: "10 👨‍👩‍👦‍👦"
      label: "TEAM SIZE"
    - value : "PC"
      label : "PLATFORM"
    - value : ISART
      label : COMPANY

  # Optional actions
  actions:
    title: "Experience"
    primary:
      text: "View Live"
      url: "https://example.com"
    secondary:
      text: "Source Code"
      url: "https://github.com/you/repo"

  # Optional process
  process:
    title: "Process"
    steps:
      - "Research"
      - "Build"
      - "Test"
      - "Ship"

  # Gallery images auto from assetsFolder; title optional
  gallery:
    title: "Gallery"

  # Optional challenges
  challenges:
    title: "Key Challenges"
    items:
      - title: "Integration"
        description: "Brief description of what was hard and how you solved it."

  # Optional results
  results:
    title: "Results"
    items:
      - icon: "🚀"
        text: "Decreased load time by 45%"
---

# Your Project Title

A few paragraphs describing the project goals, your role, the tech, and the outcome. This Markdown is shown on the dedicated route `/projects/<slug>`.

## Highlights

- Key feature or achievement
- Another notable detail
- Any recognition, awards, or measurable impact
