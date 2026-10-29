import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get('range') || '7d'

  // Generate mock analytics data based on time range
  const now = new Date()

  const generateRainfallTrend = () => {
    const points: { date: string; value: number }[] = []
    const hours = range === '24h' ? 24 : range === '7d' ? 7 * 24 : range === '30d' ? 30 : 90

    for (let i = hours - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 60 * 60 * 1000)
      const dateStr = range === '24h'
        ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      // Generate realistic rainfall data with some patterns
      const baseValue = 20 + Math.sin(i / 6) * 15
      const randomVariation = (Math.random() - 0.5) * 30
      const value = Math.max(0, baseValue + randomVariation)

      points.push({ date: dateStr, value: Math.round(value * 10) / 10 })
    }

    return points
  }

  const generateSensorDistribution = () => {
    return [
      { type: 'rainfall', count: 48, percentage: 48 },
      { type: 'water_level', count: 32, percentage: 32 },
      { type: 'flow_rate', count: 20, percentage: 20 },
    ]
  }

  const generateAlertTrend = () => {
    const points: { date: string; count: number; severity: string }[] = []
    const days = range === '24h' ? 1 : range === '7d' ? 7 : range === '30d' ? 30 : 90

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = range === '24h'
        ? date.toLocaleTimeString('en-US', { hour: '2-digit' })
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      // Random number of alerts
      const criticalCount = Math.floor(Math.random() * 3)
      const warningCount = Math.floor(Math.random() * 5)

      if (criticalCount > 0) {
        points.push({ date: dateStr, count: criticalCount, severity: 'critical' })
      }
      if (warningCount > 0) {
        points.push({ date: dateStr, count: warningCount, severity: 'warning' })
      }
    }

    return points
  }

  const generateTopLocations = () => {
    return [
      { location: 'Harbor District', alertCount: 23, riskLevel: 'high' },
      { location: 'Downtown Basin', alertCount: 18, riskLevel: 'high' },
      { location: 'Main Street Bridge', alertCount: 12, riskLevel: 'medium' },
      { location: 'North River Bank', alertCount: 8, riskLevel: 'medium' },
      { location: 'East Commerce Zone', alertCount: 5, riskLevel: 'low' },
    ]
  }

  const analyticsData = {
    rainfallTrend: generateRainfallTrend(),
    sensorDistribution: generateSensorDistribution(),
    alertTrend: generateAlertTrend(),
    topLocations: generateTopLocations(),
    summary: {
      totalReadings: 125430,
      avgRainfall: 28.5,
      maxRainfall: 95.2,
      minRainfall: 2.1,
      totalAlerts: 47,
      criticalAlerts: 8,
      warningAlerts: 39,
    },
  }

  return NextResponse.json(analyticsData)
}
