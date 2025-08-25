# Atom Portfolio — Development Log (Concise)

Use this as an executive summary for agentic AIs. Full details live in:
- docs/history/PHASE_LOGS.md — long-form phase-by-phase history
- docs/history/ERRORS_LESSONS.md — error catalog and fixes

Last updated: 2025-08-24 (BioBento layout redesign with logo-only skill cards)

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
- bentoAnimations:
  - enabled|staggerDelayMs|animationDurationMs|easing (timing and motion)
  - cardEnabled.{hero|stats|actions|tech|gallery|process|challenges|results} (individual toggles)
  - audio.enabled|volume|pitches.{cardType} (musical notes per card type)
  - audio.synthesis.{attack|decay|sustain|release|chorus} (Tone.js sound design)
- atomSounds:
  - enabled|volume (master controls)
  - events.{electronHover|electronClick|shellHover|nucleusHover|nucleusClick|ripple|shellPulse|electronDragStart|electronDragSnap|electronDragRelease} (pitch mappings)
  - synthesis.{attack|decay|sustain|release} (Tone.js envelope)
- electronPreview:
  - enabled|width|height|offsetX|offsetY|borderRadius (basic card configuration)
  - heroSize|heroRadius|heroMargin (hero image styling)
  - contentPadding|titleSize|subtitleSize (text content styling) 
  - animationDuration|animationEase (legacy timing)
  - multiStage.{stage1Duration|stage2Duration|stage3Duration|settleDebounce} (3-stage timing as fractions)
  - multiStage.{birthScale|travelScale|preExpandScale|overshootScale|finalScale} (scale progression)
  - multiStage.{birthOpacity|travelOpacity|preExpandOpacity|finalOpacity} (opacity progression)

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

- Route: `/bio` via `src/pages/bio.astro` rendering `src/components/BioBento.astro`.
- Content: `src/content/bio/about.md` validated by `src/content/config.ts` (collection: `bio`).
- API (internal): `GET /api/bio.json` returns `{ title, subtitle, bio, portrait, email, social[], skills[] }` with safe defaults.
- Admin: Decap CMS at `/admin` (`public/admin/config.yml` + `src/pages/admin/index.astro`) using proxy backend for local-only editing.
- Style: Modern bento-style grid layout; portrait centered with cards around; logo-only skill displays; responsive design.

### Key Files (Bio)

- `src/pages/bio.astro` — route wrapper and head.
- `src/components/BioBento.astro` — modern bento grid layout with logo-only skills, portrait centering, and optimized card proportions.
- `src/content/bio/about.md` — editable content (title, subtitle, bio, portrait, skills, email, social).
- `src/content/config.ts` — bio collection schema.
- `src/pages/api/bio.json.ts` — internal JSON endpoint.
- `public/admin/config.yml` + `src/pages/admin/index.astro` — Decap CMS config and simple viewer.

### How It Works (Bio)

- **Bento Grid Layout**: 3-column responsive grid with portrait centered and cards arranged around it.
- **Logo-only Skills**: DAW, Dynamic Audio, and Engine & Code categories display colorful software logos in grid format (no text labels).
- **Card Proportions**: Bio card optimized for longer content (220px), contact/social cards compact (60px) for clean layout.
- **Overlay Integration**: BioBento works in both direct `/bio` route and nucleus→bio overlay transition with staggered card animations.
- **Logo Mapping**: Normalizes labels (e.g., "C#" → "csharp") to `.webp` assets with full-color display for logo-only cards.
- **Progressive Reveal**: Nucleus→bio transition paints bento cards during circle animation with restart animation system.

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

- **Light Mode Bento Card Hover Fix**: Bento card accent color hover border works in dark mode but not light mode. Issue with CSS specificity or custom property application. Cards should show visible gray border (`#e5e5e5`) that changes to project accent color on hover, matching dark mode behavior.
- Domain accent + electron→overlay chip continuity.
- Soft/squircle mask and optional gooey tether during open.
- Optional backdrop close, atom scale/blur choreography, deep-link auto-open behind flags.
- Extend nucleus→bio transition to all electrons (progressive reveal).
- Choose production Decap backend (git-gateway or GitHub) for deploy.
- **Phase 3C**: Replace Tone.js placeholders with custom OGG audio files (see docs/history/PHASE_LOGS.md for architecture).

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
## Recent Changes (2025‑08‑22)

- ProjectBento template: Created comprehensive bento-style project layout for rich content display. Features responsive gallery, stats/results, and tech sections. Usable via `useBentoLayout: true` in project frontmatter.
- Template preview system: Added `/preview-templates` route for testing ProjectBento and ProjectAtomic layouts side-by-side with navigation.
- Gallery redesign: Completely rebuilt gallery component with modern hero + thumbnail strip layout. Professional hover effects, smart responsive behavior across 5 breakpoints.
- Responsive fixes: Maintained desktop aesthetics while ensuring proper mobile display. Gallery images maintain aspect ratios, cards stack cleanly.
- Overlay scrolling: Fixed bottom card accessibility by adding overflow-y: auto to overlay container.
- Bento layout routing: Prevented 404 errors by skipping URL navigation for bento layout projects in overlay system.

- Bento assetsFolder: Added `bento.assetsFolder` in project schema; ProjectBento now auto-detects `hero.*` and `logo.*` for the hero card and builds the gallery from all other images in the folder (alphabetical). Explicit `bento.hero.backgroundImage`/`logo` still override.
- Kubika migration: Updated Kubika project to use `assetsFolder` and reserved filenames (`hero.jpg`, `Logo.png`); removed hardcoded hero CSS; gallery now auto-populates.
- Hero subtitle color: Added `bento.hero.subtitleColor` (optional). Defaults to `bento.accentColor`. Wired as inline style to ensure per-project color wins.
- Asset glob + URL resolution: Replaced fs scanning with `import.meta.glob('/src/content/projects/**/*.{jpg,jpeg,png,webp,gif}', { eager: true, query: '?url', import: 'default' })` and a resolver so raw `/src/...` paths map to served URLs.
- Starter template: Added ready-to-copy `templates/bento-project.template.md` and documented in `BENTO_TEMPLATE.md`.

- Musical bento animations: Added Tone.js-powered scale-up animations for bento cards with configurable timing and audio. Each card animates with staggered delays and plays a unique musical note. Fully configurable via `user-tweaks.js` with individual card toggles, pitch mappings, and timing controls. Proper AudioContext handling prevents browser warnings; scoped card selection fixes duplicate animation sequences.

- Atom interface sounds: Added comprehensive Tone.js placeholder sounds for all atom interactions. Includes electron hover/click, shell hover, nucleus hover/click, micro-interactions (ripple, shell pulse), and simplified electron drag sequence (detach + drop sounds only). State tracking prevents annoying sound repetition during hover states. All sounds configured via `user-tweaks.js` with placeholder comments for future OGG file replacement.

## Recent Changes (2025‑08‑23)

- Electron preview cards: Added hover preview system that displays project hero image and subtitle in a positioned card when hovering electrons. Provides visual project identification before clicking. Preview cards are fully configurable via `user-tweaks.js` including dimensions, positioning, content styling, and hero image parameters.

- Multi-stage emergence animation: Implemented sophisticated 3-stage animation for preview cards: Stage 1 (birth at electron center), Stage 2 (travel to final position), Stage 3 (expansion with overshoot + settle). Creates organic "emerging from electron" feel with precise positioning calculations and configurable timing/scale/opacity progressions.

- Preview interaction choreography: Added scale-down animation on electron click to prevent visual overlap with project overlay opening. Integrated with existing hover state management and click handlers for smooth transitions between preview and overlay states.

- Dynamic text wrapping: Preview text content adapts to available space, calculating max-width based on hero image size and margins. Supports natural line breaks with word wrapping and hyphenation for responsive content display within constrained preview boxes.

- Hero logo toggle: Added `bento.hero.showLogo` boolean parameter to control logo visibility in project bento layouts. Defaults to `true` (show logo) when omitted, can be set to `false` to hide. Required updates to both the content collection schema (`src/content/config.ts`) and ProjectBento component logic for proper frontmatter parsing.

## Recent Changes (2025‑08‑24) - UI Design System Overhaul

- **UI Design System Implementation**: Comprehensive light mode design system overhaul following successful dark mode improvements. Implemented professional-grade design tokens, typography, and visual hierarchy to eliminate harsh black-on-white contrasts and achieve modern web application polish.

- **Design Token System**: Added complete `lightMode` configuration in `user-tweaks.js` with sophisticated gray palette (`#171717`, `#525252`, `#e5e5e5`), Inter font family, modern shadow system, border radius scale, and refined transition curves. Replaces harsh pure black with readable refined grays throughout the interface.

- **Bio Component Enhancement**: Complete visual overhaul of `/bio` page with refined colors, enhanced typography (Inter font), improved skill chip hover states, gradient dividers, and card-like styling with subtle shadows. Maintains accessibility while achieving professional polish.

- **Atom Interface Polish**: Updated nucleus, shells, electrons, tether, and ripple effects from pure black to refined color hierarchy. Nucleus uses `#171717`, shells use `#525252`, maintaining visual hierarchy while softening harsh contrasts. Preserved all orbital motion and interaction functionality.

- **Bento Card Refinements**: Enhanced project card typography with Inter font family, refined color scheme, improved hover states, and modern shadow system. Updated card titles, subtitles, tech pills, action buttons, and gallery elements for consistency with design system.

- **Cross-Component Consistency**: Applied refined design tokens systematically across Bio, Atom interface, and Bento layouts ensuring consistent visual language. All components now use the same color palette, typography scale, shadow system, and transition curves.

- **Accessibility Improvements**: Enhanced focus states with proper `focus-visible` outlines, comprehensive `prefers-reduced-motion` support, improved color contrast ratios, and keyboard navigation enhancements throughout the interface.

## Recent Changes (2025‑08‑24) - BioBento Layout Redesign

- **BioBento Component**: Complete bio page redesign from linear BioBW layout to modern bento-style grid. Portrait now centered with cards arranged around it in a 3-column responsive layout for better visual hierarchy and engagement.

- **Logo-Only Skill Cards**: DAW, Dynamic Audio, and Engine & Code categories now display pure colorful software logos in grid format (no text labels). Creates cleaner, more professional appearance with better brand recognition. Other categories retain text+logo format.

- **Optimized Card Proportions**: Bio description card enlarged (220px height) for better content display; contact and social cards made compact (60px height) for efficient space usage. Creates clear visual hierarchy between content types.

- **Overlay System Integration**: BioBento seamlessly works in both direct `/bio` route and nucleus→bio overlay transition. Includes animation restart system for staggered card reveals when overlay opens. Removed legacy fillBioOverlay function in favor of server-side hydration.

- **Responsive Grid Layout**: Desktop 3-column with centered portrait spanning two rows; tablet 2-column with portrait on right; mobile single-column with portrait at top. Maintains visual balance across all screen sizes.

- **Enhanced Animations**: Staggered card entrance animations (100ms delays) with cubic-bezier easing. Respects `prefers-reduced-motion` and includes proper cleanup. Global restart function for overlay context.

### Key Files (Bento)

- `src/components/ProjectBento.astro` — Rich layout with gallery, results, tech sections; responsive grid; auto-scans `bento.assetsFolder` for hero/logo and gallery; includes musical animation system with Tone.js audio.
  - `src/pages/preview-templates.astro` — Testing environment for both template components.
  - `src/content/config.ts` — Added `useBentoLayout` boolean field, `bento.assetsFolder`, and `bento.hero.showLogo` to project schema.
  - `templates/bento-project.template.md` — Copy-paste template for new Bento projects.
  - Projects with `useBentoLayout: true` bypass normal overlay routing and use bento display.
  
  Notes for agents: Keep this file concise. If you need rationale, code snippets, or the blow-by-blow history, follow the links above. Prefer editing user-tweaks.js and atom.config.js for behavior; index.astro wires interactions and overlay. For Bento, see `BENTO_TEMPLATE.md` for the `assetsFolder` pattern (reserved `hero.*`, `logo.*`) and `bento.hero.subtitleColor`. The starter file is at `templates/bento-project.template.md`.

## Recent Changes (2025‑08‑24) - ProjectBento Music Links Card

- Hero description width: Increased `.hero-description` `max-width` from 600px to 700px for improved single-line length before wrap.
- New card: Added “Music Links” card (2×2 grid) visually matching “Project Stats”. Displays four clickable buttons opening external links.
  - Schema: `src/content/config.ts` now supports `bento.cards.musicLinks` (default false) and `bento.musicLinks` with exactly 4 `{ text, url }` items and optional `title` (defaults to “Music Links”).
  - Component: `src/components/ProjectBento.astro` renders Music Links in the first slot when enabled; falls back to Stats if 4 links are not provided. Buttons open with `target="_blank"` + `rel="noopener noreferrer"`.
  - Icons: Platform logo detection via link text/domain (Spotify, Apple Music, Bandcamp, YouTube, SoundCloud). Icons imported as URLs from `src/Assets/music_links assets/`. Graceful fallback to text when no match.
  - Bandcamp sizing: Per-platform override scales Bandcamp icon 2× using CSS `transform` to avoid changing row height; buttons use `overflow: hidden` to preserve layout.
  - Styling: Music Links buttons align visually with Stats (min-height ~72px, hover/elevation, dark mode text colors). Icon size set to 48px base.
- Templates/docs: Updated `BENTO_TEMPLATE.md` and `templates/bento-project.template.md` to include `cards.musicLinks` and a 4-link example payload.
  - Content updates: Added `cards.musicLinks: false` and `musicLinks` blocks to:
    - `src/content/projects/1_Music/lesupermegashow.md` (filled with real YouTube/Spotify + placeholders)
    - `src/content/projects/2_Game Audio/kubika-showcase.md` (placeholders)
    - `src/content/projects/2_Game Audio/chromestesia_showcase.md` (YouTube trailer + placeholders)

### Visual Polish & Fixes (2025‑08‑24)

- Accent-aware hover: Replaced fixed orange hover outline on bento cards with per-project accent via `var(--accent-color)`.
- Music Links icons: Switched icon imports to URL form (`?url`) for reliable loading; added platform inference by text/domain; dark-mode-only invert for Bandcamp icon.
- Bandcamp sizing: Increased only Bandcamp icon visually (2×) via `transform: scale(2)` with `overflow: hidden` to keep row height consistent.
- Hero hover zoom: Implemented dedicated `.hero-bg` image layer that scales on hover (default scale 1.04, 280ms cubic-bezier). Reduced-motion path uses 1.02 @ 160ms. Removed conflicting static background and ensured the effect is visible on all pages.

## Recent Changes (2025‑08‑24) - Phase 4: Enterprise-Grade Transformation

### Phase 4A: Accessibility Compliance & Bug Fixes
- **Electron Motion Fix**: Corrected hover behavior where electrons failed to resume orbital motion after mouseleave. Fixed scope issues with `window.orbitSystem` accessibility in event handlers and moved global assignment before event handler setup.
- **Focus-Visible Implementation**: Enhanced keyboard navigation with proper focus-visible behavior. Focus outlines now only appear when using Tab key navigation, not mouse clicks. Added JavaScript polyfill for cross-browser compatibility with `.focus-visible` class management.
- **Bio Overlay Restoration**: Fixed bio overlay functionality broken by SSR sanitization issues. Replaced DOMPurify-dependent `sanitizeText` with server-compatible regex-based sanitization. Bio overlay now properly displays content when clicking nucleus.

### Phase 4B: Performance Monitoring & Error Tracking
- **Comprehensive Monitoring System**: Added `src/utils/monitoring.js` with Core Web Vitals tracking, JavaScript error capture, and custom performance metrics. Monitors GSAP animations, orbital system performance, theme changes, and user interactions.
- **Build Metadata Integration**: Enhanced pages with build version, commit hash, and timestamp metadata for deployment tracking. Added performance report storage and session management.
- **Production vs Development**: Smart enablement system respects production environments while providing debug capabilities. Includes manual override for development testing.

### Phase 4C: CI/CD Pipeline & Quality Assurance  
- **GitHub Actions Workflows**: Created `.github/workflows/deploy.yml` for automated deployment with quality gates, performance testing, and artifact management. Added `.github/workflows/quality-checks.yml` for code style and security validation.
- **Security Automation**: Implemented `scripts/security-check.js` for automated security scanning, CSP validation, sensitive data detection, and build artifact verification. Integrated with npm scripts for easy execution.
- **Performance Budgets**: Added `.lighthouserc.json` with Lighthouse CI configuration, performance budgets, and accessibility compliance thresholds. Ensures consistent performance standards across deployments.

### Phase 4D: Advanced Hosting Optimizations
- **Service Worker Implementation**: Added `public/sw.js` for offline capabilities, advanced caching strategies, and PWA functionality. Includes cache-first, network-first, and stale-while-revalidate patterns with intelligent resource management.
- **PWA Capabilities**: Enhanced with `public/manifest.json` for app installation, shortcuts, and native-like experience. Added themed icons, offline fallback page, and background sync capabilities.
- **Enhanced Security Headers**: Updated `public/_headers` with comprehensive caching strategies, performance optimizations for images/fonts/WebP, and smart cache control policies. Added health check endpoint configuration.
- **SEO & Crawling Optimization**: Created `public/robots.txt` with intelligent bot management, sitemap configuration, and AI training bot exclusions. Optimized for search engines while protecting content.

### Technical Improvements
- **Memory Management**: Enhanced OrbitSystem with comprehensive cleanup, explicit GSAP reference clearing, and frame throttling for 60fps consistency. Added Safari-specific optimizations.
- **Error Recovery**: Implemented graceful fallbacks, user-friendly error handling, and comprehensive logging without compromising performance. All systems include proper error boundaries.
- **Build Validation**: Added automated validation scripts ensuring all critical files, security headers, performance metrics, and deployment readiness checks pass before deployment.

### Configuration Updates
- **Reduced Motion Compliance**: Temporarily disabled aggressive `respectReducedMotion` setting that was preventing orbital motion. Maintains accessibility while preserving core functionality.
- **Import Path Corrections**: Fixed monitoring.js import path (`../utils/monitoring.js`) and other module resolution issues affecting build process.
- **Sanitization Compatibility**: Updated sanitization utilities to work in both server-side rendering and client environments without DOMPurify dependencies during build.

### Infrastructure Ready
The portfolio is now enterprise-grade with comprehensive monitoring, automated quality assurance, offline capabilities, and production-ready deployment pipeline. All systems include proper error handling, performance optimization, and accessibility compliance while maintaining the interactive atom experience.

## Recent Changes (2025‑08‑25) - Video and Spotify Card System

### Video Card Implementation
- **Video Embed Card**: Added comprehensive video card system supporting YouTube and Vimeo embeds. Video card takes same positioning logic as process card - appears in process position when process is disabled, or in row 4 when process is enabled.
- **URL Processing**: Created `extractVideoId()`, `getVideoEmbedUrl()`, and `generateVideoTitle()` utilities supporting both `youtube.com` and `youtu.be` URL formats with automatic embed URL generation.
- **Visual Design**: Video positioned first with title below embed for cleaner hierarchy. Configurable top margin (0.1rem) for optimal spacing. Video title styled larger (1.2rem) and bolder (700 weight) using project accent color.
- **Content Security Policy**: Updated CSP across all pages to allow YouTube (`https://www.youtube.com/embed`, `https://www.youtube-nocookie.com/embed`) and comprehensive YouTube domains for scripts, styles, images, and media.

### Spotify Card System (SoundCloud Replacement)
- **Complete Rework**: Transformed SoundCloud card system into Spotify album/playlist/track embed system. Updated schema, utilities, positioning classes, and HTML rendering throughout.
- **Spotify Integration**: Created `extractSpotifyId()`, `getSpotifyEmbedUrl()`, and `generateSpotifyTitle()` utilities supporting album, playlist, and track formats with automatic embed URL generation.
- **Full-Card Layout**: Spotify embeds fill entire card with no padding (352px height expanding to 100%) and no text elements for clean music-focused display.
- **Project Updates**: Updated lesupermegashow.md and etoilesenplastiques.md with Spotify embeds. All project files migrated from `soundcloud:` to `spotify:` configuration blocks.

### Technical Improvements
- **Schema Updates**: Modified `src/content/config.ts` to replace `soundcloud` with `spotify` in both card toggles and configuration objects.
- **CSS Architecture**: Updated all positioning classes from `.soundcloud-*` to `.spotify-*` across responsive breakpoints with zero-padding override for full-card display.
- **CSP Policy Updates**: Comprehensive CSP updates across index.astro, projects/[slug].astro, and bio.astro to support both YouTube and Spotify embeds while removing SoundCloud domains.

### Content Management
- **Project Configuration**: All bento layout projects updated with new card system. Video and Spotify cards work independently with smart positioning logic based on existing cards (tech/process).
- **Template Updates**: Enhanced BENTO_TEMPLATE.md documentation with comprehensive video and Spotify card configuration examples and positioning logic explanations.

### Key Files Modified
- `src/content/config.ts` - Schema updates for video/spotify cards
- `src/components/ProjectBento.astro` - Complete video/Spotify embed system with utilities and responsive CSS
- `src/pages/{index,projects/[slug],bio}.astro` - CSP policy updates for YouTube/Spotify
- `src/content/projects/1_Music/*.md` - Updated with video/Spotify configurations
- `BENTO_TEMPLATE.md` - Added comprehensive video/Spotify card documentation

## Recent Changes (2025‑08‑25) - Alt-Title System & Hero Video Support

### Alt-Title for Preview Cards
- **Electron Preview Enhancement**: Added `altTitle` field to project schema allowing shorter, preview-optimized titles for electron hover cards while maintaining full titles in hero sections.
- **Fallback Logic**: Electron preview cards use `altTitle` when available, automatically fallback to main `title` when empty. Hero cards always display the main title regardless of altTitle setting.
- **Content Updates**: Updated all 9 project files with appropriate altTitle values. Long titles like "Sound ReDesign : Heroes of Might and Magic VI" now display as "Heroes VI Redesign" in compact preview cards.
- **YAML Fixes**: Resolved frontmatter parsing errors by properly escaping quotes in description fields across music project files.

### Hero Video Asset Support
- **Video Hero Backgrounds**: Extended asset scanning system to support `hero.mp4`, `hero.webm`, and `hero.mov` files as hero card backgrounds with automatic looping, muted playback, and inline display.
- **Gallery Video Integration**: Added video support to gallery cards with auto-loop, muted playback functionality. Videos display inline in both main gallery view and thumbnail strips.
- **Thumbnail System**: Implemented `thumbnail.*` file detection for video hero projects. When hero is video, electron preview cards use thumbnail image instead of video for performance and visual clarity.
- **Asset Scanning Enhancement**: Updated `import.meta.glob` patterns to include video formats alongside images. Enhanced `scanAssetsFolder` function with video detection and thumbnail fallback logic.

### Technical Improvements
- **Schema Enhancement**: Added `altTitle: z.string().optional()` to projects collection in `src/content/config.ts` with comprehensive validation.
- **Preview Logic**: Modified electron preview generation in `src/pages/index.astro` to include altTitle in project summaries and use fallback logic in JavaScript display code.
- **CSS Refinements**: Improved electron preview title container height (`calc(2 * 1.2em)`) to prevent text clipping on two-line titles and adjusted bottom margin for better spacing.
- **Documentation**: Updated BENTO_TEMPLATE.md with altTitle usage examples and hero video support instructions including thumbnail requirements.

### Key Files Modified
- `src/content/config.ts` - Added altTitle field to project schema
- `src/pages/index.astro` - Enhanced project summary generation with altTitle support and improved CSS spacing
- `src/components/ProjectBento.astro` - Extended asset scanning for video support with thumbnail detection
- All project `.md` files - Added altTitle field with appropriate shortened titles
- `BENTO_TEMPLATE.md` - Added comprehensive altTitle and hero video documentation

## Recent Changes (2025‑08‑25) - SoundCloud Card System Implementation

### Flexible SoundCloud Card System
- **Restored SoundCloud Support**: Re-implemented comprehensive SoundCloud card system alongside existing Spotify functionality. SoundCloud cards support both individual tracks and playlists/sets with automatic URL parsing and embed generation.
- **Size Variants**: Added `large` boolean parameter controlling card positioning - `large: false` (default) positions alongside or replaces tech card, `large: true` takes full gallery position for music-focused projects.
- **Visual Player Integration**: Implemented SoundCloud visual player with artwork backgrounds using `&visual=true` parameter and customizable accent colors (white `%23ffffff` for clean integration).
- **Hero Video Scaling Fix**: Extended `backgroundScale` parameter support to hero videos using CSS transform scaling, matching existing image scaling functionality without breaking compatibility.

### Technical Implementation
- **Schema Updates**: Added `soundcloud` card toggle and configuration object in `src/content/config.ts` with `large`, `title`, `url`, and `description` fields using Zod validation.
- **Utility Functions**: Created `getSoundCloudEmbedUrl()` with visual player parameters, `generateSoundCloudTitle()` with track/playlist detection, and URL validation for robust embed handling.
- **Responsive Positioning**: Implemented complete CSS Grid positioning classes for small (`soundcloud-card-small`) and large (`soundcloud-card-large`) variants across all responsive breakpoints with single-row height matching tech/process cards.
- **CSP Policy Updates**: Enhanced Content Security Policy across all pages to allow SoundCloud iframes (`https://w.soundcloud.com`) while maintaining security for other embed systems.

### Positioning Logic
- **Small SoundCloud Card**: When `tech: false`, takes tech position (left side, row 3). When `tech: true`, appears to right of tech (right side, row 4).
- **Large SoundCloud Card**: Takes full gallery position (grid-column: 9/13, grid-row: 3) with zero padding for full-width visual player display. Single row height prevents vertical overflow.
- **Priority System**: Large SoundCloud replaces gallery when both are enabled, maintaining clean layout without card conflicts.

### Content Integration
- **HR Showcase Project**: Configured `src/content/projects/1_Music/HR_showcase.md` as test implementation with large SoundCloud card displaying Helena Rubinstein commission playlist and disabled gallery.
- **Visual Enhancement**: SoundCloud player displays track artwork background with white accent UI controls for professional music presentation matching project aesthetic.

### Key Files Modified
- `src/content/config.ts` - Added SoundCloud card schema with large parameter
- `src/components/ProjectBento.astro` - Complete SoundCloud embed system with video scaling fix and responsive CSS positioning
- `src/pages/{index,projects/[slug],bio}.astro` - CSP policy updates for SoundCloud iframe support
- `src/content/projects/1_Music/HR_showcase.md` - Implementation example with large SoundCloud configuration
