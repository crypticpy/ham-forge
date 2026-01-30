/**
 * Spaced Repetition Algorithm Tests
 *
 * Comprehensive unit tests for the SM-2 spaced repetition implementation
 */

import { describe, it, expect } from 'vitest'
import {
  calculateSM2,
  processAnswer,
  getMasteryStatus,
  isDue,
  calculatePriority,
  updateConfidenceHistory,
  getAverageConfidence,
  getInitialProgress,
  DEFAULT_EASE_FACTOR,
  MIN_EASE_FACTOR,
  DEFAULT_CONFIDENCE,
  MAX_CONFIDENCE_HISTORY,
  type SM2Input,
} from '@/lib/spaced-repetition'
import { daysFromNow, daysAgo } from '../utils'

describe('Spaced Repetition Algorithm', () => {
  describe('calculateSM2()', () => {
    describe('quality >= 3 (correct responses)', () => {
      it('should set interval to 1 day for first successful review (repetitions = 0)', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 0,
          easeFactor: DEFAULT_EASE_FACTOR,
          interval: 0,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(1)
      })

      it('should set interval to 6 days for second successful review (repetitions = 1)', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 1,
          easeFactor: DEFAULT_EASE_FACTOR,
          interval: 1,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(6)
      })

      it('should multiply interval by ease factor for subsequent reviews (repetitions >= 2)', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 2,
          easeFactor: 2.5,
          interval: 6,
        }
        const result = calculateSM2(input)
        // 6 * 2.5 = 15
        expect(result.interval).toBe(15)
      })

      it('should round interval to nearest integer', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 2,
          easeFactor: 2.3,
          interval: 7,
        }
        const result = calculateSM2(input)
        // 7 * 2.3 = 16.1 -> rounds to 16
        expect(result.interval).toBe(16)
      })
    })

    describe('quality < 3 (incorrect responses)', () => {
      it('should reset interval to 1 day on quality 0 (complete blackout)', () => {
        const input: SM2Input = {
          quality: 0,
          repetitions: 5,
          easeFactor: 2.8,
          interval: 30,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(1)
      })

      it('should reset interval to 1 day on quality 1', () => {
        const input: SM2Input = {
          quality: 1,
          repetitions: 3,
          easeFactor: 2.5,
          interval: 15,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(1)
      })

      it('should reset interval to 1 day on quality 2', () => {
        const input: SM2Input = {
          quality: 2,
          repetitions: 2,
          easeFactor: 2.5,
          interval: 6,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(1)
      })

      it('should preserve ease factor on incorrect response', () => {
        const input: SM2Input = {
          quality: 2,
          repetitions: 3,
          easeFactor: 2.7,
          interval: 15,
        }
        const result = calculateSM2(input)
        expect(result.easeFactor).toBe(2.7)
      })
    })

    describe('ease factor updates', () => {
      it('should increase ease factor for quality 5 (perfect recall)', () => {
        const input: SM2Input = {
          quality: 5,
          repetitions: 2,
          easeFactor: 2.5,
          interval: 6,
        }
        const result = calculateSM2(input)
        // EF' = 2.5 + (0.1 - (5 - 5) * (0.08 + (5 - 5) * 0.02))
        // EF' = 2.5 + (0.1 - 0 * 0.08) = 2.5 + 0.1 = 2.6
        expect(result.easeFactor).toBe(2.6)
      })

      it('should keep ease factor roughly stable for quality 4', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 2,
          easeFactor: 2.5,
          interval: 6,
        }
        const result = calculateSM2(input)
        // EF' = 2.5 + (0.1 - (5 - 4) * (0.08 + (5 - 4) * 0.02))
        // EF' = 2.5 + (0.1 - 1 * (0.08 + 0.02)) = 2.5 + (0.1 - 0.1) = 2.5
        expect(result.easeFactor).toBe(2.5)
      })

      it('should decrease ease factor for quality 3 (correct with difficulty)', () => {
        const input: SM2Input = {
          quality: 3,
          repetitions: 2,
          easeFactor: 2.5,
          interval: 6,
        }
        const result = calculateSM2(input)
        // EF' = 2.5 + (0.1 - (5 - 3) * (0.08 + (5 - 3) * 0.02))
        // EF' = 2.5 + (0.1 - 2 * (0.08 + 0.04)) = 2.5 + (0.1 - 0.24) = 2.36
        expect(result.easeFactor).toBeCloseTo(2.36, 2)
      })

      it('should enforce minimum ease factor of 1.3', () => {
        // Start with ease factor close to minimum and use low quality
        const input: SM2Input = {
          quality: 3,
          repetitions: 2,
          easeFactor: MIN_EASE_FACTOR,
          interval: 6,
        }
        const result = calculateSM2(input)
        expect(result.easeFactor).toBe(MIN_EASE_FACTOR)
      })

      it('should not decrease ease factor below minimum even with repeated low quality', () => {
        let currentEaseFactor = 1.5
        // Simulate multiple quality 3 reviews
        for (let i = 0; i < 10; i++) {
          const result = calculateSM2({
            quality: 3,
            repetitions: 2,
            easeFactor: currentEaseFactor,
            interval: 6,
          })
          currentEaseFactor = result.easeFactor
        }
        expect(currentEaseFactor).toBeGreaterThanOrEqual(MIN_EASE_FACTOR)
      })
    })

    describe('next review date calculation', () => {
      it('should set next review date based on calculated interval', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 1,
          easeFactor: 2.5,
          interval: 1,
        }
        const result = calculateSM2(input)

        const expectedDate = new Date()
        expectedDate.setDate(expectedDate.getDate() + 6)
        expectedDate.setHours(0, 0, 0, 0)

        expect(result.nextReview.getFullYear()).toBe(expectedDate.getFullYear())
        expect(result.nextReview.getMonth()).toBe(expectedDate.getMonth())
        expect(result.nextReview.getDate()).toBe(expectedDate.getDate())
      })

      it('should reset next review time to start of day', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 0,
          easeFactor: 2.5,
          interval: 0,
        }
        const result = calculateSM2(input)
        expect(result.nextReview.getHours()).toBe(0)
        expect(result.nextReview.getMinutes()).toBe(0)
        expect(result.nextReview.getSeconds()).toBe(0)
        expect(result.nextReview.getMilliseconds()).toBe(0)
      })
    })

    describe('mastery status transitions', () => {
      it('should return learning status for first review', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 0,
          easeFactor: 2.5,
          interval: 0,
        }
        const result = calculateSM2(input)
        expect(result.status).toBe('learning')
      })

      it('should return learning status for interval < 7', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 1,
          easeFactor: 2.5,
          interval: 1,
        }
        const result = calculateSM2(input)
        expect(result.interval).toBe(6)
        expect(result.status).toBe('learning')
      })

      it('should return review status for interval >= 7 and < 21', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 2,
          easeFactor: 2.0,
          interval: 6,
        }
        const result = calculateSM2(input)
        // 6 * 2.0 = 12
        expect(result.interval).toBe(12)
        expect(result.status).toBe('review')
      })

      it('should return mastered status for interval >= 21', () => {
        const input: SM2Input = {
          quality: 4,
          repetitions: 2,
          easeFactor: 4.0,
          interval: 6,
        }
        const result = calculateSM2(input)
        // 6 * 4.0 = 24
        expect(result.interval).toBe(24)
        expect(result.status).toBe('mastered')
      })
    })

    describe('all quality ratings (0-5)', () => {
      const baseInput = {
        repetitions: 2,
        easeFactor: 2.5,
        interval: 6,
      }

      it('should handle quality 0 (complete blackout)', () => {
        const result = calculateSM2({ ...baseInput, quality: 0 })
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBe(2.5) // Unchanged on failure
      })

      it('should handle quality 1 (incorrect but remembered)', () => {
        const result = calculateSM2({ ...baseInput, quality: 1 })
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBe(2.5)
      })

      it('should handle quality 2 (incorrect but seemed easy)', () => {
        const result = calculateSM2({ ...baseInput, quality: 2 })
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBe(2.5)
      })

      it('should handle quality 3 (correct with difficulty)', () => {
        const result = calculateSM2({ ...baseInput, quality: 3 })
        expect(result.interval).toBe(15) // 6 * 2.5 = 15
        expect(result.easeFactor).toBeCloseTo(2.36, 2)
      })

      it('should handle quality 4 (correct after hesitation)', () => {
        const result = calculateSM2({ ...baseInput, quality: 4 })
        expect(result.interval).toBe(15)
        expect(result.easeFactor).toBe(2.5)
      })

      it('should handle quality 5 (perfect recall)', () => {
        const result = calculateSM2({ ...baseInput, quality: 5 })
        expect(result.interval).toBe(15)
        expect(result.easeFactor).toBe(2.6)
      })
    })
  })

  describe('processAnswer()', () => {
    describe('correct answers with different confidence levels', () => {
      it('should process correct answer with low confidence (1) - lucky guess', () => {
        const result = processAnswer(true, undefined, 1)
        // Low confidence correct reduces interval boost
        expect(result.interval).toBeLessThanOrEqual(1)
        expect(result.easeFactor).toBeLessThan(DEFAULT_EASE_FACTOR)
      })

      it('should process correct answer with low confidence (2)', () => {
        const result = processAnswer(true, undefined, 2)
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBeLessThan(DEFAULT_EASE_FACTOR)
      })

      it('should process correct answer with neutral confidence (3)', () => {
        const result = processAnswer(true, undefined, 3)
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR)
      })

      it('should process correct answer with high confidence (4)', () => {
        const result = processAnswer(true, undefined, 4)
        expect(result.interval).toBeGreaterThanOrEqual(1)
        expect(result.easeFactor).toBeGreaterThan(DEFAULT_EASE_FACTOR)
      })

      it('should process correct answer with high confidence (5)', () => {
        const result = processAnswer(true, undefined, 5)
        expect(result.interval).toBeGreaterThanOrEqual(1)
        expect(result.easeFactor).toBeGreaterThan(DEFAULT_EASE_FACTOR)
      })
    })

    describe('incorrect answers with different confidence levels', () => {
      it('should process incorrect answer with low confidence (1) - expected outcome', () => {
        const result = processAnswer(false, undefined, 1)
        expect(result.interval).toBe(1) // Reset
        // Low confidence on wrong: normal penalty (no adjustment)
        expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR)
      })

      it('should process incorrect answer with neutral confidence (3)', () => {
        const result = processAnswer(false, undefined, 3)
        expect(result.interval).toBe(1)
        expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR)
      })

      it('should process incorrect answer with high confidence (4) - overconfidence penalty', () => {
        const result = processAnswer(false, undefined, 4)
        expect(result.interval).toBe(1)
        // High confidence on wrong: larger ease factor penalty
        expect(result.easeFactor).toBeLessThan(DEFAULT_EASE_FACTOR)
      })

      it('should process incorrect answer with high confidence (5) - larger overconfidence penalty', () => {
        const result = processAnswer(false, undefined, 5)
        expect(result.interval).toBe(1)
        // Larger penalty for highest overconfidence
        expect(result.easeFactor).toBeLessThan(DEFAULT_EASE_FACTOR)
      })
    })

    describe('with existing progress', () => {
      it('should use existing ease factor from progress', () => {
        const progress = {
          easeFactor: 2.8,
          interval: 6,
          attempts: 5,
          correctCount: 4,
        }
        const result = processAnswer(true, progress, 3)
        // Should be based on the existing ease factor, not default
        expect(result.easeFactor).toBeCloseTo(2.8, 1)
      })

      it('should estimate repetitions from interval for interval >= 6', () => {
        const progress = {
          easeFactor: 2.5,
          interval: 6,
          attempts: 3,
          correctCount: 3,
        }
        const result = processAnswer(true, progress, 3)
        // With repetitions=2 (estimated from interval >= 6), interval = 6 * 2.5 = 15
        // Then SM-2 formula adjusts ease factor down for quality 3
        expect(result.interval).toBeGreaterThan(6)
      })

      it('should estimate repetitions=1 for interval between 1 and 6', () => {
        const progress = {
          easeFactor: 2.5,
          interval: 3,
          attempts: 2,
          correctCount: 2,
        }
        const result = processAnswer(true, progress, 3)
        // With repetitions=1, next interval should be 6
        expect(result.interval).toBeLessThanOrEqual(6)
      })

      it('should reset interval on incorrect answer regardless of progress', () => {
        const progress = {
          easeFactor: 2.8,
          interval: 30,
          attempts: 10,
          correctCount: 9,
        }
        const result = processAnswer(false, progress, 3)
        expect(result.interval).toBe(1)
      })
    })

    describe('with new question (no progress)', () => {
      it('should use default ease factor for new question', () => {
        const result = processAnswer(true, undefined, 3)
        expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR)
      })

      it('should set interval to 1 for first correct answer', () => {
        const result = processAnswer(true, undefined, 3)
        expect(result.interval).toBe(1)
      })

      it('should use default confidence when not provided', () => {
        const result = processAnswer(true, undefined)
        expect(result.easeFactor).toBe(DEFAULT_EASE_FACTOR)
        expect(result.interval).toBe(1)
      })
    })

    describe('confidence clamping', () => {
      it('should clamp confidence below 1 to 1', () => {
        const result = processAnswer(true, undefined, 0)
        // Should behave like confidence 1
        expect(result).toBeDefined()
      })

      it('should clamp confidence above 5 to 5', () => {
        const result = processAnswer(true, undefined, 10)
        // Should behave like confidence 5
        expect(result).toBeDefined()
      })

      it('should round non-integer confidence', () => {
        const result = processAnswer(true, undefined, 3.7)
        // Should behave like confidence 4
        expect(result.easeFactor).toBeGreaterThan(DEFAULT_EASE_FACTOR)
      })
    })

    describe('minimum ease factor enforcement', () => {
      it('should not allow ease factor to go below minimum after confidence adjustment', () => {
        // Start with minimum ease factor and apply penalty
        const progress = {
          easeFactor: MIN_EASE_FACTOR,
          interval: 6,
          attempts: 5,
          correctCount: 2,
        }
        const result = processAnswer(false, progress, 5) // High confidence wrong = penalty
        expect(result.easeFactor).toBeGreaterThanOrEqual(MIN_EASE_FACTOR)
      })
    })
  })

  describe('getMasteryStatus()', () => {
    it('should return "new" when attempts is 0', () => {
      expect(getMasteryStatus(0, 0, 0)).toBe('new')
    })

    it('should return "new" even with high interval if no attempts', () => {
      expect(getMasteryStatus(30, 0, 0)).toBe('new')
    })

    it('should return "learning" when interval < 7', () => {
      expect(getMasteryStatus(1, 1, 1)).toBe('learning')
      expect(getMasteryStatus(3, 2, 3)).toBe('learning')
      expect(getMasteryStatus(6, 5, 6)).toBe('learning')
    })

    it('should return "review" when interval >= 7 and < 21', () => {
      expect(getMasteryStatus(7, 6, 7)).toBe('review')
      expect(getMasteryStatus(14, 10, 12)).toBe('review')
      expect(getMasteryStatus(20, 18, 20)).toBe('review')
    })

    it('should return "review" when interval >= 21 but accuracy <= 80%', () => {
      // 8/10 = 80% (not greater than 80%)
      expect(getMasteryStatus(21, 8, 10)).toBe('review')
      // 4/10 = 40%
      expect(getMasteryStatus(30, 4, 10)).toBe('review')
    })

    it('should return "mastered" when interval >= 21 and accuracy > 80%', () => {
      // 9/10 = 90%
      expect(getMasteryStatus(21, 9, 10)).toBe('mastered')
      // 17/20 = 85%
      expect(getMasteryStatus(30, 17, 20)).toBe('mastered')
      // 5/5 = 100%
      expect(getMasteryStatus(25, 5, 5)).toBe('mastered')
    })

    it('should handle edge case of exactly 80% accuracy', () => {
      // 80/100 = exactly 80%, should not be mastered (needs > 80%)
      expect(getMasteryStatus(21, 80, 100)).toBe('review')
    })

    it('should handle edge case of interval exactly 21', () => {
      // interval = 21, accuracy = 81%
      expect(getMasteryStatus(21, 81, 100)).toBe('mastered')
    })
  })

  describe('isDue()', () => {
    it('should return true when next review is in the past', () => {
      const pastDate = daysAgo(1)
      expect(isDue(pastDate)).toBe(true)
    })

    it('should return true when next review is several days in the past', () => {
      const pastDate = daysAgo(7)
      expect(isDue(pastDate)).toBe(true)
    })

    it('should return true when next review is exactly now', () => {
      const now = new Date()
      expect(isDue(now, now)).toBe(true)
    })

    it('should return false when next review is in the future', () => {
      const futureDate = daysFromNow(1)
      expect(isDue(futureDate)).toBe(false)
    })

    it('should return false when next review is several days in the future', () => {
      const futureDate = daysFromNow(7)
      expect(isDue(futureDate)).toBe(false)
    })

    it('should use provided "now" parameter for comparison', () => {
      const reviewDate = new Date('2024-01-15')
      const beforeReview = new Date('2024-01-14')
      const afterReview = new Date('2024-01-16')

      expect(isDue(reviewDate, beforeReview)).toBe(false)
      expect(isDue(reviewDate, afterReview)).toBe(true)
    })

    it('should handle edge case of millisecond difference', () => {
      const reviewDate = new Date('2024-01-15T10:00:00.000Z')
      const beforeReview = new Date('2024-01-15T09:59:59.999Z')
      const exactReview = new Date('2024-01-15T10:00:00.000Z')

      expect(isDue(reviewDate, beforeReview)).toBe(false)
      expect(isDue(reviewDate, exactReview)).toBe(true)
    })
  })

  describe('calculatePriority()', () => {
    describe('overdue items (positive priority)', () => {
      it('should return positive priority for overdue items', () => {
        const pastDate = daysAgo(2)
        const priority = calculatePriority(pastDate, 7)
        expect(priority).toBeGreaterThan(0)
      })

      it('should increase priority as item becomes more overdue', () => {
        const oneDayOverdue = daysAgo(1)
        const threeDaysOverdue = daysAgo(3)

        const priorityOne = calculatePriority(oneDayOverdue, 7)
        const priorityThree = calculatePriority(threeDaysOverdue, 7)

        expect(priorityThree).toBeGreaterThan(priorityOne)
      })

      it('should give higher priority to shorter-interval items that are equally overdue', () => {
        // An item 1 day overdue with a 1-day interval is more urgent than
        // an item 1 day overdue with a 30-day interval
        const nextReview = daysAgo(1)

        const shortIntervalPriority = calculatePriority(nextReview, 1)
        const longIntervalPriority = calculatePriority(nextReview, 30)

        expect(shortIntervalPriority).toBeGreaterThan(longIntervalPriority)
      })

      it('should handle interval of 0 by treating it as 1', () => {
        const pastDate = daysAgo(1)
        const priority = calculatePriority(pastDate, 0)
        // Should not cause division by zero
        expect(priority).toBeGreaterThan(0)
        expect(Number.isFinite(priority)).toBe(true)
      })
    })

    describe('not-yet-due items (negative priority)', () => {
      it('should return negative priority for items not yet due', () => {
        const futureDate = daysFromNow(3)
        const priority = calculatePriority(futureDate, 7)
        expect(priority).toBeLessThan(0)
      })

      it('should return more negative priority for items further in the future', () => {
        const soonDate = daysFromNow(1)
        const laterDate = daysFromNow(5)

        const soonPriority = calculatePriority(soonDate, 7)
        const laterPriority = calculatePriority(laterDate, 7)

        expect(laterPriority).toBeLessThan(soonPriority)
      })
    })

    describe('items due exactly now', () => {
      it('should return approximately 0 for items due exactly now', () => {
        const now = new Date()
        const priority = calculatePriority(now, 7, now)
        expect(Math.abs(priority)).toBeLessThan(0.001)
      })
    })

    describe('with custom "now" parameter', () => {
      it('should use provided "now" for calculation', () => {
        const reviewDate = new Date('2024-01-10')
        const customNow = new Date('2024-01-15')

        const priority = calculatePriority(reviewDate, 5, customNow)
        // 5 days overdue / 5 interval = 1
        expect(priority).toBeCloseTo(1, 1)
      })
    })
  })

  describe('updateConfidenceHistory()', () => {
    it('should add confidence to empty history', () => {
      const result = updateConfidenceHistory(undefined, 4)
      expect(result).toEqual([4])
    })

    it('should add confidence to existing history', () => {
      const result = updateConfidenceHistory([3, 4], 5)
      expect(result).toEqual([3, 4, 5])
    })

    it('should append new confidence at the end', () => {
      const result = updateConfidenceHistory([1, 2, 3], 5)
      expect(result[result.length - 1]).toBe(5)
    })

    it('should preserve existing history order', () => {
      const result = updateConfidenceHistory([5, 4, 3, 2, 1], 3)
      expect(result.slice(0, 5)).toEqual([5, 4, 3, 2, 1])
    })

    it('should enforce maximum history length of 10', () => {
      const fullHistory = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
      expect(fullHistory.length).toBe(MAX_CONFIDENCE_HISTORY)

      const result = updateConfidenceHistory(fullHistory, 3)
      expect(result.length).toBe(MAX_CONFIDENCE_HISTORY)
    })

    it('should remove oldest entry when adding beyond max length', () => {
      const fullHistory = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
      const result = updateConfidenceHistory(fullHistory, 3)

      // Oldest (1) should be removed, new (3) should be at end
      expect(result[0]).toBe(2) // Second oldest is now first
      expect(result[result.length - 1]).toBe(3) // New entry is last
    })

    it('should handle history with undefined input', () => {
      const result = updateConfidenceHistory(undefined, 5)
      expect(result).toEqual([5])
    })

    it('should handle adding to history when at max minus one', () => {
      const history = [1, 2, 3, 4, 5, 1, 2, 3, 4] // 9 items
      const result = updateConfidenceHistory(history, 5)
      expect(result.length).toBe(10)
      expect(result[9]).toBe(5)
    })
  })

  describe('getAverageConfidence()', () => {
    it('should return undefined for undefined history', () => {
      expect(getAverageConfidence(undefined)).toBeUndefined()
    })

    it('should return undefined for empty history', () => {
      expect(getAverageConfidence([])).toBeUndefined()
    })

    it('should return single value for history with one entry', () => {
      expect(getAverageConfidence([4])).toBe(4)
    })

    it('should calculate average correctly for multiple entries', () => {
      expect(getAverageConfidence([3, 4, 5])).toBe(4)
    })

    it('should handle non-integer averages', () => {
      const result = getAverageConfidence([3, 4])
      expect(result).toBe(3.5)
    })

    it('should calculate correct average for full history', () => {
      const fullHistory = [5, 4, 3, 5, 4, 3, 5, 4, 3, 4]
      // Sum = 40, Count = 10, Average = 4
      expect(getAverageConfidence(fullHistory)).toBe(4)
    })

    it('should handle all same values', () => {
      expect(getAverageConfidence([3, 3, 3, 3, 3])).toBe(3)
    })

    it('should handle extreme values', () => {
      expect(getAverageConfidence([1, 5])).toBe(3)
      expect(getAverageConfidence([1, 1, 1, 1, 5, 5, 5, 5])).toBe(3)
    })
  })

  describe('getInitialProgress()', () => {
    it('should return default ease factor', () => {
      const initial = getInitialProgress()
      expect(initial.easeFactor).toBe(DEFAULT_EASE_FACTOR)
    })

    it('should return interval of 0', () => {
      const initial = getInitialProgress()
      expect(initial.interval).toBe(0)
    })

    it('should return status of "new"', () => {
      const initial = getInitialProgress()
      expect(initial.status).toBe('new')
    })
  })

  describe('exported constants', () => {
    it('should export DEFAULT_EASE_FACTOR as 2.5', () => {
      expect(DEFAULT_EASE_FACTOR).toBe(2.5)
    })

    it('should export MIN_EASE_FACTOR as 1.3', () => {
      expect(MIN_EASE_FACTOR).toBe(1.3)
    })

    it('should export DEFAULT_CONFIDENCE as 3', () => {
      expect(DEFAULT_CONFIDENCE).toBe(3)
    })

    it('should export MAX_CONFIDENCE_HISTORY as 10', () => {
      expect(MAX_CONFIDENCE_HISTORY).toBe(10)
    })
  })

  describe('integration scenarios', () => {
    it('should simulate a learning progression for a new question', () => {
      // Day 1: First correct answer
      let progress = undefined
      let result = processAnswer(true, progress, 3)
      expect(result.interval).toBe(1)
      expect(result.status).toBe('learning')

      // Day 2: Second correct answer
      progress = {
        easeFactor: result.easeFactor,
        interval: result.interval,
        attempts: 1,
        correctCount: 1,
      }
      result = processAnswer(true, progress, 3)
      expect(result.interval).toBe(6)
      expect(result.status).toBe('learning')

      // Day 8: Third correct answer (after 6 day interval)
      progress = {
        easeFactor: result.easeFactor,
        interval: result.interval,
        attempts: 2,
        correctCount: 2,
      }
      result = processAnswer(true, progress, 3)
      // Interval should increase further
      expect(result.interval).toBeGreaterThan(6)
    })

    it('should reset progress on incorrect answer after progression', () => {
      // Build up progress
      let progress = {
        easeFactor: 2.6,
        interval: 15,
        attempts: 5,
        correctCount: 5,
      }

      // Miss the question
      const result = processAnswer(false, progress, 3)
      expect(result.interval).toBe(1)
    })

    it('should handle confidence affecting progression', () => {
      const progress = {
        easeFactor: 2.5,
        interval: 6,
        attempts: 3,
        correctCount: 3,
      }

      // High confidence correct answer
      const highConfidence = processAnswer(true, progress, 5)
      // Low confidence correct answer (lucky guess)
      const lowConfidence = processAnswer(true, progress, 1)

      // High confidence should result in longer interval
      expect(highConfidence.interval).toBeGreaterThan(lowConfidence.interval)
      // High confidence should also boost ease factor more
      expect(highConfidence.easeFactor).toBeGreaterThan(lowConfidence.easeFactor)
    })
  })
})
