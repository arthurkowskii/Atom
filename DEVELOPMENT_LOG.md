# Atom Portfolio — Development Log (Micro Summary)

Links: docs/history/PHASE_LOGS.md · docs/history/ERRORS_LESSONS.md · plan.md

Snapshot
- Astro + GSAP atom metaphor (nucleus/shells/electrons); content‑driven.
- Static shells; electrons orbit (alt directions, random starts); spotlight + pause on electron hover.
- Tunables in `src/user-tweaks.js` → consumed by `src/atom.config.js`.

Recent (last 3)
- 2025‑08‑20: Phase 3A — One‑page overlay explored (circular reveal), micro‑interactions (config‑gated).
- 2025‑08‑19: Phase 2D+ — Advanced spotlight (global dim), refined hover state.
- 2025‑08‑19: Phase 2C+ — Modern shell hover (opacity/thickness), coordinated behaviors.

Key Lessons
- Animate electrons with GSAP transforms; keep shells static; prefer GSAP `attr` for SVG.
- Distance‑based shell hitbox; single state manager + RAF throttling for input/animation.

Focus Now
- Pick final overlay transition (mask shape/softness), keep perf/accessibility tidy.

Next
- Decide transition; consider domain accents + “chip” continuity; (later) subtle audio.

Entry Points
- `src/pages/index.astro` · `src/atom/core/OrbitSystem.js` · `src/atom.config.js` · `src/user-tweaks.js`
