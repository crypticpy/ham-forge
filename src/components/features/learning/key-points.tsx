'use client'

import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KeyPointsProps {
  points: string[]
  title?: string
  className?: string
}

/**
 * KeyPoints Component
 * Displays key takeaways from a learning section in a highlighted card format
 */
export function KeyPoints({ points, title = 'Key Takeaways', className }: KeyPointsProps) {
  if (!points || points.length === 0) {
    return null
  }

  return (
    <Card className={cn('border-primary/20 bg-primary/5 dark:bg-primary/10', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 mt-0.5">
                <Check className="size-5 text-primary" aria-hidden="true" />
              </span>
              <span className="text-sm text-foreground/90 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
