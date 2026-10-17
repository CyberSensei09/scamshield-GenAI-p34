import { ClipboardPaste, ListChecks, Radar } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardPaste,
    title: 'Paste the message',
    description: 'Copy a suspicious SMS, email snippet or chat message into the scanner. Nothing is stored.',
  },
  {
    icon: Radar,
    title: 'We analyze it',
    description:
      'A trained spam model (when connected) scores the text, while security checks look for urgency, credential requests, threats and risky links.',
  },
  {
    icon: ListChecks,
    title: 'Get clear guidance',
    description: 'See the highlighted warning signs, a risk level, and practical next steps to stay safe.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">How it works</p>
      <h2 id="how-heading" className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Three steps from doubt to a decision.
      </h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="relative rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-sm text-muted-foreground" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
