'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Trash2,
  Trophy,
  Target,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getExamHistory, getExamStats, deleteExamAttempt } from '@/lib/exam-storage'
import type { ExamAttempt, ExamLevel } from '@/types'

interface ExamHistoryProps {
  examLevel: ExamLevel
  limit?: number
  showStats?: boolean
  onSelectExam?: (examId: string) => void // To view details
}

type ExamStats = Awaited<ReturnType<typeof getExamStats>>

export function ExamHistory({
  examLevel,
  limit = 10,
  showStats = true,
  onSelectExam,
}: ExamHistoryProps) {
  const [attempts, setAttempts] = useState<ExamAttempt[]>([])
  const [stats, setStats] = useState<ExamStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    setIsLoading(true)
    try {
      const [historyData, statsData] = await Promise.all([
        getExamHistory(examLevel, limit),
        showStats ? getExamStats(examLevel) : null,
      ])
      setAttempts(historyData)
      if (statsData) setStats(statsData)
    } finally {
      setIsLoading(false)
    }
  }, [examLevel, limit, showStats])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handleDelete = async (id: string) => {
    await deleteExamAttempt(id)
    setAttempts((prev) => prev.filter((a) => a.id !== id))
    setDeleteConfirmId(null)
    // Refresh stats
    if (showStats) {
      const newStats = await getExamStats(examLevel)
      setStats(newStats)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const getTrendIcon = (trend: ExamStats['recentTrend']) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="size-4 text-green-600" aria-label="Improving" />
      case 'declining':
        return <TrendingDown className="size-4 text-red-600" aria-label="Declining" />
      case 'stable':
        return <Minus className="size-4 text-muted-foreground" aria-label="Stable" />
      default:
        return null
    }
  }

  const getTrendLabel = (trend: ExamStats['recentTrend']) => {
    switch (trend) {
      case 'improving':
        return 'Improving'
      case 'declining':
        return 'Declining'
      case 'stable':
        return 'Stable'
      default:
        return 'Not enough data'
    }
  }

  const examLevelLabel = examLevel.charAt(0).toUpperCase() + examLevel.slice(1)

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading exam history...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Empty state
  if (attempts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{examLevelLabel} Exam History</CardTitle>
          <CardDescription>Your practice exam attempts will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BarChart3 className="size-12 text-muted-foreground/50 mb-4" aria-hidden="true" />
            <p className="text-muted-foreground">No exam attempts yet</p>
            <p className="text-sm text-muted-foreground/75 mt-1">
              Complete a practice exam to see your history and statistics here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary Card */}
      {showStats && stats && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="size-5" aria-hidden="true" />
              {examLevelLabel} Exam Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Total Attempts */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Attempts</span>
                <span className="text-2xl font-semibold">{stats.totalAttempts}</span>
              </div>

              {/* Pass Rate */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Pass Rate</span>
                <span
                  className={cn(
                    'text-2xl font-semibold',
                    stats.passRate >= 74 ? 'text-green-600' : 'text-amber-600'
                  )}
                >
                  {stats.passRate}%
                </span>
              </div>

              {/* Average Score */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Target className="size-3.5" aria-hidden="true" />
                  Avg. Score
                </span>
                <span className="text-2xl font-semibold">{stats.averageScore}%</span>
              </div>

              {/* Best Score */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Trophy className="size-3.5" aria-hidden="true" />
                  Best Score
                </span>
                <span className="text-2xl font-semibold text-green-600">{stats.bestScore}%</span>
              </div>

              {/* Pass/Fail Count */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Passed / Failed</span>
                <span className="text-lg font-medium">
                  <span className="text-green-600">{stats.passCount}</span>
                  {' / '}
                  <span className="text-red-600">{stats.failCount}</span>
                </span>
              </div>

              {/* Average Time */}
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  Avg. Time
                </span>
                <span className="text-lg font-medium">{formatTime(stats.averageTime)}</span>
              </div>

              {/* Recent Trend */}
              <div className="flex flex-col col-span-2">
                <span className="text-sm text-muted-foreground">Recent Trend</span>
                <div className="flex items-center gap-2">
                  {getTrendIcon(stats.recentTrend)}
                  <span
                    className={cn(
                      'text-lg font-medium',
                      stats.recentTrend === 'improving' && 'text-green-600',
                      stats.recentTrend === 'declining' && 'text-red-600'
                    )}
                  >
                    {getTrendLabel(stats.recentTrend)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exam History List */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{examLevelLabel} Exam History</CardTitle>
          <CardDescription>
            Your most recent {Math.min(limit, attempts.length)} exam attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className={cn(
                  'flex items-center justify-between p-4 rounded-lg border',
                  'hover:bg-muted/50 transition-colors',
                  onSelectExam && 'cursor-pointer'
                )}
                onClick={() => onSelectExam?.(attempt.id)}
                role={onSelectExam ? 'button' : undefined}
                tabIndex={onSelectExam ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onSelectExam && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onSelectExam(attempt.id)
                  }
                }}
              >
                {/* Left side: Pass/Fail icon and date */}
                <div className="flex items-center gap-3">
                  {attempt.passed ? (
                    <CheckCircle
                      className="size-6 text-green-600 flex-shrink-0"
                      aria-label="Passed"
                    />
                  ) : (
                    <XCircle className="size-6 text-red-600 flex-shrink-0" aria-label="Failed" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{formatDate(attempt.date)}</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" aria-hidden="true" />
                      {formatTime(attempt.timeSpent)}
                    </span>
                  </div>
                </div>

                {/* Right side: Score and delete button */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span
                      className={cn(
                        'text-lg font-semibold',
                        attempt.passed ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {attempt.score}%
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {attempt.answers.filter((a) => a.correct).length}/{attempt.answers.length}{' '}
                      correct
                    </p>
                  </div>

                  {/* Delete button with confirmation */}
                  {deleteConfirmId === attempt.id ? (
                    <div
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="destructive"
                        size="xs"
                        onClick={() => handleDelete(attempt.id)}
                      >
                        Confirm
                      </Button>
                      <Button variant="outline" size="xs" onClick={() => setDeleteConfirmId(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteConfirmId(attempt.id)
                      }}
                      aria-label="Delete exam attempt"
                    >
                      <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
