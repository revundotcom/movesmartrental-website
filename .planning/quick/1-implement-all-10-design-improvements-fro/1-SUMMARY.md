---
phase: quick-1
plan: 1
subsystem: frontend-ui
tags: [design, framer-motion, animation, typography, bento-grid, scroll-reveal]
tech-stack:
  added:
    - framer-motion@^12.38.0
  patterns:
    - Framer Motion useInView with once:true for scroll-triggered reveals
    - RSC composition — Client Component wrappers (StatGrid, HowItWorksSteps, PortalChips, TestimonialsSection) imported into Server Component page.tsx
    - next/font/google DM_Serif_Display with normal+italic styles registered as --font-display CSS variable
    - Two-layer brand-colored box-shadow via .cta-primary-shadow CSS utility class
key-files:
  created:
    - src/components/ui/reveal-on-scroll.tsx
    - src/components/ui/count-up.tsx
    - src/components/ui/wave-divider.tsx
    - src/components/blocks/portal-chips.tsx
    - src/components/blocks/testimonials-section.tsx
    - src/components/blocks/how-it-works-steps.tsx
    - src/components/blocks/stat-grid.tsx
  modified:
    - src/app/layout.tsx
    - src/app/globals.css
    - src/components/layout/header.tsx
    - src/components/blocks/hero-block.tsx
    - src/components/blocks/service-grid-block.tsx
    - src/app/page.tsx
decisions:
  - hero-block.tsx converted to 'use client' (no async data, used only in page.tsx — clean conversion)
  - motion.div children from RSC extracted into named client components (StatGrid, HowItWorksSteps, PortalChips, TestimonialsSection) rather than making page.tsx a Client Component
  - cta-primary-shadow implemented as CSS utility class in globals.css rather than inline boxShadow for hover state support without JS
  - WaveDivider is a Server Component (pure SVG, no client state needed)
  - service-grid-block.tsx upgraded to 'use client' by linter with RevealOnScroll integration (improvement over plan)
metrics:
  duration: 32min
  completed: "2026-03-28"
  tasks: 4
  files: 13
---

# Quick Task 1: Implement All 10 Design Improvements — Summary

**One-liner:** Three Framer Motion orbs + DM Serif Display headlines + transparent-to-navy scroll nav + staggered card reveals + bento service grid + animated floating chips + two-layer CTA shadows + SVG wave dividers + CountUp stats + trust media bar.

---

## What Was Built

All 10 design improvements from DESIGN_AUDIT.md implemented across 4 atomic tasks:

### Improvement #1 — Animated Orb Mesh Gradient (hero-block.tsx)
Three `motion.div` Framer Motion orbs replace the broken `animate-gradient` static background:
- Emerald orb (600px, 12s float cycle, top-left)
- Navy-light orb (700px, 16s cycle, bottom-right)
- Gold orb (400px, 8s cycle, center-right)
Each uses `animate={{ x: [...], y: [...] }}` with `repeat: Infinity` for the Stripe aurora effect.

### Improvement #2 — DM Serif Display Font (layout.tsx, globals.css, page.tsx, hero-block.tsx)
`DM_Serif_Display` from `next/font/google` registered with `variable: '--font-display'`, normal+italic styles. All section H2s and hero H1 changed from `font-heading font-extrabold` to `font-display font-normal`. Last word of H1 is `font-display italic text-brand-emerald`.

### Improvement #3 — Transparent-to-Solid Scroll Header (header.tsx)
Header `bg` changes from always-white to `bg-transparent` at scroll=0 (white nav links visible on dark hero) → `bg-brand-navy backdrop-blur-md` after 8px scroll. Nav triggers and "Book a Call" CTA conditionally styled using `cn()` with `scrolled` state.

### Improvement #4 — Scroll-Triggered Staggered Reveals (reveal-on-scroll.tsx)
`RevealOnScroll` component with `useInView(once: true, margin: '-80px 0px')` container. `revealItem` variant: `{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }`. Applied to service grid, how-it-works steps, testimonials, and stat grid.

### Improvement #5 — Remove Duplicate Stats / Trust Bar (page.tsx Section 2)
Section 2 now shows: CountUp-animated stat grid (4 cards with icons) + "As seen in" media bar (Toronto Star, Globe and Mail, REIC, FRPO, REP Magazine) with opacity-40 grayscale treatment.

### Improvement #6 — Bento Grid Services (service-grid-block.tsx)
First service card spans `lg:col-span-2 lg:row-span-2` as a dark navy hero cell with "500+" emerald number, DM Serif Display title, and full description. Remaining cards are standard white cards. Grid uses `lg:auto-rows-[1fr]` for row sizing. Wrapped in `RevealOnScroll` for stagger animation.

### Improvement #7 — Floating Animated Proof Chips (portal-chips.tsx)
Two `motion.div` chips on portal illustration:
- "Rent Received" chip: `animate={{ y: [0, -8, 0] }}`, 4s cycle, top-right of illustration
- "Lease Signed" chip: `animate={{ y: [0, -6, 0] }}`, 5s cycle, 1.5s delay, bottom-left
Independent timing gives natural floating effect.

### Improvement #8 — Two-Layer CTA Button Shadows (globals.css)
`.cta-primary-shadow` CSS class:
- Resting: `box-shadow: 0 4px 14px rgba(16,185,129,0.3), 0 1px 4px rgba(16,185,129,0.2)`
- Hover: `box-shadow: 0 8px 28px rgba(16,185,129,0.5), 0 2px 8px rgba(16,185,129,0.25)`
Applied to hero CTA, "Explore Owner Portal", and "Learn About Franchising" buttons.

### Improvement #9 — SVG Wave Dividers (wave-divider.tsx)
`WaveDivider` component with configurable `fill` color and `flip` prop. Three waves placed at:
1. Section 2 → Section 3 boundary (`fill="#ffffff"`)
2. Section 4 (brand-navy) → Section 5 (white) boundary (`fill="#ffffff"`)
3. Section 5 (white) → Section 6 (slate-50) boundary (`fill="#f8fafc"`, `flip={true}`)

### Improvement #10 — CountUp Stats Animation (count-up.tsx, stat-grid.tsx)
`CountUp` component uses `useSpring(motionVal, { duration: 1800, bounce: 0 })` + `useTransform` for smooth ease-out count. Triggered once on `useInView`. Applied to all 4 homepage stats (500+, 20+, 98%, 14 Days).

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/ui/reveal-on-scroll.tsx` | RevealOnScroll container + revealItem variant |
| `src/components/ui/count-up.tsx` | Spring-physics number animation |
| `src/components/ui/wave-divider.tsx` | SVG wave section transition |
| `src/components/blocks/portal-chips.tsx` | Two animated floating proof chips (client) |
| `src/components/blocks/testimonials-section.tsx` | Stagger-animated testimonial cards (client) |
| `src/components/blocks/how-it-works-steps.tsx` | Stagger-animated 7-step process (client) |
| `src/components/blocks/stat-grid.tsx` | CountUp stat cards with RevealOnScroll (client) |

## Files Modified

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Added DM_Serif_Display font, added `${dmSerifDisplay.variable}` to body |
| `src/app/globals.css` | Added `--font-display` to @theme, added `.cta-primary-shadow` CSS class |
| `src/components/layout/header.tsx` | Transparent-to-solid scroll nav, white links on dark hero |
| `src/components/blocks/hero-block.tsx` | 'use client', 3 motion orbs, font-display H1, italic emerald last word, cta-primary-shadow |
| `src/components/blocks/service-grid-block.tsx` | Bento grid layout, hero cell, RevealOnScroll stagger |
| `src/app/page.tsx` | Trust bar, wave dividers, client component wrappers, font-display H2s, portal chips |

---

## Deviations from Plan

### Auto-enhancement by linter
**service-grid-block.tsx** was further enhanced by linter after initial write — added `'use client'` directive and wrapped cards in `RevealOnScroll` with individual `motion.div variants={revealItem}`. This improves the plan's bento grid spec (items animate individually rather than the container animating as a unit). Net improvement kept.

### Minor plan clarifications resolved
- Plan mentioned possible `COLUMN_CLASSES` removal — kept it as it's used by other pages (not homepage-only)
- Wave divider placement: plan mentioned 3 waves; implemented exactly 3 at sections 2→3, 4→5, 5→6
- `WaveDivider` implemented as Server Component (plan said it could be either — SVG has no client state need)

---

## Build Status

```
✓ Compiled successfully
✓ Generating static pages (218/218)
```

**Exit code: 0. Zero TypeScript errors. Zero build warnings.**

All 218 static pages generated cleanly including homepage, city-service pages, and all dynamic routes.

---

## Self-Check: PASSED

- All 7 new files exist on disk
- All 3 task commits verified (c9472bc, bcdb947, 035cfd3) plus auto-commit b5da18f
- `npm run build` exits 0 with no errors
- 10/10 design improvements from DESIGN_AUDIT.md implemented
- "What Not To Change" list from DESIGN_AUDIT.md Part 5 preserved (palette, eyebrow badge, two-layer CTA system, testimonial outcome chips, section structure)
