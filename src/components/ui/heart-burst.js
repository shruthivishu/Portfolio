import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Heart SVG reused from ExploreButton
export const HEART_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

export function useHeartBurst() {
  const [hearts, setHearts] = useState([])
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spawnHearts = useCallback(() => {
    if (prefersReducedMotion) return
    const edgePositions = [
      { startX: '20%', startY: '0%', dx: -15, dy: -35 },
      { startX: '50%', startY: '0%', dx: 5, dy: -40 },
      { startX: '80%', startY: '0%', dx: 15, dy: -30 },
      { startX: '30%', startY: '100%', dx: -10, dy: 35 },
      { startX: '70%', startY: '100%', dx: 10, dy: 40 },
      { startX: '0%', startY: '30%', dx: -40, dy: -10 },
      { startX: '0%', startY: '70%', dx: -35, dy: 10 },
      { startX: '100%', startY: '30%', dx: 40, dy: -10 },
      { startX: '100%', startY: '70%', dx: 35, dy: 10 },
    ]
    const newHearts = edgePositions.map((pos, i) => ({
      id: Date.now() + i,
      ...pos,
      delay: Math.random() * 0.1,
      scale: 0.5 + Math.random() * 0.4,
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 800)
  }, [prefersReducedMotion])

  return { hearts, spawnHearts }
}

export function HeartBurst({ hearts }) {
  return (
    <AnimatePresence>
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ left: heart.startX, top: heart.startY }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.3 }}
          animate={{ opacity: 0, x: heart.dx, y: heart.dy, scale: heart.scale }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, delay: heart.delay, ease: 'easeOut' }}
        >
          {HEART_SVG}
        </motion.span>
      ))}
    </AnimatePresence>
  )
}
