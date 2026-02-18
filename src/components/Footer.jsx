import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowUpRight } from 'lucide-react'

const footerLinks = [
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/work' },
  { label: 'Process', path: '/process' },
  { label: 'Research', path: '/research' },
  { label: 'Play', path: '/experiments' },
  { label: "Let's Talk", path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-16 border-t border-cream-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <span className="font-serif text-xl text-foreground">portfolio</span>
            </div>
            <p className="text-warm-500 text-sm leading-relaxed max-w-xs">
              Designed with love, built with care.
      
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-foreground text-lg">Explore</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-hover="true"
                  className="text-warm-500 text-sm hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-serif text-foreground text-lg">Connect</h4>
            <div className="space-y-2">
              <a
                href="mailto:shruireland@gmail.com"
                data-hover="true"
                className="block text-warm-500 text-sm hover:text-foreground transition-colors duration-300"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/shruthivish0702/"
                target="_blank"
                rel="noopener noreferrer"
                data-hover="true"
                className="block text-warm-500 text-sm hover:text-foreground transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/shruthivishu"
                target="_blank"
                rel="noopener noreferrer"
                data-hover="true"
                className="block text-warm-500 text-sm hover:text-foreground transition-colors duration-300"
              >
                Behance
              </a>
              <a
                href="https://www.instagram.com/shruniqueness"
                target="_blank"
                rel="noopener noreferrer"
                data-hover="true"
                className="block text-warm-500 text-sm hover:text-foreground transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream-200 gap-4">
          <motion.p
            className="text-warm-400 text-xs"
            whileHover={{ color: '#5c4033' }}
          >
            Made with a lot of{' '}
            <motion.span
              className="inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ♡
            </motion.span>
            {' '}and curiosity
          </motion.p>
          <p className="text-warm-400 text-xs">
            © {new Date().getFullYear()} — Shru's Design Portfolio
          </p>
        </div>
      </div>
    </footer>
  )
}
