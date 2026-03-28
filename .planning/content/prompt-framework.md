# Content Generation Prompt Framework

A collection of reusable AI prompt templates for generating first-draft content for MoveSmart Rentals pages. Each prompt is designed to produce content that meets the CMS schema requirements and quality standards defined in the [Publishing Workflow](./publishing-workflow.md).

**Audience:** Content editors generating first-draft content using ChatGPT, Claude, Gemini, or similar AI tools.
**Output:** Draft content ready to be entered into Sanity Studio following the Publishing Workflow.

---

## How to Use This Framework

1. **Choose the prompt template** that matches your content type (see table below)
2. **Replace ALL [PLACEHOLDERS]** with real, researched data -- never leave placeholders in the output
3. **Run the prompt** in ChatGPT, Claude, Gemini, or any AI writing tool
4. **Review and edit** the output -- never publish AI-generated content without human review
5. **Fact-check** all claims, statistics, and regulatory references
6. **Enter the content** into Sanity Studio following the [Publishing Workflow](./publishing-workflow.md)

### Prompt Quick Reference

| Prompt | Use For | Output Fields |
|--------|---------|---------------|
| Prompt 1 | City Hub Page | description (portableContent) |
| Prompt 2 | CityService Page | localBody, heroHeadline, localRegulatory |
| Prompt 3 | CityService FAQ | faq (3-5 question/answer pairs) |
| Prompt 4 | Blog/Guide | body (full article), excerpt |
| Prompt 5 | Meta Title & Description | seo.metaTitle, seo.metaDescription |

---

## Prompt 1: City Hub Page Content

**Use when:** Creating the `description` field for a new City document.
**Output length:** 200-300 words.
**Sanity field:** `description` (portableContent / rich text)

### Template

```
You are a content writer for MoveSmart Rentals, a technology-enabled property management company serving landlords and tenants across Canada and the United States.

Write a 200-300 word description for [CITY], [PROVINCE_OR_STATE] to appear on the city's hub page on our property management website.

Use the following real data:
- Current population: [POPULATION]
- Median monthly rent: $[MEDIAN_RENT]
- Current vacancy rate: [VACANCY_RATE]%
- Key neighbourhoods: [NEIGHBOURHOOD_1], [NEIGHBOURHOOD_2], [NEIGHBOURHOOD_3], [NEIGHBOURHOOD_4]
- Local transit system: [TRANSIT_SYSTEM_NAME]
- Major employers or universities: [EMPLOYER_1], [EMPLOYER_2]

Requirements:
1. Open with a direct, factual statement about [CITY]'s rental market (not a generic welcome message)
2. Include ALL of the data points listed above naturally within the text
3. Mention what makes [CITY] attractive to rental property investors specifically
4. Include one unique fact about [CITY]'s rental market or housing trends
5. Close with why professional property management matters in [CITY]
6. Do NOT use generic phrases that could apply to any city (e.g., "growing city", "vibrant community")
7. Do NOT use superlatives ("best", "top-rated", "premier") unless factually supported
8. Use second-person ("you") to address property owners directly

Tone: Professional, informative, data-driven. Write as if speaking to an experienced property investor who is evaluating [CITY] as a market.

Primary SEO keyword: "[CITY] property management"
Secondary keywords: "[CITY] rentals", "[CITY] landlord services", "rental management [CITY]"
```

### Example Input

```
City: Mississauga, Ontario
Population: 717,961
Median Rent: $2,500
Vacancy Rate: 1.3%
Neighbourhoods: Port Credit, Streetsville, Erin Mills, Meadowvale
Transit: MiWay (local), GO Transit (regional to Toronto)
Employers: Toronto Pearson Airport, Microsoft Canada, Amazon
```

---

## Prompt 2: CityService Page Content

**Use when:** Creating a CityService document -- fills `localBody`, `heroHeadline`, and `localRegulatory` fields.
**Output length:** 250-400 words for localBody, 1 line for heroHeadline, 100-150 words for localRegulatory.
**Sanity fields:** `heroHeadline`, `localBody` (portableContent), `localRegulatory` (text)

### Template

```
You are a content writer for MoveSmart Rentals, a technology-enabled property management company.

Create content for a [SERVICE_NAME] page specific to [CITY], [PROVINCE_OR_STATE].

Context data:
- City: [CITY]
- Province/State: [PROVINCE_OR_STATE]
- Service: [SERVICE_NAME] (slug: [SERVICE_SLUG])
- Median rent in [CITY]: $[MEDIAN_RENT]/month
- Vacancy rate: [VACANCY_RATE]%
- Neighbourhoods: [NEIGHBOURHOOD_1], [NEIGHBOURHOOD_2], [NEIGHBOURHOOD_3]
- Local transit: [TRANSIT_SYSTEM]
- Relevant local regulation: [REGULATION_NAME] (e.g., Ontario's Residential Tenancies Act)

Generate THREE outputs:

OUTPUT 1 - Hero Headline (1 line, max 80 characters):
A compelling, specific headline for this city+service combination.
- MUST mention both the service and the city
- MUST NOT be generic (not just "[Service] in [City]")
- Should highlight a local benefit or pain point
Example: "Expert Tenant Screening in Mississauga's Competitive 1.3% Vacancy Market"

OUTPUT 2 - Local Content Body (250-400 words):
Write locally-specific content about this service in this city. Requirements:
1. Open with a direct answer: why this service matters in [CITY] specifically
2. Reference at least 2 neighbourhoods by name
3. Include at least one local market data point (rent, vacancy, growth)
4. Mention [TRANSIT_SYSTEM] or local geography as relevant to the service
5. Reference the specific regulation ([REGULATION_NAME]) and how it affects this service
6. Include MoveSmart Rentals' value proposition for this service in this market
7. Close with a clear call to action
8. Do NOT use content that could apply to any city -- every paragraph must have local specificity

OUTPUT 3 - Local Regulatory Info (100-150 words):
Write a concise summary of [PROVINCE_OR_STATE]-specific regulations that affect [SERVICE_NAME].
- Reference the specific legislation by name
- Include relevant sections or rules
- Explain how MoveSmart Rentals ensures compliance
- This appears as a regulatory disclosure section on the page

Tone: Professional, authoritative, locally knowledgeable.
Format: Use paragraph breaks. No bullet points in the body text. Regulatory section can use short bullet points.
```

### Placeholder Lookup Guide

| Placeholder | Where to Find |
|-------------|---------------|
| `[MEDIAN_RENT]` | CMHC Rental Market Report, Rentals.ca, local MLS |
| `[VACANCY_RATE]` | CMHC Rental Market Report (annual), local board data |
| `[REGULATION_NAME]` | Ontario: Residential Tenancies Act (RTA). BC: Residential Tenancy Act. Alberta: Residential Tenancies Act. US: varies by state |
| `[TRANSIT_SYSTEM]` | City's official transit authority name |
| `[NEIGHBOURHOOD_1-3]` | City's official neighbourhood map or real estate board designations |

---

## Prompt 3: CityService FAQ Generation

**Use when:** Populating the `faq` array field on a CityService document.
**Output:** 5 question/answer pairs.
**Sanity field:** `faq` (array of objects with `question` and `answer` text fields)

### Template

```
Generate 5 frequently asked questions (with detailed answers) for a [SERVICE_NAME] page specific to [CITY], [PROVINCE_OR_STATE] on a property management website (MoveSmart Rentals).

Context:
- Service: [SERVICE_NAME]
- City: [CITY], [PROVINCE_OR_STATE]
- Local median rent: $[MEDIAN_RENT]/month
- Vacancy rate: [VACANCY_RATE]%
- Key regulation: [REGULATION_NAME]
- Neighbourhoods served: [NEIGHBOURHOOD_1], [NEIGHBOURHOOD_2], [NEIGHBOURHOOD_3]

Requirements for each FAQ:
1. Question must be a question a local property owner would actually search for on Google
2. Question should include the city name OR province/state name
3. Answer must be 50-100 words (substantive, not one-liners)
4. Answer must reference at least one local data point, regulation, or neighbourhood
5. Answer should naturally mention MoveSmart Rentals' service

FAQ distribution:
- FAQ 1: About the service process in [CITY] specifically
- FAQ 2: About local regulations affecting this service
- FAQ 3: About pricing or cost expectations in [CITY]'s market
- FAQ 4: About timeline or speed of service delivery
- FAQ 5: About why professional management matters in [CITY]

Format each FAQ as:
Q: [Question]
A: [Answer]

Important: These FAQs will be rendered with FAQ schema markup for Google rich results. Each question must be genuinely useful and unique -- not generic filler.
```

---

## Prompt 4: Blog/Guide First Draft

**Use when:** Creating content for the `body` field of a Blog/Guide document.
**Output length:** 800-1500 words.
**Sanity fields:** `body` (portableContent), `excerpt` (text, max 200 chars)

### Template

```
Write a [CONTENT_TYPE] for MoveSmart Rentals' website about "[ARTICLE_TOPIC]".

Content type: [blog-post | guide | market-report | legal-guide]
Target audience: [property-owners | tenants | both]
Geographic focus: [CITY_OR_PROVINCE_OR_NATIONAL]

If location-specific, use this data:
- Location: [CITY], [PROVINCE_OR_STATE]
- Median rent: $[MEDIAN_RENT]/month
- Vacancy rate: [VACANCY_RATE]%
- Key regulation: [REGULATION_NAME]

Article structure:
1. Opening paragraph (40-60 words): Start with a direct answer to the topic's core question. This paragraph must stand alone as a useful answer -- it will be used for AI citation and featured snippets.

2. Section 1: [SUBTOPIC_1]
   - 150-200 words
   - Include at least one specific data point

3. Section 2: [SUBTOPIC_2]
   - 150-200 words
   - Include a practical actionable tip

4. Section 3: [SUBTOPIC_3]
   - 150-200 words
   - Include a local regulatory reference (if location-specific)

5. Section 4: [SUBTOPIC_4] (optional for longer articles)
   - 150-200 words

6. Conclusion (50-100 words):
   - Summarize key takeaways
   - Include a call to action for MoveSmart Rentals services

Requirements:
- Use H2 headings for each section (NOT H1 -- the page title is the H1)
- Include a data point or statistic every 150-200 words
- Do NOT use filler phrases ("In today's market...", "It's no secret that...")
- Do NOT use superlatives without data backing
- Link suggestions: mention where internal links to service or city pages would fit (mark as [INTERNAL LINK: /path/])
- Target keyword: "[TARGET_KEYWORD]"
- Secondary keywords: "[SECONDARY_1]", "[SECONDARY_2]"

Also generate:
EXCERPT (max 200 characters): A 1-2 sentence summary for the article card/preview.

Tone: Professional, informative, actionable. Write for someone who needs practical guidance, not marketing fluff.
```

---

## Prompt 5: Meta Title and Description

**Use when:** Filling the SEO fields (`seo.metaTitle` and `seo.metaDescription`) for any document type.
**Output:** 1 meta title + 1 meta description.
**Sanity fields:** `seo.metaTitle` (string, max 60 chars), `seo.metaDescription` (string, max 160 chars)

### Template

```
Generate an SEO-optimized meta title and meta description for the following page on MoveSmart Rentals' website.

Page type: [city | cityService | blog | guide | service]
Page topic: [DESCRIPTION_OF_PAGE]
Target keyword: [PRIMARY_KEYWORD]
City (if applicable): [CITY]
Province/State (if applicable): [PROVINCE_OR_STATE]

Rules:
META TITLE:
- Exactly 50-60 characters (count carefully)
- Include the target keyword near the beginning
- End with " | MoveSmart Rentals" (this takes 20 characters)
- Do NOT use clickbait or ALL CAPS
- Format for city pages: "[City] [Service] | MoveSmart Rentals"
- Format for blog: "[Topic] - [Year] Guide | MoveSmart Rentals"

META DESCRIPTION:
- Exactly 140-160 characters (count carefully)
- Include the target keyword naturally
- Include a call to action (e.g., "Learn more", "Get started today", "Find out how")
- Mention the city name if the page is location-specific
- Do NOT start with "Welcome to" or "We are"
- Include one differentiator (e.g., "technology-enabled", "local expertise", "transparent screening")

Generate 3 options for each so the editor can choose the best fit.

Format:
TITLE 1: [title] ([X] chars)
TITLE 2: [title] ([X] chars)
TITLE 3: [title] ([X] chars)

DESC 1: [description] ([X] chars)
DESC 2: [description] ([X] chars)
DESC 3: [description] ([X] chars)
```

---

## Anti-Patterns: What NOT to Do

### Content Generation Anti-Patterns

| Anti-Pattern | Why It Is Harmful | What to Do Instead |
|---|---|---|
| Generate content without local data inputs | Produces generic text that could describe any city | Always research and fill ALL placeholders with real data before running prompts |
| Publish AI output without human review | AI hallucinates facts, uses incorrect regulations, invents statistics | Review every output, fact-check data, verify regulatory references |
| Use the same prompt output for multiple cities | Creates duplicate content that Google penalizes | Run a fresh prompt for each city with unique local data |
| Skip neighbourhood and regulatory references | Produces thin content that fails CMS validation and SEO quality | Every CityService page needs 3+ neighbourhoods and regulatory context |
| Use AI for legal/regulatory claims | AI may cite nonexistent laws or outdated regulations | Verify ALL regulatory references against current legislation |
| Generate meta descriptions longer than 160 chars | Google truncates them, harming click-through rate | Count characters and trim to 140-160 |

### Prompt Usage Anti-Patterns

| Anti-Pattern | Why It Is Harmful | What to Do Instead |
|---|---|---|
| Running prompts with `[PLACEHOLDER]` text left in | Produces content with literal bracket text | Check every field before running |
| Copy-pasting output directly into CMS | Skips quality review, misses formatting issues | Paste into a text editor, review, then enter into Sanity |
| Using outdated market data (>12 months old) | Undermines credibility and SEO accuracy | Verify data currency from CMHC, Stats Canada, or local MLS |
| Generating all 8 CityService pages in one prompt | Produces repetitive content across services | Run each service prompt separately with service-specific context |

---

## Data Sources for Placeholder Research

| Data Point | Canadian Source | US Source |
|---|---|---|
| Population | Statistics Canada Census | US Census Bureau |
| Median Rent | CMHC Rental Market Report, Rentals.ca | Zillow Rental Index, ApartmentList |
| Vacancy Rate | CMHC Rental Market Report | US Census Bureau ACS |
| Regulations | Provincial Residential Tenancies Act | State landlord-tenant statutes |
| Neighbourhoods | City official map, local MLS board | City planning documents, local MLS |
| Transit | City transit authority website | City DOT or transit authority |
| Employers | City economic development office | Bureau of Labor Statistics, local chamber |

---

## Workflow Integration

This prompt framework feeds directly into the [Publishing Workflow](./publishing-workflow.md):

```
Research local data --> Fill placeholders --> Run AI prompt --> Review output --> Enter into Sanity Studio --> Publish
```

For underperforming pages, use the [Weak Page Refresh Workflow](./weak-page-refresh.md) to identify which content needs regeneration, then return to these prompts with updated data.

---

*Last updated: 2026-03-28*
*Part of: Content Production System (Plan 03-07)*
*See also: [Publishing Workflow](./publishing-workflow.md) | [Weak Page Refresh](./weak-page-refresh.md)*
