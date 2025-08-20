# Errors & Lessons — Atom Portfolio

Long‑form record of issues encountered and how we solved them. Keep DEVELOPMENT_LOG.md concise; link here for details.

---

## Cross‑Browser & Animation

1) Transform Origin Misuse
- Rotating shell groups with `transform-origin` broke layout.
- Fix: Keep shells static; animate electrons only via computed positions.

2) Choppy SVG Attribute Animation
- Directly animating `cx/cy` was janky.
- Fix: Set base attributes; animate GSAP `x/y` transforms for hardware acceleration.

3) CSS Hover Values Not Updating
- Astro CSS couldn’t read template literals.
- Fix: Use `define:vars` and CSS custom properties; or GSAP attr animations.

4) Firefox SVG Attribute Transitions
- Firefox doesn’t animate `r` via CSS.
- Fix: Use GSAP `attr` animations for cross‑browser reliability.

---

## Positioning & Spacing

5) Minimum Distance Between Electrons
- Mismatch between degrees vs radians; too many random offsets.
- Fix: Keep units consistent; random placement with collision avoidance + wrap‑around; fallback after attempts.

---

## Hover State & Performance

6) Shell Hover State Conflicts
- Rapid enter/leave, stuck states, opacity resets.
- Fix: Debounced events; single source of truth; helper functions; pass server values to client via config.

7) Spotlight Refinement
- Needed distinct behavior for shell vs electron; motion pause only on electron.
- Fix: Split concerns; global spotlight on electron hover only.

8) Hitbox Precision
- Overlapping SVG hitboxes blocked inner shells.
- Fix: Game‑style distance check from center with a tolerance ring; single `mousemove` listener.

9) Hover Performance Degradation
- Too many timeouts and mouse events; race conditions.
- Fix: RequestAnimationFrame throttling; squared‑distance checks; interrupt animations; immediate state machine.

---

## Data & Build

10) Inline JSON Injection Crash
- `JSON.parse` failed because inline JSON was HTML‑escaped.
- Fix: Use Astro’s `set:html` for raw JSON injection.

---

These fixes are reflected in `src/pages/index.astro`, `src/atom/core/OrbitSystem.js`, and `src/atom.config.js`. When debugging, verify unit consistency, cross‑browser behavior, and state coordination first; then profile event frequency and animation queues.

