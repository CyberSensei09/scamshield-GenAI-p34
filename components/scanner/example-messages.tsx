import { FlaskConical } from 'lucide-react'

import { EXAMPLE_MESSAGES } from '@/lib/examples'
import { cn } from '@/lib/utils'

interface ExampleMessagesProps {
  onSelect: (text: string) => void
  disabled?: boolean
}

export function ExampleMessages({ onSelect, disabled }: ExampleMessagesProps) {
  return (
    <section aria-labelledby="examples-heading" className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <FlaskConical className="size-4 text-primary" aria-hidden="true" />
        <h3 id="examples-heading" className="font-semibold">
          Try an example
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Illustrative test messages written for this demo. Click one to load it into the scanner.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {EXAMPLE_MESSAGES.map((example) => (
          <li key={example.id}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(example.text)}
              className="group w-full rounded-xl border border-border bg-background/40 p-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{example.title}</span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide',
                    example.expected === 'legitimate' ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive',
                  )}
                >
                  {example.expected === 'legitimate' ? 'Legit example' : 'Scam example'}
                </span>
              </span>
              <span className="mt-1.5 line-clamp-2 block text-sm text-muted-foreground group-hover:text-foreground/80">
                {example.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
