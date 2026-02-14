'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, BookOpen } from 'lucide-react'
import { GuideCard } from '@/components/features/radio/guide-section'
import { getAllFeatureGuides } from '@/data/radio/ic7300-guides'

export default function GuidesPage() {
  const guides = getAllFeatureGuides()

  return (
    <div className="container mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Back link */}
      <Link
        href="/radio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to Radio Reference
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">Feature Guides</h1>
        </div>
        <p className="text-muted-foreground">
          In-depth guides for mastering the key features of the IC-7300
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Icom IC-7300 includes several advanced features that set it apart from traditional
            transceivers. These guides provide detailed explanations, step-by-step instructions, and
            exam-relevant information for each major feature. Understanding these features will help
            you get the most out of your radio and prepare for your ham radio license exams.
          </p>
        </CardContent>
      </Card>

      {/* Feature guides grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} href={`/radio/guides/${guide.id}`} />
        ))}
      </div>

      {/* Summary info */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Total Guides</dt>
              <dd className="font-medium">{guides.length} feature guides</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Coverage</dt>
              <dd className="font-medium">
                {guides.reduce((acc, g) => acc + g.sections.length, 0)} sections
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Quick Tips</dt>
              <dd className="font-medium">
                {guides.reduce((acc, g) => acc + g.quickTips.length, 0)} practical tips
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Exam Topics</dt>
              <dd className="font-medium">
                {guides.reduce((acc, g) => acc + g.examRelevance.length, 0)} exam-relevant items
              </dd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
