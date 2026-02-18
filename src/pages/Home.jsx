import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Sparkles, Heart, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import FloatingShapes from '@/components/FloatingShapes'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticElement from '@/components/MagneticElement'
import { Button } from '@/components/ui/button'

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] } },
}

const explorations = [
  { label: 'My Story', path: '/about', emoji: '🌱', description: 'Where it all began' },
  { label: 'Work', path: '/work', emoji: '⭐', description: 'Things I\'ve made' },
  { label: 'Process', path: '/process', emoji: '🧠', description: 'How I think' },
  { label: 'Research', path: '/research', emoji: '🔍', description: 'What I\'m exploring' },
  { label: 'Play', path: '/experiments', emoji: '🎨', description: 'Just for fun' },
]

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -80])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95])

  return (
    <PageTransition>
      <FloatingShapes count={5} />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={stagger} initial="initial" animate="animate">
            {/* Greeting */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blush-100/60 border border-blush-200/50 text-warm-600 text-sm">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                >
                  👋
                </motion.span>
                Oh hi, welcome to my little corner!
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6"
            >
              I'm{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Shruthi</span>
                <motion.span
                  className="absolute -top-3 -right-6"
                  animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </motion.span>
              </span>
              <br />
              <span className="relative inline-block">
                <span className="text-gradient">Viswanathan!</span>
                <motion.span
                  className="absolute -top-2 -right-5"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-warm-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              A Design Innovation student drawn to ideas, people, and the little details most people ignore...I like turning "hmm…" into "ahh, that makes sense."
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
              <MagneticElement strength={0.2}>
                <Link to="/work">
                  <Button size="lg" className="group">
                    See my work
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </MagneticElement>
              <MagneticElement strength={0.2}>
                <Link to="/about">
                  <Button variant="soft" size="lg">
                    Get to know me
                  </Button>
                </Link>
              </MagneticElement>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-warm-400 text-xs">scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDownRight className="w-4 h-4 text-warm-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== WHISPER SECTION ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-snug text-balance">
              I tend to follow <span className="text-gradient">curiosity</span> wherever it goes.
              <br />
              Here's a little map if you'd like to explore...
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EXPLORE SECTION ===== */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              Where to next?
            </p>
            <h2 className="section-heading mb-16">
              Go ahead, look around.
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {explorations.map((item, index) => (
              <ScrollReveal key={item.path} delay={index * 0.08}>
                <Link
                  to={item.path}
                  data-hover="true"
                  className="group block"
                >
                  <motion.div
                    className="flex items-center justify-between py-6 px-6 md:px-8 rounded-3xl
                               border border-transparent hover:border-blush-200
                               hover:bg-white/50 transition-all duration-500"
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <div className="flex items-center gap-5">
                      <motion.span
                        className="text-2xl md:text-3xl"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                      >
                        {item.emoji}
                      </motion.span>
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gradient transition-all">
                          {item.label}
                        </h3>
                        <p className="text-warm-400 text-sm mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-warm-300 group-hover:text-rose-400 group-hover:translate-x-2 transition-all duration-300" />
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 text-center">
              Shall we chat?
            </h2>
            <p className="text-warm-500 text-lg mb-10 max-w-xl mx-auto text-center">
              Ideas, questions, or even a simple hello are always welcome. Feel free to say hi.
            </p>
            <MagneticElement strength={0.15}>
              <Link to="/contact">
                <Button size="xl" variant="rose" className="group">
                  Let's talk
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </MagneticElement>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
