'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BandChart } from '@/components/features/radio/band-chart'
import type { BandPlan } from '@/types/radio'
import type { ExamLevel } from '@/types/question'

// Mock data for HF/VHF band plans
const bandPlans: BandPlan[] = [
  {
    name: '160m',
    startFreq: 1800,
    endFreq: 2000,
    allocations: [
      {
        startFreq: 1800,
        endFreq: 2000,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'Technicians do not have privileges on 160m',
      },
    ],
  },
  {
    name: '80m',
    startFreq: 3500,
    endFreq: 4000,
    allocations: [
      {
        startFreq: 3500,
        endFreq: 3525,
        licenseClass: ['extra'],
        modes: ['CW'],
      },
      {
        startFreq: 3525,
        endFreq: 3600,
        licenseClass: ['general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 3600,
        endFreq: 3700,
        licenseClass: ['extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 3700,
        endFreq: 3800,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 3800,
        endFreq: 4000,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
    ],
  },
  {
    name: '40m',
    startFreq: 7000,
    endFreq: 7300,
    allocations: [
      {
        startFreq: 7000,
        endFreq: 7025,
        licenseClass: ['extra'],
        modes: ['CW'],
      },
      {
        startFreq: 7025,
        endFreq: 7125,
        licenseClass: ['general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 7125,
        endFreq: 7175,
        licenseClass: ['extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 7175,
        endFreq: 7300,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
    ],
  },
  {
    name: '20m',
    startFreq: 14000,
    endFreq: 14350,
    allocations: [
      {
        startFreq: 14000,
        endFreq: 14025,
        licenseClass: ['extra'],
        modes: ['CW'],
      },
      {
        startFreq: 14025,
        endFreq: 14150,
        licenseClass: ['general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 14150,
        endFreq: 14175,
        licenseClass: ['extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 14175,
        endFreq: 14225,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 14225,
        endFreq: 14350,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
    ],
  },
  {
    name: '15m',
    startFreq: 21000,
    endFreq: 21450,
    allocations: [
      {
        startFreq: 21000,
        endFreq: 21025,
        licenseClass: ['extra'],
        modes: ['CW'],
      },
      {
        startFreq: 21025,
        endFreq: 21200,
        licenseClass: ['general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 21200,
        endFreq: 21225,
        licenseClass: ['extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 21225,
        endFreq: 21275,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
      {
        startFreq: 21275,
        endFreq: 21450,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
      },
    ],
  },
  {
    name: '10m',
    startFreq: 28000,
    endFreq: 29700,
    allocations: [
      {
        startFreq: 28000,
        endFreq: 28300,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW', 'Digital'],
        notes: 'Technician CW/Data: 28.000-28.300 MHz',
      },
      {
        startFreq: 28300,
        endFreq: 28500,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'Technician SSB: 28.300-28.500 MHz (200W PEP max)',
      },
      {
        startFreq: 28500,
        endFreq: 29700,
        licenseClass: ['general', 'extra'],
        modes: ['CW', 'SSB', 'Digital', 'FM'],
      },
    ],
  },
  {
    name: '6m',
    startFreq: 50000,
    endFreq: 54000,
    allocations: [
      {
        startFreq: 50000,
        endFreq: 50100,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 50100,
        endFreq: 54000,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW', 'SSB', 'Digital', 'FM'],
        notes: 'Full privileges for all license classes',
      },
    ],
  },
  {
    name: '2m',
    startFreq: 144000,
    endFreq: 148000,
    allocations: [
      {
        startFreq: 144000,
        endFreq: 144100,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW'],
      },
      {
        startFreq: 144100,
        endFreq: 148000,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW', 'SSB', 'Digital', 'FM'],
        notes: 'Primary VHF band - FM repeaters commonly on 146-148 MHz',
      },
    ],
  },
  {
    name: '70cm',
    startFreq: 420000,
    endFreq: 450000,
    allocations: [
      {
        startFreq: 420000,
        endFreq: 450000,
        licenseClass: ['technician', 'general', 'extra'],
        modes: ['CW', 'SSB', 'Digital', 'FM', 'ATV'],
        notes: 'Full privileges for all license classes. Popular for repeaters and ATV.',
      },
    ],
  },
]

const licenseFilters: { value: ExamLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All Classes' },
  { value: 'technician', label: 'Technician' },
  { value: 'general', label: 'General' },
  { value: 'extra', label: 'Extra' },
]

export default function BandsPage() {
  const [selectedLicense, setSelectedLicense] = useState<ExamLevel | 'all'>('all')

  // Filter bands based on selected license
  const filteredBands =
    selectedLicense === 'all'
      ? bandPlans
      : bandPlans.filter((band) =>
          band.allocations.some((a) => a.licenseClass.includes(selectedLicense))
        )

  // Get bands accessible to Technicians
  const technicianBands = bandPlans
    .filter((band) => band.allocations.some((a) => a.licenseClass.includes('technician')))
    .map((b) => b.name)

  return (
    <div className="container max-w-4xl py-6 px-4">
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
        <h1 className="text-2xl font-bold">Band Plans</h1>
        <p className="text-muted-foreground">
          Amateur radio frequency allocations by license class
        </p>
      </div>

      {/* License filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {licenseFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedLicense(filter.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              selectedLicense === filter.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-border'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Technician access info */}
      {selectedLicense === 'technician' && (
        <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Info className="size-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Technician HF Privileges
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Technician class operators have limited HF privileges on{' '}
                  {technicianBands.join(', ')}. Full privileges are available on VHF (6m, 2m) and
                  UHF (70cm) bands. The 10m band offers the best HF opportunity for Technicians with
                  CW, data, and SSB access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">License Class Legend</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-blue-500" />
              <span>Technician</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-green-500" />
              <span>General</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-4 rounded bg-purple-500" />
              <span>Extra</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Each higher license class includes privileges of lower classes. General includes
            Technician privileges, Extra includes General and Technician privileges.
          </p>
        </CardContent>
      </Card>

      {/* Band charts */}
      <div className="space-y-6">
        {filteredBands.map((band) => (
          <BandChart
            key={band.name}
            band={band}
            highlightClass={selectedLicense === 'all' ? undefined : selectedLicense}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredBands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bands found for the selected license class.</p>
          <button
            onClick={() => setSelectedLicense('all')}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Show all bands
          </button>
        </div>
      )}
    </div>
  )
}
