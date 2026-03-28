# CMS & Content Engine Architecture Recommendation Report
## Canadian Real Estate Rental Property Management Website
### Date: March 28, 2026

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [CMS Platform Evaluation](#2-cms-platform-evaluation)
3. [Primary Recommendation: Sanity.io](#3-primary-recommendation-sanityio)
4. [Content Model Architecture](#4-content-model-architecture)
5. [Schema Design: All Entity Types](#5-schema-design-all-entity-types)
6. [Content Production Machine: Architecture](#6-content-production-machine-architecture)
7. [AI-Assisted Content Generation Framework](#7-ai-assisted-content-generation-framework)
8. [Editorial & Publishing Workflow](#8-editorial--publishing-workflow)
9. [Schema/Structured Data Generation](#9-schemastructured-data-generation)
10. [Sitemap & Indexing Automation](#10-sitemap--indexing-automation)
11. [Weak-Page Refresh Workflow](#11-weak-page-refresh-workflow)
12. [Publishing SOPs & QA Checklists](#12-publishing-sops--qa-checklists)
13. [Cost Analysis](#13-cost-analysis)
14. [Implementation Roadmap](#14-implementation-roadmap)
15. [Sources](#15-sources)

---

## 1. Executive Summary

This report recommends **Sanity.io** as the primary CMS for the Canadian real estate rental property management website. The contract requires a CMS that functions as a "content production machine" -- not a simple WYSIWYG editor. After evaluating 7 platforms against the contract requirements (9 entity types, 15-20+ structured fields per entity, non-developer publishing, AI-assisted drafting, editorial workflows, and SEO quality gates), Sanity.io emerges as the strongest fit due to its:

- **Schema-as-code architecture** that supports unlimited custom fields and complex content models
- **React-based Studio** that provides a non-developer-friendly editing experience with drag-and-drop workflows
- **GROQ query language** enabling bidirectional relationships (city <-> service pages)
- **Native workflow plugins** for draft -> review -> approve -> publish pipelines
- **Real estate-specific content modeling** support with every field queryable via API
- **Strong Next.js integration** via `next-sanity` package with visual editing
- **Validation system** that blocks publishing until SEO fields pass quality gates

**Runner-up**: Payload CMS (best if budget is a hard constraint and dev team is strong)

---

## 2. CMS Platform Evaluation

### Evaluation Matrix

| Criteria | Sanity | Payload | Strapi | Contentful | Directus | Ghost | WordPress |
|---|---|---|---|---|---|---|---|
| **Custom structured fields (20+)** | A+ | A+ | A | A | A | D | B (ACF) |
| **Non-dev publishing UX** | A+ | B+ | B+ | A | B | A | A+ |
| **Next.js integration** | A+ | A+ | A | A | B+ | B | C |
| **Content relationships** | A+ | A | A | A | A | D | C |
| **Workflow/approvals** | A (plugins) | B+ | B | A+ | B | C | B (plugins) |
| **Schema validation/SEO gates** | A+ | A | B+ | A | B+ | C | C |
| **AI integration readiness** | A | A | B+ | A | B | B | B |
| **Cost at scale (1000+ pages)** | B+ | A+ | A | C | A | A | A |
| **Visual editing** | A+ | A | B+ | A | B | C | A |
| **Real-time collaboration** | A+ | B | B | A | B | C | C |

### Platform-by-Platform Assessment

#### Sanity.io -- RECOMMENDED
- **Strengths**: Content Operating System philosophy. Schema defined in code with full version control. GROQ query language enables complex cross-references. React-based Studio allows custom input components, dashboards, and workflows. Visual editing with click-to-edit. Real-time collaboration. Content Lake stores structured data, not rich text blobs. Acquired G2 #1 rating for 4 consecutive years.
- **Weaknesses**: SaaS-hosted Content Lake (cannot self-host backend). API request costs at scale need monitoring. Learning curve for GROQ.
- **Best for**: This project's exact requirements -- structured content at scale with editorial workflows.

#### Payload CMS -- STRONG RUNNER-UP
- **Strengths**: Open-source, MIT-licensed. Self-hostable (zero licensing cost). Native Next.js integration (runs inside your Next.js app). Local API with sub-10ms queries. Database freedom (Postgres, MongoDB, SQLite). Acquired by Figma in 2025 -- financially de-risked.
- **Weaknesses**: Less polished editorial UX compared to Sanity. Workflow features less mature. Security vulnerabilities disclosed in 2025 (now patched). Requires more developer involvement for content team customization.
- **Best for**: Teams with strong dev resources who want full control and zero licensing costs.

#### Strapi
- **Strengths**: Large plugin ecosystem. SQL-only architecture (PostgreSQL, MySQL). Good documentation. Open-source.
- **Weaknesses**: No MongoDB support. Less mature visual editing. Content modeling less flexible than Sanity/Payload. Plugin quality varies.
- **Verdict**: Viable but not optimal for this use case.

#### Contentful
- **Strengths**: Enterprise-grade reliability (>99.9% uptime). Excellent workflow/approval features. Strong multi-language support. Mature API ecosystem.
- **Weaknesses**: Expensive at scale. Vendor lock-in. Less developer customization flexibility. Pricing no longer transparent (Lite/Premium tiers, custom enterprise).
- **Verdict**: Overkill and over-budget for this project's scale.

#### Directus
- **Strengths**: Schema-agnostic, wraps existing SQL databases. Granular data modeling. Open-source. Cost-effective.
- **Weaknesses**: Less purpose-built for content publishing. Weaker editorial UX. Smaller community.
- **Verdict**: Better suited as a data management platform than a content production machine.

#### Ghost
- **Strengths**: Beautiful out-of-box experience. Built-in SEO (structured data, canonical tags, sitemaps). Fast.
- **Weaknesses**: Opinionated content model (Posts, Pages, Tags, Authors only). Cannot support 20+ custom fields per entity type. Not designed for multi-city/multi-service content models.
- **Verdict**: **Eliminated.** Cannot support the required content model complexity.

#### WordPress (Headless)
- **Strengths**: Massive ecosystem. Non-dev teams know it. ACF/Custom Post Types can approximate structured content.
- **Weaknesses**: Performance limitations. Plugin dependency for basic CMS features. Security surface area. Not designed for headless architecture. REST/GraphQL APIs are afterthoughts.
- **Verdict**: **Not recommended.** Too many architectural compromises for a modern content production machine.

---

## 3. Primary Recommendation: Sanity.io

### Plan Selection: Growth Plan + Increased Quota Add-on

| Feature | Growth Plan | With Increased Quota |
|---|---|---|
| **Cost** | $15/user/month | + $299/month |
| **Users** | Up to 50 | Up to 50 |
| **Documents** | 25,000 | 50,000 |
| **API CDN Requests** | 1M/month | 5M/month |
| **API Requests** | 250K/month | 1M/month |
| **Bandwidth** | 100 GB | 500 GB |
| **Storage** | 100 GB | 500 GB |
| **Datasets** | 2 (public/private) | 2 |
| **Permission Roles** | 5 | 5 |

**For a 5-person content team**: $15 x 5 + $299 = **$374/month** ($4,488/year)

This comfortably supports 1,000+ pages with room to scale to 50,000 documents.

### Why Sanity Over Payload for This Project

1. **The content team publishes daily without dev tickets.** Sanity Studio's UX is built for editors. Payload requires more developer involvement to customize the admin panel.
2. **Workflow plugins exist.** Sanity has a mature draft-review-publish plugin ecosystem (Workflow Manager, Draft Review Plugin V3). Payload's workflow features are less mature.
3. **Visual editing.** Sanity's click-to-edit from the preview pane is production-ready. Content editors can see exactly what they're changing.
4. **Real estate CMS precedent.** Sanity explicitly markets to real estate with property listings, agent profiles, floor plans, pricing tiers, and neighborhood data as structured data.
5. **GROQ relationships.** Bidirectional references between city and service documents are queryable from either side -- critical for city<->service cross-linking.

---

## 4. Content Model Architecture

### Relational Design Principles

The content model uses a **hub-and-spoke** architecture with cross-references:

```
Province/State (parent)
  |
  +-- City (child of Province, references Services)
  |     |
  |     +-- ServiceCity (junction: references City + Service)
  |     +-- Property Category (references City)
  |     +-- Property Detail (references City + Category)
  |
  +-- Service (standalone, referenced by Cities)
  |
  +-- Blog/Guide (references Cities, Services)
  +-- Comparison (references Services, Cities)
  +-- Case Study (references Cities, Services)
```

### Relationship Model

| Relationship | Type | Direction |
|---|---|---|
| Province -> City | One-to-Many | Province contains Cities |
| City -> Service | Many-to-Many | Via ServiceCity junction documents |
| Service -> City | Many-to-Many | Bidirectional via GROQ `references()` |
| Blog -> City | Many-to-Many | Blog references multiple Cities |
| Blog -> Service | Many-to-Many | Blog references multiple Services |
| Property Category -> City | Many-to-One | Category belongs to City |
| Property Detail -> Category | Many-to-One | Property belongs to Category |
| Property Detail -> City | Many-to-One | Property belongs to City |
| Comparison -> Service | Many-to-Many | Comparison references Services |
| Case Study -> City | Many-to-One | Case Study references a City |
| Case Study -> Service | Many-to-Many | Case Study references Services |

### GROQ Cross-Reference Queries

Sanity's GROQ enables bidirectional lookups without explicit back-references:

```groq
// Get all services available in a city
*[_type == "serviceCity" && city._ref == $cityId]{
  service->{title, slug, description}
}

// Reverse: Get all cities where a service is available
*[_type == "serviceCity" && service._ref == $serviceId]{
  city->{title, slug, province->{ title, slug }}
}

// Get all blog posts mentioning a specific city
*[_type == "blog" && references($cityId)]{
  title, slug, publishedAt
}
```

### Template Inheritance Pattern

Use a shared **SEO fields object** and **publishing controls object** that are composed into every document type:

```
seoFields (reusable object type)
  - seoTitle (string, max 60 chars)
  - metaDescription (string, max 160 chars)
  - ogTitle (string)
  - ogDescription (string)
  - slug (slug)
  - primaryKeyword (string)
  - secondaryKeywords (array of strings)
  - canonicalUrl (url)
  - indexable (boolean, default true)
  - ogImage (image)
  - featuredImage (image)

publishingControls (reusable object type)
  - status (string: draft | in-review | approved | published)
  - author (reference to author document)
  - publishedAt (datetime)
  - updatedAt (datetime)
  - includeSitemap (boolean, default true)
  - redirectFrom (array of strings)
  - schemaType (string: select based on page type)

contentBlocks (reusable object type)
  - heroHeading (string)
  - heroSubheading (string)
  - introBody (rich text / portable text)
  - painPointBlock (object: heading + items array)
  - benefitsBlock (object: heading + items array)
  - howItWorksSteps (array of objects: step number, title, description, icon)
  - trustBlock (object: heading + trust signals array)
  - faqItems (array of objects: question + answer)
  - internalLinkModules (array of references)
  - ctaText (string)
  - ctaFormVariant (string: select from predefined variants)
```

---

## 5. Schema Design: All Entity Types

### 5.1 Province/State Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required, max 100 chars |
| seoFields | seoFields object | All sub-fields validated |
| publishingControls | publishingControls object | Status required |
| heroHeading | string | Required |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 100 words |
| provinceStats | object (population, avgRent, numCities) | Optional |
| painPointBlock | painPointBlock object | Min 3 items |
| benefitsBlock | benefitsBlock object | Min 3 items |
| howItWorksSteps | array of step objects | Min 3 steps |
| trustBlock | trustBlock object | Min 2 signals |
| faqItems | array of FAQ objects | Min 3 items |
| relatedCities | array of city references | Required, min 1 |
| relatedServices | array of service references | Required, min 1 |
| internalLinkModules | array of link modules | Optional |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.2 City Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| province | reference to Province | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Status required |
| heroHeading | string | Required |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 150 words |
| cityStats | object (population, avgRent, neighborhoods, rentGrowth) | Required |
| localMarketData | object (vacancyRate, medianIncome, topEmployers) | Optional |
| painPointBlock | painPointBlock object | Min 3 items |
| benefitsBlock | benefitsBlock object | Min 3 items |
| howItWorksSteps | array of step objects | Min 3 steps |
| trustBlock | trustBlock object | Min 2 signals |
| faqItems | array of FAQ objects | Min 5 items (city-specific) |
| neighborhoodGuide | array of objects (name, description, avgRent) | Optional |
| relatedServices | array of service references | Required, min 3 |
| relatedCities | array of city references | Nearby cities |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.3 Service Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| serviceCategory | string (select) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Status required |
| heroHeading | string | Required |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 200 words |
| painPointBlock | painPointBlock object | Min 3 items |
| benefitsBlock | benefitsBlock object | Min 4 items |
| howItWorksSteps | array of step objects | Min 3, max 7 steps |
| pricingInfo | object (model, startingPrice, details) | Optional |
| trustBlock | trustBlock object | Min 3 signals |
| faqItems | array of FAQ objects | Min 5 items |
| relatedServices | array of service references | Min 2 |
| availableCities | array of city references | Required, min 1 |
| caseStudies | array of case study references | Optional |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.4 Service + City Pages (Junction Pages)

| Field | Type | Validation |
|---|---|---|
| service | reference to Service | Required |
| city | reference to City | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Status required |
| heroHeading | string | Required, must include city + service |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 200 words, must be unique |
| localizedPainPoints | painPointBlock object | Min 3, city-specific |
| localizedBenefits | benefitsBlock object | Min 3, city-specific |
| howItWorksSteps | array of step objects | Min 3 steps |
| localProof | object (testimonials, stats, clientCount) | Required |
| localMarketContext | portable text | Min 100 words, city-specific data |
| trustBlock | trustBlock object | Min 2 signals |
| faqItems | array of FAQ objects | Min 5, localized |
| relatedServiceCityPages | array of references | Min 2 |
| internalLinkModules | array of link modules | Required, min 3 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.5 Blog/Guide Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| category | string (select: guide, howTo, marketUpdate, tips) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Full controls |
| heroHeading | string | Required |
| heroSubheading | string | Optional |
| introBody | portable text | Required, min 100 words |
| bodyContent | portable text (full editor) | Required, min 800 words |
| tableOfContents | auto-generated from H2/H3 | Auto |
| painPointBlock | painPointBlock object | Optional |
| benefitsBlock | benefitsBlock object | Optional |
| keyTakeaways | array of strings | Min 3 items |
| faqItems | array of FAQ objects | Min 3 items |
| relatedCities | array of city references | Optional |
| relatedServices | array of service references | Optional |
| relatedPosts | array of blog references | Min 2 |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated Article schema) | Read-only |

### 5.6 Comparison Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| comparisonType | string (select: serviceVsService, cityVsCity, productComparison) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Full controls |
| heroHeading | string | Required |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 150 words |
| comparisonItems | array of objects (itemName, pros, cons, features, rating) | Required, min 2 |
| comparisonTable | object (headers, rows) | Required |
| verdict | portable text | Required |
| faqItems | array of FAQ objects | Min 3 items |
| relatedServices | array of service references | Optional |
| relatedCities | array of city references | Optional |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.7 Case Studies / Testimonials

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| clientName | string | Required |
| clientType | string (select: landlord, propertyManager, tenant) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Full controls |
| heroHeading | string | Required |
| heroSubheading | string | Optional |
| introBody | portable text | Required |
| challenge | portable text | Required, min 100 words |
| solution | portable text | Required, min 100 words |
| results | object (metrics array: label, value, description) | Required, min 2 |
| testimonialQuote | text | Required |
| testimonialAuthor | string | Required |
| testimonialRole | string | Required |
| relatedCity | reference to city | Required |
| relatedServices | array of service references | Required, min 1 |
| beforeAfter | object (before, after) | Optional |
| faqItems | array of FAQ objects | Optional |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.8 Property Category Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| categoryType | string (select: apartment, condo, house, townhouse, commercial) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Full controls |
| city | reference to city | Required |
| heroHeading | string | Required |
| heroSubheading | string | Required |
| introBody | portable text | Required, min 150 words |
| categoryStats | object (avgRent, numProperties, avgSize) | Required |
| painPointBlock | painPointBlock object | Min 3 items |
| benefitsBlock | benefitsBlock object | Min 3 items |
| featuredProperties | array of property detail references | Optional |
| neighborhoodBreakdown | array of objects (name, avgRent, available) | Optional |
| faqItems | array of FAQ objects | Min 3 items |
| relatedCategories | array of category references | Min 1 |
| relatedServices | array of service references | Min 1 |
| internalLinkModules | array of link modules | Required, min 2 |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated) | Read-only |

### 5.9 Property Detail Pages

| Field | Type | Validation |
|---|---|---|
| title | string | Required |
| propertyType | string (select) | Required |
| seoFields | seoFields object | All validated |
| publishingControls | publishingControls object | Full controls |
| city | reference to city | Required |
| category | reference to property category | Required |
| address | object (street, unit, city, province, postalCode) | Required |
| heroHeading | string | Required |
| heroSubheading | string | Optional |
| introBody | portable text | Required |
| propertyDetails | object (bedrooms, bathrooms, sqft, yearBuilt, parking) | Required |
| pricing | object (monthlyRent, deposit, leaseTerms) | Required |
| amenities | array of strings | Min 3 |
| photoGallery | array of images | Min 3, max 30 |
| floorPlan | image or file | Optional |
| virtualTour | url | Optional |
| nearbyAmenities | array of objects (name, type, distance) | Optional |
| neighborhoodInfo | portable text | Optional |
| availabilityDate | date | Required |
| petPolicy | string | Required |
| faqItems | array of FAQ objects | Optional |
| relatedProperties | array of property references | Optional |
| ctaText | string | Required |
| ctaFormVariant | string (select) | Required |
| schemaMarkup | text (auto-generated RealEstateListing) | Read-only |

---

## 6. Content Production Machine: Architecture

### System Architecture Diagram

```
+-------------------+     +------------------+     +-------------------+
|   PROMPT ENGINE   |     |   SANITY STUDIO   |     |   NEXT.JS SITE    |
|                   |     |                   |     |                   |
| AI Draft Generator|---->| Content Editor    |---->| SSR/SSG Pages     |
| (Claude/GPT API)  |     | Review Workflow   |     | JSON-LD Schema    |
| Template Library   |     | SEO QA Gates      |     | Dynamic Sitemaps  |
| City Data Enricher|     | Publish Controls  |     | ISR Revalidation  |
+-------------------+     +------------------+     +-------------------+
        |                         |                         |
        v                         v                         v
+-------------------+     +------------------+     +-------------------+
| DATA SOURCES      |     | AUTOMATION LAYER  |     | SEO MONITORING    |
|                   |     |                   |     |                   |
| Census/Stats API  |     | Webhook Triggers  |     | GSC API           |
| Market Data Feed  |     | Sitemap Generator |     | IndexNow Pings    |
| CMHC Rental Data  |     | IndexNow/GSC API  |     | Rank Tracking     |
| Local Business DB |     | Slack Notifs      |     | Thin Page Alerts  |
+-------------------+     +------------------+     +-------------------+
```

### Content Production Pipeline

**Stage 1: Data Collection & Enrichment**
- Pull city-specific data from CMHC (Canada Mortgage and Housing Corporation), Statistics Canada, local MLS data
- Maintain a structured data spreadsheet with city-level metrics (population, avg rent, vacancy rate, top employers, neighborhoods)
- This data feeds into both AI prompts and CMS fields

**Stage 2: AI-Assisted First Draft**
- Content team selects: Page Type + City + Service from a dropdown selector in a custom Sanity Studio tool
- System assembles a prompt using the template library + city data + SEO keywords
- AI generates a structured first draft with all required fields populated
- Draft is imported into Sanity as a new document in "Draft" status

**Stage 3: Human Editor Review**
- Editor reviews AI-generated draft in Sanity Studio
- Focuses on: local accuracy, brand voice, unique value, removing generic content
- Adds city-specific anecdotes, local proof points, neighborhood-specific details
- Moves document to "In Review" status

**Stage 4: SEO Editor QA**
- SEO editor checks: keyword placement, meta fields, internal links, FAQ quality
- Validation gates prevent publishing if SEO fields are incomplete
- Runs through SEO checklist (see Section 12)
- Moves document to "Approved" status

**Stage 5: Publish & Index**
- Approved content is published
- Webhook triggers sitemap regeneration
- IndexNow ping is sent to search engines
- GSC URL inspection API verifies crawl
- Slack notification to team

### Daily Publishing Target

With this pipeline, a team of 3 (1 content writer, 1 editor, 1 SEO specialist) can produce and publish **3-5 fully unique pages per day**, scaling to 100+ pages per month. The AI draft cuts initial writing time by 60-70%, leaving human effort focused on localization and quality.

---

## 7. AI-Assisted Content Generation Framework

### Prompt Template Library

Each page type has a master prompt template. Below is the framework:

#### Master Prompt Structure

```
ROLE: You are a Canadian real estate content specialist writing for
[Brand Name], a property management company operating in [Province/City].

TASK: Generate a complete [PAGE_TYPE] page for [CITY], [PROVINCE]
targeting the primary keyword "[PRIMARY_KEYWORD]".

CONTEXT DATA:
- City population: [POPULATION]
- Average rent (1BR): [AVG_RENT_1BR]
- Average rent (2BR): [AVG_RENT_2BR]
- Vacancy rate: [VACANCY_RATE]
- Top neighborhoods: [NEIGHBORHOODS]
- Key employers: [EMPLOYERS]
- Rent trend (YoY): [RENT_TREND]

CONTENT REQUIREMENTS:
Generate the following fields as structured JSON:

1. heroHeading: [max 80 chars, include city name and primary keyword]
2. heroSubheading: [max 150 chars, value proposition]
3. introBody: [200-300 words, establish local authority, mention specific
   neighborhoods and market conditions]
4. painPointBlock:
   - heading: [pain point section title]
   - items: [array of 4-5 pain points specific to renters/landlords in
     this city, reference local challenges]
5. benefitsBlock:
   - heading: [benefits section title]
   - items: [array of 4-5 benefits, tied to local market context]
6. howItWorksSteps: [3-5 steps, each with title and description]
7. trustBlock:
   - heading: [trust section title]
   - signals: [array of 3-4 trust signals with local proof]
8. faqItems: [5-7 FAQs, each must be locally relevant, include specific
   data points like rent ranges, neighborhood names, or local regulations]
9. ctaText: [compelling CTA, max 60 chars]

QUALITY RULES:
- Every paragraph must include at least one city-specific detail
- Do not use generic phrases that could apply to any city
- Reference specific neighborhoods, streets, or landmarks
- Include actual data points (rent ranges, percentages)
- Write in a professional but approachable Canadian English tone
- Avoid American spellings (use "colour" not "color", "centre" not "center")
- FAQ answers must be 80-150 words each
```

#### City-Specific Data Injection

Before sending to the AI, the prompt engine injects real data:

```javascript
// Pseudo-code for prompt assembly
async function generateDraft(pageType, citySlug, serviceSlug) {
  const city = await sanityClient.fetch(
    `*[_type == "city" && slug.current == $slug][0]`,
    { slug: citySlug }
  );

  const template = promptTemplates[pageType];

  const enrichedPrompt = template
    .replace('[CITY]', city.title)
    .replace('[PROVINCE]', city.province.title)
    .replace('[POPULATION]', city.cityStats.population)
    .replace('[AVG_RENT_1BR]', city.cityStats.avgRent1BR)
    .replace('[VACANCY_RATE]', city.cityStats.vacancyRate)
    .replace('[NEIGHBORHOODS]', city.neighborhoods.join(', '))
    .replace('[PRIMARY_KEYWORD]', city.seoFields.primaryKeyword);

  const aiResponse = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{ role: 'user', content: enrichedPrompt }]
  });

  // Parse structured response and create Sanity draft document
  return createSanityDraft(pageType, JSON.parse(aiResponse.content));
}
```

### Avoiding Thin/Duplicate Content

Critical rules for the AI content pipeline:

1. **Unique data injection**: Every city page must include population, rent data, vacancy rates, neighborhood names, and local employers that are factually different.
2. **Minimum uniqueness threshold**: Set a content similarity threshold -- no two city pages should share more than 30% of their body text.
3. **Local proof required**: Each page must include at least 2 locally-verifiable data points (e.g., "Average rent for a 2-bedroom in Kitchener is $1,850/month").
4. **Do not create pages without search demand**: Validate keyword search volume before generating a page. No page should target a keyword with <10 monthly searches.
5. **Human enrichment mandatory**: AI draft is never published directly. Human editor must add/modify at least 20% of the content.

---

## 8. Editorial & Publishing Workflow

### Workflow States

```
DRAFT --> IN REVIEW --> SEO QA --> APPROVED --> PUBLISHED
  |          |            |           |
  v          v            v           v
(Writer)  (Editor)   (SEO Editor)  (Publisher)
```

### Sanity Workflow Implementation

**Recommended Plugin**: `sanity-plugin-workflow-manager`

This provides:
- Kanban board view of all content in pipeline
- Drag-and-drop between workflow states
- User assignment per document
- Publishing calendar with scheduled releases
- Validation checks before state transitions

**Configuration**:
```javascript
// Workflow states configuration
{
  states: [
    { id: 'draft', title: 'Draft', color: 'gray', roles: ['writer'] },
    { id: 'inReview', title: 'In Review', color: 'blue', roles: ['editor'] },
    { id: 'seoQA', title: 'SEO QA', color: 'orange', roles: ['seoEditor'] },
    { id: 'approved', title: 'Approved', color: 'green', roles: ['publisher'] },
    { id: 'published', title: 'Published', color: 'purple', roles: ['publisher'] }
  ],
  transitions: {
    draft: ['inReview'],
    inReview: ['draft', 'seoQA'],
    seoQA: ['inReview', 'approved'],
    approved: ['seoQA', 'published'],
    published: ['draft'] // for revisions
  }
}
```

### Role-Based Permissions

| Role | Can Create | Can Edit | Can Move to Review | Can Approve | Can Publish |
|---|---|---|---|---|---|
| Writer | Yes | Own drafts | Yes | No | No |
| Editor | Yes | All drafts | Yes | No | No |
| SEO Editor | No | SEO fields only | No | Yes | No |
| Publisher | No | All | No | Yes | Yes |
| Admin | Yes | All | Yes | Yes | Yes |

### Sanity Validation Gates (Pre-Publish Checks)

```javascript
// Example: Validation rules that block publishing
{
  name: 'seoTitle',
  title: 'SEO Title',
  type: 'string',
  validation: Rule => [
    Rule.required().error('SEO Title is required before publishing'),
    Rule.max(60).warning('SEO Title should be under 60 characters'),
    Rule.min(30).warning('SEO Title should be at least 30 characters')
  ]
},
{
  name: 'metaDescription',
  title: 'Meta Description',
  type: 'text',
  rows: 3,
  validation: Rule => [
    Rule.required().error('Meta Description is required'),
    Rule.max(160).error('Meta Description must be under 160 characters'),
    Rule.min(120).warning('Meta Description should be at least 120 characters')
  ]
},
{
  name: 'primaryKeyword',
  title: 'Primary Keyword',
  type: 'string',
  validation: Rule => Rule.required().error('Primary keyword is required')
},
{
  name: 'faqItems',
  title: 'FAQ Items',
  type: 'array',
  of: [{ type: 'faqItem' }],
  validation: Rule => Rule.min(3).error('At least 3 FAQ items required')
},
{
  name: 'introBody',
  title: 'Intro Body',
  type: 'portableText',
  validation: Rule => Rule.required().error('Intro body is required')
}
```

**Key principle**: Validation errors block publishing. Validation warnings allow publishing but flag issues. This means a content writer literally cannot publish a page with a missing meta description -- the Publish button is disabled.

---

## 9. Schema/Structured Data Generation

### Architecture: Auto-Generate JSON-LD from CMS Fields

Rather than having editors manually write JSON-LD, the Next.js frontend generates it dynamically from CMS data at render time.

### Schema Types per Page Type

| Page Type | Primary Schema | Additional Schema |
|---|---|---|
| Province/State | WebPage + BreadcrumbList | FAQPage |
| City | WebPage + BreadcrumbList + LocalBusiness | FAQPage |
| Service | Service + BreadcrumbList | FAQPage, HowTo |
| Service + City | Service + LocalBusiness + BreadcrumbList | FAQPage, HowTo |
| Blog/Guide | Article + BreadcrumbList | FAQPage |
| Comparison | Article + BreadcrumbList | FAQPage |
| Case Study | Article + Review + BreadcrumbList | -- |
| Property Category | ItemList + BreadcrumbList | FAQPage |
| Property Detail | RealEstateListing + BreadcrumbList | -- |

### Next.js Implementation Pattern

```typescript
// lib/schema-generator.ts
// Build JSON-LD objects from CMS data -- never from raw editor input

function generateServiceCitySchema(data: ServiceCityPage) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${baseUrl}/${data.slug}#service`,
        name: data.heroHeading,
        description: data.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Company Name',
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.city.title,
            addressRegion: data.city.province.abbreviation,
            addressCountry: 'CA'
          }
        },
        areaServed: {
          '@type': 'City',
          name: data.city.title
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: data.service.title,
            item: `${baseUrl}/services/${data.service.slug}` },
          { '@type': 'ListItem', position: 3, name: data.city.title,
            item: `${baseUrl}/${data.city.province.slug}/${data.city.slug}` },
          { '@type': 'ListItem', position: 4, name: data.heroHeading }
        ]
      }
    ]
  };
}

// Render in page component (App Router, RSC)
export default async function ServiceCityPage({ params }) {
  const data = await getServiceCityData(params);
  const schema = generateServiceCitySchema(data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageContent data={data} />
    </>
  );
}
```

### Validation

- Use Google's Rich Results Test to validate schema after each page type template is built
- Integrate `schema-dts` TypeScript library for type-safe schema generation
- Add automated tests that verify schema output against Schema.org specs
- Monitor Google Search Console "Enhancements" tab for structured data errors

---

## 10. Sitemap & Indexing Automation

### Dynamic Sitemap Generation

```
Next.js App Router sitemap generation:
  app/sitemap.ts --> queries all published Sanity documents
                 --> generates sitemap.xml with lastmod dates
                 --> filters out noindex pages
                 --> filters out non-200 pages
                 --> groups by page type for sitemap index
```

### Sitemap Index Structure

```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>/sitemap-provinces.xml</loc></sitemap>
  <sitemap><loc>/sitemap-cities.xml</loc></sitemap>
  <sitemap><loc>/sitemap-services.xml</loc></sitemap>
  <sitemap><loc>/sitemap-service-cities.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog.xml</loc></sitemap>
  <sitemap><loc>/sitemap-comparisons.xml</loc></sitemap>
  <sitemap><loc>/sitemap-case-studies.xml</loc></sitemap>
  <sitemap><loc>/sitemap-property-categories.xml</loc></sitemap>
  <sitemap><loc>/sitemap-properties.xml</loc></sitemap>
</sitemapindex>
```

### Event-Driven Indexing Pipeline

```
Sanity Publish Event (webhook)
  |
  +--> Regenerate affected sitemap XML
  |
  +--> IndexNow API ping (Bing, Yandex, others)
  |      POST https://api.indexnow.org/indexnow
  |      { url: newPageUrl, key: indexNowKey }
  |
  +--> Google Search Console URL Inspection API
  |      Request indexing for new URL
  |
  +--> Slack notification: "New page published: [title] [url]"
  |
  +--> Internal link checker: verify new page is linked from
       at least 2 existing pages
```

### Implementation: Sanity Webhook -> Serverless Function

```javascript
// api/webhook/sanity-publish.ts
export async function POST(req) {
  const body = await req.json();

  if (body._type && body.publishingControls?.status === 'published') {
    const pageUrl = buildUrlFromDocument(body);

    // 1. Trigger ISR revalidation
    await fetch(`${siteUrl}/api/revalidate?path=${pageUrl}`);

    // 2. Ping IndexNow
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      body: JSON.stringify({
        host: 'yourdomain.ca',
        key: process.env.INDEXNOW_KEY,
        urlList: [pageUrl]
      })
    });

    // 3. Submit to Google (via Search Console API)
    await googleSearchConsole.urlInspection.index.inspect({
      inspectionUrl: pageUrl,
      siteUrl: 'https://yourdomain.ca'
    });

    // 4. Notify team
    await slackWebhook.send({
      text: `New page published: ${body.seoFields.seoTitle}\n${pageUrl}`
    });
  }
}
```

---

## 11. Weak-Page Refresh Workflow

### Identification: Monthly Performance Audit

**Data Source**: Google Search Console API (Performance data)

**Weak Page Criteria**:
- Impressions > 100 but CTR < 1% (showing up but not clicked)
- Position 8-20 (page 1-2 but not ranking well)
- Clicks declining >30% month-over-month
- Pages in "Crawled - currently not indexed" status
- Pages in "Discovered - currently not indexed" status

### Automated Weak Page Detection

```javascript
// Scheduled monthly: Pull GSC data, flag weak pages in Sanity

async function identifyWeakPages() {
  const gscData = await searchConsole.searchanalytics.query({
    siteUrl: 'https://yourdomain.ca',
    requestBody: {
      startDate: sixMonthsAgo,
      endDate: today,
      dimensions: ['page'],
      rowLimit: 1000
    }
  });

  const weakPages = gscData.rows.filter(row =>
    (row.impressions > 100 && row.ctr < 0.01) ||
    (row.position > 8 && row.position < 20) ||
    (row.clicks < previousPeriod[row.keys[0]].clicks * 0.7)
  );

  // Flag in Sanity via API
  for (const page of weakPages) {
    const sanityDoc = await findSanityDocByUrl(page.keys[0]);
    if (sanityDoc) {
      await sanityClient.patch(sanityDoc._id)
        .set({
          'publishingControls.refreshFlag': true,
          'publishingControls.refreshReason': classifyWeakness(page),
          'publishingControls.lastGSCMetrics': {
            impressions: page.impressions,
            clicks: page.clicks,
            ctr: page.ctr,
            position: page.position
          }
        })
        .commit();
    }
  }
}
```

### Refresh Workflow in Sanity Studio

1. **Dashboard Widget**: Custom Sanity Studio dashboard showing all flagged weak pages, sorted by priority
2. **Refresh Assignment**: Content lead assigns weak page to writer with notes on what to improve
3. **Refresh Checklist** (displayed in Studio):
   - [ ] Update intro body with current market data
   - [ ] Refresh FAQ items (add 2 new questions based on People Also Ask)
   - [ ] Update statistics and data points
   - [ ] Add or refresh internal links (min 3 new internal links)
   - [ ] Update meta description to improve CTR
   - [ ] Check and update hero heading for keyword alignment
   - [ ] Add new content section if word count < 1,500
4. **Re-publish**: Updated page re-enters the workflow (In Review -> SEO QA -> Approved -> Published)
5. **Post-refresh monitoring**: Track the refreshed page's metrics for 30/60/90 days

---

## 12. Publishing SOPs & QA Checklists

### SOP 1: New Page Creation

```
STEP 1: Content Planning
  [ ] Verify keyword has search demand (>10 monthly searches)
  [ ] Check no existing page targets this keyword (avoid cannibalization)
  [ ] Select page type from template library
  [ ] Select city and service (if applicable)
  [ ] Assign to writer with deadline

STEP 2: Draft Generation
  [ ] Run AI prompt generator with city data
  [ ] Import structured draft into Sanity
  [ ] Writer reviews and enriches with local details
  [ ] Writer adds minimum 20% original content
  [ ] Writer fills all required fields
  [ ] Writer sets status to "In Review"

STEP 3: Editorial Review
  [ ] Editor checks brand voice and tone
  [ ] Editor verifies local accuracy (names, data, neighborhoods)
  [ ] Editor checks for duplicate/thin content against existing pages
  [ ] Editor verifies minimum word counts per section
  [ ] Editor checks all images have alt text
  [ ] Editor sets status to "SEO QA"

STEP 4: SEO QA
  [ ] Primary keyword appears in: SEO title, H1, first 100 words, meta description
  [ ] SEO title is 30-60 characters
  [ ] Meta description is 120-160 characters
  [ ] Slug is clean, includes primary keyword
  [ ] OG title and description are set
  [ ] Featured image and OG image are set
  [ ] Internal links: minimum 3 outbound, 2 contextual
  [ ] FAQ items: minimum 3, each answer 80-150 words
  [ ] Canonical URL is correct (or default)
  [ ] Index/noindex is set correctly
  [ ] Schema type is appropriate for page type
  [ ] No broken links
  [ ] SEO editor sets status to "Approved"

STEP 5: Publish
  [ ] Publisher reviews approved content
  [ ] Publisher sets publish date
  [ ] Publisher clicks Publish
  [ ] Verify page renders correctly on live site
  [ ] Verify JSON-LD schema with Rich Results Test
  [ ] Verify page appears in sitemap
  [ ] Confirm IndexNow ping was sent
  [ ] Add internal links TO this page FROM 2+ existing pages
```

### SOP 2: Weak Page Refresh

```
STEP 1: Identification (Monthly, automated)
  [ ] Run GSC performance audit script
  [ ] Review flagged weak pages dashboard
  [ ] Prioritize by: impressions (high) + CTR (low) = highest priority
  [ ] Assign refresh tasks to writers

STEP 2: Analysis
  [ ] Check People Also Ask for target keyword
  [ ] Check competitor pages ranking above
  [ ] Identify content gaps vs. competitors
  [ ] Check if internal links to this page are sufficient
  [ ] Review user behavior data (bounce rate, time on page)

STEP 3: Refresh
  [ ] Update stale data points and statistics
  [ ] Add new FAQ items from People Also Ask
  [ ] Expand thin sections (target 1,500+ total words)
  [ ] Add new internal links (both inbound and outbound)
  [ ] Update meta description to improve CTR
  [ ] Add new content block if applicable (e.g., add a comparison table)
  [ ] Refresh images if older than 12 months

STEP 4: Re-publish
  [ ] Re-enter editorial workflow (Review -> SEO QA -> Approved -> Publish)
  [ ] Request Google recrawl via URL Inspection
  [ ] Set 30-day monitoring reminder
  [ ] Document changes made in Sanity revision history
```

### SOP 3: City Page Batch Creation

```
STEP 1: Batch Planning
  [ ] Select target province
  [ ] Identify top 10-20 cities by search demand
  [ ] Gather city-specific data for each (population, rents, neighborhoods)
  [ ] Create city data records in Sanity
  [ ] Plan service-city combinations (e.g., 5 services x 20 cities = 100 pages)

STEP 2: Batch Draft Generation
  [ ] Run AI draft generator for each city page
  [ ] Run AI draft generator for each service-city combination
  [ ] Import all drafts into Sanity in "Draft" status
  [ ] Assign batches to writers (5-10 pages per writer per week)

STEP 3: Quality Control
  [ ] Each page must pass uniqueness check (<30% overlap with other city pages)
  [ ] Each page must include city-specific data points
  [ ] Each page must reference actual neighborhoods/landmarks
  [ ] Full editorial and SEO workflow per page (no shortcuts)

STEP 4: Staged Publishing
  [ ] Publish 3-5 pages per day (not all at once)
  [ ] Monitor indexing status daily in GSC
  [ ] If indexing stalls, check for quality issues
  [ ] Do not publish next batch until previous batch is indexed
```

### SOP 4: Blog/Guide Publishing

```
STEP 1: Topic Selection
  [ ] Pull from editorial calendar
  [ ] Verify keyword research and search demand
  [ ] Check for content cannibalization with existing pages
  [ ] Assign to writer with brief and deadline

STEP 2: Writing
  [ ] Minimum 1,500 words for guides, 800 words for blog posts
  [ ] Include 3+ internal links to service/city pages
  [ ] Include FAQ section with 3+ items
  [ ] Include key takeaways section
  [ ] All images have descriptive alt text

STEP 3: Review & Publish
  [ ] Full editorial workflow
  [ ] Cross-link: add links TO this post FROM 2+ existing pages
  [ ] Social media sharing (optional, via webhook)
```

---

## 13. Cost Analysis

### Monthly Operating Costs

| Item | Cost | Notes |
|---|---|---|
| **Sanity.io Growth + Increased Quota** | $374/mo | 5 users at $15/user + $299 quota add-on |
| **Vercel Pro (Next.js hosting)** | $20/mo | Per team member, or $150/team |
| **AI API costs (Claude/GPT)** | $50-150/mo | ~100 page drafts/month at $0.50-1.50 each |
| **Google Search Console API** | $0 | Free |
| **IndexNow** | $0 | Free protocol |
| **Monitoring (Ahrefs/Semrush)** | $99-199/mo | SEO monitoring and keyword research |
| **Slack (notifications)** | $0-8.75/user/mo | Free tier sufficient |
| **Total Monthly** | **$543-893/mo** | |
| **Total Annual** | **$6,516-10,716/yr** | |

### Cost Comparison: If Using Other CMS

| CMS | Monthly Cost (5 users, 1000+ pages) | Notes |
|---|---|---|
| **Sanity Growth + Quota** | $374/mo | Recommended |
| **Payload Cloud Pro** | $199/mo | Cheaper but less editorial UX |
| **Payload Self-Hosted** | $0 + hosting (~$50-100/mo) | Cheapest, most dev work |
| **Contentful Premium** | $500-2,000+/mo (custom) | Most expensive |
| **Strapi Cloud Pro** | $99-299/mo | Mid-range |
| **Directus Cloud** | $99-299/mo | Mid-range |

### Break-Even Analysis: Sanity vs Payload Self-Hosted

Sanity costs ~$4,488/year more than Payload self-hosted. However, Sanity saves approximately 10-15 hours/month of developer time on editorial UX customization, workflow configuration, and Studio maintenance. At a developer rate of $75-150/hour, the time savings ($9,000-27,000/year) far exceed the licensing cost difference.

---

## 14. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)

- [ ] Set up Sanity project and configure Growth plan
- [ ] Define all 9 content type schemas in code
- [ ] Build reusable field objects (seoFields, publishingControls, contentBlocks)
- [ ] Configure validation rules for all required fields
- [ ] Set up Sanity Studio with custom desk structure
- [ ] Install and configure workflow plugin
- [ ] Set up role-based access (Writer, Editor, SEO Editor, Publisher, Admin)
- [ ] Connect Sanity to Next.js project via `next-sanity`

### Phase 2: Content Engine (Weeks 3-5)

- [ ] Build AI prompt template library for all 9 page types
- [ ] Create city data import pipeline (spreadsheet -> Sanity)
- [ ] Build draft generation tool (custom Sanity Studio tool)
- [ ] Implement JSON-LD schema generators for all page types
- [ ] Build dynamic sitemap generation
- [ ] Set up Sanity webhooks for publish events

### Phase 3: Automation (Weeks 5-7)

- [ ] Implement IndexNow integration
- [ ] Set up GSC API integration for performance monitoring
- [ ] Build weak-page detection script (monthly cron)
- [ ] Create Sanity Studio dashboard widgets (publishing calendar, weak pages, content pipeline)
- [ ] Set up Slack notifications
- [ ] Build internal link suggestion tool

### Phase 4: Content Production (Weeks 7-12)

- [ ] Generate and publish province pages (10-13 pages)
- [ ] Generate and publish first batch of city pages (20-30 pages)
- [ ] Generate and publish service pages (8-12 pages)
- [ ] Generate and publish first service-city pages (50-100 pages)
- [ ] Begin blog/guide publishing (2-3 per week)
- [ ] Train content team on SOPs and workflows

### Phase 5: Scale & Optimize (Months 4-6)

- [ ] Expand to remaining cities (target 100+ city pages)
- [ ] Scale service-city combinations (500+ pages)
- [ ] Launch case studies and comparison pages
- [ ] First weak-page refresh cycle
- [ ] Optimize based on GSC performance data
- [ ] Property listing pages integration

---

## 15. Sources

### CMS Platform Comparisons
- [Headless CMS 2026: Contentful vs Strapi vs Sanity vs Payload (Compared)](https://dev.to/pooyagolchian/headless-cms-2026-contentful-vs-strapi-vs-sanity-vs-payload-compared-25mh)
- [Compare Payload to Sanity | Payload CMS](https://payloadcms.com/compare/sanity)
- [Sanity vs Contentful vs Payload: Best Headless CMS 2026](https://colorwhistle.com/sanity-contentful-payload/)
- [Payload CMS vs Other Platforms: The Ultimate Modern CMS Comparison for 2026](https://shakuro.com/blog/payload-vs-other-cms)
- [Payload CMS vs Sanity for Next.js 15: A Technical Comparison](https://www.reactlibraries.com/blog/payload-cms-vs-sanity-for-next-js-15-a-technical-comparison)
- [Sanity vs Payload CMS for Enterprise](https://www.enterprisecms.org/guides/sanity-vs-payload-cms-for-enterprise)
- [Best Headless CMS to Choose: Directus, Strapi, Payload, Sanity](https://kernelics.com/blog/headless-cms-comparison-guide)
- [Top 5 Headless CMS Platforms for 2026](https://www.enterprisecms.org/guides/top-5-headless-cms-platforms-for-2026)

### Sanity.io Specific
- [Sanity Real Estate CMS](https://www.sanity.io/real-estate-cms)
- [Sanity Pricing](https://www.sanity.io/pricing)
- [Sanity Pricing Plans Compared: Growth vs Enterprise 2026](https://www.webstacks.com/blog/sanity-pricing-plans-compared)
- [Sanity Validation Documentation](https://www.sanity.io/docs/studio/validation)
- [Sanity Schema System and Type Definitions](https://deepwiki.com/sanity-io/sanity/2.3-schema-system-and-type-definitions)
- [Sanity GROQ Joins](https://www.sanity.io/docs/specifications/groq-joins)
- [Bidirectional References in Sanity.io](https://www.sanity.io/answers/bidirectional-references-in-sanity-io-for-many-to-many-relationships)
- [Sanity Workflow Manager Plugin](https://www.sanity.io/plugins/sanity-plugin-workflow-manager)
- [Sanity Draft Review Plugin V3](https://www.sanity.io/plugins/sanity-plugin-draft-review-v3)
- [How to Design Flexible, Scalable Sanity Schemas](https://www.halo-lab.com/blog/creating-schema-in-sanity)

### Content Architecture & Modeling
- [Complete Guide to CMS Design for Scalable, SEO-Friendly Websites](https://www.zachsean.com/post/the-complete-guide-to-cms-design-for-scalable-seo-friendly-websites)
- [Content Modeling: How to Structure Your Content Efficiently](https://www.magnolia-cms.com/blog/content-modeling-how-to-structure-your-content-efficiently.html)
- [Content Production Workflows | Headless CMS Guide](https://headlesscms.guide/guides/content-production-workflows)
- [CMS Workflow Automation with Contentful for Scalable Publishing](https://breakingac.com/news/2026/mar/02/cms-workflow-automation-contentful/)

### Programmatic SEO & City Pages
- [The Real Playbook for Scaling Local SEO Across Multiple Locations in 2026](https://www.entrepreneur.com/growing-a-business/the-real-playbook-for-multi-location-local-seo-in-2026/502959)
- [The Ultimate Guide to Programmatic SEO in 2026](https://neuronwriter.com/ultimate-guide-programmatic-seo-2026/)
- [Template Design for Scalable Content: A Programmatic SEO Approach](https://gracker.ai/programmatic-seo-101/template-design-for-scalable-content)
- [AI Local SEO: Complete Automation Guide for 2026](https://www.localmighty.com/blog/ai-local-seo-guide/)
- [The Ultimate Local SEO Strategy: Your Marketing Playbook for 2026](https://www.verblio.com/blog/the-ultimate-local-seo-strategy-your-marketing-playbook-for-2026)

### Schema & Structured Data
- [JSON-LD Guide | Next.js](https://nextjs.org/docs/app/guides/json-ld)
- [Schema.org for SEO: Ready-to-Use JSON-LD Examples (2026)](https://www.incremys.com/en/resources/blog/schema-seo)
- [JSON-LD for Headless CMS Content](https://elmapicms.com/blog/json-ld-for-headless-cms-content-article-faq-breadcrumb-product)
- [Structured Data and Schema Markup for Headless CMS](https://www.cosmicjs.com/blog/structured-data-schema-markup-headless-cms-technical-seo-implementation-guide)

### Indexing & Sitemap Automation
- [Sitemap Automation for Faster Indexing: Guide 2026](https://www.trysight.ai/blog/sitemap-automation-for-faster-indexing)
- [Automated Indexing for New Content: Complete Guide](https://www.trysight.ai/blog/automated-indexing-for-new-content)
- [Real Time Sitemap Updates: Complete Setup Guide 2026](https://www.trysight.ai/blog/real-time-sitemap-updates)

### SEO & Publishing Best Practices
- [SEO for Headless CMS: The Complete 2026 Technical Guide](https://indexcraft.in/blog/technical/headless-cms-seo-guide)
- [Headless SEO: 8 Essential Steps for Technical Implementation](https://www.searchenginejournal.com/headless-seo-technical-implementation-checklist/499789/)
- [Headless CMS SEO Best Practices | Hygraph](https://hygraph.com/learn/headless-cms/headless-cms-seo)
- [Headless CMS and SEO Best Practices | Sanity](https://www.sanity.io/headless-seo)
- [How to Audit & Refresh Underperforming Content with GSC](https://hackmamba.io/blog/2024/01/how-to-audit-and-refresh-your-underperforming-content-with-google-search-console/)

### Pricing
- [Headless CMS Pricing 2026: Real Costs](https://elmapicms.com/mp/headless-cms-pricing)
- [Sanity Pricing Calculator 2026](https://www.contentwrap.io/tools/sanity-pricing-calculator)
- [Payload CMS Review 2026: Pros, Cons, Pricing](https://efficient.app/apps/payload)
