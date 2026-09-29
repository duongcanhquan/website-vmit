export default function AdminLoading() {
  return (
    <div aria-busy="true" aria-live="polite" className="animate-pulse">
      <span className="sr-only">Đang tải…</span>
      <div className="h-8 w-64 rounded-[3px] bg-border/70" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-[3px] bg-border/50" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-20 rounded-[3px] border border-border bg-white" />
        ))}
      </div>
    </div>
  )
}
