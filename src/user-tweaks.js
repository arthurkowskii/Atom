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
  electronHoverSize: 30,  // Size when you hover over it
  nucleusSize: 40,        // Center "A" circle size

  // ⏱️ TIMING
  hoverAnimationSpeed: 0.3,  // How fast electrons grow/shrink on hover (seconds)

  // 🎯 SHELL DISTANCES (from center)
  shellDistances: {
    inner: 120,   // Pixels from nucleus center
    middle: 200,
    outer: 280
  },

  // 📐 ELECTRON SPACING
  minElectronDistance: 30   // Minimum degrees between electrons on same shell

}; 

// Don't edit below this line unless you know what you're doing!
// ================================================================

export default userTweaks;