import { Logo } from '@/components/logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Educational tool for spotting scam and phishing messages. Results are guidance only and may be inaccurate.
        </p>
        <p className="font-mono text-xs text-muted-foreground">{'© 2026 ScamShield AI'}</p>
      </div>
    </footer>
  )
}
