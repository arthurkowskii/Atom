/**
 * Atom Portfolio Configuration
 * All visual and timing parameters for the interactive atom
 */

import { userTweaks } from './user-tweaks.js';

export default {
  // Central nucleus (bio/about section)
  nucleus: {
    text: "A",           // Initial, logo, or avatar
    radius: userTweaks.nucleusSize,
    fontSize: 24,        // Text size inside nucleus
    color: "#000",       // Black for minimal design
    strokeWidth: 2
  },

  // Orbital shells (domains of work)
  shells: [
    {
      radius: userTweaks.shellDistances.inner,
      speed: userTweaks.electronSpeeds.innerShell,
      direction: 1,        // 1 = clockwise, -1 = counterclockwise
      strokeWidth: 1.5,
      color: "#000"
    },
    {
      radius: userTweaks.shellDistances.middle,
      speed: userTweaks.electronSpeeds.middleShell,
      direction: -1,       // Alternating direction for rhythm
      strokeWidth: 1.5,
      color: "#000"
    },
    {
      radius: userTweaks.shellDistances.outer,
      speed: userTweaks.electronSpeeds.outerShell,
      direction: 1,
      strokeWidth: 1.5,
      color: "#000"
    }
  ],

  // Electrons (project entries)
  electrons: {
    radius: userTweaks.electronSize,
    hoverRadius: userTweaks.electronHoverSize,
    color: "#000",
    hoverColor: "#000",
    strokeWidth: 2
  },

  // Electron spacing
  spacing: {
    minElectronDistance: userTweaks.minElectronDistance
  },

  // Animation timing and easing
  timing: {
    hoverDuration: userTweaks.hoverAnimationSpeed,
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

  // Viewport and layout
  viewport: {
    width: 600,          // SVG viewBox width
    height: 600,         // SVG viewBox height
    centerX: 300,        // Center point
    centerY: 300,
    padding: 50          // Safe area around edges
  },

  // Accessibility and motion
  motion: {
    respectReducedMotion: true,  // Honor prefers-reduced-motion
    fallbackToStatic: true,      // Show static version if needed
    minFPS: 30                   // Performance threshold
  }
};