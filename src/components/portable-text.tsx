import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'

// ---------------------------------------------------------------------------
// Sanity Image URL Helper
// ---------------------------------------------------------------------------

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

/**
 * Build a Sanity CDN image URL from an asset reference.
 * Reference format: "image-{id}-{WxH}-{ext}" -> "{id}-{WxH}.{ext}"
 */
function sanityImageUrl(ref: string): string {
  // ref looks like "image-abc123-800x400-png"
  const parts = ref.replace('image-', '').split('-')
  const ext = parts.pop()
  const rest = parts.join('-')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${rest}.${ext}`
}

// ---------------------------------------------------------------------------
// Custom Component Definitions
// ---------------------------------------------------------------------------

interface SanityImageValue {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

interface LinkMark {
  _type: 'link'
  _key: string
  href: string
}

/** Portable Text component configuration with custom renderers */
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<SanityImageValue>) => {
      if (!value?.asset?._ref) return null
      const url = sanityImageUrl(value.asset._ref)
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ''}
            width={800}
            height={400}
            className="w-full rounded-lg"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },

  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
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
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
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
