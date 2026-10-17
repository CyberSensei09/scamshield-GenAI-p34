import { BarChart3 } from 'lucide-react'

import { MODEL_METRICS } from '@/lib/model-metrics'

const METRICS = [
  { key: 'accuracy', label: 'Accuracy', hint: 'Share of all messages classified correctly' },
  { key: 'precision', label: 'Precision', hint: 'Of messages flagged as spam, how many really were' },
  { key: 'recall', label: 'Recall', hint: 'Of all real spam, how much the model caught' },
  { key: 'f1', label: 'F1 score', hint: 'Balance of precision and recall' },
] as const

export function ModelMetrics() {
  const reported = METRICS.some(({ key }) => MODEL_METRICS[key] !== null)

  return (
    <section aria-labelledby="model-metrics-heading" className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className="size-4 text-primary" aria-hidden="true" />
        <h3 id="model-metrics-heading" className="font-semibold">
          Model performance
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        TF-IDF + Logistic Regression, evaluated on a held-out test set
        {MODEL_METRICS.evaluatedOn ? ` (${MODEL_METRICS.evaluatedOn})` : ''}.
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        {METRICS.map(({ key, label, hint }) => {
          const value = MODEL_METRICS[key]
          const percent = value !== null ? Math.round(value * 1000) / 10 : null
          return (
            <div key={key} className="flex flex-col rounded-xl border border-border bg-background/40 p-3">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-1 font-mono text-2xl font-semibold">
                {percent !== null ? `${percent}%` : <span className="text-base text-muted-foreground">Not reported</span>}
              </dd>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                <div className="h-full rounded-full bg-primary" style={{ width: `${percent ?? 0}%` }} />
              </div>
              <p className="mt-2 text-xs leading-snug text-muted-foreground">{hint}</p>
            </div>
          )
        })}
      </dl>

      {!reported && (
        <p className="mt-3 text-xs text-muted-foreground">
          Scores appear here once they are added from the training notebook. No numbers are shown until they have been measured.
        </p>
      )}
    </section>
  )
}
