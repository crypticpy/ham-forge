'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  RotateCcw,
  BookOpen,
  Check,
  X,
  Loader2,
} from 'lucide-react'
import { ExamResultsCard } from '@/components/features/exam/results-card'
import {
  SubelementChart,
  TECHNICIAN_SUBELEMENT_NAMES,
  GENERAL_SUBELEMENT_NAMES,
} from '@/components/features/exam/subelement-chart'
import { FigureDisplay } from '@/components/features/practice/figure-display'
import { ExplanationCard } from '@/components/features/practice/explanation-card'
import { getExamAttempt } from '@/lib/exam-storage'
import { getQuestionPool } from '@/lib/question-scheduler'
import type { ExamAttempt, Question } from '@/types'
import { cn } from '@/lib/utils'
import { use } from 'react'

const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const

interface ExamReviewPageProps {
  params: Promise<{ examId: string }>
}

interface ReviewQuestion {
  question: Question
  selectedAnswer: number
  correct: boolean
}

export default function ExamReviewPage({ params }: ExamReviewPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null)
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number | null>(null)
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false)

  // Load exam attempt
  useEffect(() => {
    async function loadAttempt() {
      try {
        const examAttempt = await getExamAttempt(resolvedParams.examId)

        if (!examAttempt) {
          setError('Exam not found')
          setIsLoading(false)
          return
        }

        setAttempt(examAttempt)

        // Load questions from pool
        const pool = getQuestionPool(examAttempt.examLevel)
        const poolMap = new Map(pool.map((q) => [q.id, q]))

        const questions: ReviewQuestion[] = examAttempt.answers
          .map((answer) => {
            const question = poolMap.get(answer.questionId)
            if (!question) return null
            return {
              question,
              selectedAnswer: answer.selectedAnswer,
              correct: answer.correct,
            }
          })
          .filter((q): q is ReviewQuestion => q !== null)

        setReviewQuestions(questions)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exam')
        setIsLoading(false)
      }
    }

    loadAttempt()
  }, [resolvedParams.examId])

  const handleRetakeExam = () => {
    sessionStorage.removeItem('hamforge-exam-session')
    const examId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    router.push(`/exam/${examId}`)
  }

  const handleReviewWeakAreas = () => {
    if (!attempt) return

    // Get incorrect question IDs
    const incorrectIds = attempt.answers.filter((a) => !a.correct).map((a) => a.questionId)

    // Store in session storage for practice mode
    sessionStorage.setItem(
      'practiceConfig',
      JSON.stringify({
        examLevel: attempt.examLevel,
        questionCount: incorrectIds.length,
        questionIds: incorrectIds, // Custom filter
        shuffleAnswers: true,
        showExplanations: true,
      })
    )

    router.push('/practice/session')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl py-6 px-4">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading exam results...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !attempt) {
    return (
      <div className="container mx-auto max-w-3xl py-6 px-4">
        <Card className="border-destructive">
          <CardContent className="py-8 text-center">
            <X className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Exam Not Found</h2>
            <p className="text-muted-foreground mb-4">{error || 'Unable to load exam results'}</p>
            <Button onClick={() => router.push('/exam')}>Back to Exam Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get subelement data for chart
  const subelementNames =
    attempt.examLevel === 'technician' ? TECHNICIAN_SUBELEMENT_NAMES : GENERAL_SUBELEMENT_NAMES

  const subelementStats = new Map<string, { correct: number; total: number }>()

  for (const rq of reviewQuestions) {
    const sub = rq.question.subelement
    if (!subelementStats.has(sub)) {
      subelementStats.set(sub, { correct: 0, total: 0 })
    }
    const stats = subelementStats.get(sub)!
    stats.total++
    if (rq.correct) {
      stats.correct++
    }
  }

  const subelementData = Array.from(subelementStats.entries()).map(([id, stats]) => ({
    id,
    name: subelementNames[id] || id,
    correct: stats.correct,
    total: stats.total,
    percentage: Math.round((stats.correct / stats.total) * 100),
  }))

  const correctCount = attempt.answers.filter((a) => a.correct).length
  const totalQuestions = attempt.answers.length
  const incorrectQuestions = reviewQuestions.filter((rq) => !rq.correct)

  // Question review mode
  if (currentReviewIndex !== null) {
    const questionsToReview = showOnlyIncorrect ? incorrectQuestions : reviewQuestions
    const currentReview = questionsToReview[currentReviewIndex]

    if (!currentReview) {
      setCurrentReviewIndex(null)
      return null
    }

    const { question, selectedAnswer, correct } = currentReview
    const isFirst = currentReviewIndex === 0
    const isLast = currentReviewIndex === questionsToReview.length - 1

    return (
      <div className="container mx-auto max-w-3xl py-6 px-4">
        {/* Back button */}
        <Button variant="ghost" className="mb-4" onClick={() => setCurrentReviewIndex(null)}>
          <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
          Back to Results
        </Button>

        {/* Question Review Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentReviewIndex + 1} of {questionsToReview.length}
                {showOnlyIncorrect && ' (Incorrect Only)'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {question.id}
                </span>
                {correct ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <Check className="size-3" /> Correct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    <X className="size-3" /> Incorrect
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question text */}
            <p className="text-base sm:text-lg font-medium leading-relaxed">{question.question}</p>

            {/* Figure display if applicable */}
            {question.figure && <FigureDisplay figure={question.figure} />}

            {/* Answer buttons (review mode - show correct/incorrect) */}
            <div className="space-y-3" role="group" aria-label="Answer options">
              {question.answers.map((answer, index) => {
                const isCorrectAnswer = index === question.correctAnswer
                const isSelected = selectedAnswer === index
                const wasWrongSelection = isSelected && !isCorrectAnswer

                return (
                  <div
                    key={`${question.id}-${index}`}
                    className={cn(
                      'w-full flex items-start gap-3 p-4 rounded-lg border-2',
                      isCorrectAnswer && 'border-green-500 bg-green-500/10',
                      wasWrongSelection && 'border-red-500 bg-red-500/10',
                      !isCorrectAnswer &&
                        !wasWrongSelection &&
                        'border-border bg-muted/30 opacity-60'
                    )}
                  >
                    <span
                      className={cn(
                        'flex items-center justify-center size-8 rounded-full text-sm font-semibold shrink-0 border-2',
                        isCorrectAnswer && 'border-green-500 bg-green-500 text-white',
                        wasWrongSelection && 'border-red-500 bg-red-500 text-white',
                        !isCorrectAnswer &&
                          !wasWrongSelection &&
                          'border-muted-foreground/30 bg-muted text-muted-foreground'
                      )}
                    >
                      {ANSWER_LABELS[index]}
                    </span>
                    <span
                      className={cn(
                        'flex-1 pt-1',
                        isCorrectAnswer && 'text-green-700 dark:text-green-400',
                        wasWrongSelection && 'text-red-700 dark:text-red-400'
                      )}
                    >
                      {answer}
                    </span>
                    {isCorrectAnswer && (
                      <Check
                        className="size-5 text-green-600 dark:text-green-400 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {wasWrongSelection && (
                      <X
                        className="size-5 text-red-600 dark:text-red-400 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Explanation */}
            <ExplanationCard
              explanation={question.explanation}
              refs={question.refs}
              isCorrect={correct}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentReviewIndex(currentReviewIndex - 1)}
                disabled={isFirst}
              >
                <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
                Previous
              </Button>
              <Button
                onClick={() => setCurrentReviewIndex(currentReviewIndex + 1)}
                disabled={isLast}
              >
                Next
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main results view
  return (
    <div className="container mx-auto max-w-3xl py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Exam Results</h1>
        <p className="text-muted-foreground">
          {attempt.examLevel === 'technician' ? 'Technician' : 'General'} Practice Exam
        </p>
      </div>

      {/* Results Card */}
      <div className="mb-8">
        <ExamResultsCard
          score={attempt.score}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
          passed={attempt.passed}
          passingScore={26}
          timeTaken={attempt.timeSpent}
        />
      </div>

      {/* Subelement Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Performance by Topic</CardTitle>
          <CardDescription>See which areas need more practice</CardDescription>
        </CardHeader>
        <CardContent>
          <SubelementChart data={subelementData} showDetails={true} />
        </CardContent>
      </Card>

      {/* Review Questions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Review Questions</CardTitle>
          <CardDescription>
            {incorrectQuestions.length > 0
              ? `You missed ${incorrectQuestions.length} question${incorrectQuestions.length !== 1 ? 's' : ''}`
              : 'Perfect score! Review any question below.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button
              variant={showOnlyIncorrect ? 'default' : 'outline'}
              onClick={() => {
                setShowOnlyIncorrect(true)
                setCurrentReviewIndex(0)
              }}
              disabled={incorrectQuestions.length === 0}
            >
              <X className="size-4 mr-1" aria-hidden="true" />
              Review Incorrect ({incorrectQuestions.length})
            </Button>
            <Button
              variant={!showOnlyIncorrect ? 'default' : 'outline'}
              onClick={() => {
                setShowOnlyIncorrect(false)
                setCurrentReviewIndex(0)
              }}
            >
              <BookOpen className="size-4 mr-1" aria-hidden="true" />
              Review All ({reviewQuestions.length})
            </Button>
          </div>

          {/* Quick list of incorrect questions */}
          {incorrectQuestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">Missed Questions:</p>
              {incorrectQuestions.slice(0, 5).map((rq, idx) => (
                <button
                  key={rq.question.id}
                  onClick={() => {
                    setShowOnlyIncorrect(true)
                    setCurrentReviewIndex(idx)
                  }}
                  className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono text-muted-foreground mt-0.5">
                      {rq.question.id}
                    </span>
                    <span className="text-sm line-clamp-2">{rq.question.question}</span>
                  </div>
                </button>
              ))}
              {incorrectQuestions.length > 5 && (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setShowOnlyIncorrect(true)
                    setCurrentReviewIndex(0)
                  }}
                >
                  View all {incorrectQuestions.length} missed questions
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1" onClick={() => router.push('/exam')}>
          <Home className="size-4 mr-2" aria-hidden="true" />
          Back to Exam Home
        </Button>
        {incorrectQuestions.length > 0 && (
          <Button variant="outline" className="flex-1" onClick={handleReviewWeakAreas}>
            <BookOpen className="size-4 mr-2" aria-hidden="true" />
            Practice Weak Areas
          </Button>
        )}
        <Button className="flex-1" onClick={handleRetakeExam}>
          <RotateCcw className="size-4 mr-2" aria-hidden="true" />
          Take Another Exam
        </Button>
      </div>
    </div>
  )
}
