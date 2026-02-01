'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ActivityType = 'practice' | 'exam' | 'learn' | 'radio'

export interface LastActivity {
  type: ActivityType
  path: string // Full route path
  label: string // Human-readable context, e.g., "Practice Session - Question 5 of 20"
  timestamp: string // ISO datetime
  metadata?: {
    // Practice context
    questionIndex?: number
    totalQuestions?: number
    // Session completion status - true means session was finished (all questions answered or time expired)
    // When isComplete is true, "continue" prompts should not show; recommend next activity instead
    isComplete?: boolean
    // Completion stats for intelligent recommendations
    accuracy?: number
    // Module context
    moduleId?: string
    sectionId?: string
    sectionTitle?: string
    // Exam context
    examId?: string
  }
}

interface ActivityState {
  lastActivity: LastActivity | null
  recordActivity: (activity: Omit<LastActivity, 'timestamp'>) => void
  clearActivity: () => void
  hasRecentActivity: () => boolean // Within last 24 hours
  getTimeSinceActivity: () => string // "5 minutes ago", "2 hours ago", etc.
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set, get) => ({
      lastActivity: null,

      recordActivity: (activity) =>
        set({
          lastActivity: {
            ...activity,
            timestamp: new Date().toISOString(),
          },
        }),

      clearActivity: () =>
        set({
          lastActivity: null,
        }),

      hasRecentActivity: () => {
        const { lastActivity } = get()
        if (!lastActivity) return false

        const activityTime = new Date(lastActivity.timestamp).getTime()
        const now = Date.now()
        const twentyFourHours = 24 * 60 * 60 * 1000

        return now - activityTime < twentyFourHours
      },

      getTimeSinceActivity: () => {
        const { lastActivity } = get()
        if (!lastActivity) return ''

        const activityTime = new Date(lastActivity.timestamp).getTime()
        const now = Date.now()
        const diffMs = now - activityTime

        const minutes = Math.floor(diffMs / (1000 * 60))
        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (minutes < 1) {
          return 'just now'
        } else if (minutes < 60) {
          return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
        } else if (hours < 24) {
          return `${hours} hour${hours === 1 ? '' : 's'} ago`
        } else if (days === 1) {
          return 'yesterday'
        } else if (days < 7) {
          return `${days} days ago`
        } else {
          return 'last week'
        }
      },
    }),
    {
      name: 'hamforge-activity',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
