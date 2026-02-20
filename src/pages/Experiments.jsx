import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Shapes, Pen, Zap, Wand2, Dices, ArrowRight, Flower2 } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import FloatingShapes from '@/components/FloatingShapes'
import MagneticElement from '@/components/MagneticElement'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const experiments = [
  {
    id: 1,
    title: 'How It All Began',
    description: 'A personal reflection on hesitation, self doubt, and the moment I finally decided to begin sharing my design thoughts.',
    category: 'Story',
    icon: Palette,
    color: 'from-blush-100 via-rose-50 to-cream-100',
    emoji: '🎨',
    link: 'https://www.instagram.com/reel/DJHcD5zPX1G/',
    image: '/experiment1.jpg',
  },
  {
    id: 2,
    title: 'The Scrolling Experiment',
    description: 'A lighthearted editing exploration inspired by something we all do a little too often.',
    category: 'Play',
    icon: Shapes,
    color: 'from-cream-200 via-sand-100 to-warm-50',
    emoji: '✦',
    link: 'https://www.instagram.com/p/DJZYJLBtaY3/',
    image: '/experiment2.jpg',
  },
  {
    id: 3,
    title: 'Quirky Designer Habits',
    description: 'A playful collection of the little design habits and tendencies that quietly shape how I think and work.',
    category: 'Personality',
    icon: Pen,
    color: 'from-warm-100 via-cream-100 to-sand-100',
    emoji: '🔤',
    link: 'https://www.instagram.com/p/DJg_JVLN4Lb/',
    image: '/experiment3.jpg',
  },
  {
    id: 4,
    title: 'The Little Red Dot',
    description: 'A reflection on one of the most familiar interface patterns and a question of whether it still holds meaning today.',
    category: 'Interaction',
    icon: Zap,
    color: 'from-rose-50 via-blush-50 to-cream-100',
    emoji: '⚡',
    link: 'https://www.instagram.com/reel/DLPMOCbvhdc/',
    image: '/experiment4.jpg',
  },
  {
    id: 5,
    title: 'UXplain It',
    description: 'Exploring the psychology behind design trends and the subtle mechanisms that shape what we find irresistible.',
    category: 'Concept',
    icon: Wand2,
    color: 'from-sand-200 via-cream-200 to-warm-100',
    emoji: '🪄',
    link: 'https://www.instagram.com/reel/DL7xi9XvoFD/',
    image: '/experiment5.png',
  },
  {
    id: 6,
    title: 'The Studio',
    description: 'A playful glimpse into the creative chaos of my design process.',
    category: 'Designer Life',
    icon: Dices,
    color: 'from-blush-100 via-cream-200 to-rose-50',
    emoji: '🎲',
    link: 'https://www.instagram.com/reel/DPnpmBXjdHx/',
    image: '/experiment6.jpg',
  },
]

const HEART_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

function FloatingHeartsBackground() {
  const [hearts, setHearts] = useState([])
  const idCounter = useRef(0)
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion) return

    const timers = []

    const spawnHeart = () => {
      const id = ++idCounter.current
      const left = Math.random() * 100
      const duration = 4 + Math.random() * 3
      const drift = (Math.random() - 0.5) * 60

      setHearts(prev => [...prev, { id, left, duration, drift }])

      const timer = setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id))
      }, duration * 1000)
      timers.push(timer)
    }

    // Stagger an initial batch
    for (let i = 0; i < 5; i++) {
      const t = setTimeout(spawnHeart, i * 700)
      timers.push(t)
    }

    const interval = setInterval(spawnHeart, 1400)

    return () => {
      clearInterval(interval)
      timers.forEach(t => clearTimeout(t))
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-4xl">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="absolute floating-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-16px',
            '--float-duration': `${heart.duration}s`,
            '--float-drift': `${heart.drift}px`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  )
}

function ExploreButton() {
  const [hearts, setHearts] = useState([])
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spawnHearts = useCallback(() => {
    if (prefersReducedMotion) return
    // Spawn hearts from the edges of the button, not the center
    const edgePositions = [
      // Top edge
      { startX: '20%', startY: '0%', dx: -15, dy: -35 },
      { startX: '50%', startY: '0%', dx: 5, dy: -40 },
      { startX: '80%', startY: '0%', dx: 15, dy: -30 },
      // Bottom edge
      { startX: '30%', startY: '100%', dx: -10, dy: 35 },
      { startX: '70%', startY: '100%', dx: 10, dy: 40 },
      // Left edge
      { startX: '0%', startY: '30%', dx: -40, dy: -10 },
      { startX: '0%', startY: '70%', dx: -35, dy: 10 },
      // Right edge
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

  return (
    <div className="relative inline-block">
      <Button
        size="lg"
        className="group"
        onMouseEnter={spawnHearts}
      >
        Explore
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className="absolute pointer-events-none"
            style={{
              left: heart.startX,
              top: heart.startY,
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.3 }}
            animate={{ opacity: 0, x: heart.dx, y: heart.dy, scale: heart.scale }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, delay: heart.delay, ease: 'easeOut' }}
          >
            {HEART_SVG}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ExperimentCard({ experiment, index }) {
  const [isHovered, setIsHovered] = useState(false)

  const cardContent = (
    <motion.div
      className="card-warm overflow-hidden h-full"
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Visual Area */}
      <div className={`bg-gradient-to-br ${experiment.color} rounded-2xl aspect-square mb-5
                       flex items-center justify-center relative overflow-hidden`}>
        {/* Animated background pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: isHovered ? '100% 100%' : '0% 0%',
          }}
          transition={{ duration: 3 }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(232, 145, 143, 0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {experiment.image ? (
          <img src={experiment.image} alt={experiment.title} className="w-full h-full object-cover absolute inset-0 z-0" />
        ) : (
          <motion.span
            className="text-5xl relative z-10"
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {experiment.emoji}
          </motion.span>
        )}

        {/* Hover reveal */}
        <motion.div
          className="absolute inset-0 bg-foreground/5 flex items-center justify-center backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <p className="text-foreground text-sm font-medium px-4 py-2 bg-white/80 rounded-full">
            watch →
          </p>
        </motion.div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="rose">{experiment.category}</Badge>
          <experiment.icon className="w-4 h-4 text-warm-300" />
        </div>
        <h3 className="font-serif text-lg text-foreground group-hover:text-gradient transition-all">
          {experiment.title}
        </h3>
        <p className="text-warm-500 text-sm leading-relaxed">
          {experiment.description}
        </p>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover="true"
      layout
    >
      {experiment.link ? (
        <a href={experiment.link} target="_blank" rel="noopener noreferrer" className="block">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}

export default function Experiments() {
  return (
    <PageTransition>
      <FloatingShapes count={4} />

      {/* Hero */}
      <section className="page-container pt-44 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              experiments & play
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="section-heading mb-8">
              Welcome to the{' '}
              <motion.span
                className="inline-block text-gradient"
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                editor's
              </motion.span>
              {' '}side of me.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtext">
              This is where ideas turn into videos and thoughts become vlogs. I love exploring
              storytelling through edits, visual play, and design driven reflections.
              <br /><br />
              If you enjoy seeing how things evolve behind the scenes, you might like wandering around here.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex justify-start">
              <MagneticElement strength={0.2}>
                <a href="#experiments">
                  <ExploreButton />
                </a>
              </MagneticElement>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experiments Grid */}
      <section id="experiments" className="relative z-10 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <ScrollReveal key={experiment.id} delay={index * 0.08} direction="scale">
                <ExperimentCard experiment={experiment} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fun interactive section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="rounded-4xl bg-gradient-to-br from-blush-100/40 via-cream-200/40 to-rose-50/40
                            border border-cream-200 p-12 md:p-16 text-center relative">

              <FloatingHeartsBackground />

              <div className="relative z-10">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="inline-block mb-6 text-3xl text-foreground"
                >
                  ✿
                </motion.span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Keep Wandering
                </h3>
                <p className="text-warm-500 max-w-lg mx-auto leading-relaxed mb-6">
                  What you see here is just a small window. I share more blogs, videos, and design thoughts on my Instagram page. Do check it out.
                </p>
                <a
                  href="https://www.instagram.com/shruniqueness"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover="true"
                  className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 py-2 text-sm font-medium text-cream-50 transition-all duration-300 hover:opacity-90 hover:shadow-md"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #e8918f 0%, #d4736f 50%, #b08367 100%)',
                  }}
                >
                  More on Shruniqeness
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  )
}
