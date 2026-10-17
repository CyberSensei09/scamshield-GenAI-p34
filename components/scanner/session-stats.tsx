import { Activity, Percent, ShieldAlert } from 'lucide-react'

interface SessionStatsProps {
  scans: number
  flagged: number
}

export function SessionStats({ scans, flagged }: SessionStatsProps) {
  const rate = scans > 0 ? `${Math.round((flagged / scans) * 100)}%` : '—'
  const stats = [
    { icon: Activity, label: 'Scans', value: String(scans) },
    { icon: ShieldAlert, label: 'Flagged', value: String(flagged) },
    { icon: Percent, label: 'Flag rate', value: rate },
  ]

  return (
    <section aria-labelledby="session-stats-heading" className="rounded-2xl border border-border bg-card p-5">
      <h3 id="session-stats-heading" className="font-semibold">
        Your session
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Real counts from this browser tab only. Nothing is saved.</p>
      <dl className="mt-4 grid grid-cols-3 gap-2" aria-live="polite">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-background/40 p-3">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-1 font-mono text-2xl font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
