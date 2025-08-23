/**
 * Atom Portfolio Configuration
 * All visual and timing parameters for the interactive atom
 */

import { userTweaks } from './user-tweaks.js';

// Debug: Check if userTweaks.liquidGlass is loading
console.log('🔧 atom.config.js - userTweaks.liquidGlass:', userTweaks.liquidGlass);

export default {
  // Central nucleus (bio/about section)
  nucleus: {
    text: "Me",          // Initial, logo, or avatar
    radius: userTweaks.nucleusSize * userTweaks.atomScale,
    hoverRadius: (userTweaks.nucleusHoverSize ?? userTweaks.nucleusSize * 1.3) * userTweaks.atomScale,
    fontSize: 24 * userTweaks.atomScale,        // Text size inside nucleus (scaled)
    color: "#000",       // Black for minimal design
    strokeWidth: 2 * userTweaks.atomScale,
    logo: {
      size: userTweaks.nucleusLogo?.size ?? 1.4,
      offsetX: userTweaks.nucleusLogo?.offsetX ?? 0,
      offsetY: userTweaks.nucleusLogo?.offsetY ?? 0
    }
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
  },

  // Electron preview card configuration
  electronPreview: {
    enabled: userTweaks.electronPreview?.enabled ?? true,
    width: userTweaks.electronPreview?.width ?? 320,
    height: userTweaks.electronPreview?.height ?? 120,
    offsetX: userTweaks.electronPreview?.offsetX ?? 20,
    offsetY: userTweaks.electronPreview?.offsetY ?? -20,
    borderRadius: userTweaks.electronPreview?.borderRadius ?? 8,
    heroSize: userTweaks.electronPreview?.heroSize ?? 88,
    heroRadius: userTweaks.electronPreview?.heroRadius ?? 8,
    heroMargin: userTweaks.electronPreview?.heroMargin ?? 16,
    contentPadding: userTweaks.electronPreview?.contentPadding ?? 16,
    titleSize: userTweaks.electronPreview?.titleSize ?? 16,
    subtitleSize: userTweaks.electronPreview?.subtitleSize ?? 13,
    animationDuration: userTweaks.electronPreview?.animationDuration ?? 0.2,
    animationEase: userTweaks.electronPreview?.animationEase ?? 'back.out(1.7)',
    multiStage: userTweaks.electronPreview?.multiStage ?? {
      stage1Duration: 0.3,
      stage2Duration: 0.4,  
      stage3Duration: 0.2,
      settleDebounce: 0.1,
      birthScale: 0.1,
      travelScale: 0.3,
      preExpandScale: 0.8,
      overshootScale: 1.05,
      finalScale: 1.0,
      birthOpacity: 0.3,
      travelOpacity: 0.7,
      preExpandOpacity: 0.9,
      finalOpacity: 1.0
    }
  },

  // Bento animations configuration
  bentoAnimations: userTweaks.bentoAnimations || {
    enabled: false,
    bpm: 120,
    musicalTiming: { beat: 500, eighth: 250, sixteenth: 125 },
    cardTypes: {},
    audio: { enabled: false, volume: 0.3 }
  },

  // Bento hero liquid glass configuration
  bentoGlass: userTweaks.bentoGlass || {
    enabled: true,
    blurPx: 16,
    saturatePct: 140,
    bgAlpha: 0.18,
    borderAlpha: 0.5,
    radiusPx: 16,
    paddingPx: 16,
    maxWidthPx: 640,
    shadow: '0 10px 30px rgba(0,0,0,0.15)',
    distortion: { enabled: true, edgeWidthPx: 16, baseFrequencyMin: 0.008, baseFrequencyMax: 0.010, numOctaves: 1, scale: 4, animate: true, durationSec: 16 }
  },

  // Atom interface sounds configuration
  atomSounds: userTweaks.atomSounds || {
    enabled: false,
    volume: 0.2,
    events: {},
    synthesis: {}
  },

  // Liquid Glass configuration (Apple-style with SVG refraction)
  liquidGlass: (() => {
    console.log('🔧 atom.config.js - Building liquidGlass config with:', {
      blurAmount: userTweaks.liquidGlass?.blurAmount,
      displacementScale: userTweaks.liquidGlass?.displacementScale,
      elasticity: userTweaks.liquidGlass?.elasticity
    });
    return {
    enabled: userTweaks.liquidGlass?.enabled ?? true,
    displacementScale: userTweaks.liquidGlass?.displacementScale ?? 70,
    blurAmount: userTweaks.liquidGlass?.blurAmount ?? 0.0625,
    saturation: userTweaks.liquidGlass?.saturation ?? 140,
    aberrationIntensity: userTweaks.liquidGlass?.aberrationIntensity ?? 2,
    elasticity: userTweaks.liquidGlass?.elasticity ?? 0.15,
    mouseActivationZone: userTweaks.liquidGlass?.mouseActivationZone ?? 200,
    cornerRadius: userTweaks.liquidGlass?.cornerRadius ?? 16,
    padding: userTweaks.liquidGlass?.padding ?? '16px',
    overLight: userTweaks.liquidGlass?.overLight ?? false,
    noBorders: userTweaks.liquidGlass?.noBorders ?? false,
    mode: userTweaks.liquidGlass?.mode ?? 'standard',
    enableShaderMode: userTweaks.liquidGlass?.enableShaderMode ?? false,
    fallbackToBackdrop: userTweaks.liquidGlass?.fallbackToBackdrop ?? true,
    respectReducedMotion: userTweaks.liquidGlass?.respectReducedMotion ?? true,
    initializeOnHover: userTweaks.liquidGlass?.initializeOnHover ?? false,
    destroyOnLeave: userTweaks.liquidGlass?.destroyOnLeave ?? false,
    showFallbackIndicator: userTweaks.liquidGlass?.showFallbackIndicator ?? false
    };
  })()

};
