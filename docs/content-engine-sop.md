# Content Engine — Standard Operating Procedure

Operational guide for the MoveSmart Rentals content team covering page-type selection, first-draft prompts, editorial review, SEO QA, publishing cadence, and refresh protocols.

Contract references: §17.6 (content production workflow), §20.12 and §20.15 (voice, tone, banned phrases, imagery).

Audience: content strategists, staff writers, copy editors, SEO specialists, CMS administrators.

Status: living document. Revise whenever the contract updates or when a production learning changes practice.

---

## 1. Page-type selector (CMS workflow)

Every piece of content targets exactly one primary page type. Picking the wrong template is the single most common cause of wasted drafts and cannibalized rankings.

### Decision tree

Start with the user intent behind the target keyword, then confirm with a SERP audit.

1. **Commercial investigational (e.g., "rent guarantee Toronto")** — pick **service-plus-city**. A city-specific service landing page with pricing signal, concierge offer, and one primary CTA.
2. **Commercial local (e.g., "tenant placement Mississauga")** — pick **service-plus-city**.
3. **Local discovery (e.g., "rentals Oakville")** — pick **city page** (hub). Dual-audience: owners and tenants. Links down to services and listings.
4. **Informational how-to (e.g., "how to screen tenants in Ontario")** — pick **guide** (long-form 1,200 to 2,000 words, dual audience optional).
5. **Product comparison (e.g., "MoveSmart vs Buttonwood")** — pick **comparison** page.
6. **Inventory lookup (e.g., "3 bedroom rental Toronto")** — pick **property detail** or property **category** listing.
7. **Trust and credibility ("property management reviews Hamilton")** — pick **reviews** or **case study**.

If two templates seem to fit, pick the one with the **stronger commercial signal**. Guides drive discovery; service-plus-city drives revenue.

### CMS selector

In Sanity, every new document begins with a **page type** dropdown. The dropdown enforces the template fields, prevents mixing (e.g., no service fields on a pure guide), and auto-generates schema scaffolding.

---

## 2. First-draft prompt framework

Prompts below are written for AI-assisted drafting. They also work verbatim as human-writer briefs. Do not publish AI output without human editorial review (see section 3).

### 2.1 City page prompt

Fields to provide the model:

- City name and province
- Population and rental household share
- 3 to 5 key neighborhoods with one-sentence character descriptions
- Current average rent by bedroom count (1BR, 2BR, 3BR)
- Vacancy rate
- Local regulatory notes (rent control status, LTB jurisdiction for Ontario, landlord registry requirements)

Prompt scaffold:

> Draft a dual-audience city page for property owners and tenants in {city}, {province}. Voice: Strategic, Professional, Concierge. Do not use the phrases "full-service property management", "property manager", "rent collection", "#1", or "top 1%". Produce the following sections in order: (1) hero_heading — 8 to 12 words, fact-led; (2) hero_subheading — 20 to 30 words, names the outcome and the city; (3) city_intro — 150 to 250 words covering geography, rental demand drivers, and why owners and tenants engage us; (4) rental_market_summary — 150 to 250 words citing average rent, vacancy, and rent growth with the source year; (5) landlord_problem_summary — 100 to 150 words naming the three most common pain points in this market; (6) eight FAQ items with 60 to 90 word answers, each answering a distinct search intent.

Output contract: JSON with the six keys above. No marketing superlatives. Facts must be cited inline with the source year.

### 2.2 Service-plus-city prompt

Fields to provide:

- Service name (one of the 9 core services)
- City name and province
- Local fee benchmarks or market context
- One concrete local proof point (address range, case study, testimonial quote)

Prompt scaffold:

> Draft a service-plus-city landing page for {service} in {city}, {province}. Voice: Strategic, Professional, Concierge. Avoid banned phrases from the SOP. Sections: (1) hero_heading 8 to 12 words; (2) hero_subheading 20 to 30 words; (3) service_overview 120 to 180 words explaining what the service includes and what it does not; (4) local_relevance 100 to 150 words tying the service to {city} market dynamics; (5) process — 4 to 6 numbered steps, each 20 to 35 words; (6) pricing_transparency 60 to 100 words referencing the pricing page (do not quote figures inline); (7) six FAQ items 60 to 90 words each. Primary CTA: "Book a 20-minute fit call". Secondary CTA: "See pricing".

### 2.3 Guide prompt (long-form)

> Draft a 1,200 to 2,000 word guide titled "{working title}" for {audience}. Voice: Strategic, Professional, Concierge, Disciplined. Structure with H2 section breaks every 200 to 300 words; use H3 for sub-points. Include: an opening 80 to 120 word summary for featured-snippet capture; a numbered list or table in the first 600 words; an internal-links section recommending 3 to 5 related MoveSmart pages; an author byline; a last-reviewed date. End with an FAQ block of 5 to 8 questions. Do not use "top 10", "best ever", or superlatives. Cite statistics with source and year.

### 2.4 Comparison prompt

> Draft a fair, evidence-based comparison page: MoveSmart Rentals vs {competitor}. Sections: (1) 80-word summary; (2) comparison table with 8 to 12 dimensions (scope, pricing model, geographies, guarantee terms, technology, onboarding time, reporting cadence, cancellation terms, reviews); (3) "When {competitor} is the right choice" 80 to 120 words; (4) "When MoveSmart is the right choice" 80 to 120 words; (5) transparent caveats section; (6) FAQ 4 items. Neutral tone. No disparagement. Cite any public figures with source.

### 2.5 Property detail prompt

> Draft a property detail listing for {address}. Sections: (1) 40 to 60 word hook leading with the single strongest feature; (2) property_facts block — bedrooms, bathrooms, square footage, parking, utilities, available date, lease term; (3) neighborhood_snapshot 80 to 120 words; (4) inclusions and exclusions list; (5) viewing and application instructions; (6) compliance disclosure. No superlatives. Fair-housing compliant phrasing only.

---

## 3. Human-editor review workflow

Every AI or staff draft passes a human editor before SEO QA.

### Editor checklist

- Brand voice is Strategic, Professional, Concierge, Disciplined, Transparent.
- Zero banned phrases (see section 8).
- No superlatives, no "#1", no "top 1%", no luxury-ego language.
- Facts verified against a cited source; source year is present.
- Dual-audience coverage is correct where the template requires it (city pages: both owners and tenants; service-plus-city: primarily owners).
- Unique content: overlap against the 3 most-similar existing pages is under 20 percent (use the repo's similarity check or a simple diff).
- Internal links: 8 to 15 in-body, all to live URLs, no broken anchors.
- Primary and secondary CTAs match template spec.
- Reading grade level 9 to 11 (Hemingway or equivalent).
- Numbers and dates use consistent formatting (currency with symbol, dates ISO or long-form, not mixed).
- Images: alt text is descriptive and real; see section 10.

Editor turnaround SLA: 24 business hours from draft handoff.

---

## 4. SEO-editor QA workflow

After editorial approval, the SEO editor runs the technical pass before publishing.

### SEO checklist

- Title tag 50 to 60 characters, primary keyword in first 40 characters.
- Meta description 140 to 160 characters, includes a CTA verb and primary keyword.
- H1 is unique across the site, matches page intent, appears exactly once.
- H2 and H3 hierarchy is logical; no skipped levels.
- Primary keyword density 1 to 2 percent; no stuffing.
- Internal links 8 to 15, anchors are descriptive, none to noindex pages.
- External links are authoritative (Stats Canada, CMHC, provincial tribunal, etc.).
- Schema.org markup present and valid — page-type appropriate (LocalBusiness, Service, Article, FAQPage, BreadcrumbList).
- Canonical URL matches the public URL, includes trailing slash per site convention.
- OpenGraph and Twitter meta present with correct image dimensions.
- Every image has alt text; no decorative image without `alt=""`.
- Mobile viewport and core web vitals: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- Sitemap updated (the segmented sitemaps regenerate automatically on deploy; confirm the URL appears in `/sitemap-core.xml`, `/sitemap-ca.xml`, `/sitemap-us.xml`, or `/sitemap-resources.xml` as appropriate).

### Tooling

- Run `npx tsc --noEmit` to ensure the repo still type-checks if any structured content field changed the generated type.
- Run a keyword density tool (SEMrush, Surfer, or the internal script in `scripts/keyword-density.ts` when present).
- Manual Search Console check 48 to 72 hours after publish: confirm the URL is discovered, indexed, and not flagged for issues.

SEO QA turnaround SLA: 24 business hours.

---

## 5. Publishing workflow

Pipeline: **Draft → Editorial review → SEO QA → Publish in CMS → Sitemap regenerate → Search Console submit → Log in content tracker**.

### Detailed steps

1. **Draft.** Writer produces the first version in the CMS or an approved doc. Attach the brief and prompt used. SLA: 48 hours from assignment.
2. **Editorial review.** Editor applies the section 3 checklist. Round-trip SLA: 24 hours.
3. **SEO QA.** SEO editor applies the section 4 checklist. SLA: 24 hours.
4. **Publish.** CMS administrator flips the status to Published. Required fields are enforced by schema.
5. **Sitemap regenerate.** Deploys trigger the sitemap re-generation. On a production deploy the segmented sitemaps update within 60 minutes.
6. **Search Console submit.** For material new URLs (city, service-plus-city, flagship guide), manually submit to Search Console URL Inspection and request indexing. Batch tier-3 cities in a weekly submit.
7. **Log.** Add the URL, publish date, primary keyword, target audience, and owner to the content tracker spreadsheet.

Total assignment-to-publish SLA: **5 business days**. Rush jobs (campaign-driven) can compress to 72 hours with prior sign-off.

---

## 6. Weak-page refresh workflow

Pages underperform. This is normal. The refresh protocol keeps the library healthy without letting weak content rot.

### Trigger criteria (any of the following)

- Impressions down more than 30 percent month-over-month for 2 consecutive months.
- Click-through rate below 2 percent for a page in the top 30 results.
- Rank position worse than 20 for the primary keyword after 90 days live.
- Engagement: average engagement time under 20 seconds (GA4).
- User-reported inaccuracy or stale fact.

### Refresh protocol

1. **Audit.** Pull the last 90 days of GSC and GA4 data. Identify the top 3 queries the page already ranks for, and the top 3 queries Google thinks the page should rank for but does not.
2. **Competitive gap check.** Review the top 5 SERP competitors. Note structural gaps (missing sections, missing schema, shorter content, weaker internal links).
3. **Rewrite.** Refresh the intro (first 150 words), the FAQ block, and at least 3 internal links. Swap in current statistics. Add any missing sections the SERP demands.
4. **Republish.** Update the `lastmod` field. Keep the URL identical — do not redirect unless the page's intent has fundamentally shifted.
5. **Re-submit.** Send the URL to Search Console for re-indexing. Log the refresh in the content tracker with the reason.
6. **Measure.** Review the same page 30 days later. If metrics have not moved, escalate to a structural rewrite or consolidation.

Refresh cadence: SEO editor triages the candidate list weekly. 3 to 5 pages refreshed per week is the standard throughput.

---

## 7. Daily publishing cadence

The engine's steady-state throughput, once fully staffed:

- **2 to 3 city pages per day** — tier-1 and tier-2 Canadian cities first, then tier-3, then US expansion.
- **1 guide per week** — long-form 1,200 to 2,000 words.
- **1 case study per month** — real owner or tenant story, 600 to 1,000 words, with permission.
- **1 comparison page per month** — against a rotating competitor from the intel file.

### Dependency reduction

Content team must be able to publish **entirely through the CMS** — no code changes per page. The Sanity schema covers every published page type. If a writer needs a field that is not in the schema, file a CMS ticket, not a design or engineering ticket. Avoid one-off pages that require bespoke code; they do not scale.

If a page truly needs a new component, batch the request with the next schema sprint.

---

## 8. Banned phrases (contract §20.12, §20.15)

Do not use any of the following, in any template, anywhere on the site. Editors must reject drafts that contain these phrases.

- "full-service property management"
- "property manager" (as describing us or our team)
- "rent collection"
- "work order"
- "monthly statement"
- "T776 service"
- "98% occupancy managed"

Why: these phrases either mis-describe the service model, imply regulated activity we do not perform, or are unprovable marketing claims. Replace with accurate concierge-first alternatives: "tenant placement and leasing concierge", "leasing specialist", "rent follow-up coordination" (only if applicable), "maintenance coordination", "owner dashboard reporting".

Also avoid: "#1", "top 1%", "best in {market}", "premier", "luxury property management", "world-class", "trusted by thousands" (unless verifiable and cited).

---

## 9. Voice and tone anchors

### Do

- **Strategic** — every sentence earns its place, explains the why, points to an action.
- **Professional** — precise vocabulary, correct technical terms, no slang.
- **Concierge** — warm, service-first, attentive to the reader's situation.
- **Disciplined** — tight sentences, no filler, no windup.
- **Transparent** — name the trade-off, cite the source, show the fee structure.

### Don't

- Salesy. No exclamation marks in body copy. No "act now", no "don't miss out".
- Superlative hype. No "best", "#1", "top 1%", "leader in the industry".
- Luxury ego. Do not flex wealth, exclusivity, or status.
- Empty authority. If a claim is not cited, either cite it or cut it.

---

## 10. Images (contract §20.15)

### Alt text rules

- Describe the actual image content first — what a screen reader user needs to understand the frame.
- Include location or service only when genuinely relevant (e.g., "Kitchen of a renovated 2-bedroom rental in Oakville" is fine; "Beautiful luxury property" is not).
- Keep alt text under 125 characters.
- Decorative-only images use `alt=""`; do not skip the attribute.
- Do not stuff keywords. Google penalizes and screen readers punish the user.

### Image generation

Every image in the CMS has an **image prompt** field. Use the field to keep a shareable, repeatable prompt for the image so that future refreshes or regenerations maintain visual consistency.

Style anchors for generated images (DALL-E, Midjourney, or stock):

- Real Canadian or US residential interiors and exteriors, daylight lighting.
- Neutral palette consistent with the brand (navy, emerald, warm gold, warm whites).
- Human figures optional; when present, respectful and inclusive.
- Avoid glossy luxury staging that implies exclusivity the service does not promise.
- No text overlays in the generated image itself — text goes in HTML.

File rules: WebP or AVIF at 2x resolution, under 200 KB after optimization, width 1600 px for hero, 1200 px for inline. LCP image must be priority-loaded.

---

## Revision history

- 2026-04-14 — Initial SOP published in connection with the segmented sitemap rollout (§7.6) and the content engine scope (§17.6, §20.15).

---

*This SOP is the operational companion to the revamp masterplan. When the masterplan changes, update the relevant section here within one business week.*
