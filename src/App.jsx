import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Process from './pages/Process'
import Research from './pages/Research'
import Experiments from './pages/Experiments'
import Contact from './pages/Contact'

import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/process" element={<Process />} />
          <Route path="/research" element={<Research />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
