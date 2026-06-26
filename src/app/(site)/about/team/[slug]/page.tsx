import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Award,
  Briefcase,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Mail,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbListSchema } from '@/lib/schema-builders'
import { TeamAvatar } from '@/components/team/team-avatar'
import {
  getAllTeamSlugs,
  getTeamMemberBySlug,
  type CareerEntry,
  type CertificationEntry,
  type EducationEntry,
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
      images: member.photoUrl ? [member.photoUrl] : ['/og-default.png?v=2'],
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
    telephone: member.phone ?? undefined,
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
  // Knowledge + Events sections removed per client spec (June 2026).
  // Experience accordion now renders careerHistory (LinkedIn-style).
  const tocItems: Array<{ id: string; label: string }> = [
    { id: 'overview', label: 'Overview' },
  ]
  if (member.specialties.length) tocItems.push({ id: 'related-services', label: 'Related Services' })
  if (member.achievements.length) tocItems.push({ id: 'achievements', label: 'Achievements' })
  if (member.careerHistory.length) tocItems.push({ id: 'experience', label: 'Experience' })
  if (member.education.length || member.certifications.length) {
    tocItems.push({ id: 'career-education', label: 'Career & Education' })
  }
  if (member.publications.length) tocItems.push({ id: 'publications', label: 'Publications' })

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

              {/* Quote with red quotation marks — tight against the
                  sentence per client spec (June 2026). Marks are inline,
                  not absolutely positioned, so they sit flush. */}
              {member.quote && (
                <blockquote className="mt-8 max-w-xl text-[15px] leading-[1.7] text-brand-navy/85 sm:text-base">
                  <p>
                    <span
                      aria-hidden="true"
                      className="mr-1 font-display text-2xl leading-none text-[#B33A2E]"
                    >
                      &ldquo;
                    </span>
                    {member.quote}
                    <span
                      aria-hidden="true"
                      className="ml-0.5 font-display text-2xl leading-none text-[#B33A2E]"
                    >
                      &rdquo;
                    </span>
                  </p>
                </blockquote>
              )}

              {/* Horizontal data table — JURISDICTION / LANGUAGES /
                  CONTACT (email only) per client spec (June 2026). The
                  former Office(s), Phone, and Licence rows have been
                  removed; Call action button removed as well. */}
              <dl className="mt-10 divide-y divide-brand-navy/15 border-y border-brand-navy/15">
                <DataRow label="Jurisdiction">
                  {member.province}, {member.country}
                </DataRow>
                <DataRow label="Language(s)">
                  <span className="text-brand-gold-dark">
                    {member.languages.join(', ')}
                  </span>
                </DataRow>
                <DataRow label="Contact">
                  <a
                    href={`mailto:${member.email}`}
                    className="truncate text-brand-emerald underline-offset-2 hover:underline"
                  >
                    {member.email}
                  </a>
                </DataRow>
              </dl>

              {/* Action buttons — Email is primary; LinkedIn when present.
                  The Call button has been removed per client spec. */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email {member.name.split(' ')[0]}
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

              {/* Experience — LinkedIn-style work-history cards.
                  Per client spec (June 2026): logo on the left, role +
                  company + bullets on the right. NO duration shown. */}
              {member.careerHistory.length > 0 && (
                <AccordionSection id="experience" title="Experience">
                  <ul className="space-y-7">
                    {member.careerHistory.map((entry, i) => (
                      <ExperienceCard key={i} entry={entry} />
                    ))}
                  </ul>
                </AccordionSection>
              )}

              {/* Career & Education — Education degrees + certifications.
                  Per client spec (June 2026): LinkedIn-style cards. */}
              {(member.education.length > 0 ||
                member.certifications.length > 0) && (
                <AccordionSection
                  id="career-education"
                  title="Career & Education"
                >
                  {member.education.length > 0 && (
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/60">
                        Education
                      </h4>
                      <ul className="mt-5 space-y-5">
                        {member.education.map((e, i) => (
                          <EducationCard key={i} entry={e} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {member.certifications.length > 0 && (
                    <div className={member.education.length > 0 ? 'mt-9' : ''}>
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-navy/60">
                        Licenses &amp; certifications
                      </h4>
                      <ul className="mt-5 space-y-5">
                        {member.certifications.map((c, i) => (
                          <CertificationCard key={i} entry={c} />
                        ))}
                      </ul>
                    </div>
                  )}
                </AccordionSection>
              )}

              {/* Publications — only renders if the member has any. */}
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

                {/* The sidebar "Direct line" contact card was removed
                    per client spec (June 2026). Email is reachable from
                    the hero action button and the Contact data row. */}
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

// ─────────────────────────────────────────────────────────────────────
// LinkedIn-style cards used in the Experience and Career & Education
// accordions. Per client spec (June 2026) — no duration displayed.
// Each card: square logo tile on the left, title + secondary line on
// the right, optional bullet points underneath.
// ─────────────────────────────────────────────────────────────────────

function MonogramTile({
  label,
  imageUrl,
  fallbackIcon: FallbackIcon,
}: {
  label: string
  imageUrl?: string | null
  fallbackIcon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
}) {
  if (imageUrl) {
    return (
      <span className="relative size-12 shrink-0 overflow-hidden rounded-sm border border-brand-navy/10 bg-white p-1">
        <Image
          src={imageUrl}
          alt={`${label} logo`}
          fill
          sizes="48px"
          className="object-contain"
          unoptimized
        />
      </span>
    )
  }
  // Fallback: subtle tile with an icon — preserves the LinkedIn layout
  // even when no logo URL is provided in the data file.
  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-brand-navy/10 bg-[#FBFAF6]"
    >
      <FallbackIcon className="size-5 text-brand-navy/55" aria-hidden />
    </span>
  )
}

function ExperienceCard({ entry }: { entry: CareerEntry }) {
  return (
    <li className="flex gap-4 sm:gap-5">
      <MonogramTile
        label={entry.organization}
        imageUrl={entry.companyLogoUrl}
        fallbackIcon={Briefcase}
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-brand-navy">{entry.role}</p>
        <p className="text-sm text-slate-600">{entry.organization}</p>
        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="mt-3 space-y-2">
            {entry.bullets.map((b, j) => (
              <li
                key={j}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[#B33A2E]"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <li className="flex gap-4 sm:gap-5">
      <MonogramTile
        label={entry.school}
        imageUrl={entry.schoolLogoUrl}
        fallbackIcon={GraduationCap}
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-brand-navy">{entry.school}</p>
        <p className="text-sm text-slate-600">{entry.degree}</p>
      </div>
    </li>
  )
}

function CertificationCard({ entry }: { entry: CertificationEntry }) {
  return (
    <li className="flex gap-4 sm:gap-5">
      <MonogramTile
        label={entry.issuer}
        imageUrl={entry.issuerLogoUrl}
        fallbackIcon={Award}
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-brand-navy">{entry.name}</p>
        <p className="text-sm text-slate-600">{entry.issuer}</p>
        {entry.year && (
          <p className="mt-1 text-xs text-slate-500">Issued {entry.year}</p>
        )}
      </div>
    </li>
  )
}
