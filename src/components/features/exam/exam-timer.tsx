'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Clock, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExamTimerProps {
  initialMinutes: number
  onTimeUp?: () => void
  isPaused?: boolean
  showControls?: boolean
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function ExamTimer({
  initialMinutes,
  onTimeUp,
  isPaused = false,
  showControls = false,
}: ExamTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60)
  const [isLocallyPaused, setIsLocallyPaused] = useState(false)
  const onTimeUpRef = useRef(onTimeUp)

  // Keep callback ref updated
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Timer effect
  useEffect(() => {
    const effectivelyPaused = isPaused || isLocallyPaused

    if (effectivelyPaused || remainingSeconds <= 0) {
      return
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          onTimeUpRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, isLocallyPaused, remainingSeconds])

  const togglePause = useCallback(() => {
    setIsLocallyPaused((prev) => !prev)
  }, [])

  // Determine color state
  const isWarning = remainingSeconds <= 300 && remainingSeconds > 60 // < 5 min
  const isDanger = remainingSeconds <= 60 // < 1 min
  const isTimeUp = remainingSeconds === 0

  const effectivelyPaused = isPaused || isLocallyPaused

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-lg font-semibold transition-colors',
        {
          'bg-muted text-foreground': !isWarning && !isDanger && !isTimeUp,
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400':
            isWarning && !isDanger,
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 animate-pulse':
            isDanger && !isTimeUp,
          'bg-red-500 text-white dark:bg-red-600': isTimeUp,
        }
      )}
      role="timer"
      aria-label={`Time remaining: ${formatTime(remainingSeconds)}`}
      aria-live={isDanger ? 'assertive' : 'polite'}
    >
      <Clock
        className={cn('size-5', {
          'animate-pulse': isDanger && !isTimeUp,
        })}
        aria-hidden="true"
      />
      <span className="tabular-nums">{formatTime(remainingSeconds)}</span>
      {showControls && !isTimeUp && (
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={togglePause}
          aria-label={effectivelyPaused ? 'Resume timer' : 'Pause timer'}
          className="ml-1"
        >
          {effectivelyPaused ? (
            <Play className="size-3" aria-hidden="true" />
          ) : (
            <Pause className="size-3" aria-hidden="true" />
          )}
        </Button>
      )}
    </div>
  )
}
