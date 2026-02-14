'use client'

import { cn } from '@/lib/utils'

interface ExamProgressProps {
  current: number
  total: number
  answered: number
  showPercentage?: boolean
}

export function ExamProgress({
  current,
  total,
  answered,
  showPercentage = true,
}: ExamProgressProps) {
  const progressPercentage = total > 0 ? Math.round((answered / total) * 100) : 0

  return (
    <div className="w-full space-y-2">
      {/* Text info */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Question {current} of {total}
        </span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{answered} answered</span>
          {showPercentage && (
            <>
              <span aria-hidden="true">|</span>
              <span>{progressPercentage}% complete</span>
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 w-full rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Exam progress: ${progressPercentage}% complete`}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', {
            'bg-muted-foreground/30': progressPercentage === 0,
            'bg-primary': progressPercentage > 0 && progressPercentage < 100,
            'bg-green-500 dark:bg-green-600': progressPercentage === 100,
          })}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Answered vs remaining indicator */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-primary" aria-hidden="true" />
          <span>{answered} answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-muted-foreground/30" aria-hidden="true" />
          <span>{total - answered} remaining</span>
        </div>
      </div>
    </div>
  )
}
