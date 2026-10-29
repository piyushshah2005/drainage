import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'UrbanDrainage Twin - Digital Twin for Urban Drainage Stress Testing',
  description: 'Live rainfall sensor data feeds a physics-based city drainage model. Civil engineers and municipal planners can simulate extreme weather events to identify flood-prone zones before they become crises.',
  keywords: ['digital twin', 'urban drainage', 'flood risk', 'civil engineering', 'rainfall simulation', 'municipal planning'],
  authors: [{ name: 'UrbanDrainage Twin' }],
  openGraph: {
    title: 'UrbanDrainage Twin - Digital Twin for Urban Drainage Stress Testing',
    description: 'Live rainfall sensor data feeds a physics-based city drainage model. Identify flood-prone zones before they become crises.',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
