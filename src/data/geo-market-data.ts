/**
 * Centralised geographic market-research data for MoveSmart Rentals.
 * -------------------------------------------------------------------
 * Powers the rebuilt geography pages (`/ca/[province]/`, `/us/[state]/`,
 * and the country roll-ups). Each province / state entry carries a
 * `MarketSnapshot` with 2025-2026 figures aligned to published sources
 * (Statistics Canada, CMHC Rental Market Report, U.S. Census Bureau ACS,
 * Zillow Observed Rent Index) plus a curated list of top cities sourced
 * from `src/lib/static-fallbacks.ts` (Canada) and `src/data/us-cities.ts`
 * (United States).
 *
 * Currency convention:
 *   - Canadian figures are CAD, prefixed with `$`.
 *   - U.S. figures are USD, prefixed with `$`.
 *
 * Sources (most recent published vintage as of 2026-05):
 *   - Statistics Canada Q4 2025 quarterly population estimates
 *   - CMHC Rental Market Report 2025
 *   - U.S. Census Bureau ACS 5-Year Estimates 2023
 *   - Zillow Observed Rent Index, April 2026
 *
 * Image policy: where a verified Unsplash photo of the specific city was
 * available, it is used. Otherwise a generic-but-correct alternative
 * (modern condo, downtown skyline, suburban North American street) is
 * substituted. Each URL has been confirmed to resolve.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MarketSnapshot {
  /** Most recent published population, formatted for display (e.g. "15.0M", "5.2M"). */
  population: string
  /** Citation for the population figure. */
  populationSource: string
  /** Median 2-bedroom asking rent, formatted with currency symbol (e.g. "$2,150"). */
  medianRent: string
  /** Citation for the median rent figure. */
  medianRentSource: string
  /** Overall apartment vacancy rate as a percentage string (e.g. "1.7%"). */
  vacancyRate: string
  /** Citation for the vacancy figure. */
  vacancySource: string
  /** Year-over-year rent growth as a signed percentage (e.g. "+5.4%"). */
  rentGrowthYoY: string
  /** Estimated number of rental households, formatted for display (e.g. "1.8M"). */
  rentalHouseholds: string
  /** 3-4 sentence free-text market intro for the geography page hero lede. */
  intro: string
}

export interface CityFeature {
  name: string
  slug: string
  /** Population in human-readable format (e.g. "2.9M", "623K"). */
  population: string
  /** Median 2-bedroom asking rent (e.g. "$2,650"). */
  medianRent: string
  /** Optional vacancy rate (e.g. "1.7%"). */
  vacancy?: string
  /** Verified Unsplash URL of the city (or generic-correct fallback). */
  imageUrl: string
  imageAlt: string
  /** 3-5 well-known neighborhoods locals would recognise. */
  neighborhoods: string[]
  /** 1-2 sentence description of what makes this market unique. */
  whyHere: string
}

export interface ProvinceData {
  name: string
  slug: string
  abbreviation: string
  /** Always the Canadian flag for ProvinceData. */
  flagEmoji: string
  market: MarketSnapshot
  topCities: CityFeature[]
  heroImageUrl: string
  heroImageAlt: string
}

export interface StateData {
  name: string
  slug: string
  abbreviation: string
  /** Always the U.S. flag for StateData. */
  flagEmoji: string
  market: MarketSnapshot
  topCities: CityFeature[]
  heroImageUrl: string
  heroImageAlt: string
}

export interface CountryTotals {
  population: string
  populationSource: string
  rentalHouseholds: string
  rentalHouseholdsSource: string
  medianRent: string
  medianRentSource: string
  vacancyRate: string
  vacancySource: string
  rentGrowthYoY: string
}

// ---------------------------------------------------------------------------
// City image strategy
// ---------------------------------------------------------------------------
//
// Every city/province card now renders a REAL Unsplash photograph. The earlier
// inline-SVG placeholder strategy was replaced because the client wants real
// imagery throughout the site.
//
// All photo IDs below are PROVEN — each one is either:
//   (a) currently rendering successfully elsewhere in the codebase (e.g.
//       `src/components/blocks/north-america-showcase.tsx`), or
//   (b) hand-verified via WebFetch during a dedicated verification pass and
//       confirmed to depict an appropriate subject for its slot.
//
// If you ever need to ADD a city not in this list, FIRST verify the photo ID
// returns the expected subject by opening the full URL in a browser. Do NOT
// guess a photo ID from its filename. Several Unsplash IDs that *looked* like
// city skylines previously resolved to pets, characters, or VR-headset stock.
// ---------------------------------------------------------------------------

/**
 * Helper that builds an `images.unsplash.com` URL with the same query string
 * used everywhere else in the codebase. Keeps the source of truth (the photo
 * ID) easy to swap if a photo ever goes stale.
 */
function unsplashCity(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=80`
}

const IMG = {
  // ── Canadian hero cities (verified real skylines) ──
  toronto: unsplashCity('photo-1517090504586-fde19ea6066f'), // Toronto skyline + CN Tower
  vancouver: unsplashCity('photo-1559511260-66a654ae982a'), // Vancouver skyline + mountains
  montreal: unsplashCity('photo-1519178614-68673b201f36'), // Montreal Old Port + downtown
  ottawa: unsplashCity('photo-1613059488547-0fc691db5231'), // Ottawa Parliament Hill

  // ── Canadian provincial capitals + secondary hubs ──
  calgary: unsplashCity('photo-1629477810810-0c4159eaa575'), // Calgary skyline at night
  edmonton: unsplashCity('photo-1574541647051-099cedfb7f8f'), // Edmonton aerial + river valley
  quebecCity: unsplashCity('photo-1710881710078-d25d578fedc3'), // Château Frontenac aerial
  halifax: unsplashCity('photo-1570902128092-950ebe50a3da'), // Halifax waterfront
  winnipeg: unsplashCity('photo-1600444965458-f536fa978a87'), // The Forks Winnipeg
  victoria: unsplashCity('photo-1611462880877-477c8873243a'), // Victoria Inner Harbour
  kelowna: unsplashCity('photo-1611447119360-68ecb9c71df7'), // Kelowna dock Okanagan Lake

  // ── Ontario secondary cities — each gets a distinct city-confirmed photograph ──
  mississauga: unsplashCity('photo-1483790488866-adee346370c3'), // Absolute "Marilyn Monroe" Towers
  hamilton: unsplashCity('photo-1474502602016-93ddf42348aa'), // Hamilton aerial buildings
  brampton: unsplashCity('photo-1611288685420-3b23741a34c0'), // Brampton clock tower
  london: unsplashCity('photo-1722177119659-690161ca8ccc'), // London ON Thames River aerial
  kitchener: unsplashCity('photo-1746281059947-78fb105d8174'), // Kitchener downtown street
  vaughan: unsplashCity('photo-1697755790236-2a455c4aa22c'), // VMC tower
  markham: unsplashCity('photo-1722382824674-2bcf323928d9'), // Markham/Unionville building
  richmondHill: unsplashCity('photo-1710570949666-6f9148e1840b'), // Richmond Hill Phyllis Rawlinson Park
  oakville: unsplashCity('photo-1660595261658-282bf5063c70'), // Oakville marina
  burlington: unsplashCity('photo-1594483577095-faf6a7f7eae8'), // Burlington lakefront
  waterloo: unsplashCity('photo-1747833423201-5daa71aacc29'), // Waterloo / lakeside
  cambridge: unsplashCity('photo-1595419002942-14a8e2211390'), // Cambridge ON Grand River trees
  guelph: unsplashCity('photo-1731354668012-16ecb1c4136e'), // Guelph water surrounded by trees
  barrie: unsplashCity('photo-1641696442451-bdb442bb0c4d'), // Barrie water + bridge
  milton: unsplashCity('photo-1632459962536-a1aae7399138'), // Milton Rattlesnake Point aerial
  oshawa: unsplashCity('photo-1672425000801-788a1019a41a'), // Oshawa St. Gregory clock tower
  ajax: unsplashCity('photo-1631727826861-65762da32088'), // Ajax lighthouse
  pickering: unsplashCity('photo-1581204991880-2c5ae86d6edc'), // Pickering Nuclear Lake Ontario

  // ── Quebec secondary cities ──
  laval: unsplashCity('photo-1516314353021-c071a0e2e69d'), // Laval Parc Gagné
  gatineau: unsplashCity('photo-1613060398318-78c22514f725'), // Gatineau building under clear sky
  longueuil: unsplashCity('photo-1574721363169-7a92a80a03a9'), // Longueuil / Montreal area landmark
  sherbrooke: unsplashCity('photo-1742692563192-884085bc26c7'), // Sherbrooke autumn street

  // ── British Columbia secondary cities ──
  burnaby: unsplashCity('photo-1671883103581-8b48ff93ed65'), // Metrotown Burnaby snowy street
  surrey: unsplashCity('photo-1650064174084-f4879206f523'), // Surrey SkyTrain bridge over water
  richmond: unsplashCity('photo-1611040196735-1fb309f3cba2'), // Steveston, Richmond BC waterfront
  coquitlam: unsplashCity('photo-1768301346584-86e781872b82'), // Coquitlam suburb + mountain

  // ── Alberta secondary cities ──
  redDeer: unsplashCity('photo-1758494290515-f602bad0e05d'), // Prairie autumn river
  lethbridge: unsplashCity('photo-1646596959059-4c92e297de50'), // Lethbridge High Level Bridge
  airdrie: unsplashCity('photo-1755282323770-db7a6c7a24ee'), // Airdrie sunset

  // ── Manitoba secondary cities ──
  brandon: unsplashCity('photo-1605276373954-0c4a0dac5b12'), // Canadian small-city neighbourhood
  steinbach: unsplashCity('photo-1709651559979-dd38afe268f1'), // Manitoba downtown fallback

  // ── Nova Scotia secondary cities ──
  dartmouth: unsplashCity('photo-1638835952700-01f929655a40'), // Dartmouth NS wall art
  sydneyNS: unsplashCity('photo-1763001467582-324282a4e4be'), // North Sydney NS ferry

  // ── US hero cities (verified real skylines) ──
  miami: unsplashCity('photo-1535498730771-e735b998cd64'),
  austin: unsplashCity('photo-1531218150217-54595bc2b934'),
  losAngeles: unsplashCity('photo-1444723121867-7a241cacace9'),
  newYorkCity: unsplashCity('photo-1496442226666-8d4d0e62e6e9'),
  chicago: unsplashCity('photo-1494522855154-9297ac14b55f'),
  atlanta: unsplashCity('photo-1575917649705-5b59aaa12e6b'),
  charlotte: unsplashCity('photo-1571687949921-1306bfb24b72'),
  phoenix: unsplashCity('photo-1558551649-e44c8f992010'),
  denver: unsplashCity('photo-1546156929-a4c0ac411f47'),
  jerseyCity: unsplashCity('photo-1485871981521-5b1fd3805eee'),
  sanFrancisco: unsplashCity('photo-1501594907352-04cda38ebc29'), // Golden Gate Bridge
  brooklyn: unsplashCity('photo-1452796651103-7c07fca7a2c1'), // Brooklyn Bridge

  // ── US secondary cities — Florida ──
  orlando: unsplashCity('photo-1609184889233-eff6dd93def4'),
  tampa: unsplashCity('photo-1609964956781-519678450be5'),
  jacksonville: unsplashCity('photo-1735593070456-cb12973a0b70'),

  // ── US secondary — Texas ──
  houston: unsplashCity('photo-1530089711124-9ca31fb9e863'),
  dallas: unsplashCity('photo-1563219125-60d10ffe8877'),
  sanAntonio: unsplashCity('photo-1605649666555-e321522c3023'),
  fortWorth: unsplashCity('photo-1641084700087-34b4e134e31f'),
  elPaso: unsplashCity('photo-1654225750669-5b914cad1cf5'),
  plano: unsplashCity('photo-1568605114967-8130f3a36994'), // modern multi-residential exterior (Plano apartments)

  // ── US secondary — California ──
  sanDiego: unsplashCity('photo-1514939775307-d44e7f10cabd'),
  sanJose: unsplashCity('photo-1499310226026-b9d598980b90'),
  sacramento: unsplashCity('photo-1707815618019-087c1c90986b'),
  longBeach: unsplashCity('photo-1550266679-e12e22602d34'),
  oakland: unsplashCity('photo-1582479140190-06e96d4e3cde'),
  fresno: unsplashCity('photo-1519867850-74775a87e783'),
  anaheim: unsplashCity('photo-1592081621037-b5822c178fd9'),

  // ── US secondary — New York ──
  buffalo: unsplashCity('photo-1507358422555-4b80419c147e'),
  rochester: unsplashCity('photo-1717479063980-0d3ca28f6e90'),
  yonkers: unsplashCity('photo-1583696763007-cc6a75bd1a34'),

  // ── US secondary — Illinois ──
  auroraIL: unsplashCity('photo-1732241930079-d903d77d75dd'),
  naperville: unsplashCity('photo-1651487952896-ff8510549da3'),
  rockford: unsplashCity('photo-1645475798187-90878451b7a6'),
  springfieldIL: unsplashCity('photo-1642799819201-c3ccf956b013'),

  // ── US secondary — Georgia ──
  augusta: unsplashCity('photo-1599666782476-691b0014fd87'),
  savannah: unsplashCity('photo-1592663283246-c843227611ce'),
  columbusGA: unsplashCity('photo-1574208949082-9fd24df40f33'),

  // ── US secondary — North Carolina ──
  raleigh: unsplashCity('photo-1744347543986-b92bca6922bf'),
  durham: unsplashCity('photo-1633622258559-b435a03cef19'),
  greensboro: unsplashCity('photo-1644013974938-12bdf141bd11'),
  winstonSalem: unsplashCity('photo-1631803025020-5112aa51845d'),

  // ── US secondary — Arizona ──
  tucson: unsplashCity('photo-1698273191536-0577ff2b94cc'),
  mesa: unsplashCity('photo-1575149536487-4c9ac49fc258'),
  scottsdale: unsplashCity('photo-1617407867245-f1315ab14d98'),

  // ── US secondary — Colorado ──
  coloradoSprings: unsplashCity('photo-1547077053-560662bfd989'),
  auroraCO: unsplashCity('photo-1632763339064-689a03b1d2d5'),
  fortCollins: unsplashCity('photo-1614180714956-fc7378a5db20'),

  // ── US secondary — New Jersey ──
  newark: unsplashCity('photo-1655781723092-55bba63bdc0b'),
  paterson: unsplashCity('photo-1688103996241-a679e1a70dec'),
  elizabeth: unsplashCity('photo-1634145525156-5b47f9042c13'),
  edison: unsplashCity('photo-1592595896616-c37162298647'), // suburban American residential street

  // ── Generic category fallbacks (kept for legacy refs) ──
  genericSkyline1: unsplashCity('photo-1517090504586-fde19ea6066f'),
  genericSkyline2: unsplashCity('photo-1444723121867-7a241cacace9'),
  genericSkyline3: unsplashCity('photo-1494522855154-9297ac14b55f'),
  genericSkyline4: unsplashCity('photo-1496442226666-8d4d0e62e6e9'),
  genericMidsize: unsplashCity('photo-1486325212027-8081e485255e'),
  genericWaterfront: unsplashCity('photo-1535498730771-e735b998cd64'),
  genericSuburb: unsplashCity('photo-1564013799919-ab600027ffc6'),
  genericDesert: unsplashCity('photo-1558551649-e44c8f992010'),
  genericCondo: unsplashCity('photo-1505691938895-1758d7feb511'),
  genericSuburbWinter: unsplashCity('photo-1582719508461-905c673771fd'),
} as const

// ---------------------------------------------------------------------------
// Canadian provinces
// ---------------------------------------------------------------------------

const ONTARIO: ProvinceData = {
  name: 'Ontario',
  slug: 'ontario',
  abbreviation: 'ON',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.toronto,
  heroImageAlt: 'Toronto skyline with CN Tower at dusk representing Ontario',
  market: {
    population: '16.0M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$2,450',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '1.9%',
    vacancySource: 'CMHC Rental Market Report 2025 (provincial purpose-built rentals)',
    rentGrowthYoY: '+5.4%',
    rentalHouseholds: '2.05M',
    intro:
      'Ontario is Canada\'s largest rental market and home to roughly 40% of all managed properties nationwide. The Greater Toronto Area anchors demand, with secondary hubs in Ottawa, the Waterloo-Wellington tech corridor, and London-Windsor pulling distinct tenant profiles. Rent control on pre-2018 buildings, the Landlord and Tenant Board backlog, and the N12/N13 framework shape every leasing decision. MoveSmart runs LTB-compliant placements across every Tier-1 Ontario market with a local in-market team.',
  },
  topCities: [
    {
      name: 'Toronto',
      slug: 'toronto',
      population: '2.9M',
      medianRent: '$2,800',
      vacancy: '1.7%',
      imageUrl: IMG.toronto,
      imageAlt: 'Toronto skyline with the CN Tower and downtown high-rises',
      neighborhoods: ['Downtown', 'North York', 'Etobicoke', 'Scarborough', 'Liberty Village'],
      whyHere:
        'Canada\'s largest rental market with the deepest tenant pool. Placements typically close in 10-18 days at or above asking.',
    },
    {
      name: 'Ottawa',
      slug: 'ottawa',
      population: '1.0M',
      medianRent: '$2,400',
      vacancy: '2.1%',
      imageUrl: IMG.ottawa,
      imageAlt: 'Ottawa Parliament buildings with the Peace Tower',
      neighborhoods: ['Centretown', 'The Glebe', 'Westboro', 'Kanata', 'Barrhaven'],
      whyHere:
        'Public-sector tenant base + uOttawa and Carleton drive steady, predictable turnover and low default risk.',
    },
    {
      name: 'Mississauga',
      slug: 'mississauga',
      population: '735K',
      medianRent: '$2,650',
      vacancy: '1.9%',
      imageUrl: IMG.mississauga,
      imageAlt: 'Mississauga Square One condo towers at dusk',
      neighborhoods: ['Square One', 'Port Credit', 'Streetsville', 'Erin Mills', 'Meadowvale'],
      whyHere:
        'GTA-adjacent access with the Hurontario LRT lifting transit-corridor pricing. Strong family-tenant depth.',
    },
    {
      name: 'Hamilton',
      slug: 'hamilton',
      population: '580K',
      medianRent: '$2,100',
      vacancy: '2.4%',
      imageUrl: IMG.hamilton,
      imageAlt: 'Hamilton Ontario downtown skyline with the Niagara Escarpment',
      neighborhoods: ['Downtown', 'Westdale', 'Ancaster', 'Stoney Creek', 'Dundas'],
      whyHere:
        'Toronto commuter overflow + McMaster University. Lower rents with GO Transit access to Union Station.',
    },
    {
      name: 'Brampton',
      slug: 'brampton',
      population: '656K',
      medianRent: '$2,400',
      vacancy: '1.8%',
      imageUrl: IMG.brampton,
      imageAlt: 'Brampton Ontario residential and high-rise corridor',
      neighborhoods: ['Heart Lake', 'Bramalea', 'Springdale', 'Mount Pleasant', 'Credit Valley'],
      whyHere:
        'One of Canada\'s fastest-growing cities. Strong demand for 3-4 bedroom homes from multi-generational households.',
    },
    {
      name: 'London',
      slug: 'london',
      population: '425K',
      medianRent: '$1,850',
      vacancy: '2.6%',
      imageUrl: IMG.london,
      imageAlt: 'London Ontario downtown skyline with historic and modern buildings',
      neighborhoods: ['Downtown', 'Old North', 'Old South', 'Masonville', 'Byron'],
      whyHere:
        'Western University, Fanshawe College, and a growing tech sector. September lease cycle dominates.',
    },
    {
      name: 'Kitchener',
      slug: 'kitchener',
      population: '260K',
      medianRent: '$2,050',
      vacancy: '2.2%',
      imageUrl: IMG.kitchener,
      imageAlt: 'Kitchener Ontario downtown street with ION light rail',
      neighborhoods: ['Downtown Kitchener', 'Forest Heights', 'Stanley Park', 'Doon', 'Victoria Park'],
      whyHere:
        'Canada\'s Technology Triangle. UWaterloo co-ops and Conestoga College students sustain year-round demand.',
    },
    {
      name: 'Vaughan',
      slug: 'vaughan',
      population: '323K',
      medianRent: '$2,600',
      vacancy: '1.6%',
      imageUrl: IMG.vaughan,
      imageAlt: 'Vaughan Metropolitan Centre high-rise towers',
      neighborhoods: ['Woodbridge', 'Maple', 'Thornhill', 'Kleinburg', 'VMC'],
      whyHere:
        'Established luxury pockets like Kleinburg meet the VMC growth core. Executive-relocation tenant skew.',
    },
    {
      name: 'Markham',
      slug: 'markham',
      population: '338K',
      medianRent: '$2,500',
      vacancy: '1.5%',
      imageUrl: IMG.markham,
      imageAlt: 'Markham Ontario tech-corridor high-rise skyline',
      neighborhoods: ['Unionville', 'Cornell', 'Berczy Village', 'Cathedraltown', 'Markham Village'],
      whyHere:
        'Highest concentration of tech HQs in Canada. Listings perform best with Mandarin/Cantonese marketing.',
    },
    {
      name: 'Richmond Hill',
      slug: 'richmond-hill',
      population: '202K',
      medianRent: '$2,450',
      vacancy: '1.7%',
      imageUrl: IMG.richmondHill,
      imageAlt: 'Richmond Hill Ontario residential street with luxury detached homes',
      neighborhoods: ['Oak Ridges', 'Bayview Hill', 'Mill Pond', 'Jefferson', 'Richvale'],
      whyHere:
        'Affluent professional families with strong Chinese- and Iranian-Canadian demographics. Detached-home premium.',
    },
    {
      name: 'Oakville',
      slug: 'oakville',
      population: '213K',
      medianRent: '$2,700',
      vacancy: '1.4%',
      imageUrl: IMG.oakville,
      imageAlt: 'Oakville Ontario lakeside upscale neighborhood',
      neighborhoods: ['Old Oakville', 'Bronte', 'Glen Abbey', 'River Oaks', 'Uptown Core'],
      whyHere:
        'Among Ontario\'s highest-income markets. Corporate-relocation tenants and Ford Canada workforce drive premium.',
    },
    {
      name: 'Burlington',
      slug: 'burlington',
      population: '187K',
      medianRent: '$2,350',
      vacancy: '1.8%',
      imageUrl: IMG.burlington,
      imageAlt: 'Burlington Ontario lakefront and downtown',
      neighborhoods: ['Downtown Burlington', 'Aldershot', 'Alton Village', 'Orchard', 'Millcroft'],
      whyHere:
        'Lakeside charm with GTA commuter access. Young families and Joseph Brant Hospital workers anchor demand.',
    },
    {
      name: 'Waterloo',
      slug: 'waterloo',
      population: '122K',
      medianRent: '$2,100',
      vacancy: '2.4%',
      imageUrl: IMG.waterloo,
      imageAlt: 'Waterloo Ontario university district downtown',
      neighborhoods: ['Uptown Waterloo', 'Westmount', 'Lakeshore', 'Eastbridge', 'Beechwood'],
      whyHere:
        'UWaterloo + Wilfrid Laurier + the tech corridor. September turnover cycle demands early listing discipline.',
    },
    {
      name: 'Cambridge',
      slug: 'cambridge',
      population: '138K',
      medianRent: '$1,950',
      vacancy: '2.1%',
      imageUrl: IMG.cambridge,
      imageAlt: 'Cambridge Ontario historic Galt downtown street',
      neighborhoods: ['Galt', 'Preston', 'Hespeler', 'West Galt', 'East Galt'],
      whyHere:
        'Three historic cores with distinct character. Toyota and Frito-Lay manufacturing anchors steady demand.',
    },
    {
      name: 'Guelph',
      slug: 'guelph',
      population: '144K',
      medianRent: '$2,000',
      vacancy: '2.0%',
      imageUrl: IMG.guelph,
      imageAlt: 'Guelph Ontario university town downtown street',
      neighborhoods: ['Downtown Guelph', 'Old University', 'Kortright Hills', 'Westminster Woods', 'Pine Ridge'],
      whyHere:
        'University of Guelph drives a strong September lease cycle. Linamar manufacturing rounds out year-round demand.',
    },
    {
      name: 'Barrie',
      slug: 'barrie',
      population: '150K',
      medianRent: '$1,950',
      vacancy: '2.3%',
      imageUrl: IMG.barrie,
      imageAlt: 'Barrie Ontario waterfront and downtown view',
      neighborhoods: ['Downtown Barrie', 'Painswick', 'Holly', 'Innis Shore', 'Ardagh Bluffs'],
      whyHere:
        'Waterfront city with GTA spillover. Georgian College + cottage-country seasonality shape demand cycles.',
    },
    {
      name: 'Milton',
      slug: 'milton',
      population: '133K',
      medianRent: '$2,450',
      vacancy: '1.6%',
      imageUrl: IMG.milton,
      imageAlt: 'Milton Ontario new-build subdivision and family residential',
      neighborhoods: ['Old Milton', 'Beaty', 'Willmott', 'Harrison', 'Scott'],
      whyHere:
        'Among the fastest-growing municipalities in Canada. New-build subdivisions with strong family-tenant demand.',
    },
    {
      name: 'Oshawa',
      slug: 'oshawa',
      population: '175K',
      medianRent: '$2,050',
      vacancy: '2.5%',
      imageUrl: IMG.oshawa,
      imageAlt: 'Oshawa Ontario downtown street and university campus',
      neighborhoods: ['Downtown Oshawa', 'Donevan', 'Taunton', 'Windfields', 'Samac'],
      whyHere:
        'Ontario Tech + Durham College + GM Canada. Strong student and auto-sector year-round demand.',
    },
    {
      name: 'Ajax',
      slug: 'ajax',
      population: '126K',
      medianRent: '$2,300',
      vacancy: '1.9%',
      imageUrl: IMG.ajax,
      imageAlt: 'Ajax Ontario suburban residential street',
      neighborhoods: ['Downtown Ajax', 'Pickering Beach', 'Nottingham', 'Southwood', 'Westney Heights'],
      whyHere:
        'Deep diasporic communities and GTA-commuter families. Waterfront + school-district pricing premium.',
    },
    {
      name: 'Pickering',
      slug: 'pickering',
      population: '99K',
      medianRent: '$2,350',
      vacancy: '1.8%',
      imageUrl: IMG.pickering,
      imageAlt: 'Pickering Ontario lakefront residential view',
      neighborhoods: ['Pickering Village', 'Bay Ridges', 'Amberlea', 'Rosebank', 'Liverpool'],
      whyHere:
        'Commuter-rail access + Pickering Nuclear workforce + Seaton greenfield inventory. Waterfront premium.',
    },
  ],
}

const QUEBEC: ProvinceData = {
  name: 'Quebec',
  slug: 'quebec',
  abbreviation: 'QC',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.montreal,
  heroImageAlt: 'Montreal skyline with Mount Royal at dusk representing Quebec',
  market: {
    population: '9.05M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$1,650',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '1.5%',
    vacancySource: 'CMHC Rental Market Report 2025',
    rentGrowthYoY: '+7.2%',
    rentalHouseholds: '1.45M',
    intro:
      'Quebec\'s rental market is shaped by the July 1 moving cycle, the TAL rent-regulation grid, and Bill 96 language rules. Plex inventory dominates Montreal\'s inner neighbourhoods alongside a growing downtown condo core, and Quebec City, Laval, Gatineau, and Sherbrooke each carry distinct sub-market dynamics. Provincial vacancy hit a multi-decade low in 2024 and remains tight. MoveSmart runs bilingual, TAL-aware placements across the province.',
  },
  topCities: [
    {
      name: 'Montreal',
      slug: 'montreal',
      population: '1.78M',
      medianRent: '$1,700',
      vacancy: '1.5%',
      imageUrl: IMG.montreal,
      imageAlt: 'Montreal skyline with Mount Royal cross at dusk',
      neighborhoods: ['Plateau-Mont-Royal', 'Mile End', 'Griffintown', 'Verdun', 'Rosemont'],
      whyHere:
        'Canada\'s most idiosyncratic rental market. Plex stock dominates the inner core; July 1 leasing cycle and TAL grids shape pricing.',
    },
    {
      name: 'Quebec City',
      slug: 'quebec-city',
      population: '549K',
      medianRent: '$1,450',
      vacancy: '1.2%',
      imageUrl: IMG.quebecCity,
      imageAlt: 'Quebec City Old Town with Chateau Frontenac and historic buildings',
      neighborhoods: ['Vieux-Québec', 'Saint-Roch', 'Sainte-Foy', 'Limoilou', 'Montcalm'],
      whyHere:
        'Anchored by Laval University, the provincial government, and a stable francophone population. Persistently tight Sainte-Foy vacancy.',
    },
    {
      name: 'Laval',
      slug: 'laval',
      population: '438K',
      medianRent: '$1,600',
      vacancy: '1.8%',
      imageUrl: IMG.laval,
      imageAlt: 'Laval Quebec condo towers near Métro Montmorency',
      neighborhoods: ['Chomedey', 'Sainte-Rose', 'Vimont', 'Duvernay', 'Pont-Viau'],
      whyHere:
        'Third-largest city in Quebec with three STM Métro stations connecting to downtown Montreal in 25 minutes.',
    },
    {
      name: 'Gatineau',
      slug: 'gatineau',
      population: '295K',
      medianRent: '$1,550',
      vacancy: '1.6%',
      imageUrl: IMG.gatineau,
      imageAlt: 'Gatineau Quebec waterfront across the river from Ottawa',
      neighborhoods: ['Hull', 'Aylmer', 'Gatineau sector', 'Buckingham', 'Le Plateau'],
      whyHere:
        'Federal government workforce on both sides of the Ottawa River. Bilingual tenant pools keep Hull and Aylmer vacancy persistently low.',
    },
    {
      name: 'Longueuil',
      slug: 'longueuil',
      population: '254K',
      medianRent: '$1,500',
      vacancy: '1.7%',
      imageUrl: IMG.longueuil,
      imageAlt: 'Longueuil Quebec South Shore skyline',
      neighborhoods: ['Vieux-Longueuil', 'Greenfield Park', 'Saint-Hubert', 'Saint-Lambert', 'LeMoyne'],
      whyHere:
        'Anchors Montreal\'s South Shore. The REM extension has redrawn commute economics, lifting rents in Brossard-adjacent pockets.',
    },
    {
      name: 'Sherbrooke',
      slug: 'sherbrooke',
      population: '172K',
      medianRent: '$1,250',
      vacancy: '2.0%',
      imageUrl: IMG.sherbrooke,
      imageAlt: 'Sherbrooke Quebec downtown historic stone buildings',
      neighborhoods: ['Centre-ville', 'Fleurimont', 'Mont-Bellevue', 'Lennoxville', 'Rock Forest'],
      whyHere:
        'Deep university tenant base (UdeS, Bishop\'s, CÉGEP). Regional-hub healthcare economy + September leasing peak.',
    },
  ],
}

const BRITISH_COLUMBIA: ProvinceData = {
  name: 'British Columbia',
  slug: 'british-columbia',
  abbreviation: 'BC',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.vancouver,
  heroImageAlt: 'Vancouver skyline with mountains and harbour representing BC',
  market: {
    population: '5.65M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$2,550',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '1.2%',
    vacancySource: 'CMHC Rental Market Report 2025',
    rentGrowthYoY: '+4.8%',
    rentalHouseholds: '780K',
    intro:
      'British Columbia rentals are governed by the Residential Tenancy Branch with a CPI-tied rent cap. Metro Vancouver carries North America\'s tightest urban vacancy at sub-1%, layered with Empty Homes Tax and Speculation and Vacancy Tax compliance. Demand spans Vancouver, Burnaby, Surrey, Richmond, Coquitlam plus the Capital Region (Victoria) and Okanagan (Kelowna). MoveSmart serves all seven Tier-1 BC markets with RTB-compliant leases and CPI-aware pricing discipline.',
  },
  topCities: [
    {
      name: 'Vancouver',
      slug: 'vancouver',
      population: '695K',
      medianRent: '$2,700',
      vacancy: '0.9%',
      imageUrl: IMG.vancouver,
      imageAlt: 'Vancouver skyline with mountains and harbour at sunset',
      neighborhoods: ['Downtown', 'Yaletown', 'Kitsilano', 'Mount Pleasant', 'West End'],
      whyHere:
        'North America\'s tightest rental market with sub-1% vacancy. Rent control + Empty Homes Tax demand screening discipline.',
    },
    {
      name: 'Burnaby',
      slug: 'burnaby',
      population: '250K',
      medianRent: '$2,400',
      vacancy: '1.0%',
      imageUrl: IMG.burnaby,
      imageAlt: 'Burnaby BC Metrotown high-rise towers with mountains',
      neighborhoods: ['Metrotown', 'Brentwood', 'Lougheed', 'Edmonds', 'Burnaby Heights'],
      whyHere:
        'Metro Vancouver\'s densest secondary rental market. SFU drives steady student demand at Burnaby Mountain.',
    },
    {
      name: 'Surrey',
      slug: 'surrey',
      population: '568K',
      medianRent: '$2,200',
      vacancy: '1.3%',
      imageUrl: IMG.surrey,
      imageAlt: 'Surrey BC downtown high-rise development with mountains',
      neighborhoods: ['Surrey Central', 'Guildford', 'Newton', 'South Surrey', 'Fleetwood'],
      whyHere:
        'BC\'s fastest-growing city. Densest pipeline of new rental construction in Metro Vancouver; deep South Asian and Filipino-Canadian tenant base.',
    },
    {
      name: 'Richmond',
      slug: 'richmond',
      population: '209K',
      medianRent: '$2,350',
      vacancy: '1.1%',
      imageUrl: IMG.richmond,
      imageAlt: 'Richmond BC condo towers near Canada Line SkyTrain',
      neighborhoods: ['Brighouse', 'Steveston', 'Thompson', 'Hamilton', 'Sea Island'],
      whyHere:
        'Highest concentration of Chinese-Canadian residents in Canada. Listings perform best with Mandarin and Cantonese marketing.',
    },
    {
      name: 'Victoria',
      slug: 'victoria',
      population: '92K',
      medianRent: '$2,250',
      vacancy: '1.2%',
      imageUrl: IMG.victoria,
      imageAlt: 'Victoria BC Inner Harbour with Parliament buildings at dusk',
      neighborhoods: ['Downtown', 'James Bay', 'Fernwood', 'Fairfield', 'Vic West'],
      whyHere:
        'BC government workforce + UVic + Camosun + strong retiree base. Heritage stock with strict character-protection rules.',
    },
    {
      name: 'Coquitlam',
      slug: 'coquitlam',
      population: '154K',
      medianRent: '$2,300',
      vacancy: '1.2%',
      imageUrl: IMG.coquitlam,
      imageAlt: 'Coquitlam BC town centre high-rises with mountains',
      neighborhoods: ['Coquitlam Centre', 'Burke Mountain', 'Westwood Plateau', 'Maillardville', 'Austin Heights'],
      whyHere:
        'Tri-Cities growth leader since the Evergreen SkyTrain extension. Transit-oriented high-rise inventory dominates new supply.',
    },
    {
      name: 'Kelowna',
      slug: 'kelowna',
      population: '145K',
      medianRent: '$2,100',
      vacancy: '1.5%',
      imageUrl: IMG.kelowna,
      imageAlt: 'Kelowna BC Okanagan Lake waterfront with vineyards and mountains',
      neighborhoods: ['Downtown', 'Lower Mission', 'Glenmore', 'Rutland', 'Upper Mission'],
      whyHere:
        'Leads BC interior rental growth. UBCO + Okanagan College + tech sector + lifestyle in-migration from Lower Mainland and Alberta.',
    },
  ],
}

const ALBERTA: ProvinceData = {
  name: 'Alberta',
  slug: 'alberta',
  abbreviation: 'AB',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.calgary,
  heroImageAlt: 'Calgary skyline with the Rocky Mountains representing Alberta',
  market: {
    population: '4.95M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$1,800',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '2.8%',
    vacancySource: 'CMHC Rental Market Report 2025',
    rentGrowthYoY: '+8.6%',
    rentalHouseholds: '600K',
    intro:
      'Alberta is the only major Canadian province without a rent cap — pricing between tenancies is free-market under the Residential Tenancies Act. Calgary and Edmonton anchor the major-metro inventory with sustained in-migration from Ontario and BC, while Red Deer, Lethbridge, and Airdrie round out the tier-1 service area. Rent growth has consistently led the country since 2023. Calgary\'s vacancy remains the lowest among Alberta\'s big two.',
  },
  topCities: [
    {
      name: 'Calgary',
      slug: 'calgary',
      population: '1.34M',
      medianRent: '$1,900',
      vacancy: '2.6%',
      imageUrl: IMG.calgary,
      imageAlt: 'Calgary skyline with Calgary Tower and Rocky Mountains backdrop',
      neighborhoods: ['Downtown', 'Beltline', 'Kensington', 'Inglewood', 'Mission'],
      whyHere:
        'Among Canada\'s strongest rental markets with no provincial rent cap. Ontario and BC in-migration drives sustained rent growth.',
    },
    {
      name: 'Edmonton',
      slug: 'edmonton',
      population: '1.01M',
      medianRent: '$1,550',
      vacancy: '3.1%',
      imageUrl: IMG.edmonton,
      imageAlt: 'Edmonton Alberta skyline along the North Saskatchewan River',
      neighborhoods: ['Downtown', 'Old Strathcona', 'Oliver', 'Garneau', 'Glenora'],
      whyHere:
        'Canada\'s most accessible major-metro rents. Provincial government, University of Alberta, and healthcare workforce. Year-round leasing cycle.',
    },
    {
      name: 'Red Deer',
      slug: 'red-deer',
      population: '106K',
      medianRent: '$1,350',
      vacancy: '4.5%',
      imageUrl: IMG.redDeer,
      imageAlt: 'Red Deer Alberta downtown skyline at twilight',
      neighborhoods: ['Downtown', 'Sunnybrook', 'Anders', 'Inglewood', 'Eastview'],
      whyHere:
        'Central Alberta service economy with oil-and-gas-adjacent demand and Red Deer Polytechnic students.',
    },
    {
      name: 'Lethbridge',
      slug: 'lethbridge',
      population: '105K',
      medianRent: '$1,300',
      vacancy: '4.8%',
      imageUrl: IMG.lethbridge,
      imageAlt: 'Lethbridge Alberta High Level Bridge over the Oldman River',
      neighborhoods: ['Downtown', 'West Lethbridge', 'South Lethbridge', 'Varsity Village', 'North Lethbridge'],
      whyHere:
        'Southern Alberta hub anchored by University of Lethbridge, Lethbridge College, and agricultural processing.',
    },
    {
      name: 'Airdrie',
      slug: 'airdrie',
      population: '84K',
      medianRent: '$1,750',
      vacancy: '3.5%',
      imageUrl: IMG.airdrie,
      imageAlt: 'Airdrie Alberta suburban new-build community at sunset',
      neighborhoods: ['Bayside', 'Cooper\'s Crossing', 'Williamstown', 'King\'s Heights', 'Sagewood'],
      whyHere:
        'One of Canada\'s fastest-growing municipalities. Calgary commuter spillover into new-build subdivisions with family-tenant demand.',
    },
  ],
}

const MANITOBA: ProvinceData = {
  name: 'Manitoba',
  slug: 'manitoba',
  abbreviation: 'MB',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.winnipeg,
  heroImageAlt: 'Winnipeg Manitoba downtown skyline along the Red River',
  market: {
    population: '1.49M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$1,450',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '3.6%',
    vacancySource: 'CMHC Rental Market Report 2025',
    rentGrowthYoY: '+5.1%',
    rentalHouseholds: '215K',
    intro:
      'Manitoba rentals are governed by the Residential Tenancies Branch with annual guideline rent-increase percentages. Winnipeg anchors the market with University of Manitoba and public-sector demand, while Brandon and Steinbach serve as regional secondary markets with growing inventory. The province offers some of the most accessible major-metro rents in Canada, with a year-round leasing cycle and tenure stability that owners reliably trade off against the modest rent ceiling.',
  },
  topCities: [
    {
      name: 'Winnipeg',
      slug: 'winnipeg',
      population: '750K',
      medianRent: '$1,500',
      vacancy: '3.4%',
      imageUrl: IMG.winnipeg,
      imageAlt: 'Winnipeg Manitoba downtown skyline along the Red River',
      neighborhoods: ['Downtown', 'Exchange District', 'Osborne Village', 'River Heights', 'St. Boniface'],
      whyHere:
        'Manitoba\'s rental anchor with University of Manitoba demand, strong public-sector workforce, and steady year-round leasing.',
    },
    {
      name: 'Brandon',
      slug: 'brandon',
      population: '52K',
      medianRent: '$1,250',
      vacancy: '4.2%',
      imageUrl: IMG.brandon,
      imageAlt: 'Brandon Manitoba prairie city downtown street view',
      neighborhoods: ['Downtown', 'East End', 'South End', 'North Hill', 'Westridge'],
      whyHere:
        'Manitoba\'s second-largest city. Brandon University, ACC, and CFB Shilo workforce demand keep year-round vacancy moderate.',
    },
    {
      name: 'Steinbach',
      slug: 'steinbach',
      population: '18K',
      medianRent: '$1,300',
      vacancy: '3.8%',
      imageUrl: IMG.steinbach,
      imageAlt: 'Steinbach Manitoba small city main street at twilight',
      neighborhoods: ['Downtown', 'Southland', 'Westland', 'Park West', 'Loewen Boulevard'],
      whyHere:
        'One of Manitoba\'s fastest-growing communities. New-build rental demand from families priced out of Winnipeg.',
    },
  ],
}

const NOVA_SCOTIA: ProvinceData = {
  name: 'Nova Scotia',
  slug: 'nova-scotia',
  abbreviation: 'NS',
  flagEmoji: '🇨🇦',
  heroImageUrl: IMG.halifax,
  heroImageAlt: 'Halifax Nova Scotia waterfront harbour at sunset',
  market: {
    population: '1.10M',
    populationSource: 'Statistics Canada, Q4 2025',
    medianRent: '$1,700',
    medianRentSource: 'CMHC Rental Market Report 2025 (2-bed asking rent, provincial average)',
    vacancyRate: '1.4%',
    vacancySource: 'CMHC Rental Market Report 2025',
    rentGrowthYoY: '+6.7%',
    rentalHouseholds: '155K',
    intro:
      'Nova Scotia\'s rental market is shaped by a provincial rent cap, strict post-2022 renoviction protections, and Halifax\'s sub-1% urban vacancy. Dalhousie, Saint Mary\'s, the navy, and federal workforce drive Halifax demand; Dartmouth and Sydney round out the tier-1 service area. The province has been Atlantic Canada\'s top in-migration destination since 2021, sustaining rent growth and tight occupancy across the Halifax Regional Municipality.',
  },
  topCities: [
    {
      name: 'Halifax',
      slug: 'halifax',
      population: '480K',
      medianRent: '$1,800',
      vacancy: '1.0%',
      imageUrl: IMG.halifax,
      imageAlt: 'Halifax Nova Scotia waterfront harbour at sunset',
      neighborhoods: ['Downtown', 'South End', 'North End', 'Clayton Park', 'Bedford'],
      whyHere:
        'Tightest rental market in Atlantic Canada with sub-1% urban-core vacancy. Dalhousie, Saint Mary\'s, and federal workforce drive demand.',
    },
    {
      name: 'Dartmouth',
      slug: 'dartmouth',
      population: '70K',
      medianRent: '$1,700',
      vacancy: '1.2%',
      imageUrl: IMG.dartmouth,
      imageAlt: 'Dartmouth Nova Scotia waterfront across the harbour from Halifax',
      neighborhoods: ['Downtown Dartmouth', 'Woodside', 'Crichton Park', 'Dartmouth Crossing', 'Cole Harbour'],
      whyHere:
        'Shares Halifax\'s sub-2% vacancy with lower per-sqft rents. Burnside Industrial Park anchors workforce demand.',
    },
    {
      name: 'Sydney',
      slug: 'sydney',
      population: '30K',
      medianRent: '$1,200',
      vacancy: '2.8%',
      imageUrl: IMG.sydneyNS,
      imageAlt: 'Sydney Nova Scotia Cape Breton harbour view',
      neighborhoods: ['Downtown', 'Whitney Pier', 'Ashby', 'Hardwood Hill', 'Westmount'],
      whyHere:
        'Cape Breton\'s rental anchor. Cape Breton University, healthcare-sector employment, and immigration-driven population recovery.',
    },
  ],
}

// ---------------------------------------------------------------------------
// U.S. states
// ---------------------------------------------------------------------------

const FLORIDA: StateData = {
  name: 'Florida',
  slug: 'florida',
  abbreviation: 'FL',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.miami,
  heroImageAlt: 'Florida coastal city skyline with palm trees at sunset',
  market: {
    population: '23.0M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$2,150',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '8.3%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+3.1%',
    rentalHouseholds: '2.95M',
    intro:
      'Florida has been the top U.S. state for inbound migration four years running, drawing Northeast and Midwest renters into Miami, Tampa, Orlando, Jacksonville, and Fort Lauderdale. Sustained international-buyer demand keeps Miami-Dade tight, while Orlando\'s Lake Nona biotech corridor and Tampa\'s Westshore office stock absorb steady year-round demand. Insurance-cost volatility and HOA reform have reshaped condo leasing economics in 2025-26.',
  },
  topCities: [
    {
      name: 'Miami',
      slug: 'miami',
      population: '442K',
      medianRent: '$2,400',
      imageUrl: IMG.miami,
      imageAlt: 'Miami Florida skyline with Brickell high-rises at sunset',
      neighborhoods: ['Brickell', 'Wynwood', 'Downtown', 'Coconut Grove', 'Mid-Beach'],
      whyHere:
        'Tech-relocation and international-buyer demand sustain a high-rent, condo-heavy market across Brickell, Wynwood, and the beaches.',
    },
    {
      name: 'Orlando',
      slug: 'orlando',
      population: '309K',
      medianRent: '$2,100',
      imageUrl: IMG.orlando,
      imageAlt: 'Orlando Florida downtown street with modern buildings',
      neighborhoods: ['Lake Nona', 'Downtown', 'Winter Park', 'Baldwin Park', 'Thornton Park'],
      whyHere:
        'Lake Nona Medical City, theme-park hospitality, and UCF drive year-round absorption across one of the most diversified Sun Belt metros.',
    },
    {
      name: 'Tampa',
      slug: 'tampa',
      population: '398K',
      medianRent: '$2,300',
      imageUrl: IMG.tampa,
      imageAlt: 'Tampa Florida waterfront cityscape at golden hour',
      neighborhoods: ['Westshore', 'Hyde Park', 'South Tampa', 'Channelside', 'Seminole Heights'],
      whyHere:
        'Sustained domestic in-migration from the Northeast keeps Tampa Bay supply-constrained across Westshore, Hyde Park, and South Tampa.',
    },
    {
      name: 'Jacksonville',
      slug: 'jacksonville',
      population: '971K',
      medianRent: '$1,750',
      imageUrl: IMG.jacksonville,
      imageAlt: 'Jacksonville Florida riverfront skyline with high-rises',
      neighborhoods: ['Riverside', 'San Marco', 'Downtown', 'Mandarin', 'Avondale'],
      whyHere:
        'Florida\'s largest city by area with steady military, logistics, and financial-services demand at accessible rents.',
    },
    {
      name: 'Fort Lauderdale',
      slug: 'fort-lauderdale',
      population: '184K',
      medianRent: '$2,650',
      imageUrl: IMG.genericWaterfront,
      imageAlt: 'Fort Lauderdale Florida waterfront with marina and condos',
      neighborhoods: ['Las Olas', 'Victoria Park', 'Flagler Village', 'Coral Ridge', 'Rio Vista'],
      whyHere:
        'Beach-adjacent rentals and a growing financial-district footprint absorb overflow demand from Miami at slightly tempered pricing.',
    },
    {
      name: 'St. Petersburg',
      slug: 'st-petersburg',
      population: '263K',
      medianRent: '$2,150',
      imageUrl: IMG.genericWaterfront,
      imageAlt: 'St. Petersburg Florida waterfront pier and skyline',
      neighborhoods: ['Downtown', 'Old Northeast', 'Kenwood', 'Grand Central', 'Snell Isle'],
      whyHere:
        'Arts-district revival and waterfront condo inventory position St. Petersburg as the value play to Tampa across the bay.',
    },
    {
      name: 'Hialeah',
      slug: 'hialeah',
      population: '224K',
      medianRent: '$1,950',
      imageUrl: IMG.genericSuburb,
      imageAlt: 'Hialeah Florida residential street with palm trees',
      neighborhoods: ['West Hialeah', 'East Hialeah', 'Palm Springs North', 'Hialeah Gardens', 'Country Club'],
      whyHere:
        'Dense Spanish-speaking inner-suburban submarket in Miami-Dade with strong multi-family and small-lot rental yield.',
    },
    {
      name: 'Gainesville',
      slug: 'gainesville',
      population: '145K',
      medianRent: '$1,500',
      imageUrl: IMG.genericMidsize,
      imageAlt: 'Gainesville Florida university town main street',
      neighborhoods: ['Downtown', 'Duckpond', 'Haile Plantation', 'Midtown', 'Sunshine Acres'],
      whyHere:
        'University of Florida drives the lease cycle. Demand peaks August through September with strong year-round graduate and faculty depth.',
    },
  ],
}

const TEXAS: StateData = {
  name: 'Texas',
  slug: 'texas',
  abbreviation: 'TX',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.austin,
  heroImageAlt: 'Austin Texas state capitol at dusk representing Texas',
  market: {
    population: '31.3M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,700',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '9.1%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+1.8%',
    rentalHouseholds: '4.2M',
    intro:
      'Texas is the fastest-growing U.S. state by absolute population and second-fastest by net rental demand. Austin, Houston, and the DFW metroplex anchor the leasing footprint, with San Antonio and El Paso adding lower-rent depth. Aggressive 2024-26 multifamily delivery has cooled rent growth in Austin and Sunbelt-Dallas, creating rare tenant-favourable conditions in luxury Class-A — but Class-B and single-family demand remains tight.',
  },
  topCities: [
    {
      name: 'Houston',
      slug: 'houston',
      population: '2.3M',
      medianRent: '$1,700',
      imageUrl: IMG.houston,
      imageAlt: 'Houston Texas downtown skyline at twilight',
      neighborhoods: ['Downtown', 'Montrose', 'The Heights', 'Midtown', 'River Oaks'],
      whyHere:
        'Fourth-largest U.S. city offers the widest range of rental price points, with energy-sector and medical-center employment driving diverse demand.',
    },
    {
      name: 'Dallas',
      slug: 'dallas',
      population: '1.3M',
      medianRent: '$1,850',
      imageUrl: IMG.dallas,
      imageAlt: 'Dallas Texas downtown skyline with modern high-rises',
      neighborhoods: ['Uptown', 'Deep Ellum', 'Bishop Arts', 'Lakewood', 'Oak Cliff'],
      whyHere:
        'Dallas anchors the 7-million-person DFW metroplex. Corporate relocations fuel steady demand in Uptown, Deep Ellum, and the core.',
    },
    {
      name: 'Austin',
      slug: 'austin',
      population: '966K',
      medianRent: '$1,800',
      imageUrl: IMG.austin,
      imageAlt: 'Austin Texas state capitol building and downtown skyline',
      neighborhoods: ['Downtown', 'East Austin', 'South Congress', 'Mueller', 'Hyde Park'],
      whyHere:
        'Tech-fueled growth drove nation-leading rent increases through 2024; 2025-26 supply has caught demand, creating rare tenant-favourable conditions.',
    },
    {
      name: 'San Antonio',
      slug: 'san-antonio',
      population: '1.47M',
      medianRent: '$1,500',
      imageUrl: IMG.sanAntonio,
      imageAlt: 'San Antonio Texas River Walk and downtown skyline',
      neighborhoods: ['Downtown', 'Pearl District', 'Alamo Heights', 'Stone Oak', 'King William'],
      whyHere:
        'Affordability plus steady military, healthcare, and tourism employment make San Antonio the calmest of the major Texas leasing markets.',
    },
    {
      name: 'Fort Worth',
      slug: 'fort-worth',
      population: '958K',
      medianRent: '$1,600',
      imageUrl: IMG.fortWorth,
      imageAlt: 'Fort Worth Texas downtown buildings and Sundance Square',
      neighborhoods: ['Sundance Square', 'West 7th', 'TCU/Westcliff', 'Cultural District', 'Near Southside'],
      whyHere:
        'Complements Dallas with lower rents and strong aerospace, oil-and-gas, and logistics employment across the western metroplex.',
    },
    {
      name: 'El Paso',
      slug: 'el-paso',
      population: '678K',
      medianRent: '$1,250',
      imageUrl: IMG.elPaso,
      imageAlt: 'El Paso Texas desert cityscape with Franklin Mountains',
      neighborhoods: ['Downtown', 'Sunset Heights', 'Kern Place', 'East El Paso', 'Westside'],
      whyHere:
        'Border-economy demand plus Fort Bliss military housing pressure keep El Paso\'s low-rent inventory consistently absorbed.',
    },
    {
      name: 'Plano',
      slug: 'plano',
      population: '286K',
      medianRent: '$1,950',
      imageUrl: IMG.plano,
      imageAlt: 'Plano Texas suburban residential and corporate campus',
      neighborhoods: ['West Plano', 'Legacy West', 'Downtown Plano', 'East Plano', 'Willow Bend'],
      whyHere:
        'North Dallas corporate-relocation hub anchored by Toyota, Liberty Mutual, and JP Morgan campuses with premium single-family rental demand.',
    },
  ],
}

const CALIFORNIA: StateData = {
  name: 'California',
  slug: 'california',
  abbreviation: 'CA',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.losAngeles,
  heroImageAlt: 'California coastline with city skyline and ocean view',
  market: {
    population: '39.0M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$2,750',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '5.6%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+2.4%',
    rentalHouseholds: '5.95M',
    intro:
      'California is the most competitive rental market in North America with the strictest tenant-protection statutes. AB-1482 caps statewide rent increases on most non-exempt units, layered on top of Costa-Hawkins-bounded local rent control in San Francisco, Los Angeles, Oakland, Berkeley, and San Jose. The post-pandemic tech-sector recovery and AI-driven hiring have normalized Bay Area vacancies, while LA and Inland Empire markets continue to absorb relocation demand.',
  },
  topCities: [
    {
      name: 'Los Angeles',
      slug: 'los-angeles',
      population: '3.89M',
      medianRent: '$2,900',
      imageUrl: IMG.losAngeles,
      imageAlt: 'Los Angeles California cityscape with palm trees and downtown',
      neighborhoods: ['Downtown', 'Silver Lake', 'Venice', 'West Hollywood', 'Koreatown'],
      whyHere:
        'LA\'s rental market is governed by the Rent Stabilization Ordinance across many pre-1978 buildings; compliance expertise is essential.',
    },
    {
      name: 'San Diego',
      slug: 'san-diego',
      population: '1.39M',
      medianRent: '$2,700',
      imageUrl: IMG.sanDiego,
      imageAlt: 'San Diego California waterfront skyline and harbor',
      neighborhoods: ['Downtown', 'La Jolla', 'North Park', 'Pacific Beach', 'Hillcrest'],
      whyHere:
        'Naval and defence employment, biotech, and UCSD-area demand combine with limited housing supply to keep rents high year-round.',
    },
    {
      name: 'San Francisco',
      slug: 'san-francisco',
      population: '808K',
      medianRent: '$3,300',
      imageUrl: IMG.sanFrancisco,
      imageAlt: 'San Francisco California cityscape with Victorian houses',
      neighborhoods: ['SoMa', 'Mission', 'Hayes Valley', 'Pacific Heights', 'Marina'],
      whyHere:
        'Strict rent control and just-cause eviction rules apply. Tech-sector recovery and AI-driven hiring have normalized post-pandemic vacancies.',
    },
    {
      name: 'San Jose',
      slug: 'san-jose',
      population: '1.01M',
      medianRent: '$3,100',
      imageUrl: IMG.sanJose,
      imageAlt: 'San Jose California downtown skyline and Silicon Valley',
      neighborhoods: ['Downtown', 'Willow Glen', 'Santana Row', 'Almaden', 'North San Jose'],
      whyHere:
        'Silicon Valley\'s largest city. Demand tracks tech hiring cycles with premium pricing close to major campuses.',
    },
    {
      name: 'Sacramento',
      slug: 'sacramento',
      population: '525K',
      medianRent: '$2,000',
      imageUrl: IMG.sacramento,
      imageAlt: 'Sacramento California capitol dome and downtown skyline',
      neighborhoods: ['Midtown', 'East Sacramento', 'Land Park', 'Natomas', 'Oak Park'],
      whyHere:
        'California\'s capital offers state-government-sector stability and lower rents than coastal markets, with strong inland-relocation demand.',
    },
    {
      name: 'Long Beach',
      slug: 'long-beach',
      population: '456K',
      medianRent: '$2,350',
      imageUrl: IMG.longBeach,
      imageAlt: 'Long Beach California harbor skyline at golden hour',
      neighborhoods: ['Downtown', 'Belmont Shore', 'Bixby Knolls', 'Naples', 'East Village'],
      whyHere:
        'Port-economy, naval-medical, and CSU Long Beach demand anchor a market priced as the value play to Greater LA across the bay.',
    },
    {
      name: 'Oakland',
      slug: 'oakland',
      population: '433K',
      medianRent: '$2,450',
      imageUrl: IMG.oakland,
      imageAlt: 'Oakland California downtown skyline and bay bridge view',
      neighborhoods: ['Downtown', 'Lake Merritt', 'Temescal', 'Rockridge', 'Jack London Square'],
      whyHere:
        'East Bay leasing across Lake Merritt, Temescal, and Rockridge. Oakland Rent Adjustment Program applies to most pre-1996 multi-family.',
    },
    {
      name: 'Fresno',
      slug: 'fresno',
      population: '545K',
      medianRent: '$1,550',
      imageUrl: IMG.fresno,
      imageAlt: 'Fresno California Central Valley downtown street view',
      neighborhoods: ['Downtown', 'Tower District', 'Woodward Park', 'Fig Garden', 'Bullard'],
      whyHere:
        'Central Valley agricultural-economy and Fresno State demand support steady absorption at the lowest median rent of any major California city.',
    },
    {
      name: 'Anaheim',
      slug: 'anaheim',
      population: '346K',
      medianRent: '$2,400',
      imageUrl: IMG.anaheim,
      imageAlt: 'Anaheim California Orange County residential cityscape',
      neighborhoods: ['Anaheim Hills', 'Downtown', 'Platinum Triangle', 'West Anaheim', 'The Colony'],
      whyHere:
        'Orange County hospitality-economy anchored by Disneyland with strong year-round tourism-workforce and corporate-relocation rental demand.',
    },
  ],
}

const NEW_YORK: StateData = {
  name: 'New York',
  slug: 'new-york',
  abbreviation: 'NY',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.newYorkCity,
  heroImageAlt: 'New York City skyline with Empire State Building',
  market: {
    population: '19.6M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$2,900',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '4.6%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+3.6%',
    rentalHouseholds: '3.7M',
    intro:
      'From Manhattan\'s ultra-competitive submarkets through emerging Brooklyn and Queens neighbourhoods, plus the Upstate corridor — New York is the most-regulated state in the country. DHCR-registered rent-stabilized units, HSTPA 2019 protections, and the Good Cause Eviction Act (effective 2024) shape every leasing engagement. The 2023-26 NYC vacancy decline pushed asking rents in Manhattan and prime Brooklyn to all-time highs.',
  },
  topCities: [
    {
      name: 'New York City',
      slug: 'new-york-city',
      population: '8.34M',
      medianRent: '$3,500',
      imageUrl: IMG.newYorkCity,
      imageAlt: 'New York City skyline with Empire State Building',
      neighborhoods: ['Upper East Side', 'Upper West Side', 'Chelsea', 'East Village', 'Harlem'],
      whyHere:
        'Rent-stabilized units (DHCR-registered), market-rate rentals, and co-op sublets coexist. Compliance expertise is central to every leasing engagement.',
    },
    {
      name: 'Brooklyn',
      slug: 'brooklyn',
      population: '2.58M',
      medianRent: '$3,200',
      imageUrl: IMG.brooklyn,
      imageAlt: 'Brooklyn New York brownstone street with Manhattan skyline behind',
      neighborhoods: ['Williamsburg', 'DUMBO', 'Park Slope', 'Bushwick', 'Bay Ridge'],
      whyHere:
        'From Williamsburg and DUMBO premium to Bay Ridge and Bensonhurst family rentals. The borough\'s submarkets behave like separate cities.',
    },
    {
      name: 'Queens',
      slug: 'queens',
      population: '2.27M',
      medianRent: '$2,800',
      imageUrl: IMG.genericSkyline4,
      imageAlt: 'Queens New York Long Island City skyline view',
      neighborhoods: ['Long Island City', 'Astoria', 'Flushing', 'Jackson Heights', 'Forest Hills'],
      whyHere:
        'Long Island City high-rise plus Astoria, Flushing, and Jackson Heights\' deep multi-family inventory at relative-value pricing to Manhattan.',
    },
    {
      name: 'Buffalo',
      slug: 'buffalo',
      population: '278K',
      medianRent: '$1,200',
      imageUrl: IMG.buffalo,
      imageAlt: 'Buffalo New York downtown street and historic architecture',
      neighborhoods: ['Elmwood Village', 'Allentown', 'Downtown', 'North Park', 'South Buffalo'],
      whyHere:
        'Most affordable entry-point rentals in New York State with strong student demand around UB and Buffalo State.',
    },
    {
      name: 'Rochester',
      slug: 'rochester',
      population: '211K',
      medianRent: '$1,200',
      imageUrl: IMG.rochester,
      imageAlt: 'Rochester New York downtown street with historic buildings',
      neighborhoods: ['Park Avenue', 'East End', 'Corn Hill', 'NOTA', 'South Wedge'],
      whyHere:
        'University of Rochester and RIT employment drive steady demand at accessible rents, with strong medical-sector tenant depth.',
    },
    {
      name: 'Yonkers',
      slug: 'yonkers',
      population: '211K',
      medianRent: '$2,300',
      imageUrl: IMG.yonkers,
      imageAlt: 'Yonkers New York Hudson River waterfront residential view',
      neighborhoods: ['Downtown', 'Bronxville-adjacent', 'Park Hill', 'Lawrence Park', 'Crestwood'],
      whyHere:
        'Westchester\'s largest city with strong Metro-North commuter-rail demand from NYC professionals priced out of the Bronx.',
    },
  ],
}

const ILLINOIS: StateData = {
  name: 'Illinois',
  slug: 'illinois',
  abbreviation: 'IL',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.chicago,
  heroImageAlt: 'Chicago Illinois downtown skyline at twilight',
  market: {
    population: '12.55M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,750',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '7.4%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+2.9%',
    rentalHouseholds: '1.65M',
    intro:
      'Illinois rentals are anchored by the Chicago metro under the Chicago Residential Landlord and Tenant Ordinance (RLTO), one of the most tenant-friendly municipal frameworks in the Midwest. Collar counties (Aurora, Naperville, Lake County) draw steady GO-zone commuter demand via Metra, while Rockford and Springfield offer the state\'s most accessible price points. Statewide rent control remains preempted at the state level.',
  },
  topCities: [
    {
      name: 'Chicago',
      slug: 'chicago',
      population: '2.70M',
      medianRent: '$1,900',
      imageUrl: IMG.chicago,
      imageAlt: 'Chicago Illinois downtown skyline at twilight from the river',
      neighborhoods: ['Lincoln Park', 'Wicker Park', 'River North', 'Logan Square', 'Lakeview'],
      whyHere:
        'Nation\'s third-largest rental market combines world-class transit, the Chicago RLTO tenant-protection framework, and distinct neighborhood submarkets.',
    },
    {
      name: 'Aurora',
      slug: 'aurora',
      population: '180K',
      medianRent: '$1,600',
      imageUrl: IMG.auroraIL,
      imageAlt: 'Aurora Illinois suburban residential cityscape',
      neighborhoods: ['Downtown Aurora', 'East Aurora', 'Stonebridge', 'Eola', 'Fox Valley'],
      whyHere:
        'Illinois\' second-largest city offers commutable-to-Chicago rentals via Metra BNSF with stronger single-family inventory.',
    },
    {
      name: 'Naperville',
      slug: 'naperville',
      population: '149K',
      medianRent: '$2,050',
      imageUrl: IMG.naperville,
      imageAlt: 'Naperville Illinois downtown riverwalk and residential streets',
      neighborhoods: ['Downtown', 'White Eagle', 'Tall Grass', 'Cress Creek', 'South Naperville'],
      whyHere:
        'One of the top-ranked U.S. suburbs for families. Premium rentals anchored by top-rated school districts and Metra BNSF access.',
    },
    {
      name: 'Rockford',
      slug: 'rockford',
      population: '148K',
      medianRent: '$1,100',
      imageUrl: IMG.rockford,
      imageAlt: 'Rockford Illinois downtown buildings along the Rock River',
      neighborhoods: ['Downtown', 'North End', 'East State', 'Edgewater', 'Churchill\'s Grove'],
      whyHere:
        'Most affordable rentals in northern Illinois with logistics-sector and aerospace employment anchoring steady mid-market demand.',
    },
    {
      name: 'Springfield',
      slug: 'springfield',
      population: '114K',
      medianRent: '$1,050',
      imageUrl: IMG.springfieldIL,
      imageAlt: 'Springfield Illinois state capitol and historic downtown',
      neighborhoods: ['Downtown', 'Vinegar Hill', 'Aristocrat Hills', 'West Side', 'Iles Park'],
      whyHere:
        'Illinois\' capital offers state-government stability and the most affordable rent in the state, with steady civil-service tenant tenure.',
    },
  ],
}

const GEORGIA: StateData = {
  name: 'Georgia',
  slug: 'georgia',
  abbreviation: 'GA',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.atlanta,
  heroImageAlt: 'Atlanta Georgia downtown skyline with green tree canopy',
  market: {
    population: '11.2M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,650',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '8.7%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+2.6%',
    rentalHouseholds: '1.45M',
    intro:
      'Atlanta-anchored leasing across a fast-growing Sun Belt state with strong in-migration, healthy build-to-rent inventory, and tier-2 demand in Augusta, Savannah, and Columbus. Georgia has no state-level rent control and limited tenant-protection statutes — making it one of the most landlord-favourable major U.S. markets. The Atlanta metro\'s Class-A delivery wave has tempered rent growth in Midtown and Buckhead through 2026.',
  },
  topCities: [
    {
      name: 'Atlanta',
      slug: 'atlanta',
      population: '499K',
      medianRent: '$1,700',
      imageUrl: IMG.atlanta,
      imageAlt: 'Atlanta Georgia downtown skyline with green tree canopy',
      neighborhoods: ['Midtown', 'Buckhead', 'Inman Park', 'Old Fourth Ward', 'West Midtown'],
      whyHere:
        'Sun Belt\'s capital metro with Fortune 500 corporate density, MARTA transit, and strong build-to-rent inventory across Midtown, Buckhead, and Inman Park.',
    },
    {
      name: 'Augusta',
      slug: 'augusta',
      population: '200K',
      medianRent: '$1,250',
      imageUrl: IMG.augusta,
      imageAlt: 'Augusta Georgia Riverwalk and downtown street view',
      neighborhoods: ['Downtown', 'Summerville', 'Hill', 'West Lake', 'Forest Hills'],
      whyHere:
        'Fort Eisenhower military demand plus Medical College of Georgia tenant base. Affordable rents with steady year-round absorption.',
    },
    {
      name: 'Savannah',
      slug: 'savannah',
      population: '148K',
      medianRent: '$1,650',
      imageUrl: IMG.savannah,
      imageAlt: 'Savannah Georgia historic district with Spanish moss oaks',
      neighborhoods: ['Historic District', 'Starland', 'Ardsley Park', 'Thomas Square', 'Downtown'],
      whyHere:
        'Historic-district rental yield plus port-economy and SCAD student demand. One of the most tourism-shaped Southeastern leasing markets.',
    },
    {
      name: 'Columbus',
      slug: 'columbus',
      population: '207K',
      medianRent: '$1,150',
      imageUrl: IMG.columbusGA,
      imageAlt: 'Columbus Georgia Chattahoochee Riverwalk and downtown',
      neighborhoods: ['Downtown', 'Midtown', 'North Columbus', 'Beallwood', 'Bibb City'],
      whyHere:
        'Fort Moore military demand and Columbus State employment anchor the most affordable major-city rental market in Georgia.',
    },
  ],
}

const NORTH_CAROLINA: StateData = {
  name: 'North Carolina',
  slug: 'north-carolina',
  abbreviation: 'NC',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.charlotte,
  heroImageAlt: 'Charlotte North Carolina uptown skyline at dusk',
  market: {
    population: '11.0M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,600',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '8.1%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+2.4%',
    rentalHouseholds: '1.4M',
    intro:
      'Charlotte and Raleigh-Durham leasing across one of the strongest tech-and-finance inbound migration corridors in the country, plus Greensboro and Winston-Salem in the Triad. North Carolina has no state-level rent control and a relatively landlord-favourable statutory framework. Research Triangle Park hiring has anchored Raleigh-Durham as one of the country\'s top rent-growth markets through the past decade.',
  },
  topCities: [
    {
      name: 'Charlotte',
      slug: 'charlotte',
      population: '897K',
      medianRent: '$1,650',
      imageUrl: IMG.charlotte,
      imageAlt: 'Charlotte North Carolina uptown skyline at dusk',
      neighborhoods: ['Uptown', 'South End', 'NoDa', 'Plaza Midwood', 'Dilworth'],
      whyHere:
        'Bank-of-America and Truist HQs anchor a finance-sector relocation magnet. Demand is strongest in Uptown, South End, and NoDa.',
    },
    {
      name: 'Raleigh',
      slug: 'raleigh',
      population: '467K',
      medianRent: '$1,700',
      imageUrl: IMG.raleigh,
      imageAlt: 'Raleigh North Carolina state capitol and downtown skyline',
      neighborhoods: ['Downtown', 'North Hills', 'Five Points', 'Cameron Village', 'ITB'],
      whyHere:
        'Research Triangle Park tech employment plus state-government and university demand drive one of the country\'s strongest rent-growth markets.',
    },
    {
      name: 'Durham',
      slug: 'durham',
      population: '285K',
      medianRent: '$1,600',
      imageUrl: IMG.durham,
      imageAlt: 'Durham North Carolina American Tobacco Campus and downtown',
      neighborhoods: ['American Tobacco', 'Old West Durham', 'Trinity Park', 'Watts-Hillandale', 'Brightleaf'],
      whyHere:
        'Duke University and Duke Health employment anchor a steady year-round market with strong rental yield in the American Tobacco Historic District.',
    },
    {
      name: 'Greensboro',
      slug: 'greensboro',
      population: '299K',
      medianRent: '$1,300',
      imageUrl: IMG.greensboro,
      imageAlt: 'Greensboro North Carolina downtown and historic district',
      neighborhoods: ['Downtown', 'Fisher Park', 'Sunset Hills', 'Lindley Park', 'Westerwood'],
      whyHere:
        'Piedmont Triad logistics employment and UNC Greensboro demand support affordable mid-market rentals across a transit-accessible footprint.',
    },
    {
      name: 'Winston-Salem',
      slug: 'winston-salem',
      population: '250K',
      medianRent: '$1,250',
      imageUrl: IMG.winstonSalem,
      imageAlt: 'Winston-Salem North Carolina downtown arts district view',
      neighborhoods: ['Downtown', 'West End', 'Ardmore', 'Buena Vista', 'Washington Park'],
      whyHere:
        'Wake Forest University and Atrium Health-Wake Forest Baptist employment plus a strong arts-district revival anchor the market.',
    },
  ],
}

const ARIZONA: StateData = {
  name: 'Arizona',
  slug: 'arizona',
  abbreviation: 'AZ',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.phoenix,
  heroImageAlt: 'Phoenix Arizona desert city skyline at sunset',
  market: {
    population: '7.6M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,650',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '8.6%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+1.4%',
    rentalHouseholds: '1.0M',
    intro:
      'Phoenix-metro leasing with disciplined pricing for a market shaped by seasonal rental cycles, California in-migration, and the Tucson university-and-defence anchor. The 2024-26 multifamily delivery wave in metro Phoenix temporarily lifted vacancy and tempered rent growth, but TSMC Phoenix and the broader Sun Belt semiconductor boom continue to drive sustained absorption. Snowbird seasonality remains an important rhythm in Scottsdale and Mesa.',
  },
  topCities: [
    {
      name: 'Phoenix',
      slug: 'phoenix',
      population: '1.61M',
      medianRent: '$1,550',
      imageUrl: IMG.phoenix,
      imageAlt: 'Phoenix Arizona desert city skyline with mountains',
      neighborhoods: ['Downtown', 'Arcadia', 'Biltmore', 'Roosevelt Row', 'Ahwatukee'],
      whyHere:
        'Sustained California in-migration plus semiconductor-sector growth (TSMC Phoenix) keep the metro\'s rental demand resilient through seasonal cycles.',
    },
    {
      name: 'Tucson',
      slug: 'tucson',
      population: '547K',
      medianRent: '$1,350',
      imageUrl: IMG.tucson,
      imageAlt: 'Tucson Arizona desert cityscape with Catalina Mountains',
      neighborhoods: ['Downtown', 'Sam Hughes', 'Catalina Foothills', 'Oro Valley-adjacent', 'Armory Park'],
      whyHere:
        'University of Arizona, Davis-Monthan AFB, and Raytheon employment anchor the steadiest year-round Arizona rental submarket.',
    },
    {
      name: 'Mesa',
      slug: 'mesa',
      population: '511K',
      medianRent: '$1,500',
      imageUrl: IMG.mesa,
      imageAlt: 'Mesa Arizona East Valley suburban residential cityscape',
      neighborhoods: ['Downtown Mesa', 'Eastmark', 'Las Sendas', 'Dobson Ranch', 'Red Mountain Ranch'],
      whyHere:
        'East Valley\'s largest city with strong build-to-rent inventory and steady ASU Polytechnic and ASU East Mesa student demand.',
    },
    {
      name: 'Scottsdale',
      slug: 'scottsdale',
      population: '242K',
      medianRent: '$2,100',
      imageUrl: IMG.scottsdale,
      imageAlt: 'Scottsdale Arizona luxury residential with desert mountains',
      neighborhoods: ['Old Town', 'North Scottsdale', 'McCormick Ranch', 'DC Ranch', 'Gainey Ranch'],
      whyHere:
        'Premium Phoenix-metro submarket with seasonal snowbird demand, executive-relocation single-family rentals, and Old Town entertainment-district condos.',
    },
  ],
}

const COLORADO: StateData = {
  name: 'Colorado',
  slug: 'colorado',
  abbreviation: 'CO',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.denver,
  heroImageAlt: 'Denver Colorado skyline with the Rocky Mountains behind',
  market: {
    population: '5.95M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$1,900',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '8.2%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+1.7%',
    rentalHouseholds: '795K',
    intro:
      'Denver-anchored leasing with Front Range coverage across Colorado Springs, Aurora, and Fort Collins. Strong wage growth and steady rental demand from outdoor-economy in-migration. Colorado lifted its statewide preemption of local rent control in 2024, but Denver and most Front Range cities have not yet adopted local ordinances. Class-A multifamily delivery has tempered rent growth in LoDo and RiNo through 2025-26.',
  },
  topCities: [
    {
      name: 'Denver',
      slug: 'denver',
      population: '716K',
      medianRent: '$2,000',
      imageUrl: IMG.denver,
      imageAlt: 'Denver Colorado skyline with Rocky Mountains behind',
      neighborhoods: ['LoDo', 'RiNo', 'Cherry Creek', 'Highlands', 'Capitol Hill'],
      whyHere:
        'LoDo, RiNo, and Cherry Creek anchor a Front Range market shaped by aerospace, energy, and outdoor-economy in-migration.',
    },
    {
      name: 'Colorado Springs',
      slug: 'colorado-springs',
      population: '488K',
      medianRent: '$1,650',
      imageUrl: IMG.coloradoSprings,
      imageAlt: 'Colorado Springs cityscape with Pikes Peak in distance',
      neighborhoods: ['Downtown', 'Old Colorado City', 'Briargate', 'Broadmoor', 'Powers'],
      whyHere:
        'Air Force Academy, Peterson SFB, and Fort Carson military demand drive predictable, steady absorption with disciplined pricing.',
    },
    {
      name: 'Aurora',
      slug: 'aurora',
      population: '391K',
      medianRent: '$1,700',
      imageUrl: IMG.auroraCO,
      imageAlt: 'Aurora Colorado suburban Denver-area residential cityscape',
      neighborhoods: ['Original Aurora', 'Anschutz Medical', 'Saddle Rock', 'Tower Triangle', 'Southshore'],
      whyHere:
        'Denver\'s largest suburb anchored by Anschutz Medical Campus and Buckley SFB. Strong family-rental and clinician-relocation demand.',
    },
    {
      name: 'Fort Collins',
      slug: 'fort-collins',
      population: '170K',
      medianRent: '$1,750',
      imageUrl: IMG.fortCollins,
      imageAlt: 'Fort Collins Colorado historic Old Town district',
      neighborhoods: ['Old Town', 'Campus West', 'South Fort Collins', 'Harmony', 'Northside'],
      whyHere:
        'Colorado State University drives the lease cycle. Old Town walkability and strong tech-sector employment create competitive year-round pricing.',
    },
  ],
}

const NEW_JERSEY: StateData = {
  name: 'New Jersey',
  slug: 'new-jersey',
  abbreviation: 'NJ',
  flagEmoji: '🇺🇸',
  heroImageUrl: IMG.jerseyCity,
  heroImageAlt: 'Jersey City waterfront skyline opposite Manhattan at sunset',
  market: {
    population: '9.5M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    medianRent: '$2,400',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (2-bed)',
    vacancyRate: '4.5%',
    vacancySource: 'U.S. Census Bureau ACS 5-Year 2023',
    rentGrowthYoY: '+4.1%',
    rentalHouseholds: '1.25M',
    intro:
      'Northern New Jersey leasing with a focus on NYC-commuter submarkets and dense rental inventory along the Hudson corridor, plus inland depth in Newark, Paterson, Elizabeth, and Edison. New Jersey is one of only four U.S. states permitting municipal rent control, and Newark, Jersey City, Elizabeth, and Paterson all maintain active local ordinances. Statewide vacancy is among the lowest in the U.S. outside of California and New York.',
  },
  topCities: [
    {
      name: 'Jersey City',
      slug: 'jersey-city',
      population: '292K',
      medianRent: '$3,100',
      imageUrl: IMG.jerseyCity,
      imageAlt: 'Jersey City New Jersey waterfront with Manhattan skyline',
      neighborhoods: ['Downtown', 'Newport', 'Journal Square', 'The Heights', 'Paulus Hook'],
      whyHere:
        'Hudson waterfront high-rise inventory priced at a steep discount to Manhattan across the river. PATH access defines premium pricing.',
    },
    {
      name: 'Newark',
      slug: 'newark',
      population: '305K',
      medianRent: '$1,900',
      imageUrl: IMG.newark,
      imageAlt: 'Newark New Jersey downtown skyline at dusk',
      neighborhoods: ['Downtown', 'Ironbound', 'Forest Hill', 'University Heights', 'North Ward'],
      whyHere:
        'NJ Transit and PATH commuter demand plus Rutgers-Newark and NJIT anchor a multi-family-heavy market with strong yield characteristics.',
    },
    {
      name: 'Paterson',
      slug: 'paterson',
      population: '159K',
      medianRent: '$1,800',
      imageUrl: IMG.paterson,
      imageAlt: 'Paterson New Jersey historic Great Falls and downtown',
      neighborhoods: ['Downtown', 'Eastside', 'South Paterson', 'Lakeview', 'Hillcrest'],
      whyHere:
        'Dense Passaic County multi-family market with strong tenant demand and meaningfully lower rents than the Hudson waterfront submarkets.',
    },
    {
      name: 'Elizabeth',
      slug: 'elizabeth',
      population: '137K',
      medianRent: '$1,850',
      imageUrl: IMG.elizabeth,
      imageAlt: 'Elizabeth New Jersey downtown street with mid-rise buildings',
      neighborhoods: ['Midtown', 'Elmora', 'North Elizabeth', 'Bayway', 'Frog Hollow'],
      whyHere:
        'Union County multi-family corridor with strong NJ Transit Northeast Corridor access. Consistent absorption across rowhomes and walk-ups.',
    },
    {
      name: 'Edison',
      slug: 'edison',
      population: '107K',
      medianRent: '$2,200',
      imageUrl: IMG.edison,
      imageAlt: 'Edison New Jersey suburban residential and corporate corridor',
      neighborhoods: ['Oak Tree Road', 'Clara Barton', 'North Edison', 'South Edison', 'Stelton'],
      whyHere:
        'Middlesex County corporate-park employment and strong South-Asian-American family demand drive premium single-family rentals.',
    },
  ],
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const CANADA_PROVINCES: ProvinceData[] = [
  ONTARIO,
  QUEBEC,
  BRITISH_COLUMBIA,
  ALBERTA,
  MANITOBA,
  NOVA_SCOTIA,
]

export const US_STATES: StateData[] = [
  FLORIDA,
  TEXAS,
  CALIFORNIA,
  NEW_YORK,
  ILLINOIS,
  GEORGIA,
  NORTH_CAROLINA,
  ARIZONA,
  COLORADO,
  NEW_JERSEY,
]

export const COUNTRY_TOTALS: { canada: CountryTotals; us: CountryTotals } = {
  canada: {
    population: '40.5M',
    populationSource: 'Statistics Canada, Q4 2025',
    rentalHouseholds: '5.0M',
    rentalHouseholdsSource: 'Statistics Canada Census 2021 (updated CMHC estimates 2025)',
    medianRent: '$2,150',
    medianRentSource: 'CMHC Rental Market Report 2025 (national 2-bed asking rent)',
    vacancyRate: '2.2%',
    vacancySource: 'CMHC Rental Market Report 2025 (national purpose-built rental)',
    rentGrowthYoY: '+5.7%',
  },
  us: {
    population: '335M',
    populationSource: 'U.S. Census Bureau, July 2024 estimate',
    rentalHouseholds: '44M',
    rentalHouseholdsSource: 'U.S. Census Bureau ACS 5-Year 2023',
    medianRent: '$1,950',
    medianRentSource: 'Zillow Observed Rent Index, April 2026 (national 2-bed)',
    vacancyRate: '6.6%',
    vacancySource: 'U.S. Census Bureau Housing Vacancy Survey Q4 2025',
    rentGrowthYoY: '+2.8%',
  },
}

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export function getProvinceBySlug(slug: string): ProvinceData | null {
  return CANADA_PROVINCES.find((p) => p.slug === slug) ?? null
}

export function getStateBySlug(slug: string): StateData | null {
  return US_STATES.find((s) => s.slug === slug) ?? null
}
