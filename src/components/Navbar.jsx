import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/work', label: 'Work' },
  { path: '/process', label: 'Process' },
  { path: '/research', label: 'Research' },
  { path: '/experiments', label: 'Play' },
  { path: '/contact', label: "Let's Talk" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-hover="true"
        >
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          </motion.div>
          <span className="font-serif text-lg text-foreground">ShruVish</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-hover="true"
              className={cn(
                'relative px-4 py-2 text-sm rounded-full transition-all duration-300',
                location.pathname === link.path
                  ? 'text-foreground'
                  : 'text-warm-500 hover:text-foreground'
              )}
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blush-100 border border-blush-200 rounded-full"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-warm-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          data-hover="true"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 glass rounded-3xl p-6 max-w-5xl mx-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    data-hover="true"
                    className={cn(
                      'block px-4 py-3 rounded-2xl text-base transition-all duration-300',
                      location.pathname === link.path
                        ? 'bg-blush-100 text-foreground font-medium'
                        : 'text-warm-500 hover:text-foreground hover:bg-warm-50'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
