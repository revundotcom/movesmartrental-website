/**
 * Canonical brand entity names and constants.
 * Use these everywhere for GEO/AEO entity consistency.
 * NEVER use "MoveSmart", "MSR", "Move Smart" - always "MoveSmart Rentals".
 */

export const BRAND = {
  /** Always use this exact name for the brand entity */
  name: 'MoveSmart Rentals',
  /** Legal entity name */
  legalName: 'MoveSmart Rentals Inc.',
  /** Website URL (no trailing slash) */
  url: 'https://movesmartrentals.com',
  /** Primary phone (E.164) */
  phone: '+18005959755',
  /** Phone display format */
  phoneDisplay: '(800) 595-9755',
  /** Default contact email */
  email: 'contact@movesmartrentals.com',
  /** Founding year */
  foundingYear: 2024,
  /** Default OG image path */
  ogImage: '/og-default.png?v=3',
  /** Logo path */
  logo: '/og-default.png?v=3',
  /** Tagline */
  tagline: 'Full-Service Leasing & Tenant Placement Across Canada & the United States',
  /** Short description for schemas */
  description:
    'Full-service leasing and tenant placement across Canada and the United States. Strategic pricing, professional marketing, tenant qualification, and lease execution for individual landlords and institutional operators, zero upfront, success-based fee.',
  /** Social profiles */
  social: {
    linkedin: 'https://www.linkedin.com/company/movesmart-rentals/',
    instagram: 'https://www.instagram.com/movesmartrentals',
    facebook: 'https://www.facebook.com/movesmartrentals',
    tiktok: 'https://www.tiktok.com/@movesmartrentals',
    x: 'https://x.com/Movesmartrental',
  },
  /** Social links array for schema sameAs */
  socialLinks: [
    'https://www.linkedin.com/company/movesmart-rentals/',
    'https://www.instagram.com/movesmartrentals',
    'https://www.facebook.com/movesmartrentals',
    'https://www.tiktok.com/@movesmartrentals',
    'https://x.com/Movesmartrental',
  ],
  /** Canonical service names - the 9 leasing-execution services */
  services: [
    'Strategic Rental Pricing',
    'Professional Marketing Execution',
    'Showing Coordination',
    'Offer Management',
    'Tenant Qualification',
    'Rental Protection Options',
    'Lease Execution',
    'Move-In Coordination',
    'Institutional Lease-Up Services',
  ],
  /** Key statistics for trust signals - update quarterly */
  stats: {
    unitsLeased: 'Thousands',
    citiesServed: '20+',
    avgPlacementDays: 18,
    avgFillDays: 18,
    googleRating: 4.9,
    googleReviewCount: '200+',
  },
  /** Service guarantees */
  guarantees: {
    placementDays: 18,
    responseHours: 24,
    noContracts: true,
    noUpfrontCost: true,
  },
  /** Trust certifications */
  certifications: ['RECO', 'FRPO', 'BBB'],
  /** Media mentions for trust bar */
  mediaFeatures: ['Toronto Star', 'Globe and Mail', 'REIC', 'FRPO', 'REP Magazine'],
  /** Areas served (ISO country codes) */
  areasServed: ['CA', 'US'],
} as const

/** Canonical service names - always use these exact strings.
 *  MoveSmart Rentals is a leasing brokerage, NOT a property management company.
 *  These map 1:1 to the 9 leasing-execution services in the brand brief. */
export const SERVICES = {
  strategicPricing: 'Strategic Rental Pricing',
  marketingExecution: 'Professional Marketing Execution',
  showingCoordination: 'Showing Coordination',
  offerManagement: 'Offer Management',
  tenantQualification: 'Tenant Qualification',
  rentalProtection: 'Rental Protection Options',
  leaseExecution: 'Lease Execution',
  moveInCoordination: 'Move-In Coordination',
  institutionalLeaseUp: 'Institutional Lease-Up Services',
} as const

/** Key statistics for trust signals - update quarterly */
export const STATS = {
  unitsLeased: 'Thousands',
  citiesServed: '20+',
  avgDaysToRent: '18',
  ownerSatisfaction: '4.9',
  reviewCount: '200+',
  upfrontCost: '$0',
  tenantRetention: '95%',
  avgPlacementDays: '18',
} as const

/** Trust certifications and partnerships */
export const CERTIFICATIONS = [
  { name: 'RECO', fullName: 'Real Estate Council of Ontario', type: 'regulatory' },
  { name: 'OREA', fullName: 'Ontario Real Estate Association', type: 'association' },
  { name: 'BBB', fullName: 'Better Business Bureau', type: 'accreditation' },
  { name: 'FRPO', fullName: 'Federation of Rental-housing Providers of Ontario', type: 'association' },
] as const

/** Media mentions for trust bar */
export const MEDIA_MENTIONS = [
  'Toronto Star',
  'Globe and Mail',
  'REIC',
  'FRPO',
  'REP Magazine',
] as const

/** CTA copy variations by context */
export const CTA_COPY = {
  primary: 'Get Your Free Rental Analysis',
  secondary: 'See Our Pricing',
  tertiary: 'Talk to a Leasing Advisor',
  /** For city-specific pages: replace [City] with actual city name */
  citySpecific: (city: string, service?: string) =>
    service ? `Get ${service} in ${city}` : `Get Started in ${city}`,
  /** For form proximity */
  formSocial: 'Join thousands of landlords across North America',
  /** For footer */
  footerTrust: 'Trusted by thousands of property owners across North America',
} as const

/**
 * National rental market data.
 * Source: CMHC Rental Market Report + Statistics Canada Housing Statistics.
 * Update quarterly when CMHC publishes a new report.
 */
export const MARKET_DATA = {
  lastUpdated: '2026-04',
  source: 'CMHC Rental Market Report · Statistics Canada',
  nationalAvgRent: '$2,030',
  nationalVacancyRate: '3.1%',
  ontarioRentGuideline: '2.1%',
  industrySize: '$9.8 billion',
  pmBusinessCount: '35,145',
} as const
