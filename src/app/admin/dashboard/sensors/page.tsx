import { getServerSessionSafe } from '@/lib/auth'
import SensorsClient from './SensorsClient'

export default async function SensorsPage() {
  const session = await getServerSessionSafe()
  const userName = session?.user?.name || 'Admin'
  
  return <SensorsClient userName={userName} />
}
