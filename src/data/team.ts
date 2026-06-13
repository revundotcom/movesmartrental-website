/**
 * ═══════════════════════════════════════════════════════════════════
 *  MoveSmart Rentals — Team Directory
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for the team that appears on:
 *    •  /about/                — full team grid (all members)
 *    •  /about/team/<slug>/    — individual profile (Fasken-style)
 *
 *  ─────────────────────────────────────────────────────────────────────
 *  How the client edits the team (no developer help needed)
 *  ─────────────────────────────────────────────────────────────────────
 *
 *  1. ADD A NEW MEMBER
 *     Copy any existing entry below (everything from `{` to `},`) and
 *     paste it at the end of the TEAM array. Update the values inside
 *     the quotes. IMPORTANT: every member needs a unique `slug`
 *     (lowercase + dashes only, no spaces). That becomes their URL.
 *
 *  2. REMOVE A MEMBER (someone left)
 *     Delete their entire `{ ... },` block. Their card disappears from
 *     /about/ and their profile URL returns 404 on the next deploy.
 *
 *  3. EDIT A MEMBER
 *     Change the values inside the quotes. Don't change the field names
 *     on the left of the colon: those are wired into the page.
 *
 *  4. PHOTO
 *     Set `photoUrl` to an absolute URL. When null, the card uses a
 *     clean monogram avatar built from the member's initials.
 *
 *  After editing, save, then commit and push. Vercel redeploys in ~2 min.
 *
 *  ─────────────────────────────────────────────────────────────────────
 *  Field reference
 *  ─────────────────────────────────────────────────────────────────────
 *    slug             unique URL identifier (lowercase + dashes)
 *    name             full display name
 *    role             job title (shown on card + profile header)
 *    department       used to label the role (free-form string)
 *    office           city the member is based in
 *    email            mailto: link
 *    phone            display-formatted (e.g. "+1 416 555 0123")
 *    photoUrl         absolute image URL, or null for initials fallback
 *    photoAlt         accessibility / SEO alt text
 *    quote            one-sentence personal philosophy. Shown in red
 *                     quotation marks in the profile hero.
 *    shortBio         3-line intro shown on the directory card
 *    longBio          paragraph(s) on the profile page. Use \n\n for
 *                     new paragraphs.
 *    specialties      "Related Services" accordion entries
 *    achievements     "Achievements" accordion entries
 *    marketsCovered   "Experience" accordion entries
 *    careerHistory    "Career & Education" accordion (career list)
 *    education        "Career & Education" accordion (degrees list)
 *    knowledge        "Knowledge" accordion entries (topics / focus
 *                     areas, optional)
 *    publications     "Publications" accordion entries (optional)
 *    events           "Events" accordion entries (optional)
 *    languages        comma-joined in the profile data table
 *    yearsExperience  number used in the "Career" stats
 *    joinedYear       year they joined MoveSmart
 *    licenseNumber    RECO/real-estate licence number, or null
 *    linkedinUrl      profile URL. Null hides the button.
 * ═══════════════════════════════════════════════════════════════════
 */

export interface CareerEntry {
  year: string
  role: string
  organization: string
  /** Optional company logo URL for LinkedIn-style Experience cards. */
  companyLogoUrl?: string | null
  /** Optional bullet points describing what the member did at this
   *  organisation. Renders as a list under the role/company line. */
  bullets?: string[]
}

export interface EducationEntry {
  degree: string
  school: string
  year: string
  /** Optional school crest / logo URL for LinkedIn-style Education cards. */
  schoolLogoUrl?: string | null
}

export interface CertificationEntry {
  name: string
  issuer: string
  year: string
  /** Optional issuer logo URL. */
  issuerLogoUrl?: string | null
}

export interface PublicationEntry {
  title: string
  publisher: string
  year: string
}

export interface EventEntry {
  title: string
  event: string
  year: string
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  department: string
  office: string
  /** Province (Canada) or state (US) — used in the Jurisdiction row. */
  province: string
  /** Country name — used in the Jurisdiction row. */
  country: string
  email: string
  phone: string
  photoUrl: string | null
  photoAlt: string
  quote: string
  shortBio: string
  longBio: string
  specialties: string[]
  achievements: string[]
  marketsCovered: string[]
  careerHistory: CareerEntry[]
  education: EducationEntry[]
  /** Licenses & certifications — separate from `licenseNumber` (which is
   *  the single RECO-style number shown in the data table). */
  certifications: CertificationEntry[]
  knowledge: string[]
  publications: PublicationEntry[]
  events: EventEntry[]
  languages: string[]
  yearsExperience: number
  joinedYear: number
  licenseNumber: string | null
  linkedinUrl: string | null
}

export const TEAM: TeamMember[] = [
  // ─────────────────────────────────────────────────────────────────
  //  Note: the Founder/President & CEO entry is intentionally omitted
  //  from the public staff listing per client direction (June 2026).
  //  Restore by re-adding the member block here when the name is
  //  cleared to publish.
  // ─────────────────────────────────────────────────────────────────
  {
    slug: 'kevin-liu',
    name: 'Kevin Liu',
    role: 'Director of Operations',
    department: 'Operations',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'kevin@movesmartrentals.com',
    phone: '+1 416 555 0109',
    photoUrl: '/team/kevin-liu.jpg',
    photoAlt: 'Kevin Liu, Director of Operations at MoveSmart Rentals',
    quote:
      'Operational performance is built on execution discipline. Nothing falls through the cracks when handoffs, SOPs, and KPIs are all working together.',
    shortBio:
      'Director of Operations at MoveSmart Rentals. Owns the operational performance of the leasing division across speed, quality, consistency, and client experience.',
    longBio:
      'Kevin leads operations across MoveSmart Rentals, with accountability for the operational performance of the leasing division: speed, quality, consistency, and client experience.\n\nHis remit covers execution discipline across teams and handoffs, SOPs and QA, KPI tracking and performance coaching, continuous improvement of the CRM pipeline and workflows, and the budgeting, forecasting, and capacity planning needed to scale volume without breaking quality.\n\nKevin joined MoveSmart from Embark Student Corp., where he held senior operations roles for over five years, and previously led customer operations at Element Fleet Management, Rogers Communications, and Bell.',
    specialties: [
      'Operational performance management',
      'KPI tracking and performance coaching',
      'SOPs, QA, and training reinforcement',
      'CRM pipeline and workflow automation',
      'Budgeting, forecasting, and capacity planning',
      'Contact-centre and back-office operations',
    ],
    achievements: [
      'Building the operational backbone of MoveSmart Rentals’ leasing division',
      'At Embark: delivered the best sales months in 2024 every month since starting in the sales division',
      'At Embark: implemented quality controls that improved processing errors by 50%',
      'At Embark: created customer journey programmes that helped 500 additional grant customers per month',
      'At Bell: improved deact rates by 6% YoY and productivity metrics by 10% leading retention operations',
    ],
    marketsCovered: ['Toronto', 'Greater Toronto Area', 'Ontario'],
    careerHistory: [
      {
        year: '2026 to Present',
        role: 'Director of Operations',
        organization: 'MoveSmart Rentals',
        bullets: [
          'Overall operational performance of the leasing division (speed, quality, consistency, client experience)',
          'Execution discipline across teams and handoffs (nothing falls through the cracks)',
          'SOPs, QA, training reinforcement, and escalation systems that prevent repeat issues',
          'KPI tracking, performance coaching, and accountability at the leadership level',
          'Continuous improvement of our CRM pipeline, workflows, automations, and system reliability in partnership with tech',
          'Budgeting, forecasting, and capacity planning to scale volume without breaking quality',
        ],
      },
      {
        year: '2024 to 2026',
        role: 'Senior Operations Consultant',
        organization: 'Embark Student Corp.',
        bullets: [
          'Reported directly to the Chief Customer Officer',
          'Led tech-stack integration and transformation: unified desktop, Salesforce + Genesys connector, appointment-booking software integration',
          'Sourced and deployed AI enhancements for telephony and CRM (co-pilots, bots, auto-attendants, auto-summarisation, predictive routing)',
          'Built new Power BI dashboards at the department and employee level to track performance against targets',
          'Built 2025 sales capacity plans to forecast staffing needs against the sales budget',
          'Built out the sales and service leaders coaching guild (coaching models, disciplinary management, PIP templates)',
        ],
      },
      {
        year: '2022 to 2024',
        role: 'Director of Operations',
        organization: 'Element Fleet Management',
        bullets: [
          'Led a geographically dispersed team of customer-service professionals across a multi-channel contact-centre environment',
          'Drove improvements to service delivery using Verint, data-driven methods, and Lean Six Sigma',
          'Owned the annual budget, expenditure scheduling, variance analysis, and corrective actions',
          'Led 100+ FTE managers and supervisors in a fast-paced, metric-driven remote workforce',
        ],
      },
      {
        year: '2021 to 2022',
        role: 'Director of Operations',
        organization: 'Embark Student Corp.',
        bullets: [
          'Promoted to Director of Operations, adding back-office processing, knowledge base & learning, document management, grants, and a brand-new customer success team to accountabilities',
          'Implemented new workflows that improved transfer-in onboarding turnaround by 15 days',
          'Implemented quality controls that improved processing errors by 50%',
          'Sourced a vendor and rolled out a new knowledgebase system for the company',
          'Created campaign initiatives across the customer journey, including NPS indicators by stage',
        ],
      },
      {
        year: '2017 to 2022',
        role: 'Director, Customer Experience',
        organization: 'Embark Student Corp.',
        bullets: [
          'Introduced client experience measures: service-level expectations, quality programme, abandon rates, speed of answer, and email turnaround times',
          'Introduced WFM concepts for forecasting and staffing; delivered company-best SVLs in 2019',
          'Brought in two new telephony systems, enabling live chat, screen sharing, and co-browsing',
          'Closed a 25-year outsourcing relationship and insourced all contact centres for $600K annual savings and a CSAT lift',
          'Introduced NPS to the company: 29% in year one (#2 in RESP industry, 2018) and 53% by 2020',
          'Created a retention team and delivered $3.1M in first-year retained savings',
        ],
      },
      {
        year: '2014 to 2017',
        role: 'Manager of Operations – The Shopping Channel',
        organization: 'Rogers Communications',
        bullets: [
          'Managed 6 team supervisors and 160 employees across 8 departments',
          'Redesigned the upsell program, driving YoY revenue from $1.6M (2013) to a $5.1M run-rate (2015)',
          'Moved 90% of order queues to vendor, reducing OPEX by an average of $2 per call',
          'Created scorecards across the business aligned to OPEX targets',
        ],
      },
      {
        year: '2009 to 2013',
        role: 'Associate Director – Retention Operations',
        organization: 'Bell',
        bullets: [
          'Led Ontario call-centre teams of 10 team leaders and 200+ non-management employees for Bell Mobility’s Consumer, Small Business, and Corporate Care segments',
          'Delivered 6% YoY improvement in deact rates and 10% productivity lift',
          'Improved Virgin Mobile reactive churn by 33% in the first 3 weeks of operations',
          'Accountable for yearly labour and expense budget of over $14M',
        ],
      },
      {
        year: '1999 to 2009',
        role: 'Associate Director – Consumer Direct Sales',
        organization: 'Bell',
        bullets: [
          'Managed 4 team managers and 200 agents in Consumer direct sales',
          'Partnered with marketing on pre-sales strategy that delivered a 35% increase in sales',
          'Led the "hot leads" project to recover dropped calls in the transfer process',
          'Built and executed the annual direct-channel budget',
        ],
      },
    ],
    education: [
      {
        degree: 'BBA, Marketing and Finance',
        school: 'York University',
        year: '',
      },
    ],
    certifications: [
      {
        name: 'Lean Six Sigma White Belt',
        issuer: 'Element Fleet Management',
        year: 'Jul 2022',
      },
    ],
    knowledge: [],
    publications: [],
    events: [],
    languages: ['English'],
    yearsExperience: 25,
    joinedYear: 2026,
    licenseNumber: null,
    linkedinUrl: null,
  },
  {
    slug: 'anika-rao',
    name: 'Anika Rao',
    role: 'Head of Leasing Operations',
    department: 'Operations',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'anika@movesmartrentals.com',
    phone: '+1 416 555 0102',
    photoUrl: null,
    photoAlt: 'Anika Rao, Head of Leasing Operations at MoveSmart Rentals',
    quote:
      'Owner-files run on rhythm. When the intake is sharp, the placement is already half done.',
    shortBio:
      'Runs the day-to-day leasing playbook across every active file. Writes the playbook itself when an edge case demands it.',
    longBio:
      'Anika joined MoveSmart from a national property-management platform where she ran the Ontario leasing desk for 800+ units. She runs the floor at MoveSmart. Every active owner-file passes through her queue before it gets assigned to a leasing lead.\n\nIf you have an unusual situation, like a multi-unit refresh, a corporate relocation, or a unit that needs a rent reset, Anika is who designs the approach.',
    specialties: [
      'Multi-unit lease-up coordination',
      'Owner-file intake & scoping',
      'Cross-team workflow design',
      'Showing logistics at scale',
    ],
    achievements: [
      'Designed the firm’s owner-file intake workflow used on every engagement',
      'Coordinated 14 simultaneous multi-unit lease-ups in 2025 without missing a target',
      'Built the internal SLA framework that backs MoveSmart’s response-time guarantee',
    ],
    marketsCovered: ['Toronto', 'Hamilton', 'Burlington', 'Oakville'],
    careerHistory: [
      { year: '2024 to Present', role: 'Head of Leasing Operations', organization: 'MoveSmart Rentals' },
      { year: '2020 to 2024', role: 'Ontario Leasing Desk Manager', organization: 'National PM platform' },
      { year: '2017 to 2020', role: 'Leasing Coordinator', organization: 'Toronto-based PMC' },
    ],
    education: [
      { degree: 'Real Estate Salesperson Programme', school: 'Humber College', year: '2017' },
      { degree: 'B.A., Urban Studies', school: 'University of Toronto', year: '2016' },
    ],
    knowledge: [
      'Owner-file intake design',
      'Multi-unit lease-up coordination',
      'Operational SLAs for leasing teams',
    ],
    publications: [
      { title: 'Designing intake for multi-unit lease-ups', publisher: 'PMC Canada Journal', year: '2025' },
    ],
    events: [
      { title: 'Speaker, Operationalising the Owner-File', event: 'PMC Canada Annual Conference', year: '2025' },
    ],
    certifications: [],
    languages: ['English', 'Hindi'],
    yearsExperience: 9,
    joinedYear: 2024,
    licenseNumber: 'RECO 4831-XXXY',
    linkedinUrl: null,
  },
  {
    slug: 'daniel-mercer',
    name: 'Daniel Mercer',
    role: 'Institutional Lease-Up Lead',
    department: 'Leasing',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'daniel@movesmartrentals.com',
    phone: '+1 416 555 0103',
    photoUrl: null,
    photoAlt: 'Daniel Mercer, Institutional Lease-Up Lead at MoveSmart Rentals',
    quote:
      'On an institutional file, the spreadsheet and the comp set decide whether spring leases close. The marketing budget rarely does.',
    shortBio:
      'Twelve-year veteran of GTA leasing. Heads every institutional lease-up: purpose-built rentals, new-build absorption, and PMC portfolio transitions.',
    longBio:
      'Daniel has placed tenants in more than 1,400 units across the GTA over his career. At MoveSmart he runs the institutional desk: lease-ups for new builds, portfolio refreshes for PMCs, and any engagement where five or more units need to absorb in under 90 days.\n\nHe is the calm in the room when an institutional client asks "can we get to 90% leased by spring?" and the one who has the spreadsheets, the comp set, and the pricing strategy to actually deliver it.',
    specialties: [
      'New-build absorption (50+ units)',
      'PMC portfolio transitions',
      'Pricing strategy for institutional clients',
      'Marketing budget allocation',
    ],
    achievements: [
      'Placed 1,400+ tenants across the GTA over a 12-year career',
      'Led the 2025 lease-up of a 180-unit purpose-built rental to 92% in 84 days',
      'Co-authored MoveSmart’s institutional absorption playbook',
    ],
    marketsCovered: ['Toronto', 'North York', 'Etobicoke', 'Markham'],
    careerHistory: [
      { year: '2024 to Present', role: 'Institutional Lease-Up Lead', organization: 'MoveSmart Rentals' },
      { year: '2018 to 2024', role: 'Senior Leasing Director', organization: 'Major GTA brokerage' },
      { year: '2012 to 2018', role: 'Leasing Agent', organization: 'Boutique downtown brokerage' },
    ],
    education: [
      { degree: 'Real Estate Salesperson Programme', school: 'Humber College', year: '2012' },
      { degree: 'B.Comm', school: 'McGill University', year: '2010' },
    ],
    knowledge: [
      'Institutional absorption strategy',
      'New-build pricing economics',
      'GTA rental market dynamics',
    ],
    publications: [
      { title: 'Why absorption curves beat marketing budgets', publisher: 'Multi-Family Housing News', year: '2025' },
    ],
    events: [
      { title: 'Panellist, GTA Multi-Family Summit', event: 'GTA Multi-Family Summit', year: '2025' },
      { title: 'Speaker, Lease-Ups in a Cooling Market', event: 'Toronto Real Estate Forum', year: '2024' },
    ],
    certifications: [],
    languages: ['English', 'French'],
    yearsExperience: 12,
    joinedYear: 2024,
    licenseNumber: 'RECO 4831-XXXZ',
    linkedinUrl: null,
  },
  {
    slug: 'simran-patel',
    name: 'Simran Patel',
    role: 'Tenant Qualification Analyst',
    department: 'Underwriting',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'simran@movesmartrentals.com',
    phone: '+1 416 555 0104',
    photoUrl: null,
    photoAlt: 'Simran Patel, Tenant Qualification Analyst at MoveSmart Rentals',
    quote:
      'Owners deserve a shortlist with a written rationale, not a stack of applications.',
    shortBio:
      'Screens like a bank, briefs like a partner. Every applicant pipeline lands on her desk before an owner sees a name.',
    longBio:
      "Simran built MoveSmart's qualification rubric, a bank-grade screening protocol that combines credit, income verification, prior-landlord references, and pattern detection on rental history.\n\nShe is the reason our owners see a tight shortlist with a written rationale on every candidate instead of a stack of applications. She personally owns the qualification call for every institutional engagement.",
    specialties: [
      'Credit & income verification',
      'Reference check protocols',
      'Risk-flag pattern detection',
      'Co-signor & guarantor structuring',
    ],
    achievements: [
      'Authored the firm’s tenant-qualification rubric, now standard on every file',
      'Maintained a 94% approval-accuracy rate across 500+ qualified placements',
      'Designed the prior-landlord-reference protocol that catches 1 in 8 risk flags',
    ],
    marketsCovered: ['Toronto', 'Brampton', 'Mississauga'],
    careerHistory: [
      { year: '2024 to Present', role: 'Tenant Qualification Analyst', organization: 'MoveSmart Rentals' },
      { year: '2021 to 2024', role: 'Credit Analyst', organization: 'Canadian Schedule-I bank' },
      { year: '2019 to 2021', role: 'Underwriting Associate', organization: 'Specialty lender (Toronto)' },
    ],
    education: [
      { degree: 'B.Comm, Finance', school: 'York University (Schulich)', year: '2019' },
    ],
    knowledge: [
      'Bank-grade tenant qualification',
      'Risk-flag detection in rental histories',
      'Co-signor and guarantor structuring',
    ],
    publications: [
      { title: 'A bank-grade rubric for rental underwriting', publisher: 'Canadian Apartment Magazine', year: '2025' },
    ],
    events: [
      { title: 'Webinar host, How We Screen Applicants', event: 'MoveSmart Owner Webinar Series', year: '2025' },
    ],
    certifications: [],
    languages: ['English', 'Hindi', 'Gujarati'],
    yearsExperience: 7,
    joinedYear: 2024,
    licenseNumber: null,
    linkedinUrl: null,
  },
  {
    slug: 'kwame-owusu',
    name: 'Kwame Owusu',
    role: 'Showings Manager',
    department: 'Leasing',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'kwame@movesmartrentals.com',
    phone: '+1 416 555 0105',
    photoUrl: null,
    photoAlt: 'Kwame Owusu, Showings Manager at MoveSmart Rentals',
    quote:
      'A confirmed tour, prepped on both sides, is the difference between a viewing and an application.',
    shortBio:
      'Keeps every tour on time and on script. Coordinates 40+ in-person and virtual showings every week without dropping a single confirmation.',
    longBio:
      'Kwame ran private-school tours for one of the largest independent schools in Ontario before joining MoveSmart. He brought the same playbook with him: confirmation calls 24 hours out, prep notes per applicant, and on-arrival check-ins.\n\nHe is the difference between a "we showed it three times" report and a "we got 11 qualified applicants through the door this week and here is what they thought" report.',
    specialties: [
      'Showing scheduling at scale',
      'Virtual tour coordination',
      'Applicant prep & briefing',
      'Open-house operations',
    ],
    achievements: [
      'Coordinated 1,800+ showings in 2025 with a 96% confirmation-to-attended rate',
      'Built the firm’s virtual-tour playbook for out-of-province applicants',
    ],
    marketsCovered: ['Toronto', 'Vaughan', 'Richmond Hill'],
    careerHistory: [
      { year: '2024 to Present', role: 'Showings Manager', organization: 'MoveSmart Rentals' },
      { year: '2021 to 2024', role: 'Admissions Tours Coordinator', organization: 'Ontario independent school' },
    ],
    education: [
      { degree: 'B.A., Communications', school: 'Western University', year: '2021' },
    ],
    knowledge: [
      'Showing logistics at scale',
      'Virtual tour playbooks',
      'Applicant prep and briefing',
    ],
    publications: [],
    events: [],
    certifications: [],
    languages: ['English', 'Twi'],
    yearsExperience: 5,
    joinedYear: 2024,
    licenseNumber: null,
    linkedinUrl: null,
  },
  {
    slug: 'emily-larsson',
    name: 'Emily Larsson',
    role: 'Owner Success Manager',
    department: 'Owner Success',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'emily@movesmartrentals.com',
    phone: '+1 416 555 0106',
    photoUrl: null,
    photoAlt: 'Emily Larsson, Owner Success Manager at MoveSmart Rentals',
    quote:
      'A small book and a real relationship. That is the only owner-success model that scales without breaking trust.',
    shortBio:
      'Every owner has her cell number. Owns the relationship from signed engagement through tenant move-in and into year-two renewals.',
    longBio:
      'Emily came from a relationship-management role at a national insurer where she carried 300+ active accounts. At MoveSmart she does the opposite by design. She keeps her book deliberately small so every owner gets a real relationship.\n\nShe is who you text when you are wondering "should I do the kitchen refresh now or wait for the next vacancy?" and she gives you a straight answer.',
    specialties: [
      'Owner onboarding & expectations',
      'Renewal coaching',
      'Rent-reset strategy conversations',
      'Cross-property portfolio reviews',
    ],
    achievements: [
      'Maintained a 100% owner-renewal rate across the 2025 book',
      'Built the firm’s owner-onboarding kit, now used on every new engagement',
    ],
    marketsCovered: ['Toronto', 'Greater Toronto Area'],
    careerHistory: [
      { year: '2024 to Present', role: 'Owner Success Manager', organization: 'MoveSmart Rentals' },
      { year: '2018 to 2024', role: 'Senior Account Manager', organization: 'National insurer' },
    ],
    education: [
      { degree: 'B.A., Business Communications', school: 'Wilfrid Laurier University', year: '2018' },
    ],
    knowledge: [
      'Owner onboarding methodology',
      'Renewal coaching for individual landlords',
      'Year-two retention frameworks',
    ],
    publications: [],
    events: [
      { title: 'Host, Owner Office Hours (monthly webinar)', event: 'MoveSmart Owner Webinar Series', year: '2025' },
    ],
    certifications: [],
    languages: ['English', 'Swedish'],
    yearsExperience: 8,
    joinedYear: 2024,
    licenseNumber: null,
    linkedinUrl: null,
  },
  {
    slug: 'ravi-thakur',
    name: 'Ravi Thakur',
    role: 'Pricing & Market Analyst',
    department: 'Strategy',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'ravi@movesmartrentals.com',
    phone: '+1 416 555 0107',
    photoUrl: null,
    photoAlt: 'Ravi Thakur, Pricing & Market Analyst at MoveSmart Rentals',
    quote:
      'A right ask is a researched ask. The comparables are doing the work. I am just running the model.',
    shortBio:
      'Where guesswork ends and comparables start. Owns the pricing strategy on every owner-file, backed by live MLS data, not gut feel.',
    longBio:
      'Ravi spent four years in real-estate analytics at a Toronto investment fund before joining MoveSmart. He built our pricing model, a live comp-set engine that pulls MLS data, listing-velocity, and absorption curves for every unit we list.\n\nWhen an owner asks "is $2,800 the right ask or should we push to $2,950?" Ravi has the model run with the comps attached in under two hours.',
    specialties: [
      'Comparative market analysis',
      'Pricing model design',
      'Absorption-curve forecasting',
      'Rent-reset analytics',
    ],
    achievements: [
      'Built the firm’s live pricing model, attached to 100% of owner-files',
      'Forecast accuracy within ±3% on lease-up timelines across 2025 institutional files',
    ],
    marketsCovered: ['Toronto', 'GTA', 'Ottawa'],
    careerHistory: [
      { year: '2024 to Present', role: 'Pricing & Market Analyst', organization: 'MoveSmart Rentals' },
      { year: '2020 to 2024', role: 'Real Estate Analyst', organization: 'Toronto investment fund' },
    ],
    education: [
      { degree: 'M.A., Applied Economics', school: 'University of Toronto', year: '2020' },
      { degree: 'B.Math, Statistics', school: 'University of Waterloo', year: '2018' },
    ],
    knowledge: [
      'Rental pricing analytics',
      'Absorption-curve forecasting',
      'GTA comparable-set design',
    ],
    publications: [
      { title: 'Quarterly GTA Rental Pricing Brief', publisher: 'MoveSmart Research', year: '2025' },
    ],
    events: [
      { title: 'Speaker, Real Estate Analytics Summit', event: 'Real Estate Analytics Summit', year: '2025' },
    ],
    certifications: [],
    languages: ['English', 'Hindi'],
    yearsExperience: 6,
    joinedYear: 2024,
    licenseNumber: null,
    linkedinUrl: null,
  },
  {
    slug: 'mei-bennett',
    name: 'Mei Bennett',
    role: 'Move-In Coordinator',
    department: 'Operations',
    office: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    email: 'mei@movesmartrentals.com',
    phone: '+1 416 555 0108',
    photoUrl: null,
    photoAlt: 'Mei Bennett, Move-In Coordinator at MoveSmart Rentals',
    quote:
      'The first day in the unit is what tenants remember. We treat it that way, and run the checklist on every file.',
    shortBio:
      'Keys, utilities, insurance, walkthrough. All handled. Owns the last mile of every placement so the first day in the unit goes flawlessly.',
    longBio:
      'Mei ran corporate-relocations logistics for a Big Five accounting firm before joining MoveSmart. She brought a project-management discipline to a phase the industry usually treats as an afterthought.\n\nEvery one of our placements ends with a written move-in confirmation: keys handed over, utilities active, tenant-insurance certificate on file, walkthrough video archived. Mei built that checklist and runs it on every file.',
    specialties: [
      'Move-in checklist execution',
      'Utility transfer coordination',
      'Tenant-insurance verification',
      'Walkthrough documentation',
    ],
    achievements: [
      'Executed 500+ flawless move-ins across 2024 and 2025 with a zero key-handover incident rate',
      'Built MoveSmart’s move-in confirmation template, now a standard owner deliverable',
    ],
    marketsCovered: ['Toronto', 'Greater Toronto Area'],
    careerHistory: [
      { year: '2024 to Present', role: 'Move-In Coordinator', organization: 'MoveSmart Rentals' },
      { year: '2019 to 2024', role: 'Relocations Logistics Lead', organization: 'Big Five accounting firm' },
    ],
    education: [
      { degree: 'Diploma, Project Management', school: 'George Brown College', year: '2019' },
    ],
    knowledge: [
      'Move-in operations',
      'Utility transfer playbooks',
      'Tenant-insurance verification',
    ],
    publications: [],
    events: [],
    certifications: [],
    languages: ['English', 'Mandarin'],
    yearsExperience: 6,
    joinedYear: 2024,
    licenseNumber: null,
    linkedinUrl: null,
  },
]

// ─────────────────────────────────────────────────────────────────────
// Helpers used by the page templates. Do not change unless you are
// also updating the templates in src/app/(site)/about/.
// ─────────────────────────────────────────────────────────────────────

/** Find a team member by their slug. Returns undefined if not found. */
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug)
}

/** All slugs used by generateStaticParams on the dynamic route. */
export function getAllTeamSlugs(): string[] {
  return TEAM.map((m) => m.slug)
}

/** Initials for the monogram-avatar fallback. */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Deterministic accent picker. Same member always gets the same accent. */
export function getMemberAccent(slug: string): 'gold' | 'emerald' | 'navy' {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  const buckets: Array<'gold' | 'emerald' | 'navy'> = ['gold', 'emerald', 'navy']
  return buckets[h % buckets.length]
}
