'use client'

import type { ExamAttempt } from '@/types'

interface ExamHistoryChartProps {
  attempts: ExamAttempt[]
}

const PASSING_THRESHOLD = 74

export function ExamHistoryChart({ attempts }: ExamHistoryChartProps) {
  // Reverse to show oldest first (left to right)
  const sortedAttempts = [...attempts].reverse()

  // Format date for display
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  // Empty state
  if (sortedAttempts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center text-muted-foreground">
        <div>
          <p className="text-sm">No exam history to display</p>
          <p className="text-xs mt-1">Complete practice exams to see your score progression</p>
        </div>
      </div>
    )
  }

  // Single attempt - show a simple display
  if (sortedAttempts.length === 1) {
    const attempt = sortedAttempts[0]
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center">
          <div
            className={`text-4xl font-bold ${attempt.passed ? 'text-green-600' : 'text-red-600'}`}
          >
            {attempt.score}%
          </div>
          <div className="text-sm text-muted-foreground mt-2">{formatDate(attempt.date)}</div>
          <div className={`text-sm mt-1 ${attempt.passed ? 'text-green-600' : 'text-red-600'}`}>
            {attempt.passed ? 'Passed' : 'Failed'}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Take more exams to see your score progression
        </p>
      </div>
    )
  }

  // Chart dimensions
  const chartHeight = 180
  const chartPadding = { top: 20, right: 20, bottom: 40, left: 40 }
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom

  // Y-axis scale (0-100)
  const minScore = 0
  const maxScore = 100
  const scoreRange = maxScore - minScore

  // Calculate bar width based on number of attempts (max 10 visible)
  const visibleAttempts = sortedAttempts.slice(-10)
  const barGap = 8
  const availableWidth = 100 // percentage
  const barWidth = Math.max(
    20,
    (availableWidth - barGap * visibleAttempts.length) / visibleAttempts.length
  )

  // Y position for a score
  const getYPosition = (score: number): number => {
    return innerHeight - ((score - minScore) / scoreRange) * innerHeight
  }

  // Passing threshold line position
  const thresholdY = getYPosition(PASSING_THRESHOLD)

  return (
    <div className="w-full">
      {/* Chart container */}
      <div className="relative" style={{ height: chartHeight }}>
        {/* Y-axis labels */}
        <div
          className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground"
          style={{
            paddingTop: chartPadding.top,
            paddingBottom: chartPadding.bottom,
            width: chartPadding.left,
          }}
        >
          <span>100%</span>
          <span>74%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            left: chartPadding.left,
            paddingTop: chartPadding.top,
            paddingBottom: chartPadding.bottom,
            paddingRight: chartPadding.right,
          }}
        >
          {/* Background grid lines */}
          <div className="relative h-full w-full">
            {/* 100% line */}
            <div
              className="absolute w-full border-t border-border/30"
              style={{ top: getYPosition(100) }}
            />
            {/* 74% threshold line */}
            <div
              className="absolute w-full border-t-2 border-dashed border-amber-500/50"
              style={{ top: thresholdY }}
            >
              <span className="absolute -top-3 right-0 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                Pass: 74%
              </span>
            </div>
            {/* 50% line */}
            <div
              className="absolute w-full border-t border-border/30"
              style={{ top: getYPosition(50) }}
            />
            {/* 0% line (baseline) */}
            <div
              className="absolute w-full border-t border-border"
              style={{ top: getYPosition(0) }}
            />

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around gap-1 px-2">
              {visibleAttempts.map((attempt) => {
                const barHeight = (attempt.score / 100) * innerHeight
                const isPassing = attempt.passed

                return (
                  <div
                    key={attempt.id}
                    className="flex flex-col items-center"
                    style={{ flex: 1, maxWidth: `${barWidth}%` }}
                  >
                    {/* Bar */}
                    <div
                      className="relative w-full flex flex-col items-center"
                      style={{ height: innerHeight }}
                    >
                      {/* Score tooltip on hover */}
                      <div
                        className={`absolute w-full rounded-t transition-all hover:opacity-80 ${
                          isPassing
                            ? 'bg-green-500 dark:bg-green-600'
                            : 'bg-red-500 dark:bg-red-600'
                        }`}
                        style={{
                          height: barHeight,
                          bottom: 0,
                          minHeight: 4,
                        }}
                        title={`${attempt.score}% - ${formatDate(attempt.date)}`}
                      >
                        {/* Score label on bar */}
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap">
                          {attempt.score}%
                        </span>
                      </div>
                    </div>

                    {/* Date label */}
                    <span className="text-[10px] text-muted-foreground mt-2 whitespace-nowrap">
                      {formatDate(attempt.date)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500 dark:bg-green-600" />
          <span className="text-muted-foreground">Pass</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-500 dark:bg-red-600" />
          <span className="text-muted-foreground">Fail</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 border-t-2 border-dashed border-amber-500/50" />
          <span className="text-muted-foreground">Pass threshold</span>
        </div>
      </div>
    </div>
  )
}
