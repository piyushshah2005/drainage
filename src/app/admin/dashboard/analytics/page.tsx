import { getServerSessionSafe } from '@/lib/auth'
import AnalyticsClient from './AnalyticsClient'

export default async function AnalyticsPage() {
  const session = await getServerSessionSafe()

  return <AnalyticsClient userName={session?.user?.name || 'Admin'} />
}
