import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  Globe2,
  HeartHandshake,
  Laptop2,
  LineChart,
  MapPin,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

import { getRolesByRegion, fetchRolesFromApi } from '@/data/careers'

const UNSPLASH = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const IMG = {
  heroSkyline: {
    src: UNSPLASH('1517935706615-2717063c2225', 2400),
    alt: 'Toronto skyline at golden hour with CN Tower over Lake Ontario',
  },
  cultureTeam: {
    src: UNSPLASH('1521737711867-e3b97375f902', 1400),
    alt: 'MoveSmart team collaborating on laptops around a wooden meeting table',
  },
  benefitsLearning: {
    src: UNSPLASH('1517048676732-d65bc937f952', 1400),
    alt: 'Colleagues taking notes during a focused planning session',
  },
  hybridOffice: {
    src: UNSPLASH('1531973576160-7125cd663d86', 1600),
    alt: 'Modern open-concept MoveSmart office with workstations and natural light',
  },
  teamsBoardroom: {
    src: UNSPLASH('1542744173-8e7e53415bb0', 1600),
    alt: 'Boardroom presentation with team members reviewing strategy on a wall display',
  },
  communityOffice: {
    src: UNSPLASH('1556761175-b413da4baf72', 1600),
    alt: 'Active open-plan workspace with team members collaborating across desks',
  },
} as const

/* ═══════════════════════════════════════════════════════════════════
   MoveSmart Rentals — Careers landing page
   Per client direction (June 2026):
     • Reframed copy to "North America" (CA + US).
     • Sections: Hero, Our Culture, Benefits, Hybrid Work, Teams,
       Community, Open positions (Province/State → City → Role).
     • Role data lives in src/data/careers.ts.
     • Clicking a role navigates to /careers/<slug>/ for the detail
       page (GE Vernova-style layout). Modal application has moved
       to the detail page so this listing can be a server component.
   ═══════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title:
    'Careers | Join the MoveSmart Rentals Leasing Team Across North America',
  description:
    'Open roles at MoveSmart Rentals across Canada and the United States. Leasing, operations, marketing, property management, and trades roles. Apply directly.',
  alternates: { canonical: '/careers/' },
  openGraph: {
    title: 'Careers | MoveSmart Rentals',
    description:
      'Join the team building a better rental market across North America. Open roles in leasing, operations, marketing, property management, and trades.',
    images: ['/og-default.png?v=3'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | MoveSmart Rentals',
    description:
      'Join the team building a better rental market across North America.',
  },
}

const WHY_JOIN = [
  {
    Icon: LineChart,
    title: 'Scale your career with us',
    body: 'MoveSmart is expanding across North America. The team you join today will be many times the size in three years.',
  },
  {
    Icon: Globe2,
    title: 'North American markets',
    body: 'Work across Canada and the United States. Toronto is our home base, with active US markets including Florida, New York, and Illinois.',
  },
  {
    Icon: Users,
    title: 'Landlord-first culture',
    body: 'We take property management seriously. Our team understands the institutional side of the rental market as deeply as the renter side.',
  },
  {
    Icon: Star,
    title: 'Performance-backed comp',
    body: 'Strong base salaries, clear performance metrics, and real upside for people who hit their numbers.',
  },
]

const BENEFITS = [
  {
    Icon: Sparkles,
    title: 'Competitive comp and benefits',
    body: 'Competitive base salaries, retirement savings programs, and performance incentives across every role.',
  },
  {
    Icon: HeartHandshake,
    title: 'Health, dental, and wellness',
    body: 'Comprehensive health and dental coverage, mental-wellness support, and an annual wellness allowance.',
  },
  {
    Icon: Sparkles,
    title: 'Learning and certification',
    body: 'Educational reimbursement and professional designation fee coverage. We invest in licenses, certifications, and skills.',
  },
]

const HYBRID = [
  {
    Icon: Users,
    title: 'We value in-person connections',
    body: 'When we are together, we build real relationships, foster cross-collaboration, and move faster as a team.',
  },
  {
    Icon: LineChart,
    title: 'We challenge the status quo',
    body: 'Being together turns good ideas into real products and creates the mentorship that helps our people grow.',
  },
  {
    Icon: Laptop2,
    title: 'The right tech to bring people together',
    body: 'Modern collaboration tools across every office and every remote workstation, so hybrid teams stay heard and included.',
  },
]

const TEAMS = [
  {
    title: 'Business and Support Services',
    body: 'Work collaboratively to launch products and services, manage operations, and run the projects that keep our owner-files moving. Marketing, brokerage ops, finance, people and culture, legal, and risk.',
  },
  {
    title: 'Client Service and Sales',
    body: 'Deliver service that helps Canadian and American renters and landlords find their next placement. You are the voice of MoveSmart on every interaction.',
  },
  {
    title: 'Leasing and Real Estate Agents',
    body: 'Licensed leasing agents and real estate agents on the ground in our markets. You run showings, qualify tenants, and close placements for landlords across North America.',
  },
  {
    title: 'Engineering and Technology',
    body: 'The technology our customers rely on is built and maintained in-house. Software engineering, data, AI, and platform reliability.',
  },
  {
    title: 'Trades and Field Services',
    body: 'Handy workers and technicians who keep our portfolio in showing-ready condition. Move-in prep, turnover work, and on-site visits for owners.',
  },
  {
    title: 'Students and Interns',
    body: 'Internships and co-op placements across operations, marketing, technology, and the trades. Reach out at careers@movesmartrentals.com.',
  },
]

export default async function CareersPage() {
  const jobsByRegion = await getRolesByRegion()
  const allRoles = await fetchRolesFromApi()
  const totalRoles = allRoles.length

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[var(--brand-navy)] py-24 text-white md:py-32">
        {/* Full-bleed skyline image, kept behind the gradient overlay */}
        <Image
          src={IMG.heroSkyline.src}
          alt={IMG.heroSkyline.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-center"
        />
        {/* Dark gradient overlay to preserve copy legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--brand-navy)] via-[var(--brand-navy)]/85 to-[var(--brand-navy)]/55"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[var(--brand-navy)] to-transparent"
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
            Careers
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl">
            Join the team building a better rental market across North America.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            MoveSmart Rentals connects landlords and tenants across Canada and
            the United States. We are a team of operators who take property
            management seriously and move fast.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#positions"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-[var(--brand-emerald-hover)]"
            >
              See open positions <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:careers@movesmartrentals.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10"
            >
              General application
            </a>
          </div>
        </div>
      </section>

      {/* ── Our Culture ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
                Our culture
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
                People are{' '}
                <span className="text-[var(--brand-emerald)]">the key</span> to
                our success.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                We are a highly collaborative team that cares deeply about our
                mission and each other. You will conquer challenges, push
                boundaries, and discover what you are truly capable of.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
              <Image
                src={IMG.cultureTeam.src}
                alt={IMG.cultureTeam.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/30 via-transparent to-transparent"
              />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_JOIN.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <Icon
                  className="mb-3 h-5 w-5 text-[var(--brand-emerald)]"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-bold text-[var(--brand-navy)]">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
                Our benefits
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
                Here are some of the reasons why people{' '}
                <span className="text-[var(--brand-emerald)]">love working</span>{' '}
                at MoveSmart.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
                Comprehensive benefits, real learning budgets, and time to
                recharge. We invest in the people who carry the work.
              </p>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:col-span-5">
              <Image
                src={IMG.benefitsLearning.src}
                alt={IMG.benefitsLearning.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ Icon, title, body }) => (
              <div key={title} className="text-center sm:text-left">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-emerald)]/10 ring-1 ring-[var(--brand-emerald)]/15">
                  <Icon
                    className="h-6 w-6 text-[var(--brand-emerald)]"
                    strokeWidth={1.6}
                  />
                </span>
                <h3 className="mt-5 text-base font-bold text-[var(--brand-navy)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-xs italic text-slate-500">
            Benefits may vary by country.
          </p>
        </div>
      </section>

      {/* ── Hybrid work ─────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:col-span-5 lg:order-1">
              <Image
                src={IMG.hybridOffice.src}
                alt={IMG.hybridOffice.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7 lg:order-2">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
                How we work
              </p>
              <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
                <span className="text-[var(--brand-emerald)]">Hybrid work</span>{' '}
                is the future.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
                Our balanced approach brings together people in person,
                fostering teamwork and innovation, while maintaining the
                ability to work from home.
              </p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {HYBRID.map(({ Icon, title, body }) => (
              <div key={title}>
                <Icon
                  className="h-7 w-7 text-[var(--brand-emerald)]"
                  strokeWidth={1.6}
                />
                <h3 className="mt-5 text-base font-bold text-[var(--brand-navy)]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teams: choose your path ─────────────────────────────── */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
            Teams
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
            Choose{' '}
            <span className="text-[var(--brand-emerald)]">your path</span> with
            us.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
            At MoveSmart, we are one team united by one mission. You bring
            your talent, and we provide the tools you need to succeed in a
            highly collaborative environment that will help you grow.
          </p>
          <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
            <Image
              src={IMG.teamsBoardroom.src}
              alt={IMG.teamsBoardroom.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-navy)]/40 via-transparent to-transparent"
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TEAMS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[var(--brand-navy)]">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community / Charities ───────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
              Community
            </p>
            <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
              MoveSmart{' '}
              <span className="text-[var(--brand-emerald)]">cares</span>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Our greatest value is caring for one another. We believe the most
              important investment we can make is in each other. Our community
              approach is to engage and support the cities we operate in,
              including paid community-care days for our team.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200 lg:col-span-6">
            <Image
              src={IMG.communityOffice.src}
              alt={IMG.communityOffice.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Open positions — Province / State → City → Role ────── */}
      <section id="positions" className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-emerald)]">
            Open positions
          </p>
          <h2 className="text-3xl font-bold leading-tight text-[var(--brand-navy)] md:text-4xl">
            {totalRoles} {totalRoles === 1 ? 'role' : 'roles'} open right now.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Filtered by province or state, then city. Click a role to read the
            full job description and apply.
          </p>

          <div className="mt-10 space-y-10">
            {jobsByRegion.map((region) => (
              <div
                key={`${region.country}-${region.region}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8"
              >
                {/* Region header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-[var(--brand-navy)]">
                    <MapPin
                      className="h-4 w-4 text-[var(--brand-emerald)]"
                      aria-hidden="true"
                    />
                    {region.region}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {region.country}
                  </span>
                </div>

                {/* Cities */}
                <div className="mt-6 space-y-7">
                  {region.cities.map((city) => (
                    <div key={city.city}>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-navy)]/65">
                        {city.city}
                      </h4>
                      <ul className="mt-3 space-y-3">
                        {city.roles.map((role) => (
                          <li key={role.slug}>
                            <Link
                              href={`/careers/${role.slug}/`}
                              scroll={true}
                              className="group flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--brand-emerald)]/40 hover:bg-white hover:shadow-md md:flex-row md:items-center md:justify-between md:gap-6 md:p-5"
                            >
                              <div className="min-w-0 flex-1">
                                <h5 className="text-base font-bold text-[var(--brand-emerald)] transition-colors">
                                  {role.title}
                                </h5>
                                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-500">
                                  <span className="inline-flex items-center gap-1">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {role.type}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {role.locationDisplay}
                                  </span>
                                </div>
                              </div>
                              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[var(--brand-navy)] transition-colors group-hover:text-[var(--brand-emerald)]">
                                View role
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────── */}
      <section className="bg-[var(--brand-navy)] py-16 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            No open role that fits?
          </h2>
          <p className="mb-8 text-base text-white/80">
            We accept general applications year-round. Email us at{' '}
            <a
              href="mailto:careers@movesmartrentals.com"
              className="text-[var(--brand-emerald)] underline"
            >
              careers@movesmartrentals.com
            </a>
            .
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-emerald)] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--brand-emerald-hover)]"
          >
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
