'use client'

import { motion } from 'framer-motion'
import { Calendar, Filter, Settings, Database } from 'lucide-react'

const simulationResults = [
  {
    scenario: '10-Year Storm (24hr)',
    rainfall: 45,
    floodExtent: '2.3 km²',
    affectedStreets: 12,
    estimatedDamage: '$1.2M',
    riskLevel: 'low',
  },
  {
    scenario: '50-Year Storm (12hr)',
    rainfall: 78,
    floodExtent: '8.7 km²',
    affectedStreets: 47,
    estimatedDamage: '$8.5M',
    riskLevel: 'medium',
  },
  {
    scenario: '100-Year Storm (6hr)',
    rainfall: 125,
    floodExtent: '15.2 km²',
    affectedStreets: 128,
    estimatedDamage: '$24.3M',
    riskLevel: 'high',
  },
  {
    scenario: '500-Year Storm (3hr)',
    rainfall: 210,
    floodExtent: '28.9 km²',
    affectedStreets: 312,
    estimatedDamage: '$67.8M',
    riskLevel: 'extreme',
  },
]

const riskColors: Record<string, { badge: string; bg: string }> = {
  low: { badge: 'bg-emerald-500/20 text-emerald-400', bg: 'bg-emerald-500/10' },
  medium: { badge: 'bg-yellow-500/20 text-yellow-400', bg: 'bg-yellow-500/10' },
  high: { badge: 'bg-orange-500/20 text-orange-400', bg: 'bg-orange-500/10' },
  extreme: { badge: 'bg-red-500/20 text-red-400', bg: 'bg-red-500/10' },
}

const chartData = [
  { month: 'Jan', rainfall: 85, floodEvents: 2 },
  { month: 'Feb', rainfall: 92, floodEvents: 3 },
  { month: 'Mar', rainfall: 110, floodEvents: 5 },
  { month: 'Apr', rainfall: 145, floodEvents: 8 },
  { month: 'May', rainfall: 180, floodEvents: 12 },
  { month: 'Jun', rainfall: 220, floodEvents: 18 },
  { month: 'Jul', rainfall: 265, floodEvents: 24 },
  { month: 'Aug', rainfall: 240, floodEvents: 21 },
  { month: 'Sep', rainfall: 195, floodEvents: 15 },
  { month: 'Oct', rainfall: 155, floodEvents: 9 },
  { month: 'Nov', rainfall: 120, floodEvents: 6 },
  { month: 'Dec', rainfall: 95, floodEvents: 3 },
]

export default function AnalyticsSection() {
  return (
    <section id="analytics" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Simulation Analytics
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Extreme Weather{' '}
            <span className="gradient-text">Scenario Analysis</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Run comprehensive stress tests against historical and projected storm data to understand your drainage system's limits and plan mitigation strategies.
          </p>
        </motion.div>

        <div className="glass-card p-6 lg:p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Historical Analysis</h3>
                <p className="text-sm text-slate-500">Last 12 months - Downtown Basin</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Filter className="w-4 h-4 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative h-72">
              <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rainfallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="floodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[...chartData].reverse().map((item, i) => {
                  const x = (i / chartData.length) * 500 + 50
                  const rainfallHeight = (item.rainfall / 300) * 200
                  const floodHeight = (item.floodEvents / 30) * 200

                  return (
                    <g key={item.month}>
                      <rect
                        x={x}
                        y={250 - rainfallHeight}
                        width="30"
                        height={rainfallHeight}
                        fill="url(#rainfallGradient)"
                        rx="4"
                      />
                      <rect
                        x={x + 4}
                        y={250 - floodHeight}
                        width="20"
                        height={floodHeight}
                        fill="url(#floodGradient)"
                        rx="3"
                      />
                    </g>
                  )
                })}

                <line x1="50" y1="250" x2="550" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

                {chartData.map((item, i) => {
                  const x = (i / chartData.length) * 500 + 50
                  return (
                    <text
                      key={item.month}
                      x={x + 15}
                      y="270"
                      fill="#64748b"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {item.month}
                    </text>
                  )
                })}
              </svg>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Monthly Summary</h4>
              {chartData.slice(-6).reverse().map((item) => (
                <div key={item.month} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 w-10">{item.month}</span>
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        style={{ width: `${(item.rainfall / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{item.rainfall} mm</div>
                    <div className="text-xs text-slate-500">{item.floodEvents} events</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Rainfall', value: '1,702 mm', change: '+12%', trend: 'up' },
              { label: 'Flood Events', value: '106', change: '+23%', trend: 'up' },
              { label: 'Avg Rainfall Intensity', value: '47 mm/hr', change: '-5%', trend: 'down' },
              { label: 'Peak Risk Month', value: 'July', change: '—', trend: 'stable' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className={`text-xs flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-red-400' : 'text-slate-500'}`}>
                  {stat.change} from last year
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Stress Test Scenarios</h3>
          <p className="text-slate-400">Run and compare multiple storm scenarios</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {simulationResults.map((result, index) => {
            const colors = riskColors[result.riskLevel]
            return (
              <motion.div
                key={result.scenario}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">{result.scenario}</h4>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badge}`}>
                      Risk: {result.riskLevel.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs text-slate-500 mb-1">Rainfall Intensity</div>
                      <div className="text-2xl font-bold text-cyan-400">{result.rainfall}</div>
                      <div className="text-xs text-slate-500">mm/hr</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs text-slate-500 mb-1">Flood Extent</div>
                      <div className="text-2xl font-bold text-blue-400">{result.floodExtent}</div>
                      <div className="text-xs text-slate-500">area affected</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs text-slate-500 mb-1">Affected Streets</div>
                      <div className="text-2xl font-bold text-purple-400">{result.affectedStreets}</div>
                      <div className="text-xs text-slate-500">road closures</div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5">
                      <div className="text-xs text-slate-500 mb-1">Est. Damage</div>
                      <div className="text-2xl font-bold text-amber-400">{result.estimatedDamage}</div>
                      <div className="text-xs text-slate-500">infrastructure</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <ShieldIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Risk Scoring</h4>
            <p className="text-sm text-slate-500">AI-powered vulnerability assessment for every zone in your drainage network, updated with each simulation run.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Export Reports</h4>
            <p className="text-sm text-slate-500">Generate detailed PDF reports with flood maps, risk scores, and mitigation recommendations for stakeholders.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
              <ApiIcon className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">API Access</h4>
            <p className="text-sm text-slate-500">Integrate simulation results into your own dashboards and workflows with our comprehensive REST API.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
}
function FileIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M14 2v6h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
}
function ApiIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
}
