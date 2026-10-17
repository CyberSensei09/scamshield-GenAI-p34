import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  FlaskConical,
  Info,
  Link2,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import { HighlightedMessage } from '@/components/scanner/highlighted-message'
import type { AnalysisResult, RiskLevel } from '@/lib/analysis/types'
import { cn } from '@/lib/utils'

const RISK_STYLES: Record<RiskLevel, { label: string; className: string; bars: number }> = {
  low: { label: 'Low risk', className: 'text-success', bars: 1 },
  medium: { label: 'Medium risk', className: 'text-warning', bars: 2 },
  high: { label: 'High risk', className: 'text-destructive', bars: 3 },
}

function SectionTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="size-4 text-primary" aria-hidden="true" />
      {children}
    </h4>
  )
}

interface ResultCardProps {
  result: AnalysisResult
  message: string
}

export function ResultCard({ result, message }: ResultCardProps) {
  const suspicious = result.classification === 'suspicious'
  const risk = result.riskLevel ? RISK_STYLES[result.riskLevel] : null
  const isModel = result.mode === 'model'

  return (
    <article
      aria-labelledby="result-heading"
      className={cn(
        'overflow-hidden rounded-2xl border bg-card animate-in fade-in slide-in-from-bottom-2 duration-300',
        suspicious ? 'border-destructive/40' : 'border-success/40',
      )}
    >
      <header
        className={cn(
          'flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between',
          suspicious ? 'bg-destructive/10' : 'bg-success/10',
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-12 shrink-0 items-center justify-center rounded-xl',
              suspicious ? 'bg-destructive/20 text-destructive' : 'bg-success/20 text-success',
            )}
          >
            {suspicious ? <ShieldAlert className="size-6" aria-hidden="true" /> : <ShieldCheck className="size-6" aria-hidden="true" />}
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Classification</p>
            <h3 id="result-heading" className="text-xl font-semibold">
              {suspicious ? 'Suspicious / Spam-like' : 'Likely Legitimate'}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {risk && (
            <span className={cn('inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-sm font-medium', risk.className)}>
              <span className="flex items-end gap-0.5" aria-hidden="true">
                {[1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={cn('w-1 rounded-sm bg-current', bar <= risk.bars ? 'opacity-100' : 'opacity-25')}
                    style={{ height: `${bar * 4 + 4}px` }}
                  />
                ))}
              </span>
              {risk.label}
            </span>
          )}
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs',
              isModel ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning',
            )}
          >
            {isModel ? <Brain className="size-3.5" aria-hidden="true" /> : <FlaskConical className="size-3.5" aria-hidden="true" />}
            {isModel ? 'ML model result' : 'Demo: rule-based'}
          </span>
        </div>
      </header>

      <div className="grid gap-6 p-5 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {result.notice && (
            <p role="note" className="flex gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {result.notice}
            </p>
          )}

          {isModel && result.score !== null && (
            <div>
              <div className="flex items-baseline justify-between">
                <SectionTitle icon={Brain}>Model spam score</SectionTitle>
                <span className="font-mono text-lg font-semibold">{(result.score * 100).toFixed(1)}%</span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(result.score * 100)}
                aria-label="Model spam probability"
              >
                <div
                  className={cn('h-full rounded-full', result.score >= 0.75 ? 'bg-destructive' : result.score >= 0.4 ? 'bg-warning' : 'bg-success')}
                  style={{ width: `${result.score * 100}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Probability returned by the trained model{result.modelLabel ? ` (label: "${result.modelLabel}")` : ''}.
              </p>
            </div>
          )}

          <div>
            <SectionTitle icon={AlertTriangle}>Message with highlighted phrases</SectionTitle>
            <div className="mt-2 rounded-lg border border-border bg-background/50 p-3">
              <HighlightedMessage text={message} phrases={result.highlights} />
            </div>
          </div>

          {result.urls.length > 0 && (
            <div>
              <SectionTitle icon={Link2}>Detected links</SectionTitle>
              <p className="mt-1 text-xs text-muted-foreground">Shown as plain text. ScamShield never opens or visits these links.</p>
              <ul className="mt-2 flex flex-col gap-2">
                {result.urls.map((u) => (
                  <li key={u.url} className="rounded-lg border border-border bg-background/50 p-3">
                    <code className="block break-all font-mono text-sm text-destructive">{u.url}</code>
                    {u.flags.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {u.flags.map((flag) => (
                          <li key={flag} className="rounded-md bg-warning/15 px-2 py-0.5 text-xs text-warning">
                            {flag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <SectionTitle icon={ShieldAlert}>{isModel ? 'Warning signs' : 'Warning signs (rule-based checks)'}</SectionTitle>
            {result.modelWarnings.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Warnings returned by the model">
                {result.modelWarnings.map((w) => (
                  <li key={w} className="rounded-md bg-primary/15 px-2 py-0.5 text-xs text-primary">
                    {w}
                  </li>
                ))}
              </ul>
            )}
            {result.indicators.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No common scam patterns were found by the security checks.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-3">
                {result.indicators.map((indicator) => (
                  <li key={indicator.category} className="rounded-lg border border-border bg-background/50 p-3">
                    <p className="text-sm font-medium">{indicator.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{indicator.description}</p>
                    {indicator.category !== 'link' && (
                      <p className="mt-2 flex flex-wrap gap-1.5">
                        {indicator.matches.map((m) => (
                          <span key={m} className="rounded-md bg-destructive/15 px-2 py-0.5 font-mono text-xs text-destructive">
                            {m}
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <SectionTitle icon={ListChecks}>Recommended next steps</SectionTitle>
            <ul className="mt-3 flex flex-col gap-2">
              {result.recommendations.map((rec) => (
                <li key={rec} className="flex gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="border-t border-border bg-background/40 px-5 py-3 text-xs leading-relaxed text-muted-foreground">
        Automated analysis can make mistakes. Treat this as guidance, not a guarantee — when in doubt, verify with the sender
        through an official channel.
      </footer>
    </article>
  )
}
