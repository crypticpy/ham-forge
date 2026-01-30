'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Monitor, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FrontPanel } from '@/components/features/radio/front-panel'
import { ControlCard } from '@/components/features/radio/control-card'
import { RelatedQuestions } from '@/components/features/radio/related-questions'
import { getControlById } from '@/lib/ic7300-data'

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
    <div className="container max-w-6xl py-6 px-4">
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
          <h1 className="text-2xl font-bold">Interactive Front Panel</h1>
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
            <div className="space-y-4 sticky top-6">
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
