'use client'

interface ScoreRingProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  trackColor?: string
  label?: string
  className?: string
}

/**
 * SVG circular progress gauge. Animates to target via CSS stroke-dashoffset.
 * Ported from the website-factory template; default color = brand-emerald.
 */
export function ScoreRing({
  value,
  size = 64,
  strokeWidth = 5,
  color = '#10B981',
  trackColor = 'rgba(255,255,255,0.12)',
  label,
  className,
}: ScoreRingProps) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.max(0, Math.min(100, value)) / 100) * circ

  return (
    <div
      className={`relative ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        width={size}
        height={size}
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center leading-none"
        style={{ color }}
      >
        <span className="font-heading text-sm font-bold">{value}%</span>
        {label && <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wider opacity-70">{label}</span>}
      </div>
    </div>
  )
}
