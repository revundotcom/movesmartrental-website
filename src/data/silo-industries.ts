/**
 * Silo B: Industries data for audience hub pages.
 *
 * Each page targets a specific owner profile and frames our leasing
 * and tenant placement services to their context. We do not promise
 * property management, rent collection, or maintenance anywhere.
 */

export type SiloIndustry = {
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
  challenges: Array<{ title: string; body: string }>
  fit: Array<{ title: string; body: string }>
  outcomes: string[]
  process: Array<{ step: number; title: string; body: string }>
  faq: Array<{ question: string; answer: string }>
  closing: string
}

export const SILO_INDUSTRIES: SiloIndustry[] = [
  {
    slug: 'individual-landlords',
    title: 'Individual Landlords',
    navTitle: 'Individual Landlords',
    navDescription: 'Single property and small portfolio owners',
    metaTitle: 'Leasing Services for Individual Landlords | MoveSmart Rentals',
    metaDescription:
      'Tenant placement and lease execution for individual landlords renting out a condo, house, or duplex. No upfront cost. Pay only when leased.',
    heroKicker: 'For · Individual Landlords',
    heroEyebrow: 'Single property owners',
    heroHeadline: 'Leasing help for owners with one or two properties',
    heroLede:
      'You own a condo, a house, or a duplex. You do not want to be a full time landlord. We find qualified tenants, draft the lease, and hand you the signed package. No upfront cost.',
    intro:
      'Most individual landlords end up wishing they had help with the leasing part but not the ongoing management. That is exactly what we do. We market your unit, screen applicants, run the showings, and execute the lease. After move in we are out of the picture and you take over with a qualified tenant in place. Our average time to lease is 18 days.',
    challenges: [
      {
        title: 'Coordinating tours around a day job',
        body: 'Most renters want to tour evenings and weekends. We handle scheduling and showings so you do not lose work hours or family time.',
      },
      {
        title: 'Screening risk',
        body: 'Picking the wrong tenant can cost months of lost rent and legal fees. Our multi step screening catches issues that DIY checks miss.',
      },
      {
        title: 'Underpriced or overpriced rent',
        body: 'A wrong price means weeks of vacancy or money left on the table. We give you a data backed price band before listing.',
      },
      {
        title: 'Lease that holds up',
        body: 'A poorly drafted lease costs in disputes. We use vetted templates for your jurisdiction and add clauses that protect you.',
      },
    ],
    fit: [
      {
        title: 'You own one to four units',
        body: 'This is our sweet spot. Personal attention, fast response, no agency runaround.',
      },
      {
        title: 'You want help leasing but not managing',
        body: 'We hand the keys to you on move in day. You collect rent directly. You handle maintenance. We do not get in the way.',
      },
      {
        title: 'You prefer transparent pricing',
        body: 'One time fee equal to a month rent. Paid only when the lease signs. Nothing hidden.',
      },
    ],
    outcomes: [
      '18 day average time to signed lease',
      'Multi step tenant screening with landlord references',
      'Statutory compliant lease for your jurisdiction',
      'Zero upfront cost',
      '90 day tenant replacement guarantee',
    ],
    process: [
      {
        step: 1,
        title: 'Free pricing analysis',
        body: 'You send us the unit details. We pull comps and recommend a price band within 24 hours.',
      },
      {
        step: 2,
        title: 'Marketing launch',
        body: 'Photos, listing, distribution to 40+ rental platforms within 48 hours of approval.',
      },
      {
        step: 3,
        title: 'Showings and screening',
        body: 'We handle tours and screen every applicant. You see scored summaries and pick your tenant.',
      },
      {
        step: 4,
        title: 'Lease and handoff',
        body: 'We draft the lease, collect first month and deposit, coordinate move in. You step in with the keys.',
      },
    ],
    faq: [
      {
        question: 'I only have one property. Do you still work with me?',
        answer:
          'Yes. Most of our clients started with one unit. Same service, same timeline, same fee structure.',
      },
      {
        question: 'What if I find my own tenant?',
        answer:
          'We offer screening only and lease only as standalone services. You bring the tenant, we keep the paperwork clean.',
      },
      {
        question: 'Do you collect rent after move in?',
        answer:
          'No. Rent goes straight from your tenant to you. We are not a property management company.',
      },
    ],
    closing:
      'Renting out a property soon? Get a free pricing analysis and walk through how it works.',
  },
  {
    slug: 'portfolio-owners',
    title: 'Portfolio Owners',
    navTitle: 'Portfolio Owners',
    navDescription: 'Owners with 5 to 100 units',
    metaTitle: 'Leasing Services for Portfolio Landlords | MoveSmart Rentals',
    metaDescription:
      'Scalable tenant placement for portfolio owners with five to one hundred units across multiple properties. Centralized reporting, dedicated leasing team.',
    heroKicker: 'For · Portfolio Owners',
    heroEyebrow: 'Five to one hundred units',
    heroHeadline: 'Leasing infrastructure for growing portfolios',
    heroLede:
      'You have outgrown the single unit playbook. You need a leasing operation that scales with your portfolio. We staff a dedicated team that fills vacancies fast across your entire book.',
    intro:
      'Portfolio owners hit a wall around five units. The leasing workload starts to compete with everything else. Hiring an in house leasing manager is expensive and underutilized. Using a property management company means giving up control. We solve the middle: dedicated leasing team, your portfolio, transparent pricing per unit placed.',
    challenges: [
      {
        title: 'Volume without staff',
        body: 'Five vacancies per month is impossible to handle solo. We absorb the volume and keep your funnel moving.',
      },
      {
        title: 'Consistent quality across units',
        body: 'Your two bedroom in one city should be marketed as well as your detached in another. Same team, same playbook.',
      },
      {
        title: 'Centralized reporting',
        body: 'You should see pipeline, days on market, conversion rate per unit at a glance. We deliver weekly portfolio reports.',
      },
      {
        title: 'Cost predictability',
        body: 'One time fees per placement, no monthly retainer, no surprise charges. Budget the leasing line item with confidence.',
      },
    ],
    fit: [
      {
        title: 'You manage your own properties',
        body: 'You handle maintenance, rent collection, and tenant relations. You just need the leasing piece handled.',
      },
      {
        title: 'You have units across multiple cities',
        body: 'We operate in 20+ markets across the US and Canada. One contract covers your whole portfolio.',
      },
      {
        title: 'You value response time',
        body: 'Vacancy is expensive. We respond to inquiries within hours and book showings same day.',
      },
    ],
    outcomes: [
      'Portfolio level dashboard with all active vacancies',
      'Dedicated leasing point of contact',
      'Centralized weekly reporting',
      'Volume pricing on placement fees',
      'API integration with your CRM available',
    ],
    process: [
      {
        step: 1,
        title: 'Portfolio onboarding',
        body: 'We load every unit into our system. Standard templates, custom rules per property. One time setup, ninety minute call.',
      },
      {
        step: 2,
        title: 'Standing playbook',
        body: 'Every new vacancy auto triggers the placement workflow. Pricing, photos, listing, screening. You get a notification when each step completes.',
      },
      {
        step: 3,
        title: 'Weekly portfolio report',
        body: 'Every Monday: active vacancies, days on market, applications pending, approvals last week. One PDF or live dashboard.',
      },
      {
        step: 4,
        title: 'Quarterly review',
        body: 'Pricing review, performance benchmarks, recommendations for unit improvements that drive higher rents.',
      },
    ],
    faq: [
      {
        question: 'Do you offer volume pricing?',
        answer:
          'Yes. Standard placement fee is one month rent. For portfolios with five plus units we offer reduced rates. Quoted by portfolio size.',
      },
      {
        question: 'Can I get one invoice per month?',
        answer:
          'Yes. Monthly consolidated billing available. Easier for accounting than tracking individual placement invoices.',
      },
      {
        question: 'Can you integrate with my CRM?',
        answer:
          'For larger portfolios we offer API integration with most rental management software. AppFolio, Buildium, Yardi, Rent Manager all supported.',
      },
    ],
    closing:
      'Have a portfolio that needs leasing infrastructure? Book a scoping call to walk through your book.',
  },
  {
    slug: 'developers',
    title: 'Developers',
    navTitle: 'Developers',
    navDescription: 'New build lease up and pre leasing',
    metaTitle: 'Lease Up Services for Real Estate Developers | MoveSmart Rentals',
    metaDescription:
      'Pre leasing and lease up services for purpose built rental developers. 50 to 500 unit projects, branded campaigns, stabilization within target window.',
    heroKicker: 'For · Developers',
    heroEyebrow: 'New build operators',
    heroHeadline: 'Lease ups that hit your stabilization target',
    heroLede:
      'Purpose built rental developers need a leasing partner who understands timelines, capital partner reporting, and the difference between fast lease up and lease up that holds.',
    intro:
      'Lease up is its own discipline. Pre leasing six months out, model unit prep, branded campaigns, daily applicant flow, stabilization targets, investor reporting. We deploy dedicated lease up teams for purpose built rental developments from 24 units to over 500. Every engagement is structured around your stabilization model.',
    challenges: [
      {
        title: 'Timeline pressure from capital partners',
        body: 'Your LP wants stabilization by month X. We work backward from that date and report weekly against the plan.',
      },
      {
        title: 'Brand consistency across leasing touchpoints',
        body: 'Your project has a brand. Photos, copy, website, signage, leasing center all need to reinforce it. We handle the full campaign.',
      },
      {
        title: 'Pricing strategy and concession design',
        body: 'Wrong pricing or wrong concessions cost units and money. We design the rent roll and concession schedule to hit absorption.',
      },
      {
        title: 'High volume screening without compromise',
        body: 'Hundreds of applications cannot mean lax screening. Same multi step process at scale.',
      },
    ],
    fit: [
      {
        title: 'You are launching a purpose built rental',
        body: 'New construction, gut conversion, or expansion. Twenty units and up.',
      },
      {
        title: 'You have a capital partner expecting reports',
        body: 'Weekly stabilization tracking, monthly LP reports, full audit trail.',
      },
      {
        title: 'You want a partner not a vendor',
        body: 'We sit in your weekly construction calls in the run up to delivery. We are part of the team.',
      },
    ],
    outcomes: [
      'Pre leasing six to nine months before delivery',
      'Dedicated lease up team for the project',
      'Weekly stabilization reports',
      'Branded campaign aligned to your project identity',
      'Handoff documentation at stabilization',
    ],
    process: [
      {
        step: 1,
        title: 'Pre leasing kickoff',
        body: 'Six to nine months before delivery. We map the rent roll, set pricing tiers, design the concession schedule, and build the campaign.',
      },
      {
        step: 2,
        title: 'Marketing launch',
        body: 'Branded website, photo and video assets, paid social and search campaigns, signage. Lead capture from day one of pre leasing.',
      },
      {
        step: 3,
        title: 'Leasing center operations',
        body: 'Onsite or virtual leasing center. Dedicated team handles tours, applications, screening, lease execution.',
      },
      {
        step: 4,
        title: 'Stabilization push',
        body: 'Daily applicant pipeline review. Concession adjustments. Targeted outreach to fill specific unit types.',
      },
      {
        step: 5,
        title: 'Handoff or extension',
        body: 'At stabilization we either hand to your ongoing management partner or extend into renewal leasing.',
      },
    ],
    faq: [
      {
        question: 'What is your typical engagement length?',
        answer:
          'Pre leasing through stabilization typically runs 12 to 24 months. Specific length depends on unit count, market, and pre leasing window.',
      },
      {
        question: 'Do you sit on our construction calls?',
        answer:
          'For the final 90 days before delivery yes. We need to know about any delays, model unit availability, and amenity timing.',
      },
      {
        question: 'Can you handle our specific reporting requirements?',
        answer:
          'Yes. We will format weekly and monthly reports to match your LP template. Reports are part of the engagement scope.',
      },
    ],
    closing:
      'Have a lease up coming? Send the project details and we will scope a proposal.',
  },
  {
    slug: 'real-estate-investors',
    title: 'Real Estate Investors',
    navTitle: 'Real Estate Investors',
    navDescription: 'Active investors and BRRRR operators',
    metaTitle: 'Leasing Services for Real Estate Investors | MoveSmart Rentals',
    metaDescription:
      'Tenant placement for active real estate investors running BRRRR, buy and hold, and fix and rent strategies. Fast lease up, clean exits.',
    heroKicker: 'For · Real Estate Investors',
    heroEyebrow: 'Active investors',
    heroHeadline: 'Lease up your next deal faster',
    heroLede:
      'You close, renovate, and need a tenant in by month four to hit your refinance. We compress the leasing window and give you data backed proof of rents for the refi appraisal.',
    intro:
      'Real estate investors run on speed. Days vacant kill returns. We work directly with investor playbooks: BRRRR, buy and hold, fix and rent, value add. Our leasing process is built for fast turnarounds and clean documentation that supports your refinance, tax filings, and exit strategy.',
    challenges: [
      {
        title: 'Refinance window pressure',
        body: 'You need a leased unit and proof of rent within months. We hit fast timelines and provide the documentation your appraiser needs.',
      },
      {
        title: 'Out of town or out of state deals',
        body: 'You bought it remote. You cannot show it. Our local agents handle the entire process while you focus on the next deal.',
      },
      {
        title: 'Value add rent justification',
        body: 'You upgraded the unit and need to prove the new rent. We document the upgrades in the listing and back the asking price with market data.',
      },
      {
        title: 'Multi unit portfolios across markets',
        body: 'You operate in three cities. We operate in 20+. One vendor for your whole portfolio.',
      },
    ],
    fit: [
      {
        title: 'You buy rentals as a strategy',
        body: 'Not landlords by accident. Investors by choice. We get the playbook.',
      },
      {
        title: 'You value documentation',
        body: 'Lease signed, deposit received, screening package. All filed and accessible for audits and refinances.',
      },
      {
        title: 'You move fast',
        body: 'Same day photos, 24 hour listing, weekly close on average. We match your pace.',
      },
    ],
    outcomes: [
      'Two week average from listing to signed lease',
      'Rent and lease documentation for refinance',
      'Cross market portfolio support',
      'Investor friendly reporting',
      'Direct line to a leasing manager',
    ],
    process: [
      {
        step: 1,
        title: 'Deal intake',
        body: 'You send us the unit and target close date. We confirm timeline feasibility and price band same day.',
      },
      {
        step: 2,
        title: 'Renovation aware listing',
        body: 'If the unit is mid renovation we plan photo dates around finish work. Listing goes live the day after final cleanup.',
      },
      {
        step: 3,
        title: 'Fast track screening',
        body: '48 hour standard turnaround on applicants. Rush available for time critical deals.',
      },
      {
        step: 4,
        title: 'Lease and refinance package',
        body: 'Signed lease, deposit receipt, market comparable report. Everything your appraiser and lender need.',
      },
    ],
    faq: [
      {
        question: 'Do you work with house hackers and small investors?',
        answer:
          'Yes. Whether you own one duplex or fifty units we use the same playbook.',
      },
      {
        question: 'Can you place tenants before closing?',
        answer:
          'Pre leasing for renovations is fine. Pre leasing before close requires written authorization from the seller. We will help structure it.',
      },
      {
        question: 'Do you cover BRRRR markets?',
        answer:
          'We operate across the major BRRRR markets including Cleveland, Memphis, Indianapolis, Birmingham, Kansas City, plus all our standard metros.',
      },
    ],
    closing:
      'Closing on a deal soon? Lock in your leasing partner before you take possession.',
  },
  {
    slug: 'condo-owners',
    title: 'Condo Owners',
    navTitle: 'Condo Owners',
    navDescription: 'High rise and low rise condo specifics',
    metaTitle: 'Condo Rental Leasing Services US and Canada | MoveSmart Rentals',
    metaDescription:
      'Tenant placement for condo owners. We navigate building rules, fob registration, and HOA or condo board requirements as standard procedure.',
    heroKicker: 'For · Condo Owners',
    heroEyebrow: 'Condo and townhome owners',
    heroHeadline: 'Condo leasing that respects building rules',
    heroLede:
      'Condos come with rules. Board approval, fob registration, building specific lease addendums. We know the dance and handle it as part of the placement.',
    intro:
      'Renting out a condo is not the same as renting out a house. Most condo corporations or HOAs require board approval of the tenant, copies of the lease, fob registration, move in elevator booking, and specific addendums. We have placed thousands of condo tenants across Toronto, Miami, NYC, and every major North American market with strict building rules. We treat the condo workflow as standard procedure not as a surprise.',
    challenges: [
      {
        title: 'Board or HOA approval workflows',
        body: 'Every building has a different application package. We assemble it, submit it, and follow up until approval lands.',
      },
      {
        title: 'Move in coordination with elevator booking',
        body: 'Building wants elevator booked 14 days out. We coordinate with the property manager so the move in goes smooth.',
      },
      {
        title: 'Investor unit restrictions',
        body: 'Some buildings cap the number of rental units. We check before listing so you do not waste cycles on a unit that cannot be leased to a non owner.',
      },
      {
        title: 'Short term rental restrictions',
        body: 'Most condos ban Airbnb. We confirm minimum lease term requirements and ensure the lease complies.',
      },
    ],
    fit: [
      {
        title: 'You own a condo in a managed building',
        body: 'Anywhere a property manager or board oversees the building rules.',
      },
      {
        title: 'You live in a different city or country',
        body: 'Most condo investors do not live in the building. We act as your local representative for the leasing process.',
      },
      {
        title: 'You want a tenant who respects the building',
        body: 'Our screening flags applicants who have had prior issues at managed buildings.',
      },
    ],
    outcomes: [
      'Full board or HOA package handling',
      'Building specific lease addendums included',
      'Move in elevator coordination',
      'Fob and access card registration',
      'Building rule briefing for tenant',
    ],
    process: [
      {
        step: 1,
        title: 'Building intake',
        body: 'You give us the building name and address. We pull rental restrictions, lease term requirements, and board package format if known.',
      },
      {
        step: 2,
        title: 'Listing aligned to building rules',
        body: 'Minimum lease term clear in the listing. Pet policy aligned with building rules. No surprises for the applicant.',
      },
      {
        step: 3,
        title: 'Board approval submission',
        body: 'Once you approve the tenant we assemble the full board package. Submit, follow up, respond to requests.',
      },
      {
        step: 4,
        title: 'Move in coordination',
        body: 'Elevator booking, fob pickup, building orientation. Tenant moves in clean.',
      },
    ],
    faq: [
      {
        question: 'What if my building rejects the tenant?',
        answer:
          'It is rare with our screening but it does happen. We restart the process and find another applicant. No additional fee for the second placement attempt.',
      },
      {
        question: 'Do you handle Airbnb conversions?',
        answer:
          'Most condos ban short term rentals. We only place long term tenants twelve months and longer.',
      },
      {
        question: 'Can you talk to my building manager directly?',
        answer:
          'Yes. We routinely coordinate with property managers, concierge teams, and board members during the placement process.',
      },
    ],
    closing:
      'Renting out a condo? Send us the address and we will pull the building rules and get started.',
  },
  {
    slug: 'multi-family-operators',
    title: 'Multi Family Operators',
    navTitle: 'Multi Family Operators',
    navDescription: 'Large operators and REITs',
    metaTitle: 'Multi Family Leasing Services | MoveSmart Rentals',
    metaDescription:
      'Outsourced leasing operations for multi family operators and REITs. Dedicated teams, weekly LP reporting, integration with your management software.',
    heroKicker: 'For · Multi Family Operators',
    heroEyebrow: 'Operators and REITs',
    heroHeadline: 'Leasing operations that scale with your portfolio',
    heroLede:
      'Multi family operators do not need more vendors. They need a leasing partner that integrates with their stack and reports the way capital partners expect.',
    intro:
      'Multi family operations have their own rhythm. Annual turnover targets, LP level KPIs, software integrations, brand standards across assets, and high volume leasing every spring. We function as your outsourced leasing team. We connect into AppFolio, Yardi, RealPage, Entrata, or whatever you run. We deliver the metrics your asset management team needs without you having to staff up a leasing department.',
    challenges: [
      {
        title: 'Annual turnover spikes',
        body: 'May through August can mean hundreds of unit turnovers. We staff up and down with the season so you do not carry the cost in winter.',
      },
      {
        title: 'Integration with your operating software',
        body: 'AppFolio, Yardi, RealPage, Entrata, Rent Manager. We integrate with each through APIs so leasing data flows directly into your system.',
      },
      {
        title: 'Brand consistency across assets',
        body: 'Your portfolio has standards. Photo style, copy tone, response time. We follow your brand book asset by asset.',
      },
      {
        title: 'Capital partner reporting',
        body: 'LPs want occupancy, days on market, lease trade out, renewal rate. We deliver weekly and monthly dashboards in your format.',
      },
    ],
    fit: [
      {
        title: 'You operate 200+ units',
        body: 'Multi asset operators. Single asset over 100 units. REITs adding portfolios.',
      },
      {
        title: 'You have an asset management function',
        body: 'You need leasing to feed asset management data. We deliver in their format.',
      },
      {
        title: 'You want flexibility on staffing',
        body: 'Scale up for spring leasing, scale down in winter. Pay only for what you use.',
      },
    ],
    outcomes: [
      'Outsourced leasing team for your portfolio',
      'Integration with your property management software',
      'Brand standards followed across assets',
      'Weekly leasing reports to LP format',
      'Seasonal staffing flex',
    ],
    process: [
      {
        step: 1,
        title: 'Portfolio audit',
        body: 'We walk your assets, document the leasing workflows, and integrate with your property management software. Two to four weeks.',
      },
      {
        step: 2,
        title: 'Team deployment',
        body: 'Dedicated leasing team mapped to your portfolio. Single point of contact for your asset management team.',
      },
      {
        step: 3,
        title: 'Standing operations',
        body: 'Marketing, showings, applications, screening, lease execution. All flowing through your software with our team executing.',
      },
      {
        step: 4,
        title: 'Quarterly business review',
        body: 'Performance review with your asset management team. Pricing strategy, concession schedule, market positioning.',
      },
    ],
    faq: [
      {
        question: 'Can you operate inside our property management software?',
        answer:
          'Yes. We work in your AppFolio, Yardi, RealPage, or Entrata instance. Our team uses your tools.',
      },
      {
        question: 'How is pricing structured at scale?',
        answer:
          'Hybrid model. Base monthly retainer plus per unit placement fee. Volume tiers built in. Quoted by portfolio size and unit count.',
      },
      {
        question: 'Do you compete with our existing property management partner?',
        answer:
          'No. We handle leasing only. Property management, maintenance, accounting, and operations stay with your existing partner.',
      },
    ],
    closing:
      'Operate a multi family portfolio? Book a scoping call to walk through your operations.',
  },
]

export const SILO_INDUSTRY_SLUGS = SILO_INDUSTRIES.map((i) => i.slug)

export function getSiloIndustry(slug: string): SiloIndustry | undefined {
  return SILO_INDUSTRIES.find((i) => i.slug === slug)
}
