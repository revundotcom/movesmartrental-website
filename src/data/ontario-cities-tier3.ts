/**
 * Ontario Tier-3 City Stubs
 * -------------------------------------------------------------
 * Stub list of additional Ontario communities served by
 * MoveSmart Rentals' leasing brokerage. Used for sitemap
 * enumeration, internal-link planning, and as the source list
 * for future content generation. No long-form copy here - that
 * lives in `ontario-cities-tier2.ts` and the Tier-1
 * `scripts/city-content/*.ts` modules.
 */

export interface OntarioCityStub {
  slug: string
  name: string
  province: 'Ontario'
  provinceSlug: 'ontario'
  tier: 3
  contentStatus: 'stub' | 'in-progress' | 'published'
}

export const ONTARIO_TIER_3_STUBS: OntarioCityStub[] = [
  // Eastern Ontario / Quinte / Kingston periphery
  { slug: 'cobourg', name: 'Cobourg', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'port-hope', name: 'Port Hope', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'napanee', name: 'Napanee', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'brockville', name: 'Brockville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'cornwall', name: 'Cornwall', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Ottawa-area / Eastern Ontario suburbs and towns
  { slug: 'kanata', name: 'Kanata', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'orleans', name: 'Orleans', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'nepean', name: 'Nepean', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'arnprior', name: 'Arnprior', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'carleton-place', name: 'Carleton Place', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'perth', name: 'Perth', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'smiths-falls', name: 'Smiths Falls', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Northern Ontario
  { slug: 'north-bay', name: 'North Bay', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'timmins', name: 'Timmins', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'dryden', name: 'Dryden', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'kenora', name: 'Kenora', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'elliot-lake', name: 'Elliot Lake', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'temiskaming-shores', name: 'Temiskaming Shores', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Southwestern Ontario
  { slug: 'sarnia', name: 'Sarnia', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'chatham', name: 'Chatham', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'leamington', name: 'Leamington', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'stratford', name: 'Stratford', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'st-thomas', name: 'St. Thomas', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'woodstock', name: 'Woodstock', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'ingersoll', name: 'Ingersoll', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'tillsonburg', name: 'Tillsonburg', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'simcoe', name: 'Simcoe', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'norfolk-county', name: 'Norfolk County', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'strathroy-caradoc', name: 'Strathroy-Caradoc', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'aylmer', name: 'Aylmer', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Niagara Region (beyond St. Catharines, Niagara Falls, Welland)
  { slug: 'grimsby', name: 'Grimsby', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'lincoln', name: 'Lincoln', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'pelham', name: 'Pelham', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'thorold', name: 'Thorold', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'fort-erie', name: 'Fort Erie', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'port-colborne', name: 'Port Colborne', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'beamsville', name: 'Beamsville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Essex / Windsor periphery
  { slug: 'tecumseh', name: 'Tecumseh', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'lasalle', name: 'LaSalle', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'amherstburg', name: 'Amherstburg', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Simcoe County / Georgian Bay / Muskoka
  { slug: 'collingwood', name: 'Collingwood', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'wasaga-beach', name: 'Wasaga Beach', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'orillia', name: 'Orillia', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'midland', name: 'Midland', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'penetanguishene', name: 'Penetanguishene', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'huntsville', name: 'Huntsville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'bracebridge', name: 'Bracebridge', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'parry-sound', name: 'Parry Sound', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'owen-sound', name: 'Owen Sound', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'alliston', name: 'Alliston', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'tottenham', name: 'Tottenham', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'shelburne', name: 'Shelburne', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Durham / York / Kawartha periphery
  { slug: 'keswick', name: 'Keswick', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'bowmanville', name: 'Bowmanville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'courtice', name: 'Courtice', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'uxbridge', name: 'Uxbridge', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'scugog', name: 'Scugog', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'port-perry', name: 'Port Perry', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'kawartha-lakes', name: 'Kawartha Lakes', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'lindsay', name: 'Lindsay', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'trenton', name: 'Trenton', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'quinte-west', name: 'Quinte West', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Hamilton / Wentworth / Halton periphery
  { slug: 'ancaster', name: 'Ancaster', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'dundas', name: 'Dundas', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'waterdown', name: 'Waterdown', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'binbrook', name: 'Binbrook', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'mount-hope', name: 'Mount Hope', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'acton', name: 'Acton', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'georgetown', name: 'Georgetown', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'bolton', name: 'Bolton', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // York Region beyond Tier-1/Tier-2
  { slug: 'stouffville', name: 'Stouffville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'whitchurch-stouffville', name: 'Whitchurch-Stouffville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'king-city', name: 'King City', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'nobleton', name: 'Nobleton', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'maple', name: 'Maple', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'woodbridge', name: 'Woodbridge', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'thornhill', name: 'Thornhill', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'east-gwillimbury', name: 'East Gwillimbury', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Wellington / Brant / Oxford periphery
  { slug: 'fergus', name: 'Fergus', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'elora', name: 'Elora', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'paris', name: 'Paris', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },

  // Mississauga / Peel sub-communities (distinct rental markets within larger cities)
  { slug: 'port-credit', name: 'Port Credit', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'streetsville', name: 'Streetsville', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
  { slug: 'meadowvale', name: 'Meadowvale', province: 'Ontario', provinceSlug: 'ontario', tier: 3, contentStatus: 'stub' },
]

export const ONTARIO_TIER_3_SLUGS: string[] = ONTARIO_TIER_3_STUBS.map((c) => c.slug)
