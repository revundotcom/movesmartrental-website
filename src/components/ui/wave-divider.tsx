interface WaveDividerProps {
  /** CSS color value for the wave fill (the "to" section's background color) */
  fill: string
  /** Flip the wave vertically. Default false. */
  flip?: boolean
  className?: string
}

export function WaveDivider({ fill, flip = false, className }: WaveDividerProps) {
  return (
    <div
      className={`-mb-px -mt-px overflow-hidden leading-none ${className ?? ''}`}
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: 60, display: 'block' }}
      >
        <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  )
}
