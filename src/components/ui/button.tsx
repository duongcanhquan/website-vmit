import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/** Academia-style buttons: teal primary, 3px radius, soft shadow, 0.5s transition */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[3px] text-sm font-semibold tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white shadow-button hover:bg-accent-teal-hover hover:shadow-none",
        secondary:
          "bg-white text-primary shadow-button hover:bg-mist hover:shadow-none",
        outline:
          "border border-white bg-white text-primary shadow-button hover:bg-white/90 hover:shadow-none",
        outlineNavy:
          "border border-border bg-surface text-brand-navy hover:border-primary hover:text-primary",
        ghost: "text-brand-navy hover:bg-mist hover:text-primary",
      },
      size: {
        default: "h-11 min-w-[44px] px-7 text-[15px]",
        sm: "h-9 min-w-[44px] px-4 text-sm",
        lg: "h-[52px] min-w-[44px] px-8 text-base",
        xl: "h-14 min-w-[44px] px-9 text-base md:text-lg",
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
