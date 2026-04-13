/**
 * MoveSmart Rentals - Custom SVG Illustration Library
 * Brand-aligned illustrations for a premium real estate leasing platform.
 * All illustrations use brand tokens: Navy #0B1D3A, Emerald #10B981, Gold #D4A853
 */

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
      {/* Static SVG data - index key is safe */}
      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
        <g key={`bar-${h}-${i}`}>
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
      // Static SVG data - index key is safe
      ].map((line) => (
        <line
          key={`line-${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
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
      // Static SVG data - index key is safe
      ].map((node) => (
        <g key={`node-${node.cx}-${node.cy}`}>
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

/* ──────────────────────────────────────────────────────────────────────────
   PROPERTY MANAGEMENT: Apartment block with chart, wrench, people icons
   ────────────────────────────────────────────────────────────────────────── */

export function IllustrationPropertyManagement({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="120" cy="100" r="88" fill="#E2F8F1" />

      {/* Main apartment block */}
      <rect x="60" y="50" width="120" height="130" rx="4" fill="#0B1D3A" />
      {/* Parapet */}
      <rect x="56" y="46" width="128" height="12" rx="3" fill="#0B1D3A" />
      {/* Entrance canopy */}
      <rect x="96" y="160" width="48" height="8" rx="2" fill="#10B981" fillOpacity="0.7" />
      {/* Door */}
      <rect x="102" y="156" width="36" height="24" rx="2" fill="#10B981" fillOpacity="0.4" />
      <circle cx="132" cy="168" r="2.5" fill="#D4A853" />

      {/* Window grid - 3 columns × 3 rows */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`w-${col}-${row}`}
            x={72 + col * 34}
            y={68 + row * 28}
            width="22"
            height="18"
            rx="2"
            fill={col === 1 && row === 1 ? '#10B981' : col === 0 && row === 0 ? '#10B981' : 'white'}
            fillOpacity={col === 1 && row === 1 ? 0.7 : col === 0 && row === 0 ? 0.5 : 0.12}
          />
        ))
      )}

      {/* Chart icon - top right floating card */}
      <rect x="168" y="44" width="46" height="40" rx="8" fill="white" stroke="#10B981" strokeWidth="1.5" />
      <rect x="176" y="68" width="6" height="10" rx="1" fill="#10B981" fillOpacity="0.5" />
      <rect x="184" y="62" width="6" height="16" rx="1" fill="#10B981" fillOpacity="0.8" />
      <rect x="192" y="65" width="6" height="13" rx="1" fill="#D4A853" fillOpacity="0.8" />
      <line x1="174" y1="78" x2="200" y2="78" stroke="#E2E8F0" strokeWidth="1" />

      {/* Wrench icon - bottom left floating card */}
      <rect x="26" y="120" width="42" height="40" rx="8" fill="white" stroke="#10B981" strokeWidth="1.5" />
      {/* Wrench shape */}
      <path d="M47 128 C42 128 38 132 38 137 C38 140 40 143 43 144 L50 152 C51 153 52 153 53 152 C54 151 54 150 53 149 L46 142 C48 141 50 139 50 137 C50 132 52 128 47 128 Z" fill="#10B981" />
      <circle cx="47" cy="136" r="3" fill="white" />

      {/* People icon - right side floating card */}
      <rect x="172" y="112" width="44" height="40" rx="8" fill="white" stroke="#10B981" strokeWidth="1.5" />
      {/* Two person silhouettes */}
      <circle cx="188" cy="122" r="5" fill="#0B1D3A" />
      <path d="M181 146 C181 136 185 132 188 132 C191 132 195 136 195 146 Z" fill="#0B1D3A" />
      <circle cx="200" cy="122" r="5" fill="#10B981" fillOpacity="0.7" />
      <path d="M193 146 C193 136 197 132 200 132 C203 132 207 136 207 146 Z" fill="#10B981" fillOpacity="0.7" />

      {/* Ground shadow */}
      <ellipse cx="120" cy="185" rx="64" ry="6" fill="#0B1D3A" fillOpacity="0.08" />
    </svg>
  )
}
