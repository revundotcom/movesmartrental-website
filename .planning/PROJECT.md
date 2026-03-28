# MoveSmartRentals.com — Website Rebuild + SEO System

## What This Is

A complete production-ready website rebuild and SEO/content system for MoveSmartRentals.com — a technology-enabled rental and leasing platform serving property owners and tenants across Canada and the United States. The system must generate both property-owner leads and tenant leads organically through search-dominant architecture, scalable content, structured data, and AI discoverability. Built on Next.js 15 + Sanity CMS + Vercel, deployed to client's REVUN GitHub account.

## Core Value

A search-dominant acquisition system that attracts both property owners and tenants organically, converts them through clear calls to action, and can be expanded rapidly into new local markets without rebuilding the architecture each time.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Complete website rebuild with 22+ template types on Next.js 15 + Sanity CMS + Vercel
- [ ] Dual-audience architecture serving both property owners AND tenants under one coherent site
- [ ] 10-item top navigation: Home, Owners, Tenants, Services, Locations, Pricing, Resources, Franchising, About, Contact
- [ ] Full footer with core services, owner resources, tenant resources, Ontario locations, US locations, franchising, privacy, terms, support, blog, contact, account links
- [ ] Homepage as routing page with hero, CTAs (Create Free Account + Book a Call), owner problem/solution, service grid, owner portal section, tenant journey, featured cities, North America expansion, franchising preview, FAQ, final CTA
- [ ] Owner-lead SEO system targeting landlord/investor/owner search intent with localized service pages
- [ ] Tenant-lead SEO system with rental category pages (apartments, condos, townhouses, houses, bedroom counts)
- [ ] Property page SEO with unique titles, meta descriptions, H1, schema, internal linking
- [ ] Geographic URL architecture: /ca/ (5 provinces) and /us/ (10 states) with city pages
- [ ] 16+ page families per city (tenant-placement, leasing-services, tenant-screening, rent-guarantee, tenant-insurance, tenant-guarantor, rental-preparation, portal-and-technology, how-to-find-tenants, tenant-screening-guide, rental-market-guide, eviction-guide, how-to-price-your-rental, how-to-avoid-bad-tenants, landlord-faq, tenant-faq, apartments-for-rent, condos-for-rent, houses-for-rent, townhouses-for-rent, bedroom-count pages)
- [ ] Ontario priority: 20 Tier-1 cities (Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Kitchener, Waterloo, Cambridge, Guelph, Barrie, Milton, Oshawa, Ajax, Pickering)
- [ ] US states framework: Florida, Texas, California, New York, Illinois, Georgia, North Carolina, Arizona, Colorado, New Jersey
- [ ] Structured CMS with 9 content types (Province/State, City, Service, Service+City, Blog/Guide, Comparison, Case Study, Property Category, Property Detail) each with 15-20+ fields
- [ ] Non-developer daily publishing workflow (content team publishes without dev tickets)
- [ ] Schema markup: Organization, LocalBusiness, FAQ, Service, Article, BreadcrumbList, RealEstateListing
- [ ] Technical SEO: SSL/HTTPS, canonical tags, breadcrumbs, robots.txt, segmented XML sitemaps, 404 handling, redirects, trailing-slash normalization, lowercase normalization
- [ ] Analytics: GA4, GTM, Google Search Console, Bing Webmaster Tools with event tracking (account-creation, book-a-call, contact form, scroll depth, outbound clicks, phone/email clicks, city-to-service CTR, service-to-account conversion)
- [ ] Zoho SalesIQ chat integration
- [ ] Core Web Vitals optimization (LCP <2.5s, INP <200ms, CLS <0.1)
- [ ] AI/LLM discoverability optimization (ChatGPT, Claude, Gemini, Perplexity, Grok)
- [ ] Content production SOPs, prompt frameworks, publishing workflows, editorial QA
- [ ] Full handoff: code in REVUN GitHub, credentials transferred, deployment documented, training delivered
- [ ] Reporting dashboard for rankings, organic sessions, indexed pages, conversions, top landing pages

### Out of Scope

- Native mobile app — web-first responsive approach
- Payment processing / e-commerce — not part of current contract
- User authentication / tenant portal backend — only frontend pages and CTAs
- Real-time property search API — using CMS-managed listings
- French language / bilingual content — English-first, Quebec bilingual deferred
- Property management software / backend operations — website and SEO only
- Google Ads / paid media campaigns — organic-only contract
- Link building / outreach campaigns — on-page SEO and content only

## Context

**Client:** Revun (company operating MoveSmart Rentals)
**Contractor:** Gaurav Saini (Saksham's client)
**Current site:** WordPress on Cloudways, 7 pages, NOT indexed in Google, 3-5% complete vs contract
**Contract:** CAD $2,000 total ($500 deposit, $500 at April 10 milestone, $1,000 at final launch)
**Competitors:** Zillow (5.2M pages), Zumper (US+Canada), PadMapper, Kijiji, Realtor.ca, Realtor.com

**Source Manual:** 17-page MoveSmart Rentals SEO System and Website Restructure manual incorporated as Schedule E

**Key owner messaging points (contract-required):**
- Nothing due upfront for standard leasing success fee
- Self-serve online without calling
- Dedicated account manager available
- Technology plus brick-and-mortar execution
- Portal visibility into showings, applications, screening, approvals, inspections, communications
- Property preparation services
- MLS and multi-platform distribution
- Structured, documented, transparent screening
- Rent protection and partner insurance pathways

## Constraints

- **Timeline**: April 24, 2026 hard deadline (TIME IS OF THE ESSENCE clause) — 29 calendar days from March 26
- **Milestones**: April 3 (architecture), April 10 (core build), April 17 (remaining items), April 24 (launch + handoff)
- **Budget**: CAD $2,000 fixed contract price — leverage agent orchestration to deliver $45K-127K market-value scope
- **Tech Stack**: Next.js 15 (App Router) + Sanity Studio v3 + Vercel Pro + GitHub (REVUN account)
- **Source Control**: All code must be in client's REVUN GitHub account
- **Hosting**: Client-controlled domain and infrastructure (Vercel)
- **No Black Hat**: No spammy, deceptive, auto-generated thin pages, or policy-violating SEO
- **No Duplicate Content**: City pages must have meaningful localization, not just city name swaps
- **Indexable Content**: Critical listing info must be in rendered HTML, not hidden behind JS
- **SalesIQ**: Must be fully implemented as current chat layer
- **30-Day Warranty**: Post-launch defect correction at no additional charge

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 + Sanity + Vercel stack | Only combo that can approach timeline — Sanity is managed (no DevOps), Vercel is zero-config, composable blocks create 22+ templates from ~10 components | — Pending |
| Composable block system | Build ~10 reusable content blocks (Hero, CTA, FAQ, ServiceGrid, etc.) and compose into 22+ page templates | — Pending |
| Programmatic city page generation | Use generateStaticParams() with ISR for geography pages — cannot hand-build 1000+ pages | — Pending |
| Ontario-first rollout | Focus on 20 Tier-1 Ontario cities first, then expand to other provinces and US states | — Pending |
| Sanity.io Growth Plan | $374/mo for 5-person team, supports 20+ custom fields, non-developer publishing, real estate CMS support | — Pending |
| Tailwind CSS v4 + shadcn/ui | Rapid UI development with consistent design system, accessible components | — Pending |

---
*Last updated: 2026-03-28 after initialization*
