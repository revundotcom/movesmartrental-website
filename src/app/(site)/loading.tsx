import { Skeleton } from '@/components/ui/skeleton'

export default function SiteLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="relative bg-brand-navy py-16 px-6">
        <div className="container-site max-w-4xl mx-auto space-y-6">
          <Skeleton height="0.875rem" width="120px" className="!bg-white/10" />
          <Skeleton height="3.5rem" width="80%" className="!bg-white/10" />
          <Skeleton height="3.5rem" width="60%" className="!bg-white/10" />
          <Skeleton height="1.25rem" width="70%" className="!bg-white/10" />
          <div className="flex gap-4 pt-4">
            <Skeleton height="3rem" width="200px" rounded="lg" className="!bg-white/10" />
            <Skeleton height="3rem" width="160px" rounded="lg" className="!bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-site py-16 space-y-16">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton height="2.5rem" width="80px" className="mx-auto" />
              <Skeleton height="0.875rem" width="120px" className="mx-auto" />
            </div>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-6 space-y-4">
              <Skeleton height="1rem" width="40px" />
              <Skeleton height="1.5rem" width="70%" />
              <div className="space-y-2">
                <Skeleton height="0.875rem" width="100%" />
                <Skeleton height="0.875rem" width="85%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
