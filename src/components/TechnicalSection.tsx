'use client'

import { motion } from 'framer-motion'
import {
  Server,
  Cloud,
  Database,
  Cpu,
  Globe,
  Shield,
  Zap,
  Layers,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'

const techStack = [
  {
    category: 'Data Collection',
    items: [
      { name: 'IoT Sensor Network', description: 'LoRaWAN and NB-IoT compatible sensors for rainfall, water level, and flow rate monitoring' },
      { name: 'Weather API Integration', description: 'Real-time weather data from NOAA, Met Office, and other meteorological services' },
      { name: 'Historical Data Warehouse', description: '50+ years of historical rainfall and flood event data for calibration and scenario building' },
    ],
  },
  {
    category: 'Simulation Engine',
    items: [
      { name: 'HSPF Framework', description: 'Hydrological Simulation Program—FORTRAN for watershed-scale modeling' },
      { name: 'HEC-RAS Integration', description: 'Hydraulic Engineering Center\'s River Analysis System for river and channel flow' },
      { name: 'SWMM Compatibility', description: 'EPA Storm Water Management Model for urban drainage network simulation' },
    ],
  },
  {
    category: 'AI & Analytics',
    items: [
      { name: 'Predictive ML Models', description: 'Machine learning models trained on historical flood events for enhanced prediction accuracy' },
      { name: 'Anomaly Detection', description: 'Real-time sensor anomaly detection and data quality assurance' },
      { name: 'Risk Scoring Engine', description: 'Multi-factor risk assessment considering infrastructure age, capacity, and historical performance' },
    ],
  },
  {
    category: 'Visualization & UI',
    items: [
      { name: '3D City Mapping', description: 'Interactive 3D visualization of flood extent, water depth, and flow velocity on digital elevation models' },
      { name: 'Real-time Dashboards', description: 'Customizable live dashboards with sensor status, alerts, and key metrics' },
      { name: 'Report Generation', description: 'Automated PDF report generation with flood maps, risk scores, and recommendations' },
    ],
  },
]

const capabilities = [
  { icon: Zap, title: 'Real-time Processing', description: 'Sub-second processing of sensor data streams for immediate response capability' },
  { icon: Layers, title: 'Multi-Model Support', description: 'Supports HSPF, HEC-RAS, SWMM, and custom hydraulic models in a unified framework' },
  { icon: RefreshCw, title: 'Continuous Calibration', description: 'Automated model calibration using live sensor data to maintain prediction accuracy' },
  { icon: Globe, title: 'Global Coverage', description: 'Configurable for any urban geography with support for local coordinate systems and projections' },
  { icon: Database, title: 'Scalable Infrastructure', description: 'Cloud-native architecture supporting 10,000+ sensors and 100+ concurrent simulations' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 Type II certified with end-to-end encryption and role-based access control' },
]

export default function TechnicalSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-500/10 border border-slate-500/20 rounded-full text-slate-400 text-sm font-medium mb-4">
            <Cpu className="w-4 h-4" />
            Technical Architecture
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Enterprise-Grade{' '}
            <span className="gradient-text">Digital Twin Platform</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built on proven hydrological modeling frameworks with modern cloud architecture for reliability, scalability, and accuracy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {techStack.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${catIndex % 2 === 0 ? 'order-1' : 'order-2'}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{item.name}</h4>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card p-8 lg:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Platform Capabilities</h3>
            <p className="text-slate-400">Built for the demands of municipal infrastructure management</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <cap.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{cap.title}</h4>
                  <p className="text-sm text-slate-400">{cap.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '99.9%', label: 'Uptime SLA', icon: Shield },
            { value: '50ms', label: 'Data Latency', icon: Zap },
            { value: '10K+', label: 'Sensor Capacity', icon: Database },
            { value: 'SOC 2', label: 'Compliance', icon: Shield },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white/5 text-center"
            >
              <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
