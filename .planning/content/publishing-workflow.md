# Content Publishing Workflow

A step-by-step standard operating procedure (SOP) for content editors to publish new pages on MoveSmart Rentals without developer involvement.

**Audience:** Content editors with Sanity Studio access.
**Tools required:** Web browser, Sanity Studio login, local market data sources.
**No coding required** -- all steps happen within the Sanity Studio visual interface.

---

## Prerequisites

Before publishing any content, ensure you have:

- **Sanity Studio access** -- log in at `/studio` (e.g., `https://movesmartrentals.com/studio`)
- **Content brief or AI-generated draft** ready (see the [Prompt Framework](./prompt-framework.md) for generating first drafts)
- **Local data researched** for the target city:
  - Current population (Statistics Canada or US Census)
  - Median monthly rent (CMHC, Rentals.ca, or local MLS data)
  - Vacancy rate (CMHC Rental Market Report or equivalent)
  - At least 3 neighbourhood names within the city
  - Transit system name and major routes
  - Key employers or universities in the area

---

## Workflow A: Publishing a New City

Use this workflow when adding a new city to the site (e.g., expanding from Ontario to British Columbia).

### Step 1: Create the City Document

1. Open Sanity Studio at `/studio`
2. In the left sidebar, click the **"+"** button or select **"City"** from the document type list
3. Fill in **ALL required fields** (Sanity will show red validation errors if any are missing):

**Core Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| **Title** | Text | Yes | City name exactly as it should appear (e.g., "Mississauga") |
| **Slug** | Auto-generated | Yes | Click "Generate" -- auto-creates from title (e.g., `mississauga`) |
| **Province / State** | Reference | Yes | Select the parent province/state from the dropdown |
| **Tier** | Dropdown | Yes | Tier 1 = pre-rendered at build, Tier 2 = on-demand ISR, Tier 3 = future |

**Market Data Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| **Population** | Number | No (recommended) | Current population number (no commas) |
| **Median Rent** | Number | No (recommended) | Monthly median rent in dollars (e.g., 2450) |
| **Vacancy Rate** | Number | No (recommended) | As a percentage (e.g., 1.8 for 1.8%) |
| **Neighbourhoods** | Text list | No (recommended) | Add at least 3 neighbourhood names -- click "Add item" for each |
| **Transit Information** | Text | No (recommended) | Name of transit system and major routes |

**Content Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| **Hero Image** | Image | No (recommended) | Upload a city photo. Fill in the **Alt Text** sub-field (required if image provided) |
| **Description** | Rich text (Portable Text) | No (recommended) | 2-3 paragraphs about the city's rental market. Use the rich text editor for formatting |

4. Expand the **SEO** section and fill in:
   - **Meta Title**: `[City] Property Management | MoveSmart Rentals` (keep to 50-60 characters)
   - **Meta Description**: `Professional property management in [City], [Province]. ...` (keep to 140-160 characters)
   - **OG Image**: Upload an image for social sharing (or leave blank to use hero image)
   - **Keywords**: Add 3-5 relevant keywords (e.g., `[city] property management`, `[city] rentals`)

5. Expand the **Publishing Controls** section:
   - **Include in Sitemap**: Ensure this is checked (ON by default)
   - **Noindex**: Leave unchecked (OFF) -- you want Google to index this page
   - **Published At**: Set to today's date
   - **Canonical URL Override**: Leave empty (self-referencing canonical is applied automatically)

6. Click **"Publish"** in the bottom-right corner

### Step 2: Create CityService Documents (8 per city)

For **each of the 8 services**, you must create a separate CityService document. The 8 services are:
1. `tenant-placement`
2. `tenant-screening`
3. `rent-guarantee`
4. `leasing-services`
5. `rental-preparation`
6. `rental-marketing`
7. `portal-technology`
8. `pricing`

For each service, repeat the following:

1. In the left sidebar, click **"+"** and select **"City Service Page"**
2. Fill in the **City & Service References** fieldset:
   - **City**: Select the city you just created in Step 1
   - **Service**: Select one of the 8 services from the dropdown

3. Fill in the **Required Local Content** fieldset (all fields are required -- red validation errors will appear if missing):

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| **Local Median Rent** | Number | Yes | Must be filled | Monthly rent for this city |
| **Local Vacancy Rate** | Number | Yes | Must be filled | Vacancy rate percentage |
| **Neighbourhood Names** | Text list | Yes | Minimum 3 items | Click "Add item" for each neighbourhood. **Must have at least 3** to prevent thin content |
| **Local Regulatory Info** | Text | Yes | Must be filled | Province/city-specific landlord-tenant regulations relevant to this service |
| **Local Content Body** | Rich text | Yes | At least 1 block | 200+ words of locally-specific content (see guidelines below) |

**Local Content Body requirements:**
- **MUST** include at least one local regulatory reference (e.g., Ontario's Residential Tenancies Act)
- **MUST** mention specific neighbourhoods from the neighbourhood list
- **MUST** include at least one local market data point (rent, vacancy, growth trends)
- Do NOT copy-paste from another city and swap the city name -- this creates thin/duplicate content

4. Fill in the **Hero Section** fieldset:
   - **Hero Headline**: A unique, compelling headline for this city+service combination
     - Good: "Expert Tenant Screening in Mississauga's Competitive Rental Market"
     - Bad: "Tenant Screening in Mississauga" (too generic)
   - **Hero Subheadline**: Optional supporting text
   - **Hero CTA 1**: Label (e.g., "Get Started") and URL (e.g., `/create-account/`)
   - **Hero CTA 2**: Label (e.g., "Book a Call") and URL (e.g., `/contact/`)
   - **Hero Image**: Upload a relevant image with Alt Text

5. Optionally fill in the **Content Blocks** fieldset (collapsed by default):
   - **Pain Points**: Add 3-5 problem/solution pairs relevant to this city+service
   - **Benefits**: Add 3-5 benefit cards with title, description, and optional icon name
   - **How It Works**: Add numbered steps explaining the service process
   - **Testimonials**: Add local client testimonials with name, city, quote, and outcome
   - **FAQ**: Add 3-5 locally relevant questions and answers

6. Fill in the **SEO** section:
   - **Meta Title**: `[Service] in [City], [Province] | MoveSmart Rentals` (50-60 chars)
   - **Meta Description**: Unique description mentioning the city and service (140-160 chars)

7. Fill in the **Publishing Controls**:
   - **Include in Sitemap**: Checked
   - **Noindex**: Unchecked
   - **Published At**: Today's date

8. Click **"Publish"**

**Repeat steps 1-8 for all 8 services.** One city = 8 CityService documents + 1 City document = 9 total documents.

### Step 3: Verify the Pages Are Live

1. **Wait 60 seconds** after publishing -- the ISR revalidation webhook automatically triggers page regeneration
2. Navigate to the city hub page:
   - Canadian cities: `https://movesmartrentals.com/ca/{province-slug}/{city-slug}/`
   - US cities: `https://movesmartrentals.com/us/{state-slug}/{city-slug}/`
3. Verify the city hub page displays:
   - City name as the page title/H1
   - Local market data (population, median rent, vacancy rate)
   - Neighbourhood list
   - Services grid linking to each CityService page
4. Navigate to each CityService page:
   - `https://movesmartrentals.com/ca/{province-slug}/{city-slug}/{service-slug}/`
5. Verify each CityService page displays:
   - Hero section with headline, CTAs, and image
   - Local content body with regulatory and neighbourhood references
   - FAQ section (if populated)
   - Breadcrumb navigation showing the correct hierarchy

---

## Workflow B: Publishing a Blog Post or Guide

Use this workflow for blog posts, guides, market reports, or legal guides.

### Step 1: Create the Blog/Guide Document

1. In Sanity Studio, click **"+"** and select **"Blog / Guide"**
2. Fill in the required fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| **Title** | Text | Yes | The article headline |
| **Slug** | Auto-generated | Yes | Click "Generate" from title |
| **Category** | Dropdown | No (recommended) | Choose: Blog Post, Guide, Market Report, or Legal Guide |
| **Body** | Rich text | Yes | Full article content using the rich text editor |
| **Excerpt** | Text | No (recommended) | 1-2 sentence summary, max 200 characters |

3. Optional association fields:
   - **City**: Link to a specific city (for city-specific content)
   - **Service**: Link to a specific service (for service-specific content)

4. Additional fields:
   - **Author**: Author name
   - **Hero Image**: Article featured image with Alt Text

5. Fill in the **SEO** section:
   - **Meta Title**: Article title optimized for search (50-60 chars)
   - **Meta Description**: Compelling summary with target keyword (140-160 chars)

6. Fill in the **Publishing Controls**:
   - **Include in Sitemap**: Checked
   - **Noindex**: Unchecked
   - **Published At**: Today's date
   - **Author**: Author name (this field also exists in Publishing Controls)

7. Click **"Publish"**

### Step 2: Verify the Blog/Guide Is Live

1. Wait 60 seconds for ISR revalidation
2. Navigate to the blog/resources section:
   - Blog posts: `https://movesmartrentals.com/resources/blog/{slug}/`
   - Guides: `https://movesmartrentals.com/resources/guides/{slug}/`
3. Verify the page displays with correct formatting, images, and content

---

## Quality Checklist (Before Publishing ANY Document)

Run through this checklist before clicking "Publish" on any document:

### Content Quality

- [ ] All red-highlighted required fields are filled (Sanity validation)
- [ ] Content is unique -- NOT copy-pasted from another page with name swaps
- [ ] At least 200 words of substantive content in body fields
- [ ] Local data points are current (within the last 12 months)
- [ ] No placeholder text remains (search for "Lorem", "TODO", "[PLACEHOLDER]")

### SEO Compliance

- [ ] Meta Title is 50-60 characters (check character count in Sanity)
- [ ] Meta Description is 140-160 characters
- [ ] Only ONE H1 heading per page (the page title -- do not use H1 in body content)
- [ ] Target keyword appears in meta title and first paragraph of body content

### Local Content (CityService pages only)

- [ ] Neighbourhood Names has 3+ entries (minimum enforced by schema)
- [ ] Local Content Body has 200+ words with specific local references
- [ ] Local Regulatory Info references province/city-specific regulations
- [ ] FAQ has 3-5 questions with substantive answers (not one-liners)
- [ ] Hero Headline is unique and compelling (not "Service in City" pattern)

### Publishing Controls

- [ ] "Include in Sitemap" is checked (ON)
- [ ] "Noindex" is unchecked (OFF) unless intentionally hiding the page
- [ ] "Published At" date is set
- [ ] "Canonical URL Override" is empty (unless redirecting)

---

## Troubleshooting

### Page Not Appearing After Publish

1. **Wait 60 seconds** -- ISR revalidation takes up to a minute
2. **Check the URL pattern** -- ensure the slug in the URL matches the slug in Sanity:
   - City pages: `/ca/{province-slug}/{city-slug}/`
   - CityService pages: `/ca/{province-slug}/{city-slug}/{service-slug}/`
   - Blog: `/resources/blog/{slug}/`
3. **Check the province/state reference** -- the city must be linked to a published province/state document
4. **Check Publishing Controls** -- ensure "Noindex" is OFF and "Include in Sitemap" is ON
5. If the page still does not appear after 5 minutes, the ISR webhook may need re-triggering. Contact a developer.

### Validation Errors (Red Highlights)

- All red-highlighted fields MUST be completed before publishing
- Common missing fields: Meta Title, Meta Description, Province reference, Service reference
- For CityService pages: neighbourhoodNames requires at least 3 entries -- add more neighbourhoods

### Content Not Updating After Edit

1. Make your edits in Sanity Studio
2. Click "Publish" (editing a draft does not update the live page)
3. Wait 60 seconds for ISR to pick up the change
4. Hard-refresh the page in your browser (Ctrl+Shift+R / Cmd+Shift+R)
5. If content still shows old version, the ISR webhook may need re-triggering

### Slug Conflicts

- Each slug must be unique within its document type
- If Sanity shows "slug already exists", choose a different slug
- Convention: lowercase, hyphens instead of spaces (e.g., `richmond-hill`)

### Image Upload Issues

- Supported formats: JPG, PNG, WebP, GIF
- Maximum file size: 10 MB (Sanity Free Tier)
- Always fill in the **Alt Text** sub-field when uploading images (required for accessibility and SEO)
- Use descriptive alt text: "Residential neighbourhood in Mississauga, Ontario" not "image1.jpg"

---

## Content Update Schedule

| Content Type | Review Frequency | Action |
|---|---|---|
| Tier-1 city pages (Ontario top 20) | Monthly | Check market data currency, update if stale |
| Tier-2 city pages | Quarterly | Refresh market data and local content |
| CityService pages | Quarterly | Update regulatory references, add new FAQs |
| Blog posts | Every 6 months | Check for outdated information |
| Guides | Annually | Full content review and update |

---

## Appendix: The 8 Owner Services

| Service | Slug | Description |
|---------|------|-------------|
| Tenant Placement | `tenant-placement` | Finding and placing qualified tenants |
| Tenant Screening | `tenant-screening` | Background checks and tenant verification |
| Rent Guarantee | `rent-guarantee` | Rent protection and insurance pathways |
| Leasing Services | `leasing-services` | Full-service lease management |
| Rental Preparation | `rental-preparation` | Property preparation for rental market |
| Rental Marketing | `rental-marketing` | MLS and multi-platform listing distribution |
| Portal Technology | `portal-technology` | Owner portal for showings, applications, communications |
| Pricing | `pricing` | Transparent pricing and service tiers |

---

## Appendix: Sanity Studio Field Reference

### Shared SEO Fields (seoFields)

All document types share these SEO fields:

| Field | Max Length | Required | Purpose |
|-------|-----------|----------|---------|
| `metaTitle` | 60 chars | Yes | Page title in search results |
| `metaDescription` | 160 chars | Yes | Page description in search results |
| `ogImage` + `alt` | -- | No | Social media sharing image |
| `keywords` | -- | No | Target keywords (array of strings) |

### Shared Publishing Controls (publishingControls)

All document types share these publishing controls:

| Field | Default | Required | Purpose |
|-------|---------|----------|---------|
| `canonicalOverride` | Empty (self-referencing) | No | Override canonical URL |
| `noindex` | `false` | No | Hide page from search engines |
| `includedInSitemap` | `true` | No | Include page in XML sitemap |
| `redirectTo` | Empty | No | 301 redirect destination |
| `publishedAt` | -- | No | Publication date |
| `updatedAt` | -- | No | Last update date |
| `author` | -- | No | Author name |

---

*Last updated: 2026-03-28*
*Part of: Content Production System (Plan 03-07)*
*See also: [Prompt Framework](./prompt-framework.md) | [Weak Page Refresh](./weak-page-refresh.md)*
