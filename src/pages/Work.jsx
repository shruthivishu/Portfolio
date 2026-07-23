import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// --- LetsMeetWorksButton for hero button ---
function LetsMeetWorksButton() {
  // No heart animation for works, just scroll and style
  const handleClick = () => {
    const el = document.getElementById('work-filters-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="relative inline-block mt-2">
      <Button
        size="lg"
        className="group transition-all duration-300 hover:brightness-110 hover:opacity-90"
        onClick={handleClick}
      >
        See Works
        <ArrowRight className="w-4 h-4 transition-transform" />
      </Button>
    </div>
  );
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Eye } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import FloatingShapes from '@/components/FloatingShapes'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const categories = [
  'All',
  'Favorites',
  'Design',
  'Accessibility',
  'Health',
  'AI & XR',
  'Explorations',
]

const projects = [
  {
    id: 1,
    title: 'Worklyt',
    subtitle: 'Reimagining how people build early connections within unfamiliar workplace systems.',
    tags: ['UX Research', 'UI Design', 'Design Thinking'],
    color: 'from-blush-100 to-cream-200',
    link: 'https://www.behance.net/gallery/200049099/Worklyt-Workforce-management-app',
    image: '/worklyt.png',
    filters: ['Favorites', 'Design'],
  },
  {
    id: 2,
    title: 'CarEazy',
    subtitle: 'Wireframing the experience of a car subscription app for a real client, focusing on usability, flow, and interaction clarity.',
    tags: ['Wireframing', 'UI Design', 'User Flows'],
    color: 'from-cream-200 to-sand-200',
    image: '/careazy2.jpg',
    link: 'https://www.behance.net/gallery/203148721/CarEazy-A-car-subscription-mobile-app',
    filters: ['Favorites', 'Design'],
  },
  {
    id: 3,
    title: 'InSpace Revamp',
    subtitle: 'Website redesign concept for InSpace Technologies focused on clarity and modern visual language',
    tags: ['Web Design', 'UI Revamp', 'Visual Design'],
    color: 'from-rose-50 to-blush-100',
    image: '/inspace-laptop.jpg',
    link: 'https://www.behance.net/gallery/211816645/Inspace-Company-Website-Revamp',
    filters: ['Design', 'Explorations'],
  },
  {
    id: 4,
    title: 'Eduthalamus',
    subtitle: 'A landing page concept for a school automation platform designed around clarity, usability, and everyday academic workflows.',
    tags: ['Product Design', 'UI UX Design', 'Landing Page'],
    color: 'from-warm-100 to-cream-200',
    link: 'https://eduthalamus.vercel.app/',
    image: '/eduthalamus.png',
    filters: ['Design', 'Explorations'],
  },
  {
    id: 5,
    title: 'GameAble',
    subtitle: 'A desktop app that lets you control PC games with body poses detected in real time via webcam—no keyboard or mouse required.',
    tags: ['Pose Recognition', 'CNN', 'Gemini AI'],
    color: 'from-cream-200 to-blush-100',
    link: 'https://github.com/ZENODIUM/GameAble-AI',
    image: '/gameable_ai.png',
    filters: ['Accessibility', 'AI & XR', 'Explorations'],
  },
  {
    id: 6,
    title: 'Clarify',
    subtitle: 'Spatial product support that turns dead manuals into live XR agents—photo-to-3D twins, voice AI, and parts that glow in WebXR.',
    tags: ['WebXR', 'Voice AI', 'Spatial Design'],
    color: 'from-sand-100 to-cream-200',
    link: 'https://devpost.com/software/clarify-spatial-product-support',
    image: '/clarify.png',
    filters: ['Accessibility', 'AI & XR', 'Explorations'],
  },
  {
    id: 7,
    title: 'AR Aid Trainer',
    subtitle: 'An AR first-aid trainer that teaches life-saving procedures through interactive 3D simulations and AI-powered guidance.',
    tags: ['AR', '3D Interaction', 'EdTech'],
    color: 'from-rose-50 to-warm-100',
    link: 'https://github.com/ZENODIUM/AR-Aid-Trainer',
    image: '/AR_Aid_Trainer.png',
    filters: ['Accessibility', 'Health', 'AI & XR', 'Explorations'],
  },
  {
    id: 8,
    title: 'PregPose Pal',
    subtitle: 'Realtime posture protection for moms-to-be—personalized sensor data, custom ML models, and live feedback on the go.',
    tags: ['ML', 'Sensors', 'Health Tech'],
    color: 'from-blush-100 to-sand-200',
    link: 'https://devpost.com/software/pregpose-pal',
    image: '/pregpose.png',
    filters: ['Accessibility', 'Health', 'AI & XR', 'Explorations'],
  },
  {
    id: 9,
    title: 'GlucoSync',
    subtitle: 'A metabolic nutrition MVP that helps users make better food decisions with AI meal understanding and glucose-aware guidance.',
    tags: ['Mobile UX', 'AI Coaching', 'Health'],
    color: 'from-warm-100 to-blush-100',
    link: 'https://github.com/ZENODIUM/Glucosync',
    image: '/glucosync.png',
    filters: ['Health', 'AI & XR', 'Explorations'],
  },
  {
    id: 10,
    title: 'Biomimic Genie',
    subtitle: 'Upload animal images to generate 3D biomimetic models and explore nature-inspired applications for sustainable design.',
    tags: ['3D Generation', 'Biomimicry', 'UI Design'],
    color: 'from-cream-200 to-rose-50',
    link: 'https://devpost.com/software/biomimic-genie',
    image: '/biomimic_genie.png',
    filters: ['Design', 'AI & XR', 'Explorations'],
  },
  {
    id: 11,
    title: 'Inqube AI',
    subtitle: 'An AI competitor analysis tool that gathers web, product, and YouTube insights to deliver SWOT, sentiment, and startup recommendations.',
    tags: ['Competitor Analysis', 'AI Insights', 'Data Viz'],
    color: 'from-sand-200 to-cream-200',
    link: 'https://github.com/ZENODIUM/IncubeAI',
    image: '/inqube.png',
    filters: ['AI & XR', 'Explorations'],
  },
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.filters?.includes(activeFilter))

  return (
    <PageTransition>
      <FloatingShapes count={3} />


      {/* Hero Section: Only intro content, new description, and button */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-20 min-h-screen flex items-center relative z-10" style={{ overflow: 'visible' }}>
        <div className="max-w-5xl mx-auto w-full">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              projects
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="section-heading mb-8">
              <span className="text-gradient">Work</span> and explorations
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtext mb-8">
              This space brings together selected projects that showcase my approach to problem solving, design thinking, and experimentation. Every project tells a story of exploration, iteration, and learning. Take your time to navigate through the work and discover the ideas behind each outcome.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <LetsMeetWorksButton />
          </ScrollReveal>
        </div>
      </section>

      {/* Filters Section */}
      <section id="work-filters-section" className="relative z-10 px-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  data-hover="true"
                  className={cn(
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                    activeFilter === cat
                      ? 'bg-foreground text-cream-50'
                      : 'bg-white/60 border border-warm-200 text-warm-500 hover:border-blush-200 hover:text-foreground'
                  )}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Grid: now in its own section with extra top padding */}
      <section className="relative z-10 px-6 pt-16 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    layout: { type: 'spring', damping: 25, stiffness: 200 },
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {(() => {
                    const cardContent = (
                    <div className="card-warm overflow-hidden">
                      {/* Project Image Placeholder */}
                      <div className={`bg-gradient-to-br ${project.color} rounded-2xl aspect-[4/3] mb-5
                                       flex items-center justify-center relative overflow-hidden`}>
                        {/* Hover overlay */}
                        <motion.div
                          className="absolute inset-0 bg-foreground/5 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                              scale: hoveredProject === project.id ? 1 : 0,
                              opacity: hoveredProject === project.id ? 1 : 0,
                            }}
                            className="bg-white/90 backdrop-blur-sm rounded-full p-4"
                          >
                            <Eye className="w-6 h-6 text-foreground" />
                          </motion.div>
                        </motion.div>

                        {project.image ? (
                          <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-white">
                            <img
                              src={project.image}
                              alt={project.title}
                              className={
                                project.title === 'Eduthalamus'
                                  ? 'max-h-full max-w-full object-contain'
                                  : 'w-full h-full object-cover object-left'
                              }
                              style={
                                project.title === 'Eduthalamus'
                                  ? { background: 'white', objectFit: 'contain' }
                                  : {}
                              }
                            />
                          </div>
                        ) : (
                          <p className="text-warm-400 text-sm relative z-0">project visual</p>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-serif text-xl text-foreground group-hover:text-gradient transition-all">
                              {project.title}
                            </h3>
                            <p className="text-warm-500 text-sm mt-1">
                              {project.subtitle}
                            </p>
                          </div>
                          <motion.div
                            className="mt-1"
                            animate={{
                              x: hoveredProject === project.id ? 3 : 0,
                              y: hoveredProject === project.id ? -3 : 0,
                            }}
                          >
                            <ArrowUpRight className="w-5 h-5 text-warm-300 group-hover:text-rose-400 transition-colors" />
                          </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="default">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                          {/* <p className="text-warm-300 text-xs">{project.year}</p> */}
                      </div>
                    </div>
                    );
                    return project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" data-hover="true" className="group block">
                        {cardContent}
                      </a>
                    ) : (
                      <Link to={`/work/${project.id}`} data-hover="true" className="group block">
                        {cardContent}
                      </Link>
                    );
                  })()}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* More Coming */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif text-2xl md:text-3xl text-foreground">
              More projects coming soon ✿
            </p>
            <p className="text-warm-400 mt-3 text-sm">
              I'm always working on something new. Stay curious.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
