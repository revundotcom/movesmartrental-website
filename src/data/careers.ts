/**
 * ═══════════════════════════════════════════════════════════════════
 *  MoveSmart Rentals — Careers / Open Roles
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for the open roles that appear on:
 *    •  /careers/                — listing page, grouped by region/city
 *    •  /careers/<slug>/         — individual role detail page
 *
 *  ─────────────────────────────────────────────────────────────────────
 *  How to add / remove / edit a role
 *  ─────────────────────────────────────────────────────────────────────
 *
 *  1. ADD A NEW ROLE
 *     Copy any existing entry below (everything from `{` to `},`) and
 *     paste it at the end of the ROLES array. Update the values inside
 *     the quotes. IMPORTANT: every role needs a unique `slug`
 *     (lowercase + dashes only, no spaces). That becomes the URL.
 *
 *  2. REMOVE A ROLE (closed / filled)
 *     Delete the entire `{ ... },` block. Its card disappears from
 *     /careers/ and its detail URL returns 404 on the next deploy.
 *
 *  3. EDIT A ROLE
 *     Change the values inside the quotes. Don't change the field
 *     names on the left of the colon: those are wired into the page.
 *
 *  4. JOB ID + POSTING DATE
 *     `jobId` should follow the pattern MSR-YYYY-NNN. `postingStartDate`
 *     is a YYYY-MM-DD string.
 *
 *  After editing, save → commit → push. Vercel redeploys in ~2 min.
 * ═══════════════════════════════════════════════════════════════════
 */

export interface Role {
  /** Unique URL identifier (lowercase + dashes, no spaces). */
  slug: string
  /** Display title, e.g. "Senior Leasing Agent". */
  title: string
  /** Free-form department / team label shown under the title in the
   *  hero — e.g. "Leasing; Operations". */
  department: string
  /** Employment type. "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  /** City the role is based in. Use "Remote" for fully remote roles. */
  city: string
  /** Province (Canada) or state (US). For purely remote, repeat
   *  the region label (e.g. "Remote — North America"). */
  province: string
  /** Country — "Canada" | "United States". */
  country: 'Canada' | 'United States'
  /** Display location string used in the hero (overrides the city/
   *  province join when you need extra precision like "Remote · North
   *  America" or "Toronto, ON · Hybrid"). */
  locationDisplay: string
  /** Pattern: MSR-YYYY-NNN. Used as a stable reference. */
  jobId: string
  /** ISO date — YYYY-MM-DD. Shown in the hero. */
  postingStartDate: string
  /** Display string — e.g. "$55,000 to $75,000 base plus leasing incentives". */
  compensation: string
  /** Job description summary — short paragraph in the body, mirrors
   *  Job Description Summary in GE Vernova layout. */
  summary: string
  /** Bullet list — Key Responsibilities section. */
  responsibilities: string[]
  /** Bullet list — Required Skills section. */
  requiredSkills: string[]
  /** Bullet list — Good to have Skills (optional). */
  goodToHaveSkills: string[]
  /** Bullet list — Education and Experience. */
  educationAndExperience: string[]
  /** Free-form short paragraph — Additional Information block
   *  (e.g. relocation, sponsorship, schedule). Optional. */
  additionalInfo: string | null
  /** Whether relocation assistance is provided. Shown explicitly in
   *  the Additional Information block. */
  relocationAssistance: boolean
}

export const ROLES: Role[] = [
  {
    slug: 'senior-leasing-agent-toronto',
    title: 'Senior Leasing Agent',
    department: 'Leasing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'MSR-2026-001',
    postingStartDate: '2026-06-10',
    compensation: '$75,000 plus commission and benefits',
    summary:
      'We are seeking an experienced Senior Leasing Agent to manage the full leasing cycle for a portfolio of residential properties across the Greater Toronto Area. This role requires strong tenant-screening discipline, comfort with multi-unit pipelines, and the ability to close placements end-to-end without dropping handoffs.',
    responsibilities: [
      'Own the full lead-to-lease cycle for a portfolio of GTA properties: inbound leads, showings, applications, screening, and lease execution.',
      'Conduct in-person and virtual showings on a structured schedule, with prep notes per applicant.',
      'Run applicant qualification using MoveSmart’s bank-grade rubric (credit, income, references, prior-landlord checks).',
      'Coordinate with property managers and owners on rent-ready turnover and move-in handover.',
      'Maintain CRM hygiene: every lead, showing, and application tracked with status notes and next steps.',
      'Hit or exceed monthly placement targets and time-to-lease benchmarks set by the leasing desk.',
    ],
    requiredSkills: [
      'Strong sales and communication skills with a track record in residential leasing.',
      'Comfort with digital lead-management tools and CRM workflows.',
      'Active RECO registration in good standing.',
      'Self-managed schedule and strong organisational discipline.',
      'Excellent follow-through on applicants, owners, and internal stakeholders.',
    ],
    goodToHaveSkills: [
      'Experience with institutional / multi-unit lease-up campaigns.',
      'Familiarity with Toronto-area neighbourhoods and rental sub-markets.',
      'Experience using AppFolio, Yardi, or similar PM platforms.',
    ],
    educationAndExperience: [
      'Active RECO registration (Ontario).',
      '3 or more years of residential leasing experience in the GTA.',
      'Demonstrated track record of meeting or exceeding leasing targets.',
    ],
    additionalInfo:
      'This is a Toronto-based role. Hybrid schedule with regular field showings across the GTA. Reliable transportation required.',
    relocationAssistance: false,
  },
  {
    slug: 'director-of-operations-toronto',
    title: 'Director of Operations',
    department: 'Operations; Leadership',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'MSR-2026-002',
    postingStartDate: '2026-06-10',
    compensation: '$145,000 plus performance bonus and benefits',
    summary:
      'We are seeking an experienced Director of Operations to build and lead our leasing function across North America. The role owns process and performance standards for every owner-file, drives landlord acquisition strategy, and partners with leadership on portfolio growth. This is a builder role.',
    responsibilities: [
      'Build and lead the leasing function across Canadian and US markets.',
      'Set process and performance standards for every owner-file (intake, qualification, showings, move-in handover).',
      'Manage hiring plans, capacity forecasting, and territory coverage as the team scales.',
      'Partner with the founder and operations on landlord acquisition strategy.',
      'Own leasing-side KPI reporting: time-to-lease, applicant approval accuracy, owner-renewal rate.',
      'Drive continuous improvement of CRM workflows, automation, and applicant-pipeline health.',
    ],
    requiredSkills: [
      'Proven leasing-operations leadership in residential real estate.',
      'Demonstrated ability to build or scale a leasing team from scratch.',
      'Deep understanding of North American rental markets, including both GTA and major US metros.',
      'Strong commercial and analytical instincts; comfort with reporting and metrics discipline.',
      'Excellent written and verbal communication with executives and field teams alike.',
    ],
    goodToHaveSkills: [
      'Direct experience launching a US market from a Canadian base (or vice versa).',
      'Background in institutional or new-build absorption.',
      'Familiarity with CRM platforms such as HubSpot, Salesforce, or AppFolio.',
    ],
    educationAndExperience: [
      'Bachelor’s degree in Business, Real Estate, or a related field.',
      '8 or more years in residential leasing or property management, with 3 or more years managing a team.',
      'Active RECO registration (Ontario) preferred; willingness to pursue equivalent US licensure as required.',
    ],
    additionalInfo:
      'Toronto-based with regular travel to active US markets (Florida, New York, Illinois).',
    relocationAssistance: true,
  },
  {
    slug: 'marketing-coordinator-toronto',
    title: 'Marketing Coordinator',
    department: 'Marketing; Operations',
    type: 'Full-time',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Toronto, ON · Canada · Hybrid',
    jobId: 'MSR-2026-003',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Marketing Coordinator to own listings marketing and digital presence for our active portfolio. The role covers listings copywriting, photography coordination, platform management (Zillow, Rentals.ca, Facebook Marketplace), and targeted paid campaigns that drive qualified leads to our leasing team.',
    responsibilities: [
      'Write conversion-focused listings copy for every active unit in the portfolio.',
      'Coordinate property photography and ensure every listing meets the MoveSmart listings standard.',
      'Manage and refresh listings across rental platforms (Zillow, Rentals.ca, Facebook Marketplace).',
      'Run targeted paid lead-generation campaigns (Meta, Google) for active units.',
      'Track campaign performance against cost-per-qualified-lead and feed results back to the leasing desk.',
      'Maintain MoveSmart’s brand voice and visual standards across all owner-facing assets.',
    ],
    requiredSkills: [
      'Strong writing skills: listings copy, ad copy, owner-facing emails.',
      'Familiarity with major rental listing platforms and the paid social ad stack.',
      'Organised, proactive, and comfortable with a fast-moving pipeline.',
      'Comfort with photography briefs and basic photo selection.',
    ],
    goodToHaveSkills: [
      'Hands-on experience with Canva, Figma, or other lightweight design tools.',
      'SEO basics for landlord-facing content.',
      'Experience with HubSpot, Mailchimp, or similar marketing platforms.',
    ],
    educationAndExperience: [
      'Bachelor’s degree in Marketing, Communications, Journalism, or a related field.',
      '2 or more years in marketing, ideally with real estate or property management exposure.',
    ],
    additionalInfo:
      'Hybrid schedule: 3 days per week from our Toronto office once it opens, otherwise fully remote.',
    relocationAssistance: false,
  },
  {
    slug: 'field-leasing-agent-vaughan',
    title: 'Field Leasing Agent',
    department: 'Leasing',
    type: 'Full-time',
    city: 'Vaughan',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Vaughan, ON · Canada · Hybrid',
    jobId: 'MSR-2026-004',
    postingStartDate: '2026-06-10',
    compensation: '$70,000 plus commission and benefits',
    summary:
      'We are seeking a Field Leasing Agent based in Vaughan to cover showings, qualifications, and lease signings across York Region. This is a field role with regular travel between properties; you will be the on-the-ground face of MoveSmart for owners and applicants in this territory.',
    responsibilities: [
      'Conduct in-person showings across active Vaughan-area units.',
      'Pre-qualify applicants on-site and feed into the central qualification rubric.',
      'Coordinate move-in walkthroughs and key handovers with the operations team.',
      'Maintain CRM discipline: every showing logged, every applicant tracked.',
    ],
    requiredSkills: [
      'Active RECO registration.',
      'Reliable transportation and valid driver’s licence (insurance for business use).',
      '2 or more years of residential leasing experience in the GTA.',
      'Strong follow-through and CRM discipline.',
    ],
    goodToHaveSkills: [
      'Deep familiarity with York Region rental sub-markets.',
      'Experience with virtual-tour platforms.',
    ],
    educationAndExperience: [
      'Active RECO registration (Ontario).',
      '2 or more years of residential leasing experience in the GTA.',
    ],
    additionalInfo:
      'Field role with daily travel between properties. Mileage reimbursement provided.',
    relocationAssistance: false,
  },
  {
    slug: 'field-leasing-agent-mississauga',
    title: 'Field Leasing Agent',
    department: 'Leasing',
    type: 'Full-time',
    city: 'Mississauga',
    province: 'Ontario',
    country: 'Canada',
    locationDisplay: 'Mississauga, ON · Canada · Hybrid',
    jobId: 'MSR-2026-007',
    postingStartDate: '2026-06-10',
    compensation: '$70,000 plus commission and benefits',
    summary:
      'We are seeking a Field Leasing Agent based in Mississauga to cover showings, qualifications, and lease signings across Peel Region. This is a field role with regular travel between properties; you will be the on-the-ground face of MoveSmart for owners and applicants in this territory.',
    responsibilities: [
      'Conduct in-person showings across active Mississauga-area units.',
      'Pre-qualify applicants on-site and feed into the central qualification rubric.',
      'Coordinate move-in walkthroughs and key handovers with the operations team.',
      'Maintain CRM discipline: every showing logged, every applicant tracked.',
    ],
    requiredSkills: [
      'Active RECO registration.',
      'Reliable transportation and valid driver’s licence (insurance for business use).',
      '2 or more years of residential leasing experience in the GTA.',
      'Strong follow-through and CRM discipline.',
    ],
    goodToHaveSkills: [
      'Deep familiarity with Peel Region rental sub-markets.',
      'Experience with virtual-tour platforms.',
    ],
    educationAndExperience: [
      'Active RECO registration (Ontario).',
      '2 or more years of residential leasing experience in the GTA.',
    ],
    additionalInfo:
      'Field role with daily travel between properties. Mileage reimbursement provided.',
    relocationAssistance: false,
  },
  {
    slug: 'tenant-placement-coordinator-remote',
    title: 'Tenant Placement Coordinator',
    department: 'Operations; Tenant Success',
    type: 'Full-time',
    city: 'Remote',
    province: 'Remote — North America',
    country: 'Canada',
    locationDisplay: 'Remote · North America',
    jobId: 'MSR-2026-005',
    postingStartDate: '2026-06-10',
    compensation: '$65,000 plus benefits',
    summary:
      'We are seeking a Tenant Placement Coordinator to manage the lead-to-lease workflow across our Canadian and US markets. The role handles inbound applications, scheduling showings, background checks, and working with local leasing agents to close placements. This is a remote coordination role, not a field role.',
    responsibilities: [
      'Field inbound applicant inquiries across active markets and route to the right leasing agent.',
      'Schedule showings, run reminder confirmations, and chase no-shows.',
      'Run background, credit, and income checks on applicants and feed results to the qualification analyst.',
      'Maintain the central applicant pipeline with status notes and next steps for every file.',
      'Coordinate timing with property managers on key handovers and move-in dates.',
    ],
    requiredSkills: [
      'Strong written and verbal communication skills.',
      'Comfortable working across multiple markets and North American time zones.',
      'Detail-oriented with strong follow-through on open items.',
      'Comfort with CRM hygiene and structured workflows.',
    ],
    goodToHaveSkills: [
      'Familiarity with Canadian and US background-check providers.',
      'Experience with Slack, Notion, or similar async collaboration tools.',
    ],
    educationAndExperience: [
      'Post-secondary diploma or degree in a related field.',
      '2 or more years in property management, leasing, or tenant services.',
    ],
    additionalInfo:
      'Fully remote within North America. Office-equipment stipend provided on start.',
    relocationAssistance: false,
  },
  {
    slug: 'property-manager-miami',
    title: 'Property Manager',
    department: 'Property Management',
    type: 'Full-time',
    city: 'Miami',
    province: 'Florida',
    country: 'United States',
    locationDisplay: 'Miami, FL · United States · Hybrid',
    jobId: 'MSR-2026-006',
    postingStartDate: '2026-06-10',
    compensation: '$80,000 plus benefits',
    summary:
      'We are seeking a Property Manager to manage a portfolio of residential properties across our Florida markets. The role covers tenant relations, maintenance coordination, rent collection, and lease renewals, with you as the primary point of contact for both landlords and tenants on your portfolio.',
    responsibilities: [
      'Own day-to-day property management for a portfolio of residential units across Florida markets.',
      'Manage tenant relations, maintenance coordination, rent collection, and lease renewals.',
      'Serve as the primary point of contact for both landlords and tenants on your portfolio.',
      'Coordinate vendor and contractor work with cost tracking and owner approval.',
      'Maintain compliance with Florida landlord-tenant law and the eviction process where required.',
    ],
    requiredSkills: [
      'Active Florida real estate license.',
      'Familiarity with Florida landlord-tenant law and the eviction process.',
      'Strong organisational skills and comfort managing 100 or more units.',
      'Excellent communication with both landlord and tenant audiences.',
    ],
    goodToHaveSkills: [
      'Experience with AppFolio, Buildium, or similar PM platforms.',
      'Bilingual (English / Spanish).',
    ],
    educationAndExperience: [
      'Active Florida real estate license.',
      '3 or more years of property management experience in Florida.',
    ],
    additionalInfo:
      'Miami-based with regular travel across South Florida portfolio.',
    relocationAssistance: true,
  },
]

// ─────────────────────────────────────────────────────────────────────
// Helpers used by the page templates. Don't change unless you're
// also updating the templates in src/app/(site)/careers/.
// ─────────────────────────────────────────────────────────────────────

/** Find a role by slug. Returns undefined if not found. */
export function getRoleBySlug(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug)
}

/** All slugs — used by generateStaticParams on the dynamic route. */
export function getAllRoleSlugs(): string[] {
  return ROLES.map((r) => r.slug)
}

/** Group roles by region (province/state) → city, in array order.
 *  Used by the careers listing page to render the Fasken-style
 *  hierarchy. */
export interface CityGroup {
  city: string
  roles: Role[]
}
export interface RegionGroup {
  region: string
  country: 'Canada' | 'United States'
  cities: CityGroup[]
}
export function getRolesByRegion(): RegionGroup[] {
  const regionOrder: string[] = []
  const regionMap = new Map<
    string,
    { country: 'Canada' | 'United States'; cityOrder: string[]; cityMap: Map<string, Role[]> }
  >()

  for (const role of ROLES) {
    const regionKey = role.province
    if (!regionMap.has(regionKey)) {
      regionOrder.push(regionKey)
      regionMap.set(regionKey, {
        country: role.country,
        cityOrder: [],
        cityMap: new Map(),
      })
    }
    const region = regionMap.get(regionKey)!
    if (!region.cityMap.has(role.city)) {
      region.cityOrder.push(role.city)
      region.cityMap.set(role.city, [])
    }
    region.cityMap.get(role.city)!.push(role)
  }

  return regionOrder.map((regionKey) => {
    const region = regionMap.get(regionKey)!
    return {
      region: regionKey,
      country: region.country,
      cities: region.cityOrder.map((city) => ({
        city,
        roles: region.cityMap.get(city)!,
      })),
    }
  })
}
