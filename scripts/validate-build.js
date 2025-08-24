#!/usr/bin/env node

/**
 * Build validation script
 * Validates that the build output is correct and catches common issues
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

let errors = 0;
let warnings = 0;

function error(message) {
  console.error(`❌ ERROR: ${message}`);
  errors++;
}

function warn(message) {
  console.warn(`⚠️  WARNING: ${message}`);
  warnings++;
}

function success(message) {
  console.log(`✅ ${message}`);
}

// Check if dist directory exists
if (!existsSync(distDir)) {
  error('dist directory not found. Run npm run build first.');
  process.exit(1);
}

// Check essential files exist
const essentialFiles = [
  'index.html',
  '_astro',
  'projects',
  'api/bio.json',
  'admin/index.html'
];

for (const file of essentialFiles) {
  const filePath = join(distDir, file);
  if (!existsSync(filePath)) {
    error(`Essential file missing: ${file}`);
  } else {
    success(`Found ${file}`);
  }
}

// Validate HTML files for basic structure
function validateHtmlFile(filePath, fileName) {
  try {
    const content = readFileSync(filePath, 'utf8');
    
    // Check for basic HTML structure
    if (!content.includes('<html')) {
      error(`${fileName}: Missing <html> tag`);
    }
    
    if (!content.includes('<head>')) {
      error(`${fileName}: Missing <head> tag`);
    }
    
    if (!content.includes('<body') && !content.includes('</body>')) {
      error(`${fileName}: Missing <body> tag`);
    }
    
    // Check for CSP headers
    if (!content.includes('Content-Security-Policy')) {
      warn(`${fileName}: Missing Content Security Policy`);
    }
    
    // Check for common CSS syntax errors in inline styles
    const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches) {
      styleMatches.forEach((style, index) => {
        // Check for unmatched braces
        const openBraces = (style.match(/\{/g) || []).length;
        const closeBraces = (style.match(/\}/g) || []).length;
        
        if (openBraces !== closeBraces) {
          error(`${fileName}: Unmatched CSS braces in style block ${index + 1}`);
        }
      });
    }
    
    success(`Validated ${fileName}`);
    
  } catch (err) {
    error(`Failed to validate ${fileName}: ${err.message}`);
  }
}

// Validate main HTML files
validateHtmlFile(join(distDir, 'index.html'), 'index.html');

if (existsSync(join(distDir, 'bio/index.html'))) {
  validateHtmlFile(join(distDir, 'bio/index.html'), 'bio/index.html');
}

// Validate project pages
const projectsDir = join(distDir, 'projects');
if (existsSync(projectsDir)) {
  const projectFolders = readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  for (const projectFolder of projectFolders) {
    const projectHtml = join(projectsDir, projectFolder, 'index.html');
    if (existsSync(projectHtml)) {
      validateHtmlFile(projectHtml, `projects/${projectFolder}/index.html`);
    }
  }
}

// Check JavaScript bundles
const astroDir = join(distDir, '_astro');
if (existsSync(astroDir)) {
  const jsFiles = readdirSync(astroDir).filter(f => f.endsWith('.js'));
  if (jsFiles.length === 0) {
    warn('No JavaScript bundles found in _astro directory');
  } else {
    success(`Found ${jsFiles.length} JavaScript bundles`);
  }
}

// Summary
console.log('\n--- Build Validation Summary ---');
if (errors > 0) {
  console.error(`❌ ${errors} error(s) found`);
}
if (warnings > 0) {
  console.warn(`⚠️  ${warnings} warning(s) found`);
}
if (errors === 0 && warnings === 0) {
  console.log('✅ Build validation passed successfully!');
}

process.exit(errors > 0 ? 1 : 0);