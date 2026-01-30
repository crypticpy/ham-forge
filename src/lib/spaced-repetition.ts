/**
 * SM-2 Spaced Repetition Algorithm
 * Based on: https://super-memory.com/english/ol/sm2.htm
 *
 * Quality ratings:
 * 0 - Complete blackout, no recall
 * 1 - Incorrect, but upon seeing correct answer, remembered
 * 2 - Incorrect, but correct answer seemed easy to recall
 * 3 - Correct with serious difficulty
 * 4 - Correct after hesitation
 * 5 - Perfect response, instant recall
 *
 * For our use case (multiple choice):
 * - Correct answer = quality 4 (correct after hesitation)
 * - Incorrect answer = quality 2 (incorrect, but seemed easy)
 */

export type MasteryStatus = 'new' | 'learning' | 'review' | 'mastered'

export interface SM2Result {
  easeFactor: number // New ease factor (minimum 1.3)
  interval: number // Days until next review
  nextReview: Date // Calculated next review date
  status: MasteryStatus
}

export interface SM2Input {
  quality: number // 0-5 rating
  repetitions: number // Number of successful reviews in a row (0 for new or after failure)
  easeFactor: number // Current ease factor (default 2.5)
  interval: number // Current interval in days
}

/**
 * Default ease factor for new questions
 */
export const DEFAULT_EASE_FACTOR = 2.5

/**
 * Minimum ease factor allowed by the algorithm
 */
export const MIN_EASE_FACTOR = 1.3

/**
 * Calculate the next review parameters using SM-2 algorithm
 * @param input - Current state and quality of response
 * @returns New review parameters including next review date
 */
export function calculateSM2(input: SM2Input): SM2Result {
  const { quality, repetitions, easeFactor, interval } = input

  let newRepetitions: number
  let newInterval: number
  let newEaseFactor: number

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      newInterval = 1
    } else if (repetitions === 1) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * easeFactor)
    }

    // Update ease factor using SM-2 formula
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

    // Ensure ease factor doesn't go below minimum
    newEaseFactor = Math.max(newEaseFactor, MIN_EASE_FACTOR)

    newRepetitions = repetitions + 1
  } else {
    // Incorrect response - reset to beginning
    newRepetitions = 0
    newInterval = 1
    newEaseFactor = easeFactor // Keep the ease factor unchanged on failure
  }

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInterval)
  // Reset to start of day for consistent scheduling
  nextReview.setHours(0, 0, 0, 0)

  // Determine mastery status based on interval and repetitions
  const status = getMasteryStatusFromInterval(newInterval, newRepetitions)

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    nextReview,
    status,
  }
}

/**
 * Default confidence level (neutral)
 */
export const DEFAULT_CONFIDENCE = 3

/**
 * Maximum number of confidence ratings to store in history
 */
export const MAX_CONFIDENCE_HISTORY = 10

/**
 * Calculate confidence adjustment factor for SM-2 algorithm
 *
 * Confidence affects the algorithm as follows:
 * - High confidence (4-5) on correct answer: slight bonus to interval/easeFactor
 * - Low confidence (1-2) on correct answer: reduce interval boost (lucky guess)
 * - High confidence (4-5) on wrong answer: larger easeFactor penalty (overconfidence)
 * - Low confidence (1-2) on wrong answer: normal penalty (expected outcome)
 *
 * @param confidence - User's confidence rating (1-5)
 * @param isCorrect - Whether the answer was correct
 * @returns Adjustment factors for easeFactor and interval
 */
function calculateConfidenceAdjustment(
  confidence: number,
  isCorrect: boolean
): { easeFactorDelta: number; intervalMultiplier: number } {
  // Normalize confidence to -2 to +2 range (3 is neutral)
  const normalizedConfidence = confidence - 3

  if (isCorrect) {
    // Correct answer
    if (normalizedConfidence >= 1) {
      // High confidence (4-5) on correct: small bonus
      // Confidence 4: +0.02 easeFactor, 1.05x interval
      // Confidence 5: +0.04 easeFactor, 1.10x interval
      return {
        easeFactorDelta: normalizedConfidence * 0.02,
        intervalMultiplier: 1 + normalizedConfidence * 0.05,
      }
    } else if (normalizedConfidence <= -1) {
      // Low confidence (1-2) on correct: reduce boost (lucky guess)
      // Confidence 2: -0.02 easeFactor, 0.85x interval
      // Confidence 1: -0.04 easeFactor, 0.70x interval
      return {
        easeFactorDelta: normalizedConfidence * 0.02,
        intervalMultiplier: 1 + normalizedConfidence * 0.15,
      }
    }
  } else {
    // Incorrect answer
    if (normalizedConfidence >= 1) {
      // High confidence (4-5) on wrong: larger penalty (overconfidence)
      // This is a knowledge gap that needs addressing
      // Confidence 4: -0.05 easeFactor
      // Confidence 5: -0.10 easeFactor
      return {
        easeFactorDelta: -normalizedConfidence * 0.05,
        intervalMultiplier: 1, // Interval resets on wrong answer anyway
      }
    }
    // Low confidence on wrong: normal penalty (expected outcome)
  }

  // Neutral confidence (3) or low confidence on wrong: no adjustment
  return { easeFactorDelta: 0, intervalMultiplier: 1 }
}

/**
 * Simplified function for processing multiple choice answers
 * @param isCorrect - Whether the answer was correct
 * @param currentProgress - Current progress (or undefined for new questions)
 * @param confidence - User's confidence rating (1-5, defaults to 3)
 * @returns Updated SM2 result
 */
export function processAnswer(
  isCorrect: boolean,
  currentProgress?: {
    easeFactor: number
    interval: number
    attempts: number
    correctCount?: number
  },
  confidence: number = DEFAULT_CONFIDENCE
): SM2Result {
  // Clamp confidence to valid range
  const clampedConfidence = Math.max(1, Math.min(5, Math.round(confidence)))

  // Convert boolean to quality rating
  // Correct = 4 (correct after hesitation)
  // Incorrect = 2 (incorrect, but seemed easy to recall)
  const quality = isCorrect ? 4 : 2

  // Calculate repetitions from current progress
  // repetitions = consecutive correct answers
  // For simplicity, we estimate this from the interval
  let repetitions = 0
  if (currentProgress) {
    if (currentProgress.interval >= 6) {
      repetitions = 2 // Has been reviewed at least twice successfully
    } else if (currentProgress.interval >= 1) {
      repetitions = 1 // First successful review
    }
  }

  const input: SM2Input = {
    quality,
    repetitions,
    easeFactor: currentProgress?.easeFactor ?? DEFAULT_EASE_FACTOR,
    interval: currentProgress?.interval ?? 0,
  }

  // Get base SM2 result
  const baseResult = calculateSM2(input)

  // Apply confidence adjustments
  const { easeFactorDelta, intervalMultiplier } = calculateConfidenceAdjustment(
    clampedConfidence,
    isCorrect
  )

  // Apply adjustments while respecting SM-2 constraints
  const adjustedEaseFactor = Math.max(MIN_EASE_FACTOR, baseResult.easeFactor + easeFactorDelta)

  const adjustedInterval = Math.max(1, Math.round(baseResult.interval * intervalMultiplier))

  // Recalculate next review date with adjusted interval
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + adjustedInterval)
  nextReview.setHours(0, 0, 0, 0)

  return {
    ...baseResult,
    easeFactor: adjustedEaseFactor,
    interval: adjustedInterval,
    nextReview,
  }
}

/**
 * Update confidence history with new rating
 * @param history - Current confidence history (or undefined)
 * @param newConfidence - New confidence rating to add
 * @returns Updated confidence history array
 */
export function updateConfidenceHistory(
  history: number[] | undefined,
  newConfidence: number
): number[] {
  const currentHistory = history ?? []
  const updatedHistory = [...currentHistory, newConfidence]

  // Keep only the last N ratings
  if (updatedHistory.length > MAX_CONFIDENCE_HISTORY) {
    return updatedHistory.slice(-MAX_CONFIDENCE_HISTORY)
  }

  return updatedHistory
}

/**
 * Calculate average confidence from history
 * @param history - Confidence history array
 * @returns Average confidence or undefined if no history
 */
export function getAverageConfidence(history: number[] | undefined): number | undefined {
  if (!history || history.length === 0) {
    return undefined
  }
  return history.reduce((sum, val) => sum + val, 0) / history.length
}

/**
 * Get default values for a new question
 * @returns Initial progress values for an unseen question
 */
export function getInitialProgress(): {
  easeFactor: number
  interval: number
  status: MasteryStatus
} {
  return {
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    status: 'new',
  }
}

/**
 * Determine mastery status based on interval and repetitions
 * @param interval - Current interval in days
 * @param repetitions - Number of consecutive successful reviews
 * @returns Mastery status
 */
function getMasteryStatusFromInterval(interval: number, repetitions: number): MasteryStatus {
  if (repetitions === 0 && interval <= 1) {
    return 'learning'
  }
  if (interval >= 21) {
    return 'mastered'
  }
  if (interval >= 7) {
    return 'review'
  }
  return 'learning'
}

/**
 * Determine mastery status based on progress metrics
 * @param interval - Current interval in days
 * @param correctCount - Total correct answers
 * @param attempts - Total attempts
 * @returns Mastery status
 */
export function getMasteryStatus(
  interval: number,
  correctCount: number,
  attempts: number
): MasteryStatus {
  // New: never seen (attempts === 0)
  if (attempts === 0) {
    return 'new'
  }

  const accuracy = attempts > 0 ? correctCount / attempts : 0

  // Mastered: interval >= 21 days and accuracy > 80%
  if (interval >= 21 && accuracy > 0.8) {
    return 'mastered'
  }

  // Review: interval >= 7 days
  if (interval >= 7) {
    return 'review'
  }

  // Learning: seen but interval < 7 days
  return 'learning'
}

/**
 * Check if a question is due for review
 * @param nextReview - The scheduled next review date
 * @param now - Current date (defaults to now)
 * @returns True if the question is due for review
 */
export function isDue(nextReview: Date, now: Date = new Date()): boolean {
  return nextReview <= now
}

/**
 * Calculate the priority score for a question based on how overdue it is
 * Higher scores = more urgent to review
 * @param nextReview - The scheduled next review date
 * @param interval - Current interval in days
 * @param now - Current date (defaults to now)
 * @returns Priority score (higher = more urgent)
 */
export function calculatePriority(
  nextReview: Date,
  interval: number,
  now: Date = new Date()
): number {
  const msPerDay = 24 * 60 * 60 * 1000
  const daysOverdue = (now.getTime() - nextReview.getTime()) / msPerDay

  if (daysOverdue <= 0) {
    // Not yet due - return negative priority
    return daysOverdue
  }

  // Priority increases with how overdue the item is, relative to its interval
  // An item 1 day overdue with a 1-day interval is more urgent than
  // an item 1 day overdue with a 30-day interval
  return daysOverdue / Math.max(interval, 1)
}
