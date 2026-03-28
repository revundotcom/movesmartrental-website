# Domain Pitfalls: MoveSmartRentals.com

**Domain:** Rental property management website + programmatic SEO system
**Researched:** 2026-03-28
**Confidence:** HIGH (verified against official docs, Google Search Central, Vercel KB, Sanity docs)

---

## Critical Pitfalls

Mistakes in this tier cause full rewrites, deindexing events, or contract breaches.

---

### Pitfall 1: City Pages That Are Only City Name Swaps

**What goes wrong:** Building 20+ "Ontario city" pages by cloning a template and swapping `{{city}}` tokens throughout. The pages look different to humans but are structurally and semantically identical — same H1 pattern, same body paragraphs, same FAQs, same CTAs. Google treats them as duplicate content, refuses to index them, or deindexes them en masse after a core update.

**Why it happens:** Speed pressure. With 20 Ontario Tier-1 cities and 16+ page families per city (potentially 320+ pages just for Ontario owners), the obvious shortcut is a single template pumped with city name replacements. Developers hit the deadline; editors never localize.

**Consequences:**
- Mass deindexing. The June 2025 Google core update de-indexed sites en masse (not just demoted — fully removed) for this pattern. Recovery took 4-12 months in documented cases.
- Contract breach: The engagement contract explicitly prohibits "duplicate pages with only city names swapped."
- Pages consume crawl budget without returning ranking signals, starving well-differentiated pages.

**Prevention:**
- Each city page family must include at least 3 locally-specific data points: local rental vacancy rate, average rent for that city, neighbourhood names, local landlord-tenant board office, city-specific landlord FAQ answers.
- Establish a minimum differentiation checklist per page family before any city page is published. This checklist becomes the editorial QA gate.
- Build the Sanity CMS schema to require city-specific fields (not just city reference). If a city page can be published without local data filled in, the schema is wrong.
- Use ISR + `notFound: true` to return 404 for any city page where the CMS content falls below a minimum field completion threshold.

**Detection (warning signs):**
- GSC shows "Duplicate without user-selected canonical" for city pages.
- GSC Coverage report shows "Crawled — currently not indexed" climbing proportionally with new city pages.
- Screaming Frog content similarity scores above 85% between two city pages.

**Phase to address:** Phase 1 (Architecture) — the CMS schema must enforce differentiation before any city page template is built. Not fixable retroactively at scale.

---

### Pitfall 2: Vercel 45-Minute Build Timeout With 1,000+ Static Pages

**What goes wrong:** `generateStaticParams()` is used to pre-render all city pages at build time. With 20 cities x 16+ page families = 320+ Ontario pages alone, plus US states, plus blog, plus service pages, the build exceeds Vercel's hard 45-minute limit. The deployment fails. Any CI/CD pipeline dependent on full-build deployment breaks.

**Why it happens:** The instinct is to maximise static generation for SEO. But at 1,000+ pages, build-time generation becomes a liability.

**Consequences:**
- Failed deployments block all content updates, including critical fixes during the 29-day sprint.
- Emergency workarounds (prebuilt artifacts via `vercel deploy --prebuilt`) require local build environment that client cannot operate post-handoff.
- Build failures on April milestone dates constitute delivery risk under the "Time is of the Essence" clause.

**Prevention:**
- Use the "generate-on-demand" ISR pattern: return an empty array (or only the top 5 highest-priority pages) from `generateStaticParams()`. Set `export const dynamicParams = true` and `export const revalidate = 3600`. Pages generate on first request and are cached at the CDN edge.
- Pre-warm priority pages (Toronto, Mississauga, Ottawa, Hamilton, Brampton) via a post-deploy script that hits each URL — they cache within seconds.
- Segment builds: static shell pages (Home, About, Owners hub, Tenants hub) pre-render at build; all programmatic geography pages use on-demand ISR.
- Test build time locally with `next build --no-lint` before each milestone delivery.

**Detection (warning signs):**
- Build output shows "Generating static pages" count approaching 200+ during early development.
- Local `next build` takes over 20 minutes — Vercel will be worse.
- `generateStaticParams` query fetches all documents without pagination.

**Phase to address:** Phase 1 (Architecture) — the ISR strategy must be decided before any dynamic route is built.

---

### Pitfall 3: Sanity CDN Not Used — API Cost and Rate Limit Explosions

**What goes wrong:** Sanity client is initialised with `useCdn: false` (the default in some configurations), or ISR revalidation is set too aggressively (e.g., `revalidate: 60`). Every page render hits the Sanity Content Lake API directly. At any meaningful traffic level, this exhausts the API quota, introduces 4-5 second response times documented in Sanity's own community, and generates billing overruns on a fixed-price contract.

**Why it happens:** Developers use `useCdn: false` for local development (so edits show immediately) and forget to switch for production. Or they replicate the dev config into the deployed environment.

**Consequences:**
- 500 requests/second per IP rate limit hit during crawl events (Googlebot + Bingbot crawling simultaneously).
- Sanity API overage charges on the Growth plan. The $374/month plan has API request limits; overages are billable and fall outside the CAD $2,000 contract.
- Slow pages (4-5s response times) fail the LCP <2.5s requirement.

**Prevention:**
- Always use `useCdn: true` for all public-facing queries. Reserve `useCdn: false` strictly for Sanity Studio preview mode with `draftMode()`.
- Set `revalidate: 3600` (1 hour) minimum for city/service pages. Use `revalidatePath()` or `revalidateTag()` Sanity webhook triggers for immediate updates when content changes.
- Cache GROQ query results at the Next.js fetch cache layer (`fetch(url, { next: { tags: ['city-pages'] } })`).
- Add an edge-layer cache (Vercel Edge Config or cache headers) to intercept repeat requests before they reach Sanity.

**Detection (warning signs):**
- Sanity dashboard shows API request count climbing linearly with page views.
- Response times in Vercel Function logs exceeding 1 second for cached pages.
- `useCdn: false` anywhere outside `.env.local` or preview-mode conditionals.

**Phase to address:** Phase 1 (Architecture) — the Sanity client config and caching strategy. Revisit in Phase 2 (Core Build) during the first performance test.

---

### Pitfall 4: Programmatic Pages With Thin Content Get Deindexed by Google

**What goes wrong:** Pages are generated programmatically with correct structure, valid schema, and non-duplicate city names — but the actual content value is low. Pages answer no question a user actually has, provide no local rental market insight, and contain no data or expertise signals (E-E-A-T). Google's 2025 core updates introduced widespread deindexing (not demotion) for thin programmatic content, with documented 63-71% traffic drops and multi-month recovery periods.

**Why it happens:** The template is built to satisfy technical SEO requirements (meta tags, schema, headings, canonical) but the content brief stops there. AI-generated filler text passes a word count check but fails the information gain test Google now applies.

**Consequences:**
- Google deindexes pages at scale rather than just ranking them poorly.
- "Pages that are currently not indexed" count in GSC grows while "indexed" count stagnates.
- Competing with Zillow (5.2M pages) and Realtor.ca requires genuine information advantage; thin pages surrender that battle immediately.

**Prevention:**
- Each page type needs a content pillar: city-rental pages need actual rental price data for that city, local vacancy rates, specific neighbourhood breakdowns, and real FAQ answers tied to local landlord-tenant board rules.
- Build a content brief template for each of the 16+ page families that specifies exactly what locally-specific data must be present before publishing.
- Use Sanity's required field validation to block publishing without completion of local data fields.
- Never use AI to generate final city-level content without human editorial review and local data injection.
- For the first milestone cities (Toronto, Mississauga, Ottawa), create manually-written gold standard pages. Use those as the benchmark every subsequent city must match.

**Detection (warning signs):**
- GSC shows "Crawled — currently not indexed" for new city pages within 48 hours of publication.
- Content similarity between the city page and a generic "rental services" page is above 70%.
- The page contains no numbers, no local proper nouns beyond the city name, no specific addresses, no local links.

**Phase to address:** Phase 1 (Architecture) for CMS schema enforcement; Phase 2 (Core Build) for content brief templates; Phase 3+ for all subsequent city rollouts.

---

### Pitfall 5: Metadata Base Missing — Canonical and OG URLs Broken Across All Pages

**What goes wrong:** Next.js App Router requires `metadataBase` to be set in the root layout's metadata export. Without it, canonical URLs and Open Graph `og:url` values are generated as relative paths (`/ca/ontario/toronto/apartments-for-rent`) rather than absolute URLs (`https://movesmartrentals.com/ca/ontario/toronto/apartments-for-rent`). Social platforms cannot resolve relative OG URLs. Google may treat relative canonicals as unresolvable and ignore them.

**Why it happens:** `metadataBase` is easy to overlook — Next.js does not throw an error; it silently generates broken relative URLs.

**Consequences:**
- Every page on the site has a broken canonical tag — one of the most common technical SEO oversights documented in Next.js sites.
- With 1,000+ pages, fixing this post-launch is a deployment event (not a content fix), which consumes time from the 30-day warranty period.
- Inconsistent trailing slash behavior (Next.js defaults to stripping trailing slashes via 308 redirect) combined with missing canonicals creates duplicate content signals for every URL.

**Prevention:**
- Set `metadataBase` in `/app/layout.tsx` on day one:
  ```ts
  export const metadata: Metadata = {
    metadataBase: new URL('https://movesmartrentals.com'),
  }
  ```
- In `generateMetadata` for every dynamic route, explicitly set `alternates.canonical` to the absolute URL of the canonical version.
- Decide on trailing slash policy in `next.config.ts` (`trailingSlash: false`) and enforce it consistently in all canonical declarations.
- Validate with Google's Rich Results Test and a crawl of 10 representative pages before each milestone delivery.

**Detection (warning signs):**
- Inspect page source: canonical href shows a path starting with `/` not `https://`.
- Social share preview tools (LinkedIn Post Inspector, Facebook Debugger) show broken OG images.
- Next.js build output warns about missing `metadataBase`.

**Phase to address:** Phase 1 (Architecture) — layout.tsx setup. Zero-cost fix if caught early; expensive if caught after 1,000 pages are live.

---

### Pitfall 6: Schema Markup Mismatch Between CMS Data and Rendered HTML

**What goes wrong:** Structured data (JSON-LD) is generated from Sanity CMS fields, but the rendered HTML visible to the user reflects different values — because a different query, a fallback value, or a manual override is used. Google compares visible content against structured data and flags mismatches. For property data specifically: price in schema ≠ price on page, bedroom count in schema ≠ bedroom count in H1. Manual actions are possible for "misleading structured data."

**Why it happens:** Two separate code paths: one builds the rendered component, another builds the JSON-LD script tag. When either is updated without the other, they diverge.

**Consequences:**
- Loss of rich result eligibility (the primary goal of implementing schema).
- In severe cases, Google manual action reducing site-wide visibility.
- The contract explicitly prohibits "fake structured data" — mismatches could be interpreted as violating this clause.

**Prevention:**
- Single source of truth: the JSON-LD generation function must receive the same data object that the rendering component uses. Never build schema from a separate query.
- Create a schema validation step in the development workflow: for each page type, run the URL through Google's Rich Results Test before the phase is marked complete.
- For `RealEstateListing` schema: price, bedrooms, bathrooms, city, and address must be identical in the schema object and the rendered page content.
- Write a Jest test that compares the rendered output of a page with its JSON-LD fields for the most critical properties.

**Detection (warning signs):**
- Google Rich Results Test shows "Warning: field value does not match visible page content."
- GSC Search Appearance report shows schema errors climbing after content updates.
- A Sanity field is updated in two places (one for display, one for schema generation).

**Phase to address:** Phase 2 (Core Build) — enforce the single-data-source pattern before any schema type is implemented.

---

## Moderate Pitfalls

Mistakes in this tier cause ranking underperformance, rework, or client friction — but not catastrophic failure.

---

### Pitfall 7: Crawl Budget Wasted on Faceted URLs and Query Parameters

**What goes wrong:** Filter interactions (bedroom count, price range, city) generate query parameter URLs (`/toronto/apartments?bedrooms=2&price=2000`) that Googlebot crawls exhaustively, consuming crawl budget that should go to canonical city/category pages.

**Prevention:**
- Block all filter/sort query parameters in `robots.txt` with `Disallow: /*?*`.
- Ensure canonical tags on filtered pages point to the clean base URL.
- Use `<link rel="noindex">` or `X-Robots-Tag: noindex` for purely navigational filter combinations with no unique content.
- Submit only canonical URLs in sitemaps.

**Phase to address:** Phase 2 (Core Build) — robots.txt and canonical strategy must be in place before any filtered URL pattern is deployed.

---

### Pitfall 8: Segmented Sitemaps Not Updated When Content Changes

**What goes wrong:** Sitemaps are generated statically at build time. When new city pages are added via Sanity CMS (without a new deployment), the sitemaps go stale. Google never discovers the new pages. The non-developer publishing workflow the client requires makes this likely.

**Prevention:**
- Use Next.js `app/sitemap.ts` convention to generate sitemaps dynamically from Sanity queries at request time (with ISR revalidation).
- Segment sitemaps by content type: `sitemap-cities.xml`, `sitemap-services.xml`, `sitemap-blog.xml`, `sitemap-properties.xml`. Each under the 50,000 URL limit.
- Register a Sanity webhook that triggers `revalidatePath('/sitemap.xml')` on document publish events.
- Include `<lastmod>` values from CMS document `_updatedAt` fields.

**Phase to address:** Phase 2 (Core Build) — implement dynamic sitemaps from day one. Do not defer to a "we'll update sitemaps later" plan.

---

### Pitfall 9: Dual-Audience Intent Cannibalization Within City Pages

**What goes wrong:** A city page targeting "Toronto property management" (owner intent) and a city page targeting "apartments for rent in Toronto" (tenant intent) share enough semantic overlap that Google uncertain which to rank for which query. Both pages perform below their potential.

**Why it happens:** The dual-audience architecture serves both owners and tenants from the same domain — the correct approach — but URL structure and content must keep the signals completely separated.

**Prevention:**
- Owner-intent pages: `/ca/ontario/toronto/property-management/` — H1, body, and schema all anchored to landlord/owner language.
- Tenant-intent pages: `/ca/ontario/toronto/apartments-for-rent/` — H1, body, and schema all anchored to renter language.
- No page should attempt to rank for both "property management" and "apartments for rent" simultaneously.
- Internal linking must be directional: owner pages link to other owner pages and CTA; tenant pages link to tenant pages and CTA.
- Each page family gets its own keyword cluster mapped in Sanity before any content is written.

**Phase to address:** Phase 1 (Architecture) — URL structure and content separation plan. The IA decision here cannot be reversed without redirects after launch.

---

### Pitfall 10: GROQ Queries With Deep Reference Chains Causing 4-5s Response Times

**What goes wrong:** City pages require data from City, Province, Service, and ServiceCity documents — multiple levels of reference resolution in a single GROQ query. Each `->` dereferencing level is expensive. With complex queries fetching 20+ documents per page render, response times reach 4-5 seconds before CDN caching.

**Prevention:**
- Flatten frequently-accessed data at write time: store city name, province, and primary service name directly on the `ServiceCity` document rather than resolving them via references at read time.
- Avoid `*[_type == "city"]{ ..., services[]->{ ..., provider-> } }` patterns. Limit reference resolution depth to maximum 2 levels.
- Use GROQ projections to fetch only the specific fields needed per page type. Never fetch entire documents.
- Test with realistic dataset size (20 cities x 16 page families = 320 documents minimum) before Phase 2 milestone delivery.

**Phase to address:** Phase 1 (Architecture) — CMS schema design. Phase 2 (Core Build) — GROQ query audit.

---

### Pitfall 11: `priority` Not Set on LCP Images — Failing Core Web Vitals

**What goes wrong:** Next.js `<Image>` component defaults to `loading="lazy"`. For hero images (the LCP element on every page), this means the browser does not fetch the image until the component is visible — causing LCP scores of 4-8 seconds on cold loads.

**Prevention:**
- Set `priority` prop on every above-the-fold image in the Hero block component.
- Sanity-delivered images must be served via Sanity's image CDN with `?auto=format&fit=max&w=1200` query parameters to enable WebP delivery.
- Use `sizes` prop matching actual CSS breakpoints to prevent oversized image downloads on mobile.
- Validate LCP element identification in Chrome DevTools Performance tab before each milestone.

**Phase to address:** Phase 2 (Core Build) — Hero component is one of the first blocks built. Do not ship it without the `priority` attribute.

---

### Pitfall 12: Content Rendered Client-Side Behind JS — Contract Violation and Indexing Failure

**What goes wrong:** Rental listing data, property details, or city-specific content is fetched via client-side JavaScript (React `useEffect`, SWR, React Query) and rendered after the initial HTML is served. Googlebot's crawl sees an empty shell. The contract explicitly prohibits "JS-hidden content."

**Why it happens:** Developers use client-side fetching patterns from SPAs habitually, or to avoid Sanity API calls during SSR.

**Consequences:**
- Critical listing information (price, location, bedrooms) is not in the HTML served to crawlers.
- Google may index the empty state or not index the page at all.
- Direct contract violation.

**Prevention:**
- All SEO-critical content must be fetched in Server Components and rendered in the initial HTML response.
- Use the Next.js App Router default: Server Components fetch data, pass it as props to Client Components for interactivity only.
- Client Components should handle only UI state (open/close, tab selection, form inputs) — never data fetching for content that needs to be indexed.
- Verify with `curl -A Googlebot https://[page-url] | grep "[expected content]"` before any page type is marked complete.

**Phase to address:** Phase 2 (Core Build) — architectural constraint. Must be part of code review checklist from day one.

---

### Pitfall 13: Zoho SalesIQ Script Blocking Render — CLS and INP Failures

**What goes wrong:** The Zoho SalesIQ chat widget script is loaded synchronously in `<head>`, blocking the main thread during parse. This increases Total Blocking Time, delays interactivity (INP >200ms), and if the widget injects layout-affecting DOM elements on load, contributes to CLS >0.1.

**Prevention:**
- Load SalesIQ via `<Script strategy="afterInteractive">` (Next.js Script component) — never in `<head>` directly.
- Reserve space for the chat widget in CSS to prevent layout shift when it mounts.
- Test INP and CLS with Chrome DevTools after SalesIQ is integrated, not just before.

**Phase to address:** Phase 3 (Remaining Items) — when integrations are added. Do not treat SalesIQ as a drop-in script.

---

## Minor Pitfalls

---

### Pitfall 14: GA4 + GTM Misconfiguration Sends Duplicate Events

**What goes wrong:** GA4 is configured both directly (via `gtag.js`) and through GTM. Both fire simultaneously, doubling all event counts and inflating conversion metrics. Client reports inaccurate data; reporting dashboard in Phase 4 is built on bad numbers.

**Prevention:**
- Use GTM exclusively. Do not install GA4's `gtag.js` snippet directly if GTM is present.
- Verify in GA4 DebugView that events fire once per interaction.
- Test on staging before go-live.

**Phase to address:** Phase 3 (Remaining Items) — analytics setup.

---

### Pitfall 15: robots.txt Blocking Sanity Studio or API Routes

**What goes wrong:** An overly broad `robots.txt` `Disallow: /api/` rule blocks Sanity webhook endpoints or Next.js API routes used for ISR revalidation. Alternatively, `Disallow: /studio/` accidentally blocks a path that was already crawlable.

**Prevention:**
- Only disallow paths that actually serve user-facing content you don't want indexed.
- Sanity Studio (`/studio`) should be disallowed (it's an admin tool, not a public page), but this is intentional.
- API routes (`/api/revalidate`, `/api/webhooks`) should be disallowed from indexing but must remain accessible to Vercel and Sanity servers.
- Test `robots.txt` with Google Search Console's robots.txt tester before launch.

**Phase to address:** Phase 2 (Core Build).

---

### Pitfall 16: Client Cannot Operate Post-Handoff Without Documentation

**What goes wrong:** The handoff includes the GitHub repository and Vercel project, but no documented workflow for the non-developer client to: publish a new city page, add a blog post, update pricing, trigger a reindex after content changes. Client files a warranty claim or abandons the investment.

**Prevention:**
- Produce three SOPs as part of the Phase 4 handoff deliverable:
  1. How to publish a new city page (Sanity Studio walkthrough).
  2. How to trigger ISR revalidation after a publish event (should be automatic via webhook, but manual fallback documented).
  3. How to check Google Search Console for indexing status of new pages.
- Record a Loom walkthrough of each SOP.
- Credential transfer checklist: GitHub (REVUN account), Vercel, Sanity project, Google Search Console, GA4, GTM, Zoho SalesIQ — all transferred with verified access before invoice for final payment.

**Phase to address:** Phase 4 (Launch + Handoff) — but documentation must be written during build phases, not scrambled together at the end.

---

## Phase-Specific Warnings

| Phase | Topic | Likely Pitfall | Mitigation |
|-------|-------|---------------|------------|
| Phase 1: Architecture | CMS schema design | City pages allow publishing without local data | Required fields in Sanity schema for minimum differentiation |
| Phase 1: Architecture | ISR strategy decision | generateStaticParams pre-builds everything, breaks Vercel build | Decide on-demand ISR before any dynamic route is written |
| Phase 1: Architecture | URL structure finalization | Trailing slash inconsistency creates duplicate content | Set trailingSlash policy in next.config.ts on day one |
| Phase 2: Core Build | First page templates | metadataBase missing; all canonicals are relative | Set metadataBase in root layout.tsx immediately |
| Phase 2: Core Build | Hero block component | LCP image without priority prop | Code review checklist item: Hero must have priority |
| Phase 2: Core Build | Server vs Client components | Data fetched client-side becomes invisible to crawlers | All CMS content fetches in Server Components only |
| Phase 2: Core Build | Schema markup | JSON-LD and rendered HTML from different data sources | Single data source pattern enforced in code review |
| Phase 2: Core Build | Sanity client config | useCdn: false deployed to production | Environment-specific Sanity client configuration |
| Phase 3: Remaining Items | Zoho SalesIQ | Synchronous script blocks render | Next.js Script component with afterInteractive strategy |
| Phase 3: Remaining Items | Analytics | Dual GA4 + GTM installation | GTM-only installation; verify in DebugView |
| Phase 4: Handoff | Client independence | No SOPs = warranty claims or abandonment | Three SOPs + Loom walkthroughs as handoff deliverables |
| Ongoing | Content publishing | City pages published without local data | Sanity required fields + editorial QA checklist |

---

## Sources

- [Google Crawl Budget Management for Large Sites](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) — official
- [Google General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — official
- [Next.js ISR Documentation](https://nextjs.org/docs/app/guides/incremental-static-regeneration) — official
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — official
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — official
- [Next.js Sitemap File Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — official
- [Vercel Build Timeout Troubleshooting](https://vercel.com/kb/guide/troubleshooting-build-error-build-step-did-not-complete-within-45-minutes) — official
- [Vercel Build Time Optimization](https://vercel.com/kb/guide/how-do-i-reduce-my-build-time-with-next-js-on-vercel) — official
- [Vercel Limits](https://vercel.com/docs/limits) — official
- [Sanity Technical Limits](https://www.sanity.io/docs/content-lake/technical-limits) — official
- [Sanity High Performance GROQ](https://www.sanity.io/docs/developer-guides/high-performance-groq) — official
- [Sanity API Cost Discussion](https://www.sanity.io/answers/discussion-on-potential-unexpected-costs-of-using-sanity-cms-due-to-api-usage-) — MEDIUM confidence
- [Why a Programmatic SEO Site Recovered After Deindexing — Search Engine Journal](https://www.searchenginejournal.com/why-website-deindexed-by-google-for-programmatic-seo-bounced-back/552179/) — MEDIUM confidence
- [Pages Unindexed After June 2025 Update](https://www.getpassionfruit.com/blog/why-website-pages-are-getting-de-indexed-after-june-2025-google-core-update-complete-recovery-guide) — MEDIUM confidence
- [Property Management SEO Blueprint 2026](https://www.clearleaddigital.com/blog/property-management-seo-blueprint) — MEDIUM confidence
- [Real Estate Schema Markup Implementation Guide](https://plantandgrowseo.com/real-estate-schema-markup-implementation-guide/) — MEDIUM confidence
- [Core Web Vitals 2026 Optimization](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) — MEDIUM confidence
- [Next.js Trailing Slash Handling](https://copyprogramming.com/howto/how-can-you-handle-trailing-slashes-in-next-js-routes) — MEDIUM confidence
- [6 Common Property Management Website SEO Mistakes — AppFolio](https://www.appfolio.com/blog/property-management-website-seo) — MEDIUM confidence
