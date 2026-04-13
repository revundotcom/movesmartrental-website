'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, ArrowUpRight } from 'lucide-react'

interface RelatedResource {
  title: string
  slug: string
  category?: string
  excerpt?: string
}

interface RelatedResourcesProps {
  resources: RelatedResource[]
  title?: string
}

export function RelatedResources({ resources, title = 'Related Resources' }: RelatedResourcesProps) {
  if (resources.length === 0) return null

  return (
    <section className="bg-slate-50/50 py-16 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-600">Learn More</p>
          <h2 className="font-display text-2xl font-normal tracking-tight text-[#0B1D3A] sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 6).map((resource, i) => (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={`/resources/${resource.slug}/`}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="size-4 text-emerald-500" aria-hidden="true" />
                  {resource.category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      {resource.category}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-[#0B1D3A] group-hover:text-emerald-700">
                  {resource.title}
                </h3>
                {resource.excerpt && (
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">
                    {resource.excerpt}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  Read more
                  <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
