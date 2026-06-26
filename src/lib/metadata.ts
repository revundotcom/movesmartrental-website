import type { Metadata } from 'next'
import type { SeoFields } from '@/types/sanity'
import { OG_IMAGE_URL } from './brand-constants'

/**
 * Generate consistent Next.js Metadata for any page.
 * Produces canonical tags (SEO-04) and Open Graph fields (SEO-05)
 * from CMS seo data with fallback defaults.
 *
 * The og:image fallback uses OG_IMAGE_URL (versioned per deploy via the
 * git commit SHA) so social platforms auto-refresh their link-preview
 * cache on every deploy. See brand-constants.ts for the rationale.
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

  const ogImageUrl = (seo?.ogImage?.asset as { url?: string } | undefined)?.url || OG_IMAGE_URL
  const ogImageAlt = seo?.ogImage?.alt || title

  return {
    title,
    description,
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, alt: ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [{ url: ogImageUrl, alt: ogImageAlt }],
    },
  }
}
