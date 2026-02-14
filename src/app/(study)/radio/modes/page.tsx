'use client'

import Link from 'next/link'
import { ChevronLeft, Radio, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ModeGuideCard } from '@/components/features/radio/mode-guide-card'
import { MODE_GUIDES } from '@/data/radio/ic7300-mode-guides'

export default function ModesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Back link */}
      <Link
        href="/radio"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to Radio Reference
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Radio className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">Operating Modes</h1>
        </div>
        <p className="text-muted-foreground">
          Learn about the different operating modes available on the IC-7300 transceiver
        </p>
      </div>

      {/* Introduction */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BookOpen className="size-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                The IC-7300 supports multiple operating modes, each optimized for different types of
                communication. Understanding when and how to use each mode is essential for
                effective amateur radio operation and is frequently tested on licensing exams.
              </p>
              <p>
                <strong className="text-foreground">SSB (Single Sideband)</strong> modes (LSB and
                USB) are the most common for voice communications on HF bands, offering efficient
                use of power and bandwidth. <strong className="text-foreground">CW</strong> (Morse
                code) provides the narrowest bandwidth and best weak-signal performance.{' '}
                <strong className="text-foreground">FM</strong> is used on 10m and 6m for local
                communications. <strong className="text-foreground">Digital modes</strong> like RTTY
                and FT8 enable text-based and computer-assisted communications.
              </p>
              <p>
                Each guide below covers mode-specific settings, operating procedures, and exam tips
                to help you master IC-7300 operation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mode guides grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MODE_GUIDES.map((guide) => (
          <ModeGuideCard key={guide.id} guide={guide} href={`/radio/modes/${guide.id}`} />
        ))}
      </div>

      {/* Summary stats */}
      <Card className="mt-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Total Modes:</span>{' '}
              <span className="font-medium">{MODE_GUIDES.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Exam Tips:</span>{' '}
              <span className="font-medium text-amber-600 dark:text-amber-400">
                {MODE_GUIDES.reduce((sum, g) => sum + g.examTips.length, 0)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Detailed Sections:</span>{' '}
              <span className="font-medium">
                {MODE_GUIDES.reduce((sum, g) => sum + g.sections.length, 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
