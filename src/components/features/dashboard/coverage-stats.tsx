'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CoverageStatsProps {
  stats: {
    total: number
    new: number
    learning: number
    review: number
    mastered: number
  }
}

interface CategoryInfo {
  key: keyof Omit<CoverageStatsProps['stats'], 'total'>
  label: string
  description: string
  color: string
  bgColor: string
}

const CATEGORIES: CategoryInfo[] = [
  {
    key: 'new',
    label: 'New',
    description: 'Never seen',
    color: 'bg-gray-400 dark:bg-gray-500',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
  },
  {
    key: 'learning',
    label: 'Learning',
    description: 'Seen but not mastered',
    color: 'bg-blue-500 dark:bg-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    key: 'review',
    label: 'Review',
    description: 'Scheduled for review',
    color: 'bg-yellow-500 dark:bg-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
  },
  {
    key: 'mastered',
    label: 'Mastered',
    description: 'Confidently learned',
    color: 'bg-green-500 dark:bg-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
  },
]

function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function CoverageStats({ stats }: CoverageStatsProps) {
  const { total } = stats

  // Calculate widths for stacked bar, ensuring minimum visible width for non-zero values
  const getBarWidth = (value: number): string => {
    if (total === 0 || value === 0) return '0%'
    const percentage = (value / total) * 100
    // Ensure at least 2% width for visibility if value > 0
    return `${Math.max(percentage, 2)}%`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="size-4" aria-hidden="true" />
          Question Coverage
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Stacked horizontal progress bar */}
        <div
          className="h-6 w-full rounded-full bg-muted overflow-hidden flex"
          role="progressbar"
          aria-label="Question coverage distribution"
        >
          {CATEGORIES.map((category) => {
            const value = stats[category.key]
            const width = getBarWidth(value)

            if (value === 0) return null

            return (
              <div
                key={category.key}
                className={cn('h-full transition-all duration-500', category.color)}
                style={{ width }}
                title={`${category.label}: ${value} (${calculatePercentage(value, total)}%)`}
              />
            )
          })}
        </div>

        {/* Total count */}
        <div className="mt-3 text-center">
          <span className="text-2xl font-bold tabular-nums">{total}</span>
          <span className="text-sm text-muted-foreground ml-1.5">total questions</span>
        </div>

        {/* Legend with counts */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {CATEGORIES.map((category) => {
            const value = stats[category.key]
            const percentage = calculatePercentage(value, total)

            return (
              <div key={category.key} className={cn('rounded-lg p-3', category.bgColor)}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn('size-3 rounded', category.color)} aria-hidden="true" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-semibold tabular-nums">{value}</span>
                  <span className="text-xs text-muted-foreground">({percentage}%)</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{category.description}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
