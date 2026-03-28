# Project Research Summary

**Project:** MoveSmartRentals.com
**Domain:** Dual-audience rental property management website + programmatic SEO system
**Researched:** 2026-03-28
**Confidence:** HIGH (all 4 research areas verified against official documentation and current releases)

---

## Executive Summary

MoveSmartRentals.com is a marketing and SEO website — not an application — that must simultaneously serve two audiences (property owners and tenants) and rank across 1,600+ city/service URL combinations in Canada and the US. The recommended approach is Next.js 15.2.4 (App Router) + Sanity v3 CMS + Vercel Pro, with all SEO-critical content server-rendered via ISR and structured data injected as JSON-LD from pure TypeScript functions. The core technical architecture is four discrete layers: Sanity Content Lake as the single source of truth, Next.js as the rendering engine, Vercel's edge CDN as the delivery layer, and browser-side third-party integrations loaded non-blockingly. The critical architecture decision is the ISR strategy: pre-render only Tier-1 Ontario cities at build time (~320 pages), use on-demand ISR for the remainder, and let Sanity webhooks trigger `revalidateTag()` for content-driven cache invalidation. This approach scales from launch to 1,600+ pages without hitting Vercel's 45-minute build timeout.

The biggest opportunity — and the biggest risk — is the programmatic city page system. Done correctly, it creates a durable SEO moat across 100+ Ontario cities and 10 US states. Done incorrectly (city-name-swap thin content), Google's June 2025 Helpful Content enforcement will deindex pages en masse, with documented 4-12 month recovery windows. The prevention is not technical: it is CMS schema design that enforces locally-specific required fields before any city page can be published. This must be built into Phase 1 before a single page template is written.

The timeline is 29 calendar days to April 24. The recommended stack eliminates all upgrade risk (Next.js 15 instead of 16, which has 5 breaking changes), avoids DevOps overhead (managed Sanity, Vercel zero-config), and uses shadcn/ui to save 2-3 days of accessible component work. The critical path is: Sanity schemas with required field enforcement → reusable block component system → CityService page template → ISR/webhook plumbing → remaining templates → analytics → handoff. That order is non-negotiable because each group has hard dependencies on the prior group.

---

## Key Findings

### Recommended Stack

The stack is deliberately conservative for a fixed-price 29-day contract. Every choice is the current stable version with the strongest official Next.js integration. The single most important version decision is **staying on Next.js 15.2.4 rather than upgrading to 16**: Next.js 16 has 5 breaking changes (middleware rename, fully async APIs, sitemap `id` as Promise, removal of `serverRuntimeConfig`, Turbopack default) that would consume sprint days without adding SEO value.

**Core technologies:**
- **Next.js 15.2.4:** App Router, ISR, `generateStaticParams`, built-in Metadata API, built-in `sitemap.ts` — the rendering engine for all 1,600+ pages
- **React 19.0.0:** Required by Next.js 15; Server Components are the rendering model for all ISR city pages
- **TypeScript 5.4+:** Type-safe GROQ query results and metadata payloads catch bugs before deployment on a tight deadline
- **Sanity Studio v3 (3.57+):** Managed headless CMS; non-developer publishing workflow; 9 structured content type schemas; real-time webhook triggers for ISR revalidation
- **next-sanity 12.1.1:** Only official Sanity/Next.js bridge — provides `sanityFetch()`, Draft Mode, Live Content API, webhook-driven ISR revalidation
- **Tailwind CSS v4.1:** CSS-first `@theme` directives, Rust engine (100x faster incremental builds), critical for rapid component composition in 29 days
- **shadcn/ui (CLI v4):** Generates owned, accessible Radix UI component source — no version lock-in; saves 2-3 days on Dialog, Form, Accordion, NavigationMenu, Breadcrumb
- **Vercel Pro:** Native ISR support; global edge CDN; preview deployments per branch for 4-milestone delivery cadence; 45-min build limit is the hard ceiling for all page generation decisions
- **@next/third-parties:** Official GTM/GA4 loading (post-hydration, non-blocking); replaces manual Script tag placement
- **react-hook-form + zod + @hookform/resolvers:** Standard validated form trio for Contact, Book a Call, and lead capture forms

**Critical note on Sanity pricing:** The PROJECT.md figure of $374/month appears outdated. Current Sanity Growth plan is $15/seat/month — a 5-person team is $75/month (~$510/month vs ~$102/month CAD). Confirm with client before billing assumptions are locked in.

See `.planning/research/STACK.md` for full version table, installation commands, and alternatives rejected.

### Expected Features

MoveSmartRentals serves three distinct feature sets: owner-facing, tenant-facing, and the SEO/content system that underpins both. The SEO system is the primary technical differentiator and the highest-complexity workstream.

**Must have — Owner side (table stakes):**
- Service explanation pages for all services (tenant placement, screening, rent guarantee, leasing, portal, preparation)
- Clear pricing page with "nothing due upfront" success-fee model surfaced prominently
- Province-specific compliance framing (LTB references for Ontario)
- Testimonials with city, name, and specific outcome (generic testimonials actively hurt trust)
- FAQ section with FAQPage schema markup
- Location-based city service pages across 100+ Ontario cities

**Must have — Tenant side (table stakes):**
- Rental listings by city and property type (CMS-managed, indexable HTML — no JS-only rendering)
- Bedroom count filter pages as separate indexable URLs (not JS filters)
- Property type pages as separate indexable URLs per city
- City overview pages with local context (average rent, transit, neighbourhood overview)
- Mobile-responsive design with Core Web Vitals compliance (LCP <2.5s)

**Must have — SEO system (table stakes):**
- Canonical tags, trailing-slash normalization, lowercase URL enforcement on all pages
- Segmented XML sitemaps (`sitemap-cities`, `sitemap-services`, `sitemap-blog`, `sitemap-properties`)
- Breadcrumb navigation + BreadcrumbList schema on all geographic pages
- Unique title tags, meta descriptions, and H1 per page (template-driven, not duplicated)
- Internal linking system from city hubs to all 16+ sub-pages
- All SEO-critical content in server-rendered HTML (no JS-hidden content)
- hreflang tags for CA/US geographic separation

**Should have — Differentiators:**
- Programmatic city page generation via `generateStaticParams` + on-demand ISR
- 7 JSON-LD schema types (Organization, LocalBusiness, Service, RealEstateListing, Article, FAQPage, BreadcrumbList)
- AI/LLM discoverability layer: `llms.txt` at root, FAQ format, clear heading hierarchy, Organization schema on homepage
- Localized content differentiation per city (median rent data, vacancy rate, neighbourhood names, local LTB office)
- Topical authority cluster per city (city hub → property type → bedroom count → property detail)
- US state framework pages for 10 states (Florida, Texas, California priority)
- Rental market guide and eviction guide per city (owner-side topical authority)
- Content production SOP + prompt framework for non-developer city expansion
- Google Looker Studio reporting dashboard combining GA4 + Search Console
- Bing Webmaster Tools submission (powers Microsoft Copilot AI citations)

**Defer (v2+, explicitly out of scope):**
- Functional owner/tenant portal backend
- Real-time listing API integration
- Quebec bilingual content
- Payment processing / rent collection
- Map-based search interface (PadMapper-style)
- Online application form with backend processing
- US cities beyond the 10-state framework pages

See `.planning/research/FEATURES.md` for full tables including anti-features and feature dependency chain.

### Architecture Approach

The system is four layers with unidirectional content flow: Sanity Content Lake (source of truth) → Next.js App Router rendering engine (ISR + metadata + JSON-LD) → Vercel edge CDN (cache, webhook receiver) → Browser (GTM events, SalesIQ chat). All GROQ queries originate from Server Components using `sanityFetch()` exclusively — never from client components or raw `createClient().fetch()`. Content is serialized as props and passed down; no CMS fetching happens in the browser.

**Major components:**
1. **Sanity Schema Layer (9 content types):** `province`, `city`, `service`, `cityService` (the core SEO junction type), `blogGuide`, `comparison`, `caseStudy`, `propertyCategory`, `propertyListing` — every type includes a reusable SEO fieldset (`metaTitle`, `metaDescription`, `canonicalOverride`, `noindex`)
2. **URL Router (Next.js App Directory):** Four-segment geographic hierarchy `/ca/[province]/[city]/[service]/` and `/us/[state]/[city]/[service]/`; `trailingSlash: true`; middleware enforces lowercase normalization; legacy WordPress URL redirects in `next.config.ts`
3. **Page Data Pipeline:** Every page route follows a three-step pattern: `generateStaticParams` (Tier-1 pre-render) → `generateMetadata` (per-route SEO head) → page Server Component (GROQ fetch + block assembly + JSON-LD injection)
4. **Block Composer (10 reusable Server Components):** `HeroBlock`, `ServiceGridBlock`, `FAQBlock`, `CTABannerBlock`, `ContentBodyBlock`, `TestimonialsBlock`, `CityGridBlock`, `PropertyListingBlock`, `BreadcrumbBlock`, `ComparisonTableBlock` — assembled into 22+ page templates
5. **Schema Markup System:** Pure TypeScript builder functions for 7 JSON-LD types; single data source (same object drives both rendered HTML and schema); `JSON.stringify(schema).replace(/</g, '\\u003c')` injection per official Next.js guidance
6. **Sitemap System:** `generateSitemaps()` with 7 segments; dynamically queries Sanity at request time with ISR revalidation; scales linearly to 1,000+ pages
7. **Analytics + Tracking Layer:** GTM via `@next/third-parties` (loads after hydration); GA4 through GTM only (no direct gtag.js); SalesIQ via `<Script strategy="lazyOnload">`; GSC/Bing via meta verification tags in root layout

**Build order is strictly dependency-ordered** into 8 groups (Foundation → CMS Schema → URL Structure → Block Components → Page Templates → Technical SEO → Webhook/Revalidation → Analytics + Handoff). Groups 1-4 are Phase 1 work; Group 5 is Phase 2; Groups 6-8 complete in Phases 3-4.

See `.planning/research/ARCHITECTURE.md` for full component boundaries, data flow diagram, GROQ query patterns, and scalability analysis.

### Critical Pitfalls

**Six critical pitfalls** (cause full rewrites or deindexing if not prevented):

1. **City-name-swap thin content** — The June 2025 Google core update removed sites entirely from the index (not just demoted) for programmatic pages with no locally-specific content. Recovery documented at 4-12 months. Prevention: Sanity schema must enforce required fields for local data (median rent, vacancy rate, neighbourhood names, local LTB reference) — if the schema allows publishing without local data, the schema is wrong. Must be addressed in Phase 1 before any city template exists.

2. **Vercel 45-minute build timeout** — Pre-rendering all 1,000+ city pages at build time exceeds Vercel Pro's hard timeout, blocking deployments during the sprint. Prevention: `generateStaticParams` returns only Tier-1 Ontario priority pages (~320); `dynamicParams = true` handles the rest on-demand. Decision must be made in Phase 1 before any dynamic route is written.

3. **Sanity CDN disabled in production** — `useCdn: false` deployed to production causes every page render to hit the Content Lake API directly. At any crawl event (Googlebot + Bingbot simultaneously), this hits rate limits (500 req/s per IP) and causes 4-5 second response times that fail LCP <2.5s. Prevention: `useCdn: true` for all public queries; `useCdn: false` only in draft mode. Phase 1 architecture concern.

4. **Thin programmatic content deindexed at scale** — Even without city-name swaps, pages with technically correct structure but no information-gain content (no numbers, no local proper nouns beyond city name, no data) are deindexed under Google's 2025 Helpful Content enforcement. Prevention: content brief template per page family specifying required local data; first 3 Toronto/Mississauga/Ottawa pages as manually-written gold standards.

5. **Missing `metadataBase` — all canonicals are relative paths** — Next.js silently generates relative canonical URLs and broken OG tags if `metadataBase` is not set in root layout.tsx. With 1,000+ pages, fixing this post-launch is a deployment event. Prevention: set `metadataBase: new URL('https://movesmartrentals.com')` in root layout on day one. Phase 1/2 boundary.

6. **Schema markup mismatch between JSON-LD and rendered HTML** — Two separate code paths (one for rendering, one for schema) diverge when either is updated. Google flags mismatches; rich results eligibility is lost; severe cases result in manual action. Prevention: JSON-LD builder functions must receive the same data object as the rendering component — never built from a separate query. Enforced via code review checklist from Phase 2 onward.

**Five moderate pitfalls** (ranking underperformance or rework): crawl budget waste on query parameter URLs, stale sitemaps when content publishes without a deploy, dual-audience intent cannibalization (owner vs tenant pages competing on same city queries), deep GROQ reference chains causing 4-5s response times, and LCP image `priority` prop missing from Hero components.

See `.planning/research/PITFALLS.md` for full prevention strategies, detection signals, and phase-specific warning table.

---

## Implications for Roadmap

Based on the combined research, 4 phases map directly to the architecture build order and the April 24 hard deadline.

### Phase 1: Architecture and CMS Foundation
**Rationale:** Everything else has a hard dependency on this phase. URL structure cannot be changed post-launch without redirects. CMS schema shape determines all GROQ query patterns. ISR strategy determines how all dynamic routes are built. `metadataBase` must be set before any page template generates a canonical. Decisions made here are irreversible at scale.
**Delivers:** Working Next.js + Sanity scaffold; all 9 CMS content type schemas with required field enforcement; composable block component library (10 blocks); URL hierarchy and `next.config.ts` configuration; `metadataBase` set; ISR strategy locked (on-demand for long-tail, Tier-1 at build time); `useCdn` config per environment; dual-audience URL separation (owner intent vs tenant intent per city)
**Addresses:** CMS features (9 schemas, SEO fieldset, required field validation, draft/preview workflow), technical SEO baseline (canonicals, robots.txt, trailing slash policy, lowercase normalization)
**Avoids:** Pitfalls 1 (thin content schema), 2 (build timeout), 3 (Sanity CDN), 5 (missing metadataBase), 7 (query parameter crawl waste), 9 (dual-audience cannibalization), 10 (deep GROQ chains)
**Target:** April 3

### Phase 2: Core Build — Templates and Top Cities
**Rationale:** Block components must exist before page templates can be assembled. Page templates must exist before schema markup can be validated. The CityService template is the most SEO-critical page on the site — it must include all 7 schema types, `generateMetadata`, and `generateStaticParams` from day one, not retrofitted later. The first 20 Ontario Tier-1 cities must be populated with manually-written content to establish the gold standard that all subsequent city content must match.
**Delivers:** All 22+ page templates assembled from Phase 1 blocks; homepage with full section composition; all owner-facing service pages; top 20 Ontario city hubs with property type and bedroom count sub-pages; all 7 JSON-LD schema types integrated; ISR webhook plumbing (`/api/revalidate`) tested end-to-end; dynamic sitemaps operational; robots.ts deployed
**Addresses:** Owner-facing table stakes (service pages, pricing, testimonials, FAQ with schema, CTA system), tenant-facing table stakes (city hub pages, property type pages, bedroom count pages, mobile-responsive design), SEO system (schema markup, canonical tags, breadcrumbs, internal linking for initial cities)
**Avoids:** Pitfalls 4 (gold standard pages), 6 (schema/HTML mismatch via single-data-source), 8 (stale sitemaps via dynamic generation), 11 (LCP priority attribute), 12 (client-side data fetching), 15 (robots.txt blocking API routes)
**Target:** April 10

### Phase 3: Scale, Integrations, and Content System
**Rationale:** Remaining Ontario cities and US framework pages follow the same templates validated in Phase 2 — this is content execution, not architecture work. Third-party integrations (analytics, SalesIQ) are deliberately deferred until pages are stable to avoid tracking noise during development. The content production SOP must be delivered as a system, not a final scramble.
**Delivers:** Remaining Ontario cities (up to 100+); US state framework pages for 10 states (3-5 cities per state); RealEstateListing schema on all property detail pages; GA4 + GTM event tracking (8 named conversion events); GSC + Bing Webmaster Tools verification; Zoho SalesIQ integration (lazyOnload); Looker Studio reporting dashboard; content production SOP, prompt framework, and editorial QA checklist; `llms.txt` for AI discoverability
**Addresses:** Remaining tenant differentiators (US state pages, rental prep guides, tenant guarantor guide), remaining SEO system differentiators (AI discoverability layer, full event tracking, Bing submission, Looker Studio dashboard), CMS differentiators (city rollout playbook, content QA checklist)
**Avoids:** Pitfalls 13 (SalesIQ render blocking), 14 (dual GA4/GTM event duplication)
**Target:** April 17

### Phase 4: Audit, Hardening, and Handoff
**Rationale:** Core Web Vitals must be audited on real deployed content against real network conditions — this cannot be done during development. Handoff documentation cannot be written accurately until the build is complete and stable. The 30-day warranty period begins at handoff, so the client must be independently operational before the milestone is signed off.
**Delivers:** Core Web Vitals audit and remediation (LCP <2.5s, INP <200ms, CLS <0.1); 404 page with relevant internal links; full cross-browser and mobile testing; three SOPs with Loom walkthroughs (publishing new city, triggering revalidation, checking GSC indexing status); credential transfer checklist (GitHub REVUN account, Vercel, Sanity, GSC, GA4, GTM, Zoho SalesIQ); Rich Results Test validation for all schema types; sitemap submission to GSC and Bing
**Addresses:** Client independence post-handoff (Pitfall 16), Core Web Vitals compliance requirement, warranty period commencement
**Avoids:** Pitfall 16 (no SOPs = warranty claims or investment abandonment)
**Target:** April 24

### Phase Ordering Rationale

- **Phases 1-4 map to the architecture build groups** identified in ARCHITECTURE.md (8 dependency groups collapse into 4 sprint phases). Group 1-4 work is Phase 1; Group 5 is Phase 2; Groups 6-7 are integrated into Phases 2-3; Group 8 is Phase 4.
- **CMS schema must precede all page templates** because `generateStaticParams` queries Sanity — a schema change after templates are built requires template rewrites.
- **ISR strategy must be decided before any dynamic route exists** — retrofitting from static-all to on-demand ISR requires touching every dynamic page file.
- **Content differentiation enforcement (required fields) must be Phase 1** — it cannot be added retroactively to 100+ already-published city pages.
- **Analytics deferred to Phase 3** to avoid tracking development noise and to ensure event schema is designed against real user journeys visible in real pages.
- **Handoff documentation written during Phases 2-3** (not scrambled at the end of Phase 4) — the SOPs are accurate only if written by the developer who built the system.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 1 (CMS Schema):** The `cityService` junction schema is the most complex schema in the system — it must balance required field enforcement (prevents thin content) against editor usability (a 40-field form will not be completed). The exact field list and validation rules for local differentiation need a content brief before schema design begins.
- **Phase 3 (US State pages):** Canadian provincial landlord-tenant law is well-documented. US state regulations (Florida, Texas, California) require state-specific research to frame the compliance content correctly per state.

**Phases with standard patterns (skip additional research):**
- **Phase 1 (Next.js + Sanity scaffold):** The next-sanity integration is extensively documented with official examples; setup is deterministic.
- **Phase 2 (Page templates):** All patterns are documented in ARCHITECTURE.md with concrete code examples; no novel integration work.
- **Phase 4 (Core Web Vitals audit):** Standard tooling (Lighthouse, PageSpeed Insights, Chrome DevTools Performance tab); well-documented optimization patterns.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against official docs and npm releases as of March 2026. The Next.js 15 vs 16 decision is well-evidenced from official upgrade docs. |
| Features | HIGH | Table stakes verified against competitor analysis and Google Search Central. Schema types verified against schema.org. Anti-features confirmed by contract scope. |
| Architecture | HIGH | All patterns verified against official Next.js, Sanity, and Vercel documentation. GROQ query patterns from official Sanity guides. Vercel limits from official docs. |
| Pitfalls | HIGH (technical) / MEDIUM (SEO enforcement) | Technical pitfalls (build timeout, CDN config, metadataBase) verified against official docs. SEO enforcement pitfalls (deindexing patterns) rely on post-June 2025 case studies — directionally accurate, specific recovery timelines are estimates. |

**Overall confidence: HIGH**

### Gaps to Address

- **Sanity plan pricing discrepancy:** PROJECT.md references $374/month. Current pricing is $15/seat/month ($75/month for 5 seats). Resolve with client before project financials are finalized — this is a ~$400 CAD/month difference.
- **Zoho SalesIQ Next.js integration:** No official npm package exists; script-tag injection via Next.js `<Script>` component is the community-verified pattern but has no official Zoho + Next.js documentation. Validate `afterInteractive` vs `lazyOnload` strategy against actual SalesIQ widget behavior during Phase 3 integration.
- **US state compliance content:** Florida, Texas, and California landlord-tenant law framing requires state-specific research before content briefs can be written for US city pages. Flag for Phase 3 content planning.
- **Content brief specifics per page family:** The 16+ page family types each require a content brief specifying exactly what locally-specific data fields are required. These briefs do not exist yet and must be produced before Phase 2 content entry begins. This is an editorial dependency, not a technical one.
- **Sanity document count at US scale:** Growth plan limit is 25,000 documents. Ontario launch (20 cities × ~20 page types = 400 pages) is well within limits. Full US rollout (10 states × 20 cities × 20 page types = 4,000 pages) plus blog content approaches the ceiling. Monitor and plan upgrade path if US rollout accelerates.

---

## Sources

### Primary (HIGH confidence)
- [Next.js 15.2.4 and Next.js 16 official docs and release notes](https://nextjs.org/blog) — version decisions, ISR, metadata API, generateStaticParams, generateSitemaps, JSON-LD guidance
- [Sanity Studio v3 changelog and official docs](https://www.sanity.io/docs) — CMS schema patterns, GROQ, webhook configuration, CDN usage
- [next-sanity npm v12.1.1](https://www.npmjs.com/package/next-sanity) — official Next.js/Sanity integration
- [Sanity pricing page](https://www.sanity.io/pricing) — Growth plan cost correction
- [Tailwind CSS v4 release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first configuration, build performance
- [shadcn/ui CLI v4 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) — React 19 + Next.js 15 compatibility
- [Vercel Pro plan limits](https://vercel.com/docs/limits) — build timeout, ISR read costs, route limits
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — LCP, INP, CLS thresholds and ranking weight
- [Google Search Central: Crawl budget management](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — large site indexing patterns
- [Google Structured Data Policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — schema mismatch manual action policy
- [Schema.org: RealEstateListing](https://schema.org/RealEstateListing) — required and recommended fields
- [Sanity + Next.js App Router caching and revalidation](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs) — on-demand ISR webhook patterns
- [Vercel Build Timeout Troubleshooting KB](https://vercel.com/kb/guide/troubleshooting-build-error-build-step-did-not-complete-within-45-minutes) — confirmed 45-min hard limit and workarounds
- [@next/third-parties documentation](https://nextjs.org/docs/app/guides/third-party-libraries) — GTM loading pattern

### Secondary (MEDIUM confidence)
- [Previsible: 2025 State of AI Discovery Report](https://previsible.io/seo-strategy/ai-seo-study-2025/) — ChatGPT 84.2% AI referral share, LLM discoverability strategy
- [GetPassionFruit: Why pages get deindexed after June 2025 core update](https://www.getpassionfruit.com/blog/why-website-pages-are-getting-de-indexed-after-june-2025-google-core-update-complete-recovery-guide) — thin programmatic content enforcement
- [ClearLead Digital: Property Management SEO Blueprint 2026](https://www.clearleaddigital.com/blog/property-management-seo-blueprint) — property management specific SEO patterns
- [OnwardSEO: Algorithmic Penalties in Real Estate SEO](https://onwardseo.com/mitigating-algorithmic-penalties-in-highly-regulated-saas-and-real-estate-seo/) — regulated industry penalty patterns
- [SingleKey: Rent Guarantee Canada](https://www.singlekey.com/en-ca/rent-guarantee/) — competitor reference for rent guarantee framing
- [Sanity API cost community discussion](https://www.sanity.io/answers/discussion-on-potential-unexpected-costs-of-using-sanity-cms-due-to-api-usage-) — CDN vs API rate limit real-world data

---
*Research completed: 2026-03-28*
*Ready for roadmap: yes*
