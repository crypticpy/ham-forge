'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Clock, Calendar, TrendingUp } from 'lucide-react'
import { useSessionTimeStore } from '@/stores/session-time-store'
import { useHydration } from '@/hooks/use-hydration'
import {
  aggregateByDay,
  aggregateByWeek,
  aggregateByMonth,
  formatDuration,
  formatShortDuration,
  getDayName,
  type TimeEntry,
  type WeekEntry,
  type MonthEntry,
} from '@/lib/time-tracking'

type TimePeriod = 'day' | 'week' | 'month'

interface TimeBarChartProps {
  data: TimeEntry[] | WeekEntry[] | MonthEntry[]
}

/**
 * Horizontal bar chart for displaying time data
 */
function TimeBarChart({ data }: TimeBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-center text-muted-foreground">
        <p className="text-sm">No time data available</p>
      </div>
    )
  }

  // Find the maximum value to scale bars
  const maxSeconds = Math.max(...data.map((d) => d.totalSeconds), 1)

  // Get label for each entry based on period type
  const getLabel = (entry: TimeEntry | WeekEntry | MonthEntry, index: number): string => {
    if ('date' in entry) {
      return getDayName(entry.date)
    }
    if ('week' in entry) {
      // Shorten "Week of MMM D" to just "MMM D"
      return entry.week.replace('Week of ', '')
    }
    if ('month' in entry) {
      return entry.month
    }
    return String(index + 1)
  }

  return (
    <div className="space-y-2">
      {data.map((entry, index) => {
        const percentage = (entry.totalSeconds / maxSeconds) * 100
        const label = getLabel(entry, index)
        const formattedTime = formatShortDuration(entry.totalSeconds)

        return (
          <div key={index} className="flex items-center gap-3">
            {/* Label */}
            <div className="w-16 text-xs text-muted-foreground text-right shrink-0">{label}</div>

            {/* Bar container */}
            <div className="flex-1 h-6 bg-muted/50 rounded-md overflow-hidden relative">
              {/* Bar fill */}
              <div
                className="h-full bg-primary transition-all duration-300 rounded-md"
                style={{
                  width: `${Math.max(percentage, entry.totalSeconds > 0 ? 2 : 0)}%`,
                  opacity: entry.totalSeconds > 0 ? 0.7 + (percentage / 100) * 0.3 : 0.3,
                }}
              />

              {/* Time value inside bar or beside it */}
              <span
                className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium ${
                  percentage > 20 ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
                style={{
                  right: percentage > 20 ? undefined : '-2.5rem',
                  left: percentage > 20 ? 'auto' : undefined,
                }}
              >
                {formattedTime}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Display for today's study time with visual indicator
 */
function TodayTimeDisplay() {
  const isHydrated = useHydration()
  const todayTime = useSessionTimeStore((state) => state.getTodayTime())
  const sessionStartTime = useSessionTimeStore((state) => state.sessionStartTime)

  const isActive = sessionStartTime !== null
  const displayTime = isHydrated ? todayTime : 0

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isActive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-primary/10'
        }`}
      >
        <Clock
          className={`size-6 ${isActive ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}
          aria-hidden="true"
        />
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Today</div>
        <div className="text-2xl font-semibold">{formatDuration(displayTime)}</div>
        {isActive && (
          <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Session active
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Period selector buttons
 */
function PeriodSelector({
  selected,
  onChange,
}: {
  selected: TimePeriod
  onChange: (period: TimePeriod) => void
}) {
  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'day', label: 'Days' },
    { value: 'week', label: 'Weeks' },
    { value: 'month', label: 'Months' },
  ]

  return (
    <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => onChange(period.value)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            selected === period.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  )
}

/**
 * Main study time card component
 */
export function StudyTimeCard() {
  const [period, setPeriod] = useState<TimePeriod>('day')
  const isHydrated = useHydration()

  const dailyTimes = useSessionTimeStore((state) => state.dailyTimes)
  const getWeekTime = useSessionTimeStore((state) => state.getWeekTime)
  const getMonthTime = useSessionTimeStore((state) => state.getMonthTime)
  const getTotalTime = useSessionTimeStore((state) => state.getTotalTime)

  // Get aggregated data based on selected period
  const getChartData = (): TimeEntry[] | WeekEntry[] | MonthEntry[] => {
    if (!isHydrated) return []

    switch (period) {
      case 'day':
        return aggregateByDay(dailyTimes, 7) // Last 7 days
      case 'week':
        return aggregateByWeek(dailyTimes, 4) // Last 4 weeks
      case 'month':
        return aggregateByMonth(dailyTimes, 3) // Last 3 months
      default:
        return []
    }
  }

  // Get summary stats
  const weekTime = isHydrated ? getWeekTime() : 0
  const monthTime = isHydrated ? getMonthTime() : 0
  const totalTime = isHydrated ? getTotalTime() : 0

  const chartData = getChartData()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" aria-hidden="true" />
              Study Time
            </CardTitle>
            <CardDescription>Track your study sessions over time</CardDescription>
          </div>
          <PeriodSelector selected={period} onChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's time with active indicator */}
        <TodayTimeDisplay />

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
              <Calendar className="size-3" aria-hidden="true" />
              This Week
            </div>
            <div className="text-lg font-semibold">{formatDuration(weekTime)}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
              <Calendar className="size-3" aria-hidden="true" />
              This Month
            </div>
            <div className="text-lg font-semibold">{formatDuration(monthTime)}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
              <Clock className="size-3" aria-hidden="true" />
              All Time
            </div>
            <div className="text-lg font-semibold">{formatDuration(totalTime)}</div>
          </div>
        </div>

        {/* Bar chart */}
        <div>
          <h4 className="text-sm font-medium mb-3">
            {period === 'day' && 'Last 7 Days'}
            {period === 'week' && 'Last 4 Weeks'}
            {period === 'month' && 'Last 3 Months'}
          </h4>
          <TimeBarChart data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}
