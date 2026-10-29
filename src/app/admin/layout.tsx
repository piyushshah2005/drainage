import { getServerSessionSafe } from '@/lib/auth'
import AdminDashboardLayout from '@/components/admin/AdminLayout'

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSessionSafe()

  // Pass session as prop to client component
  // Client component will handle SessionProvider internally
  return (
    <AdminDashboardLayout session={session}>
      {children}
    </AdminDashboardLayout>
  )
}
