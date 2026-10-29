'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  Search,
  Filter,
  RefreshCw,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
  Plus,
  Download,
  Grid3X3,
  List,
} from 'lucide-react'
import type { SensorData } from '@/lib/db'

type SensorArray = SensorData[]

interface SensorsResponse {
  sensors: SensorData[]
  total: number
}

const sensorStatusConfig = {
  normal: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  elevated: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-400' },
  warning: { bg: 'bg-orange-500/20', text: 'text-orange-400', dot: 'bg-orange-400' },
  critical: { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
}

const sensorTypeConfig = {
  rainfall: { label: 'Rainfall', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  water_level: { label: 'Water Level', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  flow_rate: { label: 'Flow Rate', color: 'text-purple-400', bg: 'bg-purple-500/10' },
}

export default function SensorsClient({ userName }: { userName: string }) {
  const [sensors, setSensors] = useState<SensorData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchSensors()
  }, [])

  const fetchSensors = async () => {
    try {
      const res = await fetch('/api/admin/sensors')
      const data: SensorsResponse = await res.json()
      setSensors((data.sensors || []) as SensorArray)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch sensors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSensors = sensors.filter((sensor) => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.sensorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sensor.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || sensor.status === statusFilter
    const matchesType = typeFilter === 'all' || sensor.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: sensors.length,
    normal: sensors.filter(s => s.status === 'normal').length,
    elevated: sensors.filter(s => s.status === 'elevated').length,
    warning: sensors.filter(s => s.status === 'warning').length,
    critical: sensors.filter(s => s.status === 'critical').length,
  }

  const statusCounts = [
    { label: 'All', count: stats.total, filter: 'all' },
    { label: 'Normal', count: stats.normal, filter: 'normal' },
    { label: 'Elevated', count: stats.elevated, filter: 'elevated' },
    { label: 'Warning', count: stats.warning, filter: 'warning' },
    { label: 'Critical', count: stats.critical, filter: 'critical' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Sensor Network</h2>
          <p className="text-slate-400 mt-1">Manage and monitor all drainage sensors</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors">
            <Plus className="w-4 h-4" />
            Add Sensor
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statusCounts.map((stat) => (
          <button
            key={stat.filter}
            onClick={() => setStatusFilter(stat.filter)}
            className={`p-4 rounded-xl border transition-all ${
              statusFilter === stat.filter
                ? 'bg-cyan-500/20 border-cyan-500/50'
                : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <p className="text-2xl font-bold text-white">{stat.count}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Filters and search */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search sensors by name, ID, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Types</option>
            <option value="rainfall">Rainfall</option>
            <option value="water_level">Water Level</option>
            <option value="flow_rate">Flow Rate</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-white'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={fetchSensors}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sensors list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredSensors.length === 0 ? (
        <div className="text-center py-12">
          <Droplets className="w-12 h-12 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No sensors found matching your criteria</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Sensor ID</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Location</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Type</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-400">Reading</th>
                  <th className="text-center px-4 py-3 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-400">Last Update</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>            {filteredSensors.map((sensor: SensorData, index: number) => (
                    <motion.tr
                        key={sensor.id || sensor.sensorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-cyan-400">{sensor.sensorId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white font-medium">{sensor.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {sensor.location}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${sensorTypeConfig[sensor.type].bg} ${sensorTypeConfig[sensor.type].color}`}>
                        {sensorTypeConfig[sensor.type].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-white">{sensor.value}</span>
                      <span className="text-slate-400 text-sm ml-1">{sensor.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${sensorStatusConfig[sensor.status].dot}`} />
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sensorStatusConfig[sensor.status].bg} ${sensorStatusConfig[sensor.status].text}`}>
                          {sensor.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-400">
                      {new Date((sensor.lastUpdate ? sensor.lastUpdate.getTime() : sensor.recordedAt ? sensor.recordedAt.getTime() : Date.now())).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSensors.map((sensor: SensorData, index: number) => (
            <motion.div
              key={sensor.id || sensor.sensorId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{sensor.name}</p>
                    <p className="text-xs text-slate-400 font-mono">{sensor.sensorId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded text-slate-500 hover:text-white">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 rounded text-slate-500 hover:text-red-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {sensor.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${sensorTypeConfig[sensor.type].bg} ${sensorTypeConfig[sensor.type].color}`}>
                    {sensorTypeConfig[sensor.type].label}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {sensor.value} <span className="text-sm text-slate-400">{sensor.unit}</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${sensorStatusConfig[sensor.status].dot}`} />
                  <span className={`text-xs font-medium ${sensorStatusConfig[sensor.status].text}`}>
                    {sensor.status.toUpperCase()}
                  </span>
                </div>                  <span className="text-xs text-slate-500">
                  {new Date((sensor.lastUpdate ? sensor.lastUpdate.getTime() : sensor.recordedAt ? sensor.recordedAt.getTime() : Date.now())).toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
