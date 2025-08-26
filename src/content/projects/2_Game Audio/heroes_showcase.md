---
title: "Sound ReDesign : Heroes of Might and Magic VI"
altTitle: "Heroes VI Redesign"
description: "Recréation de la musique et du sound design du trailer de Heroes of Might and Magic VI dans le cadre d’un projet d'étude. Contraintes : une orchestration traditionnelle, sans synthés, guitares ni aucun instrument moderne."
tech: ["Reaper", "Phase Plant"]
status: "completed"
link: "https://kubika.itch.io/kubika-a-cube-story"
date: 2024-03-15
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Accent color theme
  accentColor: "#e50000"
  
  # Centralized assets folder for hero/logo and gallery images
  assetsFolder: "/src/content/projects/2_Game Audio/Assets_Heroes"
  
  # Card visibility toggles
  cards:
    hero: true
    stats: true
    musicLinks: false
    video: false
    spotify: false
    actions: true
    tech: true
    process: true
    gallery: true
    challenges: true
    results: true
  
  # Hero card configuration
  hero:
    subtitle: "Musique et Sound Design"
    subtitleColor: "#e50000"
    backgroundPosition: "center"
    backgroundSize: "cover"
    backgroundScale: 1  # Alternative to backgroundSize - use 1.1, 0.9, etc.
    overlayTopOpacity: 0.1   # Controls dark overlay opacity at top (0.0 = transparent, 1.0 = opaque)
    overlayBottomOpacity: 0.55 # Controls dark overlay opacity at bottom (0.0 = transparent, 1.0 = opaque)
    showLogo: false
  
  # Project stats
  stats:
    - value: "2 Weeks"
      label: "DURATION"
    - value: "1 👨‍👩‍👦‍👦"
      label: "TEAM SIZE"
    - value : "VIDEO"
      label : "PLATFORM"
    - value : ISART
      label : COMPANY
  
  # Action buttons
  actions:
    title: "Links"
    primary:
      text: "📽️ Watch the Full Trailer Remake"
      url: "https://youtu.be/OK9EgEImmZc?si=dzKnXIHsKYrMNpUF"
    secondary:
      text: "Original Trailer from Ubisoft"
      url: "https://youtu.be/IHwRdqbSQdM?si=GAwNMfhBCVJjL63F"

  # Video configuration
  video:
    title: "Kubika: Gameplay Trailer"
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ" # Replace with actual Kubika trailer
    description: "Watch the gravity-defying puzzle mechanics and immersive 3D audio in action"

  # Music links (exactly 4 items). Enable with cards.musicLinks: true
  musicLinks:
    title: "Music Links"
    items:
      - text: "Spotify"
        url: "https://open.spotify.com/"
      - text: "Apple Music"
        url: "https://music.apple.com/"
      - text: "Bandcamp"
        url: "https://bandcamp.com/"
      - text: "YouTube"
        url: "https://youtube.com/"
  
  # Development process
  process:
    title: "Process"
    subtitle: "From concept to shipping"
    steps:
      - "Conception des SFX avec PhasePlant et Reaper"
      - "Conception d'une banque de son en relation avec le projet"
      - "Composition de la musique sous les contraintes de DA : instrument fantasiste, cordes... pas de synthé. pas d'instruments modernes."
      - "Assemblage de la musique et des SFX dans Reaper directement"
      - "Mixage et Mastering en respectant les normes de rendus"
  
  # Gallery images
  # Gallery now auto-populates from assetsFolder (excluding hero/logo files)
  gallery:
    title: "Gallery"
  
  # Technical challenges
  challenges:
    title: "Key Challenges"
    subtitle: "Technical problems solved during development"
    items:
      - title: "Détection des différents type de cube"
        description: "Developed custom 3D audio listener system that maintains spatial relationships regardless of world orientation"
      - title: "Concevoir un son joué plus d'une cinquantaine de fois par minute et le rendre plaisant"
        description: "Implemented audio pooling and LOD systems to handle complex 3D audio without performance impact"
      - title: "Optimisation des performances"
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
