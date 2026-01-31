'use client'

import Link from 'next/link'
import {
  Radio,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Waves,
  ExternalLink,
  ChevronRight,
  Zap,
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
    color: 'text-cosmic-cyan',
    glowColor: 'group-hover:shadow-glow-cyan',
    borderColor: 'group-hover:border-cosmic-cyan/50',
  },
  {
    href: '/exam',
    title: 'Practice Exams',
    description:
      'Simulate the real VE exam experience with timed tests and authentic question pools.',
    icon: ClipboardCheck,
    color: 'text-signal-green',
    glowColor: 'group-hover:shadow-glow-green',
    borderColor: 'group-hover:border-signal-green/50',
  },
  {
    href: '/learn',
    title: 'Study Modules',
    description: 'Learn concepts through structured educational content organized by topic.',
    icon: GraduationCap,
    color: 'text-aurora-purple',
    glowColor: 'group-hover:shadow-glow-purple',
    borderColor: 'group-hover:border-aurora-purple/50',
  },
  {
    href: '/dashboard',
    title: 'Track Progress',
    description:
      'View detailed analytics, track your study streaks, and monitor improvement over time.',
    icon: BarChart3,
    color: 'text-caution-amber',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(255,210,63,0.3)]',
    borderColor: 'group-hover:border-caution-amber/50',
  },
  {
    href: '/spectrum',
    title: 'Spectrum Explorer',
    description: 'Interactive visualization of amateur radio bands and frequency allocations.',
    icon: Waves,
    color: 'text-plasma-orange',
    glowColor: 'group-hover:shadow-glow-orange',
    borderColor: 'group-hover:border-plasma-orange/50',
  },
  {
    href: '/radio',
    title: 'IC-7300 Guide',
    description: 'Quick reference for the Icom IC-7300 transceiver controls and band settings.',
    icon: Radio,
    color: 'text-sunspot-blue',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(58,134,255,0.3)]',
    borderColor: 'group-hover:border-sunspot-blue/50',
  },
]

const highlights = [
  {
    title: 'Offline Ready',
    description: 'Study anywhere, even without an internet connection.',
    icon: Zap,
  },
  {
    title: 'Spaced Repetition',
    description: 'Smart scheduling helps you remember what you learn.',
    icon: BarChart3,
  },
  {
    title: 'All License Classes',
    description: 'Comprehensive question pools for Tech, General, and Extra.',
    icon: GraduationCap,
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
    <main id="main-content" tabIndex={-1} className="outline-none relative">
      {/* Cosmic background effects (dark mode only) */}
      <div className="fixed inset-0 bg-cosmic-gradient dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-stars opacity-40 dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-glow-orange dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-glow-purple dark:block hidden -z-10" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          {/* Logo with glow */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-plasma-orange/20 rounded-full blur-2xl scale-150 animate-pulse-glow" />
            <div className="relative rounded-full bg-plasma-orange/10 dark:bg-plasma-orange/20 p-5 border border-plasma-orange/30">
              <Radio className="size-14 text-plasma-orange animate-pulse-glow" />
            </div>
          </div>

          {/* Title with gradient */}
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4 text-gradient-orange">
            HAMFORGE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 tracking-wide">
            Master Your Ham Radio License
          </p>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Your comprehensive study companion for amateur radio license exams. Practice questions,
            track your progress, and ace your Technician, General, or Extra class exam.
          </p>

          {/* Current Exam Level Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 dark:bg-white/5 px-5 py-2.5 text-sm mb-8 border border-border dark:border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Currently studying:
            </span>
            <span className="font-display font-bold text-plasma-orange">
              {examLevelDisplay[currentExamLevel]} Class
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-plasma-orange hover:bg-plasma-orange/90 text-white font-semibold px-8 shadow-glow-orange"
            >
              <Link href="/practice">
                Start Practicing
                <ChevronRight className="size-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-plasma-orange/50 text-plasma-orange hover:bg-plasma-orange/10"
            >
              <a href="https://propulse.vercel.app" target="_blank" rel="noopener noreferrer">
                <span>View Propagation</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Propulse Cross-Link Banner */}
        <div className="mb-16 animate-fade-in-up animate-delay-100">
          <a
            href="https://propulse.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-card p-6 md:p-8 hover:border-plasma-orange/50 transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-5xl animate-pulse-glow">☀️</div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-xl md:text-2xl font-bold text-gradient-orange mb-2">
                  PROPULSE
                </h2>
                <p className="text-muted-foreground">
                  Check real-time solar conditions and HF propagation forecasts. Know when bands are
                  open before you transmit.
                </p>
              </div>
              <div className="flex items-center gap-2 text-plasma-orange group-hover:translate-x-1 transition-transform">
                <span className="font-medium">Open Dashboard</span>
                <ExternalLink className="size-5" />
              </div>
            </div>
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10 tracking-wide">
            Everything You Need to Pass
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className={`group animate-fade-in-up`}
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <Card
                    className={`h-full transition-all duration-300 glass-card dark:bg-white/[0.02] ${feature.glowColor} ${feature.borderColor}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-3">
                        <Icon
                          className={`size-8 ${feature.color} transition-transform group-hover:scale-110`}
                        />
                      </div>
                      <CardTitle className="text-lg group-hover:text-plasma-orange transition-colors font-display tracking-wide">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Why HamForge Section */}
        <div className="text-center animate-fade-in-up animate-delay-500">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 tracking-wide">
            Why HamForge?
          </h2>
          <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="glass-card p-6 text-center"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <Icon className="size-8 mx-auto mb-4 text-plasma-orange" />
                  <h3 className="font-display font-bold mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer Cross-Link */}
        <div className="mt-16 pt-8 border-t border-border dark:border-white/10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Part of the Propulse ecosystem for amateur radio operators
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a
              href="https://propulse.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-plasma-orange hover:underline inline-flex items-center gap-1"
            >
              Propulse Solar Dashboard
              <ExternalLink className="size-3" />
            </a>
            <span className="text-muted-foreground">•</span>
            <Link href="/spectrum" className="text-cosmic-cyan hover:underline">
              Spectrum Explorer
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
