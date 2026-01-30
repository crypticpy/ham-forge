'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Monitor, Menu, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react'
import type { RadioControl } from '@/types/radio'

interface ControlCardProps {
  control: RadioControl
}

const categoryColors: Record<RadioControl['category'], string> = {
  tuning: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  audio: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  mode: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  filter: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  power: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  memory: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  display: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  misc: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
}

const categoryLabels: Record<RadioControl['category'], string> = {
  tuning: 'Tuning',
  audio: 'Audio',
  mode: 'Mode',
  filter: 'Filter',
  power: 'Power',
  memory: 'Memory',
  display: 'Display',
  misc: 'Misc',
}

const locationIcons: Record<RadioControl['location'], typeof Monitor> = {
  'front-panel': Monitor,
  menu: Menu,
  touchscreen: LayoutGrid,
}

const locationLabels: Record<RadioControl['location'], string> = {
  'front-panel': 'Front Panel',
  menu: 'Menu',
  touchscreen: 'Touchscreen',
}

export function ControlCard({ control }: ControlCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const LocationIcon = locationIcons[control.location]
  const hasLongDescription = control.description.length > 150
  const shouldShowExpand = hasLongDescription || control.examTips

  return (
    <Card className="h-full transition-all hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{control.name}</CardTitle>
          <span
            className={`shrink-0 px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[control.category]}`}
          >
            {categoryLabels[control.category]}
          </span>
        </div>
        {/* Location indicator */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LocationIcon className="size-3.5" aria-hidden="true" />
          <span>{locationLabels[control.location]}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Description */}
        <p
          className={`text-sm text-muted-foreground ${!isExpanded && hasLongDescription ? 'line-clamp-3' : ''}`}
        >
          {control.description}
        </p>

        {/* Exam tips - shown when expanded or when no long description */}
        {control.examTips && (isExpanded || !hasLongDescription) && (
          <div className="flex gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <Lightbulb
              className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5"
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Exam Tip</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">{control.examTips}</p>
            </div>
          </div>
        )}

        {/* Expand/collapse button */}
        {shouldShowExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-4" aria-hidden="true" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="size-4" aria-hidden="true" />
                {control.examTips ? 'Show exam tip' : 'Show more'}
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
