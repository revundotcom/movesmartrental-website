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
    heroImageUrl: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=1600&q=80',
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
// Other Canadian provinces: Quebec, BC, Alberta, Manitoba, Nova Scotia
// Full FallbackCity entries (so getFallbackCaCity finds them) + a
// FallbackProvince aggregate for the /ca/[province]/ page route.
// ---------------------------------------------------------------------------

const QC_PROVINCE_REF: FallbackCity['province'] = {
  title: 'Quebec',
  slug: { current: 'quebec' },
  country: 'ca',
  abbreviation: 'QC',
}
const BC_PROVINCE_REF: FallbackCity['province'] = {
  title: 'British Columbia',
  slug: { current: 'british-columbia' },
  country: 'ca',
  abbreviation: 'BC',
}
const AB_PROVINCE_REF: FallbackCity['province'] = {
  title: 'Alberta',
  slug: { current: 'alberta' },
  country: 'ca',
  abbreviation: 'AB',
}
const MB_PROVINCE_REF: FallbackCity['province'] = {
  title: 'Manitoba',
  slug: { current: 'manitoba' },
  country: 'ca',
  abbreviation: 'MB',
}
const NS_PROVINCE_REF: FallbackCity['province'] = {
  title: 'Nova Scotia',
  slug: { current: 'nova-scotia' },
  country: 'ca',
  abbreviation: 'NS',
}

const QUEBEC_CITIES: FallbackCity[] = [
  {
    _id: 'city-montreal-static',
    title: 'Montreal',
    slug: { current: 'montreal' },
    tier: 1,
    population: 1780000,
    medianRent: 1700,
    vacancyRate: 1.5,
    neighbourhoods: ['Plateau-Mont-Royal', 'Mile End', 'Rosemont', 'Villeray', 'Griffintown', 'Verdun', 'Outremont', 'Le Sud-Ouest'],
    transitInfo:
      'STM operates the Montreal Métro (four lines) and an extensive bus network; REM light rail is expanding service to the South Shore, West Island, and North Shore.',
    description:
      'Montreal is Canada\'s most idiosyncratic rental market - plex stock dominates the inner neighbourhoods, leasing aligns to the July 1 moving day, and TAL rent-increase grids shape pricing discipline. Demand is strong year-round across both francophone and anglophone tenant pools.',
    heroImageUrl: 'https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Montreal skyline with Mount Royal cross at dusk',
    province: QC_PROVINCE_REF,
  },
  {
    _id: 'city-quebec-city-static',
    title: 'Quebec City',
    slug: { current: 'quebec-city' },
    tier: 1,
    population: 549000,
    medianRent: 1450,
    vacancyRate: 1.2,
    neighbourhoods: ['Vieux-Québec', 'Saint-Roch', 'Saint-Jean-Baptiste', 'Sainte-Foy', 'Limoilou', 'Montcalm', 'Sillery'],
    transitInfo:
      'RTC bus network covers the city; tramway construction is underway connecting Cap-Rouge to Charlesbourg, with delivery scheduled later this decade.',
    description:
      'Quebec City rentals are anchored by Laval University, the provincial government, and a stable francophone population. Vacancy is consistently tight in Sainte-Foy and downtown plex pockets, with strong owner-occupier dynamics shaping inventory.',
    heroImageUrl: 'https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Quebec City Old Town Chateau Frontenac and historic buildings',
    province: QC_PROVINCE_REF,
  },
  {
    _id: 'city-laval-static',
    title: 'Laval',
    slug: { current: 'laval' },
    tier: 1,
    population: 438000,
    medianRent: 1600,
    vacancyRate: 1.8,
    neighbourhoods: ['Chomedey', 'Sainte-Rose', 'Vimont', 'Duvernay', 'Pont-Viau', 'Laval-des-Rapides', 'Saint-Vincent-de-Paul'],
    transitInfo:
      'STL bus network plus three STM Métro stations on the Orange Line (Cartier, De la Concorde, Montmorency) link Laval to downtown Montreal in 25 minutes.',
    description:
      'Laval is the third-largest city in Quebec and the bedroom community of choice for Montreal-adjacent families. The rental market favours 2-3 bedroom condos near Métro stations and detached homes in Sainte-Rose and Duvernay.',
    heroImageUrl: 'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Laval Quebec suburban residential street with autumn trees',
    province: QC_PROVINCE_REF,
  },
  {
    _id: 'city-gatineau-static',
    title: 'Gatineau',
    slug: { current: 'gatineau' },
    tier: 1,
    population: 295000,
    medianRent: 1550,
    vacancyRate: 1.6,
    neighbourhoods: ['Hull', 'Aylmer', 'Gatineau (sector)', 'Buckingham', 'Masson-Angers', 'Le Plateau'],
    transitInfo:
      'STO bus network plus Rapibus BRT corridor; cross-river access to OC Transpo Ottawa via the Portage and Alexandra bridges.',
    description:
      'Gatineau\'s rental market is driven by federal government employment on both sides of the Ottawa River. Bilingual tenant pools and steady public-sector demand keep vacancy persistently low in Hull and Aylmer.',
    heroImageUrl: 'https://images.unsplash.com/photo-1591400304123-7d10f2f5add9?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Gatineau Quebec view across the river toward Ottawa Parliament',
    province: QC_PROVINCE_REF,
  },
  {
    _id: 'city-longueuil-static',
    title: 'Longueuil',
    slug: { current: 'longueuil' },
    tier: 1,
    population: 254000,
    medianRent: 1500,
    vacancyRate: 1.7,
    neighbourhoods: ['Vieux-Longueuil', 'Greenfield Park', 'Saint-Hubert', 'Saint-Lambert', 'LeMoyne', 'Boucherville-adjacent'],
    transitInfo:
      'RTL bus network plus the STM Yellow Line Métro (Longueuil-Université-de-Sherbrooke) connect to downtown Montreal in under 10 minutes.',
    description:
      'Longueuil anchors Montreal\'s South Shore with a mix of plex inventory, mid-rise condos, and family homes. The REM South Shore branch has redrawn commute economics, lifting rents in Brossard-adjacent pockets.',
    heroImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Longueuil Quebec waterfront and city view across the St Lawrence',
    province: QC_PROVINCE_REF,
  },
  {
    _id: 'city-sherbrooke-static',
    title: 'Sherbrooke',
    slug: { current: 'sherbrooke' },
    tier: 1,
    population: 172000,
    medianRent: 1250,
    vacancyRate: 2.0,
    neighbourhoods: ['Centre-ville', 'Fleurimont', 'Mont-Bellevue', 'Lennoxville', 'Rock Forest', 'Brompton'],
    transitInfo:
      'STS bus network serves the Sherbrooke metro; Université de Sherbrooke and Bishop\'s University drive student-cycle demand.',
    description:
      'Sherbrooke combines a deep university tenant base (Université de Sherbrooke, Bishop\'s, CÉGEP de Sherbrooke) with a regional-hub healthcare economy. September leasing cycle dominates; year-round vacancy stays moderate.',
    heroImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Sherbrooke Quebec downtown street with historic stone buildings',
    province: QC_PROVINCE_REF,
  },
]

const BC_CITIES: FallbackCity[] = [
  {
    _id: 'city-vancouver-static',
    title: 'Vancouver',
    slug: { current: 'vancouver' },
    tier: 1,
    population: 695000,
    medianRent: 2700,
    vacancyRate: 0.9,
    neighbourhoods: ['Downtown', 'Yaletown', 'Coal Harbour', 'Kitsilano', 'Mount Pleasant', 'Commercial Drive', 'Kerrisdale', 'West End'],
    transitInfo:
      'TransLink operates the SkyTrain (Expo, Millennium, Canada Lines), SeaBus to North Vancouver, and an extensive bus network across Metro Vancouver.',
    description:
      'Vancouver is North America\'s tightest rental market with sub-1% vacancy across most submarkets. Rent control is tied to CPI, the Empty Homes Tax applies to underutilized stock, and the Speculation and Vacancy Tax layers on top. Tenant screening discipline is non-negotiable.',
    heroImageUrl: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Vancouver skyline with mountains and harbour at sunset',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-burnaby-static',
    title: 'Burnaby',
    slug: { current: 'burnaby' },
    tier: 1,
    population: 250000,
    medianRent: 2400,
    vacancyRate: 1.0,
    neighbourhoods: ['Metrotown', 'Brentwood', 'Lougheed', 'Edmonds', 'Burnaby Heights', 'Capitol Hill', 'Deer Lake'],
    transitInfo:
      'SkyTrain Expo and Millennium Lines serve Burnaby with multiple high-density transit hubs at Metrotown, Brentwood, and Lougheed.',
    description:
      'Burnaby has become Metro Vancouver\'s densest secondary rental market, with high-rise transit-oriented inventory around Metrotown and Brentwood. SFU drives steady student demand at Burnaby Mountain.',
    heroImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Burnaby BC Metrotown high-rise towers with mountain backdrop',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-surrey-static',
    title: 'Surrey',
    slug: { current: 'surrey' },
    tier: 1,
    population: 568000,
    medianRent: 2200,
    vacancyRate: 1.3,
    neighbourhoods: ['Surrey Central', 'Guildford', 'Newton', 'Cloverdale', 'South Surrey', 'Fleetwood', 'Whalley'],
    transitInfo:
      'SkyTrain Expo Line terminates at King George (Surrey Central); the Surrey Langley SkyTrain extension is under construction. Extensive TransLink bus coverage.',
    description:
      'Surrey is BC\'s fastest-growing city by population and the densest pipeline of new rental construction in Metro Vancouver. Demand is dominated by young families and a diverse South Asian and Filipino-Canadian tenant base.',
    heroImageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Surrey BC downtown high-rise development with mountain views',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-richmond-bc-static',
    title: 'Richmond',
    slug: { current: 'richmond' },
    tier: 1,
    population: 209000,
    medianRent: 2350,
    vacancyRate: 1.1,
    neighbourhoods: ['Brighouse', 'Steveston', 'Thompson', 'Hamilton', 'East Cambie', 'Sea Island', 'Broadmoor'],
    transitInfo:
      'Canada Line SkyTrain connects Richmond to downtown Vancouver and YVR airport in 25 minutes; TransLink buses cover the rest of the city.',
    description:
      'Richmond has Canada\'s highest concentration of Chinese-Canadian residents and an exceptionally strong international applicant pool. Listings perform best with Mandarin and Cantonese marketing alongside English.',
    heroImageUrl: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Richmond BC waterfront fishing village at Steveston',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-victoria-static',
    title: 'Victoria',
    slug: { current: 'victoria' },
    tier: 1,
    population: 92000,
    medianRent: 2250,
    vacancyRate: 1.2,
    neighbourhoods: ['Downtown', 'James Bay', 'Fernwood', 'Fairfield', 'Oak Bay-adjacent', 'Vic West', 'Rockland'],
    transitInfo:
      'BC Transit operates the Victoria bus network; ferry service via BC Ferries to Vancouver and floatplane connections to downtown YVR.',
    description:
      'Victoria\'s rental market is shaped by the BC government workforce, University of Victoria, Camosun College, and a strong retiree base. Heritage stock dominates the inner neighbourhoods with strict character-protection rules.',
    heroImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Victoria BC Inner Harbour with Parliament buildings at dusk',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-coquitlam-static',
    title: 'Coquitlam',
    slug: { current: 'coquitlam' },
    tier: 1,
    population: 154000,
    medianRent: 2300,
    vacancyRate: 1.2,
    neighbourhoods: ['Coquitlam Centre', 'Burke Mountain', 'Westwood Plateau', 'Maillardville', 'Austin Heights', 'Eagle Ridge'],
    transitInfo:
      'SkyTrain Evergreen extension (Millennium Line) serves Coquitlam Centre, Lincoln, and Lafarge Lake-Douglas stations; West Coast Express commuter rail runs to downtown Vancouver.',
    description:
      'Coquitlam has been the Tri-Cities growth leader since the Evergreen extension opened. Transit-oriented high-rise inventory around Coquitlam Centre is the dominant new-rental category, with family demand strong in Burke Mountain.',
    heroImageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Coquitlam BC town centre high-rises with mountains',
    province: BC_PROVINCE_REF,
  },
  {
    _id: 'city-kelowna-static',
    title: 'Kelowna',
    slug: { current: 'kelowna' },
    tier: 1,
    population: 145000,
    medianRent: 2100,
    vacancyRate: 1.5,
    neighbourhoods: ['Downtown', 'Lower Mission', 'Glenmore', 'Rutland', 'Kelowna North', 'Upper Mission', 'Black Mountain'],
    transitInfo:
      'BC Transit Kelowna Regional service plus YLW airport connectivity; the city is highway-oriented with car-dependent rental patterns.',
    description:
      'Kelowna leads BC interior rental growth, anchored by UBC Okanagan, Okanagan College, a growing tech sector, and lifestyle in-migration from the Lower Mainland and Alberta. Demand spikes seasonally with university intake and tourism.',
    heroImageUrl: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Kelowna BC Okanagan Lake waterfront with vineyards and mountains',
    province: BC_PROVINCE_REF,
  },
]

const ALBERTA_CITIES: FallbackCity[] = [
  {
    _id: 'city-calgary-static',
    title: 'Calgary',
    slug: { current: 'calgary' },
    tier: 1,
    population: 1340000,
    medianRent: 1900,
    vacancyRate: 2.6,
    neighbourhoods: ['Downtown', 'Beltline', 'Kensington', 'Inglewood', 'Mission', 'Mount Pleasant', 'Bridgeland', 'Bowness'],
    transitInfo:
      'Calgary Transit operates the CTrain LRT (Red and Blue lines) plus an extensive bus network; the Green Line LRT is under construction north-to-south through downtown.',
    description:
      'Calgary\'s rental market is among Canada\'s strongest with no provincial rent cap and free-market pricing between tenancies. In-migration from Ontario and BC has driven sustained rent growth; energy sector recovery anchors stable demand.',
    heroImageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Calgary skyline with Calgary Tower and Rocky Mountains backdrop',
    province: AB_PROVINCE_REF,
  },
  {
    _id: 'city-edmonton-static',
    title: 'Edmonton',
    slug: { current: 'edmonton' },
    tier: 1,
    population: 1010000,
    medianRent: 1550,
    vacancyRate: 3.1,
    neighbourhoods: ['Downtown', 'Old Strathcona', 'Oliver', 'Garneau', 'Glenora', 'Westmount', 'Ritchie', 'Bonnie Doon'],
    transitInfo:
      'Edmonton Transit Service operates the Capital and Metro LRT lines plus an extensive bus network; the Valley Line LRT southeast extension is operational.',
    description:
      'Edmonton offers Canada\'s most accessible major-metro rents with provincial-government, University of Alberta, and healthcare workforce demand. Year-round leasing cycle without a strong July or September peak.',
    heroImageUrl: 'https://images.unsplash.com/photo-1611611158876-41699b77a059?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Edmonton Alberta skyline along the North Saskatchewan River',
    province: AB_PROVINCE_REF,
  },
  {
    _id: 'city-red-deer-static',
    title: 'Red Deer',
    slug: { current: 'red-deer' },
    tier: 1,
    population: 106000,
    medianRent: 1350,
    vacancyRate: 4.5,
    neighbourhoods: ['Downtown', 'Sunnybrook', 'Anders', 'Inglewood', 'Eastview', 'Riverside Meadows', 'Glendale'],
    transitInfo:
      'Red Deer Transit provides bus service across the city; the Highway 2 corridor links to Calgary and Edmonton in about 90 minutes each way.',
    description:
      'Red Deer anchors central Alberta\'s service economy with oil-and-gas-adjacent demand, Red Deer Polytechnic students, and stable working-family rental needs. Vacancy is the highest among Alberta\'s tier-1 cities.',
    heroImageUrl: 'https://images.unsplash.com/photo-1597007030739-6d2e7172ee5b?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Red Deer Alberta downtown skyline at twilight',
    province: AB_PROVINCE_REF,
  },
  {
    _id: 'city-lethbridge-static',
    title: 'Lethbridge',
    slug: { current: 'lethbridge' },
    tier: 1,
    population: 105000,
    medianRent: 1300,
    vacancyRate: 4.8,
    neighbourhoods: ['Downtown', 'West Lethbridge', 'South Lethbridge', 'North Lethbridge', 'Varsity Village', 'Indian Battle Heights'],
    transitInfo:
      'Lethbridge Transit covers the city with bus service connecting University of Lethbridge campus to downtown and residential areas.',
    description:
      'Lethbridge is Alberta\'s southern hub anchored by the University of Lethbridge, Lethbridge College, and a strong agricultural processing sector. Student-cycle leasing peaks in August-September.',
    heroImageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Lethbridge Alberta High Level Bridge across the Oldman River',
    province: AB_PROVINCE_REF,
  },
  {
    _id: 'city-airdrie-static',
    title: 'Airdrie',
    slug: { current: 'airdrie' },
    tier: 1,
    population: 84000,
    medianRent: 1750,
    vacancyRate: 3.5,
    neighbourhoods: ['Bayside', 'Cooper\'s Crossing', 'Williamstown', 'King\'s Heights', 'Sagewood', 'Downtown Airdrie'],
    transitInfo:
      'Airdrie Transit runs commuter routes plus ICE Express service to downtown Calgary in about 45 minutes; QEII Highway is the primary commuter corridor.',
    description:
      'Airdrie has been one of Canada\'s fastest-growing municipalities for a decade, drawing Calgary commuters into new-build subdivisions. Rental stock skews to newer detached homes and townhouses with strong family-tenant demand.',
    heroImageUrl: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Airdrie Alberta suburban new-build community at sunset',
    province: AB_PROVINCE_REF,
  },
]

const MANITOBA_CITIES: FallbackCity[] = [
  {
    _id: 'city-winnipeg-static',
    title: 'Winnipeg',
    slug: { current: 'winnipeg' },
    tier: 1,
    population: 750000,
    medianRent: 1500,
    vacancyRate: 3.4,
    neighbourhoods: ['Downtown', 'Exchange District', 'Osborne Village', 'Wolseley', 'St. Boniface', 'River Heights', 'Corydon', 'West End'],
    transitInfo:
      'Winnipeg Transit operates an extensive bus network plus the Southwest and Eastern Transitways; rapid transit BRT corridors serve U of M and beyond.',
    description:
      'Winnipeg is Manitoba\'s rental anchor with University of Manitoba demand, a strong public-sector workforce, and steady year-round leasing. The Manitoba Residential Tenancies Branch sets annual guideline rent increases.',
    heroImageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Winnipeg Manitoba downtown skyline along the Red River',
    province: MB_PROVINCE_REF,
  },
  {
    _id: 'city-brandon-static',
    title: 'Brandon',
    slug: { current: 'brandon' },
    tier: 1,
    population: 52000,
    medianRent: 1250,
    vacancyRate: 4.2,
    neighbourhoods: ['Downtown', 'East End', 'South End', 'North Hill', 'Westridge', 'Brookwood'],
    transitInfo:
      'Brandon Transit serves the city with bus routes; Brandon University and Assiniboine Community College drive student-cycle housing demand.',
    description:
      'Brandon is Manitoba\'s second-largest city and a regional agricultural and education hub. Brandon University, ACC, and CFB Shilo workforce demand keep year-round vacancy moderate.',
    heroImageUrl: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Brandon Manitoba prairie city downtown street view',
    province: MB_PROVINCE_REF,
  },
  {
    _id: 'city-steinbach-static',
    title: 'Steinbach',
    slug: { current: 'steinbach' },
    tier: 1,
    population: 18000,
    medianRent: 1300,
    vacancyRate: 3.8,
    neighbourhoods: ['Downtown', 'Southland', 'Westland', 'Park West', 'Loewen Boulevard area'],
    transitInfo:
      'Steinbach is a car-dependent community south-east of Winnipeg; Highway 12 is the primary commuter corridor with regular shuttle service to Winnipeg.',
    description:
      'Steinbach is one of Manitoba\'s fastest-growing communities with strong Mennonite heritage and a diversifying immigrant workforce. New-build rental demand is steady from families and young professionals priced out of Winnipeg.',
    heroImageUrl: 'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Steinbach Manitoba small city main street at twilight',
    province: MB_PROVINCE_REF,
  },
]

const NOVA_SCOTIA_CITIES: FallbackCity[] = [
  {
    _id: 'city-halifax-static',
    title: 'Halifax',
    slug: { current: 'halifax' },
    tier: 1,
    population: 480000,
    medianRent: 1800,
    vacancyRate: 1.0,
    neighbourhoods: ['Downtown', 'South End', 'North End', 'West End', 'Clayton Park', 'Bedford', 'Spryfield', 'Fairview'],
    transitInfo:
      'Halifax Transit operates a comprehensive bus network plus three ferry routes across the harbour; Bus Rapid Transit corridors are in planning.',
    description:
      'Halifax\'s rental market is the tightest in Atlantic Canada with sub-1% vacancy in the urban core. Dalhousie, Saint Mary\'s, and the navy/federal workforce drive demand. A provincial rent cap remains in effect and post-2022 renoviction protections are strict.',
    heroImageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Halifax Nova Scotia waterfront harbour at sunset',
    province: NS_PROVINCE_REF,
  },
  {
    _id: 'city-dartmouth-static',
    title: 'Dartmouth',
    slug: { current: 'dartmouth' },
    tier: 1,
    population: 70000,
    medianRent: 1700,
    vacancyRate: 1.2,
    neighbourhoods: ['Downtown Dartmouth', 'Woodside', 'Crichton Park', 'Manor Park', 'Dartmouth Crossing', 'Cole Harbour'],
    transitInfo:
      'Halifax Transit ferries connect Dartmouth to the Halifax peninsula in 12 minutes; bus service blankets the city and links to Cole Harbour and Eastern Passage.',
    description:
      'Dartmouth shares Halifax\'s sub-2% vacancy environment with lower per-square-foot rents and growing condo inventory along the waterfront. Workforce tenant demand is anchored by Burnside Industrial Park.',
    heroImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Dartmouth Nova Scotia waterfront across the harbour from Halifax',
    province: NS_PROVINCE_REF,
  },
  {
    _id: 'city-sydney-static',
    title: 'Sydney',
    slug: { current: 'sydney' },
    tier: 1,
    population: 30000,
    medianRent: 1200,
    vacancyRate: 2.8,
    neighbourhoods: ['Downtown', 'Whitney Pier', 'Ashby', 'Hardwood Hill', 'Westmount', 'North End'],
    transitInfo:
      'Transit Cape Breton operates bus service across the Cape Breton Regional Municipality including Sydney, Glace Bay, and New Waterford.',
    description:
      'Sydney is Cape Breton\'s rental anchor with Cape Breton University, healthcare-sector employment, and immigration-driven population recovery. The provincial rent cap and tribunal review framework apply.',
    heroImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    heroImageAlt: 'Sydney Nova Scotia Cape Breton harbour view',
    province: NS_PROVINCE_REF,
  },
]

const QUEBEC_PROVINCE: FallbackProvince = {
  _id: 'province-quebec-static',
  title: 'Quebec',
  slug: { current: 'quebec' },
  country: 'ca',
  abbreviation: 'QC',
  description:
    'Quebec\'s rental market is shaped by the July 1 moving cycle, the TAL rent-regulation grid, and Bill 96 language rules. Plex inventory dominates Montreal\'s inner neighbourhoods alongside a growing downtown condo core, and Quebec City, Laval, Gatineau, and Sherbrooke each carry distinct sub-market dynamics. MoveSmart runs bilingual, TAL-aware placements across the province.',
  cities: QUEBEC_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'quebec',
  })),
}

const BC_PROVINCE: FallbackProvince = {
  _id: 'province-bc-static',
  title: 'British Columbia',
  slug: { current: 'british-columbia' },
  country: 'ca',
  abbreviation: 'BC',
  description:
    'British Columbia rentals are governed by the Residential Tenancy Branch with a CPI-tied rent cap. Metro Vancouver carries North America\'s tightest urban vacancy, layered with Empty Homes Tax and Speculation and Vacancy Tax compliance. MoveSmart serves Vancouver, Burnaby, Surrey, Richmond, Coquitlam, Victoria, and Kelowna with RTB-compliant leases and CPI-aware pricing discipline.',
  cities: BC_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'british-columbia',
  })),
}

const ALBERTA_PROVINCE: FallbackProvince = {
  _id: 'province-alberta-static',
  title: 'Alberta',
  slug: { current: 'alberta' },
  country: 'ca',
  abbreviation: 'AB',
  description:
    'Alberta is the only major Canadian province without a rent cap - pricing between tenancies is free-market under the Residential Tenancies Act. Calgary and Edmonton anchor the major-metro inventory with sustained in-migration from Ontario and BC, and Red Deer, Lethbridge, and Airdrie round out the tier-1 service area.',
  cities: ALBERTA_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'alberta',
  })),
}

const MANITOBA_PROVINCE: FallbackProvince = {
  _id: 'province-manitoba-static',
  title: 'Manitoba',
  slug: { current: 'manitoba' },
  country: 'ca',
  abbreviation: 'MB',
  description:
    'Manitoba rentals are governed by the Residential Tenancies Branch with annual guideline rent-increase percentages. Winnipeg anchors the market with University of Manitoba and public-sector demand, with Brandon and Steinbach serving as regional secondary markets with growing inventory.',
  cities: MANITOBA_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'manitoba',
  })),
}

const NOVA_SCOTIA_PROVINCE: FallbackProvince = {
  _id: 'province-nova-scotia-static',
  title: 'Nova Scotia',
  slug: { current: 'nova-scotia' },
  country: 'ca',
  abbreviation: 'NS',
  description:
    'Nova Scotia\'s rental market is shaped by a provincial rent cap, strict post-2022 renoviction protections, and Halifax\'s sub-1% urban vacancy. Dalhousie, Saint Mary\'s, the navy, and federal workforce drive Halifax demand; Dartmouth and Sydney round out the tier-1 service area.',
  cities: NOVA_SCOTIA_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    tier: c.tier,
    population: c.population,
    medianRent: c.medianRent,
    provinceSlug: 'nova-scotia',
  })),
}

// ---------------------------------------------------------------------------
// US cities (full data for city pages)
// ---------------------------------------------------------------------------
// Sourced from the static data layer at `@/data/us-cities`. Adding a new
// state or city there will propagate automatically through these fallbacks,
// the city/state pages, and the generated sitemap.
import {
  US_STATES_LIST,
  US_CITIES_LIST,
  type USStateEntry,
  type USCityEntry,
} from '@/data/us-cities'

function stateProvinceRef(state: USStateEntry): FallbackCity['province'] {
  return {
    title: state.name,
    slug: { current: state.slug },
    country: 'us',
    abbreviation: state.abbreviation,
  }
}

const US_STATE_PROVINCE_BY_SLUG: Record<string, FallbackCity['province']> =
  Object.fromEntries(
    US_STATES_LIST.map((s) => [s.slug, stateProvinceRef(s)] as const),
  )

function cityToFallback(entry: USCityEntry): FallbackCity {
  const province =
    US_STATE_PROVINCE_BY_SLUG[entry.stateSlug] ??
    ({
      title: entry.stateSlug,
      slug: { current: entry.stateSlug },
      country: 'us',
    } as FallbackCity['province'])

  return {
    _id: `city-${entry.stateSlug}-${entry.slug.current}-static`,
    title: entry.title,
    slug: entry.slug,
    tier: 2,
    population: entry.population,
    medianRent: entry.medianRent,
    description: entry.marketNote,
    heroImageUrl: entry.heroImageUrl,
    heroImageAlt: entry.heroImageAlt,
    province,
  }
}

const US_CITIES: FallbackCity[] = US_CITIES_LIST.map(cityToFallback)

const US_STATES: FallbackProvince[] = US_STATES_LIST.map((state) => ({
  _id: `state-${state.slug}-static`,
  title: state.name,
  slug: { current: state.slug },
  country: 'us',
  abbreviation: state.abbreviation,
  description: state.description,
  cities: US_CITIES_LIST.filter((c) => c.stateSlug === state.slug).map(
    (c) => ({
      title: c.title,
      slug: c.slug,
      tier: 2,
      population: c.population,
      medianRent: c.medianRent,
      provinceSlug: state.slug,
    }),
  ),
}))

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

const ALL_CA_CITIES: FallbackCity[] = [
  ...ONTARIO_CITIES,
  ...QUEBEC_CITIES,
  ...BC_CITIES,
  ...ALBERTA_CITIES,
  ...MANITOBA_CITIES,
  ...NOVA_SCOTIA_CITIES,
]

const ALL_CA_PROVINCES: FallbackProvince[] = [
  ONTARIO_PROVINCE,
  QUEBEC_PROVINCE,
  BC_PROVINCE,
  ALBERTA_PROVINCE,
  MANITOBA_PROVINCE,
  NOVA_SCOTIA_PROVINCE,
]

export function getFallbackCaCity(slug: string): FallbackCity | null {
  return ALL_CA_CITIES.find((c) => c.slug.current === slug) ?? null
}

/**
 * Look up a US city by slug. When two states share a slug (e.g. Aurora in
 * both Illinois and Colorado), pass `stateSlug` to disambiguate. Without
 * `stateSlug`, returns the first match (legacy single-arg behaviour).
 */
export function getFallbackUsCity(
  slug: string,
  stateSlug?: string,
): FallbackCity | null {
  if (stateSlug) {
    return (
      US_CITIES.find(
        (c) => c.slug.current === slug && c.province.slug.current === stateSlug,
      ) ?? null
    )
  }
  return US_CITIES.find((c) => c.slug.current === slug) ?? null
}

/** Look up any city by slug (CA or US) */
export function getFallbackCity(slug: string): FallbackCity | null {
  return getFallbackCaCity(slug) ?? getFallbackUsCity(slug)
}

export function getFallbackProvince(slug: string): FallbackProvince | null {
  const caMatch = ALL_CA_PROVINCES.find((p) => p.slug.current === slug)
  if (caMatch) return caMatch
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
  const caCities = ALL_CA_CITIES.map((c) => ({
    title: c.title,
    slug: c.slug,
    provinceSlug: c.province.slug.current,
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
