/**
 * Atom Portfolio Configuration
 * All visual and timing parameters for the interactive atom
 */

import { userTweaks } from './user-tweaks.js';

export default {
  // Central nucleus (bio/about section)
  nucleus: {
    text: "A",           // Initial, logo, or avatar
    radius: userTweaks.nucleusSize * userTweaks.atomScale,
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
    dragSpring: {          // Snap-back physics
      tension: 180,
      friction: 12
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
  }
};
