'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  Clock,
  BookOpen,
  CheckCircle,
  Circle,
  Loader2,
  AlertCircle,
  Play,
} from 'lucide-react'
import { useHydration } from '@/hooks/use-hydration'
import { getModuleById } from '@/lib/learning-modules'
import type { LearningModule } from '@/types/learning'
import type { ExamLevel } from '@/types'

// Storage key for learning progress
const PROGRESS_KEY = 'hamforge-learning-progress'

interface ModulePageProps {
  params: Promise<{ moduleId: string }>
}

/**
 * Get a learning module by ID, checking both exam levels
 */
function getModule(moduleId: string): LearningModule | null {
  // Determine exam level from module ID prefix
  const examLevel: ExamLevel = moduleId.startsWith('G') ? 'general' : 'technician'
  return getModuleById(examLevel, moduleId) ?? null
}

/**
 * Get completed sections from localStorage
 */
function getCompletedSections(): Record<string, string[]> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export default function ModuleOverviewPage({ params }: ModulePageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const isHydrated = useHydration()
  const [module, setModule] = useState<LearningModule | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Load module data
  useEffect(() => {
    const loadModule = async () => {
      try {
        const moduleData = getModule(resolvedParams.moduleId)
        if (!moduleData) {
          setError('Module not found')
        } else {
          setModule(moduleData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load module')
      } finally {
        setIsLoading(false)
      }
    }

    loadModule()
  }, [resolvedParams.moduleId])

  // Load progress from localStorage
  useEffect(() => {
    if (!isHydrated || !module) return

    const progress = getCompletedSections()
    const moduleProgress = progress[module.id] || []
    setCompletedSections(moduleProgress)
  }, [isHydrated, module])

  // Calculate progress percentage
  const progressPercentage =
    module && module.sections.length > 0
      ? Math.round((completedSections.length / module.sections.length) * 100)
      : 0

  // Loading state
  if (isLoading || !isHydrated) {
    return (
      <div className="container max-w-3xl py-6 px-4">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading module...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !module) {
    return (
      <div className="container max-w-3xl py-6 px-4">
        <Card className="border-destructive">
          <CardContent className="py-8 text-center">
            <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Module Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || 'Unable to load this learning module'}
            </p>
            <Button onClick={() => router.push('/learn')}>Back to Learn</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const firstSectionId = module.sections[0]?.id

  return (
    <div className="container max-w-3xl py-6 px-4">
      {/* Back link */}
      <Link
        href="/learn"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
        Back to Learn
      </Link>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-1">
              {module.id} - {module.examLevel === 'technician' ? 'Technician' : 'General'}
            </span>
            <h1 className="text-2xl font-bold">{module.title}</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">{module.description}</p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            <span>{module.estimatedMinutes} min read</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-4" aria-hidden="true" />
            <span>{module.sections.length} sections</span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSections.length} of {module.sections.length} complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Start/Continue Button */}
      {firstSectionId && (
        <Button className="w-full mb-8" size="lg" asChild>
          <Link href={`/learn/${module.id}/${firstSectionId}`}>
            <Play className="size-4 mr-2" aria-hidden="true" />
            {completedSections.length === 0
              ? 'Start Learning'
              : completedSections.length < module.sections.length
                ? 'Continue Learning'
                : 'Review Module'}
          </Link>
        </Button>
      )}

      {/* Sections List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sections</CardTitle>
          <CardDescription>Navigate through the module content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {module.sections.map((section) => {
              const isCompleted = completedSections.includes(section.id)
              return (
                <Link
                  key={section.id}
                  href={`/learn/${module.id}/${section.id}`}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="size-5 text-green-500" aria-label="Completed" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" aria-label="Not completed" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{section.id}</span>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {section.keyPoints && section.keyPoints.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {section.keyPoints[0]}
                      </p>
                    )}
                  </div>
                  <ChevronLeft
                    className="size-4 text-muted-foreground rotate-180 flex-shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
