import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SiloPageTemplate } from '@/components/blocks/silo-page-template'
import {
  getSiloIndustry,
  SILO_INDUSTRIES,
  SILO_INDUSTRY_SLUGS,
} from '@/data/silo-industries'

export async function generateStaticParams() {
  return SILO_INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = getSiloIndustry(slug)
  if (!industry) return { title: 'Industry not found' }

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/industries/${industry.slug}/` },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: `https://movesmartrentals.com/industries/${industry.slug}/`,
      images: ['/og-default.png?v=2'],
    },
    twitter: {
      card: 'summary_large_image',
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const industry = getSiloIndustry(slug)
  if (!industry) notFound()

  const related = SILO_INDUSTRIES.filter((i) => i.slug !== industry.slug)
    .slice(0, 3)
    .map((i) => ({
      title: i.title,
      href: `/industries/${i.slug}/`,
      description: i.navDescription,
    }))

  return (
    <SiloPageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Industries', href: '/industries/' },
        { label: industry.title, href: `/industries/${industry.slug}/` },
      ]}
      heroKicker={industry.heroKicker}
      heroEyebrow={industry.heroEyebrow}
      heroHeadline={industry.heroHeadline}
      heroLede={industry.heroLede}
      intro={industry.intro}
      sections={[
        {
          title: 'Where landlords like you get stuck',
          items: industry.challenges.map((c) => ({ title: c.title, body: c.body })),
        },
        {
          title: 'Why we are the right fit',
          items: industry.fit.map((f) => ({ title: f.title, body: f.body })),
        },
      ]}
      process={industry.process}
      audience={industry.outcomes}
      faq={industry.faq}
      closing={industry.closing}
      related={related}
    />
  )
}
