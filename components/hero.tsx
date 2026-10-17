import { ArrowRight, ScanSearch } from 'lucide-react'

import { HeroGraphic } from '@/components/hero-graphic'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--success)_9%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
            Scam &amp; phishing message analysis
          </span>
          <h1 id="hero-heading" className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Stop Scams <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">Before They Start.</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Analyze suspicious messages, identify phishing warning signs, and make safer digital decisions.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#scanner" className={cn(buttonVariants({ size: 'lg' }), 'h-12 px-6 text-base font-semibold')}>
              <ScanSearch aria-hidden="true" />
              Scan a Message
            </a>
            <a href="#how-it-works" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-12 px-6 text-base')}>
              How It Works
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">Messages are analyzed on request and never stored.</p>
        </div>

        <HeroGraphic />
      </div>
    </section>
  )
}
