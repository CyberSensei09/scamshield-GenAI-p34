import { ShieldCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/25 to-success/20 ring-1 ring-primary/40">
        <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        ScamShield <span className="text-primary">AI</span>
      </span>
    </span>
  )
}
