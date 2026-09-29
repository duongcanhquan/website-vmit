import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl text-brand-navy">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      {actions}
    </div>
  )
}

export function Field({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn("block text-sm font-bold text-brand-navy", className)}>
      {label}
      <div className="mt-1">{children}</div>
    </label>
  )
}

export const inputClass =
  "h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium outline-none focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/15"

export const textareaClass =
  "min-h-24 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium outline-none focus:border-brand-red/40 focus:ring-2 focus:ring-brand-red/15"

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-white p-5 shadow-sm", className)}>{children}</div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-10 text-center text-muted">{message}</p>
}

export function ErrorState({ message }: { message: string }) {
  return <p className="rounded-2xl border border-brand-red/20 bg-brand-red/5 px-4 py-4 text-sm text-brand-red">{message}</p>
}
