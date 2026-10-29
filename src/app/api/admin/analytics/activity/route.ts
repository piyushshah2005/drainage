import { NextResponse } from 'next/server'

export async function GET() {
  const now = new Date()

  const activities = [
    {
      id: 'ACT-001',
      type: 'alert' as const,
      message: 'Critical alert: Water level exceeded threshold at South Harbor',
      timestamp: new Date(now.getTime() - 1000 * 60 * 15),
      severity: 'critical' as const,
    },
    {
      id: 'ACT-002',
      type: 'sensor' as const,
      message: 'Sensor S-2142 reported elevated rainfall levels',
      timestamp: new Date(now.getTime() - 1000 * 60 * 30),
    },
    {
      id: 'ACT-003',
      type: 'system' as const,
      message: 'System health check completed - all systems operational',
      timestamp: new Date(now.getTime() - 1000 * 60 * 45),
    },
    {
      id: 'ACT-004',
      type: 'alert' as const,
      message: 'Warning alert: Flow rate increased at East Riverside',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60),
      severity: 'warning' as const,
    },
    {
      id: 'ACT-005',
      type: 'sensor' as const,
      message: 'New data point recorded from 12 sensors',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2),
    },
    {
      id: 'ACT-006',
      type: 'system' as const,
      message: 'Database backup completed successfully',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 4),
    },
    {
      id: 'ACT-007',
      type: 'alert' as const,
      message: 'Warning alert: River level rising at North Bank',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 6),
      severity: 'warning' as const,
    },
    {
      id: 'ACT-008',
      type: 'system' as const,
      message: 'Scheduled maintenance window completed',
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
  ]

  return NextResponse.json({ activity: activities })
}
