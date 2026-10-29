'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Droplets,
  Mail,
  ArrowUpRight,
  Shield,
  MessageSquare,
} from 'lucide-react'

// Inline SVG icons for social media
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.869.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C9.569 21.797 12 17.3 12 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.228 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const footerLinks = {
  platform: [
    { label: 'Live Dashboard', href: '/#dashboard' },
    { label: 'Simulation Engine', href: '/#features' },
    { label: 'Analytics', href: '/#analytics' },
    { label: 'Developer API', href: '/#api' },
    { label: 'Book a Demo', href: '/#live-demo' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Getting Started', href: '/docs#getting-started' },
    { label: 'API Endpoints', href: '/docs#endpoints' },
    { label: 'Authentication', href: '/docs#authentication' },
    { label: 'Error Reference', href: '/docs#errors' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Admin Panel', href: '/admin/login' },
    { label: 'Platform Status', href: '/#analytics' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">UrbanDrainage Twin</span>
                <span className="ml-2 text-xs text-cyan-400/70 font-mono">BETA</span>
              </div>
            </Link>

            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              Live rainfall sensor data feeds a physics-based city drainage model. Identify flood-prone zones before they become crises.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <GithubIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:contact@urbandrainage.com"
                className="p-2 text-slate-500 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1"
            >
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              2026 UrbanDrainage Twin. All rights reserved. Built for resilient cities.
            </p>

            <div className="flex items-center gap-6">
              {[
                { label: 'About', href: '/about' },
                { label: 'Documentation', href: '/docs' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-600">
            <Shield className="w-4 h-4" />
            <span>Enterprise Grade Security</span>
            <span className="text-white/20">|</span>
            <span>Global Coverage</span>
            <span className="text-white/20">|</span>
            <span>Real-time Data</span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-600">
            <a
              href="mailto:support@urbandrainage.com"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              support@urbandrainagetup.com
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:+18001234567"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              +1 (800) 123-4567
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
    </footer>
  )
}
