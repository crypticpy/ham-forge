import { Heart, Lightbulb, Radio } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getHamDelighterBundle, type DelighterContext } from '@/data/ham-delighters'

interface HamDelightCardProps {
  context: DelighterContext
  seed: string
  className?: string
  compact?: boolean
}

export function HamDelightCard({ context, seed, className, compact = false }: HamDelightCardProps) {
  const { encouragement, faq, anecdote } = getHamDelighterBundle(context, seed)

  return (
    <Card className={cn('border-primary/20 bg-primary/5', className)}>
      <CardContent className="space-y-3 py-4">
        <div className="flex items-start gap-2">
          <Heart className="size-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm">
            <span className="font-semibold">Encouragement:</span> {encouragement}
          </p>
        </div>

        {compact ? (
          <details className="rounded-md border border-border/70 bg-background/70 p-3">
            <summary className="cursor-pointer text-sm font-medium inline-flex items-center gap-2">
              <Lightbulb className="size-4 text-caution-amber" aria-hidden="true" />
              Quick HAM Nugget
            </summary>
            <div className="mt-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{anecdote.title}</p>
              <p className="mt-1">{anecdote.story}</p>
            </div>
          </details>
        ) : (
          <>
            <details className="rounded-md border border-border/70 bg-background/70 p-3">
              <summary className="cursor-pointer text-sm font-medium inline-flex items-center gap-2">
                <Lightbulb className="size-4 text-caution-amber" aria-hidden="true" />
                Quick HAM FAQ
              </summary>
              <div className="mt-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{faq.question}</p>
                <p className="mt-1">{faq.answer}</p>
              </div>
            </details>

            <details className="rounded-md border border-border/70 bg-background/70 p-3">
              <summary className="cursor-pointer text-sm font-medium inline-flex items-center gap-2">
                <Radio className="size-4 text-cosmic-cyan" aria-hidden="true" />
                Ham History Nugget
              </summary>
              <div className="mt-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{anecdote.title}</p>
                <p className="mt-1">{anecdote.story}</p>
              </div>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  )
}
