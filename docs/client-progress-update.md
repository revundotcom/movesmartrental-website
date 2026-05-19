# MoveSmart Rentals — Website Progress Update

**Prepared for:** Client review meeting
**Date:** May 18, 2026
**Status:** Mid-cycle update — active workstreams + roadmap

---

## 1 · Executive Summary

The MoveSmart Rentals website is being upgraded across **all primary pages** with a focus on:

1. **Real product feel** — live property listings pulled from the Revun portal API (no more static placeholders), portal account links, deep-linked tour/offer flows.
2. **Sharper structure & UX** — rebuilt page layouts, cleaner hero sections, consistent imagery, less wasted whitespace.
3. **Conversion-focused additions** — Rent vs Buy calculator, refined contact form, social proof on every page.
4. **Industry-credible data** — every tool now cites CMHC + Statistics Canada (instead of generic "market data" claims).

This document covers **what is currently being worked on**, **what is planned next**, and the **technical groundwork already in place**.

---

## 2 · Currently Active Workstreams

These are the open changes you are seeing in flight.

### 2.1 Hero Section Overhaul (Homepage)

The previous hero section is being restructured per your direction in the call.

- **New headline + sub-copy** reflecting the latest brand voice (full-service leasing, not "white-glove")
- **Properties CTA button** added as a primary action (so visitors can jump directly to live listings)
- **Trust line under the CTAs** ("500+ landlords trust us · 4.9 / 5 across 200+ reviews")
- **Dashboard mock-up illustration** retained on the right side (the existing portal preview)
- **Cleaner stat strip** (Units leased · Cities served · Avg placement days · Live coverage)

**Why this matters:** the old hero buried the "Properties" entry-point. Now it's the second-most prominent CTA after "Create Account," matching the production site's convention.

### 2.2 Property Section — Gallery Layout (`/properties/`)

Rebuilding the property listings page to behave like **condos.ca** (the user-facing rental directory the client referenced).

**In progress:**
- **Gallery card grid** with consistent aspect-ratio images (no more dark placeholder tiles)
- **Filter bar pinned to the top** — Search by address/neighbourhood + City + Bedrooms + Price range + Property type
- **Property count** ("Showing 73 of 73 live listings") so users always see scope
- **Map view toggle** *(planned — Phase 2 once filters stabilize)*
- **Compare up to 3** *(planned — Phase 2)*

**Already live:**
- Page now fetches **every property** across all paginated API pages (was previously 1 page at a time)
- Real listings from the Revun portal — Toronto, Vaughan, Kitchener, Mississauga, etc.
- Property detail page (`/properties/[slug]`) with full media gallery, amenities, building info, and similar properties

### 2.3 Rent vs Buy Calculator *(new feature)*

A new interactive tool being added to help tenant-side visitors evaluate whether renting through MoveSmart makes more financial sense than buying.

**Planned design:**
- 3 inputs: City · Bedrooms · Down-payment available
- Side-by-side comparison: 5-year rent cost (with MoveSmart placement) vs 5-year buy cost (mortgage + property tax + maintenance + opportunity cost on down payment)
- Data sources cited inline: **CMHC Rental Market Report** + **Bank of Canada mortgage rates** + **Statistics Canada housing index**
- Sharable result card (so users can email / save their estimate)

**Placement:** Tenants page + Owners page (as proof that renting is a credible long-term decision)

### 2.4 Owners Page Updates

Per the call, restructuring the Owners hub to better walk landlords through the value proposition.

**In progress:**
- Tighter hero with crisper value prop
- Removed broken "Leasing Playbook" timeline (was visually cramped per prior feedback)
- Refreshed editorial image bridges
- "What you get" feature grid being polished
- Portal feature strip already simplified

### 2.5 Pricing Page Changes

**In progress:**
- Hero is now balanced (4-up stat strip added to the left to match the typographic `$0 / One-time` aside on the right)
- Animated `$0` callout with pulsing emerald glow ring
- Two new editorial image bridges (Zero-Upfront explainer + full-width banner)
- Outcome guarantee section with `BadgeCheck` icon visual

**Planned:**
- Comparison table polish ("Us vs. Traditional PM" with checkmarks/crosses)
- Inline "calculate your savings" widget tied to the rent calculator

### 2.6 Contact Page Improvement

Full restructure complete.

- **New single-page contact form** (was multi-step) — all fields visible, owner-conditional Property Type + Units chips
- **Phone field auto-formats** to `(123) 456-7890` (required by the portal API)
- **Main contact grid** — reach options (Call / Email / Book a call) side-by-side with the form
- **What happens next** trust panel inline
- **Office + Google Maps embed** in a clean 2-column layout
- **Social proof block** (review snippets + accreditation badges + aggregate stats) replacing the previous stock-photo team bios
- **FAQ + single closing CTA**

### 2.7 Reviews Section Overhaul (`/reviews/`)

Rebuilt from chaotic "editorial magazine" experiment to a clean, scannable layout.

- **Featured review** (one large card, 5 gold stars, verified-Google badge)
- **4-up trust sources grid** (Google · BBB · Realtor.ca · Yelp with platform colors)
- **Filterable review card grid** with city filter chips and live counts
- **3 case study cards** with Before/After + property images + outcome stats
- **Accreditation badge grid** (BBB / TRESA / PMAO / CRA Compliant)

### 2.8 Franchising Page Updates

- Hero balanced (added 4-up meta strip: Markets · Brand age · Tech stack · Lead pipeline)
- New body image bridges added (open office + Toronto cityscape)
- Franchise Snapshot spec sheet preserved on the right rail

---

## 3 · Per-Page Status Matrix

| Page | Status | Key changes |
|---|---|---|
| Home (`/`) | 🟡 In progress | Hero overhaul + Properties CTA + Rent vs Buy calculator |
| Owners (`/owners/`) | 🟡 In progress | Restructure + image polish, broken timeline removed |
| Tenants (`/tenants/`) | 🟡 In progress | Hero aside extended, city tiles now have real city imagery |
| Properties (`/properties/`) | ✅ Live + 🟡 polish | All 73 listings now showing, filters live, gallery layout in flight |
| Property detail (`/properties/[slug]`) | ✅ Live | Full gallery, Schedule Tour / Reserve Offer CTAs deep-linked to portal |
| Services (`/services/`) + 9 service-detail pages | ✅ Polished | Banner images, lease-signing imagery, all 9 services have correct imagery |
| Solutions: Developers / Property Managers / Institutional | ✅ Polished | Body images added, hero asides extended |
| Pricing (`/pricing/`) | 🟡 In progress | Animated $0, 2 new image bridges, meta strip added |
| Franchising (`/franchising/`) | 🟡 In progress | Hero balanced, body images added |
| Locations (`/locations/`) | ✅ Polished | Canadian cityscape imagery added |
| About (`/about/`) | ✅ Polished | Toronto downtown + team meeting images added |
| Reviews (`/reviews/`) | ✅ Rebuilt | Cleaner structure, real social proof, case studies |
| Contact (`/contact/`) | ✅ Rebuilt | New inline form, Google Maps, social proof block |
| Portal & Technology (`/portal-and-technology/`) | ✅ Rebuilt | Tabbed product showcase with 7 dashboard mockups |
| FAQ (`/faq/`) | ✅ Cleaned | "Still have questions?" block removed |

Legend: ✅ Live · 🟡 Active workstream · ⚪ Planned (Phase 2)

---

## 4 · New Features Being Added

| Feature | Where | Status |
|---|---|---|
| **Properties button in nav + hero CTAs** | Site-wide + Home hero | 🟡 In progress (nav already has emerald-pill "Properties" top-level) |
| **Rent vs Buy calculator** | Tenants + Owners pages | 🟡 Building |
| **Full property gallery layout** (condos.ca style) | `/properties/` | 🟡 Migrating from card grid to gallery |
| **Map view for properties** | `/properties/` | ⚪ Phase 2 |
| **Saved properties / favorites** | Property cards | ⚪ Phase 2 (requires portal account) |
| **Share property card** | Property detail | ⚪ Phase 2 |
| **Inline lease-cost estimator** | Pricing page | ⚪ Phase 2 |

---

## 5 · Technical Groundwork Already in Place

This is what's been built behind the scenes so all the visible changes work end-to-end.

### 5.1 Revun Portal API Integration *(complete)*
- **Lead form** → `POST portal.revun.com/api/lead-submit` (forwards every contact form / rental analysis submission to Zoho CRM)
- **Property listings** → `GET portal.revun.com/api/properties` (with `page` param + auto-fetch-all pagination)
- **Property detail** → `GET portal.revun.com/api/property/{slug}` (full unit data + building info + similar properties)
- **Auth links** → "Login" / "Create Account" buttons point to `portal.revun.com/login` and `portal.revun.com/register`
- **Schedule a Tour** → deep link to `portal.revun.com/showing/schedule/{unit_zcrm_id}` (pulled live from listing API)
- **Reserve Offer** → deep link to `portal.revun.com/offer/reserve/{unit_zcrm_id}`

### 5.2 Brand consistency *(complete)*
- "Book a Call" CTA removed everywhere except `/contact/`
- "Still have questions?" duplicate block removed site-wide
- "Apply" entry removed from nav (redundant with contact form)
- All Unsplash images verified — broken/wrong photos (face-wash beauty product, missing image IDs) replaced
- Data source attribution updated: "Based on 2026 market data" → **"Based on CMHC Rental Market Report + Statistics Canada"** on every tool

### 5.3 Navigation *(complete)*
- "Properties" promoted to **top-level nav** with emerald-pill styling for visibility
- Old `/rentals/` URLs **308 permanent redirect** to `/properties/` (no broken links)
- Mobile nav mirrors desktop structure

### 5.4 Portal dashboard showcase *(complete)*
- 7 HTML/CSS dashboard mockups built (Owner Dashboard · Properties · Showings & Offers · Analytics · Wallet · Owner Services · Events Calendar)
- Wrapped in faux browser frames (3-dot chrome + URL bar)
- Displayed as a **tabbed product showcase** on `/portal-and-technology/` (Stripe-style switcher)

---

## 6 · Visual & UX Improvements

### Imagery
- Every page now has **content-matched HD Unsplash imagery** (real estate, property managers, Canadian cityscapes — not generic stock)
- City tiles on the Tenants page now show actual city imagery (Toronto CN Tower, Ottawa cityscape, etc.)
- Service detail pages have slug-keyed banner images (one per service)

### Animations
- Framer Motion scroll-reveals on every major section
- Animated `$0` callout on the pricing page (pulsing emerald glow)
- Smooth tab transitions on the portal showcase
- Magnetic hover on primary CTAs

### Whitespace fixes
- Hero asides on Pricing + Franchising now balance the left content (no dead space below CTAs)
- Tenants page hero aside extended with Popular Cities + strong "See all live listings" CTA
