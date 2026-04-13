'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

interface TextScrambleProps {
  text: string
  className?: string
  /** Duration per character in ms. Default 50 */
  speed?: number
  /** Delay before starting in ms. Default 0 */
  delay?: number
  /** Whether the scramble is triggered. Default true */
  trigger?: boolean
}

export function TextScramble({ text, className, speed = 50, delay = 0, trigger = true }: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text)
  const isScrambling = useRef(false)

  const scramble = useCallback(() => {
    isScrambling.current = true
    let iteration = 0
    const maxIterations = text.length

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayed(text)
        isScrambling.current = false
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  useEffect(() => {
    if (!trigger) return
    const timeout = setTimeout(scramble, delay)
    return () => clearTimeout(timeout)
  }, [trigger, delay, scramble])

  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {displayed}
    </span>
  )
}
