import type { PortableTextBlock } from '@portabletext/types'

// ---------------------------------------------------------------------------
// Sanity Base Types
// ---------------------------------------------------------------------------

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityReference {
  _type: 'reference'
  _ref: string
}

export interface SanityImage {
  _type: 'image'
  asset: SanityReference
  alt: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// ---------------------------------------------------------------------------
// Reusable Fieldsets
// ---------------------------------------------------------------------------

export interface SeoFields {
  metaTitle: string
  metaDescription: string
  ogImage?: SanityImage
  keywords?: string[]
  featuredImage?: { asset: { _ref: string }; alt?: string; hotspot?: unknown }
  primaryKeyword?: string
  secondaryKeywords?: string[]
  aiSummary?: string
  schemaFields?: {
    schemaType?: string
    includeFaqSchema?: boolean
    includeBreadcrumbSchema?: boolean
    includeLocalBusinessSchema?: boolean
    customJsonLd?: string
  }
}

export interface PublishingControls {
  canonicalOverride?: string
  noindex: boolean
  includedInSitemap: boolean
  redirectTo?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  canonicalSetting?: 'self' | 'parent' | 'custom'
  indexControl?: 'index' | 'noindex'
  sitemapInclude?: boolean
  redirectFrom?: string[]
}

// ---------------------------------------------------------------------------
// Inline Object Types (used in CityService and other schemas)
// ---------------------------------------------------------------------------

export interface CtaButton {
  label: string
  url: string
}

export interface PainPoint {
  problem: string
  solution: string
}

export interface Benefit {
  title: string
  description: string
  icon?: string
}

export interface HowItWorksStep {
  stepNumber: number
  title: string
  description: string
}

export interface Testimonial {
  name: string
  city: string
  quote: string
  outcome?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface CompetitorComparison {
  name: string
  features: Array<{
    feature: string
    us: string
    them: string
  }>
}

// ---------------------------------------------------------------------------
// Content Type Interfaces (9 schemas)
// ---------------------------------------------------------------------------

export interface Province extends SanityDocument {
  _type: 'province'
  title: string
  slug: SanitySlug
  country: 'ca' | 'us'
  abbreviation?: string
  description?: string
  heroImage?: SanityImage | { asset: { _ref: string }; alt?: string; hotspot?: unknown }
  seo: SeoFields
  publishing: PublishingControls
  provinceOrStateName?: string
  provinceOrStateCode?: string
  metaTitle?: string
  metaDescription?: string
  heroHeading?: string
  heroSubheading?: string
  introBody?: PortableTextBlock[]
  serviceSummaryBlocks?: unknown[] // TODO: narrow type
  localLawSummary?: PortableTextBlock[]
  faqItems?: FaqItem[]
  internalLinkBlocks?: unknown[] // TODO: narrow type
  relatedServiceLinks?: unknown[] // TODO: narrow type
  relatedCityLinks?: unknown[] // TODO: narrow type
}

export interface City extends SanityDocument {
  _type: 'city'
  title: string
  slug: SanitySlug
  province: SanityReference
  tier: 1 | 2 | 3
  population?: number
  medianRent?: number
  vacancyRate?: number
  neighbourhoods?: string[]
  transitInfo?: string
  heroImage?: SanityImage
  description?: PortableTextBlock[]
  seo: SeoFields
  publishing: PublishingControls
  cityName?: string
  country?: string
  provinceOrStateName?: string
  metaTitle?: string
  metaDescription?: string
  heroHeading?: string
  heroSubheading?: string
  cityIntro?: PortableTextBlock[]
  rentalMarketSummary?: PortableTextBlock[]
  landlordProblemSummary?: PortableTextBlock[]
  faqItems?: FaqItem[]
  servicesAvailable?: unknown[] // TODO: narrow type
  relatedCityLinks?: unknown[] // TODO: narrow type
  relatedServiceLinks?: unknown[] // TODO: narrow type
  averageDaysOnMarket?: number
  rentGrowthYoY?: number
  dataSourceDate?: string
  geoLat?: number
  geoLng?: number
}

export interface Service extends SanityDocument {
  _type: 'service'
  title: string
  slug: SanitySlug
  shortDescription: string
  icon?: string
  audience: 'owner' | 'tenant' | 'both'
  order?: number
  heroImage?: SanityImage
  body?: PortableTextBlock[]
  faq?: FaqItem[]
  seo: SeoFields
  publishing: PublishingControls
  serviceName?: string
  metaTitle?: string
  metaDescription?: string
  heroHeading?: string
  heroSubheading?: string
  introBody?: PortableTextBlock[]
  benefits?: unknown[] // TODO: narrow type (overlaps with Benefit[])
  howItWorks?: Array<{ stepNumber?: number; title?: string; description?: string }>
  faqItems?: FaqItem[]
  pricingSummary?: string
  ctaText?: string
  ctaFormVariant?: string
  relatedServiceLinks?: unknown[] // TODO: narrow type
  relatedCityLinks?: unknown[] // TODO: narrow type
}

export interface CityService extends SanityDocument {
  _type: 'cityService'
  city: SanityReference
  service: SanityReference
  // Denormalized fields (read-only in Studio)
  cityTitle?: string
  provinceSlug?: string
  citySlug?: string
  serviceSlug?: string
  // Required local content
  localMedianRent: number
  localVacancyRate: number
  neighbourhoodNames: string[]
  localRegulatory: string
  localBody: PortableTextBlock[]
  // Hero fields
  heroHeadline: string
  heroSubheadline?: string
  heroCta1?: CtaButton
  heroCta2?: CtaButton
  heroImage?: SanityImage
  // Block data arrays
  painPoints?: PainPoint[]
  benefits?: Benefit[]
  howItWorks?: HowItWorksStep[]
  testimonials?: Testimonial[]
  faq?: FaqItem[]
  // Related
  relatedServices?: SanityReference[]
  seo: SeoFields
  publishing: PublishingControls
  cityName?: string
  serviceName?: string
  provinceOrStateName?: string
  country?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  metaTitle?: string
  metaDescription?: string
  heroHeading?: string
  heroSubheading?: string
  localIntro?: PortableTextBlock[]
  localPainPoints?: unknown[] // TODO: narrow type (overlaps with PainPoint[])
  serviceScope?: unknown[] // TODO: narrow type
  processSteps?: Array<{ stepNumber?: number; title?: string; description?: string }>
  trustBlock?: unknown[] // TODO: narrow type
  faqItems?: FaqItem[]
  ctaText?: string
  imagePrompt?: string
  altText?: string
  relatedServiceLinks?: unknown[] // TODO: narrow type
  relatedCityLinks?: unknown[] // TODO: narrow type
}

export interface BlogGuide extends SanityDocument {
  _type: 'blogGuide'
  title: string
  slug: SanitySlug
  category?: 'blog' | 'guide' | 'market-report' | 'legal-guide'
  city?: SanityReference
  service?: SanityReference
  body: PortableTextBlock[]
  excerpt?: string
  heroImage?: SanityImage | { asset: { _ref: string }; alt?: string; hotspot?: unknown }
  author?: string
  seo: SeoFields
  publishing: PublishingControls
  primaryKeyword?: string
  secondaryKeywords?: string[]
  publishDate?: string
  updateDate?: string
  intro?: PortableTextBlock[]
  mainBody?: PortableTextBlock[]
  faqItems?: FaqItem[]
  relatedServiceLinks?: unknown[] // TODO: narrow type
  relatedCityLinks?: unknown[] // TODO: narrow type
}

export interface Comparison extends SanityDocument {
  _type: 'comparison'
  title: string
  slug: SanitySlug
  service?: SanityReference
  competitors?: CompetitorComparison[]
  body?: PortableTextBlock[]
  seo: SeoFields
  publishing: PublishingControls
}

export interface CaseStudy extends SanityDocument {
  _type: 'caseStudy'
  title: string
  slug: SanitySlug
  city?: SanityReference
  clientName?: string
  outcome: string
  body?: PortableTextBlock[]
  heroImage?: SanityImage
  seo: SeoFields
  publishing: PublishingControls
}

export interface PropertyCategory extends SanityDocument {
  _type: 'propertyCategory'
  title: string
  slug: SanitySlug
  city: SanityReference
  propertyType: 'apartment' | 'condo' | 'house' | 'townhouse'
  description?: PortableTextBlock[]
  averageRent?: number
  seo: SeoFields
  publishing: PublishingControls
}

export interface PropertyListing extends SanityDocument {
  _type: 'propertyListing'
  title: string
  slug: SanitySlug
  city: SanityReference
  category: SanityReference
  price: number
  bedrooms: number
  bathrooms: number
  sqft?: number
  address: string
  description?: PortableTextBlock[]
  images?: SanityImage[]
  available?: boolean
  availableDate?: string
  seo: SeoFields
  publishing: PublishingControls
}
