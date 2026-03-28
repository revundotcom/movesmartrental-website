# Reporting Dashboard Setup Guide (Looker Studio)

## Overview
This guide creates a free Google Looker Studio dashboard that combines:
- GA4 data (traffic, events, conversions)
- Google Search Console data (impressions, clicks, rankings, indexing)

The dashboard gives a single view of organic performance, conversion tracking, and content health -- updated automatically from live data sources.

## Prerequisites
- Google Analytics 4 property configured (from TRACK-01)
- Google Search Console verified (from TRACK-02)
- Google account with access to both GA4 and GSC

## Step 1: Create a New Looker Studio Report
1. Go to https://lookerstudio.google.com
2. Click "Create" > "Report"
3. Name it "MoveSmart Rentals - SEO & Analytics Dashboard"

## Step 2: Connect GA4 Data Source
1. Click "Add data" > "Google Analytics"
2. Select the MoveSmart Rentals GA4 property
3. Click "Add"
4. When prompted, confirm the default field configuration

## Step 3: Connect Search Console Data Source
1. Click "Add data" > "Search Console"
2. Select the movesmartrentals.com property
3. Choose "Site impression" table type (provides query-level data)
4. Click "Add"
5. Optionally add a second GSC source with "URL impression" for page-level data

## Step 4: Create Dashboard Pages

### Page 1: Traffic Overview
Data source: GA4

Create the following charts:
- **Scorecard**: Total Users (last 30 days) vs previous period
- **Scorecard**: Total Sessions (last 30 days)
- **Scorecard**: Total Pageviews (last 30 days)
- **Time series chart**: Users over time (last 90 days, line chart)
- **Bar chart**: Top 10 pages by pageviews
- **Pie chart**: Traffic by source/medium

Filters:
- Date range selector (default: last 30 days)
- Page path filter (dropdown or text match)

Layout tips:
- Place scorecards across the top row for at-a-glance KPIs
- Time series chart should span the full width below scorecards
- Bar chart and pie chart side by side in the bottom row

### Page 2: SEO Performance
Data source: Search Console

Create the following charts:
- **Scorecard**: Total clicks (last 28 days)
- **Scorecard**: Total impressions
- **Scorecard**: Average CTR
- **Scorecard**: Average position
- **Table**: Top 20 queries by clicks (columns: query, clicks, impressions, CTR, position)
- **Table**: Top 20 pages by clicks (columns: page, clicks, impressions, CTR, position)
- **Time series chart**: Clicks and impressions over time (dual axis)

Layout tips:
- Four scorecards across the top
- Query table on the left, page table on the right
- Time series chart full width at the bottom

### Page 3: Conversion Events
Data source: GA4

Create the following charts:
- **Scorecard**: account_creation events (last 30 days)
- **Scorecard**: book_a_call events
- **Scorecard**: contact_form_submit events
- **Scorecard**: phone_call_click events
- **Scorecard**: email_click events
- **Scorecard**: whatsapp_click events
- **Table**: Conversion events by page (columns: page_path, account_creation, book_a_call, contact_form_submit)
- **Table**: Conversion events by city (group by city dimension from event parameters)
- **Bar chart**: Daily conversion events over time

Setting up event filters:
1. For each scorecard, add a filter: Event name equals [event_name]
2. Set the metric to "Event count"
3. For the by-page table, use "Page path" as the dimension and create calculated fields for each event type

### Page 4: Content Performance
Data source: Search Console + GA4

Create the following charts:
- **Table**: All pages with metrics (page, clicks, impressions, CTR, position, pageviews, avg_time)
- **Scorecards**: Pages indexed (from GSC), pages with clicks > 0
- **Bar chart**: Content type performance (city pages vs service pages vs blog)

Blending data:
1. Click "Resource" > "Manage blended data"
2. Create a blend joining GSC page URL with GA4 page path
3. This enables showing both search and engagement metrics per page

Content type segmentation:
- City pages: URL contains `/ca/` or `/us/` with city slug pattern
- Service pages: URL matches service slug patterns (tenant-placement, property-management, etc.)
- Blog/guide pages: URL starts with `/resources/`

## Step 5: Set Up Auto-Refresh
1. Click "Resource" > "Manage data sources"
2. For each data source, click the three-dot menu > "Edit"
3. Set "Data freshness" to "Every 15 minutes"
4. Click "Done"

## Step 6: Share the Dashboard
1. Click "Share" (top right)
2. Add the client's email with "Viewer" access
3. Copy the shareable link
4. Optionally set up scheduled email delivery:
   - Click "Schedule email delivery" from the share menu
   - Choose frequency (weekly recommended)
   - Select recipients

## Metric Definitions

| Metric | Source | What It Means |
|--------|--------|---------------|
| Organic Sessions | GA4 | Visits from search engines |
| Clicks | GSC | Search result clicks to your site |
| Impressions | GSC | Times your pages appeared in search results |
| CTR | GSC | Click-through rate (clicks / impressions) |
| Average Position | GSC | Average ranking position in search results |
| account_creation | GA4 | Create Free Account button clicks |
| book_a_call | GA4 | Book a Call button clicks |
| contact_form_submit | GA4 | Contact form submissions |
| phone_call_click | GA4 | Phone number link clicks |
| email_click | GA4 | Email link clicks |
| whatsapp_click | GA4 | WhatsApp link clicks |
| property_view | GA4 | Property listing detail page views |
| search_filter_used | GA4 | Search filter interactions |
| social_share | GA4 | Social share button clicks |

## Reading the Dashboard

### Healthy Signs
- **CTR > 3%**: Your titles and descriptions are compelling
- **Average position < 20**: You are ranking on page 1-2 of search results
- **Growing clicks over time**: SEO momentum is building
- **Conversion rate > 1%**: Pages are driving meaningful actions
- **Multiple conversion types**: Users engage through various channels

### Warning Signs
- **CTR < 1% with high impressions**: Weak meta titles/descriptions -- users see your listing but do not click
- **Declining average position**: Content may be losing relevance or competitors are improving
- **No conversions from high-traffic pages**: Pages attract visitors but fail to convert -- review CTAs
- **Pages with 0 impressions**: Content may not be indexed or is targeting wrong keywords
- **High bounce rate on city pages**: Local content may be too thin

### Action Items
- For pages with high impressions but low CTR: Update meta titles and descriptions (see Publishing SOP)
- For pages with declining position: Apply the Weak Page Refresh Workflow
- For high-traffic/low-conversion pages: Review CTA placement and messaging
- For unindexed pages: Check Google Search Console coverage report
- For thin content warnings: Use the Content Prompt Framework to enhance page content

## Appendix: Custom Calculated Fields

### Conversion Rate (GA4)
- Formula: `Event count / Sessions * 100`
- Apply to: Page-level conversion analysis

### Content Type (Calculated Dimension)
- Formula: `CASE WHEN REGEXP_MATCH(Page path, "/ca/[^/]+/[^/]+/$") THEN "City Page" WHEN REGEXP_MATCH(Page path, "/ca/[^/]+/[^/]+/[^/]+/$") THEN "Service Page" WHEN REGEXP_MATCH(Page path, "/resources/") THEN "Blog/Guide" ELSE "Other" END`
- Apply to: Content type performance charts

### Pages with Clicks (GSC)
- Formula: `COUNT_DISTINCT(CASE WHEN Clicks > 0 THEN Page ELSE NULL END)`
- Apply to: Content coverage scorecard
