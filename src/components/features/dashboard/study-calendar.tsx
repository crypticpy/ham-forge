'use client'

import { useMemo } from 'react'
import { Flame } from 'lucide-react'
import type { ExamAttempt } from '@/types'

interface StudyCalendarProps {
  examAttempts: ExamAttempt[]
  currentStreak: number
}

export function StudyCalendar({ examAttempts, currentStreak }: StudyCalendarProps) {
  // Generate last 30 days
  const calendarData = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const days: Array<{
      date: Date
      dateStr: string
      hasActivity: boolean
      isToday: boolean
      attemptCount: number
    }> = []

    // Create a map of dates with exam activity
    const activityMap = new Map<string, number>()
    for (const attempt of examAttempts) {
      const dateStr = new Date(attempt.date).toISOString().split('T')[0]
      activityMap.set(dateStr, (activityMap.get(dateStr) || 0) + 1)
    }

    // Generate last 30 days (including today)
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      days.push({
        date,
        dateStr,
        hasActivity: activityMap.has(dateStr),
        isToday: i === 0,
        attemptCount: activityMap.get(dateStr) || 0,
      })
    }

    return days
  }, [examAttempts])

  // Group days by week for display
  const weeks = useMemo(() => {
    const result: (typeof calendarData)[] = []
    for (let i = 0; i < calendarData.length; i += 7) {
      result.push(calendarData.slice(i, i + 7))
    }
    return result
  }, [calendarData])

  // Format date for tooltip
  const formatDateTooltip = (date: Date, attemptCount: number): string => {
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)

    if (attemptCount === 0) {
      return `${formatted} - No activity`
    }
    return `${formatted} - ${attemptCount} exam${attemptCount > 1 ? 's' : ''}`
  }

  // Get day name abbreviation
  const getDayLabel = (dayIndex: number): string => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    return days[dayIndex]
  }

  // Calculate activity intensity for gradient coloring
  const getActivityIntensity = (attemptCount: number): string => {
    if (attemptCount === 0) return 'bg-muted'
    if (attemptCount === 1) return 'bg-green-300 dark:bg-green-700'
    if (attemptCount === 2) return 'bg-green-400 dark:bg-green-600'
    return 'bg-green-500 dark:bg-green-500'
  }

  return (
    <div className="w-full">
      {/* Streak indicator */}
      <div className="flex items-center gap-2 mb-4">
        <Flame
          className={`size-5 ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}
          aria-hidden="true"
        />
        <span className="text-sm font-medium">
          {currentStreak > 0 ? (
            <>
              <span className="text-orange-500">{currentStreak} day</span>
              {currentStreak > 1 ? 's' : ''} streak
            </>
          ) : (
            <span className="text-muted-foreground">No current streak</span>
          )}
        </span>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col gap-1">
        {/* Day labels row */}
        <div className="flex gap-1 mb-1">
          <div className="w-6" /> {/* Spacer for week labels */}
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <div
              key={dayIndex}
              className="flex-1 text-center text-[10px] text-muted-foreground font-medium"
            >
              {getDayLabel(dayIndex)}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-1 items-center">
            {/* Week label - show for first and last week */}
            <div className="w-6 text-[10px] text-muted-foreground">
              {weekIndex === 0 && week[0] && (
                <span>
                  {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(week[0].date)}
                </span>
              )}
            </div>

            {/* Day cells */}
            {week.map((day) => (
              <div
                key={day.dateStr}
                className={`
                  flex-1 aspect-square rounded-sm transition-all
                  ${getActivityIntensity(day.attemptCount)}
                  ${day.isToday ? 'ring-2 ring-primary ring-offset-1 ring-offset-background' : ''}
                  hover:ring-1 hover:ring-primary/50
                `}
                title={formatDateTooltip(day.date, day.attemptCount)}
                role="gridcell"
                aria-label={formatDateTooltip(day.date, day.attemptCount)}
              />
            ))}

            {/* Pad with empty cells if week is incomplete */}
            {week.length < 7 &&
              Array.from({ length: 7 - week.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 aspect-square" />
              ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-[10px] text-muted-foreground">
        <span>Last 30 days</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600" />
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500" />
          <span>More</span>
        </div>
      </div>

      {/* Activity summary */}
      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Active days</div>
            <div className="font-medium">
              {calendarData.filter((d) => d.hasActivity).length} / 30
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Total exams</div>
            <div className="font-medium">
              {calendarData.reduce((sum, d) => sum + d.attemptCount, 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
