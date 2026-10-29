'use client'

import { motion } from 'framer-motion'
import {
  Cloud,
  Database,
  Map,
  AlertTriangle,
  Cpu,
  CheckCircle2,
} from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Cloud,
    title: 'Live Data Ingestion',
    description: 'Rainfall sensors, water level gauges, and flow meters stream continuous data to our platform via secure MQTT and HTTPS protocols.',
    details: ['Real-time sensor network', 'Weather API integration', 'Historical data sync'],
    color: 'cyan',
  },
  {
    number: 2,
    icon: Database,
    title: 'Data Processing & Calibration',
    description: 'Raw sensor data is cleaned, validated, and used to calibrate the physics-based drainage model to match current conditions.',
    details: ['Data validation pipeline', 'Automated calibration', 'Quality control alerts'],
    color: 'blue',
  },
  {
    number: 3,
    icon: Map,
    title: 'Scenario Simulation',
    description: 'Run extreme weather scenarios—from 10-year storms to 500-year events—with adjustable parameters for intensity, duration, and return period.',
    details: ['Pre-built storm templates', 'Custom scenario builder', 'Clustered event simulation'],
    color: 'purple',
  },
  {
    number: 4,
    icon: Map,
    title: 'Flood Risk Visualization',
    description: 'Interactive 3D maps show flood extents, depths, and flow velocities across the urban landscape with color-coded risk zones.',
    details: ['Interactive flood maps', 'Depth & velocity profiles', 'Infrastructure impact assessment'],
    color: 'orange',
  },
  {
    number: 5,
    icon: AlertTriangle,
    title: 'Actionable Insights & Alerts',
    description: 'Generate reports, identify vulnerable infrastructure, and set up automated alerts for when real conditions approach threshold limits.',
    details: ['Automated alert system', 'Infrastructure vulnerability report', 'Mitigation recommendation engine'],
    color: 'red',
  },
]

const colorStyles: Record<string, { badge: string; border: string; gradient: string; text: string }> = {
  cyan: { badge: 'bg-cyan-500/20 text-cyan-400', border: 'border-cyan-500/30', gradient: 'from-cyan-500/20 to-blue-500/10', text: 'text-cyan-400' },
  blue: { badge: 'bg-blue-500/20 text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-500/20 to-indigo-500/10', text: 'text-blue-400' },
  purple: { badge: 'bg-purple-500/20 text-purple-400', border: 'border-purple-500/30', gradient: 'from-purple-500/20 to-pink-500/10', text: 'text-purple-400' },
  orange: { badge: 'bg-orange-500/20 text-orange-400', border: 'border-orange-500/30', gradient: 'from-orange-500/20 to-red-500/10', text: 'text-orange-400' },
  red: { badge: 'bg-red-500/20 text-red-400', border: 'border-red-500/30', gradient: 'from-red-500/20 to-rose-500/10', text: 'text-red-400' },
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
            <Cpu className="w-4 h-4" />
            Platform Workflow
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            From Sensor Data to{' '}
            <span className="gradient-text">Actionable Prevention</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A seamless pipeline that transforms raw rainfall data into flood risk intelligence, enabling you to act before disaster strikes.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const colors = colorStyles[step.color]
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative group rounded-2xl border ${colors.border} bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${colors.badge} flex items-center justify-center`}>
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className={`text-4xl font-bold ${colors.text} opacity-30`}>0{step.number}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-slate-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Average Response Time</h4>
            <div className="text-3xl font-bold text-cyan-400">&lt; 30s</div>
            <p className="text-sm text-slate-500 mt-2">From data ingestion to actionable alert</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <TrendingUpIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Prediction Accuracy</h4>
            <div className="text-3xl font-bold text-blue-400">97.3%</div>
            <p className="text-sm text-slate-500 mt-2">Validated against historical flood events</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
              <DatabaseIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Data Coverage</h4>
            <div className="text-3xl font-bold text-purple-400">98.5%</div>
            <p className="text-sm text-slate-500 mt-2">Sensor uptime across monitored network</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
}
function TrendingUpIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 20V10M12 10L18 14M12 10L6 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function DatabaseIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
}
