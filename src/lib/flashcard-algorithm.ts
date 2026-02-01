/**
 * Flashcard Adaptive Learning Algorithm
 *
 * Hybrid approach combining:
 * - Leitner box system for individual card scheduling
 * - Custom weighted algorithm for category-level prioritization
 * - Spaced repetition for long-term retention
 */

import type {
  LearningCard,
  QuestionCard,
  CategoryWeight,
  CategoryProgress,
  FlashcardProgress,
  CardSelectionResult,
  SessionMode,
} from '@/types/flashcard'

// Configuration constants
const MAX_CATEGORY_WEIGHT = 0.4 // Max 40% of cards from one category
const MIN_CATEGORY_WEIGHT = 0.05 // Min threshold to include category
const RECENCY_DECAY_RATE = 0.1 // 10% boost per day since studied
const RECENCY_MAX_BOOST = 2.0 // Cap recency boost
const COLD_START_THRESHOLD = 10 // Min attempts before full algorithm
const EXPLORATION_BONUS = 1.5 // Boost for unexplored categories
// Interleaving ensures ~30% of transitions switch between different subelements
// This is achieved via round-robin distribution in applyInterleaving()

/**
 * Calculate category weights based on performance and recency
 */
export function calculateCategoryWeights(
  categoryProgress: CategoryProgress[],
  mode: SessionMode = 'adaptive'
): CategoryWeight[] {
  if (categoryProgress.length === 0) {
    return []
  }

  const weights: CategoryWeight[] = categoryProgress.map((cat) => {
    let weight = 1.0
    let reason: CategoryWeight['reason'] = 'normal'

    if (mode === 'adaptive') {
      // Weakness factor: lower accuracy = higher weight
      if (cat.recentAttempts > 0) {
        const weaknessFactor = 1 - cat.recentAccuracy
        weight = 0.5 + weaknessFactor // Base 0.5 + weakness

        if (cat.recentAccuracy < 0.5) {
          reason = 'weak'
        } else if (cat.recentAccuracy > 0.85) {
          reason = 'strong'
          weight *= 0.7 // Reduce weight for strong areas
        }
      } else {
        // Cold start: exploration bonus
        weight = EXPLORATION_BONUS
        reason = 'explore'
      }

      // Recency factor: longer since studied = higher weight
      if (cat.lastStudied) {
        const daysSinceStudy =
          (Date.now() - new Date(cat.lastStudied).getTime()) / (1000 * 60 * 60 * 24)
        const recencyBoost = Math.min(1 + daysSinceStudy * RECENCY_DECAY_RATE, RECENCY_MAX_BOOST)
        weight *= recencyBoost

        if (daysSinceStudy > 7 && reason === 'normal') {
          reason = 'rusty'
        }
      }
    } else if (mode === 'review') {
      // Review mode: prioritize due cards
      weight = cat.recentAttempts > 0 ? 1.0 : 0.5
    } else if (mode === 'explore') {
      // Explore mode: prioritize unseen content
      weight = cat.recentAttempts === 0 ? 2.0 : 0.5
      reason = cat.recentAttempts === 0 ? 'explore' : 'normal'
    }

    // Cap weight to prevent single category dominance
    weight = Math.min(weight, MAX_CATEGORY_WEIGHT * categoryProgress.length)

    return {
      categoryId: cat.categoryId,
      weight,
      reason,
    }
  })

  // Normalize weights to sum to 1
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0)
  if (totalWeight > 0) {
    weights.forEach((w) => {
      w.weight /= totalWeight
    })
  }

  return weights.sort((a, b) => b.weight - a.weight)
}

/**
 * Allocate card slots to categories based on weights
 */
export function allocateSlots(weights: CategoryWeight[], totalSlots: number): Map<string, number> {
  const slots = new Map<string, number>()
  let remaining = totalSlots

  // Sort by weight descending
  const sorted = [...weights].sort((a, b) => b.weight - a.weight)

  for (const { categoryId, weight } of sorted) {
    if (remaining <= 0) break

    const allocated = Math.round(weight * totalSlots)
    // Ensure at least 1 if weight > threshold
    const capped = Math.min(
      Math.max(allocated, weight > MIN_CATEGORY_WEIGHT ? 1 : 0),
      Math.ceil(totalSlots * MAX_CATEGORY_WEIGHT)
    )
    const finalSlots = Math.min(capped, remaining)

    if (finalSlots > 0) {
      slots.set(categoryId, finalSlots)
      remaining -= finalSlots
    }
  }

  // Distribute remaining slots to weak categories
  if (remaining > 0) {
    const weakCategories = sorted.filter((w) => w.reason === 'weak')
    for (const { categoryId } of weakCategories) {
      if (remaining <= 0) break
      slots.set(categoryId, (slots.get(categoryId) || 0) + 1)
      remaining--
    }
  }

  return slots
}

/**
 * Generate default category progress for cold start (new users)
 * Creates entries only for subelements that exist in the provided cards
 */
function generateDefaultCategoryProgress(cards: Array<{ subelement: string }>): CategoryProgress[] {
  const subelements = new Set<string>()

  for (const card of cards) {
    subelements.add(card.subelement)
  }

  // Create default progress for each subelement (no attempts = explore mode)
  return Array.from(subelements).map((subelement) => ({
    categoryId: subelement,
    categoryType: 'subelement' as const,
    totalAttempts: 0,
    totalCorrect: 0,
    recentAttempts: 0,
    recentCorrect: 0,
    overallAccuracy: 0,
    recentAccuracy: 0,
    weaknessScore: 0,
    lastStudied: null,
    trend: 'stable' as const,
  }))
}

/**
 * Select cards for a session based on category weights and card progress
 */
export function selectCards(
  learningCards: LearningCard[],
  questionCards: QuestionCard[],
  cardProgress: Map<string, FlashcardProgress>,
  categoryProgress: CategoryProgress[],
  config: {
    learningCount: number
    questionCount: number
    mode: SessionMode
    focusCategories?: string[]
  }
): CardSelectionResult {
  // For cold start, generate separate category progress for each card type
  // This ensures we only allocate slots to subelements that have cards of that type
  const isColdStart = categoryProgress.length === 0

  // Generate category progress for learning cards (only subelements with learning cards)
  let learningCategoryProgress = categoryProgress
  if (isColdStart) {
    learningCategoryProgress = generateDefaultCategoryProgress(learningCards)
  }

  // Generate category progress for question cards (only subelements with question cards)
  let questionCategoryProgress = categoryProgress
  if (isColdStart) {
    questionCategoryProgress = generateDefaultCategoryProgress(questionCards)
  }

  // Filter categories if in focus mode
  if (config.mode === 'focus' && config.focusCategories?.length) {
    learningCategoryProgress = learningCategoryProgress.filter((p) =>
      config.focusCategories!.includes(p.categoryId)
    )
    questionCategoryProgress = questionCategoryProgress.filter((p) =>
      config.focusCategories!.includes(p.categoryId)
    )
  }

  // Calculate weights separately for each card type
  const learningWeights = calculateCategoryWeights(learningCategoryProgress, config.mode)
  const questionWeights = calculateCategoryWeights(questionCategoryProgress, config.mode)

  // Allocate slots using card-type-specific weights
  const learningSlots = allocateSlots(learningWeights, config.learningCount)
  const questionSlots = allocateSlots(questionWeights, config.questionCount)

  // Select learning cards
  const selectedLearning = selectCardsForSlots(learningCards, learningSlots, cardProgress)

  // Select question cards
  const selectedQuestions = selectCardsForSlots(questionCards, questionSlots, cardProgress)

  return {
    learningCards: selectedLearning,
    questionCards: selectedQuestions as QuestionCard[],
    categoryWeights: learningWeights, // Use learning weights for reporting
  }
}

/**
 * Select specific cards to fill allocated slots
 */
function selectCardsForSlots<T extends LearningCard | QuestionCard>(
  cards: T[],
  slots: Map<string, number>,
  cardProgress: Map<string, FlashcardProgress>
): T[] {
  const selected: T[] = []
  const usedIds = new Set<string>()
  const now = Date.now()

  for (const [categoryId, slotCount] of slots) {
    // Get cards for this category (check both subelement and group)
    const categoryCards = cards.filter(
      (c) => (c.subelement === categoryId || c.group === categoryId) && !usedIds.has(c.id)
    )

    if (categoryCards.length === 0) continue

    // Sort by priority:
    // 1. Due for review (nextReview <= now)
    // 2. Lowest mastery score
    // 3. Longest since seen
    // 4. Never seen (new cards)
    const sorted = categoryCards.sort((a, b) => {
      const aProgress = cardProgress.get(a.id)
      const bProgress = cardProgress.get(b.id)

      // New cards go last (exploration after review)
      if (!aProgress && bProgress) return 1
      if (aProgress && !bProgress) return -1
      if (!aProgress && !bProgress) return 0

      // Due cards first
      const aDue = new Date(aProgress!.nextReview).getTime() <= now ? 0 : 1
      const bDue = new Date(bProgress!.nextReview).getTime() <= now ? 0 : 1
      if (aDue !== bDue) return aDue - bDue

      // Lower mastery first
      if (aProgress!.masteryScore !== bProgress!.masteryScore) {
        return aProgress!.masteryScore - bProgress!.masteryScore
      }

      // Oldest seen first
      return new Date(aProgress!.lastSeen).getTime() - new Date(bProgress!.lastSeen).getTime()
    })

    // Take the needed number of cards
    for (let i = 0; i < Math.min(slotCount, sorted.length); i++) {
      selected.push(sorted[i])
      usedIds.add(sorted[i].id)
    }
  }

  // Apply interleaving to maximize topic switching for discrimination learning
  // This replaces simple shuffling with pedagogically-informed ordering
  return applyInterleaving(selected)
}

/**
 * Calculate session summary from results
 */
export function calculateSessionSummary(
  learningResults: { cardId: string; passed: boolean; timeMs: number }[],
  questionResults: {
    cardId: string
    passed: boolean
    correct: boolean
    timeMs: number
  }[],
  learningCards: LearningCard[],
  questionCards: QuestionCard[],
  startTime: string
): {
  totalCards: number
  learningAccuracy: number
  questionAccuracy: number
  timeSpentMs: number
  averageTimePerCard: number
  categoryPerformance: {
    categoryId: string
    correct: number
    total: number
    accuracy: number
  }[]
  weakestCategory?: string
  strongestCategory?: string
} {
  const totalCards = learningResults.length + questionResults.length
  const timeSpentMs = Date.now() - new Date(startTime).getTime()

  const learningCorrect = learningResults.filter((r) => r.passed).length
  const questionCorrect = questionResults.filter((r) => r.correct).length

  const learningAccuracy = learningResults.length > 0 ? learningCorrect / learningResults.length : 0
  const questionAccuracy = questionResults.length > 0 ? questionCorrect / questionResults.length : 0

  // Calculate category performance
  const categoryMap = new Map<string, { correct: number; total: number }>()

  // From learning cards
  learningResults.forEach((result) => {
    const card = learningCards.find((c) => c.id === result.cardId)
    if (card) {
      const key = card.group
      const current = categoryMap.get(key) || { correct: 0, total: 0 }
      categoryMap.set(key, {
        correct: current.correct + (result.passed ? 1 : 0),
        total: current.total + 1,
      })
    }
  })

  // From question cards
  questionResults.forEach((result) => {
    const card = questionCards.find((c) => c.id === result.cardId)
    if (card) {
      const key = card.group
      const current = categoryMap.get(key) || { correct: 0, total: 0 }
      categoryMap.set(key, {
        correct: current.correct + (result.correct ? 1 : 0),
        total: current.total + 1,
      })
    }
  })

  const categoryPerformance = Array.from(categoryMap.entries())
    .map(([categoryId, { correct, total }]) => ({
      categoryId,
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)

  const weakestCategory =
    categoryPerformance.length > 0 ? categoryPerformance[0].categoryId : undefined
  const strongestCategory =
    categoryPerformance.length > 0
      ? categoryPerformance[categoryPerformance.length - 1].categoryId
      : undefined

  return {
    totalCards,
    learningAccuracy,
    questionAccuracy,
    timeSpentMs,
    averageTimePerCard: totalCards > 0 ? timeSpentMs / totalCards : 0,
    categoryPerformance,
    weakestCategory,
    strongestCategory,
  }
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Apply interleaving to selected cards to improve discrimination learning.
 * Uses round-robin distribution across subelements to maximize topic switching.
 *
 * Research basis: Rohrer & Taylor (2007) showed interleaved practice
 * improves learners' ability to distinguish between similar concepts.
 *
 * @param cards - Array of cards with subelement property
 * @returns Cards reordered using round-robin across subelements
 */
function applyInterleaving<T extends { subelement: string }>(cards: T[]): T[] {
  // Edge cases: empty array or single card
  if (cards.length <= 1) {
    return cards
  }

  // Group cards by subelement
  const groups = new Map<string, T[]>()
  for (const card of cards) {
    const existing = groups.get(card.subelement) || []
    existing.push(card)
    groups.set(card.subelement, existing)
  }

  // Edge case: all cards from single subelement - preserve original order
  if (groups.size <= 1) {
    return cards
  }

  // Round-robin distribution: take one card from each subelement in rotation
  const result: T[] = []
  const subelements = Array.from(groups.keys())

  // Shuffle subelement order for variety between sessions
  const shuffledSubelements = shuffleArray(subelements)

  // Track current index for each subelement group
  const indices = new Map<string, number>()
  for (const sub of shuffledSubelements) {
    indices.set(sub, 0)
  }

  // Continue until all cards are placed
  let placed = 0
  const totalCards = cards.length

  while (placed < totalCards) {
    for (const subelement of shuffledSubelements) {
      const group = groups.get(subelement)!
      const idx = indices.get(subelement)!

      if (idx < group.length) {
        result.push(group[idx])
        indices.set(subelement, idx + 1)
        placed++
      }

      if (placed >= totalCards) break
    }
  }

  return result
}

/**
 * Calculate the actual interleaving ratio of a card sequence.
 * Returns the proportion of adjacent cards that have different subelements.
 *
 * A ratio of 0 means all adjacent cards have the same subelement (blocked practice).
 * A ratio of 1 means every adjacent pair has different subelements (maximum interleaving).
 *
 * @param cards - Array of cards with subelement property
 * @returns Proportion of transitions between different subelements (0-1)
 */
export function measureInterleaving<T extends { subelement: string }>(cards: T[]): number {
  // Edge cases: need at least 2 cards to measure transitions
  if (cards.length <= 1) {
    return 0
  }

  let transitions = 0
  const totalTransitions = cards.length - 1

  for (let i = 0; i < totalTransitions; i++) {
    if (cards[i].subelement !== cards[i + 1].subelement) {
      transitions++
    }
  }

  return transitions / totalTransitions
}

/**
 * Get recommended deck based on user's current state
 */
export function getRecommendedMode(
  categoryProgress: CategoryProgress[],
  lastSessionDate: string | null
): {
  mode: SessionMode
  reason: string
} {
  if (categoryProgress.length === 0) {
    return {
      mode: 'explore',
      reason: 'Start by exploring new concepts',
    }
  }

  const totalAttempts = categoryProgress.reduce((sum, p) => sum + p.totalAttempts, 0)

  // Cold start
  if (totalAttempts < COLD_START_THRESHOLD) {
    return {
      mode: 'explore',
      reason: 'Continue building your foundation',
    }
  }

  // Check for rust
  if (lastSessionDate) {
    const daysSince = (Date.now() - new Date(lastSessionDate).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSince > 7) {
      return {
        mode: 'review',
        reason: `${Math.floor(daysSince)} days since last session — time to review!`,
      }
    }
  }

  // Check for weak areas
  const weakCategories = categoryProgress.filter((p) => p.weaknessScore > 0.5)
  if (weakCategories.length > 0) {
    return {
      mode: 'adaptive',
      reason: `Focus on ${weakCategories.length} weak area${weakCategories.length > 1 ? 's' : ''}`,
    }
  }

  // Strong everywhere
  const avgAccuracy =
    categoryProgress.reduce((sum, p) => sum + p.recentAccuracy, 0) / categoryProgress.length
  if (avgAccuracy > 0.85) {
    return {
      mode: 'explore',
      reason: 'Great progress! Discover new content',
    }
  }

  return {
    mode: 'adaptive',
    reason: 'Balanced study based on your performance',
  }
}
