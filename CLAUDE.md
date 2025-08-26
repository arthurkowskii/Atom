# PROJECT: Atom Portfolio - Interactive GSAP Portfolio

Last updated: 2025-08-26

## Quick Context
- **Stack**: Astro + GSAP (client-side), Astro Content Collections, Decap CMS, SVG
- **Core Concept**: Interactive atom with nucleus + concentric shells, electrons orbit representing projects
- **Current Phase**: Phase 4 complete (enterprise optimizations), asset optimization complete (91% reduction)
- **Status**: Production-ready, all major performance issues resolved

## SESSION STARTUP PROTOCOL
**⚠️ ALWAYS FOLLOW THIS ORDER:**
1. **READ FIRST**: `SESSION_CONTEXT.md` for current status and session continuity
2. **CHECK ERRORS**: Run `npm run dev` and scan console for issues  
3. **VERIFY BUILD**: Ensure clean build before making changes
4. **OVERLAY AWARENESS**: Any page changes MUST verify overlay system still works

## Critical Atom-Specific Rules
- **Dual Rendering System**: Projects render in both `/projects/[slug]` pages AND overlay system - changes affect both
- **Asset Optimization Awareness**: Always check file sizes after asset modifications
- **Error Checking Reflex**: Run `npm run dev` after ANY changes to catch build issues
- **Overlay-Page Sync**: When updating project pages, verify overlay content displays correctly
- **Dynamic Shells**: Project organization via folder structure (`1_Music/`, `2_Game Audio/`, etc.)

## Key Commands
- `npm run dev` - Start development server (localhost:4324)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `/admin` - Access Decap CMS (local proxy mode)

## Architecture Quick Reference
- **Main atom scene**: `src/pages/index.astro`
- **Orbital system**: `src/atom/core/OrbitSystem.js`  
- **Configuration**: `src/user-tweaks.js` (central config)
- **Project schema**: `src/content/config.ts`
- **Bento layouts**: `src/components/ProjectBento.astro`

## Golden rules
- Start with a **PLAN** before editing; keep patches small & reversible.
- Follow the chosen stack; don't add new frameworks without approval.
- No destructive ops or secret-file access; ask before changing build/CI.
- Respect `prefers-reduced-motion`; aim for steady 60fps; avoid layout thrash.
- Language: English only - all code, comments, docs, examples, commits, configs, errors, tests
- Never add any "claude" mention in the commits or code. For example "created with Claude". Dont do that.
- **Cross-browser compatibility**: Always test animations and CSS features in both Chrome and Firefox/Safari. Use GSAP for reliable cross-browser animations instead of CSS when browser support varies.

## Tone and Behavior
- Criticism is welcome.
- Please tell me when I am wrong or mistaken, or even when you think I might be wrong or mistaken.
- Please tell me if there is a better approach than the one I am taking.
- Please tell me if there is a relevant standard or convention that I appear to be unaware of.
- Short summaries are OK, but don't give an extended breakdown unless we are working through the details of a plan.
- Do not flatter, and do not give compliments unless I am specifically asking for your judgement. Things like "You're absolutely right" or "great question" are unecessary.
- Feel free to ask many questions. If you are in doubt of my intent, don't guess. Ask.