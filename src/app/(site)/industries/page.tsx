import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { SILO_INDUSTRIES } from '@/data/silo-industries'

export const metadata: Metadata = {
  title: 'Industries We Serve | Leasing for Every Owner Profile | MoveSmart Rentals',
  description:
    'Leasing and tenant placement for every owner profile. Individual landlords, portfolio owners, developers, real estate investors, condo owners, and multi family operators across North America.',
  alternates: { canonical: '/industries/' },
  openGraph: {
    title: 'Industries We Serve | MoveSmart Rentals',
    description:
      'Tenant placement and lease execution for every type of rental property owner across the US and Canada.',
    images: ['/og-default.png?v=2'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | MoveSmart Rentals',
    description:
      'Leasing for individual landlords, portfolio owners, developers, investors, condo owners, and multi family operators.',
  },
}

export default function IndustriesHub() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Industries', href: '/industries/' },
          ]}
        />
      </div>

      <section className="relative isolate overflow-hidden bg-[#0B1D3A] py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top right, rgba(16,185,129,0.25), transparent 60%), radial-gradient(ellipse at bottom left, rgba(16,185,129,0.15), transparent 60%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
            Industries
          </p>
          <h1 className="mt-4 font-display text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Leasing for every owner profile
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            Whether you own one condo, a portfolio of fifty units, or a 500 unit lease up coming online next quarter — we have a playbook built for you. Pick your profile to see how we work together.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SILO_INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}/`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-[#FBFAF6] p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                  For
                </p>
                <h2 className="font-display text-xl font-normal text-[#0B1D3A] group-hover:text-emerald-700 sm:text-2xl">
                  {industry.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {industry.navDescription}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                  See the playbook
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1D3A] py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-normal text-white sm:text-4xl">
            Not sure which fits? Let&apos;s talk.
          </h2>
          <p className="mt-4 text-base text-white/80">
            Tell us about your portfolio and we will recommend the right approach.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact/?type=owner"
              className="inline-flex items-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              Book a consultation
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
