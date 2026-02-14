'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Sun, Moon, Radio, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LayerInfo {
  name: string
  altitude: string
  description: string
  hopDistance: string
  dayOnly: boolean
}

const layers: Record<string, LayerInfo> = {
  D: {
    name: 'D Region',
    altitude: '30-55 miles',
    description:
      'Present only during daylight. Absorbs signals below 10 MHz. Does not reflect signals.',
    hopDistance: 'N/A (absorption only)',
    dayOnly: true,
  },
  E: {
    name: 'E Region',
    altitude: '55-90 miles',
    description: 'Can provide propagation. Sporadic E can enable unexpected VHF propagation.',
    hopDistance: '~1,200 miles',
    dayOnly: false,
  },
  F1: {
    name: 'F1 Region',
    altitude: '90-150 miles',
    description: 'Present during the day. Merges with F2 at night.',
    hopDistance: '~1,500 miles',
    dayOnly: true,
  },
  F2: {
    name: 'F2 Region',
    altitude: '150-250 miles',
    description: 'Most important for long-distance HF. Highest region = longest skip distance.',
    hopDistance: '~2,500 miles',
    dayOnly: false,
  },
}

const bands = [
  { freq: 1.8, name: '160m', color: '#8B0000' },
  { freq: 3.5, name: '80m', color: '#B22222' },
  { freq: 7, name: '40m', color: '#FF4500' },
  { freq: 14, name: '20m', color: '#FFD700' },
  { freq: 21, name: '15m', color: '#32CD32' },
  { freq: 28, name: '10m', color: '#00BFFF' },
]

/**
 * Interactive Ionosphere Layer Visualizer
 *
 * Features:
 * - Day/night toggle showing D region appearance/disappearance
 * - Frequency slider showing how different bands behave
 * - Animated signal path visualization
 * - Educational layer tooltips
 */
export function IonosphereVisualizer() {
  const [isDay, setIsDay] = useState(true)
  const [frequency, setFrequency] = useState(14) // Default to 20m
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [showSignalPath] = useState(true)

  const currentBand = bands.reduce((prev, curr) =>
    Math.abs(curr.freq - frequency) < Math.abs(prev.freq - frequency) ? curr : prev
  )

  // Determine signal behavior based on frequency and time
  const getSignalBehavior = useCallback(() => {
    if (isDay && frequency < 10) {
      return {
        status: 'absorbed',
        message: 'Signal absorbed by D region during daylight',
        canPropagate: false,
      }
    }
    if (frequency < 5) {
      return {
        status: 'groundwave',
        message: 'Best for nighttime propagation when D region disappears',
        canPropagate: !isDay,
      }
    }
    if (frequency >= 10 && frequency <= 20) {
      return {
        status: 'optimal',
        message: '20m band: Reliable worldwide propagation any time',
        canPropagate: true,
      }
    }
    if (frequency > 20) {
      return {
        status: 'conditional',
        message: 'Higher bands depend on solar activity. Best during solar maximum.',
        canPropagate: true,
      }
    }
    return {
      status: 'normal',
      message: 'Standard F2 layer propagation',
      canPropagate: true,
    }
  }, [isDay, frequency])

  const signalBehavior = getSignalBehavior()

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Radio className="size-5 text-primary" aria-hidden="true" />
          Ionosphere & HF Propagation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Day/Night Toggle */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isDay ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsDay(true)}
            className="min-w-[100px]"
          >
            <Sun className="size-4 mr-2" aria-hidden="true" />
            Daytime
          </Button>
          <Button
            variant={!isDay ? 'default' : 'outline'}
            size="sm"
            onClick={() => setIsDay(false)}
            className="min-w-[100px]"
          >
            <Moon className="size-4 mr-2" aria-hidden="true" />
            Nighttime
          </Button>
        </div>

        {/* Visualization */}
        <div
          className={cn(
            'relative rounded-xl overflow-hidden transition-colors duration-500',
            isDay
              ? 'bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700'
              : 'bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-800'
          )}
          role="img"
          aria-label={`Ionosphere visualization showing ${isDay ? 'daytime' : 'nighttime'} conditions`}
        >
          <svg viewBox="0 0 400 300" className="w-full h-auto">
            {/* Stars (night only) */}
            {!isDay && (
              <g className="animate-pulse">
                {[...Array(20)].map((_, i) => (
                  <circle
                    key={i}
                    cx={20 + ((i * 19) % 360)}
                    cy={10 + ((i * 7) % 60)}
                    r={0.5 + (i % 3) * 0.3}
                    fill="white"
                    opacity={0.5 + (i % 5) * 0.1}
                  />
                ))}
              </g>
            )}

            {/* Sun/Moon */}
            {isDay ? (
              <circle cx="350" cy="30" r="20" fill="#FFD700" className="drop-shadow-lg" />
            ) : (
              <circle cx="350" cy="30" r="15" fill="#E8E8E8" className="drop-shadow-lg" />
            )}

            {/* F2 Region */}
            <g
              onClick={() => setSelectedLayer(selectedLayer === 'F2' ? null : 'F2')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="20"
                width="400"
                height="50"
                className={cn(
                  'transition-all duration-300',
                  selectedLayer === 'F2' ? 'fill-purple-500/50' : 'fill-purple-500/30'
                )}
              />
              <text x="10" y="50" className="text-xs font-semibold fill-white">
                F2 (150-250 mi)
              </text>
            </g>

            {/* F1 Region (day only) */}
            {isDay && (
              <g
                onClick={() => setSelectedLayer(selectedLayer === 'F1' ? null : 'F1')}
                className="cursor-pointer"
              >
                <rect
                  x="0"
                  y="70"
                  width="400"
                  height="40"
                  className={cn(
                    'transition-all duration-300',
                    selectedLayer === 'F1' ? 'fill-violet-500/50' : 'fill-violet-500/30'
                  )}
                />
                <text x="10" y="95" className="text-xs font-semibold fill-white">
                  F1 (90-150 mi)
                </text>
              </g>
            )}

            {/* E Region */}
            <g
              onClick={() => setSelectedLayer(selectedLayer === 'E' ? null : 'E')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y={isDay ? 110 : 70}
                width="400"
                height="40"
                className={cn(
                  'transition-all duration-300',
                  selectedLayer === 'E' ? 'fill-blue-500/50' : 'fill-blue-500/30'
                )}
              />
              <text x="10" y={isDay ? 135 : 95} className="text-xs font-semibold fill-white">
                E (55-90 mi)
              </text>
            </g>

            {/* D Region (day only) */}
            {isDay && (
              <g
                onClick={() => setSelectedLayer(selectedLayer === 'D' ? null : 'D')}
                className="cursor-pointer"
              >
                <rect
                  x="0"
                  y="150"
                  width="400"
                  height="40"
                  className={cn(
                    'transition-all duration-300',
                    selectedLayer === 'D' ? 'fill-red-500/50' : 'fill-red-500/30'
                  )}
                />
                <text x="10" y="175" className="text-xs font-semibold fill-white">
                  D (30-55 mi) - Absorbs &lt;10 MHz
                </text>
              </g>
            )}

            {/* Ground */}
            <rect
              x="0"
              y="250"
              width="400"
              height="50"
              className="fill-green-700 dark:fill-green-900"
            />
            <text x="10" y="275" className="text-xs fill-white/80">
              Earth&apos;s Surface
            </text>

            {/* Transmitter */}
            <g>
              <rect x="40" y="235" width="20" height="15" className="fill-slate-600" />
              <line
                x1="50"
                y1="220"
                x2="50"
                y2="235"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-600"
              />
              <line
                x1="40"
                y1="225"
                x2="60"
                y2="225"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-600"
              />
              <text x="50" y="265" textAnchor="middle" className="text-xs fill-white">
                TX
              </text>
            </g>

            {/* Receiver */}
            <g>
              <rect x="340" y="235" width="20" height="15" className="fill-slate-600" />
              <line
                x1="350"
                y1="220"
                x2="350"
                y2="235"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-600"
              />
              <line
                x1="340"
                y1="225"
                x2="360"
                y2="225"
                stroke="currentColor"
                strokeWidth="2"
                className="text-slate-600"
              />
              <text x="350" y="265" textAnchor="middle" className="text-xs fill-white">
                RX
              </text>
            </g>

            {/* Signal Path */}
            {showSignalPath && signalBehavior.canPropagate && (
              <g>
                <path
                  d={
                    isDay && frequency < 10
                      ? 'M 50 220 Q 100 180 150 190' // Absorbed path
                      : 'M 50 220 Q 200 20 350 220' // Normal skip path
                  }
                  fill="none"
                  stroke={currentBand.color}
                  strokeWidth="3"
                  strokeDasharray={isDay && frequency < 10 ? '5,5' : 'none'}
                  className={cn(
                    'transition-all duration-500',
                    isDay && frequency < 10 ? 'opacity-30' : 'opacity-80'
                  )}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-20"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
                {/* Arrow head */}
                {!(isDay && frequency < 10) && (
                  <polygon
                    points="345,215 350,220 355,215"
                    fill={currentBand.color}
                    className="opacity-80"
                  />
                )}
              </g>
            )}

            {/* Absorbed signal indicator */}
            {isDay && frequency < 10 && (
              <g>
                <text x="150" y="175" className="text-xs fill-red-400 font-semibold">
                  ABSORBED
                </text>
                <text x="150" y="188" className="text-[10px] fill-red-300">
                  by D region
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Frequency Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Frequency</Label>
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold"
              style={{ backgroundColor: currentBand.color + '30', color: currentBand.color }}
            >
              {frequency.toFixed(1)} MHz ({currentBand.name})
            </span>
          </div>
          <Slider
            value={[frequency]}
            onValueChange={(value: number[]) => setFrequency(value[0])}
            min={1.8}
            max={30}
            step={0.1}
            className="w-full"
            aria-label="Frequency selector"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1.8 MHz (160m)</span>
            <span>30 MHz (10m)</span>
          </div>
        </div>

        {/* Band buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {bands.map((band) => (
            <Button
              key={band.name}
              variant="outline"
              size="sm"
              onClick={() => setFrequency(band.freq)}
              className={cn(
                'min-w-[60px] transition-all',
                Math.abs(frequency - band.freq) < 1 && 'ring-2 ring-offset-2'
              )}
              style={{
                borderColor: band.color,
                color: Math.abs(frequency - band.freq) < 1 ? band.color : undefined,
                backgroundColor:
                  Math.abs(frequency - band.freq) < 1 ? band.color + '20' : undefined,
              }}
            >
              {band.name}
            </Button>
          ))}
        </div>

        {/* Status Message */}
        <div
          className={cn(
            'p-4 rounded-lg border',
            signalBehavior.status === 'absorbed'
              ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
              : signalBehavior.status === 'optimal'
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
          )}
        >
          <div className="flex items-start gap-3">
            <Info
              className={cn(
                'size-5 mt-0.5',
                signalBehavior.status === 'absorbed'
                  ? 'text-red-600 dark:text-red-400'
                  : signalBehavior.status === 'optimal'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-blue-600 dark:text-blue-400'
              )}
            />
            <div>
              <div
                className={cn(
                  'font-semibold text-sm',
                  signalBehavior.status === 'absorbed'
                    ? 'text-red-900 dark:text-red-100'
                    : signalBehavior.status === 'optimal'
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-blue-900 dark:text-blue-100'
                )}
              >
                {currentBand.name} Band - {isDay ? 'Daytime' : 'Nighttime'}
              </div>
              <p
                className={cn(
                  'text-sm mt-1',
                  signalBehavior.status === 'absorbed'
                    ? 'text-red-800 dark:text-red-200'
                    : signalBehavior.status === 'optimal'
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-blue-800 dark:text-blue-200'
                )}
              >
                {signalBehavior.message}
              </p>
            </div>
          </div>
        </div>

        {/* Layer Info Panel */}
        {selectedLayer && (
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">{layers[selectedLayer].name}</h4>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Altitude:</dt>
                <dd>{layers[selectedLayer].altitude}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Hop Distance:</dt>
                <dd>{layers[selectedLayer].hopDistance}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-muted-foreground">Availability:</dt>
                <dd>{layers[selectedLayer].dayOnly ? 'Daytime only' : '24 hours'}</dd>
              </div>
              <p className="text-muted-foreground mt-2">{layers[selectedLayer].description}</p>
            </dl>
          </div>
        )}

        {/* Key Facts */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Key Exam Facts</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>D region absorbs signals below 10 MHz during daytime</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>F2 region is highest = longest skip distance (~2,500 miles)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>20m band works at any point in the solar cycle</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Lower bands (80m, 160m) are better at night when D region disappears</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
