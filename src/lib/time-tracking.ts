/**
 * Time tracking utility functions for aggregating and formatting study time data
 */

export interface TimeEntry {
  date: string // ISO date (YYYY-MM-DD)
  totalSeconds: number
}

export interface WeekEntry {
  week: string // Format: "Week of MMM D"
  totalSeconds: number
}

export interface MonthEntry {
  month: string // Format: "MMM YYYY"
  totalSeconds: number
}

/**
 * Get the start of a week (Sunday) for a given date
 */
function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Format a date as "Week of MMM D"
 */
function formatWeekLabel(date: Date): string {
  const weekStart = getWeekStart(date)
  return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
}

/**
 * Format a date as "MMM YYYY"
 */
function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Aggregate time entries by day for the last N days
 * Returns entries for each day, even if no time was recorded (0 seconds)
 */
export function aggregateByDay(entries: TimeEntry[], days: number): TimeEntry[] {
  const result: TimeEntry[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Create a map of existing entries for quick lookup
  const entryMap = new Map<string, number>()
  for (const entry of entries) {
    entryMap.set(entry.date, entry.totalSeconds)
  }

  // Generate entries for each day
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    result.push({
      date: dateStr,
      totalSeconds: entryMap.get(dateStr) || 0,
    })
  }

  return result
}

/**
 * Aggregate time entries by week for the last N weeks
 * Returns one entry per week with the total seconds for that week
 */
export function aggregateByWeek(entries: TimeEntry[], weeks: number): WeekEntry[] {
  const result: WeekEntry[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const currentWeekStart = getWeekStart(today)

  // Create a map of week start date string -> total seconds
  const weekMap = new Map<string, number>()

  for (const entry of entries) {
    const entryDate = new Date(entry.date + 'T00:00:00')
    const weekStart = getWeekStart(entryDate)
    const weekKey = weekStart.toISOString().split('T')[0]
    weekMap.set(weekKey, (weekMap.get(weekKey) || 0) + entry.totalSeconds)
  }

  // Generate entries for each week
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(currentWeekStart)
    weekStart.setDate(weekStart.getDate() - i * 7)
    const weekKey = weekStart.toISOString().split('T')[0]
    result.push({
      week: formatWeekLabel(weekStart),
      totalSeconds: weekMap.get(weekKey) || 0,
    })
  }

  return result
}

/**
 * Aggregate time entries by month for the last N months
 * Returns one entry per month with the total seconds for that month
 */
export function aggregateByMonth(entries: TimeEntry[], months: number): MonthEntry[] {
  const result: MonthEntry[] = []
  const today = new Date()

  // Create a map of "YYYY-MM" -> total seconds
  const monthMap = new Map<string, number>()

  for (const entry of entries) {
    const entryDate = new Date(entry.date + 'T00:00:00')
    const monthKey = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, '0')}`
    monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + entry.totalSeconds)
  }

  // Generate entries for each month
  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
    result.push({
      month: formatMonthLabel(monthDate),
      totalSeconds: monthMap.get(monthKey) || 0,
    })
  }

  return result
}

/**
 * Format duration in seconds to a human-readable string
 * Examples: "1h 23m", "45m", "< 1m"
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return '< 1m'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours === 0) {
    return `${minutes}m`
  }

  if (minutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${minutes}m`
}

/**
 * Format duration for chart labels (compact format)
 * Examples: "1.5h", "45m", "0m"
 */
export function formatShortDuration(seconds: number): string {
  if (seconds < 60) {
    return '0m'
  }

  const hours = seconds / 3600

  if (hours >= 1) {
    // Round to one decimal place
    const roundedHours = Math.round(hours * 10) / 10
    return `${roundedHours}h`
  }

  const minutes = Math.floor(seconds / 60)
  return `${minutes}m`
}

/**
 * Get the day name (short) for a date string
 */
export function getDayName(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}
