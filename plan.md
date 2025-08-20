# CLAUDE.md — Single-Page Atom Portfolio

## Project mission
A fast, SEO-friendly portfolio where the **atom metaphor** maps content:
- **Nucleus** = bio/about.
- **Shells** = domains of work.
- **Electrons** = projects (clickable entries).

Minimal black–white design, smooth transitions, and tasteful SFX.

---

## What to build
- **Home:** an interactive SVG atom island (centered nucleus, concentric shells, electrons on shells).
- **Projects:** each electron links to a project route with a **view transition**; returning is equally seamless.
- **Content-driven:** electrons derive label/slug/domain from content frontmatter; visual arrangement is computed, not hard-coded.

---

## Interaction model
- **Idle motion:** electrons orbit smoothly; orbital direction alternates per shell for visual rhythm.
- **Hover:** focusing an electron gently enlarges it and **pauses its shell** until hover ends.
- **Drag:** an electron can be dragged off its path and **snaps back** on release with a smooth, spring-like return.
- **Click:** a short, intentional click on an electron **navigates** to its project page (no navigation on long-press/drag).

> All concrete values (sizes, speeds, durations, easing) belong in a **config file**, not here.

---

## Navigation & transitions
- Use View Transitions to animate between the home atom and project pages.
- Pause/resume local animations during transitions to keep motion coherent.
- Treat transitions as **progressive enhancement**; default to normal navigation if unsupported.

---

## Audio guidelines
- Defer audio implementation to the final phase (after core interactions).
- When added, initialize audio on first user gesture.
- Provide subtle hover/click/transition cues; keep levels consistent and unobtrusive.
- Use user-provided audio files placed in a dedicated folder to be created later (exact path TBD).

---

## Workflow
1) **PLAN:** outline goal, files to touch, tests to run, risks/tradeoffs.
2) **IMPLEMENT:** small, incremental changes with clear diffs; keep atom logic modular (orbit, drag, effects, audio).
3) **TEST:** unit (math/utilities) + E2E (hover pause, drag tether, snap-back, route transition).
4) **REPORT:** summarize what changed and why; note follow-ups.

---

## Acceptance (concept-level)
- Home renders the atom clearly on all viewports; motion feels calm and consistent.
- Hover focuses an electron and pauses its shell; unhover resumes exactly from where it stopped.
- Drag allows off-path movement; release reliably returns the electron to its shell path and resumes motion.
- Clicking an electron navigates with a smooth view transition; back navigation mirrors the experience.
- Audio cues complement, never distract; site honors reduced-motion preferences.
- All specific parameters are sourced from a configuration layer, making future tuning easy without code edits.
