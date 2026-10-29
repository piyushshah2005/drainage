'use client'

import { motion } from 'framer-motion'
import { Droplets, Cloud, Shield, Server, Activity } from 'lucide-react'

const stats = [
  { value: '2,847', label: 'Active Sensors', icon: Droplets, change: '+12%', trend: 'up' },
  { value: '5.2 TB', label: 'Daily Data Processed', icon: Server, change: '+8%', trend: 'up' },
  { value: '342 km', label: 'Drainage Network Monitored', icon: Activity, change: '+15%', trend: 'up' },
  { value: '99.7%', label: 'Model Accuracy', icon: Shield, change: '+2.1%', trend: 'up' },
]

type LiveDataStatus = 'normal' | 'elevated' | 'warning' | 'critical'

const liveData: Array<{
  sensor: string
  location: string
  rainfall: number
  status: LiveDataStatus
}> = [
  { sensor: 'S-2047', location: 'West District', rainfall: 23.4, status: 'normal' },
  { sensor: 'S-2089', location: 'East Riverside', rainfall: 45.8, status: 'elevated' },
  { sensor: 'S-2103', location: 'Central Plaza', rainfall: 67.2, status: 'warning' },
  { sensor: 'S-2115', location: 'North Industrial', rainfall: 12.1, status: 'normal' },
  { sensor: 'S-2128', location: 'South Harbor', rainfall: 89.5, status: 'critical' },
  { sensor: 'S-2142', location: 'Lake Park', rainfall: 34.9, status: 'elevated' },
]

type StatusKey = 'normal' | 'elevated' | 'warning' | 'critical'

type StatusColors = Record<StatusKey, { bg: string; text: string; dot: string }>

const statusColors: StatusColors = {
  normal: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  elevated: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  warning: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-blue-950/50" />

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Live System Status: <span className="text-emerald-400 font-semibold">Operational</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Digital Twin for{' '}
              <br />
              <span className="gradient-text">Urban Drainage</span>
              <br />
              Stress Testing
            </h1>

            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Live rainfall sensor data feeds a physics-based city drainage model. Civil engineers and municipal planners can simulate extreme weather events to identify flood-prone zones before they become crises.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
              >
                <Server className="w-5 h-5" />
                Launch Simulation
                <span className="text-cyan-200 text-sm">→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 glass-card-light text-slate-300 font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <PlayCircleIcon className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-400" />
                <span>Real-time Streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span>AI-Powered</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <div className="glass-card p-6 glow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Live Sensor Network
                </h3>
                <span className="text-xs text-slate-500 font-mono">UPDATED 2s AGO</span>
              </div>

              <div className="space-y-3">
                {liveData.map((item, index) => (
                  <motion.div
                    key={item.sensor}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full" style={{
                        backgroundColor: statusColors[item.status].dot,
                        boxShadow: `0 0 8px ${statusColors[item.status].dot}`
                      }} />
                      <div>
                        <div className="text-sm font-mono text-cyan-400">{item.sensor}</div>
                        <div className="text-xs text-slate-500">{item.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${statusColors[item.status].text}`}>
                        {item.rainfall.toFixed(1)} mm/h
                      </div>
                      <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[item.status].bg} ${statusColors[item.status].text}`}>
                        {item.status.toUpperCase()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Average Rainfall</span>
                  <span className="text-cyan-400 font-semibold">42.1 mm/h</span>
                </div>
                <div className="mt-2 bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-2xl blur-2xl" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 mb-2">{stat.label}</div>
              <div className="text-xs flex items-center gap-1 text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {stat.change} from last month
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </svg>
  )
}
