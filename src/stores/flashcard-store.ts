'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  FlashcardProgress,
  CategoryProgress,
  SessionSummary,
  SkillType,
  SkillMastery,
} from '@/types/flashcard'
import { getLocalDateString, daysBetween } from '@/lib/date-utils'

// Interval schedule (days) by box level
const BOX_INTERVALS = [0, 1, 3, 7, 21] as const

interface FlashcardState {
  // Progress data
  cardProgress: Record<string, FlashcardProgress>
  categoryProgress: Record<string, CategoryProgress>

  // Skill progress (procedural skills tracked separately)
  skillProgress: Record<SkillType, SkillMastery>

  // Session history
  sessionHistory: SessionSummary[]
  lastSessionDate: string | null

  // Stats
  totalStudyTimeMs: number
  totalCardsStudied: number
  currentStreak: number
  longestStreak: number

  // Streak freeze tokens (motivation psychology feature)
  /** Current freeze tokens available (max 2) */
  freezeTokens: number
  /** Lifetime total freeze tokens earned */
  freezeTokensEarned: number
  /** ISO date string of last freeze token use */
  lastFreezeUsed: string | null

  // Actions
  getCardProgress: (cardId: string) => FlashcardProgress | null
  getCategoryProgress: (categoryId: string) => CategoryProgress | null
  getAllCategoryProgress: () => CategoryProgress[]

  updateCardProgress: (
    cardId: string,
    cardType: 'learning' | 'question',
    subelement: string,
    group: string,
    passed: boolean,
    timeMs?: number
  ) => void

  updateCategoryProgress: (categoryId: string, passed: boolean) => void

  recordSession: (summary: SessionSummary) => void

  // Skill tracking actions
  /** Update progress for a procedural skill */
  updateSkillProgress: (skill: SkillType, passed: boolean) => void
  /** Get current mastery level for a skill (1-5) */
  getSkillLevel: (skill: SkillType) => number

  // Streak freeze actions
  /** Manually earn a freeze token. Returns true if token was earned (not at max). */
  earnFreezeToken: () => boolean
  /** Manually use a freeze token. Returns true if token was used successfully. */
  useFreezeToken: () => boolean

  // Queries
  getDueCards: (cardType: 'learning' | 'question') => string[]
  getWeakCategories: (threshold?: number) => CategoryProgress[]
  getCardsByCategory: (categoryId: string, cardType: 'learning' | 'question') => FlashcardProgress[]

  // Reset
  resetProgress: () => void
  /** Reset only skill progress while preserving other data */
  resetSkillProgress: () => void
}

/** Default state for a new skill */
const initialSkillMastery: SkillMastery = {
  attempts: 0,
  correct: 0,
  accuracy: 0,
  lastPracticed: null,
  level: 1,
}

/** Initial skill progress for all procedural skills */
const initialSkillProgress: Record<SkillType, SkillMastery> = {
  phonetic: { ...initialSkillMastery },
  rst: { ...initialSkillMastery },
  qso: { ...initialSkillMastery },
  'q-codes': { ...initialSkillMastery },
}

const initialState = {
  cardProgress: {},
  categoryProgress: {},
  skillProgress: initialSkillProgress,
  sessionHistory: [],
  lastSessionDate: null,
  totalStudyTimeMs: 0,
  totalCardsStudied: 0,
  currentStreak: 0,
  longestStreak: 0,
  freezeTokens: 0,
  freezeTokensEarned: 0,
  lastFreezeUsed: null,
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      getCardProgress: (cardId) => {
        return get().cardProgress[cardId] || null
      },

      getCategoryProgress: (categoryId) => {
        return get().categoryProgress[categoryId] || null
      },

      getAllCategoryProgress: () => {
        return Object.values(get().categoryProgress)
      },

      updateCardProgress: (cardId, cardType, subelement, group, passed, timeMs) => {
        set((state) => {
          const existing = state.cardProgress[cardId]
          const now = new Date().toISOString()

          let newProgress: FlashcardProgress

          if (existing) {
            const newAttempts = existing.attempts + 1
            const newCorrect = existing.correctCount + (passed ? 1 : 0)
            const newStreak = passed ? existing.streak + 1 : 0
            const newBox = passed ? Math.min(existing.box + 1, 5) : 1 // Back to box 1 on fail

            // Calculate mastery score
            const accuracy = newCorrect / newAttempts
            const streakBonus = Math.min(newStreak * 5, 20)
            const boxBonus = (newBox - 1) * 10
            const masteryScore = Math.round(accuracy * 40 + streakBonus + boxBonus)

            // Calculate next review date
            const intervalDays = BOX_INTERVALS[newBox - 1]
            const nextReview = new Date(
              Date.now() + intervalDays * 24 * 60 * 60 * 1000
            ).toISOString()

            // Update average time
            const avgTime = timeMs
              ? existing.averageTimeMs
                ? Math.round((existing.averageTimeMs + timeMs) / 2)
                : timeMs
              : existing.averageTimeMs

            newProgress = {
              ...existing,
              attempts: newAttempts,
              correctCount: newCorrect,
              streak: newStreak,
              box: newBox,
              masteryScore,
              lastSeen: now,
              nextReview,
              averageTimeMs: avgTime,
            }
          } else {
            // New card
            const box = passed ? 2 : 1
            const intervalDays = BOX_INTERVALS[box - 1]
            const nextReview = new Date(
              Date.now() + intervalDays * 24 * 60 * 60 * 1000
            ).toISOString()

            newProgress = {
              cardId,
              cardType,
              subelement,
              group,
              box,
              attempts: 1,
              correctCount: passed ? 1 : 0,
              streak: passed ? 1 : 0,
              masteryScore: passed ? 55 : 0,
              lastSeen: now,
              nextReview,
              averageTimeMs: timeMs,
            }
          }

          return {
            cardProgress: {
              ...state.cardProgress,
              [cardId]: newProgress,
            },
            totalCardsStudied: state.totalCardsStudied + 1,
          }
        })

        // Also update category progress
        get().updateCategoryProgress(subelement, passed)
        get().updateCategoryProgress(group, passed)
      },

      updateCategoryProgress: (categoryId, passed) => {
        set((state) => {
          const existing = state.categoryProgress[categoryId]
          const now = new Date().toISOString()

          if (existing) {
            const newTotalAttempts = existing.totalAttempts + 1
            const newTotalCorrect = existing.totalCorrect + (passed ? 1 : 0)
            const newRecentAttempts = existing.recentAttempts + 1
            const newRecentCorrect = existing.recentCorrect + (passed ? 1 : 0)

            const overallAccuracy = newTotalCorrect / newTotalAttempts
            const recentAccuracy = newRecentAttempts > 0 ? newRecentCorrect / newRecentAttempts : 0
            const weaknessScore = 1 - recentAccuracy

            // Detect trend
            let trend: 'improving' | 'stable' | 'declining' = 'stable'
            if (recentAccuracy > existing.overallAccuracy + 0.1) {
              trend = 'improving'
            } else if (recentAccuracy < existing.overallAccuracy - 0.1) {
              trend = 'declining'
            }

            return {
              categoryProgress: {
                ...state.categoryProgress,
                [categoryId]: {
                  ...existing,
                  totalAttempts: newTotalAttempts,
                  totalCorrect: newTotalCorrect,
                  recentAttempts: newRecentAttempts,
                  recentCorrect: newRecentCorrect,
                  overallAccuracy,
                  recentAccuracy,
                  weaknessScore,
                  lastStudied: now,
                  trend,
                },
              },
            }
          } else {
            // New category
            const isSubelement = categoryId.length === 2 // T1, T2, etc.
            return {
              categoryProgress: {
                ...state.categoryProgress,
                [categoryId]: {
                  categoryId,
                  categoryType: isSubelement ? 'subelement' : 'group',
                  totalAttempts: 1,
                  totalCorrect: passed ? 1 : 0,
                  recentAttempts: 1,
                  recentCorrect: passed ? 1 : 0,
                  overallAccuracy: passed ? 1 : 0,
                  recentAccuracy: passed ? 1 : 0,
                  weaknessScore: passed ? 0 : 1,
                  lastStudied: now,
                  trend: 'stable',
                },
              },
            }
          }
        })
      },

      recordSession: (summary) => {
        set((state) => {
          const today = getLocalDateString()
          const lastDate = state.lastSessionDate

          let newStreak = state.currentStreak
          let newFreezeTokens = state.freezeTokens
          let newLastFreezeUsed = state.lastFreezeUsed
          let tokensEarned = state.freezeTokensEarned

          if (lastDate && lastDate !== today) {
            const daysDiff = daysBetween(lastDate, today)

            if (daysDiff === 1) {
              // Consecutive day - increment streak
              newStreak += 1
            } else if (daysDiff === 2 && state.freezeTokens > 0) {
              // Missed one day but have freeze token
              newFreezeTokens -= 1
              newLastFreezeUsed = today
              newStreak += 1
            } else if (daysDiff > 1) {
              // Streak broken
              newStreak = 1
            }
          } else if (!lastDate) {
            // First session ever
            newStreak = 1
          }
          // If lastDate === today, streak stays the same

          // Check if earned a new freeze token (every 7-day milestone)
          // Only earn if not at max (2 tokens)
          if (newStreak > 0 && newStreak % 7 === 0 && newFreezeTokens < 2) {
            newFreezeTokens += 1
            tokensEarned += 1
          }

          return {
            sessionHistory: [...state.sessionHistory.slice(-99), summary],
            lastSessionDate: today,
            totalStudyTimeMs: state.totalStudyTimeMs + summary.timeSpentMs,
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
            freezeTokens: newFreezeTokens,
            freezeTokensEarned: tokensEarned,
            lastFreezeUsed: newLastFreezeUsed,
          }
        })
      },

      getDueCards: (cardType) => {
        const now = Date.now()
        return Object.values(get().cardProgress)
          .filter((p) => p.cardType === cardType && new Date(p.nextReview).getTime() <= now)
          .map((p) => p.cardId)
      },

      getWeakCategories: (threshold = 0.5) => {
        return Object.values(get().categoryProgress).filter((p) => p.weaknessScore >= threshold)
      },

      getCardsByCategory: (categoryId, cardType) => {
        return Object.values(get().cardProgress).filter(
          (p) => p.cardType === cardType && (p.subelement === categoryId || p.group === categoryId)
        )
      },

      // Skill tracking actions
      updateSkillProgress: (skill, passed) => {
        set((state) => {
          const existing = state.skillProgress[skill]
          const newAttempts = existing.attempts + 1
          const newCorrect = existing.correct + (passed ? 1 : 0)
          const newAccuracy = newAttempts > 0 ? newCorrect / newAttempts : 0

          // Calculate level based on thresholds:
          // Level 1: < 10 attempts (beginner)
          // Level 2: 10+ attempts, 60%+ accuracy (novice)
          // Level 3: 25+ attempts, 75%+ accuracy (intermediate)
          // Level 4: 50+ attempts, 85%+ accuracy (proficient)
          // Level 5: 100+ attempts, 90%+ accuracy (expert)
          let newLevel: 1 | 2 | 3 | 4 | 5 = 1
          if (newAttempts >= 100 && newAccuracy >= 0.9) {
            newLevel = 5
          } else if (newAttempts >= 50 && newAccuracy >= 0.85) {
            newLevel = 4
          } else if (newAttempts >= 25 && newAccuracy >= 0.75) {
            newLevel = 3
          } else if (newAttempts >= 10 && newAccuracy >= 0.6) {
            newLevel = 2
          }

          return {
            skillProgress: {
              ...state.skillProgress,
              [skill]: {
                attempts: newAttempts,
                correct: newCorrect,
                accuracy: newAccuracy,
                lastPracticed: new Date().toISOString(),
                level: newLevel,
              },
            },
          }
        })
      },

      getSkillLevel: (skill) => {
        return get().skillProgress[skill]?.level ?? 1
      },

      // Streak freeze actions
      earnFreezeToken: () => {
        const state = get()
        if (state.freezeTokens >= 2) return false
        set({
          freezeTokens: state.freezeTokens + 1,
          freezeTokensEarned: state.freezeTokensEarned + 1,
        })
        return true
      },

      useFreezeToken: () => {
        const state = get()
        if (state.freezeTokens <= 0) return false
        set({
          freezeTokens: state.freezeTokens - 1,
          lastFreezeUsed: getLocalDateString(),
        })
        return true
      },

      resetProgress: () => {
        set(initialState)
      },

      resetSkillProgress: () => {
        set({
          skillProgress: {
            phonetic: { ...initialSkillMastery },
            rst: { ...initialSkillMastery },
            qso: { ...initialSkillMastery },
            'q-codes': { ...initialSkillMastery },
          },
        })
      },
    }),
    {
      name: 'hamforge-flashcards',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
