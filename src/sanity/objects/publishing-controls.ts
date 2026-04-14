import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publishingControls',
  title: 'Publishing Controls',
  type: 'object',
  fields: [
    defineField({
      name: 'canonicalOverride',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Optional absolute canonical. Leave empty for self-referencing canonical.',
    }),
    defineField({
      name: 'canonicalSetting',
      title: 'Canonical Setting',
      type: 'string',
      description: 'Controls how canonical is resolved when no override is present.',
      options: {
        list: [
          { title: 'Self (default)', value: 'self' },
          { title: 'Parent (category/service/city hub)', value: 'parent' },
          { title: 'Custom (use override URL above)', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'self',
    }),
    defineField({
      name: 'indexControl',
      title: 'Index Control',
      type: 'string',
      options: {
        list: [
          { title: 'Index (default)', value: 'index' },
          { title: 'Noindex', value: 'noindex' },
        ],
        layout: 'radio',
      },
      initialValue: 'index',
    }),
    defineField({
      name: 'noindex',
      title: 'Noindex (legacy boolean)',
      type: 'boolean',
      description: 'Deprecated. Prefer Index Control above. Kept for backward compatibility.',
      initialValue: false,
      hidden: true,
    }),
    defineField({
      name: 'sitemapInclude',
      title: 'Include in Sitemap',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'includedInSitemap',
      title: 'Include in Sitemap (legacy)',
      type: 'boolean',
      description: 'Deprecated alias. Prefer sitemapInclude.',
      initialValue: true,
      hidden: true,
    }),
    defineField({
      name: 'redirectTo',
      title: 'Redirect To',
      type: 'url',
      description: 'If set, this document 301-redirects to the URL above.',
    }),
    defineField({
      name: 'redirectFrom',
      title: 'Redirect From (legacy slugs)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Legacy slugs or paths that should 301 to this document.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Update Date',
      type: 'datetime',
      description: 'Auto-updated on save by a backing Studio action; can also be set manually.',
      readOnly: false,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Byline shown on the rendered page.',
    }),
  ],
})
