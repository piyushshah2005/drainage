import { NextResponse } from 'next/server'

export async function GET() {
  // Generate realistic system metrics
  const metrics = {
    sensors: {
      total: 120,
      online: 118,
      offline: 2,
      averageResponseTime: 45,
    },
    data: {
      totalProcessed: 5200000000, // 5.2 GB in bytes
      dailyAverage: 75000000000, // 75 GB
      storageUsed: 2850000000000, // 2.85 TB
      storageTotal: 5000000000000, // 5 TB
    },
    performance: {
      apiLatency: 45,
      simulationEngine: 98.5,
      databaseQueries: 12,
      cacheHitRate: 94.2,
    },
    uptime: {
      current: 14256, // hours (about 1.6 years)
      lastIncident: null,
      incidentsThisMonth: 0,
    },
  }

  const services: Array<{
    name: string
    status: 'healthy' | 'degraded' | 'down'
    uptime: number
    responseTime: number
    message: string
  }> = [
    {
      name: 'Sensor Gateway',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 32,
      message: 'All sensors connected and responding',
    },
    {
      name: 'Data Processing Pipeline',
      status: 'healthy',
      uptime: 100,
      responseTime: 15,
      message: 'Processing 1M+ messages per minute',
    },
    {
      name: 'Simulation Engine',
      status: 'healthy',
      uptime: 99.95,
      responseTime: 245,
      message: 'Physics engine running at optimal performance',
    },
    {
      name: 'Alert System',
      status: 'healthy',
      uptime: 99.98,
      responseTime: 8,
      message: 'Alert notifications delivering normally',
    },
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: 99.97,
      responseTime: 28,
      message: 'API endpoints responding within SLA',
    },
    {
      name: 'Database Cluster',
      status: 'degraded',
      uptime: 99.5,
      responseTime: 156,
      message: 'Primary node experiencing high load',
    },
  ]

  return NextResponse.json({ metrics, services })
}
