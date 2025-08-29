# Social Sharing Meta Tags - Setup Complete ✅

Your portfolio now has comprehensive social sharing meta tags that will create rich link previews when shared on WhatsApp, Messages, LinkedIn, Twitter/X, and other social platforms.

## What's Been Implemented

### 1. **Configuration System**
- **Location**: `src/user-tweaks.js` → `socialMeta` section
- **Configurable**: Titles, descriptions, images, Twitter handle, site URL
- **Centralized**: All social settings in one place for easy updates

### 2. **Meta Tags Added to All Pages**
- **Homepage** (`/`): Interactive portfolio branding
- **Bio Page** (`/bio`): Professional profile information  
- **Project Pages** (`/projects/[slug]`): Dynamic project-specific content

### 3. **Placeholder Social Images**
- **Homepage**: `public/images/social/og-home.jpg`
- **Bio Page**: `public/images/social/og-bio.jpg`
- **Default Fallback**: `public/images/social/og-default.jpg`
- **Format**: SVG placeholders (1200x630px) with atom branding

## Testing Your Social Previews

### 1. **Facebook/LinkedIn Debugger**
- URL: https://developers.facebook.com/tools/debug/
- Test your site URL to see how it appears
- Use "Scrape Again" to refresh cached previews

### 2. **Twitter Card Validator** 
- URL: https://cards-dev.twitter.com/validator
- Preview how your links appear on Twitter/X
- Requires Twitter developer account

### 3. **WhatsApp/Messages Preview**
- Share your site link in a private chat to test
- May take time to generate preview on first share

## Customizing Your Setup

### Update Site Information
Edit `src/user-tweaks.js`:
```javascript
socialMeta: {
  // Update with your actual domain
  siteUrl: 'https://your-actual-domain.com',
  
  // Update with your Twitter handle
  twitter: {
    handle: '@your_twitter_handle',
  },
  
  // Customize titles and descriptions
  home: {
    title: 'Your Custom Title',
    description: 'Your custom description...'
  }
}
```

### Replace Placeholder Images
1. **Create Professional Images** (1200x630px recommended)
   - Homepage: Atom visualization + your branding
   - Bio: Professional portrait + key information
   - Default: Generic portfolio branding

2. **Image Requirements**
   - **Optimal Size**: 1200x630px (1.91:1 ratio)
   - **Minimum Size**: 600x315px  
   - **Maximum Size**: 8MB
   - **Formats**: JPG, PNG, WebP, GIF

3. **Replace Files**
   - `public/images/social/og-home.jpg`
   - `public/images/social/og-bio.jpg`
   - `public/images/social/og-default.jpg`

### Project-Specific Images
Project pages automatically try to use:
1. **Bento Layout**: Hero background image from project
2. **Atomic Layout**: Image field from project frontmatter  
3. **Fallback**: Default social image

## Current Configuration (French)

### Homepage Preview
- **Title**: "Arthur Kowskii — Portfolio Interactif"
- **Description**: "Explorez mon univers créatif : production musicale, sound design pour jeux vidéo et projets techniques dans une expérience portfolio interactive basée sur un atome."
- **Image**: Atom visualization with orbital projects

### Bio Page Preview  
- **Title**: "À Propos d'Arthur Kowskii — Bio Portfolio Créatif" or dynamic from bio content
- **Description**: First 160 characters of bio or "Découvrez mon parcours en production musicale, sound design pour jeux vidéo et développement technique. Compétences, expérience et philosophie créative."
- **Image**: Professional bio-focused design

### Project Pages Preview
- **Title**: "[Project Title] — Portfolio Arthur Kowskii"
- **Description**: Project description from frontmatter
- **Image**: Project hero image or default fallback

## How It Works

When someone shares your portfolio link:

1. **Platform Crawls**: WhatsApp/LinkedIn/Twitter visits your page
2. **Reads Meta Tags**: Extracts Open Graph and Twitter Card data
3. **Generates Preview**: Creates rich link preview with image/title/description
4. **Caches Result**: Stores preview for faster future loading

## Next Steps

1. **Update Domain**: Change `siteUrl` in user-tweaks.js to your actual domain
2. **Create Professional Images**: Replace placeholder images with branded designs
3. **Test Previews**: Use validation tools to verify appearance
4. **Update Twitter Handle**: Add your actual Twitter handle if you have one

Your portfolio is now ready for professional social media sharing with rich, engaging link previews! 🚀