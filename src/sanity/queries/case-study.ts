import { groq } from 'next-sanity'

/** Single case study page with resolved city reference */
export const CASE_STUDY_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    clientName,
    outcome,
    body,
    heroImage {
      asset,
      alt,
      hotspot
    },
    "city": city-> {
      _id,
      title,
      slug,
      "provinceSlug": province->slug.current
    },
    seo,
    publishing
  }
`

/** All case studies for listing page */
export const CASE_STUDY_LIST_QUERY = groq`
  *[_type == "caseStudy"] | order(title asc) {
    title,
    "slug": slug.current,
    clientName,
    outcome,
    "cityTitle": city->title,
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": heroImage.alt
  }
`
