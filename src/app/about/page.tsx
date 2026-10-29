import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Droplets,
  Target,
  Shield,
  Users,
  ArrowRight,
  Building2,
  Globe,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us - UrbanDrainage Twin',
  description:
    'UrbanDrainage Twin builds physics-based digital twin software that helps civil engineers and municipalities predict and prevent urban flooding.',
}

const stats = [
  { value: '1,200+', label: 'Sensors connected' },
  { value: '38', label: 'Cities served' },
  { value: '14k', label: 'Storms simulated' },
  { value: '99.9%', label: 'Platform uptime' },
]

const values = [
  {
    icon: Target,
    title: 'Precision over guesswork',
    description:
      'Every flood map is driven by hydraulic equations and live gauge data — never by generic estimates.',
  },
  {
    icon: Shield,
    title: 'Public safety first',
    description:
      'We build for the moments that matter: the storm surge, the overflowing culvert, the evacuation window.',
  },
  {
    icon: Users,
    title: 'Built with engineers',
    description:
      'Our platform is shaped side by side with the civil engineers and municipal planners who use it every day.',
  },
]

const milestones = [
  {
    year: '2022',
    title: 'Research prototype',
    description:
      'A hydraulic model of a single city district, built with a municipal water-management team.',
  },
  {
    year: '2023',
    title: 'Live sensor pipeline',
    description:
      'Real-time rainfall and flow telemetry integrated into the simulation loop for continuous updates.',
  },
  {
    year: '2024',
    title: 'Digital twin platform',
    description:
      'Scenario stress-testing, alerting and analytics shipped to engineering firms across three regions.',
  },
  {
    year: '2026',
    title: '38 cities and counting',
    description:
      'Open REST API and admin tooling make the twin accessible to any infrastructure stack.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 to-transparent" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              About Us
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              We model cities so floods{' '}
              <span className="gradient-text">never surprise them</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              UrbanDrainage Twin merges live rainfall telemetry with physics-based drainage
              simulation, giving civil engineers and municipal planners a working replica of
              their city&apos;s underground network — before the next storm arrives.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center hover:border-cyan-500/30 transition-colors"
              >
                <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="glass-card p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Urban flooding is the costliest climate hazard facing cities today, and most
              municipalities still discover their vulnerabilities the hard way — during a
              storm. Drainage infrastructure was designed decades ago for weather patterns
              that no longer hold.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We exist to change the order of operations: instead of reacting to floods,
              cities should be able to simulate them, find the weak points in their drainage
              network, and reinforce them on a planner&apos;s timeline. That is what a
              digital twin is for.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              What We Believe
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              The principles behind <span className="gradient-text">every model</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              From prototype to <span className="gradient-text">city-scale twin</span>
            </h2>
          </div>

          <ol className="relative border-l border-white/10 ml-4 space-y-10">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="ml-8">
                <span className="absolute -left-[9px] w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 ring-4 ring-cyan-500/10" />
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-cyan-400">{milestone.year}</span>
                  <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
          <div className="glass-card p-10">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Droplets className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Want to see the twin in action?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Explore the documentation, or talk to our hydrological modeling team about
              your city&apos;s drainage network.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
              >
                Read the Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Contact Us
                <CheckCircle2 className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
