'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, Sliders, ChevronRight } from 'lucide-react'
import {
  GuideSection,
  GuideQuickTips,
  GuideExamRelevance,
} from '@/components/features/radio/guide-section'
import { getFeatureGuide } from '@/data/radio/ic7300-guides'

interface GuideDetailPageProps {
  params: Promise<{ guide: string }>
}

export default function GuideDetailPage({ params }: GuideDetailPageProps) {
  const resolvedParams = use(params)
  const guide = getFeatureGuide(resolvedParams.guide)

  if (!guide) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-6 px-4">
      {/* Back link */}
      <Link
        href="/radio/guides"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to Feature Guides
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{guide.name}</h1>
        <p className="text-muted-foreground">{guide.description}</p>
      </div>

      {/* Main content layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar with Quick Tips */}
        <div className="lg:col-span-1 lg:order-2">
          <div className="sticky top-6 space-y-4">
            <GuideQuickTips tips={guide.quickTips} />

            {/* Related Controls */}
            {guide.relatedControlIds.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sliders className="size-4" aria-hidden="true" />
                    Related Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.relatedControlIds.map((controlId) => (
                      <li key={controlId}>
                        <Link
                          href={`/radio/controls#${controlId}`}
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <span className="capitalize">{controlId.replace(/-/g, ' ')}</span>
                          <ChevronRight className="size-3 ml-1" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Main content - Sections */}
        <div className="lg:col-span-2 lg:order-1 space-y-6">
          {/* Sections */}
          {guide.sections.map((section, index) => (
            <Card key={section.id}>
              <CardContent className="pt-6">
                <GuideSection section={section} />
              </CardContent>
              {index < guide.sections.length - 1 && <div className="border-t" />}
            </Card>
          ))}

          {/* Exam Relevance */}
          <GuideExamRelevance items={guide.examRelevance} />
        </div>
      </div>

      {/* Navigation to other guides */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">Explore More Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['spectrum', 'filters', 'memory', 'tuner']
              .filter((id) => id !== guide.id)
              .map((guideId) => (
                <Link
                  key={guideId}
                  href={`/radio/guides/${guideId}`}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-background hover:bg-muted transition-colors capitalize"
                >
                  {guideId.replace(/-/g, ' ')}
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
