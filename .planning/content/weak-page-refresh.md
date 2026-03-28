# Weak Page Refresh Workflow

A repeatable process for identifying, diagnosing, and improving underperforming pages on MoveSmart Rentals using Google Search Console (GSC) data. Run this workflow monthly to keep content competitive.

**Audience:** Content editors and SEO managers.
**Tools required:** Google Search Console, Sanity Studio, optional Google Analytics (GA4).
**Time commitment:** 2-4 hours per monthly review cycle.

---

## When to Run This Workflow

- **Monthly** after GSC data accumulates (minimum 28 days of data for reliable metrics)
- **After major content updates** (wait 2-4 weeks, then check impact)
- **When organic traffic drops** for a specific page or section
- **Before quarterly business reviews** to prepare content performance reports

---

## Step 1: Identify Weak Pages

### In Google Search Console

1. Navigate to **Google Search Console > Performance > Search results**
2. Set the date range to **last 28 days** (or last 3 months for trend analysis)
3. Click the **Pages** tab to see per-URL performance
4. Ensure all four metrics are enabled: Clicks, Impressions, CTR, Position

### Weakness Pattern A: High Impressions, Low CTR

**Symptom:** Page appears in search results frequently but users do not click.

1. Sort by **Impressions** (descending)
2. Look for pages with **Impressions > 100** but **CTR < 2%**
3. These pages rank for relevant queries but their search listing (title + description) is not compelling enough

**Diagnosis:** The meta title and/or meta description are not enticing or do not match the search intent.

### Weakness Pattern B: Declining Average Position

**Symptom:** Page was ranking well but is dropping.

1. Compare **last 28 days** vs **previous 28 days** (use date comparison)
2. Look for pages where average position **increased by 5+ positions** (e.g., was position 8, now position 15)
3. These pages are being outranked by competitors with fresher or deeper content

**Diagnosis:** Content depth, data freshness, or internal linking is insufficient.

### Weakness Pattern C: Zero Impressions

**Symptom:** Page is published but not appearing in search at all.

1. Sort by **Impressions** (ascending) or filter for impressions = 0
2. Cross-reference with **Coverage/Indexing** report to check if the page is indexed
3. If not indexed: indexing issue. If indexed but zero impressions: content or keyword targeting issue.

**Diagnosis:** Indexing problem, no internal links pointing to the page, or targeting keywords with no search volume.

### Weakness Pattern D: High Bounce Rate (requires GA4)

**Symptom:** Users land on the page but leave immediately.

1. In GA4, navigate to **Reports > Engagement > Pages and screens**
2. Filter for the page URL
3. Check **Bounce rate** and **Engagement rate**
4. Pages with bounce rate > 75% may have content quality or user experience issues

**Diagnosis:** Content does not match search intent, poor page design, or missing CTAs.

---

## Step 2: Diagnose the Issue

For each weak page identified in Step 1, check the following areas. Score each area as PASS or FAIL.

### Diagnostic Checklist

| Area | Check | Pass Criteria |
|------|-------|---------------|
| **Meta Title** | Is it compelling? Does it include the target keyword? | 50-60 chars, keyword in first half, includes city name |
| **Meta Description** | Does it match search intent? Does it include a CTA? | 140-160 chars, includes keyword, has call to action |
| **Content Depth** | Does the page have substantial unique content? | 500+ words of unique, non-generic content |
| **Local Specificity** | Does it mention specific neighbourhoods and data points? | 3+ neighbourhoods, 2+ data points (rent, vacancy, population) |
| **Data Freshness** | Is the market data current? | Within last 12 months |
| **FAQ Section** | Are there 3-5 substantive FAQ Q&A pairs? | 3+ FAQs, each answer 50-100 words |
| **Internal Links** | Does the page link to related pages and is it linked FROM related pages? | 2+ outgoing links, 2+ incoming links |
| **Hero Section** | Is the hero headline unique and compelling? | Not a generic "[Service] in [City]" pattern |
| **CTA Presence** | Does the page have clear calls to action? | At least 1 CTA above the fold |

---

## Step 3: Refresh Priority Matrix

After diagnosing, prioritize refresh actions by impact.

### Priority 1: Quick Wins (30 minutes or less)

| Weakness Pattern | Action | Expected Impact | Time |
|-----------------|--------|-----------------|------|
| High impressions, low CTR | Rewrite meta title and description | CTR improvement within 2-4 weeks | 15 min |
| Missing FAQ section | Add 3-5 FAQ Q&A pairs | FAQ rich results eligibility | 30 min |
| Outdated data | Update population, rent, vacancy numbers | Content freshness signal | 15 min |

### Priority 2: Content Improvements (1-2 hours)

| Weakness Pattern | Action | Expected Impact | Time |
|-----------------|--------|-----------------|------|
| Declining position | Add 200+ words of new local content | Depth signal improvement | 1 hr |
| Thin local content | Expand neighbourhood references, add regulatory context | Local relevance improvement | 1 hr |
| Missing internal links | Add links to/from related city and service pages | Internal link equity distribution | 30 min |

### Priority 3: Major Refresh (half day)

| Weakness Pattern | Action | Expected Impact | Time |
|-----------------|--------|-----------------|------|
| Zero impressions (indexed) | Full content rewrite with new keyword targeting | New ranking opportunity | 2-3 hrs |
| High bounce rate | Restructure content, improve hero, add CTAs | Engagement improvement | 2-3 hrs |
| Zero impressions (not indexed) | Fix technical issue, add internal links, request indexing | Page enters search results | 1-2 hrs |

---

## Step 4: Update Content in Sanity Studio

### For CityService Pages

1. Open the page's CityService document in Sanity Studio
2. Identify which fields need updating based on your diagnosis:
   - **Meta title/description**: Expand **SEO** section, update `metaTitle` and `metaDescription`
   - **Content depth**: Edit `localBody` (the rich text field in Required Local Content)
   - **FAQ**: Expand **Content Blocks**, scroll to FAQ, add/edit question-answer pairs
   - **Market data**: Update `localMedianRent` and `localVacancyRate` in Required Local Content
   - **Neighbourhoods**: Update `neighbourhoodNames` in Required Local Content
   - **Regulatory**: Update `localRegulatory` text
   - **Hero**: Edit `heroHeadline` for a more compelling headline
3. Update the **Publishing Controls**:
   - Set `updatedAt` to today's date
4. Click **"Publish"**
5. Wait 60 seconds for ISR revalidation
6. Hard-refresh the live page to verify changes

### For City Hub Pages

1. Open the City document in Sanity Studio
2. Update the relevant fields: `description`, `population`, `medianRent`, `vacancyRate`, `neighbourhoods`
3. Update SEO fields: `seo.metaTitle`, `seo.metaDescription`
4. Set `publishing.updatedAt` to today
5. Publish and verify

### For Blog/Guide Pages

1. Open the Blog/Guide document in Sanity Studio
2. Update `body` content, add new sections or data points
3. Update `seo.metaTitle` and `seo.metaDescription` if targeting has changed
4. Set `publishing.updatedAt` to today
5. Publish and verify

### Using the Prompt Framework for Refreshes

When rewriting substantial content, use the [Prompt Framework](./prompt-framework.md) to generate updated first drafts:
- For CityService content: Use Prompt 2 (CityService Page Content) with updated data
- For new FAQs: Use Prompt 3 (CityService FAQ Generation)
- For meta title/description: Use Prompt 5 (Meta Title and Description)

---

## Step 5: Track Results

### After Each Refresh Cycle

Create a record of what was changed so results can be tracked.

| Page URL | Weakness Pattern | Action Taken | Date | Before Metrics | After Metrics (4 weeks later) |
|----------|-----------------|--------------|------|----------------|-------------------------------|
| `/ca/ontario/mississauga/tenant-screening/` | Low CTR (1.2%) | Rewrote meta title and description | 2026-04-01 | CTR 1.2%, Pos 8.3 | _check after 4 weeks_ |

### When to Measure Results

- **Meta title/description changes**: Check CTR after **2-4 weeks**
- **Content depth additions**: Check position after **4-6 weeks**
- **New FAQ sections**: Check for rich results after **2-4 weeks**
- **Full content rewrites**: Check impressions and position after **6-8 weeks**

### What Success Looks Like

| Metric | Target Change | Timeframe |
|--------|--------------|-----------|
| CTR | +0.5% or more | 2-4 weeks |
| Average Position | Improved by 3+ positions | 4-6 weeks |
| Impressions | +20% or more | 4-8 weeks |
| Bounce Rate | -10% or more | 2-4 weeks |

If a page does not improve after one refresh cycle, escalate to a full content audit or consider whether the target keyword strategy needs to change.

---

## Refresh Frequency by Content Tier

| Content Type | Review Frequency | Refresh Trigger |
|---|---|---|
| Tier-1 Ontario cities (top 20) | Monthly | Any weakness pattern detected |
| Tier-2 cities (Canadian expansion) | Quarterly | CTR < 1.5% or position drop > 5 |
| US state/city pages | Quarterly | CTR < 1.5% or position drop > 5 |
| CityService pages (Tier-1) | Monthly | CTR < 2% or position > 15 |
| CityService pages (Tier-2+) | Quarterly | CTR < 1% or not indexed |
| Blog posts | Every 6 months | Traffic decline > 20% month-over-month |
| Guides and legal guides | Annually | Regulatory changes or data staleness |

---

## Appendix: GSC Quick Navigation

| Report | Path in GSC | What It Shows |
|--------|-------------|---------------|
| Search Performance | Performance > Search results | Clicks, impressions, CTR, position per page |
| Page Indexing | Indexing > Pages | Which pages are indexed, errors, exclusions |
| URL Inspection | Top search bar | Index status for a specific URL |
| Sitemaps | Indexing > Sitemaps | Submitted sitemap status and coverage |

---

*Last updated: 2026-03-28*
*Part of: Content Production System (Plan 03-07)*
*See also: [Publishing Workflow](./publishing-workflow.md) | [Prompt Framework](./prompt-framework.md)*
