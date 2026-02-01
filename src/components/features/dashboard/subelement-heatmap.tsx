'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getProgressBySubelement, getSubelements } from '@/lib/question-scheduler'
import { getSubelementName } from '@/lib/subelement-metadata'
import type { ExamLevel } from '@/types'

interface SubelementHeatmapProps {
  examLevel: ExamLevel
  onSubelementClick?: (subelement: string) => void
}

interface SubelementData {
  code: string
  name: string
  total: number
  mastered: number
  percentage: number
}

/**
 * Get color classes based on mastery percentage
 * Red (0%) -> Yellow (50%) -> Green (100%)
 */
function getMasteryColor(percentage: number): {
  bg: string
  text: string
  border: string
} {
  if (percentage >= 80) {
    return {
      bg: 'bg-green-500 dark:bg-green-600',
      text: 'text-white',
      border: 'border-green-600 dark:border-green-500',
    }
  }
  if (percentage >= 60) {
    return {
      bg: 'bg-green-400 dark:bg-green-500',
      text: 'text-white',
      border: 'border-green-500 dark:border-green-400',
    }
  }
  if (percentage >= 40) {
    return {
      bg: 'bg-yellow-400 dark:bg-yellow-500',
      text: 'text-yellow-950 dark:text-yellow-950',
      border: 'border-yellow-500 dark:border-yellow-400',
    }
  }
  if (percentage >= 20) {
    return {
      bg: 'bg-orange-400 dark:bg-orange-500',
      text: 'text-orange-950 dark:text-orange-950',
      border: 'border-orange-500 dark:border-orange-400',
    }
  }
  if (percentage > 0) {
    return {
      bg: 'bg-red-400 dark:bg-red-500',
      text: 'text-white',
      border: 'border-red-500 dark:border-red-400',
    }
  }
  // 0% - not started
  return {
    bg: 'bg-muted',
    text: 'text-muted-foreground',
    border: 'border-border',
  }
}

export function SubelementHeatmap({ examLevel, onSubelementClick }: SubelementHeatmapProps) {
  const [data, setData] = useState<SubelementData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const subelements = await getSubelements(examLevel)
      const progressMap = await getProgressBySubelement(examLevel)

      const subelementData: SubelementData[] = subelements.map((code) => {
        const progress = progressMap.get(code)
        const total = progress?.total ?? 0
        const mastered = progress?.mastered ?? 0
        const percentage = total > 0 ? Math.round((mastered / total) * 100) : 0

        return {
          code,
          name: getSubelementName(code),
          total,
          mastered,
          percentage,
        }
      })

      setData(subelementData)
    } finally {
      setIsLoading(false)
    }
  }, [examLevel])

  useEffect(() => {
    loadData()
  }, [loadData])

  const examLevelLabel = examLevel.charAt(0).toUpperCase() + examLevel.slice(1)

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mastery by Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
            <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading mastery data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Empty state
  if (data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Mastery by Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No subelement data available</p>
            <p className="text-sm text-muted-foreground/75 mt-1">
              Start practicing to see your mastery progress.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{examLevelLabel} Mastery by Topic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Legend */}
        <div
          className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"
          aria-label="Mastery level legend"
        >
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-muted border border-border" aria-hidden="true" />
            <span>Not started</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-red-400 dark:bg-red-500" aria-hidden="true" />
            <span>1-19%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-orange-400 dark:bg-orange-500" aria-hidden="true" />
            <span>20-39%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-yellow-400 dark:bg-yellow-500" aria-hidden="true" />
            <span>40-59%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-green-400 dark:bg-green-500" aria-hidden="true" />
            <span>60-79%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded bg-green-500 dark:bg-green-600" aria-hidden="true" />
            <span>80-100%</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          role="grid"
          aria-label="Subelement mastery heatmap"
        >
          {data.map((item) => {
            const colors = getMasteryColor(item.percentage)
            const isClickable = !!onSubelementClick

            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onSubelementClick?.(item.code)}
                disabled={!isClickable}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all',
                  colors.bg,
                  colors.border,
                  isClickable && 'hover:scale-105 hover:shadow-md cursor-pointer',
                  !isClickable && 'cursor-default'
                )}
                role="gridcell"
                aria-label={`${item.code} ${item.name}: ${item.percentage}% mastered (${item.mastered} of ${item.total} questions)`}
              >
                {/* Subelement Code */}
                <span className={cn('text-lg font-bold font-mono', colors.text)}>{item.code}</span>

                {/* Mastery Percentage */}
                <span className={cn('text-2xl font-semibold tabular-nums', colors.text)}>
                  {item.percentage}%
                </span>

                {/* Subelement Name (truncated) */}
                <span
                  className={cn(
                    'text-xs mt-1 text-center line-clamp-2 leading-tight',
                    item.percentage > 0 ? colors.text : 'text-muted-foreground'
                  )}
                  title={item.name}
                >
                  {item.name}
                </span>

                {/* Mastered/Total count */}
                <span
                  className={cn(
                    'text-xs mt-1 opacity-75',
                    item.percentage > 0 ? colors.text : 'text-muted-foreground'
                  )}
                >
                  {item.mastered}/{item.total}
                </span>
              </button>
            )
          })}
        </div>

        {/* Overall Summary */}
        <div className="pt-2 border-t text-sm text-muted-foreground">
          <div className="flex flex-wrap justify-between gap-2">
            <span>
              Total:{' '}
              <span className="font-medium text-foreground">
                {data.reduce((sum, item) => sum + item.mastered, 0)}
              </span>{' '}
              of{' '}
              <span className="font-medium text-foreground">
                {data.reduce((sum, item) => sum + item.total, 0)}
              </span>{' '}
              questions mastered
            </span>
            <span>
              Overall:{' '}
              <span className="font-medium text-foreground">
                {(() => {
                  const totalMastered = data.reduce((sum, item) => sum + item.mastered, 0)
                  const totalQuestions = data.reduce((sum, item) => sum + item.total, 0)
                  return totalQuestions > 0 ? Math.round((totalMastered / totalQuestions) * 100) : 0
                })()}
                %
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
