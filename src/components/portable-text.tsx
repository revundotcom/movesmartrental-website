import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

// ---------------------------------------------------------------------------
// Custom Component Definitions
// ---------------------------------------------------------------------------

interface LinkMark {
  _type: 'link'
  _key: string
  href: string
  blank?: boolean
}

/** Portable Text component configuration with custom renderers */
export const portableTextComponents: PortableTextComponents = {
  types: {
    // Image blocks are intentionally not rendered here. Guides do not
    // currently embed images via PortableText, and the previous Sanity CDN
    // URL builder has been removed along with the CMS integration.
    image: () => null,
  },

  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || '#'
      const isExternal = value?.blank || href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary underline hover:text-primary/80"
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: PortableTextMarkComponentProps) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: PortableTextMarkComponentProps) => (
      <em>{children}</em>
    ),
    underline: ({ children }: PortableTextMarkComponentProps) => (
      <span className="underline">{children}</span>
    ),
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/30 pl-4 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

// ---------------------------------------------------------------------------
// PortableTextBody Component
// ---------------------------------------------------------------------------

interface PortableTextBodyProps {
  value: PortableTextBlock[] | PortableTextBlock
}

/**
 * Shared Portable Text renderer with custom components for CMS body content.
 * Used by blog, guide, case study, comparison, city-service localBody, service body, etc.
 *
 * This is a Server Component (no 'use client' directive).
 */
export function PortableTextBody({ value }: PortableTextBodyProps) {
  if (!value) return null

  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
