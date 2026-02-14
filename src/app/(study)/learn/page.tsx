'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Loader2 } from 'lucide-react'
import { useStudyStore } from '@/stores/study-store'
import { useHydration } from '@/hooks/use-hydration'
import { ModuleCard } from '@/components/features/learning/module-card'
import type { LearningModule } from '@/types/learning'
import type { ExamLevel } from '@/types'

export default function LearnPage() {
  const { currentExamLevel } = useStudyStore()
  const isHydrated = useHydration()

  const [modules, setModules] = useState<LearningModule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const examLevelLabel =
    currentExamLevel === 'technician' ? 'Technician' : currentExamLevel === 'general' ? 'General' : 'Extra'

  // Load modules when exam level changes
  useEffect(() => {
    if (!isHydrated) return

    const loadModules = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Dynamically import module data based on exam level
        const moduleData = await loadModulesForLevel(currentExamLevel)
        setModules(moduleData)
      } catch (err) {
        console.error('Failed to load modules:', err)
        setError('Failed to load learning modules')
        setModules([])
      } finally {
        setIsLoading(false)
      }
    }

    loadModules()
  }, [currentExamLevel, isHydrated])

  return (
    <div className="container mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Study Modules</h1>
        <p className="text-muted-foreground">Study materials for the {examLevelLabel} exam</p>
      </div>

      {/* Current Exam Level Indicator */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="size-4" aria-hidden="true" />
        <span>
          Showing modules for <span className="font-medium text-foreground">{examLevelLabel}</span>{' '}
          license
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please try again later or contact support if the issue persists.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && !error && modules.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen
              className="size-12 text-muted-foreground mb-4 opacity-50"
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold mb-2">Modules coming soon</h2>
            <p className="text-muted-foreground max-w-md">
              Learning modules for the {examLevelLabel} exam are currently being developed. Check
              back soon for comprehensive study materials.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Module Grid */}
      {!isLoading && !error && modules.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Dynamically load learning modules for a specific exam level
 */
async function loadModulesForLevel(examLevel: ExamLevel): Promise<LearningModule[]> {
  try {
    // Try to load modules from the data directory
    // This uses dynamic imports to keep the bundle size manageable
    if (examLevel === 'technician') {
      const data = await import('@/data/modules/technician').catch(() => null)
      return data?.technicianModules ?? []
    } else if (examLevel === 'general') {
      const data = await import('@/data/modules/general').catch(() => null)
      return data?.generalModules ?? []
    } else if (examLevel === 'extra') {
      const data = await import('@/data/modules/extra').catch(() => null)
      return data?.extraModules ?? []
    }
    return []
  } catch {
    // If modules don't exist yet, return empty array
    return []
  }
}
