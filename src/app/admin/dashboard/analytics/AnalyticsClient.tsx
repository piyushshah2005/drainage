'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Droplets,
  AlertTriangle,
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

interface AnalyticsData {
  rainfallTrend: { date: string; value: number }[]
  sensorDistribution: { type: string; count: number; percentage: number }[]
  alertTrend: { date: string; count: number; severity: string }[]
  topLocations: { location: string; alertCount: number; riskLevel: string }[]
  summary: {
    totalReadings: number
    avgRainfall: number
    maxRainfall: number
    minRainfall: number
    totalAlerts: number
    criticalAlerts: number
    warningAlerts: number
  }
}

export default function AnalyticsClient({ userName }: { userName: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<string>('7d')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/admin/analytics?range=${timeRange}`)
      const analyticsData: AnalyticsData = await res.json()
      setData(analyticsData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return null
  }

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ]

  const maxRainfall = Math.max(...data.rainfallTrend.map(d => d.value))
  const maxAlerts = Math.max(...data.alertTrend.map(d => d.count))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>
          <p className="text-slate-400 mt-1">Comprehensive data analysis and trends</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Time range selector */}
      <div className="flex items-center gap-2">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range.value
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Droplets className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-sm text-slate-400">Total Readings</span>
          </div>
          <p className="text-3xl font-bold text-white">{(data.summary.totalReadings / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-500 mt-1">
            {timeRange === '24h' ? 'Today' : timeRange === '7d' ? 'This week' : timeRange === '30d' ? 'This month' : 'This quarter'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-slate-400">Avg Rainfall</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.summary.avgRainfall.toFixed(1)} mm/h</p>
          <p className="text-xs text-slate-500 mt-1">
            Range: {data.summary.minRainfall.toFixed(1)} - {data.summary.maxRainfall.toFixed(1)} mm/h
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${data.summary.criticalAlerts > 0 ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}>
              <AlertTriangle className={`w-5 h-5 ${data.summary.criticalAlerts > 0 ? 'text-red-400' : 'text-yellow-400'}`} />
            </div>
            <span className="text-sm text-slate-400">Total Alerts</span>
          </div>
          <p className="text-3xl font-bold text-white">{data.summary.totalAlerts}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-red-400">{data.summary.criticalAlerts} critical</span>
            <span className="text-xs text-yellow-400">{data.summary.warningAlerts} warning</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm text-slate-400">Data Quality</span>
          </div>
          <p className="text-3xl font-bold text-emerald-400">99.2%</p>
          <p className="text-xs text-slate-500 mt-1">Valid readings</p>
        </motion.div>
      </div>

      {/* Main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rainfall trend chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-cyan-400" />
              Rainfall Trend
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              {timeRange === '24h' ? 'Last 24 hours' : timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </div>
          </div>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end gap-1">
              {data.rainfallTrend.map((point, index) => {
                const height = (point.value / maxRainfall) * 100
                return (
                  <div
                    key={index}
                    className="flex-1 rounded-t transition-all hover:opacity-80 cursor-pointer relative group"
                    style={{
                      height: `${Math.max(height, 5)}%`,
                      backgroundColor: point.value > 70 ? 'bg-red-500' : point.value > 50 ? 'bg-orange-500' : point.value > 30 ? 'bg-yellow-500' : 'bg-cyan-500',
                      opacity: 0.7,
                      transition: 'height 0.3s ease',
                    }}
                    title={`${point.date}: ${point.value} mm/h`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {point.value} mm/h
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-slate-500">
              <span>{maxRainfall}</span>
              <span>{Math.round(maxRainfall / 2)}</span>
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Alert trend chart */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              Alert Frequency
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded bg-red-500" />
                <span className="text-slate-400">Critical</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded bg-yellow-500" />
                <span className="text-slate-400">Warning</span>
              </div>
            </div>
          </div>
          <div className="h-64 relative">
            {data.alertTrend.map((point, index) => {
              const criticalCount = point.severity === 'critical' ? point.count : 0
              const warningCount = point.severity === 'warning' ? point.count : 0
              return (
                <div key={index} className="flex-1 flex flex-col gap-0.5">
                  <div
                    className="bg-red-500/70 rounded-t transition-all hover:opacity-80"
                    style={{
                      height: `${criticalCount > 0 ? Math.max((criticalCount / maxAlerts) * 100, 2) : 0}%`,
                    }}
                    title={`${point.date}: ${criticalCount} critical`}
                  />
                  <div
                    className="bg-yellow-500/70 rounded-b transition-all hover:opacity-80"
                    style={{
                      height: `${warningCount > 0 ? Math.max((warningCount / maxAlerts) * 100, 2) : 0}%`,
                    }}
                    title={`${point.date}: ${warningCount} warning`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor distribution */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Sensor Distribution
          </h3>
          <div className="space-y-3">
            {data.sensorDistribution.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.type === 'rainfall' ? 'bg-cyan-500' :
                    item.type === 'water_level' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <span className="text-sm text-slate-300 capitalize">
                    {item.type === 'rainfall' ? 'Rainfall Sensors' :
                     item.type === 'water_level' ? 'Water Level Sensors' :
                     'Flow Rate Sensors'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{item.count}</span>
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.type === 'rainfall' ? 'bg-cyan-500' :
                                        item.type === 'water_level' ? 'bg-blue-500' :
                                        'bg-purple-500',
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-10 text-right">{item.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk assessment */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            High Risk Locations
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {data.topLocations.map((location, index) => (
              <motion.div
                key={location.location}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    location.riskLevel === 'high' ? 'bg-red-500' :
                    location.riskLevel === 'medium' ? 'bg-yellow-500' :
                    'bg-emerald-500'
                  }`} />
                  <div>
                    <p className="text-sm text-white">{location.location}</p>
                    <p className="text-xs text-slate-400">{location.alertCount} alerts</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  location.riskLevel === 'high' ? 'bg-red-500/20 text-red-400' :
                  location.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {location.riskLevel.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
