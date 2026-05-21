/**
 * Silo D: Resources data for resource hub sub pages.
 *
 * 5 resource pages: blog index, landlord guides, market reports,
 * screening checklist, lease templates. Each page is a useful destination
 * with downloadable assets or curated content links.
 */

export type SiloResource = {
  slug: string
  title: string
  navTitle: string
  navDescription: string
  metaTitle: string
  metaDescription: string
  heroKicker: string
  heroEyebrow: string
  heroHeadline: string
  heroLede: string
  intro: string
  sections: Array<{ title: string; body: string }>
  items?: Array<{ title: string; description: string; href?: string; tag?: string }>
  faq: Array<{ question: string; answer: string }>
  closing: string
}

export const SILO_RESOURCES: SiloResource[] = [
  {
    slug: 'blog',
    title: 'Blog',
    navTitle: 'Blog',
    navDescription: 'Leasing tips, market commentary, owner stories',
    metaTitle: 'MoveSmart Rentals Blog | Leasing Tips and Market Updates',
    metaDescription:
      'Practical leasing content for landlords, investors, and operators. Tenant screening, pricing strategy, lease compliance, market commentary across North America.',
    heroKicker: 'Resources · Blog',
    heroEyebrow: 'Read the latest',
    heroHeadline: 'Practical leasing content for landlords',
    heroLede:
      'Field tested advice on tenant screening, pricing, marketing, lease compliance, and market trends. Written by people who actually lease units.',
    intro:
      'Our blog covers what landlords and investors need to know. No theory and no fluff. Real lessons from running thousands of placements across the US and Canada. New articles published weekly.',
    sections: [
      {
        title: 'Tenant screening playbooks',
        body: 'Multi step screening, how to talk to prior landlords, when to require a guarantor, what to do with thin credit files, and red flags that get missed.',
      },
      {
        title: 'Pricing strategy',
        body: 'How to price for speed versus value, when to use concessions versus rent drops, seasonal pricing patterns, refinance proof rent strategies.',
      },
      {
        title: 'Lease compliance by state and province',
        body: 'Florida, Texas, Ontario, New York, California, Arizona. Specific rules. Specific lease language. Updates when laws change.',
      },
      {
        title: 'Market commentary',
        body: 'Quarterly updates on supply, demand, vacancy, and rent trends across our 20+ markets. Not opinion. Real data.',
      },
      {
        title: 'Owner case studies',
        body: 'Real landlord experiences. How a one unit owner scaled to twelve. How a developer hit stabilization six weeks ahead of schedule. What worked and what did not.',
      },
    ],
    items: [
      {
        title: 'How to screen a tenant in 2026',
        description: 'Five step process that catches problems most landlords miss.',
        tag: 'Screening',
      },
      {
        title: 'Pricing your rental in a softening market',
        description: 'When to drop rent versus when to offer a concession.',
        tag: 'Pricing',
      },
      {
        title: 'Ontario Standard Form Lease explained',
        description: 'Section by section walkthrough for landlords filing in Ontario.',
        tag: 'Compliance',
      },
      {
        title: 'Phoenix BTR market update Q1 2026',
        description: 'Supply absorption analysis for build to rent operators.',
        tag: 'Market',
      },
    ],
    faq: [
      {
        question: 'How often do you publish?',
        answer:
          'New content weekly. Major market reports quarterly. Compliance updates published when laws change.',
      },
      {
        question: 'Can I subscribe to updates?',
        answer:
          'Yes. Sign up via the landlord newsletter and you will get a monthly digest plus alerts when major regulatory changes hit.',
      },
      {
        question: 'Can I republish your content?',
        answer:
          'For inclusion in your own newsletter or blog please credit and link back. Reach out for syndication arrangements.',
      },
    ],
    closing:
      'Want practical leasing content delivered monthly? Sign up for the landlord newsletter.',
  },
  {
    slug: 'landlord-guides',
    title: 'Landlord Guides',
    navTitle: 'Landlord Guides',
    navDescription: 'Step by step playbooks for owners',
    metaTitle: 'Landlord Guides for US and Canadian Owners | MoveSmart Rentals',
    metaDescription:
      'Free downloadable guides for individual landlords and portfolio owners. Screening, pricing, lease drafting, move in coordination, and more.',
    heroKicker: 'Resources · Landlord Guides',
    heroEyebrow: 'Practical playbooks',
    heroHeadline: 'Free guides for serious landlords',
    heroLede:
      'Detailed playbooks for the parts of leasing landlords get wrong. Screening, pricing, lease compliance, and tenant relations. Free to read or download.',
    intro:
      'Most landlords learn by making expensive mistakes. Bad tenant, lost rent, eviction, court costs. Our guides exist to prevent that. They distill what we have learned across thousands of placements into step by step playbooks any owner can follow.',
    sections: [
      {
        title: 'The complete tenant screening guide',
        body: 'Multi step process covering credit, income, employment, prior landlord references, criminal background, eviction history, and identity verification. Every step explained with reasoning.',
      },
      {
        title: 'Rental pricing playbook',
        body: 'How to pull comparable rents, what factors actually move price, when to discount, seasonal effects, and how to set a price band rather than a single number.',
      },
      {
        title: 'Lease drafting essentials',
        body: 'Required clauses by jurisdiction, dangerous clauses to avoid, statutory templates, custom additions that actually protect you.',
      },
      {
        title: 'Move in and move out playbook',
        body: 'Pre move in inspection, key handoff, deposit handling, mid lease check ins, end of lease walkthrough, deposit disposition.',
      },
      {
        title: 'Eviction prevention guide',
        body: 'Catching payment issues early, communication scripts, legal notice basics, when to escalate, how to avoid court entirely.',
      },
    ],
    items: [
      {
        title: 'Tenant Screening Playbook (PDF)',
        description: '24 pages. Covers credit, income, references, ID verification. Free download.',
        tag: 'Guide',
      },
      {
        title: 'Rental Pricing Playbook (PDF)',
        description: '18 pages. How to set rent that fills fast without leaving money on the table.',
        tag: 'Guide',
      },
      {
        title: 'Lease Drafting Essentials (PDF)',
        description: '32 pages by jurisdiction. Includes Ontario, Florida, Texas, New York, California.',
        tag: 'Guide',
      },
      {
        title: 'Move In Coordination Checklist (PDF)',
        description: '8 page checklist. Use it as is or adapt for your portfolio.',
        tag: 'Checklist',
      },
    ],
    faq: [
      {
        question: 'Are the guides actually free?',
        answer:
          'Yes. Free download in exchange for your email. No payment required. We send the landlord newsletter monthly, you can unsubscribe anytime.',
      },
      {
        question: 'Can I share them with other landlords?',
        answer:
          'Personal use yes. Bulk distribution requires permission. Email us if you want to share with a landlord group or association.',
      },
      {
        question: 'Are the guides updated?',
        answer:
          'We refresh major guides annually. Compliance specific guides updated whenever laws change.',
      },
    ],
    closing:
      'Want the full library? Download the landlord guides bundle.',
  },
  {
    slug: 'market-reports',
    title: 'Market Reports',
    navTitle: 'Market Reports',
    navDescription: 'Quarterly data on rental markets we serve',
    metaTitle: 'North American Rental Market Reports | MoveSmart Rentals',
    metaDescription:
      'Quarterly rental market reports covering 20+ US and Canadian markets. Vacancy, rent growth, absorption, supply pipeline. Data driven and current.',
    heroKicker: 'Resources · Market Reports',
    heroEyebrow: 'Real data',
    heroHeadline: 'Quarterly rental market intelligence',
    heroLede:
      'No marketing fluff. Real vacancy data, real rent growth numbers, real supply pipeline analysis across the 20+ markets we operate in.',
    intro:
      'Most rental market reports are marketing dressed as data. Ours are the data we actually use to set pricing for our clients. We pull from CMHC, RealPage, HUD, MLS systems, and our own placement records. Updated quarterly with full underlying datasets available on request.',
    sections: [
      {
        title: 'Vacancy rate by market',
        body: 'Current vacancy and trailing 12 month change. Sourced from CMHC for Canadian markets and RealPage and HUD for US markets.',
      },
      {
        title: 'Rent growth and absorption',
        body: 'Year over year rent change. Days on market trends. Concession prevalence by submarket.',
      },
      {
        title: 'Supply pipeline',
        body: 'Units under construction and expected delivery. Lease up windows. Identifies which submarkets face absorption pressure in the next 12 months.',
      },
      {
        title: 'Pricing benchmarks',
        body: 'Median rents by bed count, unit size, and neighborhood. Comparison tables across our markets.',
      },
      {
        title: 'Outlook',
        body: 'Twelve month directional view per market based on supply, demand, employment, and migration data.',
      },
    ],
    items: [
      {
        title: 'Q1 2026 North America Rental Market Report',
        description: 'Full PDF, 48 pages. All 20+ markets.',
        tag: 'Quarterly',
      },
      {
        title: 'Toronto submarket report Q1 2026',
        description: 'Detailed Toronto neighborhood data including condo absorption rates.',
        tag: 'City report',
      },
      {
        title: 'Phoenix BTR absorption analysis',
        description: 'Special report on the build to rent supply wave and how it is being absorbed.',
        tag: 'Special report',
      },
      {
        title: 'Austin softening market deep dive',
        description: 'What is happening with Austin rents and what it means for owners.',
        tag: 'Special report',
      },
    ],
    faq: [
      {
        question: 'Are the underlying datasets available?',
        answer:
          'Aggregated data yes on request. Raw placement data stays private for client confidentiality.',
      },
      {
        question: 'How current is the data?',
        answer:
          'Reports published within 30 days of quarter close. Vacancy data refreshes when CMHC and RealPage release. Our internal placement data is real time.',
      },
      {
        question: 'Can you do a custom report for my portfolio?',
        answer:
          'Yes. For institutional clients and larger portfolios we produce custom market reports on the specific submarkets they operate in. Reach out for scope and pricing.',
      },
    ],
    closing:
      'Want the latest quarterly report? Download or subscribe to get it on release.',
  },
  {
    slug: 'screening-checklist',
    title: 'Screening Checklist',
    navTitle: 'Screening Checklist',
    navDescription: 'Free downloadable tenant screening checklist',
    metaTitle: 'Free Tenant Screening Checklist for Landlords | MoveSmart Rentals',
    metaDescription:
      'Free downloadable tenant screening checklist. Multi step process covering credit, income, references, and ID. Used by professional leasing teams.',
    heroKicker: 'Resources · Screening Checklist',
    heroEyebrow: 'Free download',
    heroHeadline: 'The tenant screening checklist we actually use',
    heroLede:
      'Five steps, fifteen items, used on every applicant we screen. Free to download and adapt for your own portfolio.',
    intro:
      'This is the exact screening checklist our team uses on every applicant. Five steps, fifteen specific items, plus the criteria we apply at each stage. Download as a PDF or copy into your own process. Customize as needed for your jurisdiction.',
    sections: [
      {
        title: 'Step 1: Application and consent',
        body: 'Full application form including prior addresses for two years, current and prior employer, income, two references, and consent for credit and background pulls.',
      },
      {
        title: 'Step 2: Credit and background',
        body: 'Credit score, tradeline review, collection accounts, recent inquiries, criminal background where legally permitted, eviction history search.',
      },
      {
        title: 'Step 3: Income verification',
        body: 'Most recent two pay stubs. Employer phone call to confirm employment status and income. Self employed: bank statements and prior year tax returns.',
      },
      {
        title: 'Step 4: Landlord references',
        body: 'Phone call with two most recent landlords. Specific questions: paid on time, gave proper notice, left unit in good condition, would rent to again.',
      },
      {
        title: 'Step 5: Decision and documentation',
        body: 'Apply standard criteria. Document the decision and reasoning. Notify applicant in writing. Comply with fair housing rules at every stage.',
      },
    ],
    items: [
      {
        title: 'Screening Checklist PDF',
        description: 'Single page printable checklist. 15 items across 5 stages.',
        tag: 'Download',
      },
      {
        title: 'Reference Call Script',
        description: '6 question script for calls with prior landlords.',
        tag: 'Download',
      },
      {
        title: 'Income Verification Letter Template',
        description: 'Employer verification template for use during screening.',
        tag: 'Template',
      },
      {
        title: 'Decision Letter Template',
        description: 'Approval, conditional approval, and decline letter templates.',
        tag: 'Template',
      },
    ],
    faq: [
      {
        question: 'Can I use the checklist as is?',
        answer:
          'For most jurisdictions yes. For specific provinces and states with extra requirements we list the modifications needed. Read the jurisdictional notes inside the PDF.',
      },
      {
        question: 'What credit score should I require?',
        answer:
          'Depends on the unit and market. Class A rentals typically require 680 plus. Workforce rentals can work with 600 plus and compensating factors. The checklist explains how to evaluate.',
      },
      {
        question: 'What about fair housing laws?',
        answer:
          'The checklist applies the same criteria to every applicant. Fair housing compliance is built in by using standard criteria. The PDF includes a section on what you cannot consider.',
      },
    ],
    closing:
      'Want the checklist? Free download below.',
  },
  {
    slug: 'lease-templates',
    title: 'Lease Templates',
    navTitle: 'Lease Templates',
    navDescription: 'Statutory compliant templates by jurisdiction',
    metaTitle: 'Free Lease Templates by State and Province | MoveSmart Rentals',
    metaDescription:
      'Free residential lease templates compliant with state and provincial law. Ontario standard form, Florida, Texas, California, New York templates available.',
    heroKicker: 'Resources · Lease Templates',
    heroEyebrow: 'Free downloads',
    heroHeadline: 'Lease templates by jurisdiction',
    heroLede:
      'Statutory base leases for Ontario, Florida, Texas, California, New York, and more. Reviewed quarterly. Use them yourself or send them through our lease execution service.',
    intro:
      'A clean lease is one of the most important documents in a landlord toolkit. We maintain templates for every major US state and Canadian province we operate in. Each template starts from the statutory base, layers in best practice clauses, and gets reviewed quarterly for legal changes. Free for personal use.',
    sections: [
      {
        title: 'Statutory base templates',
        body: 'Where the jurisdiction mandates a standard form (Ontario, BC) we use it. Where the jurisdiction allows custom leases (Florida, Texas) we start from a compliant base and layer in protections.',
      },
      {
        title: 'Custom clause library',
        body: 'Pet policy, parking, utility splits, smoking, short term occupancy, sublet rules. Pre vetted clauses you can add to any template.',
      },
      {
        title: 'Disclosure addendums',
        body: 'Lead paint, mold, flood zone, asbestos. Jurisdiction specific disclosures bundled with each template.',
      },
      {
        title: 'Co signer and guarantor templates',
        body: 'When applicant credit needs reinforcement a guarantor agreement does the job. Templates included.',
      },
      {
        title: 'Common amendments',
        body: 'Lease renewal, early termination, rent change, pet addition. Pre drafted amendment forms.',
      },
    ],
    items: [
      {
        title: 'Ontario Standard Form Lease (2025)',
        description: 'Current Ministry approved form with custom Schedule A best practices.',
        tag: 'Canada',
      },
      {
        title: 'Florida Residential Lease',
        description: 'Chapter 83 compliant. Includes flood disclosure and lead paint addendum.',
        tag: 'US',
      },
      {
        title: 'Texas Residential Lease',
        description: 'Property Code Chapter 92 compliant. Includes flood disclosure section.',
        tag: 'US',
      },
      {
        title: 'California Residential Lease',
        description: 'Statewide compliant template. Includes Megan Law disclosure and mold addendum.',
        tag: 'US',
      },
      {
        title: 'New York Residential Lease',
        description: 'Free market and stabilized variants. Includes window guard and lead paint disclosures.',
        tag: 'US',
      },
      {
        title: 'Guarantor Agreement Template',
        description: 'Universal guarantor agreement. Adapt for your jurisdiction.',
        tag: 'Template',
      },
    ],
    faq: [
      {
        question: 'Are these templates legally binding?',
        answer:
          'When signed by both parties yes. They are drafted from statutory templates and reviewed quarterly. We recommend you review with your own counsel for high value or complex tenancies.',
      },
      {
        question: 'Why use a template versus a lawyer drafted lease?',
        answer:
          'For standard residential tenancies templates are sufficient and significantly more cost effective. For high net worth properties, mixed use, or commercial residential hybrids talk to a real estate lawyer.',
      },
      {
        question: 'Can you customize for my portfolio?',
        answer:
          'Yes. For multi unit portfolios we offer a custom master lease template service. One time fee. Works for every unit in your book going forward.',
      },
    ],
    closing:
      'Need a lease template? Pick your jurisdiction and download. Or use our lease execution service to have us handle it end to end.',
  },
]

export const SILO_RESOURCE_SLUGS = SILO_RESOURCES.map((r) => r.slug)

export function getSiloResource(slug: string): SiloResource | undefined {
  return SILO_RESOURCES.find((r) => r.slug === slug)
}
