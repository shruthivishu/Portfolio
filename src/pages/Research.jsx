import { Button } from '@/components/ui/button'
import MagneticElement from '@/components/MagneticElement'
import { ArrowRight } from 'lucide-react'
// Heart SVG and CTA logic reused from Experiments page
const HEART_SVG = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

function ExploreResearchButton() {
  const [hearts, setHearts] = useState([])
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const spawnHearts = () => {
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
  }

  const handleClick = (e) => {
    e.preventDefault()
    const section = document.getElementById('research-areas')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative inline-block">
      <Button
        size="lg"
        className="group"
        onMouseEnter={spawnHearts}
        onClick={handleClick}
      >
        Explore research
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
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
    </div>
  )
}
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BookOpen, Microscope, Globe, Leaf, Brain, Users, Baby, Building } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import FloatingShapes from '@/components/FloatingShapes'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const researchAreas = [
  {
    id: 1,
    icon: Users,
    title: 'Liberties Community Research',
    description: 'Weekly field research with the Liberties community exploring safety, visibility, and use of public spaces. Insights led to a solar powered motion lighting concept to improve natural surveillance and perceived safety in underused play areas.',
    tags: ['Community Research', 'User Interviews', 'Concept Development'],
    color: 'from-blush-100 to-cream-100',
    insights: [
      'Improving natural surveillance in underused play areas',
      'Perceived safety through environmental lighting interventions',
      'Designing for community trust and public space engagement',
    ],
  },
  {
    id: 2,
    icon: Baby,
    title: 'Postnatal Journey Research',
    description: 'Field research with new parents in Ireland exploring postnatal experiences, support gaps, and accessibility of care. Insights informed archetypes and case driven opportunity areas shared with the MUMA Hub.',
    tags: ['User Interviews', 'Affinity Mapping', 'Archetype Development'],
    color: 'from-cream-200 to-sand-100',
    insights: [
      'Understanding emotional and practical needs of new parents',
      'Identifying barriers to seeking postnatal support',
      'Translating research insights into archetypes and cases',
    ],
  },
  {
    id: 3,
    icon: Building,
    title: 'Innovation Strategy Research',
    description: 'Strategic research conducted with Chalo Schools in India focusing on product gaps, scaling opportunities, and growth direction. Insights from stakeholder discussions informed an innovation strategy proposal, parts of which are now being implemented.',
    tags: ['Stakeholder Research', 'Innovation Strategy', 'Framework Analysis'],
    color: 'from-warm-100 to-cream-100',
    insights: [
      'Identifying product and experience gaps',
      'Exploring opportunities for international scaling',
      'Translating insights into strategic recommendations',
    ],
  },
  {
    id: 4,
    icon: Leaf,
    title: 'Lullymore Visitor Experience Research',
    description: 'Ongoing field research with Lullymore Heritage and Discovery Park exploring visitor awareness, experience, and engagement. Observations and interviews inform journey mapping and opportunity areas to improve visibility and overall experience.',
    tags: ['Field Research', 'Service Innovation', 'UX Research'],
    color: 'from-rose-50 to-blush-50',
    insights: [
      'Understanding barriers to visitor discovery',
      'Evaluating on site visitor experiences',
      'Mapping journeys and improvement opportunities',
    ],
  },
]

const readings = [
  { title: 'The Design of Everyday Things', author: 'Don Norman', emoji: '📖' },
  { title: 'Creative Confidence', author: 'Tom Kelley and David Kelley', emoji: '📚' },
  { title: 'Friction Science: Why Users Drop Off', author: 'Article by Tushar Deshmukh', emoji: '📄' },
  { title: '99% Invisible', author: 'Roman Mars', emoji: '🎧' },
]

function ResearchCard({ area, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="card-warm overflow-hidden"
        layout
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* Header */}
        <div
          className="flex items-start gap-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          data-hover="true"
        >
          <div className={`bg-gradient-to-br ${area.color} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <area.icon className="w-7 h-7 text-warm-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-foreground">{area.title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-warm-400" />
              </motion.div>
            </div>
            <p className="text-warm-500 text-sm mt-1 leading-relaxed">{area.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {area.tags.map((tag) => (
                <Badge key={tag} variant="cream">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-cream-200">
                <p className="text-warm-400 text-xs uppercase tracking-widest mb-4">
                  Key Explorations
                </p>
                <div className="space-y-3">
                  {area.insights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-rose-400 mt-0.5">✦</span>
                      <p className="text-warm-600">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Research() {
  return (
    <PageTransition>
      <FloatingShapes count={3} />

      {/* Hero */}
      <section className="page-container pt-40 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              research & exploration
            </p>
          </ScrollReveal>
          {/* Removed duplicate CTA above heading for correct hero structure and spacing */}
          <ScrollReveal delay={0.1}>
              <h1 className="section-heading mb-8 mt-8">
                Inside my <motion.span className="inline-block text-gradient">Research</motion.span> World!
              </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
              <p className="section-subtext">
                This space brings together research I have worked on throughout my master’s journey. It includes selected studies from my academic modules along with projects I am currently involved in. Each piece reflects my curiosity, questions, and evolving understanding.
              </p>
              <div className="mt-10 flex justify-start">
                <MagneticElement strength={0.2}>
                  <ExploreResearchButton />
                </MagneticElement>
              </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research-areas" className="relative z-10 py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {researchAreas.map((area, index) => (
            <ResearchCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </section>

      {/* Reading List */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="section-heading mb-4 text-center">
              What I'm reading 📚
            </h2>
            <p className="text-warm-400 text-center mb-12 text-lg">
              Books, papers, and ideas that are shaping my thinking
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readings.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.08} direction="scale">
                <div className="card-warm flex items-center gap-4">
                  <span className="text-3xl">
                    {item.emoji}
                  </span>
                  <div>
                    <h4 className="font-serif text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-warm-400 text-sm">{item.author}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <BookOpen className="w-8 h-8 text-rose-300 mx-auto mb-6" />
              <p className="font-serif text-3xl md:text-4xl text-foreground leading-snug text-balance">
                "The more I learn, the more I realize how much I still
                <span className="text-gradient"> don’t know</span>, and honestly, that’s my favorite part."
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
