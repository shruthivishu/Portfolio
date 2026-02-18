import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-warm-200 bg-white/60 px-4 py-3',
        'text-sm text-foreground placeholder:text-warm-400',
        'backdrop-blur-sm transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-blush-200 focus:border-blush-300',
        'hover:border-warm-300 hover:bg-white/80',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
