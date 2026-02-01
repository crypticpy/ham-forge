/**
 * Flashcard Data Index
 */

import { technicianLearningCards } from './technician-learning-cards'
import type { LearningCard, QuestionCard, FlashcardDeck } from '@/types/flashcard'
import type { ExamLevel, Question } from '@/types'

// Re-export learning cards
export { technicianLearningCards }

/**
 * Get learning cards for exam level
 */
export function getLearningCards(examLevel: ExamLevel): LearningCard[] {
  switch (examLevel) {
    case 'technician':
      return technicianLearningCards
    case 'general':
      // TODO: Add general learning cards
      return []
    default:
      return []
  }
}

/**
 * Convert pool questions to question cards
 */
export function convertToQuestionCards(
  questions: Question[],
  learningCards: LearningCard[]
): QuestionCard[] {
  return questions.map((q) => {
    // Find related learning cards
    const relatedLearning = learningCards
      .filter((lc) => lc.relatedQuestionIds.includes(q.id))
      .map((lc) => lc.id)

    return {
      id: `qc-${q.id}`,
      questionId: q.id,
      subelement: q.subelement,
      group: q.group,
      question: q.question,
      answers: q.answers,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      figure: q.figure,
      relatedLearningIds: relatedLearning,
    }
  })
}

/**
 * Available flashcard decks
 */
export const flashcardDecks: FlashcardDeck[] = [
  {
    id: 'adaptive',
    name: 'Smart Study',
    description: 'Algorithm picks cards based on your weak areas',
    icon: 'Brain',
    color: 'purple',
    mode: 'adaptive',
    estimatedMinutes: 20,
  },
  {
    id: 'review',
    name: 'Review Due',
    description: 'Cards scheduled for review today',
    icon: 'Clock',
    color: 'amber',
    mode: 'review',
    estimatedMinutes: 15,
  },
  {
    id: 'explore',
    name: 'Explore New',
    description: "Discover concepts you haven't seen yet",
    icon: 'Sparkles',
    color: 'blue',
    mode: 'explore',
    estimatedMinutes: 20,
  },
  {
    id: 'focus-rules',
    name: 'Rules & Regs',
    description: 'Focus on FCC rules and regulations',
    icon: 'BookOpen',
    color: 'emerald',
    mode: 'focus',
    focusCategories: ['T1'],
    estimatedMinutes: 15,
  },
  {
    id: 'focus-operating',
    name: 'Operating',
    description: 'Procedures, protocols, and practices',
    icon: 'Radio',
    color: 'cyan',
    mode: 'focus',
    focusCategories: ['T2', 'T8'],
    estimatedMinutes: 15,
  },
  {
    id: 'focus-technical',
    name: 'Technical',
    description: 'Components, circuits, and signals',
    icon: 'Cpu',
    color: 'orange',
    mode: 'focus',
    focusCategories: ['T3', 'T5', 'T6', 'T7'],
    estimatedMinutes: 20,
  },
  {
    id: 'focus-safety',
    name: 'Safety',
    description: 'Electrical, tower, and RF safety',
    icon: 'ShieldAlert',
    color: 'red',
    mode: 'focus',
    focusCategories: ['T0'],
    estimatedMinutes: 10,
  },
]

/**
 * Get deck by ID
 */
export function getDeckById(deckId: string): FlashcardDeck | undefined {
  return flashcardDecks.find((d) => d.id === deckId)
}

/**
 * Get subelement name for display
 */
export function getSubelementDisplayName(subelement: string): string {
  const names: Record<string, string> = {
    T0: 'Safety',
    T1: 'Rules & Regulations',
    T2: 'Operating Procedures',
    T3: 'Radio Wave Propagation',
    T4: 'Amateur Practices',
    T5: 'Electrical Principles',
    T6: 'Circuit Components',
    T7: 'Station Equipment',
    T8: 'Modulation & Signals',
    T9: 'Antennas & Feed Lines',
  }
  return names[subelement] || subelement
}
