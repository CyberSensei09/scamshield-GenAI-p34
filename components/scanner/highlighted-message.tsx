import { Fragment } from 'react'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

interface HighlightedMessageProps {
  text: string
  phrases: string[]
}

export function HighlightedMessage({ text, phrases }: HighlightedMessageProps) {
  const unique = [...new Set(phrases.filter(Boolean))].sort((a, b) => b.length - a.length)

  if (unique.length === 0) {
    return <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{text}</p>
  }

  const lowered = new Set(unique.map((p) => p.toLowerCase()))
  const pattern = new RegExp(`(${unique.map(escapeRegExp).join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
      {parts.map((part, index) =>
        lowered.has(part.toLowerCase()) ? (
          <mark key={index} className="rounded bg-destructive/20 px-0.5 text-foreground underline decoration-destructive decoration-2 underline-offset-2">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </p>
  )
}
