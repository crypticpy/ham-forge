'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Flashcard,
  LearningCardContent,
  LearningCardBack,
} from '@/components/features/flashcards/flashcard'
import { QuestionFlashcard } from '@/components/features/flashcards/question-flashcard'
import { SessionResults } from '@/components/features/flashcards/session-results'
import { useFlashcardStore } from '@/stores/flashcard-store'
import { useHydration } from '@/hooks/use-hydration'
import { getLearningCards, convertToQuestionCards } from '@/data/flashcards'
import { selectCards, calculateSessionSummary } from '@/lib/flashcard-algorithm'
import { getQuestionPool } from '@/lib/question-scheduler'
import { cn } from '@/lib/utils'
import { Loader2, ArrowLeft, Lightbulb, HelpCircle, Trophy, ChevronRight, X } from 'lucide-react'
import type {
  LearningCard,
  QuestionCard,
  SessionPhase,
  CardResult,
  QuestionResult,
  SessionSummary,
} from '@/types/flashcard'

interface SessionConfig {
  deckId: string
  mode: 'adaptive' | 'review' | 'explore' | 'focus'
  focusCategories?: string[]
  examLevel: 'technician' | 'general'
  learningCardCount: number
  questionCardCount: number
}

export default function FlashcardSessionPage() {
  const router = useRouter()
  const isHydrated = useHydration()
  const { cardProgress, getAllCategoryProgress, updateCardProgress, recordSession } =
    useFlashcardStore()

  // Session state
  const [phase, setPhase] = useState<SessionPhase>('learning')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cards
  const [learningCards, setLearningCards] = useState<LearningCard[]>([])
  const [questionCards, setQuestionCards] = useState<QuestionCard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Results
  const [learningResults, setLearningResults] = useState<CardResult[]>([])
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])
  const [startTime] = useState(new Date().toISOString())
  const [summary, setSummary] = useState<SessionSummary | null>(null)

  // Load session config and cards
  useEffect(() => {
    if (!isHydrated) return

    const loadSession = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get config from session storage
        const configStr = sessionStorage.getItem('flashcardConfig')
        if (!configStr) {
          router.push('/flashcards')
          return
        }

        const sessionConfig: SessionConfig = JSON.parse(configStr)

        // Load learning cards
        const allLearningCards = getLearningCards(sessionConfig.examLevel)

        // Load question pool
        const questionPool = getQuestionPool(sessionConfig.examLevel)
        const allQuestionCards = convertToQuestionCards(questionPool, allLearningCards)

        // Get category progress for algorithm
        const categoryProgress = getAllCategoryProgress()

        // Build progress map
        const progressMap = new Map(Object.entries(cardProgress).map(([id, prog]) => [id, prog]))

        // Select cards using algorithm
        const selection = selectCards(
          allLearningCards,
          allQuestionCards,
          progressMap,
          categoryProgress,
          {
            learningCount: sessionConfig.learningCardCount,
            questionCount: sessionConfig.questionCardCount,
            mode: sessionConfig.mode,
            focusCategories: sessionConfig.focusCategories,
          }
        )

        setLearningCards(selection.learningCards)
        setQuestionCards(selection.questionCards)
      } catch (err) {
        console.error('Failed to load session:', err)
        setError('Failed to load flashcards. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [isHydrated, router, getAllCategoryProgress, cardProgress])

  // Handle learning card result
  const handleLearningResult = useCallback(
    (passed: boolean, timeMs: number) => {
      const card = learningCards[currentIndex]
      if (!card) return

      // Record result
      setLearningResults((prev) => [...prev, { cardId: card.id, passed, timeMs }])

      // Update progress in store
      updateCardProgress(card.id, 'learning', card.subelement, card.group, passed, timeMs)

      // Move to next card or phase
      if (currentIndex < learningCards.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        // Move to question phase
        setPhase('questions')
        setCurrentIndex(0)
      }
    },
    [learningCards, currentIndex, updateCardProgress]
  )

  // Handle question card result
  const handleQuestionResult = useCallback(
    (selectedAnswer: number, correct: boolean, timeMs: number) => {
      const card = questionCards[currentIndex]
      if (!card) return

      // Record result
      setQuestionResults((prev) => [
        ...prev,
        { cardId: card.id, passed: correct, correct, selectedAnswer, timeMs },
      ])

      // Update progress in store
      updateCardProgress(card.id, 'question', card.subelement, card.group, correct, timeMs)

      // Move to next card or results
      if (currentIndex < questionCards.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        // Calculate and show results
        const sessionSummary = calculateSessionSummary(
          learningResults.concat([{ cardId: card.id, passed: correct, timeMs }]),
          questionResults.concat([
            { cardId: card.id, passed: correct, correct, selectedAnswer, timeMs },
          ]),
          learningCards,
          questionCards,
          startTime
        )
        setSummary(sessionSummary)
        recordSession(sessionSummary)
        setPhase('results')
      }
    },
    [
      questionCards,
      currentIndex,
      updateCardProgress,
      learningResults,
      questionResults,
      learningCards,
      startTime,
      recordSession,
    ]
  )

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    // Reload the page to start fresh
    window.location.reload()
  }, [])

  // Current progress
  const totalCards = learningCards.length + questionCards.length
  const completedCards =
    phase === 'learning'
      ? currentIndex
      : phase === 'questions'
        ? learningCards.length + currentIndex
        : totalCards

  const progressPercent = totalCards > 0 ? (completedCards / totalCards) * 100 : 0

  // Loading state
  if (!isHydrated || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Preparing your flashcards...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="flex items-center justify-center size-16 rounded-full bg-red-500/10">
          <X className="size-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.push('/flashcards')}>Back to Flashcards</Button>
      </div>
    )
  }

  // No cards state
  if (learningCards.length === 0 && questionCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="flex items-center justify-center size-16 rounded-full bg-muted">
          <Trophy className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">All caught up!</h2>
        <p className="text-muted-foreground">
          No cards match your current filters. Try a different study mode.
        </p>
        <Button onClick={() => router.push('/flashcards')}>Choose Another Deck</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/flashcards">
                <ArrowLeft className="size-5" />
                <span className="sr-only">Back to flashcards</span>
              </Link>
            </Button>

            {/* Phase indicator */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                  phase === 'learning'
                    ? 'bg-blue-500/10 text-blue-500'
                    : phase === 'questions'
                      ? 'bg-purple-500/10 text-purple-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                )}
              >
                {phase === 'learning' ? (
                  <>
                    <Lightbulb className="size-4" />
                    <span>Learning</span>
                  </>
                ) : phase === 'questions' ? (
                  <>
                    <HelpCircle className="size-4" />
                    <span>Questions</span>
                  </>
                ) : (
                  <>
                    <Trophy className="size-4" />
                    <span>Complete</span>
                  </>
                )}
              </div>
            </div>

            {/* Progress counter */}
            {phase !== 'results' && (
              <div className="text-sm text-muted-foreground">
                {phase === 'learning'
                  ? `${currentIndex + 1}/${learningCards.length}`
                  : `${currentIndex + 1}/${questionCards.length}`}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {phase !== 'results' && (
            <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
        <AnimatePresence mode="wait">
          {phase === 'learning' && learningCards[currentIndex] && (
            <motion.div
              key={`learning-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Flashcard
                front={
                  <LearningCardContent
                    title={learningCards[currentIndex].front.title}
                    prompt={learningCards[currentIndex].front.prompt}
                  />
                }
                back={
                  <LearningCardBack
                    explanation={learningCards[currentIndex].back.explanation}
                    keyFact={learningCards[currentIndex].back.keyFact}
                    examTip={learningCards[currentIndex].back.examTip}
                    mnemonic={learningCards[currentIndex].back.mnemonic}
                  />
                }
                onResult={handleLearningResult}
                category={learningCards[currentIndex].front.category}
              />
            </motion.div>
          )}

          {phase === 'questions' && questionCards[currentIndex] && (
            <motion.div
              key={`question-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionFlashcard
                question={questionCards[currentIndex]}
                onResult={handleQuestionResult}
              />
            </motion.div>
          )}

          {phase === 'results' && summary && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SessionResults summary={summary} onPlayAgain={handlePlayAgain} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Phase transition */}
      {phase === 'learning' && currentIndex === learningCards.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Next up:</span>
              <div className="flex items-center gap-1 text-purple-500 font-medium">
                <HelpCircle className="size-4" />
                Question Cards
                <ChevronRight className="size-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
