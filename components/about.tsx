import { AlertTriangle, CheckCircle2 } from 'lucide-react'

const TIPS = [
  'Banks and services never ask for your OTP, PIN or password by message.',
  'Pressure to act "immediately" is a classic manipulation tactic.',
  'Real prizes never require you to pay a fee to claim them.',
  'Contact organizations through their official app or website, not message links.',
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">About</p>
          <h2 id="about-heading" className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            A second opinion for the messages that feel off.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            ScamShield AI combines a machine-learning spam classifier with transparent, rule-based security checks. The model
            estimates how spam-like a message is, while the checks explain <em>why</em> — so you learn to spot scams yourself.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            When no model backend is connected, the app runs in a clearly labeled demo mode using only the rule-based checks.
          </p>
          <div className="mt-6 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm leading-relaxed">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
            <p>
              <span className="font-semibold text-warning">Automated analysis can make mistakes.</span>{' '}
              <span className="text-muted-foreground">
                A &quot;likely legitimate&quot; result is not a guarantee. Always verify unexpected requests through official channels.
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold">Quick safety rules</h3>
          <ul className="mt-4 flex flex-col gap-4">
            {TIPS.map((tip) => (
              <li key={tip} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
