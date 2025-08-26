---
title: "Youtube_to_Reaper Script"
altTitle: "Youtube_to_Reaper Script"
description: "A lua script for reaper that takes the last Youtube/Soundcloud link from your clipboard"
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
  assetsFolder: "/src/content/projects/2_tech/Assets_yt"

  # Toggle cards
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

  # Hero subtitle only; hero/background/logo auto from assetsFolder
  hero:
    subtitle: "Musicien, Sound-Designer et Intégrateur Audio"
    subtitleColor: "#faf525"
    backgroundPosition: "center"
    backgroundSize: "cover"
    backgroundScale: 1.4  # Alternative to backgroundSize - use 1.1, 0.9, etc.
    overlayTopOpacity: 0.1  # Controls dark overlay opacity at top (0.0 = transparent, 1.0 = opaque)
    overlayBottomOpacity: 0.8  # Controls dark overlay opacity at bottom (0.0 = transparent, 1.0 = opaque)
    showLogo: false

  # Optional stats
  stats:
    - value: "Lua"
      label: "LANGUAGE"
    - value: "0€+"
      label: "PRICE"
    - value : "Reaper"
      label : "PLATFORM"
    - value : Kowskii
      label : CREATOR

  # Optional actions
  actions:
    title: "Experience"
    primary:
      text: "AVAILABLE SOON"
      url: ""
    secondary:
      text: "🛒 Arthur Kowskii GUMROAD SHOP"
      url: "https://arthurkowskii.gumroad.com/"

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
        url: "https://youtu.be/6aKB7nFtJQo?si=a0XfJuEDsXJyw6F2"

  # Optional process
  process:
    title: "Process"
    steps:
      - "Création et conception de l'intégralité des SFX pour constituer une banque de son propre au projet."
      - "Création des musiques ainsi que de leurs variantes (chaque musique à deux versions dans ce jeu)"
      - "Intégration des musiques, SFX et mixage dans FMOD"
      - "Spatialisation et intégration dans UNITY"
      - "Extra : Création de graphitis, Conception de la cinématique d'introduction, animation du personnage jouable"

  # Gallery images auto from assetsFolder; title optional
  gallery:
    title: "Gallery"

  # Optional challenges
  challenges:
    title: "Key Challenges"
    items:
      - title: "Réactivité du système de music-switch"
        description: "Dans ce jeu le joueur peut changer les pistes musicales à volonté grâce au système de switch. Pour une expérience fluide, un système de synchornisation musicale associé a un système de cooldown a permi de rendre cette expérience très satisfaisant pour le joueur."

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
