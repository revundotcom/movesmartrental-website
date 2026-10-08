import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildFaqPageSchema } from '@/lib/schema-builders'
import { FAQCategoryBlock } from '../faq-client'
import { FAQ_CATEGORIES } from '../faq-data'

export function generateStaticParams() {
  return FAQ_CATEGORIES.map((cat) => ({
    category: cat.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = FAQ_CATEGORIES.find((c) => c.id === category)
  if (!cat) return {}
  
  return {
    title: `${cat.label} FAQ | MoveSmart Rentals`,
    description: cat.deck,
    alternates: {
      canonical: `/faq/${cat.id}/`,
    },
    openGraph: {
      title: `${cat.label} FAQ | MoveSmart Rentals`,
      description: cat.deck,
      images: [{ url: '/og-share.png', width: 1200, height: 630, alt: 'MoveSmart Rentals FAQ' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.label} FAQ | MoveSmart Rentals`,
      description: cat.deck,
      images: ['/og-share.png'],
    },
  }
}

export default async function CategoryFAQPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = FAQ_CATEGORIES.find((c) => c.id === category)
  
  if (!cat) {
    notFound()
  }

  const faqPageSchema = buildFaqPageSchema({ questions: cat.questions })

  return (
    <main>
      <JsonLd data={faqPageSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'FAQ', href: '/faq/' },
            { label: cat.label, href: `/faq/${cat.id}/` },
          ]}
        />
      </div>

      <PageHeroBlock
        kicker="FAQ"
        eyebrow={cat.label}
        headline={cat.heading}
        accentLastWord
        lede={cat.deck}
        theme="light"
      />

      <div className="bg-white pb-16 sm:pb-24">
        {/* We reuse the block from the main FAQ, but remove the top border and padding adjustments if needed. 
            The FAQCategoryBlock expects an index for styling. */}
        <FAQCategoryBlock category={cat} index={0} />
      </div>
    </main>
  )
}
