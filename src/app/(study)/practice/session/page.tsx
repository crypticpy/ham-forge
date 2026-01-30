'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { usePracticeSession, type SessionConfig } from '@/hooks/use-practice-session'
import { useHydration } from '@/hooks/use-hydration'
import { QuestionCard } from '@/components/features/practice/question-card'
import { PracticeHeader } from '@/components/features/practice/practice-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, Trophy, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

// Cache for getSessionConfig to avoid infinite loops with useSyncExternalStore
let cachedConfigJson: string | null = null
let cachedConfig: SessionConfig | null = null

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
      <div className="container mx-auto p-4 max-w-2xl">
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
      <div className="container mx-auto p-4 max-w-2xl">
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

  if (isComplete) {
    // Show results screen
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <PracticeHeader title="Session Complete" showBack={false} />

        <div className="mt-6 space-y-6">
          {/* Results Summary */}
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {stats.accuracy >= 70 ? (
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
              <CardDescription>You completed {stats.totalQuestions} questions</CardDescription>
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
              Practice Again
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
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <PracticeHeader
        title={`${config.examLevel.charAt(0).toUpperCase() + config.examLevel.slice(1)} Practice`}
        subtitle={`Question ${currentIndex + 1} of ${questions.length}`}
        progress={{
          current: currentIndex + 1,
          total: questions.length,
        }}
      />

      <div className="mt-6">
        {currentQuestion && (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            shuffleAnswers={config.shuffleAnswers}
            showExplanation={config.showExplanations}
            onAnswer={submitAnswer}
            onNext={nextQuestion}
          />
        )}
      </div>

      {/* Progress bar at bottom */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>
            {stats.correct} correct, {stats.incorrect} incorrect
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
