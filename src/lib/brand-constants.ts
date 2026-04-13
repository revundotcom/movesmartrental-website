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
  phone: '+14372957688',
  /** Phone display format */
  phoneDisplay: '(437) 295-7688',
  /** Default contact email */
  email: 'info@movesmartrentals.com',
  /** Founding year */
  foundingYear: 2024,
  /** Default OG image path */
  ogImage: '/og-default.png',
  /** Logo path */
  logo: '/og-default.png',
  /** Tagline */
  tagline: 'White-Glove Property Management Across Canada',
  /** Short description for schemas */
  description:
    'Full-service property management across Canada. Tenant placement, screening, rent guarantee, and leasing with zero upfront cost.',
  /** Social profiles */
  social: {
    linkedin: 'https://www.linkedin.com/company/movesmart-rentals',
    instagram: 'https://www.instagram.com/movesmartrentals',
    facebook: 'https://www.facebook.com/movesmartrentals',
    youtube: 'https://www.youtube.com/@movesmartrentals',
  },
  /** Social links array for schema sameAs */
  socialLinks: [
    'https://www.linkedin.com/company/movesmart-rentals',
    'https://www.instagram.com/movesmartrentals',
    'https://www.facebook.com/movesmartrentals',
    'https://www.youtube.com/@movesmartrentals',
  ],
  /** Canonical service names */
  services: [
    'Tenant Placement',
    'Tenant Screening',
    'Rent Guarantee',
    'Leasing Services',
    'Rental Preparation',
    'Rental Marketing',
    'Property Management',
    'Self-Serve Portal',
  ],
  /** Key statistics for trust signals - update quarterly */
  stats: {
    propertiesManaged: '500+',
    citiesServed: '20+',
    occupancyRate: '98%',
    avgFillDays: 14,
    googleRating: 4.9,
    googleReviewCount: '200+',
  },
  /** Service guarantees */
  guarantees: {
    placementDays: 14,
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

/** Canonical service names - always use these exact strings */
export const SERVICES = {
  tenantPlacement: 'Tenant Placement',
  tenantScreening: 'Tenant Screening',
  propertyManagement: 'Property Management',
  rentCollection: 'Rent Collection',
  propertyMaintenance: 'Property Maintenance',
  leaseManagement: 'Lease Management',
  rentGuarantee: 'Rent Guarantee',
  evictionProtection: 'Eviction Protection',
} as const

/** Key statistics for trust signals - update quarterly */
export const STATS = {
  propertiesManaged: '500+',
  citiesServed: '20+',
  avgDaysToRent: '14',
  ownerSatisfaction: '4.9',
  reviewCount: '200+',
  upfrontCost: '$0',
  tenantRetention: '95%',
  occupancyRate: '98%',
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
  tertiary: 'Talk to a Property Expert',
  /** For city-specific pages: replace [City] with actual city name */
  citySpecific: (city: string, service?: string) =>
    service ? `Get ${service} in ${city}` : `Get Started in ${city}`,
  /** For form proximity */
  formSocial: 'Join 500+ Canadian landlords',
  /** For footer */
  footerTrust: 'Trusted by 500+ property owners across Canada',
} as const

/** National rental market data (update monthly) */
export const MARKET_DATA = {
  lastUpdated: '2026-04',
  nationalAvgRent: '$2,030',
  nationalVacancyRate: '3.1%',
  ontarioRentGuideline: '2.1%',
  industrySize: '$9.8 billion',
  pmBusinessCount: '35,145',
} as const
