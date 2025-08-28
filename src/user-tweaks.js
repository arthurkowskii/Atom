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

  // 🖼️ NUCLEUS LOGO
  nucleusLogo: {
    size: 1.35,             // Logo size as percentage of nucleus radius (1.0 = same as nucleus)
    offsetX: -1,            // Horizontal offset in pixels (+ = right, - = left)
    offsetY: -1.1             // Vertical offset in pixels (+ = down, - = up)
  },

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

  // 🎵 BENTO CARD ANIMATIONS (Simple Scale + Audio)
  bentoAnimations: {
    enabled: true,
    
    // Simple animation parameters
    staggerDelayMs: 80,           // Delay between each card (ms)
    animationDurationMs: 400,     // Duration of each card animation (ms)
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy easing
    
    // Individual card controls (set to false to disable specific cards)
    cardEnabled: {
      hero: true,
      stats: true,
      actions: true,
      tech: true,
      gallery: true,
      process: true,
      challenges: true,
      results: true
    },
    
    // Audio settings
    audio: {
      enabled: true,
      volume: 0.4,        // Volume level (0-1)
      syncWithAnimation: true,  // Sync audio with animation start
      
      // Card-specific pitches (musical notes)
      pitches: {
        hero: 'C3',       // Low, impactful
        stats: 'E3',      // Mid tone
        actions: 'G3',    // Higher tone
        tech: 'C4',       // Bright
        gallery: 'E4',    // Visual, bright
        process: 'G4',    // High, detailed
        challenges: 'B3', // Mid-range
        results: 'D4'     // Conclusive
      },
      
      // Tone synthesis settings
      synthesis: {
        attack: 0.01,     // Quick bubble pop attack
        decay: 0.3,       // Bubbly decay
        sustain: 0,       // No sustain (pure burst)
        release: 0.8,     // Gentle release
        chorus: {
          frequency: 4,   // Wobble frequency
          depth: 0.3      // Chorus depth
        }
      }
    }
  },

  // 👁️ ELECTRON PREVIEW CARD
  electronPreview: {
    enabled: true,
    width: 250,                    // Preview card width (px)
    height: 110,                   // Preview card height (px)
    offsetX: 20,                   // Distance from electron (px)
    offsetY: -100,                  // Vertical offset from electron (px)
    borderRadius: 8,               // Preview card corner radius (px)
    
    // Hero image (square on the right)
    heroSize: 88,                  // Hero image width/height (px)
    heroRadius: 8,                 // Hero image corner radius (px)
    heroMargin: 10,                // Hero image margin from preview edges (px)
    
    // Content styling
    contentPadding: 16,            // Text content padding (px)
    titleSize: 16,                 // Title font size (px)
    subtitleSize: 13,              // Subtitle font size (px)
    
    // Animation
    animationDuration: 0.2,        // Total animation duration (seconds)
    animationEase: 'back.out(1.7)', // GSAP easing function (legacy, used for settle phase)
    
    // Multi-stage animation timing (percentages of total duration)
    multiStage: {
      stage1Duration: 0.7,         // Birth phase (0 to this %) - emergence from electron
      stage2Duration: 0.4,         // Travel phase (stage1 to stage1+stage2 %) - movement to position  
      stage3Duration: 0.2,         // Expansion phase (remaining %) - final growth with overshoot
      settleDebounce: 0.1,         // Final settle phase (overshoot correction)
      
      // Scale progression
      birthScale: 0.1,             // Starting scale at electron center
      travelScale: 0.3,            // Scale at end of stage 1 (beginning travel)
      preExpandScale: 0.8,         // Scale at end of stage 2 (before final expansion)
      overshootScale: 1.05,        // Peak scale during overshoot
      finalScale: 1.0,             // Final settled scale
      
      // Opacity progression  
      birthOpacity: 0.3,           // Starting opacity
      travelOpacity: 0.7,          // Opacity during travel
      preExpandOpacity: 0.9,       // Opacity before final expansion
      finalOpacity: 1.0            // Final opacity
    }
  },

  // 🔊 ATOM INTERFACE SOUNDS (Tone.js Placeholders)
  atomSounds: {
    enabled: true,
    volume: 0.2,        // Lower than bento sounds for subtlety
    
    // Sound events with placeholder Tone.js pitches
    events: {
      electronHover: 'C4',      // Electron mouseenter - mid frequency
      electronClick: 'C3',      // Electron click - deep impact  
      shellHover: 'G4',         // Shell hover - higher ambient
      nucleusHover: 'F2',       // Nucleus hover - deep resonant
      nucleusClick: 'A2',       // Nucleus click - bio transition
      ripple: 'E5',             // Micro-interaction ripple
      shellPulse: 'D4',         // Micro-interaction shell pulse
      
      // Creative electron drag sounds (no nucleus drag) - simplified: detach + drop only
      electronDragStart: 'B4',  // Electron detach - bright grab when starting drag
      electronDragSnap: 'C5',   // Electron snap back - satisfying return
      electronDragRelease: 'E4' // Electron gentle release - soft drop without snap
    },
    
    // Tone synthesis settings
    synthesis: {
      attack: 0.02,
      decay: 0.4,
      sustain: 0,
      release: 1.2
    }
  },

  // 🌊 LIQUID GLASS EFFECTS
  liquidGlass: {
    enabled: true,
    displacementScale: 70,     // Distortion intensity
    blurAmount: 0.0625,        // Blur intensity
    elasticity: 0.8            // Bounce elasticity
  }

  ,
  // 🧩 Bio Skills UI (card chips)
  // Quick controls for the skill boxes (logo + text chips) on the Bio page
  bentoSkillsUI: {
    boxMinHeight: 23,   // px, vertical size of each box
    padX: 20,           // px, horizontal padding inside each box
    padY: 12,           // px, vertical padding inside each box
    fontSize: 14,       // px, text size inside boxes
    logoSize: 25,       // px, logo/icon size inside boxes
    gap: 16,            // px, space between boxes
    borderRadius: 12    // px, corner radius of boxes
  },

  // 📝 Bio Text Styling
  // Controls for the main bio text content in the bio card
  bioText: {
    fontSize: 17,       // px, main bio text size
    lineHeight: 1.6,    // line height for bio text readability
    alignment: 'top',   // 'top' | 'center' - vertical alignment in bio card
    justify: true,      // boolean - enable justified text alignment
    fontWeight: 400     // font weight
  },

  // 🎨 Modern Design System
  // Professional UI enhancements based on 2025 design standards
  modernDesign: {
    // Enhanced shadow system (layered depth)
    shadows: {
      card: '0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)',
      cardHover: '0 4px 12px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.06)',
      subtle: '0 1px 3px rgba(0, 0, 0, 0.08)'
    },
    
    // Sophisticated color palette
    colors: {
      surfacePrimary: '#ffffff',
      surfaceSecondary: '#f8fafc', 
      surfaceTertiary: '#f1f5f9',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textTertiary: '#64748b',
      borderPrimary: '#e2e8f0',
      borderSecondary: '#cbd5e1',
      borderAccent: '#475569'    // Changed from blue to sophisticated gray
    },
    
    // Enhanced interaction timing
    transitions: {
      fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      medium: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    // Professional skill grid settings
    skillGrid: {
      minCardWidth: 140,        // px, minimum width for auto-fit grid
      gap: 16,                  // px, space between skill cards (increased from 12)
      cardPadding: 16,          // px, internal card padding
      hoverTransform: 'translateY(-2px) scale(1.02)',  // hover effect transform
      borderRadius: 12          // px, card corner radius
    },
    
    // Enhanced social link design
    socialLinks: {
      minTouchTarget: 44,       // px, minimum touch target size
      iconSize: 20,             // px, icon size
      padding: 10,              // px, internal padding
      gap: 12                   // px, space between links
    }
  },


  // 🚪 Pre-Page (Welcome)
  prePage: {
    enabled: true,
    path: '/welcome',
    storageKey: 'entered',       // sessionStorage key to mark entry
    buttonLabel: 'Enter Portfolio',
    noindex: true,               // add noindex robots meta on welcome page
    audioPrewarm: true           // try to unlock audio on click
  },

  // dY_ Gallery Layout (Bento)
  // Controls how many thumbnail rows can appear in the gallery card
  // based on how much taller the card renders above its CSS min-height.
  // extraRow1DeltaPx => enables 2 rows when cardHeight >= minHeight + this many px
  // extraRow2DeltaPx => enables 3 rows when cardHeight >= minHeight + this many px
  // heroMinHeightFallback => JS fallback if computed min-height isn't available
  // maxRows => global cap
  bentoGallery: {
    extraRow1DeltaPx: 500,
    extraRow2DeltaPx: 1000,
    heroMinHeightFallback: 120,
    maxRows: 3
  }

};

// Don't edit below this line unless you know what you're doing!
// ================================================================

export default userTweaks;
