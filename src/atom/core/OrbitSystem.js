/**
 * OrbitSystem - Manages electron orbital motion around static shells
 * Nucleus and shells remain static, only electrons move
 */

import { gsap } from 'gsap';

export class OrbitSystem {
  constructor(config) {
    this.config = config;
    this.electrons = [];
    this.timelines = new Map(); // Track individual electron timelines
    this.isRunning = false;
    this.centerX = config.viewport.centerX;
    this.centerY = config.viewport.centerY;
  }

  /**
   * Initialize the orbit system with electron elements
   */
  init() {
    // Find all electrons in the DOM
    const electronElements = document.querySelectorAll('.electron');
    
    electronElements.forEach((electron) => {
      const shellIndex = parseInt(electron.dataset.shell);
      const initialAngle = parseFloat(electron.dataset.angle);
      const shellConfig = this.config.shells[shellIndex];
      
      if (!shellConfig) return;
      
      // Store electron data
      const electronData = {
        element: electron,
        shellIndex: shellIndex,
        shellRadius: shellConfig.radius,
        initialAngle: initialAngle,
        currentAngle: initialAngle, // Use the carefully calculated angle from positioning algorithm
        direction: shellConfig.direction,
        speed: shellConfig.speed
      };
      
      // Create timeline for this electron
      const timeline = gsap.timeline({ 
        repeat: -1,
        ease: "none"
      });
      
      // Create smooth animation using CSS transforms but for circular motion
      // We'll animate a dummy object and update positions smoothly
      const rotationAmount = shellConfig.direction * 360;
      const duration = 360 / Math.abs(shellConfig.speed);
      
      timeline.to(electronData, {
        currentAngle: `+=${rotationAmount}`,
        duration: duration,
        ease: "none",
        onUpdate: () => {
          // Calculate new position based on current angle
          const radians = (electronData.currentAngle * Math.PI) / 180;
          const x = this.centerX + electronData.shellRadius * Math.cos(radians);
          const y = this.centerY + electronData.shellRadius * Math.sin(radians);
          
          // Use GSAP's optimized transform instead of SVG attributes
          gsap.set(electronData.element, {
            x: x - parseFloat(electronData.element.getAttribute('cx')),
            y: y - parseFloat(electronData.element.getAttribute('cy'))
          });
        }
      });
      
      // Set initial position (no transform needed initially)
      const radians = (electronData.currentAngle * Math.PI) / 180;
      const x = this.centerX + electronData.shellRadius * Math.cos(radians);
      const y = this.centerY + electronData.shellRadius * Math.sin(radians);
      gsap.set(electronData.element, { 
        attr: { cx: x, cy: y },
        x: 0,
        y: 0
      });
      
      // Store electron and timeline
      this.electrons.push(electronData);
      this.timelines.set(electronData.element, {
        timeline,
        electronData
      });
    });
    
    console.log(`OrbitSystem initialized with ${this.electrons.length} electrons`);
  }

  /**
   * Start all electron animations
   */
  start() {
    if (this.isRunning) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion && this.config.motion.respectReducedMotion) {
      console.log('Respecting reduced motion preference - skipping animations');
      return;
    }
    
    // Start all electron timelines
    this.timelines.forEach((electronInfo) => {
      electronInfo.timeline.play();
    });
    
    this.isRunning = true;
    console.log('OrbitSystem started');
  }

  /**
   * Stop all electron animations
   */
  stop() {
    if (!this.isRunning) return;
    
    this.timelines.forEach((electronInfo) => {
      electronInfo.timeline.pause();
    });
    
    this.isRunning = false;
    console.log('OrbitSystem stopped');
  }

  /**
   * Pause animation of electrons on a specific shell (for hover effects)
   */
  pauseShell(shellIndex) {
    this.timelines.forEach((electronInfo) => {
      if (electronInfo.electronData.shellIndex === shellIndex) {
        electronInfo.timeline.pause();
      }
    });
  }

  /**
   * Resume animation of electrons on a specific shell
   */
  resumeShell(shellIndex) {
    if (!this.isRunning) return;
    
    this.timelines.forEach((electronInfo) => {
      if (electronInfo.electronData.shellIndex === shellIndex) {
        electronInfo.timeline.play();
      }
    });
  }

  /**
   * Pause a specific electron (for individual hover effects)
   */
  pauseElectron(electronElement) {
    const electronInfo = this.timelines.get(electronElement);
    if (electronInfo) {
      electronInfo.timeline.pause();
    }
  }

  /**
   * Resume a specific electron
   */
  resumeElectron(electronElement) {
    if (!this.isRunning) return;
    
    const electronInfo = this.timelines.get(electronElement);
    if (electronInfo) {
      electronInfo.timeline.play();
    }
  }

  /**
   * Cleanup - stop all animations and clear references
   */
  destroy() {
    this.stop();
    this.timelines.forEach((electronInfo) => {
      electronInfo.timeline.kill();
    });
    this.timelines.clear();
    this.electrons = [];
    console.log('OrbitSystem destroyed');
  }
}