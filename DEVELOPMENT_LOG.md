# Atom Portfolio — Development Log (Concise)

Use this as an executive summary for agentic AIs. Full details live in:
- docs/history/PHASE_LOGS.md — long-form phase-by-phase history
- docs/history/ERRORS_LESSONS.md — error catalog and fixes

Last updated: 2025-08-20 (Phase 3A complete)

## Project Snapshot

- Purpose: Interactive “atom” portfolio. Nucleus + concentric shells. Electrons represent projects grouped by domain. Smooth orbital motion, rich hover states, and an in-page project overlay.
- Stack: Astro + GSAP (client only), Astro Content Collections, SVG.
- Status: Stable motion/hover system; overlay and micro-interactions shipped; config-driven.

## Key Files

- src/pages/index.astro: Main scene, overlay, event wiring.
- src/atom/core/OrbitSystem.js: Electron orbital motion (GSAP transforms).
- src/atom/utils/electronPositioning.js: Random positions with min angular distance.
- src/atom/transition/radial.js: Circular reveal helpers (clip-path/GSAP).
- src/atom.config.js: Client-safe config exported from user tweaks.
- src/user-tweaks.js: Single place to tune sizes, speeds, transitions, micro-interactions.
- src/content/config.ts: Content schema; src/content/projects/*.md provide projects.

## How It Works

- Static geometry: Nucleus and shell rings are non-moving; electrons move via GSAP x/y transforms computed from angles.
- Domains → shells: Unique project domains form shells; electrons are projects within that domain.
- Random placement: Each electron gets a random angle with collision avoidance (min angular distance, wrap-around aware).
- Hover model: Two distinct systems coordinated by a single state source:
  - Shell hover: Opacity/thickness change only; motion continues.
  - Electron hover: Electron grows, global spotlight dims others, shell may accent, orbit pauses for that shell.
- Hitboxes: Distance-from-center tolerance bands (requestAnimationFrame throttled) ensure reliable shell hover without SVG overlap issues.
- Overlay: Clicking an electron opens a full-page circular masked overlay; pushes URL to /projects/:slug and restores on close.

## Configure Quickly (user-tweaks.js)

- atomScale, nucleusSize, nucleusHoverSize
- shellDistances.inner|middle|outer; shell.default.thickness|opacity; shell.hover.thickness|opacity|electronOpacity
- electrons.radius|hoverRadius|color; electronSpeeds.innerShell|middleShell|outerShell
- spacing.minElectronDistance
- overlayTransition.openMs|closeMs|easing
- micro.hoverCursorRing|ripple|shellPulse (toggles + durations/sizes/colors)

## Recent Changes (Phase 3A)

- One-page overlay with circular clip-path; no route swap during animation.
- Overlay content hydrated from minimal inline JSON (set via set:html).
- History push/replace on open/close; close via × or Esc.
- Configurable overlay timings and optional micro-interactions (ring, ripple, pulse).
- See docs/history/PHASE_LOGS.md for the full narrative and file diffs.

## Debug Checklist (High Signal)

- Units: Angles in degrees for OrbitSystem; convert to radians only for trig.
- Cross-browser: Firefox cannot CSS-animate SVG r; use GSAP attr for radius.
- Inline JSON: Inject with set:html; avoid HTML-escaped JSON that breaks JSON.parse.
- Event flood: Use rAF throttling for mousemove; precompute squared distances.
- State: Keep a single state machine; kill GSAP tweens on transitions to avoid buildup.
- Scope: Pass server-only values through atom.config.js; don’t import userTweaks in client code.

## Content Authoring

- Add a project: Drop a Markdown file in src/content/projects with frontmatter:
  - title, description, domain, tech[], link, github
- Domain name determines shell grouping; shells are generated from unique domains.

## Behavior Snapshot (Current)

- Smooth 60fps orbital motion; alternating shell directions; random starts.
- Hovering a shell adjusts its visuals; hovering an electron pauses that shell, grows electron, and globally dims others.
- Clicking an electron opens overlay; closing restores motion and URL.

## Pointers to Detail

- Errors and fixes: docs/history/ERRORS_LESSONS.md
- Phase history and architecture notes: docs/history/PHASE_LOGS.md

## Near-Term Ideas

- Domain accent + electron→overlay chip continuity.
- Soft/squircle mask and optional gooey tether during open.
- Optional backdrop close, atom scale/blur choreography, deep-link auto-open behind flags.

---

Notes for agents: Keep this file concise. If you need rationale, code snippets, or the blow-by-blow history, follow the links above. Prefer editing user-tweaks.js and atom.config.js for behavior; index.astro wires interactions and overlay.
