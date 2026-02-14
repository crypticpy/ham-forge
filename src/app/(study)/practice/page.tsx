'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Target,
  Brain,
  Trophy,
  Zap,
  Settings2,
  Loader2,
  Timer,
  Flame,
  ChevronRight,
  Clock,
  BarChart3,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Keyboard,
} from 'lucide-react'
import {
  SessionConfig,
  type SessionConfig as SessionConfigType,
} from '@/components/features/practice/session-config'
import { useStudyStore } from '@/stores/study-store'
import { useProgressStore } from '@/stores/progress-store'
import { useActivityStore } from '@/stores/activity-store'
import { useHydration } from '@/hooks/use-hydration'
import { getProgressBySubelement, getQuestionsByStatus } from '@/lib/question-scheduler'
import { getSubelementName } from '@/lib/subelement-metadata'
import { cn } from '@/lib/utils'

interface QuickStartOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  colorClass: string
  bgClass: string
  borderClass: string
  badge?: string
  badgeClass?: string
  stats?: string
  shortcut?: string
  action: () => void
}

interface SubelementProgress {
  id: string
  name: string
  total: number
  mastered: number
  accuracy: number
}

interface StudyStats {
  totalQuestions: number
  masteredCount: number
  dueForReview: number
  newQuestions: number
  learningQuestions: number
  overallAccuracy: number
}

export default function PracticePage() {
  const router = useRouter()
  const [showConfig, setShowConfig] = useState(false)
  const { currentExamLevel } = useStudyStore()
  const { currentStreak, longestStreak, totalQuestionsAnswered, totalCorrect } = useProgressStore()
  const { lastActivity, hasRecentActivity } = useActivityStore()
  const isHydrated = useHydration()
  const [progress, setProgress] = useState<SubelementProgress[]>([])
  const [stats, setStats] = useState<StudyStats | null>(null)
  const [isLoadingProgress, setIsLoadingProgress] = useState(true)
  const quickStartRef = useRef<HTMLDivElement>(null)

  // Load progress data
  useEffect(() => {
    if (!isHydrated) return

    const loadProgress = async () => {
      setIsLoadingProgress(true)
      try {
        const [subProgress, dueQuestions, newQuestions, learningQuestions] = await Promise.all([
          getProgressBySubelement(currentExamLevel),
          getQuestionsByStatus(currentExamLevel, 'review'),
          getQuestionsByStatus(currentExamLevel, 'new'),
          getQuestionsByStatus(currentExamLevel, 'learning'),
        ])

        const progressArray: SubelementProgress[] = Array.from(subProgress.entries())
          .map(([id, data]) => ({
            id,
            name: getSubelementName(id),
            total: data.total,
            mastered: data.mastered,
            accuracy: data.accuracy,
          }))
          .sort((a, b) => a.id.localeCompare(b.id))

        const totalQ = progressArray.reduce((sum, p) => sum + p.total, 0)
        const masteredQ = progressArray.reduce((sum, p) => sum + p.mastered, 0)
        const avgAccuracy =
          progressArray.length > 0
            ? progressArray.reduce((sum, p) => sum + p.accuracy, 0) / progressArray.length
            : 0

        setProgress(progressArray)
        setStats({
          totalQuestions: totalQ,
          masteredCount: masteredQ,
          dueForReview: dueQuestions.length,
          newQuestions: newQuestions.length,
          learningQuestions: learningQuestions.length,
          overallAccuracy: avgAccuracy,
        })
      } catch (error) {
        console.error('Failed to load progress:', error)
      } finally {
        setIsLoadingProgress(false)
      }
    }

    loadProgress()
  }, [currentExamLevel, isHydrated])

  const handleStartSession = useCallback(
    (config: SessionConfigType) => {
      sessionStorage.setItem('practiceConfig', JSON.stringify(config))
      router.push('/practice/session')
    },
    [router]
  )

  const handleQuickStart = useCallback(
    (preset: Partial<SessionConfigType>) => {
      const config: SessionConfigType = {
        examLevel: preset.examLevel ?? currentExamLevel,
        questionCount: preset.questionCount ?? 10,
        subelements: preset.subelements ?? [],
        groups: preset.groups ?? [],
        status: preset.status ?? [],
        flaggedOnly: preset.flaggedOnly ?? false,
        shuffleAnswers: preset.shuffleAnswers ?? true,
        showExplanations: preset.showExplanations ?? true,
        isQuickStudy: preset.isQuickStudy,
        durationSeconds: preset.durationSeconds,
      }
      handleStartSession(config)
    },
    [currentExamLevel, handleStartSession]
  )

  // Keyboard navigation for quick start options
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in an input or config mode
      if (showConfig) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      const shortcuts: Record<string, () => void> = {
        '1': () =>
          handleQuickStart({
            questionCount: 9999,
            isQuickStudy: true,
            durationSeconds: 300,
          }),
        '2': () => handleQuickStart({ questionCount: 10 }),
        '3': () => handleQuickStart({ status: ['review'], questionCount: 20 }),
        '4': () => handleQuickStart({ status: ['new'], questionCount: 10 }),
        '5': () => handleQuickStart({ status: ['learning'], questionCount: 15 }),
        c: () => setShowConfig(true),
      }

      if (shortcuts[e.key.toLowerCase()]) {
        e.preventDefault()
        shortcuts[e.key.toLowerCase()]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showConfig, handleQuickStart])

  const examLevelLabel =
    currentExamLevel === 'technician' ? 'Technician' : currentExamLevel === 'general' ? 'General' : 'Extra'
  const overallAccuracy =
    totalQuestionsAnswered > 0 ? Math.round((totalCorrect / totalQuestionsAnswered) * 100) : 0

  const quickStartOptions: QuickStartOption[] = [
    {
      id: 'quick-study',
      title: '5-Minute Quick Study',
      description: 'Race against the clock',
      icon: <Timer className="size-6" aria-hidden="true" />,
      colorClass: 'text-emerald-500 dark:text-emerald-400',
      bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      borderClass: 'hover:border-emerald-500/50 focus-visible:border-emerald-500',
      badge: 'Timed',
      badgeClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      stats: 'Unlimited questions',
      shortcut: '1',
      action: () =>
        handleQuickStart({
          questionCount: 9999,
          isQuickStudy: true,
          durationSeconds: 300,
        }),
    },
    {
      id: 'quick',
      title: 'Quick Practice',
      description: 'Random questions from the pool',
      icon: <Zap className="size-6" aria-hidden="true" />,
      colorClass: 'text-amber-500 dark:text-amber-400',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/20',
      borderClass: 'hover:border-amber-500/50 focus-visible:border-amber-500',
      badge: 'Mixed',
      badgeClass: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
      stats: '10 questions',
      shortcut: '2',
      action: () => handleQuickStart({ questionCount: 10 }),
    },
    {
      id: 'review',
      title: 'Due for Review',
      description: 'Spaced repetition queue',
      icon: <Brain className="size-6" aria-hidden="true" />,
      colorClass: 'text-purple-500 dark:text-purple-400',
      bgClass: 'bg-purple-500/10 dark:bg-purple-500/20',
      borderClass: 'hover:border-purple-500/50 focus-visible:border-purple-500',
      badge: stats?.dueForReview ? `${stats.dueForReview} due` : undefined,
      badgeClass: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
      stats: '20 questions',
      shortcut: '3',
      action: () => handleQuickStart({ status: ['review'], questionCount: 20 }),
    },
    {
      id: 'new',
      title: 'New Questions',
      description: "Questions you haven't seen",
      icon: <BookOpen className="size-6" aria-hidden="true" />,
      colorClass: 'text-blue-500 dark:text-blue-400',
      bgClass: 'bg-blue-500/10 dark:bg-blue-500/20',
      borderClass: 'hover:border-blue-500/50 focus-visible:border-blue-500',
      badge: stats?.newQuestions ? `${stats.newQuestions} remaining` : undefined,
      badgeClass: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
      stats: '10 questions',
      shortcut: '4',
      action: () => handleQuickStart({ status: ['new'], questionCount: 10 }),
    },
    {
      id: 'weak',
      title: 'Weakest Areas',
      description: 'Focus on struggles',
      icon: <Target className="size-6" aria-hidden="true" />,
      colorClass: 'text-red-500 dark:text-red-400',
      bgClass: 'bg-red-500/10 dark:bg-red-500/20',
      borderClass: 'hover:border-red-500/50 focus-visible:border-red-500',
      badge: stats?.learningQuestions ? `${stats.learningQuestions} in progress` : undefined,
      badgeClass: 'bg-red-500/20 text-red-600 dark:text-red-400',
      stats: '15 questions',
      shortcut: '5',
      action: () => handleQuickStart({ status: ['learning'], questionCount: 15 }),
    },
  ]

  // Find weakest topic for display
  const weakestTopic = progress
    .filter((p) => p.accuracy > 0)
    .sort((a, b) => a.accuracy - b.accuracy)[0]

  if (showConfig) {
    return (
      <main
        className="container mx-auto max-w-2xl px-3 py-4 sm:px-4 sm:py-6"
        role="main"
        aria-labelledby="custom-session-title"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
        >
          Skip to main content
        </a>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 id="custom-session-title" className="text-2xl font-bold">
              Custom Session
            </h1>
            <p className="text-muted-foreground">Configure your practice session</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowConfig(false)}
            aria-label="Cancel and return to practice home"
          >
            Cancel
          </Button>
        </div>
        <div id="main-content">
          <SessionConfig onStart={handleStartSession} initialExamLevel={currentExamLevel} />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100dvh]" role="main" aria-labelledby="practice-title">
      {/* Skip link for screen readers */}
      <a
        href="#quick-start-section"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4 focus:text-foreground"
      >
        Skip to quick start options
      </a>

      {/* Hero Header */}
      <header className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 id="practice-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                Practice Mode
              </h1>
              <p className="text-lg text-muted-foreground">
                Studying for the{' '}
                <span className="font-semibold text-foreground">{examLevelLabel}</span> license
              </p>
            </div>

            {/* Streak indicator */}
            {currentStreak > 0 && (
              <div
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2"
                role="status"
                aria-label={`Current study streak: ${currentStreak} day${currentStreak !== 1 ? 's' : ''}`}
              >
                <Flame className="size-5 text-amber-500" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {currentStreak} Day Streak
                  </span>
                  {longestStreak > currentStreak && (
                    <span className="text-xs text-muted-foreground">
                      Best: {longestStreak} days
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Continue Where You Left Off - Only for INCOMPLETE sessions */}
        {lastActivity &&
          lastActivity.type === 'practice' &&
          hasRecentActivity() &&
          !lastActivity.metadata?.isComplete && (
            <section className="mb-6 animate-fade-in-up" aria-labelledby="continue-section-title">
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
                    <Clock className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 id="continue-section-title" className="font-semibold">
                      Continue where you left off
                    </h2>
                    <p className="text-sm text-muted-foreground truncate">{lastActivity.label}</p>
                  </div>
                  <Button asChild size="sm">
                    <Link href={lastActivity.path}>
                      Continue
                      <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          )}

        {/* Smart Recommendation - For COMPLETED sessions, suggest next activity */}
        {lastActivity &&
          lastActivity.type === 'practice' &&
          hasRecentActivity() &&
          lastActivity.metadata?.isComplete &&
          stats && (
            <SmartRecommendation
              lastAccuracy={lastActivity.metadata.accuracy}
              dueForReview={stats.dueForReview}
              learningQuestions={stats.learningQuestions}
              newQuestions={stats.newQuestions}
              weakestTopic={weakestTopic}
              onQuickStart={handleQuickStart}
            />
          )}

        {/* Quick Stats Dashboard */}
        {!isLoadingProgress && stats && (stats.masteredCount > 0 || totalQuestionsAnswered > 0) && (
          <section className="mb-8" aria-labelledby="stats-section-title">
            <h2 id="stats-section-title" className="sr-only">
              Your study statistics
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                icon={<Trophy className="size-5" aria-hidden="true" />}
                label="Mastered"
                value={stats.masteredCount}
                subtext={`of ${stats.totalQuestions}`}
                colorClass="text-amber-500"
              />
              <StatCard
                icon={<BarChart3 className="size-5" aria-hidden="true" />}
                label="Accuracy"
                value={`${overallAccuracy}%`}
                subtext={`${totalQuestionsAnswered} answered`}
                colorClass="text-emerald-500"
              />
              <StatCard
                icon={<Brain className="size-5" aria-hidden="true" />}
                label="Due for Review"
                value={stats.dueForReview}
                subtext="questions"
                colorClass="text-purple-500"
                alert={stats.dueForReview > 20}
              />
              <StatCard
                icon={<Sparkles className="size-5" aria-hidden="true" />}
                label="Unseen"
                value={stats.newQuestions}
                subtext="new questions"
                colorClass="text-blue-500"
              />
            </div>
          </section>
        )}

        {/* Quick Start Section */}
        <section
          id="quick-start-section"
          ref={quickStartRef}
          aria-labelledby="quick-start-title"
          className="mb-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 id="quick-start-title" className="text-lg font-semibold">
              Quick Start
            </h2>
            <div
              className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex"
              aria-hidden="true"
            >
              <Keyboard className="size-3" />
              <span>Press 1-5 to start</span>
            </div>
          </div>

          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Quick start practice options"
          >
            {quickStartOptions.map((option, index) => (
              <QuickStartCard key={option.id} option={option} index={index} />
            ))}

            {/* Custom Session Card */}
            <button
              onClick={() => setShowConfig(true)}
              className={cn(
                'group relative flex flex-col rounded-xl border-2 border-dashed border-muted-foreground/20',
                'bg-muted/30 p-4 text-left transition-all',
                'hover:border-primary/50 hover:bg-muted/50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'min-h-[120px] touch-manipulation'
              )}
              aria-label="Create custom practice session. Press C as keyboard shortcut."
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Settings2
                    className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    Custom Session
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Configure topics & filters</p>
                </div>
              </div>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Full control</span>
                <div className="flex items-center gap-2">
                  <kbd
                    className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline"
                    aria-hidden="true"
                  >
                    C
                  </kbd>
                  <ChevronRight
                    className="size-4 text-muted-foreground group-hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Weakest Area Spotlight */}
        {weakestTopic && weakestTopic.accuracy < 0.7 && (
          <section className="mb-8" aria-labelledby="weak-area-title">
            <Card className="border-red-500/30 bg-gradient-to-r from-red-500/5 to-red-500/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                    <AlertCircle className="size-5 text-red-500" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      id="weak-area-title"
                      className="font-semibold text-red-600 dark:text-red-400"
                    >
                      Focus Area: {weakestTopic.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {weakestTopic.id} — {Math.round(weakestTopic.accuracy * 100)}% accuracy
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-red-500/30 text-red-600 hover:bg-red-500/10 dark:text-red-400"
                      onClick={() =>
                        handleQuickStart({
                          subelements: [weakestTopic.id],
                          questionCount: 15,
                        })
                      }
                    >
                      Practice This Topic
                      <ArrowRight className="ml-2 size-3" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Progress Overview */}
        <section aria-labelledby="progress-title">
          <div className="mb-4 flex items-center justify-between">
            <h2 id="progress-title" className="text-lg font-semibold">
              Progress by Topic
            </h2>
            {progress.some((p) => p.mastered > 0 || p.accuracy > 0) && (
              <span className="text-sm text-muted-foreground">
                {stats?.masteredCount || 0} / {stats?.totalQuestions || 0} mastered
              </span>
            )}
          </div>

          <Card>
            <CardContent className="p-4">
              {isLoadingProgress ? (
                <div
                  className="flex items-center justify-center py-12"
                  role="status"
                  aria-label="Loading progress data"
                >
                  <Loader2
                    className="size-6 animate-spin text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Loading your progress...</span>
                </div>
              ) : progress.length === 0 ||
                !progress.some((p) => p.mastered > 0 || p.accuracy > 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted"
                    aria-hidden="true"
                  >
                    <Trophy className="size-8 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="font-semibold mb-1">No practice history yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Start a practice session to begin tracking your progress across topics
                  </p>
                  <Button className="mt-4" onClick={() => handleQuickStart({ questionCount: 10 })}>
                    Start Your First Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-4" role="list" aria-label="Progress by subelement">
                  {progress
                    .filter((p) => p.mastered > 0 || p.accuracy > 0)
                    .map((sub) => (
                      <ProgressRow key={sub.id} subelement={sub} />
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

// Quick Start Card Component
function QuickStartCard({ option, index }: { option: QuickStartOption; index: number }) {
  return (
    <button
      onClick={option.action}
      className={cn(
        'group relative flex flex-col rounded-xl border bg-card p-4 text-left',
        'transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'min-h-[120px] touch-manipulation',
        option.borderClass
      )}
      style={{ animationDelay: `${index * 50}ms` }}
      aria-label={`${option.title}. ${option.description}. ${option.stats}. Press ${option.shortcut} as keyboard shortcut.`}
      role="listitem"
    >
      {/* Badge */}
      {option.badge && (
        <span
          className={cn(
            'absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-medium',
            option.badgeClass
          )}
          aria-hidden="true"
        >
          {option.badge}
        </span>
      )}

      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lg',
            option.bgClass
          )}
        >
          <span className={option.colorClass}>{option.icon}</span>
        </div>
        <div className="flex-1 min-w-0 pr-12">
          <h3 className="font-medium">{option.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
        </div>
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{option.stats}</span>
        <div className="flex items-center gap-2">
          <kbd
            className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline"
            aria-hidden="true"
          >
            {option.shortcut}
          </kbd>
          <ChevronRight
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              'group-hover:translate-x-0.5',
              option.colorClass.replace('text-', 'group-hover:text-')
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    </button>
  )
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  subtext,
  colorClass,
  alert,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  subtext: string
  colorClass: string
  alert?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-card p-3',
        alert && 'border-red-500/30 bg-red-500/5'
      )}
      role="group"
      aria-label={`${label}: ${value} ${subtext}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={colorClass}>{icon}</span>
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        <span className="text-xs text-muted-foreground">{subtext}</span>
      </div>
    </div>
  )
}

// Progress Row Component
function ProgressRow({ subelement }: { subelement: SubelementProgress }) {
  const masteryPercent =
    subelement.total > 0 ? Math.round((subelement.mastered / subelement.total) * 100) : 0
  const accuracyPercent = Math.round(subelement.accuracy * 100)

  return (
    <div className="space-y-2" role="listitem">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded text-xs font-medium',
              masteryPercent >= 80
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : masteryPercent >= 50
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  : 'bg-red-500/20 text-red-600 dark:text-red-400'
            )}
            aria-hidden="true"
          >
            {subelement.id.replace(/^T/, '')}
          </span>
          <span className="font-medium truncate">{subelement.name}</span>
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {subelement.mastered}/{subelement.total}
          <span className="hidden sm:inline"> ({accuracyPercent}%)</span>
        </span>
      </div>
      <div
        className="h-2 rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuenow={masteryPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${subelement.name} mastery: ${masteryPercent}%`}
      >
        <div
          className={cn(
            'h-full transition-all duration-500',
            masteryPercent >= 80
              ? 'bg-emerald-500'
              : masteryPercent >= 50
                ? 'bg-amber-500'
                : 'bg-red-500'
          )}
          style={{ width: `${masteryPercent}%` }}
        />
      </div>
    </div>
  )
}

// Smart Recommendation Component - shown after completing a session
function SmartRecommendation({
  lastAccuracy,
  dueForReview,
  learningQuestions,
  newQuestions,
  weakestTopic,
  onQuickStart,
}: {
  lastAccuracy?: number
  dueForReview: number
  learningQuestions: number
  newQuestions: number
  weakestTopic?: SubelementProgress
  onQuickStart: (preset: Partial<SessionConfigType>) => void
}) {
  // Determine the best next action based on learning progression
  // Priority: 1) Spaced repetition (due cards), 2) Weak areas, 3) New content, 4) General practice
  type Recommendation = {
    title: string
    description: string
    icon: React.ReactNode
    colorClass: string
    bgClass: string
    borderClass: string
    action: () => void
    reason: string
  }

  let recommendation: Recommendation

  if (dueForReview >= 10) {
    // High priority: many cards due for review
    recommendation = {
      title: 'Spaced Repetition',
      description: `${dueForReview} questions due for review`,
      icon: <Brain className="size-6" aria-hidden="true" />,
      colorClass: 'text-purple-500',
      bgClass: 'bg-purple-500/10',
      borderClass: 'border-purple-500/30',
      action: () => onQuickStart({ status: ['review'], questionCount: 20 }),
      reason: "Reinforce what you've learned before it fades",
    }
  } else if (weakestTopic && weakestTopic.accuracy < 0.6 && learningQuestions > 0) {
    // Weak area needs attention
    recommendation = {
      title: `Focus on ${weakestTopic.name}`,
      description: `${Math.round(weakestTopic.accuracy * 100)}% accuracy needs work`,
      icon: <Target className="size-6" aria-hidden="true" />,
      colorClass: 'text-red-500',
      bgClass: 'bg-red-500/10',
      borderClass: 'border-red-500/30',
      action: () => onQuickStart({ subelements: [weakestTopic.id], questionCount: 15 }),
      reason: 'Targeted practice on your weakest area',
    }
  } else if (lastAccuracy !== undefined && lastAccuracy < 70 && learningQuestions > 0) {
    // Last session was rough, focus on struggling questions
    recommendation = {
      title: 'Review Struggling Questions',
      description: `${learningQuestions} questions need more practice`,
      icon: <Target className="size-6" aria-hidden="true" />,
      colorClass: 'text-amber-500',
      bgClass: 'bg-amber-500/10',
      borderClass: 'border-amber-500/30',
      action: () => onQuickStart({ status: ['learning'], questionCount: 15 }),
      reason: 'Reinforce concepts from your last session',
    }
  } else if (newQuestions > 50) {
    // Plenty of new content to explore
    recommendation = {
      title: 'Explore New Questions',
      description: `${newQuestions} questions you haven't seen`,
      icon: <BookOpen className="size-6" aria-hidden="true" />,
      colorClass: 'text-blue-500',
      bgClass: 'bg-blue-500/10',
      borderClass: 'border-blue-500/30',
      action: () => onQuickStart({ status: ['new'], questionCount: 10 }),
      reason: 'Expand your knowledge with fresh content',
    }
  } else if (dueForReview > 0) {
    // Some cards due for review
    recommendation = {
      title: 'Quick Review',
      description: `${dueForReview} questions ready for review`,
      icon: <Brain className="size-6" aria-hidden="true" />,
      colorClass: 'text-purple-500',
      bgClass: 'bg-purple-500/10',
      borderClass: 'border-purple-500/30',
      action: () => onQuickStart({ status: ['review'], questionCount: Math.min(dueForReview, 15) }),
      reason: 'Keep your knowledge fresh',
    }
  } else {
    // Default: general mixed practice
    recommendation = {
      title: 'Mixed Practice',
      description: 'Well-rounded question mix',
      icon: <Zap className="size-6" aria-hidden="true" />,
      colorClass: 'text-emerald-500',
      bgClass: 'bg-emerald-500/10',
      borderClass: 'border-emerald-500/30',
      action: () => onQuickStart({ questionCount: 10 }),
      reason: "You're doing great! Keep the momentum going",
    }
  }

  return (
    <section className="mb-6 animate-fade-in-up" aria-labelledby="recommendation-title">
      <Card
        className={cn('bg-gradient-to-r from-background to-muted/30', recommendation.borderClass)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-full',
                recommendation.bgClass
              )}
            >
              <span className={recommendation.colorClass}>{recommendation.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Recommended
                </span>
                <Sparkles className="size-3 text-amber-500" aria-hidden="true" />
              </div>
              <h2 id="recommendation-title" className="font-semibold">
                {recommendation.title}
              </h2>
              <p className="text-sm text-muted-foreground">{recommendation.description}</p>
              <p className="text-xs text-muted-foreground mt-1 italic">{recommendation.reason}</p>
            </div>
            <Button size="sm" onClick={recommendation.action} className="shrink-0">
              Start
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
