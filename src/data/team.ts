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
        companyLogoUrl: '/team/logos/movesmart-rentals.jpg',
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
        companyLogoUrl: '/team/logos/embark-student-corp.jpg',
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
        companyLogoUrl: '/team/logos/element-fleet-management.jpg',
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
        companyLogoUrl: '/team/logos/embark-student-corp.jpg',
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
        companyLogoUrl: '/team/logos/embark-student-corp.jpg',
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
        companyLogoUrl: '/team/logos/rogers-communications.jpg',
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
        companyLogoUrl: '/team/logos/bell.jpg',
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
        companyLogoUrl: '/team/logos/bell.jpg',
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
        schoolLogoUrl: '/team/logos/york-university.jpg',
      },
    ],
    certifications: [
      {
        name: 'Lean Six Sigma White Belt',
        issuer: 'Element Fleet Management',
        year: 'Jul 2022',
        issuerLogoUrl: '/team/logos/element-fleet-management.jpg',
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
