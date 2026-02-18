import { motion } from 'framer-motion'

const shapes = [
  { color: 'bg-blush-200/40', size: 'w-72 h-72', left: '10%', top: '20%', delay: 0 },
  { color: 'bg-cream-300/30', size: 'w-96 h-96', right: '5%', top: '10%', delay: 2 },
  { color: 'bg-rose-200/20', size: 'w-64 h-64', left: '60%', top: '60%', delay: 4 },
  { color: 'bg-sand-300/30', size: 'w-80 h-80', left: '5%', bottom: '10%', delay: 1 },
  { color: 'bg-blush-100/40', size: 'w-56 h-56', right: '20%', bottom: '20%', delay: 3 },
]

export default function FloatingShapes({ count = 5 }) {
  const selectedShapes = shapes.slice(0, count)

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {selectedShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color} ${shape.size} blob-shape opacity-60`}
          style={{
            left: shape.left,
            right: shape.right,
            top: shape.top,
            bottom: shape.bottom,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  )
}
