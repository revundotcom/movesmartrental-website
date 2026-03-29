import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province / State',
      type: 'reference',
      to: [{ type: 'province' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'number',
      description: '1=pre-render at build, 2=on-demand ISR, 3=future',
      options: {
        list: [
          { title: 'Tier 1 — Pre-render', value: 1 },
          { title: 'Tier 2 — On-demand ISR', value: 2 },
          { title: 'Tier 3 — Future', value: 3 },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'population',
      title: 'Population',
      type: 'number',
    }),
    defineField({
      name: 'medianRent',
      title: 'Median Rent',
      type: 'number',
    }),
    defineField({
      name: 'vacancyRate',
      title: 'Vacancy Rate',
      type: 'number',
    }),
    defineField({
      name: 'neighbourhoods',
      title: 'Neighbourhoods',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'transitInfo',
      title: 'Transit Information',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'description',
      title: 'Description',
      type: 'portableContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'publishing',
      title: 'Publishing Controls',
      type: 'publishingControls',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'province.title',
      media: 'heroImage',
    },
  },
})
