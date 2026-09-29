import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-red text-white shadow-[0_12px_30px_-12px_rgba(227,27,35,0.75)] hover:-translate-y-0.5 hover:bg-[#c9161d] hover:shadow-[0_16px_34px_-12px_rgba(227,27,35,0.85)]",
        secondary:
          "bg-brand-navy text-white shadow-[0_12px_30px_-14px_rgba(0,29,126,0.65)] hover:-translate-y-0.5 hover:bg-[#00155f]",
        outline:
          "border border-white/55 bg-white/10 text-white backdrop-blur-md hover:border-white hover:bg-white/20",
        outlineNavy:
          "border border-brand-navy/20 bg-white text-brand-navy hover:border-brand-navy/40 hover:bg-brand-navy/[0.04]",
        ghost: "rounded-lg text-brand-navy hover:bg-brand-navy/5",
      },
      size: {
        default: "h-12 min-w-[44px] px-6 text-[15px]",
        sm: "h-10 min-w-[44px] px-4 text-sm",
        lg: "h-14 min-w-[44px] px-8 text-base md:text-lg",
        xl: "h-16 min-w-[44px] px-10 text-lg md:text-xl",
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
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </button>
  )
}
