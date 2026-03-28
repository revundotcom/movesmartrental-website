# Training Session Guide: MoveSmart Rentals CMS

A structured 60-90 minute training session plan for onboarding the MoveSmart Rentals content team to the Sanity CMS.

---

## Session Overview

| Item | Detail |
|---|---|
| **Duration** | 60-90 minutes |
| **Audience** | MoveSmart Rentals content team (non-technical) |
| **Prerequisites** | Sanity Studio login credentials, Chrome browser, access to the live site |
| **Materials** | This guide, [CMS Content Model Reference](./cms-content-model-reference.md), [Publishing Workflow SOP](../content/publishing-workflow.md) |
| **Delivery format** | Screen-share walkthrough with hands-on exercises |
| **Goal** | By the end of this session, every participant can independently create, publish, and verify a CityService page without developer help |

---

## Preparation Checklist (Trainer)

Before the session, complete these steps:

- [ ] Ensure all participants have Sanity Studio login credentials
- [ ] Prepare a test city name that does not conflict with existing data (e.g., "Training City")
- [ ] Have the live site open in a browser tab for verification demos
- [ ] Print or share digital copies of the [CMS Content Model Reference](./cms-content-model-reference.md) and [Publishing Workflow SOP](../content/publishing-workflow.md)
- [ ] Test that the `/studio` URL is accessible from participant machines

---

## Module 1: CMS Basics (20 minutes)

### 1.1 Logging into Sanity Studio (5 min)

**Trainer demonstration:**

1. Open Chrome and navigate to `https://movesmartrentals.com/studio`
2. Log in using your Sanity credentials (Google SSO or email/password)
3. Point out the Studio dashboard layout:
   - **Left sidebar** -- document type list (City, City Service Page, Service, Blog / Guide, etc.)
   - **Document list** -- shows all documents of the selected type
   - **Editor panel** -- the form where you create and edit content
   - **Publish button** -- bottom-right corner of the editor

**Key concept: Draft vs. Published**
- When you create or edit a document, you are working on a **draft**
- The draft is saved automatically but is NOT visible on the live website
- Only after you click **"Publish"** does the content appear on the live site
- A yellow "Edited" badge means you have unpublished changes

### 1.2 Navigating the Studio (5 min)

**Trainer demonstration:**

1. Click each document type in the sidebar to show its document list
2. Demonstrate the **search bar** at the top -- type a city name to find it quickly
3. Show how to **filter and sort** the document list (by title, date, etc.)
4. Demonstrate clicking a document to open it in the editor panel
5. Show how to use the **"+"** button to create a new document

### 1.3 Understanding Document Types (5 min)

Walk through the 9 content types and their purpose (refer to [CMS Content Model Reference](./cms-content-model-reference.md)):

| Type | What it represents | How many exist |
|---|---|---|
| Province / State | Geographic region (Ontario, BC, Florida) | ~15 |
| City | A city where MoveSmart operates | 73+ |
| Service | One of 8 core services | 8 (rarely changes) |
| City Service Page | A city + service landing page | 8 per city (584+) |
| Blog / Guide | Articles, guides, market reports | Growing library |
| Comparison | Competitor comparison articles | As needed |
| Case Study | Client success stories | As needed |
| Property Category | Property types per city (apartments, condos) | 4 per city |
| Property Listing | Individual rental listings | Variable |

### 1.4 Hands-on Exercise: Explore an Existing City Document (5 min)

**Participants do this themselves:**

1. In the left sidebar, click **"City"**
2. Find and click on **"Toronto"** (or another populated city)
3. Scroll through all the fields and observe:
   - Which fields are filled in and which are empty
   - The red asterisk (*) marking required fields
   - The **SEO** section (expand it)
   - The **Publishing Controls** section (expand it)
4. **Do NOT make any changes** -- just explore
5. Click the back arrow to return to the document list

**Discussion point:** Ask participants what they noticed about the field organization. Are there fields they do not understand? (Address questions using the Content Model Reference.)

---

## Module 2: Content Publishing (30 minutes)

### 2.1 Step-by-Step: Creating a New CityService Page (15 min)

**Trainer demonstration with participant follow-along:**

This is the most common task editors will perform. Follow the [Publishing Workflow SOP](../content/publishing-workflow.md) Workflow A, Step 2.

1. In the left sidebar, click **"+"** and select **"City Service Page"**

2. **City & Service References fieldset:**
   - Click the **City** dropdown and select a city (use an existing city for this demo)
   - Click the **Service** dropdown and select "Tenant Placement"
   - Point out: these are **required** -- you cannot publish without them

3. **Required Local Content fieldset** (all fields are required):
   - **Local Median Rent**: Enter a number (e.g., `2500`). No dollar sign, no commas.
   - **Local Vacancy Rate**: Enter a percentage (e.g., `1.5`). Just the number, not the % symbol.
   - **Neighbourhood Names**: Click "Add item" three times and enter 3 neighbourhood names.
     - Point out: **minimum 3 items required** by schema validation. Fewer than 3 will block publishing.
   - **Local Regulatory Info**: Type a sentence about local regulations (e.g., "Ontario's Residential Tenancies Act (RTA) governs all landlord-tenant relationships.").
   - **Local Content Body**: Use the rich text editor to write 2-3 paragraphs. Demonstrate:
     - Typing normal text
     - Using the style dropdown to set H2/H3 headings
     - Making text **bold** or *italic*
     - Adding a bulleted list
     - Inserting a link (highlight text, click link icon, enter URL)

4. **Hero Section fieldset:**
   - **Hero Headline**: Type a unique, compelling headline
   - **Hero CTA 1**: Label = "Get Started", URL = `/create-account/`
   - **Hero CTA 2**: Label = "Book a Call", URL = `/contact/`

5. **SEO section** (expand it):
   - **Meta Title**: Type a title under 60 characters
   - **Meta Description**: Type a description under 160 characters
   - Point out the character count feedback

6. **Publishing Controls** (expand it):
   - Verify "Include in Sitemap" is ON
   - Verify "Noindex" is OFF
   - Set "Published At" to today

7. Click **"Publish"**

### 2.2 Hands-on Exercise: Publish a Test CityService Page (5 min)

**Participants do this themselves:**

1. Create a new CityService page for a test city + any service combination
2. Fill in ALL required fields following the steps above
3. Set SEO fields and Publishing Controls
4. Click "Publish"
5. Wait 60 seconds, then visit the live URL to verify the page appears:
   `https://movesmartrentals.com/ca/{province-slug}/{city-slug}/{service-slug}/`

**Trainer circulates** to help anyone stuck on validation errors.

### 2.3 Step-by-Step: Creating a Blog/Guide Article (5 min)

**Trainer demonstration:**

1. Click **"+"** and select **"Blog / Guide"**
2. Fill in:
   - **Title**: Enter an article headline
   - **Slug**: Click "Generate" to auto-create from the title
   - **Category**: Select "Blog Post" from the dropdown
   - **Body**: Type a few paragraphs using the rich text editor
   - **Excerpt**: Write a 1-2 sentence summary (max 200 characters)
3. Set SEO fields and Publishing Controls
4. Click **"Publish"**
5. Verify at: `https://movesmartrentals.com/resources/blog/{slug}/`

### 2.4 Hands-on Exercise: Create a Draft Blog Post (5 min)

**Participants do this themselves:**

1. Create a new Blog / Guide document
2. Fill in the title, slug, category, and a short body
3. Fill in SEO fields
4. **Do NOT publish** -- leave it as a draft
5. Observe the draft state (no "Published" badge)
6. Discuss: Why might you want to keep something as a draft? (Answer: peer review, waiting for approval, scheduling content)

---

## Module 3: Troubleshooting and Maintenance (20 minutes)

### 3.1 Common Issues and Fixes (10 min)

Work through each scenario with a live demonstration:

**Scenario 1: "I published but the page did not update"**
1. Verify you actually clicked "Publish" (check for the green "Published" badge)
2. Wait at least 60 seconds -- ISR revalidation takes up to a minute
3. Hard-refresh the page: press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
4. If still not updated after 5 minutes, the ISR webhook may need re-triggering -- contact a developer

**Scenario 2: "The page shows a 404 error"**
1. Check the URL carefully -- it must match the slug pattern exactly
2. Verify the slug in Sanity matches what you typed in the URL
3. For CityService pages, verify all three slugs are correct: province, city, AND service
4. Ensure the parent Province and City documents are published (not just drafted)

**Scenario 3: "My changes disappeared"**
1. You may have edited the draft but not published
2. Open the document in Sanity Studio and check for a yellow "Edited" badge
3. If you see "Edited", your changes are in the draft -- click "Publish" to apply them
4. If you do not see your changes at all, another editor may have published over them -- check the document history

**Scenario 4: "Sanity shows red validation errors"**
1. Scroll through the document and look for fields highlighted in red
2. Each red field has a message explaining what is wrong (e.g., "Required", "Minimum 3 items")
3. Fix each error and try publishing again
4. Common culprits: missing `metaTitle`, missing `metaDescription`, fewer than 3 `neighbourhoodNames`

### 3.2 Monitoring and Maintenance (5 min)

**Google Search Console:**
- Used to check which pages Google has indexed
- Look for "Coverage" or "Pages" report to see indexed vs. excluded pages
- If a published page is not indexed after 2 weeks, check for thin content or noindex issues

**Looker Studio Dashboard:**
- Shows traffic, search rankings, and conversion metrics
- Check weekly for pages with declining traffic (may need content refresh)
- See the [Reporting Dashboard Setup](./reporting-dashboard-setup.md) guide for details

**Weak Page Refresh workflow:**
- For pages with declining performance, use the [Weak Page Refresh](../content/weak-page-refresh.md) workflow
- Identifies pages by 4 GSC patterns: low CTR, dropping position, indexing issues, high bounce rate
- Tier-1 cities reviewed monthly, Tier-2 quarterly, blogs every 6 months

### 3.3 Content Improvement with AI Prompts (2 min)

- The [Prompt Framework](../content/prompt-framework.md) contains 5 AI prompt templates for generating first drafts
- Each template maps output directly to specific Sanity CMS fields (e.g., output goes into `localBody`, `heroHeadline`, etc.)
- Use prompts to generate initial content, then personalize with local market data before publishing
- Never publish AI-generated content without editing and verifying the local data

### 3.4 When to Contact a Developer (3 min)

**Editors can handle independently:**
- Creating and publishing any document type
- Editing content, updating market data
- Uploading and cropping images
- Setting SEO fields and publishing controls
- Resolving validation errors
- Checking Google Search Console for indexing status
- Running the weak-page refresh workflow

**Contact a developer when:**
- A page does not appear after 5+ minutes despite correct publishing
- You need to add a new document type or field to the CMS
- The Sanity Studio is not loading or shows error screens
- You need to bulk-update data across many documents
- URL redirects need to be set up at the infrastructure level
- You encounter errors in the website code (broken layouts, missing components)

---

## Reference Links

All handoff documents for the MoveSmart Rentals content team:

| Document | What it covers | Location |
|---|---|---|
| [CMS Content Model Reference](./cms-content-model-reference.md) | Every field in every content type with types, validation rules, and examples | `.planning/handoff/` |
| [Publishing Workflow SOP](../content/publishing-workflow.md) | Step-by-step publishing procedures with quality checklist | `.planning/content/` |
| [Prompt Framework](../content/prompt-framework.md) | 5 AI prompt templates for generating CMS content drafts | `.planning/content/` |
| [Weak Page Refresh](../content/weak-page-refresh.md) | GSC-driven workflow for improving underperforming pages | `.planning/content/` |
| [Reporting Dashboard Setup](./reporting-dashboard-setup.md) | GA4 and Looker Studio dashboard configuration guide | `.planning/handoff/` |

---

## Post-Session Checklist

After the training session, each participant should verify they can independently perform these tasks. Check off each item once confirmed:

- [ ] Log into Sanity Studio at `/studio`
- [ ] Navigate to and open an existing City document
- [ ] Create a new CityService page with all required fields filled
- [ ] Write content using the Portable Text rich text editor (headings, lists, bold, links)
- [ ] Fill in SEO fields (metaTitle under 60 chars, metaDescription under 160 chars)
- [ ] Set Publishing Controls (sitemap ON, noindex OFF, publishedAt set)
- [ ] Click "Publish" and verify the page appears on the live site within 60 seconds
- [ ] Create a Blog / Guide article and publish it
- [ ] Diagnose a 404 error by checking the slug and URL pattern
- [ ] Identify unpublished draft changes (yellow "Edited" badge)
- [ ] Find the CMS Content Model Reference document for field lookup

---

## Session Follow-Up

**Within 1 week after training:**
- Participants create one real CityService page independently (supervised by trainer remotely)
- Trainer reviews the published page for quality (content depth, SEO fields, no common mistakes)

**Within 1 month after training:**
- Participants have published content for at least one full city (8 CityService pages)
- Trainer conducts a 15-minute check-in to answer accumulated questions
- Review Google Search Console to confirm published pages are being indexed

---

*Last updated: 2026-03-28*
*Part of: Client Handoff Package (Phase 04, Plan 03)*
*See also: [CMS Content Model Reference](./cms-content-model-reference.md) | [Publishing Workflow SOP](../content/publishing-workflow.md)*
