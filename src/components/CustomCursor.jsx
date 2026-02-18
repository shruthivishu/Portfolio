import { motion, useSpring } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CustomCursor() {
  const { position, isHovering, isClicking } = useMousePosition()

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const x = useSpring(position.x, springConfig)
  const y = useSpring(position.y, springConfig)

  // Update springs when position changes
  x.set(position.x)
  y.set(position.y)

  return (
    <>
      {/* Main heart cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y }}
      >
        <motion.svg
          width={isHovering ? 36 : 24}
          height={isHovering ? 36 : 24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
          style={{ marginLeft: -12, marginTop: -12 }}
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.4 : 1,
            rotate: isClicking ? -15 : isHovering ? 10 : 0,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isHovering ? '#e8655a' : '#e8918f'}
            stroke={isHovering ? '#d4736f' : '#f9b5a8'}
            strokeWidth="0.5"
          />
        </motion.svg>
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: useSpring(position.x, { damping: 40, stiffness: 150 }),
          y: useSpring(position.y, { damping: 40, stiffness: 150 }),
        }}
      >
        <motion.div
          className="rounded-full"
          style={{ marginLeft: -20, marginTop: -20 }}
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            backgroundColor: isHovering
              ? 'rgba(253, 213, 204, 0.3)'
              : 'rgba(249, 181, 168, 0.15)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        />
      </motion.div>
    </>
  )
}
