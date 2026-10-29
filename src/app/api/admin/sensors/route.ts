import { NextResponse } from 'next/server'
import clientPromise from '@/lib/db'
import type { SensorData } from '@/lib/db'

// Generate mock sensor data (since we may not have real sensor data in DB yet)
const generateMockSensors = (): SensorData[] => {
  const sensors: Omit<SensorData, 'id' | 'lastUpdate'>[] = [
    { sensorId: 'S-2047', name: 'West District Gauge', location: 'Riverview Park', type: 'rainfall', status: 'normal' as const, trend: 'stable' as const, value: 12.4, unit: 'mm/h', recordedAt: new Date() },
    { sensorId: 'S-2089', name: 'East Riverside Flow', location: 'Main Street Bridge', type: 'flow_rate' as const, status: 'elevated' as const, trend: 'up' as const, value: 34.2, unit: 'm³/s', recordedAt: new Date() },
    { sensorId: 'S-2103', name: 'Central Plaza Water Level', location: 'Downtown Basin', type: 'water_level' as const, status: 'warning' as const, trend: 'up' as const, value: 2.1, unit: 'm', recordedAt: new Date() },
    { sensorId: 'S-2115', name: 'North Industrial Drain', location: 'Industrial Zone A', type: 'flow_rate' as const, status: 'normal' as const, trend: 'stable' as const, value: 28.7, unit: 'm³/s', recordedAt: new Date() },
    { sensorId: 'S-2128', name: 'South Harbor Flood Gate', location: 'Harbor District', type: 'water_level' as const, status: 'critical' as const, trend: 'up' as const, value: 2.8, unit: 'm', recordedAt: new Date() },
    { sensorId: 'S-2142', name: 'Lake Park Rain Gauge', location: 'Lake Park', type: 'rainfall' as const, status: 'elevated' as const, trend: 'down' as const, value: 45.8, unit: 'mm/h', recordedAt: new Date() },
    { sensorId: 'S-2156', name: 'East District Flow Meter', location: 'East Commerce Zone', type: 'flow_rate' as const, status: 'normal' as const, trend: 'stable' as const, value: 15.3, unit: 'm³/s', recordedAt: new Date() },
    { sensorId: 'S-2167', name: 'South Industrial Gauge', location: 'Industrial Zone B', type: 'rainfall' as const, status: 'normal' as const, trend: 'stable' as const, value: 8.9, unit: 'mm/h', recordedAt: new Date() },
    { sensorId: 'S-2178', name: 'River North Level', location: 'North River Bank', type: 'water_level' as const, status: 'warning' as const, trend: 'up' as const, value: 2.3, unit: 'm', recordedAt: new Date() },
    { sensorId: 'S-2189', name: 'Harbor Entrance Wave', location: 'Harbor Entrance', type: 'flow_rate' as const, status: 'elevated' as const, trend: 'up' as const, value: 42.1, unit: 'm³/s', recordedAt: new Date() },
    { sensorId: 'S-2201', name: 'Central Station Rain', location: 'Central Station', type: 'rainfall' as const, status: 'normal' as const, trend: 'down' as const, value: 15.2, unit: 'mm/h', recordedAt: new Date() },
    { sensorId: 'S-2212', name: 'West Park Water Level', location: 'West Park Pond', type: 'water_level' as const, status: 'normal' as const, trend: 'stable' as const, value: 1.2, unit: 'm', recordedAt: new Date() },
  ]

  return sensors.map(sensor => ({
    ...sensor,
    id: sensor.sensorId,
    lastUpdate: new Date(),
    recordedAt: sensor.recordedAt || new Date(),
  }))
}

export async function GET() {
  try {
    // Try to connect to MongoDB and get real data
    const client = await clientPromise
    const db = client.db('urbandrainage')
    const sensorsCollection = db.collection<SensorData>('sensors')

    // Check if we have data in the collection
    const count = await sensorsCollection.countDocuments()

    if (count === 0) {
      // Insert mock data if collection is empty
      const mockSensors = generateMockSensors()
      await sensorsCollection.insertMany(mockSensors)
      return NextResponse.json({
        sensors: mockSensors,
        total: mockSensors.length,
      })
    }

    // Get all sensors with their latest readings
    const sensors = await sensorsCollection
      .find({})
      .sort({ lastUpdate: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json({
      sensors,
      total: sensors.length,
    })
  } catch (error) {
    console.error('Error fetching sensors:', error)

    // Return mock data as fallback
    const mockSensors = generateMockSensors()
    return NextResponse.json({
      sensors: mockSensors,
      total: mockSensors.length,
    })
  }
}
