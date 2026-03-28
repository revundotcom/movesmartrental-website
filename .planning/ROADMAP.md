# Roadmap: MoveSmartRentals.com

## Overview

Four phases aligned to the four contract milestone dates. Phase 1 locks in all irreversible architecture decisions before any templates exist. Phase 2 builds every page template and populates the top 20 Ontario cities. Phase 3 scales geography, wires analytics and integrations, and delivers the content system. Phase 4 audits performance, hardens the site, and transfers full ownership to the client by April 24.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Architecture and CMS Foundation** - Next.js + Sanity scaffold, all 9 CMS schemas, 10 block components, URL structure, ISR strategy, and technical SEO baseline — due April 3
- [ ] **Phase 2: Core Build — Templates and Top Cities** - All 22+ page templates, owner/tenant hubs, top 20 Ontario cities, all 7 schema types, dynamic sitemaps — due April 10
- [x] **Phase 3: Scale, Integrations, and Content System** - Remaining cities and US state pages, analytics, SalesIQ, AI discoverability, content production SOP — due April 17 (completed 2026-03-28)
- [ ] **Phase 4: Audit, Hardening, and Handoff** - Core Web Vitals remediation, cross-browser testing, credential transfer, training, 30-day warranty commencement — due April 24

## Phase Details

### Phase 1: Architecture and CMS Foundation
**Goal**: A deployed Next.js + Sanity scaffold exists where every irreversible architectural decision is locked in — URL structure, ISR strategy, CMS schema shape, block component API, and technical SEO baseline — so that all subsequent phases build on a stable foundation that cannot be broken by late changes.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, NAV-01, NAV-02, NAV-03, NAV-04, BLOCK-01, BLOCK-02, BLOCK-03, BLOCK-04, BLOCK-05, BLOCK-06, BLOCK-07, BLOCK-08, BLOCK-09, BLOCK-10, CMS-01, CMS-02, CMS-03, SEO-01, SEO-03, SEO-04, SEO-05, SEO-07
**Success Criteria** (what must be TRUE):
  1. A visitor can reach the deployed Vercel URL and see a rendered Next.js page with correct HTTPS, trailing-slash normalization, and lowercase URL enforcement active
  2. Sanity Studio is accessible, all 9 content types appear with structured fields, and publishing a draft City document triggers on-demand ISR revalidation via webhook
  3. All 10 block components render visually correct in isolation with correct props (verified by opening each block in a local dev route)
  4. The nav header and footer render correctly on mobile and desktop, with breadcrumb markup present on any non-homepage route
  5. A canonical tag, Open Graph tags, and robots.txt are present and correct on the deployed root URL as verified by a browser inspector check
**Plans:** 6 plans

Plans:
- [x] 01-01-PLAN.md — Project scaffold, URL routing, middleware, SEO baseline
- [x] 01-02-PLAN.md — All 9 Sanity CMS schemas with required fields and publishing controls
- [x] 01-03-PLAN.md — Sanity data pipeline, ISR revalidation, SEO metadata, JSON-LD builders
- [x] 01-04-PLAN.md — Navigation (header, footer, mobile nav, breadcrumbs)
- [x] 01-05-PLAN.md — Block components batch 1 (Hero, CTA, FAQ, ServiceGrid, CityGrid)
- [x] 01-06-PLAN.md — Block components batch 2 (PropertyCard, Trust, HowItWorks, PainPoint, Benefits)

### Phase 2: Core Build — Templates and Top Cities
**Goal**: Every page template type is built and live, owner- and tenant-facing hubs are complete with all required sections, the top 20 Ontario Tier-1 cities have meaningful localized content, and all 7 JSON-LD schema types are validated — delivering the full contractual site scope ahead of the April 10 milestone.
**Depends on**: Phase 1
**Requirements**: TMPL-01, TMPL-02, TMPL-03, TMPL-04, TMPL-05, TMPL-06, TMPL-07, TMPL-08, TMPL-09, TMPL-10, TMPL-11, TMPL-12, TMPL-13, TMPL-14, TMPL-15, TMPL-16, TMPL-17, TMPL-18, TMPL-19, TMPL-20, TMPL-21, TMPL-22, TMPL-23, OWN-01, OWN-02, OWN-03, OWN-04, OWN-05, TEN-01, TEN-02, TEN-03, TEN-04, TEN-05, GEO-05, GEO-06, SEO-02, SEO-06, SEO-08, SCHEMA-01, SCHEMA-02, SCHEMA-03, SCHEMA-04, SCHEMA-05, SCHEMA-06, SCHEMA-07, AI-01, AI-02
**Success Criteria** (what must be TRUE):
  1. A user can navigate to the homepage and see all contract-required sections: hero with dual CTAs, owner problem/solution, service grid, portal section, tenant journey, featured cities, franchising preview, FAQ, and final CTA
  2. A property owner can browse the Owners hub, click into any of the 8 service pages, and see the full contract-required owner messaging (nothing upfront, self-serve, account manager, MLS distribution, portal visibility, structured screening, rent protection)
  3. A tenant can browse the Tenants hub, navigate to any of the 20 Ontario Tier-1 city pages, and see property-type category pages (apartments, condos, houses, townhouses) with crawlable HTML listings — not JS-hidden content
  4. Google's Rich Results Test returns valid structured data for at least one city page (LocalBusiness + FAQ + BreadcrumbList), one service page (Service schema), and the homepage (Organization schema)
  5. The dynamic XML sitemap returns at least the 20 Ontario city URLs and all service page URLs, and robots.txt references the sitemap correctly
**Plans:** 8/10 plans executed

Plans:
- [x] 02-01-PLAN.md — GROQ queries for all page templates + Portable Text component
- [x] 02-02-PLAN.md — New route files (property category, bedroom, property detail, FAQ) + 404 enhancement
- [ ] 02-03-PLAN.md — Homepage template with all 9 contract sections + Organization JSON-LD
- [x] 02-04-PLAN.md — Owners hub, Services hub, Service detail, Locations hub templates
- [ ] 02-05-PLAN.md — Tenants hub, Property category, Bedroom count, Property detail templates
- [ ] 02-06-PLAN.md — Province, City hub, CityService (highest-value SEO) templates
- [ ] 02-07-PLAN.md — Resources hub + Blog/Guide/Comparison/Case study content templates
- [ ] 02-08-PLAN.md — Pricing, About, Contact (with form), Franchising, FAQ hub templates
- [x] 02-09-PLAN.md — Dynamic XML sitemaps with 6 segments
- [ ] 02-10-PLAN.md — Ontario Tier-1 cities CMS content seeding (20 cities x 8 services)

### Phase 3: Scale, Integrations, and Content System
**Goal**: The Ontario city coverage expands to the full Tier-1 set with the full 16+ page family per city, US state framework pages are live for all 10 states, all analytics events fire correctly, Zoho SalesIQ is integrated without blocking render, and the content team has a self-service system to publish and expand without developer intervention.
**Depends on**: Phase 2
**Requirements**: GEO-01, GEO-02, GEO-03, GEO-04, GEO-07, GEO-08, CMS-04, CMS-05, CMS-06, TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, TRACK-06, TRACK-07, TRACK-08, TRACK-09, INT-01, INT-02, AI-03
**Success Criteria** (what must be TRUE):
  1. A user can navigate to /ca/ and /us/ country hubs, browse any of the 5 Canadian province pages and 10 US state pages, and each page has meaningful non-duplicate content (not city-name-swaps)
  2. GA4 real-time view shows a "book_a_call" event firing when a user clicks the Book a Call CTA, and a "create_account" event firing when the Create Free Account CTA is clicked — on both city pages and service pages
  3. Google Search Console shows the property as verified, the XML sitemap is submitted and accepted, and Bing Webmaster Tools shows the site as verified
  4. A non-developer content editor can log into Sanity Studio, create a new City document with all required local data fields completed, publish it, and see the page live on the site within 60 seconds without filing a dev ticket
  5. The Zoho SalesIQ chat widget appears on all pages and does not block page load (LCP measurement unaffected by the widget script)
**Plans:** 8/8 plans complete

Plans:
- [x] 03-01-PLAN.md — /ca/ and /us/ country hub pages + Canadian province CMS seeding
- [ ] 03-02-PLAN.md — US state seeding (10 states, 37 cities) + US page template enhancement
- [ ] 03-03-PLAN.md — City-priority matrix, slug map, content-status tracker
- [ ] 03-04-PLAN.md — GTM + GA4 + GSC/Bing verification + SalesIQ integration
- [x] 03-05-PLAN.md — reCAPTCHA v3 on contact form + llms.txt AI discoverability
- [ ] 03-06-PLAN.md — Event tracking layer (9 GTM event types wired to UI)
- [x] 03-07-PLAN.md — Content system: publishing SOP, prompt framework, weak-page refresh
- [ ] 03-08-PLAN.md — Reporting dashboard (Looker Studio guide) + analytics API

### Phase 4: Audit, Hardening, and Handoff
**Goal**: The site passes Core Web Vitals thresholds on real deployed pages, all defects found in cross-browser and mobile testing are resolved, and the client is independently operational — with all credentials transferred, all code in the REVUN GitHub account, and a training session delivered — before the April 24 hard deadline.
**Depends on**: Phase 3
**Requirements**: SEO-09, SEO-10, HAND-01, HAND-02, HAND-03, HAND-04, HAND-05, HAND-06
**Success Criteria** (what must be TRUE):
  1. PageSpeed Insights scores LCP <2.5s, INP <200ms, and CLS <0.1 on at least one Ontario city page and the homepage on both mobile and desktop
  2. The client can log into Sanity Studio using their own credentials, publish a new city page, and verify it appears live — without any involvement from the contractor
  3. All source code is in the client's REVUN GitHub account and a fresh clone-and-deploy produces a working site on Vercel
  4. The client has received written SOPs (with Loom walkthroughs) for: publishing a new city, triggering ISR revalidation, and checking GSC indexing status
  5. The Looker Studio reporting dashboard shows live data from GA4 and Search Console, and the client can read rankings, organic sessions, indexed pages, and conversion counts without external help
**Plans:** 4 plans

Plans:
- [ ] 04-01-PLAN.md — Core Web Vitals optimization + image delivery (WebP/AVIF, sizes, priority)
- [x] 04-02-PLAN.md — Environment documentation + credentials transfer document
- [ ] 04-03-PLAN.md — CMS content model reference + publishing SOP polish + training session guide
- [ ] 04-04-PLAN.md — Source code transfer checklist + clone-deploy verification

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Architecture and CMS Foundation | 6/6 | Complete | 2026-03-28 |
| 2. Core Build — Templates and Top Cities | 8/10 | In Progress|  |
| 3. Scale, Integrations, and Content System | 8/8 | Complete   | 2026-03-28 |
| 4. Audit, Hardening, and Handoff | 0/4 | Not started | - |
