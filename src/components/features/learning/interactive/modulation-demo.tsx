'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Radio, Play, Square, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModulationType {
  id: string
  name: string
  fullName: string
  description: string
  characteristics: string[]
  useCases: string[]
  color: string
}

const modulationTypes: ModulationType[] = [
  {
    id: 'cw',
    name: 'CW',
    fullName: 'Continuous Wave (Morse Code)',
    description:
      'The simplest form of modulation. The carrier is turned on and off to create dots and dashes.',
    characteristics: [
      'Pure tone (single frequency)',
      'Narrowest bandwidth (~150 Hz)',
      'Most efficient for weak signal work',
      'Requires Morse code knowledge',
    ],
    useCases: ['DX contacts', 'Weak signal work', 'QRP operations', 'Emergency communications'],
    color: 'bg-amber-500',
  },
  {
    id: 'am',
    name: 'AM',
    fullName: 'Amplitude Modulation',
    description:
      'The audio signal varies the amplitude (strength) of the carrier wave. This is what broadcast AM radio uses.',
    characteristics: [
      'Carrier always present',
      'Wide bandwidth (~6 kHz)',
      'Less efficient than SSB',
      'Easy to receive with simple equipment',
    ],
    useCases: ['Aircraft communications', 'Broadcast radio', 'Some AM nets'],
    color: 'bg-blue-500',
  },
  {
    id: 'ssb',
    name: 'SSB',
    fullName: 'Single Sideband',
    description:
      'A more efficient form of AM. The carrier and one sideband are removed, leaving only the voice signal.',
    characteristics: [
      'No carrier transmitted (power efficient)',
      'Narrow bandwidth (~2.4 kHz)',
      'Half the bandwidth of AM',
      'LSB below 10 MHz, USB above 10 MHz',
    ],
    useCases: ['HF voice contacts', 'DX operations', 'Emergency communications', 'Marine radio'],
    color: 'bg-green-500',
  },
  {
    id: 'fm',
    name: 'FM',
    fullName: 'Frequency Modulation',
    description:
      'The audio signal varies the frequency of the carrier. Used for local VHF/UHF communications.',
    characteristics: [
      'Constant amplitude carrier',
      'Wider bandwidth (~12-16 kHz)',
      'Better noise immunity',
      'Standard for repeaters and local simplex',
    ],
    useCases: [
      'VHF/UHF local communications',
      'Repeater operations',
      'FM broadcast radio',
      'Public service',
    ],
    color: 'bg-purple-500',
  },
]

/**
 * Interactive Modulation Types Demo
 *
 * Features:
 * - Visual waveform representations
 * - Audio demonstrations using Web Audio API
 * - Comparison of different modulation types
 * - Exam-relevant information
 */
export function ModulationDemo() {
  const [selectedMode, setSelectedMode] = useState<ModulationType>(modulationTypes[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const animationRef = useRef<number | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch {
          // Ignore if already stopped
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Generate audio demonstration
  const playDemo = useCallback(() => {
    if (isPlaying) {
      // Stop current playback
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch {
          // Ignore if already stopped
        }
      }
      setIsPlaying(false)
      return
    }

    // Create audio context if needed
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    // Configure based on modulation type
    const now = ctx.currentTime
    const duration = 3 // seconds

    switch (selectedMode.id) {
      case 'cw':
        // Morse code simulation: dit-dah-dit (R)
        oscillator.frequency.value = 600
        oscillator.type = 'sine'
        gainNode.gain.value = 0

        // dit
        gainNode.gain.setValueAtTime(0.3, now)
        gainNode.gain.setValueAtTime(0, now + 0.1)
        // pause
        gainNode.gain.setValueAtTime(0, now + 0.2)
        // dah
        gainNode.gain.setValueAtTime(0.3, now + 0.3)
        gainNode.gain.setValueAtTime(0, now + 0.6)
        // pause
        gainNode.gain.setValueAtTime(0, now + 0.7)
        // dit
        gainNode.gain.setValueAtTime(0.3, now + 0.8)
        gainNode.gain.setValueAtTime(0, now + 0.9)
        // repeat pattern
        gainNode.gain.setValueAtTime(0, now + 1.2)
        gainNode.gain.setValueAtTime(0.3, now + 1.3)
        gainNode.gain.setValueAtTime(0, now + 1.4)
        gainNode.gain.setValueAtTime(0.3, now + 1.6)
        gainNode.gain.setValueAtTime(0, now + 1.9)
        gainNode.gain.setValueAtTime(0.3, now + 2.1)
        gainNode.gain.setValueAtTime(0, now + 2.2)
        break

      case 'am':
        // AM: Carrier with amplitude variations
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        gainNode.gain.value = 0.1

        // Simulate voice amplitude modulation
        for (let t = 0; t < duration; t += 0.1) {
          const mod = 0.15 + 0.15 * Math.sin(t * 5)
          gainNode.gain.setValueAtTime(mod, now + t)
        }
        break

      case 'ssb':
        // SSB: Voice without carrier (frequency variations)
        oscillator.type = 'sine'
        oscillator.frequency.value = 1000
        gainNode.gain.value = 0.25

        // Simulate voice frequency modulation (simplified)
        for (let t = 0; t < duration; t += 0.05) {
          const freq = 800 + 400 * Math.sin(t * 8) + 200 * Math.sin(t * 3)
          oscillator.frequency.setValueAtTime(freq, now + t)
          // Add some amplitude variation too
          const amp = 0.2 + 0.1 * Math.sin(t * 6)
          gainNode.gain.setValueAtTime(amp, now + t)
        }
        break

      case 'fm':
        // FM: Constant amplitude, varying frequency
        oscillator.type = 'sine'
        gainNode.gain.value = 0.25

        // Wide frequency deviation
        for (let t = 0; t < duration; t += 0.02) {
          const freq = 1000 + 300 * Math.sin(t * 10) + 150 * Math.sin(t * 25)
          oscillator.frequency.setValueAtTime(freq, now + t)
        }
        break
    }

    oscillator.start(now)
    oscillator.stop(now + duration)

    setIsPlaying(true)

    oscillator.onended = () => {
      setIsPlaying(false)
    }
  }, [isPlaying, selectedMode])

  // Waveform visualization component
  const WaveformDisplay = ({ mode }: { mode: ModulationType }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height
      const centerY = height / 2

      ctx.clearRect(0, 0, width, height)

      // Draw center line
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(width, centerY)
      ctx.stroke()

      // Draw waveform
      ctx.strokeStyle = mode.color.replace('bg-', '#').replace('-500', '')
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 4 * Math.PI

        let y: number
        switch (mode.id) {
          case 'cw':
            // On-off keying (square wave envelope)
            const cwEnvelope = Math.sin(t) > 0.5 ? 1 : 0
            y = centerY - cwEnvelope * Math.sin(t * 20) * 30
            break

          case 'am':
            // Amplitude modulation
            const amEnvelope = 0.5 + 0.5 * Math.sin(t * 0.5)
            y = centerY - amEnvelope * Math.sin(t * 15) * 35
            break

          case 'ssb':
            // Single sideband (voice-like varying amplitude)
            const ssbEnvelope = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.8))
            const ssbFreq = 12 + 3 * Math.sin(t * 0.5)
            y = centerY - ssbEnvelope * Math.sin(t * ssbFreq) * 35
            break

          case 'fm':
            // Frequency modulation (constant amplitude, varying frequency)
            const fmFreq = 15 + 8 * Math.sin(t * 0.8)
            y = centerY - Math.sin(t * fmFreq) * 35
            break

          default:
            y = centerY
        }

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }, [mode])

    return (
      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        className="w-full h-auto rounded-lg bg-muted/30"
        aria-label={`Waveform visualization for ${mode.name}`}
      />
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Radio className="size-5 text-primary" aria-hidden="true" />
          Modulation Types Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {modulationTypes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                if (isPlaying) playDemo() // Stop current
                setSelectedMode(mode)
              }}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                selectedMode.id === mode.id
                  ? `${mode.color} text-white`
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              )}
            >
              {mode.name}
            </button>
          ))}
        </div>

        {/* Selected Mode Display */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold">{selectedMode.fullName}</h3>
            <p className="text-muted-foreground mt-1">{selectedMode.description}</p>
          </div>

          {/* Waveform Visualization */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Waveform Pattern</h4>
            <WaveformDisplay mode={selectedMode} />
          </div>

          {/* Audio Demo Button */}
          <div className="flex justify-center">
            <Button
              onClick={playDemo}
              size="lg"
              className={cn('min-w-[200px]', isPlaying && 'bg-red-500 hover:bg-red-600')}
            >
              {isPlaying ? (
                <>
                  <Square className="size-4 mr-2" />
                  Stop Demo
                </>
              ) : (
                <>
                  <Play className="size-4 mr-2" />
                  <Volume2 className="size-4 mr-2" />
                  Hear {selectedMode.name}
                </>
              )}
            </Button>
          </div>

          {/* Characteristics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-medium mb-2">Characteristics</h4>
              <ul className="space-y-1 text-sm">
                {selectedMode.characteristics.map((char, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className={cn(
                        'mt-1.5 size-1.5 rounded-full flex-shrink-0',
                        selectedMode.color
                      )}
                    />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-medium mb-2">Common Uses</h4>
              <ul className="space-y-1 text-sm">
                {selectedMode.useCases.map((use, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className={cn(
                        'mt-1.5 size-1.5 rounded-full flex-shrink-0',
                        selectedMode.color
                      )}
                    />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Mode</th>
                  <th className="text-left p-2">Bandwidth</th>
                  <th className="text-left p-2">Efficiency</th>
                  <th className="text-left p-2">Primary Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">CW</td>
                  <td className="p-2">~150 Hz</td>
                  <td className="p-2">Highest</td>
                  <td className="p-2">Weak signals, DX</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">SSB</td>
                  <td className="p-2">~2.4 kHz</td>
                  <td className="p-2">High</td>
                  <td className="p-2">HF voice</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">AM</td>
                  <td className="p-2">~6 kHz</td>
                  <td className="p-2">Lower</td>
                  <td className="p-2">Broadcast, aircraft</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">FM</td>
                  <td className="p-2">~12-16 kHz</td>
                  <td className="p-2">N/A*</td>
                  <td className="p-2">VHF/UHF local</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-2">
              * FM efficiency measured differently (deviation ratio, not power)
            </p>
          </div>
        </div>

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>SSB on HF</strong>: LSB below 10 MHz, USB above 10 MHz
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>FM on VHF/UHF</strong>: Standard for repeaters and simplex
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>CW</strong>: Most efficient, narrowest bandwidth, best for weak signals
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
