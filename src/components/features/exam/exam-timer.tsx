'use client'

import { useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamTimerProps {
  timeRemaining: number // seconds, passed from parent (single source of truth)
  onTimeUp?: () => void
  className?: string
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function ExamTimer({ timeRemaining, onTimeUp, className }: ExamTimerProps) {
  // Determine color state
  const isCritical = timeRemaining <= 60 // < 1 min
  const isWarning = timeRemaining <= 300 && !isCritical // < 5 min but > 1 min
  const isTimeUp = timeRemaining === 0

  // Call onTimeUp when time hits 0
  useEffect(() => {
    if (timeRemaining === 0 && onTimeUp) {
      onTimeUp()
    }
  }, [timeRemaining, onTimeUp])

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-lg font-semibold transition-colors',
        {
          'bg-muted text-foreground': !isWarning && !isCritical && !isTimeUp,
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400':
            isWarning && !isCritical,
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 animate-pulse':
            isCritical && !isTimeUp,
          'bg-red-500 text-white dark:bg-red-600': isTimeUp,
        },
        className
      )}
      role="timer"
      aria-label={`Time remaining: ${formatTime(timeRemaining)}`}
      aria-live={isCritical ? 'assertive' : 'off'}
    >
      <Clock
        className={cn('size-5', {
          'animate-pulse': isCritical && !isTimeUp,
        })}
        aria-hidden="true"
      />
      <span className="tabular-nums">{formatTime(timeRemaining)}</span>
    </div>
  )
}
