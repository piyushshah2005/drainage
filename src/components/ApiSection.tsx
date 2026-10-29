'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, ArrowRight, Copy, Check, Terminal, BookOpen } from 'lucide-react'

const endpoints = [
  {
    method: 'GET',
    path: '/api/admin/sensors',
    description: 'List all drainage sensors with latest readings',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/admin/alerts',
    description: 'List active flood-risk alerts and their severity',
    auth: false,
  },
  {
    method: 'POST',
    path: '/api/admin/alerts/:id/acknowledge',
    description: 'Mark an alert as acknowledged by an operator',
    auth: true,
  },
  {
    method: 'POST',
    path: '/api/admin/alerts/:id/resolve',
    description: 'Mark an alert as resolved',
    auth: true,
  },
  {
    method: 'GET',
    path: '/api/admin/analytics?range=7d',
    description: 'Rainfall trends, sensor distribution and alert history',
    auth: false,
  },
  {
    method: 'GET',
    path: '/api/admin/analytics/system',
    description: 'System health and infrastructure metrics',
    auth: false,
  },
]

const methodColors: Record<string, string> = {
  GET: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  POST: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

const codeSample = `# Fetch the live sensor network
curl -s https://urbandrainage.com/api/admin/sensors \\
  -H "Accept: application/json"

# Response
{
  "sensors": [
    {
      "sensorId": "S-2103",
      "name": "Central Plaza Water Level",
      "type": "water_level",
      "status": "warning",
      "value": 2.1,
      "unit": "m"
    }
  ],
  "total": 12
}

# Authenticated action (admin session required)
curl -X POST https://urbandrainage.com/api/admin/alerts/A-91/acknowledge \\
  -H "Cookie: next-auth.session-token=<token>"`

export default function ApiSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSample)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. permissions) — ignore silently
    }
  }

  return (
    <section id="api" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="absolute inset-0 grid-line opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            Developer API
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Build on Top of the{' '}
            <span className="gradient-text">Digital Twin</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A clean REST API feeds your own dashboards, SCADA integrations, and municipal
            systems with live sensor readings, alerts, and simulation analytics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Endpoints list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">REST Endpoints</h3>
                <p className="text-sm text-slate-500">JSON responses · UTF-8</p>
              </div>
            </div>

            <ul className="space-y-3">
              {endpoints.map((endpoint) => (
                <li
                  key={endpoint.path + endpoint.method}
                  className="group p-3 rounded-xl border border-white/5 bg-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border font-mono ${methodColors[endpoint.method]}`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-slate-300 break-all">
                      {endpoint.path}
                    </code>
                    {endpoint.auth && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium">
                        AUTH
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">{endpoint.description}</p>
                </li>
              ))}
            </ul>

            <Link
              href="/docs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Full API documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Code sample */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="ml-3 text-xs font-mono text-slate-500">terminal</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
              <code>{codeSample}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
