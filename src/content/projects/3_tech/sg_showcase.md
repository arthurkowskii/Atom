---
title: "Starting_Grid_for_Reaper Script"
altTitle: "Starting Grid for Reaper"
description: "Starting\_Grid for Reaper est un script qui prend tous vos items sélectionnés (peu importe le type) et qui les place au début de leurs pistes. Le script fonctionne avec tous les types d’items supportés par Reaper et est destiné aux longues sessions de sampling qui résultent souvent en une multitude de samples éparpillés sur une longue durée."
tech: ["Lua", "Reascript"]
status: "completed" 
link: "https://github.com/arthurkowskii/StartingGrid_for_Reaper"
github: "https://github.com/arthurkowskii/StartingGrid_for_Reaper"
date: 2024-08-22
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Theme color
  accentColor: "#b50606"

  # REQUIRED for auto hero/logo + gallery
  # Put images here and name hero.* and logo.* for the hero card
  assetsFolder: "/src/content/projects/3_tech/Assets_sg"

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
    subtitle: "Lua script for Reaper"
    subtitleColor: "#2666ec"
    backgroundPosition: "center"
    backgroundSize: "cover"
    backgroundScale: 1 # Alternative to backgroundSize
    overlayTopOpacity: 0  # Controls dark overlay opacity at top (0->1)
    overlayBottomOpacity: 0.5  # Controls dark overlay opacity at bottom (0->1)
    showLogo: false

  # Optional stats
  stats:
    - value: "Lua"
      label: "LANGUAGE"
    - value: "0€+"
      label: "PRICE"
    - value: "Reaper"
      label: "PLATFORM"
    - value: "Kowskii"
      label: "CREATOR"

  # Optional actions
  actions:
    title: "Experience"
    primary:
      text: "🛒 Télécharger à prix libre sur Gumroad"
      url: "https://arthurkowskii.gumroad.com/"
    secondary:
      text: "🗃️ Voir sur le projet sur GitHub"
      url: "https://github.com/arthurkowskii/StartingGrid_for_Reaper"

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
    title: "Guide d'Utilisation"
    steps:
      - "Séléctionner les items, (quel que soit le type)"
      - "Enclencher le script depuis le menu Actions \"?\" ou par raccourci"
      - "Les items sont maintenant rangés au début de leurs pistes !"

  # Gallery images auto from assetsFolder;
  gallery:
    title: "Gallery"

  # Optional challenges
  challenges:
    title: "Défis techniques"
    items:
      - title: "Embouteillages"
        description: "Anticipation en cas d’item déjà existant au début d’une piste; Dans ce cas, l’item sélectionné se mettra collé à la suite de celui-ci"
      - title: "Séléction mutliple"
        description: "En cas de sélection de plusieurs items appartenant à la même piste, ceux-ci vont se positionner de façon séquentielle en respectant l'ordre d’origine."

  # Optional results
  results:
    title: "Features"
    items:
      - icon: "✅"
        text: "Fonctionne avec tous les types d’items supportés par Reaper"
      - icon: "⚡"
        text: "Temps de réponse immédiat"
      - icon: "🐦"
        text: "Léger, rapide et efficace"
      - icon: "💸"
        text: "Gratuit ! (pas cher)"
---

# Your Project Title

A few paragraphs describing the project goals, your role, the tech, and the outcome. This Markdown is shown on the dedicated route `/projects/<slug>`.

## Highlights

- Key feature or achievement
- Another notable detail
- Any recognition, awards, or measurable impact
