/**
 * MoveSmart Rentals - Page-Specific Hero Illustrations
 * Premium, brand-aligned SVGs for 8 key pages.
 *
 * Brand colors:
 *   Navy       #0B1D3A
 *   Navy light #132D54
 *   Emerald    #10B981
 *   Emerald lt #34D399
 *   Gold       #D4A853
 *   White      #FFFFFF
 */

/* ──────────────────────────────────────────────────────────────────────────
   1. TENANTS - Floating property search cards
   ────────────────────────────────────────────────────────────────────────── */

export function TenantsHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tenants-card-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        <radialGradient id="tenants-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <pattern id="tenants-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#0B1D3A" fillOpacity="0.08" />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="400" height="360" fill="url(#tenants-dots)" />
      <circle cx="310" cy="80" r="90" fill="url(#tenants-orb)" />
      <circle cx="90" cy="290" r="70" fill="url(#tenants-orb)" opacity="0.6" />

      {/* Back card - Ottawa $3,200 */}
      <g transform="translate(210, 60) rotate(8)" className="animate-float-y">
        <rect x="0" y="0" width="150" height="190" rx="12" fill="url(#tenants-card-grad)" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="150" height="80" rx="12" fill="#132D54" />
        <rect x="0" y="68" width="150" height="12" fill="#132D54" />
        {/* Building icon */}
        <g transform="translate(52, 20)">
          <rect x="6" y="10" width="34" height="34" rx="2" fill="#10B981" fillOpacity="0.25" />
          <rect x="12" y="16" width="6" height="6" rx="1" fill="#34D399" />
          <rect x="22" y="16" width="6" height="6" rx="1" fill="#34D399" />
          <rect x="32" y="16" width="6" height="6" rx="1" fill="#34D399" />
          <rect x="12" y="26" width="6" height="6" rx="1" fill="#34D399" fillOpacity="0.6" />
          <rect x="22" y="26" width="6" height="6" rx="1" fill="#34D399" fillOpacity="0.6" />
          <rect x="32" y="26" width="6" height="6" rx="1" fill="#34D399" fillOpacity="0.6" />
          <path d="M20 44 L28 44 L28 52 L20 52 Z" fill="#D4A853" />
        </g>
        {/* Heart */}
        <path d="M128 14 C125 11 120 12 120 16 C120 20 126 24 128 26 C130 24 136 20 136 16 C136 12 131 11 128 14 Z" fill="#FFFFFF" fillOpacity="0.25" />
        {/* Price */}
        <text x="12" y="108" fill="#0B1D3A" fontSize="15" fontWeight="800">$3,200</text>
        <text x="68" y="108" fill="#0B1D3A" fontSize="9" opacity="0.5">/mo</text>
        {/* Badges */}
        <rect x="12" y="120" width="36" height="18" rx="4" fill="#10B981" fillOpacity="0.12" />
        <text x="30" y="132" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">3BR</text>
        <rect x="52" y="120" width="36" height="18" rx="4" fill="#10B981" fillOpacity="0.12" />
        <text x="70" y="132" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">2BA</text>
        {/* Location */}
        <circle cx="18" cy="156" r="4" fill="#D4A853" />
        <circle cx="18" cy="156" r="1.5" fill="#FFFFFF" />
        <text x="28" y="160" fill="#0B1D3A" fontSize="9" opacity="0.65">Ottawa, ON</text>
        <rect x="12" y="170" width="126" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.05" />
      </g>

      {/* Middle card - Hamilton $1,800 */}
      <g transform="translate(60, 90) rotate(-6)" className="animate-float-y" style={{ animationDelay: '0.4s' }}>
        <rect x="0" y="0" width="150" height="190" rx="12" fill="url(#tenants-card-grad)" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="150" height="80" rx="12" fill="#0B1D3A" />
        <rect x="0" y="68" width="150" height="12" fill="#0B1D3A" />
        <g transform="translate(52, 20)">
          <path d="M23 10 L46 28 L0 28 Z" fill="#10B981" fillOpacity="0.3" />
          <rect x="6" y="28" width="34" height="22" rx="2" fill="#10B981" fillOpacity="0.35" />
          <rect x="12" y="34" width="8" height="10" rx="1" fill="#34D399" />
          <rect x="26" y="34" width="8" height="10" rx="1" fill="#34D399" />
        </g>
        <path d="M128 14 C125 11 120 12 120 16 C120 20 126 24 128 26 C130 24 136 20 136 16 C136 12 131 11 128 14 Z" fill="#FFFFFF" fillOpacity="0.25" />
        <text x="12" y="108" fill="#0B1D3A" fontSize="15" fontWeight="800">$1,800</text>
        <text x="68" y="108" fill="#0B1D3A" fontSize="9" opacity="0.5">/mo</text>
        <rect x="12" y="120" width="36" height="18" rx="4" fill="#10B981" fillOpacity="0.12" />
        <text x="30" y="132" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">2BR</text>
        <rect x="52" y="120" width="36" height="18" rx="4" fill="#10B981" fillOpacity="0.12" />
        <text x="70" y="132" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="700">1BA</text>
        <circle cx="18" cy="156" r="4" fill="#D4A853" />
        <circle cx="18" cy="156" r="1.5" fill="#FFFFFF" />
        <text x="28" y="160" fill="#0B1D3A" fontSize="9" opacity="0.65">Hamilton, ON</text>
        <rect x="12" y="170" width="126" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.05" />
      </g>

      {/* Front card - Toronto $2,500 (featured) */}
      <g transform="translate(130, 130)" className="animate-float-y" style={{ animationDelay: '0.2s' }}>
        <rect x="-4" y="-4" width="166" height="206" rx="14" fill="#10B981" fillOpacity="0.15" />
        <rect x="0" y="0" width="158" height="198" rx="12" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="0" y="0" width="158" height="84" rx="12" fill="#0B1D3A" />
        <rect x="0" y="72" width="158" height="12" fill="#0B1D3A" />

        {/* Available Now badge */}
        <g transform="translate(10, 10)">
          <rect x="0" y="0" width="76" height="18" rx="9" fill="#10B981" />
          <circle cx="10" cy="9" r="3" fill="#FFFFFF" className="animate-pulse-dot" />
          <text x="18" y="13" fill="#FFFFFF" fontSize="8" fontWeight="700">Available Now</text>
        </g>

        {/* Modern house icon */}
        <g transform="translate(56, 32)">
          <path d="M24 4 L46 22 L2 22 Z" fill="#10B981" />
          <rect x="6" y="22" width="36" height="28" rx="2" fill="#34D399" />
          <rect x="12" y="30" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="28" y="30" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="20" y="40" width="8" height="10" rx="1" fill="#D4A853" />
        </g>

        {/* Heart */}
        <path d="M138 14 C135 10 128 11 128 16 C128 21 136 26 138 28 C140 26 148 21 148 16 C148 11 141 10 138 14 Z" fill="#D4A853" />

        {/* Price */}
        <text x="14" y="114" fill="#0B1D3A" fontSize="20" fontWeight="800">$2,500</text>
        <text x="82" y="114" fill="#0B1D3A" fontSize="10" opacity="0.5">/mo</text>

        {/* Badges */}
        <rect x="14" y="124" width="42" height="22" rx="5" fill="#10B981" fillOpacity="0.15" />
        <text x="35" y="138" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">2BR</text>
        <rect x="60" y="124" width="42" height="22" rx="5" fill="#10B981" fillOpacity="0.15" />
        <text x="81" y="138" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">1BA</text>
        <rect x="106" y="124" width="42" height="22" rx="5" fill="#D4A853" fillOpacity="0.18" />
        <text x="127" y="138" textAnchor="middle" fill="#D4A853" fontSize="9" fontWeight="700">PET</text>

        {/* Location */}
        <circle cx="22" cy="166" r="5" fill="#0B1D3A" />
        <circle cx="22" cy="166" r="2" fill="#FFFFFF" />
        <text x="34" y="170" fill="#0B1D3A" fontSize="10" fontWeight="600">Toronto, ON</text>
        <text x="34" y="182" fill="#0B1D3A" fontSize="8" opacity="0.5">Liberty Village</text>

        {/* Rating stars */}
        <g transform="translate(110, 160)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`star-${i}`}
              d="M5 0 L6.5 3.5 L10 4 L7.5 6.5 L8 10 L5 8.3 L2 10 L2.5 6.5 L0 4 L3.5 3.5 Z"
              transform={`translate(${i * 7}, 12)`}
              fill="#D4A853"
            />
          ))}
        </g>
      </g>

      {/* Floating pin accents */}
      <circle cx="40" cy="60" r="5" fill="#10B981" className="animate-soft-ping" />
      <circle cx="360" cy="300" r="4" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="370" cy="180" r="3" fill="#34D399" opacity="0.7" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   2. PRICING - Three-tier stacked pricing cards
   ────────────────────────────────────────────────────────────────────────── */

export function PricingHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pricing-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pricing-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A853" />
          <stop offset="100%" stopColor="#E8C176" />
        </linearGradient>
      </defs>

      {/* Background glow behind middle tier */}
      <ellipse cx="200" cy="200" rx="160" ry="140" fill="url(#pricing-glow)" />

      {/* Billing toggle */}
      <g transform="translate(130, 30)">
        <rect x="0" y="0" width="140" height="30" rx="15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="4" y="4" width="66" height="22" rx="11" fill="#0B1D3A" />
        <text x="37" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">Monthly</text>
        <text x="105" y="18" textAnchor="middle" fill="#0B1D3A" fontSize="10" fontWeight="500" opacity="0.5">Annual</text>
        <rect x="110" y="-6" width="34" height="14" rx="7" fill="#D4A853" />
        <text x="127" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">-20%</text>
      </g>

      {/* Bronze/Self-Serve tier - back left */}
      <g transform="translate(30, 110) rotate(-4)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <rect x="0" y="0" width="130" height="200" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="130" height="4" rx="2" fill="#94A3B8" />
        <g transform="translate(50, 22)">
          <rect x="6" y="0" width="18" height="22" rx="3" fill="#0B1D3A" fillOpacity="0.1" />
          <rect x="10" y="4" width="10" height="2" fill="#0B1D3A" fillOpacity="0.3" />
          <rect x="10" y="9" width="10" height="2" fill="#0B1D3A" fillOpacity="0.3" />
          <rect x="10" y="14" width="6" height="2" fill="#0B1D3A" fillOpacity="0.3" />
        </g>
        <text x="65" y="68" textAnchor="middle" fill="#0B1D3A" fontSize="11" fontWeight="700">Self-Serve</text>
        <text x="65" y="82" textAnchor="middle" fill="#0B1D3A" fontSize="8" opacity="0.5">List & manage yourself</text>

        <text x="65" y="114" textAnchor="middle" fill="#0B1D3A" fontSize="22" fontWeight="800">$0</text>
        <text x="65" y="128" textAnchor="middle" fill="#0B1D3A" fontSize="8" opacity="0.5">upfront</text>

        {[0, 1, 2].map((i) => (
          <g key={`f1-${i}`} transform={`translate(16, ${146 + i * 14})`}>
            <circle cx="4" cy="4" r="3.5" fill="#10B981" fillOpacity="0.15" />
            <path d="M2 4 L3.5 5.5 L6 3" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="12" y="2.5" width={60 - i * 8} height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.2" />
          </g>
        ))}
      </g>

      {/* Premium tier - back right */}
      <g transform="translate(240, 110) rotate(4)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <rect x="0" y="0" width="130" height="200" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="130" height="4" rx="2" fill="url(#pricing-gold)" />

        {/* Crown */}
        <g transform="translate(50, 22)">
          <path d="M4 16 L2 2 L10 8 L15 0 L20 8 L28 2 L26 16 Z" fill="url(#pricing-gold)" />
          <rect x="4" y="16" width="22" height="4" rx="1" fill="#D4A853" />
          <circle cx="8" cy="13" r="1.2" fill="#FFFFFF" />
          <circle cx="15" cy="11" r="1.2" fill="#FFFFFF" />
          <circle cx="22" cy="13" r="1.2" fill="#FFFFFF" />
        </g>

        <text x="65" y="68" textAnchor="middle" fill="#0B1D3A" fontSize="11" fontWeight="700">Institutional</text>
        <text x="65" y="82" textAnchor="middle" fill="#0B1D3A" fontSize="8" opacity="0.5">Bulk lease-up</text>

        <text x="65" y="114" textAnchor="middle" fill="#0B1D3A" fontSize="18" fontWeight="800">RFP</text>
        <text x="65" y="128" textAnchor="middle" fill="#0B1D3A" fontSize="8" opacity="0.5">project-scoped</text>

        {[0, 1, 2].map((i) => (
          <g key={`f3-${i}`} transform={`translate(16, ${146 + i * 14})`}>
            <circle cx="4" cy="4" r="3.5" fill="#D4A853" fillOpacity="0.2" />
            <path d="M2 4 L3.5 5.5 L6 3" stroke="#D4A853" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="12" y="2.5" width={60 - i * 6} height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.2" />
          </g>
        ))}
      </g>

      {/* Full Service tier - FRONT, elevated */}
      <g transform="translate(125, 80)" className="animate-float-y">
        {/* Emerald halo */}
        <rect x="-6" y="-6" width="162" height="252" rx="18" fill="#10B981" fillOpacity="0.2" />

        <rect x="0" y="0" width="150" height="240" rx="14" fill="#0B1D3A" stroke="#10B981" strokeWidth="2" />
        <rect x="0" y="0" width="150" height="6" rx="3" fill="#10B981" />

        {/* MOST POPULAR badge */}
        <g transform="translate(30, -14)">
          <rect x="0" y="0" width="90" height="24" rx="12" fill="url(#pricing-gold)" />
          <path d="M10 12 L12 8 L14 12 L18 13 L14 15 L13 19 L10 16 L7 19 L6 15 L2 13 Z" fill="#FFFFFF" transform="translate(0, 0)" />
          <text x="54" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" letterSpacing="0.5">MOST POPULAR</text>
        </g>

        {/* Big house icon */}
        <g transform="translate(55, 30)">
          <circle cx="20" cy="20" r="22" fill="#10B981" fillOpacity="0.2" />
          <path d="M20 6 L40 22 L0 22 Z" fill="#10B981" />
          <rect x="6" y="22" width="28" height="16" rx="2" fill="#34D399" />
          <rect x="10" y="26" width="6" height="6" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="24" y="26" width="6" height="6" rx="1" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="17" y="32" width="6" height="6" rx="1" fill="#D4A853" />
        </g>

        <text x="75" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800">White-Glove Leasing</text>
        <text x="75" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="9" opacity="0.6">Concierge end-to-end</text>

        <text x="75" y="140" textAnchor="middle" fill="#10B981" fontSize="22" fontWeight="800">1 mo.</text>
        <text x="75" y="154" textAnchor="middle" fill="#FFFFFF" fontSize="8" opacity="0.5">success fee on placement</text>

        {['Strategic pricing', 'Showings', 'Lease execution', 'Move-in coord.'].map((feat, i) => (
          <g key={`f2-${i}`} transform={`translate(16, ${172 + i * 15})`}>
            <circle cx="5" cy="5" r="4.5" fill="#10B981" fillOpacity="0.3" />
            <path d="M2.5 5 L4.5 7 L7.5 3" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="14" y="8" fill="#FFFFFF" fontSize="8" opacity="0.85">{feat}</text>
          </g>
        ))}
      </g>

      {/* Floating accents */}
      <circle cx="50" cy="50" r="4" fill="#10B981" className="animate-soft-ping" />
      <circle cx="360" cy="70" r="3" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="30" cy="320" r="5" fill="#10B981" opacity="0.5" />
      <circle cx="370" cy="330" r="4" fill="#D4A853" opacity="0.5" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   3. ABOUT - Building emblem with credentials
   ────────────────────────────────────────────────────────────────────────── */

export function AboutHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="about-bg" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0B1D3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="about-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C176" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
      </defs>

      {/* Background ellipse */}
      <ellipse cx="200" cy="180" rx="180" ry="140" fill="url(#about-bg)" />

      {/* Skyline - 4 buildings */}
      {/* Left small */}
      <g transform="translate(60, 140)">
        <rect x="0" y="0" width="54" height="140" rx="3" fill="#132D54" />
        <rect x="0" y="0" width="54" height="8" fill="#0B1D3A" />
        {[0, 1, 2, 3, 4, 5].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`b1-${r}-${c}`}
              x={8 + c * 14}
              y={18 + r * 18}
              width="8"
              height="10"
              rx="1"
              fill={(r + c) % 3 === 0 ? '#10B981' : '#FFFFFF'}
              fillOpacity={(r + c) % 3 === 0 ? 0.6 : 0.15}
            />
          ))
        )}
      </g>

      {/* Left-center medium */}
      <g transform="translate(118, 100)">
        <rect x="0" y="0" width="62" height="180" rx="3" fill="#0B1D3A" />
        <rect x="0" y="0" width="62" height="10" fill="#132D54" />
        <rect x="28" y="-16" width="6" height="16" fill="#0B1D3A" />
        <circle cx="31" cy="-18" r="2" fill="#D4A853" className="animate-pulse-dot" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`b2-${r}-${c}`}
              x={10 + c * 16}
              y={22 + r * 18}
              width="10"
              height="10"
              rx="1"
              fill={(r + c) % 2 === 0 ? '#34D399' : '#FFFFFF'}
              fillOpacity={(r + c) % 2 === 0 ? 0.7 : 0.18}
            />
          ))
        )}
      </g>

      {/* Center tallest */}
      <g transform="translate(184, 70)">
        <rect x="0" y="0" width="70" height="210" rx="3" fill="#132D54" />
        <rect x="0" y="0" width="70" height="12" fill="#0B1D3A" />
        <polygon points="0,0 35,-18 70,0" fill="#0B1D3A" />
        <rect x="33" y="-34" width="4" height="16" fill="#132D54" />
        <circle cx="35" cy="-36" r="2.5" fill="#D4A853" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`b3-${r}-${c}`}
              x={8 + c * 14}
              y={24 + r * 18}
              width="8"
              height="10"
              rx="1"
              fill={r === 4 && c === 2 ? '#10B981' : (r + c) % 3 === 0 ? '#34D399' : '#FFFFFF'}
              fillOpacity={r === 4 && c === 2 ? 0.9 : (r + c) % 3 === 0 ? 0.5 : 0.15}
            />
          ))
        )}
      </g>

      {/* Right-center medium */}
      <g transform="translate(258, 110)">
        <rect x="0" y="0" width="58" height="170" rx="3" fill="#0B1D3A" />
        <rect x="0" y="0" width="58" height="10" fill="#132D54" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`b4-${r}-${c}`}
              x={10 + c * 14}
              y={20 + r * 18}
              width="8"
              height="10"
              rx="1"
              fill={(r * c) % 4 === 0 ? '#10B981' : '#FFFFFF'}
              fillOpacity={(r * c) % 4 === 0 ? 0.55 : 0.15}
            />
          ))
        )}
      </g>

      {/* Right small */}
      <g transform="translate(320, 160)">
        <rect x="0" y="0" width="48" height="120" rx="3" fill="#132D54" />
        <rect x="0" y="0" width="48" height="8" fill="#0B1D3A" />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`b5-${r}-${c}`}
              x={10 + c * 18}
              y={16 + r * 18}
              width="10"
              height="10"
              rx="1"
              fill={(r + c) % 2 === 0 ? '#34D399' : '#FFFFFF'}
              fillOpacity={(r + c) % 2 === 0 ? 0.5 : 0.15}
            />
          ))
        )}
      </g>

      {/* Central "Est. 2024" seal/badge over middle building */}
      <g transform="translate(172, 140)" className="animate-float-y">
        <circle cx="46" cy="46" r="46" fill="#FFFFFF" />
        <circle cx="46" cy="46" r="42" fill="none" stroke="url(#about-gold)" strokeWidth="2" />
        <circle cx="46" cy="46" r="36" fill="none" stroke="#D4A853" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.6" />
        <circle cx="46" cy="46" r="30" fill="#0B1D3A" />
        {/* Star */}
        <path d="M46 24 L49 32 L58 33 L51 39 L53 48 L46 43 L39 48 L41 39 L34 33 L43 32 Z" fill="url(#about-gold)" />
        <text x="46" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="700" letterSpacing="0.5">EST.</text>
        <text x="46" y="70" textAnchor="middle" fill="#D4A853" fontSize="10" fontWeight="800">2024</text>
      </g>

      {/* Floating credential badges */}
      <g transform="translate(30, 60)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <rect x="0" y="0" width="60" height="28" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="14" cy="14" r="7" fill="#10B981" fillOpacity="0.15" />
        <path d="M10 14 L13 17 L18 11" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="26" y="18" fill="#0B1D3A" fontSize="9" fontWeight="800">RECO</text>
      </g>

      <g transform="translate(310, 50)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <rect x="0" y="0" width="62" height="28" rx="8" fill="#FFFFFF" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="14" cy="14" r="7" fill="#D4A853" fillOpacity="0.2" />
        <path d="M10 14 L13 17 L18 11" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="26" y="18" fill="#0B1D3A" fontSize="9" fontWeight="800">OREA</text>
      </g>

      <g transform="translate(40, 240)" className="animate-float-y" style={{ animationDelay: '0.7s' }}>
        <rect x="0" y="0" width="58" height="28" rx="8" fill="#FFFFFF" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="14" cy="14" r="7" fill="#10B981" fillOpacity="0.15" />
        <path d="M10 14 L13 17 L18 11" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="26" y="18" fill="#0B1D3A" fontSize="9" fontWeight="800">BBB</text>
      </g>

      <g transform="translate(320, 240)" className="animate-float-y" style={{ animationDelay: '0.2s' }}>
        <rect x="0" y="0" width="58" height="28" rx="8" fill="#FFFFFF" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M14 7 L17 13 L23 14 L18.5 18 L20 24 L14 21 L8 24 L9.5 18 L5 14 L11 13 Z" fill="#D4A853" />
        <text x="34" y="18" fill="#0B1D3A" fontSize="7" fontWeight="800">A+ Rated</text>
      </g>

      {/* Team silhouettes at base */}
      <g transform="translate(140, 290)">
        <circle cx="20" cy="12" r="9" fill="#0B1D3A" />
        <path d="M6 40 C6 26 13 22 20 22 C27 22 34 26 34 40 Z" fill="#0B1D3A" />
        <circle cx="60" cy="8" r="11" fill="#10B981" />
        <path d="M44 40 C44 24 52 18 60 18 C68 18 76 24 76 40 Z" fill="#10B981" />
        <circle cx="100" cy="12" r="9" fill="#132D54" />
        <path d="M86 40 C86 26 93 22 100 22 C107 22 114 26 114 40 Z" fill="#132D54" />
      </g>

      {/* Emerald underline */}
      <rect x="140" y="336" width="120" height="3" rx="1.5" fill="#10B981" />
      <rect x="168" y="342" width="64" height="2" rx="1" fill="#D4A853" />

      {/* Sparkles */}
      <circle cx="100" cy="30" r="3" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="310" cy="280" r="3" fill="#10B981" className="animate-soft-ping" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   4. CONTACT - Message/communication card
   ────────────────────────────────────────────────────────────────────────── */

export function ContactHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="contact-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0 L0 0 0 28" fill="none" stroke="#10B981" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <radialGradient id="contact-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="360" fill="url(#contact-grid)" />
      <circle cx="200" cy="180" r="140" fill="url(#contact-glow)" />

      {/* Central envelope */}
      <g transform="translate(110, 110)" className="animate-float-y">
        <rect x="0" y="10" width="180" height="130" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Envelope flap */}
        <path d="M0 22 L90 82 L180 22" fill="none" stroke="#0B1D3A" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 10 L90 70 L180 10" fill="#0B1D3A" />
        {/* Body lines */}
        <rect x="20" y="92" width="140" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.1" />
        <rect x="20" y="102" width="120" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.08" />
        <rect x="20" y="112" width="90" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.06" />
        {/* Emerald accent line */}
        <rect x="0" y="135" width="180" height="5" rx="0" fill="#10B981" />
        <rect x="0" y="135" width="60" height="5" rx="0" fill="#D4A853" />

        {/* Notification dot "1" on envelope */}
        <g transform="translate(158, -6)" className="animate-pulse-dot">
          <circle cx="10" cy="10" r="14" fill="#D4A853" fillOpacity="0.25" />
          <circle cx="10" cy="10" r="10" fill="#D4A853" />
          <text x="10" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">1</text>
        </g>
      </g>

      {/* Phone with signal waves - top left */}
      <g transform="translate(30, 60)" className="animate-float-y" style={{ animationDelay: '0.4s' }}>
        <rect x="0" y="0" width="70" height="70" rx="14" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M24 22 L32 22 L34 32 L30 36 C32 42 36 46 42 48 L46 44 L56 46 L56 54 C56 56 54 58 52 58 C38 58 20 40 20 26 C20 24 22 22 24 22 Z" fill="#10B981" />
        {/* Signal waves */}
        <path d="M 70 10 A 18 18 0 0 1 86 28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" className="animate-soft-ping" />
        <path d="M 74 10 A 26 26 0 0 1 90 32" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
      </g>

      {/* Location pin with ring pulse - bottom left */}
      <g transform="translate(60, 250)" className="animate-float-y" style={{ animationDelay: '0.6s' }}>
        <circle cx="30" cy="30" r="28" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeOpacity="0.3" className="animate-soft-ping" />
        <circle cx="30" cy="30" r="20" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M30 12 C22 12 16 18 16 26 C16 34 30 50 30 50 C30 50 44 34 44 26 C44 18 38 12 30 12 Z" fill="#D4A853" />
        <circle cx="30" cy="26" r="5" fill="#FFFFFF" />
      </g>

      {/* Chat bubble with typing dots - top right */}
      <g transform="translate(300, 70)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <path d="M0 12 C0 5 5 0 12 0 L66 0 C73 0 78 5 78 12 L78 36 C78 43 73 48 66 48 L22 48 L10 60 L12 48 C5 48 0 43 0 36 Z" fill="#0B1D3A" />
        <circle cx="24" cy="24" r="4" fill="#10B981" className="animate-pulse-dot" />
        <circle cx="40" cy="24" r="4" fill="#10B981" className="animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
        <circle cx="56" cy="24" r="4" fill="#10B981" className="animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
      </g>

      {/* 24h response badge - bottom right */}
      <g transform="translate(290, 240)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <circle cx="40" cy="40" r="40" fill="#10B981" />
        <circle cx="40" cy="40" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
        <text x="40" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="800">24h</text>
        <text x="40" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="7" opacity="0.8" letterSpacing="1">RESPONSE</text>
      </g>

      {/* Small sparkles */}
      <circle cx="200" cy="40" r="3" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="370" cy="180" r="4" fill="#10B981" className="animate-soft-ping" />
      <circle cx="170" cy="310" r="3" fill="#10B981" opacity="0.6" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   5. REVIEWS - Testimonial card with stars
   ────────────────────────────────────────────────────────────────────────── */

export function ReviewsHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="reviews-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="reviews-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C176" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="200" cy="180" rx="180" ry="150" fill="url(#reviews-glow)" />

      {/* Back review card - left */}
      <g transform="translate(20, 80) rotate(-6)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <rect x="0" y="0" width="120" height="130" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <g transform="translate(10, 10)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`bs-${i}`}
              d="M5 0 L6.5 3.5 L10 4 L7.5 6.5 L8 10 L5 8.3 L2 10 L2.5 6.5 L0 4 L3.5 3.5 Z"
              transform={`translate(${i * 11}, 0)`}
              fill="#D4A853"
            />
          ))}
        </g>
        <rect x="10" y="32" width="100" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.15" />
        <rect x="10" y="42" width="86" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.1" />
        <rect x="10" y="52" width="72" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.1" />
        <circle cx="20" cy="108" r="9" fill="#10B981" fillOpacity="0.2" />
        <circle cx="20" cy="104" r="3.5" fill="#10B981" />
        <path d="M14 116 C14 110 17 108 20 108 C23 108 26 110 26 116 Z" fill="#10B981" />
        <text x="34" y="106" fill="#0B1D3A" fontSize="8" fontWeight="700">Sarah M.</text>
        <text x="34" y="116" fill="#0B1D3A" fontSize="7" opacity="0.5">Toronto Owner</text>
      </g>

      {/* Back review card - right */}
      <g transform="translate(260, 90) rotate(7)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <rect x="0" y="0" width="120" height="130" rx="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <g transform="translate(10, 10)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`bs2-${i}`}
              d="M5 0 L6.5 3.5 L10 4 L7.5 6.5 L8 10 L5 8.3 L2 10 L2.5 6.5 L0 4 L3.5 3.5 Z"
              transform={`translate(${i * 11}, 0)`}
              fill="#D4A853"
            />
          ))}
        </g>
        <rect x="10" y="32" width="100" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.15" />
        <rect x="10" y="42" width="92" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.1" />
        <rect x="10" y="52" width="64" height="4" rx="2" fill="#0B1D3A" fillOpacity="0.1" />
        <circle cx="20" cy="108" r="9" fill="#D4A853" fillOpacity="0.2" />
        <circle cx="20" cy="104" r="3.5" fill="#D4A853" />
        <path d="M14 116 C14 110 17 108 20 108 C23 108 26 110 26 116 Z" fill="#D4A853" />
        <text x="34" y="106" fill="#0B1D3A" fontSize="8" fontWeight="700">David K.</text>
        <text x="34" y="116" fill="#0B1D3A" fontSize="7" opacity="0.5">Hamilton Tenant</text>
      </g>

      {/* Main center review card */}
      <g transform="translate(90, 60)" className="animate-float-y">
        {/* Shadow halo */}
        <rect x="-4" y="-2" width="228" height="228" rx="16" fill="#0B1D3A" fillOpacity="0.06" />
        <rect x="0" y="0" width="220" height="220" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Quote mark */}
        <path d="M20 30 C20 22 26 16 34 16 L34 24 C30 24 28 26 28 30 L28 36 L34 36 L34 50 L20 50 Z M46 30 C46 22 52 16 60 16 L60 24 C56 24 54 26 54 30 L54 36 L60 36 L60 50 L46 50 Z" fill="#10B981" opacity="0.8" />

        {/* 5 stars */}
        <g transform="translate(20, 64)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`ms-${i}`}
              d="M10 0 L13 7 L20 7.5 L15 12.5 L16.5 20 L10 16 L3.5 20 L5 12.5 L0 7.5 L7 7 Z"
              transform={`translate(${i * 24}, 0)`}
              fill="url(#reviews-gold)"
            />
          ))}
        </g>

        {/* Review lines */}
        <rect x="20" y="98" width="180" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="20" y="112" width="168" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.15" />
        <rect x="20" y="126" width="150" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.15" />
        <rect x="20" y="140" width="110" height="6" rx="3" fill="#0B1D3A" fillOpacity="0.12" />

        {/* Author */}
        <circle cx="34" cy="182" r="16" fill="#10B981" fillOpacity="0.2" />
        <circle cx="34" cy="176" r="6" fill="#10B981" />
        <path d="M22 192 C22 182 28 178 34 178 C40 178 46 182 46 192 Z" fill="#10B981" />

        <text x="58" y="180" fill="#0B1D3A" fontSize="12" fontWeight="800">Jennifer Lee</text>
        <text x="58" y="194" fill="#0B1D3A" fontSize="9" opacity="0.55">Verified Property Owner · Ottawa</text>

        {/* Google G badge */}
        <g transform="translate(170, 170)">
          <circle cx="15" cy="15" r="15" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M15 9 C18.3 9 20 11 20 11 L22 8.5 C22 8.5 19.5 6 15 6 C10 6 6 10 6 15 C6 20 10 24 15 24 C19 24 22 22 23 18 C23.5 16 23.5 14 23 14 L15 14 L15 17 L20 17 C19.5 19 17.5 21 15 21 C11.5 21 9 18.5 9 15 C9 11.5 11.5 9 15 9 Z" fill="#10B981" />
        </g>
      </g>

      {/* 4.9/5 big badge */}
      <g transform="translate(310, 260)" className="animate-float-y" style={{ animationDelay: '0.2s' }}>
        <circle cx="40" cy="40" r="40" fill="#10B981" />
        <circle cx="40" cy="40" r="32" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 3" />
        <text x="40" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">4.9</text>
        <text x="40" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="8" opacity="0.85" letterSpacing="1">OUT OF 5</text>
        {/* Mini stars */}
        <g transform="translate(22, 58)">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={`bb-${i}`}
              d="M3.5 0 L4.5 2.5 L7 2.7 L5 4.4 L5.7 7 L3.5 5.6 L1.3 7 L2 4.4 L0 2.7 L2.5 2.5 Z"
              transform={`translate(${i * 7.5}, 0)`}
              fill="#D4A853"
            />
          ))}
        </g>
      </g>

      {/* Sparkles */}
      <circle cx="40" cy="280" r="4" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="370" cy="60" r="3" fill="#10B981" className="animate-soft-ping" />
      <circle cx="180" cy="320" r="3" fill="#D4A853" opacity="0.6" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   6. LOCATIONS - Canada map with pins & routes
   ────────────────────────────────────────────────────────────────────────── */

export function LocationsHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern id="locations-topo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 Q20 10 40 20 T80 20" stroke="#10B981" strokeOpacity="0.08" strokeWidth="1" fill="none" />
          <path d="M0 30 Q20 20 40 30 T80 30" stroke="#10B981" strokeOpacity="0.05" strokeWidth="1" fill="none" />
        </pattern>
        <radialGradient id="locations-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="360" fill="url(#locations-topo)" />
      <ellipse cx="200" cy="180" rx="180" ry="140" fill="url(#locations-glow)" />

      {/* Canada outline (abstract, simplified) */}
      <g opacity="0.9">
        <path
          d="M30 140
             Q40 120, 65 115
             Q90 108, 120 105
             Q150 102, 180 100
             Q220 98, 250 100
             Q280 103, 310 108
             Q340 115, 360 130
             Q370 150, 365 170
             Q360 190, 355 210
             Q350 230, 335 245
             Q315 260, 290 262
             Q260 265, 235 255
             Q210 245, 195 250
             Q180 255, 165 265
             Q145 270, 125 262
             Q100 252, 85 235
             Q65 218, 55 200
             Q45 185, 38 170
             Q30 155, 30 140 Z"
          fill="#0B1D3A"
          fillOpacity="0.9"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        {/* Inner highlight */}
        <path
          d="M60 140 Q120 115 200 112 Q280 110 340 145"
          stroke="#34D399"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
          strokeDasharray="2 3"
        />
      </g>

      {/* Route lines connecting cities */}
      <g>
        {/* Vancouver -> Calgary */}
        <line x1="70" y1="175" x2="140" y2="165" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" className="animate-dash-flow" />
        {/* Calgary -> Toronto */}
        <line x1="140" y1="165" x2="250" y2="195" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" className="animate-dash-flow" />
        {/* Toronto -> Ottawa */}
        <line x1="250" y1="195" x2="290" y2="175" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" className="animate-dash-flow" />
        {/* Ottawa -> Montreal */}
        <line x1="290" y1="175" x2="320" y2="170" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 4" className="animate-dash-flow" />
      </g>

      {/* City pins */}
      {[
        { x: 70, y: 175, name: 'Vancouver', size: 'md' },
        { x: 140, y: 165, name: 'Calgary', size: 'md' },
        { x: 250, y: 195, name: 'Toronto', size: 'lg' },
        { x: 290, y: 175, name: 'Ottawa', size: 'md' },
        { x: 320, y: 170, name: 'Montreal', size: 'md' },
      ].map((city) => {
        const r = city.size === 'lg' ? 10 : 7
        return (
          <g key={city.name}>
            {/* Ping ring */}
            <circle cx={city.x} cy={city.y} r={r + 6} fill="#10B981" fillOpacity="0.15" className="animate-soft-ping" />
            {/* Outer circle */}
            <circle cx={city.x} cy={city.y} r={r + 3} fill="#10B981" fillOpacity="0.25" />
            {/* Pin */}
            <circle cx={city.x} cy={city.y} r={r} fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx={city.x} cy={city.y} r={r / 2.5} fill="#FFFFFF" />
            {/* Label */}
            <rect x={city.x - 28} y={city.y + r + 6} width="56" height="16" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
            <text x={city.x} y={city.y + r + 17} textAnchor="middle" fill="#0B1D3A" fontSize="8" fontWeight="700">{city.name}</text>
          </g>
        )
      })}

      {/* Tiny satellite cities (dots) */}
      {[
        { x: 180, y: 180 },
        { x: 210, y: 175 },
        { x: 265, y: 210 },
        { x: 155, y: 190 },
        { x: 310, y: 185 },
        { x: 115, y: 175 },
        { x: 95, y: 185 },
      ].map((d, i) => (
        <circle key={`dot-${i}`} cx={d.x} cy={d.y} r="2" fill="#D4A853" opacity="0.7" />
      ))}

      {/* 160+ cities badge */}
      <g transform="translate(30, 40)" className="animate-float-y">
        <rect x="0" y="0" width="130" height="50" rx="12" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="26" cy="25" r="16" fill="#10B981" fillOpacity="0.15" />
        <path d="M26 15 C22 15 18 19 18 23 C18 29 26 37 26 37 C26 37 34 29 34 23 C34 19 30 15 26 15 Z" fill="#10B981" />
        <circle cx="26" cy="23" r="3" fill="#FFFFFF" />
        <text x="50" y="22" fill="#0B1D3A" fontSize="16" fontWeight="800">160+</text>
        <text x="50" y="36" fill="#0B1D3A" fontSize="9" opacity="0.6">Cities served</text>
      </g>

      {/* Compass */}
      <g transform="translate(320, 40)" className="animate-float-y" style={{ animationDelay: '0.4s' }}>
        <circle cx="25" cy="25" r="24" fill="#FFFFFF" stroke="#0B1D3A" strokeWidth="1.5" />
        <circle cx="25" cy="25" r="20" fill="none" stroke="#0B1D3A" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="1 2" />
        {/* N marker */}
        <text x="25" y="10" textAnchor="middle" fill="#0B1D3A" fontSize="7" fontWeight="800">N</text>
        <text x="25" y="46" textAnchor="middle" fill="#0B1D3A" fontSize="7" fontWeight="700" opacity="0.4">S</text>
        <text x="7" y="28" textAnchor="middle" fill="#0B1D3A" fontSize="7" fontWeight="700" opacity="0.4">W</text>
        <text x="43" y="28" textAnchor="middle" fill="#0B1D3A" fontSize="7" fontWeight="700" opacity="0.4">E</text>
        {/* Needle */}
        <path d="M25 12 L29 25 L25 22 L21 25 Z" fill="#10B981" />
        <path d="M25 38 L29 25 L25 28 L21 25 Z" fill="#D4A853" />
        <circle cx="25" cy="25" r="2.5" fill="#0B1D3A" />
      </g>

      {/* Live indicator */}
      <g transform="translate(30, 300)">
        <rect x="0" y="0" width="110" height="24" rx="12" fill="#0B1D3A" />
        <circle cx="12" cy="12" r="4" fill="#10B981" className="animate-pulse-dot" />
        <text x="24" y="16" fill="#FFFFFF" fontSize="9" fontWeight="700">Live coverage map</text>
      </g>

      {/* Province tags */}
      <g transform="translate(260, 300)">
        <rect x="0" y="0" width="110" height="24" rx="12" fill="#FFFFFF" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="12" cy="12" r="4" fill="#D4A853" />
        <text x="24" y="16" fill="#0B1D3A" fontSize="9" fontWeight="700">ON · BC · QC · AB</text>
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   7. FAQ - Question mark with chat bubbles
   ────────────────────────────────────────────────────────────────────────── */

export function FAQHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="faq-q-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B1D3A" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <radialGradient id="faq-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <pattern id="faq-circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill="#10B981" fillOpacity="0.15" />
          <circle cx="50" cy="30" r="1.5" fill="#10B981" fillOpacity="0.15" />
          <circle cx="30" cy="50" r="1.5" fill="#10B981" fillOpacity="0.15" />
          <line x1="10" y1="10" x2="50" y2="30" stroke="#10B981" strokeOpacity="0.08" strokeWidth="0.8" />
          <line x1="50" y1="30" x2="30" y2="50" stroke="#10B981" strokeOpacity="0.08" strokeWidth="0.8" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="400" height="360" fill="url(#faq-circuit)" />
      <ellipse cx="200" cy="180" rx="170" ry="140" fill="url(#faq-glow)" />

      {/* Central giant question mark */}
      <g transform="translate(140, 60)" className="animate-float-y">
        {/* Backdrop halo */}
        <circle cx="60" cy="110" r="110" fill="#10B981" fillOpacity="0.08" />
        <circle cx="60" cy="110" r="90" fill="#FFFFFF" fillOpacity="0.6" />

        {/* Giant "?" */}
        <path
          d="M60 40
             C 40 40, 28 52, 28 72
             L 48 72
             C 48 62, 52 58, 60 58
             C 68 58, 72 62, 72 70
             C 72 78, 68 82, 60 88
             C 50 96, 48 104, 48 120
             L 68 120
             C 68 110, 70 106, 76 102
             C 88 94, 94 84, 94 70
             C 94 52, 82 40, 60 40 Z"
          fill="url(#faq-q-grad)"
        />
        {/* Dot */}
        <circle cx="58" cy="148" r="12" fill="#10B981" />
        <circle cx="58" cy="148" r="5" fill="#FFFFFF" />

        {/* Magnifier overlapping question mark */}
        <g transform="translate(70, 90)">
          <circle cx="30" cy="30" r="26" fill="#FFFFFF" stroke="#D4A853" strokeWidth="3" />
          <circle cx="30" cy="30" r="20" fill="#D4A853" fillOpacity="0.08" />
          <line x1="48" y1="48" x2="62" y2="62" stroke="#D4A853" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="62" r="3" fill="#D4A853" />
        </g>
      </g>

      {/* Chat bubbles with question marks floating around */}
      <g transform="translate(30, 60)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <path d="M0 8 C0 4 4 0 8 0 L44 0 C48 0 52 4 52 8 L52 28 C52 32 48 36 44 36 L18 36 L8 44 L10 36 C4 36 0 32 0 28 Z" fill="#0B1D3A" />
        <text x="26" y="26" textAnchor="middle" fill="#10B981" fontSize="18" fontWeight="800">?</text>
      </g>

      <g transform="translate(310, 50)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <path d="M0 8 C0 4 4 0 8 0 L44 0 C48 0 52 4 52 8 L52 28 C52 32 48 36 44 36 L18 36 L8 44 L10 36 C4 36 0 32 0 28 Z" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
        <text x="26" y="26" textAnchor="middle" fill="#0B1D3A" fontSize="18" fontWeight="800">?</text>
      </g>

      <g transform="translate(50, 270)" className="animate-float-y" style={{ animationDelay: '0.7s' }}>
        <path d="M0 8 C0 4 4 0 8 0 L44 0 C48 0 52 4 52 8 L52 28 C52 32 48 36 44 36 L18 36 L8 44 L10 36 C4 36 0 32 0 28 Z" fill="#10B981" />
        <text x="26" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">?</text>
      </g>

      {/* Lightbulb (answer) */}
      <g transform="translate(290, 250)" className="animate-float-y" style={{ animationDelay: '0.2s' }}>
        <circle cx="35" cy="35" r="32" fill="#D4A853" fillOpacity="0.15" className="animate-soft-ping" />
        <circle cx="35" cy="35" r="26" fill="#FFFFFF" stroke="#D4A853" strokeWidth="1.5" />
        {/* Bulb */}
        <path d="M35 18 C27 18 22 24 22 31 C22 35 24 38 27 40 L27 46 L43 46 L43 40 C46 38 48 35 48 31 C48 24 43 18 35 18 Z" fill="#D4A853" />
        <rect x="28" y="47" width="14" height="4" rx="1" fill="#0B1D3A" />
        <rect x="29" y="52" width="12" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.6" />
        {/* Rays */}
        <line x1="35" y1="8" x2="35" y2="14" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="22" x2="20" y2="24" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
        <line x1="54" y1="22" x2="50" y2="24" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Mini Q&A cards */}
      <g transform="translate(20, 140)" className="animate-float-y" style={{ animationDelay: '0.4s' }}>
        <rect x="0" y="0" width="80" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="6" y="6" width="20" height="10" rx="3" fill="#10B981" />
        <text x="16" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">Q</text>
        <rect x="30" y="8" width="44" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.4" />
        <rect x="30" y="14" width="32" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.25" />
        <rect x="6" y="22" width="20" height="10" rx="3" fill="#D4A853" />
        <text x="16" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">A</text>
        <rect x="30" y="24" width="40" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.4" />
        <rect x="30" y="30" width="28" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.25" />
      </g>

      <g transform="translate(300, 140)" className="animate-float-y" style={{ animationDelay: '0.6s' }}>
        <rect x="0" y="0" width="80" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="6" y="6" width="20" height="10" rx="3" fill="#10B981" />
        <text x="16" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">Q</text>
        <rect x="30" y="8" width="40" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.4" />
        <rect x="30" y="14" width="28" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.25" />
        <rect x="6" y="22" width="20" height="10" rx="3" fill="#D4A853" />
        <text x="16" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">A</text>
        <rect x="30" y="24" width="44" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.4" />
        <rect x="30" y="30" width="30" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.25" />
      </g>

      {/* Sparkles */}
      <g>
        <path d="M70 330 L73 336 L79 337 L74 341 L76 347 L70 344 L64 347 L66 341 L61 337 L67 336 Z" fill="#D4A853" opacity="0.8" className="animate-soft-ping" />
        <path d="M340 320 L343 326 L349 327 L344 331 L346 337 L340 334 L334 337 L336 331 L331 327 L337 326 Z" fill="#10B981" opacity="0.7" />
      </g>
      <circle cx="200" cy="40" r="3" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="180" cy="320" r="3" fill="#10B981" opacity="0.6" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   8. RESOURCES - Stacked books & articles
   ────────────────────────────────────────────────────────────────────────── */

export function ResourcesHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="resources-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4A853" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="resources-book1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#132D54" />
          <stop offset="100%" stopColor="#0B1D3A" />
        </linearGradient>
        <linearGradient id="resources-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C176" />
          <stop offset="100%" stopColor="#D4A853" />
        </linearGradient>
      </defs>

      {/* Warm background */}
      <rect x="0" y="0" width="400" height="360" fill="url(#resources-warm)" />
      <ellipse cx="200" cy="280" rx="160" ry="40" fill="#0B1D3A" fillOpacity="0.1" />

      {/* Floating article card - back left */}
      <g transform="translate(30, 60) rotate(-8)" className="animate-float-y" style={{ animationDelay: '0.3s' }}>
        <rect x="0" y="0" width="110" height="80" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="110" height="30" rx="8" fill="#10B981" fillOpacity="0.15" />
        {/* Mini chart bars */}
        <g transform="translate(14, 8)">
          <rect x="0" y="10" width="6" height="10" rx="1" fill="#10B981" fillOpacity="0.5" />
          <rect x="10" y="6" width="6" height="14" rx="1" fill="#10B981" fillOpacity="0.7" />
          <rect x="20" y="2" width="6" height="18" rx="1" fill="#10B981" />
          <rect x="30" y="8" width="6" height="12" rx="1" fill="#D4A853" fillOpacity="0.8" />
        </g>
        <text x="58" y="20" fill="#0B1D3A" fontSize="7" fontWeight="700" opacity="0.7">ANALYTICS</text>
        <rect x="10" y="40" width="90" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.35" />
        <rect x="10" y="48" width="74" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.25" />
        <rect x="10" y="56" width="60" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="10" y="66" width="40" height="5" rx="2.5" fill="#10B981" fillOpacity="0.2" />
      </g>

      {/* Floating article card - back right with "Market Report 2026" */}
      <g transform="translate(270, 50) rotate(6)" className="animate-float-y" style={{ animationDelay: '0.5s' }}>
        <rect x="0" y="0" width="120" height="90" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="120" height="34" rx="8" fill="#0B1D3A" />
        <text x="10" y="15" fill="#D4A853" fontSize="7" fontWeight="800" letterSpacing="1">2026</text>
        <text x="10" y="26" fill="#FFFFFF" fontSize="8" fontWeight="700">Market Report</text>

        {/* Mini line chart */}
        <polyline
          points="10,72 26,64 42,68 58,54 74,58 90,46 110,50"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="90" cy="46" r="3" fill="#10B981" />
        <circle cx="90" cy="46" r="1.2" fill="#FFFFFF" />

        <rect x="10" y="80" width="44" height="6" rx="2" fill="#D4A853" fillOpacity="0.25" />
        <text x="32" y="85" textAnchor="middle" fill="#D4A853" fontSize="6" fontWeight="800">DOWNLOAD</text>
      </g>

      {/* Floating article card - mid right */}
      <g transform="translate(300, 170) rotate(-4)" className="animate-float-y" style={{ animationDelay: '0.7s' }}>
        <rect x="0" y="0" width="96" height="70" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="0" y="0" width="96" height="24" rx="8" fill="#D4A853" fillOpacity="0.2" />
        <circle cx="14" cy="12" r="6" fill="#D4A853" />
        <text x="26" y="16" fill="#0B1D3A" fontSize="7" fontWeight="700">GUIDE</text>
        <rect x="10" y="34" width="76" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.3" />
        <rect x="10" y="42" width="60" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="10" y="54" width="40" height="6" rx="3" fill="#10B981" fillOpacity="0.2" />
      </g>

      {/* Book stack */}
      {/* Bottom book */}
      <g transform="translate(100, 240) rotate(2)">
        <rect x="0" y="0" width="200" height="30" rx="3" fill="#D4A853" />
        <rect x="0" y="0" width="200" height="6" rx="3" fill="url(#resources-gold)" />
        <rect x="10" y="12" width="4" height="12" rx="1" fill="#0B1D3A" fillOpacity="0.3" />
        <rect x="20" y="12" width="140" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.4" />
        <rect x="20" y="20" width="100" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.3" />
        <rect x="178" y="12" width="12" height="12" rx="2" fill="#0B1D3A" fillOpacity="0.2" />
      </g>

      {/* Middle book */}
      <g transform="translate(90, 210) rotate(-3)">
        <rect x="0" y="0" width="210" height="30" rx="3" fill="#10B981" />
        <rect x="0" y="0" width="210" height="6" rx="3" fill="#34D399" />
        <rect x="10" y="12" width="4" height="12" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
        <rect x="20" y="12" width="150" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.6" />
        <rect x="20" y="20" width="110" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.45" />
        <circle cx="188" cy="18" r="5" fill="#FFFFFF" fillOpacity="0.3" />
      </g>

      {/* Top book - slightly open with pages */}
      <g transform="translate(100, 150)">
        {/* Shadow underneath */}
        <ellipse cx="100" cy="58" rx="110" ry="6" fill="#0B1D3A" fillOpacity="0.1" />

        {/* Left page */}
        <path d="M0 10 L100 0 L100 56 L0 56 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Right page */}
        <path d="M100 0 L200 10 L200 56 L100 56 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Fold */}
        <line x1="100" y1="0" x2="100" y2="56" stroke="#0B1D3A" strokeOpacity="0.2" strokeWidth="1" />

        {/* Left page lines */}
        <rect x="14" y="16" width="70" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.3" />
        <rect x="14" y="24" width="80" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="14" y="30" width="70" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="14" y="36" width="75" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="14" y="44" width="50" height="4" rx="2" fill="#10B981" fillOpacity="0.4" />

        {/* Right page lines */}
        <rect x="112" y="16" width="60" height="3" rx="1.5" fill="#0B1D3A" fillOpacity="0.3" />
        <rect x="112" y="24" width="80" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="112" y="30" width="75" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="112" y="36" width="78" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />
        <rect x="112" y="44" width="55" height="2" rx="1" fill="#0B1D3A" fillOpacity="0.2" />

        {/* Book cover behind */}
        <path d="M-6 4 L100 -6 L206 4 L200 10 L100 0 L0 10 Z" fill="url(#resources-book1)" />
        <rect x="-6" y="4" width="8" height="56" rx="2" fill="#0B1D3A" />
        <rect x="198" y="4" width="8" height="56" rx="2" fill="#0B1D3A" />

        {/* Gold bookmark sticking out top */}
        <path d="M140 -12 L140 18 L146 14 L152 18 L152 -12 Z" fill="url(#resources-gold)" stroke="#D4A853" strokeWidth="0.5" />
      </g>

      {/* Graduation cap icon top */}
      <g transform="translate(170, 70)" className="animate-float-y">
        <rect x="-4" y="-4" width="64" height="64" rx="16" fill="#FFFFFF" fillOpacity="0.6" />
        <rect x="0" y="0" width="56" height="56" rx="14" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.4" />
        <g transform="translate(8, 14)">
          <path d="M20 0 L40 10 L20 20 L0 10 Z" fill="#0B1D3A" />
          <path d="M6 14 L6 24 C6 26 12 28 20 28 C28 28 34 26 34 24 L34 14 L20 20 Z" fill="#10B981" />
          <rect x="38" y="9" width="1.5" height="12" fill="#D4A853" />
          <path d="M38 21 L41 28 L36 28 Z" fill="#D4A853" />
        </g>
      </g>

      {/* Sparkles/stars */}
      <circle cx="40" cy="200" r="3" fill="#D4A853" className="animate-soft-ping" />
      <circle cx="370" cy="260" r="4" fill="#10B981" className="animate-soft-ping" />
      <circle cx="200" cy="40" r="3" fill="#D4A853" opacity="0.6" />
      <path d="M60 330 L62 334 L66 335 L63 337 L64 341 L60 339 L56 341 L57 337 L54 335 L58 334 Z" fill="#10B981" opacity="0.7" />
    </svg>
  )
}
