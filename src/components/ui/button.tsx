import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[3px] text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-[0_24px_36px_-11px_rgb(0_0_0_/_9%)] hover:bg-[#169b90]",
        secondary:
          "bg-white text-primary shadow-[0_24px_36px_-11px_rgb(0_0_0_/_9%)] hover:bg-mist",
        outline:
          "border border-white/70 bg-white text-primary hover:bg-white/90",
        outlineNavy:
          "border border-border bg-surface text-brand-navy hover:border-primary hover:text-primary",
        ghost: "rounded-md text-brand-navy hover:bg-mist hover:text-primary",
      },
      size: {
        default: "h-11 min-w-[44px] px-5 text-[15px]",
        sm: "h-9 min-w-[44px] px-4 text-sm",
        lg: "h-12 min-w-[44px] px-7 text-base",
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
