/**
 * Skill Tracker Component Tests
 *
 * Tests for the dashboard skill tracker component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkillTracker } from '@/components/features/dashboard/skill-tracker'
import type { SkillMastery, SkillType } from '@/types/flashcard'

// Default skill mastery for testing
const defaultSkillMastery: SkillMastery = {
  attempts: 0,
  correct: 0,
  accuracy: 0,
  lastPracticed: null,
  level: 1,
}

// Mock the flashcard store - Zustand uses a selector pattern
const mockSkillProgress: Record<SkillType, SkillMastery> = {
  phonetic: { ...defaultSkillMastery, attempts: 25, correct: 20, accuracy: 0.8, level: 3 },
  rst: { ...defaultSkillMastery, attempts: 10, correct: 6, accuracy: 0.6, level: 2 },
  qso: { ...defaultSkillMastery, attempts: 5, correct: 3, accuracy: 0.6, level: 1 },
  'q-codes': { ...defaultSkillMastery, attempts: 50, correct: 45, accuracy: 0.9, level: 4 },
}

const mockStore = {
  skillProgress: mockSkillProgress,
  freezeTokens: 1,
  freezeTokensEarned: 3,
  currentStreak: 5,
}

vi.mock('@/stores/flashcard-store', () => ({
  useFlashcardStore: (selector?: (state: typeof mockStore) => unknown) => {
    if (selector) {
      return selector(mockStore)
    }
    return mockStore
  },
}))

// Mock hydration hook
vi.mock('@/hooks/use-hydration', () => ({
  useHydration: () => true,
}))

describe('SkillTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<SkillTracker />)
      expect(screen.getByText(/Operating Skills/i)).toBeInTheDocument()
    })

    it('displays all four skill cards', () => {
      render(<SkillTracker />)
      expect(screen.getByText(/Phonetic Alphabet/i)).toBeInTheDocument()
      expect(screen.getByText(/Signal Reports/i)).toBeInTheDocument()
      expect(screen.getByText(/QSO Procedures/i)).toBeInTheDocument()
      expect(screen.getByText(/Q-Codes/i)).toBeInTheDocument()
    })

    it('shows skill levels correctly', () => {
      render(<SkillTracker />)
      // Phonetic is level 3 (Intermediate)
      expect(screen.getByText(/Intermediate/i)).toBeInTheDocument()
      // Q-codes is level 4 (Proficient)
      expect(screen.getByText(/Proficient/i)).toBeInTheDocument()
    })

    it('displays accuracy percentages', () => {
      render(<SkillTracker />)
      // Phonetic accuracy is 80%
      expect(screen.getByText(/80%/)).toBeInTheDocument()
      // Q-codes accuracy is 90%
      expect(screen.getByText(/90%/)).toBeInTheDocument()
    })
  })

  describe('skill cards', () => {
    it('shows practice links for each skill', () => {
      render(<SkillTracker />)
      const practiceButtons = screen.getAllByRole('link', { name: /Practice/i })
      expect(practiceButtons.length).toBe(4)
    })

    it('displays star ratings for levels', () => {
      render(<SkillTracker />)
      // Should have star icons (filled and unfilled)
      const container = document.querySelector('[aria-label*="Level"]')
      expect(container).toBeInTheDocument()
    })

    it('shows progress bars for non-expert skills', () => {
      render(<SkillTracker />)
      // Look for progress bar elements (multiple skills may have them)
      const progressTexts = screen.getAllByText(/Progress to Level/i)
      expect(progressTexts.length).toBeGreaterThan(0)
    })
  })

  describe('freeze tokens section', () => {
    it('displays freeze token count', () => {
      render(<SkillTracker />)
      expect(screen.getByText(/Streak Protection/i)).toBeInTheDocument()
      // Should show 1 of 2 tokens
      expect(screen.getByText(/1 of 2/i)).toBeInTheDocument()
    })

    it('shows protected badge when tokens available', () => {
      render(<SkillTracker />)
      expect(screen.getByText(/Protected/i)).toBeInTheDocument()
    })

    it('displays lifetime tokens earned', () => {
      render(<SkillTracker />)
      // Should show "3 earned lifetime"
      expect(screen.getByText(/3 earned lifetime/i)).toBeInTheDocument()
    })

    it('shows progress to next token', () => {
      render(<SkillTracker />)
      // With current streak of 5, should show 5/7 days
      expect(screen.getByText(/5\/7 days/i)).toBeInTheDocument()
    })
  })

  describe('level labels', () => {
    it('displays correct level names', () => {
      render(<SkillTracker />)
      // Level 1 = Beginner, Level 2 = Novice, Level 3 = Intermediate, Level 4 = Proficient
      expect(screen.getByText(/Novice/i)).toBeInTheDocument() // RST level 2
      expect(screen.getByText(/Beginner/i)).toBeInTheDocument() // QSO level 1
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure', () => {
      render(<SkillTracker />)
      const heading = screen.getByText(/Operating Skills/i)
      expect(heading).toBeInTheDocument()
    })

    it('skill cards have accessible labels', () => {
      render(<SkillTracker />)
      // Level indicators should have aria-labels
      const levelIndicators = document.querySelectorAll('[aria-label*="Level"]')
      expect(levelIndicators.length).toBeGreaterThan(0)
    })

    it('freeze token display has accessible description', () => {
      render(<SkillTracker />)
      const tokenDisplay = document.querySelector('[aria-label*="freeze tokens"]')
      expect(tokenDisplay).toBeInTheDocument()
    })
  })

  describe('card descriptions', () => {
    it('shows component description', () => {
      render(<SkillTracker />)
      expect(screen.getByText(/Track your procedural skill mastery/i)).toBeInTheDocument()
    })
  })
})

// Note: Additional state tests would require more complex mock setup
// The core functionality is tested in the main describe block above
