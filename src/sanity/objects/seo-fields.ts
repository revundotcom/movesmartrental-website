import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO page title (50-60 characters)',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      description: 'Meta description (140-160 characters)',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Primary image used in listings, cards, and social previews if OG image is not set.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      description: 'Single target keyword this page ranks for.',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Supporting variants and long-tail keywords.',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary',
      type: 'text',
      rows: 3,
      description: 'Concise 200-char summary for AI/voice assistants. Pattern: "MoveSmart Rentals provides [service] in [City], [Province]. As of [date], [key stat]. Zero upfront cost, success-fee model."',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'schemaFields',
      title: 'Schema.org Fields',
      type: 'object',
      description: 'Structured data overrides rendered as JSON-LD on the page.',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'schemaType',
          title: 'Primary Schema Type',
          type: 'string',
          options: {
            list: [
              { title: 'LocalBusiness', value: 'LocalBusiness' },
              { title: 'Service', value: 'Service' },
              { title: 'Article', value: 'Article' },
              { title: 'FAQPage', value: 'FAQPage' },
              { title: 'WebPage', value: 'WebPage' },
              { title: 'BreadcrumbList', value: 'BreadcrumbList' },
              { title: 'RealEstateListing', value: 'RealEstateListing' },
            ],
          },
        }),
        defineField({
          name: 'includeFaqSchema',
          title: 'Include FAQ Schema',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'includeBreadcrumbSchema',
          title: 'Include Breadcrumb Schema',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'includeLocalBusinessSchema',
          title: 'Include LocalBusiness Schema',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'customJsonLd',
          title: 'Custom JSON-LD (raw)',
          type: 'text',
          rows: 6,
          description: 'Advanced: raw JSON-LD injected into <head>. Leave empty unless you know what you are doing.',
        }),
      ],
    }),
  ],
})
