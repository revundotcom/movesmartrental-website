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
  /** Free-form department / team label shown under the title in the hero. */
  department: string
  /** Employment type. "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  /** City the role is based in. Use "Remote" for fully remote roles. */
  city: string
  /** Province (Canada) or state (US). */
  province: string
  /** Country. */
  country: string
  /** Display location string used in the hero. */
  locationDisplay: string
  /** Job opening ID. */
  jobId: string
  /** ISO date — YYYY-MM-DD. Shown in the hero. */
  postingStartDate: string
  /** Display string — e.g. "$55,000 to $75,000 base". */
  compensation: string
  /** Job description summary — short paragraph in the body. */
  summary: string
  /** Bullet list — Key Responsibilities section. */
  responsibilities: string[]
  /** Bullet list — Required Skills section. */
  requiredSkills: string[]
  /** Bullet list — Good to have Skills (optional). */
  goodToHaveSkills: string[]
  /** Bullet list — Education and Experience. */
  educationAndExperience: string[]
  /** Free-form short paragraph — Additional Information block. */
  additionalInfo: string | null
  /** Whether relocation assistance is provided. */
  relocationAssistance: boolean
  /** HTML description from API. */
  htmlDescription?: string
  /** The specific work type to determine which application form to show. */
  workType: 'remote' | 'hybrid'
}

interface ApiJob {
  Job_Description?: string
  Pay_Disclosure?: string
  Salary?: string
  Work_Type?: string | null
  City?: string
  State?: string
  Country?: string
  slug: string
  Posting_Title?: string
  Industry?: string
  Job_Type?: string
  zoho_id?: string
  Date_Opened?: string
}

export async function fetchRolesFromApi(): Promise<Role[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://portal.revun.com'
  const url = `${baseUrl}/api/v1/job-postings?client_name=MoveSmart+Rentals`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      console.error('Failed to fetch roles', res.status)
      return []
    }
    const json = await res.json()
    const apiJobs = json.data || []
    return apiJobs.map((job: ApiJob) => {
      let rawHtml = job.Job_Description || ''
      // Selectively strip font-size, font-family, and colors to preserve other formatting (like bold/headings)
      const styleStripRegex = /(font-family|font-size|color|background-color|background|line-height)\s*:[^;]+;?/gi
      rawHtml = rawHtml.replace(/style="([^"]*)"/gi, (match, styles) => {
        const cleaned = styles.replace(styleStripRegex, '').trim()
        return cleaned ? `style="${cleaned}"` : ''
      })
      rawHtml = rawHtml.replace(/style='([^']*)'/gi, (match, styles) => {
        const cleaned = styles.replace(styleStripRegex, '').trim()
        return cleaned ? `style='${cleaned}'` : ''
      })
      // Strip <font> tags but keep the content inside them
      rawHtml = rawHtml.replace(/<\/?font[^>]*>/gi, '')

      const hidePay =
        job.Pay_Disclosure === 'Do not disclose pay' ||
        job.Salary === 'Do not disclose pay'
      const compensation = hidePay ? '' : job.Salary || ''

      const isRemote = job.Work_Type == null || String(job.Work_Type).toLowerCase() === 'remote'
      const workTypeSuffix = isRemote ? 'Remote' : 'Hybrid'

      const locParts = []
      if (job.City) locParts.push(job.City)
      if (job.State) locParts.push(job.State)
      if (job.Country) locParts.push(job.Country)

      const locationDisplay = locParts.length > 0 
        ? `${locParts.join(', ')} · ${workTypeSuffix}`
        : workTypeSuffix

      return {
        slug: job.slug,
        title: job.Posting_Title || 'Untitled Role',
        department: job.Industry || 'Careers',
        type: job.Job_Type || 'Full time',
        city: job.City || '',
        province: job.State || '',
        country: job.Country || '',
        locationDisplay,
        jobId: job.zoho_id || '',
        postingStartDate: job.Date_Opened ? job.Date_Opened.split('T')[0] : '',
        compensation,
        summary: '',
        responsibilities: [],
        requiredSkills: [],
        goodToHaveSkills: [],
        educationAndExperience: [],
        additionalInfo: null,
        relocationAssistance: false,
        htmlDescription: rawHtml,
        workType: isRemote ? 'remote' : 'hybrid',
      }
    })
  } catch (error) {
    console.error('Failed to fetch roles from API', error)
    return []
  }
}

/** Find a role by slug. Returns undefined if not found. */
export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  const roles = await fetchRolesFromApi()
  return roles.find((r) => r.slug === slug)
}

/** All slugs — used by generateStaticParams on the dynamic route. */
export async function getAllRoleSlugs(): Promise<string[]> {
  const roles = await fetchRolesFromApi()
  return roles.map((r) => r.slug)
}

/** Group roles by region (province/state) → city, in array order. */
export interface CityGroup {
  city: string
  roles: Role[]
}
export interface RegionGroup {
  region: string
  country: string
  cities: CityGroup[]
}
export async function getRolesByRegion(): Promise<RegionGroup[]> {
  const roles = await fetchRolesFromApi()
  const regionOrder: string[] = []
  const regionMap = new Map<
    string,
    { country: string; cityOrder: string[]; cityMap: Map<string, Role[]> }
  >()

  for (const role of roles) {
    const regionKey = role.province || 'Other'
    if (!regionMap.has(regionKey)) {
      regionOrder.push(regionKey)
      regionMap.set(regionKey, {
        country: role.country,
        cityOrder: [],
        cityMap: new Map(),
      })
    }
    const region = regionMap.get(regionKey)!
    const cityKey = role.city || 'Remote'
    if (!region.cityMap.has(cityKey)) {
      region.cityOrder.push(cityKey)
      region.cityMap.set(cityKey, [])
    }
    region.cityMap.get(cityKey)!.push(role)
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
