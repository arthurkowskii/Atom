/**
 * Electron positioning utilities
 * Handles spacing electrons around shells with minimum distance constraints
 */

/**
 * Calculate electron positions with minimum distance spacing
 * @param {number} electronCount - Number of electrons on this shell
 * @param {number} minDistanceDegrees - Minimum distance between electrons in degrees
 * @returns {number[]} Array of angles in DEGREES (for OrbitSystem compatibility)
 */
export function calculateElectronPositions(electronCount, minDistanceDegrees = 60) {
  console.log(`🔧 calculateElectronPositions called: ${electronCount} electrons, ${minDistanceDegrees}° min distance`);
  
  if (electronCount === 0) return [];
  if (electronCount === 1) return [0];
  
  const fullCircleDegrees = 360;
  const totalMinSpace = minDistanceDegrees * electronCount;
  
  console.log(`📊 totalMinSpace needed: ${totalMinSpace}°, available: ${fullCircleDegrees}°`);
  
  // If minimum distances exceed full circle, use even distribution as fallback
  if (totalMinSpace >= fullCircleDegrees) {
    console.warn(`❌ FALLBACK: ${electronCount} × ${minDistanceDegrees}° = ${totalMinSpace}° > 360°. Using even distribution.`);
    const evenPositions = Array.from({ length: electronCount }, (_, i) => (i * fullCircleDegrees) / electronCount);
    console.log(`📍 Even positions:`, evenPositions);
    return evenPositions;
  }
  
  // Calculate spacing with minimum distances
  const remainingSpace = fullCircleDegrees - totalMinSpace;
  const extraSpacing = remainingSpace / electronCount;
  const actualSpacing = minDistanceDegrees + extraSpacing;
  
  console.log(`📊 remainingSpace: ${remainingSpace}°, extraSpacing: ${extraSpacing.toFixed(1)}°, actualSpacing: ${actualSpacing.toFixed(1)}°`);
  
  // Generate positions in degrees
  const positions = [];
  for (let i = 0; i < electronCount; i++) {
    const angle = i * actualSpacing;
    positions.push(angle);
    console.log(`📍 Position ${i}: ${angle.toFixed(1)}°`);
  }
  
  // Add random shell offset
  const randomOffset = Math.random() * fullCircleDegrees;
  const finalPositions = positions.map(angle => (angle + randomOffset) % fullCircleDegrees);
  
  console.log(`🎯 Random offset: ${randomOffset.toFixed(1)}°`);
  console.log(`🎯 Final positions:`, finalPositions.map(a => a.toFixed(1)));
  
  return finalPositions;
}

/**
 * Convert angle from radians to degrees (for debugging)
 */
export function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

/**
 * Calculate the actual distance in degrees between two positions on a circle
 */
export function calculateAngularDistance(angle1, angle2) {
  const diff = Math.abs(angle2 - angle1);
  const distance = Math.min(diff, 2 * Math.PI - diff);
  return (distance * 180) / Math.PI;
}