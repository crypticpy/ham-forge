'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'
import { useStudyStore } from '@/stores/study-store'
import { useProgressStore } from '@/stores/progress-store'
import { useHydration } from '@/hooks/use-hydration'
import { getExamHistory, getExamStats } from '@/lib/exam-storage'
import { getProgressBySubelement } from '@/lib/question-scheduler'
import { ExamHistoryChart } from '@/components/features/dashboard/exam-history-chart'
import { StudyCalendar } from '@/components/features/dashboard/study-calendar'
import { StudyTimeCard } from '@/components/features/dashboard/time-charts'
import type { ExamAttempt } from '@/types'

type ExamStats = Awaited<ReturnType<typeof getExamStats>>
type SubelementProgress = Awaited<ReturnType<typeof getProgressBySubelement>>

interface WeakSubelement {
  id: string
  total: number
  mastered: number
  accuracy: number
}

export default function AnalyticsPage() {
  const { currentExamLevel } = useStudyStore()
  const { currentStreak, totalQuestionsAnswered, totalCorrect } = useProgressStore()
  const isHydrated = useHydration()

  const [examHistory, setExamHistory] = useState<ExamAttempt[]>([])
  const [examStats, setExamStats] = useState<ExamStats | null>(null)
  const [subelementProgress, setSubelementProgress] = useState<SubelementProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all analytics data
  useEffect(() => {
    if (!isHydrated) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [history, stats, subProgress] = await Promise.all([
          getExamHistory(currentExamLevel),
          getExamStats(currentExamLevel),
          getProgressBySubelement(currentExamLevel),
        ])

        setExamHistory(history)
        setExamStats(stats)
        setSubelementProgress(subProgress)
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentExamLevel, isHydrated])

  // Get weakest subelements (sorted by accuracy, lowest first)
  const weakestSubelements: WeakSubelement[] = subelementProgress
    ? Array.from(subelementProgress.entries())
        .map(([id, data]) => ({ id, ...data }))
        .filter((s) => s.total > 0 && s.accuracy < 1) // Has questions and not 100%
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 5)
    : []

  // Calculate time statistics
  const avgQuestionsPerExam =
    examHistory.length > 0
      ? Math.round(examHistory.reduce((sum, attempt) => sum + attempt.answers.length, 0) / examHistory.length)
      : 0

  const avgTimePerQuestion =
    examStats && examStats.totalAttempts > 0 && avgQuestionsPerExam > 0
      ? Math.round(examStats.averageTime / avgQuestionsPerExam)
      : 0

  const totalStudyTime = examHistory.reduce((sum, attempt) => sum + attempt.timeSpent, 0)

  // Format time helper
  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (mins < 60) return `${mins}m ${secs}s`
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours}h ${remainingMins}m`
  }

  // Format date helper
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const examLevelLabel =
    currentExamLevel === 'technician' ? 'Technician' : currentExamLevel === 'general' ? 'General' : 'Extra'

  return (
    <div className="container mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Header with back link */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Detailed Analytics</h1>
        <p className="text-muted-foreground">{examLevelLabel} exam statistics and trends</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Study Time Tracking Section */}
          <StudyTimeCard />

          {/* Exam History Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5" aria-hidden="true" />
                Exam History
              </CardTitle>
              <CardDescription>
                {examHistory.length > 0
                  ? `${examHistory.length} exam${examHistory.length > 1 ? 's' : ''} taken`
                  : 'No exams taken yet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {examHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <BarChart3 className="size-12 opacity-50 mb-4" aria-hidden="true" />
                  <p className="text-sm">No exam history</p>
                  <p className="text-xs mt-1">Complete practice exams to see your history here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Recent exams list */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
	                    {examHistory.slice(0, 10).map((attempt) => (
	                      <Link
	                        key={attempt.id}
	                        href={`/exam/${attempt.id}/review`}
	                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
	                      >
                        <div className="flex items-center gap-3">
                          {attempt.passed ? (
                            <CheckCircle
                              className="size-5 text-green-600 flex-shrink-0"
                              aria-label="Passed"
                            />
                          ) : (
                            <XCircle
                              className="size-5 text-red-600 flex-shrink-0"
                              aria-label="Failed"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium">{formatDate(attempt.date)}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatTime(attempt.timeSpent)} -{' '}
                              {attempt.answers.filter((a) => a.correct).length}/
                              {attempt.answers.length} correct
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-lg font-semibold ${
                            attempt.passed ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {attempt.score}%
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Trends Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-5" aria-hidden="true" />
                Performance Trends
              </CardTitle>
              <CardDescription>Score progression over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ExamHistoryChart attempts={examHistory} />
            </CardContent>
          </Card>

          {/* Study Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" aria-hidden="true" />
                Study Calendar
              </CardTitle>
              <CardDescription>Your study activity over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <StudyCalendar
                examAttempts={examHistory}
                currentStreak={isHydrated ? currentStreak : 0}
              />
            </CardContent>
          </Card>

          {/* Weakest Subelements Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="size-5" aria-hidden="true" />
                Weakest Areas
              </CardTitle>
              <CardDescription>Subelements that need the most work</CardDescription>
            </CardHeader>
            <CardContent>
              {weakestSubelements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Target className="size-12 opacity-50 mb-4" aria-hidden="true" />
                  <p className="text-sm">No weak areas identified yet</p>
                  <p className="text-xs mt-1">
                    Practice more questions to identify areas that need improvement
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {weakestSubelements.map((sub, index) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index === 0
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{sub.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {sub.mastered} / {sub.total} mastered
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Progress bar */}
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              sub.accuracy < 0.5
                                ? 'bg-red-500'
                                : sub.accuracy < 0.74
                                  ? 'bg-amber-500'
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.round(sub.accuracy * 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium min-w-[3rem] text-right ${
                            sub.accuracy < 0.5
                              ? 'text-red-600'
                              : sub.accuracy < 0.74
                                ? 'text-amber-600'
                                : 'text-green-600'
                          }`}
                        >
                          {Math.round(sub.accuracy * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Time Statistics Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" aria-hidden="true" />
                Time Statistics
              </CardTitle>
              <CardDescription>Your study time metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Total Study Time</div>
                  <div className="text-2xl font-semibold">{formatTime(totalStudyTime)}</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Avg. Time/Exam</div>
                  <div className="text-2xl font-semibold">
                    {examStats && examStats.totalAttempts > 0
                      ? formatTime(examStats.averageTime)
                      : '-'}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Avg. Time/Question</div>
                  <div className="text-2xl font-semibold">
                    {avgTimePerQuestion > 0 ? `${avgTimePerQuestion}s` : '-'}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Total Questions</div>
                  <div className="text-2xl font-semibold">
                    {isHydrated ? totalQuestionsAnswered : 0}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Correct Answers</div>
                  <div className="text-2xl font-semibold text-green-600">
                    {isHydrated ? totalCorrect : 0}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-sm text-muted-foreground mb-1">Overall Accuracy</div>
                  <div className="text-2xl font-semibold">
                    {isHydrated && totalQuestionsAnswered > 0
                      ? `${Math.round((totalCorrect / totalQuestionsAnswered) * 100)}%`
                      : '-'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
