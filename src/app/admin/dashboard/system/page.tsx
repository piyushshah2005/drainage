import { getServerSessionSafe } from '@/lib/auth'
import SystemClient from './SystemClient'

export default async function SystemPage() {
  const session = await getServerSessionSafe()

  return <SystemClient userName={session?.user?.name || 'Admin'} userRole={session?.user?.role || 'admin'} />
}
