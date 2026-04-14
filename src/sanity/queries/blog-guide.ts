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

/** Blog/guide listing for resources hub, optionally filtered by category */
export const BLOG_GUIDE_LIST_QUERY = groq`
  *[_type == "blogGuide"
    && select(
      defined($category) => category == $category,
      true
    )
  ] | order(publishing.publishedAt desc) {
    title,
    "slug": slug.current,
    category,
    excerpt,
    intro,
    primaryKeyword,
    secondaryKeywords,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt,
    author,
    publishDate,
    "publishedAt": publishing.publishedAt,
    "cityTitle": city->title,
    "serviceTitle": service->title
  }
`

/** Full blog/guide page query */
export const BLOG_GUIDE_PAGE_QUERY = groq`
  *[_type == "blogGuide" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    category,
    // SEO / Keywords
    primaryKeyword,
    secondaryKeywords,
    // Authorship
    author,
    publishDate,
    updateDate,
    // Content
    intro,
    excerpt,
    mainBody,
    // Legacy body alias (kept for back-compat)
    body,
    faqItems,
    // Links
    "city": city-> {
      _id,
      title,
      "slug": slug.current,
      "provinceSlug": province->slug.current
    },
    "service": service-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon
    },
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
    // Media
    heroImage {
      asset,
      alt,
      hotspot
    },
    ${SEO_PROJECTION},
    ${PUBLISHING_PROJECTION}
  }
`

/** All blog/guide slugs for generateStaticParams */
export const BLOG_GUIDE_PARAMS_QUERY = groq`
  *[_type == "blogGuide" && defined(slug.current)] {
    "slug": slug.current
  }
`
