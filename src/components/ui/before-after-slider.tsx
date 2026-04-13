'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeAlt = 'Before',
  afterAlt = 'After',
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handleMouseDown = () => { isDragging.current = true }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className={cn('before-after-slider relative aspect-video overflow-hidden rounded-2xl', className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After (full width background) */}
      <Image src={afterImage} alt={afterAlt} fill className="object-cover" />

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeImage} alt={beforeAlt} fill className="object-cover" />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border-2 border-white bg-[#0B1D3A]/80 shadow-lg backdrop-blur-sm">
          <svg className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute left-3 top-3 rounded-full bg-[#0B1D3A]/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-emerald-600/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  )
}
