'use client'
import {
  Home,
  Users,
  Shield,
  Paintbrush,
  Megaphone,
  FileText,
  Monitor,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
  Zap,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { RevealOnScroll, revealItem } from '@/components/ui/reveal-on-scroll'
import type { BenefitsBlockProps } from '@/types/blocks'
import { IllustrationPropertyManagement } from '@/components/illustrations'

const ICON_MAP: Record<string, LucideIcon> = {
  home: Home,
  users: Users,
  shield: Shield,
  paintbrush: Paintbrush,
  megaphone: Megaphone,
  'file-text': FileText,
  monitor: Monitor,
  'dollar-sign': DollarSign,
  star: Star,
  'check-circle': CheckCircle,
  clock: Clock,
  'trending-up': TrendingUp,
  heart: Heart,
  zap: Zap,
  award: Award,
}

export function BenefitsBlock({
  benefits,
  title = 'Benefits',
  columns = 3,
}: BenefitsBlockProps) {
  if (!benefits || benefits.length === 0) return null

  const gridCols: Record<number, string> = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }

  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(#0B1D3A0d 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Section illustration - hidden on mobile, decorative accent on desktop */}
      <div className="absolute -right-8 top-8 hidden opacity-20 xl:block" aria-hidden="true">
        <IllustrationPropertyManagement className="h-48 w-48" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* Section heading with emerald underline */}
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-12 text-center">
            <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
              {title}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#10B981]" />
          </motion.div>
        </RevealOnScroll>

        <RevealOnScroll
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${gridCols[columns]}`}
          stagger={0.08}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
              ? ICON_MAP[benefit.icon] || Star
              : Star

            return (
              <motion.div
                key={index}
                variants={revealItem}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-emerald-100">
                  <IconComponent className="size-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1D3A]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
