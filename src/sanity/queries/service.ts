import { groq } from 'next-sanity'

/**
 * Shared SEO projection fragment.
 * Keep in sync with src/sanity/objects/seo-fields.ts
 */
const SEO_PROJECTION = `
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset,
      alt,
      hotspot
    },
    featuredImage {
      asset,
      alt,
      hotspot
    },
    keywords,
    primaryKeyword,
    secondaryKeywords,
    aiSummary,
    schemaFields {
      schemaType,
      includeFaqSchema,
      includeBreadcrumbSchema,
      includeLocalBusinessSchema,
      customJsonLd
    }
  }
`

/**
 * Shared Publishing projection fragment.
 * Keep in sync with src/sanity/objects/publishing-controls.ts
 */
const PUBLISHING_PROJECTION = `
  publishing {
    canonicalSetting,
    canonicalOverride,
    indexControl,
    noindex,
    sitemapInclude,
    includedInSitemap,
    redirectTo,
    redirectFrom,
    author,
    publishedAt,
    updatedAt
  }
`

/** Full service data for service detail page (includes available cities) */
export const SERVICE_PAGE_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    serviceName,
    slug,
    shortDescription,
    icon,
    audience,
    order,
    heroImage {
      asset,
      alt,
      hotspot
    },
    // Legacy field (kept for back-compat)
    body,
    faq,
    // New content fields (contract §20.7)
    metaTitle,
    metaDescription,
    heroHeading,
    heroSubheading,
    introBody,
    benefits,
    howItWorks,
    faqItems,
    pricingSummary,
    ctaText,
    ctaFormVariant,
    "relatedServiceLinks": relatedServiceLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon
    },
    "relatedCityLinks": relatedCityLinks[]-> {
      _id,
      title,
      "slug": slug.current,
      "provinceSlug": province->slug.current
    },
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION},
    "availableCities": *[_type == "cityService" && service._ref == ^._id] {
      "title": city->title,
      "slug": city->slug.current,
      "provinceSlug": city->province->slug.current,
      "population": city->population,
      "medianRent": city->medianRent,
      "heroImageUrl": city->heroImage.asset->url,
      "heroImageAlt": city->heroImage.alt
    }
  }
`

/** All services for generateStaticParams */
export const SERVICE_LIST_QUERY = groq`
  *[_type == "service"] {
    slug
  }
`

/** All services ordered for services hub page */
export const SERVICE_ALL_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    audience
  }
`

/** Owner-facing services for owners hub (audience is 'owner' or 'both') */
export const SERVICE_OWNER_QUERY = groq`
  *[_type == "service" && (audience == "owner" || audience == "both")] | order(order asc) {
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    audience
  }
`
