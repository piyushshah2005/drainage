'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  Cloud,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Settings,
  Shield,
  Bell,
  Users,
  MessageSquare,
} from 'lucide-react'

interface SystemMetrics {
  sensors: {
    total: number
    online: number
    offline: number
    averageResponseTime: number
  }
  data: {
    totalProcessed: number
    dailyAverage: number
    storageUsed: number
    storageTotal: number
  }
  performance: {
    apiLatency: number
    simulationEngine: number
    databaseQueries: number
    cacheHitRate: number
  }
  uptime: {
    current: number
    lastIncident: string | null
    incidentsThisMonth: number
  }
}

interface ServiceStatus {
  name: string
  status: 'healthy' | 'degraded' | 'down'
  uptime: number
  responseTime: number
  message: string
}

export default function SystemClient({ userName, userRole }: { userName: string; userRole: string }) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  useEffect(() => {
    fetchSystemData()
    const interval = setInterval(fetchSystemData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchSystemData = async () => {
    try {
      const res = await fetch('/api/admin/analytics/system')
      const data = await res.json()
      setMetrics(data.metrics || null)
      setServices(data.services || [])
      setLastCheck(new Date())
    } catch (error) {
      console.error('Failed to fetch system data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (hours: number) => {
    const days = Math.floor(hours / 24)
    const remainingHours = Math.floor(hours % 24)
    return `${days}d ${remainingHours}h`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-emerald-400'
      case 'degraded': return 'text-yellow-400'
      case 'down': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500/20 text-emerald-400'
      case 'degraded': return 'bg-yellow-500/20 text-yellow-400'
      case 'down': return 'bg-red-500/20 text-red-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System Health</h2>
          <p className="text-slate-400 mt-1">Monitor system performance and service status</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          Last check: {lastCheck.toLocaleTimeString()}
        </div>
      </div>

      {/* Overall status */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">System Status: Healthy</h3>
              <p className="text-slate-400">All services operating normally</p>
              <p className="text-sm text-slate-500 mt-1">
                Uptime: {metrics?.uptime.current ? formatDuration(metrics.uptime.current) : 'N/A'} •{' '}
                {metrics?.uptime.incidentsThisMonth} incidents this month
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Status
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Network */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            Sensor Network Status
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-slate-700/30">
              <p className="text-3xl font-bold text-white">{metrics?.sensors.total ?? 0}</p>
              <p className="text-sm text-slate-400">Total Sensors</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-500/10">
              <p className="text-3xl font-bold text-emerald-400">{metrics?.sensors.online ?? 0}</p>
              <p className="text-sm text-slate-400">Online</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-500/10">
              <p className="text-3xl font-bold text-red-400">{metrics?.sensors.offline ?? 0}</p>
              <p className="text-sm text-slate-400">Offline</p>
            </div>
          </div>

          {/* Sensor health bars */}
          <div className="space-y-3">
            {[
              { name: 'Rainfall Sensors', online: 24, total: 28, responseTime: 45 },
              { name: 'Water Level Sensors', online: 12, total: 14, responseTime: 52 },
              { name: 'Flow Rate Sensors', online: 8, total: 8, responseTime: 38 },
            ].map((category) => (
              <div key={category.name} className="p-3 rounded-lg bg-slate-700/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-300">{category.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{category.online}/{category.total} online</span>
                    <span className="text-xs text-slate-500">{category.responseTime}ms avg</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${(category.online / category.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          {/* Storage */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-white">Storage</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Used</span>
                <span className="text-white font-medium">
                  {metrics?.data.storageUsed ? formatBytes(metrics.data.storageUsed) : '0 B'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total</span>
                <span className="text-slate-400">
                  {metrics?.data.storageTotal ? formatBytes(metrics.data.storageTotal) : '0 B'}
                </span>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                  style={{
                    width: metrics?.data.storageTotal
                      ? `${(metrics.data.storageUsed / metrics.data.storageTotal) * 100}%`
                      : '0%',
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 text-center">
                {metrics?.data.storageTotal
                  ? Math.round((metrics.data.storageUsed / metrics.data.storageTotal) * 100)
                  : 0}% used
              </p>
            </div>
          </div>

          {/* API Latency */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-white">API Performance</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Avg Latency</span>
                <span className="text-sm text-white font-medium">
                  {metrics?.performance.apiLatency ?? 0}ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Cache Hit Rate</span>
                <span className="text-sm text-emerald-400 font-medium">
                  {(metrics?.performance.cacheHitRate ?? 0).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">DB Query Time</span>
                <span className="text-sm text-white font-medium">
                  {metrics?.performance.databaseQueries ?? 0}ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service status */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-cyan-400" />
          Service Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className={`p-4 rounded-xl border ${service.status === 'healthy' ? 'border-emerald-500/30' : service.status === 'degraded' ? 'border-yellow-500/30' : 'border-red-500/30'} bg-slate-700/20`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {service.status === 'healthy' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : service.status === 'degraded' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-sm font-medium text-white">{service.name}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusBadge(service.status)}`}>
                  {service.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">{service.message}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Uptime: {service.uptime}%</span>
                <span>Response: {service.responseTime}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System configuration */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          System Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Alert Thresholds', value: '70mm/h rainfall', icon: Bell },
            { label: 'Simulation Mode', value: 'Physics-based', icon: Cpu },
            { label: 'Data Retention', value: '90 days', icon: Database },
            { label: 'Region', value: 'us-east-1', icon: Cloud },
          ].map((config) => (
            <div key={config.label} className="p-4 rounded-lg bg-slate-700/30 flex items-start gap-3">
              <config.icon className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 mb-1">{config.label}</p>
                <p className="text-sm text-white font-medium">{config.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin actions */}
      {userRole === 'superadmin' && (
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Super Admin Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <Users className="w-4 h-4" />
              Manage Users
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <MessageSquare className="w-4 h-4" />
              System Notifications
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <Database className="w-4 h-4" />
              Database Maintenance
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Restart Services
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
