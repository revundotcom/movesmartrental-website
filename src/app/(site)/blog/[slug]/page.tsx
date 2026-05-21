import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { BRAND } from '@/lib/brand-constants'
import { SILO_BLOGS, type SiloPage } from '@/lib/silo'

type Params = { params: Promise<{ slug: string }> }

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return SILO_BLOGS.map((p) => ({
    slug: p.url.replace(/^\/blog\//, ''),
  }))
}

function findBlog(slug: string): SiloPage | undefined {
  return SILO_BLOGS.find((p) => p.url === `/blog/${slug}`)
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params
  const page = findBlog(slug)
  if (!page) return { title: 'Guide not found | MoveSmart Rentals' }

  const title = `${page.title} | ${BRAND.name}`
  return {
    title,
    description: page.meta_description,
    alternates: { canonical: `${BRAND.url}${page.url}/` },
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url: `${BRAND.url}${page.url}/`,
      siteName: BRAND.name,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description,
    },
  }
}

function renderBodyToHtml(md: string): string {
  return md
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith('## ')) {
        return `<h2 class="mt-8 mb-3 text-xl font-semibold">${block.replace(/^##\s*/, '')}</h2>`
      }
      return `<p>${block.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
}

export default async function SiloBlogPage({ params }: Params) {
  const { slug } = await params
  const page = findBlog(slug)
  if (!page) notFound()

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.meta_description,
    mainEntityOfPage: `${BRAND.url}${page.url}/`,
    author: { '@type': 'Organization', name: BRAND.name, url: BRAND.url },
    publisher: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
      logo: { '@type': 'ImageObject', url: `${BRAND.url}${BRAND.logo}` },
    },
  }

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/resources/' },
    { label: page.title, href: `${page.url}/` },
  ]

  return (
    <>
      <JsonLd data={[articleSchema]} />
      <article className="bg-white">
        <header className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <BreadcrumbNav crumbs={crumbs} />
            <p className="mt-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              {page.city}, {page.state_abbr} guide
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">
              {page.title}
            </h1>
            <p className="mt-3 text-neutral-700">{page.meta_description}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="prose prose-neutral max-w-none">
            {page.intro && <p>{page.intro}</p>}
            {page.body && (
              <div
                dangerouslySetInnerHTML={{
                  __html: renderBodyToHtml(page.body),
                }}
              />
            )}
          </div>

          {page.key_takeaways && page.key_takeaways.length > 0 && (
            <aside className="mt-10 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
              <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                Key takeaways
              </p>
              <ul className="list-inside list-disc space-y-1 text-neutral-800">
                {page.key_takeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </aside>
          )}

          {page.authority_citation && page.authority_citation.url && (
            <aside className="mt-6 text-sm text-neutral-700">
              Reference:{' '}
              <a
                href={page.authority_citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
              >
                {page.authority_citation.name}
              </a>
              {page.authority_citation.context && (
                <span> {page.authority_citation.context}</span>
              )}
            </aside>
          )}

          {(page.city_hub_url || page.service_in_city_url) && (
            <section className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {page.city_hub_url && (
                <Link
                  href={`${page.city_hub_url}/`}
                  className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
                >
                  <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                    City hub
                  </p>
                  <p className="font-semibold text-neutral-900">
                    {page.city}, {page.state_abbr}
                  </p>
                </Link>
              )}
              {page.service_in_city_url && (
                <Link
                  href={`${page.service_in_city_url}/`}
                  className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
                >
                  <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                    Service in this city
                  </p>
                  <p className="font-semibold text-neutral-900">
                    {page.service_label}
                  </p>
                </Link>
              )}
            </section>
          )}
        </div>
      </article>
    </>
  )
}
