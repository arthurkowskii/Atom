# Atom Portfolio — Development Log (Concise)

Use this as an executive summary for agentic AIs. Full details live in:
- docs/history/PHASE_LOGS.md — long-form phase-by-phase history
- docs/history/ERRORS_LESSONS.md — error catalog and fixes

Last updated: 2025-08-21 (Phase 3B shipped; dynamic shells + labels)

## Project Snapshot

- Purpose: Interactive “atom” portfolio. Nucleus + concentric shells. Electrons represent projects grouped by domain. Smooth orbital motion, rich hover states, and an in-page project overlay.
- Stack: Astro + GSAP (client only), Astro Content Collections (projects, bio), Decap CMS (admin; local proxy), SVG.
- Status: Phase 3A shipped; 3B planned. Stable motion/hover system; overlay and micro-interactions shipped; config-driven.
- CMS: Decap admin is local-only for now; choose production backend (git-gateway/GitHub) during deploy.

## Quickstart

- Run: `npm install`, then `npm run dev` (opens at http://localhost:4324).
- Build/Preview: `npm run build`, then `npm run preview`.
- Admin CMS: visit `/admin` (Decap uses local proxy; production backend TBD).

## Next Actions

- Validate dynamic shells across 1–5 domain folders; tune spacing/label density if needed.
- Decide production Decap backend for deployment (git-gateway or GitHub).
- Add SEO/meta polish for `/bio` (title/description/og image) when finalizing.

## Key Files

- src/pages/index.astro: Main scene, overlay, event wiring, dynamic shell/viewport generator.
- src/atom/core/OrbitSystem.js: Electron orbital motion (GSAP transforms).
- src/atom/utils/electronPositioning.js: Random positions with min angular distance.
- src/atom/transition/radial.js: Circular reveal helpers (clip-path/GSAP).
- src/atom.config.js: Client-safe config exported from user tweaks (now exposes navTransition/dynamicShells/labels density).
- src/user-tweaks.js: Central knobs (sizes, speeds, transitions, micro, labels, dynamicShells).
- src/content/config.ts: Content schema; `src/content/projects/**` now folder-driven domains.
- public/admin/config.yml: Decap config (domain select removed; rely on folders).

## How It Works

- Static geometry: Nucleus and shell rings are non-moving; electrons move via GSAP x/y transforms computed from angles.
- Domains → shells (dynamic): Top-level folders under `src/content/projects/` determine domains. Numeric prefixes (e.g., `1_Music`, `2_Sound-Design`) drive order; names are transformed to slugs (kebab) and display (UPPERCASE). Up to 5 shells are rendered (extras hidden).
- Shell radii/viewport: Radii are generated from a base radius plus a gap that shrinks as N grows; viewport auto-computed to avoid clipping.
- Random placement: Each electron gets a random angle with collision avoidance (min angular distance, wrap-around aware).
- Labels: Ring pattern (full-circle) with per-shell start offsets; repeat density auto-computed from circumference (overrides available). Alternate mode: single curved word (static arc) per shell.
- Hover model: Two distinct systems coordinated by a single state source:
  - Shell hover: Opacity/thickness change only; motion continues.
  - Electron hover: Electron grows, global spotlight dims others, shell may accent, orbit pauses for that shell; label brightens.
- Hitboxes: Distance-from-center tolerance bands (requestAnimationFrame throttled) ensure reliable shell hover without SVG overlap issues.
- Overlay: Clicking an electron opens a full-page circular masked overlay; pushes URL to /projects/:slug and restores on close.

## Configure Quickly (user-tweaks.js)

- atomScale, nucleusSize, nucleusHoverSize
- electrons.radius|hoverRadius|color; electronSpeeds.*, spacing.minElectronDistance
- overlayTransition.openMs|closeMs|easing|edgeSoftnessPx (bio/nucleus)
- navTransition.enabled|inMs|outMs|easing|edgeSoftnessPx|blockInput (electrons)
- dynamicShells.enabled|baseRadius|baseGap|minGap|maxGap|directionMode|speed.base|speed.deltaPerShell
- labels:
  - mode: `ringPattern` (default) | `orbiting` | `ring`
  - fontSize|offsetPx|idleOpacity|hoverOpacity
  - pattern.repeatsByShell (optional), pattern.densityPxPerRepeat|minRepeats|maxRepeats, pattern.offsetsPercentByShell, separator
  - wordOrbit.innerOffsetPx|arcDegrees|centerAngleDeg
- micro.hoverCursorRing|ripple|shellPulse (toggles + durations/sizes/colors)

## Recent Changes (Phase 3A)

- One-page overlay with circular clip-path; no route swap during animation.
- Overlay content hydrated from minimal inline JSON (set via set:html).
- History push/replace on open/close; close via × or Esc.
- Configurable overlay timings and optional micro-interactions (ring, ripple, pulse).
- See docs/history/PHASE_LOGS.md for the full narrative and file diffs.

## Recent Changes (Bio)

- Bio page shipped: content-driven BW layout, skills with logo chips, Decap admin.
- Nucleus→bio transition progressively reveals the page during the circle animation.

## Debug Checklist (High Signal)

- Units: Angles in degrees for OrbitSystem; convert to radians only for trig.
- Cross-browser: Firefox cannot CSS-animate SVG r; use GSAP attr for radius.
- Inline JSON: Inject with set:html; avoid HTML-escaped JSON that breaks JSON.parse.
- Event flood: Use rAF throttling for mousemove; precompute squared distances.
- State: Keep a single state machine; kill GSAP tweens on transitions to avoid buildup.
- Scope: Pass server-only values through atom.config.js; don’t import userTweaks in client code. When using dynamic shells, inject a client-safe cfg JSON and read it before initializing clients (e.g., OrbitSystem).

## Content Authoring

- Structure: Organize projects under `src/content/projects/<order>_<DomainName>/project.md` (e.g., `1_Music/ambient-album.md`).
- Order: `<order>_` numeric prefix controls shell order; max 5 shells; additional domains are ignored (logged in console).
- Display: `<DomainName>` is transformed to display (UPPERCASE) and slug (kebab-case) for routing/labels.
- Project fields: title, description, tech[], link, github, status, date; domain field is optional/ignored (folders win).

## Bio Page Snapshot

- Route: `/bio` via `src/pages/bio.astro` rendering `src/components/BioBW.astro`.
- Content: `src/content/bio/about.md` validated by `src/content/config.ts` (collection: `bio`).
- API (internal): `GET /api/bio.json` returns `{ title, subtitle, bio, portrait, email, social[], skills[] }` with safe defaults.
- Admin: Decap CMS at `/admin` (`public/admin/config.yml` + `src/pages/admin/index.astro`) using proxy backend for local-only editing.
- Style: Canonical black & white layout; accessible, responsive; skill chips auto-map logos.

### Key Files (Bio)

- `src/pages/bio.astro` — route wrapper and head.
- `src/components/BioBW.astro` — layout, chips, logo normalization.
- `src/content/bio/about.md` — editable content (title, subtitle, bio, portrait, skills, email, social).
- `src/content/config.ts` — bio collection schema.
- `src/pages/api/bio.json.ts` — internal JSON endpoint.
- `public/admin/config.yml` + `src/pages/admin/index.astro` — Decap CMS config and simple viewer.

### How It Works (Bio)

- Content-driven Astro route; markdown fields populate the layout.
- Logo mapping normalizes labels (e.g., “C#” → “csharp”) to `.webp` assets.
- Progressive reveal on nucleus→bio transition (page paints during circle animation).

### Debug Notes (Bio)

- Astro image imports require `.src` when passing to `<img>`.
- Label normalization removes non-alphanumerics and lowercases; map “C#” → “csharp”.
- Decap proxy backend is for local development; configure git backend for production later.

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
- Extend nucleus→bio transition to all electrons (progressive reveal).
- Choose production Decap backend (git-gateway or GitHub) for deploy.

Tracking
- Electron progressive reveal rollout: see `docs/issues/phase-3b-electron-progressive-reveal.md`.

---

- Nucleus click ripple: Nucleus now uses the same SVG ripple-on-click as electrons.

## Recent Changes (2025‑08‑21)

- Dynamic shells: Number/order of shells derive from top-level project folders. Numeric prefix defines order; display names strip the prefix; cap at 5 shells; viewport auto-computed.
- Label system: Added static ring-pattern labels (always visible) with per-shell offsets and auto density based on circumference; optional single-word curved mode (static arc) per shell with shared center angle.
- Electron transition (Phase 3B shipped): Project overlay now progressively reveals with a circular mask from the electron position; content paints during expansion; URL/history maintained.
- Soft edge + input block: Optional feathered edge for the circular mask (configurable `edgeSoftnessPx`); blocks input until ~85% progress of open; applied to both electrons and nucleus (using respective transition configs).
- Nucleus text interaction: Nucleus label ignores pointer events to keep hover consistent.
- Decap CMS: Removed fixed domain select; domain now derived from folder placement.
Notes for agents: Keep this file concise. If you need rationale, code snippets, or the blow-by-blow history, follow the links above. Prefer editing user-tweaks.js and atom.config.js for behavior; index.astro wires interactions and overlay.
