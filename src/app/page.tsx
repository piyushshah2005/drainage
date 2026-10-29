import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import LiveDashboardSection from '@/components/LiveDashboardSection'
import AnalyticsSection from '@/components/AnalyticsSection'
import ApiSection from '@/components/ApiSection'
import TechnicalSection from '@/components/TechnicalSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import './globals.css'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <LiveDashboardSection />
      <AnalyticsSection />
      <ApiSection />
      <TechnicalSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  )
}
