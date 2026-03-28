# Competitor UX & Design Research Report
## MoveSmart Rentals — Competitive Landscape Analysis

**Prepared:** March 2026
**Scope:** 8 direct and adjacent competitors in Ontario property management / rental software space
**Purpose:** Identify design patterns, conversion tactics, and visual opportunities to steal/adapt for MoveSmart Rentals

---

## Executive Summary

The Ontario property management web design landscape splits into two distinct tiers:

1. **Enterprise/SaaS tier** (PropertyVista, Buildium, Zeevou, FirstService, PropertyManagement.com) — polished, high-investment design, sophisticated conversion funnels, brand-forward color systems, strong social proof machinery
2. **Local/SMB tier** (ownwell.ca/mortgage niche, rentalpropertymanagement.ca, mainstreetrental.ca) — dated or minimalist design, low visual sophistication, weak conversion optimization

MoveSmart has a clear design gap to exploit: **none of the local Ontario competitors combine white-glove positioning with modern visual design**. The enterprise players look great but feel cold and corporate. The local players feel trustworthy but look cheap. MoveSmart can own the "premium-yet-personal" middle ground.

---

## 1. Ownwell.ca

**Note:** ownwell.ca turned out to be a **Canadian mortgage broker SaaS tool** (not a property management company). It is included because its design quality is highly instructive regardless of niche.

### Visual Design Quality
**Rating: 9/10** — One of the best-designed sites in this research set. Clean B2B SaaS aesthetic with generous whitespace, precise typographic hierarchy, and a restrained but confident color system. The design feels premium without being cold.

### Hero Section
- **Headline:** "Create more deals from the clients you already have"
- **Subheadline:** Explains the mechanism clearly — monitors mortgage books, surfaces refinance/renewal opportunities
- **CTA:** Dual-button layout — primary "Book a Demo" + secondary "Get Started" — a classic SaaS hierarchy
- **Background:** Animated platform interface screenshot with subtle floating CSS animation. No stock photography.
- **Approach:** Problem-solution framing. The headline is outcome-first, not service-first. This is a critical distinction.

### Color Palette & Typography
- Primary: `#286BEC` (confident mid-blue)
- Neutrals: White backgrounds, `#475569` body text, `#1E293B` headings
- Accents: Lavender/blue gradient tints (`#DAE5FC`) for subtle section depth
- Typography: Clean sans-serif system, strong weight contrast between display (~48–60px) and body (20px)
- No serif fonts — purely modern

### Services Presentation
Three-step process layout using **sticky-positioned video demos** on desktop — as you scroll through each step, the demo video stays anchored beside the copy. Extremely effective for SaaS walkthroughs. Each step has a short, punchy verb-led label.

### Trust Signals
- Headline metrics prominently placed: **"68% avg. open rate," "9x avg. annual ROI," "$50k+ months happen"**
- Three testimonials with headshots + company logos
- Logo bar of 12 recognizable Canadian mortgage firms
- Testimonials include specific, measurable outcomes ("10+ deals since February 2025") — not generic praise

### Pricing
Deferred — no homepage pricing. Routes to `/pricing` page or demo booking. Reduces early friction.

### Animations & Interactivity
- Hero image: subtle floating CSS animation
- SVG path strokes animate continuously (dash animation)
- Scroll-triggered: words progressively highlight/change color as viewport passes them
- Sticky-positioned video demos during scroll

### Conversion Optimization
- Multiple CTA placements: hero, mid-page, after testimonials, end of page
- Demo booking as the primary ask (lower commitment than signup)
- Social proof density front-loaded in the first scroll

### What MoveSmart Should Steal
- **Scroll-triggered text highlight animation** on key stat numbers or headlines
- **Outcome-first headline framing** ("Place the right tenant in 14 days" > "Property Management Services")
- **Specific numbered social proof** in the hero zone (days to placement, properties managed, tenant retention rate)
- **Sticky demo/video scroll pattern** if showing a tenant portal or property owner dashboard walkthrough
- **Dual CTA hierarchy** in hero: primary hard CTA + secondary softer action

---

## 2. PropertyManagement.com

### Visual Design Quality
**Rating: 8/10** — Sophisticated B2B platform design with enterprise-grade visual weight. Uses OKLCH color space (perceptually uniform gradients), floating navbar with blur effects, and a layered gradient system that creates real depth.

### Hero Section
- **Background:** Complex radial gradient system — `radial-gradient(600px at 66% 0, #3b82f626)` layered with lime and blue accents — creates an atmospheric, tech-forward depth effect without photography
- **Typography:** "Unbounded" (distinctive geometric display font) for headlines + "Satoshi/Inter" for body copy
- **Approach:** Consultative positioning, not hard-sell

### Color Palette & Typography
- Green: `oklch(72.3% .219 149.579)` — vibrant but not garish
- Blue: `oklch(62.3% .214 259.815)`
- Full dark mode support via CSS custom properties
- **Unbounded** is a bold, condensed display font that commands attention without serif convention
- Color system uses 11 shade levels (50–950) — true design system thinking

### Services Presentation
- "Score card" components with radial gradient backgrounds differentiated by category (performance, cost, trust, experience)
- Process cards with directional arrows that morph from vertical (↓) to horizontal (→) at responsive breakpoints — clever spatial navigation metaphor
- Hover states: `0 4px 6px -1px` shadow elevation

### Trust Signals
- "Winner" and "Market Leader" card variants with trophy/badge imagery
- Gold (`#d9bb62`), purple, silver, bronze tier borders — gamified credibility tiers
- Testimonial section exists but was hidden (`display: none`) at time of analysis

### Pricing
No visible pricing table on homepage — B2B lead qualification approach.

### Animations
- Card hover: 200ms `ease-in-out` transitions
- Process arrow direction changes at breakpoints
- FAQ accordion with `[open]` state styling
- Floating navbar with backdrop blur

### What MoveSmart Should Steal
- **Atmospheric gradient backgrounds without photography** — cheaper to produce, never looks stock, ages better
- **The Unbounded / geometric display font aesthetic** for headlines — commands attention differently from every local competitor using Lato/Open Sans/Proxima
- **Tiered visual differentiation** for service packages (gold, silver, bronze treatment)
- **Score/value card format** for presenting the MoveSmart process — not just text lists

---

## 3. FirstService Residential (fsresidential.com/ontario)

**Note:** firstservice.com/en-CA returned 404. The Ontario regional site at fsresidential.com/ontario was successfully fetched.

### Visual Design Quality
**Rating: 7/10** — Polished enterprise site with classic real estate aesthetics. Competent but conservative. Feels like a bank website — trustworthy, but not exciting. Reflects the company's scale, not a scrappy boutique.

### Hero Section
- **Headline:** "Life, simplified. ®" (registered trademark symbol is a bold move)
- **Subheadline:** "FirstService Residential is simplifying property management. We partner with board members, owners, and developers in an effort to enhance the value of every property and the life of every resident."
- **CTA:** "Learn More" — extremely low-commitment, passive CTA
- **Background:** Full-width hero photography with `rgba(0,0,0,0.3)` dark gradient overlay; text positioned at bottom of slide with generous vertical padding (290px bottom)
- **Slider:** Slick carousel with multiple hero slides

### Color Palette & Typography
- Dark Blue: `#373F51` (anchors the palette, serious and corporate)
- Light Blue: `#B0E9FE` (accent/link color)
- Background Light: `#E8EEF2`
- **Playfair Display** (serif) for headlines — premium, traditional, editorial
- **Muli** (humanist sans-serif) for body copy at various weights (200–900)
- Button text: 12px, 600 weight, **uppercase**, 1.2px letter-spacing — classic luxury real estate treatment

### Services Presentation
- Three-card entry point: Board Members / Residents / Developers — immediate audience segmentation
- Property type breakdown: High-Rise, Mid-Rise/Low-Rise, Townhomes, Developer Consulting
- Card hover effects: `translateY(-5px)` with box-shadow expansion — standard but clean

### Trust Signals
- "Available 24 hours a day, 7 days a week" — reliability-focused
- Physical office addresses (Mississauga, Toronto)
- Downloadable lead magnet: "Annual tasks: a checklist for condominium boards"
- Webinar library for authority building
- 24/7 customer care repeatedly emphasized

### Pricing
None on homepage. Routes to "Request a Proposal."

### Animations
- Button underline animation: width transitions 0 → 100% on hover over 0.4s cubic-bezier — elegant and distinctive
- Card `translateY(-5px)` hover lifts
- Slick + Splide carousels
- HotJar heatmapping installed (they're optimizing actively)

### Conversion Optimization
- Audience-segmented pathways immediately (board members vs residents vs developers)
- Lead magnet (checklist PDF) for email capture
- "Request a Proposal" as primary conversion — not a price page
- Google Ads, Facebook Pixel, LinkedIn Insight Tag all active — serious retargeting setup
- UTM tracking on all proposal request forms

### What MoveSmart Should Steal
- **Audience segmentation in the hero/above-fold zone** — "Are you a property owner? Or a tenant?" split pathway immediately
- **Lead magnet strategy** — a free PDF ("10 Questions to Ask Your Property Manager in Ontario") would be a low-effort, high-conversion addition
- **"Request a Proposal" CTA framing** — feels bespoke and premium vs "Get a Quote" (transactional)
- **Serif headline font** + sans-serif body pairing for a premium/editorial feel
- **Button underline animation** on hover (0.4s cubic-bezier) — specific, distinctive micro-interaction
- **24/7 availability** as a trust signal — if MoveSmart can claim this, put it everywhere

---

## 4. MainStreetRental.ca

### Visual Design Quality
**Rating: N/A — Site unreachable** (ECONNREFUSED at time of analysis). The domain may be down or geo-blocked.

### What We Know (from search)
No usable design data retrieved. Search results did not surface any design reviews or screenshots. This competitor should be revisited manually in a browser.

### Action for MoveSmart
Check this site manually. If it's a low-quality site, that's a gap MoveSmart can exploit with a quality design in the same Ontario rental market.

---

## 5. RentalPropertyManagement.ca

### Visual Design Quality
**Rating: 3/10** — WordPress.com hosted site (redirects to `rentalpropertymanagementca.wordpress.com`). This is a hobbyist/freelancer-tier website. Minimal investment, generic template, no custom design.

### Hero Section
- WordPress cover block with background image, dark overlay (50% opacity)
- Minimum height: 430px — relatively shallow
- No compelling headline, subheadline, or differentiated CTA visible
- Nine content position options (top-left through bottom-right) — standard WP behavior

### Color Palette & Typography
- Foreground: `#133837` (deep teal)
- Background: `#D2F0EA` (light mint)
- Font: **EB Garamond** (serif) — professional-adjacent but feels old-fashioned at this size
- Heading weight: 400 (unusually light for headers — diminishes hierarchy)

### Services Presentation
Navigation links to "Our Services," "Portfolio," and "Fees" as separate pages. No inline service cards or visual presentation. Pure text-based.

### Pricing
A "Fees" page exists in navigation but specific pricing not visible on homepage.

### Trust Signals
- Owner bio: "For the last 15 years, I owned and managed apartment buildings" — personal credibility
- Single operator (Gilles E. Wilson) — small but potentially trustworthy to the right audience
- No logos, no star ratings, no metrics

### Animations
CSS lightbox with zoom animations and 200ms hover opacity transitions. Minimal.

### Conversion Optimization
- Phone number in header
- Email contact link
- CCPA/privacy compliance ("Do Not Sell" link) — unusual for a small Canadian PM
- Google Analytics + WordPress.com tracking

### What MoveSmart Should Note
This is **the floor** — a serious competitor only to homeowners who are searching and clicking randomly. Any polished website immediately leapfrogs this. The existence of this as a competitor is a signal that the Ontario rental PM market has a design quality vacuum that MoveSmart can dominate.

---

## 6. PropertyVista.com

### Visual Design Quality
**Rating: 7/10** — Professional B2B SaaS for multifamily property management software. Clean, competent, corporate tech aesthetic. Not inspiring, but clearly functional and credible.

### Hero Section
- **Headline:** "Simplify Multifamily Management with One Powerful Platform"
- **Subheadline:** Unified operations across team, tenants, and systems
- **CTA:** Prominent "Book A Demo" button
- **Background:** Gradient image — blue-to-cyan tones (#203568 to #00D3FF, 135deg) — creates a professional tech atmosphere without photography

### Color Palette & Typography
- Primary: `#02718C` (muted corporate teal)
- Accent: `#04b4c8` + `#00D3FF` cyan
- Headings: **Rokkitt** (slab serif) — distinctive but unusual for PM software
- Body: **Ubuntu** (humanist sans-serif)
- The Rokkitt slab serif is actually a smart differentiator — feels authoritative without being stuffy

### Services Presentation
Six core services in an **icon-based grid layout** with bordered cards:
- Tenant Operations, Vista Websites, Accounting & Vendor Management, Business Insights, Maintenance & Inspections, Training & Support
- Cards activate on hover with color transitions
- Tab-switching animations with **5-second auto-rotation** on the product showcase section

### Trust Signals
- Client logos: Starlight, Devon Properties, DMS, Greenwin, Compten — recognizable Canadian multifamily firms
- Scale metrics: **"200+ clients managing 500,000+ units across North America"**
- Executive-attributed testimonial quotes
- SOC 2 compliance badge in footer — security credibility

### Pricing
Not visible on homepage. "Pricing" link in nav. Demo-first funnel.

### Animations
- Tab-switching with 5-second auto-rotation
- Card hover color transitions
- Icon color changes on hover
- Lazy-loading above the fold
- Sticky navigation

### Conversion Optimization
- Multiple "Book A Demo" + "Let's Talk" CTAs throughout page
- Sticky nav maintains conversion access
- Repeated social proof — logos, metrics, testimonials — at multiple scroll depths
- "Vida AI" section introduces adjacent product for expanded engagement
- SOC 2 badge for enterprise security confidence

### What MoveSmart Should Steal
- **Slab serif for headlines** (Rokkitt or similar) — the Rokkitt choice is bold and positions them as authoritative without feeling like every other PM company using geometric sans
- **"200+ clients, X units" stat format** — adapt as "X properties placed, X days average vacancy"
- **5-second auto-rotating tab showcase** for showing the owner portal, tenant screening flow, etc.
- **SOC 2 / data security angle** — if MoveSmart uses a portal, mention data protection even in passing
- **"Let's Talk" CTA variant** alongside harder CTAs — conversational framing reduces friction

---

## 7. Zeevou.com

**Note:** The site runs on a heavily minified WordPress + Elementor stack. Full visual HTML was not parseable, but CSS architecture and design token analysis reveals the following.

### Visual Design Quality
**Rating: 6/10** (inferred) — Functional SaaS aesthetic. The Elementor/Astra foundation limits design differentiation. The brand uses a vibrant three-color system that should pop, but the platform constraints likely produce a somewhat generic layout.

### Color Palette & Typography
- Primary: `#0170B9` (standard corporate blue)
- Teal accent: `#009688` (Material Design-era teal — slightly dated)
- Magenta: `#E30168` (sharp, high-contrast accent — memorable)
- Golden yellow: `#fdb415` (warm accent for CTAs or highlights)
- Body font: **Nunito** (rounded sans-serif) at 15px base — friendly, approachable, slightly casual
- Headings: Nunito in 400–600 weight range at 18–40px

### Services / Features Presentation
Feature cards with 20px gaps, icon integration, teal CTA buttons with 5px border-radius and hover darkening states. The rounded corner and Nunito combo suggests a deliberate "friendly SaaS" positioning — targeting smaller, less technical operators.

### Trust Signals
- 2025 recap blog content signals active product development
- Integration ecosystem (channel managers, Webready, OTAs) emphasized
- SoftwareAdvice, G2, HotelMinder review platform presence

### Pricing
- Three-tier pricing model likely (SaaS convention)
- Monthly pricing available (confirmed by SoftwareAdvice profile)
- Deferred to pricing page

### Conversion Optimization
- GTM tracking active
- GDPR/cookie consent (WebToffee + CookieBot + OneTrust) — suggests international audience
- UTM parameter capture for attribution
- WP Rocket performance optimization (fast load as CRO tactic)

### What MoveSmart Should Note
Zeevou targets **short-term rental managers** (Airbnb/VRBO operators), not long-term residential property management. It's a tangential competitor at most. However:
- **Friendly rounded typography** (Nunito) can be a differentiator in a field dominated by sharp sans-serifs
- **Magenta `#E30168` as accent** is bold — most competitors use blue/green/teal. A distinctive accent color is memorable.

---

## 8. Buildium.com

### Visual Design Quality
**Rating: 8/10** — Most mature conversion optimization architecture in the set. Buildium has clearly invested heavily in CRO — multi-step forms, exit-intent modals, award badges, sticky CTAs on content pages, and a sophisticated pricing tier comparison system.

### Hero Section
- Left/right content split with centered alignment options
- Lazy-loaded background images (`data-bg-image`) with opacity and transform effects
- Primary + ghost button CTA hierarchy
- Mobile: full-width stacking under 768px
- Breadcrumb navigation in hero zone on product subpages

### Color Palette & Typography
- Brand green: `#73B680` (soft, trustworthy — different from the aggressive greens used elsewhere)
- Dark navy: `#153d58` (anchors the palette with authority)
- Accent orange: `#ff5c23` (high-contrast secondary CTAs and urgency elements)
- Neutral grays: `#959597`, `#2F2F31`
- Font: **Open Sans** (Google Fonts, weights 300–800)
- Headings: 32–40px at 600–800 weight
- The green/navy/orange combination is distinctive and cohesive — feels like a professional SaaS but warmer than competitors

### Services Presentation
- Multi-column icon blocks (max 80px icon width, centered)
- Feature cards in grid layouts with descriptions and CTAs
- **Vertical tabbed navigation** with product descriptions — stays visible while content scrolls horizontally
- Accordion sections for feature depth without page clutter

### Pricing
- Three tiers: **Essential** ($62/mo), **Growth** ($192/mo), **Premium** ($400/mo)
- Comparison tables with green (`#73B680`) for positive rows, red (`#D4402B`) for "not included" rows
- Mobile pricing converts from table to card layout
- Annual plans offer 10% discount (creates anchoring)
- Quote/testimonials placed above pricing tiers as social proof priming before the price reveal

### Trust Signals
- 5-star testimonial carousel with profile photos (min-height 170px cards)
- Awards section with logo galleries
- Multiple award/badge displays
- GDPR + SMS opt-in checkboxes on forms (regulatory confidence)

### Animations
- Fade-in: `animation: fadeIn ease 0.8s, come-in 0.8s ease forwards` on story sections
- Lazy loading via IntersectionObserver (0.01 threshold — fires very early)
- Card hover: 200ms ease-in-out color transitions
- Slick.js carousel with dot navigation
- Accordion tab switching

### Conversion Optimization — Most Sophisticated in Set
- **Multi-step forms**: `step1of4_form_div` through `step4of4_form_submit` — progressive commitment (each step feels small, total data capture is large)
- **Exit-intent modal** (`#myModal`) with form collection
- **Sticky CTAs** on blog/pillar pages (`post-template-piller-page-stickey`)
- Form field optimization: 58px button heights, clear red error messaging
- GTM: Two separate containers (GTM-WG8VJP, GTM-5NLLGPR) — A/B testing active
- Marketo forms for CRM integration and lead scoring
- **Annual discount** anchoring on pricing page
- Testimonials placed strategically BEFORE pricing reveal (social proof priming)

### What MoveSmart Should Steal
- **Testimonials-before-pricing placement** — put social proof (real owner quote + result) immediately before the pricing section, not after
- **Multi-step form** for the main lead capture — "Step 1: Tell us about your property" reduces friction vs one long form
- **Soft green + dark navy + warm orange** palette as a reference — feel warm and trustworthy without being cold/corporate
- **Exit-intent modal** with a soft offer ("Get our free Ontario rental market pricing guide")
- **Annual vs monthly toggle** on pricing to show savings and create anchoring
- **Specific red/green comparison in pricing tables** — if MoveSmart has a full-service vs basic package, a comparison table with clear visual signals sells the upgrade

---

## Cross-Competitor Pattern Analysis

### What Every Good Site Does (Must-Haves)
1. **Sticky navigation** — all 6+ viable sites use it
2. **Social proof above the fold** or within 1 scroll — logos, numbers, or quotes
3. **Demo / proposal request** as primary CTA, not a contact form
4. **No publicly visible pricing** on homepage — all route to proposal/demo/pricing subpage
5. **Mobile-responsive cards** that stack from multi-column to single column
6. **Card hover states** — `translateY(-3 to -5px)` lift + shadow expansion

### What Differentiates the Best Sites
1. **Outcome-first headline framing** (ownwell.ca) vs service-first ("Property Management Services")
2. **Atmospheric gradient backgrounds** (PropertyManagement.com) instead of stock photography
3. **Scroll-triggered animations** (ownwell.ca word highlights)
4. **Audience segmentation at entry** (FirstService — board members / residents / developers)
5. **Specific, verifiable statistics** with decimal precision ("68% avg. open rate") — precision signals authenticity
6. **Typography differentiation** — Unbounded, Rokkitt, Playfair Display all stand out vs commodity sans-serifs
7. **Multi-step forms** instead of single-page contact forms (Buildium)
8. **Testimonials BEFORE pricing** (Buildium)

### What No Local Ontario Competitor Does (MoveSmart Opportunity)
- **White-glove brand narrative** — no local competitor communicates care, curation, or premium experience in their design
- **Tenant-focused design language** — competitors address landlords only; MoveSmart can speak to both audiences visually
- **Video social proof** — none of the local players use video testimonials
- **Process visualization** — none show a clear, designed "how it works" journey
- **Personality in the design** — all local competitors are interchangeable; brand voice can be expressed visually through illustration, color, and copy style

---

## Prioritized Steal List for MoveSmart

| Priority | Pattern | Source | Effort |
|----------|---------|---------|--------|
| 1 | Outcome-first headline ("Place your tenant in 14 days, guaranteed") | ownwell.ca | Copy rewrite only |
| 2 | Specific stat bar: "X properties, Y days avg vacancy, Z% renewal rate" | ownwell.ca + PropertyVista | Design component |
| 3 | Testimonials placed BEFORE pricing reveal | Buildium | Section reorder |
| 4 | Audience segmentation split: Owner vs Tenant pathways | FirstService | New section |
| 5 | Multi-step lead form (Step 1 of 3: property type) | Buildium | Dev work |
| 6 | Annual/monthly toggle on pricing | Buildium | Dev work |
| 7 | Lead magnet: free PDF ("Ontario Tenant Screening Checklist") | FirstService | Content creation |
| 8 | Scroll-triggered word highlight animation | ownwell.ca | CSS animation |
| 9 | Gradient background section without photography | PropertyManagement.com | CSS/design |
| 10 | Button underline slide animation on hover | FirstService | CSS micro-interaction |
| 11 | "Request a Proposal" CTA framing (not "Get a Quote") | FirstService | Copy tweak |
| 12 | Exit-intent modal with soft offer | Buildium | Dev + content |
| 13 | 5-second auto-rotating feature showcase tabs | PropertyVista | Component build |
| 14 | Red/green comparison table for packages | Buildium | Design + dev |

---

## Typography Shortlist for MoveSmart Consideration

Based on what competitors use and gaps available:

| Font | Used By | Positioning |
|------|---------|-------------|
| Playfair Display | FirstService | Premium, editorial, legacy trust |
| Unbounded | PropertyManagement.com | Bold, modern, tech-forward |
| Rokkitt | PropertyVista | Authoritative slab serif, distinctive |
| Nunito | Zeevou | Friendly, rounded, approachable |
| Open Sans | Buildium | Clean, neutral, accessible |
| **DM Serif Display** | *(none — open opportunity)* | Warm editorial serif, human, boutique |
| **Cabinet Grotesk** | *(none — open opportunity)* | Modern, premium, personality |

**Recommendation:** A pairing of **DM Serif Display** (headlines) + **Inter** or **Cabinet Grotesk** (body) would be immediately distinctive in this market — no direct competitor uses this combination, and it would communicate white-glove positioning through typography alone.

---

## Color Palette Gap Analysis

| Competitor | Primary | Accent | Feeling |
|-----------|---------|--------|---------|
| Ownwell.ca | `#286BEC` blue | Lavender | Professional SaaS |
| PropertyManagement.com | OKLCH green | OKLCH blue | Tech-forward |
| FirstService | `#373F51` navy | `#B0E9FE` light blue | Corporate/luxury |
| PropertyVista | `#02718C` teal | `#00D3FF` cyan | Generic tech |
| Zeevou | `#009688` teal | `#E30168` magenta | Friendly, energetic |
| Buildium | `#73B680` soft green | `#ff5c23` orange | Warm, trustworthy |
| RentalPM.ca | `#133837` dark teal | `#D2F0EA` mint | Quiet, dated |

**Gap:** No Ontario PM competitor uses **warm amber/gold + deep green** or **off-white + forest + copper** — these palette directions would be immediately distinctive and communicate quality/care without the cold corporate blue that dominates the space.

---

*Sources consulted during research:*
- [ownwell.ca](https://ownwell.ca) — fetched directly
- [propertymanagement.com](https://propertymanagement.com) — fetched directly
- [fsresidential.com/ontario](https://www.fsresidential.com/ontario/) — fetched directly (firstservice.com/en-CA returned 404)
- [rentalpropertymanagementca.wordpress.com](https://rentalpropertymanagementca.wordpress.com/) — via redirect from rentalpropertymanagement.ca
- [propertyvista.com](https://propertyvista.com) — fetched directly
- [zeevou.com](https://zeevou.com) + [zeevou.com/features](https://zeevou.com/features/) — fetched directly; CSS-level analysis only (minified JS prevented full render analysis)
- [buildium.com](https://buildium.com) — fetched directly
- [mainstreetrental.ca](https://mainstreetrental.ca) — unreachable (ECONNREFUSED); excluded from analysis
- [zeevou.com/blog/zeevou-2025-recap-a-year-in-review/](https://zeevou.com/blog/zeevou-2025-recap-a-year-in-review/)
- [buildium.com/pricing/](https://www.buildium.com/pricing/)
- [capterra.com Buildium pricing](https://www.capterra.com/p/47428/Buildium-Property-Management-Software/pricing/)
