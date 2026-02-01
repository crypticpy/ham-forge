/**
 * QSO Trainer Component Tests
 *
 * Tests for the virtual QSO trainer interactive component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QSOTrainer } from '@/components/features/learning/interactive/qso-trainer'

// Mock the flashcard store - Zustand uses a selector pattern
const mockUpdateSkillProgress = vi.fn()

const mockStore = {
  updateSkillProgress: mockUpdateSkillProgress,
}

vi.mock('@/stores/flashcard-store', () => ({
  useFlashcardStore: (selector?: (state: typeof mockStore) => unknown) => {
    if (selector) {
      return selector(mockStore)
    }
    return mockStore
  },
}))

describe('QSOTrainer', () => {
  beforeEach(() => {
    mockUpdateSkillProgress.mockClear()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<QSOTrainer />)
      expect(screen.getByText(/QSO Trainer/i)).toBeInTheDocument()
    })

    it('shows mode selection tabs', () => {
      render(<QSOTrainer />)
      expect(screen.getByRole('tab', { name: /learn/i })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: /practice/i })).toBeInTheDocument()
    })

    it('starts in learn mode by default', () => {
      render(<QSOTrainer />)
      const learnTab = screen.getByRole('tab', { name: /learn/i })
      expect(learnTab).toHaveAttribute('aria-selected', 'true')
    })

    it('displays scenario title', () => {
      render(<QSOTrainer />)
      // In learn mode, should show the "What is a QSO?" heading
      expect(screen.getByText(/What is a QSO\?/i)).toBeInTheDocument()
    })
  })

  describe('learn mode', () => {
    it('displays QSO procedure steps', () => {
      render(<QSOTrainer />)
      // Should show the standard QSO procedure heading
      expect(screen.getByText(/Standard QSO Procedure/i)).toBeInTheDocument()
    })

    it('shows common phrases in learn mode', () => {
      render(<QSOTrainer />)
      // Learn mode should display common phrases section
      expect(screen.getByText(/Common Phrases/i)).toBeInTheDocument()
    })
  })

  describe('practice mode', () => {
    it('switches to practice mode when tab is clicked', async () => {
      render(<QSOTrainer />)

      const practiceTab = screen.getByRole('tab', { name: /practice/i })
      fireEvent.click(practiceTab)

      await waitFor(() => {
        expect(practiceTab).toHaveAttribute('aria-selected', 'true')
      })
    })

    it('shows input field for user response in practice mode', async () => {
      render(<QSOTrainer />)

      const practiceTab = screen.getByRole('tab', { name: /practice/i })
      fireEvent.click(practiceTab)

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
      })
    })

    it('has submit button in practice mode', async () => {
      render(<QSOTrainer />)

      const practiceTab = screen.getByRole('tab', { name: /practice/i })
      fireEvent.click(practiceTab)

      await waitFor(() => {
        const buttons = screen.getAllByRole('button')
        const hasSubmitButton = buttons.some(
          (btn) =>
            btn.textContent?.toLowerCase().includes('check') ||
            btn.textContent?.toLowerCase().includes('submit')
        )
        expect(hasSubmitButton).toBe(true)
      })
    })
  })

  describe('scenario navigation', () => {
    it('shows current scenario number in practice mode', async () => {
      render(<QSOTrainer />)

      // Switch to practice mode
      const practiceTab = screen.getByRole('tab', { name: /practice/i })
      fireEvent.click(practiceTab)

      await waitFor(() => {
        // Should show "Scenario 1 of 6" in practice mode
        expect(screen.getByText(/Scenario 1 of/i)).toBeInTheDocument()
      })
    })

    it('has start practice button in learn mode', () => {
      render(<QSOTrainer />)
      // In learn mode, there's a Start Practice Session button
      expect(screen.getByRole('button', { name: /Start Practice Session/i })).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has heading', () => {
      render(<QSOTrainer />)
      expect(screen.getByText(/QSO Trainer/i)).toBeInTheDocument()
    })

    it('mode tabs are keyboard accessible', () => {
      render(<QSOTrainer />)
      const learnTab = screen.getByRole('tab', { name: /learn/i })
      const practiceTab = screen.getByRole('tab', { name: /practice/i })

      expect(learnTab).not.toHaveAttribute('tabindex', '-1')
      expect(practiceTab).not.toHaveAttribute('tabindex', '-1')
    })

    it('buttons have accessible names', () => {
      render(<QSOTrainer />)
      const buttons = screen.getAllByRole('button')
      buttons.forEach((button) => {
        // Each button should have accessible text content or aria-label
        const hasAccessibleName =
          button.textContent || button.getAttribute('aria-label') || button.getAttribute('title')
        expect(hasAccessibleName).toBeTruthy()
      })
    })
  })
})
