/**
 * seed-ontario-cities.ts
 *
 * Seeds the Sanity Content Lake with:
 *   - 20 Ontario Tier-1 City documents
 *   - 160 CityService junction documents (20 cities x 8 services)
 *
 * Usage:  npx tsx scripts/seed-ontario-cities.ts
 *
 * Prerequisites:
 *   - Run seed-services.ts first (creates Province and Service documents)
 *   - SANITY_API_WRITE_TOKEN set in .env.local
 *
 * Idempotent: uses createOrReplace with deterministic _id values.
 * Uses batched transactions for efficiency.
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
// Region classification (drives content differentiation)
// ---------------------------------------------------------------------------

type Region =
  | 'gta-core'
  | 'gta-suburb'
  | 'southwestern'
  | 'eastern'
  | 'golden-horseshoe'
  | 'central'

// ---------------------------------------------------------------------------
// City data -- genuinely unique per city
// ---------------------------------------------------------------------------

interface CityData {
  title: string
  population: number
  medianRent: number
  vacancyRate: number
  neighbourhoods: string[]
  region: Region
  transitInfo: string
  description: string[]
  localRegulatory: string
}

const cities: CityData[] = [
  {
    title: 'Toronto',
    population: 2794356,
    medianRent: 2500,
    vacancyRate: 1.4,
    neighbourhoods: [
      'Downtown Core',
      'North York',
      'Scarborough',
      'Etobicoke',
      'York',
    ],
    region: 'gta-core',
    transitInfo:
      'Toronto Transit Commission (TTC) subway, streetcar, and bus network with 4 subway lines, 10+ streetcar routes, and regional GO Transit rail connections',
    description: [
      "Toronto is Canada's largest city and the financial capital of the country, with a rental market driven by immigration, a booming tech sector, and three major universities. The city's 1.4% vacancy rate reflects intense demand across all unit types, from downtown condos to suburban townhouses in Scarborough and Etobicoke.",
      'The Greater Toronto market sees over 100,000 rental transactions annually. Condo rentals dominate the downtown core, while purpose-built rentals are concentrated in North York and Etobicoke. Rental demand peaks in August-September (student influx) and January (corporate relocations).',
      'Property owners in Toronto navigate a complex regulatory environment including the Ontario Residential Tenancies Act, Toronto-specific licensing bylaws for multi-residential buildings, and strict rent increase guidelines. Professional management is not optional here -- it is a competitive necessity.',
    ],
    localRegulatory:
      'Ontario Residential Tenancies Act applies to all residential tenancies. Toronto Multi-Residential Rental Housing Licensing By-law (Chapter 354) requires licensing for buildings with 3+ rental units. Rent Increase Guideline set annually by the province. Disputes resolved through the Landlord and Tenant Board (LTB). Toronto-specific property standards under Chapter 629.',
  },
  {
    title: 'Mississauga',
    population: 717961,
    medianRent: 2200,
    vacancyRate: 1.8,
    neighbourhoods: [
      'City Centre',
      'Streetsville',
      'Port Credit',
      'Meadowvale',
    ],
    region: 'gta-suburb',
    transitInfo:
      'MiWay transit system with express routes and connections to TTC and GO Transit; Hurontario LRT (Hazel McCallion Line) under construction connecting Port Credit GO to Brampton',
    description: [
      "Mississauga is Ontario's third-largest city and a key GTA suburban rental market. The City Centre area around Square One has seen rapid condo development, while established neighbourhoods like Port Credit and Streetsville maintain strong demand for houses and townhome rentals.",
      "The city's rental market is driven by its proximity to Toronto, Pearson International Airport, and major corporate headquarters along the Highway 401 and 403 corridors. Meadowvale and City Centre are particularly popular with young professionals commuting to downtown Toronto via GO Transit.",
      "With over 65,000 rental households, Mississauga's 1.8% vacancy rate signals a landlord-favourable market. Port Credit's waterfront location commands premium rents, while Meadowvale offers more affordable options with excellent transit connectivity.",
    ],
    localRegulatory:
      'Ontario RTA governs all tenancies. Peel Region property standards apply. No municipal licensing bylaw for rental properties (unlike Toronto). Rent Increase Guideline applies to units occupied before November 15, 2018. LTB handles disputes. Peel Regional Police non-emergency line for tenant disturbance issues.',
  },
  {
    title: 'Brampton',
    population: 656480,
    medianRent: 2100,
    vacancyRate: 2.1,
    neighbourhoods: [
      'Downtown Brampton',
      'Bramalea',
      'Heart Lake',
      'Springdale',
    ],
    region: 'gta-suburb',
    transitInfo:
      'Brampton Transit including Zum rapid transit routes; GO Transit connections at Brampton and Mount Pleasant stations; planned extension of Hurontario LRT',
    description: [
      "Brampton is one of Canada's fastest-growing cities, with a young and diverse population that drives strong rental demand. The city has experienced a basement apartment boom, with thousands of secondary suites serving as affordable rental stock for families and newcomers.",
      "Bramalea's apartment corridor along Dixie Road and Queen Street provides the city's largest concentration of purpose-built rentals. Heart Lake and Springdale are newer subdivisions where homeowners frequently rent basement suites, contributing to an active but sometimes informal rental market.",
      "Brampton's 2.1% vacancy rate masks significant variation: purpose-built apartments hover around 1.5%, while secondary suites see higher turnover. Property owners who formalize their rental operations with professional management consistently outperform DIY landlords on tenant retention and rent collection.",
    ],
    localRegulatory:
      'Ontario RTA applies. Brampton Second Unit Registration By-law requires registration of basement apartments and accessory units. Peel Region property standards enforced. Rent Increase Guideline applies to pre-November 2018 tenancies. Brampton Fire Prevention actively inspects registered secondary suites for code compliance.',
  },
  {
    title: 'Hamilton',
    population: 569353,
    medianRent: 1800,
    vacancyRate: 2.5,
    neighbourhoods: [
      'Downtown Hamilton',
      'Dundas',
      'Ancaster',
      'Stoney Creek',
      'Waterdown',
    ],
    region: 'golden-horseshoe',
    transitInfo:
      'Hamilton Street Railway (HSR) bus network; GO Transit rail service from Hunter Street and West Harbour stations to Toronto Union; planned B-Line LRT on King Street',
    description: [
      "Hamilton has transformed from a steel town to a vibrant mixed economy city, and its rental market has followed. McMaster University drives strong student rental demand in the Westdale area, while downtown Hamilton's arts and tech revival has attracted young professionals seeking affordable alternatives to Toronto.",
      "The city's geography -- split between the lower city and the Niagara Escarpment -- creates distinct micro-markets. Downtown and the lower city offer the most affordable rents, while Ancaster, Dundas, and Waterdown (upper mountain/suburban) command premiums for families seeking space and school quality.",
      'Hamilton remains significantly more affordable than GTA markets, with median rents roughly 25-30% below Toronto. This price gap, combined with GO Transit rail access (70-minute commute to Union Station), makes Hamilton a magnet for Toronto-priced-out renters, keeping vacancy rates tight.',
    ],
    localRegulatory:
      'Ontario RTA applies. Hamilton Property Standards By-law (07-170) actively enforced with proactive inspections. Rental Housing Licensing Pilot (Ward 1 and 8) requires licensing for rental properties in designated areas. LTB handles formal disputes. Hamilton Building Division enforces secondary suite requirements under the Ontario Building Code.',
  },
  {
    title: 'Ottawa',
    population: 1017449,
    medianRent: 2000,
    vacancyRate: 2.2,
    neighbourhoods: [
      'Centretown',
      'Kanata',
      'Barrhaven',
      'Orleans',
      'Westboro',
    ],
    region: 'eastern',
    transitInfo:
      'OC Transpo with Confederation Line LRT (east-west), Trillium Line LRT (north-south), and extensive bus rapid transit; no GO Transit connection (separate market from GTA)',
    description: [
      "Ottawa's rental market is uniquely stable, anchored by the federal government workforce that provides consistent, high-credit tenant demand year-round. The city's two LRT lines and planned extensions are reshaping rental desirability, with properties near Confederation Line stations commanding 10-15% premiums.",
      "Centretown and the Glebe provide urban rental stock for government workers and university students, while Kanata's tech park (home to Shopify, Nokia, and BlackBerry QNX) generates strong demand for family-sized rentals. Barrhaven and Orleans serve as affordable suburban options with growing transit connectivity.",
      "Ottawa's bilingual market adds a unique dimension: properties near government campuses in Gatineau-accessible locations attract bilingual tenants willing to pay premiums for convenience. The 2.2% vacancy rate is stable but masks seasonal student-driven fluctuations near Carleton University and the University of Ottawa.",
    ],
    localRegulatory:
      'Ontario RTA applies. Ottawa Rental Housing Property Management By-law (2024-131) requires registration of rental properties with 4+ units. Property standards under By-law 2013-416. Separate from GTA LTB region -- Ottawa falls under the East Region LTB office. Bilingual signage requirements in some municipal communications.',
  },
  {
    title: 'London',
    population: 422324,
    medianRent: 1600,
    vacancyRate: 2.8,
    neighbourhoods: [
      'Downtown London',
      'Byron',
      'Old North',
      'Wortley Village',
    ],
    region: 'southwestern',
    transitInfo:
      'London Transit Commission (LTC) bus network; planned Bus Rapid Transit (BRT) on Richmond and Wellington corridors; no commuter rail connection to GTA',
    description: [
      "London's rental market is dominated by Western University and Fanshawe College, which together bring over 40,000 students into the city each September. The near-campus neighbourhoods of Old North and Broughdale see some of Ontario's highest rental yields, but also the most intensive property management demands.",
      'Beyond the student market, London has quietly grown its tech and digital media sectors, attracting young professionals to the revitalizing downtown core and Wortley Village. Byron, on the western edge, appeals to families with its tree-lined streets and proximity to Springbank Park.',
      "London's 2.8% vacancy rate is the highest among our Ontario Tier-1 cities, reflecting its larger purpose-built apartment stock and seasonal student vacancies. However, well-managed properties in desirable locations maintain sub-1.5% vacancy rates year-round, making professional management the key differentiator.",
    ],
    localRegulatory:
      'Ontario RTA applies. London Residential Rental Units Licensing By-law requires licensing of all rental properties in near-campus zones. Property Standards By-law (PS-2) actively enforced, particularly in student-heavy areas. LTB Southwest Region handles disputes. London Fire Prevention mandates smoke and CO alarm compliance inspections.',
  },
  {
    title: 'Vaughan',
    population: 323103,
    medianRent: 2300,
    vacancyRate: 1.6,
    neighbourhoods: [
      'Woodbridge',
      'Maple',
      'Kleinburg',
      'Thornhill',
      'Concord',
    ],
    region: 'gta-suburb',
    transitInfo:
      'York Region Transit and Viva rapid transit; TTC subway Line 1 extension to Vaughan Metropolitan Centre; GO Transit at Rutherford and Maple stations',
    description: [
      "Vaughan's rental market has matured dramatically since the TTC subway extension to Vaughan Metropolitan Centre (VMC) in 2017. The VMC area is now a high-rise hub with thousands of new condo rentals targeting young professionals who want subway-accessible living outside Toronto's core.",
      "Woodbridge and Kleinburg remain predominantly owner-occupied communities where secondary suites and basement apartments drive the rental supply. Thornhill straddles the Vaughan-Markham border and benefits from proximity to both the TTC subway and Highway 407. Maple's newer subdivisions attract family renters.",
      'With median rents of $2,300 and a tight 1.6% vacancy rate, Vaughan is one of the premium suburban rental markets in the GTA. The combination of subway access, Canada Wonderland employment, and the Vaughan Mills retail corridor creates diversified tenant demand beyond simple Toronto commuters.',
    ],
    localRegulatory:
      'Ontario RTA applies. York Region property standards enforced by municipal bylaw officers. Vaughan Second Suite By-law permits registered secondary suites in single-detached and semi-detached homes. LTB Central-West Region handles disputes. Vaughan Building Standards actively inspects registered second suites for compliance.',
  },
  {
    title: 'Markham',
    population: 338503,
    medianRent: 2200,
    vacancyRate: 1.7,
    neighbourhoods: ['Unionville', 'Markham Village', 'Cornell', 'Berczy'],
    region: 'gta-suburb',
    transitInfo:
      'York Region Transit and Viva Blue rapid transit on Highway 7; GO Transit at Markham and Unionville stations; planned Yonge North Subway Extension',
    description: [
      "Markham is the tech capital of the GTA suburbs, home to over 1,500 technology companies in the Markham Convergence Centre and surrounding business parks. This concentration of tech employment drives rental demand from professionals who prefer short commutes, making Markham's rental market more professionally-oriented than most GTA suburbs.",
      "Unionville's heritage main street and Berczy's family-friendly subdivisions command premium rents, while Cornell and newer areas near Highway 407 offer modern, transit-accessible rentals. Markham's significant Chinese-Canadian population creates demand for specific property features (wok kitchens, multi-generational layouts) that savvy property owners cater to.",
      "With the planned Yonge North Subway Extension promising direct subway service, Markham's rental values are projected to rise further. The current 1.7% vacancy rate and $2,200 median rent position it as a strong investment market for owners willing to maintain properties to the higher standards Markham tenants expect.",
    ],
    localRegulatory:
      'Ontario RTA applies. Markham Second Suite Registration By-law requires registration and inspection of secondary suites. York Region property standards enforced. LTB Central-West Region. Markham Fire and Emergency Services conducts mandatory inspections for registered second suites, requiring hardwired interconnected smoke alarms.',
  },
  {
    title: 'Richmond Hill',
    population: 202022,
    medianRent: 2150,
    vacancyRate: 1.9,
    neighbourhoods: [
      'Oak Ridges',
      'Richmond Hill Centre',
      'Mill Pond',
      'Bayview Hill',
    ],
    region: 'gta-suburb',
    transitInfo:
      'York Region Transit and Viva Blue/Purple routes; GO Transit at Richmond Hill and Langstaff stations; planned Yonge North Subway Extension to Richmond Hill Centre',
    description: [
      "Richmond Hill sits at the geographic centre of York Region, positioned along the Yonge Street corridor that has defined suburban growth north of Toronto for over a century. The planned Yonge North Subway Extension will terminate at Richmond Hill Centre, a transformation that is already driving condo development and rental demand in the surrounding blocks.",
      "Oak Ridges, in the northern part of the city, offers a more rural feel with larger lots and nature trails along the Oak Ridges Moraine. Bayview Hill and Mill Pond provide established residential neighbourhoods where basement suites supplement the limited purpose-built rental stock. Richmond Hill's rental market is characterized by high-quality tenants with strong credit profiles.",
      "The city's 1.9% vacancy rate reflects a market transitioning from purely owner-occupied suburbia to a mixed-tenure community. As Yonge Street densification accelerates, professional property management becomes essential for owners navigating the shift from single-tenant homes to multi-unit condo and townhouse rentals.",
    ],
    localRegulatory:
      'Ontario RTA applies. Richmond Hill Zoning By-law permits second suites in detached and semi-detached homes subject to registration. York Region property standards. LTB Central-West Region. Development charges apply to new secondary suites. Richmond Hill Fire Prevention inspects second suites before occupancy certificate is issued.',
  },
  {
    title: 'Oakville',
    population: 213759,
    medianRent: 2400,
    vacancyRate: 1.5,
    neighbourhoods: [
      'Downtown Oakville',
      'Bronte',
      'Glen Abbey',
      'River Oaks',
    ],
    region: 'golden-horseshoe',
    transitInfo:
      'Oakville Transit local bus network; GO Transit rail at Oakville and Bronte stations with frequent service to Union Station (35-minute express); proximity to QEW and 403 highways',
    description: [
      "Oakville consistently ranks among Canada's most affluent communities, and its rental market reflects that premium positioning. Lakefront properties in Bronte and Downtown Oakville command some of the highest rents in the GTA outside downtown Toronto, driven by executives, foreign-student families, and high-income professionals who prefer the town's top-ranked schools.",
      "Glen Abbey and River Oaks offer spacious family rentals in estate-style subdivisions, while Downtown Oakville's Lakeshore Road corridor has a growing stock of boutique condo rentals above retail. The town's strict heritage conservation districts limit new supply in the most desirable areas, keeping rents elevated.",
      "With a 1.5% vacancy rate and $2,400 median rent, Oakville rewards property owners who invest in maintenance and presentation. Tenants here expect move-in-ready quality, responsive management, and professionally managed lease processes. The bar is high -- but so are the returns.",
    ],
    localRegulatory:
      'Ontario RTA applies. Halton Region property standards actively enforced. Oakville Zoning By-law 2014-014 permits secondary dwelling units subject to registration and building permit. Heritage Conservation District Guidelines restrict exterior modifications in designated areas (Downtown, Old Oakville). LTB Central-West Region handles disputes.',
  },
  {
    title: 'Burlington',
    population: 186948,
    medianRent: 2100,
    vacancyRate: 2.0,
    neighbourhoods: [
      'Downtown Burlington',
      'Aldershot',
      'Tyandaga',
      'Palmer',
    ],
    region: 'golden-horseshoe',
    transitInfo:
      'Burlington Transit local bus network; GO Transit rail at Burlington and Aldershot stations with service to Hamilton and Toronto; proximity to QEW and Highway 403',
    description: [
      "Burlington bridges the Hamilton and GTA markets, offering lakefront living, excellent schools, and a charming downtown core along Brant Street. The city attracts families relocating from Toronto who want to stay within commuting distance via GO Transit while gaining space and affordability.",
      "Downtown Burlington's intensification along Brant Street and Lakeshore Road has introduced mid-rise condo rentals, while Aldershot -- near the Hamilton border and the Royal Botanical Gardens -- provides a mix of older apartment stock and family homes. Tyandaga and Palmer are established residential neighbourhoods with growing secondary suite activity.",
      "Burlington's 2.0% vacancy rate sits at the market equilibrium. Properties that are well-maintained, competitively priced, and marketed across multiple channels rent quickly, while dated units with poor presentation languish. Professional management makes the difference in this discerning market.",
    ],
    localRegulatory:
      'Ontario RTA applies. Halton Region property standards enforced. Burlington Zoning By-law 2020 permits accessory dwelling units in single-detached homes subject to building permit. Downtown Burlington Urban Design Guidelines apply to multi-residential. LTB Central-West Region. Burlington Fire Department inspects accessory units for fire code compliance.',
  },
  {
    title: 'Kitchener',
    population: 270927,
    medianRent: 1700,
    vacancyRate: 2.3,
    neighbourhoods: [
      'Downtown Kitchener',
      'Doon',
      'Forest Heights',
      'Stanley Park',
    ],
    region: 'southwestern',
    transitInfo:
      'Grand River Transit (GRT) with ION LRT running from Conestoga Mall through downtown to Fairview Park Mall; GO Transit bus service to Mississauga and Toronto; planned two-way all-day GO rail',
    description: [
      "Kitchener sits at the heart of the Waterloo Region tech triangle, where Communitech and the ION LRT have catalyzed a downtown renaissance. The city's rental market has evolved from student-heavy to a mix of tech professionals, healthcare workers (Grand River Hospital), and families drawn by affordability compared to GTA markets.",
      "Downtown Kitchener along King Street has seen explosive condo and apartment development since the ION LRT launched in 2019. Doon and Forest Heights provide more affordable rental options, while Stanley Park's proximity to the Huron Natural Area attracts tenants seeking green space without sacrificing urban amenities.",
      "Kitchener's 2.3% vacancy rate is manageable for well-positioned properties. The city's rental market is price-sensitive -- tenants will switch for $50/month savings -- making competitive pricing and professional marketing essential. The planned two-way all-day GO rail service to Toronto will further boost demand.",
    ],
    localRegulatory:
      'Ontario RTA applies. Waterloo Region property standards enforced by municipal bylaw. Kitchener Lodging House Licensing By-law applies to properties renting to 3+ individuals (common in student housing). LTB Southwest Region. Kitchener Residential Rental Housing Licensing By-law (pending) targets properties with chronic bylaw infractions.',
  },
  {
    title: 'Waterloo',
    population: 113520,
    medianRent: 1650,
    vacancyRate: 2.4,
    neighbourhoods: ['Uptown Waterloo', 'Lakeshore', 'Beechwood', 'Columbia'],
    region: 'southwestern',
    transitInfo:
      'Grand River Transit (GRT) with ION LRT serving the University of Waterloo and Wilfrid Laurier corridor; GO Transit bus connections; bike-friendly infrastructure',
    description: [
      "Waterloo is the quintessential university town, home to the University of Waterloo (Canada's top co-op program) and Wilfrid Laurier University. The student rental market is massive and cyclical, with September and January being peak leasing periods. However, Waterloo's tech startup ecosystem has created a year-round professional rental market that smooths seasonal volatility.",
      "Uptown Waterloo along King Street has evolved into a walkable, transit-connected neighbourhood with new condo developments targeting both students and young professionals. The Lakeshore and Beechwood areas offer quieter, family-oriented rentals, while Columbia (near both universities) remains the epicentre of student housing.",
      'Managing rentals in Waterloo requires understanding the student market cycle and maintaining properties to withstand higher-than-average wear. Professional management particularly adds value here through systematic move-in/move-out processes, proactive maintenance, and tenant screening that balances the need for speed (September deadlines) with quality.',
    ],
    localRegulatory:
      'Ontario RTA applies. Waterloo Lodging House Licensing By-law (Chapter 635) actively enforced near university campuses. Waterloo Region property standards apply. Waterloo Residential Rental Licensing By-law requires licensing for rental properties in designated areas. LTB Southwest Region. Waterloo Fire Rescue inspects licensed lodging houses annually.',
  },
  {
    title: 'Cambridge',
    population: 138479,
    medianRent: 1550,
    vacancyRate: 2.6,
    neighbourhoods: ['Galt', 'Preston', 'Hespeler', 'Blair'],
    region: 'southwestern',
    transitInfo:
      'Grand River Transit (GRT) with planned ION LRT Stage 2 extension from Kitchener to Cambridge; GO Transit bus service; Highway 401 access for commuters',
    description: [
      "Cambridge is the most affordable city in the Waterloo Region tri-city area, making it attractive to renters priced out of Kitchener-Waterloo. The city's three historic cores -- Galt, Preston, and Hespeler -- each have distinct character and rental dynamics, from Galt's riverfront heritage buildings to Hespeler's newer suburban development.",
      "Galt's downtown along the Grand River has seen heritage building conversions into unique apartment rentals, attracting tenants who value character over cookie-cutter condos. Preston straddles the Highway 401 corridor, popular with commuters, while Blair on the eastern edge offers rural-adjacent living with the planned ION LRT Stage 2 promising future transit connectivity.",
      "Cambridge's 2.6% vacancy rate is above the regional average, driven by its larger stock of older purpose-built apartments. However, modern or renovated units maintain tight vacancy. The city's lower entry prices make it an attractive market for first-time rental property investors seeking cash-flow-positive returns.",
    ],
    localRegulatory:
      'Ontario RTA applies. Waterloo Region property standards enforced. Cambridge Lodging House By-law applies to multi-tenant houses. Heritage Conservation District designation in Galt core restricts exterior modifications. LTB Southwest Region. ION Stage 2 construction may trigger temporary parking and access restrictions on affected streets.',
  },
  {
    title: 'Guelph',
    population: 143740,
    medianRent: 1700,
    vacancyRate: 2.2,
    neighbourhoods: [
      'Downtown Guelph',
      'Old University',
      'St. Patrick\'s Ward',
      'Exhibition Park',
    ],
    region: 'southwestern',
    transitInfo:
      'Guelph Transit local bus network; GO Transit rail at Guelph Central Station with service to Toronto Union; Highway 6 and 7 access; active cycling infrastructure',
    description: [
      "Guelph is consistently ranked among Ontario's best places to live, and its rental market reflects that desirability. The University of Guelph (renowned for agricultural science and veterinary medicine) drives student demand, while the city's diversified economy (Linamar, Polycon) provides stable professional rental demand year-round.",
      "Downtown Guelph along Wyndham Street maintains a small-city charm with independent shops, restaurants, and heritage buildings converted to apartments. Old University and St. Patrick's Ward, close to the university campus, see strong student demand but also attract young families drawn by walkability and mature tree canopy.",
      'Exhibition Park and the south end offer newer residential subdivisions where secondary suites provide affordable family rentals. Guelph\'s 2.2% vacancy rate and environmentally conscious tenant base mean well-maintained, energy-efficient properties command premiums and experience minimal turnover.',
    ],
    localRegulatory:
      "Ontario RTA applies. Guelph Lodging House Licensing By-law requires licensing for properties with 3+ lodging units. Guelph property standards under By-law 2000-19028. LTB Southwest Region. Guelph's Community Energy Initiative means new rental units may need to meet enhanced energy efficiency standards. Secondary suites require registration and building permit.",
  },
  {
    title: 'Barrie',
    population: 147829,
    medianRent: 1800,
    vacancyRate: 2.7,
    neighbourhoods: [
      'Downtown Barrie',
      'Holly',
      'Painswick',
      'Letitia Heights',
    ],
    region: 'central',
    transitInfo:
      'Barrie Transit local bus network; GO Transit rail at Allandale Waterfront and Barrie South stations with direct service to Toronto Union Station; Highway 400 for vehicle commuters',
    description: [
      "Barrie is the gateway to cottage country and a growing bedroom community for Toronto commuters. The city's rental market has surged in recent years as GTA workers discover that GO Transit rail provides a viable commute (90 minutes to Union Station) at significantly lower housing costs.",
      "Downtown Barrie along the waterfront has attracted new condo development, while Holly and Painswick are established residential areas with a mix of apartment buildings and secondary suites. Letitia Heights, on the city's south side near Georgian College, benefits from student and young professional demand.",
      "Barrie's 2.7% vacancy rate is higher than GTA markets but declining as population growth outpaces new construction. Georgian College and the Royal Victoria Regional Health Centre are major local employers that generate steady tenant demand outside the commuter population. Waterfront proximity drives summer premium pricing for short-term rentals.",
    ],
    localRegulatory:
      'Ontario RTA applies. Barrie Zoning By-law permits secondary suites in single and semi-detached dwellings. Barrie Property Standards By-law 2011-062. LTB Central-East Region. Barrie Short-Term Rental By-law requires licensing for properties listed on platforms like Airbnb (separate from long-term RTA tenancies). Barrie Building Department inspects new secondary suites.',
  },
  {
    title: 'Milton',
    population: 132979,
    medianRent: 2000,
    vacancyRate: 1.8,
    neighbourhoods: [
      'Downtown Milton',
      'Old Milton',
      'Bristol',
      'Willmott',
    ],
    region: 'gta-suburb',
    transitInfo:
      'Milton Transit local bus network; GO Transit rail at Milton station with rush-hour service to Toronto Union; Highway 401 and 407 access; planned all-day two-way GO service',
    description: [
      "Milton has been one of Canada's fastest-growing communities for two decades, transforming from a small Halton Hills town into a suburban city of over 130,000. This rapid growth has created a rental market characterized by newer housing stock, family-oriented tenants, and a significant secondary suite market in the sprawling suburban subdivisions.",
      "Old Milton and Downtown Milton retain small-town heritage charm, while Bristol and Willmott represent the newer subdivisions that house the majority of the population. The planned expansion to all-day two-way GO rail service will significantly boost Milton's appeal to Toronto commuters, driving further rental demand.",
      'Milton\'s 1.8% vacancy rate reflects its desirability among GTA families seeking space, good schools, and relative affordability. The Escarpment setting and proximity to Kelso Conservation Area add a lifestyle premium. Tenant turnover is lower than average because families "settle" once they find the right home and school community.',
    ],
    localRegulatory:
      'Ontario RTA applies. Halton Region property standards enforced. Milton Zoning By-law permits additional residential units (ARUs) in single-detached homes subject to registration and building permit. Halton Hills Conservation Authority regulations apply near the Escarpment. LTB Central-West Region. Milton Fire Department inspects registered ARUs.',
  },
  {
    title: 'Oshawa',
    population: 175383,
    medianRent: 1700,
    vacancyRate: 2.9,
    neighbourhoods: [
      'Downtown Oshawa',
      'Windfields',
      'McLaughlin',
      'Samac',
    ],
    region: 'gta-suburb',
    transitInfo:
      'Durham Region Transit (DRT) local bus service; GO Transit rail at Oshawa station with frequent service to Toronto Union; Highway 401 and 407 East access',
    description: [
      "Oshawa is Durham Region's largest city and the eastern anchor of the GTA's rental market. Historically tied to GM Canada's manufacturing operations, the city has diversified with Ontario Tech University, Lakeridge Health, and a growing logistics sector along the 401 corridor driving new rental demand.",
      "Downtown Oshawa has seen revitalization efforts including new student housing for Ontario Tech and Durham College. Windfields, built on the former GM headquarters lands, is one of the GTA's newest residential communities with modern homes. McLaughlin and Samac offer more established, affordable rental options.",
      "Oshawa's 2.9% vacancy rate is the highest among GTA markets, reflecting its larger supply of older purpose-built apartments and competition from newer units in neighbouring Whitby. However, the price differential (30-35% below Toronto rents) attracts a steady stream of tenants seeking the best value within GO Transit commuting range.",
    ],
    localRegulatory:
      'Ontario RTA applies. Durham Region property standards enforced. Oshawa Second Suite By-law permits secondary suites in single-detached homes subject to building permit. Oshawa Property Standards By-law 1-2002. LTB Central-East Region. Oshawa Fire Services inspects registered second suites. Downtown Community Improvement Plan may offer incentives for rental property upgrades.',
  },
  {
    title: 'Ajax',
    population: 126666,
    medianRent: 2050,
    vacancyRate: 2.0,
    neighbourhoods: [
      'Ajax Downtown',
      'Pickering Village',
      'Westney Heights',
      'South Ajax',
    ],
    region: 'gta-suburb',
    transitInfo:
      'Durham Region Transit (DRT) with connections to TTC; GO Transit rail at Ajax station with frequent service to Toronto Union (45-minute commute); Highway 401 access',
    description: [
      "Ajax is a family-oriented Durham Region community that punches above its weight in the rental market. Its 45-minute GO Transit commute to Union Station, excellent schools, and lakefront parks make it particularly attractive to families relocating from Toronto. The Pickering Village heritage area adds small-town character to an otherwise suburban landscape.",
      "Westney Heights and South Ajax feature predominantly single-family homes where secondary suites provide the bulk of the rental inventory. Ajax Downtown is evolving with mixed-use development near the GO station, introducing purpose-built rental apartments that are new to the local market.",
      "With a 2.0% vacancy rate and $2,050 median rent, Ajax occupies the sweet spot between GTA pricing and suburban livability. Tenant retention rates are among the highest in Durham Region -- families who settle in Ajax tend to stay. This stability rewards property owners who invest in quality maintenance and responsive management.",
    ],
    localRegulatory:
      'Ontario RTA applies. Durham Region property standards enforced. Ajax Secondary Suite By-law permits one secondary suite per single-detached dwelling, subject to building permit and fire inspection. Ajax Property Standards By-law 46-2010. LTB Central-East Region. Ajax waterfront development area has specific density and design requirements for rental projects.',
  },
  {
    title: 'Pickering',
    population: 99186,
    medianRent: 2100,
    vacancyRate: 1.9,
    neighbourhoods: [
      'Pickering Town Centre',
      'Bay Ridges',
      'Liverpool',
      'Dunbarton',
    ],
    region: 'gta-suburb',
    transitInfo:
      'Durham Region Transit (DRT); GO Transit rail at Pickering station with express service to Union Station (40 minutes); Highway 401 access; planned Durham-Scarborough BRT',
    description: [
      "Pickering is the western gateway to Durham Region and one of the GTA's best-connected suburban markets. The Pickering GO station provides 40-minute express service to Union Station, while the planned Pickering City Centre development will transform the area around the Town Centre into a high-density, transit-oriented community.",
      "Bay Ridges, along the Lake Ontario waterfront, commands premium rents for its beach access, waterfront trail, and proximity to the Nautical Village shops and restaurants. Liverpool and Dunbarton offer quiet, family-oriented residential streets with mature trees and established community infrastructure.",
      "Pickering's 1.9% vacancy rate and $2,100 median rent reflect its dual appeal: GTA commuters who value the short GO ride and local workers employed at the Pickering Nuclear Generating Station, Ontario Power Generation, and Durham Region Police headquarters. This diversified tenant base protects against single-employer risk.",
    ],
    localRegulatory:
      'Ontario RTA applies. Durham Region property standards enforced. Pickering Zoning By-law permits additional dwelling units in detached and semi-detached homes. Pickering Property Standards By-law 6443/05. LTB Central-East Region. Pickering Nuclear Emergency Response Plan zones may have specific insurance or disclosure requirements for nearby rental properties.',
  },
]

// ---------------------------------------------------------------------------
// Service definitions (references seed-services.ts IDs)
// ---------------------------------------------------------------------------

interface ServiceRef {
  id: string
  slug: string
  title: string
  headlineVerbs: string[] // cycle through for variation
  painPoints: Array<{ problem: string; solution: string }>
  benefits: Array<{ title: string; description: string; icon?: string }>
  howItWorks: Array<{ stepNumber: number; title: string; description: string }>
  faqTemplates: Array<{ question: string; answer: string }>
}

const serviceRefs: ServiceRef[] = [
  {
    id: 'service-tenant-placement',
    slug: 'tenant-placement',
    title: 'Tenant Placement',
    headlineVerbs: [
      'Professional',
      'Expert',
      'Fast',
      'Trusted',
      'Reliable',
      'Premier',
      'Top-Rated',
      'Qualified',
    ],
    painPoints: [
      {
        problem: 'Vacant units losing rental income every day',
        solution:
          'Our multi-channel marketing fills vacancies in an average of 14 days',
      },
      {
        problem: 'Unqualified applicants wasting your time with showings',
        solution:
          'Pre-screening filters out unqualified applicants before any showing is scheduled',
      },
      {
        problem: 'Risk of placing a tenant who damages property or stops paying',
        solution:
          'Five-point screening with credit, employment, and landlord reference checks',
      },
    ],
    benefits: [
      {
        title: 'Faster Placement',
        description:
          'Average 14-day placement through MLS, portals, and targeted marketing',
        icon: 'zap',
      },
      {
        title: 'Qualified Tenants',
        description:
          'Every applicant screened for credit, income, and rental history',
        icon: 'shield-check',
      },
      {
        title: 'Zero Vacancy Loss',
        description:
          'Strategic listing timing and pricing to minimize days on market',
        icon: 'trending-up',
      },
      {
        title: 'Full-Service Support',
        description:
          'From photography to lease signing, we manage every step',
        icon: 'users',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Assessment',
        description:
          'We evaluate your property, recommend pricing, and prepare it for listing',
      },
      {
        stepNumber: 2,
        title: 'Marketing Launch',
        description:
          'Professional photos and listing distributed across 30+ channels',
      },
      {
        stepNumber: 3,
        title: 'Screening & Showings',
        description:
          'Pre-qualified applicants are shown the property and screened',
      },
      {
        stepNumber: 4,
        title: 'Lease Signing',
        description:
          'Selected tenant signs an RTA-compliant lease and moves in',
      },
    ],
    faqTemplates: [
      {
        question: 'How quickly can you place a tenant in {city}?',
        answer:
          'In {city}, our average placement time is {placementDays} days. {marketContext}',
      },
      {
        question:
          'What rental price should I set for my property in {city}?',
        answer:
          'Based on current {city} market data, the median rent is ${medianRent}/month. We provide a free comparative market analysis factoring in your specific neighbourhood ({neighbourhoods}), unit size, and condition to recommend optimal pricing.',
      },
      {
        question:
          'Do you handle showings in all {city} neighbourhoods?',
        answer:
          'Yes, we conduct showings across all {city} neighbourhoods including {neighbourhoods}. Our local team knows the transit routes, parking, and access points to coordinate efficient showing schedules.',
      },
    ],
  },
  {
    id: 'service-leasing-services',
    slug: 'leasing-services',
    title: 'Leasing Services',
    headlineVerbs: [
      'Comprehensive',
      'Full-Service',
      'Expert',
      'Professional',
      'Streamlined',
      'Seamless',
      'Efficient',
      'Complete',
    ],
    painPoints: [
      {
        problem: 'Lease agreements that miss critical clauses or violate the RTA',
        solution:
          'Ontario Standard Lease form with legally reviewed custom schedules',
      },
      {
        problem: 'Rent increase notices served incorrectly, leading to LTB challenges',
        solution:
          'Guideline-calculated N1 notices served with proper 90-day lead time',
      },
      {
        problem: 'No documentation of unit condition at move-in',
        solution:
          'Timestamped condition reports with photos protect against deposit disputes',
      },
    ],
    benefits: [
      {
        title: 'RTA Compliance',
        description:
          'Every lease fully compliant with Ontario Residential Tenancies Act',
        icon: 'shield',
      },
      {
        title: 'Digital Signing',
        description:
          'Electronic lease execution reduces turnaround from weeks to hours',
        icon: 'pen-tool',
      },
      {
        title: 'Renewal Management',
        description:
          'Automated 90-day renewal tracking with rent increase calculations',
        icon: 'calendar',
      },
      {
        title: 'Condition Reports',
        description:
          'Detailed move-in/move-out documentation with timestamped photos',
        icon: 'camera',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Lease Drafting',
        description:
          'We prepare an Ontario Standard Lease with property-specific schedules',
      },
      {
        stepNumber: 2,
        title: 'Review & Signing',
        description:
          'Both parties review and sign electronically with full audit trail',
      },
      {
        stepNumber: 3,
        title: 'Condition Report',
        description:
          'Detailed unit walkthrough with photos before tenant moves in',
      },
      {
        stepNumber: 4,
        title: 'Ongoing Management',
        description:
          'Renewals, increases, and amendments tracked and executed on schedule',
      },
    ],
    faqTemplates: [
      {
        question:
          'Are your leases compliant with Ontario law for {city} properties?',
        answer:
          'Yes. Every lease we draft uses the Ontario Standard Lease form as required by the RTA. For {city} properties, we also account for any municipal bylaws specific to the area. {regulatoryNote}',
      },
      {
        question:
          'How do you handle lease renewals in {city}?',
        answer:
          "We track every lease expiry date and initiate renewal discussions 90 days in advance. For {city}'s competitive market (vacancy rate: {vacancyRate}%), timely renewals are critical to retaining quality tenants and avoiding turnover costs.",
      },
      {
        question:
          'Can I add custom rules for my {city} rental property?',
        answer:
          'Absolutely. While the Ontario Standard Lease is mandatory, we add lawful schedules covering property-specific rules. For {city} properties, common additions include {customRules}.',
      },
    ],
  },
  {
    id: 'service-tenant-screening',
    slug: 'tenant-screening',
    title: 'Tenant Screening',
    headlineVerbs: [
      'Thorough',
      'Comprehensive',
      'Rigorous',
      'Detailed',
      'Professional',
      'In-Depth',
      'Trusted',
      'Advanced',
    ],
    painPoints: [
      {
        problem:
          'Basic credit checks missing red flags like eviction history and fraud',
        solution:
          'Five-point verification including LTB eviction record search',
      },
      {
        problem:
          'Taking tenant claims at face value without independent verification',
        solution:
          'Independent employment, income, and previous landlord verification',
      },
      {
        problem:
          'Screening process so slow that good tenants accept other offers',
        solution: '24-48 hour turnaround keeps you competitive',
      },
    ],
    benefits: [
      {
        title: 'Five-Point Verification',
        description:
          'Credit, employment, references, ID, and eviction history',
        icon: 'check-circle',
      },
      {
        title: 'Fast Turnaround',
        description: 'Complete screening results in 24-48 hours',
        icon: 'clock',
      },
      {
        title: 'Legal Compliance',
        description: 'PIPEDA and Ontario Human Rights Code compliant',
        icon: 'scale',
      },
      {
        title: 'Clear Recommendations',
        description:
          'Standardized report card with scoring and risk assessment',
        icon: 'bar-chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Application Collection',
        description:
          'Applicant completes our standardized application with consent forms',
      },
      {
        stepNumber: 2,
        title: 'Background Checks',
        description:
          'Credit pull, employment verification, and landlord references',
      },
      {
        stepNumber: 3,
        title: 'Report Generation',
        description:
          'Standardized report card with scores across all five categories',
      },
      {
        stepNumber: 4,
        title: 'Recommendation',
        description:
          'Clear approve/decline recommendation with supporting evidence',
      },
    ],
    faqTemplates: [
      {
        question:
          'What does your tenant screening check for {city} applicants?',
        answer:
          'Our five-point screening for {city} applicants includes: Equifax credit check, employment and income verification, two previous landlord references, government ID verification, and LTB eviction history search. {localContext}',
      },
      {
        question:
          'How do you verify employment for applicants in {city}?',
        answer:
          "We contact employers directly to verify position, salary, and tenure. For {city}'s {employmentContext}, we verify through HR departments, pay stubs, and CRA Notice of Assessment when self-employment is involved.",
      },
      {
        question:
          'Is your screening process legal under Ontario privacy laws?',
        answer:
          'Yes. We obtain written consent before every check, comply with PIPEDA and the Ontario Human Rights Code, and never use prohibited grounds in our evaluations. All data is securely stored and retained per privacy regulations.',
      },
    ],
  },
  {
    id: 'service-rent-guarantee',
    slug: 'rent-guarantee',
    title: 'Rent Guarantee',
    headlineVerbs: [
      'Guaranteed',
      'Protected',
      'Secured',
      'Risk-Free',
      'Assured',
      'Reliable',
      'Worry-Free',
      'Dependable',
    ],
    painPoints: [
      {
        problem:
          'Sleepless nights worrying about whether rent will arrive on time',
        solution:
          'Guaranteed deposit to your account on the same date every month',
      },
      {
        problem: 'Costly and time-consuming LTB eviction proceedings',
        solution:
          'We handle all arrears collection and LTB filings on your behalf',
      },
      {
        problem:
          'Cash flow disruptions making mortgage payments stressful',
        solution:
          'Uninterrupted income stream regardless of tenant payment behaviour',
      },
    ],
    benefits: [
      {
        title: 'Guaranteed Income',
        description:
          'Full rent deposited to your account every month, on time',
        icon: 'banknote',
      },
      {
        title: 'Zero Collection Hassle',
        description: 'We handle arrears, notices, and LTB filings',
        icon: 'shield',
      },
      {
        title: 'Higher Net Returns',
        description:
          'Average 4-6% higher annual returns vs self-managed properties',
        icon: 'trending-up',
      },
      {
        title: 'No Claim Process',
        description: 'Internal reserve fund means instant coverage, no paperwork',
        icon: 'zap',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Enhanced Screening',
        description:
          'Tenant passes our enhanced screening tier for guarantee eligibility',
      },
      {
        stepNumber: 2,
        title: 'Enrollment',
        description:
          'Property enrolled in the rent guarantee program with clear terms',
      },
      {
        stepNumber: 3,
        title: 'Monthly Deposits',
        description:
          'Full rent deposited to your account on the agreed date, every month',
      },
      {
        stepNumber: 4,
        title: 'Arrears Management',
        description:
          'If arrears occur, we manage collections and legal proceedings',
      },
    ],
    faqTemplates: [
      {
        question:
          'How does the rent guarantee work for {city} properties?',
        answer:
          "Once your {city} property is enrolled, we deposit the full monthly rent to your account on the agreed date regardless of tenant payment. With {city}'s {vacancyRate}% vacancy rate and median rent of ${medianRent}, the guarantee protects your investment in a competitive market.",
      },
      {
        question:
          'What if my {city} tenant stops paying rent?',
        answer:
          'Your guaranteed payments continue uninterrupted. We handle all arrears collection and, if necessary, LTB proceedings. {city} falls under the LTB {ltbRegion} Region, and our team is experienced with local hearing schedules and procedures.',
      },
      {
        question:
          'Is there additional cost for the rent guarantee in {city}?',
        answer:
          'The rent guarantee is a premium service with transparent pricing disclosed upfront. For {city} properties, the fee is structured as a small percentage of monthly rent. Contact us for an exact quote based on your property details.',
      },
    ],
  },
  {
    id: 'service-rental-preparation',
    slug: 'rental-preparation',
    title: 'Rental Preparation',
    headlineVerbs: [
      'Professional',
      'Premium',
      'Move-In Ready',
      'Turnkey',
      'Expert',
      'Quality',
      'Complete',
      'Full-Service',
    ],
    painPoints: [
      {
        problem:
          'Dated, poorly presented properties sitting vacant for months',
        solution:
          'Professional staging and photography that rent properties 23% faster',
      },
      {
        problem:
          'Coordinating multiple trades for cleaning, repairs, and painting',
        solution:
          'One-stop service with trusted trades managed on your behalf',
      },
      {
        problem:
          'Amateur listing photos that fail to attract qualified tenants',
        solution:
          'HDR photography, virtual tours, and twilight shots for premium listings',
      },
    ],
    benefits: [
      {
        title: 'Faster Rentals',
        description: 'Prepared properties rent 23% faster on average',
        icon: 'zap',
      },
      {
        title: 'Higher Rents',
        description: '8-12% higher monthly rents with professional presentation',
        icon: 'dollar-sign',
      },
      {
        title: 'Professional Photography',
        description:
          'Wide-angle, HDR photos and virtual tours included',
        icon: 'camera',
      },
      {
        title: 'Trusted Trades',
        description: 'Vetted cleaners, painters, and staging professionals',
        icon: 'tool',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Property Walkthrough',
        description:
          'We assess the property and recommend preparation scope',
      },
      {
        stepNumber: 2,
        title: 'Cleaning & Repairs',
        description:
          'Deep cleaning, painting, and minor repairs by trusted trades',
      },
      {
        stepNumber: 3,
        title: 'Staging',
        description:
          'Strategic staging with our furnishing inventory for optimal photos',
      },
      {
        stepNumber: 4,
        title: 'Professional Photography',
        description:
          'HDR photos, virtual tour, and floor plans ready for listing',
      },
    ],
    faqTemplates: [
      {
        question:
          'What does rental preparation include for {city} properties?',
        answer:
          "Our {city} preparation package covers deep cleaning, minor repairs, staging with our furnishing inventory, and professional photography. For {city}'s {marketPosition} market, professional presentation is essential to attract quality tenants willing to pay ${medianRent}+/month.",
      },
      {
        question:
          'How long does rental preparation take in {city}?',
        answer:
          'Standard preparation takes 3-5 business days in {city}. Rush service (2 days) is available. We coordinate around tenant move-out dates and can begin same-day for urgent vacancies in {neighbourhoods}.',
      },
      {
        question:
          'Is staging really worth it for rentals in {city}?',
        answer:
          'Absolutely. In {city}, staged properties rent 23% faster and command 8-12% higher rents. With a {vacancyRate}% vacancy rate, every day on market costs you approximately ${dailyCost} in lost rent. Staging pays for itself within the first month.',
      },
    ],
  },
  {
    id: 'service-rental-marketing',
    slug: 'rental-marketing',
    title: 'Rental Marketing',
    headlineVerbs: [
      'Multi-Channel',
      'Strategic',
      'Targeted',
      'Effective',
      'Data-Driven',
      'Results-Driven',
      'Powerful',
      'Comprehensive',
    ],
    painPoints: [
      {
        problem:
          'Listing on one portal and hoping for the best',
        solution:
          'Syndication across 30+ channels including MLS, Kijiji, and social media',
      },
      {
        problem:
          'Generic listing descriptions that blend in with thousands of others',
        solution:
          'SEO-optimized, neighbourhood-specific copy that stands out in search',
      },
      {
        problem:
          'Spending hours fielding unqualified inquiries and no-show viewings',
        solution:
          'Pre-qualification filters and 2-hour response time on all inquiries',
      },
    ],
    benefits: [
      {
        title: '30+ Channels',
        description: 'MLS, Kijiji, Facebook, Zumper, PadMapper, and more',
        icon: 'megaphone',
      },
      {
        title: 'SEO-Optimized Listings',
        description:
          'Neighbourhood-specific copy that ranks in local search results',
        icon: 'search',
      },
      {
        title: '60% Lower CPL',
        description:
          'Bulk media buying delivers 60% lower cost-per-lead than DIY',
        icon: 'trending-down',
      },
      {
        title: 'Real-Time Analytics',
        description:
          'Track impressions, inquiries, and showings on your dashboard',
        icon: 'bar-chart',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Listing Creation',
        description:
          'SEO-optimized listing with professional photos and neighbourhood context',
      },
      {
        stepNumber: 2,
        title: 'Multi-Channel Syndication',
        description: 'Simultaneous distribution across 30+ platforms',
      },
      {
        stepNumber: 3,
        title: 'Inquiry Management',
        description:
          'All inquiries handled within 2 hours, pre-qualified by phone',
      },
      {
        stepNumber: 4,
        title: 'Performance Optimization',
        description:
          'Weekly A/B testing of headlines and photos to maximize results',
      },
    ],
    faqTemplates: [
      {
        question:
          'Which platforms do you list {city} properties on?',
        answer:
          'We syndicate {city} listings across 30+ platforms: MLS (via {mlsBoard}), Kijiji, Facebook Marketplace, Zumper, PadMapper, Rentals.ca, and our website. For {city} specifically, we also target {localChannels}.',
      },
      {
        question:
          'How do you market rentals in specific {city} neighbourhoods?',
        answer:
          'Each {city} listing includes neighbourhood-specific copy referencing local amenities, transit ({transitNote}), and school ratings for {neighbourhoods}. We geo-target ads to reach tenants actively searching in these areas.',
      },
      {
        question:
          'Can I see marketing performance for my {city} property?',
        answer:
          'Yes. Your owner portal includes a real-time dashboard showing impressions, inquiries, and showings across all channels. We send weekly performance summaries. In {city}, our average listing receives {avgInquiries} inquiries in the first week.',
      },
    ],
  },
  {
    id: 'service-portal-technology',
    slug: 'portal-technology',
    title: 'Portal Technology',
    headlineVerbs: [
      'Smart',
      'Modern',
      'Digital',
      'Advanced',
      'Innovative',
      'Seamless',
      'Connected',
      'Intelligent',
    ],
    painPoints: [
      {
        problem:
          'Managing properties through scattered spreadsheets and text messages',
        solution:
          'Centralized portal for financials, maintenance, and communications',
      },
      {
        problem:
          'Tenants calling at all hours with maintenance requests you forget to track',
        solution:
          '24/7 maintenance request submission with automated tracking and updates',
      },
      {
        problem:
          'Tax time scramble to assemble rental income and expense records',
        solution:
          'Real-time financial reports and downloadable tax-ready statements',
      },
    ],
    benefits: [
      {
        title: '24/7 Access',
        description:
          'Manage your property from anywhere, on any device',
        icon: 'monitor',
      },
      {
        title: 'Financial Dashboard',
        description:
          'Real-time income, expenses, and tax-ready reports',
        icon: 'bar-chart',
      },
      {
        title: 'Maintenance Tracking',
        description:
          'Submit, track, and resolve maintenance requests digitally',
        icon: 'tool',
      },
      {
        title: 'Secure Communications',
        description:
          'In-app messaging between owners, tenants, and management',
        icon: 'message-circle',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Account Setup',
        description:
          'We create your owner and tenant portal accounts during onboarding',
      },
      {
        stepNumber: 2,
        title: 'Property Profile',
        description:
          'Your property details, lease terms, and documents are uploaded',
      },
      {
        stepNumber: 3,
        title: 'Daily Management',
        description:
          'Track financials, maintenance, and communications in real time',
      },
    ],
    faqTemplates: [
      {
        question:
          'Can I access the portal for my {city} property from my phone?',
        answer:
          'Yes. The portal is fully responsive and available on iOS, Android, and web browsers. Whether you are in {city} or travelling, you have full access to your property financials, maintenance requests, and tenant communications.',
      },
      {
        question:
          'How do tenants in {city} submit maintenance requests?',
        answer:
          'Tenants log into their portal, describe the issue, attach photos, and submit. The request is automatically categorized, assigned to a tradesperson in the {city} area, and tracked until resolved. Both you and the tenant receive status updates.',
      },
      {
        question:
          'Is my financial data for {city} properties secure?',
        answer:
          'Absolutely. We use AES-256 encryption, TLS 1.3, and two-factor authentication. All financial data for your {city} properties is stored in SOC 2 compliant infrastructure with annual third-party security audits.',
      },
    ],
  },
  {
    id: 'service-pricing',
    slug: 'pricing',
    title: 'Pricing',
    headlineVerbs: [
      'Transparent',
      'Clear',
      'Honest',
      'Straightforward',
      'Simple',
      'Fair',
      'No-Surprise',
      'Upfront',
    ],
    painPoints: [
      {
        problem:
          'Hidden fees that inflate the cost of property management services',
        solution:
          'One transparent success fee with no hidden charges or add-ons',
      },
      {
        problem:
          'Paying monthly retainers even when your property is vacant',
        solution:
          'Success-based pricing: you pay nothing until a tenant is placed',
      },
      {
        problem:
          'Unclear pricing that makes comparing services impossible',
        solution:
          'All-inclusive fee disclosed upfront before any work begins',
      },
    ],
    benefits: [
      {
        title: 'Zero Upfront Cost',
        description: 'No listing fees, no marketing fees, no retainers',
        icon: 'dollar-sign',
      },
      {
        title: 'All-Inclusive',
        description:
          'Photography, marketing, screening, and leasing included',
        icon: 'package',
      },
      {
        title: 'Success-Based',
        description: 'Pay only when we place a qualified tenant',
        icon: 'check-circle',
      },
      {
        title: 'Volume Discounts',
        description:
          'Tiered pricing for multi-property portfolios',
        icon: 'layers',
      },
    ],
    howItWorks: [
      {
        stepNumber: 1,
        title: 'Free Consultation',
        description:
          'We assess your property and provide a transparent fee quote',
      },
      {
        stepNumber: 2,
        title: 'Service Agreement',
        description:
          'Sign a clear agreement with all fees disclosed upfront',
      },
      {
        stepNumber: 3,
        title: 'Full Service Delivery',
        description: 'We execute all services with no additional charges',
      },
      {
        stepNumber: 4,
        title: 'Success Fee',
        description:
          'Single fee charged only upon successful tenant placement',
      },
    ],
    faqTemplates: [
      {
        question: 'What does tenant placement cost in {city}?',
        answer:
          "Our {city} success fee is a percentage of the first month's rent, disclosed before we begin. With {city}'s median rent of ${medianRent}/month, you know your exact cost upfront. No hidden fees for photography, marketing, or screening.",
      },
      {
        question: 'Do I pay if you cannot find a tenant for my {city} property?',
        answer:
          "No. Our success-based model means you pay nothing until a qualified tenant signs a lease. In {city}'s market ({vacancyRate}% vacancy rate), we consistently place tenants within {placementDays} days.",
      },
      {
        question:
          'Are there discounts for multiple properties in {city}?',
        answer:
          'Yes. We offer tiered volume pricing for owners with 2+ units in {city} or across multiple Ontario cities. Portfolio clients with 10+ units qualify for custom annual management agreements with predictable monthly costs.',
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Region-specific context generators
// ---------------------------------------------------------------------------

function getRegionContext(region: Region): {
  mlsBoard: string
  localChannels: string
  employmentContext: string
  customRules: string
  ltbRegion: string
  marketPosition: string
} {
  switch (region) {
    case 'gta-core':
      return {
        mlsBoard: 'TRREB',
        localChannels: 'Toronto-specific Facebook groups and Instagram geo-targeting',
        employmentContext: 'diverse economy spanning finance, tech, healthcare, and education sectors',
        customRules: 'condo board rules, parking allocation, locker access, and visitor parking policies',
        ltbRegion: 'Toronto South',
        marketPosition: 'premium',
      }
    case 'gta-suburb':
      return {
        mlsBoard: 'TRREB',
        localChannels: 'community Facebook groups and neighbourhood-specific Instagram campaigns',
        employmentContext: 'mix of local employment and GTA commuter professionals',
        customRules: 'secondary suite-specific rules, separate entrance protocols, and parking assignments',
        ltbRegion: 'Central-West',
        marketPosition: 'competitive',
      }
    case 'southwestern':
      return {
        mlsBoard: 'LSTAR / KW Association of Realtors',
        localChannels: 'university housing boards, local Facebook marketplace, and Kijiji regional targeting',
        employmentContext: 'university, tech startup, and manufacturing sectors',
        customRules: 'student-specific occupancy limits, academic year lease terms, and parking restrictions',
        ltbRegion: 'Southwest',
        marketPosition: 'value-oriented',
      }
    case 'eastern':
      return {
        mlsBoard: 'OREB',
        localChannels: 'government relocation boards, Ottawa-specific Facebook groups, and bilingual listing platforms',
        employmentContext: 'federal government, tech (Kanata North), and healthcare sectors',
        customRules: 'government relocation clause, bilingual communication preferences, and diplomatic lease terms',
        ltbRegion: 'East',
        marketPosition: 'stable',
      }
    case 'golden-horseshoe':
      return {
        mlsBoard: 'RAHB / OMDREB',
        localChannels: 'Hamilton/Burlington community groups and GO Transit commuter forums',
        employmentContext: 'healthcare, manufacturing, and education sectors with growing tech presence',
        customRules: 'heritage property maintenance obligations, GO parking pass protocols, and garden maintenance responsibilities',
        ltbRegion: 'Central-West',
        marketPosition: 'growing',
      }
    case 'central':
      return {
        mlsBoard: 'BDAR',
        localChannels: 'Barrie community Facebook groups and seasonal tourism platforms',
        employmentContext: 'healthcare, education, and retail sectors with significant Toronto commuter population',
        customRules: 'seasonal use restrictions, snow removal responsibilities, and short-term rental prohibitions',
        ltbRegion: 'Central-East',
        marketPosition: 'emerging',
      }
  }
}

// ---------------------------------------------------------------------------
// Content generators for CityService documents
// ---------------------------------------------------------------------------

function generateHeroSubheadline(
  city: CityData,
  service: ServiceRef,
  regionCtx: ReturnType<typeof getRegionContext>
): string {
  const templates: Record<string, string[]> = {
    'tenant-placement': [
      `Fill your ${city.title} rental in as few as 14 days with our proven multi-channel marketing strategy`,
      `Qualified tenants for your ${city.title} property through MLS syndication and ${city.neighbourhoods.length}+ neighbourhood targeting`,
    ],
    'leasing-services': [
      `RTA-compliant lease management for ${city.title} property owners -- from drafting through renewal`,
      `Ontario Standard Lease preparation with ${city.title}-specific schedules and electronic signing`,
    ],
    'tenant-screening': [
      `Five-point tenant verification for ${city.title} landlords -- results in 24-48 hours`,
      `Comprehensive credit, employment, and reference checks for your ${city.title} rental applicants`,
    ],
    'rent-guarantee': [
      `Guaranteed monthly rent for your ${city.title} property -- even when tenants miss payments`,
      `Protect your ${city.title} rental income with our reserve-backed rent guarantee program`,
    ],
    'rental-preparation': [
      `Professional cleaning, staging, and photography for ${city.title} rentals -- rent 23% faster`,
      `Transform your ${city.title} property into a move-in-ready showpiece that commands top rents`,
    ],
    'rental-marketing': [
      `30+ channel marketing for your ${city.title} rental including ${regionCtx.mlsBoard} MLS syndication`,
      `Multi-channel listing distribution targeting ${city.title}'s most active renter demographics`,
    ],
    'portal-technology': [
      `Manage your ${city.title} rental property from anywhere with our digital owner portal`,
      `24/7 digital access to financials, maintenance, and tenant communications for ${city.title} properties`,
    ],
    'pricing': [
      `Transparent, success-based fees for ${city.title} property management -- zero upfront cost`,
      `No hidden fees, no retainers -- pay only when we place a tenant in your ${city.title} property`,
    ],
  }

  const options = templates[service.slug] || [
    `Professional ${service.title.toLowerCase()} for ${city.title} property owners`,
  ]
  // Use city population as seed for deterministic selection
  return options[city.population % options.length]
}

function generateLocalBody(
  city: CityData,
  service: ServiceRef,
  regionCtx: ReturnType<typeof getRegionContext>
): ReturnType<typeof textBlock>[] {
  const neighbourhoodList = city.neighbourhoods.slice(0, 3).join(', ')
  const allNeighbourhoods = city.neighbourhoods.join(', ')

  // Each service type generates genuinely different content per city
  const bodyMap: Record<string, string[]> = {
    'tenant-placement': [
      `${city.title}'s rental market operates at a ${city.vacancyRate}% vacancy rate, meaning well-priced properties attract multiple applicants quickly. Our ${city.title} tenant placement team leverages this competitive demand by syndicating your listing across ${regionCtx.mlsBoard} MLS, Kijiji, and targeted social media channels to reach the largest qualified audience.`,
      `We know the micro-markets within ${city.title} intimately. Properties in ${neighbourhoodList} attract different tenant profiles than those in ${city.neighbourhoods[city.neighbourhoods.length - 1]}, and we tailor our marketing approach accordingly. Transit connectivity via ${city.transitInfo.split(';')[0]} influences which demographics respond to each listing.`,
      `Our ${city.title} placement average is consistently under 14 days because we price competitively using real-time comparable data and pre-qualify applicants before showings. Every tenant we place passes our five-point screening, giving you confidence in the quality of your new tenant across neighbourhoods including ${allNeighbourhoods}.`,
    ],
    'leasing-services': [
      `Leasing in ${city.title} requires careful attention to both provincial RTA requirements and local municipal bylaws. ${city.localRegulatory.split('.')[0]}. Our leasing team drafts Ontario Standard Lease agreements with ${city.title}-specific schedules that protect your interests while remaining fully enforceable.`,
      `For properties in ${neighbourhoodList}, we incorporate neighbourhood-specific lease provisions covering parking, storage, and common area use. ${city.title}'s median rent of $${city.medianRent}/month means lease terms must balance competitive pricing with owner protections -- we ensure both sides are covered.`,
      `Lease renewals in ${city.title} are managed proactively: 90 days before expiry, we assess market conditions, calculate guideline rent increases, and present renewal recommendations. With a ${city.vacancyRate}% vacancy rate, retaining quality tenants through smooth renewals is more cost-effective than re-leasing.`,
    ],
    'tenant-screening': [
      `Screening tenants in ${city.title} requires understanding the local employment landscape. ${regionCtx.employmentContext.charAt(0).toUpperCase() + regionCtx.employmentContext.slice(1)} -- our verification process is tailored to confirm income and stability across these ${city.title}-specific sectors.`,
      `Our five-point screening for ${city.title} applicants covers Equifax credit history, employment verification, two previous landlord references, government ID check, and LTB eviction record search. With median rents at $${city.medianRent}/month, thorough screening protects significant monthly income.`,
      `For properties in ${neighbourhoodList} and other ${city.title} neighbourhoods, we provide screening results within 24-48 hours. Our ${city.title} team processes applications efficiently because we maintain relationships with major employers and property management firms across the ${regionCtx.ltbRegion} LTB region.`,
    ],
    'rent-guarantee': [
      `${city.title} property owners enrolled in our rent guarantee program receive their full monthly rent -- currently averaging $${city.medianRent}/month -- deposited on schedule regardless of tenant payment behaviour. Our internal reserve fund means no insurance claims and no payment delays.`,
      `With ${city.title}'s ${city.vacancyRate}% vacancy rate, the real risk is not finding tenants but ensuring they pay consistently. Our rent guarantee eliminates this risk entirely. If arrears occur, we handle collections and LTB proceedings through the ${regionCtx.ltbRegion} Region office while your income continues uninterrupted.`,
      `Properties in ${neighbourhoodList} and across ${city.title} qualify for the guarantee when tenants pass our enhanced screening tier. The program has maintained a 99.7% on-time payment record across our Ontario portfolio, with ${city.title} properties performing at or above this benchmark.`,
    ],
    'rental-preparation': [
      `In ${city.title}'s ${regionCtx.marketPosition} rental market, presentation separates properties that rent in days from those that sit for weeks. Our ${city.title} preparation team transforms units in ${neighbourhoodList} and surrounding areas into move-in-ready listings that command top rents.`,
      `Our local ${city.title} trades network handles deep cleaning, painting, and minor repairs, while our staging team uses furnishings selected for ${city.title}'s renter demographics. Properties prepared by our team rent 23% faster and at $${Math.round(city.medianRent * 0.1)}-${Math.round(city.medianRent * 0.12)}/month above unprepared comparable units.`,
      `Professional photography is included in every ${city.title} preparation package: wide-angle, HDR photos that showcase both the unit and ${city.title}'s local amenities. For premium listings in ${city.neighbourhoods[0]}, we add twilight exteriors, drone shots, and 3D Matterport tours.`,
    ],
    'rental-marketing': [
      `${city.title} renters search across multiple platforms. Our ${city.title} marketing strategy syndicates your listing across ${regionCtx.mlsBoard} MLS, Kijiji, Facebook Marketplace, Zumper, PadMapper, Rentals.ca, and ${regionCtx.localChannels}. No single portal captures the full ${city.title} audience -- we reach them all.`,
      `Each ${city.title} listing is copywritten with neighbourhood-specific context. A listing in ${city.neighbourhoods[0]} highlights different amenities than one in ${city.neighbourhoods[city.neighbourhoods.length - 1]}. We reference transit access (${city.transitInfo.split(';')[0]}), school proximity, and commute times to attract the right tenant profile.`,
      `Our ${city.title} analytics show which channels drive the most qualified inquiries. We A/B test headlines, photos, and pricing weekly until your unit is leased. Our average cost-per-lead in ${city.title} is 60% lower than owner-run listings because of bulk media buying and established portal partnerships.`,
    ],
    'portal-technology': [
      `Our digital portal gives ${city.title} property owners 24/7 access to financials, maintenance tracking, and tenant communications. Whether you own one unit in ${city.neighbourhoods[0]} or a portfolio across ${city.title}, everything is managed from a single dashboard accessible on web or mobile.`,
      `Tenants in ${city.title} submit maintenance requests through the portal with photos and descriptions. Requests are automatically routed to our vetted ${city.title}-area trades, tracked in real time, and closed with tenant confirmation. No more midnight phone calls or lost text messages.`,
      `Financial reporting for your ${city.title} property includes real-time income and expense tracking, downloadable tax-ready statements, and year-over-year performance comparisons. With ${city.title}'s median rent at $${city.medianRent}/month, accurate financial visibility is essential for investment decision-making.`,
    ],
    'pricing': [
      `Our ${city.title} pricing is transparent and success-based: you pay a single fee when we place a qualified tenant. No upfront costs, no monthly retainers, no hidden add-ons. In ${city.title}'s market with a median rent of $${city.medianRent}/month, you know your exact cost before we begin.`,
      `Every ${city.title} service is included in one all-in fee: professional photography, multi-channel marketing across ${regionCtx.mlsBoard} MLS and 30+ platforms, five-point tenant screening, and Ontario Standard Lease preparation. There are no separate line items for any of these services.`,
      `For multi-property owners in ${city.title}, we offer volume discounts starting at 2 units. Portfolio clients with 10+ properties across ${city.title} neighbourhoods including ${neighbourhoodList} qualify for custom annual management agreements with predictable monthly pricing.`,
    ],
  }

  const paragraphs = bodyMap[service.slug] || [
    `Professional ${service.title.toLowerCase()} for ${city.title} property owners.`,
    `Serving properties across ${allNeighbourhoods}.`,
  ]

  return paragraphs.map((p) => textBlock(p))
}

function generateFaq(
  city: CityData,
  service: ServiceRef,
  regionCtx: ReturnType<typeof getRegionContext>
): Array<{ question: string; answer: string }> {
  const placementDays =
    city.vacancyRate < 2.0 ? '10-12' : city.vacancyRate < 2.5 ? '12-16' : '14-18'
  const dailyCost = Math.round(city.medianRent / 30)
  const avgInquiries = city.vacancyRate < 2.0 ? '25-40' : '15-25'
  const neighbourhoodStr = city.neighbourhoods.slice(0, 3).join(', ')

  return service.faqTemplates.map((tpl) => {
    let q = tpl.question.replace(/\{city\}/g, city.title)
    let a = tpl.answer
      .replace(/\{city\}/g, city.title)
      .replace(/\{medianRent\}/g, city.medianRent.toString())
      .replace(/\{vacancyRate\}/g, city.vacancyRate.toString())
      .replace(/\{neighbourhoods\}/g, neighbourhoodStr)
      .replace(/\{placementDays\}/g, placementDays)
      .replace(/\{dailyCost\}/g, dailyCost.toString())
      .replace(/\{avgInquiries\}/g, avgInquiries)
      .replace(/\{mlsBoard\}/g, regionCtx.mlsBoard)
      .replace(/\{localChannels\}/g, regionCtx.localChannels)
      .replace(/\{ltbRegion\}/g, regionCtx.ltbRegion)
      .replace(/\{transitNote\}/g, city.transitInfo.split(';')[0])
      .replace(/\{employmentContext\}/g, regionCtx.employmentContext)
      .replace(/\{customRules\}/g, regionCtx.customRules)
      .replace(/\{marketPosition\}/g, regionCtx.marketPosition)
      .replace(
        /\{marketContext\}/g,
        `The ${city.vacancyRate}% vacancy rate in ${city.title} means qualified tenants move quickly, and our multi-channel marketing ensures maximum exposure.`
      )
      .replace(
        /\{regulatoryNote\}/g,
        city.localRegulatory.split('.').slice(0, 2).join('. ') + '.'
      )
      .replace(
        /\{localContext\}/g,
        `In ${city.title}, we pay particular attention to ${regionCtx.employmentContext} when verifying income sources.`
      )

    return { question: q, answer: a }
  })
}

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
  console.log('Seeding 20 Ontario Tier-1 cities and 160 CityService documents...\n')

  const cityDocs: Array<{ _id: string; _type: string; [key: string]: unknown }> = []
  const cityServiceDocs: Array<{ _id: string; _type: string; [key: string]: unknown }> = []

  for (let ci = 0; ci < cities.length; ci++) {
    const city = cities[ci]
    const citySlug = toSlug(city.title)
    const regionCtx = getRegionContext(city.region)

    // City document
    const cityDoc = {
      _id: `city-${citySlug}`,
      _type: 'city',
      title: city.title,
      slug: { _type: 'slug', current: citySlug },
      province: { _type: 'reference', _ref: 'province-ontario' },
      tier: 1,
      population: city.population,
      medianRent: city.medianRent,
      vacancyRate: city.vacancyRate,
      neighbourhoods: city.neighbourhoods,
      transitInfo: city.transitInfo,
      description: city.description.map((p) => textBlock(p)),
      seo: {
        metaTitle: `${city.title} Property Management | MoveSmart Rentals`,
        metaDescription: `Professional property management in ${city.title}, Ontario. Tenant placement, screening, and rental marketing across ${city.neighbourhoods.slice(0, 3).join(', ')} and more.`,
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
    }
    cityDocs.push(cityDoc)

    // CityService documents for each of 8 services
    for (let si = 0; si < serviceRefs.length; si++) {
      const service = serviceRefs[si]
      const serviceSlug = service.slug
      const headlineVerb = service.headlineVerbs[ci % service.headlineVerbs.length]

      // Vary localMedianRent per service type (rental prep might show average, tenant placement higher-end)
      const rentVariation: Record<string, number> = {
        'tenant-placement': 1.08,
        'leasing-services': 1.0,
        'tenant-screening': 1.0,
        'rent-guarantee': 1.05,
        'rental-preparation': 1.1,
        'rental-marketing': 1.05,
        'portal-technology': 1.0,
        'pricing': 1.0,
      }
      const vacancyVariation: Record<string, number> = {
        'tenant-placement': -0.2,
        'leasing-services': 0.0,
        'tenant-screening': 0.0,
        'rent-guarantee': -0.1,
        'rental-preparation': -0.15,
        'rental-marketing': -0.1,
        'portal-technology': 0.0,
        'pricing': 0.1,
      }

      const localMedianRent = Math.round(
        city.medianRent * (rentVariation[serviceSlug] || 1.0)
      )
      const localVacancyRate = Math.round(
        (city.vacancyRate + (vacancyVariation[serviceSlug] || 0)) * 10
      ) / 10

      const cityServiceDoc = {
        _id: `cityservice-${citySlug}-${serviceSlug}`,
        _type: 'cityService',
        city: { _type: 'reference', _ref: `city-${citySlug}` },
        service: { _type: 'reference', _ref: service.id },
        // Denormalized fields
        cityTitle: city.title,
        provinceSlug: 'ontario',
        citySlug: citySlug,
        serviceSlug: serviceSlug,
        // Local content
        localMedianRent,
        localVacancyRate,
        neighbourhoodNames: city.neighbourhoods,
        localRegulatory: city.localRegulatory,
        localBody: generateLocalBody(city, service, regionCtx),
        // Hero
        heroHeadline: `${headlineVerb} ${service.title} in ${city.title}`,
        heroSubheadline: generateHeroSubheadline(city, service, regionCtx),
        heroCta1: { label: 'Create Free Account', url: '/contact/' },
        heroCta2: { label: 'Book a Call', url: '/contact/' },
        // Block data
        painPoints: service.painPoints,
        benefits: service.benefits,
        howItWorks: service.howItWorks,
        faq: generateFaq(city, service, regionCtx),
        // SEO
        seo: {
          metaTitle: `${service.title} in ${city.title} | MoveSmart`,
          metaDescription: `${headlineVerb} ${service.title.toLowerCase()} for ${city.title} property owners. Serving ${city.neighbourhoods.slice(0, 2).join(' and ')} and all ${city.title} neighbourhoods. ${city.vacancyRate}% vacancy rate market.`,
        },
        publishing: {
          noindex: false,
          includedInSitemap: true,
        },
      }
      cityServiceDocs.push(cityServiceDoc)
    }

    console.log(`Prepared ${city.title}... ${ci + 1}/20 cities`)
  }

  // Commit city documents
  console.log('\nCommitting city documents...')
  await commitBatch(client, cityDocs, 'Cities')

  // Commit CityService documents
  console.log('\nCommitting CityService documents...')
  await commitBatch(client, cityServiceDocs, 'CityServices')

  console.log(
    `\nDone. Created ${cityDocs.length} cities + ${cityServiceDocs.length} CityService documents.`
  )
}

main().catch((err) => {
  console.error('Seeding failed:', err)
  process.exit(1)
})
