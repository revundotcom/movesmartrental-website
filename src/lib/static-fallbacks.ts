/**
 * Static fallback data for dynamic-route pages.
 *
 * The dynamic routes (ca/[province]/[city]/..., us/[state]/..., services/[service]/...)
 * primarily pull from Sanity. When Sanity has no document for a given slug
 * (e.g. during an early local dev before seeds run, or if the dataset is reset),
 * these fallbacks ensure the page still renders with brand-consistent content
 * instead of showing a 404 for any footer-linked slug.
 *
 * All data here is static / committed to git. Sanity data is preferred when present.
 *
 * Research sources: Statistics Canada 2024, CMHC, Zillow Market Report, U.S. Census.
 * Last reviewed: 2026-04.
 */

// ---------------------------------------------------------------------------
// Types (match the Sanity query return shapes)
// ---------------------------------------------------------------------------

export interface FallbackCity {
  _id: string
  title: string
  slug: { current: string }
  tier: number
  population?: number
  medianRent?: number
  vacancyRate?: number
  neighbourhoods?: string[]
  transitInfo?: string
  description?: string
  heroImageUrl?: string
  heroImageAlt?: string
  province: {
    title: string
    slug: { current: string }
    country: string
    abbreviation?: string
  }
}

export interface FallbackProvince {
  _id: string
  title: string
  slug: { current: string }
  country: string
  abbreviation?: string
  description?: string
  cities: Array<{
    title: string
    slug: { current: string }
    tier: number
    population?: number
    medianRent?: number
    provinceSlug: string
  }>
}

export interface FallbackService {
  _id: string
  _type: 'service'
  title: string
  slug: { current: string }
  shortDescription: string
  audience: 'owner' | 'tenant' | 'both'
  icon?: string
  order?: number
}

// ---------------------------------------------------------------------------
// Ontario cities (the 7 footer-linked + a few more)
// ---------------------------------------------------------------------------

const ONTARIO_PROVINCE_REF = {
  title: 'Ontario',
  slug: { current: 'ontario' },
  country: 'ca',
  abbreviation: 'ON',
}

const ONTARIO_CITIES: FallbackCity[] = [
  {
    _id: 'city-toronto-static',
    title: 'Toronto',
    slug: { current: 'toronto' },
    tier: 1,
    population: 2930000,
    medianRent: 2800,
    vacancyRate: 1.7,
    neighbourhoods: [
      'Downtown',
      'Midtown',
      'North York',
      'Etobicoke',
      'Scarborough',
      'East York',
      'York',
      'Liberty Village',
    ],
    transitInfo:
      'Toronto is served by the TTC (subway, streetcar, bus) plus GO Transit for commuter rail across the GTA. Most rental submarkets are within a 15-minute walk of a subway station or dedicated transit corridor.',
    description:
      'Canada\'s largest rental market, Toronto offers steady demand across every property type - from downtown condos near the PATH and Union Station to family-oriented townhouses in Etobicoke and North York. Tenant placements in Toronto typically close in 10-18 days at or above asking rent.',
    heroImageUrl: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Toronto city skyline with CN Tower and downtown high-rises',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-ottawa-static',
    title: 'Ottawa',
    slug: { current: 'ottawa' },
    tier: 1,
    population: 1020000,
    medianRent: 2400,
    vacancyRate: 2.1,
    neighbourhoods: [
      'Centretown',
      'The Glebe',
      'Westboro',
      'Kanata',
      'Orléans',
      'Barrhaven',
      'Nepean',
      'ByWard Market',
    ],
    transitInfo:
      'Ottawa\'s O-Train light rail plus an extensive bus network cover most rental neighbourhoods. Government-sector tenants typically prioritize transit proximity.',
    description:
      'Ottawa\'s rental market is anchored by the public sector, the University of Ottawa, and Carleton University. Tenant turnover is steady and predictable, with strong demand for condos in Centretown and family homes in Kanata and Barrhaven.',
    heroImageUrl: 'https://images.unsplash.com/photo-1591400304123-7d10f2f5add9?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Ottawa Parliament buildings with green trees under summer sky',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-mississauga-static',
    title: 'Mississauga',
    slug: { current: 'mississauga' },
    tier: 1,
    population: 735000,
    medianRent: 2650,
    vacancyRate: 1.9,
    neighbourhoods: [
      'Square One',
      'Port Credit',
      'Streetsville',
      'Meadowvale',
      'Erin Mills',
      'Clarkson',
      'Cooksville',
      'Lorne Park',
    ],
    transitInfo:
      'MiWay bus network plus GO Transit (Lakeshore West, Milton, Kitchener lines) link Mississauga to downtown Toronto in 25-40 minutes. The Hurontario LRT is under construction.',
    description:
      'Mississauga combines Toronto-adjacent access with family-oriented suburbs and a fast-growing downtown around Square One. Rental demand is strongest for 2-3 bedroom condos near transit and townhouses in Meadowvale and Erin Mills.',
    heroImageUrl: 'https://images.unsplash.com/photo-1483790488866-adee346370c3?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Mississauga Ontario glass office tower against Canadian sky',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-hamilton-static',
    title: 'Hamilton',
    slug: { current: 'hamilton' },
    tier: 1,
    population: 580000,
    medianRent: 2100,
    vacancyRate: 2.4,
    neighbourhoods: [
      'Downtown',
      'Westdale',
      'Ancaster',
      'Dundas',
      'Stoney Creek',
      'Waterdown',
      'Hamilton Mountain',
      'Kirkendall',
    ],
    transitInfo:
      'HSR bus network plus GO Transit (Lakeshore West) link Hamilton to Toronto in about an hour. The Hamilton LRT is planned along the King Street corridor.',
    description:
      'Hamilton\'s rental market has gained significant momentum as Toronto commuters seek lower rents with GO Transit access. McMaster University sustains steady demand in Westdale and Ainslie Wood.',
    heroImageUrl: 'https://images.unsplash.com/photo-1508002461948-e612d8221021?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Hamilton Ontario Niagara Escarpment layered waterfalls',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-brampton-static',
    title: 'Brampton',
    slug: { current: 'brampton' },
    tier: 1,
    population: 656000,
    medianRent: 2400,
    vacancyRate: 1.8,
    neighbourhoods: [
      'Downtown Brampton',
      'Heart Lake',
      'Bramalea',
      'Mount Pleasant',
      'Springdale',
      'Fletcher\'s Meadow',
      'Credit Valley',
      'Churchville',
    ],
    transitInfo:
      'Brampton Transit plus GO Transit (Kitchener line) via the Brampton and Mount Pleasant stations provide commuter service to Toronto in about 45 minutes.',
    description:
      'Brampton has one of the fastest-growing populations in Canada with strong demand for 3-4 bedroom homes and townhouses. The rental market tilts toward young families and multi-generational households.',
    heroImageUrl: 'https://images.unsplash.com/photo-1581141117898-2be4de754b12?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Brampton Ontario high-rise buildings illuminated at night',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-london-static',
    title: 'London',
    slug: { current: 'london' },
    tier: 1,
    population: 425000,
    medianRent: 1850,
    vacancyRate: 2.6,
    neighbourhoods: [
      'Downtown',
      'Old North',
      'Old South',
      'Byron',
      'Masonville',
      'Hyde Park',
      'Westmount',
      'Oakridge',
    ],
    transitInfo:
      'London Transit Commission serves the city with an extensive bus network. The Western University campus and Fanshawe College generate strong student-rental demand.',
    description:
      'London\'s rental market is anchored by Western University, Fanshawe College, and a growing tech sector. Tenant placement typically favours September move-ins aligned with the academic calendar.',
    heroImageUrl: 'https://images.unsplash.com/photo-1596022558228-463253a5f27c?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'London Ontario downtown skyline under cloudy daytime sky',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-kitchener-static',
    title: 'Kitchener',
    slug: { current: 'kitchener' },
    tier: 1,
    population: 260000,
    medianRent: 2050,
    vacancyRate: 2.2,
    neighbourhoods: [
      'Downtown Kitchener',
      'Forest Heights',
      'Stanley Park',
      'Doon',
      'Laurentian',
      'Bridgeport',
      'Victoria Park',
      'Rockway',
    ],
    transitInfo:
      'ION light rail and Grand River Transit buses connect Kitchener-Waterloo. GO Transit (Kitchener line) runs express service to Toronto in about 90 minutes.',
    description:
      'Kitchener anchors Canada\'s "Technology Triangle" with strong demand from tech workers, University of Waterloo co-ops, and Conestoga College students. Rent growth has consistently outpaced Ontario averages.',
    heroImageUrl: 'https://images.unsplash.com/photo-1634944350954-c7377654e6f1?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Kitchener Ontario downtown wet street with buildings and street lights',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-vaughan-static',
    title: 'Vaughan',
    slug: { current: 'vaughan' },
    tier: 1,
    population: 323000,
    medianRent: 2600,
    vacancyRate: 1.6,
    neighbourhoods: ['Woodbridge', 'Maple', 'Thornhill', 'Kleinburg', 'Concord', 'Vaughan Metropolitan Centre'],
    transitInfo:
      'York Region Transit + Viva + TTC Line 1 extension to Vaughan Metropolitan Centre place downtown Toronto within 45 minutes door-to-door.',
    description:
      'Vaughan combines established luxury pockets like Kleinburg with the rapid-growth VMC core. Demand skews toward families and executive-relocation tenants.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-markham-static',
    title: 'Markham',
    slug: { current: 'markham' },
    tier: 1,
    population: 338000,
    medianRent: 2500,
    vacancyRate: 1.5,
    neighbourhoods: ['Unionville', 'Cornell', 'Cathedraltown', 'Berczy Village', 'Markham Village', 'Milliken'],
    transitInfo:
      'GO Transit (Stouffville line) + York Region Transit + Viva connect Markham to downtown Toronto in about 60 minutes.',
    description:
      'Markham has Canada\'s highest concentration of tech HQs and a globally diverse applicant pool. Listings perform best with Mandarin- and Cantonese-language marketing in key neighborhoods.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-richmond-hill-static',
    title: 'Richmond Hill',
    slug: { current: 'richmond-hill' },
    tier: 1,
    population: 202000,
    medianRent: 2450,
    vacancyRate: 1.7,
    neighbourhoods: ['Oak Ridges', 'Bayview Hill', 'Mill Pond', 'Jefferson', 'Richvale', 'Observatory Hill'],
    transitInfo:
      'York Region Transit + Viva + GO Transit (Richmond Hill line) provide direct commuter rail to Union Station in about 55 minutes.',
    description:
      'Richmond Hill attracts affluent professional families, with strong Chinese- and Iranian-Canadian demographics. Detached homes and luxury townhouses dominate the owner-held rental stock.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-oakville-static',
    title: 'Oakville',
    slug: { current: 'oakville' },
    tier: 1,
    population: 213000,
    medianRent: 2700,
    vacancyRate: 1.4,
    neighbourhoods: ['Old Oakville', 'Bronte', 'Glen Abbey', 'River Oaks', 'Uptown Core', 'Kerr Village'],
    transitInfo:
      'Oakville Transit + GO Transit (Lakeshore West) run express service to Union Station in under 40 minutes.',
    description:
      'Oakville is among Ontario\'s highest-income markets. Corporate-relocation tenants, Ford Canada workforce, and executive families drive premium detached and townhouse demand.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-burlington-static',
    title: 'Burlington',
    slug: { current: 'burlington' },
    tier: 1,
    population: 187000,
    medianRent: 2350,
    vacancyRate: 1.8,
    neighbourhoods: ['Downtown Burlington', 'Aldershot', 'Tyandaga', 'Alton Village', 'Orchard', 'Millcroft'],
    transitInfo:
      'Burlington Transit + GO Transit (Lakeshore West) provide express rail to downtown Toronto in about 45 minutes.',
    description:
      'Burlington blends lakeside charm with Hamilton/GTA commuter access. Strong demand from young families, healthcare workers at Joseph Brant Hospital, and retirees downsizing into condos.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-waterloo-static',
    title: 'Waterloo',
    slug: { current: 'waterloo' },
    tier: 1,
    population: 122000,
    medianRent: 2100,
    vacancyRate: 2.4,
    neighbourhoods: ['Uptown Waterloo', 'Westmount', 'Lakeshore', 'Eastbridge', 'Beechwood', 'Columbia Forest'],
    transitInfo:
      'ION light rail + Grand River Transit connect Waterloo to Kitchener and the broader Region. GO Transit service runs from Kitchener station.',
    description:
      'Waterloo\'s rental market is driven by University of Waterloo, Wilfrid Laurier, and the surrounding tech corridor. September turnover cycle requires early listing discipline.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-cambridge-static',
    title: 'Cambridge',
    slug: { current: 'cambridge' },
    tier: 1,
    population: 138000,
    medianRent: 1950,
    vacancyRate: 2.1,
    neighbourhoods: ['Galt', 'Preston', 'Hespeler', 'West Galt', 'East Galt'],
    transitInfo:
      'Grand River Transit + GO bus connections to the Kitchener ION line. Highway 401 access puts Toronto within 75 minutes.',
    description:
      'Cambridge\'s three historic cores (Galt, Preston, Hespeler) each carry distinct character. Manufacturing (Toyota, Frito-Lay) and cross-region commuter tenants anchor demand.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-guelph-static',
    title: 'Guelph',
    slug: { current: 'guelph' },
    tier: 1,
    population: 144000,
    medianRent: 2000,
    vacancyRate: 2.0,
    neighbourhoods: ['Downtown Guelph', 'Old University', 'Kortright Hills', 'Westminster Woods', 'Pine Ridge'],
    transitInfo:
      'Guelph Transit + GO Transit (Kitchener line) + Highway 401 access. Commute to Toronto is about 75 minutes by train.',
    description:
      'University of Guelph drives a strong September lease cycle. Agricultural-economy tenants and Linamar manufacturing workforce round out year-round demand.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-barrie-static',
    title: 'Barrie',
    slug: { current: 'barrie' },
    tier: 1,
    population: 150000,
    medianRent: 1950,
    vacancyRate: 2.3,
    neighbourhoods: ['Downtown Barrie', 'Painswick', 'Holly', 'Innis Shore', 'Ardagh Bluffs'],
    transitInfo:
      'Barrie Transit + GO Transit (Barrie line) connect to Union Station in about 90 minutes. Highway 400 commuter traffic is heavy.',
    description:
      'Barrie\'s waterfront city has grown rapidly with GTA spillover. Georgian College drives student demand; cottage-country weekend traffic shapes seasonal dynamics.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-milton-static',
    title: 'Milton',
    slug: { current: 'milton' },
    tier: 1,
    population: 133000,
    medianRent: 2450,
    vacancyRate: 1.6,
    neighbourhoods: ['Old Milton', 'Beaty', 'Willmott', 'Harrison', 'Scott', 'Ford'],
    transitInfo:
      'Milton Transit + GO Transit (Milton line) + Highway 401 serve one of Canada\'s fastest-growing communities.',
    description:
      'Milton is among the fastest-growing municipalities in Canada. New-build subdivisions dominate the rental stock with strong family-tenant demand.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-oshawa-static',
    title: 'Oshawa',
    slug: { current: 'oshawa' },
    tier: 1,
    population: 175000,
    medianRent: 2050,
    vacancyRate: 2.5,
    neighbourhoods: ['Downtown Oshawa', 'Donevan', 'Taunton', 'Windfields', 'Samac', 'Pinecrest'],
    transitInfo:
      'Durham Region Transit + GO Transit (Lakeshore East) + Highway 401 put downtown Toronto within 60 minutes.',
    description:
      'Oshawa anchors Durham Region with Ontario Tech University + Durham College + GM Canada. Student housing and auto-sector tenants carry strong year-round demand.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-ajax-static',
    title: 'Ajax',
    slug: { current: 'ajax' },
    tier: 1,
    population: 126000,
    medianRent: 2300,
    vacancyRate: 1.9,
    neighbourhoods: ['Downtown Ajax', 'Pickering Beach', 'Nottingham', 'Southwood', 'Westney Heights'],
    transitInfo:
      'Durham Region Transit + GO Transit (Lakeshore East) express service reaches Union Station in 45-55 minutes.',
    description:
      'Ajax has deep diasporic communities and GTA-commuter family tenants. Waterfront access and school-district-driven pricing shape premium pockets.',
    province: ONTARIO_PROVINCE_REF,
  },
  {
    _id: 'city-pickering-static',
    title: 'Pickering',
    slug: { current: 'pickering' },
    tier: 1,
    population: 99000,
    medianRent: 2350,
    vacancyRate: 1.8,
    neighbourhoods: ['Pickering Village', 'Bay Ridges', 'Amberlea', 'Rosebank', 'Liverpool', 'Duffin Heights'],
    transitInfo:
      'Durham Region Transit + GO Transit (Lakeshore East) + Pickering Nuclear workforce shuttle routes. ~40-minute GO to Union.',
    description:
      'Pickering combines commuter-rail access with Pickering Nuclear workforce tenants and growing Seaton greenfield inventory. Waterfront pockets command premium.',
    province: ONTARIO_PROVINCE_REF,
  },
]

// ---------------------------------------------------------------------------
// US cities (full data for city pages)
// ---------------------------------------------------------------------------

const FL_PROVINCE: FallbackCity['province'] = {
  title: 'Florida',
  slug: { current: 'florida' },
  country: 'us',
  abbreviation: 'FL',
}
const TX_PROVINCE: FallbackCity['province'] = {
  title: 'Texas',
  slug: { current: 'texas' },
  country: 'us',
  abbreviation: 'TX',
}
const CA_PROVINCE: FallbackCity['province'] = {
  title: 'California',
  slug: { current: 'california' },
  country: 'us',
  abbreviation: 'CA',
}
const NY_PROVINCE: FallbackCity['province'] = {
  title: 'New York',
  slug: { current: 'new-york' },
  country: 'us',
  abbreviation: 'NY',
}
const IL_PROVINCE: FallbackCity['province'] = {
  title: 'Illinois',
  slug: { current: 'illinois' },
  country: 'us',
  abbreviation: 'IL',
}

const US_CITIES: FallbackCity[] = [
  // Florida
  {
    _id: 'city-miami-static',
    title: 'Miami',
    slug: { current: 'miami' },
    tier: 2,
    population: 442000,
    medianRent: 3100,
    vacancyRate: 3.2,
    neighbourhoods: ['Brickell', 'Wynwood', 'Miami Beach', 'Coral Gables', 'Coconut Grove', 'Downtown', 'Little Havana', 'Edgewater'],
    transitInfo: 'Miami Metrorail connects downtown to Dadeland and the airport; Metromover covers Downtown and Brickell; extensive bus network from Miami-Dade Transit.',
    description: 'Miami\'s rental market is among the fastest-growing in the US, driven by tech-sector relocations, international investors, and strong seasonal snowbird demand. Brickell and Wynwood lead high-rise inventory growth.',
    province: FL_PROVINCE,
  },
  {
    _id: 'city-orlando-static',
    title: 'Orlando',
    slug: { current: 'orlando' },
    tier: 2,
    population: 309000,
    medianRent: 2300,
    vacancyRate: 4.1,
    neighbourhoods: ['Downtown', 'Lake Nona', 'Winter Park', 'College Park', 'Thornton Park', 'Baldwin Park', 'Mills 50', 'SoDo'],
    transitInfo: 'LYNX bus network covers greater Orlando; SunRail commuter rail connects Kissimmee to DeBary.',
    description: 'Orlando combines stable tourism-sector employment, Lake Nona\'s Medical City growth, and UCF-area student rentals. Demand is consistent year-round.',
    province: FL_PROVINCE,
  },
  {
    _id: 'city-tampa-static',
    title: 'Tampa',
    slug: { current: 'tampa' },
    tier: 2,
    population: 398000,
    medianRent: 2450,
    vacancyRate: 3.8,
    neighbourhoods: ['Downtown', 'Hyde Park', 'Channelside', 'Ybor City', 'Seminole Heights', 'Westshore', 'South Tampa', 'Carrollwood'],
    transitInfo: 'HART buses cover Tampa; TECO Streetcar runs Downtown to Ybor City.',
    description: 'Tampa\'s rental demand tracks strong in-migration from the Northeast, a booming financial-services sector, and proximity to Gulf Coast beaches.',
    province: FL_PROVINCE,
  },
  {
    _id: 'city-jacksonville-static',
    title: 'Jacksonville',
    slug: { current: 'jacksonville' },
    tier: 2,
    population: 971000,
    medianRent: 1850,
    vacancyRate: 4.5,
    neighbourhoods: ['Downtown', 'Riverside', 'San Marco', 'Mandarin', 'Southside', 'Ponte Vedra', 'Arlington', 'Westside'],
    transitInfo: 'JTA bus and Skyway automated monorail serve downtown and surrounding districts.',
    description: 'Florida\'s largest city by area offers lower rents than Miami/Tampa with steady military and logistics-sector demand.',
    province: FL_PROVINCE,
  },
  {
    _id: 'city-fort-lauderdale-static',
    title: 'Fort Lauderdale',
    slug: { current: 'fort-lauderdale' },
    tier: 2,
    population: 184000,
    medianRent: 2750,
    vacancyRate: 3.5,
    neighbourhoods: ['Downtown', 'Las Olas', 'Victoria Park', 'Rio Vista', 'Coral Ridge', 'Wilton Manors', 'Flagler Village', 'Colee Hammock'],
    transitInfo: 'Broward County Transit plus Tri-Rail commuter service to Miami and West Palm Beach.',
    description: 'Fort Lauderdale combines beach-adjacent rentals, a growing financial-district footprint, and overflow demand from Miami.',
    province: FL_PROVINCE,
  },
  // Texas
  {
    _id: 'city-austin-static',
    title: 'Austin',
    slug: { current: 'austin' },
    tier: 2,
    population: 966000,
    medianRent: 2400,
    vacancyRate: 6.2,
    neighbourhoods: ['Downtown', 'South Congress', 'East Austin', 'Zilker', 'Hyde Park', 'Mueller', 'West Campus', 'Barton Hills'],
    transitInfo: 'CapMetro buses and MetroRail commuter line; Project Connect light rail is in planning.',
    description: 'Austin\'s tech-fueled growth drove nation-leading rent increases through 2024; 2025 has seen supply catch demand, creating rare tenant-favorable conditions.',
    province: TX_PROVINCE,
  },
  {
    _id: 'city-houston-static',
    title: 'Houston',
    slug: { current: 'houston' },
    tier: 2,
    population: 2300000,
    medianRent: 1850,
    vacancyRate: 7.1,
    neighbourhoods: ['Downtown', 'Midtown', 'The Heights', 'Montrose', 'River Oaks', 'Rice Village', 'Upper Kirby', 'Galleria'],
    transitInfo: 'METRO buses and three light rail lines; expansive but car-dependent metro.',
    description: 'The fourth-largest US city offers the widest range of rental price points, with energy-sector and medical center employment driving diverse demand.',
    province: TX_PROVINCE,
  },
  {
    _id: 'city-dallas-static',
    title: 'Dallas',
    slug: { current: 'dallas' },
    tier: 2,
    population: 1300000,
    medianRent: 1950,
    vacancyRate: 6.8,
    neighbourhoods: ['Downtown', 'Uptown', 'Deep Ellum', 'Bishop Arts', 'Oak Lawn', 'Lakewood', 'Lower Greenville', 'M Streets'],
    transitInfo: 'DART light rail + bus network covers Dallas and suburbs; Trinity Railway Express to Fort Worth.',
    description: 'Dallas anchors the 7M-person DFW metroplex; corporate relocations fuel steady rental demand in Uptown and the core.',
    province: TX_PROVINCE,
  },
  {
    _id: 'city-san-antonio-static',
    title: 'San Antonio',
    slug: { current: 'san-antonio' },
    tier: 2,
    population: 1470000,
    medianRent: 1650,
    vacancyRate: 7.5,
    neighbourhoods: ['Downtown', 'Pearl District', 'King William', 'Southtown', 'Alamo Heights', 'Stone Oak', 'The Dominion', 'Monte Vista'],
    transitInfo: 'VIA Metropolitan Transit buses serve the San Antonio metro.',
    description: 'San Antonio balances affordability and steady military, healthcare, and tourism employment.',
    province: TX_PROVINCE,
  },
  {
    _id: 'city-fort-worth-static',
    title: 'Fort Worth',
    slug: { current: 'fort-worth' },
    tier: 2,
    population: 958000,
    medianRent: 1700,
    vacancyRate: 7.0,
    neighbourhoods: ['Downtown', 'Sundance Square', 'West 7th', 'TCU / Westcliff', 'Near Southside', 'Fairmount', 'Arlington Heights', 'Crestwood'],
    transitInfo: 'Trinity Metro buses and TEXRail commuter service to DFW Airport.',
    description: 'Fort Worth complements Dallas with lower rents and strong aerospace, oil & gas, and logistics employment.',
    province: TX_PROVINCE,
  },
  // California
  {
    _id: 'city-los-angeles-static',
    title: 'Los Angeles',
    slug: { current: 'los-angeles' },
    tier: 2,
    population: 3890000,
    medianRent: 2950,
    vacancyRate: 4.0,
    neighbourhoods: ['Downtown', 'Hollywood', 'Silver Lake', 'Echo Park', 'Venice', 'Santa Monica', 'Koreatown', 'West Hollywood'],
    transitInfo: 'LA Metro operates 6 rail lines plus extensive bus network; A Line light rail connects to Long Beach.',
    description: 'LA\'s rental market is governed by the Rent Stabilization Ordinance across many pre-1978 buildings; compliance expertise is essential.',
    province: CA_PROVINCE,
  },
  {
    _id: 'city-san-diego-static',
    title: 'San Diego',
    slug: { current: 'san-diego' },
    tier: 2,
    population: 1386000,
    medianRent: 2800,
    vacancyRate: 3.6,
    neighbourhoods: ['Downtown', 'Gaslamp Quarter', 'La Jolla', 'Pacific Beach', 'North Park', 'Hillcrest', 'Ocean Beach', 'Little Italy'],
    transitInfo: 'San Diego Trolley light rail plus MTS buses; Coaster commuter rail to Oceanside.',
    description: 'San Diego combines naval/defense employment, biotech, and UCSD-area demand with limited housing supply.',
    province: CA_PROVINCE,
  },
  {
    _id: 'city-san-francisco-static',
    title: 'San Francisco',
    slug: { current: 'san-francisco' },
    tier: 2,
    population: 808000,
    medianRent: 3400,
    vacancyRate: 5.5,
    neighbourhoods: ['SoMa', 'Mission', 'Castro', 'Noe Valley', 'Pacific Heights', 'Marina', 'North Beach', 'Sunset'],
    transitInfo: 'BART, Muni Metro, cable cars, and extensive bus network; Caltrain to Peninsula.',
    description: 'SF\'s rental market is governed by strict rent control and just-cause eviction rules. Tech-sector recovery and AI-driven hiring have normalized post-pandemic vacancies.',
    province: CA_PROVINCE,
  },
  {
    _id: 'city-san-jose-static',
    title: 'San Jose',
    slug: { current: 'san-jose' },
    tier: 2,
    population: 1013000,
    medianRent: 3200,
    vacancyRate: 4.2,
    neighbourhoods: ['Downtown', 'Willow Glen', 'Rose Garden', 'Almaden Valley', 'Cambrian', 'Evergreen', 'Berryessa', 'North San Jose'],
    transitInfo: 'VTA light rail and buses; Caltrain and BART Silicon Valley extension.',
    description: 'Silicon Valley\'s largest city; demand tracks tech hiring cycles with premium pricing in neighborhoods close to major campuses.',
    province: CA_PROVINCE,
  },
  {
    _id: 'city-sacramento-static',
    title: 'Sacramento',
    slug: { current: 'sacramento' },
    tier: 2,
    population: 525000,
    medianRent: 2050,
    vacancyRate: 3.9,
    neighbourhoods: ['Downtown', 'Midtown', 'East Sacramento', 'Land Park', 'Curtis Park', 'Natomas', 'Oak Park', 'Pocket'],
    transitInfo: 'SacRT light rail and buses; Amtrak Capitol Corridor to Bay Area.',
    description: 'California\'s capital offers state-government-sector stability and lower rents than coastal markets.',
    province: CA_PROVINCE,
  },
  // New York
  {
    _id: 'city-new-york-city-static',
    title: 'New York City',
    slug: { current: 'new-york-city' },
    tier: 2,
    population: 8336000,
    medianRent: 3800,
    vacancyRate: 2.4,
    neighbourhoods: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Upper East Side', 'Williamsburg', 'Long Island City'],
    transitInfo: 'MTA Subway (24/7), buses, and LIRR/Metro-North commuter rails serve the five boroughs.',
    description: 'NYC\'s rental market includes rent-stabilized units (DHCR-registered), market-rate rentals, and co-op sublets. Compliance expertise is central to every management engagement.',
    province: NY_PROVINCE,
  },
  {
    _id: 'city-buffalo-static',
    title: 'Buffalo',
    slug: { current: 'buffalo' },
    tier: 2,
    population: 278000,
    medianRent: 1250,
    vacancyRate: 4.2,
    neighbourhoods: ['Downtown', 'Allentown', 'Elmwood Village', 'North Buffalo', 'South Buffalo', 'Parkside', 'Riverside', 'Kenmore'],
    transitInfo: 'NFTA Metro Rail light rail plus buses; short drive to Niagara Falls.',
    description: 'Buffalo offers the most affordable entry-point rentals in New York State with strong student demand around UB and Buffalo State.',
    province: NY_PROVINCE,
  },
  {
    _id: 'city-rochester-static',
    title: 'Rochester',
    slug: { current: 'rochester' },
    tier: 2,
    population: 211000,
    medianRent: 1200,
    vacancyRate: 4.5,
    neighbourhoods: ['Downtown', 'Park Avenue', 'East Avenue', 'Corn Hill', 'South Wedge', 'Highland Park', 'Neighborhood of the Arts', 'Charlotte'],
    transitInfo: 'RTS buses serve Rochester and surrounding Monroe County.',
    description: 'Rochester\'s university and medical-center employment (University of Rochester, RIT) drives steady rental demand at accessible rents.',
    province: NY_PROVINCE,
  },
  {
    _id: 'city-albany-static',
    title: 'Albany',
    slug: { current: 'albany' },
    tier: 2,
    population: 99000,
    medianRent: 1550,
    vacancyRate: 4.0,
    neighbourhoods: ['Downtown', 'Center Square', 'Pine Hills', 'Park South', 'Delaware Avenue', 'New Scotland', 'Buckingham Lake', 'Uptown'],
    transitInfo: 'CDTA buses serve the Capital District; Amtrak via Albany-Rensselaer station.',
    description: 'New York\'s capital anchors state-government employment and SUNY Albany demand.',
    province: NY_PROVINCE,
  },
  {
    _id: 'city-syracuse-static',
    title: 'Syracuse',
    slug: { current: 'syracuse' },
    tier: 2,
    population: 148000,
    medianRent: 1150,
    vacancyRate: 4.8,
    neighbourhoods: ['Downtown', 'Armory Square', 'Hawley-Green', 'Eastwood', 'University Hill', 'Westcott', 'Tipperary Hill', 'Strathmore'],
    transitInfo: 'Centro buses serve Syracuse and surrounding Onondaga County.',
    description: 'Syracuse combines Syracuse University student demand with growing logistics-sector (Micron, Amazon) employment.',
    province: NY_PROVINCE,
  },
  // Illinois
  {
    _id: 'city-chicago-static',
    title: 'Chicago',
    slug: { current: 'chicago' },
    tier: 2,
    population: 2697000,
    medianRent: 2150,
    vacancyRate: 5.2,
    neighbourhoods: ['Loop', 'River North', 'West Loop', 'Lincoln Park', 'Wicker Park', 'Logan Square', 'Lakeview', 'Pilsen'],
    transitInfo: 'CTA L trains (8 lines) plus extensive bus network; Metra commuter rail across the region.',
    description: 'The nation\'s third-largest rental market combines world-class transit, the Chicago RLTO tenant-protection framework, and distinct neighborhood submarkets.',
    province: IL_PROVINCE,
  },
  {
    _id: 'city-aurora-static',
    title: 'Aurora',
    slug: { current: 'aurora' },
    tier: 2,
    population: 180000,
    medianRent: 1650,
    vacancyRate: 5.0,
    neighbourhoods: ['Downtown', 'Stonebridge', 'Fox Valley', 'Orchard Valley', 'Ginger Creek', 'Barrington Lakes', 'Prestbury', 'Lincoln Prairie'],
    transitInfo: 'Pace buses; Metra BNSF line to downtown Chicago in 60 minutes.',
    description: 'Illinois\' second-largest city offers commutable-to-Chicago rentals with stronger single-family inventory.',
    province: IL_PROVINCE,
  },
  {
    _id: 'city-naperville-static',
    title: 'Naperville',
    slug: { current: 'naperville' },
    tier: 2,
    population: 149000,
    medianRent: 2100,
    vacancyRate: 4.5,
    neighbourhoods: ['Downtown', 'North Naperville', 'South Naperville', 'White Eagle', 'Tall Grass', 'Ashwood Park', 'Moser Highlands', 'Brookdale'],
    transitInfo: 'Pace buses; Metra BNSF line to downtown Chicago.',
    description: 'One of the top-ranked US suburbs for families; premium rentals with top-rated schools.',
    province: IL_PROVINCE,
  },
  {
    _id: 'city-rockford-static',
    title: 'Rockford',
    slug: { current: 'rockford' },
    tier: 2,
    population: 148000,
    medianRent: 1100,
    vacancyRate: 5.5,
    neighbourhoods: ['Downtown', 'Edgebrook', 'Churchill Grove', 'Signal Hill', 'North End', 'East Side', 'Cherry Valley', 'Rock Cut'],
    transitInfo: 'RMTD buses serve Rockford.',
    description: 'Rockford offers the most affordable rentals in northern Illinois with logistics-sector and aerospace employment.',
    province: IL_PROVINCE,
  },
  {
    _id: 'city-springfield-il-static',
    title: 'Springfield',
    slug: { current: 'springfield' },
    tier: 2,
    population: 114000,
    medianRent: 1050,
    vacancyRate: 5.8,
    neighbourhoods: ['Downtown', 'Leland Grove', 'Panther Creek', 'Jerome', 'Southern View', 'Koke Mill', 'Springfield Plaza', 'Old Aristocracy Hill'],
    transitInfo: 'SMTD buses serve the Springfield metro area.',
    description: 'Illinois\' capital offers state-government stability and the most affordable rent in the state.',
    province: IL_PROVINCE,
  },
]

// ---------------------------------------------------------------------------
// US states (5 footer-linked + core market data)
// ---------------------------------------------------------------------------

const US_STATES: FallbackProvince[] = [
  {
    _id: 'state-florida-static',
    title: 'Florida',
    slug: { current: 'florida' },
    country: 'us',
    abbreviation: 'FL',
    description:
      'Florida\'s rental market is driven by population inflows from the Northeast and international investors. Demand is strongest in Miami, Tampa, and Orlando metros with seasonal spikes from snowbird renters.',
    cities: [
      { title: 'Miami', slug: { current: 'miami' }, tier: 2, population: 442000, medianRent: 3100, provinceSlug: 'florida' },
      { title: 'Orlando', slug: { current: 'orlando' }, tier: 2, population: 309000, medianRent: 2300, provinceSlug: 'florida' },
      { title: 'Tampa', slug: { current: 'tampa' }, tier: 2, population: 398000, medianRent: 2450, provinceSlug: 'florida' },
      { title: 'Jacksonville', slug: { current: 'jacksonville' }, tier: 2, population: 971000, medianRent: 1850, provinceSlug: 'florida' },
      { title: 'Fort Lauderdale', slug: { current: 'fort-lauderdale' }, tier: 2, population: 184000, medianRent: 2750, provinceSlug: 'florida' },
    ],
  },
  {
    _id: 'state-texas-static',
    title: 'Texas',
    slug: { current: 'texas' },
    country: 'us',
    abbreviation: 'TX',
    description:
      'Texas is the fastest-growing state by new-resident rental demand. Austin, Houston, and the DFW metroplex lead in managed-property inventory, with strong rent growth in Tier-1 submarkets.',
    cities: [
      { title: 'Austin', slug: { current: 'austin' }, tier: 2, population: 966000, medianRent: 2400, provinceSlug: 'texas' },
      { title: 'Houston', slug: { current: 'houston' }, tier: 2, population: 2300000, medianRent: 1850, provinceSlug: 'texas' },
      { title: 'Dallas', slug: { current: 'dallas' }, tier: 2, population: 1300000, medianRent: 1950, provinceSlug: 'texas' },
      { title: 'San Antonio', slug: { current: 'san-antonio' }, tier: 2, population: 1470000, medianRent: 1650, provinceSlug: 'texas' },
      { title: 'Fort Worth', slug: { current: 'fort-worth' }, tier: 2, population: 958000, medianRent: 1700, provinceSlug: 'texas' },
    ],
  },
  {
    _id: 'state-california-static',
    title: 'California',
    slug: { current: 'california' },
    country: 'us',
    abbreviation: 'CA',
    description:
      'California rentals are the most competitive in North America with strict tenant-protection statutes. Our California advisors specialize in AB-1482 compliance and Costa-Hawkins considerations.',
    cities: [
      { title: 'Los Angeles', slug: { current: 'los-angeles' }, tier: 2, population: 3890000, medianRent: 2950, provinceSlug: 'california' },
      { title: 'San Diego', slug: { current: 'san-diego' }, tier: 2, population: 1386000, medianRent: 2800, provinceSlug: 'california' },
      { title: 'San Francisco', slug: { current: 'san-francisco' }, tier: 2, population: 808000, medianRent: 3400, provinceSlug: 'california' },
      { title: 'San Jose', slug: { current: 'san-jose' }, tier: 2, population: 1013000, medianRent: 3200, provinceSlug: 'california' },
      { title: 'Sacramento', slug: { current: 'sacramento' }, tier: 2, population: 525000, medianRent: 2050, provinceSlug: 'california' },
    ],
  },
  {
    _id: 'state-new-york-static',
    title: 'New York',
    slug: { current: 'new-york' },
    country: 'us',
    abbreviation: 'NY',
    description:
      'New York\'s rental market spans Manhattan\'s ultra-competitive submarkets through emerging Brooklyn and Queens neighborhoods. Rent stabilization rules and DHCR registration are central to compliant management.',
    cities: [
      { title: 'New York City', slug: { current: 'new-york-city' }, tier: 2, population: 8336000, medianRent: 3800, provinceSlug: 'new-york' },
      { title: 'Buffalo', slug: { current: 'buffalo' }, tier: 2, population: 278000, medianRent: 1250, provinceSlug: 'new-york' },
      { title: 'Rochester', slug: { current: 'rochester' }, tier: 2, population: 211000, medianRent: 1200, provinceSlug: 'new-york' },
      { title: 'Albany', slug: { current: 'albany' }, tier: 2, population: 99000, medianRent: 1550, provinceSlug: 'new-york' },
      { title: 'Syracuse', slug: { current: 'syracuse' }, tier: 2, population: 148000, medianRent: 1150, provinceSlug: 'new-york' },
    ],
  },
  {
    _id: 'state-illinois-static',
    title: 'Illinois',
    slug: { current: 'illinois' },
    country: 'us',
    abbreviation: 'IL',
    description:
      'Illinois rentals are concentrated in the Chicago metro, with growing demand in collar counties. The Residential Tenants\' Right to Repair Act and Chicago RLTO shape our compliance playbook.',
    cities: [
      { title: 'Chicago', slug: { current: 'chicago' }, tier: 2, population: 2697000, medianRent: 2150, provinceSlug: 'illinois' },
      { title: 'Aurora', slug: { current: 'aurora' }, tier: 2, population: 180000, medianRent: 1650, provinceSlug: 'illinois' },
      { title: 'Naperville', slug: { current: 'naperville' }, tier: 2, population: 149000, medianRent: 2100, provinceSlug: 'illinois' },
      { title: 'Rockford', slug: { current: 'rockford' }, tier: 2, population: 148000, medianRent: 1100, provinceSlug: 'illinois' },
      { title: 'Springfield', slug: { current: 'springfield' }, tier: 2, population: 114000, medianRent: 1050, provinceSlug: 'illinois' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Ontario province (aggregates the Ontario cities above)
// ---------------------------------------------------------------------------

const ONTARIO_PROVINCE: FallbackProvince = {
  _id: 'province-ontario-static',
  title: 'Ontario',
  slug: { current: 'ontario' },
  country: 'ca',
  abbreviation: 'ON',
  description:
    'Ontario is Canada\'s largest rental market, home to over 40% of all managed properties in the country. From the Greater Toronto Area to university towns like Waterloo and London, MoveSmart serves every Tier-1 Ontario market with a local in-market team.',
  cities: ONTARIO_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'ontario',
  })),
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

const SERVICES: FallbackService[] = [
  {
    _id: 'service-tenant-placement-static',
    _type: 'service',
    title: 'Tenant Placement',
    slug: { current: 'tenant-placement' },
    shortDescription:
      'End-to-end tenant placement: professional photography, MLS syndication, showings, screening, and lease execution. You pay nothing until the unit is leased.',
    audience: 'owner',
    order: 1,
  },
  {
    _id: 'service-tenant-screening-static',
    _type: 'service',
    title: 'Tenant Screening',
    slug: { current: 'tenant-screening' },
    shortDescription:
      'Seven-point screening: Equifax credit pull, employment verification, landlord references, ID verification, and a decision-ready summary report for every applicant.',
    audience: 'owner',
    order: 2,
  },
  {
    _id: 'service-rent-guarantee-static',
    _type: 'service',
    title: 'Rent Guarantee',
    slug: { current: 'rent-guarantee' },
    shortDescription:
      'Backed-in rent protection so you get paid even if your tenant does not. We cover up to 6 months of lost rent while handling the LTB process on your behalf.',
    audience: 'owner',
    order: 3,
  },
  {
    _id: 'service-rental-preparation-static',
    _type: 'service',
    title: 'Rental Preparation',
    slug: { current: 'rental-preparation' },
    shortDescription:
      'Make-ready services before the listing goes live: repair punch-list, deep clean, smoke/CO check, paint touch-ups, and light staging where it lifts photo quality.',
    audience: 'owner',
    order: 4,
  },
  {
    _id: 'service-leasing-services-static',
    _type: 'service',
    title: 'Leasing Services',
    slug: { current: 'leasing-services' },
    shortDescription:
      'Full-cycle leasing: OREA-standard or province-specific lease drafting, rider attachment, deposit collection, e-signature, and move-in coordination.',
    audience: 'owner',
    order: 5,
  },
]

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getFallbackCaCity(slug: string): FallbackCity | null {
  return ONTARIO_CITIES.find((c) => c.slug.current === slug) ?? null
}

export function getFallbackUsCity(slug: string): FallbackCity | null {
  return US_CITIES.find((c) => c.slug.current === slug) ?? null
}

/** Look up any city by slug (CA or US) */
export function getFallbackCity(slug: string): FallbackCity | null {
  return getFallbackCaCity(slug) ?? getFallbackUsCity(slug)
}

export function getFallbackProvince(slug: string): FallbackProvince | null {
  if (slug === 'ontario') return ONTARIO_PROVINCE
  return US_STATES.find((s) => s.slug.current === slug) ?? null
}

export function getFallbackService(slug: string): FallbackService | null {
  return SERVICES.find((s) => s.slug.current === slug) ?? null
}

export function getFallbackServiceList(): FallbackService[] {
  return SERVICES
}

export function getFallbackCityList(): Array<{
  title: string
  slug: { current: string }
  provinceSlug: string
  population?: number
  medianRent?: number
  heroImageUrl?: string
  heroImageAlt?: string
}> {
  const caCities = ONTARIO_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    provinceSlug: 'ontario',
    population: c.population,
    medianRent: c.medianRent,
    heroImageUrl: c.heroImageUrl,
    heroImageAlt: c.heroImageAlt,
  }))
  const usCities = US_STATES.flatMap((s) =>
    s.cities.map((c) => ({
      title: c.title,
      slug: c.slug,
      provinceSlug: s.slug.current,
      population: c.population,
      medianRent: c.medianRent,
    }))
  )
  return [...caCities, ...usCities]
}
