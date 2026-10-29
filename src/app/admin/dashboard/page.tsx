import { getServerSessionSafe } from '@/lib/auth'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSessionSafe()

  return (
    <DashboardClient
      userName={session?.user?.name || 'Admin'}
      userRole={session?.user?.role || 'admin'}
    />
  )
}
