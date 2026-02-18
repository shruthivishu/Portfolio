import { useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Lightbulb, Search, Wrench, Sparkles, Users, Repeat, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import FloatingShapes from '@/components/FloatingShapes'
import { Button } from '@/components/ui/button'

const HEART_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

function KnowMoreButton() {
  const [hearts, setHearts] = useState([])
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

  return (
    <div className="relative inline-block">
      <Button
        size="lg"
        className="group transition-all duration-300 hover:brightness-110 hover:opacity-90"
        onMouseEnter={spawnHearts}
        onClick={() => {
          const el = document.getElementById('process-wonder')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        Know more
        <ArrowRight className="w-4 h-4 transition-transform" />
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

const steps = [
  {
    number: '01',
    title: 'Wonder',
    subtitle: 'It starts with a question',
    description:
      'Before I touch a single tool, I sit with the problem. I wonder about the people, the context, the emotions.',
    icon: Lightbulb,
    color: 'bg-blush-100',
    borderColor: 'border-blush-300',
  },
  {
    number: '02',
    title: 'Discover',
    subtitle: 'Research with empathy',
    description:
      'I dive deep into interviews, observations, literature, and data. The goal is not just to gather information, but to truly understand what is happening beneath the surface.',
    icon: Search,
    color: 'bg-cream-200',
    borderColor: 'border-cream-400',
  },
  {
    number: '03',
    title: 'Connect',
    subtitle: 'Co-create with people',
    description:
      'Design is never done alone. I bring people into the process, collaborators, users, stakeholders. The best ideas grow from shared understanding.',
    icon: Users,
    color: 'bg-rose-50',
    borderColor: 'border-rose-300',
  },
  {
    number: '04',
    title: 'Make',
    subtitle: 'Prototype & experiment',
    description:
      'Sketches, wireframes, models, prototypes. I like turning ideas into something tangible quickly, not to chase perfection, but to learn and refine.',
    icon: Wrench,
    color: 'bg-sand-200',
    borderColor: 'border-sand-400',
  },
  {
    number: '05',
    title: 'Reflect',
    subtitle: 'Iterate with intention',
    description:
      'Testing, feedback, iteration. Each round makes it better, more thoughtful, more human. I question my own assumptions just as much as I question the problem.',
    icon: Repeat,
    color: 'bg-warm-100',
    borderColor: 'border-warm-300',
  },
  {
    number: '06',
    title: 'Polish',
    subtitle: 'Craft with care',
    description:
      'The final mile matters. Every micro-interaction, every word choice, every visual detail is intentional. This is where good design becomes great design.',
    icon: Sparkles,
    color: 'bg-blush-100',
    borderColor: 'border-blush-200',
  },
]

const principles = [
  'People first. Screens later.',
  'Confusion is usually part of the process.',
  'Asking the right questions matters more than having quick answers.',
  'The process matters just as much as the outcome.',
  'It is okay to take a break.',
]

function ProcessStep({ step, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative"
    >
      {/* Connecting Line */}
      {index < steps.length - 1 && (
        <div className="absolute left-8 top-full w-0.5 h-16 md:h-20 overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-warm-300 to-warm-200"
            style={{ height: '100%', scaleY: pathLength, transformOrigin: 'top' }}
          />
        </div>
      )}

      <motion.div
        className={`card-warm border-l-4 ${step.borderColor} flex gap-6 items-start`}
        whileHover={{ x: 8, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Number */}
        <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}>
          <step.icon className="w-7 h-7 text-warm-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-warm-300 text-sm font-mono">{step.number}</span>
            <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
          </div>
          <p className="text-rose-400 text-sm font-medium mb-2">{step.subtitle}</p>
          <p className="text-warm-500 text-sm leading-relaxed">{step.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Process() {
  return (
    <PageTransition>
      <FloatingShapes count={3} />

      {/* Hero */}
      <section className="page-container pt-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              How I think
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="section-heading mb-8">
              Inside my head,
              <br />
              <span className="text-gradient">briefly</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtext">
              There is no perfectly straight line behind how I think or create. Ideas often evolve through exploration, confusion, reflection, and unexpected connections. This page offers a small window into that process and the way I navigate problems and possibilities.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <KnowMoreButton />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process-wonder" className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-20">
          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.05}>
              <ProcessStep step={step} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="section-heading mb-12 text-center">
              Things I remind myself ✿
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <ScrollReveal key={principle} delay={index * 0.08}>
                <motion.div
                  className="flex items-center gap-4 py-5 px-6 rounded-2xl hover:bg-white/50 transition-all duration-300 group"
                  whileHover={{ x: 6 }}
                >
                  <span className="text-rose-400 font-serif text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gradient transition-all">
                    {principle}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
