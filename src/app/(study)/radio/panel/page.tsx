'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Monitor, X, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ControlCard } from '@/components/features/radio/control-card'
import { RelatedQuestions } from '@/components/features/radio/related-questions'
import { getControlById } from '@/lib/ic7300-data'

/**
 * Loading skeleton for the FrontPanel component
 * Matches the aspect ratio and layout of the actual panel
 */
function FrontPanelSkeleton() {
  return (
    <div className="w-full">
      <div className="relative w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-xl border-2 border-zinc-700 shadow-xl overflow-hidden aspect-[2.5/1] min-h-[280px] md:min-h-[350px]">
        {/* Loading spinner overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Loader2 className="size-8 text-zinc-400 animate-spin" aria-hidden="true" />
          <span className="mt-3 text-sm text-zinc-400">Loading front panel...</span>
        </div>

        {/* Skeleton elements to hint at layout */}
        <div className="absolute inset-0 opacity-20">
          {/* Display area skeleton */}
          <div
            className="absolute border-2 border-zinc-600 rounded-lg bg-zinc-950/50"
            style={{ left: '15%', top: '5%', width: '55%', height: '35%' }}
          />

          {/* Main dial skeleton */}
          <div
            className="absolute rounded-full bg-zinc-700/50 border-4 border-zinc-600"
            style={{ left: '77%', top: '30%', width: '18%', height: '35%' }}
          />

          {/* Left knobs skeleton */}
          <div className="absolute flex flex-col gap-3" style={{ left: '3%', top: '45%' }}>
            <div className="w-10 h-10 rounded-full bg-zinc-700/50" />
            <div className="w-10 h-10 rounded-full bg-zinc-700/50" />
            <div className="w-8 h-8 rounded-full bg-zinc-700/50" />
          </div>

          {/* Mode buttons skeleton */}
          <div className="absolute flex gap-2" style={{ left: '18%', top: '45%', width: '55%' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 h-8 rounded bg-zinc-700/50" />
            ))}
          </div>
        </div>
      </div>

      {/* Instruction text skeleton */}
      <div className="mt-4 flex justify-center">
        <div className="h-4 w-64 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

/**
 * Dynamically imported FrontPanel component with code splitting
 * Uses ssr: false since it's an interactive client component
 */
const FrontPanel = dynamic(
  () =>
    import('@/components/features/radio/front-panel').then((mod) => ({ default: mod.FrontPanel })),
  {
    loading: () => <FrontPanelSkeleton />,
    ssr: false,
  }
)

export default function InteractivePanelPage() {
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null)

  const selectedControl = selectedControlId ? getControlById(selectedControlId) : null

  const handleControlSelect = (controlId: string | null) => {
    setSelectedControlId(controlId)
  }

  const handleClearSelection = () => {
    setSelectedControlId(null)
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Back link */}
      <Link
        href="/radio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Radio Reference
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
            <Monitor className="size-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">Panel Explorer</h1>
        </div>
        <p className="text-muted-foreground">
          Explore the IC-7300 front panel controls. Click or tap any control to learn about its
          function and see related exam questions.
        </p>
      </div>

      {/* Main content - responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Front Panel - takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">IC-7300 Front Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <FrontPanel
                selectedControlId={selectedControlId}
                onControlSelect={handleControlSelect}
              />
            </CardContent>
          </Card>
        </div>

        {/* Control Details Sidebar - 1 column on desktop, full width on mobile */}
        <div className="lg:col-span-1">
          {selectedControl ? (
            <div className="space-y-4 lg:sticky lg:top-6">
              {/* Clear selection button */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Selected Control</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSelection}
                  className="h-8 px-2 text-xs"
                >
                  <X className="size-3 mr-1" aria-hidden="true" />
                  Clear
                </Button>
              </div>

              {/* Control Card */}
              <ControlCard control={selectedControl} />

              {/* Related Questions */}
              {selectedControlId && (
                <RelatedQuestions controlId={selectedControlId} maxQuestions={3} />
              )}
            </div>
          ) : (
            <Card className="h-full min-h-[200px]">
              <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="p-3 rounded-full bg-muted mb-4">
                  <Monitor className="size-6 text-muted-foreground" aria-hidden="true" />
                </div>
                <h3 className="font-medium text-foreground mb-1">No Control Selected</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Click or tap on any control in the front panel to see detailed information and
                  related exam questions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick tips section */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tips for Using This Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium">1.</span>
              <span>Click any control on the front panel to see its description and function.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium">2.</span>
              <span>Controls are color-coded by category (tuning, audio, mode, filter, etc.).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium">3.</span>
              <span>
                Look for exam tips highlighted in amber - these relate to common test questions.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-medium">4.</span>
              <span>Click related questions to practice with actual exam content.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
