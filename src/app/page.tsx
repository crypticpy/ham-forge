'use client'

import Link from 'next/link'
import {
  Radio,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useStudyStore } from '@/stores/study-store'

const features = [
  {
    href: '/practice',
    title: 'Practice Questions',
    description:
      'Master questions with spaced repetition learning. Focus on weak areas and track your progress.',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    href: '/exam',
    title: 'Practice Exams',
    description:
      'Simulate the real VE exam experience with timed tests and authentic question pools.',
    icon: ClipboardCheck,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    href: '/learn',
    title: 'Study Modules',
    description: 'Learn concepts through structured educational content organized by topic.',
    icon: GraduationCap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    href: '/dashboard',
    title: 'Track Progress',
    description:
      'View detailed analytics, track your study streaks, and monitor improvement over time.',
    icon: BarChart3,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    href: '/radio',
    title: 'IC-7300 Guide',
    description: 'Quick reference for the Icom IC-7300 transceiver controls and band settings.',
    icon: Radio,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
]

export default function Home() {
  const { currentExamLevel } = useStudyStore()

  const examLevelDisplay = {
    technician: 'Technician',
    general: 'General',
    extra: 'Extra',
  }

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mb-6 rounded-full bg-primary/10 p-4">
            <Radio className="size-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">HamForge</h1>
          <p className="text-xl text-muted-foreground mb-2">Master Your Ham Radio License</p>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Your comprehensive study companion for amateur radio license exams. Practice questions,
            track your progress, and ace your Technician, General, or Extra class exam.
          </p>

          {/* Current Exam Level Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm mb-8">
            <span className="text-muted-foreground">Currently studying:</span>
            <span className="font-medium">{examLevelDisplay[currentExamLevel]} Class</span>
          </div>

          {/* CTA Button */}
          <Button asChild size="lg" className="gap-2">
            <Link href="/practice">
              Get Started
              <ChevronRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Feature Cards Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8">Everything You Need to Pass</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.href} href={feature.href} className="group">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <div className={`mb-3 rounded-lg ${feature.bgColor} p-2.5 w-fit`}>
                        <Icon className={`size-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Why HamForge Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Why HamForge?</h2>
          <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-muted/50">
              <h3 className="font-medium mb-2">Offline Ready</h3>
              <p className="text-sm text-muted-foreground">
                Study anywhere, even without an internet connection.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h3 className="font-medium mb-2">Spaced Repetition</h3>
              <p className="text-sm text-muted-foreground">
                Smart scheduling helps you remember what you learn.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h3 className="font-medium mb-2">All License Classes</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive question pools for Tech, General, and Extra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
