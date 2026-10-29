import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ArrowLeft,
  Terminal,
  KeyRound,
  Layers,
  AlertTriangle,
  Rocket,
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'API Documentation - UrbanDrainage Twin',
  description:
    'Reference documentation for the UrbanDrainage Twin REST API: authentication, endpoints, request examples and error handling.',
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/admin/sensors',
    auth: false,
    description: 'List all drainage sensors with their latest readings.',
    response:
      '{ "sensors": [{ "sensorId": "S-2103", "type": "water_level", "status": "warning", "value": 2.1, "unit": "m" }], "total": 12 }',
  },
  {
    method: 'GET',
    path: '/api/admin/alerts',
    auth: false,
    description: 'List active flood-risk alerts sorted by severity.',
    response: '{ "alerts": [{ "id": "A-91", "severity": "critical", "status": "active" }], "total": 4 }',
  },
  {
    method: 'POST',
    path: '/api/admin/alerts/:id/acknowledge',
    auth: true,
    description: 'Acknowledge an alert as an authenticated operator.',
    response: '{ "ok": true, "alert": { "id": "A-91", "status": "acknowledged" } }',
  },
  {
    method: 'POST',
    path: '/api/admin/alerts/:id/resolve',
    auth: true,
    description: 'Resolve an alert once the event has been handled.',
    response: '{ "ok": true, "alert": { "id": "A-91", "status": "resolved" } }',
  },
  {
    method: 'GET',
    path: '/api/admin/analytics?range=7d',
    auth: false,
    description: 'Rainfall trends, sensor distribution and alert history. Range: 24h, 7d, 30d, 90d.',
    response: '{ "rainfallTrend": [...], "sensorDistribution": [...], "alertTrend": [...] }',
  },
  {
    method: 'GET',
    path: '/api/admin/analytics/activity',
    auth: false,
    description: 'Recent operator activity feed.',
    response: '{ "activity": [{ "action": "alert.acknowledged", "at": "2026-10-29T14:00:00Z" }] }',
  },
  {
    method: 'GET',
    path: '/api/admin/analytics/system',
    auth: false,
    description: 'Platform health and infrastructure metrics.',
    response: '{ "status": "operational", "uptime": 99.98 }',
  },
]

const methodStyles: Record<string, string> = {
  GET: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  POST: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

const navItems = [
  { href: '#getting-started', label: 'Getting Started' },
  { href: '#authentication', label: 'Authentication' },
  { href: '#endpoints', label: 'Endpoints' },
  { href: '#errors', label: 'Errors' },
]

const sections = [
  {
    id: 'getting-started',
    icon: Rocket,
    title: 'Getting Started',
    body: (
      <>
        <p className="text-slate-400 leading-relaxed mb-4">
          The UrbanDrainage Twin API is a REST API that returns JSON over HTTPS. All
          endpoints live under a single base URL and use standard HTTP status codes.
        </p>
        <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/10 text-xs font-mono text-slate-500">
            base url
          </div>
          <pre className="p-4 text-sm font-mono text-cyan-300 overflow-x-auto">
            <code>https://urbandrainage.com</code>
          </pre>
        </div>
        <p className="text-slate-400 leading-relaxed mt-4">
          Try it locally against the running dev server:
        </p>
        <div className="rounded-xl border border-white/10 bg-black/30 overflow-x-auto mt-3">
          <pre className="p-4 text-sm font-mono text-slate-300">
            <code>{`curl -s http://localhost:3000/api/admin/sensors \\\n  -H "Accept: application/json"`}</code>
          </pre>
        </div>
      </>
    ),
  },
  {
    id: 'authentication',
    icon: KeyRound,
    title: 'Authentication',
    body: (
      <>
        <p className="text-slate-400 leading-relaxed mb-4">
          Read endpoints (<code className="text-cyan-400 font-mono text-sm">GET</code> on
          sensors, alerts and analytics) are open. Operator actions (acknowledge, resolve)
          require an authenticated admin session, issued by the credentials login at{' '}
          <code className="text-cyan-400 font-mono text-sm">/admin/login</code>.
        </p>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono">1.</span>
            <span>
              Sign in at <code className="text-slate-300 font-mono">/admin/login</code> —
              this sets a <code className="text-slate-300 font-mono">next-auth.session-token</code>{' '}
              cookie valid for 24 hours.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono">2.</span>
            <span>
              Send the cookie with your request, or use{' '}
              <code className="text-slate-300 font-mono">-b cookies.txt</code> with curl.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400 font-mono">3.</span>
            <span>
              Check the current session via{' '}
              <code className="text-slate-300 font-mono">GET /api/auth/session</code>.
            </span>
          </li>
        </ul>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 mt-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200/80 leading-relaxed">
            Unauthenticated requests to protected endpoints return{' '}
            <code className="font-mono">401</code>. Never expose admin credentials in
            client-side code.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'endpoints',
    icon: Layers,
    title: 'Endpoints',
    body: (
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <div
            key={endpoint.method + endpoint.path}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border font-mono ${methodStyles[endpoint.method]}`}
              >
                {endpoint.method}
              </span>
              <code className="text-sm font-mono text-white break-all">{endpoint.path}</code>
              {endpoint.auth && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium">
                  AUTH REQUIRED
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 mb-3">{endpoint.description}</p>
            <details className="group">
              <summary className="cursor-pointer text-xs font-medium text-cyan-400 hover:text-cyan-300 select-none">
                Example response
              </summary>
              <pre className="mt-2 p-3 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-300 overflow-x-auto">
                <code>{endpoint.response}</code>
              </pre>
            </details>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'errors',
    icon: AlertTriangle,
    title: 'Errors',
    body: (
      <>
        <p className="text-slate-400 leading-relaxed mb-4">
          Errors use conventional HTTP status codes with a JSON body explaining what went
          wrong.
        </p>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left px-4 py-3 font-medium text-slate-400">Code</th>
                <th className="text-left px-4 py-3 font-medium text-slate-400">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-slate-400">
              <tr className="border-b border-white/5">
                <td className="px-4 py-3 font-mono text-emerald-400">200</td>
                <td className="px-4 py-3">Success — request completed as expected</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-4 py-3 font-mono text-yellow-400">400</td>
                <td className="px-4 py-3">Bad request — missing or invalid parameters</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-4 py-3 font-mono text-orange-400">401</td>
                <td className="px-4 py-3">Unauthorized — admin session required</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-4 py-3 font-mono text-orange-400">404</td>
                <td className="px-4 py-3">Not found — resource does not exist</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-red-400">500</td>
                <td className="px-4 py-3">Server error — something failed on our side</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 overflow-hidden mt-4">
          <div className="px-4 py-2.5 border-b border-white/10 text-xs font-mono text-slate-500">
            400 response
          </div>
          <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto">
            <code>{`{ "error": "Name, email and message are required." }`}</code>
          </pre>
        </div>
      </>
    ),
  },
]

export default function DocsPage() {
  return (
    <>
      <Navigation />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 to-transparent" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Documentation
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              UrbanDrainage Twin <span className="gradient-text">API Reference</span>
            </h1>
            <p className="text-lg text-slate-400">
              Everything you need to pull live sensor data, manage alerts and embed
              drainage analytics into your own systems.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-400 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="space-y-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                {section.body}
              </section>
            ))}
          </div>

          <div className="glass-card p-8 mt-16 text-center">
            <Terminal className="w-8 h-8 mx-auto text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Need an endpoint we don&apos;t list?
            </h3>
            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
              Tell us what data you need and we&apos;ll help you wire it into your stack.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25"
              >
                Contact the team
              </Link>
              <Link
                href="/admin/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Open Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
