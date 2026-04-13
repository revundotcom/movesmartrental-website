'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  life: number
}

const COLORS = ['#10B981', '#D4A853', '#34D399', '#059669', '#E5C17C', '#0B1D3A']

interface ConfettiProps {
  /** Whether to fire confetti. Default false */
  active: boolean
  /** Number of particles. Default 80 */
  count?: number
  /** Duration in ms before cleanup. Default 3000 */
  duration?: number
}

export function Confetti({ active, count = 80, duration = 3000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(undefined)

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const particles: Particle[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height * 0.3

    for (let i = 0; i < count; i++) {
      particles.push({
        x: centerX,
        y: centerY,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * -12 - 2,
        size: Math.random() * 6 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1,
      })
    }

    particlesRef.current = particles
  }, [count])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current = particlesRef.current.filter(p => p.life > 0)

    for (const p of particlesRef.current) {
      p.x += p.vx
      p.vy += 0.15
      p.y += p.vy
      p.rotation += p.rotationSpeed
      p.life -= 0.008
      p.vx *= 0.99

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = p.life
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx.restore()
    }

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    createParticles()
    animate()

    const timeout = setTimeout(() => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }, duration)

    return () => {
      clearTimeout(timeout)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [active, createParticles, animate, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  )
}
