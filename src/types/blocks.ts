// Block component prop types and shared sub-types
// Created for Plan 05/06 block components

// Shared sub-types
export interface CtaButton {
  label: string
  href: string
  variant?: 'default' | 'outline' | 'secondary'
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ServiceCardData {
  title: string
  slug: string
  shortDescription: string
  icon?: string
  audience: 'owner' | 'tenant' | 'both'
}

export interface CityCardData {
  title: string
  slug: string
  provinceSlug: string
  population?: number
  medianRent?: number
  heroImageUrl?: string
  heroImageAlt?: string
}

export interface PropertyCardData {
  title: string
  slug: string
  citySlug: string
  provinceSlug: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft?: number
  address: string
  imageUrl?: string
  imageAlt?: string
  available: boolean
}

export interface TestimonialData {
  name: string
  city: string
  quote: string
  outcome?: string
}

export interface HowItWorksStep {
  stepNumber: number
  title: string
  description: string
}

export interface PainPointData {
  problem: string
  solution: string
}

export interface BenefitData {
  title: string
  description: string
  icon?: string
}

// Block component prop types
export interface HeroBlockProps {
  headline: string
  subheadline?: string
  cta1?: CtaButton
  cta2?: CtaButton
  backgroundImageUrl?: string
  backgroundImageAlt?: string
  priority?: boolean // true for above-fold images (LCP)
}

export interface CTABannerBlockProps {
  headline: string
  description?: string
  primaryCta: CtaButton
  secondaryCta?: CtaButton
  variant?: 'default' | 'form' // form variant shows email input
}

export interface FAQBlockProps {
  questions: FaqItem[]
  title?: string
  schemaEnabled?: boolean // inject FAQPage JSON-LD
}

export interface ServiceGridBlockProps {
  services: ServiceCardData[]
  columns?: 2 | 3 | 4
}

export interface CityGridBlockProps {
  cities: CityCardData[]
  province?: string
  columns?: 2 | 3 | 4
}

export interface PropertyCardBlockProps {
  listings: PropertyCardData[]
}

export interface TrustBlockProps {
  testimonials?: TestimonialData[]
  stats?: Array<{ label: string; value: string }>
  variant?: 'testimonials' | 'stats' | 'combined'
}

export interface HowItWorksBlockProps {
  steps: HowItWorksStep[]
  title?: string
}

export interface PainPointBlockProps {
  painPoints: PainPointData[]
  title?: string
}

export interface BenefitsBlockProps {
  benefits: BenefitData[]
  title?: string
  columns?: 2 | 3 | 4
}
