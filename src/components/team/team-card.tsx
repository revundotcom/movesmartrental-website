import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'

import type { TeamMember } from '@/data/team'
import { TeamAvatar } from './team-avatar'

interface Props {
  member: TeamMember
  /** When true, the entire card becomes a link to the member's profile.
   *  Contact links inside still escape the wrapping link via stopPropagation. */
  linkProfile?: boolean
}

/**
 * Fasken-style team directory card.
 *   • photo (or initials monogram) up top with a small city pin
 *   • name, role, short bio
 *   • horizontal divider + clickable phone + email
 *
 * Hover lifts the card 2px and tightens the gold accent on the city pin —
 * intentionally restrained, to keep the editorial feel.
 */
export function TeamCard({ member, linkProfile = true }: Props) {
  const profileHref = `/about/team/${member.slug}/`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-brand-navy/10 bg-white shadow-[0_1px_2px_rgba(11,29,58,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-navy/20 hover:shadow-[0_18px_40px_-22px_rgba(11,29,58,0.25)]">
      {/* Photo + city tag */}
      <div className="relative">
        {linkProfile ? (
          <Link
            href={profileHref}
            aria-label={`View ${member.name}'s profile`}
            className="block"
          >
            <TeamAvatar member={member} size="card" />
          </Link>
        ) : (
          <TeamAvatar member={member} size="card" />
        )}

        {/* City pin — top-left, matches the Fasken treatment */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-navy shadow-sm ring-1 ring-brand-navy/5 backdrop-blur">
          <MapPin
            className="size-3 text-brand-gold"
            aria-hidden="true"
            strokeWidth={2.5}
          />
          {member.office}
        </span>
      </div>

      {/* Text block */}
      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pt-6">
        {linkProfile ? (
          <Link
            href={profileHref}
            className="font-display text-[1.45rem] font-normal leading-tight tracking-tight text-brand-navy transition-colors hover:text-brand-emerald"
          >
            {member.name}
          </Link>
        ) : (
          <h3 className="font-display text-[1.45rem] font-normal leading-tight tracking-tight text-brand-navy">
            {member.name}
          </h3>
        )}
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-emerald">
          {member.role}
          {member.department && member.department !== member.role && (
            <>
              <span aria-hidden="true" className="mx-2 text-brand-navy/25">
                |
              </span>
              <span className="text-brand-navy/65">{member.department}</span>
            </>
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {member.shortBio}
        </p>

        {/* Divider + contacts */}
        <div className="mt-auto pt-5">
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-brand-navy/10 via-brand-navy/15 to-transparent"
          />
          <div className="mt-4 space-y-1.5">
            <a
              href={`tel:${member.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-brand-emerald"
            >
              <Phone
                className="size-3.5 text-brand-gold"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              {member.phone}
            </a>
            <a
              href={`mailto:${member.email}`}
              className="block truncate text-sm text-brand-emerald underline-offset-2 hover:underline"
            >
              <span className="inline-flex max-w-full items-center gap-2 align-middle">
                <Mail
                  className="size-3.5 shrink-0 text-brand-gold"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                <span className="truncate">{member.email}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
