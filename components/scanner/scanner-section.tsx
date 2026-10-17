'use client'

import { AlertCircle, Brain, FlaskConical, Loader2, RotateCcw, ScanSearch } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import { ExampleMessages } from '@/components/scanner/example-messages'
import { ResultCard } from '@/components/scanner/result-card'
import { SessionStats } from '@/components/scanner/session-stats'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MAX_MESSAGE_LENGTH, type AnalysisResult } from '@/lib/analysis/types'
import { requestAnalysis } from '@/lib/api-client'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ScannerSection({ modelConfigured }: { modelConfigured: boolean }) {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ data: AnalysisResult; message: string } | null>(null)
  const [stats, setStats] = useState({ scans: 0, flagged: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const inputId = useId()
  const helpId = useId()
  const errorId = useId()

  const loading = status === 'loading'
  const overLimit = message.length > MAX_MESSAGE_LENGTH

  async function analyze() {
    const trimmed = message.trim()
    if (!trimmed) {
      setStatus('error')
      setError('Please paste or type a message before analyzing.')
      textareaRef.current?.focus()
      return
    }
    if (overLimit) {
      setStatus('error')
      setError(`Messages must be ${MAX_MESSAGE_LENGTH.toLocaleString()} characters or fewer.`)
      return
    }

    setStatus('loading')
    setError(null)
    try {
      const data = await requestAnalysis(trimmed)
      setResult({ data, message: trimmed })
      setStats((s) => ({ scans: s.scans + 1, flagged: s.flagged + (data.classification === 'suspicious' ? 1 : 0) }))
      setStatus('success')
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  function reset() {
    setMessage('')
    setResult(null)
    setError(null)
    setStatus('idle')
    textareaRef.current?.focus()
  }

  function loadExample(text: string) {
    setMessage(text)
    setError(null)
    setStatus('idle')
    textareaRef.current?.focus()
  }

  return (
    <section id="scanner" aria-labelledby="scanner-heading" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Message scanner</p>
            <h2 id="scanner-heading" className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Paste a message. See the warning signs.
            </h2>
          </div>
          <span
            className={cn(
              'inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium',
              modelConfigured ? 'border-primary/40 bg-primary/10 text-primary' : 'border-warning/40 bg-warning/10 text-warning',
            )}
          >
            {modelConfigured ? <Brain className="size-3.5" aria-hidden="true" /> : <FlaskConical className="size-3.5" aria-hidden="true" />}
            {modelConfigured ? 'ML model backend connected' : 'Demo mode — rule-based checks only'}
          </span>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <form
            className="flex flex-col rounded-2xl border border-border bg-card p-5 lg:col-span-3"
            onSubmit={(e) => {
              e.preventDefault()
              analyze()
            }}
            noValidate
          >
            <label htmlFor={inputId} className="font-semibold">
              Suspicious message
            </label>
            <p id={helpId} className="mt-1 text-sm text-muted-foreground">
              Paste an SMS, email excerpt or chat message. Press Ctrl/Cmd + Enter to analyze.
            </p>
            <Textarea
              ref={textareaRef}
              id={inputId}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (status === 'error') {
                  setStatus('idle')
                  setError(null)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  analyze()
                }
              }}
              placeholder="e.g. Your account will be suspended. Verify your details at…"
              aria-describedby={error ? `${helpId} ${errorId}` : helpId}
              aria-invalid={status === 'error' || overLimit}
              disabled={loading}
              className="mt-4 min-h-52 flex-1 resize-y bg-background/50 p-4 text-base leading-relaxed md:text-sm"
            />

            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={cn('font-mono', overLimit ? 'text-destructive' : 'text-muted-foreground')} aria-live="polite">
                {message.length.toLocaleString()} / {MAX_MESSAGE_LENGTH.toLocaleString()} characters
              </span>
            </div>

            {error && (
              <p id={errorId} role="alert" className="mt-3 flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 px-4"
                onClick={reset}
                disabled={loading || (message.length === 0 && !result)}
              >
                <RotateCcw aria-hidden="true" />
                Clear
              </Button>
              <Button type="submit" size="lg" className="h-11 px-6 font-semibold" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <ScanSearch aria-hidden="true" />}
                {loading ? 'Analyzing…' : 'Analyze Message'}
              </Button>
            </div>
          </form>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <ExampleMessages onSelect={loadExample} disabled={loading} />
            <SessionStats scans={stats.scans} flagged={stats.flagged} />
          </div>
        </div>

        <div ref={resultRef} className="mt-8 scroll-mt-24" aria-live="polite" aria-busy={loading}>
          {loading && (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin text-primary" aria-hidden="true" />
              Checking language patterns, links and risk indicators…
            </div>
          )}
          {!loading && result && <ResultCard result={result.data} message={result.message} />}
        </div>
      </div>
    </section>
  )
}
