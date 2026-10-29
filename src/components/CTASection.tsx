'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Mail, Lock, CheckCircle2, Zap, RefreshCw } from 'lucide-react'

const benefits = [
  { title: 'Free Technical Demo', description: 'See the platform in action with your own city data' },
  { title: 'Custom Scenario Setup', description: 'We build a sample simulation for your drainage network' },
  { title: 'Expert Consultation', description: '1:1 session with our hydrological modeling team' },
]

const trustSignals = [
  { icon: Lock, text: 'No credit card required' },
  { icon: Mail, text: 'Weekly technical insights' },
  { icon: CheckCircle2, text: 'GDPR & SOC 2 compliant' },
]

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="live-demo" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Start Your Free Trial
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to{' '}
            <span className="gradient-text">Prevent Floods</span>
            {' '}Before They Happen?
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Join hundreds of municipalities and engineering firms using our Digital Twin platform to protect their communities from urban flooding. Start with a free technical demo.
          </p>

          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    You're In!
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-emerald-400 text-sm"
              >
                Check your inbox for demo access details. We'll be in touch within 24 hours.
              </motion.p>
            )}
          </form>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {trustSignals.map((signal) => (
              <div key={signal.text} className="flex items-center gap-2">
                <signal.icon className="w-4 h-4 text-emerald-400" />
                {signal.text}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-6 mt-16 text-left"
        >
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
