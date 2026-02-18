import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Send, Mail, MapPin, Heart, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import PageTransition from '@/components/PageTransition'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticElement from '@/components/MagneticElement'
import FloatingShapes from '@/components/FloatingShapes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'I\'d love to know your name ✿'),
  email: z.string().email('Hmm, that doesn\'t look like an email ♡'),
  subject: z.string().min(3, 'What\'s on your mind?'),
  message: z.string().min(10, 'Tell me a little more — I\'m listening ✦'),
})

const socials = [
  {
    name: 'Email',
    handle: 'shruireland@gmail.com',
    icon: Mail,
    href: 'mailto:shruireland@gmail.com',
    external: false
  },
  {
    name: 'LinkedIn',
    handle: 'shruthivish0702',
    icon: ArrowUpRight,
    href: 'https://www.linkedin.com/in/shruthivish0702/',
    external: true
  },
  {
    name: 'Behance',
    handle: 'shruthivishu',
    icon: ArrowUpRight,
    href: 'https://www.behance.net/shruthivishu',
    external: true
  },
  {
    name: 'Instagram',
    handle: 'shruniqueness',
    icon: ArrowUpRight,
    href: 'https://www.instagram.com/shruniqueness',
    external: true
  },
]

export default function Contact() {
  // --- Heartburst animation logic (from ExploreButton) ---
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          about: data.subject,
          more: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      toast.success('Message sent! 💌', {
        description: "Thanks for reaching out — I'll get back to you soon!",
      })
      reset()
    } catch (error) {
      toast.error('Failed to send message', {
        description: 'Please try again or contact me directly at shruireland@gmail.com',
      })
    }
  }

  return (
    <PageTransition>
      <FloatingShapes count={3} />

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-warm-400 text-sm uppercase tracking-widest mb-4">
              get in touch
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="section-heading mb-8">
              I'd love to hear
              <br />
              <span className="text-gradient">from you</span>!
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="section-subtext mx-auto">
              Whether you have a project in mind, want to collaborate, or simply want to say hi, my inbox is always open. Let’s have a conversation.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-warm-400 text-xs">scroll to connect</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDownRight className="w-4 h-4 text-warm-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="card-warm">
                  <h3 className="font-serif text-2xl text-foreground mb-6">
                    Drop me a note ✉️
                  </h3>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-warm-600 mb-2">
                        What's your name? *
                      </label>
                      <Input
                        placeholder="Your lovely name"
                        {...register('name')}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-rose-400 text-xs mt-1.5"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-warm-600 mb-2">
                        Your email *
                      </label>
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        {...register('email')}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-rose-400 text-xs mt-1.5"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm text-warm-600 mb-2">
                        What's this about?
                      </label>
                      <Input
                        placeholder="Project, collaboration, or just saying hi"
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-rose-400 text-xs mt-1.5"
                        >
                          {errors.subject.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-warm-600 mb-2">
                        Tell me more ✿
                      </label>
                      <Textarea
                        placeholder="Share your thoughts, ideas, or even a fun fact..."
                        {...register('message')}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-rose-400 text-xs mt-1.5"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="mt-8">
                    {/* Heartburst hover animation from ExploreButton */}
                    <div className="relative inline-block w-full sm:w-auto">
                      <Button
                        type="submit"
                        size="lg"
                        variant="rose"
                        disabled={isSubmitting}
                        className="group w-full sm:w-auto"
                        onMouseEnter={spawnHearts}
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            ✦
                          </motion.span>
                        ) : (
                          <>
                            Send with love
                            <Send className="w-4 h-4 transition-transform" />
                          </>
                        )}
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
                            {/* Use the same SVG as ExploreButton */}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#e8918f" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </form>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Card */}
            <ScrollReveal delay={0.1}>
              <div className="card-warm">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Find me here
                </h3>
                <div className="space-y-4">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href ? social.href : '#'}
                      data-hover="true"
                      className="flex items-center justify-between py-2 group"
                      {...(social.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blush-100 flex items-center justify-center">
                          <social.icon className="w-4 h-4 text-warm-600" />
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-medium group-hover:text-gradient transition-all">
                            {social.name}
                          </p>
                          <p className="text-warm-400 text-xs">{social.handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-warm-300 group-hover:text-rose-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Availability */}
            <ScrollReveal delay={0.2}>
              <div className="card-warm text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium mb-4"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Open to opportunities
                </motion.div>
                <p className="text-warm-500 text-sm leading-relaxed">
                  I'm currently open for internships, collaborations,
                  and interesting conversations.
                </p>
              </div>
            </ScrollReveal>

            {/* Fun note */}
            <ScrollReveal delay={0.3}>
              <div className="card-warm">
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mt-0.5" />
                  </motion.div>
                  <div>
                    <p className="text-foreground text-sm font-medium mb-1">
                      A small note
                    </p>
                    <p className="text-warm-500 text-xs leading-relaxed">
                      I respond to every genuine message. Even if I can't help,
                      I'll always try to point you in the right direction.
                      Kindness first, always. ♡
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-4xl text-foreground leading-snug text-balance">
              Good things happen when
              <span className="text-gradient"> good people connect</span>.
            </p>
            <p className="text-warm-400 mt-4 text-sm">
              Looking forward to hearing from you ♡
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  )
}
