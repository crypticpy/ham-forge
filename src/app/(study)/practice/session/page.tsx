'use client'

import { useEffect, useSyncExternalStore, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePracticeSession, type SessionConfig } from '@/hooks/use-practice-session'
import { useHydration } from '@/hooks/use-hydration'
import { useActivityStore } from '@/stores/activity-store'
import { QuestionCard } from '@/components/features/practice/question-card'
import { PracticeHeader } from '@/components/features/practice/practice-header'
import { QuickStudyTimer } from '@/components/features/practice/quick-study-timer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, Trophy, RotateCcw, Home, Timer } from 'lucide-react'
import Link from 'next/link'

// Cache for getSessionConfig to avoid infinite loops with useSyncExternalStore
let cachedConfigJson: string | null = null
let cachedConfig: SessionConfig | null = null

// Clear the module-level cache (called when session completes)
function clearSessionCache() {
  cachedConfigJson = null
  cachedConfig = null
}

// Read session config from sessionStorage safely (cached to prevent infinite loops)
function getSessionConfig(): SessionConfig | null {
  if (typeof window === 'undefined') return null
  const stored = sessionStorage.getItem('practiceConfig')
  if (!stored) {
    cachedConfigJson = null
    cachedConfig = null
    return null
  }
  // Only parse if the JSON string changed
  if (stored !== cachedConfigJson) {
    try {
      cachedConfigJson = stored
      cachedConfig = JSON.parse(stored) as SessionConfig
    } catch {
      cachedConfigJson = null
      cachedConfig = null
    }
  }
  return cachedConfig
}

// Subscribe function for useSyncExternalStore (sessionStorage doesn't fire events within same tab)
function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export default function PracticeSessionPage() {
  const router = useRouter()
  const isHydrated = useHydration()

  // Use useSyncExternalStore to safely read from sessionStorage
  const config = useSyncExternalStore(
    subscribeToStorage,
    getSessionConfig,
    () => null // Server snapshot
  )

  // Redirect if no config (only after client hydration)
  useEffect(() => {
    if (isHydrated && !config) {
      router.push('/practice')
    }
  }, [isHydrated, config, router])

  // Show loading state during SSR/hydration or if no config yet
  if (!isHydrated || !config) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <PracticeSession config={config} />
}

function PracticeSession({ config }: { config: SessionConfig }) {
  const router = useRouter()
  const [timeExpired, setTimeExpired] = useState(false)
  const recordActivity = useActivityStore((s) => s.recordActivity)
  const {
    questions,
    currentIndex,
    currentQuestion,
    isComplete,
    isLoading,
    error,
    stats,
    submitAnswer,
    nextQuestion,
  } = usePracticeSession(config)

  // Record activity for "continue where you left off" feature
  // Tracks both in-progress sessions AND completion status
  useEffect(() => {
    if (isLoading || questions.length === 0) return

    const isQuickStudy = config.isQuickStudy && config.durationSeconds
    const sessionComplete = isComplete || timeExpired

    if (sessionComplete) {
      // Record completion - this prevents "continue" prompt from showing
      recordActivity({
        type: 'practice',
        path: '/practice',
        label: isQuickStudy
          ? `Completed Quick Study - ${stats.answered} questions, ${stats.accuracy}%`
          : `Completed Practice - ${stats.correct}/${stats.totalQuestions} correct`,
        metadata: {
          questionIndex: currentIndex,
          totalQuestions: questions.length,
          isComplete: true,
          accuracy: stats.accuracy,
        },
      })

      // Clear session config after completion so "Continue where you left off" works correctly
      sessionStorage.removeItem('practiceConfig')
      clearSessionCache()
    } else {
      // Record in-progress - enables "continue where you left off"
      recordActivity({
        type: 'practice',
        path: '/practice/session',
        label: isQuickStudy
          ? `Quick Study - ${stats.answered + 1} questions`
          : `Practice - Question ${currentIndex + 1} of ${questions.length}`,
        metadata: {
          questionIndex: currentIndex,
          totalQuestions: questions.length,
          isComplete: false,
        },
      })
    }
  }, [
    currentIndex,
    questions.length,
    isLoading,
    isComplete,
    timeExpired,
    config.isQuickStudy,
    config.durationSeconds,
    stats.answered,
    stats.accuracy,
    stats.correct,
    stats.totalQuestions,
    recordActivity,
  ])

  // Handle quick study timer expiration
  const handleTimeUp = useCallback(() => {
    setTimeExpired(true)
  }, [])

  // Determine if session is complete (either finished all questions or time expired)
  const sessionComplete = isComplete || timeExpired
  const isQuickStudy = config.isQuickStudy && config.durationSeconds

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading questions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl px-3 pt-3 pb-4 sm:p-4">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Questions</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/practice')}>Return to Practice</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto max-w-2xl px-3 pt-3 pb-4 sm:p-4">
        <Card>
          <CardHeader>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>
              No questions match your selected filters. Try adjusting your settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/practice')}>Return to Practice</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (sessionComplete) {
    // Show results screen
    const completionTitle = timeExpired ? "Time's Up!" : 'Session Complete'
    const completionMessage = timeExpired
      ? `You answered ${stats.answered} questions in ${Math.floor((config.durationSeconds || 300) / 60)} minutes`
      : `You completed ${stats.totalQuestions} questions`

    return (
      <div className="container mx-auto max-w-2xl px-3 pt-3 pb-4 sm:p-4">
        <PracticeHeader title={completionTitle} showBack={false} />

        <div className="mt-6 space-y-6">
          {/* Results Summary */}
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {timeExpired ? (
                  <Timer className="size-16 text-emerald-500" />
                ) : stats.accuracy >= 70 ? (
                  <Trophy className="size-16 text-amber-500" />
                ) : (
                  <CheckCircle className="size-16 text-primary" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {stats.accuracy >= 85
                  ? 'Excellent!'
                  : stats.accuracy >= 70
                    ? 'Good Job!'
                    : stats.accuracy >= 50
                      ? 'Keep Practicing!'
                      : 'Room for Improvement'}
              </CardTitle>
              <CardDescription>{completionMessage}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="size-5" />
                    <span className="text-2xl font-bold">{stats.correct}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Correct</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="size-5" />
                    <span className="text-2xl font-bold">{stats.incorrect}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Incorrect</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg text-center">
                <p className="text-4xl font-bold text-primary">{stats.accuracy}%</p>
                <p className="text-sm text-muted-foreground mt-1">Accuracy</p>
              </div>

              {/* Quick Study specific stats */}
              {timeExpired && (
                <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg text-center">
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                    {stats.answered} questions answered
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Average:{' '}
                    {stats.answered > 0
                      ? Math.round((config.durationSeconds || 300) / stats.answered)
                      : 0}{' '}
                    seconds per question
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                // Restart with same config
                window.location.reload()
              }}
            >
              <RotateCcw className="size-4 mr-2" />
              {timeExpired ? 'Try Again' : 'Practice Again'}
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/practice">
                <Home className="size-4 mr-2" />
                Back to Practice
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Active practice session
  const sessionTitle = isQuickStudy
    ? '5-Minute Quick Study'
    : `${config.examLevel.charAt(0).toUpperCase() + config.examLevel.slice(1)} Practice`
  const sessionSubtitle = isQuickStudy
    ? `${stats.answered} answered`
    : `Question ${currentIndex + 1} of ${questions.length}`

  return (
    <div className="container mx-auto max-w-2xl px-3 pt-2 pb-4 sm:p-4 session-shell">
      {/* Header with optional timer */}
      <div className="sticky session-header-safe z-20 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 py-2 sm:px-4 sm:py-3 -mx-3 sm:-mx-4 -mt-2 sm:-mt-4 mb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="size-11 sm:size-9" asChild>
            <Link href="/practice">
              <Home className="size-4 sm:size-5" />
              <span className="sr-only">Back to Practice</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-semibold leading-tight">{sessionTitle}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">{sessionSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isQuickStudy ? (
            <QuickStudyTimer durationSeconds={config.durationSeconds!} onTimeUp={handleTimeUp} />
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 sm:px-3">
              <span className="text-xs sm:text-sm font-medium">{currentIndex + 1}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">/</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{questions.length}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-6 session-footer-safe">
        {currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={isQuickStudy ? stats.answered + 1 : questions.length}
            shuffleAnswers={config.shuffleAnswers}
            showExplanation={config.showExplanations}
            onAnswer={submitAnswer}
            onNext={nextQuestion}
          />
        )}
      </div>

      {/* Progress bar at bottom */}
      <div className="mt-3 sm:mt-6">
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
          <span>{isQuickStudy ? 'Stats' : 'Progress'}</span>
          <span>
            {stats.correct} correct, {stats.incorrect} incorrect
          </span>
        </div>
        {!isQuickStudy && (
          <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentIndex / questions.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
