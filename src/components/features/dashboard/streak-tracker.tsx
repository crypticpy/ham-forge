'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Trophy, Calendar, AlertTriangle } from 'lucide-react'

interface StreakTrackerProps {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string | null
}

function isToday(dateStr: string | null): boolean {
  if (!dateStr) return false
  const today = new Date().toISOString().split('T')[0]
  return dateStr === today
}

function isStreakAtRisk(lastStudyDate: string | null): boolean {
  if (!lastStudyDate) return false

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // If already studied today, no risk
  if (lastStudyDate === todayStr) return false

  // Check if it's after 6 PM (18:00) and user hasn't studied today
  const currentHour = today.getHours()
  return currentHour >= 18
}

function getMotivationalMessage(streak: number): string {
  if (streak === 0) {
    return 'Start your streak today!'
  }
  if (streak <= 2) {
    return 'Keep it up!'
  }
  if (streak <= 6) {
    return "You're building momentum!"
  }
  return 'Amazing dedication!'
}

function getStreakEmoji(streak: number): string {
  if (streak === 0) return ''
  if (streak < 7) return '🔥'
  if (streak < 14) return '🔥🔥'
  if (streak < 30) return '🔥🔥🔥'
  return '🔥🔥🔥🔥'
}

export function StreakTracker({ currentStreak, longestStreak, lastStudyDate }: StreakTrackerProps) {
  const studiedToday = isToday(lastStudyDate)
  const streakAtRisk = isStreakAtRisk(lastStudyDate)
  const motivationalMessage = getMotivationalMessage(currentStreak)
  const streakEmoji = getStreakEmoji(currentStreak)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Flame className="size-4 text-orange-500" aria-hidden="true" />
          Study Streak
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center">
          {/* Main streak display */}
          <div className="flex items-center gap-2">
            <span
              className="text-5xl font-bold tabular-nums"
              aria-label={`Current streak: ${currentStreak} day${currentStreak !== 1 ? 's' : ''}`}
            >
              {currentStreak}
            </span>
            {streakEmoji && (
              <span className="text-3xl" aria-hidden="true">
                {streakEmoji}
              </span>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            day{currentStreak !== 1 ? 's' : ''} in a row
          </span>

          {/* Motivational message */}
          <p className="mt-3 text-sm font-medium text-center">{motivationalMessage}</p>

          {/* Studied today badge */}
          {studiedToday && (
            <div className="mt-3 flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-950/30 px-3 py-1">
              <Calendar
                className="size-3.5 text-green-600 dark:text-green-500"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">
                Studied today
              </span>
            </div>
          )}

          {/* Streak at risk warning */}
          {streakAtRisk && currentStreak > 0 && (
            <div className="mt-3 flex items-center gap-1.5 rounded-full bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1">
              <AlertTriangle
                className="size-3.5 text-yellow-600 dark:text-yellow-500"
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                Study now to keep your streak!
              </span>
            </div>
          )}

          {/* Longest streak */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-3 w-full">
            <Trophy className="size-4 text-amber-500" aria-hidden="true" />
            <div className="flex-1">
              <span className="text-sm text-muted-foreground">Longest streak</span>
            </div>
            <span className="text-lg font-semibold tabular-nums">{longestStreak}</span>
            <span className="text-sm text-muted-foreground">
              day{longestStreak !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Encouragement when current equals longest */}
          {currentStreak > 0 && currentStreak === longestStreak && (
            <p className="mt-2 text-xs text-center text-amber-600 dark:text-amber-500 font-medium">
              You&apos;re at your personal best!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
