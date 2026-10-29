'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import {
  LayoutDashboard,
  Droplets,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SessionShape = any

interface AdminLayoutProps {
  children: React.ReactNode
  session: SessionShape | null
}

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/dashboard/sensors', label: 'Sensors', icon: Droplets },
  { href: '/admin/dashboard/alerts', label: 'Alerts', icon: AlertTriangle },
  { href: '/admin/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/dashboard/system', label: 'System Health', icon: TrendingUp },
]

export default function AdminLayout({
  children,
  session,
}: AdminLayoutProps) {
  return (
    <SessionProvider session={session}>
      <AdminLayoutInner children={children} session={session} />
    </SessionProvider>
  )
}

function AdminLayoutInner({
  children,
  session,
}: AdminLayoutProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const sideNavItems = [
    ...navItems,
    { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const userName = session?.user?.name || 'Admin'
  const userEmail = session?.user?.email || ''
  const userRole = session?.user?.role || 'admin'

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-slate-800 border-r border-slate-700 z-40 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Admin Panel</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {sideNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700">
          {session?.user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                {userName?.charAt(0) || 'A'}
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{userName}</div>
                  <div className="text-xs text-slate-400 truncate">{userEmail}</div>
                </div>
              )}
              {userRole && (
                <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full">
                  {userRole}
                </span>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              // Sign out - redirect to login page
              window.location.href = '/admin/login'
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}
      >
        {/* Top bar */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Shield className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white capitalize">
              {pathname.split('/').pop()}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
