import { NextRequest, NextResponse } from 'next/server'
import { getServerSessionSafe } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSessionSafe()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const client = await import('@/lib/db').then(m => m.default)
    const db = (await client).db('urbandrainage')
    const alertsCollection = db.collection('alerts')

    await alertsCollection.deleteOne({ id })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resolving alert:', error)
    return NextResponse.json({ error: 'Failed to resolve alert' }, { status: 500 })
  }
}
