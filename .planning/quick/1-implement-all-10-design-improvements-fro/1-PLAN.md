---
phase: quick-1
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/layout.tsx
  - src/app/globals.css
  - src/components/layout/header.tsx
  - src/components/blocks/hero-block.tsx
  - src/components/blocks/service-grid-block.tsx
  - src/components/ui/reveal-on-scroll.tsx
  - src/components/ui/count-up.tsx
  - src/components/ui/wave-divider.tsx
  - src/app/page.tsx
autonomous: true
requirements: [DESIGN-01, DESIGN-02, DESIGN-03, DESIGN-04, DESIGN-05, DESIGN-06, DESIGN-07, DESIGN-08, DESIGN-09, DESIGN-10]

must_haves:
  truths:
    - "Hero background shows three animated floating orbs (emerald, navy, gold) creating an atmospheric mesh-gradient effect"
    - "H1 and section H2 headings render in DM Serif Display font, body and UI remain Inter"
    - "Header is transparent with white text over the dark hero, transitions to solid brand-navy on scroll"
    - "All card grids (services, how-it-works steps, testimonials, city cards) fade-and-stagger in on scroll"
    - "Section 2 shows a trust/media bar instead of repeating the hero stats"
    - "Services section renders as an asymmetric bento grid with a dominant hero card"
    - "Floating chips on portal illustration animate with a looping y-float"
    - "Primary emerald CTA buttons have two-layer brand-colored box-shadow"
    - "Three SVG wave dividers appear at section boundaries"
    - "Stats in Section 2 animate from 0 to their target value when scrolled into view"
  artifacts:
    - path: "src/components/ui/reveal-on-scroll.tsx"
      provides: "RevealOnScroll container + item motion variants for staggered card reveals"
      exports: ["RevealOnScroll", "revealItem"]
    - path: "src/components/ui/count-up.tsx"
      provides: "CountUp component using Framer Motion useSpring for scroll-triggered number animation"
      exports: ["CountUp"]
    - path: "src/components/ui/wave-divider.tsx"
      provides: "WaveDivider SVG component accepting from/to fill colors"
      exports: ["WaveDivider"]
    - path: "src/components/blocks/hero-block.tsx"
      provides: "Animated orb mesh gradient + DM Serif Display H1 + two-layer CTA shadow"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/app/globals.css @theme"
      via: "--font-display CSS variable from next/font/google DM_Serif_Display"
    - from: "src/components/ui/reveal-on-scroll.tsx"
      to: "src/app/page.tsx card grid sections"
      via: "RevealOnScroll wrapper + revealItem motion.div variants"
    - from: "src/components/ui/count-up.tsx"
      to: "src/app/page.tsx Section 2 stats"
      via: "CountUp component replacing static stat value strings"
---

<objective>
Implement all 10 design improvements from DESIGN_AUDIT.md to transform the MoveSmart Rentals homepage from a functional but static site into a premium, motion-rich property management brand that dominates the visually underdesigned Ontario market.

Purpose: The audit identified 10 specific, high-impact changes backed by competitor research across 17 sites. Together they eliminate every identified weakness: dead hero animation, no scroll motion, duplicate stats, uniform card layout, static badges, flat nav, diffuse shadows, and hard section cuts.

Output:
- 3 new UI utility components (RevealOnScroll, CountUp, WaveDivider)
- Revised hero-block.tsx with animated orbs and font-display H1
- Revised header.tsx with transparent-to-solid scroll behavior
- Revised service-grid-block.tsx with bento grid layout
- Revised page.tsx with trust bar, wave dividers, animated chips, scroll reveals
- DM Serif Display font registered in layout.tsx + globals.css
</objective>

<execution_context>
@/Users/sakshamsolanki/.claude/get-shit-done/workflows/execute-plan.md
@/Users/sakshamsolanki/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

Key technical facts discovered during planning:
- Tailwind CSS v4 (CSS-first): no tailwind.config.ts. Font families defined in globals.css @theme block as --font-display etc. Add new font the same way --font-heading was added.
- next/font/google pattern: layout.tsx imports Inter + Plus_Jakarta_Sans, assigns them as CSS variable props (variable: '--font-sans', '--font-heading'). Add DM_Serif_Display with variable: '--font-display'.
- Framer Motion is NOT in package.json. The navigation-menu uses @base-ui-components animations. Must install framer-motion before any motion.div usage.
- hero-block.tsx is currently a Server Component (no 'use client'). Adding Framer Motion orbs requires extracting them into a separate 'use client' component (HeroOrbs) to keep hero-block as a Server Component, OR converting the whole component to 'use client'. Converting to 'use client' is acceptable — it has no async data fetching and is only used in page.tsx.
- service-grid-block.tsx is a Server Component (no 'use client'). The bento layout change is pure JSX/CSS — no client behavior needed.
- page.tsx is a Server Component (async). RevealOnScroll wrappers can be added since they are Client Components imported into a Server Component — this is valid Next.js 15 RSC composition.
- The Section 2 stats (500+, 20+, 98%, 14 Days) use literal string values in the JSX map. CountUp needs numeric values — extract numbers and suffix separately.
- The "Rent Received" chip in Section 5 (portal) is static absolute-positioned. The floating chips improvement targets this chip plus adding a second chip.
- Brand tokens: --brand-navy #0B1D3A, --brand-emerald #10B981, --brand-gold #D4A853.
- All changes must produce a valid `next build` with zero TypeScript errors.
</context>

<interfaces>
<!-- Existing function signatures the executor needs -->

From src/app/layout.tsx (font registration pattern):
```tsx
// Current pattern — replicate for DM Serif Display:
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
})
// Body className:
<body className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}>
```

From src/app/globals.css (@theme pattern):
```css
@theme inline {
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  /* Add: --font-display: var(--font-display); */
}
```

From src/components/blocks/hero-block.tsx (current h1):
```tsx
<h1 className="animate-fade-up delay-100 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
```

From src/components/layout/header.tsx (current className logic):
```tsx
className={cn(
  'sticky top-0 z-50 w-full border-b border-transparent bg-white/95 backdrop-blur-md transition-all duration-300',
  scrolled ? 'border-border/40 shadow-[0_1px_12px_rgba(11,29,58,0.08)]' : 'shadow-none'
)}
// Nav trigger text currently: text-[#0B1D3A]/70
// CTA "Book a Call" link: text-[#0B1D3A]
// CTA "Get Started" link: bg-brand-emerald text-white
```
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Install framer-motion + register DM Serif Display font</name>
  <files>
    package.json,
    src/app/layout.tsx,
    src/app/globals.css
  </files>
  <action>
**Step 1 — Install framer-motion:**
```bash
cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npm install framer-motion
```

**Step 2 — Register DM Serif Display in layout.tsx:**
Import `DM_Serif_Display` from `next/font/google`. Add alongside existing fonts:
```tsx
import { Inter, Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
  weight: '400',  // DM Serif Display only has regular weight (italic is a separate style)
  style: ['normal', 'italic'],
})
```
Add `${dmSerifDisplay.variable}` to the `<body>` className alongside the existing font variables.

**Step 3 — Register in globals.css @theme block:**
Inside the `@theme inline { ... }` block, add after `--font-heading`:
```css
--font-display: var(--font-display);
```
This makes `font-display` available as a Tailwind utility class (same pattern as `font-heading`).
  </action>
  <verify>
    <automated>cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
    - framer-motion appears in package.json dependencies
    - `import { motion } from 'framer-motion'` resolves without error
    - `font-display` Tailwind class applies DM Serif Display in browser
    - `npx tsc --noEmit` exits clean
  </done>
</task>

<task type="auto">
  <name>Task 2: Transparent nav + animated orb hero + two-layer CTA shadows</name>
  <files>
    src/components/layout/header.tsx,
    src/components/blocks/hero-block.tsx
  </files>
  <action>
**A. header.tsx — transparent-to-solid scroll nav (Improvement #3):**

Change the outer `<header>` className from always-white to transparent when unscrolled:
```tsx
className={cn(
  'sticky top-0 z-50 w-full transition-all duration-300',
  scrolled
    ? 'border-b border-border/40 bg-brand-navy shadow-[0_1px_12px_rgba(11,29,58,0.15)] backdrop-blur-md'
    : 'border-b border-transparent bg-transparent'
)}
```

Nav trigger links — update text color so they are white when unscrolled (dark hero behind), navy when scrolled:
```tsx
// NavigationMenuTrigger className — replace static text-[#0B1D3A]/70 with:
className={cn(
  'cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
  scrolled
    ? 'text-white/80 hover:bg-white/10 hover:text-white data-popup-open:bg-white/10 data-popup-open:text-white'
    : 'text-white/90 hover:bg-white/10 hover:text-white data-popup-open:bg-white/10 data-popup-open:text-white'
)}
```

Desktop CTA links — update for white-on-dark when unscrolled:
- "Book a Call": when unscrolled → `border-white/30 text-white hover:border-white/60 hover:bg-white/10`; when scrolled → keep existing navy styles
- "Get Started": always `bg-brand-emerald text-white` (already works on both dark and light)

Use `cn()` with `scrolled` condition for both CTA links.

**B. hero-block.tsx — animated orb mesh gradient (Improvement #1) + DM Serif Display H1 (Improvement #2) + two-layer CTA shadow (Improvement #8):**

Add `'use client'` at the top (hero-block has no async data, is safe to convert).

Import: `import { motion } from 'framer-motion'`

Replace the two static `<div>` radial glow orbs (the `-left-32 -top-32` and `-bottom-20 -right-20` divs) with three Framer Motion animated orbs:

```tsx
{/* Orb 1: emerald top-left — 12s cycle */}
<motion.div
  className="pointer-events-none absolute size-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,transparent_70%)] blur-[80px]"
  style={{ top: -200, left: -100 }}
  animate={{ x: [0, 80, -40, 0], y: [0, 60, 80, 0] }}
  transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
  aria-hidden="true"
/>
{/* Orb 2: navy-light bottom-right — 16s cycle */}
<motion.div
  className="pointer-events-none absolute size-[700px] rounded-full bg-[radial-gradient(circle,rgba(20,60,100,0.5)_0%,transparent_70%)] blur-[100px]"
  style={{ bottom: -200, right: -150 }}
  animate={{ x: [0, -60, 40, 0], y: [0, -80, -40, 0] }}
  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
  aria-hidden="true"
/>
{/* Orb 3: gold center-right — 8s cycle */}
<motion.div
  className="pointer-events-none absolute size-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.08)_0%,transparent_70%)] blur-[60px]"
  style={{ top: '30%', right: '10%' }}
  animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
  aria-hidden="true"
/>
```

**H1 font change:**
Change `font-heading font-extrabold` to `font-display font-normal` on the `<h1>`:
```tsx
<h1 className="animate-fade-up delay-100 font-display text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
```

For the emerald accent last word — replace the gradient clip-path span with italic serif:
```tsx
<span className="font-display italic text-brand-emerald">{lastWord}</span>
```
Remove the underline accent span below it (it was a gradient underline under the gradient text — no longer needed with italic serif).

**Two-layer CTA shadow (Improvement #8):**
In the primary CTA Button, update the `boxShadow` style:
```tsx
style={{
  background: 'linear-gradient(135deg, #10B981, #059669)',
  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3), 0 1px 4px rgba(16, 185, 129, 0.2)',
}}
```
Add a hover style via CSS — use `onMouseEnter`/`onMouseLeave` state OR wrap the Button with a `motion.div` with `whileHover` that updates shadow via `style`. Simpler: use a data-attribute + CSS in globals.css for the hover shadow upgrade. Best approach for minimal change: add a className `cta-primary-shadow` and a CSS rule in globals.css:
```css
.cta-primary-shadow {
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3), 0 1px 4px rgba(16, 185, 129, 0.2);
  transition: box-shadow 0.2s ease;
}
.cta-primary-shadow:hover {
  box-shadow: 0 8px 28px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(16, 185, 129, 0.25);
}
```
Apply `cta-primary-shadow` className to the primary Button and remove the `boxShadow` inline style. Also apply this class to the portal section's "Explore Owner Portal" button in page.tsx (Task 4 will handle page.tsx, so add the class there too).
  </action>
  <verify>
    <automated>cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
    - Header is transparent with white nav links when at scroll position 0
    - Header transitions to brand-navy solid background after scrolling 8px
    - Hero shows three visually distinct orbs floating/drifting on the dark background
    - H1 renders in DM Serif Display (serif, elegant) instead of Inter (sans-serif bold)
    - Last word of H1 is italic serif emerald, not gradient clip
    - Primary CTA button shadow lifts/glows on hover
    - Zero TypeScript errors
  </done>
</task>

<task type="auto">
  <name>Task 3: Create RevealOnScroll + CountUp + WaveDivider utility components</name>
  <files>
    src/components/ui/reveal-on-scroll.tsx,
    src/components/ui/count-up.tsx,
    src/components/ui/wave-divider.tsx
  </files>
  <action>
**A. src/components/ui/reveal-on-scroll.tsx (Improvement #4):**
```tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  /** Override stagger delay in seconds. Default 0.12 */
  stagger?: number
}

export function RevealOnScroll({ children, className, stagger = 0.12 }: RevealOnScrollProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const variants = stagger === 0.12 ? containerVariants : {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  }
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**B. src/components/ui/count-up.tsx (Improvement #10):**
```tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface CountUpProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}

export function CountUp({ value, suffix = '', prefix = '', className }: CountUpProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 })
  const display = useTransform(spring, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}${suffix}`
  )

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
```

**C. src/components/ui/wave-divider.tsx (Improvement #9):**
```tsx
interface WaveDividerProps {
  /** CSS color value for the wave fill (the "to" section's background color) */
  fill: string
  /** Flip the wave vertically. Default false. */
  flip?: boolean
  className?: string
}

export function WaveDivider({ fill, flip = false, className }: WaveDividerProps) {
  return (
    <div
      className={`-mt-px -mb-px overflow-hidden leading-none ${className ?? ''}`}
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: 60, display: 'block' }}
      >
        <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  )
}
```
  </action>
  <verify>
    <automated>cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
    - All three files exist with correct exports
    - No TypeScript errors
    - RevealOnScroll exports both `RevealOnScroll` component and `revealItem` variant object
    - CountUp correctly handles suffix="+" for "500+" and suffix="%" for "98%"
    - WaveDivider renders an SVG path with the passed fill color
  </done>
</task>

<task type="auto">
  <name>Task 4: Revamp page.tsx — trust bar, bento services, wave dividers, floating chips, scroll reveals, counting stats</name>
  <files>
    src/app/page.tsx,
    src/components/blocks/service-grid-block.tsx
  </files>
  <action>
This task applies the remaining improvements to page.tsx and service-grid-block.tsx. Work section by section:

---

**IMPORTS — add to page.tsx top:**
```tsx
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import { CountUp } from '@/components/ui/count-up'
import { WaveDivider } from '@/components/ui/wave-divider'
```

---

**SECTION 2 — Replace stat grid with trust/media bar + CountUp stats (Improvements #5 + #10):**

Replace the entire `<section>` for Section 2 with:

```tsx
{/* ── SECTION 2: Trust / Media Bar ── */}
<section className="relative overflow-hidden border-b border-border bg-gradient-to-r from-slate-50 via-white to-slate-50 py-10">
  <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-transparent via-brand-emerald/40 to-transparent" aria-hidden="true" />
  <div className="mx-auto max-w-6xl px-4">
    {/* Stats row with CountUp */}
    <RevealOnScroll className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        { value: 500, suffix: '+', label: 'Properties Managed', icon: /* keep existing building SVG inline */ null },
        { value: 20, suffix: '+', label: 'Ontario Cities', icon: null },
        { value: 98, suffix: '%', label: 'Occupancy Rate', icon: null },
        { value: 14, suffix: ' Days', label: 'Average Fill Time', icon: null },
      ].map((stat) => (
        <motion.div
          key={stat.label}
          variants={revealItem}
          className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/20 hover:shadow-md"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/8 text-brand-emerald transition-colors duration-300 group-hover:bg-brand-emerald/15">
            {/* keep existing SVG icons per stat */}
          </div>
          <div>
            <p className="text-xl font-extrabold text-brand-navy">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </RevealOnScroll>

    {/* Media / trust logo bar */}
    <div className="mt-8 border-t border-slate-100 pt-8">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
        As seen in
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
        {[
          'Toronto Star',
          'Globe and Mail',
          'REIC',
          'FRPO',
          'REP Magazine',
        ].map((name) => (
          <span
            key={name}
            className="text-sm font-bold tracking-tight text-slate-600"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>
```
Keep the 4 existing SVG icon definitions inline — copy them from the original Section 2 map array.

**WAVE DIVIDER — between Section 2 and Section 3:**
After the closing `</section>` of Section 2, add:
```tsx
<WaveDivider fill="#ffffff" />
```
(Section 3 is `bg-white`, so fill white to blend into it.)

---

**SECTION 3 — Services section heading: apply font-display (Improvement #2 partial):**

In Section 3's heading `<h2>`, change `font-heading font-extrabold` to `font-display font-normal`:
```tsx
<h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
```
The gradient accent `<span>` on "Managed for You" — change to italic serif:
```tsx
<span className="font-display italic text-brand-emerald">Managed for You</span>
```

---

**service-grid-block.tsx — Bento grid layout (Improvement #6):**

The bento requires knowing which service is "first" (hero cell). The grid layout change is in the component. Modify `ServiceGridBlock`:

1. Keep the outer `<section>` and heading structure unchanged.
2. Change the `<div>` grid from uniform columns to bento:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:auto-rows-[1fr]">
  {services.map((service, index) => {
    const Icon = service.icon ? ICON_MAP[service.icon] : null
    const gradClass = ICON_GRADIENTS[index % ICON_GRADIENTS.length]
    const iconColor = ICON_COLORS[index % ICON_COLORS.length]
    const isHero = index === 0  // First service is the dominant bento cell

    if (isHero) {
      return (
        <Link
          key={service.slug}
          href={basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`}
          className="group cursor-pointer lg:col-span-2 lg:row-span-2"
        >
          <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-[#132D54] p-8 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-brand-navy/30">
            <CardDecor index={0} />
            {/* Glow */}
            <div className="absolute -right-10 -top-10 size-[200px] rounded-full bg-brand-emerald/10 blur-3xl" aria-hidden="true" />
            <div className="relative z-10 flex flex-1 flex-col">
              {Icon && (
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-emerald/20">
                  <Icon className="size-7 text-brand-emerald" aria-hidden="true" />
                </div>
              )}
              <p className="text-4xl font-black text-brand-emerald">500+</p>
              <p className="text-sm text-white/40">Tenants placed</p>
              <h3 className="mt-4 font-display text-2xl font-normal text-white">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{service.shortDescription}</p>
              <div className="mt-6 flex items-center gap-1.5">
                <span className="text-sm font-bold text-brand-emerald">Learn more</span>
                <svg className="size-4 text-brand-emerald transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )
    }

    // Standard bento cells (identical to existing card design)
    return (
      <Link
        key={service.slug}
        href={basePath ? `${basePath}/${service.slug}/` : `/services/${service.slug}/`}
        className="group cursor-pointer"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-emerald/20 group-hover:shadow-xl group-hover:shadow-brand-navy/8">
          <CardDecor index={index} />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/0 to-brand-emerald/0 transition-all duration-500 group-hover:from-brand-emerald/3 group-hover:to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100" style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }} aria-hidden="true" />
          <div className="relative z-10 flex flex-1 flex-col">
            {Icon && (
              <div className={`mb-5 flex size-13 items-center justify-center rounded-xl bg-gradient-to-br ${gradClass} shadow-sm transition-all duration-300 group-hover:scale-105`}>
                <Icon className={`size-6 ${iconColor}`} aria-hidden="true" />
              </div>
            )}
            <h3 className="text-base font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-emerald">{service.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.shortDescription}</p>
            <div className="mt-5 flex items-center gap-1.5">
              <span className="text-sm font-bold text-brand-emerald">Learn more</span>
              <svg className="size-4 text-brand-emerald transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    )
  })}
</div>
```

---

**SECTION 4 (How It Works) — wrap steps list with RevealOnScroll + apply font-display to H2:**

Update the H2: `font-heading font-extrabold` → `font-display font-normal`

Wrap the steps `<div className="mt-10 space-y-0">` with `<RevealOnScroll className="mt-10 space-y-0">` and wrap each step `<div className="group flex gap-4">` with `<motion.div variants={revealItem} className="group flex gap-4">`.

**WAVE DIVIDER — between Section 4 (navy bg) and Section 5 (white bg):**
After closing `</section>` of Section 4, add:
```tsx
<WaveDivider fill="#ffffff" />
```

---

**SECTION 5 (Portal) — floating animated chips (Improvement #7) + font-display H2:**

Update H2: `font-heading font-extrabold` → `font-display font-normal`

The existing "Rent Received" chip (`absolute -right-6 -top-4`) is static. Convert to animated using `motion.div` — add `import { motion } from 'framer-motion'` at top of page.tsx (already done in imports above).

Replace the static chip div with:
```tsx
<motion.div
  className="absolute -right-6 -top-4 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl"
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
>
  {/* keep existing content unchanged */}
</motion.div>
```

Add a second floating chip below the illustration (bottom-left):
```tsx
<motion.div
  className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm"
  animate={{ y: [0, -6, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
>
  <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
    <ShieldCheck className="size-4 text-brand-emerald" aria-hidden="true" />
  </div>
  <div>
    <p className="text-xs font-bold text-white">Lease Signed</p>
    <p className="text-[10px] text-white/50">All docs executed</p>
  </div>
</motion.div>
```

Update the "Explore Owner Portal" Button to include `cta-primary-shadow` className.

**WAVE DIVIDER — between Section 6 (slate-50 bg) and Section 7 (city grid — check its bg):**
Add `<WaveDivider fill="#f8fafc" />` between Section 5 (white) and Section 6 (slate-50). Use `flip={true}` to make the wave curve the other way.

---

**SECTION 6 (Testimonials) — wrap testimonial cards with RevealOnScroll + font-display H2:**

Update H2: `font-heading font-extrabold` → `font-display font-normal`

Wrap `<div className="mt-10 space-y-5">` with `<RevealOnScroll className="mt-10 space-y-5">` and wrap each testimonial card `<div className="group relative flex...">` with `<motion.div variants={revealItem} className="group relative flex...">`.

---

**SECTION 7+ (City grid, FAQ, CTA) — apply font-display to H2 headings:**
For any remaining section H2s using `font-heading font-extrabold`, change to `font-display font-normal`. The CityGridBlock, FAQBlock, and CTABannerBlock headings are inside those components — do NOT modify those block components. Only modify inline H2s in page.tsx directly.

---

**Note on page.tsx being a Server Component:**
page.tsx is an async Server Component. `motion` from framer-motion cannot be used directly in a Server Component. The solution: `RevealOnScroll` and `CountUp` are Client Components (they have `'use client'`). They can be imported into the Server Component and wrap server-rendered children — this is valid RSC composition. The `motion.div` chips in Section 5 are a problem — they need `'use client'`. Solution: Extract the portal illustration wrapper into a small Client Component `PortalChips`:

```tsx
// At top of page.tsx or as a separate file src/components/blocks/portal-chips.tsx:
'use client'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export function PortalChips() {
  return (
    <>
      <motion.div
        className="absolute -right-6 -top-4 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/15">
          <svg viewBox="0 0 20 20" className="size-4 text-brand-emerald" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-brand-navy">Rent Received</p>
          <p className="text-[10px] text-muted-foreground">Unit 4B · $2,400</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
          <ShieldCheck className="size-4 text-brand-emerald" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Lease Signed</p>
          <p className="text-[10px] text-white/50">All docs executed</p>
        </div>
      </motion.div>
    </>
  )
}
```

Import `PortalChips` in page.tsx (no `'use client'` needed at page level). Place it inside the portal illustration `<div className="relative w-full max-w-[520px]">` replacing the static chip div.

Similarly, for Section 4 how-it-works steps, the `motion.div` with variants inside RevealOnScroll: RevealOnScroll is already a Client Component, but its children rendered from a Server Component cannot use motion.div directly. Solution: the stagger variants work because RevealOnScroll passes variant context down — but the child `<motion.div variants={revealItem}>` must itself be inside a Client Component.

The cleanest fix: wrap the HOW_IT_WORKS_STEPS rendering in a small `'use client'` component `HowItWorksSteps`:
```tsx
// src/components/blocks/how-it-works-steps.tsx
'use client'
import { motion } from 'framer-motion'
import { DollarSign, Megaphone, Eye, FileCheck, ShieldCheck, ClipboardCheck, Key } from 'lucide-react'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
// ... HOW_IT_WORKS_STEPS array (move it here from page.tsx)
```

OR the even simpler approach: use CSS-only stagger for the steps (since they are a list, add `animate-fade-up` with increasing delays) and reserve Framer Motion stagger only for the grid sections that are already in Client Components.

**Simplest valid approach for page.tsx Server Component constraint:**
- RevealOnScroll wraps grid children — BUT the `<motion.div variants={revealItem}>` children must be in Client Components.
- For testimonials and service grid: use `RevealOnScroll` but keep children as plain `<div>` elements (RevealOnScroll will animate the container; individual card stagger requires the children to be motion.div which requires client context).
- Actually: Framer Motion v11+ supports RSC-compatible motion components. Check if installed version supports this. Since we're installing fresh: `npm install framer-motion` will get latest (~v12). In Framer Motion v11+, `motion` components can be used in Server Components via `import { motion } from 'framer-motion/react'` (but actually `motion.div` in RSC is still not supported without `'use client'`).

**Final pragmatic approach:**
1. Wrap entire sections that need stagger in small `'use client'` wrapper components:
   - `TestimonialsGrid` client component with motion.div stagger
   - `HowItWorksSteps` client component with motion.div stagger
   - `StatGrid` client component with CountUp + RevealOnScroll
2. Sections that are simple (FAQ, city grid, CTA) get the `RevealOnScroll` wrapper without per-item motion — the container fade-in still looks good.

This keeps page.tsx as a Server Component (no `'use client'` at top level) while achieving the motion effects.

---

**SUMMARY OF ALL CHANGES IN page.tsx:**

1. Add imports at top (RevealOnScroll, revealItem, CountUp, WaveDivider, PortalChips, motion from framer-motion — wait, motion itself can't be in server component. Only import the non-motion utilities: RevealOnScroll, CountUp, WaveDivider, PortalChips).
2. Section 2: Replace with trust bar + CountUp stats (using `StatGrid` client component or inline with CountUp which is already a client component - CountUp wrapped in a plain div works).
3. After Section 2: `<WaveDivider fill="#ffffff" />`
4. Section 3 H2: `font-display font-normal`
5. After Section 4: `<WaveDivider fill="#ffffff" />`
6. Section 5 portal chips: Replace static chip with `<PortalChips />`
7. Section 5 H2: `font-display font-normal`
8. Before Section 6 (testimonials→Section 5 boundary): `<WaveDivider fill="#f8fafc" flip={true} />`
9. Section 6 H2: `font-display font-normal`
10. Section 6 testimonials: Wrap with `<RevealOnScroll>` and `<motion.div variants={revealItem}>` inside a `TestimonialsSection` client component.
11. "Explore Owner Portal" Button: add `cta-primary-shadow` class.

For the `motion.div` stagger constraint: create minimal client components only where `motion.div` with `variants` is needed on individual items. The `RevealOnScroll` container itself animates as a unit where individual item stagger isn't feasible from RSC.

After all edits, run: `npm run build` to confirm no TypeScript errors and no build failures.
  </action>
  <verify>
    <automated>cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npm run build 2>&1 | tail -30</automated>
  </verify>
  <done>
    - `npm run build` exits 0 with no TypeScript errors
    - Section 2 shows a trust bar with "As seen in" and media names, plus counting stats
    - Services section shows first service as a large dark navy bento hero card spanning 2 columns on desktop
    - Portal section has two floating animated chips (Rent Received + Lease Signed)
    - Three wave dividers visible at section boundaries on homepage
    - All section H2s use DM Serif Display (serif font, visibly different from Inter)
    - Testimonial and how-it-works cards animate in with stagger on scroll
    - Primary CTA buttons have two-layer glow shadow on hover
  </done>
</task>

</tasks>

<verification>
Full build verification:
```bash
cd "/Users/sakshamsolanki/Desktop/02-Client-Work/Canadian real estate" && npm run build
```
Expected: exit 0, "Route (app)" table with / listed, no TypeScript errors.

Visual checklist (open http://localhost:3000 with `npm run dev`):
1. Hero background has three softly drifting colored orbs (green top-left, dark blue bottom-right, gold center-right)
2. H1 "White-Glove Leasing Execution for Serious Rental Operators" — last word "Operators" is italic serif emerald
3. All section H2s are in DM Serif Display (clearly different visual weight from body text)
4. At scroll position 0, header is fully transparent with white nav links
5. After scrolling, header becomes solid brand-navy with smooth transition
6. Section 2 has a stats row (counting animations) + "As seen in" bar
7. Section 3 services: first card is a large dark navy card with "500+" number + remaining cards are normal white cards
8. Section 5 portal: two chips floating independently on the illustration
9. Wave curves visible between sections (not just flat horizontal lines)
10. Testimonial cards fade+stagger in when scrolled into view
</verification>

<success_criteria>
- All 10 design improvements from DESIGN_AUDIT.md are implemented
- `npm run build` produces a clean production build with no errors
- No changes to SEO structure, JSON-LD, routing, or CMS integration
- The "What Not To Change" list from DESIGN_AUDIT.md Part 5 is fully preserved (navy+emerald palette, eyebrow badge, two-layer CTA system, testimonial outcome chips, section structure)
- Zero new paid dependencies introduced
</success_criteria>

<output>
After completion, create `.planning/quick/1-implement-all-10-design-improvements-fro/1-SUMMARY.md` with:
- What was built
- Files modified
- Any deviations from plan and why
- Build status confirmation
</output>
