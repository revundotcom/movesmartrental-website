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
}

export interface PublishingControls {
  canonicalOverride?: string
  noindex: boolean
  includedInSitemap: boolean
  redirectTo?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
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
  heroImage?: SanityImage
  seo: SeoFields
  publishing: PublishingControls
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
  heroImage?: SanityImage
  author?: string
  seo: SeoFields
  publishing: PublishingControls
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
