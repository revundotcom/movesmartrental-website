import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blogGuide',
  title: 'Blog / Guide',
  type: 'document',
  fieldsets: [
    { name: 'identity', title: 'Identity' },
    { name: 'seo', title: 'SEO & Keywords' },
    { name: 'authorship', title: 'Authorship' },
    { name: 'content', title: 'Content' },
    { name: 'links', title: 'Related Links' },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    // ---------- Identity ----------
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'identity',
      options: {
        list: [
          { title: 'Blog Post', value: 'blog' },
          { title: 'Guide', value: 'guide' },
          { title: 'Market Report', value: 'market-report' },
          { title: 'Legal Guide', value: 'legal-guide' },
        ],
      },
    }),

    // ---------- SEO & Keywords ----------
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      fieldset: 'seo',
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'seo',
    }),

    // ---------- Authorship ----------
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      fieldset: 'authorship',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      fieldset: 'authorship',
    }),
    defineField({
      name: 'updateDate',
      title: 'Update Date',
      type: 'datetime',
      description: 'Auto-updated on save by a Studio action; editable for backfills.',
      fieldset: 'authorship',
    }),

    // ---------- Content ----------
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 4,
      fieldset: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (legacy)',
      type: 'text',
      fieldset: 'content',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'mainBody',
      title: 'Main Body',
      type: 'portableContent',
      fieldset: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body (legacy alias)',
      type: 'portableContent',
      fieldset: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // ---------- Links ----------
    defineField({
      name: 'city',
      title: 'Primary City (legacy single-ref)',
      type: 'reference',
      to: [{ type: 'city' }],
      description: 'Optional - legacy single-city association. Prefer Related City Links.',
      fieldset: 'links',
    }),
    defineField({
      name: 'service',
      title: 'Primary Service (legacy single-ref)',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Optional - legacy single-service association. Prefer Related Service Links.',
      fieldset: 'links',
    }),
    defineField({
      name: 'relatedServiceLinks',
      title: 'Related Service Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'links',
    }),
    defineField({
      name: 'relatedCityLinks',
      title: 'Related City Links',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'city' }] }],
      fieldset: 'links',
    }),

    // ---------- Media ----------
    defineField({
      name: 'heroImage',
      title: 'Hero / Featured Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'media',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ---------- SEO & Publishing ----------
    defineField({ name: 'seo', title: 'SEO (OG image, keywords, schema fields)', type: 'seoFields', fieldset: 'seo' }),
    defineField({ name: 'publishing', title: 'Publishing Controls', type: 'publishingControls', fieldset: 'publishing' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
})
