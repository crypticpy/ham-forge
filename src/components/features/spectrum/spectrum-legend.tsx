'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Radio, Waves, Signal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { LicenseClass, OperatingMode } from '@/types/spectrum'

interface SpectrumLegendProps {
  className?: string
}

/**
 * License class color definitions matching the spectrum visualizer.
 * Maps each license class to background and text color classes.
 */
const licenseClassColors: Record<LicenseClass, { bg: string; bgLight: string; text: string }> = {
  technician: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  general: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-100 dark:bg-green-900/40',
    text: 'text-green-700 dark:text-green-300',
  },
  extra: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
  },
  novice: {
    bg: 'bg-gray-400 dark:bg-gray-600',
    bgLight: 'bg-gray-100 dark:bg-gray-800/40',
    text: 'text-gray-600 dark:text-gray-400',
  },
  advanced: {
    bg: 'bg-gray-500 dark:bg-gray-500',
    bgLight: 'bg-gray-100 dark:bg-gray-800/40',
    text: 'text-gray-600 dark:text-gray-400',
  },
}

/**
 * License class display information with labels and descriptions.
 */
const licenseClassInfo: Record<LicenseClass, { label: string; description: string }> = {
  technician: { label: 'Technician', description: 'Entry-level license' },
  general: { label: 'General', description: 'Intermediate license' },
  extra: { label: 'Extra', description: 'Highest privileges' },
  novice: { label: 'Novice', description: 'Legacy class (no longer issued)' },
  advanced: { label: 'Advanced', description: 'Legacy class (no longer issued)' },
}

/**
 * Operating mode descriptions explaining each mode abbreviation.
 */
const modeDescriptions: Record<Exclude<OperatingMode, 'All'>, string> = {
  CW: 'Continuous Wave (Morse code)',
  SSB: 'Single Sideband (voice)',
  AM: 'Amplitude Modulation',
  FM: 'Frequency Modulation',
  RTTY: 'Radio Teletype',
  Digital: 'FT8, FT4, PSK31, etc.',
  Data: 'Data communications',
  Image: 'SSTV, FAX',
  ATV: 'Amateur Television',
  Satellite: 'Satellite communications',
  EME: 'Earth-Moon-Earth (moonbounce)',
  Beacon: 'Beacon transmissions',
}

/**
 * Frequency category descriptions.
 */
const categoryDescriptions: Record<'HF' | 'VHF' | 'UHF' | 'SHF', string> = {
  HF: 'High Frequency (3-30 MHz)',
  VHF: 'Very High Frequency (30-300 MHz)',
  UHF: 'Ultra High Frequency (300-3000 MHz)',
  SHF: 'Super High Frequency (3-30 GHz)',
}

/**
 * Collapsible section header component.
 */
function SectionHeader({
  title,
  icon: Icon,
  isExpanded,
  onToggle,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 w-full text-left py-1 hover:text-foreground/80 transition-colors"
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown className="size-4 text-muted-foreground" />
      ) : (
        <ChevronRight className="size-4 text-muted-foreground" />
      )}
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-sm font-medium">{title}</span>
    </button>
  )
}

/**
 * Spectrum legend component displaying color codes for license classes,
 * operating mode abbreviations, and frequency categories.
 */
export function SpectrumLegend({ className }: SpectrumLegendProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['license', 'modes'])
  )

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  // Active license classes (currently issued)
  const activeLicenseClasses: LicenseClass[] = ['technician', 'general', 'extra']
  // Legacy license classes
  const legacyLicenseClasses: LicenseClass[] = ['novice', 'advanced']
  // Mode list excluding 'All'
  const modes = Object.keys(modeDescriptions) as Exclude<OperatingMode, 'All'>[]
  // Category list
  const categories = Object.keys(categoryDescriptions) as ('HF' | 'VHF' | 'UHF' | 'SHF')[]

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* License Class Legend */}
        <div>
          <SectionHeader
            title="License Classes"
            icon={Signal}
            isExpanded={expandedSections.has('license')}
            onToggle={() => toggleSection('license')}
          />
          {expandedSections.has('license') && (
            <div className="mt-2 space-y-1.5 pl-6">
              {/* Active license classes */}
              {activeLicenseClasses.map((license) => {
                const colors = licenseClassColors[license]
                const info = licenseClassInfo[license]
                return (
                  <div key={license} className="flex items-center gap-2">
                    <div className={cn('size-3 rounded-sm shrink-0', colors.bg)} />
                    <span className="text-sm font-medium">{info.label}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      - {info.description}
                    </span>
                  </div>
                )
              })}
              {/* Legacy classes separator */}
              <div className="pt-1 border-t border-border/50 mt-2">
                <span className="text-xs text-muted-foreground">Legacy Classes:</span>
              </div>
              {/* Legacy license classes */}
              {legacyLicenseClasses.map((license) => {
                const colors = licenseClassColors[license]
                const info = licenseClassInfo[license]
                return (
                  <div key={license} className="flex items-center gap-2 opacity-70">
                    <div className={cn('size-3 rounded-sm shrink-0', colors.bg)} />
                    <span className="text-sm">{info.label}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">(legacy)</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Operating Modes Legend */}
        <div>
          <SectionHeader
            title="Operating Modes"
            icon={Radio}
            isExpanded={expandedSections.has('modes')}
            onToggle={() => toggleSection('modes')}
          />
          {expandedSections.has('modes') && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-6">
              {modes.map((mode) => (
                <div key={mode} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-mono font-medium text-foreground min-w-[4rem]">
                    {mode}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {modeDescriptions[mode]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Frequency Categories Legend */}
        <div>
          <SectionHeader
            title="Frequency Categories"
            icon={Waves}
            isExpanded={expandedSections.has('categories')}
            onToggle={() => toggleSection('categories')}
          />
          {expandedSections.has('categories') && (
            <div className="mt-2 space-y-1 pl-6">
              {categories.map((category) => (
                <div key={category} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-mono font-medium text-foreground min-w-[3rem]">
                    {category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {categoryDescriptions[category]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
