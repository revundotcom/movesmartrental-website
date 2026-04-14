/**
 * Guides Content Library
 *
 * Central registry for long-form editorial guides served from the MoveSmart
 * Resources hub (/resources/[slug]/). Each guide is authored as a standalone
 * TypeScript module exporting a `GuideContent` object; this file aggregates
 * them into a lookup map for the route handler and the /resources/ index.
 *
 * Voice: Strategic, Professional, Concierge - MoveSmart is a white-glove
 * leasing brokerage, not a property management firm.
 */

export interface GuideContent {
  slug: string
  title: string
  /** 50-60 characters, used for <title> */
  seoTitle: string
  /** 140-160 characters, used for meta description */
  metaDescription: string
  category: 'landlord' | 'tenant' | 'institutional' | 'market'
  /** Short audience descriptor - e.g. "Ontario landlords evaluating tenants" */
  audience: string
  primaryKeyword: string
  secondaryKeywords: string[]
  /** Rough estimate in minutes */
  readTimeMinutes: number
  /** ISO date (YYYY-MM-DD) */
  publishDate: string
  author: string
  hero: {
    eyebrow: string
    /** H1 headline - last word is typically accented in the renderer */
    headline: string
    /** 2-3 sentence lede */
    lede: string
  }
  tableOfContents: Array<{ id: string; label: string }>
  sections: Array<{
    /** Anchor id, must match an entry in tableOfContents */
    id: string
    heading: string
    /** Long-form body. Markdown is permitted (bold, italic, lists, ### sub-headings). */
    body: string
    subsections?: Array<{ heading: string; body: string }>
    callout?: { label: string; body: string }
  }>
  faqItems: Array<{ question: string; answer: string }>
  /** Slugs of 3 related guides (may reference guides that do not yet exist) */
  relatedGuides: string[]
  /** Slugs from /services/ - see src/data/services-content.ts */
  relatedServices: string[]
  downloadOffer?: {
    label: string
    description: string
    ctaLabel: string
    ctaHref: string
  }
}

import { TENANT_SCREENING_ONTARIO } from './tenant-screening-ontario'
import { HOW_TO_PRICE_YOUR_RENTAL } from './how-to-price-your-rental'
import { RENT_GUARANTEE_101 } from './rent-guarantee-101'
import { HOW_TO_AVOID_BAD_TENANTS } from './how-to-avoid-bad-tenants'
import { MOVING_DAY_COORDINATION } from './moving-day-coordination'
import { INSTITUTIONAL_RFP_TEMPLATE } from './institutional-rfp-template'

/** Ordered list of guide slugs - drives the /resources index rendering order. */
export const GUIDE_SLUGS: string[] = [
  'tenant-screening-ontario',
  'how-to-price-your-rental',
  'rent-guarantee-101',
  'how-to-avoid-bad-tenants',
  'moving-day-coordination',
  'institutional-rfp-template',
]

/** Lookup map consumed by /resources/[slug]/page.tsx. */
export const GUIDES: Record<string, GuideContent> = {
  'tenant-screening-ontario': TENANT_SCREENING_ONTARIO,
  'how-to-price-your-rental': HOW_TO_PRICE_YOUR_RENTAL,
  'rent-guarantee-101': RENT_GUARANTEE_101,
  'how-to-avoid-bad-tenants': HOW_TO_AVOID_BAD_TENANTS,
  'moving-day-coordination': MOVING_DAY_COORDINATION,
  'institutional-rfp-template': INSTITUTIONAL_RFP_TEMPLATE,
}

export function getGuide(slug: string): GuideContent | null {
  return GUIDES[slug] ?? null
}

export function listGuides(): GuideContent[] {
  return GUIDE_SLUGS.map((slug) => GUIDES[slug]).filter(
    (g): g is GuideContent => Boolean(g),
  )
}
