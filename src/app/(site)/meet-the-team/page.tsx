import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'

import { Team } from '../about/about-interactive'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'Meet the Team | MoveSmart Rentals Leadership',
  description:
    'Meet the team leading MoveSmart Rentals. Operators, leasing leads, and client-success specialists running the leasing phase for landlords and institutional rental operators across Canada and the United States.',
  alternates: { canonical: '/meet-the-team/' },
  openGraph: {
    title: 'Meet the Team | MoveSmart Rentals',
    description:
      'The operators, leasing leads, and client-success specialists running the leasing phase for serious rental operators.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet the Team | MoveSmart Rentals',
    description:
      'The operators, leasing leads, and client-success specialists running the leasing phase for serious rental operators.',
  },
}

const breadcrumbSchema = buildBreadcrumbListSchema({
  crumbs: [
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about/` },
    { name: 'Meet the Team', url: `${SITE_URL}/meet-the-team/` },
  ],
})

export default function MeetTheTeamPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about/' },
            { label: 'Meet the Team', href: '/meet-the-team/' },
          ]}
        />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <PageHeroBlock
        kicker="Our people"
        eyebrow="Meet the team"
        headline="The team behind every owner-file"
        accentLastWord
        lede="MoveSmart Rentals is built on operators. Leasing leads, qualification analysts, owner-success managers, and move-in coordinators who run the leasing phase end-to-end so landlords and institutional rental operators do not have to."
        cta1={{ label: 'Meet our leadership', href: '#team' }}
        cta2={{ label: 'Join the team', href: '#join' }}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="MoveSmart team collaborating around a wooden meeting table"
      />

      {/* ── INTRO: how the team is organised ─────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                How we are built
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                A bench of operators, not a roster of brokers.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-slate-700 lg:col-span-7">
              <p>
                The rental market is busy. Brokers are wired to sell. Property
                managers are wired to operate the years after move-in. Almost
                nobody is purpose-built for the leasing phase itself — the
                short window between vacancy and signed lease that quietly
                decides how the next twelve months go.
              </p>
              <p>
                MoveSmart was built for that window. Our team is structured
                around it: a leasing desk that runs intake and showings, a
                qualification desk that screens like a bank, an owner-success
                desk that holds the relationship, and a move-in desk that
                runs the last mile.
              </p>
              <p>
                Every owner-file has a named lead. Every handoff is logged.
                Nothing falls through the cracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP GRID (re-uses the canonical Team directory) ─ */}
      <Team />

      {/* ── JOIN THE TEAM ────────────────────────────────────────── */}
      <section
        id="join"
        className="relative scroll-mt-24 overflow-hidden bg-brand-navy py-16 text-white sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Join the team
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                We are hiring across North America.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                We are growing the leasing desk, the qualification team, the
                field showings function, and our owner-success bench across
                Canadian and US markets. If you take property management
                seriously and want to ship work you are proud of, we want to
                meet you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/careers/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-[var(--brand-emerald-hover)]"
                >
                  View open roles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="mailto:careers@movesmartrentals.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
                >
                  General application
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span className="text-sm leading-relaxed text-white/85">
                    Performance-backed comp with clear targets and real upside.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span className="text-sm leading-relaxed text-white/85">
                    Educational reimbursement and professional designation
                    fees covered.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span className="text-sm leading-relaxed text-white/85">
                    Hybrid schedule. Modern collaboration tools so remote and
                    in-office teams move at the same speed.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-gold" />
                  <span className="text-sm leading-relaxed text-white/85">
                    Paid community-care days. We invest in the cities we
                    operate in.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
