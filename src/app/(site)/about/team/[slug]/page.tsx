import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ChevronDown, Mail, Phone, ExternalLink } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { TeamAvatar } from '@/components/team/team-avatar'
import {
  getAllTeamSlugs,
  getTeamMemberBySlug,
  type TeamMember,
} from '@/data/team'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllTeamSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: RouteParams,
): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMemberBySlug(slug)
  if (!member) {
    return {
      title: 'Team Member Not Found | MoveSmart Rentals',
      robots: { index: false, follow: false },
    }
  }
  const title = `${member.name}, ${member.role} | MoveSmart Rentals`
  const description = `${member.name} is ${member.role} at MoveSmart Rentals (${member.office}). ${member.shortBio}`
  return {
    title,
    description,
    alternates: { canonical: `/about/team/${member.slug}/` },
    openGraph: {
      title,
      description,
      images: member.photoUrl ? [member.photoUrl] : ['/og-default.png'],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function buildPersonSchema(member: TeamMember) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/about/team/${member.slug}/#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio,
    image: member.photoUrl ?? undefined,
    email: member.email,
    telephone: member.phone,
    knowsLanguage: member.languages,
    knowsAbout: member.specialties,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'MoveSmart Rentals',
      url: SITE_URL,
    },
    workLocation: {
      '@type': 'Place',
      name: `MoveSmart Rentals — ${member.office}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: member.office,
        addressCountry: 'CA',
      },
    },
    sameAs: member.linkedinUrl ? [member.linkedinUrl] : undefined,
    url: `${SITE_URL}/about/team/${member.slug}/`,
  }
}

export default async function TeamMemberPage({ params }: RouteParams) {
  const { slug } = await params
  const member = getTeamMemberBySlug(slug)
  if (!member) notFound()

  const breadcrumbSchema = buildBreadcrumbListSchema({
    crumbs: [
      { name: 'Home', url: SITE_URL },
      { name: 'About', url: `${SITE_URL}/about/` },
      { name: 'Team', url: `${SITE_URL}/about/#team` },
      { name: member.name, url: `${SITE_URL}/about/team/${member.slug}/` },
    ],
  })

  const longBioParagraphs = member.longBio
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  // TOC bullets. Only show accordion entries that actually have content.
  const tocItems: Array<{ id: string; label: string }> = [
    { id: 'overview', label: 'Overview' },
  ]
  if (member.specialties.length) tocItems.push({ id: 'related-services', label: 'Related Services' })
  if (member.achievements.length) tocItems.push({ id: 'achievements', label: 'Achievements' })
  if (member.marketsCovered.length) tocItems.push({ id: 'experience', label: 'Experience' })
  if (member.careerHistory.length || member.education.length) {
    tocItems.push({ id: 'career-education', label: 'Career & Education' })
  }
  if (member.knowledge.length) tocItems.push({ id: 'knowledge', label: 'Knowledge' })
  if (member.publications.length) tocItems.push({ id: 'publications', label: 'Publications' })
  if (member.events.length) tocItems.push({ id: 'events', label: 'Events' })

  return (
    <main className="bg-white">
      <JsonLd data={buildPersonSchema(member)} />
      <JsonLd data={breadcrumbSchema} />

      {/* ════════ BEIGE HERO ════════
          Mirrors the Fasken profile hero: large photo (left), identity
          panel (right). The quote uses red serif quotation marks. */}
      <section className="bg-[#E8E0D5]">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden shadow-[0_30px_80px_-40px_rgba(11,29,58,0.55)]">
                <TeamAvatar member={member} size="hero" />
              </div>
            </div>

            {/* Identity panel */}
            <div className="lg:col-span-7">
              {/* Name */}
              <h1 className="font-display text-[2.5rem] font-normal leading-[1.05] tracking-tight text-brand-navy sm:text-5xl md:text-[3.25rem]">
                {member.name}
              </h1>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-navy/65">
                {member.role}
              </p>

              {/* Quote with red quotation marks */}
              {member.quote && (
                <blockquote className="relative mt-8 max-w-xl text-[15px] leading-[1.7] text-brand-navy/85 sm:text-base">
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 -top-2 font-display text-3xl leading-none text-[#B33A2E]"
                  >
                    “
                  </span>
                  <span className="block px-5">{member.quote}</span>
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block translate-y-2 font-display text-3xl leading-none text-[#B33A2E]"
                  >
                    ”
                  </span>
                </blockquote>
              )}

              {/* Horizontal data table — JURISDICTION / LANGUAGES / OFFICE / CONTACT */}
              <dl className="mt-10 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
                <DataRow label="Jurisdiction">
                  {member.office}, {member.joinedYear}
                </DataRow>
                <DataRow label="Language(s)">
                  <span className="text-brand-gold-dark">
                    {member.languages.join(', ')}
                  </span>
                </DataRow>
                <DataRow label="Office(s)">{member.office}</DataRow>
                <DataRow label="Contact">
                  <div className="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy/60">
                      Business
                    </span>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="text-brand-navy hover:text-brand-emerald"
                    >
                      {member.phone}
                    </a>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy/60">
                      Email
                    </span>
                    <a
                      href={`mailto:${member.email}`}
                      className="truncate text-brand-emerald underline-offset-2 hover:underline"
                    >
                      {member.email}
                    </a>
                  </div>
                </DataRow>
                {member.licenseNumber && (
                  <DataRow label="Licence">{member.licenseNumber}</DataRow>
                )}
              </dl>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email {member.name.split(' ')[0]}
                </a>
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/25 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-all hover:border-brand-navy/40 hover:bg-white/90"
                >
                  <Phone className="size-4 text-brand-emerald" aria-hidden="true" />
                  Call
                </a>
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/25 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-all hover:border-brand-navy/40 hover:bg-white/90"
                  >
                    <ExternalLink className="size-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ WHITE BODY — Bio (left) + Sticky TOC (right) + Accordions ════════ */}
      <section className="bg-white pb-20 pt-12 sm:pt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Mini breadcrumb */}
          <div className="mb-10 border-b border-brand-navy/10 pb-4">
            <BreadcrumbNav
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about/' },
                { label: 'Team', href: '/about/#team' },
                { label: member.name, href: `/about/team/${member.slug}/` },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* MAIN COLUMN */}
            <div className="lg:col-span-8">
              {/* Overview */}
              <div id="overview" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Overview
                </p>
                <div className="mt-5 space-y-5 text-[17px] leading-[1.8] text-slate-700">
                  {longBioParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Accordions */}
              {member.specialties.length > 0 && (
                <AccordionSection
                  id="related-services"
                  title="Related Services"
                  defaultOpen
                >
                  <ul className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                    {member.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#B33A2E]"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
              )}

              {member.achievements.length > 0 && (
                <AccordionSection id="achievements" title="Achievements">
                  <ul className="space-y-3">
                    {member.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#B33A2E]"
                        />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
              )}

              {member.marketsCovered.length > 0 && (
                <AccordionSection id="experience" title="Experience">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Active across the following markets:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.marketsCovered.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center rounded-full border border-brand-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </AccordionSection>
              )}

              {(member.careerHistory.length > 0 ||
                member.education.length > 0) && (
                <AccordionSection
                  id="career-education"
                  title="Career & Education"
                >
                  {member.careerHistory.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/60">
                        Career
                      </h4>
                      <ul className="mt-4 space-y-4">
                        {member.careerHistory.map((entry, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[8rem_1fr] gap-x-4 border-l-2 border-[#B33A2E]/70 pl-4 text-sm sm:grid-cols-[10rem_1fr]"
                          >
                            <span className="font-semibold text-brand-navy/80">
                              {entry.year}
                            </span>
                            <span className="text-slate-700">
                              <span className="block font-semibold text-brand-navy">
                                {entry.role}
                              </span>
                              <span className="text-slate-600">
                                {entry.organization}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {member.education.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/60">
                        Education
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {member.education.map((e, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[8rem_1fr] gap-x-4 text-sm sm:grid-cols-[10rem_1fr]"
                          >
                            <span className="font-semibold text-brand-navy/80">
                              {e.year}
                            </span>
                            <span className="text-slate-700">
                              <span className="block font-semibold text-brand-navy">
                                {e.degree}
                              </span>
                              <span className="text-slate-600">{e.school}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AccordionSection>
              )}

              {member.knowledge.length > 0 && (
                <AccordionSection id="knowledge" title="Knowledge">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Topics and disciplines this team member writes, advises,
                    and teaches on.
                  </p>
                  <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                    {member.knowledge.map((k) => (
                      <li
                        key={k}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#B33A2E]"
                        />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
              )}

              {member.publications.length > 0 && (
                <AccordionSection id="publications" title="Publications">
                  <ul className="space-y-5">
                    {member.publications.map((p, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[4rem_1fr] gap-x-4 text-sm sm:grid-cols-[5rem_1fr]"
                      >
                        <span className="font-semibold text-brand-navy/80">
                          {p.year}
                        </span>
                        <span className="text-slate-700">
                          <span className="block font-semibold text-brand-navy">
                            {p.title}
                          </span>
                          <span className="italic text-slate-600">
                            {p.publisher}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
              )}

              {member.events.length > 0 && (
                <AccordionSection id="events" title="Events">
                  <ul className="space-y-5">
                    {member.events.map((e, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[4rem_1fr] gap-x-4 text-sm sm:grid-cols-[5rem_1fr]"
                      >
                        <span className="font-semibold text-brand-navy/80">
                          {e.year}
                        </span>
                        <span className="text-slate-700">
                          <span className="block font-semibold text-brand-navy">
                            {e.title}
                          </span>
                          <span className="text-slate-600">{e.event}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionSection>
              )}
            </div>

            {/* STICKY TOC */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <nav aria-label="On this page">
                  <ul className="space-y-3 border-l border-brand-navy/12 pl-5 text-sm">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.12em] text-brand-navy/75 transition-colors hover:text-[#B33A2E]"
                        >
                          <span
                            aria-hidden="true"
                            className="inline-block size-1.5 rounded-full bg-[#B33A2E] opacity-90 transition-transform group-hover:scale-125"
                          />
                          <span>{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Quick contact card under the TOC */}
                <div className="mt-10 rounded-sm border border-brand-navy/10 bg-[#FBFAF6] p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                    Direct line
                  </p>
                  <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy">
                    No call centres. Reach {member.name.split(' ')[0]} directly.
                  </p>
                  <div className="mt-5 space-y-3 text-sm">
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-brand-navy hover:text-brand-emerald"
                    >
                      <Phone className="size-4 text-brand-gold" aria-hidden="true" />
                      <span className="font-semibold">{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-brand-emerald hover:underline"
                    >
                      <Mail className="size-4 text-brand-gold" aria-hidden="true" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <Link
          href="/about/#team"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/70 hover:text-brand-emerald"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to the team
        </Link>
      </div>
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Sub-components — kept local because they only render here.
// ─────────────────────────────────────────────────────────────────────

function DataRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-3.5 sm:grid-cols-[10rem_1fr]">
      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-navy/65">
        {label}
      </dt>
      <dd className="text-[15px] text-brand-navy sm:text-base">{children}</dd>
    </div>
  )
}

function AccordionSection({
  id,
  title,
  defaultOpen = false,
  children,
}: {
  id: string
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group mt-8 scroll-mt-28 border-b border-brand-navy/15 py-2"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 transition-colors hover:text-[#B33A2E] [&::-webkit-details-marker]:hidden">
        <h3 className="flex items-center gap-3 font-display text-2xl font-normal tracking-tight text-brand-navy">
          <span
            aria-hidden="true"
            className="inline-block size-2.5 rotate-45 bg-[#B33A2E]"
          />
          {title}
        </h3>
        <ChevronDown
          className="size-5 shrink-0 text-brand-navy/60 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-6 pt-2">{children}</div>
    </details>
  )
}
