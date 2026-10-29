'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  AlertTriangle,
  TrendingUp,
  Activity,
  Bell,
  RefreshCw,
  Thermometer,
  Waves,
  ChevronDown,
  AlertCircle,
  Map as MapIcon,
} from 'lucide-react'

interface SensorReading {
  id: string
  name: string
  location: string
  type: 'rainfall' | 'water_level' | 'flow_rate'
  value: number
  unit: string
  status: 'normal' | 'elevated' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  lastUpdate: Date
}

const generateSensorData = (): SensorReading[] => {
  const sensors: Array<Omit<SensorReading, 'value' | 'unit' | 'lastUpdate'>> = [
    { id: 'S-2047', name: 'West District Gauge', location: 'Riverview Park', type: 'rainfall', status: 'normal' as const, trend: 'stable' as const },
    { id: 'S-2089', name: 'East Riverside Flow', location: 'Main Street Bridge', type: 'flow_rate' as const, status: 'elevated' as const, trend: 'up' as const },
    { id: 'S-2103', name: 'Central Plaza Water Level', location: 'Downtown Basin', type: 'water_level' as const, status: 'warning' as const, trend: 'up' as const },
    { id: 'S-2115', name: 'North Industrial Drain', location: 'Industrial Zone A', type: 'flow_rate' as const, status: 'normal' as const, trend: 'stable' as const },
    { id: 'S-2128', name: 'South Harbor Flood Gate', location: 'Harbor District', type: 'water_level' as const, status: 'critical' as const, trend: 'up' as const },
    { id: 'S-2142', name: 'Lake Park Rain Gauge', location: 'Lake Park', type: 'rainfall' as const, status: 'elevated' as const, trend: 'down' as const },
  ]

  return sensors.map(sensor => {
    let value: number
    switch (sensor.type) {
      case 'rainfall':
        value = Math.random() * 100 + 5
        break
      case 'water_level':
        value = Math.random() * 3 + 1
        break
      case 'flow_rate':
        value = Math.random() * 50 + 10
        break
      default:
        value = 50
    }

    return {
      ...sensor,
      value: Math.round(value * 10) / 10,
      unit: sensor.type === 'rainfall' ? 'mm/h' : sensor.type === 'water_level' ? 'm' : 'm³/s',
      lastUpdate: new Date(),
    }
  })
}

type StatusKey = 'normal' | 'elevated' | 'warning' | 'critical'

type StatusConfig = Record<StatusKey, { bg: string; text: string; dot: string; pulse: string }>

const statusConfig: StatusConfig = {
  normal: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', pulse: 'bg-emerald-400' },
  elevated: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400', pulse: 'bg-yellow-400' },
  warning: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400', pulse: 'bg-orange-400' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400', pulse: 'bg-red-400' },
}

export default function LiveDashboardSection() {
  const [sensorData, setSensorData] = useState<SensorReading[]>([])
  const [activeAlerts, setActiveAlerts] = useState<SensorReading[]>([])
  const [isLive, setIsLive] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    setCurrentTime(new Date().toLocaleTimeString())

    setSensorData(generateSensorData())
    setActiveAlerts(generateSensorData().filter(s => s.status !== 'normal'))

    if (isLive) {
      const dataInterval = setInterval(() => {
        setSensorData(prev => prev.map(sensor => {
          let change = (Math.random() - 0.5) * 2

          let newValue = sensor.value + change
          if (newValue < 0) newValue = Math.abs(newValue)

          let newStatus = sensor.status
          const thresholds = sensor.type === 'rainfall' ? [30, 50, 70] : [1.5, 2.0, 2.5]

          if (newValue > thresholds[2]) newStatus = 'critical'
          else if (newValue > thresholds[1]) newStatus = 'warning'
          else if (newValue > thresholds[0]) newStatus = 'elevated'
          else newStatus = 'normal'

          return {
            ...sensor,
            value: Math.round(newValue * 10) / 10,
            status: newStatus,
            lastUpdate: new Date(),
          }
        }))

        setActiveAlerts(prev => generateSensorData().filter(s => s.status !== 'normal').slice(0, 3))
      }, 3000)

      return () => {
        clearInterval(dataInterval)
        clearInterval(timeInterval)
      }
    }

    return () => clearInterval(timeInterval)
  }, [isLive])

  const stats = {
    totalSensors: sensorData.length,
    elevatedSensors: sensorData.filter(s => s.status === 'elevated' || s.status === 'warning' || s.status === 'critical').length,
    avgRainfall: sensorData.filter(s => s.type === 'rainfall').reduce((sum, s) => sum + s.value, 0) / sensorData.filter(s => s.type === 'rainfall').length || 0,
    criticalCount: sensorData.filter(s => s.status === 'critical').length,
  }

  return (
    <section id="dashboard" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              Live Operations Center
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Real-Time{' '}
              <span className="gradient-text">Drainage Monitoring</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl">
              Monitor sensor readings, track flood conditions, and receive instant alerts across your entire urban drainage network.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isLive ? 'bg-emerald-500/20' : 'bg-slate-500/20'}`}>
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span className={`text-sm font-medium ${isLive ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isLive ? 'LIVE' : 'PAUSED'}
              </span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm text-slate-400"
            >
              <RefreshCw className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
              {isLive ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapIcon className="w-5 h-5 text-cyan-400" />
                <span>Urban Drainage Network</span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="text-sm text-slate-500">
                Last updated: <span className="text-cyan-400 font-mono">{currentTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors ${
                  activeAlerts.length > 0
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <Bell className="w-4 h-4" />
                Alerts
                {activeAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activeAlerts.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-4 top-full mt-2 w-80 glass-card-light p-4 shadow-2xl z-20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Active Alerts</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-white">
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                  {activeAlerts.length === 0 ? (
                    <p className="text-sm text-slate-500">No active alerts at this time</p>
                  ) : (
                    <div className="space-y-2">
                      {activeAlerts.map(alert => (
                        <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg bg-white/5">
                          <AlertTriangle className={`w-4 h-4 mt-0.5 ${statusConfig[alert.status].text}`} />
                          <div>
                            <div className="text-sm font-medium text-white">{alert.name}</div>
                            <div className="text-xs text-slate-500">{alert.location}</div>
                          </div>
                          <span className={`ml-auto text-xs font-medium ${statusConfig[alert.status].bg} ${statusConfig[alert.status].text} px-2 py-0.5 rounded-full`}>
                            {alert.status.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-white/10">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <Droplets className="w-4 h-4" />
                Total Sensors
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalSensors}</div>
              <div className="text-xs text-slate-500 mt-1">Active in network</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <Activity className="w-4 h-4" />
                Elevated Status
              </div>
              <div className="text-2xl font-bold text-yellow-400">{stats.elevatedSensors}</div>
              <div className="text-xs text-slate-500 mt-1">Requires attention</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <Thermometer className="w-4 h-4" />
                Avg Rainfall
              </div>
              <div className="text-2xl font-bold text-cyan-400">{stats.avgRainfall.toFixed(1)} mm/h</div>
              <div className="text-xs text-slate-500 mt-1">Current average</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Alerts
              </div>
              <div className="text-2xl font-bold text-red-400">{stats.criticalCount}</div>
              <div className="text-xs text-slate-500 mt-1">Immediate action needed</div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Sensor Readings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Sensor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Reading</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((sensor, index) => (
                    <motion.tr
                      key={sensor.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${sensor.status === 'critical' ? 'bg-red-500/5' : ''}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${statusConfig[sensor.status].dot}`} style={{ boxShadow: `0 0 8px ${statusConfig[sensor.status].dot}` }} />
                          <span className="font-mono text-sm text-cyan-400">{sensor.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-400">{sensor.location}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400 capitalize">
                          {sensor.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div>
                          <span className="text-lg font-semibold text-white">{sensor.value}</span>
                          <span className="text-slate-500 text-sm ml-1">{sensor.unit}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig[sensor.status].bg} ${statusConfig[sensor.status].text}`}>
                          {sensor.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {sensor.trend === 'up' && (
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                          )}
                          <span className={`text-sm ${sensor.trend === 'up' ? 'text-emerald-400' : sensor.trend === 'down' ? 'text-red-400' : 'text-slate-500'}`}>
                            {sensor.trend}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span>Real-time data streaming active</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <ChevronDown className="w-4 h-4" />
              <span>Auto-refresh: 3s</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapIcon className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Flood Risk Map</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center glow">
                  <MapIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-slate-500 text-sm mb-4">Interactive Flood Risk Visualization</p>
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25">
                  Launch Map View
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">System Health</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sensor Network Connectivity', status: 'healthy', percentage: 99.7 },
                { name: 'Data Processing Pipeline', status: 'healthy', percentage: 100 },
                { name: 'Simulation Engine', status: 'healthy', percentage: 98.2 },
                { name: 'Alert Delivery System', status: 'degraded', percentage: 87.5 },
                { name: 'Database Operations', status: 'healthy', percentage: 99.1 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 flex-1">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium w-16 text-right ${item.status === 'healthy' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function XIcon({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
