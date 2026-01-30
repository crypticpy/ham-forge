'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Target, Brain, Trophy, Zap, Settings2, Loader2 } from 'lucide-react'
import {
  SessionConfig,
  type SessionConfig as SessionConfigType,
} from '@/components/features/practice/session-config'
import { useStudyStore } from '@/stores/study-store'
import { useHydration } from '@/hooks/use-hydration'
import { getProgressBySubelement } from '@/lib/question-scheduler'
import { getSubelementName } from '@/lib/subelement-metadata'

interface QuickStartOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  action: () => void
}

interface SubelementProgress {
  id: string
  name: string
  total: number
  mastered: number
  accuracy: number
}

export default function PracticePage() {
  const router = useRouter()
  const [showConfig, setShowConfig] = useState(false)
  const { currentExamLevel } = useStudyStore()
  const isHydrated = useHydration()
  const [progress, setProgress] = useState<SubelementProgress[]>([])
  const [isLoadingProgress, setIsLoadingProgress] = useState(true)

  // Load progress data
  useEffect(() => {
    if (!isHydrated) return

    const loadProgress = async () => {
      setIsLoadingProgress(true)
      try {
        const subProgress = await getProgressBySubelement(currentExamLevel)
        const progressArray: SubelementProgress[] = Array.from(subProgress.entries())
          .map(([id, data]) => ({
            id,
            name: getSubelementName(id),
            total: data.total,
            mastered: data.mastered,
            accuracy: data.accuracy,
          }))
          .sort((a, b) => a.id.localeCompare(b.id))
        setProgress(progressArray)
      } catch (error) {
        console.error('Failed to load progress:', error)
      } finally {
        setIsLoadingProgress(false)
      }
    }

    loadProgress()
  }, [currentExamLevel, isHydrated])

  const handleStartSession = (config: SessionConfigType) => {
    // Store config in session storage and navigate
    sessionStorage.setItem('practiceConfig', JSON.stringify(config))
    router.push('/practice/session')
  }

  const handleQuickStart = (preset: Partial<SessionConfigType>) => {
    const config: SessionConfigType = {
      examLevel: currentExamLevel,
      questionCount: 10,
      subelements: [],
      status: [],
      shuffleAnswers: true,
      showExplanations: true,
      ...preset,
    }
    handleStartSession(config)
  }

  const quickStartOptions: QuickStartOption[] = [
    {
      id: 'quick',
      title: 'Quick Practice',
      description: '10 random questions',
      icon: <Zap className="size-6" />,
      color: 'text-amber-500',
      action: () => handleQuickStart({ questionCount: 10 }),
    },
    {
      id: 'review',
      title: 'Due for Review',
      description: 'Questions due based on spaced repetition',
      icon: <Brain className="size-6" />,
      color: 'text-purple-500',
      action: () => handleQuickStart({ status: ['review'], questionCount: 20 }),
    },
    {
      id: 'new',
      title: 'New Questions',
      description: 'Questions you have not seen yet',
      icon: <BookOpen className="size-6" />,
      color: 'text-blue-500',
      action: () => handleQuickStart({ status: ['new'], questionCount: 10 }),
    },
    {
      id: 'weak',
      title: 'Weakest Areas',
      description: 'Focus on questions you struggle with',
      icon: <Target className="size-6" />,
      color: 'text-red-500',
      action: () => handleQuickStart({ status: ['learning'], questionCount: 15 }),
    },
  ]

  if (showConfig) {
    return (
      <div className="container max-w-2xl py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Custom Session</h1>
            <p className="text-muted-foreground">Configure your practice session</p>
          </div>
          <Button variant="ghost" onClick={() => setShowConfig(false)}>
            Cancel
          </Button>
        </div>
        <SessionConfig onStart={handleStartSession} initialExamLevel={currentExamLevel} />
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Practice Mode</h1>
        <p className="text-muted-foreground">
          Studying for {currentExamLevel === 'technician' ? 'Technician' : 'General'} exam
        </p>
      </div>

      {/* Quick Start Options */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Quick Start</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {quickStartOptions.map((option) => (
            <Card
              key={option.id}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
              onClick={option.action}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={option.color}>{option.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{option.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Session Button */}
      <Card
        className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
        onClick={() => setShowConfig(true)}
      >
        <CardContent className="flex items-center gap-4 p-4">
          <div className="text-muted-foreground">
            <Settings2 className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium">Custom Session</h3>
            <p className="text-sm text-muted-foreground">Configure topics, filters, and options</p>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Your Progress</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Progress by Topic</CardTitle>
            <CardDescription>
              {progress.some((p) => p.mastered > 0 || p.accuracy > 0)
                ? 'Your mastery across different subelements'
                : 'Complete practice sessions to track your progress'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProgress ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : progress.length === 0 || !progress.some((p) => p.mastered > 0 || p.accuracy > 0) ? (
              <div className="flex items-center justify-center py-8 text-center text-muted-foreground">
                <div>
                  <Trophy className="mx-auto mb-2 size-8 opacity-50" />
                  <p className="text-sm">No practice history yet</p>
                  <p className="text-xs">Start a session to see your progress here</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {progress
                  .filter((p) => p.mastered > 0 || p.accuracy > 0)
                  .map((sub) => {
                    const masteryPercent =
                      sub.total > 0 ? Math.round((sub.mastered / sub.total) * 100) : 0
                    const accuracyPercent = Math.round(sub.accuracy * 100)

                    return (
                      <div key={sub.id} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">
                            {sub.id}: {sub.name}
                          </span>
                          <span className="text-muted-foreground">
                            {sub.mastered}/{sub.total} mastered ({accuracyPercent}% accuracy)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              masteryPercent >= 80
                                ? 'bg-green-500'
                                : masteryPercent >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${masteryPercent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
