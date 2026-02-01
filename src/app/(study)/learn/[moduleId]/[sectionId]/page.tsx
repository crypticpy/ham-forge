'use client'

import { useState, useEffect, use, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Loader2,
  AlertCircle,
  Check,
  BookOpen,
  Trophy,
} from 'lucide-react'
import { useHydration } from '@/hooks/use-hydration'
import { useProgressStore } from '@/stores/progress-store'
import { useActivityStore } from '@/stores/activity-store'
import { PaginatedContent } from '@/components/features/learning/paginated-content'
import { KeyPoints } from '@/components/features/learning/key-points'
import { KnowledgeCheck } from '@/components/features/learning/knowledge-check'
import {
  OhmsLawCalculator,
  IonosphereVisualizer,
  PhoneticTrainer,
  BandPlanExplorer,
  DecibelCalculator,
  FrequencyWavelengthConverter,
  QCodeReference,
  PowerCalculator,
  ModulationDemo,
  CircuitIdentifier,
  RSTTrainer,
  QSOTrainer,
} from '@/components/features/learning/interactive'
import { getModuleById } from '@/lib/learning-modules'
import type { LearningModule, LearningSection, InteractiveComponentType } from '@/types/learning'
import type { ExamLevel } from '@/types'

interface SectionPageProps {
  params: Promise<{ moduleId: string; sectionId: string }>
}

/**
 * Map of interactive component types to their React components
 */
const interactiveComponentMap: Record<InteractiveComponentType, React.ComponentType> = {
  'ohms-law-calculator': OhmsLawCalculator,
  'ionosphere-visualizer': IonosphereVisualizer,
  'phonetic-trainer': PhoneticTrainer,
  'band-plan-explorer': BandPlanExplorer,
  'decibel-calculator': DecibelCalculator,
  'frequency-wavelength-converter': FrequencyWavelengthConverter,
  'q-code-reference': QCodeReference,
  'power-calculator': PowerCalculator,
  'modulation-demo': ModulationDemo,
  'circuit-identifier': CircuitIdentifier,
  'rst-trainer': RSTTrainer,
  'qso-trainer': QSOTrainer,
}

/**
 * Renders an interactive component by its type
 */
function renderInteractiveComponent(type: InteractiveComponentType): React.ReactNode {
  const Component = interactiveComponentMap[type]
  return Component ? <Component key={type} /> : null
}

/**
 * Get a learning module by ID, checking both exam levels
 */
function getModule(moduleId: string): LearningModule | null {
  const examLevel: ExamLevel = moduleId.startsWith('G') ? 'general' : 'technician'
  return getModuleById(examLevel, moduleId) ?? null
}

export default function SectionContentPage({ params }: SectionPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const isHydrated = useHydration()
  const [module, setModule] = useState<LearningModule | null>(null)
  const [section, setSection] = useState<LearningSection | null>(null)
  const [sectionIndex, setSectionIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get progress from store
  const isSectionComplete = useProgressStore((state) => state.isSectionComplete)
  const markSectionComplete = useProgressStore((state) => state.markSectionComplete)
  const markSectionIncomplete = useProgressStore((state) => state.markSectionIncomplete)
  const getSectionQuizResult = useProgressStore((state) => state.getSectionQuizResult)

  const isCompleted =
    isHydrated && module && section ? isSectionComplete(module.id, section.id) : false

  // Get quiz result for this section
  const quizResult = isHydrated && section ? getSectionQuizResult(section.id) : null
  const quizPassed = quizResult?.passed ?? false

  // Activity tracking
  const recordActivity = useActivityStore((s) => s.recordActivity)

  // Record activity for "continue where you left off" feature
  useEffect(() => {
    if (!module || !section || isLoading) return

    recordActivity({
      type: 'learn',
      path: `/learn/${module.id}/${section.id}`,
      label: `Learning ${module.title} - ${section.title}`,
      metadata: {
        moduleId: module.id,
        sectionId: section.id,
        sectionTitle: section.title,
      },
    })
  }, [module, section, isLoading, recordActivity])

  // Load module and section data
  useEffect(() => {
    const loadData = async () => {
      try {
        const moduleData = getModule(resolvedParams.moduleId)
        if (!moduleData) {
          setError('Module not found')
          setIsLoading(false)
          return
        }

        const idx = moduleData.sections.findIndex(
          (s: LearningSection) => s.id === resolvedParams.sectionId
        )
        if (idx === -1) {
          setError('Section not found')
          setIsLoading(false)
          return
        }

        setModule(moduleData)
        setSection(moduleData.sections[idx])
        setSectionIndex(idx)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [resolvedParams.moduleId, resolvedParams.sectionId])

  // Mark section as complete
  const handleMarkComplete = useCallback(() => {
    if (!module || !section) return
    markSectionComplete(module.id, section.id)
  }, [module, section, markSectionComplete])

  // Toggle completion status
  const handleToggleComplete = useCallback(() => {
    if (!module || !section) return
    if (isCompleted) {
      markSectionIncomplete(module.id, section.id)
    } else {
      markSectionComplete(module.id, section.id)
    }
  }, [module, section, isCompleted, markSectionComplete, markSectionIncomplete])

  // Navigation helpers
  const prevSection = module && sectionIndex > 0 ? module.sections[sectionIndex - 1] : null
  const nextSection =
    module && sectionIndex < module.sections.length - 1 ? module.sections[sectionIndex + 1] : null

  // Loading state
  if (isLoading || !isHydrated) {
    return (
      <div className="container mx-auto max-w-3xl py-6 px-4">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !module || !section) {
    return (
      <div className="container mx-auto max-w-3xl py-6 px-4">
        <Card className="border-destructive">
          <CardContent className="py-8 text-center">
            <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || 'Unable to load this learning section'}
            </p>
            <Button onClick={() => router.push('/learn')}>Back to Learn</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl py-6 px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/learn" className="hover:text-foreground transition-colors">
          <Home className="size-4" aria-label="Learn" />
        </Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <Link href={`/learn/${module.id}`} className="hover:text-foreground transition-colors">
          {module.title}
        </Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="text-foreground">{section.title}</span>
      </nav>

      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-sm font-mono text-muted-foreground">{section.id}</span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <Check className="size-3" aria-hidden="true" />
              Completed
            </span>
          )}
          {quizPassed && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              <Trophy className="size-3" aria-hidden="true" />
              Quiz Passed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{section.title}</h1>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        {section.content ? (
          <PaginatedContent content={section.content} sectionId={section.id} wordsPerPage={280} />
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Content for this section is coming soon. Check back later!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Interactive Components */}
      {section.interactiveComponents && section.interactiveComponents.length > 0 && (
        <div className="mb-8 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              🧪
            </span>
            Try It Yourself
          </h2>
          {section.interactiveComponents.map(renderInteractiveComponent)}
        </div>
      )}

      {/* Key Points */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <div className="mb-8">
          <KeyPoints points={section.keyPoints} />
        </div>
      )}

      {/* Knowledge Check Quiz */}
      {section.relatedQuestionIds && section.relatedQuestionIds.length > 0 && (
        <div className="mb-8">
          <KnowledgeCheck
            sectionId={section.id}
            relatedQuestionIds={section.relatedQuestionIds}
            examLevel={module.examLevel}
          />
        </div>
      )}

      {/* Related Questions Link */}
      {section.relatedQuestionIds && section.relatedQuestionIds.length > 0 && (
        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">Practice Related Questions</h3>
                <p className="text-sm text-muted-foreground">
                  {section.relatedQuestionIds.length} questions available for this section
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/practice?section=${section.id}`}>
                  <BookOpen className="size-4 mr-2" aria-hidden="true" />
                  Practice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mark as Complete / Completed Button */}
      <div className="mb-8">
        <Button
          onClick={handleToggleComplete}
          variant={isCompleted ? 'secondary' : 'outline'}
          className="w-full"
        >
          <Check className="size-4 mr-2" aria-hidden="true" />
          {isCompleted ? 'Completed - Click to Undo' : 'Mark as Complete'}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t">
        {prevSection ? (
          <Button variant="outline" asChild>
            <Link href={`/learn/${module.id}/${prevSection.id}`}>
              <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
              <span className="hidden sm:inline">Previous:</span> {prevSection.title}
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextSection ? (
          <Button onClick={handleMarkComplete} asChild>
            <Link href={`/learn/${module.id}/${nextSection.id}`}>
              <span className="hidden sm:inline">Next:</span> {nextSection.title}
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={`/learn/${module.id}`}>
              Back to Module
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
