'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  Bell,
  BellOff,
  CheckCircle,
  Clock,
  MapPin,
  ToggleLeft,
  ToggleRight,
  X,
  Eye,
  Archive,
} from 'lucide-react'
import type { Alert } from '@/lib/db'

type AlertArray = Alert[]

interface AlertsResponse {
  alerts: Alert[]
  total: number
  critical: number
  warning: number
  acknowledged: number
}

const alertConfig = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    icon: 'text-yellow-400',
    badge: 'bg-yellow-500/20 text-yellow-400',
  },
  normal: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    icon: 'text-slate-400',
    badge: 'bg-slate-500/20 text-slate-400',
  },
}

export default function AlertsClient({ userName }: { userName: string }) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [acknowledgedFilter, setAcknowledgedFilter] = useState<string>('all')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [detailAlert, setDetailAlert] = useState<Alert | null>(null)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/admin/alerts')
      const data: AlertsResponse = await res.json()
      setAlerts((data.alerts || []) as AlertArray)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch = alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.sensorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.sensorName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    const matchesAcknowledged = acknowledgedFilter === 'all' ||
      (acknowledgedFilter === 'acknowledged' && alert.acknowledged) ||
      (acknowledgedFilter === 'unacknowledged' && !alert.acknowledged)

    return matchesSearch && matchesSeverity && matchesAcknowledged
  })

  const handleAcknowledge = async (alertId: string) => {
    try {
      await fetch(`/api/admin/alerts/${alertId}/acknowledge`, {
        method: 'POST',
      })
      fetchAlerts()
    } catch (error) {
      console.error('Failed to acknowledge alert:', error)
    }
  }

  const handleResolve = async (alertId: string) => {
    try {
      await fetch(`/api/admin/alerts/${alertId}/resolve`, {
        method: 'POST',
      })
      fetchAlerts()
    } catch (error) {
      console.error('Failed to resolve alert:', error)
    }
  }

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    warning: alerts.filter(a => a.severity === 'warning').length,
    acknowledged: alerts.filter(a => a.acknowledged).length,
    unacknowledged: alerts.filter(a => !a.acknowledged).length,
  }

  const severityCounts = [
    { label: 'All', count: stats.total, filter: 'all' },
    { label: 'Critical', count: stats.critical, filter: 'critical' },
    { label: 'Warning', count: stats.warning, filter: 'warning' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Alert Management</h2>
          <p className="text-slate-400 mt-1">Monitor and manage system alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${stats.unacknowledged > 0 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700/50 text-slate-400'}`}>
            <Bell className="w-4 h-4" />
            <span className="text-sm">{stats.unacknowledged} pending</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {severityCounts.map((stat) => (
          <button
            key={stat.filter}
            onClick={() => setSeverityFilter(stat.filter)}
            className={`p-4 rounded-xl border transition-all ${
              severityFilter === stat.filter
                ? 'bg-cyan-500/20 border-cyan-500/50'
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <p className="text-2xl font-bold text-white">{stat.count}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </button>
        ))}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <p className="text-2xl font-bold text-white">{stats.acknowledged}</p>
          <p className="text-sm text-slate-400">Acknowledged</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search alerts by sensor, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
          />
        </div>

        <select
          value={acknowledgedFilter}
          onChange={(e) => setAcknowledgedFilter(e.target.value)}
          className="bg-slate-800/50 border border-slate-700 rounded-lg text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="all">All Status</option>
          <option value="unacknowledged">Unacknowledged</option>
          <option value="acknowledged">Acknowledged</option>
        </select>

        <button
          onClick={fetchAlerts}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Alerts list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <BellOff className="w-8 h-8 text-emerald-400" />
          </div>
          <p className="text-slate-400 text-lg">No alerts to display</p>
          <p className="text-slate-500 text-sm mt-1">All systems are operating normally</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert: Alert, index: number) => {
            const config = alertConfig[alert.severity as keyof typeof alertConfig] || alertConfig.normal

            return (
              <motion.div
                key={alert.id || alert.sensorId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-slate-800/50 border rounded-xl p-4 transition-all hover:border-slate-600 ${config.border} ${config.bg}`}
              >
                <div className="flex items-start gap-4">
                  {/* Severity indicator */}
                  <div className={`p-2 rounded-lg ${config.bg} flex-shrink-0`}>
                    <AlertTriangle className={`w-5 h-5 ${config.icon}`} />
                  </div>

                  {/* Alert content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-white font-medium">{alert.message}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                          <span>{alert.sensorName}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {alert.location}
                          </span>
                          <span className="text-cyan-400 font-mono">{alert.sensorId}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!alert.acknowledged ? (
                          <button
                            onClick={() => handleAcknowledge(alert.id || alert.sensorId)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg ${config.badge} hover:bg-opacity-30 transition-colors flex items-center gap-1`}
                          >
                            <CheckCircle className="w-3 h-3" />
                            Acknowledge
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Acknowledged
                          </span>
                        )}
                        <button
                          onClick={() => handleResolve(alert.id || alert.sensorId)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Resolve
                        </button>
                        <button
                          onClick={() => setDetailAlert(alert as Alert)}
                          className="flex items-center gap-1 px-2 py-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert footer */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/30 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(alert.createdAt).toLocaleString()}
                    </span>
                    <span>Value: <span className="text-white font-medium">{alert.value} {alert.unit}</span></span>
                    <span>Threshold: <span className="text-white font-medium">{alert.threshold} {alert.unit}</span></span>
                  </div>
                  {alert.acknowledged && alert.acknowledgedBy && (
                    <span className="text-slate-500">
                      By: {alert.acknowledgedBy}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Results count */}
      <div className="text-center text-sm text-slate-500">
        Showing {filteredAlerts.length} of {alerts.length} alerts
      </div>
    </div>
  )
}
