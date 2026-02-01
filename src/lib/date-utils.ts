/**
 * Date utilities using local timezone for streak calculations
 *
 * These utilities ensure streak calculations use the user's local timezone
 * rather than UTC. This prevents the bug where a user studying at 11 PM
 * local time in UTC-5 would get a date from the next day (UTC).
 */

/**
 * Get current date as YYYY-MM-DD in local timezone
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get yesterday's date as YYYY-MM-DD in local timezone
 */
export function getYesterdayDateString(): string {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return getLocalDateString(yesterday)
}

/**
 * Calculate days between two date strings (YYYY-MM-DD format)
 * Returns positive number if date1 is before date2
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1 + 'T00:00:00')
  const d2 = new Date(date2 + 'T00:00:00')
  const diffTime = d2.getTime() - d1.getTime()
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Check if a date string is today (local timezone)
 */
export function isToday(dateString: string): boolean {
  return dateString === getLocalDateString()
}

/**
 * Check if a date string is yesterday (local timezone)
 */
export function isYesterday(dateString: string): boolean {
  return dateString === getYesterdayDateString()
}
