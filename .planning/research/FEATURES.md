# Feature Landscape

**Domain:** Dual-audience rental property platform (property owners + tenants) with programmatic SEO system
**Project:** MoveSmartRentals.com — Next.js 15 + Sanity CMS + Vercel
**Researched:** 2026-03-28
**Confidence:** HIGH (verified against competitor analysis, Google Search Central, and schema.org)

---

## Part 1: Owner-Facing Features

These features target property owners and landlords who want tenant placement, screening, rent guarantee, and leasing services.

### Table Stakes — Owner Side

Features that owners expect. Missing any of these and the site reads as untrustworthy or incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Service explanation pages (what you do, how it works) | Every PM site has this. Owners won't call without understanding the offer | Low | 16+ city-level variants required; must localize meaningfully beyond name-swap |
| Clear pricing page | Owners comparison-shop; no pricing = no trust | Low | "Nothing due upfront for standard leasing" is a key differentiator to surface here |
| Tenant placement service page | Core offer. Owners need to understand MLS syndication, showings, screening workflow | Low-Med | Needs step-by-step process diagram; "how it works" format converts better than bullets |
| Tenant screening explainer | Liability concern for owners. They need to understand structured, documented process | Low-Med | Must name the screening components (credit, income, employment, references); Canadian regulatory context matters |
| Rent guarantee / rent protection page | High-anxiety owner pain point. A dedicated page is expected | Low-Med | Partner insurance pathway, not direct insurance product — frame carefully |
| Owner portal / technology page | Modern PM companies are all showing a portal. No portal page = appears technologically behind | Med | Frontend-only: describe what the portal shows (showings, applications, approvals, inspections) — no backend build required |
| Contact / book a call CTA | Owners who want to talk before signing up must have a clear next step | Low | Must appear in hero, nav, and footer |
| Free account creation CTA | Self-serve onboarding is a differentiating claim; the CTA must be site-wide | Low | Targets the "self-serve online without calling" promise |
| Location-based service pages | "Property management Toronto" etc. is a high-intent owner query; city pages are required | Med-High | 100+ Ontario cities; 16+ page families per city; must not be thin content |
| Testimonials / social proof | Owners won't trust a new PM company without evidence of results | Low | Photos, names, city, outcome. Fake or generic testimonials actively hurt trust |
| FAQ section | Owner objections are predictable; answered on-page = fewer unqualified calls | Low | Landlord FAQ and tenant FAQ per city; must be in FAQ schema markup |
| Province/State-specific compliance framing | Canadian landlord laws vary by province; owners in Ontario expect Ontario context | Low-Med | LTB references for Ontario; different framing for US states |

### Differentiators — Owner Side

Features that set MoveSmartRentals apart. Not universally expected, but drive preference when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "Nothing due upfront" success-fee model page | Most PM companies charge upfront fees; this directly overcomes the objection | Low | Must be prominent in hero copy and pricing page |
| Property preparation service page | Few PM companies offer pre-listing prep; positions as full-service | Low-Med | Explains what prep is offered before listing |
| Tenant guarantor service page | Adds a financial safety net layer beyond screening; uncommon in Canadian market | Low | Explains guarantor as a risk mitigation option alongside rent guarantee |
| Tenant insurance page | Protects both tenant and owner; drives cross-sell | Low | Frame as a protection pathway for owners, not just a tenant product |
| Multi-platform distribution callout | MLS + multiple ILS platforms vs. single-listing competitors | Low | Name the platforms (MLS, Kijiji, Facebook Marketplace, etc.) |
| Dedicated account manager mention | Contradicts "just an app" perception | Low | Pairs with self-serve messaging — "DIY if you want, supported if you need it" |
| Rental market guide per city | "Apartments for rent in Mississauga — 2026 market trends" earns topical authority | Med | Requires real local data, not generic filler — must include median rent, vacancy rate, trend |
| Eviction guide per city | High-intent owner search: "how to evict a tenant in Ontario" | Med | Province-specific legal framing required; must reference LTB/RTDRS processes |
| How-to-price-your-rental guide per city | Owner research content; drives mid-funnel traffic | Med | Needs actual local rent range data per property type |
| Franchise preview page | Signals growth, credibility, and national expansion | Low | "Coming soon" or inquiry CTA is sufficient for V1 |

### Anti-Features — Owner Side

Features to deliberately NOT build in this contract scope.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Functional owner portal / dashboard | Out of scope per contract; builds false expectations | CTA to "create account" pointing to an external portal URL |
| Payment processing / rent collection | Out of scope; high compliance and liability surface area | Describe rent collection in the portal description page only |
| Real-time property management backend | Out of scope; this is a marketing and SEO website | Link or reference to operational tools without building them |
| Bilingual (French) content | Out of scope per contract; Quebec deferred | English-first; note bilingual as future expansion only |
| Paid media landing pages | Contract is organic-only | Organic content strategy only; pages should not be structured as ad landing pages |

---

## Part 2: Tenant-Facing Features

These features target renters searching for apartments, condos, houses, and townhouses across Canada and the US.

### Table Stakes — Tenant Side

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Rental listings by city and property type | Tenants expect to browse; no listings = no reason to stay | Med | CMS-managed listings, not real-time API. Must be indexable HTML, not JS-hidden |
| Bedroom count filter pages (1-bed, 2-bed, 3-bed, 4-bed+) | "2 bedroom apartments Toronto" is one of the highest-volume rental queries in Canada | Med | Separate indexable pages per bedroom count per city, not just JS filter |
| Property type pages (apartments, condos, houses, townhouses) | Different searcher intent per type; must be distinct URLs | Med | Four property type pages per city minimum |
| Property detail pages with full listing info | Price, beds/baths, square footage, photos, description, availability, location | Med | RealEstateListing schema required; all content in rendered HTML |
| Clear search / browse navigation | Tenants who arrive on a city page need to navigate to property type or bedroom count | Low-Med | Internal linking from city hub to all sub-pages is the critical path |
| Contact / inquiry CTA per listing | Tenants need a clear action; generic "contact us" is table stakes | Low | Phone, email, or SalesIQ chat trigger per listing or city page |
| City overview pages | "Apartments for rent in Hamilton" hub page must exist and rank | Low-Med | Must include local context: average rent, neighbourhood overview, transit info |
| Mobile-responsive design | 87%+ of renters start search on mobile; unusable mobile = immediate bounce | Med | Core Web Vitals compliance required; LCP <2.5s on mobile |
| Tenant FAQ per city | Renters have location-specific questions about leasing, deposits, and process | Low | FAQ schema markup required per page |

### Differentiators — Tenant Side

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "How to find a tenant" / "How to rent" guides per city | Attracts middle-of-funnel renters who are researching, not just browsing | Med | Must be locally relevant, not generic |
| Tenant screening guide (what to expect) | Reduces friction; tenants who know the process are more likely to apply | Low | Positions company as transparent and fair |
| Tenant insurance page | Cross-sell service; reduces owner risk and differentiates from raw listing sites | Low | Renters increasingly expect this info upfront |
| Tenant guarantor guide | Explains the guarantor option for renters who may not qualify on income alone | Low | Uncommon on competitor sites; adds perceived value |
| Neighbourhood-level context on city pages | Walk score, transit access, schools, nearby amenities | Med | Must use static data (no live API) to stay within scope and avoid CWV issues |
| US state pages with city rollout | Cross-border reach is genuinely uncommon among Canadian-origin PM companies | Med | Florida, Texas, California priority; framework pages required even if sparse initially |
| Rental preparation guide per city | "What to prepare before renting in Toronto" is an underserved query | Low | Application checklist, income proof, ID requirements, credit check expectations |

### Anti-Features — Tenant Side

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Real-time listing search with filters (JS-driven) | JS-filtered results are not indexable by Google; defeats organic SEO | Use static/ISR pages per category and bedroom count |
| User authentication / tenant portal | Out of scope per contract | CTA pointing to external account creation |
| Online application form with backend processing | Out of scope | Link to account creation flow or use SalesIQ chat to capture inquiry |
| Map-based search interface (like PadMapper) | High implementation complexity; real-time tile APIs hurt CWV; not in scope | Static embedded map per property detail page using iframe is sufficient |
| Saved search / email alerts | Requires user auth and notification backend; out of scope | Encourage direct inquiry via SalesIQ chat |

---

## Part 3: SEO and Content System Features

These features drive the search-dominant acquisition strategy. This is the core technical differentiation of the build.

### Table Stakes — SEO System

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Canonical tags on all pages | Duplicate content penalty prevention; required on all programmatic pages | Low | Especially critical for city variants and pagination |
| robots.txt with correct directives | Controls crawl budget; prevents indexation of draft/dev/staging pages | Low | Must block Sanity Studio preview URLs |
| XML sitemaps — segmented | 100+ cities x 16+ page families = 1,600+ pages; single sitemap hits Google's 50,000 URL limit eventually | Med | Separate sitemaps: /sitemap-cities.xml, /sitemap-services.xml, /sitemap-blog.xml, /sitemap-properties.xml |
| Breadcrumb navigation + BreadcrumbList schema | Required for multi-level geo hierarchy; improves SERP display | Low-Med | /ca/ontario/toronto/apartments-for-rent needs full breadcrumb chain |
| SSL / HTTPS | Table stakes across all of web; HTTP = browser warnings and ranking penalty | Low | Vercel handles this automatically |
| Trailing slash normalization | /toronto and /toronto/ create duplicate pages if not resolved | Low | Next.js config setting; must be consistent across all routes |
| Lowercase URL normalization | /Toronto and /toronto are treated as different pages | Low | Enforced in generateStaticParams and redirect rules |
| 404 handling with relevant CTAs | Dead links lose both users and crawl budget | Low | Custom 404 with search suggestions and popular city links |
| 301 redirects for URL changes | Any URL restructuring without redirects = lost ranking equity | Low | Vercel redirect rules in vercel.json |
| hreflang tags for CA/US geography | Signals correct regional version to Google; prevents cross-country cannibalization | Low-Med | /ca/ and /us/ paths must have proper hreflang annotations |
| Unique title tags per page | Required; title tag is still a top-3 ranking factor | Med | Template-driven: "[Property Type] for Rent in [City], [Province] — MoveSmartRentals" |
| Unique meta descriptions per page | Not a direct ranking factor but critical for CTR; duplicate meta = wasted SERP real estate | Med | Must differ between property type and service pages in same city |
| Unique H1 per page | Must match user intent keyword; template formula required | Med | "Apartments for Rent in Mississauga" — never repeat H1 across pages |
| Internal linking system | PageRank distribution across 1,600+ pages; city hub links to all sub-pages | High | The single most labor-intensive SEO feature; must be systematic |
| Indexable rendered HTML | Critical listing content must not be behind JS rendering | Med | Next.js App Router with SSG/ISR handles this; must verify with Fetch as Googlebot |

### Differentiators — SEO System

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Programmatic city page generation (generateStaticParams + ISR) | Cannot hand-build 1,600+ pages; automation is the only viable path | High | ISR revalidation period must be set per page type (listing pages: short; guide pages: long) |
| Structured data: 7 schema types | RealEstateListing, LocalBusiness, FAQPage, Article, Service, Organization, BreadcrumbList | Med | JSON-LD format required; inline in each page's <head>; must be validated via Rich Results Test |
| AI / LLM discoverability layer | ChatGPT owns 84.2% of AI referrals (Previsible, 2025); structured, authoritative content gets cited | Med | Implement llms.txt at root; use clear heading hierarchy (H1-H3); FAQ format; cite primary sources in guides |
| Localized content differentiation | Google's Helpful Content system penalizes city-name-swap thin pages | High | Each city page must include: local median rent data, neighbourhood context, city-specific regulations, local transit references |
| Topical authority cluster per city | Each city becomes a content hub (service pages + rental category pages + guides) | High | Internal linking cluster: [city hub] → [property type] → [bedroom count] → [property detail] |
| Content production SOP + prompt framework | Allows non-developer content team to scale to 100+ cities without rebuilding each page | High | Must document: GROQ query patterns for Sanity, CMS field completion checklist, content QA rubric, publishing workflow |
| GA4 + GTM event tracking system | Conversion events feed the reporting dashboard; without tracking, ROI is unmeasurable | Med | Track: account-creation, book-a-call, contact-form, scroll-depth, city-to-service-CTR, outbound clicks |
| Google Looker Studio reporting dashboard | Combines GA4 + Search Console data; client gets rankings + traffic + conversions in one view | Low-Med | Template-based; connect GA4 and GSC as data sources; schedule weekly email delivery |
| Bing Webmaster Tools submission | Bing powers Copilot (Microsoft's AI); separate submission required | Low | Submit sitemap to Bing separately; verify via HTML tag or DNS record |
| Core Web Vitals compliance | 25-30% ranking weight for competitive queries; 8-15% visibility boost for compliant sites | Med-High | Next.js + Vercel Edge Network handles most of this; must audit image optimization (Next/Image), font loading (next/font), and layout stability |

### Anti-Features — SEO System

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Auto-generated thin city pages (city name swap only) | Google's Helpful Content update actively demotes these; regulated industries penalized at 3x rate | Each page must include local data, local context, and local CTA differentiation |
| Keyword stuffing in title tags or body | Still a manual action trigger in 2025 | Natural language titles; one primary keyword per page |
| Cloaking or serving different content to Googlebot | Manual penalty; immediate deindexation risk | Render-consistent pages; no user-agent conditional content |
| Doorway pages (city + keyword with no real content) | Explicitly listed in Google's spam policies | Build genuine service + location intersections with useful content |
| Paginated listing archives without rel="prev/next" clarity | Wasted crawl budget and pagination confusion | Use Sanity to manage a curated featured listings count per city; avoid infinite pagination |
| Buying backlinks or directory spam | Black hat; out of scope per contract; risk of site-wide penalty | On-page and content-only SEO as specified in contract |
| Blocking CSS/JS in robots.txt | Prevents Googlebot from rendering pages correctly; causes mobile-first indexing failures | Allow all CSS/JS; only block preview/admin URLs |

---

## Part 4: CMS and Content Operations Features

### Table Stakes — CMS

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Non-developer publishing workflow | Client must be able to publish without filing dev tickets | Low-Med | Sanity Studio v3 GROQ-powered; content team trains on Studio UI |
| 9 content type schemas in Sanity | Province/State, City, Service, Service+City, Blog/Guide, Comparison, Case Study, Property Category, Property Detail | High | Each document type needs 15-20+ fields; structured fields (not rich text blobs) enable GROQ queries |
| Draft / preview workflow | Content team needs to see page before publishing | Low | Sanity's Presentation tool with Next.js draft mode |
| Scheduled publishing | Coordinated content releases across city rollouts | Low | Sanity's Content Releases feature handles this |
| Image management with alt text fields | SEO and accessibility requirement; alt text must be a required field in schema | Low | Sanity's asset pipeline with hotspot/crop; enforce alt text via validation rule |
| Slug auto-generation from title | Prevents URL inconsistencies from manual slug entry | Low | Sanity slugify utility; enforce lowercase, hyphenated |
| SEO metadata fields per document | Title tag, meta description, OG image as first-class CMS fields | Low-Med | Must be separate from page title; Sanity doesn't auto-generate these |
| Required field validation | Prevents publishing incomplete pages that would create thin content | Low | Sanity validation rules: required() on H1, meta, slug, at minimum |

### Differentiators — CMS

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Composable block system (~10 reusable blocks) | Build Hero, CTA, FAQ, ServiceGrid, TestimonialGrid, StatBar, CityGrid, PropertyCard, GuideCard, BreadcrumbBar once; compose into 22+ templates | High | The core architecture decision; blocks must be typed in Sanity's Portable Text / array of objects |
| GROQ query library for common page shapes | Standardizes how pages fetch data; prevents per-page query drift | Med | Document standard queries for: city hub, service+city, property listing, blog post |
| Content QA checklist as part of SOP | Ensures every published page meets SEO minimum bar before going live | Low | Part of the content production handoff deliverable |
| City rollout playbook | Step-by-step guide to adding a new city: Sanity document creation, page generation verification, internal linking update, sitemap inclusion | Med | Allows client to expand beyond 100 Ontario cities to US states without contractor |

---

## Feature Dependencies

```
CMS content types (Province, City, Service, ServiceCity, etc.)
  --> generateStaticParams() pulls from Sanity to build all city pages
  --> City hub page exists
      --> Property type sub-pages exist (apartments, condos, etc.)
          --> Bedroom count pages exist (1-bed, 2-bed, etc.)
              --> Property detail pages exist (RealEstateListing schema)

Internal linking system
  --> City hub links to all 16+ sub-pages
  --> Service pages cross-link to related city pages
  --> Blog/Guide posts link to relevant city hubs and service pages

Schema markup (JSON-LD)
  --> Requires rendered HTML (not JS-only)
  --> Requires Next.js SSG/ISR (not client-side rendering)
  --> Rich Results Test validation before launch

Analytics tracking
  --> GTM container must be installed before any event tracking
  --> GA4 property must be linked to GTM
  --> GSC property must be verified and linked to GA4
  --> Looker Studio dashboard connects after all sources are verified

Reporting dashboard
  --> Depends on GA4 + GSC being live and collecting data
  --> Minimum 2-4 weeks of data before meaningful reporting

SalesIQ chat
  --> Must be installed via GTM or direct script tag
  --> Page-level triggers (e.g., "owner inquiry" on owner pages, "tenant inquiry" on rental pages) set in SalesIQ admin

AI / LLM discoverability
  --> Depends on structured content (headings, FAQ, lists) being authored in CMS
  --> llms.txt file at site root
  --> Organization schema on homepage
  --> FAQ schema on guide and FAQ pages
```

---

## MVP Recommendation

Given the April 24, 2026 hard deadline and 29 calendar days total, prioritize in this order:

**Phase 1 — Architecture and CMS foundation (by April 3)**
- All 9 Sanity content type schemas with required fields
- Composable block system (Hero, CTA, FAQ, ServiceGrid, CityGrid, PropertyCard, BreadcrumbBar, StatBar, TestimonialGrid)
- URL architecture and generateStaticParams for Ontario Tier-1 cities
- Technical SEO baseline: canonical, robots.txt, sitemap structure, breadcrumbs

**Phase 2 — Core build (by April 10)**
- All 22+ page templates assembled from blocks
- Homepage with full section composition
- Owner-facing service pages (tenant placement, screening, rent guarantee, leasing, portal, preparation)
- Top 20 Ontario city hubs with property type and bedroom count sub-pages
- Schema markup: Organization, LocalBusiness, FAQPage, Service, BreadcrumbList on all pages

**Phase 3 — Remaining items (by April 17)**
- Remaining Ontario cities (up to 100+)
- US state framework pages (10 states, top 3-5 cities per state)
- RealEstateListing schema on property detail pages
- Analytics: GA4, GTM events, GSC, Bing Webmaster, SalesIQ
- Looker Studio dashboard
- Content production SOP + prompt frameworks + editorial QA

**Phase 4 — Launch and handoff (by April 24)**
- Core Web Vitals audit and remediation
- llms.txt and AI discoverability signals
- Full handoff: code in REVUN GitHub, credentials, deployment docs, training
- 30-day warranty period begins

**Defer:**
- Quebec bilingual content (out of scope)
- Real-time listing API (out of scope)
- Tenant/owner portal backend (out of scope)
- US cities beyond the 10-state framework pages (post-launch expansion)

---

## Sources

- [Backlinko: Programmatic SEO](https://backlinko.com/programmatic-seo) — HIGH confidence
- [GetPassionFruit: Programmatic SEO Templates for Real Estate](https://www.getpassionfruit.com/blog/top-10-programmatic-seo-templates-for-real-estate-marketplaces) — MEDIUM confidence
- [Previsible: 2025 State of AI Discovery Report](https://previsible.io/seo-strategy/ai-seo-study-2025/) — HIGH confidence
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) — HIGH confidence
- [Schema.org: RealEstateListing](https://schema.org/RealEstateListing) — HIGH confidence
- [Sanity: Real Estate CMS](https://www.sanity.io/real-estate-cms) — HIGH confidence
- [ClearLead Digital: Property Management SEO Blueprint 2026](https://www.clearleaddigital.com/blog/property-management-seo-blueprint) — MEDIUM confidence
- [SingleKey: Rent Guarantee Canada](https://www.singlekey.com/en-ca/rent-guarantee/) — HIGH confidence (competitor reference)
- [Zumper: Best Apartment Search Websites 2026](https://www.zumper.com/blog/the-8-best-apartment-search-websites/) — MEDIUM confidence (competitor reference)
- [OnwardSEO: Algorithmic Penalties in Real Estate SEO](https://onwardseo.com/mitigating-algorithmic-penalties-in-highly-regulated-saas-and-real-estate-seo/) — MEDIUM confidence
- [Averi AI: LLM-Optimized Content Guide](https://www.averi.ai/breakdowns/the-definitive-guide-to-llm-optimized-content) — MEDIUM confidence
- [Brindledigital: SEO Tips for Apartments and Multifamily](https://brindledigital.com/seo-tips-for-apartment-marketing/) — MEDIUM confidence
