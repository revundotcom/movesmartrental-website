import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/json-ld'
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { FAQBlock } from '@/components/blocks/faq-block'
import { BRAND } from '@/lib/brand-constants'
import {
  FLAT_PAGES,
  SILO_BLOGS,
  SILO_PAGES,
  type SiloPage,
} from '@/lib/silo'

type Params = { params: Promise<{ silo: string }> }

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return FLAT_PAGES.map((p) => ({ silo: p.url.replace(/^\//, '') }))
}

function findFlatPage(slug: string): SiloPage | undefined {
  return FLAT_PAGES.find((p) => p.url === `/${slug}`)
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) return { title: 'Page not found | MoveSmart Rentals' }

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
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta_description,
    },
  }
}

function buildGraph(page: SiloPage): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BRAND.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: `${BRAND.url}${page.url}/`,
      },
    ],
  })

  if (page.type === 'city_hub') {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${BRAND.url}${page.url}/#localbusiness`,
      name: `${BRAND.name} ${page.city}, ${page.state_abbr}`,
      url: `${BRAND.url}${page.url}/`,
      telephone: BRAND.phone,
      areaServed: {
        '@type': 'City',
        name: page.city,
        containedInPlace: { '@type': 'State', name: page.state },
      },
      ...(typeof page.lat === 'number' && typeof page.lng === 'number'
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: page.lat,
              longitude: page.lng,
            },
          }
        : {}),
    })
  } else if (page.type === 'service_in_city') {
    graph.push({
      '@type': 'Service',
      '@id': `${BRAND.url}${page.url}/#service`,
      name: `${page.service_label} in ${page.city}, ${page.state_abbr}`,
      provider: {
        '@type': 'LocalBusiness',
        name: BRAND.name,
        url: BRAND.url,
      },
      areaServed: { '@type': 'City', name: page.city },
      description: page.service_blurb || page.meta_description,
    })
  }

  if (page.faq && page.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return graph
}

export default async function SiloFlatPage({ params }: Params) {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) notFound()

  const cityPages = SILO_PAGES.filter((p) => p.city_key === page.city_key)
  const siblingServices = cityPages.filter(
    (p) => p.type === 'service_in_city' && p.url !== page.url,
  )
  const cityHub = cityPages.find((p) => p.type === 'city_hub')
  const cityBlogs = SILO_BLOGS.filter((p) => p.city_key === page.city_key)

  const crumbs = [
    { label: 'Home', href: '/' },
    cityHub && cityHub.url !== page.url
      ? { label: page.city, href: `${cityHub.url}/` }
      : null,
    {
      label:
        page.type === 'service_in_city' && page.service_label
          ? page.service_label
          : page.title,
      href: `${page.url}/`,
    },
  ].filter(Boolean) as Array<{ label: string; href: string }>

  return (
    <>
      <JsonLd data={buildGraph(page)} />

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <BreadcrumbNav crumbs={crumbs} />
          <p className="mt-4 text-xs font-medium tracking-wider text-neutral-500 uppercase">
            {page.type === 'city_hub'
              ? `${page.city}, ${page.state_abbr} coverage`
              : `${page.service_label || 'Service'} in ${page.city}, ${page.state_abbr}`}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900 md:text-4xl">
            {page.title}
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-700">
            {page.meta_description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Call {BRAND.phoneDisplay}
            </a>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-900"
            >
              Request a rental analysis
            </Link>
          </div>
        </div>
      </section>

      {(page.intro || page.local_context || page.service_details) && (
        <section className="bg-white">
          <div className="prose prose-neutral mx-auto max-w-3xl px-6 py-12">
            {page.intro && <p>{page.intro}</p>}
            {page.local_context && <p>{page.local_context}</p>}
            {page.service_details && <p>{page.service_details}</p>}
          </div>
        </section>
      )}

      {(page.authority_citations || page.authority_citation) && (
        <section className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-10">
            <p className="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Local authority sources
            </p>
            <h2 className="mb-4 text-xl font-semibold text-neutral-900">
              Cited references for this market.
            </h2>
            <ul className="space-y-3">
              {(
                (page.authority_citations || []).concat(
                  page.authority_citation ? [page.authority_citation] : [],
                ) as Array<{ name: string; url: string; context?: string }>
              ).map((a, i) =>
                a && a.url ? (
                  <li key={i}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-neutral-900 underline"
                    >
                      {a.name}
                    </a>
                    {a.context && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {a.context}
                      </p>
                    )}
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </section>
      )}

      {page.type === 'city_hub' && siblingServices.length > 0 && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <p className="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Service lines in this city
            </p>
            <h2 className="mb-6 text-xl font-semibold text-neutral-900">
              What we run in {page.city}.
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblingServices.map((s) => (
                <li key={s.url}>
                  <Link
                    href={`${s.url}/`}
                    className="block rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
                  >
                    <p className="font-semibold text-neutral-900">
                      {s.service_label}
                    </p>
                    {s.service_blurb && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {s.service_blurb}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.type === 'service_in_city' && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 lg:grid-cols-3">
            {cityHub && (
              <Link
                href={`${cityHub.url}/`}
                className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 transition hover:border-neutral-900"
              >
                <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  City hub
                </p>
                <p className="font-semibold text-neutral-900">
                  {cityHub.title}
                </p>
              </Link>
            )}
            {page.national_service_url && (
              <Link
                href={page.national_service_url}
                className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
              >
                <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  National service line
                </p>
                <p className="font-semibold text-neutral-900">
                  {page.service_label}
                </p>
              </Link>
            )}
            {siblingServices.slice(0, 1).map((s) => (
              <Link
                key={s.url}
                href={`${s.url}/`}
                className="rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
              >
                <p className="mb-2 text-xs font-medium tracking-wider text-neutral-500 uppercase">
                  Related in {page.city}
                </p>
                <p className="font-semibold text-neutral-900">
                  {s.service_label}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {page.faq && page.faq.length > 0 && (
        <FAQBlock
          title="Common Questions, Direct Answers"
          schemaEnabled={false}
          questions={page.faq.map((f) => ({ question: f.q, answer: f.a }))}
        />
      )}

      {cityBlogs.length > 0 && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <p className="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              Local guides
            </p>
            <h2 className="mb-6 text-xl font-semibold text-neutral-900">
              More from {page.city}.
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cityBlogs.slice(0, 9).map((b) => (
                <li key={b.url}>
                  <Link
                    href={`${b.url}/`}
                    className="block rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
                  >
                    <p className="font-semibold text-neutral-900">{b.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
