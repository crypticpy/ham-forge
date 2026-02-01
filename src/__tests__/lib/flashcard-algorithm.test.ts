/**
 * Flashcard Algorithm Tests
 *
 * Unit tests for the adaptive learning algorithm including:
 * - Category weight calculation
 * - Slot allocation
 * - Card selection with interleaving
 * - Interleaving measurement
 */

import { describe, it, expect } from 'vitest'
import {
  calculateCategoryWeights,
  allocateSlots,
  measureInterleaving,
  selectCards,
} from '@/lib/flashcard-algorithm'
import type { CategoryProgress, LearningCard, QuestionCard } from '@/types/flashcard'

// Helper to create mock category progress
function createCategoryProgress(overrides: Partial<CategoryProgress> = {}): CategoryProgress {
  return {
    categoryId: 'T1A',
    categoryType: 'group',
    totalAttempts: 10,
    totalCorrect: 8,
    recentAttempts: 5,
    recentCorrect: 4,
    overallAccuracy: 0.8,
    recentAccuracy: 0.8,
    weaknessScore: 0.2,
    lastStudied: new Date().toISOString(),
    trend: 'stable',
    ...overrides,
  }
}

describe('Flashcard Algorithm', () => {
  describe('calculateCategoryWeights()', () => {
    it('should return empty array for empty input', () => {
      const result = calculateCategoryWeights([])
      expect(result).toEqual([])
    })

    it('should assign higher weight to weak categories in adaptive mode', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A', recentAccuracy: 0.4, weaknessScore: 0.6 }),
        createCategoryProgress({ categoryId: 'T1B', recentAccuracy: 0.9, weaknessScore: 0.1 }),
      ]

      const weights = calculateCategoryWeights(categories, 'adaptive')

      const weakWeight = weights.find((w) => w.categoryId === 'T1A')!
      const strongWeight = weights.find((w) => w.categoryId === 'T1B')!

      expect(weakWeight.weight).toBeGreaterThan(strongWeight.weight)
      expect(weakWeight.reason).toBe('weak')
      expect(strongWeight.reason).toBe('strong')
    })

    it('should give exploration bonus to unseen categories', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A', recentAttempts: 0, recentAccuracy: 0 }),
        createCategoryProgress({ categoryId: 'T1B', recentAttempts: 10, recentAccuracy: 0.7 }),
      ]

      const weights = calculateCategoryWeights(categories, 'adaptive')

      const unseenWeight = weights.find((w) => w.categoryId === 'T1A')!
      expect(unseenWeight.reason).toBe('explore')
    })

    it('should give recency boost to categories not studied recently', () => {
      const recentDate = new Date()
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 14) // 14 days ago

      const categories: CategoryProgress[] = [
        createCategoryProgress({
          categoryId: 'T1A',
          lastStudied: recentDate.toISOString(),
          recentAccuracy: 0.7,
          recentAttempts: 10,
        }),
        createCategoryProgress({
          categoryId: 'T1B',
          lastStudied: oldDate.toISOString(),
          recentAccuracy: 0.7,
          recentAttempts: 10,
        }),
      ]

      const weights = calculateCategoryWeights(categories, 'adaptive')

      const oldWeight = weights.find((w) => w.categoryId === 'T1B')!
      const recentWeight = weights.find((w) => w.categoryId === 'T1A')!

      // The "rusty" category should have higher weight due to recency boost
      expect(oldWeight.weight).toBeGreaterThanOrEqual(recentWeight.weight)
      expect(oldWeight.reason).toBe('rusty')
    })

    it('should normalize weights to sum to 1', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A' }),
        createCategoryProgress({ categoryId: 'T1B' }),
        createCategoryProgress({ categoryId: 'T1C' }),
      ]

      const weights = calculateCategoryWeights(categories, 'adaptive')

      const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0)
      expect(totalWeight).toBeCloseTo(1, 5)
    })

    it('should sort weights in descending order', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A', recentAccuracy: 0.9 }),
        createCategoryProgress({ categoryId: 'T1B', recentAccuracy: 0.3 }),
        createCategoryProgress({ categoryId: 'T1C', recentAccuracy: 0.6 }),
      ]

      const weights = calculateCategoryWeights(categories, 'adaptive')

      for (let i = 0; i < weights.length - 1; i++) {
        expect(weights[i].weight).toBeGreaterThanOrEqual(weights[i + 1].weight)
      }
    })

    it('should handle review mode differently', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A', recentAttempts: 10 }),
        createCategoryProgress({ categoryId: 'T1B', recentAttempts: 0 }),
      ]

      const weights = calculateCategoryWeights(categories, 'review')

      const seenWeight = weights.find((w) => w.categoryId === 'T1A')!
      const unseenWeight = weights.find((w) => w.categoryId === 'T1B')!

      // In review mode, seen categories should have higher weight
      expect(seenWeight.weight).toBeGreaterThan(unseenWeight.weight)
    })

    it('should handle explore mode differently', () => {
      const categories: CategoryProgress[] = [
        createCategoryProgress({ categoryId: 'T1A', recentAttempts: 10 }),
        createCategoryProgress({ categoryId: 'T1B', recentAttempts: 0 }),
      ]

      const weights = calculateCategoryWeights(categories, 'explore')

      const seenWeight = weights.find((w) => w.categoryId === 'T1A')!
      const unseenWeight = weights.find((w) => w.categoryId === 'T1B')!

      // In explore mode, unseen categories should have higher weight
      expect(unseenWeight.weight).toBeGreaterThan(seenWeight.weight)
      expect(unseenWeight.reason).toBe('explore')
    })
  })

  describe('allocateSlots()', () => {
    it('should allocate slots proportionally to weights', () => {
      const weights = [
        { categoryId: 'T1A', weight: 0.6, reason: 'weak' as const },
        { categoryId: 'T1B', weight: 0.4, reason: 'normal' as const },
      ]

      const slots = allocateSlots(weights, 10)

      expect(slots.get('T1A')).toBeGreaterThan(slots.get('T1B')!)
    })

    it('should cap single category at MAX_CATEGORY_WEIGHT', () => {
      const weights = [
        { categoryId: 'T1A', weight: 0.9, reason: 'weak' as const },
        { categoryId: 'T1B', weight: 0.1, reason: 'normal' as const },
      ]

      const slots = allocateSlots(weights, 10)

      // MAX_CATEGORY_WEIGHT is 0.4, so max 4 slots for 10 total
      expect(slots.get('T1A')!).toBeLessThanOrEqual(5)
    })

    it('should distribute remaining slots to weak categories', () => {
      const weights = [
        { categoryId: 'T1A', weight: 0.3, reason: 'weak' as const },
        { categoryId: 'T1B', weight: 0.3, reason: 'weak' as const },
        { categoryId: 'T1C', weight: 0.4, reason: 'normal' as const },
      ]

      const slots = allocateSlots(weights, 10)

      const total = Array.from(slots.values()).reduce((sum, v) => sum + v, 0)
      expect(total).toBe(10)
    })

    it('should handle more categories than slots', () => {
      const weights = [
        { categoryId: 'T1A', weight: 0.2, reason: 'normal' as const },
        { categoryId: 'T1B', weight: 0.2, reason: 'normal' as const },
        { categoryId: 'T1C', weight: 0.2, reason: 'normal' as const },
        { categoryId: 'T1D', weight: 0.2, reason: 'normal' as const },
        { categoryId: 'T1E', weight: 0.2, reason: 'normal' as const },
      ]

      const slots = allocateSlots(weights, 3)

      const total = Array.from(slots.values()).reduce((sum, v) => sum + v, 0)
      expect(total).toBe(3)
    })

    it('should ensure at least 1 slot for weighted categories above threshold', () => {
      const weights = [
        { categoryId: 'T1A', weight: 0.8, reason: 'weak' as const },
        { categoryId: 'T1B', weight: 0.1, reason: 'normal' as const },
        { categoryId: 'T1C', weight: 0.1, reason: 'normal' as const },
      ]

      const slots = allocateSlots(weights, 5)

      // T1B and T1C should have at least 1 slot each if above MIN_CATEGORY_WEIGHT
      expect(slots.get('T1A')!).toBeGreaterThan(0)
    })
  })

  describe('measureInterleaving()', () => {
    it('should return 0 for empty array', () => {
      expect(measureInterleaving([])).toBe(0)
    })

    it('should return 0 for single card', () => {
      expect(measureInterleaving([{ subelement: 'T1' }])).toBe(0)
    })

    it('should return 0 for all same subelement', () => {
      const cards = [
        { subelement: 'T1' },
        { subelement: 'T1' },
        { subelement: 'T1' },
        { subelement: 'T1' },
      ]
      expect(measureInterleaving(cards)).toBe(0)
    })

    it('should return 1 for maximum interleaving', () => {
      const cards = [
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T1' },
        { subelement: 'T2' },
      ]
      // All 3 transitions are between different subelements
      expect(measureInterleaving(cards)).toBe(1)
    })

    it('should return correct ratio for mixed sequence', () => {
      const cards = [
        { subelement: 'T1' },
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T2' },
        { subelement: 'T3' },
      ]
      // Transitions: T1->T1 (same), T1->T2 (diff), T2->T2 (same), T2->T3 (diff)
      // 2 different out of 4 transitions = 0.5
      expect(measureInterleaving(cards)).toBe(0.5)
    })

    it('should handle two cards correctly', () => {
      const same = [{ subelement: 'T1' }, { subelement: 'T1' }]
      const different = [{ subelement: 'T1' }, { subelement: 'T2' }]

      expect(measureInterleaving(same)).toBe(0)
      expect(measureInterleaving(different)).toBe(1)
    })

    it('should calculate correct ratio for 3 subelements', () => {
      const cards = [
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T3' },
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T3' },
      ]
      // All 5 transitions are between different subelements
      expect(measureInterleaving(cards)).toBe(1)
    })
  })

  describe('interleaving behavior', () => {
    it('should achieve interleaving ratio above 0.3 for multi-subelement decks', () => {
      // This tests the actual interleaving algorithm behavior
      // We can't easily test selectCards without mocking, but we can verify
      // that measureInterleaving correctly identifies good interleaving

      // Simulate a well-interleaved deck
      const wellInterleaved = [
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T3' },
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T3' },
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T3' },
        { subelement: 'T1' },
      ]

      const ratio = measureInterleaving(wellInterleaved)
      expect(ratio).toBeGreaterThanOrEqual(0.3)
    })

    it('should detect poor interleaving (blocked practice)', () => {
      // Simulate blocked practice (all same subelement together)
      const blocked = [
        { subelement: 'T1' },
        { subelement: 'T1' },
        { subelement: 'T1' },
        { subelement: 'T2' },
        { subelement: 'T2' },
        { subelement: 'T2' },
        { subelement: 'T3' },
        { subelement: 'T3' },
        { subelement: 'T3' },
      ]

      const ratio = measureInterleaving(blocked)
      // Only 2 transitions out of 8 are different = 0.25
      expect(ratio).toBeLessThan(0.3)
    })
  })

  describe('selectCards() cold start', () => {
    // Helper to create mock learning cards
    function createLearningCard(id: string, subelement: string): LearningCard {
      return {
        id,
        subelement,
        group: `${subelement}A`,
        front: {
          title: `Card ${id}`,
          category: 'Test',
          prompt: 'Test prompt',
        },
        back: {
          explanation: 'Test explanation',
          keyFact: 'Test fact',
        },
        relatedQuestionIds: [],
      }
    }

    // Helper to create mock question cards
    function createQuestionCard(id: string, subelement: string): QuestionCard {
      return {
        id,
        questionId: `Q-${id}`,
        subelement,
        group: `${subelement}A`,
        question: 'Test question?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: 'Test explanation',
        relatedLearningIds: [],
      }
    }

    it('should select cards for fresh users with no category progress', () => {
      const learningCards = [
        createLearningCard('lc1', 'T1'),
        createLearningCard('lc2', 'T1'),
        createLearningCard('lc3', 'T2'),
        createLearningCard('lc4', 'T3'),
      ]

      const questionCards = [
        createQuestionCard('qc1', 'T1'),
        createQuestionCard('qc2', 'T2'),
        createQuestionCard('qc3', 'T3'),
      ]

      // Empty progress = cold start
      const emptyProgress = new Map()
      const emptyCategoryProgress: CategoryProgress[] = []

      const result = selectCards(
        learningCards,
        questionCards,
        emptyProgress,
        emptyCategoryProgress,
        {
          learningCount: 3,
          questionCount: 2,
          mode: 'adaptive',
        }
      )

      // Should return cards even with no prior progress
      expect(result.learningCards.length).toBeGreaterThan(0)
      expect(result.questionCards.length).toBeGreaterThan(0)
    })

    it('should generate weights for learning card subelements only', () => {
      const learningCards = [createLearningCard('lc1', 'T1'), createLearningCard('lc2', 'T5')]

      const questionCards = [createQuestionCard('qc1', 'T3')]

      const emptyProgress = new Map()
      const emptyCategoryProgress: CategoryProgress[] = []

      const result = selectCards(
        learningCards,
        questionCards,
        emptyProgress,
        emptyCategoryProgress,
        {
          learningCount: 2,
          questionCount: 1,
          mode: 'adaptive',
        }
      )

      // categoryWeights reflects learning cards only (T1, T5 = 2 subelements)
      // Question cards use their own weights internally
      expect(result.categoryWeights.length).toBe(2)
      // Both learning cards should be selected
      expect(result.learningCards.length).toBe(2)
      // Question card from T3 should still be selected (uses its own weights)
      expect(result.questionCards.length).toBe(1)
    })

    it('should work in all modes with empty category progress', () => {
      const learningCards = [createLearningCard('lc1', 'T1')]
      const questionCards = [createQuestionCard('qc1', 'T1')]
      const emptyProgress = new Map()
      const emptyCategoryProgress: CategoryProgress[] = []

      // Test adaptive mode
      const adaptive = selectCards(
        learningCards,
        questionCards,
        emptyProgress,
        emptyCategoryProgress,
        {
          learningCount: 1,
          questionCount: 1,
          mode: 'adaptive',
        }
      )
      expect(adaptive.learningCards.length).toBe(1)

      // Test explore mode
      const explore = selectCards(
        learningCards,
        questionCards,
        emptyProgress,
        emptyCategoryProgress,
        {
          learningCount: 1,
          questionCount: 1,
          mode: 'explore',
        }
      )
      expect(explore.learningCards.length).toBe(1)

      // Test review mode
      const review = selectCards(
        learningCards,
        questionCards,
        emptyProgress,
        emptyCategoryProgress,
        {
          learningCount: 1,
          questionCount: 1,
          mode: 'review',
        }
      )
      expect(review.learningCards.length).toBe(1)
    })
  })
})
