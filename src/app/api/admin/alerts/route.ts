import { NextResponse } from 'next/server'
import type { Alert } from '@/lib/db'

// Generate mock alerts
const generateMockAlerts = (): Alert[] => {
  const now = new Date()

  return [
    {
      id: 'ALERT-001',
      sensorId: 'S-2128',
      sensorName: 'South Harbor Flood Gate',
      location: 'Harbor District',
      type: 'water_level',
      value: 2.8,
      unit: 'm',
      threshold: 2.5,
      severity: 'critical',
      message: 'Water level exceeded critical threshold',
      acknowledged: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 15),
    },
    {
      id: 'ALERT-002',
      sensorId: 'S-2103',
      sensorName: 'Central Plaza Water Level',
      location: 'Downtown Basin',
      type: 'water_level',
      value: 2.1,
      unit: 'm',
      threshold: 2.0,
      severity: 'warning',
      message: 'Water level approaching warning threshold',
      acknowledged: true,
      acknowledgedBy: 'Admin User',
      acknowledgedAt: new Date(now.getTime() - 1000 * 60 * 30),
      createdAt: new Date(now.getTime() - 1000 * 60 * 45),
    },
    {
      id: 'ALERT-003',
      sensorId: 'S-2089',
      sensorName: 'East Riverside Flow',
      location: 'Main Street Bridge',
      type: 'flow_rate',
      value: 34.2,
      unit: 'm³/s',
      threshold: 30.0,
      severity: 'warning',
      message: 'Flow rate elevated above normal levels',
      acknowledged: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 5),
    },
    {
      id: 'ALERT-004',
      sensorId: 'S-2142',
      sensorName: 'Lake Park Rain Gauge',
      location: 'Lake Park',
      type: 'rainfall',
      value: 45.8,
      unit: 'mm/h',
      threshold: 40.0,
      severity: 'warning',
      message: 'Heavy rainfall detected in area',
      acknowledged: true,
      acknowledgedBy: 'System Auto',
      acknowledgedAt: new Date(now.getTime() - 1000 * 60 * 60),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2),
    },
    {
      id: 'ALERT-005',
      sensorId: 'S-2178',
      sensorName: 'River North Level',
      location: 'North River Bank',
      type: 'water_level',
      value: 2.3,
      unit: 'm',
      threshold: 2.2,
      severity: 'warning',
      message: 'River level rising',
      acknowledged: false,
      createdAt: new Date(now.getTime() - 1000 * 60 * 10),
    },
  ]
}

export async function GET() {
  try {
    const { default: clientPromise } = await import('@/lib/db')
    const client = await clientPromise
    const db = client.db('urbandrainage')
    const alertsCollection = db.collection<Alert>('alerts')

    const count = await alertsCollection.countDocuments()

    if (count === 0) {
      const mockAlerts = generateMockAlerts()
      await alertsCollection.insertMany(mockAlerts)
      return NextResponse.json({
        alerts: mockAlerts,
        total: mockAlerts.length,
        critical: mockAlerts.filter(a => a.severity === 'critical').length,
        warning: mockAlerts.filter(a => a.severity === 'warning').length,
        acknowledged: mockAlerts.filter(a => a.acknowledged).length,
      })
    }

    const alerts = await alertsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      alerts,
      total: alerts.length,
      critical: alerts.filter(a => a.severity === 'critical').length,
      warning: alerts.filter(a => a.severity === 'warning').length,
      acknowledged: alerts.filter(a => a.acknowledged).length,
    })
  } catch (error) {
    console.error('Error fetching alerts:', error)

    const mockAlerts = generateMockAlerts()
    return NextResponse.json({
      alerts: mockAlerts,
      total: mockAlerts.length,
      critical: mockAlerts.filter(a => a.severity === 'critical').length,
      warning: mockAlerts.filter(a => a.severity === 'warning').length,
      acknowledged: mockAlerts.filter(a => a.acknowledged).length,
    })
  }
}
