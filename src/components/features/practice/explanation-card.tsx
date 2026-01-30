'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExplanationCardProps {
  explanation?: string
  refs?: string // FCC reference like '[97.1]'
  isCorrect: boolean
}

export function ExplanationCard({ explanation, refs, isCorrect }: ExplanationCardProps) {
  return (
    <Card
      className={cn(
        'border-2',
        isCorrect
          ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20'
          : 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20'
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle
          className={cn(
            'flex items-center gap-2 text-lg',
            isCorrect ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'
          )}
        >
          {isCorrect ? (
            <>
              <CheckCircle className="size-5" aria-hidden="true" />
              <span>Correct!</span>
            </>
          ) : (
            <>
              <XCircle className="size-5" aria-hidden="true" />
              <span>Incorrect</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {explanation && (
          <div className="flex gap-2">
            <BookOpen className="size-4 mt-0.5 text-muted-foreground shrink-0" aria-hidden="true" />
            <p className="text-sm text-foreground">{explanation}</p>
          </div>
        )}
        {refs && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">FCC Reference:</span> {refs}
          </p>
        )}
        {!explanation && !refs && (
          <p className="text-sm text-muted-foreground italic">
            {isCorrect ? 'Great job! Keep up the good work.' : 'Review this topic and try again.'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
