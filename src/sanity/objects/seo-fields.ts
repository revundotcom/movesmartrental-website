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
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary',
      type: 'text',
      rows: 3,
      description: 'Concise 200-char summary for AI/voice assistants. Pattern: "MoveSmart Rentals provides [service] in [City], [Province]. As of [date], [key stat]. Zero upfront cost, success-fee model."',
      validation: (Rule) => Rule.max(200),
    }),
  ],
})
