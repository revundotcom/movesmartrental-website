/**
 * seed-canadian-provinces.ts
 *
 * Seeds the Sanity Content Lake with:
 *   - 4 new Canadian Province documents (Quebec, British Columbia, Alberta, Nova Scotia)
 *   - ~17 Tier-2 City documents across the 4 provinces
 *
 * Ontario is NOT included (already seeded by seed-services.ts).
 *
 * Usage:  npx tsx scripts/seed-canadian-provinces.ts
 *
 * Prerequisites:
 *   - Run seed-services.ts first (creates Ontario Province and Service documents)
 *   - SANITY_API_WRITE_TOKEN set in .env.local
 *
 * Idempotent: uses createOrReplace with deterministic _id values.
 * Uses batched transactions (30 docs/batch) for efficiency.
 */

import { createClient } from '@sanity/client'
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
// Province data -- genuinely unique descriptions per province
// ---------------------------------------------------------------------------

interface ProvinceData {
  title: string
  slug: string
  abbreviation: string
  description: string
  seoTitle: string
  seoDescription: string
}

const provinces: ProvinceData[] = [
  {
    title: 'Quebec',
    slug: 'quebec',
    abbreviation: 'QC',
    description:
      "Quebec's rental market is governed by the Regie du logement and the Civil Code of Quebec, making it one of the most tenant-protective jurisdictions in North America. Montreal alone accounts for over 600,000 renter households, with a purpose-built apartment stock that dates back decades. Laval and Gatineau offer suburban alternatives with growing condo rental markets. Professional management in Quebec requires bilingual capacity and deep familiarity with the province's unique lease renewal and rent-setting rules.",
    seoTitle: 'Quebec Property Management | MoveSmart Rentals',
    seoDescription:
      "Professional property management across Quebec. Expert tenant placement and landlord services in Montreal, Quebec City, Laval, Gatineau, and Longueuil with bilingual Regie du logement compliance.",
  },
  {
    title: 'British Columbia',
    slug: 'british-columbia',
    abbreviation: 'BC',
    description:
      "British Columbia's rental market is shaped by geographic constraints and international demand, producing some of Canada's highest rents. Vancouver consistently ranks among the most expensive rental cities globally, while Surrey and Burnaby offer more accessible alternatives within the Metro Vancouver transit network. Victoria's island location creates a self-contained market driven by government employment and retiree migration. The BC Residential Tenancy Branch enforces strict rules on rent increases, security deposits, and tenant evictions that demand professional compliance management.",
    seoTitle: 'British Columbia Property Management | MoveSmart Rentals',
    seoDescription:
      'Professional property management across British Columbia. Expert services in Vancouver, Surrey, Burnaby, Richmond, and Victoria with BC Residential Tenancy Act compliance.',
  },
  {
    title: 'Alberta',
    slug: 'alberta',
    abbreviation: 'AB',
    description:
      "Alberta's rental market is uniquely tied to energy sector cycles, creating boom-and-bust dynamics that reward adaptable property managers. Calgary and Edmonton are the province's two major centres, each with distinct economic drivers -- Calgary tilts toward corporate oil and gas headquarters while Edmonton anchors government services and the petrochemical corridor. Red Deer and Lethbridge serve as regional hubs with more affordable entry points. Alberta has no rent control, giving landlords pricing flexibility but requiring careful market analysis to maintain occupancy during downturns.",
    seoTitle: 'Alberta Property Management | MoveSmart Rentals',
    seoDescription:
      'Professional property management across Alberta. Expert tenant placement and rental management in Calgary, Edmonton, Red Deer, and Lethbridge with Alberta Residential Tenancies Act compliance.',
  },
  {
    title: 'Nova Scotia',
    slug: 'nova-scotia',
    abbreviation: 'NS',
    description:
      "Nova Scotia's rental market centres on Halifax, the largest city in Atlantic Canada and a growing hub for immigration, technology, and post-secondary education. Dalhousie University and several other institutions drive strong student rental demand, while the Halifax Shipyard and defence sector provide stable year-round tenancy. Dartmouth, connected to Halifax by bridges and ferry, offers a more affordable waterfront alternative. Sydney serves Cape Breton's smaller but emerging market. Nova Scotia introduced temporary rent caps in 2022, adding compliance complexity for property owners across the province.",
    seoTitle: 'Nova Scotia Property Management | MoveSmart Rentals',
    seoDescription:
      'Professional property management across Nova Scotia. Expert landlord services in Halifax, Dartmouth, and Sydney with Nova Scotia Residential Tenancies Act compliance and rent cap navigation.',
  },
]

// ---------------------------------------------------------------------------
// City data -- unique per city, organized by province
// ---------------------------------------------------------------------------

interface CityData {
  title: string
  provinceSlug: string
  population: number
  medianRent: number
  vacancyRate: number
  neighbourhoods: string[]
  description: string[]
}

const cities: CityData[] = [
  // --- Quebec cities ---
  {
    title: 'Montreal',
    provinceSlug: 'quebec',
    population: 1762949,
    medianRent: 1500,
    vacancyRate: 2.3,
    neighbourhoods: ['Plateau-Mont-Royal', 'Griffintown', 'Villeray', 'Verdun', 'Rosemont'],
    description: [
      "Montreal is Canada's second-largest city and the cultural capital of Quebec, with a rental market defined by its massive purpose-built apartment stock and a renter-majority population. Over 60% of Montreal households rent, making it the most renter-friendly major city in the country.",
      "The Plateau-Mont-Royal and Griffintown neighbourhoods attract young professionals and tech workers, while Villeray and Rosemont offer family-oriented rental options with lower price points. Verdun's rapid gentrification has repositioned it as a trendy waterfront alternative to downtown.",
      "Montreal's median rent of $1,500 remains significantly below Toronto and Vancouver, making it attractive for remote workers and immigrants. However, the Regie du logement's tenant protections require landlords to navigate complex lease renewal and rent-setting processes.",
    ],
  },
  {
    title: 'Quebec City',
    provinceSlug: 'quebec',
    population: 549459,
    medianRent: 1150,
    vacancyRate: 1.8,
    neighbourhoods: ['Saint-Roch', 'Limoilou', 'Sainte-Foy', 'Beauport', 'Charlesbourg'],
    description: [
      "Quebec City's rental market benefits from extraordinary employment stability, anchored by the provincial government, Universite Laval, and a thriving tourism sector. The city's 1.8% vacancy rate reflects steady demand without the speculative pressures seen in larger Canadian cities.",
      "Saint-Roch has transformed into a tech and startup hub, driving demand for modern apartments near the Saint-Charles River. Limoilou offers walkable, affordable living, while Sainte-Foy serves university students and suburban families. Beauport and Charlesbourg provide larger units at lower rents.",
      "Property owners in Quebec City benefit from a highly stable tenant base -- government workers with long-term employment make excellent tenants. The challenge is navigating the Civil Code of Quebec's unique lease renewal framework and the Regie du logement's dispute resolution process.",
    ],
  },
  {
    title: 'Laval',
    provinceSlug: 'quebec',
    population: 438366,
    medianRent: 1350,
    vacancyRate: 2.0,
    neighbourhoods: ['Chomedey', 'Laval-des-Rapides', 'Vimont', 'Sainte-Dorothee'],
    description: [
      "Laval sits on Jesus Island directly north of Montreal, connected by multiple bridges and two Metro lines that make it functionally part of the Greater Montreal commuter belt. The city has seen explosive condo development along the Metro Orange Line corridor, creating a new class of rental investors.",
      "Chomedey is the commercial heart of Laval with significant purpose-built rental stock, while Laval-des-Rapides offers affordable options near the De La Concorde Metro station. Vimont and Sainte-Dorothee attract families seeking suburban space with Metro accessibility.",
      "Laval's rental vacancy rate of 2.0% and median rent of $1,350 position it as a middle-market alternative to Montreal. The city's strong job growth in logistics, aerospace (Bombardier corridor), and retail makes it increasingly attractive to tenants who want suburban living without long commutes.",
    ],
  },
  {
    title: 'Gatineau',
    provinceSlug: 'quebec',
    population: 291041,
    medianRent: 1400,
    vacancyRate: 1.6,
    neighbourhoods: ['Hull', 'Aylmer', 'Gatineau Sector', 'Buckingham'],
    description: [
      "Gatineau occupies a unique position in Canada's rental landscape: a Quebec city directly across the Ottawa River from the federal capital. This geography creates a cross-border rental market where bilingual federal workers choose between Ontario and Quebec based on tax advantages, housing costs, and commute preferences.",
      "Hull, the urban core, has seen significant condo development and offers the shortest commute to Parliament Hill. Aylmer provides a more residential feel with access to Gatineau Park. The Gatineau Sector and Buckingham serve as affordable suburban options with growing families.",
      "With a tight 1.6% vacancy rate and rents averaging $1,400, Gatineau offers property owners strong returns. The federal government's hybrid work policies continue to drive demand as bilingual workers seek proximity to both Ottawa campuses and Quebec's lower childcare costs.",
    ],
  },
  {
    title: 'Longueuil',
    provinceSlug: 'quebec',
    population: 246842,
    medianRent: 1300,
    vacancyRate: 2.2,
    neighbourhoods: ['Vieux-Longueuil', 'Saint-Hubert', 'Brossard', 'Greenfield Park'],
    description: [
      "Longueuil anchors Montreal's South Shore, connected to downtown by the Metro Yellow Line and the Jacques Cartier and Champlain bridges. The opening of the REM (Reseau express metropolitain) light rail through Brossard is reshaping the south shore rental landscape.",
      "Vieux-Longueuil offers walkable urban living with heritage architecture, while Saint-Hubert provides a mix of single-family and multi-residential rentals near the airport and military base. Brossard's DIX30 corridor and new REM station are attracting young professional renters in significant numbers.",
      "At a median rent of $1,300, Longueuil represents the most affordable entry into the Greater Montreal market. The combination of new REM transit infrastructure and lower rents than Montreal proper is accelerating tenant migration, making it a growth market for property investors.",
    ],
  },

  // --- British Columbia cities ---
  {
    title: 'Vancouver',
    provinceSlug: 'british-columbia',
    population: 662248,
    medianRent: 2800,
    vacancyRate: 1.0,
    neighbourhoods: ['Kitsilano', 'Mount Pleasant', 'Yaletown', 'East Vancouver', 'Coal Harbour'],
    description: [
      "Vancouver consistently ranks among the most expensive rental markets in North America, with a 1.0% vacancy rate and median rents of $2,800 that reflect severe geographic constraints between mountains and ocean. The city's limited land supply and international demand create a permanent pressure cooker for rental housing.",
      "Kitsilano and Mount Pleasant attract young professionals and tech workers drawn to the walkability and cafe culture, while Yaletown offers luxury condo rentals near False Creek. East Vancouver provides the most affordable urban options, and Coal Harbour commands premium rents for waterfront living.",
      "Professional property management in Vancouver is essentially mandatory given the BC Residential Tenancy Branch's strict enforcement of rent increase limits, the city's Empty Homes Tax, and short-term rental regulations. Owners who self-manage risk costly compliance violations.",
    ],
  },
  {
    title: 'Surrey',
    provinceSlug: 'british-columbia',
    population: 568322,
    medianRent: 2200,
    vacancyRate: 1.5,
    neighbourhoods: ['Newton', 'Guildford', 'Fleetwood', 'Cloverdale', 'South Surrey'],
    description: [
      "Surrey is Metro Vancouver's fastest-growing city and has surpassed Vancouver in population growth rate. The city centre is undergoing a dramatic transformation with new high-rise development around the future SkyTrain Surrey-Langley extension, positioning it as a major urban centre rather than a suburban bedroom community.",
      "Newton is Surrey's most populous town centre with significant rental demand from immigrant families. Guildford and Fleetwood offer mid-range options near SkyTrain stations. Cloverdale retains small-town character with lower rents, and South Surrey commands premium pricing near the US border and ocean access.",
      "With median rents of $2,200 and a 1.5% vacancy rate, Surrey offers investors better yield potential than Vancouver proper while benefiting from the same regional economic drivers -- tech, film, port logistics, and education.",
    ],
  },
  {
    title: 'Burnaby',
    provinceSlug: 'british-columbia',
    population: 249197,
    medianRent: 2500,
    vacancyRate: 1.2,
    neighbourhoods: ['Metrotown', 'Brentwood', 'Lougheed', 'Edmonds'],
    description: [
      "Burnaby sits at the geographic centre of Metro Vancouver and benefits from exceptional SkyTrain connectivity with stations on both the Expo and Millennium Lines. Metrotown is the second-largest downtown in BC, with thousands of condo units feeding the rental market alongside the massive Metropolis at Metrotown mall.",
      "Brentwood has seen explosive high-rise development, transforming from a low-rise neighbourhood into a dense urban centre rivalling downtown Vancouver. Lougheed and Edmonds offer more affordable alternatives with SkyTrain access. Simon Fraser University on Burnaby Mountain generates consistent student rental demand.",
      "At a median rent of $2,500 and a tight 1.2% vacancy rate, Burnaby represents the sweet spot between Vancouver pricing and suburban accessibility. The city's central location and transit connectivity make it a perennial tenant favourite.",
    ],
  },
  {
    title: 'Richmond',
    provinceSlug: 'british-columbia',
    population: 209937,
    medianRent: 2400,
    vacancyRate: 1.3,
    neighbourhoods: ['City Centre', 'Steveston', 'Ironwood', 'Hamilton'],
    description: [
      "Richmond occupies a series of islands at the mouth of the Fraser River, home to Vancouver International Airport and a vibrant Asian-Canadian community that shapes the local rental market with demand for specific property features and amenities. The Canada Line SkyTrain connects Richmond to downtown Vancouver in 25 minutes.",
      "City Centre is a dense condo corridor along No. 3 Road with walk-to-SkyTrain convenience. Steveston, the historic fishing village, commands premium rents for its waterfront charm and restaurants. Ironwood and Hamilton offer newer suburban developments popular with families.",
      "Richmond's 1.3% vacancy rate and $2,400 median rent reflect its strategic position near the airport and its role as a commercial hub for the Asia-Pacific business community. Flood plain considerations add a unique dimension to property insurance and management in this below-sea-level city.",
    ],
  },
  {
    title: 'Victoria',
    provinceSlug: 'british-columbia',
    population: 91867,
    medianRent: 2100,
    vacancyRate: 1.1,
    neighbourhoods: ['James Bay', 'Fernwood', 'Fairfield', 'Vic West', 'Oak Bay'],
    description: [
      "Victoria's island location on southern Vancouver Island creates a self-contained rental market with limited supply and persistent demand. As British Columbia's capital, the provincial government provides a stable employment base complemented by the University of Victoria, Royal Roads University, and a growing tech sector.",
      "James Bay, near the Inner Harbour and Legislature, attracts government workers and retirees. Fernwood and Fairfield are character neighbourhoods popular with young families. Vic West is undergoing condo development, while Oak Bay offers upscale rental options for established professionals.",
      "Victoria's 1.1% vacancy rate is among the tightest in Canada, driven by island geography that prevents outward sprawl. With the BC Residential Tenancy Branch actively enforcing tenant protections and the city's unique short-term rental bylaws, professional management is the safest path for rental property owners.",
    ],
  },

  // --- Alberta cities ---
  {
    title: 'Calgary',
    provinceSlug: 'alberta',
    population: 1306784,
    medianRent: 1800,
    vacancyRate: 2.8,
    neighbourhoods: ['Beltline', 'Kensington', 'Bridgeland', 'Mission', 'Marda Loop'],
    description: [
      "Calgary is Western Canada's business capital, home to the majority of Canada's oil and gas corporate headquarters and a rapidly diversifying tech and film sector. The city's rental market has historically been cyclical, tied to energy prices, but recent economic diversification has brought more stability.",
      "The Beltline district south of downtown has transformed into Calgary's densest neighbourhood with thousands of condo and apartment rentals. Kensington and Bridgeland offer walkable village-style living near the Bow River, while Mission and Marda Loop attract young professionals with independent shops and restaurants.",
      "Calgary's 2.8% vacancy rate reflects a market in transition -- the downtown office-to-residential conversion wave is adding rental supply while interprovincial migration from BC and Ontario adds demand. With no provincial rent control, Calgary landlords have pricing flexibility but must compete on quality and management responsiveness.",
    ],
  },
  {
    title: 'Edmonton',
    provinceSlug: 'alberta',
    population: 1010899,
    medianRent: 1500,
    vacancyRate: 3.2,
    neighbourhoods: ['Oliver', 'Strathcona', 'Garneau', 'Ritchie', 'Bonnie Doon'],
    description: [
      "Edmonton is Alberta's capital and Canada's northernmost major city, with a rental market driven by government employment, the University of Alberta, and the petrochemical refinery corridor east of the city. The Valley Line LRT expansion is reshaping rental desirability along its southeast and west routes.",
      "Oliver and downtown offer high-rise living for government workers and university students, while Strathcona's Whyte Avenue corridor is the city's cultural heart with strong demand from creative professionals. Garneau serves the university market, and Ritchie and Bonnie Doon are emerging as revitalization targets.",
      "At a median rent of $1,500 and a 3.2% vacancy rate, Edmonton is one of the most affordable major city rental markets in Canada. However, Alberta's lack of rent control means landlords can adjust pricing aggressively during upticks, making market timing and professional management valuable for maximizing returns.",
    ],
  },
  {
    title: 'Red Deer',
    provinceSlug: 'alberta',
    population: 100844,
    medianRent: 1250,
    vacancyRate: 4.0,
    neighbourhoods: ['Downtown Red Deer', 'Normandeau', 'Oriole Park'],
    description: [
      "Red Deer sits at the geographic midpoint between Calgary and Edmonton on the QE2 highway, serving as a regional hub for central Alberta's agricultural and energy sectors. Red Deer Polytechnic (formerly Red Deer College) generates consistent student rental demand throughout the academic year.",
      "Downtown Red Deer has undergone revitalization with mixed-use developments attracting younger renters. Normandeau and Oriole Park offer suburban family rentals at price points well below Calgary or Edmonton, making Red Deer attractive to tenants seeking affordability with regional amenities.",
      "Red Deer's 4.0% vacancy rate is the highest among our Alberta cities, reflecting its smaller market size and sensitivity to energy sector employment cycles. However, well-positioned properties near the college and hospital maintain strong occupancy rates year-round.",
    ],
  },
  {
    title: 'Lethbridge',
    provinceSlug: 'alberta',
    population: 101482,
    medianRent: 1200,
    vacancyRate: 3.5,
    neighbourhoods: ['Downtown Lethbridge', 'West Lethbridge', 'University Drive'],
    description: [
      "Lethbridge is southern Alberta's largest city, anchored by the University of Lethbridge and Lethbridge College, which together bring over 15,000 students to a city of just over 100,000. This student concentration creates a rental market where the academic calendar significantly impacts occupancy.",
      "West Lethbridge has experienced the most growth, with newer subdivisions attracting families and university staff. The University Drive corridor serves student renters, while Downtown Lethbridge is seeing mixed-use revitalization. The city's southern Alberta location provides easy access to Waterton Lakes and the US border.",
      "With median rents of $1,200 and a 3.5% vacancy rate, Lethbridge offers accessible entry-level pricing for rental investors. The key to success is managing the September-April student cycle and maintaining properties to attract year-round tenants in the non-student months.",
    ],
  },

  // --- Nova Scotia cities ---
  {
    title: 'Halifax',
    provinceSlug: 'nova-scotia',
    population: 439819,
    medianRent: 1800,
    vacancyRate: 1.0,
    neighbourhoods: ['Downtown Halifax', 'South End', 'North End', 'Clayton Park', 'Bedford'],
    description: [
      "Halifax is Atlantic Canada's largest city and economic engine, with a rental market that has tightened dramatically since 2020 due to immigration, interprovincial migration, and limited housing supply. The city's 1.0% vacancy rate is among the lowest in the country, driving rents to unprecedented levels for the region.",
      "The South End, home to Dalhousie University and several hospitals, commands premium rents from students and healthcare professionals. The North End has gentrified rapidly, attracting artists and young professionals. Clayton Park and Bedford offer suburban family options with lower rents but growing demand.",
      "Nova Scotia's temporary rent cap (added in 2022) limits annual increases but creates compliance complexity for landlords accustomed to market-rate adjustments. The Halifax Regional Municipality's building boom is adding supply, but demand from the Atlantic Immigration Pilot and post-secondary institutions continues to outpace construction.",
    ],
  },
  {
    title: 'Dartmouth',
    provinceSlug: 'nova-scotia',
    population: 93671,
    medianRent: 1600,
    vacancyRate: 1.2,
    neighbourhoods: ['Downtown Dartmouth', 'Woodside', 'Cole Harbour'],
    description: [
      "Dartmouth sits across Halifax Harbour, connected to Halifax by the MacDonald and MacKay bridges and the iconic Halifax Transit ferry. Once called 'the City of Lakes,' Dartmouth has emerged as the affordable alternative to Halifax with waterfront revitalization drawing new residents and businesses.",
      "Downtown Dartmouth's Alderney Landing area has seen significant condo and apartment development, capitalizing on ferry access to Halifax's downtown. Woodside and Cole Harbour offer suburban living with established schools and recreational facilities, attracting family renters priced out of Halifax.",
      "At $1,600 median rent and a 1.2% vacancy rate, Dartmouth offers investors lower entry costs than Halifax with comparable occupancy rates. The ongoing King's Wharf development and Portland Street revitalization are adding rental stock and amenities that will further strengthen the Dartmouth market.",
    ],
  },
  {
    title: 'Sydney',
    provinceSlug: 'nova-scotia',
    population: 29904,
    medianRent: 1100,
    vacancyRate: 3.0,
    neighbourhoods: ['Downtown Sydney', 'Whitney Pier', 'Westmount'],
    description: [
      "Sydney is Cape Breton's largest community and the urban centre of the Cape Breton Regional Municipality. Once dominated by steel and coal industries, Sydney is pivoting to education (Cape Breton University), tourism (the Cabot Trail), and a growing international student population that is reshaping the rental landscape.",
      "Downtown Sydney offers affordable heritage properties, while Whitney Pier -- historically a working-class neighbourhood -- is seeing renewal. Westmount provides suburban family housing. Cape Breton University's expansion of international programs has created a new tenant demographic seeking furnished, well-managed rentals.",
      "Sydney's $1,100 median rent and 3.0% vacancy rate reflect a small but evolving market. For investors, the low entry cost combined with growing student and immigrant demand presents an opportunity, provided properties are managed to meet the expectations of a tenant base increasingly accustomed to modern standards.",
    ],
  },
]

// ---------------------------------------------------------------------------
// Batched commit helper
// ---------------------------------------------------------------------------

async function commitBatch(
  sanityClient: typeof client,
  docs: Array<{ _id: string; _type: string; [key: string]: unknown }>,
  batchLabel: string
) {
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
    'Seeding 4 Canadian provinces and ~17 cities...\n'
  )

  // Build province documents
  const provinceDocs: Array<{ _id: string; _type: string; [key: string]: unknown }> = []

  for (const prov of provinces) {
    provinceDocs.push({
      _id: `province-${prov.slug}`,
      _type: 'province',
      title: prov.title,
      slug: { _type: 'slug', current: prov.slug },
      country: 'ca',
      abbreviation: prov.abbreviation,
      description: prov.description,
      seo: {
        metaTitle: prov.seoTitle,
        metaDescription: prov.seoDescription,
      },
      publishing: {
        noindex: false,
        includedInSitemap: true,
      },
    })
  }

  // Build city documents
  const cityDocs: Array<{ _id: string; _type: string; [key: string]: unknown }> = []

  for (const city of cities) {
    const citySlug = toSlug(city.title)

    cityDocs.push({
      _id: `city-${citySlug}`,
      _type: 'city',
      title: city.title,
      slug: { _type: 'slug', current: citySlug },
      province: { _type: 'reference', _ref: `province-${city.provinceSlug}` },
      tier: 2,
      population: city.population,
      medianRent: city.medianRent,
      vacancyRate: city.vacancyRate,
      neighbourhoods: city.neighbourhoods,
      description: city.description.map((p) => textBlock(p)),
      seo: {
        metaTitle: `${city.title} Property Management | MoveSmart Rentals`,
        metaDescription: `Professional property management in ${city.title}. Tenant placement, screening, and rental marketing across ${city.neighbourhoods.slice(0, 3).join(', ')} and more.`,
        keywords: [
          `${city.title.toLowerCase()} property management`,
          `${city.title.toLowerCase()} rental management`,
          `${city.title.toLowerCase()} landlord services`,
          `${city.title.toLowerCase()} tenant placement`,
        ],
      },
      publishing: {
        noindex: false,
        includedInSitemap: true,
      },
    })
  }

  // Commit provinces
  console.log(`Creating ${provinceDocs.length} province documents...`)
  await commitBatch(client, provinceDocs, 'Provinces')

  // Commit cities
  console.log(`\nCreating ${cityDocs.length} city documents...`)
  await commitBatch(client, cityDocs, 'Cities')

  console.log(
    `\nDone! Seeded ${provinceDocs.length} provinces and ${cityDocs.length} cities.`
  )
  console.log(
    'Note: Ontario was already seeded by seed-services.ts -- it is not duplicated here.'
  )
}

main().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
