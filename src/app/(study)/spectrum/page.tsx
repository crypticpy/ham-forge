'use client'

import { useState } from 'react'
import { Waves, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SpectrumChart,
  BandDetail,
  SpectrumLegend,
  FrequencyConverter,
} from '@/components/features/spectrum'
import { findBandForFrequency } from '@/data/radio/spectrum-data'
import type { AmateurBand, LicenseClass, SpectrumFilter } from '@/types/spectrum'

/**
 * License class filter options
 */
const LICENSE_OPTIONS: { value: LicenseClass | 'all'; label: string }[] = [
  { value: 'all', label: 'All Classes' },
  { value: 'technician', label: 'Technician' },
  { value: 'general', label: 'General' },
  { value: 'extra', label: 'Extra' },
]

/**
 * Spectrum Page - Interactive RF Spectrum Visualizer
 *
 * Displays the complete amateur radio frequency spectrum from 160m to 23cm
 * with license class privileges, operating modes, and frequency conversion tools.
 */
export default function SpectrumPage() {
  const [selectedBand, setSelectedBand] = useState<AmateurBand | null>(null)
  const [licenseFilter, setLicenseFilter] = useState<LicenseClass | 'all'>('all')

  // Build filter from selected options
  const filter: SpectrumFilter | undefined =
    licenseFilter === 'all' ? undefined : { licenseClass: licenseFilter }

  const handleBandSelect = (band: AmateurBand) => {
    setSelectedBand(band)
  }

  const handleCloseDetail = () => {
    setSelectedBand(null)
  }

  return (
    <div className="container mx-auto max-w-6xl py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Waves className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold">Amateur Radio Spectrum</h1>
        </div>
        <p className="text-muted-foreground">
          Interactive visualization of US amateur radio frequency allocations from 160 meters to 23
          centimeters
        </p>
      </div>

      {/* Quick Facts */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="size-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p>
                The amateur radio spectrum spans from <strong>1.8 MHz</strong> (160 meters) to over{' '}
                <strong>1.3 GHz</strong> (23 centimeters). License privileges determine which
                frequency bands you can transmit on. <strong>Technician</strong> class operators
                have full VHF/UHF privileges and limited HF access, while <strong>General</strong>{' '}
                and <strong>Extra</strong> class licenses unlock additional HF segments with
                worldwide communication capabilities.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Class Filter */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filter by License Class</CardTitle>
          <CardDescription>
            Highlight spectrum segments available to each license class
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {LICENSE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={licenseFilter === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLicenseFilter(option.value)}
                className={cn(
                  licenseFilter === option.value &&
                    option.value === 'technician' &&
                    'bg-blue-600 hover:bg-blue-700',
                  licenseFilter === option.value &&
                    option.value === 'general' &&
                    'bg-green-600 hover:bg-green-700',
                  licenseFilter === option.value &&
                    option.value === 'extra' &&
                    'bg-purple-600 hover:bg-purple-700'
                )}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Spectrum Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Full Spectrum Overview</CardTitle>
          <CardDescription>
            Click on any band to see detailed segment information. Hover for quick details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SpectrumChart
            filter={filter}
            selectedBand={selectedBand}
            onBandSelect={handleBandSelect}
          />
        </CardContent>
      </Card>

      {/* Band Detail Panel */}
      {selectedBand && (
        <div className="mb-6">
          <BandDetail band={selectedBand} onClose={handleCloseDetail} />
        </div>
      )}

      {/* Bottom section with Legend and Converter side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legend */}
        <div>
          <SpectrumLegend />
        </div>

        {/* Frequency Converter */}
        <div>
          <FrequencyConverter
            onFrequencySelect={(freqKHz) => {
              // Find and select the matching band
              const band = findBandForFrequency(freqKHz)
              if (band) {
                setSelectedBand(band)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
