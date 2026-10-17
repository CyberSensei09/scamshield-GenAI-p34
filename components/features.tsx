import { Brain, Gauge, Highlighter, Link2, Lock, ShieldQuestion } from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: 'ML spam classification',
    description: 'Connect your trained TF-IDF + Logistic Regression model for real spam probability scores.',
  },
  {
    icon: Highlighter,
    title: 'Highlighted warning phrases',
    description: 'Urgent language, OTP and password requests, threats and prize bait are marked right in the text.',
  },
  {
    icon: Link2,
    title: 'Safe link inspection',
    description: 'Links are extracted and checked for red flags like raw IPs, shorteners and HTTP — never opened.',
  },
  {
    icon: Gauge,
    title: 'Clear risk levels',
    description: 'Low, medium or high risk based on the model score and how many warning signs appear together.',
  },
  {
    icon: ShieldQuestion,
    title: 'Actionable next steps',
    description: 'Practical advice tailored to what was found, from blocking the sender to reporting the message.',
  },
  {
    icon: Lock,
    title: 'Private by design',
    description: 'Messages are analyzed per request and never saved, logged, or shared.',
  },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Features</p>
        <h2 id="features-heading" className="mt-2 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Built to explain, not just to label.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <span className="flex size-10 items-center justify-center rounded-lg bg-success/15 text-success">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
