import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blush-100 text-warm-700 border border-blush-200',
        rose: 'bg-rose-100 text-rose-500 border border-rose-200',
        cream: 'bg-cream-200 text-warm-600 border border-cream-300',
        warm: 'bg-warm-100 text-warm-700 border border-warm-200',
        outline: 'border border-warm-300 text-warm-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Badge = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
