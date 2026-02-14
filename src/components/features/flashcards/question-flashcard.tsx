'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check, X, Image as ImageIcon } from 'lucide-react'
import type { QuestionCard } from '@/types/flashcard'

interface QuestionFlashcardProps {
  question: QuestionCard
  onResult: (selectedAnswer: number, correct: boolean, timeMs: number) => void
  showExplanation?: boolean
}

export function QuestionFlashcard({
  question,
  onResult,
  showExplanation = true,
}: QuestionFlashcardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const startTimeRef = useRef(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [question.id])

  const handleSelect = useCallback((index: number) => {
    if (revealed) return
    setSelectedAnswer(index)
  }, [revealed])

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return

    const timeMs = Date.now() - startTimeRef.current
    const correct = selectedAnswer === question.correctAnswer
    setRevealed(true)

    // Delay the callback to show result
    setTimeout(() => {
      onResult(selectedAnswer, correct, timeMs)
    }, 1500)
  }, [selectedAnswer, question.correctAnswer, onResult])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!revealed) {
        handleSelect(index)
      }
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (revealed) return

      const keyMap: Record<string, number> = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      }

      if (e.key.toLowerCase() in keyMap) {
        e.preventDefault()
        handleSelect(keyMap[e.key.toLowerCase()])
      } else if (e.key === 'Enter' && selectedAnswer !== null) {
        e.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [revealed, selectedAnswer, handleSelect, handleSubmit])

  const answerLabels = ['A', 'B', 'C', 'D']

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question card */}
      <div
        className={cn(
          'rounded-2xl p-6',
          'bg-gradient-to-br from-card to-card/80',
          'border shadow-xl',
          revealed
            ? selectedAnswer === question.correctAnswer
              ? 'border-emerald-500/50'
              : 'border-red-500/50'
            : 'border-border/50'
        )}
      >
        {/* Question ID badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
            {question.questionId}
          </span>
          {question.figure && (
            <span className="text-xs flex items-center gap-1 text-muted-foreground">
              <ImageIcon className="size-3" />
              Figure {question.figure}
            </span>
          )}
        </div>

        {/* Question text */}
        <div className="mb-6">
          <p className="text-lg font-medium leading-relaxed">{question.question}</p>
        </div>

        {/* Answer options */}
        <div className="space-y-3" role="radiogroup" aria-label="Answer options">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showAsCorrect = revealed && isCorrect
            const showAsIncorrect = revealed && isSelected && !isCorrect

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={revealed}
                role="radio"
                aria-checked={isSelected}
                className={cn(
                  'w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all',
                  'border-2',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'min-h-[60px] touch-manipulation',
                  revealed
                    ? showAsCorrect
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : showAsIncorrect
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-border/30 opacity-50'
                    : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                )}
              >
                {/* Answer label */}
                <span
                  className={cn(
                    'flex items-center justify-center size-8 rounded-lg shrink-0',
                    'text-sm font-bold',
                    revealed
                      ? showAsCorrect
                        ? 'bg-emerald-500 text-white'
                        : showAsIncorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      : isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {revealed ? (
                    showAsCorrect ? (
                      <Check className="size-4" />
                    ) : showAsIncorrect ? (
                      <X className="size-4" />
                    ) : (
                      answerLabels[index]
                    )
                  ) : (
                    answerLabels[index]
                  )}
                </span>

                {/* Answer text */}
                <span className="flex-1 pt-1">{answer}</span>
              </button>
            )
          })}
        </div>

        {/* Submit button */}
        {!revealed && (
          <motion.button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className={cn(
              'w-full mt-6 py-3 rounded-xl font-semibold transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selectedAnswer !== null
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            whileTap={selectedAnswer !== null ? { scale: 0.98 } : undefined}
          >
            {selectedAnswer !== null ? 'Check Answer' : 'Select an answer'}
          </motion.button>
        )}

        {/* Result feedback */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div
              className={cn(
                'p-4 rounded-xl',
                selectedAnswer === question.correctAnswer
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === question.correctAnswer ? (
                  <>
                    <Check className="size-5 text-emerald-500" />
                    <span className="font-semibold text-emerald-500">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="size-5 text-red-500" />
                    <span className="font-semibold text-red-500">Incorrect</span>
                  </>
                )}
              </div>
              {showExplanation && question.explanation && (
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="hidden sm:flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">1-4</kbd> or{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">A-D</kbd> select
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Enter</kbd> submit
        </span>
      </div>
    </motion.div>
  )
}
