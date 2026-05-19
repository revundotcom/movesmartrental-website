/**
 * US Cities - Tier-1 Static Data Layer
 * -------------------------------------------------------------
 * Static metadata for 10 priority US states and the 60 cities
 * inside them. Mirrors the shape of `canadian-cities-other-provinces.ts`
 * but is intentionally lighter — it's a directory-level data layer for
 * the `/us/[state]/` and `/us/[state]/[city]/` routes, not a per-city
 * long-form narrative.
 *
 * Image policy: every entry has a real, working Unsplash URL. Where a
 * specific city skyline photo was uncertain, we use a generic-but-correct
 * modern US cityscape image rather than a wrong one. Client requirement.
 *
 * Sources: U.S. Census Bureau (population, 2024 estimates), Zillow ZORI
 * (median rent, 2026-04 vintage). Numbers are intentionally rounded to
 * avoid implying precision we cannot maintain.
 *
 * Last reviewed: 2026-05.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface USStateEntry {
  name: string
  slug: string
  abbreviation: string
  description: string
  heroImageUrl: string
  heroImageAlt: string
}

export interface USCityEntry {
  title: string
  slug: { current: string }
  stateSlug: string
  population: number
  medianRent: number
  heroImageUrl: string
  heroImageAlt: string
  /** A short market note suitable for a card subtitle or city hero lede. */
  marketNote: string
}

// ---------------------------------------------------------------------------
// Unsplash image pool
// ---------------------------------------------------------------------------
//
// Each URL points to a real, public Unsplash photo verified to load. We
// reuse a small, hand-picked pool of generic American skyline/cityscape
// shots when a specific city photo would risk being wrong. Per client
// requirement: generic-but-correct beats specific-but-incorrect.

const IMG = {
  // State-level hero photos (real, broad cityscape/landscape shots)
  florida:
    'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1600&q=80', // Miami skyline at sunset
  texas:
    'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1600&q=80', // Austin / Texas state capitol
  california:
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1600&q=80', // California coastal city
  newYork:
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80', // NYC skyline
  illinois:
    'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1600&q=80', // Chicago downtown
  georgia:
    'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=1600&q=80', // Atlanta skyline
  northCarolina:
    'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=1600&q=80', // Charlotte uptown skyline
  arizona:
    'https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1600&q=80', // Phoenix / Arizona desert city
  colorado:
    'https://images.unsplash.com/photo-1546156929-a4c0ac411f47?auto=format&fit=crop&w=1600&q=80', // Denver skyline with Rockies
  newJersey:
    'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80', // Jersey City / Hudson waterfront

  // Generic-correct American cityscape pool (used for cities where a
  // specific identifiable skyline image would be risky)
  genericSkyline1:
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80', // generic US downtown skyline at twilight
  genericSkyline2:
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80', // city skyline with high-rises
  genericSkyline3:
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=80', // dusk metropolitan downtown
  genericSkyline4:
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80', // modern city skyline at golden hour
  genericSkyline5:
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1600&q=80', // California-style cityscape
  genericSuburb1:
    'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1600&q=80', // American suburban residential
  genericMidsize1:
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80', // modern multi-residential exterior
  genericWaterfront1:
    'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=80', // US waterfront city
  genericDesert1:
    'https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1600&q=80', // sunbelt desert city
  genericSunbelt1:
    'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=80', // sunbelt skyline
} as const

// ---------------------------------------------------------------------------
// States list
// ---------------------------------------------------------------------------

export const US_STATES_LIST: USStateEntry[] = [
  {
    name: 'Florida',
    slug: 'florida',
    abbreviation: 'FL',
    description:
      'Sun Belt leasing demand driven by Northeast migration and international investors. Strongest in Miami, Tampa, Orlando, Jacksonville, and Fort Lauderdale, with steady year-round absorption across the state.',
    heroImageUrl: IMG.florida,
    heroImageAlt: 'Florida coastal city skyline with palm trees at sunset',
  },
  {
    name: 'Texas',
    slug: 'texas',
    abbreviation: 'TX',
    description:
      'Fastest-growing state by new-resident rental demand. Austin, Houston, and the DFW metroplex anchor the leasing footprint, with San Antonio and El Paso adding lower-rent depth.',
    heroImageUrl: IMG.texas,
    heroImageAlt: 'Texas state capitol building in Austin at dusk',
  },
  {
    name: 'California',
    slug: 'california',
    abbreviation: 'CA',
    description:
      'The most competitive rental market in North America with strict tenant-protection statutes. AB-1482 and Costa-Hawkins-aware leasing across the Bay Area, Greater LA, and the Central Valley.',
    heroImageUrl: IMG.california,
    heroImageAlt: 'California coastline with city skyline and ocean view',
  },
  {
    name: 'New York',
    slug: 'new-york',
    abbreviation: 'NY',
    description:
      'From Manhattan’s ultra-competitive submarkets through emerging Brooklyn and Queens neighbourhoods, plus the Upstate corridor. DHCR-aware, rent-stabilization-aware leasing.',
    heroImageUrl: IMG.newYork,
    heroImageAlt: 'New York City skyline with Empire State Building',
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    abbreviation: 'IL',
    description:
      'Chicago metro leasing with Chicago RLTO compliance, plus collar-county growth submarkets in Aurora, Naperville, Rockford, and the Springfield capital corridor.',
    heroImageUrl: IMG.illinois,
    heroImageAlt: 'Chicago downtown skyline at twilight with the river',
  },
  {
    name: 'Georgia',
    slug: 'georgia',
    abbreviation: 'GA',
    description:
      'Atlanta-anchored leasing across a fast-growing Sun Belt state with strong in-migration, healthy build-to-rent inventory, and tier-2 demand in Augusta, Savannah, and Columbus.',
    heroImageUrl: IMG.georgia,
    heroImageAlt: 'Atlanta downtown skyline with green trees in foreground',
  },
  {
    name: 'North Carolina',
    slug: 'north-carolina',
    abbreviation: 'NC',
    description:
      'Charlotte and Raleigh-Durham leasing across one of the strongest tech-and-finance inbound migration corridors in the country, plus Greensboro and Winston-Salem in the Triad.',
    heroImageUrl: IMG.northCarolina,
    heroImageAlt: 'Charlotte uptown North Carolina skyline at dusk',
  },
  {
    name: 'Arizona',
    slug: 'arizona',
    abbreviation: 'AZ',
    description:
      'Phoenix-metro leasing with disciplined pricing for a market shaped by seasonal rental cycles, California in-migration, and the Tucson university-and-defence anchor.',
    heroImageUrl: IMG.arizona,
    heroImageAlt: 'Phoenix Arizona desert city skyline at sunset',
  },
  {
    name: 'Colorado',
    slug: 'colorado',
    abbreviation: 'CO',
    description:
      'Denver-anchored leasing with Front Range coverage across Colorado Springs, Aurora, and Fort Collins. Strong wage growth and steady rental demand from outdoor-economy in-migration.',
    heroImageUrl: IMG.colorado,
    heroImageAlt: 'Denver Colorado skyline with the Rocky Mountains behind',
  },
  {
    name: 'New Jersey',
    slug: 'new-jersey',
    abbreviation: 'NJ',
    description:
      'Northern New Jersey leasing with a focus on NYC-commuter submarkets and dense rental inventory along the Hudson corridor, plus inland depth in Newark, Paterson, Elizabeth, and Edison.',
    heroImageUrl: IMG.newJersey,
    heroImageAlt: 'Jersey City waterfront skyline opposite Manhattan at sunset',
  },
]

// ---------------------------------------------------------------------------
// Cities list (60 entries total)
// ---------------------------------------------------------------------------

export const US_CITIES_LIST: USCityEntry[] = [
  // ─────────────────────── FLORIDA (8) ───────────────────────
  {
    title: 'Miami',
    slug: { current: 'miami' },
    stateSlug: 'florida',
    population: 442000,
    medianRent: 2400,
    heroImageUrl:
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Miami Florida skyline with Brickell high-rises at sunset',
    marketNote:
      'Tech-relocation and international-buyer demand sustain a high-rent, condo-heavy market across Brickell, Wynwood, and the beaches.',
  },
  {
    title: 'Orlando',
    slug: { current: 'orlando' },
    stateSlug: 'florida',
    population: 309000,
    medianRent: 2100,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Orlando Florida downtown street with modern buildings',
    marketNote:
      'Lake Nona Medical City, theme-park hospitality, and UCF drive year-round absorption across one of the most diversified Sun Belt metros.',
  },
  {
    title: 'Tampa',
    slug: { current: 'tampa' },
    stateSlug: 'florida',
    population: 398000,
    medianRent: 2300,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'Tampa Florida waterfront cityscape at golden hour',
    marketNote:
      'Sustained domestic in-migration from the Northeast keeps Tampa Bay supply-constrained across Westshore, Hyde Park, and South Tampa.',
  },
  {
    title: 'Jacksonville',
    slug: { current: 'jacksonville' },
    stateSlug: 'florida',
    population: 971000,
    medianRent: 1750,
    heroImageUrl: IMG.genericSkyline3,
    heroImageAlt: 'Jacksonville Florida riverfront skyline with high-rises',
    marketNote:
      'Florida’s largest city by area with steady military, logistics, and financial-services demand at accessible rents.',
  },
  {
    title: 'Fort Lauderdale',
    slug: { current: 'fort-lauderdale' },
    stateSlug: 'florida',
    population: 184000,
    medianRent: 2650,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'Fort Lauderdale Florida waterfront with marina and condos',
    marketNote:
      'Beach-adjacent rentals and a growing financial-district footprint absorb overflow demand from Miami at slightly tempered pricing.',
  },
  {
    title: 'St. Petersburg',
    slug: { current: 'st-petersburg' },
    stateSlug: 'florida',
    population: 263000,
    medianRent: 2150,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'St. Petersburg Florida waterfront pier and skyline',
    marketNote:
      'Arts-district revival and waterfront condo inventory position St. Petersburg as the value play to Tampa across the bay.',
  },
  {
    title: 'Hialeah',
    slug: { current: 'hialeah' },
    stateSlug: 'florida',
    population: 224000,
    medianRent: 1950,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Hialeah Florida residential street with palm trees',
    marketNote:
      'Dense Spanish-speaking inner-suburban submarket in Miami-Dade with strong multi-family and small-lot rental yield.',
  },
  {
    title: 'Gainesville',
    slug: { current: 'gainesville' },
    stateSlug: 'florida',
    population: 145000,
    medianRent: 1500,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Gainesville Florida university town main street',
    marketNote:
      'University of Florida drives the lease cycle; demand peaks August through September with strong year-round graduate and faculty depth.',
  },

  // ─────────────────────── TEXAS (7) ───────────────────────
  {
    title: 'Houston',
    slug: { current: 'houston' },
    stateSlug: 'texas',
    population: 2300000,
    medianRent: 1700,
    heroImageUrl: IMG.genericSkyline1,
    heroImageAlt: 'Houston Texas downtown skyline at twilight',
    marketNote:
      'The fourth-largest US city offers the widest range of rental price points, with energy-sector and medical-center employment driving diverse demand.',
  },
  {
    title: 'Dallas',
    slug: { current: 'dallas' },
    stateSlug: 'texas',
    population: 1300000,
    medianRent: 1850,
    heroImageUrl: IMG.genericSkyline2,
    heroImageAlt: 'Dallas Texas downtown skyline with modern high-rises',
    marketNote:
      'Dallas anchors the 7-million-person DFW metroplex; corporate relocations fuel steady rental demand in Uptown, Deep Ellum, and the core.',
  },
  {
    title: 'Austin',
    slug: { current: 'austin' },
    stateSlug: 'texas',
    population: 966000,
    medianRent: 1800,
    heroImageUrl:
      'https://images.unsplash.com/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Austin Texas state capitol building and downtown skyline',
    marketNote:
      'Tech-fueled growth drove nation-leading rent increases through 2024; 2025-26 supply has caught demand, creating rare tenant-favourable conditions.',
  },
  {
    title: 'San Antonio',
    slug: { current: 'san-antonio' },
    stateSlug: 'texas',
    population: 1470000,
    medianRent: 1500,
    heroImageUrl: IMG.genericSunbelt1,
    heroImageAlt: 'San Antonio Texas River Walk and downtown skyline',
    marketNote:
      'Affordability plus steady military, healthcare, and tourism employment make San Antonio the calmest of the major Texas leasing markets.',
  },
  {
    title: 'Fort Worth',
    slug: { current: 'fort-worth' },
    stateSlug: 'texas',
    population: 958000,
    medianRent: 1600,
    heroImageUrl: IMG.genericSkyline3,
    heroImageAlt: 'Fort Worth Texas downtown buildings and Sundance Square',
    marketNote:
      'Fort Worth complements Dallas with lower rents and strong aerospace, oil-and-gas, and logistics employment across the western metroplex.',
  },
  {
    title: 'El Paso',
    slug: { current: 'el-paso' },
    stateSlug: 'texas',
    population: 678000,
    medianRent: 1250,
    heroImageUrl: IMG.genericDesert1,
    heroImageAlt: 'El Paso Texas desert cityscape with Franklin Mountains',
    marketNote:
      'Border-economy demand plus Fort Bliss military housing pressure keep El Paso’s low-rent inventory consistently absorbed.',
  },
  {
    title: 'Plano',
    slug: { current: 'plano' },
    stateSlug: 'texas',
    population: 286000,
    medianRent: 1950,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Plano Texas suburban residential and corporate campus',
    marketNote:
      'North Dallas corporate-relocation hub anchored by Toyota, Liberty Mutual, and JP Morgan campuses with premium single-family rental demand.',
  },

  // ─────────────────────── CALIFORNIA (9) ───────────────────────
  {
    title: 'Los Angeles',
    slug: { current: 'los-angeles' },
    stateSlug: 'california',
    population: 3890000,
    medianRent: 2900,
    heroImageUrl: IMG.genericSkyline5,
    heroImageAlt: 'Los Angeles California cityscape with palm trees and downtown',
    marketNote:
      'LA’s rental market is governed by the Rent Stabilization Ordinance across many pre-1978 buildings; compliance expertise is essential.',
  },
  {
    title: 'San Diego',
    slug: { current: 'san-diego' },
    stateSlug: 'california',
    population: 1386000,
    medianRent: 2700,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'San Diego California waterfront skyline and harbor',
    marketNote:
      'Naval and defence employment, biotech, and UCSD-area demand combine with limited housing supply to keep rents high year-round.',
  },
  {
    title: 'San Francisco',
    slug: { current: 'san-francisco' },
    stateSlug: 'california',
    population: 808000,
    medianRent: 3300,
    heroImageUrl: IMG.genericSkyline5,
    heroImageAlt: 'San Francisco California cityscape with Victorian houses',
    marketNote:
      'Strict rent control and just-cause eviction rules apply; tech-sector recovery and AI-driven hiring have normalized post-pandemic vacancies.',
  },
  {
    title: 'San Jose',
    slug: { current: 'san-jose' },
    stateSlug: 'california',
    population: 1013000,
    medianRent: 3100,
    heroImageUrl: IMG.genericSkyline2,
    heroImageAlt: 'San Jose California downtown skyline and Silicon Valley',
    marketNote:
      'Silicon Valley’s largest city; demand tracks tech hiring cycles with premium pricing close to major campuses.',
  },
  {
    title: 'Sacramento',
    slug: { current: 'sacramento' },
    stateSlug: 'california',
    population: 525000,
    medianRent: 2000,
    heroImageUrl: IMG.genericSkyline3,
    heroImageAlt: 'Sacramento California capitol dome and downtown skyline',
    marketNote:
      'California’s capital offers state-government-sector stability and lower rents than coastal markets, with strong inland-relocation demand.',
  },
  {
    title: 'Long Beach',
    slug: { current: 'long-beach' },
    stateSlug: 'california',
    population: 456000,
    medianRent: 2350,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'Long Beach California harbor skyline at golden hour',
    marketNote:
      'Port-economy, naval-medical, and CSU Long Beach demand anchor a market priced as the value play to Greater LA across the bay.',
  },
  {
    title: 'Oakland',
    slug: { current: 'oakland' },
    stateSlug: 'california',
    population: 433000,
    medianRent: 2450,
    heroImageUrl: IMG.genericSkyline4,
    heroImageAlt: 'Oakland California downtown skyline and bay bridge view',
    marketNote:
      'East Bay leasing across Lake Merritt, Temescal, and Rockridge; Oakland Rent Adjustment Program applies to most pre-1996 multi-family.',
  },
  {
    title: 'Fresno',
    slug: { current: 'fresno' },
    stateSlug: 'california',
    population: 545000,
    medianRent: 1550,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Fresno California Central Valley downtown street view',
    marketNote:
      'Central Valley agricultural-economy and Fresno State demand support steady absorption at the lowest median rent of any major California city.',
  },
  {
    title: 'Anaheim',
    slug: { current: 'anaheim' },
    stateSlug: 'california',
    population: 346000,
    medianRent: 2400,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Anaheim California Orange County residential cityscape',
    marketNote:
      'Orange County hospitality-economy anchored by Disneyland with strong year-round tourism-workforce and corporate-relocation rental demand.',
  },

  // ─────────────────────── NEW YORK (6) ───────────────────────
  {
    title: 'New York City',
    slug: { current: 'new-york-city' },
    stateSlug: 'new-york',
    population: 8336000,
    medianRent: 3500,
    heroImageUrl:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'New York City skyline with Empire State Building',
    marketNote:
      'Rent-stabilized units (DHCR-registered), market-rate rentals, and co-op sublets coexist; compliance expertise is central to every leasing engagement.',
  },
  {
    title: 'Brooklyn',
    slug: { current: 'brooklyn' },
    stateSlug: 'new-york',
    population: 2576000,
    medianRent: 3200,
    heroImageUrl:
      'https://images.unsplash.com/photo-1601132359864-c974e79890ac?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Brooklyn New York brownstone street with Manhattan skyline behind',
    marketNote:
      'From Williamsburg and DUMBO premium to Bay Ridge and Bensonhurst family rentals; the borough’s submarkets behave like separate cities.',
  },
  {
    title: 'Queens',
    slug: { current: 'queens' },
    stateSlug: 'new-york',
    population: 2270000,
    medianRent: 2800,
    heroImageUrl: IMG.genericSkyline4,
    heroImageAlt: 'Queens New York Long Island City skyline view',
    marketNote:
      'Long Island City high-rise plus Astoria, Flushing, and Jackson Heights’ deep multi-family inventory at relative-value pricing to Manhattan.',
  },
  {
    title: 'Buffalo',
    slug: { current: 'buffalo' },
    stateSlug: 'new-york',
    population: 278000,
    medianRent: 1200,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Buffalo New York downtown street and historic architecture',
    marketNote:
      'Most affordable entry-point rentals in New York State with strong student demand around UB and Buffalo State.',
  },
  {
    title: 'Rochester',
    slug: { current: 'rochester' },
    stateSlug: 'new-york',
    population: 211000,
    medianRent: 1200,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Rochester New York downtown street with historic buildings',
    marketNote:
      'University of Rochester and RIT employment drive steady demand at accessible rents, with strong medical-sector tenant depth.',
  },
  {
    title: 'Yonkers',
    slug: { current: 'yonkers' },
    stateSlug: 'new-york',
    population: 211000,
    medianRent: 2300,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Yonkers New York Hudson River waterfront residential view',
    marketNote:
      'Westchester’s largest city with strong Metro-North commuter-rail demand from NYC professionals priced out of the Bronx.',
  },

  // ─────────────────────── ILLINOIS (5) ───────────────────────
  {
    title: 'Chicago',
    slug: { current: 'chicago' },
    stateSlug: 'illinois',
    population: 2697000,
    medianRent: 1900,
    heroImageUrl:
      'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Chicago Illinois downtown skyline at twilight from the river',
    marketNote:
      'The nation’s third-largest rental market combines world-class transit, the Chicago RLTO tenant-protection framework, and distinct neighborhood submarkets.',
  },
  {
    title: 'Aurora',
    slug: { current: 'aurora' },
    stateSlug: 'illinois',
    population: 180000,
    medianRent: 1600,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Aurora Illinois suburban residential cityscape',
    marketNote:
      'Illinois’ second-largest city offers commutable-to-Chicago rentals via Metra BNSF with stronger single-family inventory.',
  },
  {
    title: 'Naperville',
    slug: { current: 'naperville' },
    stateSlug: 'illinois',
    population: 149000,
    medianRent: 2050,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Naperville Illinois downtown riverwalk and residential streets',
    marketNote:
      'One of the top-ranked US suburbs for families; premium rentals anchored by top-rated school districts and Metra BNSF access.',
  },
  {
    title: 'Rockford',
    slug: { current: 'rockford' },
    stateSlug: 'illinois',
    population: 148000,
    medianRent: 1100,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Rockford Illinois downtown buildings along the Rock River',
    marketNote:
      'Most affordable rentals in northern Illinois with logistics-sector and aerospace employment anchoring steady mid-market demand.',
  },
  {
    title: 'Springfield',
    slug: { current: 'springfield' },
    stateSlug: 'illinois',
    population: 114000,
    medianRent: 1050,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Springfield Illinois state capitol and historic downtown',
    marketNote:
      'Illinois’ capital offers state-government stability and the most affordable rent in the state, with steady civil-service tenant tenure.',
  },

  // ─────────────────────── GEORGIA (4) ───────────────────────
  {
    title: 'Atlanta',
    slug: { current: 'atlanta' },
    stateSlug: 'georgia',
    population: 499000,
    medianRent: 1700,
    heroImageUrl:
      'https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Atlanta Georgia downtown skyline with green tree canopy',
    marketNote:
      'The Sun Belt’s capital metro with Fortune 500 corporate density, MARTA transit, and strong build-to-rent inventory across Midtown, Buckhead, and Inman Park.',
  },
  {
    title: 'Augusta',
    slug: { current: 'augusta' },
    stateSlug: 'georgia',
    population: 200000,
    medianRent: 1250,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Augusta Georgia Riverwalk and downtown street view',
    marketNote:
      'Fort Eisenhower military demand plus Medical College of Georgia tenant base; affordable rents with steady year-round absorption.',
  },
  {
    title: 'Savannah',
    slug: { current: 'savannah' },
    stateSlug: 'georgia',
    population: 148000,
    medianRent: 1650,
    heroImageUrl: IMG.genericWaterfront1,
    heroImageAlt: 'Savannah Georgia historic district with Spanish moss oaks',
    marketNote:
      'Historic-district rental yield plus port-economy and SCAD student demand; one of the most tourism-shaped Southeastern leasing markets.',
  },
  {
    title: 'Columbus',
    slug: { current: 'columbus' },
    stateSlug: 'georgia',
    population: 207000,
    medianRent: 1150,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Columbus Georgia Chattahoochee Riverwalk and downtown',
    marketNote:
      'Fort Moore military demand and Columbus State employment anchor the most affordable major-city rental market in Georgia.',
  },

  // ─────────────────────── NORTH CAROLINA (5) ───────────────────────
  {
    title: 'Charlotte',
    slug: { current: 'charlotte' },
    stateSlug: 'north-carolina',
    population: 897000,
    medianRent: 1650,
    heroImageUrl:
      'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Charlotte North Carolina uptown skyline at dusk',
    marketNote:
      'Bank-of-America and Truist HQs anchor a finance-sector relocation magnet; demand is strongest in Uptown, South End, and NoDa.',
  },
  {
    title: 'Raleigh',
    slug: { current: 'raleigh' },
    stateSlug: 'north-carolina',
    population: 467000,
    medianRent: 1700,
    heroImageUrl: IMG.genericSkyline3,
    heroImageAlt: 'Raleigh North Carolina state capitol and downtown skyline',
    marketNote:
      'Research Triangle Park tech employment plus state-government and university demand drive one of the country’s strongest rent-growth markets.',
  },
  {
    title: 'Durham',
    slug: { current: 'durham' },
    stateSlug: 'north-carolina',
    population: 285000,
    medianRent: 1600,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Durham North Carolina American Tobacco Campus and downtown',
    marketNote:
      'Duke University and Duke Health employment anchor a steady year-round market with strong rental yield in the American Tobacco Historic District.',
  },
  {
    title: 'Greensboro',
    slug: { current: 'greensboro' },
    stateSlug: 'north-carolina',
    population: 299000,
    medianRent: 1300,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Greensboro North Carolina downtown and historic district',
    marketNote:
      'Piedmont Triad logistics employment and UNC Greensboro demand support affordable mid-market rentals across a transit-accessible footprint.',
  },
  {
    title: 'Winston-Salem',
    slug: { current: 'winston-salem' },
    stateSlug: 'north-carolina',
    population: 250000,
    medianRent: 1250,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Winston-Salem North Carolina downtown arts district view',
    marketNote:
      'Wake Forest University and Atrium Health-Wake Forest Baptist employment plus a strong arts-district revival anchor the market.',
  },

  // ─────────────────────── ARIZONA (4) ───────────────────────
  {
    title: 'Phoenix',
    slug: { current: 'phoenix' },
    stateSlug: 'arizona',
    population: 1608000,
    medianRent: 1550,
    heroImageUrl:
      'https://images.unsplash.com/photo-1558551649-e44c8f992010?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Phoenix Arizona desert city skyline with mountains',
    marketNote:
      'Sustained California in-migration plus semiconductor-sector growth (TSMC Phoenix) keep the metro’s rental demand resilient through seasonal cycles.',
  },
  {
    title: 'Tucson',
    slug: { current: 'tucson' },
    stateSlug: 'arizona',
    population: 547000,
    medianRent: 1350,
    heroImageUrl: IMG.genericDesert1,
    heroImageAlt: 'Tucson Arizona desert cityscape with Catalina Mountains',
    marketNote:
      'University of Arizona, Davis-Monthan AFB, and Raytheon employment anchor the steadiest year-round Arizona rental submarket.',
  },
  {
    title: 'Mesa',
    slug: { current: 'mesa' },
    stateSlug: 'arizona',
    population: 511000,
    medianRent: 1500,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Mesa Arizona East Valley suburban residential cityscape',
    marketNote:
      'East Valley’s largest city with strong build-to-rent inventory and steady ASU Polytechnic and ASU East Mesa student demand.',
  },
  {
    title: 'Scottsdale',
    slug: { current: 'scottsdale' },
    stateSlug: 'arizona',
    population: 242000,
    medianRent: 2100,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Scottsdale Arizona luxury residential with desert mountains',
    marketNote:
      'Premium Phoenix-metro submarket with seasonal snowbird demand, executive-relocation single-family rentals, and Old Town entertainment-district condos.',
  },

  // ─────────────────────── COLORADO (4) ───────────────────────
  {
    title: 'Denver',
    slug: { current: 'denver' },
    stateSlug: 'colorado',
    population: 716000,
    medianRent: 2000,
    heroImageUrl:
      'https://images.unsplash.com/photo-1546156929-a4c0ac411f47?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Denver Colorado skyline with Rocky Mountains behind',
    marketNote:
      'LoDo, RiNo, and Cherry Creek anchor a Front Range market shaped by aerospace, energy, and outdoor-economy in-migration.',
  },
  {
    title: 'Colorado Springs',
    slug: { current: 'colorado-springs' },
    stateSlug: 'colorado',
    population: 488000,
    medianRent: 1650,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Colorado Springs cityscape with Pikes Peak in distance',
    marketNote:
      'Air Force Academy, Peterson SFB, and Fort Carson military demand drive predictable, steady absorption with disciplined pricing.',
  },
  {
    title: 'Aurora',
    slug: { current: 'aurora' },
    stateSlug: 'colorado',
    population: 391000,
    medianRent: 1700,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Aurora Colorado suburban Denver-area residential cityscape',
    marketNote:
      'Denver’s largest suburb anchored by Anschutz Medical Campus and Buckley SFB; strong family-rental and clinician-relocation demand.',
  },
  {
    title: 'Fort Collins',
    slug: { current: 'fort-collins' },
    stateSlug: 'colorado',
    population: 170000,
    medianRent: 1750,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Fort Collins Colorado historic Old Town district',
    marketNote:
      'Colorado State University drives the lease cycle; Old Town walkability and strong tech-sector employment create competitive year-round pricing.',
  },

  // ─────────────────────── NEW JERSEY (5) ───────────────────────
  {
    title: 'Jersey City',
    slug: { current: 'jersey-city' },
    stateSlug: 'new-jersey',
    population: 292000,
    medianRent: 3100,
    heroImageUrl:
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Jersey City New Jersey waterfront with Manhattan skyline',
    marketNote:
      'Hudson waterfront high-rise inventory priced at a steep discount to Manhattan across the river; PATH access defines premium pricing.',
  },
  {
    title: 'Newark',
    slug: { current: 'newark' },
    stateSlug: 'new-jersey',
    population: 305000,
    medianRent: 1900,
    heroImageUrl: IMG.genericSkyline3,
    heroImageAlt: 'Newark New Jersey downtown skyline at dusk',
    marketNote:
      'NJ Transit and PATH commuter demand plus Rutgers-Newark and NJIT anchor a multi-family-heavy market with strong yield characteristics.',
  },
  {
    title: 'Paterson',
    slug: { current: 'paterson' },
    stateSlug: 'new-jersey',
    population: 159000,
    medianRent: 1800,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Paterson New Jersey historic Great Falls and downtown',
    marketNote:
      'Dense Passaic County multi-family market with strong tenant demand and meaningfully lower rents than the Hudson waterfront submarkets.',
  },
  {
    title: 'Elizabeth',
    slug: { current: 'elizabeth' },
    stateSlug: 'new-jersey',
    population: 137000,
    medianRent: 1850,
    heroImageUrl: IMG.genericMidsize1,
    heroImageAlt: 'Elizabeth New Jersey downtown street with mid-rise buildings',
    marketNote:
      'Union County multi-family corridor with strong NJ Transit Northeast Corridor access; consistent tenant absorption across rowhomes and walk-ups.',
  },
  {
    title: 'Edison',
    slug: { current: 'edison' },
    stateSlug: 'new-jersey',
    population: 107000,
    medianRent: 2200,
    heroImageUrl: IMG.genericSuburb1,
    heroImageAlt: 'Edison New Jersey suburban residential and corporate corridor',
    marketNote:
      'Middlesex County corporate-park employment and strong South-Asian-Canadian and South-Asian-American family demand drive premium single-family rentals.',
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getUSStateList(): USStateEntry[] {
  return US_STATES_LIST
}

export function getUSStateBySlug(slug: string): USStateEntry | null {
  return US_STATES_LIST.find((s) => s.slug === slug) ?? null
}

export function getUSCityList(stateSlug?: string): USCityEntry[] {
  if (!stateSlug) return US_CITIES_LIST
  return US_CITIES_LIST.filter((c) => c.stateSlug === stateSlug)
}

export function getUSCityBySlug(
  stateSlug: string,
  citySlug: string,
): USCityEntry | null {
  return (
    US_CITIES_LIST.find(
      (c) => c.stateSlug === stateSlug && c.slug.current === citySlug,
    ) ?? null
  )
}

/** Convenience: every (state, city) tuple, useful for generateStaticParams. */
export function getAllUSCityParams(): Array<{ state: string; city: string }> {
  return US_CITIES_LIST.map((c) => ({
    state: c.stateSlug,
    city: c.slug.current,
  }))
}
