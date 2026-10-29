'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "The Digital Twin platform has transformed how we approach flood prevention. We identified three critical vulnerability zones before the monsoon season that we would have missed with traditional methods.",
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Chief Civil Engineer',
      organization: 'Metro Water Authority',
      avatar: 'SC',
    },
    rating: 5,
  },
  {
    id: 2,
    quote: "For the first time, we can show city council members exactly where our infrastructure is vulnerable. The visualizations make it easy to prioritize budget allocation for flood mitigation projects.",
    author: {
      name: 'Marcus Rodriguez',
      role: 'Director of Urban Planning',
      organization: 'City of Riverside',
      avatar: 'MR',
    },
    rating: 5,
  },
  {
    id: 3,
    quote: "The physics-based modeling is incredibly accurate. During the last heavy rain event, our predictions matched reality within 3% error margin. This level of precision gives us confidence in our emergency response plans.",
    author: {
      name: 'Prof. James Okafor',
      role: 'Hydrology Research Lead',
      organization: 'State University Civil Engineering',
      avatar: 'JO',
    },
    rating: 5,
  },
]

const logos = [
  { name: 'Metro Water Authority', initial: 'MW' },
  { name: 'City of Riverside', initial: 'CR' },
  { name: 'State University', initial: 'SU' },
  { name: 'Urban Planning Board', initial: 'UP' },
  { name: 'Environmental Agency', initial: 'EA' },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Trusted by Experts
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by{' '}
            <span className="gradient-text">Leading Municipalities</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join hundreds of civil engineering teams and municipal planners who rely on our Digital Twin platform for flood risk management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="w-8 h-8 text-cyan-400/30 absolute top-6 right-6" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.author.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.author.role}</div>
                    <div className="text-xs text-cyan-400">{testimonial.author.organization}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-2">Trusted by Leading Organizations</h3>
          <p className="text-slate-400 mb-8">Powering flood resilience for cities worldwide</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 opacity-60">
          {logos.map((logo) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-24 h-12 lg:w-28 lg:h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-sm lg:text-base font-semibold text-slate-400 uppercase tracking-wider">
                {logo.initial}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
