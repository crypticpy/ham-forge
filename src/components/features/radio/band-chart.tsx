'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { BandPlan, FrequencyAllocation } from '@/types/radio'
import type { ExamLevel } from '@/types/question'

interface BandChartProps {
  band: BandPlan
  highlightClass?: ExamLevel
}

const licenseColors = {
  technician: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-100 dark:bg-blue-900/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-700',
  },
  general: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-100 dark:bg-green-900/40',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-700',
  },
  extra: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-100 dark:bg-purple-900/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-300 dark:border-purple-700',
  },
}

function formatFrequency(freqKHz: number): string {
  if (freqKHz >= 1000000) {
    return `${(freqKHz / 1000000).toFixed(3)} GHz`
  } else if (freqKHz >= 1000) {
    return `${(freqKHz / 1000).toFixed(3)} MHz`
  }
  return `${freqKHz} kHz`
}

function getAllocationSegments(band: BandPlan): {
  allocation: FrequencyAllocation
  startPercent: number
  widthPercent: number
}[] {
  const bandWidth = band.endFreq - band.startFreq

  return band.allocations.map((allocation) => {
    const startPercent = ((allocation.startFreq - band.startFreq) / bandWidth) * 100
    const widthPercent = ((allocation.endFreq - allocation.startFreq) / bandWidth) * 100
    return { allocation, startPercent, widthPercent }
  })
}

function getHighestLicenseClass(classes: ('technician' | 'general' | 'extra')[]): ExamLevel {
  if (classes.includes('technician')) return 'technician'
  if (classes.includes('general')) return 'general'
  return 'extra'
}

export function BandChart({ band, highlightClass }: BandChartProps) {
  const segments = getAllocationSegments(band)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{band.name} Band</CardTitle>
        <CardDescription>
          {formatFrequency(band.startFreq)} - {formatFrequency(band.endFreq)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Frequency bar visualization */}
        <div className="relative">
          {/* Background bar */}
          <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
            {segments.map((segment, index) => {
              const highestClass = getHighestLicenseClass(segment.allocation.licenseClass)
              const colors = licenseColors[highestClass]
              const isHighlighted =
                !highlightClass || segment.allocation.licenseClass.includes(highlightClass)

              return (
                <div
                  key={index}
                  className={`absolute h-full transition-opacity ${colors.bg} ${
                    isHighlighted ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{
                    left: `${segment.startPercent}%`,
                    width: `${segment.widthPercent}%`,
                  }}
                  title={`${formatFrequency(segment.allocation.startFreq)} - ${formatFrequency(segment.allocation.endFreq)}: ${segment.allocation.modes.join(', ')}`}
                />
              )
            })}
          </div>

          {/* Frequency labels */}
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>{formatFrequency(band.startFreq)}</span>
            <span>{formatFrequency(band.endFreq)}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-sm">
          {Object.entries(licenseColors).map(([license, colors]) => (
            <div
              key={license}
              className={`flex items-center gap-1.5 ${
                highlightClass && highlightClass !== license ? 'opacity-40' : ''
              }`}
            >
              <div className={`size-3 rounded ${colors.bg}`} />
              <span className="capitalize">{license}</span>
            </div>
          ))}
        </div>

        {/* Allocations table */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Frequency Allocations</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-medium">Frequency</th>
                  <th className="text-left py-2 pr-4 font-medium">Modes</th>
                  <th className="text-left py-2 font-medium">License Classes</th>
                </tr>
              </thead>
              <tbody>
                {band.allocations.map((allocation, index) => {
                  const isHighlighted =
                    !highlightClass || allocation.licenseClass.includes(highlightClass)

                  return (
                    <tr
                      key={index}
                      className={`border-b last:border-0 ${isHighlighted ? '' : 'opacity-40'}`}
                    >
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {formatFrequency(allocation.startFreq)} -{' '}
                        {formatFrequency(allocation.endFreq)}
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {allocation.modes.map((mode) => (
                            <span key={mode} className="px-1.5 py-0.5 text-xs bg-muted rounded">
                              {mode}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex flex-wrap gap-1">
                          {allocation.licenseClass.map((license) => {
                            const colors = licenseColors[license]
                            return (
                              <span
                                key={license}
                                className={`px-1.5 py-0.5 text-xs rounded capitalize ${colors.bgLight} ${colors.text}`}
                              >
                                {license}
                              </span>
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {band.allocations.some((a) => a.notes) && (
            <div className="mt-3 space-y-1">
              {band.allocations
                .filter((a) => a.notes)
                .map((allocation, index) => (
                  <p key={index} className="text-xs text-muted-foreground">
                    * {formatFrequency(allocation.startFreq)} -{' '}
                    {formatFrequency(allocation.endFreq)}: {allocation.notes}
                  </p>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
