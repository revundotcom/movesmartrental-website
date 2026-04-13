'use client'

import { useEffect, useRef } from 'react'

interface DotGridProps {
  className?: string
  dotColor?: string
  glowColor?: string
  dotSize?: number
  spacing?: number
}

export function InteractiveDotGrid({
  className = '',
  dotColor = 'rgba(16, 185, 129, 0.15)',
  glowColor = 'rgba(16, 185, 129, 0.4)',
  dotSize = 1.5,
  spacing = 28,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Skip on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const { x: mx, y: my } = mouseRef.current
      const radius = 120

      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2)
          const proximity = Math.max(0, 1 - dist / radius)

          ctx.beginPath()
          ctx.arc(x, y, dotSize + proximity * 2, 0, Math.PI * 2)
          ctx.fillStyle = proximity > 0 ? glowColor : dotColor
          ctx.globalAlpha = 0.3 + proximity * 0.7
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [dotColor, glowColor, dotSize, spacing])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
