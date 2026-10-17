import { KeyRound, Link2, ShieldCheck, Timer } from 'lucide-react'

const SIGNALS = [
  { icon: KeyRound, label: 'OTP request', className: 'left-0 top-10 sm:-left-4' },
  { icon: Timer, label: 'Urgent language', className: 'right-0 top-24 sm:-right-2 [animation-delay:1.5s]' },
  { icon: Link2, label: 'Unverified link', className: 'bottom-12 left-4 sm:left-2 [animation-delay:3s]' },
]

export function HeroGraphic() {
  return (
    <div
      role="img"
      aria-label="Illustration of a shield analyzing a message for scam warning signs"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute size-56 rounded-full border border-primary/40 animate-pulse-ring"
            style={{ animationDelay: `${i * 1.05}s` }}
          />
        ))}
        <span className="absolute size-72 rounded-full border border-dashed border-border" />
        <span className="absolute size-44 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative flex size-40 items-center justify-center overflow-hidden rounded-[2rem] border border-primary/40 bg-gradient-to-b from-card to-background shadow-[0_0_60px_-10px] shadow-primary/40">
          <ShieldCheck className="size-20 text-primary" strokeWidth={1.4} />
          <span className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-success/25 to-transparent animate-scan-line" />
        </div>
      </div>

      {SIGNALS.map(({ icon: Icon, label, className }) => (
        <div
          key={label}
          aria-hidden="true"
          className={`absolute flex items-center gap-2 rounded-lg border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur animate-float ${className}`}
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-destructive/15 text-destructive">
            <Icon className="size-3.5" />
          </span>
          {label}
        </div>
      ))}

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-2 flex items-center gap-2 rounded-lg border border-success/30 bg-card/90 px-3 py-2 font-mono text-xs text-success shadow-lg backdrop-blur"
      >
        <span className="size-1.5 rounded-full bg-success" />
        3 warning signs found
      </div>
    </div>
  )
}
