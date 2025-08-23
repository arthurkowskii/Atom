---
title: "Kubika: A Cube Story"
description: "Mind-bending, gravity-shifting 3D Sokoban puzzle game. Created immersive spatial audio that adapts to gravity changes, featuring dynamic music layers and 3D positional sound systems."
tech: ["Unity", "FMOD", "Wwise", "Pro Tools", "C#", "Unity Mixer"]
status: "completed"
link: "https://kubika.itch.io/kubika-a-cube-story"
date: 2024-03-15
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Accent color theme (orange for Kubika)
  accentColor: "#ff6b00"
  
  # Centralized assets folder for hero/logo and gallery images
  assetsFolder: "/src/content/projects/2_Game Audio/Assets_Kubika"
  
  # Card visibility toggles
  cards:
    hero: true
    stats: true
    actions: true
    tech: true
    process: true
    gallery: true
    challenges: true
    results: true
  
  # Hero card configuration
  hero:
    subtitle: "Technical Sound Design"
    subtitleColor: "#ff6b00"
    backgroundPosition: "center top"
    backgroundSize: "cover"
    showLogo: false
  
  # Project stats
  stats:
    - value: "1y+"
      label: "DURATION"
    - value: "5 👨‍👩‍👦‍👦"
      label: "TEAM SIZE"
    - value : "PC"
      label : "PLATFORM"
    - value : KubiTeam
      label : COMPANY
  
  # Action buttons
  actions:
    title: "Experience"
    primary:
      text: "Play on itch.io"
      url: "https://kubika.itch.io/kubika-a-cube-story"
    secondary:
      text: "View Audio Demo"
      # url: Optional URL for demo
  
  # Development process
  process:
    title: "Process"
    subtitle: "From concept to shipping"
    steps:
      - "Audio system architecture & pipeline setup"
      - "Gravity-responsive 3D audio development"
      - "Adaptive music system & sound library"
      - "Integration testing & performance optimization"
  
  # Gallery images
  # Gallery now auto-populates from assetsFolder (excluding hero/logo files)
  gallery:
    title: "Gallery"
  
  # Technical challenges
  challenges:
    title: "Key Challenges"
    subtitle: "Technical problems solved during development"
    items:
      - title: "Gravity-Responsive Audio"
        description: "Developed custom 3D audio listener system that maintains spatial relationships regardless of world orientation"
      - title: "Performance Optimization"
        description: "Implemented audio pooling and LOD systems to handle complex 3D audio without performance impact"
      - title: "Adaptive Music System"
        description: "Created parametric music system with vertical remixing for seamless emotional transitions"
  
  # Results and impact
  results:
    title: "Results"
    subtitle: "Impact and recognition"
    items:
      - icon: "⭐"
        text: "5.0/5 star rating with specific praise for innovative audio design"
      - icon: "🎯"
        text: "Featured as case study for 3D audio in indie game development"
      - icon: "🔄"
        text: "Audio systems reused in team's subsequent projects"
      - icon: "🎧"
        text: "Enhanced the \"headphones recommended\" meditative experience"
---

# Kubika: A Cube Story

Mind-bending, gravity-shifting 3D Sokoban puzzle game featuring innovative spatial audio that adapts to gravity changes and immersive 3D positional sound systems.

## Project Overview

Created immersive spatial audio for this award-winning puzzle game, developing custom systems that respond dynamically to the game's unique gravity-shifting mechanics. The audio design maintains spatial relationships regardless of world orientation, creating a truly three-dimensional soundscape.

## Technical Achievements

- **Gravity-Responsive Audio**: Custom 3D audio listener system
- **Performance Optimization**: Audio pooling and LOD systems  
- **Adaptive Music System**: Parametric system with vertical remixing
- **45+ Sound Effects**: Complete audio library
- **8 Audio Layers**: Dynamic music composition

## Recognition

- 5.0/5 star rating with specific praise for innovative audio design
- Featured as case study for 3D audio in indie game development
- Audio systems reused in team's subsequent projects
- Enhanced the "headphones recommended" meditative experience
