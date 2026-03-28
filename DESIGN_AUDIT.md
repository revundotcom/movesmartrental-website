# MoveSmart Rentals — Full Design Audit & Redesign Brief
**Date:** March 29, 2026 | Research from 17+ competitor sites across 3 parallel agents

---

## PART 1: WHAT'S BROKEN RIGHT NOW

### 1. Hero is alive on paper, dead in practice
The `animate-gradient` CSS keyframe animates `background-position` on a radial-gradient — this is effectively a no-op. Radial gradients don't respond to background-position in a visually interesting way. The noise texture is at `opacity: 0.025` — completely invisible. The glow orbs are sized at `500px` but offset `-200px` off-screen — barely visible. **The hero background is static.**

### 2. Nothing moves after load
`animate-fade-up delay-100/200/300` are CSS utilities that fire once on page load. Sections below the fold are completely static — zero scroll-triggered animations. The biggest differentiator between premium and mediocre sites is scroll-driven reveals.

### 3. Typography has zero contrast
Every heading uses `font-heading` (Inter). H1, H2, H3, and body are all the same font at different sizes. No display font contrast. Every premium reference site (Mynd, Divvy, Plum Guide) uses a serif display font for H1/H2 — the contrast between serif headlines and sans-serif body is the single most impactful typographic decision possible.

### 4. Stats are duplicated (hero + section 2)
The trust strip inside the hero (500+, 20+, 98%, 14 Days) is repeated verbatim in Section 2. Wasted real estate that signals lazy design.

### 5. Card monoculture
Services = cards. Portal features = cards. Testimonials = cards. How It Works = cards. No section has a distinct visual personality. Zero bento/asymmetric layouts.

### 6. Testimonials use initials (MR, SL, JK)
This screams "fake testimonials" to every visitor. No real photos, no verified platform badges, no specificity. Belong.com gets 5 review platforms in the hero. MoveSmart has zero.

### 7. Header is always white
The header stays `bg-white/95` regardless of scroll position. On DoorLoop (benchmark), the header is transparent over the dark hero and transitions to solid on scroll — creating a seamless, cinematic hero effect. Currently MoveSmart's dark hero is visually interrupted by a white navbar.

### 8. Button shadows are too diffuse
`boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'` is a single-layer, overly spread shadow that looks soft and cheap. Stripe and Mercury use two-layer brand-colored shadows: tight crisp layer + wide glow layer.

### 9. Floating badges don't float
The "Rent Received" notification chip is static — `absolute` positioned, no animation. Every premium reference site (Mynd, Notion, Linear) floats these chips with a `y: [0, -8, 0]` animation loop.

### 10. Section transitions are flat cuts
`border-b border-border` between sections. No diagonal clip-paths (Avail), no curved radius (Hostaway), no SVG wave dividers (Knock.com). Zero architectural rhythm between sections.

---

## PART 2: COMPETITIVE LANDSCAPE

### Ontario/Canada Direct Competitors
| Site | Design Score | Key Pattern | Weakness |
|------|-------------|-------------|----------|
| Buildium | 6/10 | Strong SaaS standard, pricing clarity | Generic blue corporate |
| ProperVista | 4/10 | Functional PM software | No brand investment |
| RentalPropertyMgmt.ca | 3/10 | Basic WordPress | Zero visual design |

**Key finding**: Direct Ontario competitors are visually weak. The market is extremely underdesigned. There is a massive opportunity to dominate purely on visual quality.

### Best-in-Class Proptech/Rental
| Site | Score | What Makes It Work |
|------|-------|-------------------|
| **Plum Guide** | 9/10 | Serif display font, "top 3% only" exclusivity framing, editorial photography |
| **Mynd.co** | 8.5/10 | Poppins 300 light + Taviraj italic serif, forest green brand, 0.15s transitions |
| **DoorLoop** | 7.5/10 | Scroll-triggered transparent→solid nav, "36 seconds" copy, animated underlines |
| **Avail** | 7/10 | Diagonal clip-path section transitions, light-weight headlines, navy+mint |
| Guesty | 6/10 | Product-as-hero mockup, animated cycling features |
| Hostaway | 6.5/10 | Curved `border-radius: 85px` section transitions, warm distinctive palette |
| Belong | 5/10 | Multi-platform badge cluster (Google + Trustpilot + BBB + Apple Store) |
| TurboTenant | 4.5/10 | Sliding fill button hover (`inset` box-shadow technique) |

### Premium Reference Sites (Stripe / Linear / Brex / Mercury)
| Site | Score | Transferable Technique |
|------|-------|----------------------|
| **Stripe** | 10/10 | Animated mesh gradient (3 floating orbs), brand-colored 2-layer button shadow |
| **Linear** | 9.5/10 | `border: 1px solid rgba(255,255,255,0.06)` on dark cards instead of glassmorphism blur |
| **Brex** | 9/10 | Three-zone background system, `font-feature-settings` typography precision |
| **Mercury** | 8.5/10 | Section `data-theme` switching, `rootMargin: -50%` Intersection Observer timing |
| **Divvy** | 8/10 | Domaine Display Bold serif for headlines, `object-position` on hero photography |

---

## PART 3: THE 10 REDESIGN IMPROVEMENTS

Ranked by visual impact. All implementable in the existing Next.js + Tailwind + Framer Motion stack.

---

### #1 — Animated Orb Mesh Gradient in Hero
**Impact: Transformative | Effort: 2hrs**

Replace the broken `animate-gradient` background with 3 absolutely-positioned Framer Motion orbs:
- Orb 1: emerald `rgba(16,185,129,0.18)`, 600px, `blur-[80px]`, top-left, 12s float cycle
- Orb 2: navy-light `rgba(20,60,100,0.5)`, 700px, `blur-[100px]`, bottom-right, 16s float cycle
- Orb 3: gold `rgba(212,168,83,0.08)`, 400px, `blur-[60px]`, center-right, 8s float cycle

Each uses `motion.div` with `animate={{ x: [0, 80, -40, 0], y: [0, 60, 80, 0] }}` at different durations. Three orbs produce the Stripe aurora effect without WebGL. This single change transforms the hero from "dark background with text on it" to a living, atmospheric environment.

```tsx
// In hero-block.tsx, replace the static radial-gradient div with:
<motion.div
  className="absolute size-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,transparent_70%)] blur-[80px]"
  style={{ top: -200, left: -100 }}
  animate={{ x: [0, 80, -40, 0], y: [0, 60, 80, 0] }}
  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
/>
```

---

### #2 — DM Serif Display Font for Headlines
**Impact: Very High | Effort: 30min | Cost: Free (Google Fonts)**

Add DM Serif Display as `font-display` for H1s and section H2s only. Keep Inter for UI text.

```ts
// tailwind.config.ts
fontFamily: {
  display: ['"DM Serif Display"', 'Georgia', 'serif'],
}
```

```tsx
// Hero H1: change font-heading → font-display font-normal (it's naturally heavy)
<h1 className="font-display text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl">

// For the emerald accent word — use italic instead of gradient clip:
<span className="font-display italic text-brand-emerald">{lastWord}</span>
```

This is how Mynd, Divvy, and Plum Guide create immediate premium differentiation. A serif italic accent word is far more sophisticated than gradient text-clip on a sans-serif.

---

### #3 — Transparent → Solid Scroll-Triggered Header
**Impact: Very High | Effort: 30min**

The header already has a `scrolled` state but stays white. Change it to be transparent with white logo/links over the dark hero, then transition to navy solid on scroll:

```tsx
// In header.tsx — change the className logic:
className={cn(
  'sticky top-0 z-50 w-full transition-all duration-300',
  scrolled
    ? 'border-b border-border/40 bg-brand-navy shadow-[0_1px_12px_rgba(11,29,58,0.15)]'
    : 'border-b border-transparent bg-transparent'
)}

// Nav links need to be white when unscrolled:
className={cn(
  'text-sm font-medium transition-colors duration-200',
  scrolled ? 'text-white/80 hover:text-white' : 'text-white/90 hover:text-white'
)}
```

This creates the cinematic DoorLoop/Stripe effect where the hero is fully immersive before the user scrolls.

---

### #4 — Scroll-Triggered Staggered Card Reveals (Framer Motion)
**Impact: Very High | Effort: 3hrs**

Create a reusable `<RevealOnScroll>` wrapper:

```tsx
// src/components/ui/reveal-on-scroll.tsx
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}
export const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export function RevealOnScroll({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
```

Wrap each grid section: `<RevealOnScroll>` around service cards, testimonials, city cards, stat bars. Each card inside uses `<motion.div variants={item}>`. The `staggerChildren: 0.12` means a 4-column grid reveals left-to-right in 0.5s — the signature animation of Linear, Stripe, and every premium SaaS.

The easing `[0.22, 1, 0.36, 1]` is a custom cubic-bezier that overshoots slightly like a spring — more premium than `ease-out`.

---

### #5 — Remove Duplicate Stats (Fix Section 2)
**Impact: High | Effort: 15min**

The hero already has the trust strip. Section 2 (social proof bar) repeats the same four stats. Replace Section 2 with a **logo trust strip** instead:

```tsx
// Section 2: replace the stats grid with a "Featured in / Trusted by" media logo bar
<section className="border-b border-border bg-slate-50 py-8">
  <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
    As featured in
  </p>
  <div className="mt-6 flex items-center justify-center gap-10 opacity-40 grayscale filter">
    {/* Toronto Star, Globe and Mail, Globe Investor, REIC, FRPO logos */}
  </div>
</section>
```

Even if real logos need acquiring, placeholder space for them signals the right intent. This breaks the stat repetition and adds a trust signal type that currently doesn't exist on the page.

---

### #6 — Bento Grid for Services Section
**Impact: High | Effort: 4hrs**

Replace the uniform 4-column service card grid with an asymmetric bento:

```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Hero cell: Tenant Placement — spans 2 cols + 2 rows */}
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-[#132D54] p-8 text-white
    lg:col-span-2 lg:row-span-2">
    <p className="text-5xl font-black text-brand-emerald">500+</p>
    <p className="text-sm text-white/50">Tenants placed</p>
    <h3 className="mt-4 font-display text-2xl font-normal">Tenant Placement</h3>
    <p className="mt-2 text-sm text-white/70">Full-service placement...</p>
    {/* Illustration in bottom-right */}
  </div>

  {/* Standard cells for other services */}
  {remainingServices.map(s => (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">...</div>
  ))}
</div>
```

One hero feature card dominates, flanked by smaller utility cards. This is Apple's iPhone features page, Notion's homepage, and Linear's capabilities page. Visual hierarchy immediately guides the eye.

---

### #7 — Floating Animated Proof Chips on Illustrations
**Impact: High | Effort: 2hrs**

The "Rent Received" badge needs to float AND multiply. Add 2-3 chips per illustration section:

```tsx
// Each chip: Framer Motion floating loop
<motion.div
  className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10
    bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm"
  animate={{ y: [0, -8, 0] }}
  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
>
  <ShieldCheck className="size-4 text-brand-emerald" />
  <div>
    <p className="text-xs font-bold text-white">Tenant Verified</p>
    <p className="text-[10px] text-white/50">Credit + Employment confirmed</p>
  </div>
</motion.div>

{/* Second chip at different corner, different timing */}
<motion.div
  className="absolute -right-4 top-8 ..."
  animate={{ y: [0, -6, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
>
  <p className="text-xs font-bold text-white">Lease Signed</p>
  <p className="text-[10px] text-white/50">All docs executed</p>
</motion.div>
```

Stagger delays by 1.5–2s so chips float independently. This is the most copied premium proptech pattern.

---

### #8 — Two-Layer Brand-Colored Button Shadows
**Impact: High | Effort: 30min**

Current: `boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'` — single layer, too diffuse.

Replace with:
```tsx
// Resting state
boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3), 0 1px 4px rgba(16, 185, 129, 0.2)'

// Hover state (via group-hover or CSS class)
boxShadow: '0 8px 28px rgba(16, 185, 129, 0.5), 0 2px 8px rgba(16, 185, 129, 0.25)'
```

The two-layer approach: wide diffuse glow + tight crisp layer. Stripe, Linear, and Mercury all use this. The button appears to emit light rather than cast a shadow.

Apply globally to all primary emerald buttons via a Tailwind plugin or shared style constant.

---

### #9 — SVG Wave Section Transitions (3 maximum)
**Impact: Medium-High | Effort: 1hr**

At 3 section boundaries (hero→social proof, how-it-works→portal, testimonials→cities), replace flat `border-b` with an SVG wave:

```tsx
// Component: src/components/ui/wave-divider.tsx
export function WaveDivider({ from, to }: { from: string, to: string }) {
  return (
    <div className="-mt-px -mb-px overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1440 60" fill="none" className="w-full block" preserveAspectRatio="none" style={{ height: 60 }}>
        <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" fill={to} />
      </svg>
    </div>
  )
}
```

Use sparingly — maximum 3 waves on the homepage. Too many degrades to "2015 WordPress theme."

---

### #10 — Counting Stats Animation on Scroll
**Impact: Medium | Effort: 1.5hrs**

Replace static stat numbers with Framer Motion count-up animations:

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

function CountUp({ value, suffix = '' }: { value: number, suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 })
  const display = useTransform(spring, (v) => `${Math.round(v).toLocaleString()}${suffix}`)

  useEffect(() => { if (inView) motionVal.set(value) }, [inView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}
```

Apply to the Section 2 stats (500, 20, 98, 14). The spring physics with `bounce: 0` creates a smooth ease-out count.

---

## PART 4: QUICK WIN PRIORITY MATRIX

| # | Change | Dev Time | Visual Impact | Dependencies |
|---|--------|----------|---------------|--------------|
| 3 | Transparent nav header | 30min | ★★★★★ | None |
| 2 | DM Serif Display font | 30min | ★★★★★ | Google Fonts |
| 8 | Two-layer CTA shadows | 30min | ★★★★ | None |
| 5 | Remove duplicate stats | 15min | ★★★ | None |
| 1 | Animated orb gradient hero | 2hrs | ★★★★★ | Framer Motion |
| 7 | Floating animated proof chips | 2hrs | ★★★★ | Framer Motion |
| 4 | Scroll-triggered card reveals | 3hrs | ★★★★★ | Framer Motion |
| 9 | SVG wave dividers | 1hr | ★★★ | None |
| 10 | Counting stats | 1.5hrs | ★★★ | Framer Motion |
| 6 | Bento grid services | 4hrs | ★★★★ | None |

**Total estimated time: ~16 hours for full implementation**

---

## PART 5: WHAT NOT TO CHANGE

The current site already does these correctly — do not touch:
- ✅ Navy + emerald + gold color palette — zero Ontario competitors use this combo, it's defensible and ownable
- ✅ Eyebrow badge with pulsing dot + backdrop-blur-sm — correct, keep as-is
- ✅ Two-layer CTA system (solid primary + ghost secondary) — correct contrast hierarchy
- ✅ The `blur-3xl` radial glow orbs — concept is correct, just make them bigger and less offset
- ✅ Outcome badges on testimonials (green "Unit rented in 10 days" chips) — keep
- ✅ Left-border accent on testimonial cards — keep
- ✅ The overall section structure (hero → social proof → services → how it works → portal → testimonials → cities → FAQ → CTA) — this is a solid conversion flow

---

## PART 6: THE NORTH STAR

The target brand position is **Mynd meets Plum Guide** — Mynd's institutional gravitas and forest-green/navy premium palette, Plum Guide's editorial serif typography and exclusivity framing.

**One sentence brief:** Make MoveSmart Rentals look like the most sophisticated property management company in Ontario — because it is, and currently the website doesn't show it.

The navy + emerald palette is **unoccupied in the entire Canadian property management market**. None of the 17 sites analyzed use it. This is the competitive advantage — the execution just needs to match the ambition.
