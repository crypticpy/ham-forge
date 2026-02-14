'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowLeft,
  Menu,
  Settings,
  Star,
  Lightbulb,
  Info,
  Loader2,
  Search,
  Folder,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  IC7300_MENU_TREE,
  getRecommendedSettings,
  getExamRelevantSettings,
} from '@/data/radio/ic7300-menu'
import type { MenuItem } from '@/data/radio/ic7300-menu'

/**
 * Loading skeleton for the MenuTree component
 * Mimics the search bar and tree structure layout
 */
function MenuTreeSkeleton() {
  return (
    <div className="w-full">
      {/* Search input skeleton */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50"
            aria-hidden="true"
          />
          <div className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-muted/30 animate-pulse" />
        </div>

        {/* Checkbox skeleton */}
        <div className="flex items-center gap-2">
          <div className="size-4 rounded border border-input bg-muted/30 animate-pulse" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Tree items skeleton */}
      <div className="space-y-1">
        {/* Loading indicator */}
        <div className="flex items-center justify-center py-4 mb-2">
          <Loader2 className="size-5 text-muted-foreground animate-spin" aria-hidden="true" />
          <span className="ml-2 text-sm text-muted-foreground">Loading menu tree...</span>
        </div>

        {/* Skeleton tree items to hint at structure */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="py-2 px-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Folder className="size-4 text-muted-foreground/30" aria-hidden="true" />
              <div
                className="h-5 bg-muted rounded animate-pulse"
                style={{ width: `${80 + i * 15}px` }}
              />
            </div>
            {/* Nested items hint */}
            {i <= 2 && (
              <div className="ml-6 mt-2 space-y-2">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-2 py-1 pl-4">
                    <div className="w-4" />
                    <div
                      className="h-4 bg-muted/70 rounded animate-pulse"
                      style={{ width: `${60 + j * 20}px` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Dynamically imported MenuTree component with code splitting
 * Uses ssr: false since it's an interactive client component with state
 */
const MenuTree = dynamic(
  () => import('@/components/features/radio/menu-tree').then((mod) => ({ default: mod.MenuTree })),
  {
    loading: () => <MenuTreeSkeleton />,
    ssr: false,
  }
)

/**
 * Counts total leaf menu items (settings) in the tree
 */
function countMenuItems(items: MenuItem[]): number {
  let count = 0
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      count += countMenuItems(item.children)
    } else {
      count += 1
    }
  }
  return count
}

type ViewMode = 'all' | 'recommended'

export default function MenuSystemPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all')

  // Calculate stats
  const stats = useMemo(() => {
    const totalItems = countMenuItems(IC7300_MENU_TREE)
    const recommendedItems = getRecommendedSettings()
    const examItems = getExamRelevantSettings()
    return {
      total: totalItems,
      recommended: recommendedItems.length,
      examRelevant: examItems.length,
    }
  }, [])

  return (
    <div className="container mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6">
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
          <div className="p-2 rounded-lg bg-primary/10">
            <Menu className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">Menu System Guide</h1>
        </div>
        <p className="text-muted-foreground">
          Navigate and understand the IC-7300 menu structure for optimal configuration
        </p>
      </div>

      {/* Introduction card - how to access the menu */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Info className="size-4 text-blue-500" aria-hidden="true" />
            <CardTitle className="text-base">Accessing the Menu</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            To access the IC-7300 menu system, press the <strong>MENU</strong> button on the front
            panel or touch the <strong>[MENU]</strong> icon on the touchscreen. The menu is
            organized into four main categories:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
            <li>
              <strong>SET</strong> - Display, audio, and general configuration
            </li>
            <li>
              <strong>CONNECTORS</strong> - USB, CI-V, and external device settings
            </li>
            <li>
              <strong>FUNCTION</strong> - Operating modes, tuning, and CW/SSB settings
            </li>
            <li>
              <strong>OTHERS</strong> - System information, backup, and reset options
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Settings className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-2xl font-bold">{stats.total}</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Settings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="size-4 text-amber-500" aria-hidden="true" />
              <span className="text-2xl font-bold">{stats.examRelevant}</span>
            </div>
            <p className="text-xs text-muted-foreground">Exam Relevant</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Lightbulb className="size-4 text-green-500" aria-hidden="true" />
              <span className="text-2xl font-bold">{stats.recommended}</span>
            </div>
            <p className="text-xs text-muted-foreground">Recommended</p>
          </CardContent>
        </Card>
      </div>

      {/* View mode toggle tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setViewMode('all')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            viewMode === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
          }`}
          aria-selected={viewMode === 'all'}
          role="tab"
        >
          All Settings
        </button>
        <button
          onClick={() => setViewMode('recommended')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            viewMode === 'recommended'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
          }`}
          aria-selected={viewMode === 'recommended'}
          role="tab"
        >
          <span className="flex items-center gap-1.5">
            <Lightbulb className="size-3.5" aria-hidden="true" />
            Recommended Only
          </span>
        </button>
      </div>

      {/* Menu tree */}
      <Card>
        <CardContent className="pt-6">
          {viewMode === 'recommended' && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-300">
                Showing only settings with recommended values for new ham radio operators. These
                settings are a good starting point for optimal operation.
              </p>
            </div>
          )}
          <MenuTree
            items={IC7300_MENU_TREE}
            showSearch={true}
            showRecommendedOnly={viewMode === 'recommended'}
          />
        </CardContent>
      </Card>

      {/* Tips section */}
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Menu Navigation Tips</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>
                Use the <strong>EXIT</strong> button or touch outside the menu to close it
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>
                Settings marked with <Star className="inline size-3 text-amber-500" /> are commonly
                tested on ham radio exams
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>
                Settings with <Lightbulb className="inline size-3 text-green-500" /> have
                recommended values for new operators
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">4.</span>
              <span>
                Back up your settings to an SD card before making major changes (OTHERS &gt; Memory
                Backup)
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
