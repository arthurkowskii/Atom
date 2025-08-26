---
title: "FMOD Demo : Interactive JDR"
altTitle: "FMOD Demo"
description: "Conception d’un projet FMOD pour un jeu de rôle. Le pitch : un jeu d’horreur situé dans un univers de science-fiction spatial, dans l’esprit de Dead Space.Le jeu comporte quatre phases de gameplay distinctes : exploration, infiltration, combat et survie — toutes contrôlées dynamiquement via le paramètre “INTERACTIVITY”."
tech: ["Reaper", "FMOD"]
status: "completed"
link: "https://youtu.be/URPsqY7SwxY?si=orus46GsXuOBT0hj"
date: 2024-03-15
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Accent color theme
  accentColor: "#ff0000ff"
  
  # Centralized assets folder for hero/logo and gallery images
  assetsFolder: "/src/content/projects/2_Game Audio/Assets_FMOD"
  
  # Card visibility toggles
  cards:
    hero: true
    stats: true
    musicLinks: false
    video: true
    spotify: false
    actions: true
    tech: true
    process: false
    gallery: true
    challenges: true
    results: true
  
  # Hero card configuration
  hero:
    subtitle: "Démonstration Musique Dynamique"
    subtitleColor: "#e50000"
    backgroundPosition: "center"
    backgroundSize: "cover"
    backgroundScale: 1  # Alternative to backgroundSize - use 1.1, 0.9, etc.
    overlayTopOpacity: 0.0   # Controls dark overlay opacity at top (0.0 = transparent, 1.0 = opaque)
    overlayBottomOpacity: 0.0 # Controls dark overlay opacity at bottom (0.0 = transparent, 1.0 = opaque)
    showLogo: true
  
  # Project stats
  stats:
    - value: "2 Weeks"
      label: "DURATION"
    - value: "1 👨‍👩‍👦‍👦"
      label: "TEAM SIZE"
    - value : "FMOD"
      label : "PLATFORM"
    - value : ISART
      label : COMPANY
  
  # Action buttons
  actions:
    title: "Links"
    primary:
      text: "📽️ Watch the DEMO"
      url: "https://youtu.be/URPsqY7SwxY?si=orus46GsXuOBT0hj"
    secondary:
      text: "Original Trailer from Ubisoft"
      url: "https://youtu.be/IHwRdqbSQdM?si=GAwNMfhBCVJjL63F"

  # Video configuration
  video:
    title: "INTERACTIVE JDR - SPACE ABYSS"
    url: "https://youtu.be/URPsqY7SwxY?si=orus46GsXuOBT0hj"
    description: "Conception d’un projet FMOD pour un jeu de rôle. Le pitch : un jeu d’horreur situé dans un univers de science-fiction spatial, dans l’esprit de Dead Space. L’ambiance sonore y joue un rôle central, renforçant la tension et l’immersion du joueur à chaque instant. Le jeu comporte quatre phases de gameplay distinctes : exploration, infiltration, combat et survie — toutes contrôlées dynamiquement via le paramètre “INTERACTIVITY”."

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
    title: "Pitch"
    subtitle: ""
    items:
      - title: ""
        description: "Nous allons avoir besoin que tu composes de la musique interactive pour notre jeu avec des phases distinctes. Pour ce faire, dans l’application, nous allons appeler un paramètre que tu devras créer qui contiendra donc plusieurs états. Ce paramètre nous l’avons appelé INTERACTIVITY."
      - title: "État 0 : Mise en contexte narration"
        description: "Menu d'ouverture du jeu; mise en contexte."
      - title: "État 01 + 1.5 : Musique de réflexion / Idle"
        description: "c’est la musique que l’on entendra le plus souvent, celle qui permettra aux joueurs de discuter, réfléchir, lancer les dés etc...). Au bout d'un certain temps une couche de layer supplémentaire (1.5) accentue le sentiment d'urgence."
      - title : "État 02 : Musique de combat avec transition"
        description: "Lorsque l’on tombe sur un ennemi. Il faudra que la transition entre la musique de réfléxion et la musique de combat se fasse immédiatement et de façon très musicale"
      - title: "Victoire et transition : 02 -> Win -> 01"
        description: "Musique de fin de combat victorieuse : jingle qui clos le combat (on doit pouvoir revenir sur la musique de réflexion après ça)"
      - title: "Défaite et transition : 02 -> Loose -> 01"
        description: "Musique de fin de combat défaite suivie d’une loop pour expliquer la fin du jeu : c’est le game over. Attention : on peut également mourir en phase de réflexion, donc il faut que l’on puisse également aller à l’état 3 depuis l’état 1"
  
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
