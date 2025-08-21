# Phase 3B — Electron Progressive Reveal Transition

Status: planned
Owner: core
Created: 2025-08-21

## Summary

Roll out the progressive reveal navigation (circular mask that lets the destination page paint during the animation) to all electron clicks, mirroring the current nucleus→bio experience.

## Rationale

- Prevents “flash after animation” by painting destination content early.
- Unifies navigation feel across nucleus and electrons.
- Keeps motion tasteful while respecting reduced-motion preferences.

## Scope

- Apply to electron→overlay/project navigation across the atom scene.
- Reuse/extend `src/atom/transition/radial.js` for circular-mask transitions.
- Integrate with existing history semantics (push on open, restore on close).

Non-goals

- Redesigning overlay content or project data model.
- Changing external API contracts.

## Acceptance Criteria

- Clicking any electron triggers the circular reveal; destination starts rendering during expansion.
- No input is accepted while the mask is expanding (until navigation/overlay ready).
- Respects `prefers-reduced-motion: reduce` (falls back to immediate navigation/open).
- No flicker on low-end devices; 60fps on typical hardware.
- All GSAP tweens are disposed on completion or cancel.

## Technical Plan

- Abstract a reusable helper in `src/atom/transition/radial.js` (or thin wrapper) for electron-origin transitions:
  - Calculate cover radius from click point and viewport.
  - Delay navigation until ≥85% expansion and a minimum on-screen time (~180ms).
  - Optionally soften edges (blur) via `edgeSoftnessPx`.
- Preload destination content:
  - For overlay: mount hidden container and hydrate minimal payload before/during expansion.
  - For route navigations: trigger prefetch (Astro link prefetch or manual) on hover.
- Wire into electron click handler in `src/pages/index.astro` (or the relevant controller):
  - Block input while transition is active.
  - Preserve existing history push/replace behavior from Phase 3A.
- Config flags in `src/user-tweaks.js` (exposed via `src/atom.config.js`):
  - `navTransition.enabled`, `openMs`, `closeMs`, `easing`, `edgeSoftnessPx`.
- QA harness:
  - Toggle reduced motion; verify immediate open.
  - Test Chrome/Firefox/Safari; validate no SVG attr animation regressions.

## Tasks

- [ ] Add/extend transition util in `src/atom/transition/radial.js` for electron origin
- [ ] Preload destination (overlay payload or route prefetch) prior to 85% expansion
- [ ] Integrate with electron click path in `src/pages/index.astro`
- [ ] Add `navTransition` config in `src/user-tweaks.js` and pipe through `src/atom.config.js`
- [ ] Block input during transition; ensure cleanup
- [ ] Respect reduced motion and add tests for fallback path
- [ ] Cross-browser sanity (Chrome, Firefox, Safari)
- [ ] Performance check on low-end device; adjust timings if needed
- [ ] Update `DEVELOPMENT_LOG.md` after ship

## Risks / Mitigations

- Early paint race conditions → enforce minimum on-screen time and preload payloads.
- Event leakage during transition → centralize input blocking on fixed overlay container.
- GSAP tween buildup → kill/cleanup tweens on state transitions and navigation.

## Links

- Design/behavior: `docs/history/PHASE_LOGS.md` (TODO section for Phase 3B)
- Current helper: `src/atom/transition/radial.js`
