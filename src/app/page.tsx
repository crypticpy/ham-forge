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
  Compass,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HamDelightCard } from '@/components/features/delight/ham-delight-card'
import { useStudyStore } from '@/stores/study-store'

const features = [
  {
    href: '/practice',
    title: 'Adaptive Practice',
    description:
      'Train with spaced repetition, focus your weak areas, and build retention with every session.',
    icon: BookOpen,
    color: 'text-cosmic-cyan',
    glowColor: 'group-hover:shadow-glow-cyan',
    borderColor: 'group-hover:border-cosmic-cyan/50',
  },
  {
    href: '/exam',
    title: 'Exam Simulation',
    description:
      'Rehearse the real VE flow with timed sessions and authentic question pools.',
    icon: ClipboardCheck,
    color: 'text-signal-green',
    glowColor: 'group-hover:shadow-glow-green',
    borderColor: 'group-hover:border-signal-green/50',
  },
  {
    href: '/learn',
    title: 'Learning Modules',
    description: 'Build fundamentals with structured lessons organized by exam topic.',
    icon: GraduationCap,
    color: 'text-aurora-purple',
    glowColor: 'group-hover:shadow-glow-purple',
    borderColor: 'group-hover:border-aurora-purple/50',
  },
  {
    href: '/dashboard',
    title: 'Progress Analytics',
    description:
      'Track streaks, monitor accuracy trends, and see where your gains are strongest.',
    icon: BarChart3,
    color: 'text-caution-amber',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(255,210,63,0.3)]',
    borderColor: 'group-hover:border-caution-amber/50',
  },
  {
    href: '/spectrum',
    title: 'Band Explorer',
    description: 'Visualize amateur bands, allocations, and privileges in one interactive view.',
    icon: Waves,
    color: 'text-plasma-orange',
    glowColor: 'group-hover:shadow-glow-orange',
    borderColor: 'group-hover:border-plasma-orange/50',
  },
  {
    href: '/radio',
    title: 'Radio Reference',
    description: 'Use practical control guides and operating references for faster on-air confidence.',
    icon: Radio,
    color: 'text-sunspot-blue',
    glowColor: 'group-hover:shadow-[0_0_20px_rgba(58,134,255,0.3)]',
    borderColor: 'group-hover:border-sunspot-blue/50',
  },
]

const highlights = [
  {
    title: 'Offline Ready',
    description: 'Keep studying when connectivity drops or you are away from Wi-Fi.',
    icon: Zap,
  },
  {
    title: 'Smart Scheduling',
    description: 'Adaptive review timing helps you retain what matters most.',
    icon: BarChart3,
  },
  {
    title: 'Full Class Coverage',
    description: 'Comprehensive pools for Technician, General, and Amateur Extra.',
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
    <main id="main-content" tabIndex={-1} className="outline-none relative pb-safe">
      {/* Cosmic background effects (dark mode only) */}
      <div className="fixed inset-0 bg-cosmic-gradient dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-stars opacity-40 dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-glow-orange dark:block hidden -z-10" />
      <div className="fixed inset-0 bg-glow-purple dark:block hidden -z-10" />

      <div className="container mx-auto px-3 py-8 sm:px-4 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          {/* Logo with glow */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-plasma-orange/20 rounded-full blur-2xl scale-150 animate-pulse-glow" />
            <div className="relative rounded-full bg-plasma-orange/10 dark:bg-plasma-orange/20 p-5 border border-plasma-orange/30">
              <Radio className="size-14 text-plasma-orange animate-pulse-glow animate-float-slow" />
            </div>
          </div>

          {/* Title with gradient */}
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider mb-4 text-gradient-orange text-balance">
            HAMFORGE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 tracking-wide text-balance">
            Master Your Ham Radio License
          </p>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed text-balance">
            Prepare for your ham radio license with focused practice, clear lessons, and exam-ready
            simulations for Technician, General, and Amateur Extra.
          </p>

          {/* Current Exam Level Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 dark:bg-white/5 px-5 py-2.5 text-sm mb-8 border border-border dark:border-white/10 backdrop-blur-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Current focus
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
                Start Practice
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
                <span>Open Propagation</span>
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
            className="block glass-card p-6 md:p-8 hover:border-plasma-orange/50 transition-all duration-300 group delight-surface delight-lift"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-5xl animate-pulse-glow">☀️</div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-xl md:text-2xl font-bold text-gradient-orange mb-2">
                  PROPULSE
                </h2>
                <p className="text-muted-foreground">
                  Check real-time solar conditions and HF propagation forecasts, so you know when
                  bands are open before you transmit.
                </p>
              </div>
              <div className="flex items-center gap-2 text-plasma-orange group-hover:translate-x-1 transition-transform">
                <span className="font-medium">Open Propulse</span>
                <ExternalLink className="size-5" />
              </div>
            </div>
          </a>
        </div>

        {/* Feature Cards Grid */}
        <div className="mb-16">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5">
              <Compass className="size-4 text-plasma-orange" />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
                Study Toolkit
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mt-4 tracking-wide text-balance">
              Everything You Need To Pass
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group animate-fade-in-up delight-lift"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <Card
                    className={`h-full transition-all duration-300 glass-card delight-surface ${feature.glowColor} ${feature.borderColor}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl border border-border/80 bg-muted/40">
                        <Icon
                          className={`size-6 ${feature.color} transition-transform group-hover:scale-110`}
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
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-1.5">
            <Sparkles className="size-4 text-plasma-orange" />
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-muted-foreground">
              Why It Works
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-4 mb-8 tracking-wide text-balance">
            Why HamForge?
          </h2>
          <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="glass-card p-6 text-center delight-surface delight-lift"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <div className="mx-auto mb-4 inline-flex size-11 items-center justify-center rounded-xl border border-border/80 bg-muted/40">
                    <Icon className="size-5 text-plasma-orange" />
                  </div>
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

        <div className="mt-12 max-w-4xl mx-auto animate-fade-in-up animate-delay-500">
          <HamDelightCard context="home" seed="home-landing" />
        </div>
      </div>
    </main>
  )
}
