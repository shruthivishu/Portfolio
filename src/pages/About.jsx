import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MapPin, BookOpen, Coffee, Music, Lightbulb, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import FloatingShapes from '@/components/FloatingShapes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const HEART_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

function LetsMeetButton() {
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

  const handleClick = useCallback(() => {
    const el = document.getElementById('about-photo')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="relative inline-block">
      <Button
        size="lg"
        className="group transition-all duration-300 hover:brightness-110 hover:opacity-90"
        onMouseEnter={spawnHearts}
        onClick={handleClick}
      >
        Let's meet!
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

const timeline = [
  {
    period: 'The Beginning',
    title: 'Where curiosity found direction',
    description:
      'I always found myself questioning how things work and how they come to life. I began in engineering, did my best, but eventually realised it was not where I felt most aligned. That search for something that fit me better is what led me to design.',
    color: 'bg-blush-100',
    accent: 'border-blush-300',
  },
  {
    period: 'The Journey',
    title: 'Learning, relearning, moving forward',
    description:
      'Once I chose design, learning became a constant. Articles, books, experiments, mistakes, and moments of clarity shaped my path. Through the chaos and corrections, the one thing I never stopped doing was learning, which slowly guided me toward Design Innovation.',
    color: 'bg-cream-200',
    accent: 'border-cream-400',
  },
  {
    period: 'Now',
    title: 'Where I am, and still becoming',
    description:
      'Today, I am a Master\'s student in Design Innovation, exploring design thinking, research, and experimentation. I continue to learn, question, and grow, now surrounded by ideas and perspectives that constantly expand how I see and approach design.',
    color: 'bg-rose-50',
    accent: 'border-rose-300',
  },
]

const interests = [
  { icon: BookOpen, label: 'Design Research' },
  { icon: Lightbulb, label: 'Systems Thinking' },
  { icon: Coffee, label: 'Slow Mornings' },
  { icon: Music, label: 'Good Playlists' },
  { icon: Heart, label: 'Human Stories' },
  { icon: MapPin, label: 'New Places' },
]

const values = [
  {
    title: 'Empathy First',
    description: 'I listen, really listen, and observe people to understand their experiences and environment.',
    emoji: '💛',
  },
  {
    title: 'Question Everything',
    description: 'Why is my favourite word. I rarely settle for surface level answers when the real insight is waiting to be uncovered.',
    emoji: '🔍',
  },
  {
    title: 'Embrace Messiness',
    description: 'I genuinely enjoy working through ambiguity because the clarity that follows is incredibly rewarding.',
    emoji: '🌊',
  },
  {
    title: 'Make It Matter',
    description: 'I treat every project as an opportunity to create something that genuinely improves someone\'s experience.',
    emoji: '✨',
  },
]

export default function About() {
  return (
    <PageTransition>
      <FloatingShapes count={3} />

      {/* Hero */}
      <section className="page-container pt-32 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              a bit about me
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="section-heading mb-8">
              <span className="text-gradient">Me</span> in a few honest words
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtext">
              I am a designer and a master's student who is endlessly fascinated by how people think, feel, and interact with the world around them. This portfolio is not just a collection of projects, but a small reflection of my personality.
            </p>
            <p className="section-subtext mt-4">
              Every color, interaction, and detail you see here is shaped by the things I enjoy, the way I think, and the kind of experiences I love creating. I wanted this space to feel less like a showcase and more like a glimpse into how my mind works.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8">
              <LetsMeetButton />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Photo / Visual Placeholder */}
      <section id="about-photo" className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="scale">
            <div className="relative rounded-4xl overflow-hidden bg-gradient-to-br from-blush-100 via-cream-200 to-rose-50 aspect-[16/9] flex items-center justify-center">
              <img
                src="/Heyy.jpg"
                alt="Shruthi Viswanathan"
                className="w-full h-full object-cover"
              />
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-warm-300/40 rounded-tl-2xl" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-warm-300/40 rounded-br-2xl" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="section-heading mb-16 text-center">
              The story so far ✿
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <ScrollReveal key={item.period} delay={index * 0.12} direction={index % 2 === 0 ? 'left' : 'right'}>
                <motion.div
                  className={`card-warm border-l-4 ${item.accent}`}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Badge variant="cream" className="mb-3">
                    {item.period}
                  </Badge>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-warm-500 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="section-heading mb-4 text-center">
              What I believe in
            </h2>
            <p className="text-warm-400 text-center mb-16 text-lg">
              The principles that guide everything I design
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1} direction="scale">
                <motion.div
                  className="card-warm group"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.span
                    className="text-3xl block mb-3"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                  >
                    {value.emoji}
                  </motion.span>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="section-heading mb-4">
              Things that light me up
            </h2>
            <p className="text-warm-400 mb-12 text-lg">
              Beyond the screen, beyond the studio
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4">
            {interests.map((interest, index) => (
              <ScrollReveal key={interest.label} delay={index * 0.06} direction="scale">
                <motion.div
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/60 border border-cream-200
                             backdrop-blur-sm hover:border-blush-200 hover:bg-blush-50 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  data-hover="true"
                >
                  <interest.icon className="w-4 h-4 text-rose-400" />
                  <span className="text-sm text-warm-600">{interest.label}</span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-4xl text-foreground leading-snug text-balance">
              "I think the best designers are the ones who never stop being
              <span className="text-gradient"> students</span> of the world."
            </p>
            <p className="text-warm-400 mt-6 text-sm"> -me, probably over chai</p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
