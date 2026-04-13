'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  className?: string
}

export function TextRotate({ texts, rotationInterval = 2500, className }: TextRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % texts.length), rotationInterval)
    return () => clearInterval(id)
  }, [texts.length, rotationInterval])

  return (
    <span className={cn('overflow-hidden inline-flex', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-120%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="inline-block whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
