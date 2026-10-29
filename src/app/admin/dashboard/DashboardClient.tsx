'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Map,
  Gauge,
  Database,
  Wifi,
} from 'lucide-react'
import type { SensorData, Alert } from '@/lib/db'

type SensorArray = SensorData[]
type AlertArray = Alert[]

interface DashboardStats {
  totalSensors: number
  activeSensors: number
  avgRainfall: number
  totalAlerts: number
  criticalAlerts: number
  elevatedSensors: number
  totalDataPoints: number
  systemHealth: number
}

interface RecentActivity {
  id: string
  type: 'alert' | 'sensor' | 'system'
  message: string
  timestamp: Date
  severity?: 'normal' | 'warning' | 'critical'
}

const sensorStatusConfig = {
  normal: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  elevated: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  warning: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
}

export default function DashboardClient({
  userName,
  userRole,
}: {
  userName: string
  userRole: string
}) {
  const [stats, setStats] = useState<DashboardStats>({
    totalSensors: 0,
    activeSensors: 0,
    avgRainfall: 0,
    totalAlerts: 0,
    criticalAlerts: 0,
    elevatedSensors: 0,
    totalDataPoints: 0,
    systemHealth: 100,
  })

  const [sensors, setSensors] = useState<SensorData[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [activity, setActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [sensorsRes, alertsRes, activityRes] = await Promise.all([
        fetch('/api/admin/sensors'),
        fetch('/api/admin/alerts'),
        fetch('/api/admin/analytics/activity'),
      ])

      const [sensorsData, alertsData, activityData] = await Promise.all([
        sensorsRes.json(),
        alertsRes.json(),
        activityRes.json(),
      ])

      setSensors(sensorsData.sensors || [])
      setAlerts(alertsData.alerts || [])
      setActivity(activityData.activity || [])

      // Calculate stats
      const activeSensors = (sensorsData.sensors as SensorArray)?.filter((s: SensorData) => s.status !== 'normal').length || 0
      const criticalAlerts = (alertsData.alerts as AlertArray)?.filter((a: Alert) => a.severity === 'critical').length || 0
      const totalAlerts = (alertsData.alerts as AlertArray)?.length || 0

      setStats({
        totalSensors: (sensorsData.sensors as SensorArray)?.length || 0,
        activeSensors,
        avgRainfall: (sensorsData.sensors as SensorArray)?.filter((s: SensorData) => s.type === 'rainfall').reduce((sum: number, s: SensorData) => sum + s.value, 0) / ((sensorsData.sensors as SensorArray)?.filter((s: SensorData) => s.type === 'rainfall').length || 1) || 0,
        totalAlerts,
        criticalAlerts,
        elevatedSensors: activeSensors,
        totalDataPoints: sensorsData.sensors?.length * 100 || 0,
        systemHealth: 99.5,
      })

      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchDashboardData()
  }

  const statCards = [
    {
      label: 'Total Sensors',
      value: stats.totalSensors,
      icon: Droplets,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      change: '+12%',
      trend: 'up',
    },
    {
      label: 'Active Alerts',
      value: stats.totalAlerts,
      icon: AlertTriangle,
      color: stats.criticalAlerts > 0 ? 'text-red-400' : 'text-yellow-400',
      bg: stats.criticalAlerts > 0 ? 'bg-red-500/10' : 'bg-yellow-500/10',
      change: stats.criticalAlerts > 0 ? `↑ ${stats.criticalAlerts} critical` : 'Stable',
      trend: stats.criticalAlerts > 0 ? 'critical' : 'stable',
    },
    {
      label: 'Avg Rainfall',
      value: `${stats.avgRainfall.toFixed(1)} mm/h`,
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      change: '+8%',
      trend: 'up',
    },
    {
      label: 'System Health',
      value: `${stats.systemHealth}%`,
      icon: Gauge,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      change: 'Healthy',
      trend: 'up',
    },
  ]

  const criticalSensors = sensors.filter(s => s.status === 'critical').slice(0, 3)
  const recentAlerts = alerts.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {userName}</h2>
          <p className="text-slate-400 mt-1">Here&apos;s what&apos;s happening with your drainage network</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm bg-slate-700/50 text-slate-400 rounded-full">
            {userRole === 'superadmin' ? 'Super Admin' : 'Admin'} Access
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold text-white ${stat.trend === 'critical' ? 'text-red-400' : ''}`}>
                    {stat.value}
                  </p>
                  {stat.trend !== 'stable' && stat.trend !== 'critical' && (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change} from yesterday
                    </p>
                  )}
                </div>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical alerts */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Critical Status
            </h3>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleString()}
            </span>
          </div>

          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : criticalSensors.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Gauge className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-slate-400">All sensors operating normally</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {          criticalSensors.map((sensor: SensorData) => (
                <div key={sensor.id || sensor.sensorId} className="p-4 hover:bg-slate-700/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${sensorStatusConfig[sensor.status].dot}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{sensor.name}</p>
                        <p className="text-xs text-slate-400">{sensor.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${sensorStatusConfig[sensor.status].text}`}>
                        {sensor.value} {sensor.unit}
                      </p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sensorStatusConfig[sensor.status].bg} ${sensorStatusConfig[sensor.status].text}`}>
                        {sensor.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System health */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              System Health
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { name: 'Sensor Network', value: 99.7, icon: Wifi },
              { name: 'Data Pipeline', value: 100, icon: Database },
              { name: 'Simulation Engine', value: 98.2, icon: Map },
              { name: 'API Service', value: 99.9, icon: Activity },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.value >= 99 ? 'bg-emerald-500' : item.value >= 95 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-400 w-10 text-right">{item.value}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rainfall trend */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Rainfall Trend (24h)
            </h3>
            <span className="text-xs text-slate-400">Last 24 hours</span>
          </div>
          <div className="h-48 flex items-end gap-1">
            {[65, 72, 58, 82, 95, 78, 62, 45, 52, 68, 85, 92, 75, 65, 55, 48, 42, 38, 44, 58, 72, 88, 95, 82].map((value, index) => (
              <div
                key={index}
                className="flex-1 rounded-t transition-all hover:opacity-80"
                style={{
                  height: `${value}%`,
                  backgroundColor: value > 80 ? 'bg-red-500' : value > 60 ? 'bg-orange-500' : value > 40 ? 'bg-yellow-500' : 'bg-blue-500',
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            {['00', '03', '06', '09', '12', '15', '18', '21', '24'].map((time, index) => (
              <span key={time} className="w-1/8 text-center">{time}</span>
            ))}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Recent Alerts
            </h3>
            <span className="text-xs text-slate-400">{alerts.length} total</span>
          </div>
          {loading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">No recent alerts</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentAlerts.map((alert: Alert) => (
                <div
                  key={alert.id || alert.sensorId}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/20"
                >
                  <AlertTriangle
                    className={`w-4 h-4 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {alert.sensorName} • {new Date(alert.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/dashboard/sensors"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors text-sm font-medium"
          >
            <Droplets className="w-4 h-4" />
            View All Sensors
          </a>
          <a
            href="/admin/dashboard/alerts"
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <AlertTriangle className="w-4 h-4" />
            Manage Alerts
          </a>
          <a
            href="/admin/dashboard/analytics"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </a>
          <a
            href="/admin/dashboard/system"
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <Gauge className="w-4 h-4" />
            System Settings
          </a>
        </div>
      </div>
    </div>
  )
}
