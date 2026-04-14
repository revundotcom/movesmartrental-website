import { cn } from '@/lib/utils'

/**
 * CityHeroPlaceholder - brand-safe SVG hero placeholder for city pages
 * where a real editorial photograph has not yet been generated and
 * published. Pure server component, no client-side logic, no external
 * dependencies. Uses inline SVG filters for grain and a layered gradient
 * for a magazine-cover mood.
 *
 * Aspect ratio: 16:9 via preserveAspectRatio + responsive width:100%.
 */
export interface CityHeroPlaceholderProps {
  cityName: string
  provinceOrState: string
  className?: string
}

export function CityHeroPlaceholder({
  cityName,
  provinceOrState,
  className,
}: CityHeroPlaceholderProps) {
  // Deterministic id prefix prevents collisions when multiple placeholders
  // render on a single page. Derived from city+region so SSR and client
  // output match exactly.
  const slug = `${cityName}-${provinceOrState}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const idPrefix = `ms-cityhero-${slug}`

  return (
    <div
      role="img"
      aria-label={`${cityName}, ${provinceOrState} - MoveSmart Rentals editorial placeholder`}
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
          {/* Deep navy base gradient */}
          <linearGradient
            id={`${idPrefix}-base`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#001E57" />
            <stop offset="55%" stopColor="#001746" />
            <stop offset="100%" stopColor="#000F33" />
          </linearGradient>

          {/* Emerald radial accent - lower-left */}
          <radialGradient
            id={`${idPrefix}-emerald`}
            cx="0.12"
            cy="0.88"
            r="0.65"
          >
            <stop offset="0%" stopColor="#009966" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#009966" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#009966" stopOpacity="0" />
          </radialGradient>

          {/* Gold radial accent - upper-right */}
          <radialGradient
            id={`${idPrefix}-gold`}
            cx="0.88"
            cy="0.18"
            r="0.55"
          >
            <stop offset="0%" stopColor="#D4A853" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#D4A853" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
          </radialGradient>

          {/* Subtle film-grain via fractal noise */}
          <filter
            id={`${idPrefix}-grain`}
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0.08 0"
            />
          </filter>
        </defs>

        {/* Base */}
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
          fill={`url(#${idPrefix}-emerald)`}
        />
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill={`url(#${idPrefix}-gold)`}
        />

        {/* Thin brass architectural rule - top */}
        <line
          x1="160"
          y1="160"
          x2="1760"
          y2="160"
          stroke="#D4A853"
          strokeOpacity="0.55"
          strokeWidth="1"
        />

        {/* Small uppercase eyebrow: region */}
        <text
          x="160"
          y="220"
          fill="#D4A853"
          fillOpacity="0.85"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="26"
          letterSpacing="6"
          fontWeight="500"
        >
          {provinceOrState.toUpperCase()}
        </text>

        {/* Display city name */}
        <text
          x="160"
          y="620"
          fill="#FBFAF6"
          fontFamily="'Playfair Display', 'Cormorant Garamond', 'Georgia', serif"
          fontSize="220"
          fontWeight="500"
          letterSpacing="-4"
        >
          {cityName}
        </text>

        {/* Hairline divider below title */}
        <line
          x1="160"
          y1="720"
          x2="780"
          y2="720"
          stroke="#FBFAF6"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* Editorial descriptor */}
        <text
          x="160"
          y="790"
          fill="#FBFAF6"
          fillOpacity="0.7"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="26"
          letterSpacing="2"
          fontWeight="400"
        >
          Leasing coverage area
        </text>

        {/* Muted MoveSmart watermark - bottom right */}
        <text
          x="1760"
          y="1010"
          textAnchor="end"
          fill="#FBFAF6"
          fillOpacity="0.5"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontSize="22"
          letterSpacing="8"
          fontWeight="600"
        >
          MOVESMART RENTALS
        </text>
        <line
          x1="1520"
          y1="1030"
          x2="1760"
          y2="1030"
          stroke="#D4A853"
          strokeOpacity="0.7"
          strokeWidth="1"
        />

        {/* Grain overlay - applied last */}
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
