/**
 * Silo C: Locations data for city specific leasing pages.
 *
 * 15 priority cities across the US and Canada. Each page lists local
 * market data, neighborhood coverage, and city specific rental dynamics.
 * Market data is directional and updated quarterly.
 */

export type SiloLocation = {
  slug: string
  city: string
  country: 'CA' | 'US'
  region: string
  navTitle: string
  navDescription: string
  metaTitle: string
  metaDescription: string
  heroKicker: string
  heroEyebrow: string
  heroHeadline: string
  heroLede: string
  intro: string
  marketData: {
    avgRent1Bed: string
    avgRent2Bed: string
    vacancyRate: string
    yoyRentChange: string
    avgDaysOnMarket: string
    keyTrend: string
  }
  neighborhoods: string[]
  whyHere: Array<{ title: string; body: string }>
  process: Array<{ step: number; title: string; body: string }>
  faq: Array<{ question: string; answer: string }>
  closing: string
}

export const SILO_LOCATIONS: SiloLocation[] = [
  // ── CANADA ──────────────────────────────────────────────────────
  {
    slug: 'toronto',
    city: 'Toronto',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Toronto, ON',
    navDescription: 'Full leasing across the GTA core',
    metaTitle: 'Toronto Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Tenant placement and leasing services in Toronto. Condo, townhouse, and detached home rentals from downtown to the suburbs. Average 14 day placement.',
    heroKicker: 'Toronto · Ontario',
    heroEyebrow: 'GTA core market',
    heroHeadline: 'Toronto rental leasing done right',
    heroLede:
      'From King West condos to North York family homes. We place qualified tenants across the GTA in an average of 14 days. Zero upfront cost.',
    intro:
      'Toronto is our home market. We operate across every major neighborhood from the Annex to Scarborough, from Liberty Village to Rouge Hill. The rental market here is fast and discerning. Renters expect professional listings, quick responses, and clean buildings. Landlords expect qualified tenants in days not weeks. We deliver both.',
    marketData: {
      avgRent1Bed: '$2,450',
      avgRent2Bed: '$3,250',
      vacancyRate: '1.6%',
      yoyRentChange: '+4.2%',
      avgDaysOnMarket: '14 days',
      keyTrend: 'Tightening supply in condo segment, healthy demand for purpose built rentals',
    },
    neighborhoods: [
      'Downtown core (King West, Entertainment District, Financial District)',
      'Midtown (Yonge and Eglinton, Davisville, Forest Hill)',
      'Annex and Yorkville',
      'Leslieville and Riverside',
      'Liberty Village and Fort York',
      'Etobicoke (Mimico, Humber Bay, Kingsway)',
      'North York (Willowdale, Bayview Village, Yonge and Sheppard)',
      'East York and Danforth',
      'Scarborough (Agincourt, Bridlewood, Rouge)',
      'West End (Junction, Bloor West Village, High Park)',
    ],
    whyHere: [
      {
        title: 'Local agents in every district',
        body: 'No commuting an agent from downtown to Scarborough for a showing. We have agents stationed across the GTA.',
      },
      {
        title: 'Condo building expertise',
        body: 'Thousands of condo placements across King West, Yonge and Bloor, City Place, CityPlace, Liberty Village. We know the buildings.',
      },
      {
        title: 'Ontario RTA compliance',
        body: 'Every lease compliant with the Residential Tenancies Act. Standard form lease, proper disclosures, deposit limits respected.',
      },
      {
        title: 'Fast market response',
        body: 'Toronto moves fast. Tour bookings within hours. Listings refreshed weekly. We match the market pace.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and pricing',
        body: 'Local agent visits the unit. We pull comps from the same building if available, same block otherwise. Price band delivered within 24 hours.',
      },
      {
        step: 2,
        title: 'Marketing across GTA platforms',
        body: 'TREB MLS, Realtor.ca, Zumper, PadMapper, Rentals.ca, Kijiji, Facebook Marketplace, plus 30+ more.',
      },
      {
        step: 3,
        title: 'Showings handled by local team',
        body: 'Evening and weekend showings standard. Virtual showings for out of town applicants common.',
      },
      {
        step: 4,
        title: 'Screening and Ontario compliant lease',
        body: 'Multi step screening. Standard form Ontario lease with custom schedule A. E signed and deposit collected.',
      },
    ],
    faq: [
      {
        question: 'How quickly do you place tenants in Toronto?',
        answer:
          'Average 14 days from listing to signed lease in downtown core. Slightly longer in outlying neighborhoods. Hot building locations like CityPlace or Yonge and Bloor often close in under a week.',
      },
      {
        question: 'What is your fee in Toronto?',
        answer:
          'One time success fee equal to one month rent. Paid only when the lease signs. No upfront marketing or setup fee.',
      },
      {
        question: 'Do you cover condos with strict building rules?',
        answer:
          'Yes. We handle board approval packages, fob registration, and elevator booking as standard procedure. Most major Toronto condo buildings are familiar territory.',
      },
    ],
    closing:
      'Renting out a property in Toronto? Book a free walkthrough and pricing review.',
  },
  {
    slug: 'mississauga',
    city: 'Mississauga',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Mississauga, ON',
    navDescription: 'Square One, Port Credit, and beyond',
    metaTitle: 'Mississauga Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Tenant placement in Mississauga. Square One, Port Credit, Streetsville, Erin Mills, and Meadowvale rentals filled fast. Zero upfront cost.',
    heroKicker: 'Mississauga · Ontario',
    heroEyebrow: 'GTA west',
    heroHeadline: 'Mississauga rental leasing handled',
    heroLede:
      'Condos at Square One, townhomes in Erin Mills, detached homes in Streetsville. Local team, fast placement, qualified tenants.',
    intro:
      'Mississauga is one of the strongest rental markets in the GTA. Square One sees constant demand from young professionals. Port Credit attracts the lakeside lifestyle crowd. Meadowvale and Erin Mills appeal to families. We have placed hundreds of tenants across Mississauga and know which marketing approach works for each neighborhood.',
    marketData: {
      avgRent1Bed: '$2,200',
      avgRent2Bed: '$2,850',
      vacancyRate: '1.9%',
      yoyRentChange: '+3.8%',
      avgDaysOnMarket: '16 days',
      keyTrend: 'Strong demand in Square One condo market, steady detached rental absorption',
    },
    neighborhoods: [
      'Square One and City Centre',
      'Port Credit and Lakeshore',
      'Streetsville',
      'Erin Mills and Meadowvale',
      'Cooksville',
      'Mineola and Lakeview',
      'Clarkson and Lorne Park',
      'Hurontario',
      'Heartland and Mavis',
      'Malton',
    ],
    whyHere: [
      {
        title: 'Square One condo specialists',
        body: 'We have placed in nearly every Square One tower including the Limelight, Chicago, Pinnacle, Universal, and Solstice buildings.',
      },
      {
        title: 'Commuter market expertise',
        body: 'GO Transit access matters. We highlight transit proximity in every listing where relevant.',
      },
      {
        title: 'Detached and townhouse coverage',
        body: 'Not just condos. We handle detached homes in Streetsville and townhouses in Meadowvale at the same speed.',
      },
      {
        title: 'Family friendly screening',
        body: 'Many Mississauga rentals attract families. We screen for stability and longer term tenancy.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Property walkthrough',
        body: 'Local agent assesses the unit and neighborhood. Price band delivered within 24 hours.',
      },
      {
        step: 2,
        title: 'Targeted marketing',
        body: 'Different platforms reach different renters. Square One condo posts emphasize transit. Family home listings emphasize school catchment.',
      },
      {
        step: 3,
        title: 'Local showings',
        body: 'Mississauga based agents handle all tours. Evening and weekend slots standard.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Ontario compliant lease, e signed, deposit collected, move in coordinated.',
      },
    ],
    faq: [
      {
        question: 'How does Mississauga compare to Toronto rents?',
        answer:
          'About 10 to 15 percent lower than equivalent Toronto downtown units. Vacancy is slightly higher which means more competition for renters and the need for sharper marketing.',
      },
      {
        question: 'Do you place in Mississauga only or across the GTA?',
        answer:
          'Across the GTA. Many landlords have units in both Mississauga and Toronto. One contract covers both.',
      },
      {
        question: 'Do Mississauga condo buildings have rental restrictions?',
        answer:
          'Most do not. A few newer buildings have rental caps. We confirm before listing.',
      },
    ],
    closing:
      'Have a Mississauga rental? Book a free pricing analysis.',
  },
  {
    slug: 'vaughan',
    city: 'Vaughan',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Vaughan, ON',
    navDescription: 'VMC, Woodbridge, Maple, Thornhill',
    metaTitle: 'Vaughan Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Vaughan rental placement across VMC, Woodbridge, Maple, and Thornhill. Modern condos and family homes leased fast.',
    heroKicker: 'Vaughan · Ontario',
    heroEyebrow: 'York Region',
    heroHeadline: 'Vaughan rental leasing handled',
    heroLede:
      'Vaughan Metropolitan Centre condos, Woodbridge detached homes, Thornhill townhouses. Local team, fast lease ups.',
    intro:
      'Vaughan has transformed in the last decade. VMC turned into a high rise hub with subway access. Woodbridge and Maple stayed solid family neighborhoods. Thornhill bridges into the GTA core. The rental market here moves on subway connectivity and school catchment. We market to both.',
    marketData: {
      avgRent1Bed: '$2,150',
      avgRent2Bed: '$2,750',
      vacancyRate: '2.1%',
      yoyRentChange: '+3.5%',
      avgDaysOnMarket: '17 days',
      keyTrend: 'VMC condo absorption strong, low rise rentals steady',
    },
    neighborhoods: [
      'Vaughan Metropolitan Centre (VMC)',
      'Woodbridge',
      'Maple',
      'Concord',
      'Thornhill',
      'Kleinburg',
      'Vellore Village',
      'Pine Valley',
    ],
    whyHere: [
      {
        title: 'VMC subway corridor expertise',
        body: 'VMC subway opened up commuter demand. We highlight the connection in listings and price accordingly.',
      },
      {
        title: 'Italian and South Asian community connections',
        body: 'Many Woodbridge and Maple renters come through community networks. We market in the channels they actually use.',
      },
      {
        title: 'Family home leasing',
        body: 'Most Vaughan rentals are family sized. Different screening priorities than downtown condo placements.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Property walkthrough and pricing',
        body: 'Local agent assesses unit and pulls comps. Price band within 24 hours.',
      },
      {
        step: 2,
        title: 'Targeted marketing',
        body: 'VMC condos to commuter audience. Family homes to school catchment audience. Different messaging per unit type.',
      },
      {
        step: 3,
        title: 'Showings handled locally',
        body: 'Vaughan based agents on the ground. Same day responses standard.',
      },
      {
        step: 4,
        title: 'Lease and handoff',
        body: 'Ontario compliant lease, deposit collection, move in coordination.',
      },
    ],
    faq: [
      {
        question: 'Are VMC rents premium versus low rise Vaughan?',
        answer:
          'Yes, about 8 to 12 percent premium for VMC condos due to subway access and amenities. Low rise rentals price closer to suburban York Region norms.',
      },
      {
        question: 'How fast do VMC condos lease?',
        answer:
          'Average 10 to 14 days. Faster than surrounding neighborhoods due to high demand from commuters.',
      },
      {
        question: 'Do you cover all of York Region?',
        answer:
          'We cover Vaughan, Markham, Richmond Hill, Aurora, and Newmarket from our York Region operations.',
      },
    ],
    closing:
      'Have a Vaughan rental? Get a free pricing analysis from our local team.',
  },
  {
    slug: 'markham',
    city: 'Markham',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Markham, ON',
    navDescription: 'Unionville, Cathedraltown, Cornell',
    metaTitle: 'Markham Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Markham rental placement in Unionville, Cathedraltown, Cornell, and beyond. Family homes and condos filled fast.',
    heroKicker: 'Markham · Ontario',
    heroEyebrow: 'York Region',
    heroHeadline: 'Markham rental leasing handled',
    heroLede:
      'Markham rental market driven by family relocation, top schools, and tech sector employment. We market to the right pool of qualified renters.',
    intro:
      'Markham is one of the strongest family rental markets in Ontario. Top rated schools draw long term tenants. The IBM and tech corridor draws professional families. We market to both groups with different listing strategies. Average tenancy in Markham is longer than the GTA core which makes good placements compound in value.',
    marketData: {
      avgRent1Bed: '$2,100',
      avgRent2Bed: '$2,700',
      vacancyRate: '2.3%',
      yoyRentChange: '+3.2%',
      avgDaysOnMarket: '18 days',
      keyTrend: 'Stable family rental demand, longer than average tenancy',
    },
    neighborhoods: [
      'Unionville',
      'Cathedraltown',
      'Cornell',
      'Berczy Village',
      'Greensborough',
      'Markville',
      'Wismer',
      'Box Grove',
      'Milliken Mills',
    ],
    whyHere: [
      {
        title: 'School catchment marketing',
        body: 'Markham renters move for schools. We highlight catchment data in listings where relevant.',
      },
      {
        title: 'Tech corridor tenants',
        body: 'IBM, Honda, Allstate. We market through the channels that reach corporate relocations.',
      },
      {
        title: 'Family screening focus',
        body: 'Stability matters more here than speed. Our screening prioritizes long term fit.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and family fit assessment',
        body: 'We assess the unit for family appeal. Schools, parks, transit. Pricing based on family rental comps.',
      },
      {
        step: 2,
        title: 'Marketing to families and professionals',
        body: 'Listings emphasize schools, neighborhoods, and amenities. Distributed across rental and family relocation platforms.',
      },
      {
        step: 3,
        title: 'In person showings',
        body: 'Families want in person tours. Weekend slots standard.',
      },
      {
        step: 4,
        title: 'Long term lease execution',
        body: '12 to 24 month leases standard. Ontario compliant with custom clauses for family rentals.',
      },
    ],
    faq: [
      {
        question: 'Why does Markham take slightly longer to lease?',
        answer:
          'Family renters move slower than young professionals. They tour multiple homes, involve their kids, and time decisions around school year. The longer placement window pays off with longer tenancies.',
      },
      {
        question: 'Do you cover Markham condos?',
        answer:
          'Yes. Markville Square, Cathedraltown condos, and growing inventory near Markham Centre.',
      },
      {
        question: 'How long is average Markham tenancy?',
        answer:
          '24 to 36 months is typical for family rentals. Significantly longer than downtown Toronto.',
      },
    ],
    closing:
      'Renting out a Markham home? Book a free walkthrough.',
  },
  {
    slug: 'brampton',
    city: 'Brampton',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Brampton, ON',
    navDescription: 'Mount Pleasant, Springdale, Bramalea',
    metaTitle: 'Brampton Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Brampton rental placement across Mount Pleasant, Springdale, Bramalea, and the rest of Peel. Family homes filled fast.',
    heroKicker: 'Brampton · Ontario',
    heroEyebrow: 'Peel Region',
    heroHeadline: 'Brampton rental leasing handled',
    heroLede:
      'Brampton family home rental market. Detached, townhouse, and basement apartment placements at scale. Local team on the ground.',
    intro:
      'Brampton is largely a family home rental market. Detached homes, semi detached, and townhouses dominate the inventory. Basement apartments are common and have specific zoning requirements we navigate. Our team handles the entire Peel region from Brampton through Mississauga and into Caledon.',
    marketData: {
      avgRent1Bed: '$1,900',
      avgRent2Bed: '$2,500',
      vacancyRate: '2.4%',
      yoyRentChange: '+3.0%',
      avgDaysOnMarket: '19 days',
      keyTrend: 'Strong family rental demand, basement apartment legalization driving inventory',
    },
    neighborhoods: [
      'Mount Pleasant',
      'Springdale',
      'Bramalea',
      'Heart Lake',
      'Castlemore',
      'Madoc',
      'Fletcher Meadow',
      'Northwood Park',
      'Vales of Castlemore',
      'Sandalwood',
    ],
    whyHere: [
      {
        title: 'Family rental specialists',
        body: 'Brampton renters are mostly families. We screen for stability and long tenancy.',
      },
      {
        title: 'Basement apartment expertise',
        body: 'Brampton has many legalized basement apartments. We know the zoning requirements and lease format.',
      },
      {
        title: 'South Asian community marketing',
        body: 'Many Brampton landlords and tenants come through South Asian community networks. We market in those channels.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and zoning check',
        body: 'For basement apartments we confirm legal status. For full home rentals we pull comps.',
      },
      {
        step: 2,
        title: 'Targeted marketing',
        body: 'Brampton rental boards, community networks, family relocation platforms.',
      },
      {
        step: 3,
        title: 'Showings handled by local team',
        body: 'Weekend showings essential. Family tours often include multiple decision makers.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Ontario standard lease with basement apartment addendum where relevant.',
      },
    ],
    faq: [
      {
        question: 'Can you place basement apartments?',
        answer:
          'Yes for legalized second units. We confirm the unit is registered with the city of Brampton before listing.',
      },
      {
        question: 'How does Brampton rent compare to Mississauga?',
        answer:
          'Brampton rents are about 12 to 15 percent below comparable Mississauga units. Family homes especially are more affordable.',
      },
      {
        question: 'Do you handle full home and basement together?',
        answer:
          'Often the same investor owns both. We can lease them simultaneously to different tenants with separate leases.',
      },
    ],
    closing:
      'Renting out a Brampton property? Get a free pricing review.',
  },
  {
    slug: 'hamilton',
    city: 'Hamilton',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Hamilton, ON',
    navDescription: 'Westdale, Durand, Stoney Creek, Ancaster',
    metaTitle: 'Hamilton Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Hamilton rental placement across Westdale, Durand, Stoney Creek, Ancaster, and Dundas. Investor portfolios and detached homes handled.',
    heroKicker: 'Hamilton · Ontario',
    heroEyebrow: 'GTHA west',
    heroHeadline: 'Hamilton rental leasing handled',
    heroLede:
      'Hamilton has become a major investor market. We lease detached homes, multi unit conversions, and the growing condo inventory along the waterfront.',
    intro:
      'Hamilton went from undervalued to one of the most active investor markets in Ontario. McMaster University drives student rental demand around Westdale. The downtown core is filling with new condos. Detached homes in Stoney Creek and Ancaster attract family rentals. We work with single property owners and BRRRR investors equally.',
    marketData: {
      avgRent1Bed: '$1,750',
      avgRent2Bed: '$2,250',
      vacancyRate: '2.7%',
      yoyRentChange: '+4.5%',
      avgDaysOnMarket: '20 days',
      keyTrend: 'Strong investor activity, rapid rent growth especially in renovated properties',
    },
    neighborhoods: [
      'Westdale',
      'Durand',
      'Stoney Creek',
      'Ancaster',
      'Dundas',
      'Stinson',
      'Corktown',
      'North End',
      'James Street North',
      'Mountain (Hill Park, Eastmount)',
    ],
    whyHere: [
      {
        title: 'Investor market expertise',
        body: 'BRRRR operators, value add investors, fix and rent flippers. We understand the playbook.',
      },
      {
        title: 'McMaster student rental knowledge',
        body: 'Westdale and surrounding student rentals follow a different cycle. May to August leasing window.',
      },
      {
        title: 'Renovated property positioning',
        body: 'Renovated rentals justify higher rents with proper marketing. We document upgrades and back the asking price.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Property and market assessment',
        body: 'Especially for renovated units we document upgrades in the listing. Pricing based on renovated rental comps.',
      },
      {
        step: 2,
        title: 'Marketing tailored to unit type',
        body: 'Student rentals targeted differently than family rentals. Investor heavy areas like Crown Point need sharper marketing.',
      },
      {
        step: 3,
        title: 'Local showings',
        body: 'Hamilton based agents. We know which neighborhoods need extra signaling on building quality.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Ontario compliant. Student leases use academic year terms with rolling renewal.',
      },
    ],
    faq: [
      {
        question: 'Do you handle student rentals near McMaster?',
        answer:
          'Yes. We lease September through April or May leases for students. Spring leasing window is critical for these.',
      },
      {
        question: 'How fast are Hamilton placements?',
        answer:
          'About 20 days average. Renovated units in hot neighborhoods like Corktown or Crown Point go faster, often under two weeks.',
      },
      {
        question: 'Can you support BRRRR refinances?',
        answer:
          'Yes. We deliver lease, deposit receipt, and market comparable documentation for your appraiser and lender.',
      },
    ],
    closing:
      'Investing in Hamilton? Lock in your leasing partner before you close.',
  },
  {
    slug: 'ottawa',
    city: 'Ottawa',
    country: 'CA',
    region: 'Ontario',
    navTitle: 'Ottawa, ON',
    navDescription: 'Centretown, Westboro, Kanata, Orleans',
    metaTitle: 'Ottawa Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Ottawa rental placement across Centretown, Westboro, Kanata, Orleans, and beyond. Government, tech, and student rental markets handled.',
    heroKicker: 'Ottawa · Ontario',
    heroEyebrow: 'National Capital Region',
    heroHeadline: 'Ottawa rental leasing handled',
    heroLede:
      'Ottawa has three rental engines: federal government, the Kanata tech corridor, and universities. We market to each with different strategies.',
    intro:
      'Ottawa rental market is unique. Federal employees are stable long term tenants who move on policy changes. The tech corridor in Kanata drives professional rental demand. Carleton and University of Ottawa drive student rentals. We segment our marketing by unit type and neighborhood so each property reaches the right audience.',
    marketData: {
      avgRent1Bed: '$1,850',
      avgRent2Bed: '$2,400',
      vacancyRate: '2.5%',
      yoyRentChange: '+3.4%',
      avgDaysOnMarket: '17 days',
      keyTrend: 'Stable government employment driving steady demand, tech sector growth in Kanata',
    },
    neighborhoods: [
      'Centretown',
      'Westboro',
      'Glebe',
      'Sandy Hill',
      'New Edinburgh',
      'Kanata (Kanata Lakes, Bridlewood, Stittsville)',
      'Orleans',
      'Barrhaven',
      'Nepean',
      'Hintonburg',
    ],
    whyHere: [
      {
        title: 'Federal tenant screening expertise',
        body: 'Government employees have specific employment verification patterns. We know what to request.',
      },
      {
        title: 'Kanata tech corridor knowledge',
        body: 'Shopify, Mitel, Kinaxis, and the tech ecosystem. We market through the channels these tenants actually use.',
      },
      {
        title: 'University rental cycles',
        body: 'September move ins, April move outs. We time the marketing window correctly.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and market segmentation',
        body: 'We identify the most likely renter pool by neighborhood and unit type, then price accordingly.',
      },
      {
        step: 2,
        title: 'Segmented marketing',
        body: 'Government workers reached through different channels than tech workers or students.',
      },
      {
        step: 3,
        title: 'Local showings',
        body: 'Ottawa based agents handle tours. Government workers often want lunch hour or after work slots.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Ontario compliant. Bilingual lease packages available when needed.',
      },
    ],
    faq: [
      {
        question: 'Do you offer bilingual service?',
        answer:
          'Yes. Many Ottawa renters prefer French language interactions. Our Ottawa team handles both.',
      },
      {
        question: 'How does Ottawa compare to Toronto rents?',
        answer:
          'About 25 percent below comparable Toronto units. Vacancy slightly higher. Tenancy length tends to be longer.',
      },
      {
        question: 'Do you cover Gatineau too?',
        answer:
          'For now we focus on the Ontario side. Gatineau is on our expansion roadmap.',
      },
    ],
    closing:
      'Renting out an Ottawa property? Book a free pricing analysis.',
  },
  // ── UNITED STATES ─────────────────────────────────────────────────
  {
    slug: 'miami',
    city: 'Miami',
    country: 'US',
    region: 'Florida',
    navTitle: 'Miami, FL',
    navDescription: 'Brickell, Wynwood, Coral Gables, Edgewater',
    metaTitle: 'Miami Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Miami rental placement across Brickell, Wynwood, Coral Gables, and Edgewater. Condos and detached homes leased in days not weeks.',
    heroKicker: 'Miami · Florida',
    heroEyebrow: 'South Florida market',
    heroHeadline: 'Miami rental leasing handled',
    heroLede:
      'Brickell condos, Wynwood lofts, Coral Gables family homes. Miami rental market is fast. We are faster.',
    intro:
      'Miami went from a snowbird market to a year round rental engine. Tech relocations from New York and San Francisco, finance from Wall Street, plus the steady flow of international buyers using condos as rentals. We operate across Miami Dade with local agents who know which buildings have HOA quirks and which neighborhoods reward sharper photography.',
    marketData: {
      avgRent1Bed: '$2,650',
      avgRent2Bed: '$3,650',
      vacancyRate: '5.2%',
      yoyRentChange: '+2.8%',
      avgDaysOnMarket: '21 days',
      keyTrend: 'Cooling from 2022 spike, still 30 percent above pre pandemic levels',
    },
    neighborhoods: [
      'Brickell',
      'Wynwood',
      'Coral Gables',
      'Edgewater',
      'Coconut Grove',
      'Mid Beach and South Beach',
      'Aventura',
      'Doral',
      'Little Havana',
      'Design District',
    ],
    whyHere: [
      {
        title: 'Brickell high rise expertise',
        body: 'Hundreds of placements across SLS Brickell, 1010 Brickell, Echo, Reach, Rise, Brickell Heights and surrounding towers.',
      },
      {
        title: 'International tenant handling',
        body: 'Many Miami applicants are international. We verify foreign income, request additional documentation, and structure deposits accordingly.',
      },
      {
        title: 'Florida lease compliance',
        body: 'Florida specific lease, security deposit handling, and disclosure requirements. We follow Chapter 83.',
      },
      {
        title: 'Snowbird and seasonal handling',
        body: 'Six month leases and seasonal tenancies common. We structure for the right term.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and HOA check',
        body: 'Miami condos have HOA approval. We pull rules and timing before listing.',
      },
      {
        step: 2,
        title: 'Premium marketing',
        body: 'Miami photography needs to be sharp. We use professional photographers and emphasize natural light and views.',
      },
      {
        step: 3,
        title: 'Bilingual showings',
        body: 'English and Spanish standard. Some neighborhoods need Portuguese too. We staff for it.',
      },
      {
        step: 4,
        title: 'Lease and HOA approval',
        body: 'Florida lease executed. HOA package submitted. Move in coordinated with building manager.',
      },
    ],
    faq: [
      {
        question: 'Do you handle international tenants?',
        answer:
          'Yes. We verify foreign income, request bank statements, and often require additional deposit. Common in Miami.',
      },
      {
        question: 'How fast can you lease in Brickell?',
        answer:
          'Average 14 to 21 days in Brickell. Newer buildings with strong amenities go faster. Older inventory takes a bit longer.',
      },
      {
        question: 'Do you do short term and seasonal leases?',
        answer:
          'We lease 6 months and longer. Anything shorter falls into vacation rental territory which we do not handle.',
      },
    ],
    closing:
      'Have a Miami rental? Get a free pricing analysis from our South Florida team.',
  },
  {
    slug: 'phoenix',
    city: 'Phoenix',
    country: 'US',
    region: 'Arizona',
    navTitle: 'Phoenix, AZ',
    navDescription: 'Scottsdale, Tempe, Chandler, Gilbert',
    metaTitle: 'Phoenix Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Phoenix rental placement across Scottsdale, Tempe, Chandler, Gilbert, and Glendale. Single family rentals and condos filled fast.',
    heroKicker: 'Phoenix · Arizona',
    heroEyebrow: 'Valley of the Sun',
    heroHeadline: 'Phoenix rental leasing handled',
    heroLede:
      'Phoenix metro is one of the largest single family rental markets in the country. We work with investor portfolios and individual landlords across the Valley.',
    intro:
      'Phoenix metro is a single family rental powerhouse. Roofstock, Invitation Homes, Tricon, and thousands of individual investors operate here. We handle leasing for portfolios of every size from one detached home in Gilbert to multi hundred unit BTR communities in Surprise. Our team knows every submarket from Scottsdale luxury to Phoenix entry level.',
    marketData: {
      avgRent1Bed: '$1,450',
      avgRent2Bed: '$1,850',
      vacancyRate: '7.1%',
      yoyRentChange: '-1.2%',
      avgDaysOnMarket: '28 days',
      keyTrend: 'Supply catch up driving short term softening, demographics support long term growth',
    },
    neighborhoods: [
      'Scottsdale (North, Old Town, South)',
      'Tempe',
      'Chandler',
      'Gilbert',
      'Mesa',
      'Glendale',
      'Peoria',
      'Surprise',
      'Phoenix (Downtown, Central, North)',
      'Ahwatukee',
    ],
    whyHere: [
      {
        title: 'Single family rental specialist',
        body: 'Most Phoenix rentals are detached homes. Different marketing, screening, and lease execution than condo heavy markets.',
      },
      {
        title: 'Investor portfolio coverage',
        body: 'BRRRR operators, BTR developers, build to rent communities. We handle all of it.',
      },
      {
        title: 'Arizona lease compliance',
        body: 'Title 33 of Arizona Revised Statutes. Pet deposit rules, security deposit limits, disclosure requirements all dialed in.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and pricing',
        body: 'Phoenix pricing has moved fast. We pull current data including absorption rates by submarket.',
      },
      {
        step: 2,
        title: 'Marketing across SFR platforms',
        body: 'Zillow, Realtor, Rently, Tenant Turner, plus local Phoenix area MLS.',
      },
      {
        step: 3,
        title: 'Self showing or accompanied',
        body: 'SFR self showings are common in Phoenix. We can run accompanied tours or self showings with smart locks.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Arizona lease. Pet rent and pet deposit handled separately. Move in inspection documented.',
      },
    ],
    faq: [
      {
        question: 'Do you handle build to rent communities?',
        answer:
          'Yes. We have run BTR lease ups from 80 to 400 units in the Phoenix metro.',
      },
      {
        question: 'How are Phoenix rents doing?',
        answer:
          'Slight softening over the last 12 months as supply catches up to demand. Long term fundamentals strong. Days on market longer than peak but still healthy.',
      },
      {
        question: 'Do you do self showings?',
        answer:
          'Yes for safe and ready units. We use smart lock tech and verify identity before access.',
      },
    ],
    closing:
      'Have Phoenix metro rentals? Book a scoping call.',
  },
  {
    slug: 'houston',
    city: 'Houston',
    country: 'US',
    region: 'Texas',
    navTitle: 'Houston, TX',
    navDescription: 'The Heights, Montrose, Memorial, Sugar Land',
    metaTitle: 'Houston Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Houston rental placement across The Heights, Montrose, Memorial, Energy Corridor, and Sugar Land. Single family and apartment rentals filled fast.',
    heroKicker: 'Houston · Texas',
    heroEyebrow: 'Greater Houston',
    heroHeadline: 'Houston rental leasing handled',
    heroLede:
      'Houston is large, diverse, and full of rental opportunity. We operate across the metro from inside the loop neighborhoods to Katy and Sugar Land suburbs.',
    intro:
      'Houston rental market is driven by energy, healthcare, and the medical center. The Heights and Montrose attract young professionals. Memorial and Sugar Land attract families. The Energy Corridor and Galleria area attract corporate relocations. We segment our marketing accordingly and handle Texas lease law dialed in for the specifics of Houston.',
    marketData: {
      avgRent1Bed: '$1,400',
      avgRent2Bed: '$1,800',
      vacancyRate: '6.8%',
      yoyRentChange: '+1.9%',
      avgDaysOnMarket: '24 days',
      keyTrend: 'Steady growth, no major supply shock, energy sector strength supporting demand',
    },
    neighborhoods: [
      'The Heights',
      'Montrose',
      'Memorial',
      'Galleria and Uptown',
      'Energy Corridor',
      'Sugar Land',
      'Katy',
      'The Woodlands',
      'Pearland',
      'Midtown and Museum District',
    ],
    whyHere: [
      {
        title: 'Texas lease compliance',
        body: 'Texas Property Code Chapter 92. Tenant rights, security deposits, disclosures all handled.',
      },
      {
        title: 'Houston metro coverage',
        body: 'Inside the loop, suburbs, and master planned communities. One team across all of it.',
      },
      {
        title: 'Corporate relocation channels',
        body: 'Healthcare workers, energy sector relocations, medical center. We market through the right channels for each.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Property assessment',
        body: 'Houston pricing varies wildly by neighborhood. We pull hyper local comps.',
      },
      {
        step: 2,
        title: 'Marketing across Texas platforms',
        body: 'HAR.com, Zillow, Apartments, plus local Houston rental boards.',
      },
      {
        step: 3,
        title: 'Local showings',
        body: 'Houston is spread out. We have agents in inside the loop, west side, and Sugar Land areas.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Texas standard lease with custom clauses. Move in inspection documented.',
      },
    ],
    faq: [
      {
        question: 'Do you handle floodplain disclosure?',
        answer:
          'Yes. Texas Property Code Section 92.0135 requires flood disclosure. We include it in every lease and confirm flood history before listing.',
      },
      {
        question: 'How fast do The Heights rentals go?',
        answer:
          'Inside the loop neighborhoods like The Heights and Montrose average 18 to 22 days. Suburban areas typically take longer.',
      },
      {
        question: 'Do you cover Sugar Land and Katy?',
        answer:
          'Yes. Most of our Houston portfolio activity is suburban. We have agents specifically in Sugar Land, Katy, and The Woodlands.',
      },
    ],
    closing:
      'Have a Houston rental? Get a free pricing analysis.',
  },
  {
    slug: 'austin',
    city: 'Austin',
    country: 'US',
    region: 'Texas',
    navTitle: 'Austin, TX',
    navDescription: 'Downtown, East Austin, Mueller, Round Rock',
    metaTitle: 'Austin Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Austin rental placement across Downtown, East Austin, Mueller, South Congress, and Round Rock. Tech relocations and family rentals handled.',
    heroKicker: 'Austin · Texas',
    heroEyebrow: 'Central Texas',
    heroHeadline: 'Austin rental leasing handled',
    heroLede:
      'Austin is a tech relocation magnet. We market to incoming professionals, lease tech worker rentals, and handle the spring leasing rush.',
    intro:
      'Austin rental market is driven by tech. Tesla, Apple, Oracle, and dozens of startups bring continuous relocation demand. South Congress, East Austin, and Mueller draw younger professionals. Westlake, Bee Cave, and the Hill Country edge attract families and executives. We segment and market accordingly.',
    marketData: {
      avgRent1Bed: '$1,650',
      avgRent2Bed: '$2,150',
      vacancyRate: '8.4%',
      yoyRentChange: '-2.1%',
      avgDaysOnMarket: '32 days',
      keyTrend: 'Significant supply absorption period, rents softening, long term tech demand fundamentals intact',
    },
    neighborhoods: [
      'Downtown and Rainey Street',
      'East Austin',
      'Mueller',
      'South Congress',
      'Zilker',
      'Bouldin',
      'North Loop',
      'Round Rock',
      'Cedar Park',
      'Pflugerville',
    ],
    whyHere: [
      {
        title: 'Tech worker tenant pool',
        body: 'We market through the channels tech workers actually use. LinkedIn, Tesla and Apple internal boards, relocation services.',
      },
      {
        title: 'Spring leasing rush',
        body: 'Austin leasing concentrates March through August. We staff up for the rush.',
      },
      {
        title: 'New build absorption',
        body: 'Lots of new apartment supply in 2024 and 2025. We compete with concessions correctly without overgiving.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and competitive analysis',
        body: 'In a softening market pricing matters more than ever. We pull active and recently leased comps.',
      },
      {
        step: 2,
        title: 'Marketing with concession strategy',
        body: 'Where appropriate we structure concessions. Free month, reduced deposit, or rent abatement. We do not give margin away unnecessarily.',
      },
      {
        step: 3,
        title: 'Showings handled by local team',
        body: 'Austin based agents. Self showings available for vacant units with smart locks.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Texas lease. Move in inspection. Funds collected.',
      },
    ],
    faq: [
      {
        question: 'How are Austin rents doing right now?',
        answer:
          'Softening as a wave of new supply absorbed. Rents are down slightly year over year. Long term demographics remain strong.',
      },
      {
        question: 'Do concessions work?',
        answer:
          'In competitive submarkets a one month free concession often beats a straight rent drop. Maintains face rent for refinances and comparable analysis.',
      },
      {
        question: 'Do you cover Round Rock and Cedar Park?',
        answer:
          'Yes. Greater Austin coverage including Round Rock, Cedar Park, Pflugerville, and Leander.',
      },
    ],
    closing:
      'Renting out an Austin property? Book a free walkthrough.',
  },
  {
    slug: 'dallas',
    city: 'Dallas',
    country: 'US',
    region: 'Texas',
    navTitle: 'Dallas, TX',
    navDescription: 'Uptown, Deep Ellum, Frisco, Plano',
    metaTitle: 'Dallas Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Dallas Fort Worth rental placement across Uptown, Deep Ellum, Frisco, Plano, and beyond. Corporate relocation rentals and single family.',
    heroKicker: 'Dallas · Texas',
    heroEyebrow: 'Dallas Fort Worth metro',
    heroHeadline: 'Dallas rental leasing handled',
    heroLede:
      'Dallas Fort Worth is the largest metro in Texas and one of the fastest growing in the US. Steady demand, structured leasing, qualified tenants.',
    intro:
      'Dallas Fort Worth metro continues to grow. Corporate relocations from California and Illinois drive a steady flow of professional renters. Frisco and Plano dominate family rentals. Uptown and Deep Ellum attract young professionals. Highland Park and University Park hold the luxury rental segment. We operate across the metro.',
    marketData: {
      avgRent1Bed: '$1,450',
      avgRent2Bed: '$1,900',
      vacancyRate: '7.2%',
      yoyRentChange: '+0.8%',
      avgDaysOnMarket: '26 days',
      keyTrend: 'Steady demand growth, supply pipeline measured, healthier than Austin or Phoenix',
    },
    neighborhoods: [
      'Uptown',
      'Deep Ellum',
      'Lakewood',
      'Highland Park and University Park',
      'Bishop Arts',
      'Frisco',
      'Plano',
      'McKinney',
      'Allen',
      'Las Colinas (Irving)',
    ],
    whyHere: [
      {
        title: 'Corporate relocation flow',
        body: 'Many DFW renters are corporate transfers from out of state. We handle the relocation timing and remote applications.',
      },
      {
        title: 'Suburban family rental expertise',
        body: 'Plano, Frisco, McKinney are family rental engines. School catchment matters here.',
      },
      {
        title: 'Texas lease compliance',
        body: 'Texas Property Code Chapter 92. Standard practice across all our DFW placements.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and pricing',
        body: 'DFW submarkets price differently. Uptown is not the same as Frisco. We pull submarket specific comps.',
      },
      {
        step: 2,
        title: 'Marketing including corporate channels',
        body: 'Corporate relocation services, employer rental boards, plus standard platforms.',
      },
      {
        step: 3,
        title: 'Remote and in person showings',
        body: 'Many DFW renters tour from out of state. Live video tours standard.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Texas lease, e signed for out of state applicants. Move in coordinated.',
      },
    ],
    faq: [
      {
        question: 'How long are DFW lease terms typically?',
        answer:
          '12 month leases are standard. 24 month leases common for corporate transfers and family rentals.',
      },
      {
        question: 'Do you cover Fort Worth too?',
        answer:
          'Yes. We cover the full DFW metroplex including Fort Worth, Arlington, Mansfield, and Burleson.',
      },
      {
        question: 'How are DFW rents trending?',
        answer:
          'Steady growth. DFW has handled the supply pipeline better than Austin or Phoenix. Long term fundamentals very strong.',
      },
    ],
    closing:
      'Have a Dallas Fort Worth rental? Book a scoping call.',
  },
  {
    slug: 'atlanta',
    city: 'Atlanta',
    country: 'US',
    region: 'Georgia',
    navTitle: 'Atlanta, GA',
    navDescription: 'Midtown, Buckhead, Decatur, Marietta',
    metaTitle: 'Atlanta Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Atlanta metro rental placement across Midtown, Buckhead, Decatur, Marietta, and Alpharetta. Single family and condo rentals filled fast.',
    heroKicker: 'Atlanta · Georgia',
    heroEyebrow: 'Atlanta metro',
    heroHeadline: 'Atlanta rental leasing handled',
    heroLede:
      'Atlanta is the major rental engine of the Southeast. Tech, film, finance, and logistics drive constant demand. We market to the right pool for every neighborhood.',
    intro:
      'Atlanta metro covers a huge geographic footprint with very different submarkets. Midtown and Buckhead are urban condo and apartment heavy. Decatur and East Atlanta attract creative professionals. Alpharetta and Marietta are family rental strongholds. We operate across the metro with local agents per submarket.',
    marketData: {
      avgRent1Bed: '$1,650',
      avgRent2Bed: '$2,050',
      vacancyRate: '6.5%',
      yoyRentChange: '+1.8%',
      avgDaysOnMarket: '23 days',
      keyTrend: 'Tech and film sector growth driving steady demand, single family rental strong',
    },
    neighborhoods: [
      'Midtown',
      'Buckhead',
      'Inman Park',
      'Old Fourth Ward',
      'East Atlanta Village',
      'Decatur',
      'Marietta',
      'Alpharetta',
      'Smyrna',
      'Brookhaven',
    ],
    whyHere: [
      {
        title: 'Atlanta condo high rise expertise',
        body: 'Hundreds of placements in Midtown and Buckhead towers. We know the buildings.',
      },
      {
        title: 'Single family rental coverage',
        body: 'Suburban family rentals in Marietta, Alpharetta, Smyrna. School catchment marketing.',
      },
      {
        title: 'Georgia lease compliance',
        body: 'Georgia Landlord Tenant Act. Security deposit rules, disclosure requirements, late fee structures.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and submarket pricing',
        body: 'Midtown is not Marietta. Different comps, different price bands, different audiences.',
      },
      {
        step: 2,
        title: 'Marketing by submarket',
        body: 'Urban listings emphasize amenities and walkability. Suburban listings emphasize schools and yards.',
      },
      {
        step: 3,
        title: 'Local showings',
        body: 'Atlanta is spread out. Local agents per submarket means faster showings without an hour commute.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'Georgia compliant lease. E signed. Deposit collected. Move in coordinated.',
      },
    ],
    faq: [
      {
        question: 'Do you cover the full Atlanta metro?',
        answer:
          'Yes. From Buckhead north through Alpharetta and Cumming, west to Smyrna and Marietta, east to Decatur and Lawrenceville, south to Tyrone and Newnan.',
      },
      {
        question: 'How are film industry rentals?',
        answer:
          'Tyler Perry Studios and the broader Atlanta film economy drive a unique short to medium term rental segment. We handle 6 to 12 month placements for film professionals.',
      },
      {
        question: 'What about Georgia eviction risk?',
        answer:
          'Strong screening is the best defense. Multi step verification including prior landlord conversations catches issues before lease signing.',
      },
    ],
    closing:
      'Have an Atlanta metro rental? Book a free pricing analysis.',
  },
  {
    slug: 'charlotte',
    city: 'Charlotte',
    country: 'US',
    region: 'North Carolina',
    navTitle: 'Charlotte, NC',
    navDescription: 'Uptown, South End, Plaza Midwood, Ballantyne',
    metaTitle: 'Charlotte Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'Charlotte rental placement across Uptown, South End, Plaza Midwood, NoDa, and Ballantyne. Banking and tech sector relocations handled.',
    heroKicker: 'Charlotte · North Carolina',
    heroEyebrow: 'Carolinas market',
    heroHeadline: 'Charlotte rental leasing handled',
    heroLede:
      'Charlotte is the banking and corporate hub of the Carolinas. Steady professional rental demand. Strong fundamentals.',
    intro:
      'Charlotte rental market runs on banking. Bank of America, Wells Fargo, Truist, and the broader financial services ecosystem drive consistent professional rental demand. South End and Uptown anchor the urban market. Ballantyne and South Park hold the luxury and family rental segment. NoDa and Plaza Midwood attract younger creative professionals.',
    marketData: {
      avgRent1Bed: '$1,550',
      avgRent2Bed: '$1,950',
      vacancyRate: '6.9%',
      yoyRentChange: '+1.5%',
      avgDaysOnMarket: '24 days',
      keyTrend: 'Banking sector relocations driving steady demand, supply pipeline measured',
    },
    neighborhoods: [
      'Uptown',
      'South End',
      'Plaza Midwood',
      'NoDa',
      'Dilworth',
      'Myers Park',
      'Ballantyne',
      'South Park',
      'Cotswold',
      'University City',
    ],
    whyHere: [
      {
        title: 'Banking relocation flow',
        body: 'New hires and transfers from New York and Chicago. We handle the relocation timing and remote applications.',
      },
      {
        title: 'South End apartment expertise',
        body: 'Dozens of new apartment buildings in South End. We know which compete with each other.',
      },
      {
        title: 'North Carolina lease compliance',
        body: 'North Carolina General Statutes Chapter 42. Tenant rights, security deposit handling, disclosure rules.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Walkthrough and submarket analysis',
        body: 'Charlotte submarkets price quite differently. We pull hyper local comps.',
      },
      {
        step: 2,
        title: 'Banking sector marketing',
        body: 'Relocation services, corporate housing boards, plus standard rental platforms.',
      },
      {
        step: 3,
        title: 'Remote and in person showings',
        body: 'Many Charlotte renters tour from out of state. Live video tours standard.',
      },
      {
        step: 4,
        title: 'Lease execution',
        body: 'North Carolina compliant lease. E signed. Deposit collected.',
      },
    ],
    faq: [
      {
        question: 'How does Charlotte compare to other Southeast cities?',
        answer:
          'Slightly lower rents than Atlanta but higher than Greenville or Raleigh. Steady growth without the supply shocks Phoenix or Austin saw.',
      },
      {
        question: 'Do you cover Concord and Mooresville?',
        answer:
          'Yes. We cover greater Charlotte including Concord, Mooresville, Huntersville, and Indian Trail.',
      },
      {
        question: 'How fast do South End apartments lease?',
        answer:
          'Average 18 to 25 days. New buildings often offer concessions which speeds absorption.',
      },
    ],
    closing:
      'Have a Charlotte rental? Get a free pricing analysis.',
  },
  {
    slug: 'nyc',
    city: 'New York City',
    country: 'US',
    region: 'New York',
    navTitle: 'New York, NY',
    navDescription: 'Manhattan, Brooklyn, Queens, LIC',
    metaTitle: 'NYC Rental Leasing and Tenant Placement | MoveSmart Rentals',
    metaDescription:
      'New York City rental placement across Manhattan, Brooklyn, Queens, and the Bronx. Co op board navigation and stabilized lease compliance handled.',
    heroKicker: 'New York · NY',
    heroEyebrow: 'Five boroughs',
    heroHeadline: 'NYC rental leasing handled',
    heroLede:
      'Manhattan walk ups, Brooklyn brownstones, Long Island City high rises. We navigate NYC tenant law and co op boards as standard practice.',
    intro:
      'New York City rental market is unlike anywhere else. Rent stabilization, co op boards, rent regulated lease addendums, and the tightest market dynamics in North America. We work with landlords across the five boroughs. We are not a broker for tenants. We are a leasing services partner for owners who need professional placement without giving up control.',
    marketData: {
      avgRent1Bed: '$3,650',
      avgRent2Bed: '$4,950',
      vacancyRate: '2.4%',
      yoyRentChange: '+2.1%',
      avgDaysOnMarket: '22 days',
      keyTrend: 'Persistent tight supply, Manhattan demand still strong, outer boroughs growing',
    },
    neighborhoods: [
      'Manhattan (Upper East Side, Upper West Side, Midtown, Chelsea, West Village, Tribeca)',
      'Brooklyn (Williamsburg, DUMBO, Brooklyn Heights, Park Slope, Bedford Stuyvesant)',
      'Queens (Long Island City, Astoria, Jackson Heights, Forest Hills)',
      'The Bronx (Riverdale, Mott Haven, Pelham Bay)',
      'Staten Island (St. George, New Brighton)',
    ],
    whyHere: [
      {
        title: 'NYC tenant law expertise',
        body: 'Rent stabilization, rent control, fair housing requirements. We comply across all relevant frameworks.',
      },
      {
        title: 'Co op board navigation',
        body: 'Co op board approval packages, financial disclosures, interview preparation. Standard practice.',
      },
      {
        title: 'Free market and stabilized differentiation',
        body: 'Different rules, different paperwork, different lease language. We get it right.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Property classification',
        body: 'Free market, rent stabilized, or co op? Different listing strategies. Different lease requirements.',
      },
      {
        step: 2,
        title: 'NYC platform marketing',
        body: 'StreetEasy, Zillow, Naked Apartments, RentHop, plus broker network referrals.',
      },
      {
        step: 3,
        title: 'Showings handled in person',
        body: 'NYC renters expect in person tours. Quick turnaround. Weekend availability standard.',
      },
      {
        step: 4,
        title: 'Lease execution with board approval',
        body: 'NYC compliant lease. Co op or condo board package if applicable. Move in coordinated with building.',
      },
    ],
    faq: [
      {
        question: 'Do you handle rent stabilized units?',
        answer:
          'Yes. We follow DHCR rules, use the correct lease addendums, and ensure compliance with the New York Rent Stabilization Code.',
      },
      {
        question: 'Can you submit co op board packages?',
        answer:
          'Yes. We assemble the full package, submit, and follow up until board decision. Standard part of NYC placement.',
      },
      {
        question: 'How is your fee structured for NYC?',
        answer:
          'For free market units the standard is one month rent paid by the landlord. We can also structure tenant paid fees where market permits.',
      },
    ],
    closing:
      'Renting out a NYC property? Book a free consultation.',
  },
]

export const SILO_LOCATION_SLUGS = SILO_LOCATIONS.map((l) => l.slug)

export function getSiloLocation(slug: string): SiloLocation | undefined {
  return SILO_LOCATIONS.find((l) => l.slug === slug)
}
