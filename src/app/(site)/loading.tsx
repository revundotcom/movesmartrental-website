export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-4 border-[#0A2647]/20 border-t-[#10B981]" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
