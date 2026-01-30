'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ExamLevel } from '@/types'

interface ReadinessScoreProps {
  examLevel: ExamLevel
  stats: {
    mastered: number
    total: number
    accuracy: number
    dueCount: number
  }
}

function calculateReadinessScore(stats: ReadinessScoreProps['stats']): number {
  const { mastered, total, accuracy, dueCount } = stats

  if (total === 0) return 0

  // 50% weight: mastered percentage
  const masteredRatio = mastered / total
  const masteredScore = masteredRatio * 50

  // 30% weight: overall accuracy
  const accuracyScore = accuracy * 30

  // 20% weight: inverse of due ratio (fewer due = better)
  // If all questions are due, this is 0. If none are due, this is 20.
  const dueRatio = dueCount / total
  const dueScore = (1 - dueRatio) * 20

  return Math.round(masteredScore + accuracyScore + dueScore)
}

function getReadinessStatus(score: number): {
  label: string
  color: string
  bgColor: string
  ringColor: string
} {
  if (score >= 75) {
    return {
      label: 'Ready!',
      color: 'text-green-600 dark:text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      ringColor: 'stroke-green-500 dark:stroke-green-600',
    }
  }
  if (score >= 50) {
    return {
      label: 'Almost Ready',
      color: 'text-yellow-600 dark:text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
      ringColor: 'stroke-yellow-500 dark:stroke-yellow-600',
    }
  }
  return {
    label: 'Not Ready',
    color: 'text-red-600 dark:text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    ringColor: 'stroke-red-500 dark:stroke-red-600',
  }
}

function getExamLevelLabel(examLevel: ExamLevel): string {
  switch (examLevel) {
    case 'technician':
      return 'Technician'
    case 'general':
      return 'General'
    case 'extra':
      return 'Extra'
  }
}

export function ReadinessScore({ examLevel, stats }: ReadinessScoreProps) {
  const score = calculateReadinessScore(stats)
  const status = getReadinessStatus(score)

  // SVG circular progress parameters
  const size = 120
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (score / 100) * circumference
  const offset = circumference - progress

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="size-4" aria-hidden="true" />
            Exam Readiness
          </CardTitle>
          <div className="group relative">
            <button
              type="button"
              className="rounded-full p-1 hover:bg-muted transition-colors"
              aria-label="How is readiness calculated?"
            >
              <Info className="size-4 text-muted-foreground" aria-hidden="true" />
            </button>
            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 z-10 hidden group-hover:block w-64 rounded-lg bg-popover border p-3 text-xs text-popover-foreground shadow-lg">
              <p className="font-medium mb-2">Readiness Score Calculation:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">50%</span> - Questions mastered
                </li>
                <li>
                  <span className="font-medium text-foreground">30%</span> - Overall accuracy
                </li>
                <li>
                  <span className="font-medium text-foreground">20%</span> - Review completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center">
          {/* Circular progress indicator */}
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={cn('transition-all duration-500 ease-out', status.ringColor)}
              />
            </svg>
            {/* Score display in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={cn('text-3xl font-bold tabular-nums', status.color)}
                aria-label={`Readiness score: ${score} percent`}
              >
                {score}%
              </span>
            </div>
          </div>

          {/* Status badge */}
          <div className={cn('mt-4 rounded-full px-4 py-1.5', status.bgColor)}>
            <span className={cn('text-sm font-semibold', status.color)}>{status.label}</span>
          </div>

          {/* Exam level indicator */}
          <p className="mt-2 text-xs text-muted-foreground">{getExamLevelLabel(examLevel)} Exam</p>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center">
            <div>
              <div className="text-lg font-semibold tabular-nums">
                {stats.mastered}/{stats.total}
              </div>
              <div className="text-xs text-muted-foreground">Mastered</div>
            </div>
            <div>
              <div className="text-lg font-semibold tabular-nums">
                {Math.round(stats.accuracy * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
