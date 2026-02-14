'use client'

import { cn } from '@/lib/utils'

// Subelement names for display
export const TECHNICIAN_SUBELEMENT_NAMES: Record<string, string> = {
  T1: 'FCC Rules',
  T2: 'Operating Procedures',
  T3: 'Radio Waves',
  T4: 'Best Practices',
  T5: 'Electrical Principles',
  T6: 'Electrical Components',
  T7: 'Station Equipment',
  T8: 'Modulation Modes',
  T9: 'Antennas',
  T0: 'Safety',
}

export const GENERAL_SUBELEMENT_NAMES: Record<string, string> = {
  G1: 'FCC Rules',
  G2: 'Operating Procedures',
  G3: 'Radio Wave Propagation',
  G4: 'Amateur Radio Practices',
  G5: 'Electrical Principles',
  G6: 'Circuit Components',
  G7: 'Practical Circuits',
  G8: 'Signals and Emissions',
  G9: 'Antennas and Feed Lines',
  G0: 'Safety',
}

export const EXTRA_SUBELEMENT_NAMES: Record<string, string> = {
  E1: 'FCC Rules',
  E2: 'Operating Procedures',
  E3: 'Radio Wave Propagation',
  E4: 'Amateur Radio Practices',
  E5: 'Electrical Principles',
  E6: 'Circuit Components',
  E7: 'Practical Circuits',
  E8: 'Signals and Emissions',
  E9: 'Antennas and Feed Lines',
  E0: 'Safety',
}

interface SubelementData {
  id: string
  name: string
  correct: number
  total: number
  percentage: number
}

interface SubelementChartProps {
  data: SubelementData[]
  showDetails?: boolean
}

function getPerformanceColor(percentage: number): {
  bar: string
  text: string
  bg: string
} {
  if (percentage >= 80) {
    return {
      bar: 'bg-green-500 dark:bg-green-600',
      text: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/20',
    }
  }
  if (percentage >= 50) {
    return {
      bar: 'bg-yellow-500 dark:bg-yellow-600',
      text: 'text-yellow-700 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    }
  }
  return {
    bar: 'bg-red-500 dark:bg-red-600',
    text: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/20',
  }
}

function getPerformanceLabel(percentage: number): string {
  if (percentage >= 80) return 'Strong'
  if (percentage >= 50) return 'Needs Review'
  return 'Weak Area'
}

export function SubelementChart({ data, showDetails = true }: SubelementChartProps) {
  // Sort by performance (worst first to highlight weak areas)
  const sortedData = [...data].sort((a, b) => a.percentage - b.percentage)

  if (sortedData.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">No subelement data available</div>
    )
  }

  return (
    <div className="space-y-3" role="list" aria-label="Performance by subelement">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-green-500 dark:bg-green-600" aria-hidden="true" />
          <span>Strong (80%+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-yellow-500 dark:bg-yellow-600" aria-hidden="true" />
          <span>Needs Review (50-79%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-red-500 dark:bg-red-600" aria-hidden="true" />
          <span>Weak Area (&lt;50%)</span>
        </div>
      </div>

      {sortedData.map((subelement) => {
        const colors = getPerformanceColor(subelement.percentage)
        const label = getPerformanceLabel(subelement.percentage)

        return (
          <div key={subelement.id} role="listitem" className={cn('rounded-lg p-3', colors.bg)}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-muted-foreground">
                  {subelement.id}
                </span>
                <span className="font-medium text-sm">{subelement.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {showDetails && (
                  <span className={cn('text-xs font-medium', colors.text)}>{label}</span>
                )}
                <span className="text-sm font-semibold tabular-nums">
                  {subelement.correct}/{subelement.total}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-background/50 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', colors.bar)}
                style={{ width: `${subelement.percentage}%` }}
                role="progressbar"
                aria-valuenow={subelement.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${subelement.name}: ${subelement.percentage}%`}
              />
            </div>

            {/* Percentage */}
            {showDetails && (
              <div className="mt-1 text-right">
                <span className={cn('text-xs font-medium tabular-nums', colors.text)}>
                  {Math.round(subelement.percentage)}%
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
