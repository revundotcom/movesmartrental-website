import { cn } from '@/lib/utils'

/**
 * ServiceHeroPlaceholder - brand-safe SVG hero placeholder for service
 * pages. Editorial magazine-spread mood: navy backdrop, an oversized
 * low-opacity gold serif numeral as typographic texture, service name
 * centered, subtle hairline rules, muted MoveSmart watermark.
 *
 * Pure server component.
 */
export interface ServiceHeroPlaceholderProps {
  serviceName: string
  /** Two-character sequence number, e.g. "03" for the 3rd of 9 services. */
  serviceNumber: string
  className?: string
}

export function ServiceHeroPlaceholder({
  serviceName,
  serviceNumber,
  className,
}: ServiceHeroPlaceholderProps) {
  const slug = `${serviceNumber}-${serviceName}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const idPrefix = `ms-servicehero-${slug}`

  return (
    <div
      role="img"
      aria-label={`${serviceName} - MoveSmart Rentals editorial placeholder (service ${serviceNumber})`}
      className={cn('relative w-full overflow-hidden', className)}
      style={{ aspectRatio: '16 / 9' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient
            id={`${idPrefix}-base`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#001E57" />
            <stop offset="100%" stopColor="#000F33" />
          </linearGradient>

          <radialGradient
            id={`${idPrefix}-gold`}
            cx="0.5"
            cy="0.5"
            r="0.7"
          >
            <stop offset="0%" stopColor="#D4A853" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#D4A853" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id={`${idPrefix}-emerald`}
            cx="0.1"
            cy="0.9"
            r="0.6"
          >
            <stop offset="0%" stopColor="#009966" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#009966" stopOpacity="0" />
          </radialGradient>

          <filter
            id={`${idPrefix}-grain`}
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.07 0"
            />
          </filter>
        </defs>

        {/* Base navy */}
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill={`url(#${idPrefix}-base)`}
        />
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill={`url(#${idPrefix}-gold)`}
        />
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill={`url(#${idPrefix}-emerald)`}
        />

        {/* Outer editorial frame */}
        <rect
          x="80"
          y="80"
          width="1760"
          height="920"
          fill="none"
          stroke="#D4A853"
          strokeOpacity="0.32"
          strokeWidth="1"
        />

        {/* Oversized gold numeral - typographic texture, right side */}
        <text
          x="1860"
          y="880"
          textAnchor="end"
          fill="#D4A853"
          fillOpacity="0.22"
          fontFamily="'Playfair Display', 'Cormorant Garamond', 'Georgia', serif"
          fontSize="900"
          fontWeight="500"
          letterSpacing="-30"
        >
          {serviceNumber}
        </text>

        {/* Eyebrow label */}
        <text
          x="960"
          y="440"
          textAnchor="middle"
          fill="#D4A853"
          fillOpacity="0.9"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="24"
          letterSpacing="10"
          fontWeight="500"
        >
          MOVESMART SERVICE {serviceNumber}
        </text>

        {/* Thin divider above title */}
        <line
          x1="860"
          y1="490"
          x2="1060"
          y2="490"
          stroke="#FBFAF6"
          strokeOpacity="0.45"
          strokeWidth="1"
        />

        {/* Service name, centered, large serif */}
        <text
          x="960"
          y="610"
          textAnchor="middle"
          fill="#FBFAF6"
          fontFamily="'Playfair Display', 'Cormorant Garamond', 'Georgia', serif"
          fontSize="120"
          fontWeight="500"
          letterSpacing="-1"
        >
          {serviceName}
        </text>

        {/* Subhead */}
        <text
          x="960"
          y="690"
          textAnchor="middle"
          fill="#FBFAF6"
          fillOpacity="0.68"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="24"
          letterSpacing="3"
          fontWeight="400"
        >
          A white-glove leasing brokerage service
        </text>

        {/* Muted watermark bottom-left */}
        <line
          x1="160"
          y1="1020"
          x2="400"
          y2="1020"
          stroke="#D4A853"
          strokeOpacity="0.7"
          strokeWidth="1"
        />
        <text
          x="160"
          y="1000"
          fill="#FBFAF6"
          fillOpacity="0.5"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="22"
          letterSpacing="8"
          fontWeight="600"
        >
          MOVESMART RENTALS
        </text>

        {/* Grain overlay */}
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          filter={`url(#${idPrefix}-grain)`}
          opacity="0.55"
        />
      </svg>
    </div>
  )
}
