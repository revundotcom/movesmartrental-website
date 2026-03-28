import { groq } from 'next-sanity'

/** Aggregated FAQ from multiple document types for the FAQ hub page */
export const AGGREGATED_FAQ_QUERY = groq`
  {
    "faqs": [
      ...*[_type == "service" && defined(faq)] {
        "items": faq[] {
          question,
          answer,
          "source": "service",
          "sourceTitle": ^.title,
          "sourceSlug": ^.slug.current
        }
      }.items[],
      ...*[_type == "cityService" && defined(faq)] {
        "items": faq[] {
          question,
          answer,
          "source": "cityService",
          "sourceTitle": ^.cityTitle + " - " + ^.service->title,
          "sourceSlug": ^.citySlug
        }
      }.items[]
    ]
  }
`
