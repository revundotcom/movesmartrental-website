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
    <section className="relative bg-slate-50 overflow-hidden py-28">
      {/* Section illustration - hidden on mobile, decorative accent on desktop */}
      <div className="absolute -right-8 top-8 hidden opacity-20 xl:block" aria-hidden="true">
        <IllustrationPropertyManagement className="h-48 w-48" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll>
          <motion.div variants={revealItem} className="mb-16">
            <h2 className="font-display text-3xl font-normal tracking-tight text-[#0B1D3A] sm:text-4xl">
              {title}
            </h2>
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
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_2px_12px_rgba(11,29,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-[0_12px_40px_rgba(11,29,58,0.12)]"
              >
                {/* Top accent bar on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-2xl transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }}
                  aria-hidden="true"
                />
                <div className="mb-5 flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <IconComponent className="size-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-emerald">
                  {benefit.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
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
