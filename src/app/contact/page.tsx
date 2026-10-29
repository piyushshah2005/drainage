import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ArrowLeft, MessageSquare } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - UrbanDrainage Twin',
  description:
    'Talk to the UrbanDrainage Twin team about digital twin modeling, drainage stress testing and platform integration.',
}

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@urbandrainage.com',
    href: 'mailto:contact@urbandrainage.com',
    detail: 'General & sales inquiries',
  },
  {
    icon: MessageSquare,
    label: 'Support',
    value: 'support@urbandrainage.com',
    href: 'mailto:support@urbandrainage.com',
    detail: 'Existing customers, technical issues',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (800) 123-4567',
    href: 'tel:+18001234567',
    detail: 'Mon–Fri, 9:00–18:00 EST',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: '220 Harbor Way, Suite 400',
    href: null,
    detail: 'Boston, MA 02110, USA',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/30 to-transparent" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Contact
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let&apos;s talk about your <span className="gradient-text">city</span>
            </h1>
            <p className="text-lg text-slate-400">
              Whether you&apos;re planning a drainage upgrade or evaluating the platform,
              our engineering team is happy to walk you through it.
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

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Channels */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Reach us directly</h2>
              {channels.map((channel) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      <channel.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                        {channel.label}
                      </p>
                      <p className="text-sm font-medium text-white break-words">
                        {channel.value}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{channel.detail}</p>
                    </div>
                  </>
                )

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="glass-card p-5 flex items-center gap-4 hover:border-cyan-500/30 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={channel.label} className="glass-card p-5 flex items-center gap-4">
                    {inner}
                  </div>
                )
              })}

              <div className="glass-card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">
                    Response time
                  </p>
                  <p className="text-sm text-slate-400">
                    We answer every inquiry within one business day. For urgent
                    flood-operations issues, call our support line.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold text-white mb-4">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
