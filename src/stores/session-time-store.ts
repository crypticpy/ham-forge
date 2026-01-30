'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TimeEntry } from '@/lib/time-tracking'

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

interface SessionTimeState {
  // Track active session
  sessionStartTime: number | null // timestamp ms
  currentSessionSeconds: number

  // Historical data
  dailyTimes: TimeEntry[] // Keep last 90 days

  // Actions
  startSession: () => void
  endSession: () => void
  tick: () => void // Called every second while session active
  getTodayTime: () => number
  getWeekTime: () => number
  getMonthTime: () => number
  getTotalTime: () => number
}

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Get the start of the current week (Sunday)
 */
function getWeekStartDate(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const day = today.getDay()
  today.setDate(today.getDate() - day)
  return today
}

/**
 * Get the start of the current month
 */
function getMonthStartDate(): Date {
  const today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), 1)
}

/**
 * Check if a date string is within a date range
 */
function isDateInRange(dateStr: string, startDate: Date): boolean {
  const date = new Date(dateStr + 'T00:00:00')
  return date >= startDate
}

/**
 * Prune entries older than 90 days
 */
function pruneOldEntries(entries: TimeEntry[]): TimeEntry[] {
  const cutoffDate = new Date()
  cutoffDate.setTime(cutoffDate.getTime() - NINETY_DAYS_MS)
  cutoffDate.setHours(0, 0, 0, 0)
  const cutoffStr = cutoffDate.toISOString().split('T')[0]

  return entries.filter((entry) => entry.date >= cutoffStr)
}

export const useSessionTimeStore = create<SessionTimeState>()(
  persist(
    (set, get) => ({
      sessionStartTime: null,
      currentSessionSeconds: 0,
      dailyTimes: [],

      startSession: () => {
        const { sessionStartTime } = get()
        // Don't start a new session if one is already active
        if (sessionStartTime !== null) return

        set({
          sessionStartTime: Date.now(),
          currentSessionSeconds: 0,
        })
      },

      endSession: () => {
        const { sessionStartTime, dailyTimes } = get()

        // No active session to end
        if (sessionStartTime === null) return

        // Calculate elapsed time
        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000)
        const todayStr = getTodayDateString()

        // Update or create today's entry
        let updatedTimes = [...dailyTimes]
        const todayIndex = updatedTimes.findIndex((entry) => entry.date === todayStr)

        if (todayIndex >= 0) {
          updatedTimes[todayIndex] = {
            ...updatedTimes[todayIndex],
            totalSeconds: updatedTimes[todayIndex].totalSeconds + elapsed,
          }
        } else {
          updatedTimes.push({
            date: todayStr,
            totalSeconds: elapsed,
          })
        }

        // Prune old entries
        updatedTimes = pruneOldEntries(updatedTimes)

        set({
          sessionStartTime: null,
          currentSessionSeconds: 0,
          dailyTimes: updatedTimes,
        })
      },

      tick: () => {
        const { sessionStartTime } = get()
        if (sessionStartTime === null) return

        const elapsed = Math.floor((Date.now() - sessionStartTime) / 1000)
        set({ currentSessionSeconds: elapsed })
      },

      getTodayTime: () => {
        const { dailyTimes, currentSessionSeconds, sessionStartTime } = get()
        const todayStr = getTodayDateString()
        const todayEntry = dailyTimes.find((entry) => entry.date === todayStr)
        const savedTime = todayEntry?.totalSeconds || 0

        // Include current session time if active
        if (sessionStartTime !== null) {
          return savedTime + currentSessionSeconds
        }

        return savedTime
      },

      getWeekTime: () => {
        const { dailyTimes, currentSessionSeconds, sessionStartTime } = get()
        const weekStart = getWeekStartDate()

        let total = dailyTimes
          .filter((entry) => isDateInRange(entry.date, weekStart))
          .reduce((sum, entry) => sum + entry.totalSeconds, 0)

        // Include current session time if active
        if (sessionStartTime !== null) {
          total += currentSessionSeconds
        }

        return total
      },

      getMonthTime: () => {
        const { dailyTimes, currentSessionSeconds, sessionStartTime } = get()
        const monthStart = getMonthStartDate()

        let total = dailyTimes
          .filter((entry) => isDateInRange(entry.date, monthStart))
          .reduce((sum, entry) => sum + entry.totalSeconds, 0)

        // Include current session time if active
        if (sessionStartTime !== null) {
          total += currentSessionSeconds
        }

        return total
      },

      getTotalTime: () => {
        const { dailyTimes, currentSessionSeconds, sessionStartTime } = get()

        let total = dailyTimes.reduce((sum, entry) => sum + entry.totalSeconds, 0)

        // Include current session time if active
        if (sessionStartTime !== null) {
          total += currentSessionSeconds
        }

        return total
      },
    }),
    {
      name: 'hamforge-time',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
