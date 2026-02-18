import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const directions = {
  up: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const { initial, animate } = directions[direction] || directions.up

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
