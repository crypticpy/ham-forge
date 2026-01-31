'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BookOpen, CheckCircle2, Target, Flame, Clock, BarChart3, Loader2 } from 'lucide-react'
import { useStudyStore } from '@/stores/study-store'
import { useProgressStore } from '@/stores/progress-store'
import { getProgressStats } from '@/lib/question-scheduler'
import { useHydration } from '@/hooks/use-hydration'
import { SubelementHeatmap } from '@/components/features/dashboard/subelement-heatmap'
import { ReadinessScore } from '@/components/features/dashboard/readiness-score'
import { StreakTracker } from '@/components/features/dashboard/streak-tracker'
import { CoverageStats } from '@/components/features/dashboard/coverage-stats'
import { ContinueCard } from '@/components/features/dashboard/continue-card'
import type { ExamLevel } from '@/types'

interface ProgressStats {
  total: number
  new: number
  learning: number
  review: number
  mastered: number
  accuracy: number
  dueCount: number
}

export default function DashboardPage() {
  const { currentExamLevel, setExamLevel } = useStudyStore()
  const { currentStreak, longestStreak, lastStudyDate } = useProgressStore()
  const isHydrated = useHydration()

  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch stats when exam level changes
  useEffect(() => {
    if (!isHydrated) return

    const fetchStats = async () => {
      setIsLoading(true)
      try {
        const progressStats = await getProgressStats(currentExamLevel)
        setStats(progressStats)
      } catch (error) {
        console.error('Failed to fetch progress stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [currentExamLevel, isHydrated])

  const handleExamLevelChange = (level: ExamLevel) => {
    setExamLevel(level)
  }

  const examLevelLabel = currentExamLevel === 'technician' ? 'Technician' : 'General'

  // Format accuracy as percentage
  const accuracyPercent = stats ? Math.round(stats.accuracy * 100) : 0

  return (
    <div className="container mx-auto max-w-3xl py-6 px-4">
      {/* Continue Where You Left Off */}
      <ContinueCard />

      {/* Header with Exam Level Selector */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Progress Dashboard</h1>
        <p className="text-muted-foreground">
          Track your study progress for the {examLevelLabel} exam
        </p>
      </div>

      {/* Exam Level Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="size-5" aria-hidden="true" />
            Exam Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExamLevelChange('technician')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                currentExamLevel === 'technician'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">Technician</div>
              <div className="text-sm text-muted-foreground">Entry-level license</div>
            </button>
            <button
              onClick={() => handleExamLevelChange('general')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                currentExamLevel === 'general'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">General</div>
              <div className="text-sm text-muted-foreground">HF privileges</div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary Cards */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold">Overview</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Questions Mastered */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 mb-2">
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold">{stats?.mastered ?? 0}</div>
                <div className="text-xs text-muted-foreground">Mastered</div>
              </CardContent>
            </Card>

            {/* Accuracy Rate */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 mb-2">
                  <Target className="size-5" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold">{accuracyPercent}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>

            {/* Current Streak */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500 mb-2">
                  <Flame className="size-5" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold">{isHydrated ? currentStreak : 0}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>

            {/* Questions Due */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-500 mb-2">
                  <Clock className="size-5" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold">{stats?.dueCount ?? 0}</div>
                <div className="text-xs text-muted-foreground">Due Today</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Progress Breakdown */}
      {!isLoading && stats && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Progress Breakdown</CardTitle>
            <CardDescription>
              {stats.total} total questions in the {examLevelLabel} pool
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">New</span>
                <span className="font-medium">{stats.new}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Learning</span>
                <span className="font-medium">{stats.learning}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Review</span>
                <span className="font-medium">{stats.review}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mastered</span>
                <span className="font-medium text-green-600 dark:text-green-500">
                  {stats.mastered}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-green-600 dark:bg-green-500 transition-all duration-300"
                  style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {Math.round((stats.mastered / stats.total) * 100)}% complete
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights Section */}
      <div className="mb-6">
        <h2 className="mb-4 text-lg font-semibold">Insights</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Readiness Score */}
          {stats && (
            <ReadinessScore
              examLevel={currentExamLevel}
              stats={{
                mastered: stats.mastered,
                total: stats.total,
                accuracy: stats.accuracy,
                dueCount: stats.dueCount,
              }}
            />
          )}

          {/* Streak Tracker */}
          <StreakTracker
            currentStreak={isHydrated ? currentStreak : 0}
            longestStreak={isHydrated ? longestStreak : 0}
            lastStudyDate={isHydrated ? lastStudyDate : null}
          />
        </div>
      </div>

      {/* Coverage Stats */}
      {stats && (
        <div className="mb-6">
          <CoverageStats
            stats={{
              total: stats.total,
              new: stats.new,
              learning: stats.learning,
              review: stats.review,
              mastered: stats.mastered,
            }}
          />
        </div>
      )}

      {/* Subelement Heatmap */}
      <div className="mb-6">
        <SubelementHeatmap examLevel={currentExamLevel} />
      </div>

      {/* View Detailed Analytics Link */}
      <Link
        href="/dashboard/analytics"
        className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-all text-muted-foreground hover:text-foreground"
      >
        <BarChart3 className="size-5" aria-hidden="true" />
        <span className="font-medium">View Detailed Analytics</span>
      </Link>
    </div>
  )
}
