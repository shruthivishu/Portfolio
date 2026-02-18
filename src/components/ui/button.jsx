import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-cream-50 hover:bg-warm-800 shadow-sm hover:shadow-md',
        soft:
          'bg-blush-100 text-warm-700 hover:bg-blush-200 border border-blush-200',
        outline:
          'border-2 border-warm-300 text-foreground hover:bg-warm-50 hover:border-warm-400',
        ghost:
          'text-warm-600 hover:text-foreground hover:bg-warm-50',
        rose:
          'bg-rose-400 text-white hover:bg-rose-500 shadow-sm hover:shadow-md',
        cream:
          'bg-cream-200 text-warm-700 hover:bg-cream-300 border border-cream-300',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        xl: 'h-16 px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-hover="true"
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
