import { About } from '@/components/about'
import { Features } from '@/components/features'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { ScannerSection } from '@/components/scanner/scanner-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { isModelConfigured } from '@/lib/analysis/service'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ScannerSection modelConfigured={isModelConfigured()} />
        <HowItWorks />
        <Features />
        <About />
      </main>
      <SiteFooter />
    </div>
  )
}
