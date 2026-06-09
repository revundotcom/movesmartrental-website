import Image from 'next/image'

import { getInitials, getMemberAccent, type TeamMember } from '@/data/team'

interface Props {
  member: Pick<TeamMember, 'name' | 'slug' | 'photoUrl' | 'photoAlt'>
  /** Size token. `card` = directory grid, `hero` = profile page header. */
  size?: 'card' | 'hero'
  className?: string
}

const sizeMap = {
  card: 'aspect-[4/5]',
  hero: 'aspect-[3/4]',
} as const

const monogramSizeMap = {
  card: 'text-[3.5rem]',
  hero: 'text-[7rem]',
} as const

const accentMap = {
  gold: 'bg-gradient-to-br from-brand-gold/95 to-brand-gold/75 text-white',
  emerald: 'bg-gradient-to-br from-brand-emerald to-emerald-600 text-white',
  navy: 'bg-gradient-to-br from-brand-navy to-[#1E3A5F] text-white',
} as const

/**
 * Team member portrait. Renders the photo when available; otherwise a
 * monogram tile using the member's initials. Tile colour is deterministic
 * from the slug so the same person always gets the same accent.
 */
export function TeamAvatar({ member, size = 'card', className = '' }: Props) {
  const containerClass = `relative w-full overflow-hidden bg-[#F1EDE6] ${sizeMap[size]} ${className}`

  if (member.photoUrl) {
    return (
      <div className={containerClass}>
        <Image
          src={member.photoUrl}
          alt={member.photoAlt}
          fill
          className="object-cover"
          sizes={
            size === 'hero'
              ? '(max-width: 1024px) 100vw, 480px'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          }
          unoptimized
        />
      </div>
    )
  }

  const accent = getMemberAccent(member.slug)
  const initials = getInitials(member.name)

  return (
    <div className={containerClass}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center ${accentMap[accent]}`}
      >
        <span
          className={`font-display font-normal leading-none tracking-tight ${monogramSizeMap[size]}`}
        >
          {initials}
        </span>
      </div>
      {/* Subtle radial sheen for visual depth on monograms. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_55%)]"
      />
    </div>
  )
}
