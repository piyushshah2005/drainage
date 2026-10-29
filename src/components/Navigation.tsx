'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Droplets,
  Activity,
  Map,
  Menu,
  X,
  Settings,
  BarChart3,
  Shield,
} from 'lucide-react'

const navLinks = [
  { href: '#features', label: 'Features', icon: Activity },
  { href: '#how-it-works', label: 'How It Works', icon: Map },
  { href: '#dashboard', label: 'Live Dashboard', icon: Droplets },
  { href: '#analytics', label: 'Analytics', icon: BarChart3 },
  { href: '#api', label: 'API', icon: Settings },
]

const adminLink = {
  href: '/admin/login',
  label: 'Admin',
  icon: Shield,
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  // On the homepage, section links are plain anchors; on every other page
  // they need to point back to the homepage section (/#features, ...).
  const resolveHref = (href: string) =>
    href.startsWith('#') && pathname !== '/' ? `/${href}` : href

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map(link => link.href.replace('#', ''))
      let currentSection = ''

      sections.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = id
          }
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'rgba(10, 25, 47, 0.9) backdrop-blur-xl'
          : 'rgba(10, 25, 47, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid rgba(148, 163, 184, 0.1)'
          : '1px solid transparent',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Droplets className="w-5 h-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">UrbanDrainage Twin</span>
              <span className="ml-2 text-xs text-cyan-400/70 font-mono">BETA</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <Link
              href={adminLink.href}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all duration-300"
            >
              <adminLink.icon className="w-4 h-4" />
              {adminLink.label}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium rounded-xl hover:from-purple-400 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
            <Link
              href={resolveHref('#live-demo')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              <Activity className="w-4 h-4" />
              Live Demo
            </Link>

            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-2">              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-slate-400 hover:text-cyan-400 hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <Link
                href={adminLink.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 text-purple-400 rounded-xl text-sm font-medium"
              >
                <adminLink.icon className="w-5 h-5" />
                {adminLink.label}
              </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium rounded-xl"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
            <Link
              href={resolveHref('#live-demo')}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl"
            >
              <Activity className="w-4 h-4" />
              Live Demo
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
