'use client'

import Link from 'next/link'
import { BookOpen, Target, FileText, Radio, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useActivityStore, type ActivityType } from '@/stores/activity-store'
import { useHydration } from '@/hooks/use-hydration'

const activityIcons: Record<ActivityType, typeof BookOpen> = {
  learn: BookOpen,
  practice: Target,
  exam: FileText,
  radio: Radio,
}

const activityColors: Record<ActivityType, string> = {
  learn: 'text-blue-600 dark:text-blue-500',
  practice: 'text-orange-600 dark:text-orange-500',
  exam: 'text-purple-600 dark:text-purple-500',
  radio: 'text-green-600 dark:text-green-500',
}

export function ContinueCard() {
  const isHydrated = useHydration()
  const { lastActivity, hasRecentActivity, getTimeSinceActivity } = useActivityStore()

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="h-9 w-24 bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const isRecent = hasRecentActivity()

  // Show "Start Studying" card if no recent activity
  if (!lastActivity || !isRecent) {
    return (
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Play className="size-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium">Ready to start studying?</p>
                <p className="text-sm text-muted-foreground">Choose an activity to begin</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/practice">Practice</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/learn">Learn</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/exam">Exam</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show continue card with last activity
  const Icon = activityIcons[lastActivity.type]
  const iconColor = activityColors[lastActivity.type]
  const timeSince = getTimeSinceActivity()

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className={`size-5 ${iconColor}`} aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">{lastActivity.label}</p>
              <p className="text-sm text-muted-foreground">{timeSince}</p>
            </div>
          </div>
          <Button asChild>
            <Link href={lastActivity.path}>Continue</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
