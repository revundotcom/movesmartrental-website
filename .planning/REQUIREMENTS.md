# Requirements: MoveSmartRentals.com

**Defined:** 2026-03-28
**Core Value:** A search-dominant acquisition system that attracts both property owners and tenants organically and can be expanded rapidly into new local markets without rebuilding.

## v1 Requirements

### Foundation & Architecture

- [x] **FOUND-01**: Next.js 15 App Router project scaffolded with TypeScript, Tailwind v4, shadcn/ui
- [x] **FOUND-02**: Sanity Studio v3 (Free Tier) configured with all 9 content types and structured field schemas
- [x] **FOUND-03**: Vercel deployment with automatic SSL, edge CDN, ISR support
- [x] **FOUND-04**: GitHub repo in client's REVUN account with full source code
- [x] **FOUND-05**: URL architecture implemented: /ca/{province}/{city}/{service}/ and /us/{state}/{city}/{service}/
- [x] **FOUND-06**: On-demand ISR strategy with Sanity webhook-triggered revalidation (revalidateTag)
- [x] **FOUND-07**: metadataBase set in root layout, trailing-slash normalization, lowercase URL enforcement

### Navigation & Layout

- [x] **NAV-01**: 10-item top navigation: Home, Owners, Tenants, Services, Locations, Pricing, Resources, Franchising, About, Contact
- [x] **NAV-02**: Full footer with core services, owner resources, tenant resources, Ontario locations, US locations, franchising, privacy, terms, support, blog, contact, account links
- [x] **NAV-03**: Mobile-responsive hamburger navigation with all items accessible
- [x] **NAV-04**: Breadcrumb system with BreadcrumbList schema on all pages

### Composable Block System

- [x] **BLOCK-01**: Hero block (headline, subheadline, CTAs, background image)
- [x] **BLOCK-02**: CTA block (primary + secondary call-to-action with form variant)
- [x] **BLOCK-03**: FAQ block with FAQ schema markup
- [x] **BLOCK-04**: ServiceGrid block (linked service cards)
- [x] **BLOCK-05**: CityGrid block (linked city cards with location data)
- [x] **BLOCK-06**: PropertyCard block (listing preview with key details)
- [x] **BLOCK-07**: TrustBlock (social proof, stats, testimonials)
- [x] **BLOCK-08**: HowItWorks block (numbered steps process)
- [x] **BLOCK-09**: PainPoint block (problem/solution layout)
- [x] **BLOCK-10**: BenefitsBlock (feature/benefit cards)

### Page Templates (22+)

- [x] **TMPL-01**: Homepage template (routing page with all contract-required sections)
- [x] **TMPL-02**: Owners hub template
- [x] **TMPL-03**: Tenants hub template
- [x] **TMPL-04**: Services hub template
- [x] **TMPL-05**: Locations hub template
- [x] **TMPL-06**: Pricing page template
- [x] **TMPL-07**: Resources hub template
- [x] **TMPL-08**: Franchising page template
- [x] **TMPL-09**: About page template
- [x] **TMPL-10**: Contact page template
- [x] **TMPL-11**: FAQ hub template
- [x] **TMPL-12**: Blog/guide template
- [x] **TMPL-13**: Province/state template
- [x] **TMPL-14**: City template
- [x] **TMPL-15**: Service template
- [x] **TMPL-16**: Service-plus-city template (highest-value SEO page)
- [x] **TMPL-17**: Legal guide template
- [x] **TMPL-18**: Market guide template
- [x] **TMPL-19**: Comparison template
- [x] **TMPL-20**: Case study/testimonial template
- [x] **TMPL-21**: Portal-and-technology template
- [x] **TMPL-22**: Property category template (tenant searches)
- [x] **TMPL-23**: Property detail template

### Owner-Lead SEO System

- [x] **OWN-01**: Owner-facing pages targeting landlord, investor, property-owner search intent
- [x] **OWN-02**: Commercial service pages: tenant placement, leasing services, tenant screening, rent guarantee, rental preparation, rental marketing, portal technology, pricing
- [x] **OWN-03**: Localized service pages for each Ontario Tier-1 city (20 cities x 8 services = 160 pages)
- [x] **OWN-04**: Owner-facing CTAs: Create Free Account, Submit Property, Book a Call, Request Services
- [x] **OWN-05**: Contract-required owner messaging: nothing upfront, self-serve online, dedicated account manager, tech + brick-and-mortar, portal visibility, property prep, MLS distribution, structured screening, rent protection

### Tenant-Lead SEO System

- [x] **TEN-01**: Tenant hub with city rental pages, property type categories
- [x] **TEN-02**: Property type category pages per city: apartments-for-rent, condos-for-rent, houses-for-rent, townhouses-for-rent
- [x] **TEN-03**: Bedroom-count pages where inventory supports: 1-bedroom, 2-bedroom, 3-bedroom apartments
- [x] **TEN-04**: Tenant FAQ, application flow, tenant insurance, guarantor/co-signer pages
- [x] **TEN-05**: Search/filter experience with critical listing info in crawlable rendered HTML (NOT JS-hidden)

### Geographic Rollout

- [x] **GEO-01**: /ca/ country hub page
- [x] **GEO-02**: 5 Canadian province pages: Ontario, Quebec, British Columbia, Alberta, Nova Scotia
- [x] **GEO-03**: /us/ country hub page
- [ ] **GEO-04**: 10 US state pages: Florida, Texas, California, New York, Illinois, Georgia, North Carolina, Arizona, Colorado, New Jersey
- [x] **GEO-05**: 20 Ontario Tier-1 city pages with full page families (Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Vaughan, Markham, Richmond Hill, Oakville, Burlington, Kitchener, Waterloo, Cambridge, Guelph, Barrie, Milton, Oshawa, Ajax, Pickering)
- [x] **GEO-06**: 16+ page families per Ontario city with localized content (not city-name-swaps)
- [x] **GEO-07**: City-priority matrix, slug map, page-status tracker, content-status tracker
- [ ] **GEO-08**: US state pages with city database, URL patterns, and publish-ready content architecture

### CMS & Content Engine

- [x] **CMS-01**: 9 structured content types in Sanity: Province/State, City, Service, ServiceCity, Blog/Guide, Comparison, CaseStudy, PropertyCategory, PropertyDetail
- [x] **CMS-02**: 15-20+ fields per content type including SEO title, meta description, OG fields, slug, keywords, hero, intro, pain-point, benefits, how-it-works, trust, FAQ, internal links, schema, images, CTA
- [x] **CMS-03**: Publishing controls: canonical, index/noindex, sitemap inclusion, redirect, author, dates
- [x] **CMS-04**: Non-developer daily publishing workflow (content team can publish without dev tickets)
- [x] **CMS-05**: Prompt framework for first-draft content generation
- [x] **CMS-06**: Weak-page refresh workflow using impressions, CTR, rank position data

### Technical SEO

- [x] **SEO-01**: SSL/HTTPS enforced
- [x] **SEO-02**: XML sitemaps segmented by page type (ca-cities, us-cities, ca-services, us-services, blog, listings, resources)
- [x] **SEO-03**: Robots.txt with sitemap reference and indexing controls
- [x] **SEO-04**: Canonical tags on all pages (self-referencing)
- [x] **SEO-05**: Open Graph fields (og:title, og:description, og:image) on every page
- [x] **SEO-06**: Meta titles 50-60 chars, meta descriptions 140-160 chars, one H1 per page
- [x] **SEO-07**: Image alt text describing actual image with location/service when relevant
- [x] **SEO-08**: 404 handling with custom error page, redirect logic
- [ ] **SEO-09**: Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
- [ ] **SEO-10**: Image compression, lazy loading (not for LCP image), WebP/AVIF via next/image

### Schema Markup

- [x] **SCHEMA-01**: Organization schema on homepage
- [x] **SCHEMA-02**: LocalBusiness/RealEstateAgent schema on city pages
- [x] **SCHEMA-03**: FAQ schema on all pages with FAQ sections
- [x] **SCHEMA-04**: Service schema on service pages
- [x] **SCHEMA-05**: Article/BlogPosting schema on blog/guide pages
- [x] **SCHEMA-06**: BreadcrumbList schema on all pages
- [x] **SCHEMA-07**: RealEstateListing schema on property detail pages

### Analytics & Tracking

- [x] **TRACK-01**: GA4 property configured and connected via GTM
- [x] **TRACK-02**: Google Search Console verified and connected
- [x] **TRACK-03**: Bing Webmaster Tools verified
- [ ] **TRACK-04**: Event tracking: account-creation clicks by page/city
- [ ] **TRACK-05**: Event tracking: book-a-call clicks by page/city
- [ ] **TRACK-06**: Event tracking: contact form submissions by page/city
- [ ] **TRACK-07**: Event tracking: scroll depth, outbound clicks, phone/email clicks
- [ ] **TRACK-08**: Event tracking: city-to-service CTR, service-to-account conversion
- [ ] **TRACK-09**: Reporting dashboard (Looker Studio or equivalent free tool)

### Integrations

- [x] **INT-01**: Zoho SalesIQ chat widget integrated via Script tag (lazyOnload)
- [x] **INT-02**: Google reCAPTCHA on contact/lead forms

### AI Discoverability

- [x] **AI-01**: Content structured for AI citation: direct answers in first 40-60 words, data points every 150-200 words
- [x] **AI-02**: Entity clarity: consistent "MoveSmart Rentals" naming, Organization schema
- [x] **AI-03**: llms.txt file for AI crawler guidance

### Handoff & Documentation

- [ ] **HAND-01**: Full source code in client's REVUN GitHub account
- [ ] **HAND-02**: Environment documentation (architecture, env vars, deployment process)
- [ ] **HAND-03**: CMS content model reference document
- [ ] **HAND-04**: Content production SOP with publishing workflow
- [ ] **HAND-05**: All credentials transferred (hosting, CMS, analytics, search console, tag manager)
- [ ] **HAND-06**: Training session delivered (CMS usage, content publishing, basic troubleshooting)

## v2 Requirements

### Expansion
- **EXP-01**: Full 100+ Ontario city rollout (Tier 2 and 3 cities)
- **EXP-02**: US city pages populated with localized content per state
- **EXP-03**: Bilingual French/English content for Quebec with hreflang
- **EXP-04**: Neighborhood/district pages within major cities

### Advanced Features
- **ADV-01**: Advanced property search with map integration
- **ADV-02**: User authentication / owner portal frontend
- **ADV-03**: Monthly automated rental market reports per city
- **ADV-04**: Rent calculator / ROI calculator interactive tools
- **ADV-05**: Review/testimonial collection system
- **ADV-06**: Google Business Profile management for multiple locations

## Out of Scope

| Feature | Reason |
|---------|--------|
| Native mobile app | Web-first responsive approach |
| Payment processing | Not in contract scope |
| Backend property management software | Website and SEO only |
| Google Ads / paid media campaigns | Organic-only contract |
| Link building / outreach | On-page SEO and content only |
| Real-time property search API | CMS-managed listings |
| Any paid tools/services beyond free tiers | Client constraint — zero monthly costs |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| BLOCK-01 | Phase 1 | Complete |
| BLOCK-02 | Phase 1 | Complete |
| BLOCK-03 | Phase 1 | Complete |
| BLOCK-04 | Phase 1 | Complete |
| BLOCK-05 | Phase 1 | Complete |
| BLOCK-06 | Phase 1 | Complete |
| BLOCK-07 | Phase 1 | Complete |
| BLOCK-08 | Phase 1 | Complete |
| BLOCK-09 | Phase 1 | Complete |
| BLOCK-10 | Phase 1 | Complete |
| CMS-01 | Phase 1 | Complete |
| CMS-02 | Phase 1 | Complete |
| CMS-03 | Phase 1 | Complete |
| SEO-01 | Phase 1 | Complete |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 1 | Complete |
| SEO-05 | Phase 1 | Complete |
| SEO-07 | Phase 1 | Complete |
| TMPL-01 | Phase 2 | Complete |
| TMPL-02 | Phase 2 | Complete |
| TMPL-03 | Phase 2 | Complete |
| TMPL-04 | Phase 2 | Complete |
| TMPL-05 | Phase 2 | Complete |
| TMPL-06 | Phase 2 | Complete |
| TMPL-07 | Phase 2 | Complete |
| TMPL-08 | Phase 2 | Complete |
| TMPL-09 | Phase 2 | Complete |
| TMPL-10 | Phase 2 | Complete |
| TMPL-11 | Phase 2 | Complete |
| TMPL-12 | Phase 2 | Complete |
| TMPL-13 | Phase 2 | Complete |
| TMPL-14 | Phase 2 | Complete |
| TMPL-15 | Phase 2 | Complete |
| TMPL-16 | Phase 2 | Complete |
| TMPL-17 | Phase 2 | Complete |
| TMPL-18 | Phase 2 | Complete |
| TMPL-19 | Phase 2 | Complete |
| TMPL-20 | Phase 2 | Complete |
| TMPL-21 | Phase 2 | Complete |
| TMPL-22 | Phase 2 | Complete |
| TMPL-23 | Phase 2 | Complete |
| OWN-01 | Phase 2 | Complete |
| OWN-02 | Phase 2 | Complete |
| OWN-03 | Phase 2 | Complete |
| OWN-04 | Phase 2 | Complete |
| OWN-05 | Phase 2 | Complete |
| TEN-01 | Phase 2 | Complete |
| TEN-02 | Phase 2 | Complete |
| TEN-03 | Phase 2 | Complete |
| TEN-04 | Phase 2 | Complete |
| TEN-05 | Phase 2 | Complete |
| GEO-05 | Phase 2 | Complete |
| GEO-06 | Phase 2 | Complete |
| SEO-02 | Phase 2 | Complete |
| SEO-06 | Phase 2 | Complete |
| SEO-08 | Phase 2 | Complete |
| SCHEMA-01 | Phase 2 | Complete |
| SCHEMA-02 | Phase 2 | Complete |
| SCHEMA-03 | Phase 2 | Complete |
| SCHEMA-04 | Phase 2 | Complete |
| SCHEMA-05 | Phase 2 | Complete |
| SCHEMA-06 | Phase 2 | Complete |
| SCHEMA-07 | Phase 2 | Complete |
| AI-01 | Phase 2 | Complete |
| AI-02 | Phase 2 | Complete |
| GEO-01 | Phase 3 | Complete |
| GEO-02 | Phase 3 | Complete |
| GEO-03 | Phase 3 | Complete |
| GEO-04 | Phase 3 | Pending |
| GEO-07 | Phase 3 | Complete |
| GEO-08 | Phase 3 | Pending |
| CMS-04 | Phase 3 | Complete |
| CMS-05 | Phase 3 | Complete |
| CMS-06 | Phase 3 | Complete |
| TRACK-01 | Phase 3 | Complete |
| TRACK-02 | Phase 3 | Complete |
| TRACK-03 | Phase 3 | Complete |
| TRACK-04 | Phase 3 | Pending |
| TRACK-05 | Phase 3 | Pending |
| TRACK-06 | Phase 3 | Pending |
| TRACK-07 | Phase 3 | Pending |
| TRACK-08 | Phase 3 | Pending |
| TRACK-09 | Phase 3 | Pending |
| INT-01 | Phase 3 | Complete |
| INT-02 | Phase 3 | Complete |
| AI-03 | Phase 3 | Complete |
| SEO-09 | Phase 4 | Pending |
| SEO-10 | Phase 4 | Pending |
| HAND-01 | Phase 4 | Pending |
| HAND-02 | Phase 4 | Pending |
| HAND-03 | Phase 4 | Pending |
| HAND-04 | Phase 4 | Pending |
| HAND-05 | Phase 4 | Pending |
| HAND-06 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 105 total
- Mapped to phases: 105
- Unmapped: 0

Phase breakdown:
- Phase 1: 29 requirements (FOUND-01-07, NAV-01-04, BLOCK-01-10, CMS-01-03, SEO-01/03/04/05/07)
- Phase 2: 47 requirements (TMPL-01-23, OWN-01-05, TEN-01-05, GEO-05-06, SEO-02/06/08, SCHEMA-01-07, AI-01-02)
- Phase 3: 21 requirements (GEO-01-04/07-08, CMS-04-06, TRACK-01-09, INT-01-02, AI-03)
- Phase 4: 8 requirements (SEO-09-10, HAND-01-06)

---
*Requirements defined: 2026-03-28*
*Last updated: 2026-03-28 — traceability updated after roadmap creation*
