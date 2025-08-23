// Vanilla JS Liquid Glass Implementation - Apple Style
// Adapted from Shu Ding's liquid-glass effect for organic displacement

class ShaderDisplacementGenerator {
  constructor(options) {
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.canvasDPI = 1;
    this.canvas.width = options.width * this.canvasDPI;
    this.canvas.height = options.height * this.canvasDPI;
    this.canvas.style.display = 'none';
    
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context');
    }
    this.context = context;
    this.mouse = { x: 0, y: 0 };
    this.mouseUsed = false;
  }

  // Utility functions for organic liquid glass effect
  static smoothStep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  static length(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  static roundedRectSDF(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + ShaderDisplacementGenerator.length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
  }

  // Organic liquid glass fragment shader - creates flowing distortion
  static liquidGlassFragment(uv, mouse) {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    
    // Create organic flowing distortion based on rounded rectangle SDF
    const distanceToEdge = ShaderDisplacementGenerator.roundedRectSDF(
      ix, iy, 0.3, 0.2, 0.6
    );
    
    // Smooth falloff for organic liquid effect
    const displacement = ShaderDisplacementGenerator.smoothStep(0.8, 0, distanceToEdge - 0.15);
    const scaled = ShaderDisplacementGenerator.smoothStep(0, 1, displacement);
    
    return { 
      type: 't', 
      x: ix * scaled + 0.5, 
      y: iy * scaled + 0.5 
    };
  }

  updateShader(mousePosition = null) {
    // Use mouse position tracking similar to original implementation
    const mouseProxy = new Proxy(this.mouse, {
      get: (target, prop) => {
        this.mouseUsed = true;
        return target[prop];
      }
    });

    this.mouseUsed = false;
    if (mousePosition) {
      this.mouse.x = mousePosition.x;
      this.mouse.y = mousePosition.y;
    }

    const w = this.options.width * this.canvasDPI;
    const h = this.options.height * this.canvasDPI;
    const data = new Uint8ClampedArray(w * h * 4);

    let maxScale = 0;
    const rawValues = [];

    // Generate displacement map using liquid glass fragment shader
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = ShaderDisplacementGenerator.liquidGlassFragment(
        { x: x / w, y: y / h },
        mouseProxy
      );
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5; // Scaling factor for organic effect

    // Fill displacement map
    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      data[i] = r * 255;     // Red channel (X displacement)
      data[i + 1] = g * 255; // Green channel (Y displacement)
      data[i + 2] = 0;       // Blue channel (unused)
      data[i + 3] = 255;     // Alpha channel
    }

    this.context.putImageData(new ImageData(data, w, h), 0, 0);
    return this.canvas.toDataURL();
  }

  destroy() {
    this.canvas.remove();
  }
}

// Main LiquidGlass class - Apple Style Liquid Glass Effect
export class LiquidGlass {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      displacementScale: 8, // Reduced for subtle organic effect
      blurAmount: 0.25,
      saturation: 120,
      cornerRadius: 16,
      padding: '16px',
      overLight: false,
      enabled: true,
      ...options
    };

    this.isInitialized = false;
    this.mouse = { x: 0, y: 0 };
    this.mouseUsed = false;
    this.filterId = `liquid-glass-${Math.random().toString(36).substr(2, 9)}`;
    this.displacement = null;

    // Browser feature support
    this.supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)');
    this.respectsReducedMotion = this.options.respectReducedMotion && 
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  checkSVGFilterSupport() {
    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      const feDisplacement = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      return !!(svg && filter && feDisplacement && typeof feDisplacement.setAttribute === 'function');
    } catch (e) {
      return false;
    }
  }

  init() {
    if (!this.options.enabled || this.isInitialized) return;

    console.log('🔮 Liquid glass init (simplified):', {
      supportsBackdropFilter: this.supportsBackdropFilter,
      respectsReducedMotion: this.respectsReducedMotion,
      displacementScale: this.options.displacementScale
    });

    // Always use the clean fallback approach - no complex SVG filters
    this.initFallback();
  }

  initFallback() {
    // Add fallback class for enhanced backdrop-filter styling
    this.container.classList.add('liquid-glass-fallback');
    
    // Store original content
    const content = this.container.getAttribute('data-original-content') || this.container.innerHTML;
    this.container.innerHTML = `<div class="fallback-content">${content}</div>`;
    
    // Apply enhanced backdrop-filter styles with organic feel
    const fallbackStyles = `
      background: rgba(255, 255, 255, 0.15) !important;
      backdrop-filter: blur(${12 + this.options.blurAmount * 16}px) saturate(${this.options.saturation}%) contrast(1.1) brightness(1.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      border-radius: ${this.options.cornerRadius}px !important;
      padding: ${this.options.padding} !important;
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
      transition: all 0.3s ease-out !important;
      position: relative !important;
      display: inline-block !important;
      overflow: hidden !important;
    `;
    
    this.container.style.cssText = fallbackStyles;
    
    // Add subtle highlight overlay for glass effect
    const highlight = document.createElement('div');
    highlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(ellipse 100% 50% at 20% 0%, rgba(255,255,255,0.1), transparent 70%);
      mix-blend-mode: overlay;
      pointer-events: none;
    `;
    this.container.appendChild(highlight);
    
    this.isInitialized = true;
    console.log('🔮 Liquid glass: Using enhanced backdrop-filter fallback');
  }

  createLiquidGlassStructure() {
    // Store original content before clearing
    const originalContent = this.container.getAttribute('data-original-content') || this.container.innerHTML;
    
    // Clear existing content
    this.container.innerHTML = '';
    
    // Create SVG filter for displacement
    this.createSVGFilter();

    // Create main container (no filter applied here)
    const mainContainer = document.createElement('div');
    mainContainer.className = 'liquid-glass-main';
    mainContainer.style.cssText = `
      position: relative;
      display: block;
      max-width: 640px;
      width: 100%;
      min-height: 60px;
      box-sizing: border-box;
    `;

    // Create glass background (this gets the displacement effect)
    const glassBackground = document.createElement('div');
    glassBackground.className = 'liquid-glass-bg';
    glassBackground.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: ${this.options.cornerRadius}px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(${4 + this.options.blurAmount * 16}px) saturate(${this.options.saturation}%) contrast(1.2) brightness(1.05);
      -webkit-backdrop-filter: blur(${4 + this.options.blurAmount * 16}px) saturate(${this.options.saturation}%) contrast(1.2) brightness(1.05);
      filter: url(#${this.filterId});
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease-out;
      will-change: filter;
    `;

    // Content layer (stays sharp, positioned above glass - NO FILTER)
    const content = document.createElement('div');
    content.className = 'liquid-glass-content';
    content.style.cssText = `
      position: absolute;
      inset: 0;
      z-index: 2;
      padding: ${this.options.padding};
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      pointer-events: none; /* Allow mouse events to pass through to background */
      box-sizing: border-box;
    `;
    content.innerHTML = originalContent;

    // Assemble structure: background first, content on top
    mainContainer.appendChild(glassBackground);
    mainContainer.appendChild(content);
    this.container.appendChild(mainContainer);

    // Store references
    this.glassContainer = mainContainer;
    this.glassBackground = glassBackground;
    this.content = content;
  }


  createSVGFilter() {
    // Create SVG element for displacement filter
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position: fixed; top: 0; left: 0; width: 0; height: 0; pointer-events: none; z-index: 9998;';
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('aria-hidden', 'true');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Create main displacement filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', this.filterId);
    filter.setAttribute('filterUnits', 'objectBoundingBox');
    filter.setAttribute('colorInterpolationFilters', 'sRGB');
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');

    // Create feImage for displacement map
    this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    this.feImage.setAttribute('id', `${this.filterId}_map`);
    this.feImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    // Create feDisplacementMap for liquid glass effect
    this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
    this.feDisplacementMap.setAttribute('in2', `${this.filterId}_map`);
    this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
    this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

    filter.appendChild(this.feImage);
    filter.appendChild(this.feDisplacementMap);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    this.svgFilter = svg;

    // Create displacement generator with dynamic sizing
    this.displacement = new ShaderDisplacementGenerator({
      width: 300,
      height: 150,
      fragment: ShaderDisplacementGenerator.liquidGlassFragment
    });
  }




  updateShader() {
    if (!this.displacement || !this.feImage || !this.feDisplacementMap) return;
    
    // Generate organic liquid glass displacement map
    const mapUrl = this.displacement.updateShader(this.mouse);
    this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mapUrl);
    
    // Set displacement scale for subtle liquid effect
    const scale = this.options.displacementScale;
    this.feDisplacementMap.setAttribute('scale', scale.toString());
  }

  setupEventListeners() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    
    // Listen for mouse events on the main container
    this.container.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove(e) {
    if (!this.glassContainer) return;

    // Update mouse position for shader displacement based on main container
    const rect = this.glassContainer.getBoundingClientRect();
    this.mouse.x = (e.clientX - rect.left) / rect.width;
    this.mouse.y = (e.clientY - rect.top) / rect.height;
    
    // Update displacement map with new mouse position
    if (this.displacement) {
      this.updateShader();
    }
  }










  destroy() {
    // Remove event listeners
    if (this.container && this.handleMouseMove) {
      this.container.removeEventListener('mousemove', this.handleMouseMove);
    }

    // Remove SVG filter
    if (this.svgFilter) {
      this.svgFilter.remove();
    }

    // Destroy displacement generator
    if (this.displacement) {
      this.displacement.destroy();
    }

    // Clear container
    if (this.container) {
      this.container.innerHTML = '';
    }

    this.isInitialized = false;
  }

  // Public API methods
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    
    if (this.isInitialized) {
      this.destroy();
      this.init();
    }
  }

  enable() {
    this.options.enabled = true;
    this.init();
  }

  disable() {
    this.options.enabled = false;
    this.destroy();
  }
}