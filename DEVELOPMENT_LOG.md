# Atom Portfolio - Development Log

**Date:** August 19, 2025  
**Session:** Phase 2A+ User Tweaks Complete  
**Status:** ✅ Working concept with user-tweakable parameters

---

## 🎯 **What We Built**

### **Phase 1: Foundation ✅**
- **Astro project** with GSAP integration
- **Content collections** for dynamic project management
- **Atom configuration system** (`atom.config.js`)
- **Basic SVG atom structure** with dynamic shell/electron generation
- **Sample projects** demonstrating content-driven approach

### **Phase 2A: Motion System ✅**
- **OrbitSystem.js** - Modular electron animation management
- **Smooth orbital motion** - electrons rotate around static shells
- **Alternating shell directions** - inner/outer shells rotate opposite ways
- **Random starting positions** - organic, non-synchronized motion
- **Performance optimized** - 60fps using GSAP transforms

### **Phase 2A+: User Tweaks System ✅**
- **user-tweaks.js** - Centralized parameter tweaking file
- **Refactored atom.config.js** - Uses userTweaks values for all sizes/speeds
- **3-domain structure** - tech/music/sound-design project organization  
- **Fixed hover animations** - Proper CSS variable integration with Astro
- **Live parameter adjustment** - Change values, refresh page, see changes instantly

---

## 🏗️ **Current Architecture**

```
atom-portfolio/
├── src/
│   ├── atom/
│   │   └── core/
│   │       └── OrbitSystem.js          # Electron animation system
│   ├── content/
│   │   ├── config.ts                   # Content collections schema
│   │   └── projects/                   # Project markdown files
│   │       ├── ai-trading-bot.md       # domain: "tech"
│   │       ├── portfolio-website.md    # domain: "tech"
│   │       ├── task-manager.md         # domain: "tech"
│   │       ├── ambient-album.md        # domain: "music"
│   │       └── game-audio.md           # domain: "sound-design"
│   ├── pages/
│   │   └── index.astro                 # Main atom page
│   ├── atom.config.js                  # Core config (uses userTweaks)
│   └── user-tweaks.js                  # 🎛️ USER TWEAKABLE PARAMETERS
```

---

## ✅ **What Works Perfectly**

1. **Static Elements**
   - Nucleus and shell rings stay perfectly positioned
   - Clean SVG structure with proper centering
   - Dynamic shell generation based on project domains

2. **Motion System**
   - Smooth 60fps electron orbital motion
   - Alternating rotation directions (inner clockwise, middle counter, outer clockwise)
   - Random starting positions for organic feel
   - Configurable speeds via `atom.config.js`

3. **Content Management**
   - Add projects by dropping markdown files in `/src/content/projects/`
   - Frontmatter `domain` field determines shell assignment
   - Auto-generates shells based on unique domains
   - Type-safe content schema with Astro collections

4. **Performance**
   - Hardware-accelerated animations using CSS transforms
   - GSAP optimization for smooth motion
   - Respects `prefers-reduced-motion` accessibility

5. **User Tweaking System**
   - Live parameter adjustment via `user-tweaks.js`
   - Rotation speeds, electron sizes, hover effects all configurable
   - Shell distances easily adjustable
   - Changes apply instantly on page refresh

---

## ❌ **Critical Errors Encountered & Solutions**

### **Error 1: Transform Origin Disaster**
**Problem:** First motion attempt used `transform-origin` and rotated entire shell groups, completely breaking layout.

**Solution:** 
- Keep shells and nucleus completely static
- Animate only individual electrons using calculated positions
- Never transform shell groups or SVG structure elements

### **Error 2: Choppy SVG Attribute Animation**
**Problem:** Direct `cx`/`cy` SVG attribute updates caused choppy, glitchy motion.

**Root Cause:** SVG attribute updates are expensive and don't benefit from hardware acceleration.

**Solution:** 
- Set base SVG position with `cx`/`cy` attributes 
- Use GSAP `x`/`y` transforms as offsets from base position
- Combine trigonometric position calculation with optimized transforms

### **Error 3: Transform Rotation Chaos**
**Problem:** Using `rotation` transform on electrons made them spin around their own centers and fly off randomly.

**Lesson:** CSS `rotation` transforms individual elements around their own center, not around an external point like the nucleus.

### **Error 4: CSS Hover Values Not Updating**
**Problem:** Hover effects were hardcoded to `r: 12` in CSS instead of using userTweaks values.

**Root Cause:** Incorrect template literal syntax `{atomConfig.electrons.hoverRadius}` doesn't work in Astro CSS.

**Solution:**
- Use Astro's `define:vars` directive to inject values into CSS
- Convert to CSS custom properties: `r: var(--hoverRadius)`
- Now `electronHoverSize` in user-tweaks.js works perfectly

### **Error 5: Firefox CSS Hover Animation Incompatibility**
**Problem:** Hover effects worked perfectly in Chrome but were glitchy and inverted in Firefox/Zen browser.

**Root Cause:** Firefox doesn't support CSS `r` attribute animation on SVG elements:
```css
.electron:hover {
    r: var(--hoverRadius);  /* Chrome only */
}
```

**Failed Solution:** Tried using `transform: scale()` but this conflicted with GSAP's orbital motion transforms, causing jittery movement.

**Working Solution:** 
- Remove all CSS hover animations
- Implement hover effects using GSAP JavaScript with event listeners:
```js
electron.addEventListener('mouseenter', () => {
    gsap.to(electron, {
        attr: { r: atomConfig.electrons.hoverRadius },
        duration: atomConfig.timing.hoverDuration,
        ease: 'power2.out'
    });
});
```

**Key Lesson:** Always test animations in both Chrome and Firefox. GSAP `attr` animations work reliably across all browsers, unlike CSS SVG attribute transitions.

---

## 🔧 **Current Configuration**

### **Shell Speeds (Degrees/Second)**
```js
shells: [
  { radius: 120, speed: 4.0, direction: 1 },   // Inner: Fast clockwise
  { radius: 200, speed: 3.0, direction: -1 },  // Middle: Med counter-clockwise  
  { radius: 280, speed: 2.5, direction: 1 }    // Outer: Slower clockwise
]
```

### **Working Motion Formula**
```js
// Calculate electron position
const radians = (currentAngle * Math.PI) / 180;
const x = centerX + radius * Math.cos(radians);
const y = centerY + radius * Math.sin(radians);

// Apply as transform offset from original SVG position
gsap.set(electron, {
  x: x - originalCx,
  y: y - originalCy
});
```

---

## 🚀 **Next Phase: Hover Pause (Phase 2B)**

### **Planned Features**
- Hover electron → pause its shell's motion
- Unhover → resume motion from exact position
- Shell-level pause (all electrons on same shell pause together)
- Smooth scale animation on hover (already working via CSS)

### **Implementation Notes**
- Use `OrbitSystem.pauseShell(shellIndex)` and `resumeShell(shellIndex)`
- Add mouse event listeners to electron elements
- Consider adding subtle visual feedback when shell is paused

---

## 🚀 **Future Phases**

### **Phase 3: Drag & Tether**
- Drag electrons off their paths
- Show "gooey" tether connection during drag
- Spring-back physics when released
- Click vs drag detection for navigation

### **Phase 4: Content & Navigation**  
- Project detail pages
- View Transitions between atom and project pages
- Dynamic project addition workflow

### **Phase 5: Polish**
- Audio system (Tone.js integration)
- START button + intro animation
- Performance monitoring
- Mobile optimization

---

## 🎨 **Design Decisions Made**

1. **Black & White Only** - Minimal aesthetic maintained
2. **Linear Motion** - Constant rotation speed for hypnotic effect
3. **Alternating Directions** - Visual rhythm with inner/outer opposition
4. **Random Starts** - Organic feel, not synchronized
5. **Content-Driven** - Shells created automatically from project domains
6. **Performance First** - 60fps maintained over fancy effects

---

## 🛠️ **Dev Environment**

- **Astro v5.13.2** with TypeScript strict mode
- **GSAP** for animations  
- **Dev Server:** `npm run dev` on localhost:4321
- **Content Hot Reload:** Works perfectly for project changes

---

## 📝 **Key Files to Remember**

- **`user-tweaks.js`** - 🎛️ **START HERE** - All tweakable parameters
- `atom.config.js` - Core config (imports userTweaks values)  
- `OrbitSystem.js` - Core animation logic, never touch shell positioning
- `index.astro` - Main page, handles content → visual mapping + CSS variables
- `content/config.ts` - Project schema, add new fields here
- Individual project `.md` files - `domain` field determines shell

---

---

## 🎯 **Portfolio Editing Architecture Assessment**

### **✅ Excellent for Dynamic Content Addition**

**Adding New Projects (Electrons):**
1. **Drop markdown file** in `/src/content/projects/`
2. **Set domain in frontmatter** (e.g., `domain: "Music"`)
3. **Astro auto-detects** new domain and creates shell
4. **OrbitSystem auto-discovers** new electrons on page load
5. **Animation starts immediately** - no code changes needed

**Example: Adding Music Domain**
```markdown
---
title: "Album Cover Design"
domain: "Music"           # Creates new shell automatically
description: "..."
tech: ["Photoshop", "Illustrator"]
status: "completed"
date: 2024-08-15
---
```

### **✅ Perfect Shell Management**
- **Dynamic shell creation** - shells appear based on unique domains
- **Automatic electron distribution** - evenly spaced around each shell
- **Flexible shell count** - 1 project = 1 shell, 10 projects = multiple shells
- **Shell radius scaling** - configured in `atom.config.js`

### **✅ Zero-Code Project Addition**
1. Create `.md` file with project info
2. Choose existing domain OR create new one
3. Refresh page → electron appears and starts orbiting
4. **No build step, no code changes, no config updates**

### **⚡ Live Development Workflow**
- **Hot reload** - add project file, see electron instantly
- **Domain experimentation** - change frontmatter domain, electron moves shells
- **Visual tweaking** - adjust `atom.config.js`, see changes immediately

### **🎨 Visual Scaling**
- **1-3 projects per domain:** Clean, readable
- **4-8 projects per domain:** Full shell utilization
- **10+ projects:** May need shell radius adjustment or clustering

### **✅ Content-First Architecture Benefits**
- **Markdown workflow** - familiar for developers/designers
- **Type safety** - Astro validates project schema
- **SEO ready** - each project can become a page
- **Asset management** - images/files alongside content

---

## 🚀 **Recommended Workflow for Adding Projects**

### **Step 1: Create Project File**
```bash
# In /src/content/projects/
touch new-music-project.md
```

### **Step 2: Add Frontmatter**
```yaml
---
title: "Your Project Name"
domain: "Music"              # New or existing domain
description: "Brief description"
tech: ["Logic Pro", "Ableton"]
status: "completed"
date: 2024-08-18
link: "https://soundcloud.com/..."  # Optional
---
```

### **Step 3: Auto-Magic**
- New shell appears if "Music" domain is new
- Electron appears on appropriate shell
- Orbital motion starts immediately
- Hover effects work automatically

---

---

## 🎛️ **USER TWEAKS SYSTEM**

### **What You Can Adjust in `user-tweaks.js`:**

```js
electronSpeeds: {
  innerShell: 7.0,    // Shell 1 rotation speed
  middleShell: 9.0,   // Shell 2 rotation speed  
  outerShell: 12.0    // Shell 3 rotation speed
},

electronSize: 18,           // Normal electron radius
electronHoverSize: 25,      // Size when hovering
nucleusSize: 40,            // Center "A" circle size

hoverAnimationSpeed: 0.3,   // Hover transition duration

shellDistances: {
  inner: 120,    // Pixels from nucleus center
  middle: 200,   // Shell 2 distance
  outer: 280     // Shell 3 distance  
}
```

### **Current Domain Structure:**
- **tech:** 3 electrons (AI Trading Bot, Portfolio, Task Manager)
- **music:** 1 electron (Ambient Soundscapes)  
- **sound-design:** 1 electron (Game Audio)

### **Workflow for Tweaking:**
1. Edit values in `user-tweaks.js`
2. Save file
3. Refresh localhost:4321
4. See changes instantly

---

**Status:** User tweaks system complete. Ready for Phase 2B (Hover Pause) development.