'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Radio, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getMappingForQuestion } from '@/data/radio/question-control-mapping'
import { getControlById } from '@/lib/ic7300-data'
import type { RadioControl } from '@/types/radio'

interface RelatedControlsProps {
  questionId: string
  className?: string
}

interface ControlWithRelevance {
  control: RadioControl
  relevance: 'direct' | 'related'
}

const categoryColors: Record<RadioControl['category'], string> = {
  tuning: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  audio: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  mode: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  filter: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  power: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  memory: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  display: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  misc: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
}

const categoryLabels: Record<RadioControl['category'], string> = {
  tuning: 'Tuning',
  audio: 'Audio',
  mode: 'Mode',
  filter: 'Filter',
  power: 'Power',
  memory: 'Memory',
  display: 'Display',
  misc: 'Misc',
}

const relevanceBadgeColors = {
  direct: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  related: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300',
}

/**
 * RelatedControls component
 * Shows IC-7300 controls related to a specific exam question
 */
export function RelatedControls({ questionId, className }: RelatedControlsProps) {
  // Get all controls for this question
  const controlsWithRelevance = useMemo(() => {
    const mapping = getMappingForQuestion(questionId)

    if (!mapping) {
      return []
    }

    const result: ControlWithRelevance[] = []

    for (const controlId of mapping.controlIds) {
      const control = getControlById(controlId)
      if (control) {
        result.push({
          control,
          relevance: mapping.relevance,
        })
      }
    }

    // Sort by category for consistent display
    result.sort((a, b) => a.control.category.localeCompare(b.control.category))

    return result
  }, [questionId])

  // Don't render if no related controls
  if (controlsWithRelevance.length === 0) {
    return null
  }

  const relevance = controlsWithRelevance[0]?.relevance || 'related'

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="size-4 text-muted-foreground" aria-hidden="true" />
            <CardTitle className="text-sm font-medium">IC-7300 Controls</CardTitle>
          </div>
          <span
            className={cn(
              'px-1.5 py-0.5 text-[10px] font-medium rounded',
              relevanceBadgeColors[relevance]
            )}
          >
            {relevance}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {controlsWithRelevance.length} control{controlsWithRelevance.length !== 1 ? 's' : ''}{' '}
          related to this question
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Control cards */}
        <ul className="space-y-2">
          {controlsWithRelevance.map(({ control }) => (
            <li key={control.id}>
              <Link
                href={`/radio/controls#${control.id}`}
                className="group block p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  {/* Control name and category */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{control.name}</span>
                      <ExternalLink
                        className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    {/* Brief description */}
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {control.description}
                    </p>
                  </div>
                  {/* Category badge */}
                  <span
                    className={cn(
                      'shrink-0 px-2 py-0.5 text-[10px] font-medium rounded-full',
                      categoryColors[control.category]
                    )}
                  >
                    {categoryLabels[control.category]}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Link to full controls page */}
        <Link
          href="/radio/controls"
          className="flex items-center justify-center gap-1.5 pt-2 text-xs text-primary hover:underline"
        >
          View all IC-7300 controls
          <ExternalLink className="size-3" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
