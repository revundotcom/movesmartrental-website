'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TypewriterProps {
  text: string
  className?: string
  /** Speed per character in ms. Default 40 */
  speed?: number
  /** Delay before starting in ms. Default 0 */
  delay?: number
  /** Show blinking cursor. Default true */
  cursor?: boolean
  /** Trigger the animation. Default true */
  trigger?: boolean
  onComplete?: () => void
}

export function Typewriter({
  text,
  className,
  speed = 40,
  delay = 0,
  cursor = true,
  trigger = true,
  onComplete,
}: TypewriterProps) {
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [trigger, delay])

  useEffect(() => {
    if (!started) return
    if (charIndex >= text.length) {
      onComplete?.()
      return
    }

    const timeout = setTimeout(() => {
      setCharIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [started, charIndex, text.length, speed, onComplete])

  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {text.slice(0, charIndex)}
      {cursor && charIndex < text.length && (
        <span className="typewriter-cursor" />
      )}
    </span>
  )
}
