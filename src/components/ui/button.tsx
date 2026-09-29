import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-gold text-brand-navy hover:-translate-y-0.5 hover:bg-[#b8924f]",
        secondary:
          "bg-brand-navy text-white hover:-translate-y-0.5 hover:bg-[#15233a]",
        outline:
          "border border-white/50 bg-transparent text-white hover:bg-white/10",
        outlineNavy:
          "border border-border bg-surface text-brand-navy hover:-translate-y-0.5 hover:border-brand-navy/30 hover:bg-mist",
        ghost: "rounded-lg text-brand-navy hover:bg-mist",
      },
      size: {
        default: "h-11 min-w-[44px] px-5 text-[15px]",
        sm: "h-9 min-w-[44px] px-4 text-sm",
        lg: "h-12 min-w-[44px] px-6 text-base",
        xl: "h-14 min-w-[44px] px-8 text-base md:text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export { buttonVariants }
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}
