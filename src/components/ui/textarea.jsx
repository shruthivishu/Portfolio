import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[140px] w-full rounded-2xl border border-warm-200 bg-white/60 px-4 py-3',
        'text-sm text-foreground placeholder:text-warm-400',
        'backdrop-blur-sm transition-all duration-300 resize-none',
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
Textarea.displayName = 'Textarea'

export { Textarea }
