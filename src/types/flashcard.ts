/**
 * Flashcard System Types
 * Adaptive learning with category-weighted spaced repetition
 */

// Card Types
export interface LearningCard {
  id: string
  subelement: string // T1, T2, etc.
  group: string // T1A, T1B, etc.

  // Front (prompt)
  front: {
    title: string
    prompt: string
    category?: string
  }

  // Back (explanation)
  back: {
    explanation: string
    keyFact: string
    examTip?: string
    mnemonic?: string
  }

  // Relationships
  relatedQuestionIds: string[]
  tags?: string[]
}

export interface QuestionCard {
  id: string
  questionId: string // Links to pool question
  subelement: string
  group: string

  question: string
  answers: string[]
  correctAnswer: number

  explanation?: string
  figure?: string
  relatedLearningIds: string[]
}

// Progress Tracking
export interface FlashcardProgress {
  cardId: string
  cardType: 'learning' | 'question'
  subelement: string
  group: string

  // Leitner box (1-5)
  box: number

  // Performance
  attempts: number
  correctCount: number
  streak: number
  masteryScore: number // 0-100

  // Scheduling
  lastSeen: string // ISO date
  nextReview: string // ISO date

  // Response time tracking (questions only)
  averageTimeMs?: number
}

export interface CategoryProgress {
  categoryId: string
  categoryType: 'subelement' | 'group'

  // Rolling stats (7-day window)
  recentAttempts: number
  recentCorrect: number
  recentAccuracy: number

  // All-time stats
  totalAttempts: number
  totalCorrect: number
  overallAccuracy: number

  // Algorithm inputs
  weaknessScore: number // 0-1, higher = weaker
  lastStudied: string // ISO date

  // Trend detection
  trend: 'improving' | 'stable' | 'declining'
}

// Session Types
export type SessionPhase = 'learning' | 'questions' | 'results'
export type SessionMode = 'adaptive' | 'review' | 'explore' | 'focus'

export interface FlashcardSessionConfig {
  mode: SessionMode
  learningCardCount: number
  questionCardCount: number
  focusCategories?: string[] // For focus mode
  examLevel: 'technician' | 'general'
}

export interface FlashcardSessionState {
  config: FlashcardSessionConfig
  phase: SessionPhase

  // Current batch
  learningCards: LearningCard[]
  questionCards: QuestionCard[]
  currentIndex: number

  // Results
  learningResults: CardResult[]
  questionResults: QuestionResult[]

  // Timing
  startTime: string
  phaseStartTime: string
}

export interface CardResult {
  cardId: string
  passed: boolean
  timeMs: number
}

export interface QuestionResult extends CardResult {
  selectedAnswer: number
  correct: boolean
}

export interface SessionSummary {
  totalCards: number
  learningAccuracy: number
  questionAccuracy: number
  timeSpentMs: number
  averageTimePerCard: number

  // Category breakdown
  categoryPerformance: {
    categoryId: string
    correct: number
    total: number
    accuracy: number
  }[]

  // Insights
  weakestCategory?: string
  strongestCategory?: string
  improvement?: number // vs previous session
}

// Algorithm Types
export interface CategoryWeight {
  categoryId: string
  weight: number
  reason: 'weak' | 'rusty' | 'explore' | 'normal' | 'strong'
}

export interface CardSelectionResult {
  learningCards: LearningCard[]
  questionCards: QuestionCard[]
  categoryWeights: CategoryWeight[]
}

// Deck Types
export interface FlashcardDeck {
  id: string
  name: string
  description: string
  icon: string
  color: string
  mode: SessionMode
  focusCategories?: string[]
  estimatedMinutes: number
}

// Skill Tracking Types
// Based on pedagogical audit recommendation #4

/**
 * Procedural skill types tracked separately from conceptual knowledge.
 * These represent practical ham radio operating skills that require
 * muscle memory and fluency rather than conceptual understanding.
 */
export type SkillType = 'phonetic' | 'rst' | 'qso' | 'q-codes'

/**
 * Tracks mastery progress for a procedural skill.
 *
 * Level thresholds for skill mastery:
 * - Level 1: < 10 attempts (beginner)
 * - Level 2: 10+ attempts, 60%+ accuracy (novice)
 * - Level 3: 25+ attempts, 75%+ accuracy (intermediate)
 * - Level 4: 50+ attempts, 85%+ accuracy (proficient)
 * - Level 5: 100+ attempts, 90%+ accuracy (expert)
 */
export interface SkillMastery {
  /** Total practice attempts */
  attempts: number
  /** Number of correct responses */
  correct: number
  /** Calculated accuracy (correct/attempts), 0-1 */
  accuracy: number
  /** ISO date string of last practice session */
  lastPracticed: string | null
  /** Current mastery level 1-5 based on attempts and accuracy thresholds */
  level: 1 | 2 | 3 | 4 | 5
}
