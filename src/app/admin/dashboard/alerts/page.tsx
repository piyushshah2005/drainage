import { getServerSessionSafe } from '@/lib/auth'
import AlertsClient from './AlertsClient'

export default async function AlertsPage() {
  const session = await getServerSessionSafe()

  return <AlertsClient userName={session?.user?.name || 'Admin'} />
}
