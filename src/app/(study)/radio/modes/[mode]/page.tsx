'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Radio, BookOpen, ChevronRight, Sliders } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ModeQuickSetup,
  ModeCommonSettings,
  ModeExamTips,
  modeBadgeColors,
} from '@/components/features/radio/mode-guide-card'
import { getModeGuide } from '@/data/radio/ic7300-mode-guides'
import { cn } from '@/lib/utils'

interface ModeDetailPageProps {
  params: Promise<{ mode: string }>
}

export default function ModeDetailPage({ params }: ModeDetailPageProps) {
  const resolvedParams = use(params)
  const guide = getModeGuide(resolvedParams.mode)

  if (!guide) {
    notFound()
  }

  const badgeColorClass = modeBadgeColors[guide.id] || modeBadgeColors.data

  return (
    <div className="container max-w-4xl py-6 px-4">
      {/* Back link */}
      <Link
        href="/radio/modes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to Operating Modes
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Radio className="size-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {guide.name}
                <span className="text-muted-foreground font-normal"> - {guide.fullName}</span>
              </h1>
            </div>
          </div>
          <span
            className={cn('shrink-0 px-3 py-1 text-sm font-medium rounded-full', badgeColorClass)}
          >
            {guide.name}
          </span>
        </div>
        <p className="text-muted-foreground">{guide.overview}</p>
      </div>

      {/* Table of contents */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="size-4" aria-hidden="true" />
            In This Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <nav>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {guide.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ChevronRight className="size-3" aria-hidden="true" />
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#quick-setup"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="size-3" aria-hidden="true" />
                  Quick Setup
                </a>
              </li>
              <li>
                <a
                  href="#common-settings"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="size-3" aria-hidden="true" />
                  Common Settings
                </a>
              </li>
              <li>
                <a
                  href="#exam-tips"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="size-3" aria-hidden="true" />
                  Exam Tips
                </a>
              </li>
              {guide.relatedControlIds.length > 0 && (
                <li>
                  <a
                    href="#related-controls"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ChevronRight className="size-3" aria-hidden="true" />
                    Related Controls
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-6 mb-8">
        {guide.sections.map((section) => (
          <Card key={section.id} id={section.id}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, index) => {
                  // Check if paragraph is a list
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const items = paragraph.split('\n').filter((line) => line.trim())
                    return (
                      <ul key={index} className="space-y-1 text-muted-foreground">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            {item.replace(/^[-*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                          </li>
                        ))}
                      </ul>
                    )
                  }

                  // Check if paragraph contains bold text markers
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split(/(\*\*.*?\*\*)/g)
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {parts.map((part, partIndex) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={partIndex} className="text-foreground">
                                {part.slice(2, -2)}
                              </strong>
                            )
                          }
                          return part
                        })}
                      </p>
                    )
                  }

                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Setup */}
      <Card className="mb-6" id="quick-setup">
        <CardContent className="pt-6">
          <ModeQuickSetup steps={guide.quickSetup} />
        </CardContent>
      </Card>

      {/* Common Settings */}
      <Card className="mb-6" id="common-settings">
        <CardContent className="pt-6">
          <ModeCommonSettings settings={guide.commonSettings} />
        </CardContent>
      </Card>

      {/* Exam Tips */}
      <Card className="mb-6" id="exam-tips">
        <CardContent className="pt-6">
          <ModeExamTips tips={guide.examTips} />
        </CardContent>
      </Card>

      {/* Related Controls */}
      {guide.relatedControlIds.length > 0 && (
        <Card id="related-controls">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sliders className="size-4" aria-hidden="true" />
              Related Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These IC-7300 controls are commonly used when operating in {guide.name} mode:
            </p>
            <div className="flex flex-wrap gap-2">
              {guide.relatedControlIds.map((controlId) => (
                <Link
                  key={controlId}
                  href={`/radio/controls#${controlId}`}
                  className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg border bg-muted/50 hover:bg-muted hover:border-primary/50 transition-colors"
                >
                  {controlId
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                  <ChevronRight className="size-3 ml-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation to other modes */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-sm font-medium mb-3">Explore Other Modes</h3>
        <div className="flex flex-wrap gap-2">
          {['lsb', 'usb', 'cw', 'fm', 'am', 'rtty', 'data']
            .filter((modeId) => modeId !== guide.id)
            .map((modeId) => {
              const otherGuide = getModeGuide(modeId)
              if (!otherGuide) return null
              return (
                <Link
                  key={modeId}
                  href={`/radio/modes/${modeId}`}
                  className={cn(
                    'inline-flex items-center px-3 py-1.5 text-sm rounded-full transition-colors',
                    modeBadgeColors[modeId] || modeBadgeColors.data,
                    'hover:opacity-80'
                  )}
                >
                  {otherGuide.name}
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
