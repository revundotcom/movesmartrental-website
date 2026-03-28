/**
 * MoveSmart Rentals — Custom SVG Illustration Library
 * Brand-aligned illustrations for a premium real estate leasing platform.
 * All illustrations use brand tokens: Navy #0B1D3A, Emerald #10B981, Gold #D4A853
 */

/* ──────────────────────────────────────────────────────────────────────────
   HERO: Abstract city skyline + key + shield composition
   ────────────────────────────────────────────────────────────────────────── */

export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Glow orbs */}
      <ellipse cx="260" cy="360" rx="200" ry="40" fill="#10B981" fillOpacity="0.08" />
      <ellipse cx="380" cy="180" rx="90" ry="90" fill="#10B981" fillOpacity="0.06" />
      <ellipse cx="120" cy="200" rx="60" ry="60" fill="#D4A853" fillOpacity="0.05" />

      {/* City skyline background */}
      <g opacity="0.18">
        {/* Skyscrapers */}
        <rect x="20" y="200" width="28" height="160" rx="2" fill="white" />
        <rect x="26" y="210" width="6" height="8" rx="1" fill="#10B981" />
        <rect x="36" y="210" width="6" height="8" rx="1" fill="#10B981" />
        <rect x="26" y="225" width="6" height="8" rx="1" fill="white" fillOpacity="0.5" />
        <rect x="36" y="225" width="6" height="8" rx="1" fill="white" fillOpacity="0.5" />

        <rect x="55" y="160" width="36" height="200" rx="2" fill="white" />
        <rect x="60" y="170" width="8" height="10" rx="1" fill="#10B981" />
        <rect x="74" y="170" width="8" height="10" rx="1" fill="#10B981" />
        <rect x="60" y="188" width="8" height="10" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="74" y="188" width="8" height="10" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="60" y="206" width="8" height="10" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="74" y="206" width="8" height="10" rx="1" fill="white" fillOpacity="0.3" />
        <rect x="67" y="148" width="6" height="14" rx="1" fill="white" />

        <rect x="98" y="180" width="24" height="180" rx="2" fill="white" />
        <rect x="103" y="190" width="5" height="7" rx="1" fill="#10B981" />
        <rect x="112" y="190" width="5" height="7" rx="1" fill="#10B981" />

        <rect x="430" y="170" width="32" height="190" rx="2" fill="white" />
        <rect x="435" y="180" width="7" height="9" rx="1" fill="#10B981" />
        <rect x="448" y="180" width="7" height="9" rx="1" fill="#10B981" />
        <rect x="435" y="196" width="7" height="9" rx="1" fill="white" fillOpacity="0.4" />
        <rect x="448" y="196" width="7" height="9" rx="1" fill="white" fillOpacity="0.4" />

        <rect x="468" y="200" width="28" height="160" rx="2" fill="white" />
        <rect x="473" y="210" width="6" height="8" rx="1" fill="#10B981" />
        <rect x="483" y="210" width="6" height="8" rx="1" fill="#10B981" />
      </g>

      {/* Main building — center */}
      <rect x="180" y="90" width="80" height="270" rx="4" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="185" y="100" width="14" height="18" rx="2" fill="#10B981" fillOpacity="0.6" />
      <rect x="203" y="100" width="14" height="18" rx="2" fill="#10B981" fillOpacity="0.6" />
      <rect x="221" y="100" width="14" height="18" rx="2" fill="#10B981" fillOpacity="0.6" />
      <rect x="185" y="126" width="14" height="18" rx="2" fill="white" fillOpacity="0.2" />
      <rect x="203" y="126" width="14" height="18" rx="2" fill="white" fillOpacity="0.2" />
      <rect x="221" y="126" width="14" height="18" rx="2" fill="white" fillOpacity="0.3" />
      <rect x="185" y="152" width="14" height="18" rx="2" fill="white" fillOpacity="0.15" />
      <rect x="203" y="152" width="14" height="18" rx="2" fill="#10B981" fillOpacity="0.4" />
      <rect x="221" y="152" width="14" height="18" rx="2" fill="white" fillOpacity="0.15" />
      <rect x="185" y="178" width="14" height="18" rx="2" fill="white" fillOpacity="0.2" />
      <rect x="203" y="178" width="14" height="18" rx="2" fill="white" fillOpacity="0.1" />
      <rect x="221" y="178" width="14" height="18" rx="2" fill="white" fillOpacity="0.25" />
      {/* Door */}
      <rect x="207" y="330" width="26" height="30" rx="3" fill="#10B981" fillOpacity="0.4" />
      <rect x="207" y="330" width="26" height="30" rx="3" stroke="#10B981" strokeOpacity="0.6" strokeWidth="1" />

      {/* Secondary building — right */}
      <rect x="270" y="130" width="60" height="230" rx="4" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
      <rect x="275" y="140" width="10" height="14" rx="1.5" fill="#D4A853" fillOpacity="0.5" />
      <rect x="289" y="140" width="10" height="14" rx="1.5" fill="#D4A853" fillOpacity="0.5" />
      <rect x="303" y="140" width="10" height="14" rx="1.5" fill="#D4A853" fillOpacity="0.3" />
      <rect x="275" y="162" width="10" height="14" rx="1.5" fill="white" fillOpacity="0.15" />
      <rect x="289" y="162" width="10" height="14" rx="1.5" fill="white" fillOpacity="0.2" />
      <rect x="303" y="162" width="10" height="14" rx="1.5" fill="#10B981" fillOpacity="0.3" />
      <rect x="275" y="184" width="10" height="14" rx="1.5" fill="white" fillOpacity="0.1" />
      <rect x="289" y="184" width="10" height="14" rx="1.5" fill="white" fillOpacity="0.15" />
      <rect x="303" y="184" width="10" height="14" rx="1.5" fill="white" fillOpacity="0.1" />

      {/* Shield — floating upper right */}
      <g transform="translate(340, 40)">
        {/* Glow */}
        <ellipse cx="50" cy="55" rx="40" ry="35" fill="#10B981" fillOpacity="0.15" />
        {/* Shield body */}
        <path d="M50 5 L85 20 L85 55 C85 78 67 93 50 100 C33 93 15 78 15 55 L15 20 Z"
          fill="#0F2847" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.8" />
        {/* Shield inner */}
        <path d="M50 14 L76 26 L76 55 C76 73 63 85 50 91 C37 85 24 73 24 55 L24 26 Z"
          fill="#10B981" fillOpacity="0.12" />
        {/* Check mark */}
        <path d="M36 52 L46 62 L66 40" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Key — floating lower left */}
      <g transform="translate(60, 250)">
        <ellipse cx="45" cy="45" rx="36" ry="36" fill="#D4A853" fillOpacity="0.1" />
        {/* Key bow (circle) */}
        <circle cx="32" cy="32" r="18" stroke="#D4A853" strokeWidth="2.5" fill="none" strokeOpacity="0.8" />
        <circle cx="32" cy="32" r="10" fill="#D4A853" fillOpacity="0.2" />
        {/* Key shaft */}
        <line x1="44" y1="40" x2="72" y2="68" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
        {/* Key teeth */}
        <line x1="60" y1="54" x2="56" y2="58" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        <line x1="66" y1="60" x2="62" y2="64" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
      </g>

      {/* Floating stat chips */}
      <g transform="translate(350, 200)">
        <rect x="0" y="0" width="130" height="48" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="10" y="10" width="28" height="28" rx="8" fill="#10B981" fillOpacity="0.2" />
        <text x="24" y="29" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="700">✓</text>
        <text x="48" y="21" fill="white" fontSize="11" fontWeight="700" opacity="0.9">98% Occupied</text>
        <text x="48" y="35" fill="white" fontSize="9" opacity="0.5">Avg across portfolio</text>
      </g>

      <g transform="translate(340, 258)">
        <rect x="0" y="0" width="130" height="48" rx="12" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
        <rect x="10" y="10" width="28" height="28" rx="8" fill="#D4A853" fillOpacity="0.2" />
        <text x="24" y="29" textAnchor="middle" fill="#D4A853" fontSize="11" fontWeight="700">14d</text>
        <text x="48" y="21" fill="white" fontSize="11" fontWeight="700" opacity="0.9">Fast Fill Time</text>
        <text x="48" y="35" fill="white" fontSize="9" opacity="0.5">Average days to lease</text>
      </g>

      {/* Dot grid accent */}
      <g opacity="0.12">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={145 + col * 12}
              cy={40 + row * 12}
              r="1.2"
              fill="white"
            />
          ))
        )}
      </g>

      {/* Ground line */}
      <line x1="0" y1="360" x2="520" y2="360" stroke="white" strokeOpacity="0.06" strokeWidth="1" />

      {/* Floating ring accents */}
      <circle cx="170" cy="60" r="30" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.2" fill="none" strokeDasharray="4 6" />
      <circle cx="170" cy="60" r="20" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   PROCESS: 7-step illustrated workflow
   ────────────────────────────────────────────────────────────────────────── */

export function ProcessIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Connector line */}
      <line x1="40" y1="80" x2="520" y2="80" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="6 6" />

      {/* Step nodes */}
      {[
        { x: 40, icon: '₵', label: 'Price' },
        { x: 120, icon: '📣', label: 'Market' },
        { x: 200, icon: '👁', label: 'Show' },
        { x: 280, icon: '📋', label: 'Offer' },
        { x: 360, icon: '🛡', label: 'Screen' },
        { x: 440, icon: '✍', label: 'Lease' },
        { x: 520, icon: '🔑', label: 'Move-In' },
      ].map((step, i) => (
        <g key={step.label}>
          {/* Glow */}
          <circle cx={step.x} cy="80" r="24" fill="#10B981" fillOpacity={i === 6 ? "0.15" : "0.06"} />
          {/* Circle */}
          <circle
            cx={step.x}
            cy="80"
            r="16"
            fill={i === 6 ? "#10B981" : "#0B1D3A"}
            stroke={i === 6 ? "#10B981" : "#10B981"}
            strokeWidth="1.5"
            strokeOpacity={i === 6 ? "1" : "0.4"}
          />
          {/* Step number */}
          <text
            x={step.x}
            y="85"
            textAnchor="middle"
            fill={i === 6 ? "white" : "#10B981"}
            fontSize="11"
            fontWeight="700"
          >
            {i + 1}
          </text>
          {/* Label */}
          <text x={step.x} y="116" textAnchor="middle" fill="#0B1D3A" fontSize="9" fontWeight="600" opacity="0.7">
            {step.label}
          </text>
        </g>
      ))}

      {/* Arrow at end */}
      <path d="M526 76 L536 80 L526 84" fill="#10B981" opacity="0.5" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   PROPERTY OWNER: Person with property + check marks
   ────────────────────────────────────────────────────────────────────────── */

export function OwnerIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background blob */}
      <ellipse cx="200" cy="200" rx="160" ry="140" fill="#10B981" fillOpacity="0.06" />

      {/* House outline */}
      <g transform="translate(80, 80)">
        {/* Roof */}
        <path d="M120 20 L220 90 L20 90 Z" fill="#0B1D3A" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Roof cap */}
        <circle cx="120" cy="20" r="6" fill="#10B981" />
        {/* House body */}
        <rect x="30" y="90" width="180" height="130" rx="4" fill="#0B1D3A" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
        {/* Windows */}
        <rect x="50" y="110" width="40" height="35" rx="4" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="70" y1="110" x2="70" y2="145" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="50" y1="127" x2="90" y2="127" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="150" y="110" width="40" height="35" rx="4" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="170" y1="110" x2="170" y2="145" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="150" y1="127" x2="190" y2="127" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Door */}
        <rect x="95" y="155" width="50" height="65" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="140" cy="188" r="3" fill="#D4A853" fillOpacity="0.8" />
        {/* Path */}
        <rect x="108" y="220" width="24" height="8" rx="2" fill="#10B981" fillOpacity="0.2" />
      </g>

      {/* Floating checkmarks */}
      <g transform="translate(270, 110)">
        <rect x="0" y="0" width="100" height="36" rx="10" fill="white" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="18" cy="18" r="10" fill="#10B981" fillOpacity="0.15" />
        <path d="M13 18 L17 22 L24 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="34" y="14" fill="#0B1D3A" fontSize="9" fontWeight="700" opacity="0.8">Rent Protected</text>
        <text x="34" y="26" fill="#0B1D3A" fontSize="8" opacity="0.5">100% guaranteed</text>
      </g>

      <g transform="translate(270, 156)">
        <rect x="0" y="0" width="100" height="36" rx="10" fill="white" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="18" cy="18" r="10" fill="#D4A853" fillOpacity="0.15" />
        <path d="M13 18 L17 22 L24 14" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="34" y="14" fill="#0B1D3A" fontSize="9" fontWeight="700" opacity="0.8">Tenant Placed</text>
        <text x="34" y="26" fill="#0B1D3A" fontSize="8" opacity="0.5">Fully screened</text>
      </g>

      <g transform="translate(270, 202)">
        <rect x="0" y="0" width="100" height="36" rx="10" fill="white" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="18" cy="18" r="10" fill="#10B981" fillOpacity="0.15" />
        <path d="M13 18 L17 22 L24 14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="34" y="14" fill="#0B1D3A" fontSize="9" fontWeight="700" opacity="0.8">Lease Signed</text>
        <text x="34" y="26" fill="#0B1D3A" fontSize="8" opacity="0.5">Legally compliant</text>
      </g>

      {/* Ground shadow */}
      <ellipse cx="200" cy="345" rx="120" ry="8" fill="#0B1D3A" fillOpacity="0.08" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   TECHNOLOGY: Portal / dashboard mockup
   ────────────────────────────────────────────────────────────────────────── */

export function PortalIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Glow */}
      <ellipse cx="240" cy="280" rx="180" ry="30" fill="#10B981" fillOpacity="0.1" />

      {/* Browser window */}
      <rect x="40" y="20" width="400" height="280" rx="12" fill="#0B1D3A" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

      {/* Browser chrome */}
      <rect x="40" y="20" width="400" height="36" rx="12" fill="#132D54" />
      <rect x="40" y="44" width="400" height="12" fill="#132D54" />
      <circle cx="64" cy="38" r="5" fill="#DC2626" fillOpacity="0.6" />
      <circle cx="80" cy="38" r="5" fill="#D4A853" fillOpacity="0.6" />
      <circle cx="96" cy="38" r="5" fill="#10B981" fillOpacity="0.6" />

      {/* URL bar */}
      <rect x="118" y="30" width="220" height="16" rx="8" fill="white" fillOpacity="0.05" />
      <text x="228" y="42" textAnchor="middle" fill="white" fontSize="7" opacity="0.4">app.movesmartrentals.com</text>

      {/* Sidebar */}
      <rect x="40" y="56" width="80" height="244" fill="white" fillOpacity="0.03" />
      {/* Nav items */}
      {['Dashboard', 'Properties', 'Tenants', 'Payments', 'Reports'].map((item, i) => (
        <g key={item}>
          <rect x="44" y={72 + i * 36} width="72" height="28" rx="6"
            fill={i === 0 ? "#10B981" : "transparent"}
            fillOpacity={i === 0 ? "0.15" : "0"}
          />
          <rect x="52" y={81 + i * 36} width="8" height="8" rx="2"
            fill={i === 0 ? "#10B981" : "white"}
            fillOpacity={i === 0 ? "0.8" : "0.2"}
          />
          <text x="66" y={88 + i * 36} fill="white"
            fontSize="7"
            opacity={i === 0 ? 0.9 : 0.35}
            fontWeight={i === 0 ? "700" : "400"}
          >
            {item}
          </text>
        </g>
      ))}

      {/* Main content area */}
      {/* Stats row */}
      {[
        { label: 'Properties', value: '12', color: '#10B981' },
        { label: 'Occupied', value: '11', color: '#D4A853' },
        { label: 'Revenue', value: '$18.4k', color: '#10B981' },
      ].map((stat, i) => (
        <g key={stat.label}>
          <rect x={132 + i * 104} y="68" width="96" height="56" rx="8"
            fill="white" fillOpacity="0.04"
            stroke="white" strokeOpacity="0.06" strokeWidth="1"
          />
          <text x={180 + i * 104} y="95" textAnchor="middle"
            fill={stat.color} fontSize="16" fontWeight="800" opacity="0.9"
          >
            {stat.value}
          </text>
          <text x={180 + i * 104} y="112" textAnchor="middle"
            fill="white" fontSize="7" opacity="0.45"
          >
            {stat.label}
          </text>
        </g>
      ))}

      {/* Bar chart */}
      <rect x="132" y="140" width="300" height="100" rx="8" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
      <text x="145" y="156" fill="white" fontSize="7" fontWeight="700" opacity="0.5">MONTHLY REVENUE</text>
      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
        <g key={i}>
          <rect
            x={148 + i * 40}
            y={216 - h * 0.6}
            width="20"
            height={h * 0.6}
            rx="3"
            fill="#10B981"
            fillOpacity={i === 5 ? "0.8" : "0.3"}
          />
        </g>
      ))}

      {/* Recent activity */}
      <rect x="132" y="252" width="300" height="36" rx="8" fill="white" fillOpacity="0.03" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
      <circle cx="148" cy="270" r="7" fill="#10B981" fillOpacity="0.2" />
      <path d="M144 270 L147 273 L153 267" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="162" y="267" fill="white" fontSize="7" fontWeight="600" opacity="0.7">Rent received · Unit 4B · $2,400</text>
      <text x="162" y="278" fill="white" fontSize="6" opacity="0.3">2 hours ago</text>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   ONTARIO MAP: Illustrated province map with city pins
   ────────────────────────────────────────────────────────────────────────── */

export function OntarioMapIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Glow */}
      <ellipse cx="200" cy="180" rx="160" ry="110" fill="#10B981" fillOpacity="0.05" />

      {/* Simplified Ontario silhouette */}
      <path
        d="M60 240 L80 200 L70 170 L90 140 L110 120 L150 100 L200 90 L240 95 L280 110 L310 100 L340 120 L350 150 L330 170 L310 180 L320 210 L300 230 L270 240 L240 250 L200 255 L160 250 L120 245 Z"
        fill="#10B981"
        fillOpacity="0.08"
        stroke="#10B981"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M60 240 L80 200 L70 170 L90 140 L110 120 L150 100 L200 90 L240 95 L280 110 L310 100 L340 120 L350 150 L330 170 L310 180 L320 210 L300 230 L270 240 L240 250 L200 255 L160 250 L120 245 Z"
        fill="none"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeDasharray="8 4"
      />

      {/* Lake Ontario */}
      <path
        d="M120 245 L160 250 L200 255 L240 250 L270 240 L290 248 L280 265 L230 270 L170 268 L130 262 Z"
        fill="#132D54"
        fillOpacity="0.6"
      />
      <text x="200" y="263" textAnchor="middle" fill="#10B981" fontSize="7" opacity="0.5" fontStyle="italic">Lake Ontario</text>

      {/* City pins */}
      {[
        { x: 215, y: 230, name: 'Toronto', major: true },
        { x: 200, y: 218, name: 'Mississauga', major: false },
        { x: 185, y: 215, name: 'Brampton', major: false },
        { x: 230, y: 215, name: 'Markham', major: false },
        { x: 175, y: 222, name: 'Oakville', major: false },
        { x: 165, y: 218, name: 'Burlington', major: false },
        { x: 158, y: 208, name: 'Hamilton', major: false },
        { x: 310, y: 145, name: 'Ottawa', major: true },
        { x: 130, y: 185, name: 'Kitchener', major: false },
        { x: 120, y: 175, name: 'Guelph', major: false },
        { x: 140, y: 155, name: 'London', major: false },
        { x: 218, y: 200, name: 'Vaughan', major: false },
      ].map((city) => (
        <g key={city.name}>
          {city.major && (
            <circle cx={city.x} cy={city.y} r="10" fill="#10B981" fillOpacity="0.15" />
          )}
          <circle
            cx={city.x}
            cy={city.y}
            r={city.major ? 5 : 3.5}
            fill={city.major ? "#10B981" : "#D4A853"}
            stroke="white"
            strokeWidth={city.major ? "1.5" : "1"}
            strokeOpacity="0.8"
          />
          {city.major && (
            <text
              x={city.x + 8}
              y={city.y + 3}
              fill="white"
              fontSize="7"
              fontWeight="700"
              opacity="0.8"
            >
              {city.name}
            </text>
          )}
        </g>
      ))}

      {/* Legend */}
      <g transform="translate(20, 260)">
        <circle cx="6" cy="6" r="4" fill="#10B981" />
        <text x="14" y="10" fill="white" fontSize="7" opacity="0.6">Major city</text>
        <circle cx="6" cy="20" r="3" fill="#D4A853" />
        <text x="14" y="24" fill="white" fontSize="7" opacity="0.6">Service area</text>
      </g>

      {/* 20+ cities label */}
      <g transform="translate(310, 220)">
        <rect x="0" y="0" width="70" height="40" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        <text x="35" y="17" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="800">20+</text>
        <text x="35" y="31" textAnchor="middle" fill="white" fontSize="7" opacity="0.6">Cities Served</text>
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   TENANT SCREENING: Document with magnifier + checklist
   ────────────────────────────────────────────────────────────────────────── */

export function ScreeningIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background */}
      <ellipse cx="180" cy="200" rx="140" ry="100" fill="#10B981" fillOpacity="0.06" />

      {/* Document */}
      <rect x="80" y="40" width="160" height="210" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="80" y="40" width="160" height="42" rx="10" fill="#0B1D3A" />
      <rect x="80" y="68" width="160" height="14" fill="#0B1D3A" />
      <text x="160" y="67" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" opacity="0.9">TENANT SCREENING</text>
      <text x="160" y="78" textAnchor="middle" fill="#10B981" fontSize="7" opacity="0.8">REPORT</text>

      {/* Score circle */}
      <circle cx="160" cy="118" r="26" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" />
      <circle cx="160" cy="118" r="20" fill="white" />
      <text x="160" y="114" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="800">780</text>
      <text x="160" y="126" textAnchor="middle" fill="#0B1D3A" fontSize="7" opacity="0.6">Credit Score</text>

      {/* Checklist items */}
      {[
        { y: 158, label: 'Employment Verified', done: true },
        { y: 176, label: 'Credit Check Passed', done: true },
        { y: 194, label: 'References Checked', done: true },
        { y: 212, label: 'Rental History Clear', done: true },
        { y: 230, label: 'ID Verification', done: true },
      ].map((item) => (
        <g key={item.label}>
          <circle cx="100" cy={item.y} r="7" fill="#10B981" fillOpacity="0.15" />
          <path
            d={`M97 ${item.y} L99.5 ${item.y + 2.5} L104 ${item.y - 2.5}`}
            stroke="#10B981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="114" y={item.y + 4} fill="#0B1D3A" fontSize="8" opacity="0.75">{item.label}</text>
        </g>
      ))}

      {/* Approved stamp */}
      <g transform="translate(148, 240) rotate(-15)">
        <rect x="0" y="0" width="60" height="22" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeOpacity="0.7" />
        <text x="30" y="15" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="800" opacity="0.8">APPROVED</text>
      </g>

      {/* Magnifier */}
      <g transform="translate(200, 70)">
        <circle cx="35" cy="35" r="26" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" strokeOpacity="0.7" />
        <circle cx="35" cy="35" r="18" fill="white" fillOpacity="0.5" />
        <line x1="54" y1="54" x2="70" y2="70" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Magnifier content: graph bars */}
        <rect x="26" y="38" width="6" height="10" rx="1" fill="#10B981" fillOpacity="0.5" />
        <rect x="33" y="33" width="6" height="15" rx="1" fill="#10B981" fillOpacity="0.7" />
        <rect x="40" y="36" width="6" height="12" rx="1" fill="#D4A853" fillOpacity="0.7" />
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   EMPTY STATES / DECORATIVE: Floating abstract shapes
   ────────────────────────────────────────────────────────────────────────── */

export function AbstractDecor({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Large rings */}
      <circle cx="100" cy="100" r="80" stroke="#10B981" strokeWidth="1" strokeOpacity="0.12" fill="none" strokeDasharray="10 8" />
      <circle cx="100" cy="100" r="55" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.08" fill="none" />
      <circle cx="500" cy="300" r="100" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.1" fill="none" strokeDasharray="6 10" />
      <circle cx="500" cy="300" r="65" stroke="#D4A853" strokeWidth="0.8" strokeOpacity="0.07" fill="none" />

      {/* Floating cards */}
      <rect x="180" y="60" width="100" height="70" rx="12" fill="#0B1D3A" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="192" y="74" width="40" height="6" rx="3" fill="#10B981" fillOpacity="0.4" />
      <rect x="192" y="86" width="70" height="4" rx="2" fill="white" fillOpacity="0.1" />
      <rect x="192" y="96" width="55" height="4" rx="2" fill="white" fillOpacity="0.08" />
      <rect x="192" y="106" width="40" height="4" rx="2" fill="white" fillOpacity="0.06" />

      <rect x="320" y="140" width="120" height="80" rx="12" fill="#0B1D3A" stroke="#D4A853" strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="345" cy="165" r="12" fill="#D4A853" fillOpacity="0.15" />
      <text x="345" y="170" textAnchor="middle" fill="#D4A853" fontSize="10" fontWeight="800" opacity="0.6">$</text>
      <rect x="365" y="158" width="60" height="5" rx="2" fill="white" fillOpacity="0.12" />
      <rect x="365" y="169" width="45" height="4" rx="2" fill="white" fillOpacity="0.08" />
      <rect x="332" y="188" width="96" height="4" rx="2" fill="white" fillOpacity="0.06" />

      {/* Dots grid */}
      <g opacity="0.15">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <circle
              key={`d-${row}-${col}`}
              cx={400 + col * 16}
              cy={60 + row * 16}
              r="2"
              fill="#10B981"
            />
          ))
        )}
      </g>

      {/* Lines */}
      <line x1="0" y1="200" x2="600" y2="200" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
      <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

      {/* Cross accents */}
      <g transform="translate(240, 280)" opacity="0.3">
        <line x1="0" y1="8" x2="16" y2="8" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g transform="translate(560, 80)" opacity="0.25">
        <line x1="0" y1="8" x2="16" y2="8" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   FRANCHISE: Growth map / network nodes
   ────────────────────────────────────────────────────────────────────────── */

export function FranchiseIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Network connections */}
      {[
        { x1: 250, y1: 150, x2: 100, y2: 80 },
        { x1: 250, y1: 150, x2: 400, y2: 80 },
        { x1: 250, y1: 150, x2: 80, y2: 220 },
        { x1: 250, y1: 150, x2: 420, y2: 220 },
        { x1: 250, y1: 150, x2: 250, y2: 40 },
        { x1: 100, y1: 80, x2: 170, y2: 50 },
        { x1: 400, y1: 80, x2: 330, y2: 50 },
      ].map((line, i) => (
        <line
          key={i}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke="#10B981"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="4 4"
        />
      ))}

      {/* Satellite nodes */}
      {[
        { cx: 100, cy: 80, r: 16, color: '#10B981', label: 'ON' },
        { cx: 400, cy: 80, r: 14, color: '#10B981', label: 'QC' },
        { cx: 80, cy: 220, r: 12, color: '#D4A853', label: 'BC' },
        { cx: 420, cy: 220, r: 12, color: '#D4A853', label: 'AB' },
        { cx: 250, cy: 40, r: 10, color: '#D4A853', label: 'MB' },
        { cx: 170, cy: 50, r: 8, color: '#10B981', label: '' },
        { cx: 330, cy: 50, r: 8, color: '#10B981', label: '' },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r={node.r + 8} fill={node.color} fillOpacity="0.07" />
          <circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color} fillOpacity="0.2" stroke={node.color} strokeWidth="1.5" strokeOpacity="0.6" />
          {node.label && (
            <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill="white" fontSize="7" fontWeight="700" opacity="0.8">
              {node.label}
            </text>
          )}
        </g>
      ))}

      {/* Central hub */}
      <circle cx="250" cy="150" r="40" fill="#10B981" fillOpacity="0.1" />
      <circle cx="250" cy="150" r="28" fill="#0B1D3A" stroke="#10B981" strokeWidth="2" />
      <text x="250" y="145" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700">Move</text>
      <text x="250" y="158" textAnchor="middle" fill="white" fontSize="8" opacity="0.7">Smart</text>

      {/* Pulsing ring */}
      <circle cx="250" cy="150" r="50" stroke="#10B981" strokeWidth="1" strokeOpacity="0.15" fill="none" strokeDasharray="8 6" />

      {/* Growth arrow */}
      <g transform="translate(20, 260)">
        <text x="0" y="20" fill="white" fontSize="11" fontWeight="800" opacity="0.8">Expanding</text>
        <text x="0" y="33" fill="#10B981" fontSize="9" opacity="0.7">Canada + United States</text>
      </g>
    </svg>
  )
}
