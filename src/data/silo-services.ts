/**
 * Silo A: Services data for the leasing services hierarchy.
 *
 * MoveSmart Rentals is a LEASING and TENANT PLACEMENT company.
 * Do not describe ongoing property management, rent collection,
 * or maintenance services here. Every service ends at lease signing
 * and key handoff.
 */

export type SiloService = {
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
  process: Array<{ step: number; title: string; body: string }>
  included: string[]
  notIncluded: string[]
  audience: string[]
  faq: Array<{ question: string; answer: string }>
  closing: string
}

export const SILO_SERVICES: SiloService[] = [
  {
    slug: 'tenant-placement',
    title: 'Tenant Placement',
    navTitle: 'Tenant Placement',
    navDescription: 'Full marketing, screening, and lease signing',
    metaTitle: 'Tenant Placement Services Across North America | MoveSmart Rentals',
    metaDescription:
      'End to end tenant placement for landlords across the US and Canada. We market, screen, show, and sign qualified renters fast. No upfront cost.',
    heroKicker: 'Service · Tenant Placement',
    heroEyebrow: 'Find the right renter',
    heroHeadline: 'Qualified tenants placed in days, not weeks',
    heroLede:
      'We run the full placement cycle from listing to lease signing. You only pay when a vetted tenant is in your unit and the lease is countersigned.',
    intro:
      'Tenant placement is the heart of what we do. Every property gets the same end to end process whether it is a one bedroom condo in Mississauga or a 200 unit lease up in Houston. We treat your unit like our own portfolio. The goal is simple. Find a qualified renter fast, sign a clean lease, and hand back the keys.',
    process: [
      {
        step: 1,
        title: 'Discovery and pricing',
        body: 'We walk the unit, pull comparable rents within a half mile radius, and recommend a price band that balances speed and value. You see the data before we go live.',
      },
      {
        step: 2,
        title: 'Marketing launch',
        body: 'Professional photos, drone shots when relevant, a written listing, and same day distribution to 40+ rental platforms including Zillow, Realtor, Rentals.ca, Apartments.com, and your local MLS.',
      },
      {
        step: 3,
        title: 'Inquiry triage and showings',
        body: 'Our team handles every call, text, and email. Pre qualified prospects book showings directly with us. You never miss a lead and never have to coordinate a single tour.',
      },
      {
        step: 4,
        title: 'Screening and approval',
        body: 'Multi step screening: credit, income verification, prior landlord references, employment confirmation, ID validation. You see every applicant before approval and have final sign off.',
      },
      {
        step: 5,
        title: 'Lease execution and key handoff',
        body: 'We draft the lease using local statutory templates, collect first month and deposit, and coordinate move in. You get the signed lease, the funds, and a clean handoff.',
      },
    ],
    included: [
      'Pricing analysis with comparable rents',
      'Professional photography and listing copy',
      'Distribution to 40+ rental platforms',
      'Inquiry handling, calls, texts, emails',
      'In person and virtual showings',
      'Full applicant screening package',
      'Lease drafting and electronic signing',
      'First month and deposit collection',
      'Move in coordination',
    ],
    notIncluded: [
      'Ongoing rent collection after lease starts',
      'Maintenance dispatch or repairs',
      'Property management or accounting',
      'Eviction filings or court representation',
      'Renovations or unit improvements',
    ],
    audience: [
      'Single property landlords renting out a condo or detached home',
      'Portfolio owners with five to fifty units',
      'Investors who self manage but want help filling vacancies',
      'Developers needing a placement partner for new builds',
    ],
    faq: [
      {
        question: 'How fast can you place a tenant?',
        answer:
          'Our average time from listing to signed lease is 18 days across our markets. Hot markets like Miami, Austin, and central Toronto often close faster. Slower markets or specialty units may take longer. We give you a realistic timeline at kickoff.',
      },
      {
        question: 'What is your fee?',
        answer:
          'We charge a one time success fee equal to one month rent. Nothing is paid until the lease is signed and your tenant moves in. No setup fees, no marketing fees, no monthly retainer.',
      },
      {
        question: 'Do you guarantee the tenant?',
        answer:
          'Yes. If a tenant we place breaks the lease in the first 90 days we replace them at no cost. Full terms in our placement agreement.',
      },
      {
        question: 'Can I reject applicants?',
        answer:
          'You have full final approval. We present every qualified applicant with a scored summary. You pick. We will flag concerns but the decision is yours.',
      },
    ],
    closing:
      'Ready to fill a vacancy? Get a free pricing analysis and a no obligation walkthrough of our process.',
  },
  {
    slug: 'lease-execution',
    title: 'Lease Execution',
    navTitle: 'Lease Execution',
    navDescription: 'Drafting, signing, deposit collection',
    metaTitle: 'Lease Execution Services US and Canada | MoveSmart Rentals',
    metaDescription:
      'Statutory compliant lease drafting, electronic signatures, deposit collection, and key handoff. Clean leases that hold up.',
    heroKicker: 'Service · Lease Execution',
    heroEyebrow: 'Clean leases that close',
    heroHeadline: 'Lease drafting and signing done right',
    heroLede:
      'Statutory compliant lease documents, electronic signatures, deposit collection, and a clean closeout. Every clause vetted for your jurisdiction.',
    intro:
      'A poorly drafted lease costs landlords thousands. Missing clauses, wrong jurisdictional templates, fee structures that violate local law. We use vetted templates updated quarterly for every state and province we serve. Our team handles the entire signing flow from final draft to deposit collection so you never chase paperwork.',
    process: [
      {
        step: 1,
        title: 'Template selection',
        body: 'We pull the statutory base lease for your jurisdiction. Florida, Texas, Ontario, Quebec all have different requirements. We start from compliant ground.',
      },
      {
        step: 2,
        title: 'Custom clause review',
        body: 'Pet policies, parking allocation, utility splits, smoking rules. We layer your specific terms in plain language that holds up in court.',
      },
      {
        step: 3,
        title: 'Electronic signing',
        body: 'Lease goes out for e signature to both parties. Audit trail attached. Identity verified. No paper, no fax, no scanning.',
      },
      {
        step: 4,
        title: 'Deposit and first month',
        body: 'We collect first month rent and security deposit through ACH or wire. Funds land in your account within two business days of clearance.',
      },
      {
        step: 5,
        title: 'Closeout package',
        body: 'You receive the signed lease, deposit receipt, signed move in inspection, and tenant contact details in a single document package.',
      },
    ],
    included: [
      'Jurisdiction specific lease templates',
      'Custom clause drafting',
      'Electronic signature platform',
      'First month rent and deposit collection',
      'Move in inspection coordination',
      'Signed package delivered to owner',
      'Tenant onboarding handoff',
    ],
    notIncluded: [
      'Ongoing rent collection after move in',
      'Lease renewal management',
      'Eviction proceedings',
      'Tenant disputes after move in',
    ],
    audience: [
      'Landlords who found their own tenant but need clean paperwork',
      'Property managers offloading the closing process',
      'Developers signing dozens of leases per month',
      'Real estate attorneys managing investor clients',
    ],
    faq: [
      {
        question: 'Can you draft a lease if I found my own tenant?',
        answer:
          'Yes. We offer lease only execution as a standalone service. Flat fee, no placement work involved. We screen your tenant first to make sure they qualify, then draft and execute.',
      },
      {
        question: 'What if my state has special requirements?',
        answer:
          'Our templates are updated quarterly by jurisdiction. We track legislative changes in every state and province we serve. If you operate in a market we do not cover yet just ask.',
      },
      {
        question: 'How long does the signing take?',
        answer:
          'Once we have your terms and the tenant is approved most leases sign within 48 hours. E signature is fast.',
      },
    ],
    closing:
      'Need a lease drafted? Send us your tenant info and lease terms. We will return a draft within 24 hours.',
  },
  {
    slug: 'rental-pricing-and-market-analysis',
    title: 'Rental Pricing and Market Analysis',
    navTitle: 'Rental Pricing and Market Analysis',
    navDescription: 'Data driven rent recommendations',
    metaTitle: 'Rental Pricing and Market Analysis | MoveSmart Rentals',
    metaDescription:
      'Free rental pricing analysis backed by current market comps, vacancy data, and absorption rates. Get a realistic price band before you list.',
    heroKicker: 'Service · Pricing and Market Analysis',
    heroEyebrow: 'Price right the first time',
    heroHeadline: 'Pricing backed by real market data',
    heroLede:
      'Stop guessing. Get a rental price band based on real comparable listings, vacancy rates, and absorption data in your specific submarket.',
    intro:
      'Most landlords either overprice and sit empty or underprice and leave money on the table. We pull live data from 40+ rental platforms, the local MLS, and government vacancy reports. Then we map it to your specific unit by bed count, square footage, building type, and amenities. The output is a realistic price band with a recommended starting point.',
    process: [
      {
        step: 1,
        title: 'Unit profile capture',
        body: 'We collect unit details: size, beds, baths, parking, utilities included, building type, amenities. Twenty minutes of intake either by form or call.',
      },
      {
        step: 2,
        title: 'Comparable pull',
        body: 'Active and recently leased units within a half mile to two mile radius depending on density. Filtered by similar bed count, size, and quality tier.',
      },
      {
        step: 3,
        title: 'Vacancy and absorption check',
        body: 'CMHC data for Canadian markets, RealPage and HUD data for US markets. We check how fast units like yours actually rent in current conditions.',
      },
      {
        step: 4,
        title: 'Price band recommendation',
        body: 'You receive a low, target, and high price with reasoning. Plus an expected days on market estimate at each price point.',
      },
      {
        step: 5,
        title: 'Strategy session',
        body: 'Fifteen minute call to walk through the report and answer questions. You decide where to price.',
      },
    ],
    included: [
      'Live comparable analysis',
      'Vacancy and absorption data',
      'Submarket trend lines',
      'Price band recommendation',
      'Expected time on market estimate',
      'One on one strategy call',
    ],
    notIncluded: [
      'Marketing or listing services',
      'Tenant screening',
      'Lease drafting',
    ],
    audience: [
      'Landlords renewing leases who want a fresh data point',
      'Investors evaluating a purchase before closing',
      'Owners debating a vacancy refresh price increase',
      'Developers calibrating asking rents for a new build',
    ],
    faq: [
      {
        question: 'Is the analysis really free?',
        answer:
          'Yes. The pricing report and strategy call are free with no obligation to use our placement service. We offer it because most landlords who see real market data become customers anyway.',
      },
      {
        question: 'How current is the data?',
        answer:
          'Live. Active listings refresh daily. Closed deals refresh weekly. Vacancy data refreshes quarterly with government releases.',
      },
      {
        question: 'Can you do this for short term rentals?',
        answer:
          'No. We focus on long term rentals, twelve months and longer. Short term and Airbnb pricing follows different signals.',
      },
    ],
    closing:
      'Want to know what your unit should rent for? Request a free pricing report.',
  },
  {
    slug: 'property-marketing-and-listings',
    title: 'Property Marketing and Listings',
    navTitle: 'Property Marketing and Listings',
    navDescription: 'Photos, copy, syndication to 40+ platforms',
    metaTitle: 'Rental Property Marketing and Listing Distribution | MoveSmart Rentals',
    metaDescription:
      'Professional photography, listing copy, and same day distribution to 40+ rental platforms across North America. Maximum exposure for every vacancy.',
    heroKicker: 'Service · Property Marketing',
    heroEyebrow: 'Get in front of every renter',
    heroHeadline: 'Listings that get the calls',
    heroLede:
      'Professional photos, written copy that ranks, and same day syndication to 40+ platforms including Zillow, Realtor, MLS, and Apartments.com.',
    intro:
      'A great unit with bad photos and a weak listing will sit. A solid unit with strong marketing fills in days. We handle the entire marketing package: photography, copy, video walk throughs when needed, and syndication to every relevant rental platform in your market.',
    process: [
      {
        step: 1,
        title: 'Photography session',
        body: 'Professional photographer onsite. Twenty to forty edited photos delivered within 48 hours. Drone shots for detached homes and larger buildings when relevant.',
      },
      {
        step: 2,
        title: 'Listing copy',
        body: 'Written by humans who know how renters search. Keywords for local SEO. Honest descriptions of what makes the unit worth touring.',
      },
      {
        step: 3,
        title: 'Platform distribution',
        body: 'Zillow, Realtor, Rentals.ca, Apartments.com, Trulia, Facebook Marketplace, local MLS, Padmapper, and 30+ more. Same day publish.',
      },
      {
        step: 4,
        title: 'Featured placement',
        body: 'Paid promotion on top platforms during slow windows. Boosted reach in tenant feeds. We track which platforms drive the most inquiries.',
      },
      {
        step: 5,
        title: 'Refresh and optimization',
        body: 'If a listing sits we refresh photos, swap headlines, and rerun pricing. No listing rots for more than seven days without a touchup.',
      },
    ],
    included: [
      'Professional photography session',
      'Written listing copy',
      '40+ platform syndication',
      'Featured placement on top platforms',
      'Inquiry tracking by source',
      'Weekly performance reporting',
      'Listing refreshes',
    ],
    notIncluded: [
      'Tenant screening',
      'Showings or tours',
      'Lease drafting',
      'Property repairs or staging',
    ],
    audience: [
      'DIY landlords who handle showings but want marketing help',
      'Property managers needing scalable listing infrastructure',
      'Developers launching multi unit campaigns',
      'Investors with rotating vacancies across cities',
    ],
    faq: [
      {
        question: 'Do you stage the unit?',
        answer:
          'No staging in this package. Our photographer will style what is already there. If the unit needs furniture or a refresh ask about our rental preparation service.',
      },
      {
        question: 'How fast does the listing go live?',
        answer:
          'Photos within 48 hours of the shoot. Listing copy same day. Full platform distribution within 24 hours of copy approval.',
      },
      {
        question: 'Can you do marketing only without screening?',
        answer:
          'Yes. Marketing only is a standalone service. We will hand qualified inquiries off to you and step out.',
      },
    ],
    closing:
      'Need a vacancy marketed? Get a quote for photography and distribution.',
  },
  {
    slug: 'tenant-screening',
    title: 'Tenant Screening',
    navTitle: 'Tenant Screening',
    navDescription: 'Multi step applicant verification',
    metaTitle: 'Tenant Screening Services US and Canada | MoveSmart Rentals',
    metaDescription:
      'Multi step tenant screening covering credit, income, references, employment, and ID. Detailed reports delivered within 48 hours.',
    heroKicker: 'Service · Tenant Screening',
    heroEyebrow: 'Approve with confidence',
    heroHeadline: 'Screening that actually catches problems',
    heroLede:
      'Multi step verification covering credit, income, prior landlord references, employment, and identity. Real conversations with previous landlords, not just data pulls.',
    intro:
      'Most screening services hand you a credit report and call it done. We talk to previous landlords, verify employment with HR or pay stubs, and cross check identity. Every report includes a clear recommendation and the data behind it. You make the final call with the full picture.',
    process: [
      {
        step: 1,
        title: 'Application capture',
        body: 'Applicant fills out our standard package digitally. We collect ID, income docs, prior addresses, references, and consent for credit and background pulls.',
      },
      {
        step: 2,
        title: 'Credit and background',
        body: 'Full credit report with score and tradelines. Criminal background where legally permitted. Eviction history where data exists.',
      },
      {
        step: 3,
        title: 'Income verification',
        body: 'Pay stubs reviewed for authenticity. Employer called directly for confirmation. Self employed applicants provide bank statements and tax returns.',
      },
      {
        step: 4,
        title: 'Reference calls',
        body: 'We actually call two prior landlords. Real conversations. Did they pay on time, leave the unit clean, give proper notice. Notes attached to the report.',
      },
      {
        step: 5,
        title: 'Recommendation',
        body: 'Approve, conditional, or decline with reasoning. You see every data point and make the final decision.',
      },
    ],
    included: [
      'Credit check with score and tradelines',
      'Criminal background check where permitted',
      'Eviction history search',
      'Income verification via pay stubs and employer call',
      'Two landlord reference calls with notes',
      'ID and address verification',
      'Final recommendation with reasoning',
    ],
    notIncluded: [
      'Lease drafting',
      'Marketing or showings',
      'Move in coordination',
      'Decision making, you have final approval',
    ],
    audience: [
      'Landlords who marketed and showed the unit themselves',
      'Property managers needing on demand screening',
      'Real estate investors evaluating applicants in batches',
      'Anyone who has been burned by a bad tenant before',
    ],
    faq: [
      {
        question: 'How long does screening take?',
        answer:
          'Standard turnaround is 48 hours from when the applicant submits all documents. Rush available for an extra fee.',
      },
      {
        question: 'What if the applicant has a thin credit file?',
        answer:
          'We flag it and recommend compensating factors. Higher deposit, guarantor, longer term lease, or first and last month upfront. The report explains options.',
      },
      {
        question: 'Is the screening fee paid by the tenant or owner?',
        answer:
          'Either way. We can bill the applicant directly through our portal or invoice you. Owner choice.',
      },
    ],
    closing:
      'Need a tenant screened? Send them our application link and you will have a full report in 48 hours.',
  },
  {
    slug: 'property-showings',
    title: 'Property Showings',
    navTitle: 'Property Showings',
    navDescription: 'In person and virtual tours coordinated',
    metaTitle: 'Rental Property Showing Services | MoveSmart Rentals',
    metaDescription:
      'Coordinated in person and virtual showings for landlords across the US and Canada. We handle scheduling, tours, and applicant followup.',
    heroKicker: 'Service · Property Showings',
    heroEyebrow: 'Never coordinate another tour',
    heroHeadline: 'Showings handled, leads followed up',
    heroLede:
      'Our local agents handle every showing. In person, virtual, individual, or group. You stop playing scheduler and start collecting applications.',
    intro:
      'Coordinating showings is the most time consuming part of leasing. Calls at all hours, no shows, scheduling conflicts, repeat tours for the same unit. We take it off your plate. Our agents handle scheduling, tour the property, answer questions, and follow up with serious prospects to push them toward application.',
    process: [
      {
        step: 1,
        title: 'Tour calendar setup',
        body: 'We open a public booking link tied to your unit. Prospects pick their own slot. We confirm 12 hours before.',
      },
      {
        step: 2,
        title: 'In person tours',
        body: 'Local agent meets prospects onsite. Walks the unit, answers questions, captures inquiries. Average tour 20 minutes.',
      },
      {
        step: 3,
        title: 'Virtual tours',
        body: 'For out of town applicants we offer live video tours via Zoom or WhatsApp. Same agent, same walkthrough, no travel required.',
      },
      {
        step: 4,
        title: 'Followup',
        body: 'Within 24 hours every prospect gets a followup with the application link. Repeat touches until they apply or pass.',
      },
      {
        step: 5,
        title: 'Reporting',
        body: 'You see who toured, who applied, and what feedback was. Weekly summary email and live tracker in your owner portal.',
      },
    ],
    included: [
      'Booking calendar and public link',
      'Confirmation and reminder texts',
      'In person tours by local agent',
      'Virtual tours by video',
      'Tour notes and prospect feedback',
      'Followup until applicant decides',
      'Weekly showing report',
    ],
    notIncluded: [
      'Marketing or listing',
      'Tenant screening',
      'Lease drafting',
    ],
    audience: [
      'Owners who live far from the property',
      'Landlords with day jobs who cannot tour during business hours',
      'Investors with multiple vacant units across cities',
      'Developers managing high volume showings during lease up',
    ],
    faq: [
      {
        question: 'What if my unit is occupied during the tour?',
        answer:
          'We coordinate with the current tenant for showings during their notice period. Standard 24 hour notice. We work around their schedule and protect their privacy.',
      },
      {
        question: 'Do you charge per tour?',
        answer:
          'No. Showings are bundled into our placement service. If you only want showings as a standalone we offer a weekly retainer.',
      },
      {
        question: 'Can you do open houses?',
        answer:
          'Yes. Group open houses on weekends can drive faster placement in hot markets. We will recommend if it fits your unit.',
      },
    ],
    closing:
      'Tired of scheduling tours? Hand them to us and focus on the offer that matters.',
  },
  {
    slug: 'move-in-coordination',
    title: 'Move In Coordination',
    navTitle: 'Move In Coordination',
    navDescription: 'Smooth handoff from signing to keys',
    metaTitle: 'Tenant Move In Coordination Services | MoveSmart Rentals',
    metaDescription:
      'We coordinate the move in from lease signing to key handoff. Inspections, utility setup guidance, deposit handling, and tenant orientation.',
    heroKicker: 'Service · Move In Coordination',
    heroEyebrow: 'Clean handoff every time',
    heroHeadline: 'Move ins that go right',
    heroLede:
      'From signed lease to keys in hand. Inspection, deposit collection, utility setup guidance, and a smooth orientation so your tenant starts strong.',
    intro:
      'A botched move in starts the tenancy on the wrong foot. Missing inspection, forgotten utilities, lost keys, unclear expectations. We handle the entire handoff with a written checklist so nothing slips. Your tenant gets a smooth start. You get documented proof of unit condition for the end of lease.',
    process: [
      {
        step: 1,
        title: 'Pre move in walkthrough',
        body: 'Final unit check before tenant arrives. Photos and notes on every room. Baseline for any future deposit dispute.',
      },
      {
        step: 2,
        title: 'Tenant orientation',
        body: 'Either in person or by video. We walk them through the unit, building rules, parking, garbage day, and any quirks like a stiff window or a finicky thermostat.',
      },
      {
        step: 3,
        title: 'Utility setup guidance',
        body: 'List of local utility providers, account setup links, and any building specific info. We do not set them up but we make it dead easy for the tenant.',
      },
      {
        step: 4,
        title: 'Move in inspection',
        body: 'Joint inspection with tenant. Signed inspection report attached to the lease file. Both parties have a record.',
      },
      {
        step: 5,
        title: 'Key handoff',
        body: 'Keys, fobs, garage remotes, and any access cards handed over with a signed receipt.',
      },
    ],
    included: [
      'Pre move in walkthrough with photos',
      'Tenant orientation',
      'Utility provider guide',
      'Joint move in inspection',
      'Key and access fob handoff',
      'Signed handoff receipt',
      'Full move in package to owner',
    ],
    notIncluded: [
      'Ongoing tenant communication',
      'Maintenance during tenancy',
      'Move out coordination',
    ],
    audience: [
      'Owners in different cities or countries',
      'Landlords with full time jobs',
      'New investors who have never done a handoff',
      'Property managers offloading move ins',
    ],
    faq: [
      {
        question: 'What happens if the tenant disputes the inspection later?',
        answer:
          'They cannot. The inspection is signed by both parties on move in day with photos and notes. It becomes part of the lease file. Disputes get resolved fast.',
      },
      {
        question: 'Do you do move outs too?',
        answer:
          'Move out coordination is a separate service. Ask us if you want a bundled move in plus move out package.',
      },
      {
        question: 'How long does the coordination take?',
        answer:
          'About 90 minutes onsite plus prep work. Tenant gets a smooth experience and you get full documentation.',
      },
    ],
    closing:
      'Move in coming up? Let us run it so you do not have to drive over with a clipboard.',
  },
  {
    slug: 'institutional-lease-up',
    title: 'Institutional Lease Up',
    navTitle: 'Institutional Lease Up',
    navDescription: 'High volume lease up for new builds',
    metaTitle: 'Institutional Lease Up Services for Developers | MoveSmart Rentals',
    metaDescription:
      'Dedicated lease up teams for new builds and conversions. From pre leasing through full occupancy. 50 to 500 units handled.',
    heroKicker: 'Service · Institutional Lease Up',
    heroEyebrow: 'Pre lease to full occupancy',
    heroHeadline: 'Lease ups that hit occupancy targets',
    heroLede:
      'Dedicated leasing team for new builds. Pre leasing strategy, onsite or virtual leasing center, full occupancy in your stabilization window.',
    intro:
      'New builds and major conversions need a different approach than single unit placement. Volume, timing, branded marketing, and reporting to capital partners all matter. We deploy a dedicated lease up team that operates as an extension of your development. Twenty four month timelines, weekly investor reports, and accountability to your stabilization model.',
    process: [
      {
        step: 1,
        title: 'Pre leasing strategy',
        body: 'Six to nine months before delivery we map the rent roll, set pricing tiers, design concessions, and build the marketing plan. You get a written lease up roadmap.',
      },
      {
        step: 2,
        title: 'Leasing center setup',
        body: 'Onsite or remote leasing office staffed by a dedicated team. Tour scheduling, model unit prep, signage, and digital infrastructure.',
      },
      {
        step: 3,
        title: 'Marketing campaign',
        body: 'Branded campaign across rental platforms, paid social, programmatic display, and search. Weekly creative refresh.',
      },
      {
        step: 4,
        title: 'High volume placement',
        body: 'Same screening rigor as single unit but scaled. Application pipeline managed in software. Daily approvals to keep the funnel moving.',
      },
      {
        step: 5,
        title: 'Stabilization handoff',
        body: 'When you hit your target occupancy we hand the operation to your management partner with full documentation. Or we extend into ongoing leasing.',
      },
    ],
    included: [
      'Pre leasing strategy and rent roll',
      'Dedicated leasing center',
      'Branded marketing campaign',
      'High volume applicant pipeline',
      'Weekly investor reports',
      'Stabilization model accountability',
      'Handoff documentation',
    ],
    notIncluded: [
      'Construction or development services',
      'Ongoing property management after stabilization',
      'Asset management',
      'Capital raise or financing',
    ],
    audience: [
      'Developers launching purpose built rentals',
      'Operators converting condos to rental',
      'Institutional capital deploying new builds',
      'REITs adding units to existing portfolios',
    ],
    faq: [
      {
        question: 'What size projects do you handle?',
        answer:
          'Twenty units and up. Below that single unit placement is more efficient. We have run lease ups from 24 to 540 units.',
      },
      {
        question: 'Do you work with capital partners?',
        answer:
          'Yes. Investor reporting is built into the engagement. We will format reports to match your LP requirements.',
      },
      {
        question: 'How is pricing structured?',
        answer:
          'Combination of monthly retainer plus per unit success fee. Specific structure depends on size and timeline. Quoted per project.',
      },
    ],
    closing:
      'Have a lease up coming? Let us scope the engagement and propose a timeline.',
  },
]

export const SILO_SERVICE_SLUGS = SILO_SERVICES.map((s) => s.slug)

export function getSiloService(slug: string): SiloService | undefined {
  return SILO_SERVICES.find((s) => s.slug === slug)
}
