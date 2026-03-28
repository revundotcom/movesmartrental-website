/**
 * seed-us-states.ts
 *
 * Seeds the Sanity Content Lake with:
 *   - 10 US State Province documents (country: 'us')
 *   - ~37 US City documents (Tier 2)
 *
 * Usage:  npx tsx scripts/seed-us-states.ts
 *
 * Prerequisites:
 *   - SANITY_API_WRITE_TOKEN set in .env.local
 *
 * Idempotent: uses createOrReplace with deterministic _id values.
 * Uses batched transactions for efficiency.
 *
 * NOTE: CityService junction documents are NOT seeded for US cities
 * (services not yet active in US market).
 */

import { createClient, type SanityClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// ---------------------------------------------------------------------------
// Validate environment
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error(
    '\n  ERROR: SANITY_API_WRITE_TOKEN is not set.\n\n' +
      '  To create a write token:\n' +
      '    1. Go to https://www.sanity.io/manage\n' +
      '    2. Select your project\n' +
      '    3. Navigate to API > Tokens\n' +
      '    4. Create a new token with "Editor" permissions\n' +
      '    5. Add it to .env.local:\n' +
      '       SANITY_API_WRITE_TOKEN=sk...\n'
  )
  process.exit(1)
}

if (!projectId || !dataset) {
  console.error(
    'ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set in .env.local'
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Sanity client
// ---------------------------------------------------------------------------

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function textBlock(text: string) {
  const key = Math.random().toString(36).slice(2, 10)
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    children: [{ _type: 'span' as const, _key: `${key}s`, text }],
    markDefs: [] as never[],
  }
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
}

// ---------------------------------------------------------------------------
// US State data
// ---------------------------------------------------------------------------

interface USStateData {
  title: string
  slug: string
  abbreviation: string
  description: string[]
  seoDescription: string
  cities: USCityData[]
}

interface USCityData {
  title: string
  population: number
  medianRent: number
  vacancyRate: number
  neighbourhoods: string[]
  description: string
}

// ---------------------------------------------------------------------------
// 10 US States with 3-5 cities each (37 total)
// ---------------------------------------------------------------------------

const usStates: USStateData[] = [
  {
    title: 'Florida',
    slug: 'florida',
    abbreviation: 'FL',
    description: [
      'Florida has no state income tax and no statewide rent control, making it one of the most landlord-friendly states in the country. The Sunshine State attracts a massive influx of domestic migrants from the Northeast and Midwest, driving consistently strong rental demand across its major metro areas.',
      "Florida's landlord-tenant law is governed by Chapter 83 of the Florida Statutes. Landlords can raise rent with only 30 days' notice for month-to-month leases, and there are no caps on how much rent can increase between lease renewals. Security deposits have no statutory limit, though landlords must follow specific return timelines.",
      'The Florida rental market benefits from year-round tourism, a growing tech sector in Miami and Orlando, and retirement-driven demand in coastal cities. Property owners who invest in professional management consistently outperform self-managed rentals on both occupancy and rental income.',
    ],
    seoDescription:
      'Property management services across Florida. No rent control, landlord-friendly laws, and strong rental demand from domestic migration and tourism.',
    cities: [
      {
        title: 'Miami',
        population: 442241,
        medianRent: 2800,
        vacancyRate: 3.2,
        neighbourhoods: ['Brickell', 'Wynwood', 'Coral Gables', 'Little Havana', 'Coconut Grove'],
        description:
          "Miami's rental market is one of the most dynamic in the US, driven by international investment, a booming fintech sector, and steady immigration from Latin America. Brickell's luxury condo towers dominate the downtown rental scene, while Wynwood attracts creative professionals with adaptive reuse lofts.",
      },
      {
        title: 'Orlando',
        population: 307573,
        medianRent: 2100,
        vacancyRate: 4.1,
        neighbourhoods: ['Downtown Orlando', 'Lake Nona', 'Winter Park', 'Dr. Phillips'],
        description:
          "Orlando's rental market extends far beyond tourism. Lake Nona's medical city development and the University of Central Florida (largest US university by enrollment) create year-round rental demand. The I-4 corridor tech growth has made Orlando one of the fastest-growing rental markets in the Southeast.",
      },
      {
        title: 'Tampa',
        population: 384959,
        medianRent: 2200,
        vacancyRate: 3.8,
        neighbourhoods: ['Channelside', 'Hyde Park', 'Ybor City', 'Seminole Heights', 'Westshore'],
        description:
          "Tampa's rental market has surged with corporate relocations and remote workers choosing Florida's Gulf Coast lifestyle. The Water Street Tampa development has added thousands of luxury rental units downtown, while Seminole Heights and Ybor City attract renters seeking character neighbourhoods at below-downtown prices.",
      },
      {
        title: 'Jacksonville',
        population: 949611,
        medianRent: 1700,
        vacancyRate: 5.0,
        neighbourhoods: ['Riverside', 'San Marco', 'Southside', 'Beaches', 'Mandarin'],
        description:
          'Jacksonville is the largest city by area in the contiguous US, offering one of the most affordable major-metro rental markets in Florida. The naval base, financial services sector, and logistics hub at JAXPORT drive steady rental demand. Riverside and San Marco offer walkable urban rentals, while the Beaches communities command premium waterfront rents.',
      },
      {
        title: 'Fort Lauderdale',
        population: 182760,
        medianRent: 2600,
        vacancyRate: 3.5,
        neighbourhoods: ['Las Olas', 'Victoria Park', 'Flagler Village', 'Wilton Manors'],
        description:
          "Fort Lauderdale's rental market benefits from its position between Miami and Palm Beach, offering waterfront living at a relative discount to Miami Beach. Las Olas Boulevard anchors the luxury rental corridor, while Flagler Village has emerged as an arts-driven neighbourhood attracting young professionals priced out of Miami's Brickell.",
      },
    ],
  },
  {
    title: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    description: [
      'Texas has no state income tax and state law explicitly prohibits municipalities from enacting rent control ordinances, creating one of the most landlord-favourable regulatory environments in the nation. The Texas Property Code governs landlord-tenant relationships with clear, enforcement-friendly provisions.',
      "Texas's population growth rate leads the nation, with over 1,000 people moving to the state daily. This migration is fueled by corporate relocations (Tesla, Oracle, Samsung, HP Enterprise), a lower cost of living than California or New York, and no state income tax. Houston, Dallas-Fort Worth, Austin, and San Antonio each have distinct rental market dynamics.",
      'Property owners in Texas benefit from strong eviction enforcement through Justice of the Peace courts, no rent control restrictions, and a generally business-friendly regulatory framework. However, property tax rates are among the highest in the nation (averaging 1.8%), making professional rent optimization essential for positive cash flow.',
    ],
    seoDescription:
      'Property management services across Texas. No rent control, no state income tax, and nation-leading population growth driving rental demand.',
    cities: [
      {
        title: 'Houston',
        population: 2304580,
        medianRent: 1650,
        vacancyRate: 7.2,
        neighbourhoods: ['Montrose', 'The Heights', 'Midtown', 'Medical Center', 'Galleria'],
        description:
          "Houston is the fourth-largest US city with a rental market shaped by the energy sector, Texas Medical Center (the world's largest), and a massive port economy. No zoning laws create unique development patterns. Montrose and The Heights offer walkable urban rentals, while the Galleria area attracts corporate relocations.",
      },
      {
        title: 'Dallas',
        population: 1304379,
        medianRent: 1800,
        vacancyRate: 6.5,
        neighbourhoods: ['Uptown', 'Deep Ellum', 'Bishop Arts', 'Knox-Henderson', 'Lakewood'],
        description:
          "Dallas's rental market is driven by financial services, telecom, and tech company relocations. Uptown is the premier rental neighbourhood with luxury high-rises, while Deep Ellum and Bishop Arts attract creative professionals. The Dallas-Fort Worth metroplex added more jobs than any other US metro in recent years.",
      },
      {
        title: 'Austin',
        population: 978908,
        medianRent: 2000,
        vacancyRate: 8.1,
        neighbourhoods: ['Downtown', 'East Austin', 'South Congress', 'Mueller', 'Domain'],
        description:
          "Austin's tech boom (Apple, Google, Meta, Tesla) transformed its rental market, though recent supply additions have pushed vacancy rates higher than the Texas average. East Austin's gentrification continues to attract young professionals, while the Domain has become a self-contained live-work-play rental destination in North Austin.",
      },
      {
        title: 'San Antonio',
        population: 1434625,
        medianRent: 1400,
        vacancyRate: 6.8,
        neighbourhoods: ['Pearl District', 'Alamo Heights', 'Southtown', 'Stone Oak'],
        description:
          'San Antonio is the most affordable major Texas metro, with a rental market anchored by military installations (Joint Base San Antonio), healthcare, and cybersecurity operations. The Pearl District revitalization has created a walkable urban core with premium rentals, while Stone Oak offers suburban family-oriented rental homes.',
      },
      {
        title: 'Fort Worth',
        population: 918915,
        medianRent: 1600,
        vacancyRate: 6.0,
        neighbourhoods: ['Sundance Square', 'Near Southside', 'TCU Area', 'Alliance'],
        description:
          "Fort Worth's rental market is distinct from Dallas, with a more affordable price point and strong growth in the Alliance corridor (Amazon, Facebook data centers). The Near Southside arts district has emerged as a walkable rental alternative to Dallas's Uptown, attracting renters seeking lower costs with urban amenities.",
      },
    ],
  },
  {
    title: 'California',
    slug: 'california',
    abbreviation: 'CA',
    description: [
      'California has the strongest tenant protections in the nation. AB 1482 (the Tenant Protection Act of 2019) caps annual rent increases at 5% plus local CPI (or 10%, whichever is lower) for most units built before 2005. Many cities including Los Angeles, San Francisco, and San Jose have additional local rent stabilization ordinances that are even more restrictive.',
      "California's Just Cause Eviction protections mean landlords cannot terminate a tenancy without a qualifying reason after 12 months of occupancy. The state also requires relocation assistance for no-fault evictions. Property owners must navigate a complex web of state and local regulations that vary significantly by city and county.",
      'Despite the regulatory complexity, California remains one of the highest-rent markets in the nation. The tech sector in the Bay Area, entertainment industry in Los Angeles, and biotech in San Diego drive premium rental rates. Professional property management is not a luxury here -- it is a compliance necessity.',
    ],
    seoDescription:
      'Property management services across California. Navigate AB 1482 rent caps, just cause eviction rules, and local rent control ordinances with expert guidance.',
    cities: [
      {
        title: 'Los Angeles',
        population: 3898747,
        medianRent: 2900,
        vacancyRate: 4.5,
        neighbourhoods: ['Silver Lake', 'West Hollywood', 'Santa Monica', 'DTLA', 'Koreatown'],
        description:
          "Los Angeles has one of the most regulated rental markets in the US, with the Rent Stabilization Ordinance (RSO) covering approximately 624,000 units built before 1978. DTLA's Arts District and South Park have seen massive new construction, while Silver Lake and West Hollywood command premium rents for walkable lifestyle living.",
      },
      {
        title: 'San Francisco',
        population: 873965,
        medianRent: 3500,
        vacancyRate: 6.2,
        neighbourhoods: ['Mission District', 'SoMa', 'Hayes Valley', 'Marina', 'Nob Hill'],
        description:
          'San Francisco has the most complex rent control system in California, covering all units built before June 1979. The tech sector slowdown and remote work migration pushed vacancy rates above 6% -- historically high for the city. SoMa and Mission District remain the core tech-worker rental corridors, though rents have softened from 2019 peaks.',
      },
      {
        title: 'San Diego',
        population: 1386932,
        medianRent: 2700,
        vacancyRate: 3.8,
        neighbourhoods: ['Gaslamp Quarter', 'North Park', 'Pacific Beach', 'Hillcrest', 'La Jolla'],
        description:
          "San Diego's rental market is driven by the military (Naval Base San Diego, Camp Pendleton), biotech/pharma (Pfizer, Illumina), and tourism. North Park and Hillcrest attract young professionals, Pacific Beach draws the surf-lifestyle crowd, and La Jolla commands the highest rents in the metro for its coastal luxury.",
      },
      {
        title: 'Sacramento',
        population: 524943,
        medianRent: 2000,
        vacancyRate: 4.0,
        neighbourhoods: ['Midtown', 'East Sacramento', 'Natomas', 'Land Park'],
        description:
          'Sacramento has become a spillover market for Bay Area renters seeking affordability, with the capital city seeing significant rent growth in recent years. Midtown is the walkable urban rental core, while Natomas offers newer suburban apartments. State government employment provides a stable rental demand base.',
      },
      {
        title: 'San Jose',
        population: 1013240,
        medianRent: 3200,
        vacancyRate: 4.3,
        neighbourhoods: ['Downtown San Jose', 'Willow Glen', 'Japantown', 'Santana Row'],
        description:
          "San Jose sits at the heart of Silicon Valley, and its rental market is directly tied to tech industry hiring cycles. The city's Apartment Rent Ordinance limits annual increases to 5% for covered units. Downtown San Jose is undergoing major redevelopment (Google's Downtown West project), which is expected to reshape the rental landscape.",
      },
    ],
  },
  {
    title: 'New York',
    slug: 'new-york',
    abbreviation: 'NY',
    description: [
      'New York State has a complex patchwork of tenant protection laws. New York City has one of the strongest rent stabilization systems in the world, covering approximately one million apartments. The Housing Stability and Tenant Protection Act of 2019 made rent stabilization permanent and severely limited landlord ability to raise rents after vacancy.',
      'Outside New York City, the regulatory landscape is much more landlord-friendly. Cities like Buffalo, Rochester, and Albany operate under standard New York Real Property Law without the layers of NYC-specific rent regulation. However, the statewide Good Cause Eviction law (effective 2024) now provides baseline tenant protections across all of New York.',
      "New York's rental market is the most diverse in the nation, ranging from Manhattan's $4,000+ median rents to Buffalo's $1,100 median. Property owners must understand whether their units fall under rent stabilization, rent control, or free-market rules -- each with dramatically different implications for operations and returns.",
    ],
    seoDescription:
      'Property management services across New York State. Expert navigation of rent stabilization, Good Cause Eviction, and varying regulations from NYC to upstate.',
    cities: [
      {
        title: 'New York City',
        population: 8336817,
        medianRent: 3800,
        vacancyRate: 3.0,
        neighbourhoods: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
        description:
          "New York City's rental market is the largest and most complex in the nation. Approximately one million apartments are rent-stabilized, with the Rent Guidelines Board setting annual allowable increases. Manhattan's median rent exceeds $4,000, while Brooklyn and Queens offer relative affordability. The 2019 Housing Stability Act fundamentally changed the economics of rent-stabilized buildings.",
      },
      {
        title: 'Buffalo',
        population: 278349,
        medianRent: 1100,
        vacancyRate: 5.5,
        neighbourhoods: ['Elmwood Village', 'Allentown', 'North Buffalo', 'Hertel Avenue'],
        description:
          "Buffalo's rental market has revitalized significantly, driven by medical campus development (Kaleida Health), university expansion, and downtown redevelopment. Elmwood Village is the premier walkable rental neighbourhood, while Allentown attracts artists and young professionals. The city offers some of the most affordable rents of any major Northeast metro.",
      },
      {
        title: 'Rochester',
        population: 211328,
        medianRent: 1200,
        vacancyRate: 5.8,
        neighbourhoods: ['Park Avenue', 'South Wedge', 'Corn Hill', 'East Avenue'],
        description:
          "Rochester's rental market is anchored by the University of Rochester Medical Center, Rochester Institute of Technology, and a growing optics and photonics sector. The Park Avenue and South Wedge neighbourhoods have gentrified into desirable walkable rental areas, while the broader market remains affordable compared to downstate.",
      },
      {
        title: 'Albany',
        population: 99224,
        medianRent: 1350,
        vacancyRate: 4.8,
        neighbourhoods: ['Center Square', 'Lark Street', 'Pine Hills', 'Washington Park'],
        description:
          "Albany's rental market benefits from state government employment (the largest employer), university populations (SUNY Albany, Albany Medical College), and the growing Tech Valley corridor. Center Square and Lark Street form the walkable urban core, while Pine Hills serves the university rental market.",
      },
    ],
  },
  {
    title: 'Illinois',
    slug: 'illinois',
    abbreviation: 'IL',
    description: [
      'Illinois repealed its statewide ban on rent control in 2024, though no municipality has yet enacted a rent control ordinance. Chicago passed the Residential Tenant Landlord Ordinance (RTLO), one of the strongest local tenant protection laws outside of New York City, covering notice periods, security deposit handling, and just cause eviction protections.',
      "Chicago dominates the Illinois rental market, but the collar counties (DuPage, Lake, Will, Kane) have growing suburban rental demand driven by families seeking quality schools and proximity to Chicago jobs. The state's high property tax rates (second-highest in the nation) make professional rent optimization critical for landlord profitability.",
      "Illinois landlords face a property tax burden averaging 2.23% of assessed value, which significantly impacts rental returns. The Cook County Assessor's office reassessment cycles create year-over-year tax volatility that must be factored into rental pricing strategy. Professional management with tax-aware pricing is essential in this market.",
    ],
    seoDescription:
      'Property management services across Illinois. Expert handling of Chicago RTLO compliance, high property taxes, and suburban rental growth in collar counties.',
    cities: [
      {
        title: 'Chicago',
        population: 2696555,
        medianRent: 2100,
        vacancyRate: 5.8,
        neighbourhoods: ['Lincoln Park', 'Wicker Park', 'Logan Square', 'River North', 'Lakeview'],
        description:
          "Chicago's rental market is one of the most tenant-friendly outside of California, with the RTLO providing extensive protections on security deposits, notice periods, and lockout procedures. Lincoln Park and Lakeview command the highest rents, while Logan Square and Pilsen have seen rapid gentrification and rent growth. The Loop's apartment vacancy has normalized post-pandemic.",
      },
      {
        title: 'Aurora',
        population: 180542,
        medianRent: 1500,
        vacancyRate: 4.5,
        neighbourhoods: ['Downtown Aurora', 'Fox Valley', 'Eola Road Corridor'],
        description:
          "Aurora is Illinois' second-largest city and a key collar county rental market. Its position along the Metra BNSF line provides commuter rail access to downtown Chicago, making it attractive for renters priced out of the city. The Fox Valley area offers newer apartment developments with suburban amenities.",
      },
      {
        title: 'Naperville',
        population: 149540,
        medianRent: 2000,
        vacancyRate: 3.5,
        neighbourhoods: ['Downtown Naperville', 'Naperville Crossings', 'South Naperville'],
        description:
          "Naperville consistently ranks among the best places to live in the US, and its rental market reflects that desirability. The city's top-rated school district drives strong family rental demand, while downtown Naperville's walkable Riverwalk district attracts young professionals. Rental supply is limited, keeping vacancy rates well below the state average.",
      },
    ],
  },
  {
    title: 'Georgia',
    slug: 'georgia',
    abbreviation: 'GA',
    description: [
      "Georgia is a strongly landlord-friendly state with no rent control, no statewide just cause eviction requirement, and efficient dispossessory (eviction) proceedings through Magistrate Court. Georgia's landlord-tenant law is codified in Title 44, Chapter 7 of the Georgia Code, which provides a clear and enforcement-friendly framework.",
      "Atlanta dominates the Georgia rental market, with the metro area's population growth rate among the highest in the nation. The BeltLine development, Midtown's corporate corridor, and Hartsfield-Jackson (the world's busiest airport) drive diverse rental demand from young professionals, corporate relocations, and entertainment industry workers.",
      "Georgia's relatively low property tax rates (0.83% effective rate statewide) and no statewide rent regulation make it attractive for rental property investment. However, Atlanta's rapid appreciation has compressed cap rates, making professional management essential for maximizing yield on increasingly expensive properties.",
    ],
    seoDescription:
      'Property management services across Georgia. Landlord-friendly state laws, efficient eviction proceedings, and strong Atlanta metro rental demand.',
    cities: [
      {
        title: 'Atlanta',
        population: 498715,
        medianRent: 2100,
        vacancyRate: 6.0,
        neighbourhoods: ['Midtown', 'Buckhead', 'Old Fourth Ward', 'Inman Park', 'Decatur'],
        description:
          "Atlanta's rental market is shaped by the BeltLine development (transforming 22 miles of former railway into mixed-use corridors), a thriving film and entertainment industry, and major corporate headquarters (Coca-Cola, Delta, Home Depot). Midtown and Buckhead command premium rents, while Old Fourth Ward and Inman Park attract creative professionals and tech workers.",
      },
      {
        title: 'Savannah',
        population: 147780,
        medianRent: 1500,
        vacancyRate: 5.5,
        neighbourhoods: ['Historic District', 'Starland District', 'Ardsley Park'],
        description:
          "Savannah's rental market is uniquely influenced by tourism, SCAD (Savannah College of Art and Design), and the Port of Savannah (the fastest-growing container port in the US). The Historic District commands premium rents for its charm, while the Starland District has emerged as the arts and dining hub attracting young professional renters.",
      },
      {
        title: 'Augusta',
        population: 202081,
        medianRent: 1200,
        vacancyRate: 6.5,
        neighbourhoods: ['Summerville', 'Downtown Augusta', 'Martinez'],
        description:
          "Augusta's rental market is anchored by the US Army's Fort Eisenhower (formerly Fort Gordon), the Augusta National Golf Club's economic impact, and a growing cybersecurity corridor. The military base drives steady rental demand with predictable turnover cycles. Summerville offers the most desirable residential rentals, while Martinez serves family renters.",
      },
    ],
  },
  {
    title: 'North Carolina',
    slug: 'north-carolina',
    abbreviation: 'NC',
    description: [
      'North Carolina is a landlord-friendly state with no rent control, no statewide just cause eviction requirement, and a summary ejectment process that typically resolves within 30 days. The state follows Chapter 42 of the North Carolina General Statutes for landlord-tenant law, with relatively straightforward procedures.',
      "The Research Triangle (Raleigh-Durham-Chapel Hill) has become one of the nation's hottest rental markets, driven by Apple, Google, and Epic Games establishing major campuses. Charlotte's financial sector (Bank of America, Wells Fargo) creates steady corporate relocation demand. Both metros have seen significant rent growth as remote workers choose North Carolina's quality of life and lower costs.",
      "North Carolina's property tax rates are moderate (0.77% effective rate), and the state's business-friendly environment continues to attract employers. The influx of residents from higher-cost states creates a dynamic rental market where professional management provides a competitive edge in tenant placement and pricing optimization.",
    ],
    seoDescription:
      'Property management services across North Carolina. Landlord-friendly laws, Research Triangle tech growth, and Charlotte financial sector driving rental demand.',
    cities: [
      {
        title: 'Charlotte',
        population: 874579,
        medianRent: 1900,
        vacancyRate: 5.5,
        neighbourhoods: ['South End', 'NoDa', 'Plaza Midwood', 'Uptown', 'Ballantyne'],
        description:
          "Charlotte is the second-largest banking center in the US (after New York), and its rental market is driven by financial services, healthcare (Atrium Health), and a growing tech sector. South End's light rail corridor has become the premier rental neighbourhood, with NoDa and Plaza Midwood attracting creative professionals seeking walkable urban living.",
      },
      {
        title: 'Raleigh',
        population: 467665,
        medianRent: 1800,
        vacancyRate: 5.0,
        neighbourhoods: ['Downtown Raleigh', 'North Hills', 'Glenwood South', 'Cameron Village'],
        description:
          "Raleigh is the state capital and anchor of the Research Triangle, with rental demand driven by NC State University, government employment, and a tech sector that includes Apple's billion-dollar campus in nearby RTP. Glenwood South and North Hills are the most popular rental neighbourhoods for young professionals, while downtown development continues to add mixed-use inventory.",
      },
      {
        title: 'Durham',
        population: 283506,
        medianRent: 1700,
        vacancyRate: 5.2,
        neighbourhoods: ['Downtown Durham', 'Brightleaf', 'Ninth Street', 'American Tobacco'],
        description:
          "Durham has transformed from a tobacco town into a biotech and innovation hub, anchored by Duke University and the Duke Health System. The American Tobacco Campus and Brightleaf District adaptive reuse projects have created walkable urban rental corridors. Durham's rental market attracts graduate students, medical professionals, and startup workers.",
      },
    ],
  },
  {
    title: 'Arizona',
    slug: 'arizona',
    abbreviation: 'AZ',
    description: [
      "Arizona is a landlord-friendly state governed by the Arizona Residential Landlord and Tenant Act (A.R.S. Title 33, Chapter 10). The state has no rent control, and Arizona law explicitly prohibits municipalities from enacting rent regulation. Eviction proceedings through the Justice Court are among the fastest in the nation, typically completing within 10-14 days.",
      "Arizona's rental market is driven by massive population growth -- the state gained over 800,000 residents in the last decade. The Phoenix metro area alone accounts for two-thirds of the state's population. Semiconductor manufacturing (TSMC, Intel), healthcare, and a growing tech sector have diversified the employment base beyond the traditional retirement and tourism economy.",
      'Winter visitors ("snowbirds") create a unique seasonal rental dynamic in Arizona, with short-term rental demand peaking from November through April. Property owners in Scottsdale and Tucson can optimize returns by mixing long-term tenants with furnished seasonal rentals during peak winter months.',
    ],
    seoDescription:
      'Property management services across Arizona. No rent control, fast eviction proceedings, and booming Phoenix metro rental demand from semiconductor and tech growth.',
    cities: [
      {
        title: 'Phoenix',
        population: 1608139,
        medianRent: 1800,
        vacancyRate: 6.5,
        neighbourhoods: ['Downtown Phoenix', 'Arcadia', 'Biltmore', 'Roosevelt Row', 'Ahwatukee'],
        description:
          "Phoenix is the fifth-largest US city and the anchor of a metro area growing faster than nearly every other in the nation. TSMC's $40 billion semiconductor fab in north Phoenix and Intel's expansion in Chandler are driving an influx of skilled workers. Arcadia and Biltmore command premium rents, while Roosevelt Row attracts creatives and downtown workers.",
      },
      {
        title: 'Tucson',
        population: 542629,
        medianRent: 1350,
        vacancyRate: 5.8,
        neighbourhoods: ['Downtown Tucson', 'Sam Hughes', 'Catalina Foothills'],
        description:
          "Tucson's rental market is anchored by the University of Arizona, Raytheon Missiles & Defense, and Davis-Monthan Air Force Base. The city offers significantly lower rents than Phoenix, attracting both students and retirees. Sam Hughes near the university is the most walkable rental neighbourhood, while the Catalina Foothills offer upscale desert living.",
      },
      {
        title: 'Scottsdale',
        population: 241361,
        medianRent: 2400,
        vacancyRate: 5.0,
        neighbourhoods: ['Old Town Scottsdale', 'Scottsdale Quarter', 'McCormick Ranch'],
        description:
          "Scottsdale commands the highest rents in the Phoenix metro, driven by its luxury lifestyle positioning, resort tourism, and a growing tech presence along the Scottsdale Airpark corridor. Old Town Scottsdale's entertainment district attracts young professionals, while McCormick Ranch and Scottsdale Quarter serve families and corporate relocations.",
      },
    ],
  },
  {
    title: 'Colorado',
    slug: 'colorado',
    abbreviation: 'CO',
    description: [
      "Colorado passed a statewide rent stabilization law in 2024 that allows municipalities to adopt local rent control measures -- a significant shift from the state's historically landlord-friendly stance. Denver has not yet enacted rent control but has implemented a right to counsel for tenants facing eviction. The regulatory trend in Colorado is moving toward stronger tenant protections.",
      "Colorado's rental market is concentrated along the Front Range corridor from Fort Collins through Denver to Colorado Springs. The state's outdoor lifestyle, legal cannabis industry, and tech sector (including a significant aerospace and defense presence) drive consistent migration from both coasts. Denver's median rent has more than doubled since 2010.",
      "Boulder's proximity to CU Boulder and a concentrated tech sector creates one of the tightest rental markets in the state. Colorado Springs' military installations (five bases) provide a stable rental demand base. Denver's RiNo and Capitol Hill neighbourhoods remain the core urban rental corridors for young professionals.",
    ],
    seoDescription:
      'Property management services across Colorado. Navigate evolving rent regulations, Front Range growth, and outdoor-lifestyle-driven rental demand.',
    cities: [
      {
        title: 'Denver',
        population: 713252,
        medianRent: 2200,
        vacancyRate: 6.2,
        neighbourhoods: ['RiNo', 'Capitol Hill', 'LoDo', 'Cherry Creek', 'Highlands'],
        description:
          "Denver's rental market has matured after a decade of rapid growth, with new supply moderating rent increases. RiNo (River North Art District) has emerged as the premier rental neighbourhood for young professionals, while Capitol Hill remains the densest and most walkable rental area. Cherry Creek and Highlands command premium rents for their upscale amenities and lifestyle.",
      },
      {
        title: 'Colorado Springs',
        population: 478961,
        medianRent: 1700,
        vacancyRate: 5.0,
        neighbourhoods: ['Downtown', 'Old Colorado City', 'Briargate', 'Manitou Springs'],
        description:
          "Colorado Springs' rental market is anchored by five military installations (including the US Air Force Academy and Space Force at Peterson), making it one of the most military-dependent rental markets in the country. Downtown revitalization and the Olympic City USA designation have attracted tourism and young professional renters beyond the military community.",
      },
      {
        title: 'Boulder',
        population: 105673,
        medianRent: 2500,
        vacancyRate: 3.5,
        neighbourhoods: ['Pearl Street', 'The Hill', 'North Boulder', 'Gunbarrel'],
        description:
          "Boulder's rental market is one of the tightest in Colorado, constrained by the city's growth boundary and height restrictions. CU Boulder's 35,000+ students and a concentrated tech sector (Google, Twitter/X, Palantir) create intense demand. The Hill neighbourhood serves the student market, while Pearl Street and North Boulder attract professionals willing to pay premium rents for the Boulder lifestyle.",
      },
    ],
  },
  {
    title: 'New Jersey',
    slug: 'new-jersey',
    abbreviation: 'NJ',
    description: [
      "New Jersey has some of the strongest tenant protections in the nation outside of New York and California. The state's Anti-Eviction Act requires just cause for eviction, and many municipalities have local rent control ordinances. However, the regulatory landscape varies dramatically by municipality -- Jersey City has rent control, while Hoboken relies on the state's rent stabilization framework.",
      "New Jersey's rental market is heavily influenced by its proximity to New York City and Philadelphia. The Gold Coast (Jersey City, Hoboken, Weehawken) has become a primary residential alternative to Manhattan, with waterfront luxury towers offering Manhattan views at a relative discount. Newark's Ironbound district has emerged as an affordable urban rental alternative.",
      "Property owners in New Jersey face the highest effective property tax rates in the nation (averaging 2.21%), making professional rent optimization and tax abatement awareness critical for profitability. Many Jersey City and Newark developments operate under PILOT (Payment in Lieu of Taxes) programs that significantly reduce tax burden.",
    ],
    seoDescription:
      'Property management services across New Jersey. Navigate just cause eviction, municipal rent control, and highest-in-nation property taxes with expert guidance.',
    cities: [
      {
        title: 'Newark',
        population: 311549,
        medianRent: 1600,
        vacancyRate: 5.5,
        neighbourhoods: ['Ironbound', 'Downtown Newark', 'Forest Hill', 'University Heights'],
        description:
          "Newark's rental market is undergoing a renaissance, driven by transit connectivity (Newark Penn Station, Newark Liberty Airport), university expansion (Rutgers-Newark, NJIT), and the Ironbound district's cultural vibrancy. Downtown Newark's Prudential Center district has attracted major mixed-use developments. The city offers Manhattan-accessible rentals at a fraction of Jersey City prices.",
      },
      {
        title: 'Jersey City',
        population: 292449,
        medianRent: 3000,
        vacancyRate: 4.8,
        neighbourhoods: ['Exchange Place', 'Newport', 'The Heights', 'Journal Square'],
        description:
          "Jersey City is the second-largest city in New Jersey and the heart of the Gold Coast rental market. Exchange Place and Newport offer Manhattan-view luxury towers with PATH train access to World Trade Center. Journal Square has emerged as the affordable alternative with an arts scene, while The Heights attracts families seeking more space. The city's rent control ordinance covers pre-1987 buildings.",
      },
      {
        title: 'Hoboken',
        population: 60419,
        medianRent: 3200,
        vacancyRate: 3.8,
        neighbourhoods: ['Waterfront', 'Uptown', 'Midtown Hoboken', 'Southwest Hoboken'],
        description:
          "Hoboken's one-square-mile footprint creates one of the densest rental markets in the nation. The city's rent stabilization framework covers many pre-1987 units, while new waterfront construction operates at market rates. PATH train access to Manhattan makes Hoboken a premier commuter rental market, commanding some of the highest per-square-foot rents in New Jersey.",
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Batch helper
// ---------------------------------------------------------------------------

async function commitBatch(
  sanityClient: SanityClient,
  docs: Array<{ _id: string; _type: string; [key: string]: unknown }>,
  batchLabel: string
): Promise<void> {
  const BATCH_SIZE = 30
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = docs.slice(i, i + BATCH_SIZE)
    const tx = sanityClient.transaction()
    for (const doc of batch) {
      tx.createOrReplace(doc)
    }
    await tx.commit()
    console.log(
      `  ${batchLabel}: committed batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} docs)`
    )
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(
    'Seeding 10 US states and ~37 city documents...\n'
  )

  const stateDocs: Array<{
    _id: string
    _type: string
    [key: string]: unknown
  }> = []
  const cityDocs: Array<{
    _id: string
    _type: string
    [key: string]: unknown
  }> = []

  for (const state of usStates) {
    // State Province document
    const stateDoc = {
      _id: `province-${state.slug}`,
      _type: 'province',
      title: state.title,
      slug: { _type: 'slug', current: state.slug },
      country: 'us',
      abbreviation: state.abbreviation,
      description: state.description.map((p) => textBlock(p)),
      seo: {
        metaTitle: `${state.title} Property Management | MoveSmart Rentals`,
        metaDescription: state.seoDescription,
        keywords: [
          `${state.title.toLowerCase()} property management`,
          `${state.title.toLowerCase()} rental management`,
          `${state.title.toLowerCase()} landlord services`,
          `${state.abbreviation.toLowerCase()} property management`,
        ],
      },
      publishing: {
        noindex: false,
        includedInSitemap: true,
      },
    }
    stateDocs.push(stateDoc)

    // City documents for this state
    for (const city of state.cities) {
      const citySlug = toSlug(city.title)
      // Prepend state abbreviation to city ID for uniqueness
      // e.g., city-fl-miami, city-tx-houston
      const cityId = `city-${state.abbreviation.toLowerCase()}-${citySlug}`

      const cityDoc = {
        _id: cityId,
        _type: 'city',
        title: city.title,
        slug: { _type: 'slug', current: citySlug },
        province: {
          _type: 'reference',
          _ref: `province-${state.slug}`,
        },
        tier: 2,
        population: city.population,
        medianRent: city.medianRent,
        vacancyRate: city.vacancyRate,
        neighbourhoods: city.neighbourhoods,
        description: [textBlock(city.description)],
        seo: {
          metaTitle: `${city.title}, ${state.abbreviation} Property Management | MoveSmart Rentals`,
          metaDescription: `Professional property management in ${city.title}, ${state.title}. Tenant placement, screening, and rental management across ${city.neighbourhoods.slice(0, 3).join(', ')} and more.`,
          keywords: [
            `${city.title.toLowerCase()} property management`,
            `${city.title.toLowerCase()} rental management`,
            `${city.title.toLowerCase()} ${state.abbreviation.toLowerCase()} rentals`,
            `${city.title.toLowerCase()} landlord services`,
          ],
        },
        publishing: {
          noindex: false,
          includedInSitemap: true,
        },
      }
      cityDocs.push(cityDoc)
    }
  }

  console.log(`  States to seed: ${stateDocs.length}`)
  console.log(`  Cities to seed: ${cityDocs.length}`)
  console.log()

  // Commit state documents
  await commitBatch(client, stateDocs, 'US States')

  // Commit city documents
  await commitBatch(client, cityDocs, 'US Cities')

  console.log('\nDone! Seeded:')
  console.log(`  - ${stateDocs.length} US state Province documents`)
  console.log(`  - ${cityDocs.length} US city documents`)
  console.log(
    '\nNote: CityService junction documents are NOT created for US cities.'
  )
  console.log(
    'Services will be enabled for US markets in a future phase.'
  )
}

main().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
