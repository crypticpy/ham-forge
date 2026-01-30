'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Question } from '@/types'
import { AnswerButton } from './answer-button'
import { FigureDisplay } from './figure-display'
import { ExplanationCard } from './explanation-card'
import { FlagButton } from './flag-button'
import { ConfidenceSelector } from './confidence-selector'
import { ChevronRight } from 'lucide-react'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  shuffleAnswers?: boolean
  showExplanation?: boolean
  showConfidence?: boolean
  onAnswer: (selectedIndex: number, isCorrect: boolean, confidence?: number) => void
  onNext: () => void
}

const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const

interface ShuffledAnswer {
  text: string
  originalIndex: number
}

// Create shuffled answers array - this runs once during state initialization
function createShuffledAnswers(answers: string[], shouldShuffle: boolean): ShuffledAnswer[] {
  const indexed = answers.map((text, index) => ({ text, originalIndex: index }))

  if (!shouldShuffle) {
    return indexed
  }

  // Fisher-Yates shuffle
  const shuffled = [...indexed]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  shuffleAnswers = true,
  showExplanation = true,
  showConfidence = true,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [selectedConfidence, setSelectedConfidence] = useState<number | undefined>(undefined)

  // Use lazy state initialization - the function only runs once when state is first created
  const [shuffledAnswers, setShuffledAnswers] = useState<ShuffledAnswer[]>(() =>
    createShuffledAnswers(question.answers, shuffleAnswers)
  )

  const handleAnswerClick = useCallback(
    (shuffledIndex: number) => {
      if (isRevealed) return
      setSelectedAnswer(shuffledIndex)
    },
    [isRevealed]
  )

  // Submit just reveals the answer - actual recording happens on Next
  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return
    setIsRevealed(true)
  }, [selectedAnswer])

  // Next records the answer with confidence and moves to next question
  const handleNext = useCallback(() => {
    if (selectedAnswer !== null) {
      const originalIndex = shuffledAnswers[selectedAnswer].originalIndex
      const isCorrectAnswer = originalIndex === question.correctAnswer
      // Default confidence to 3 (neutral) if not selected
      onAnswer(originalIndex, isCorrectAnswer, selectedConfidence ?? 3)
    }
    setSelectedAnswer(null)
    setIsRevealed(false)
    setSelectedConfidence(undefined)
    onNext()
  }, [
    onNext,
    selectedAnswer,
    shuffledAnswers,
    question.correctAnswer,
    onAnswer,
    selectedConfidence,
  ])

  // Determine if user answered correctly
  const isCorrect =
    isRevealed && selectedAnswer !== null
      ? shuffledAnswers[selectedAnswer].originalIndex === question.correctAnswer
      : false

  // Reset state when question changes (via key prop from parent is preferred,
  // but this handles edge cases)
  const currentQuestionId = question.id
  const [lastQuestionId, setLastQuestionId] = useState(currentQuestionId)

  if (currentQuestionId !== lastQuestionId) {
    setLastQuestionId(currentQuestionId)
    setSelectedAnswer(null)
    setIsRevealed(false)
    setSelectedConfidence(undefined)
    setShuffledAnswers(createShuffledAnswers(question.answers, shuffleAnswers))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <CardTitle className="text-lg sm:text-xl">
              Question {questionNumber} of {totalQuestions}
            </CardTitle>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              {question.id}
            </span>
          </div>
          <FlagButton questionId={question.id} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question text */}
        <p className="text-base sm:text-lg font-medium leading-relaxed">{question.question}</p>

        {/* Figure display if applicable */}
        {question.figure && <FigureDisplay figure={question.figure} />}

        {/* Answer buttons */}
        <div className="space-y-3" role="group" aria-label="Answer options">
          {shuffledAnswers.map((answer, shuffledIndex) => {
            const isThisCorrect = answer.originalIndex === question.correctAnswer
            return (
              <AnswerButton
                key={`${question.id}-${answer.originalIndex}`}
                label={ANSWER_LABELS[shuffledIndex]}
                text={answer.text}
                isSelected={selectedAnswer === shuffledIndex}
                isCorrect={isRevealed ? isThisCorrect : undefined}
                isRevealed={isRevealed}
                disabled={isRevealed}
                onClick={() => handleAnswerClick(shuffledIndex)}
              />
            )
          })}
        </div>

        {/* Submit button (before reveal) */}
        {!isRevealed && (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full sm:w-auto"
            size="lg"
          >
            Submit Answer
          </Button>
        )}

        {/* After reveal: Confidence, Explanation and Next button */}
        {isRevealed && (
          <div className="space-y-4">
            {/* Confidence selector */}
            {showConfidence && (
              <ConfidenceSelector
                onSelect={setSelectedConfidence}
                selectedConfidence={selectedConfidence}
              />
            )}

            {showExplanation && (
              <ExplanationCard
                explanation={question.explanation}
                refs={question.refs}
                isCorrect={isCorrect}
              />
            )}
            <Button onClick={handleNext} className="w-full sm:w-auto" size="lg">
              Next Question
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
