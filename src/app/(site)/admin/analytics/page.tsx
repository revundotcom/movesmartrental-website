import type { Metadata } from 'next'
import {
  Activity,
  BarChart3,
  ExternalLink,
  FileText,
  Gauge,
  Globe,
  LineChart,
  Link2,
  MousePointerClick,
  PhoneCall,
  Search,
  Sparkles,
  Target,
  UserPlus,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { DashboardCard } from '@/components/admin/dashboard-card'
import { TrackedEventsTable } from '@/components/admin/tracked-events-table'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Analytics Dashboard - Internal',
  description:
    'Internal analytics navigation hub and tracked-events reference for the MoveSmart Rentals team.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

// External dashboard links. GA4 property / GSC property ID placeholders are
// read from env at build time so the hosting team can wire them without
// editing source. They fall back to the tool root when unset.
const GA4_PROPERTY_ID = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID
const GSC_PROPERTY_URL = process.env.NEXT_PUBLIC_GSC_PROPERTY_URL
const LOOKER_STUDIO_URL = process.env.NEXT_PUBLIC_LOOKER_STUDIO_URL

const QUICK_LINKS = [
  {
    label: 'Google Analytics 4',
    subtext: GA4_PROPERTY_ID
      ? `Property ${GA4_PROPERTY_ID} · sessions, events, conversions`
      : 'Connect NEXT_PUBLIC_GA4_PROPERTY_ID to deep-link to property',
    href: GA4_PROPERTY_ID
      ? `https://analytics.google.com/analytics/web/#/p${GA4_PROPERTY_ID}/reports/intelligenthome`
      : 'https://analytics.google.com/',
    icon: <BarChart3 className="size-4" aria-hidden="true" />,
    accent: 'emerald' as const,
  },
  {
    label: 'Google Search Console',
    subtext: GSC_PROPERTY_URL
      ? `${GSC_PROPERTY_URL} · rankings, indexed pages, queries`
      : 'Rankings, indexed pages, and top queries',
    href: GSC_PROPERTY_URL
      ? `https://search.google.com/search-console?resource_id=${encodeURIComponent(GSC_PROPERTY_URL)}`
      : 'https://search.google.com/search-console',
    icon: <Search className="size-4" aria-hidden="true" />,
    accent: 'gold' as const,
  },
  {
    label: 'Bing Webmaster Tools',
    subtext: 'Bing / Copilot index coverage and backlinks',
    href: 'https://www.bing.com/webmasters',
    icon: <Globe className="size-4" aria-hidden="true" />,
    accent: 'navy' as const,
  },
  {
    label: 'Looker Studio',
    subtext: LOOKER_STUDIO_URL
      ? 'Client-ready dashboard blend (GA4 + GSC)'
      : 'Connect NEXT_PUBLIC_LOOKER_STUDIO_URL for the blended report',
    href: LOOKER_STUDIO_URL ?? 'https://lookerstudio.google.com/',
    icon: <LineChart className="size-4" aria-hidden="true" />,
    accent: 'emerald' as const,
  },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#FBFAF6]">
      {/* ── Compact admin-style header ───────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-brand-navy/10 bg-white">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              'radial-gradient(ellipse at 85% 0%, rgba(16,185,129,0.08) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(212,168,83,0.08) 0%, transparent 50%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <BreadcrumbNav
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Admin', href: '/admin/analytics/' },
              { label: 'Analytics', href: '/admin/analytics/' },
            ]}
          />

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brand-navy/30"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
              Internal reference · not indexed
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span
              className="size-1.5 rounded-full bg-brand-emerald"
              aria-hidden="true"
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              Contract §17.5 · §20.15
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl">
            Analytics{' '}
            <span className="font-display italic text-brand-emerald">
              Dashboard
            </span>
            <span aria-hidden="true" className="text-brand-gold">
              .
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Navigation hub for the MoveSmart Rentals growth stack. Live metrics
            are owned by GA4, Google Search Console, Bing Webmaster, and Looker
            Studio - this page documents{' '}
            <span className="font-semibold text-brand-navy">
              what is wired on-site
            </span>{' '}
            and links out to each external tool. Placeholder KPI tiles are
            ready for a future GA4 Reporting API integration.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* ── Section 1 · Quick links ─────────────────────────────── */}
        <section aria-labelledby="quick-links-heading">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
                Section 01
              </p>
              <h2
                id="quick-links-heading"
                className="mt-1 font-display text-2xl font-normal text-brand-navy sm:text-3xl"
              >
                External{' '}
                <span className="font-display italic text-brand-emerald">
                  dashboards
                </span>
                <span aria-hidden="true" className="text-brand-gold">
                  .
                </span>
              </h2>
            </div>
            <span className="hidden text-xs text-slate-500 sm:inline">
              Opens in a new tab
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <DashboardCard
                key={link.label}
                label={link.label}
                value="Open"
                subtext={link.subtext}
                href={link.href}
                icon={link.icon}
                accent={link.accent}
              />
            ))}
          </div>
        </section>

        {/* ── Section 2 · Tracked Events Reference ────────────────── */}
        <section aria-labelledby="events-heading" className="mt-20">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
              Section 02
            </p>
            <h2
              id="events-heading"
              className="mt-1 font-display text-2xl font-normal text-brand-navy sm:text-3xl"
            >
              Tracked events{' '}
              <span className="font-display italic text-brand-emerald">
                reference
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              Every dataLayer event wired into the site. Source of truth:{' '}
              <code className="rounded bg-brand-navy/5 px-1.5 py-0.5 font-mono text-[12px] text-brand-navy">
                src/lib/analytics-events.ts
              </code>
              . All events flow through GTM and forward to GA4 + any configured
              Ads accounts. Payload fields suffixed with{' '}
              <code className="font-mono text-[12px] text-brand-navy">?</code>{' '}
              are optional.
            </p>
          </div>

          <TrackedEventsTable />
        </section>

        {/* ── Section 3 · KPI Cards ──────────────────────────────── */}
        <section aria-labelledby="kpi-heading" className="mt-20">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
              Section 03
            </p>
            <h2
              id="kpi-heading"
              className="mt-1 font-display text-2xl font-normal text-brand-navy sm:text-3xl"
            >
              Contract §17.5{' '}
              <span className="font-display italic text-brand-emerald">
                KPIs
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
              Placeholder tiles for the contracted reporting surface: rankings,
              organic sessions, indexed pages, conversions, and top landing
              pages. Each card will populate once the GA4 Reporting API (server
              credentials required) is wired in.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              label="Organic sessions"
              placeholder
              subtext="Connect GA4 · Sessions where sessionDefaultChannelGroup = Organic Search (last 30 days)"
              icon={<Activity className="size-4" aria-hidden="true" />}
              accent="emerald"
            />
            <DashboardCard
              label="Indexed pages"
              placeholder
              subtext="Check GSC · Coverage report, Valid pages count"
              icon={<FileText className="size-4" aria-hidden="true" />}
              accent="gold"
            />
            <DashboardCard
              label="Conversions"
              placeholder
              subtext="GA4 Events · account_creation_click + contact_form_submit"
              icon={<Target className="size-4" aria-hidden="true" />}
              accent="emerald"
            />
            <DashboardCard
              label="Avg. ranking position"
              placeholder
              subtext="Check GSC · Performance report, weighted avg across tracked queries"
              icon={<Gauge className="size-4" aria-hidden="true" />}
              accent="navy"
            />
            <DashboardCard
              label="Top landing pages"
              placeholder
              subtext="See GA4 Landing Page report · Sessions by entrance URL"
              icon={<BarChart3 className="size-4" aria-hidden="true" />}
              accent="emerald"
            />
            <DashboardCard
              label="City → Service CTR"
              placeholder
              subtext="See GTM dataLayer · city_to_service_ctr event volume / city sessions"
              icon={<Link2 className="size-4" aria-hidden="true" />}
              accent="gold"
            />
            <DashboardCard
              label="Account creations"
              placeholder
              subtext="See GA4 Events · account_creation_click count (last 30 days)"
              icon={<UserPlus className="size-4" aria-hidden="true" />}
              accent="emerald"
            />
            <DashboardCard
              label="Book-a-call clicks"
              placeholder
              subtext="See GA4 Events · book_a_call_click count (last 30 days)"
              icon={<PhoneCall className="size-4" aria-hidden="true" />}
              accent="navy"
            />
          </div>
        </section>

        {/* ── Section 4 · Implementation Notes ───────────────────── */}
        <section aria-labelledby="notes-heading" className="mt-20">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-navy/60">
              Section 04
            </p>
            <h2
              id="notes-heading"
              className="mt-1 font-display text-2xl font-normal text-brand-navy sm:text-3xl"
            >
              Implementation{' '}
              <span className="font-display italic text-brand-emerald">
                notes
              </span>
              <span aria-hidden="true" className="text-brand-gold">
                .
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-brand-navy p-8 text-white ring-1 ring-white/10 sm:p-10">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  'radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.10) 0%, transparent 60%)',
              }}
            />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-brand-emerald"
                aria-hidden="true"
              >
                <Sparkles className="size-5" />
              </span>

              <div className="flex-1">
                <h3 className="font-display text-xl font-normal text-white sm:text-2xl">
                  Wiring live data
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                  Populating the KPI tiles above requires GA4 Reporting API
                  credentials (service account + measurement ID) and a
                  server-side fetcher rendered inside a React Server Component
                  with revalidation. Until those credentials are provisioned,
                  this page serves as a{' '}
                  <span className="text-white">
                    navigation hub and event reference
                  </span>{' '}
                  for the internal team. See{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-emerald-200">
                    docs/content-engine-sop.md
                  </code>{' '}
                  and{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-emerald-200">
                    docs/analytics-integration-guide.md
                  </code>{' '}
                  for the wiring procedure.
                </p>

                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <li className="flex items-start gap-2 text-sm text-white/80">
                    <MousePointerClick
                      className="mt-0.5 size-4 shrink-0 text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>
                      Client-side events already flow through{' '}
                      <code className="font-mono text-[12px] text-emerald-200">
                        window.dataLayer
                      </code>{' '}
                      - GTM container ingests and forwards to GA4.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-white/80">
                    <ExternalLink
                      className="mt-0.5 size-4 shrink-0 text-brand-gold"
                      aria-hidden="true"
                    />
                    <span>
                      This page is unlisted - not in the nav, not in the
                      footer, not in the sitemap, and set to{' '}
                      <code className="font-mono text-[12px] text-emerald-200">
                        robots: noindex, nofollow
                      </code>
                      .
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
