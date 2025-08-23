// Vanilla JS Liquid Glass Implementation
// Ported from liquid-glass-react for Astro integration

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
  }

  static fragmentShaders = {
    liquidGlass: (uv) => {
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      const distanceToEdge = ShaderDisplacementGenerator.roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
      const displacement = ShaderDisplacementGenerator.smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = ShaderDisplacementGenerator.smoothStep(0, 1, displacement);
      return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
    }
  };

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

  updateShader(mousePosition) {
    const w = this.options.width * this.canvasDPI;
    const h = this.options.height * this.canvasDPI;

    let maxScale = 0;
    const rawValues = [];

    // Calculate displacement values
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const uv = { x: x / w, y: y / h };
        const pos = this.options.fragment(uv, mousePosition);
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;

        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }
    }

    // Normalize to prevent artifacts
    if (maxScale > 0) {
      maxScale = Math.max(maxScale, 1);
    } else {
      maxScale = 1;
    }

    // Create ImageData and fill it
    const imageData = this.context.createImageData(w, h);
    const data = imageData.data;

    let rawIndex = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = rawValues[rawIndex++];
        const dy = rawValues[rawIndex++];

        // Smooth the displacement values at edges
        const edgeDistance = Math.min(x, y, w - x - 1, h - y - 1);
        const edgeFactor = Math.min(1, edgeDistance / 2);

        const smoothedDx = dx * edgeFactor;
        const smoothedDy = dy * edgeFactor;

        const r = smoothedDx / maxScale + 0.5;
        const g = smoothedDy / maxScale + 0.5;

        const pixelIndex = (y * w + x) * 4;
        data[pixelIndex] = Math.max(0, Math.min(255, r * 255));     // Red (X displacement)
        data[pixelIndex + 1] = Math.max(0, Math.min(255, g * 255)); // Green (Y displacement)
        data[pixelIndex + 2] = Math.max(0, Math.min(255, g * 255)); // Blue (Y displacement for SVG)
        data[pixelIndex + 3] = 255; // Alpha
      }
    }

    this.context.putImageData(imageData, 0, 0);
    return this.canvas.toDataURL();
  }

  destroy() {
    this.canvas.remove();
  }
}

// Main LiquidGlass class
export class LiquidGlass {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      displacementScale: 70,
      blurAmount: 0.0625,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      cornerRadius: 16,
      padding: '16px',
      overLight: false,
      mode: 'standard',
      enabled: true,
      ...options
    };

    this.isInitialized = false;
    this.isHovered = false;
    this.isActive = false;
    this.glassSize = { width: 270, height: 69 };
    this.mousePos = { x: 0, y: 0 };
    this.mouseOffset = { x: 0, y: 0 };
    this.shaderMapUrl = '';
    this.filterId = `liquid-glass-${Math.random().toString(36).substr(2, 9)}`;

    // Browser detection and feature support
    this.isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)');
    this.supportsSVGFilters = this.checkSVGFilterSupport();
    this.respectsReducedMotion = this.options.respectReducedMotion && 
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  checkSVGFilterSupport() {
    // Force enable for testing (remove Firefox/Safari restrictions)
    console.log('🔮 Browser detection:', {
      isFirefox: this.isFirefox,
      isSafari: this.isSafari,
      userAgent: navigator.userAgent
    });
    
    // Temporarily enable for all browsers to test
    return true;
    
    // Original restrictive logic (commented out for testing):
    // if (this.isFirefox || this.isSafari) return false;
    // try {
    //   const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //   const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    //   const feDisplacement = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    //   return !!(svg && filter && feDisplacement && typeof feDisplacement.setAttribute === 'function');
    // } catch (e) {
    //   return false;
    // }
  }

  init() {
    if (!this.options.enabled || this.isInitialized) return;

    console.log('🔮 Liquid glass init:', {
      supportsSVGFilters: this.supportsSVGFilters,
      respectsReducedMotion: this.respectsReducedMotion,
      fallbackToBackdrop: this.options.fallbackToBackdrop,
      displacementScale: this.options.displacementScale,
      blurAmount: this.options.blurAmount,
      aberrationIntensity: this.options.aberrationIntensity,
      noBorders: this.options.noBorders
    });

    // Use fallback for unsupported browsers or reduced motion (only if fallback is enabled)
    if ((!this.supportsSVGFilters || this.respectsReducedMotion) && this.options.fallbackToBackdrop) {
      this.initFallback();
      return;
    }

    this.createGlassStructure();
    this.setupEventListeners();
    this.updateGlassSize();

    // Generate shader displacement map if needed
    if (this.options.mode === 'shader') {
      this.generateShaderMap();
    }

    this.isInitialized = true;
  }

  initFallback() {
    // Add fallback class for enhanced backdrop-filter styling
    this.container.classList.add('liquid-glass-fallback');
    
    // Store original content
    const content = this.container.getAttribute('data-original-content') || this.container.innerHTML;
    this.container.innerHTML = `<div class="fallback-content">${content}</div>`;
    
    // Apply enhanced backdrop-filter styles
    const fallbackStyles = `
      background: rgba(255, 255, 255, ${this.options.overLight ? 0.25 : 0.18}) !important;
      backdrop-filter: blur(${16 + this.options.blurAmount * 32}px) saturate(${this.options.saturation}%) !important;
      border: 1px solid rgba(255, 255, 255, 0.5) !important;
      border-radius: ${this.options.cornerRadius}px !important;
      padding: ${this.options.padding} !important;
      box-shadow: ${this.options.overLight ? '0px 16px 70px rgba(0, 0, 0, 0.75)' : '0px 12px 40px rgba(0, 0, 0, 0.25)'} !important;
      transition: all 0.2s ease-in-out !important;
      position: relative !important;
      display: inline-block !important;
      overflow: hidden !important;
    `;
    
    this.container.style.cssText = fallbackStyles;
    
    // Add highlight overlay
    const highlight = document.createElement('div');
    highlight.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(120% 60% at 10% 0%, rgba(255,255,255,0.25), transparent 60%);
      mix-blend-mode: screen;
      pointer-events: none;
    `;
    this.container.appendChild(highlight);
    
    this.isInitialized = true;
    
    if (this.options.showFallbackIndicator) {
      console.log('🔮 Liquid glass: Using backdrop-filter fallback');
    }
  }

  createGlassStructure() {
    // Store original content before clearing
    const originalContent = this.container.getAttribute('data-original-content') || this.container.innerHTML;
    
    // Clear existing content
    this.container.innerHTML = '';
    
    // Create SVG filter
    if (this.supportsSVGFilters) {
      console.log('🔮 Creating SVG filter with ID:', this.filterId);
      this.createSVGFilter();
    } else {
      console.log('🔮 SVG filters not supported, browser:', navigator.userAgent);
    }

    // Create glass container structure
    const glassContainer = document.createElement('div');
    glassContainer.className = 'liquid-glass-container';
    glassContainer.style.cssText = `
      position: relative;
      display: inline-block;
      transform: translateZ(0); /* Force hardware acceleration */
    `;

    // Glass effect layer (combines backdrop blur + SVG displacement)
    const glassEffect = document.createElement('div');
    glassEffect.className = 'liquid-glass-effect';
    const blurValue = (this.options.overLight ? 12 : 4) + this.options.blurAmount * 32;
    const backdropFilterValue = `blur(${blurValue}px) saturate(${this.options.saturation}%)`;
    const svgFilterValue = this.supportsSVGFilters ? `url(#${this.filterId})` : '';
    
    console.log('🔮 Glass effect values:', {
      blurValue,
      backdropFilterValue,
      svgFilterValue,
      filterId: this.filterId
    });
    
    glassEffect.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: ${this.options.cornerRadius}px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: ${backdropFilterValue};
      -webkit-backdrop-filter: ${backdropFilterValue};
      ${svgFilterValue ? `filter: ${svgFilterValue};` : ''}
      box-shadow: ${this.options.overLight ? '0px 16px 70px rgba(0, 0, 0, 0.75)' : '0px 12px 40px rgba(0, 0, 0, 0.25)'};
      transition: all 0.2s ease-in-out;
    `;

    // Content layer (stays sharp, positioned above glass effect)
    const content = document.createElement('div');
    content.className = 'liquid-glass-content';
    content.style.cssText = `
      position: relative;
      z-index: 2;
      padding: ${this.options.padding};
      color: inherit;
    `;
    content.innerHTML = originalContent;

    // Border layers for enhanced edges (only if not disabled)
    let borderLayer1, borderLayer2;
    if (!this.options.noBorders) {
      borderLayer1 = document.createElement('span');
      borderLayer1.className = 'liquid-glass-border-1';
      this.setupBorderLayer(borderLayer1, 'screen', 0.1);

      borderLayer2 = document.createElement('span');
      borderLayer2.className = 'liquid-glass-border-2';
      this.setupBorderLayer(borderLayer2, 'overlay', 0.3);
    }

    // Assemble structure
    glassContainer.appendChild(glassEffect);
    glassContainer.appendChild(content);
    if (borderLayer1) glassContainer.appendChild(borderLayer1);
    if (borderLayer2) glassContainer.appendChild(borderLayer2);

    this.container.appendChild(glassContainer);

    // Store references
    this.glassContainer = glassContainer;
    this.glassEffect = glassEffect;
    this.content = content;
    this.borderLayer1 = borderLayer1;
    this.borderLayer2 = borderLayer2;
  }

  setupBorderLayer(layer, mixBlendMode, opacity) {
    layer.style.cssText = `
      position: absolute;
      inset: 0;
      border-radius: ${this.options.cornerRadius}px;
      pointer-events: none;
      mix-blend-mode: ${mixBlendMode};
      opacity: ${opacity};
      padding: 1.5px;
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35);
      transition: all 0.2s ease-out;
    `;
  }

  createSVGFilter() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position: absolute; width: 0; height: 0; pointer-events: none;';
    svg.setAttribute('aria-hidden', 'true');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Create radial gradient for edge mask
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', `${this.filterId}-edge-mask`);
    gradient.setAttribute('cx', '50%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '50%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'black');
    stop1.setAttribute('stop-opacity', '0');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', `${Math.max(30, 80 - this.options.aberrationIntensity * 2)}%`);
    stop2.setAttribute('stop-color', 'black');
    stop2.setAttribute('stop-opacity', '0');
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', 'white');
    stop3.setAttribute('stop-opacity', '1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);

    // Create main filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', this.filterId);
    filter.setAttribute('x', '-35%');
    filter.setAttribute('y', '-35%');
    filter.setAttribute('width', '170%');
    filter.setAttribute('height', '170%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    // Add filter elements (displacement map, color matrices, etc.)
    this.createFilterElements(filter);

    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    this.svgFilter = svg;
  }

  createFilterElements(filter) {
    // Displacement map
    const feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
    feImage.setAttribute('x', '0');
    feImage.setAttribute('y', '0');
    feImage.setAttribute('width', '100%');
    feImage.setAttribute('height', '100%');
    feImage.setAttribute('result', 'DISPLACEMENT_MAP');
    feImage.setAttribute('href', this.getDisplacementMap());
    feImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');

    // Edge intensity calculation
    const colorMatrix1 = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    colorMatrix1.setAttribute('in', 'DISPLACEMENT_MAP');
    colorMatrix1.setAttribute('type', 'matrix');
    colorMatrix1.setAttribute('values', '0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0');
    colorMatrix1.setAttribute('result', 'EDGE_INTENSITY');

    // Component transfer for edge mask
    const componentTransfer = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
    componentTransfer.setAttribute('in', 'EDGE_INTENSITY');
    componentTransfer.setAttribute('result', 'EDGE_MASK');
    
    const feFuncA = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
    feFuncA.setAttribute('type', 'discrete');
    feFuncA.setAttribute('tableValues', `0 ${this.options.aberrationIntensity * 0.05} 1`);
    componentTransfer.appendChild(feFuncA);

    // Original undisplaced image
    const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    feOffset.setAttribute('in', 'SourceGraphic');
    feOffset.setAttribute('dx', '0');
    feOffset.setAttribute('dy', '0');
    feOffset.setAttribute('result', 'CENTER_ORIGINAL');

    // RGB channel displacements for chromatic aberration
    const redDisplacement = this.createChannelDisplacement('RED', this.options.displacementScale, [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0]);
    const greenDisplacement = this.createChannelDisplacement('GREEN', this.options.displacementScale - this.options.aberrationIntensity * 0.05, [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0]);
    const blueDisplacement = this.createChannelDisplacement('BLUE', this.options.displacementScale - this.options.aberrationIntensity * 0.1, [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0]);

    // Blend modes for combining channels
    const blend1 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    blend1.setAttribute('in', 'GREEN_CHANNEL');
    blend1.setAttribute('in2', 'BLUE_CHANNEL');
    blend1.setAttribute('mode', 'screen');
    blend1.setAttribute('result', 'GB_COMBINED');

    const blend2 = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    blend2.setAttribute('in', 'RED_CHANNEL');
    blend2.setAttribute('in2', 'GB_COMBINED');
    blend2.setAttribute('mode', 'screen');
    blend2.setAttribute('result', 'RGB_COMBINED');

    // Gaussian blur for softening
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('in', 'RGB_COMBINED');
    blur.setAttribute('stdDeviation', Math.max(0.1, 0.5 - this.options.aberrationIntensity * 0.1));
    blur.setAttribute('result', 'ABERRATED_BLURRED');

    // Apply edge mask
    const composite1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    composite1.setAttribute('in', 'ABERRATED_BLURRED');
    composite1.setAttribute('in2', 'EDGE_MASK');
    composite1.setAttribute('operator', 'in');
    composite1.setAttribute('result', 'EDGE_ABERRATION');

    // Inverted mask for center
    const invertMask = document.createElementNS('http://www.w3.org/2000/svg', 'feComponentTransfer');
    invertMask.setAttribute('in', 'EDGE_MASK');
    invertMask.setAttribute('result', 'INVERTED_MASK');
    
    const invertFunc = document.createElementNS('http://www.w3.org/2000/svg', 'feFuncA');
    invertFunc.setAttribute('type', 'table');
    invertFunc.setAttribute('tableValues', '1 0');
    invertMask.appendChild(invertFunc);

    // Clean center
    const composite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    composite2.setAttribute('in', 'CENTER_ORIGINAL');
    composite2.setAttribute('in2', 'INVERTED_MASK');
    composite2.setAttribute('operator', 'in');
    composite2.setAttribute('result', 'CENTER_CLEAN');

    // Final composite
    const finalComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    finalComposite.setAttribute('in', 'EDGE_ABERRATION');
    finalComposite.setAttribute('in2', 'CENTER_CLEAN');
    finalComposite.setAttribute('operator', 'over');

    // Append all elements
    [feImage, colorMatrix1, componentTransfer, feOffset, ...redDisplacement, ...greenDisplacement, ...blueDisplacement, blend1, blend2, blur, composite1, invertMask, composite2, finalComposite].forEach(el => filter.appendChild(el));
  }

  createChannelDisplacement(channelName, scale, matrixValues) {
    const displacement = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    displacement.setAttribute('in', 'SourceGraphic');
    displacement.setAttribute('in2', 'DISPLACEMENT_MAP');
    const finalScale = Math.abs(scale);
    console.log(`🔮 Creating ${channelName} displacement with scale:`, finalScale, 'from original:', scale);
    displacement.setAttribute('scale', finalScale); // Always use positive scale for visible refraction
    displacement.setAttribute('xChannelSelector', 'R');
    displacement.setAttribute('yChannelSelector', 'B');
    displacement.setAttribute('result', `${channelName}_DISPLACED`);

    const colorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    colorMatrix.setAttribute('in', `${channelName}_DISPLACED`);
    colorMatrix.setAttribute('type', 'matrix');
    colorMatrix.setAttribute('values', matrixValues.join(' '));
    colorMatrix.setAttribute('result', `${channelName}_CHANNEL`);

    return [displacement, colorMatrix];
  }

  getDisplacementMap() {
    // Generate dynamic displacement map based on user's displacementScale
    const intensity = Math.max(0.1, this.options.displacementScale / 100); // Convert to proper range
    const baseFreq = Math.max(0.01, Math.min(0.08, intensity * 0.00015)); // Higher frequency for visible distortion
    
    console.log('🔮 Creating displacement map - displacementScale:', this.options.displacementScale, 'intensity:', intensity, 'baseFreq:', baseFreq);
    
    // Create high-contrast SVG with feTurbulence for visible displacement
    const svg = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="displacementGen">
          <feTurbulence baseFrequency="${baseFreq} ${baseFreq}" numOctaves="4" result="turbulence" seed="5"/>
          <feColorMatrix in="turbulence" type="matrix" 
            values="1 0 0 0 0
                    0 1 0 0 0  
                    0 0 1 0 0
                    0 0 0 1 0" result="highContrast"/>
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 0.3 0.7 1"/>
            <feFuncG type="table" tableValues="0 0.3 0.7 1"/>
            <feFuncB type="table" tableValues="0 0.3 0.7 1"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#808080" filter="url(#displacementGen)"/>
    </svg>`;
    
    const base64 = btoa(svg);
    return `data:image/svg+xml;base64,${base64}`;
  }

  generateShaderMap() {
    const generator = new ShaderDisplacementGenerator({
      width: this.glassSize.width,
      height: this.glassSize.height,
      fragment: ShaderDisplacementGenerator.fragmentShaders.liquidGlass
    });
    this.shaderMapUrl = generator.updateShader();
    generator.destroy();
  }

  setupEventListeners() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleResize = this.handleResize.bind(this);

    this.container.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('mouseenter', this.handleMouseEnter);
    this.container.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('resize', this.handleResize);
  }

  handleMouseMove(e) {
    if (!this.glassContainer) return;

    const rect = this.glassContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.mouseOffset = {
      x: ((e.clientX - centerX) / rect.width) * 100,
      y: ((e.clientY - centerY) / rect.height) * 100
    };

    this.mousePos = {
      x: e.clientX,
      y: e.clientY
    };

    this.updateTransforms();
    this.updateBorderGradients();
  }

  handleMouseEnter() {
    this.isHovered = true;
  }

  handleMouseLeave() {
    this.isHovered = false;
    this.mouseOffset = { x: 0, y: 0 };
    this.updateTransforms();
    this.updateBorderGradients();
  }

  handleResize() {
    this.updateGlassSize();
    if (this.options.mode === 'shader' && this.supportsSVGFilters) {
      this.generateShaderMap();
    }
  }

  updateGlassSize() {
    if (this.glassContainer) {
      const rect = this.glassContainer.getBoundingClientRect();
      this.glassSize = { width: rect.width, height: rect.height };
    }
  }

  updateTransforms() {
    if (!this.glassContainer) return;

    const elasticTranslation = this.calculateElasticTranslation();
    const directionalScale = this.calculateDirectionalScale();
    
    const transform = `translate(${elasticTranslation.x}px, ${elasticTranslation.y}px) ${directionalScale}`;
    
    this.glassContainer.style.transform = transform;
  }

  calculateElasticTranslation() {
    const fadeInFactor = this.calculateFadeInFactor();
    const rect = this.glassContainer?.getBoundingClientRect();
    
    if (!rect) return { x: 0, y: 0 };

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      x: (this.mousePos.x - centerX) * this.options.elasticity * 0.1 * fadeInFactor,
      y: (this.mousePos.y - centerY) * this.options.elasticity * 0.1 * fadeInFactor
    };
  }

  calculateDirectionalScale() {
    if (!this.mousePos.x || !this.mousePos.y || !this.glassContainer) {
      return 'scale(1)';
    }

    const rect = this.glassContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = this.mousePos.x - centerX;
    const deltaY = this.mousePos.y - centerY;

    // Distance from edges calculation
    const edgeDistanceX = Math.max(0, Math.abs(deltaX) - rect.width / 2);
    const edgeDistanceY = Math.max(0, Math.abs(deltaY) - rect.height / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    // Activation zone
    const activationZone = 200;
    if (edgeDistance > activationZone) return 'scale(1)';

    const fadeInFactor = 1 - edgeDistance / activationZone;
    const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (centerDistance === 0) return 'scale(1)';

    const normalizedX = deltaX / centerDistance;
    const normalizedY = deltaY / centerDistance;
    const stretchIntensity = Math.min(centerDistance / 300, 1) * this.options.elasticity * fadeInFactor;

    const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15;
    const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15;

    return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`;
  }

  calculateFadeInFactor() {
    if (!this.mousePos.x || !this.mousePos.y || !this.glassContainer) return 0;

    const rect = this.glassContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const edgeDistanceX = Math.max(0, Math.abs(this.mousePos.x - centerX) - rect.width / 2);
    const edgeDistanceY = Math.max(0, Math.abs(this.mousePos.y - centerY) - rect.height / 2);
    const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY);

    const activationZone = 200;
    return edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone;
  }

  updateBorderGradients() {
    if (!this.borderLayer1 || !this.borderLayer2 || this.options.noBorders) return;

    const gradientAngle = 135 + this.mouseOffset.x * 1.2;
    const intensityX = Math.abs(this.mouseOffset.x);
    const stopPosition1 = Math.max(10, 33 + this.mouseOffset.y * 0.3);
    const stopPosition2 = Math.min(90, 66 + this.mouseOffset.y * 0.4);

    // Border layer 1 (screen blend)
    const gradient1 = `linear-gradient(${gradientAngle}deg, 
      rgba(255, 255, 255, 0.0) 0%, 
      rgba(255, 255, 255, ${0.12 + intensityX * 0.008}) ${stopPosition1}%, 
      rgba(255, 255, 255, ${0.4 + intensityX * 0.012}) ${stopPosition2}%, 
      rgba(255, 255, 255, 0.0) 100%)`;

    // Border layer 2 (overlay blend)
    const gradient2 = `linear-gradient(${gradientAngle}deg, 
      rgba(255, 255, 255, 0.0) 0%, 
      rgba(255, 255, 255, ${0.32 + intensityX * 0.008}) ${stopPosition1}%, 
      rgba(255, 255, 255, ${0.6 + intensityX * 0.012}) ${stopPosition2}%, 
      rgba(255, 255, 255, 0.0) 100%)`;

    this.borderLayer1.style.background = gradient1;
    this.borderLayer2.style.background = gradient2;
  }

  destroy() {
    // Remove event listeners
    if (this.container) {
      this.container.removeEventListener('mousemove', this.handleMouseMove);
      this.container.removeEventListener('mouseenter', this.handleMouseEnter);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    }
    window.removeEventListener('resize', this.handleResize);

    // Remove SVG filter
    if (this.svgFilter) {
      this.svgFilter.remove();
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