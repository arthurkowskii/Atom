---
title: "LE SUPER MEGA SHOW !"
altTitle: "LE SUPER MEGA SHOW!"
description: "\"LE SUPER MEGA SHOW!\" est une série audio et un court-métrage conçus, écrits et réalisés par Arthur Kowskii. Talk-show fictif inzpiré des émissions emblématiques des 70s et ruit de la collaboration entre Arthur Kowskii et le comédien belge Benoit Grimmiaux (Bojack Horseman...) qui incarne le présentateur."
tech: ["Ableton", "Reaper", "Davinci Resolve"]
status: "completed" # or "in-progress" | "planned"
link: "https://example.com"
github: "https://github.com/you/repo"
date: 2024-08-22
useBentoLayout: true

# Bento Layout Configuration
bento:
  # Theme color
  accentColor: "#feee5a"

  # REQUIRED for auto hero/logo + gallery
  # Put images here and name hero.* and logo.* for the hero card
  assetsFolder: "/src/content/projects/1_Music/Assets_lesupermegashow"

  # Toggle cards
  cards:
    hero: true
    stats: false
    musicLinks: true
    video: true
    spotify: true
    actions: true
    tech: false
    process: false
    gallery: true
    challenges: true
    results: true

  # Hero subtitle only; hero/background/logo auto from assetsFolder
  hero:
    subtitle: "Court-Métrage et Série-Audio"
    subtitleColor: "#faf525"
    backgroundPosition: "top"
    backgroundSize: "cover"
    backgroundScale: 1.1  # Alternative to backgroundSize - use 1.1, 0.9, etc.
    overlayTopOpacity: 0.2   # Controls dark overlay opacity at top (0.0 = transparent, 1.0 = opaque)
    overlayBottomOpacity: 0.6 # Controls dark overlay opacity at bottom (0.0 = transparent, 1.0 = opaque)
    showLogo: false

  # Optional stats
  stats:
    - value: "2y"
      label: "DURATION"
    - value: "5 👨‍👩‍👦‍👦"
      label: "TEAM SIZE"
    - value : "Youtube"
      label : "PLATFORM"
    - value : Kowskii
      label : COMPANY

  # Optional actions
  actions:
    title: "Experience"
    primary:
      text: "📽️ Regarder le Court-Métrage"
      url: "https://youtu.be/GtoGUcY1K1Y?si=YQXis7RFPEgLKbPy"
    secondary:
      text: "💽 Écouter l'Album"
      url: "https://open.spotify.com/album/1y7wp1DtYeQpGxxhoC2i3t?si=gVXYTvsqRoC6D18xovDuYg"

  # Video configuration
  video:
    title: "LE SUPER MEGA SHOW (COURT-METRAGE DE L'ALBUM)"
    url: "https://youtu.be/GtoGUcY1K1Y?si=XI7niHdCjUYA1L8s"
    description: "À SUIVRE dans l'album LE SUPER MEGA SHOW !, disponible sur toutes les plateformes. Vous pouvez soutenir et acheter l'album à PRIX LIBRE sur Bandcamp pour soutenir les prochains projets."

  # Spotify configuration
  spotify:
    title: "LE SUPER MEGA SHOW - Album"
    url: "https://open.spotify.com/album/1y7wp1DtYeQpGxxhoC2i3t?si=UTvZ7TS4QWqUKtuilpaMpQ"
    description: "L'album complet disponible sur Spotify avec tous les morceaux et interludes"

  # Music links (exactly 4 items). Enable with cards.musicLinks: true
  musicLinks:
    title: "Music Links"
    items:
      - text: "Spotify"
        url: "https://open.spotify.com/album/1y7wp1DtYeQpGxxhoC2i3t?si=gVXYTvsqRoC6D18xovDuYg"
      - text: "Apple Music"
        url: "https://music.apple.com/fr/album/le-super-mega-show/1768698755"
      - text: "Bandcamp"
        url: "https://kowskii.bandcamp.com/album/le-super-mega-show-album"
      - text: "YouTube"
        url: "https://youtu.be/GtoGUcY1K1Y?si=YQXis7RFPEgLKbPy"

  # Optional process
  process:
    title: "Tracklist"
    steps:
      - "LE SUPER MEGA SHOW !"
      - "PINK CAR RIDE TO YOU (feat. ABAD)"
      - "Bienvenue"
      - "THE LAST SHADOW PUPPETS (feat. Theo Goude, ABAD)"
      - "KINTSUGI (feat. Damon, ABAD)"
      - "L'interview"
      - "SHARE A SILENCE"
      - "Le Public... ?"
      - "ENFER ET LAPIN BLANC"
      - "T'es nouveau c'est ça ?"
      - "XR 300 (feat. MAI)"
      - "ENFANT"
      - "C'est toi ?"
      - "PARIS Z80"
      - "The End"
      - "Rolling Credits (feat. Theo Goude, Damon)"

  # Gallery images auto from assetsFolder; title optional
  gallery:
    title: "Gallery"

  # Optional challenges
  challenges:
    title: "Key Challenges"
    subtitle: "Défis principaux rencontrés lors de ce projet"
    items:
      - title: "Un album... et une série audio"
        description: "LE SUPER MEGA SHOW ! » est un projet hybride, à la fois album et série audio. Il réunit plusieurs titres entrecoupés de courts épisodes narratifs qui ancrent l’histoire au sein de la musique. L’enjeu principal a été de trouver le bon équilibre entre narration et morceaux afin de proposer une expérience fluide et captivante. Pour garantir la continuité entre chaque épisode et chaque chanson, il a été indispensable de travailler sur une tracklist fixe"
      - title: "Casting"
        description: "Le présentateur du « Super Mega Show » a été écrit comme un personnage aussi charismatique qu'étrange. Il était donc primordial de trouver le comédien de doublage idéal pour lui donner vie. Le rôle a finalement été interprété par le comédien de doublage Benoit Grimmiaux (Bojack Horseman, Pokémon, Rick et Morty...). Travailler avec Benoit, d’abord une idole puis un véritable compagnon créatif, a été pour moi un immense honneur et une grande fierté."
      - title: "Un album, une série audio... et puis un film !"
        description: "Plus nous travaillions avec Benoit, plus nous mettions de cœur dans ce projet et ses fondations. C’est lors de l’enregistrement des épisodes audio qu’a émergé peu à peu l’envie irrésistible de passer à l’image. Pourtant, cela semblait impossible : je n’avais jamais écrit de script professionnel de cette ampleur, jamais storyboardé, monté ou préparé une équipe de tournage, conçu une mise en scène, un plan lumière, un schéma de plateau pour les techniciens, ni même assuré une réalisation sur le plateau. Et pourtant, c’est finalement tout cela que j’ai été amené à accomplir"

  # Optional results
  results:
    title: "Results"
    items:
      - icon: "🎬"
        text: "Un court métrage de 12 minutes comprenant 2 clips musicaux (XR 300, ENFANT)."
      - icon: "💽"
        text: "Un album de 16 titres (18 en physique) comprenant 7 épisodes audio et 9 morceaux"
      - icon: "📼"
        text: "Une sortie physique en cassette, pour suivre la direction artistique de l'album à 50 exemplaires." 
      
---

# Your Project Title

A few paragraphs describing the project goals, your role, the tech, and the outcome. This Markdown is shown on the dedicated route `/projects/<slug>`.

## Highlights

- Key feature or achievement
- Another notable detail
- Any recognition, awards, or measurable impact
