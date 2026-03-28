# CMS Content Model Reference

A complete reference of every content type, field, and validation rule in the MoveSmart Rentals Sanity CMS. Use this document to look up any field name, understand its purpose, and know what values are expected.

**Audience:** Content editors and administrators with Sanity Studio access.
**CMS:** Sanity (v4.22.0) with Next.js 15 integration via next-sanity.
**Studio URL:** `/studio` on the live site (e.g., `https://movesmartrentals.com/studio`).

---

## Table of Contents

1. [City](#1-city)
2. [City Service Page (CityService)](#2-city-service-page-cityservice)
3. [Service](#3-service)
4. [Province / State](#4-province--state)
5. [Blog / Guide](#5-blog--guide)
6. [Comparison](#6-comparison)
7. [Case Study](#7-case-study)
8. [Property Category](#8-property-category)
9. [Property Listing](#9-property-listing)
10. [Shared Objects](#10-shared-objects)
11. [Content Relationships](#11-content-relationships)
12. [Image Handling](#12-image-handling)

---

## 1. City

**Sanity type name:** `city`
**Studio display name:** City
**Purpose:** Represents a geographic city where MoveSmart Rentals operates, holding market data and local information.
**URL pattern:** `/ca/{province-slug}/{city-slug}/` (Canada) or `/us/{state-slug}/{city-slug}/` (US)

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | City name as it should appear on the site | `Mississauga` |
| `slug` | slug | Yes | URL-safe identifier, auto-generated from title (max 96 chars) | `mississauga` |
| `province` | reference (province) | Yes | Parent province or US state this city belongs to | Ontario |
| `tier` | number (dropdown) | Yes | Rendering tier: 1 = pre-render at build, 2 = on-demand ISR, 3 = future | `1` |
| `population` | number | No | Current population (no commas, just the number) | `717961` |
| `medianRent` | number | No | Monthly median rent in dollars | `2450` |
| `vacancyRate` | number | No | Vacancy rate as a percentage | `1.8` |
| `neighbourhoods` | array of string | No | List of neighbourhood names within the city | `["Port Credit", "Erin Mills", "Meadowvale"]` |
| `transitInfo` | text | No | Transit system name and major routes | `MiWay transit system with connections to GO Transit` |
| `heroImage` | image (with hotspot) | No | City hero photo displayed at the top of the page | Uploaded JPG/PNG |
| `heroImage.alt` | string | Yes (if image provided) | Accessible alt text for the hero image | `Downtown Mississauga skyline` |
| `description` | portableContent | No | Rich text description of the city's rental market (2-3 paragraphs) | Portable Text blocks |
| `seo` | seoFields (object) | -- | SEO metadata (see Shared Objects below) | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls (see Shared Objects below) | -- |

### Validation Rules

- `title`, `slug`, `province`, and `tier` are all required -- Sanity will show red validation errors if missing.
- `slug` max length is 96 characters.
- `heroImage.alt` is required whenever an image is uploaded.

### Studio Preview

The document list in Sanity Studio shows: **Title** as the main line, **Province title** as the subtitle, and the **Hero Image** as the thumbnail.

---

## 2. City Service Page (CityService)

**Sanity type name:** `cityService`
**Studio display name:** City Service Page
**Purpose:** The highest-value SEO page type -- combines a specific city with a specific service to create a unique, locally-targeted landing page.
**URL pattern:** `/ca/{province-slug}/{city-slug}/{service-slug}/` (Canada) or `/us/{state-slug}/{city-slug}/{service-slug}/` (US)

### Fieldsets

The CityService schema organizes fields into collapsible fieldsets for a cleaner Studio editing experience:

| Fieldset | Name in Studio | Collapsible | Notes |
|---|---|---|---|
| `references` | City & Service References | No | The city and service this page is about |
| `denormalized` | Denormalized Fields (auto-populated) | Yes (collapsed) | Read-only fields auto-populated from referenced documents |
| `localContent` | Required Local Content | No | All fields in this group are required to prevent thin content |
| `hero` | Hero Section | No | Hero banner content |
| `blocks` | Content Blocks | Yes (collapsed) | Optional structured content sections |

### Fields

| Field Name | Fieldset | Type | Required | Description | Example Value |
|---|---|---|---|---|---|
| `city` | references | reference (city) | Yes | The city this page is about | Toronto |
| `service` | references | reference (service) | Yes | The service this page is about | Tenant Placement |
| `cityTitle` | denormalized | string (read-only) | No | Auto-populated city name | `Toronto` |
| `provinceSlug` | denormalized | string (read-only) | No | Auto-populated province slug | `ontario` |
| `citySlug` | denormalized | string (read-only) | No | Auto-populated city slug | `toronto` |
| `serviceSlug` | denormalized | string (read-only) | No | Auto-populated service slug | `tenant-placement` |
| `localMedianRent` | localContent | number | Yes | Monthly median rent specific to this city | `2750` |
| `localVacancyRate` | localContent | number | Yes | Local vacancy rate as a percentage | `1.2` |
| `neighbourhoodNames` | localContent | array of string | Yes (min 3) | Neighbourhood names -- minimum 3 required | `["The Annex", "Yorkville", "Liberty Village"]` |
| `localRegulatory` | localContent | text | Yes | City-specific landlord-tenant regulations | `Ontario's Residential Tenancies Act governs...` |
| `localBody` | localContent | portableContent | Yes (min 1 block) | Locally-specific rich text content (200+ words recommended) | Portable Text blocks |
| `heroHeadline` | hero | string | Yes | Compelling headline for the hero section | `Expert Tenant Screening in Mississauga` |
| `heroSubheadline` | hero | string | No | Supporting text below the headline | `Trusted by 200+ property owners` |
| `heroCta1` | hero | object {label, url} | No | Primary call-to-action button | `{label: "Get Started", url: "/create-account/"}` |
| `heroCta2` | hero | object {label, url} | No | Secondary call-to-action button | `{label: "Book a Call", url: "/contact/"}` |
| `heroImage` | hero | image (with hotspot) | No | Hero banner image | Uploaded JPG/PNG |
| `heroImage.alt` | hero | string | Yes (if image provided) | Alt text for hero image | `Property management in Toronto` |
| `painPoints` | blocks | array of {problem, solution} | No | Problem/solution pairs relevant to this city+service | See below |
| `benefits` | blocks | array of {title, description, icon} | No | Benefit cards with optional Lucide icon name | See below |
| `howItWorks` | blocks | array of {stepNumber, title, description} | No | Numbered process steps | See below |
| `testimonials` | blocks | array of {name, city, quote, outcome} | No | Local client testimonials | See below |
| `faq` | blocks | array of {question, answer} | No | Locally relevant Q&A pairs | See below |
| `relatedServices` | -- | array of reference (service) | No | Links to related service types | [Tenant Screening, Leasing Services] |
| `seo` | -- | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | -- | publishingControls (object) | -- | Publishing controls | -- |

### Content Block Sub-fields

**Pain Points** (each item):

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `problem` | string | Yes | `High tenant turnover draining your profits?` |
| `solution` | string | Yes | `Our screening reduces turnover by 40%` |

**Benefits** (each item):

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `title` | string | Yes | `Guaranteed Rent Protection` |
| `description` | text | Yes | `Never worry about missed payments...` |
| `icon` | string | No | `shield` (Lucide icon name) |

**How It Works** (each item):

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `stepNumber` | number | Yes | `1` |
| `title` | string | Yes | `Submit Your Property` |
| `description` | text | Yes | `Fill out our online form with your property details...` |

**Testimonials** (each item):

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `name` | string | Yes | `Sarah M.` |
| `city` | string | Yes | `Toronto` |
| `quote` | text | Yes | `MoveSmart found us amazing tenants in just 2 weeks...` |
| `outcome` | string | No | `Fully rented in 14 days` |

**FAQ** (each item):

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `question` | string | Yes | `How long does tenant placement take in Toronto?` |
| `answer` | text | Yes | `On average, we place qualified tenants within 14-21 days...` |

### Validation Rules

- `city` and `service` references are required -- you must select both.
- `neighbourhoodNames` requires a minimum of 3 items to prevent thin content.
- `localBody` requires at least 1 Portable Text block (aim for 200+ words).
- `localMedianRent`, `localVacancyRate`, `localRegulatory`, and `heroHeadline` are all required.
- Denormalized fields (`cityTitle`, `provinceSlug`, `citySlug`, `serviceSlug`) are read-only and auto-populated.

### Studio Preview

Document list shows: **"City Title -- Service Slug"** (e.g., "Toronto -- tenant-placement") with the hero image as thumbnail.

---

## 3. Service

**Sanity type name:** `service`
**Studio display name:** Service
**Purpose:** Defines one of the 8 core property management services offered by MoveSmart Rentals.
**URL pattern:** `/services/{service-slug}/` (national service page)

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Service name | `Tenant Placement` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `tenant-placement` |
| `shortDescription` | text | Yes | Brief description of the service (1-2 sentences) | `Finding and placing qualified tenants for your rental property` |
| `icon` | string | No | Lucide React icon name for display in service grids | `home` |
| `audience` | string (dropdown) | Yes | Who this service is for: `owner`, `tenant`, or `both` | `owner` |
| `order` | number | No | Display order in service listings (lower = first) | `1` |
| `heroImage` | image (with hotspot) | No | Service page hero image | Uploaded JPG/PNG |
| `heroImage.alt` | string | Yes (if image provided) | Alt text for hero image | `Tenant placement services` |
| `body` | portableContent | No | Full service description in rich text | Portable Text blocks |
| `faq` | array of {question, answer} | No | Service-level FAQ items | See CityService FAQ format |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### The 8 Services

| Order | Service | Slug | Audience |
|---|---|---|---|
| 1 | Tenant Placement | `tenant-placement` | owner |
| 2 | Tenant Screening | `tenant-screening` | owner |
| 3 | Rent Guarantee | `rent-guarantee` | owner |
| 4 | Leasing Services | `leasing-services` | owner |
| 5 | Rental Preparation | `rental-preparation` | owner |
| 6 | Rental Marketing | `rental-marketing` | owner |
| 7 | Portal Technology | `portal-technology` | both |
| 8 | Pricing | `pricing` | both |

### Validation Rules

- `title`, `slug`, `shortDescription`, and `audience` are all required.
- `slug` max length is 96 characters.
- FAQ sub-fields (`question` and `answer`) are required for each FAQ item.

### Studio Preview

Document list shows: **Title** as the main line, **Audience** as the subtitle, and **Hero Image** as thumbnail.

---

## 4. Province / State

**Sanity type name:** `province`
**Studio display name:** Province / State
**Purpose:** Represents a Canadian province or US state, serving as the geographic parent for cities.
**URL pattern:** `/ca/{province-slug}/` (Canada) or `/us/{state-slug}/` (US)

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Province or state name | `Ontario` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `ontario` |
| `country` | string (dropdown) | Yes | Country: `ca` (Canada) or `us` (United States) | `ca` |
| `abbreviation` | string | No | Standard abbreviation | `ON` |
| `description` | text | No | Description of the province/state rental market | `Ontario is Canada's largest rental market...` |
| `heroImage` | image (with hotspot) | No | Province/state hero photo | Uploaded JPG/PNG |
| `heroImage.alt` | string | Yes (if image provided) | Alt text for hero image | `Ontario skyline` |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Validation Rules

- `title`, `slug`, and `country` are required.
- `slug` max length is 96 characters.

### Studio Preview

Document list shows: **Title** as the main line, **Country** code as the subtitle.

---

## 5. Blog / Guide

**Sanity type name:** `blogGuide`
**Studio display name:** Blog / Guide
**Purpose:** Blog posts, guides, market reports, and legal guides published in the resources section of the site.
**URL pattern:** `/resources/blog/{slug}/` (blog posts) or `/resources/guides/{slug}/` (guides)

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Article headline | `Complete Guide to Renting in Toronto 2026` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `guide-renting-toronto-2026` |
| `category` | string (dropdown) | No | Content type: `blog`, `guide`, `market-report`, or `legal-guide` | `guide` |
| `city` | reference (city) | No | Optional city association for geo-targeted content | Toronto |
| `service` | reference (service) | No | Optional service association | Tenant Placement |
| `body` | portableContent | Yes | Full article content in rich text | Portable Text blocks |
| `excerpt` | text | No | 1-2 sentence summary (max 200 characters) | `Everything you need to know about renting in Toronto` |
| `heroImage` | image (with hotspot) | No | Featured image for the article | Uploaded JPG/PNG |
| `heroImage.alt` | string | Yes (if image provided) | Alt text for the featured image | `Toronto rental apartment` |
| `author` | string | No | Author name | `MoveSmart Rentals Team` |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Category Options

| Category | Value | Description |
|---|---|---|
| Blog Post | `blog` | General blog articles |
| Guide | `guide` | In-depth how-to guides |
| Market Report | `market-report` | Local market analysis with data |
| Legal Guide | `legal-guide` | Province/state-specific legal information |

### Validation Rules

- `title`, `slug`, and `body` are required.
- `excerpt` max length is 200 characters.
- `slug` max length is 96 characters.

### Studio Preview

Document list shows: **Title** as the main line, **Category** as the subtitle, and **Hero Image** as thumbnail.

---

## 6. Comparison

**Sanity type name:** `comparison`
**Studio display name:** Comparison
**Purpose:** Side-by-side comparison articles showing MoveSmart Rentals vs. competitors on specific features.
**URL pattern:** `/resources/comparisons/{slug}/`

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Comparison article title | `MoveSmart vs. XYZ Property Management` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `movesmart-vs-xyz` |
| `service` | reference (service) | No | Optional service association | Tenant Screening |
| `competitors` | array of competitor objects | No | List of competitors to compare against | See below |
| `body` | portableContent | No | Additional rich text content | Portable Text blocks |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Competitor Sub-fields

Each competitor object contains:

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `name` | string | Yes | `XYZ Property Management` |
| `features` | array of feature comparisons | No | See below |

Each feature comparison contains:

| Sub-field | Type | Required | Example |
|---|---|---|---|
| `feature` | string | Yes | `Tenant Screening` |
| `us` | string | Yes | `Full background + credit check included` |
| `them` | string | Yes | `Basic credit check only` |

### Validation Rules

- `title` and `slug` are required.
- Within each competitor, `name` is required.
- Within each feature comparison, `feature`, `us`, and `them` are all required.

### Studio Preview

Document list shows: **Title** as the main line.

---

## 7. Case Study

**Sanity type name:** `caseStudy`
**Studio display name:** Case Study
**Purpose:** Client success stories and testimonials with detailed outcomes.
**URL pattern:** `/resources/case-studies/{slug}/`

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Case study title | `How We Placed 5 Tenants in 30 Days for a Toronto Landlord` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `toronto-5-tenants-30-days` |
| `city` | reference (city) | No | Optional city association | Toronto |
| `clientName` | string | No | Client name or anonymized identifier | `Property Owner, Toronto` |
| `outcome` | text | Yes | Summary of the measurable result | `Fully rented 5-unit building in 30 days with 0% vacancy` |
| `body` | portableContent | No | Full case study narrative in rich text | Portable Text blocks |
| `heroImage` | image (with hotspot) | No | Featured image | Uploaded JPG/PNG |
| `heroImage.alt` | string | Yes (if image provided) | Alt text for featured image | `Rental property in Toronto` |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Validation Rules

- `title`, `slug`, and `outcome` are required.

### Studio Preview

Document list shows: **Title** as the main line, **Client Name** as the subtitle, and **Hero Image** as thumbnail.

---

## 8. Property Category

**Sanity type name:** `propertyCategory`
**Studio display name:** Property Category
**Purpose:** Groups rental listings by property type (apartments, condos, houses, townhouses) within a specific city.
**URL pattern:** `/ca/{province-slug}/{city-slug}/{property-type}/` (shares URL segment with services)

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Category display title | `Apartments for Rent in Toronto` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `apartments` |
| `city` | reference (city) | Yes | The city this category belongs to | Toronto |
| `propertyType` | string (dropdown) | Yes | Type: `apartment`, `condo`, `house`, or `townhouse` | `apartment` |
| `description` | portableContent | No | Rich text description of this property type in this city | Portable Text blocks |
| `averageRent` | number | No | Average monthly rent for this property type in this city | `2200` |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Property Type Options

| Type | Value | Description |
|---|---|---|
| Apartment | `apartment` | Multi-unit apartment buildings |
| Condo | `condo` | Condominium units |
| House | `house` | Detached or semi-detached houses |
| Townhouse | `townhouse` | Townhouse or row house units |

### Validation Rules

- `title`, `slug`, `city`, and `propertyType` are all required.

### Studio Preview

Document list shows: **Title** as the main line, **Property Type** as the subtitle.

---

## 9. Property Listing

**Sanity type name:** `propertyListing`
**Studio display name:** Property Listing
**Purpose:** Individual rental property listings with address, pricing, and property details.
**URL pattern:** `/ca/{province-slug}/{city-slug}/rentals/{slug}/`

### Fields

| Field Name | Type | Required | Description | Example Value |
|---|---|---|---|---|
| `title` | string | Yes | Listing title | `Bright 2BR Apartment in Liberty Village` |
| `slug` | slug | Yes | URL-safe identifier (max 96 chars) | `2br-liberty-village` |
| `city` | reference (city) | Yes | The city this listing is in | Toronto |
| `category` | reference (propertyCategory) | Yes | Property type category | Apartments for Rent in Toronto |
| `price` | number | Yes | Monthly rent in dollars | `2500` |
| `bedrooms` | number | Yes | Number of bedrooms | `2` |
| `bathrooms` | number | Yes | Number of bathrooms | `1` |
| `sqft` | number | No | Square footage | `850` |
| `address` | text | Yes | Full street address | `123 Liberty St, Toronto, ON M6K 1A1` |
| `description` | portableContent | No | Detailed listing description in rich text | Portable Text blocks |
| `images` | array of image (with hotspot) | No | Property photos | Multiple uploaded images |
| `images[].alt` | string | Yes (per image) | Alt text for each property photo | `Living room with hardwood floors` |
| `available` | boolean | No | Whether the property is currently available | `true` |
| `availableDate` | date | No | Date the property becomes available | `2026-05-01` |
| `seo` | seoFields (object) | -- | SEO metadata | -- |
| `publishing` | publishingControls (object) | -- | Publishing controls | -- |

### Validation Rules

- `title`, `slug`, `city`, `category`, `price`, `bedrooms`, `bathrooms`, and `address` are all required.
- Each image in the `images` array requires an `alt` text field.

### Studio Preview

Document list shows: **Title** as the main line, **Price** formatted as `$X/mo` as the subtitle, and the **first image** as thumbnail.

---

## 10. Shared Objects

These object types are reused across multiple document types. They appear as expandable sections within each document in Sanity Studio.

### SEO Fields (`seoFields`)

Included in all 9 document types via the `seo` field.

| Field Name | Type | Required | Max Length | Description | Example Value |
|---|---|---|---|---|---|
| `metaTitle` | string | Yes | 60 chars | Page title shown in search results and browser tab | `Tenant Placement in Toronto | MoveSmart Rentals` |
| `metaDescription` | string | Yes | 160 chars | Page description shown in search results | `Professional tenant placement services in Toronto...` |
| `ogImage` | image (with hotspot) | No | -- | Image displayed when page is shared on social media | Uploaded image |
| `ogImage.alt` | string | Yes (if image provided) | -- | Alt text for the social sharing image | `MoveSmart Rentals Toronto` |
| `keywords` | array of string | No | -- | Target SEO keywords | `["toronto tenant placement", "toronto property management"]` |

**Validation:** `metaTitle` is required with max 60 characters. `metaDescription` is required with max 160 characters.

### Publishing Controls (`publishingControls`)

Included in all 9 document types via the `publishing` field.

| Field Name | Type | Default | Description | Example Value |
|---|---|---|---|---|
| `canonicalOverride` | url | Empty (self-referencing) | Override the canonical URL if this page duplicates another | `https://movesmartrentals.com/original-page/` |
| `noindex` | boolean | `false` | Set to `true` to tell search engines not to index this page | `false` |
| `includedInSitemap` | boolean | `true` | Set to `false` to exclude from the XML sitemap | `true` |
| `redirectTo` | url | Empty | 301 redirect destination -- if set, visitors are redirected | `https://movesmartrentals.com/new-url/` |
| `publishedAt` | datetime | -- | Publication date and time | `2026-03-15T12:00:00Z` |
| `updatedAt` | datetime | -- | Last content update date and time | `2026-03-28T09:30:00Z` |
| `author` | string | -- | Author name for attribution | `MoveSmart Rentals Team` |

### Portable Content (`portableContent`)

The rich text editor used for body content fields across the CMS.

**Block styles available:**
- Normal (paragraph text)
- H2 (section heading)
- H3 (sub-section heading)
- H4 (minor heading)
- Blockquote

**List types available:**
- Bullet list
- Numbered list

**Text formatting (marks):**
- **Strong** (bold)
- *Emphasis* (italic)
- Underline

**Link annotations:**
- Links support `http`, `https`, `mailto`, and `tel` schemes
- Relative URLs are allowed (e.g., `/contact/` for internal links)
- Option to open in a new tab (`blank: true`)

**Inline images:**
- Images can be inserted within rich text content
- Each image requires an `alt` text field (required) and an optional `caption` field
- Images support hotspot cropping

---

## 11. Content Relationships

Understanding how documents reference each other is essential for maintaining data integrity.

### Relationship Diagram

```
Province / State
  |
  +-- City (references Province via `province` field)
       |
       +-- CityService (references City via `city` field + Service via `service` field)
       |
       +-- PropertyCategory (references City via `city` field)
       |    |
       |    +-- PropertyListing (references City via `city` + PropertyCategory via `category`)
       |
       +-- BlogGuide (optionally references City via `city` + Service via `service`)
       |
       +-- CaseStudy (optionally references City via `city`)

Service (standalone -- referenced by CityService, Comparison, BlogGuide)
```

### Key Relationships

| From | To | Field | Cardinality | Required |
|---|---|---|---|---|
| City | Province | `province` | Many cities to one province | Yes |
| CityService | City | `city` | Many CityServices to one city | Yes |
| CityService | Service | `service` | Many CityServices to one service | Yes |
| CityService | Service | `relatedServices` | Many-to-many | No |
| PropertyCategory | City | `city` | Many categories to one city | Yes |
| PropertyListing | City | `city` | Many listings to one city | Yes |
| PropertyListing | PropertyCategory | `category` | Many listings to one category | Yes |
| BlogGuide | City | `city` | Optional association | No |
| BlogGuide | Service | `service` | Optional association | No |
| Comparison | Service | `service` | Optional association | No |
| CaseStudy | City | `city` | Optional association | No |

### Important Notes on Relationships

1. **Deleting a Province** will break all cities that reference it. Always check for dependent cities before removing a province.
2. **Deleting a City** will break all CityService pages, PropertyCategories, and PropertyListings referencing that city.
3. **Deleting a Service** will break all CityService pages referencing that service.
4. **One city = 8 CityService documents.** Each of the 8 services gets its own CityService document for that city (8 per city minimum).
5. **CityService uses triple-slug resolution** -- the URL `/ca/{province}/{city}/{service}/` requires province slug, city slug, and service slug to all match for the page to load correctly.

---

## 12. Image Handling

### Upload and Storage

- All images are uploaded through the Sanity Studio interface and stored on **Sanity's CDN** (Content Delivery Network).
- Supported formats: **JPG, PNG, WebP, GIF**.
- Maximum file size: **10 MB** (Sanity Free Tier limit).
- Images are served globally from Sanity's edge CDN for fast loading worldwide.

### Image Processing

- The site uses **Next.js Image (`next/image`)** to automatically optimize images at request time.
- Images are served in modern formats (**WebP or AVIF**) based on browser support.
- Responsive `srcset` attributes are generated automatically for different screen sizes.
- **Hotspot cropping** is enabled on all image fields -- click the crop icon in Sanity Studio to set the focal point, ensuring the important part of the image is always visible regardless of crop ratio.

### Alt Text Requirements

- **Every image field has a required `alt` text sub-field** (enforced by schema validation).
- Alt text is critical for:
  - **Accessibility** -- screen readers read alt text to visually impaired users.
  - **SEO** -- search engines use alt text to understand image content.
- Write descriptive, specific alt text: "Two-bedroom apartment living room with hardwood floors" not "image1" or "photo".

### Image Best Practices

1. Use high-quality images at least 1200px wide for hero images.
2. Compress images before uploading when possible (reduces CDN bandwidth usage).
3. Always set the hotspot on hero images to ensure proper cropping on mobile devices.
4. Use the `ogImage` field in SEO settings for social media sharing -- if left empty, the hero image is typically used as fallback.
5. Property listing images should show the property clearly with good lighting.

---

*Last updated: 2026-03-28*
*Part of: Client Handoff Package (Phase 04, Plan 03)*
*See also: [Publishing Workflow](../content/publishing-workflow.md) | [Training Session Guide](./training-session-guide.md)*
