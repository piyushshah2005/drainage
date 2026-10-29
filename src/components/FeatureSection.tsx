'use client'

import { motion } from 'framer-motion'
import {
  Droplets,
  Network,
  Wind,
  Radar,
  Bell,
  Shield,
  Cloud,
  Layers,
  Database,
  CheckCircle2,
} from 'lucide-react'

const WindIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h2v2H3v-2zm6-6h2v2h-2v-2zm6 6h2v2h-2v-2zm6-10h2v2h-2V2zm-6 4h2v2h-2v-2zM9 18h2v2H9v-2z" />
  </svg>
)

const features = [
  {
    id: 'sensor-feed',
    icon: Droplets,
    title: 'Live Sensor Data Feeds',
    description: 'Real-time rainfall, water level, and flow rate data from IoT sensors across the urban drainage network, updated every second.',
    color: 'cyan',
    stats: ['3,200+ sensors', '1-second latency', '99.9% uptime'],
  },
  {
    id: 'physics-model',
    icon: Network,
    title: 'Physics-Based Drainage Model',
    description: 'High-fidelity hydraulic simulation engine that models water flow through pipes, channels, and surface runoff with engineering-grade accuracy.',
    color: 'blue',
    stats: ['HSPF/HEC-RAS integration', 'Sub-second simulation', 'Dimensional accuracy ±2%'],
  },
  {
    id: 'extreme-events',
    icon: WindIcon,
    title: 'Extreme Weather Simulation',
    description: 'Simulate 100-year storms, flash floods, and climate change scenarios to stress test drainage infrastructure before failure occurs.',
    color: 'purple',
    stats: ['100-year storms', '500-year scenarios', 'Climate projections'],
  },
  {
    id: 'flood-mapping',
    icon: Radar,
    title: 'Flood-Prone Zone Identification',
    description: 'AI-enhanced predictive modeling identifies at-risk areas with precision mapping, enabling proactive flood mitigation strategies.',
    color: 'orange',
    stats: ['1m resolution mapping', 'Real-time flood modeling', 'Risk score per zone'],
  },
  {
    id: 'early-warning',
    icon: Bell,
    title: 'Early Warning System',
    description: 'Automated alerts and evacuation routing when sensors detect flood conditions exceeding safety thresholds.',
    color: 'red',
    stats: ['<30 sec alert time', 'SMS/Email/App push', 'Evacuation routes'],
  },
  {
    id: 'training',
    icon: Shield,
    title: 'Emergency Response Training',
    description: 'Immersive simulation environment for training emergency responders and municipal staff on flood response protocols.',
    color: 'emerald',
    stats: ['VR/AR support', 'Scenario library', 'Performance analytics'],
  },
]

const featureColors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-600' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500 to-indigo-600' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', gradient: 'from-purple-500 to-pink-600' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500 to-red-600' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', gradient: 'from-red-500 to-rose-600' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', gradient: 'from-emerald-500 to-teal-600' },
}

export default function FeatureSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />
      <div className="absolute inset-0 grid-line opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Core Capabilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Built for{' '}
            <span className="gradient-text">Civil Engineers</span>
            {' '}and Municipal Planners
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A complete digital twin platform that merges real-time sensor data with physics-based simulation to predict, visualize, and prevent urban flooding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = featureColors[feature.color]
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative p-8 rounded-2xl border ${colors.border} bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 ${colors.text}`}>
                  <feature.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {feature.stats.map((stat) => (
                    <span
                      key={stat}
                      className={`text-xs px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} font-medium`}
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                <div className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity ${colors.text}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l8 8-2.5 1.5L12 10l-5.5 3L4 12l8-8z" />
                  </svg>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Integration</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Seamless Data Integration</h3>
            <p className="text-slate-400 mb-6">
              Connect your existing SCADA systems, weather APIs, and GIS databases through our unified integration layer.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['REST API', 'WebSocket', 'MQTT', 'OPC-UA', 'CSV Upload', 'Database Direct'].map((item) => (
                <div key={item} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Radar className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Precision</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Sub-Meter Accuracy</h3>
            <p className="text-slate-400 mb-6">
              High-resolution digital elevation models combined with accurate pipe network geometry ensure reliable predictions.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Digital Elevation Model', value: '≤0.5m accuracy' },
                { label: 'Pipe Network Geometry', value: '±1% tolerance' },
                { label: 'Flow Rate Prediction', value: '±5% at design flow' },
                { label: 'Flood Extent Mapping', value: '1m grid resolution' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-slate-400 text-sm">{item.label}</span>
                  <span className="text-cyan-400 text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Wind icon inline in features array
