import type { Metadata } from 'next'
import type { SeoFields } from '@/types/sanity'

/**
 * Generate consistent Next.js Metadata for any page.
 * Produces canonical tags (SEO-04) and Open Graph fields (SEO-05)
 * from CMS seo data with fallback defaults.
 */
export function generatePageMetadata({
  seo,
  path,
  fallbackTitle,
  fallbackDescription,
}: {
  seo?: SeoFields
  path: string
  fallbackTitle: string
  fallbackDescription: string
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle
  const description = seo?.metaDescription || fallbackDescription
  const canonicalPath = path.endsWith('/') ? path : `${path}/`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      images: seo?.ogImage
        ? [{ url: seo.ogImage.asset._ref }]
        : ['/og-default.png'],
    },
  }
}
