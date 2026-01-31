'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Radio,
  Sliders,
  BarChart3,
  ChevronRight,
  Monitor,
  Menu,
  Waves,
  BookOpen,
} from 'lucide-react'

export default function RadioPage() {
  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Radio className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">IC-7300 Reference</h1>
        </div>
        <p className="text-muted-foreground">
          Explore the controls and capabilities of the Icom IC-7300 MK2 transceiver
        </p>
      </div>

      {/* About section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Icom IC-7300 MK2 is a popular HF/50MHz transceiver that features a real-time
            spectrum scope, touch screen interface, and RF direct sampling technology. It covers all
            amateur HF bands plus 6 meters, making it an excellent choice for both new and
            experienced operators. This reference guide covers the main controls and features
            commonly referenced in amateur radio licensing exams.
          </p>
        </CardContent>
      </Card>

      {/* Navigation cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Interactive Front Panel */}
        <Link href="/radio/panel">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                  <Monitor className="size-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Interactive Panel</CardTitle>
                  <CardDescription>Explore the front panel visually</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Interactive diagram of the IC-7300 front panel. Click on controls to learn what they
                do and see related exam questions.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>Open interactive panel</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Controls Reference */}
        <Link href="/radio/controls">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Sliders className="size-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Controls Reference</CardTitle>
                  <CardDescription>Front panel, menu, and touchscreen controls</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about the knobs, buttons, and menu options that control tuning, audio, modes,
                filters, and more. Includes exam tips for common test questions.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>Explore controls</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Menu System */}
        <Link href="/radio/menu">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Menu
                    className="size-5 text-purple-600 dark:text-purple-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">Menu System</CardTitle>
                  <CardDescription>Navigate the IC-7300 menu hierarchy</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Searchable guide to the IC-7300 menu structure. Find settings quickly and see
                recommended configurations for new operators.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>Browse menu system</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Operating Modes */}
        <Link href="/radio/modes">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Waves className="size-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-lg">Operating Modes</CardTitle>
                  <CardDescription>SSB, CW, FM, Digital, and more</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed guides for each operating mode. Learn setup procedures, best practices, and
                exam-relevant information for SSB, CW, FM, and digital modes.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>View mode guides</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Feature Guides */}
        <Link href="/radio/guides">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30">
                  <BookOpen
                    className="size-5 text-rose-600 dark:text-rose-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">Feature Guides</CardTitle>
                  <CardDescription>Spectrum scope, filters, memory, tuner</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                In-depth tutorials for key IC-7300 features including the spectrum scope, filter
                configuration, memory channels, and antenna tuner.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>Read feature guides</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Band Plans */}
        <Link href="/radio/bands">
          <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <BarChart3
                    className="size-5 text-green-600 dark:text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">Band Plans</CardTitle>
                  <CardDescription>HF and VHF frequency allocations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Visual guides to amateur radio band allocations. See which frequencies are available
                for Technician, General, and Extra class licensees.
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                <span>View band plans</span>
                <ChevronRight className="size-4 ml-1" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick facts */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">IC-7300 Quick Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Frequency Coverage</dt>
              <dd className="font-medium">160m - 6m (HF + 50MHz)</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Power Output</dt>
              <dd className="font-medium">100W (HF), 50W (6m)</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Modes</dt>
              <dd className="font-medium">SSB, CW, AM, FM, RTTY</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Display</dt>
              <dd className="font-medium">4.3&quot; Color Touchscreen</dd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
