/**
 * Atom Portfolio Configuration
 * All visual and timing parameters for the interactive atom
 */

import { userTweaks } from './user-tweaks.js';

export default {
  // Central nucleus (bio/about section)
  nucleus: {
    text: "Me",          // Initial, logo, or avatar
    radius: userTweaks.nucleusSize * userTweaks.atomScale,
    hoverRadius: (userTweaks.nucleusHoverSize ?? userTweaks.nucleusSize * 1.3) * userTweaks.atomScale,
    fontSize: 24 * userTweaks.atomScale,        // Text size inside nucleus (scaled)
    color: "#000",       // Black for minimal design
    strokeWidth: 2 * userTweaks.atomScale
  },

  // Orbital shells (domains of work)
  shells: [
    {
      radius: userTweaks.shellDistances.inner * userTweaks.atomScale,
      speed: userTweaks.electronSpeeds.innerShell,          // Speed unchanged
      direction: 1,        // 1 = clockwise, -1 = counterclockwise
      strokeWidth: userTweaks.shell.default.thickness * userTweaks.atomScale,
      hoverStrokeWidth: userTweaks.shell.hover.thickness * userTweaks.atomScale,
      defaultOpacity: userTweaks.shell.default.opacity,
      hoverOpacity: userTweaks.shell.hover.opacity,
      electronHoverOpacity: userTweaks.shell.hover.electronOpacity,
      color: "#000"
    },
    {
      radius: userTweaks.shellDistances.middle * userTweaks.atomScale,
      speed: userTweaks.electronSpeeds.middleShell,         // Speed unchanged
      direction: -1,       // Alternating direction for rhythm
      strokeWidth: userTweaks.shell.default.thickness * userTweaks.atomScale,
      hoverStrokeWidth: userTweaks.shell.hover.thickness * userTweaks.atomScale,
      defaultOpacity: userTweaks.shell.default.opacity,
      hoverOpacity: userTweaks.shell.hover.opacity,
      electronHoverOpacity: userTweaks.shell.hover.electronOpacity,
      color: "#000"
    },
    {
      radius: userTweaks.shellDistances.outer * userTweaks.atomScale,
      speed: userTweaks.electronSpeeds.outerShell,          // Speed unchanged
      direction: 1,
      strokeWidth: userTweaks.shell.default.thickness * userTweaks.atomScale,
      hoverStrokeWidth: userTweaks.shell.hover.thickness * userTweaks.atomScale,
      defaultOpacity: userTweaks.shell.default.opacity,
      hoverOpacity: userTweaks.shell.hover.opacity,
      electronHoverOpacity: userTweaks.shell.hover.electronOpacity,
      color: "#000"
    }
  ],

  // Electrons (project entries)
  electrons: {
    radius: userTweaks.electronSize * userTweaks.atomScale,
    hoverRadius: userTweaks.electronHoverSize * userTweaks.atomScale,
    color: "#000",
    hoverColor: "#000",
    strokeWidth: 2 * userTweaks.atomScale
  },

  // Electron spacing
  spacing: {
    minElectronDistance: userTweaks.minElectronDistance
  },

  // Hitbox for shell hover (game-like distance-based detection)
  hitbox: {
    tolerance: userTweaks.shellHitboxTolerance // pixels; not scaled to keep absolute feel
  },

  // Animation timing and easing
  timing: {
    hoverDuration: userTweaks.hoverAnimationSpeed,
    baselineResetDuration: userTweaks.baselineResetAnimationSpeed,
    dragSnapDuration: userTweaks.dragSnapDuration ?? 0.5,
    dragElastic: {        // Elastic ease parameters for snap-back
      amplitude: userTweaks.dragElastic?.amplitude ?? 0.8,
      period: userTweaks.dragElastic?.period ?? 0.25
    },
    tetherUpdate: 0.016,   // 60fps for tether rendering
    pauseEasing: "power2.out"
  },

  // Tether effect (gooey connection during drag)
  tether: {
    maxStretch: 100,     // Max distance before breaking visually
    thickness: 4,        // Line thickness
    color: "#000",
    opacity: 0.6,
    springiness: 0.8     // How elastic the connection looks
  },

  // Viewport and layout (auto-calculated based on atom scale)
  viewport: (() => {
    // Calculate minimum viewport size needed based on scaled atom
    const maxShellRadius = Math.max(
      userTweaks.shellDistances.inner,
      userTweaks.shellDistances.middle,
      userTweaks.shellDistances.outer
    ) * userTweaks.atomScale;
    
    const maxElectronRadius = userTweaks.electronHoverSize * userTweaks.atomScale;
    const scaledPadding = userTweaks.viewportPadding * userTweaks.atomScale;
    
    const requiredSize = (maxShellRadius + maxElectronRadius + scaledPadding) * 2;
    const finalSize = Math.max(userTweaks.viewportSize, requiredSize);
    
    return {
      width: finalSize,          // Auto-calculated or user override
      height: finalSize,         // Auto-calculated or user override
      centerX: finalSize / 2,    // Center point
      centerY: finalSize / 2,
      padding: scaledPadding     // Scaled safe area around edges
    };
  })(),

  // Accessibility and motion
  motion: {
    respectReducedMotion: true,  // Honor prefers-reduced-motion
    fallbackToStatic: true,      // Show static version if needed
    minFPS: 30                   // Performance threshold
  },

  // One-page project overlay transition
  overlayTransition: {
    openMs: userTweaks.overlayTransition?.openMs ?? 600,
    closeMs: userTweaks.overlayTransition?.closeMs ?? 520,
    easing: userTweaks.overlayTransition?.easing ?? 'power2.inOut',
    edgeSoftnessPx: (userTweaks.overlayTransition?.edgeSoftnessPx ?? userTweaks.navTransition?.edgeSoftnessPx) ?? 0
  },

  // Electron navigation transition (separate in/out)
  navTransition: {
    enabled: userTweaks.navTransition?.enabled ?? true,
    inMs: userTweaks.navTransition?.inMs ?? (userTweaks.overlayTransition?.openMs ?? 600),
    outMs: userTweaks.navTransition?.outMs ?? (userTweaks.overlayTransition?.closeMs ?? 520),
    easing: userTweaks.navTransition?.easing ?? (userTweaks.overlayTransition?.easing ?? 'power2.inOut'),
    respectReducedMotion: userTweaks.navTransition?.respectReducedMotion ?? true,
    edgeSoftnessPx: userTweaks.navTransition?.edgeSoftnessPx ?? 0,
    blockInput: userTweaks.navTransition?.blockInput ?? true
  },

  // Micro-interactions
  micro: {
    hoverCursorRing: userTweaks.micro?.hoverCursorRing ?? true,
    hoverRingDelta: userTweaks.micro?.hoverRingDelta ?? 6,
    hoverRingOpacity: userTweaks.micro?.hoverRingOpacity ?? 0.6,
    hoverRingDurationMs: userTweaks.micro?.hoverRingDurationMs ?? 160,
    ripple: userTweaks.micro?.ripple ?? true,
    rippleDurationMs: userTweaks.micro?.rippleDurationMs ?? 360,
    rippleColor: userTweaks.micro?.rippleColor ?? '#000',
    rippleStrokeWidth: userTweaks.micro?.rippleStrokeWidth ?? 2,
    rippleExpandPx: userTweaks.micro?.rippleExpandPx ?? 56,
    shellPulse: userTweaks.micro?.shellPulse ?? true,
    shellPulseDelta: userTweaks.micro?.shellPulseDelta ?? 1.2,
    shellPulseDurationMs: userTweaks.micro?.shellPulseDurationMs ?? 200,
  },

  // Labels (domain text along shells)
  labels: {
    enabled: userTweaks.labels?.enabled ?? false,
    mode: userTweaks.labels?.mode ?? 'ring',
    fontSize: (userTweaks.labels?.fontSize ?? 14) * userTweaks.atomScale,
    offsetPx: userTweaks.labels?.offsetPx ?? 16,
    idleOpacity: userTweaks.labels?.idleOpacity ?? 0.35,
    hoverOpacity: userTweaks.labels?.hoverOpacity ?? 0.7,
    repeat: userTweaks.labels?.repeat ?? 10,
    pattern: {
      offsetsPercentByShell: userTweaks.labels?.pattern?.offsetsPercentByShell ?? [0, 3.5, 7],
      repeatsByShell: userTweaks.labels?.pattern?.repeatsByShell ?? [6, 8, 12],
      densityPxPerRepeat: userTweaks.labels?.pattern?.densityPxPerRepeat ?? 26,
      minRepeats: userTweaks.labels?.pattern?.minRepeats ?? 3,
      maxRepeats: userTweaks.labels?.pattern?.maxRepeats ?? 40,
      separator: userTweaks.labels?.pattern?.separator ?? ' • '
    },
    rotate: {
      enabled: userTweaks.labels?.rotate?.enabled ?? false,
      respectReducedMotion: userTweaks.labels?.rotate?.respectReducedMotion ?? false,
      speedsByShell: userTweaks.labels?.rotate?.speedsByShell ?? [90, 110, 130]
    },
    mobileViewportMaxPx: userTweaks.labels?.mobileViewportMaxPx ?? 700,
    mobileArcDegrees: userTweaks.labels?.mobileArcDegrees ?? 150,
    wordOrbit: {
      innerOffsetPx: userTweaks.labels?.wordOrbit?.innerOffsetPx ?? 20,
      arcDegrees: userTweaks.labels?.wordOrbit?.arcDegrees ?? 160,
      centerAngleDeg: userTweaks.labels?.wordOrbit?.centerAngleDeg ?? -90
    }
  },

  // Display names for domains
  domainDisplayNames: userTweaks.domainDisplayNames || {}

  ,
  // Dynamic shells generator parameters
  dynamicShells: {
    enabled: userTweaks.dynamicShells?.enabled ?? false,
    baseRadius: userTweaks.dynamicShells?.baseRadius ?? 120,
    baseGap: userTweaks.dynamicShells?.baseGap ?? 80,
    minGap: userTweaks.dynamicShells?.minGap ?? 56,
    maxGap: userTweaks.dynamicShells?.maxGap ?? 110,
    directionMode: userTweaks.dynamicShells?.directionMode ?? 'alternate',
    speed: {
      base: userTweaks.dynamicShells?.speed?.base ?? 9.0,
      deltaPerShell: userTweaks.dynamicShells?.speed?.deltaPerShell ?? 0.0
    }
  }
};
