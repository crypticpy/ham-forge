'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Timer, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface QuickStudyTimerProps {
  durationSeconds: number // 300 for 5 min
  onTimeUp: () => void
  className?: string
  allowPause?: boolean
}

/**
 * Formats seconds into MM:SS format
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * QuickStudyTimer component displays a countdown timer for timed practice sessions.
 * - Displays time in MM:SS format
 * - Visual feedback: normal (muted), warning under 60s (amber), critical under 30s (red)
 * - Pulses when under 30 seconds remaining
 * - Calls onTimeUp when timer reaches 0
 * - Optional pause functionality
 */
export function QuickStudyTimer({
  durationSeconds,
  onTimeUp,
  className,
  allowPause = false,
}: QuickStudyTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const onTimeUpRef = useRef(onTimeUp)

  // Keep callback ref up to date
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Handle countdown
  useEffect(() => {
    if (isPaused || remainingSeconds <= 0) return

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const newValue = prev - 1
        if (newValue <= 0) {
          clearInterval(interval)
          // Use setTimeout to avoid state update during render
          setTimeout(() => onTimeUpRef.current(), 0)
          return 0
        }
        return newValue
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, remainingSeconds])

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev)
  }, [])

  // Determine visual state
  const isCritical = remainingSeconds <= 30
  const isWarning = remainingSeconds <= 60 && remainingSeconds > 30
  const isNormal = remainingSeconds > 60

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
        isNormal && 'bg-muted text-muted-foreground',
        isWarning && 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
        isCritical && 'bg-red-500/15 text-red-600 dark:text-red-400',
        isCritical && !isPaused && 'animate-pulse',
        className
      )}
    >
      <Timer className={cn('size-4', isPaused && 'opacity-50')} />
      <span className={cn('tabular-nums', isPaused && 'opacity-50')}>
        {formatTime(remainingSeconds)}
      </span>

      {allowPause && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-6 -mr-1"
          onClick={togglePause}
          aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
        >
          {isPaused ? <Play className="size-3" /> : <Pause className="size-3" />}
        </Button>
      )}
    </div>
  )
}
