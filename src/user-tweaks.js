/**
 * USER TWEAKABLE VALUES
 * 
 * This file contains the main parameters you can safely adjust
 * to customize the atom behavior without breaking anything.
 * 
 * Just change the numbers and refresh the page!
 */

export const userTweaks = {
  
  // 🌀 ROTATION SPEEDS (degrees per second)
  // Higher = faster rotation, Lower = slower rotation
  electronSpeeds: {
    innerShell: 7.0,    // Closest to nucleus (currently fast)
    middleShell: 9.0,   // Middle ring
    outerShell: 12.0     // Outermost ring (currently slowest)
  },

  // 📏 SIZES
  electronSize: 18,        // Normal electron radius
  electronHoverSize: 22,  // Size when you hover over it
  nucleusSize: 40,        // Center "A" circle size
  nucleusHoverSize: 52,   // Nucleus size on hover (clickable, not draggable)

  // ⏱️ TIMING
  hoverAnimationSpeed: 0.15,  // How fast electrons grow/shrink on hover (seconds)
  baselineResetAnimationSpeed: 0.15, // Duration for resetting to baseline (none state)

  // ⚙️ DRAG PHYSICS
  dragSnapDuration: 0.5,     // How long the snap-back lasts (s)
  dragElastic: {
    amplitude: 0.18,          // Elastic ease amplitude (0.1–1.5 typical)
    period: 0.2             // Elastic ease period (smaller = faster wobble)
  },

  // 🎯 SHELL DISTANCES (from center)
  shellDistances: {
    inner: 120,   // Pixels from nucleus center
    middle: 200,
    outer: 280
  },

  // 📐 ELECTRON SPACING
  minElectronDistance: 50,   // Minimum degrees between electrons on same shell

  // ⭕ SHELL STATES
  shell: {
    // Default state (resting)
    default: {
      thickness: 4,           // Shell ring stroke width
      opacity: 0.3           // Shell opacity (subtle visibility)
    },
    // Hover state (focused)
    hover: {
      thickness: 5,           // Shell thickness on hover (subtle increase)
      opacity: 0.7,           // Shell opacity on hover (modern transparency)
      electronOpacity: 0.2    // Electrons opacity when shell hovered
    }
  },

  // 🖼️ VIEWPORT (prevent electron clipping)
  viewportSize: 900,        // SVG width/height (increase if electrons get cut off)
  viewportPadding: 80,      // Safe area around edges

  // 🔍 OVERALL ATOM SCALE
  atomScale: 1,           // 1.0 = normal, 1.5 = 50% bigger, 0.8 = 20% smaller

  // 🎯 DOMAIN SHELL ASSIGNMENT
  // Order determines shell assignment: first = inner, second = middle, third = outer
  // Change this array to reorder domains across shells
  domainShellOrder: ['music', 'sound-design', 'tech'],

  // 📛 DOMAIN DISPLAY NAMES (for labels)
  // Map slugs to display names. Defaults to slug uppercased with dashes → spaces.
  domainDisplayNames: {
    music: 'MUSIC',
    'sound-design': 'SOUND DESIGN',
    tech: 'TECH'
  },

  // 🎯 INTERACTION
  // Shell hover hitbox tolerance (in pixels).
  // This defines the +/- distance around each shell radius that counts as a hover.
  // Example: 15 means a 30px wide ring centered on the shell path.
  shellHitboxTolerance: 30,

  // 🔄 OVERLAY TRANSITION (one-page project overlay)
  overlayTransition: {
    openMs: 1000,   // duration to open overlay (ms)
    closeMs: 600,  // duration to close overlay (ms)
    easing: 'power2.inOut' // GSAP ease name
  },

  // 🌀 NAV TRANSITION (electron → overlay)
  // Mirrors nucleus timings by default; separate in/out for clarity
  navTransition: {
    enabled: true,
    inMs: 1000,          // open duration (ms)
    outMs: 600,          // close duration (ms)
    easing: 'power2.inOut',
    respectReducedMotion: true,
    edgeSoftnessPx: 0,   // no soft edge per request
    blockInput: true
  },

  // ✨ MICRO INTERACTIONS
  micro: {
    // Hover ring around the electron
    hoverCursorRing: false,
    hoverRingDelta: 6,          // extra radius in px
    hoverRingOpacity: 0.6,
    hoverRingDurationMs: 160,

    // Ripple on click
    ripple: true,
    rippleDurationMs: 360,
    rippleColor: '#000',
    rippleStrokeWidth: 2.7,
    rippleExpandPx: 56,

    // Shell pulse on click
    shellPulse: true,
    shellPulseDelta: 1.2,       // add to strokeWidth in px
    shellPulseDurationMs: 200
  },

  // 🔤 SHELL LABELS
  labels: {
    enabled: true,            // master toggle
    mode: 'ringPattern',      // 'ring' | 'orbiting' | 'ringPattern'
    fontSize: 14,             // base px before atomScale
    offsetPx: 18,             // outward from shell stroke (ring mode)
    idleOpacity: 0.25,        // always-visible baseline
    hoverOpacity: 0.6,        // optional bump on hover (can be unused)
    repeat: 12,               // how many times to repeat label with separators
    // Repeating pattern specifics (full-circle text with per-shell offsets)
    pattern: {
      offsetsPercentByShell: [0, 3.5, 7], // startOffset percentages per shell (0–100)
      repeatsByShell: [12, 9, 40],         // per-shell repeat counts (used if present)
      densityPxPerRepeat: 26,              // auto: px of circumference per repetition
      minRepeats: 3,
      maxRepeats: 40,
      separator: ' • '
    },
    rotate: {
      enabled: false,
      respectReducedMotion: false, // keep labels rotating even if OS reduces (aligns with current electrons)
      // seconds per revolution for inner/middle/outer; sign from shell.direction
      speedsByShell: [90, 110, 130]
    },
    // Mobile behavior (ring mode)
    mobileViewportMaxPx: 700,     // below this viewport width, prefer arc variant
    mobileArcDegrees: 150,        // arc length for small screens (top-centered)

    // Orbiting word mode specifics
    wordOrbit: {
      innerOffsetPx: 22,      // inward from shell stroke
      arcDegrees: 160,        // local arc length to curve the single word
      centerAngleDeg: -60     // center angle for all shells (-90 = top)
    }
  },

  // 🧮 DYNAMIC SHELLS (compute shells from domain folders)
  dynamicShells: {
    enabled: true,
    baseRadius: 120,    // px, distance of inner-most shell from center
    baseGap: 80,        // px, nominal spacing between shells
    minGap: 56,         // px, lower bound when many shells
    maxGap: 110,        // px, upper bound clamp
    directionMode: 'alternate', // 'alternate' | 'cw' | 'ccw'
    speed: { base: 9.0, deltaPerShell: 0.0 } // degrees/sec; 360/speed = seconds per orbit
  },


};

// Don't edit below this line unless you know what you're doing!
// ================================================================

export default userTweaks;
