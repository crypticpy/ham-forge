'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { ControlCard } from '@/components/features/radio/control-card'
import type { RadioControl } from '@/types/radio'

// Mock data for IC-7300 controls
const ic7300Controls: RadioControl[] = [
  {
    id: 'main-dial',
    name: 'Main Dial (VFO)',
    location: 'front-panel',
    category: 'tuning',
    description:
      'The large main tuning dial controls the VFO (Variable Frequency Oscillator) frequency. Rotating clockwise increases frequency, counter-clockwise decreases. The tuning rate can be adjusted using the MULTI knob or touchscreen settings.',
    examTips:
      'The VFO is used to set the operating frequency. Know that VFO stands for Variable Frequency Oscillator.',
  },
  {
    id: 'multi-knob',
    name: 'MULTI Knob',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Multi-function encoder that changes function based on context. Controls tuning step, RF gain, SQL level, and menu selections. Press to toggle between functions or confirm selections.',
    examTips:
      'Multi-function controls reduce front panel clutter while providing access to many settings.',
  },
  {
    id: 'af-gain',
    name: 'AF Gain (Volume)',
    location: 'front-panel',
    category: 'audio',
    description:
      'Controls the audio frequency gain, which is the volume of the received audio sent to the speaker or headphones. Does not affect transmit audio levels.',
    examTips:
      'AF Gain controls receiver audio volume. RF Gain is different - it controls receiver sensitivity.',
  },
  {
    id: 'rf-gain',
    name: 'RF Gain',
    location: 'front-panel',
    category: 'audio',
    description:
      'Controls the RF (Radio Frequency) gain of the receiver. Reducing RF gain can help reduce noise and prevent overload from strong signals. Typically left at maximum unless dealing with strong signal interference.',
    examTips:
      'Reducing RF gain can help with strong signal overload (intermodulation). This is different from AF gain which controls volume.',
  },
  {
    id: 'mode-button',
    name: 'Mode Selection',
    location: 'touchscreen',
    category: 'mode',
    description:
      'Selects the operating mode: USB (Upper Sideband), LSB (Lower Sideband), CW, CW-R, AM, FM, RTTY, and RTTY-R. Touch to cycle through modes or access the mode menu for all options.',
    examTips:
      'USB is conventionally used above 10 MHz, LSB below 10 MHz. CW mode is for Morse code. FM is used for VHF/UHF simplex and repeaters.',
  },
  {
    id: 'filter-width',
    name: 'Filter Width',
    location: 'touchscreen',
    category: 'filter',
    description:
      'Adjusts the IF (Intermediate Frequency) filter bandwidth. Narrower filters reduce adjacent channel interference but may cut off audio frequencies. Wider filters provide better audio fidelity but less selectivity.',
    examTips:
      'Narrow filters are used for CW and to reduce QRM (interference). Wide filters are better for voice communications when interference is not present.',
  },
  {
    id: 'notch-filter',
    name: 'Notch Filter',
    location: 'touchscreen',
    category: 'filter',
    description:
      'The notch filter removes a narrow slice of frequencies from the received audio. Useful for eliminating heterodyne (beat frequency) interference from carriers on nearby frequencies. Can be manual or automatic.',
    examTips:
      'A notch filter removes a specific interfering signal (like a carrier) while passing desired audio.',
  },
  {
    id: 'nb-nr',
    name: 'NB/NR (Noise Blanker/Reducer)',
    location: 'touchscreen',
    category: 'filter',
    description:
      'NB (Noise Blanker) reduces impulse noise from ignition systems, power lines, etc. NR (Noise Reduction) uses DSP to reduce background noise. Both can be adjusted in intensity.',
    examTips:
      'Noise blanker is effective against impulse noise. DSP noise reduction helps with continuous background noise.',
  },
  {
    id: 'power-output',
    name: 'Power Output Control',
    location: 'menu',
    category: 'power',
    description:
      'Sets the RF output power level. The IC-7300 can output up to 100W on HF bands and up to 50W on 6 meters. Lower power settings are useful for QRP operation and to reduce interference.',
    examTips:
      'Use only enough power to maintain communications. This is both FCC regulation and good operating practice.',
  },
  {
    id: 'mic-gain',
    name: 'MIC Gain',
    location: 'touchscreen',
    category: 'audio',
    description:
      'Controls the microphone input sensitivity. Proper adjustment prevents under-modulation (weak signal) or over-modulation (distorted, splatter). Monitor with ALC meter while adjusting.',
    examTips:
      'Set mic gain so ALC meter shows some deflection but does not pin at maximum. Over-modulation causes splatter into adjacent frequencies.',
  },
  {
    id: 'compression',
    name: 'Speech Compression',
    location: 'menu',
    category: 'audio',
    description:
      'Increases average transmitted power by compressing audio dynamic range. Improves readability in noisy conditions but excessive compression causes distortion. Use sparingly.',
    examTips:
      'Speech compression increases average power and improves readability in difficult conditions, but too much causes distortion.',
  },
  {
    id: 'memory-channels',
    name: 'Memory Channels',
    location: 'touchscreen',
    category: 'memory',
    description:
      'The IC-7300 has 99 regular memory channels plus scan edge channels. Each memory stores frequency, mode, filter settings, and other parameters. Access via the touchscreen memory list.',
    examTips:
      'Memory channels store complete operating parameters, not just frequency. Useful for quickly returning to favorite frequencies.',
  },
  {
    id: 'split-operation',
    name: 'Split Operation',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Enables transmit on a different frequency than receive. Used for working DX stations and during pileups. VFO A is typically receive, VFO B is transmit when split is enabled.',
    examTips:
      'Split operation is common when working DX. The DX station transmits on one frequency and listens on another to spread out calling stations.',
  },
  {
    id: 'spectrum-scope',
    name: 'Spectrum Scope',
    location: 'touchscreen',
    category: 'display',
    description:
      'Real-time FFT spectrum display showing signals across the band. Touch to tune to displayed signals. The waterfall display shows signal history over time. Span and reference level are adjustable.',
    examTips:
      'A spectrum scope displays signals across a range of frequencies simultaneously. The waterfall shows signals over time.',
  },
  {
    id: 'squelch',
    name: 'Squelch Control',
    location: 'front-panel',
    category: 'audio',
    description:
      'Mutes the receiver audio when no signal is present. Adjust so the squelch opens on desired signals but stays closed on noise. Essential for FM operation and monitoring.',
    examTips:
      'Squelch mutes the receiver until a signal exceeds the threshold. Used to eliminate noise between transmissions.',
  },
  {
    id: 'rit-xit',
    name: 'RIT/XIT',
    location: 'front-panel',
    category: 'tuning',
    description:
      'RIT (Receiver Incremental Tuning) shifts receive frequency without changing transmit. XIT (Transmit Incremental Tuning) shifts transmit without changing receive. Useful for fine-tuning SSB contacts.',
    examTips:
      'RIT lets you adjust receive frequency to better copy a station without changing your transmit frequency.',
  },
  {
    id: 'attenuator',
    name: 'Attenuator',
    location: 'touchscreen',
    category: 'filter',
    description:
      'Reduces incoming signal strength by a fixed amount (typically 12-20 dB). Helps prevent receiver overload from very strong signals. Use when S-meter is pinned or audio is distorted.',
    examTips:
      'Use the attenuator when strong signals cause receiver overload or intermodulation. It reduces all signals equally.',
  },
  {
    id: 'preamp',
    name: 'Preamp',
    location: 'touchscreen',
    category: 'filter',
    description:
      'Boosts weak signals by amplifying RF before the first mixer. Two levels available (Preamp 1 and Preamp 2). May increase noise floor on lower HF bands with high ambient noise.',
    examTips:
      'Use the preamp for weak signal reception on quiet bands. On noisy bands, the preamp may make conditions worse by amplifying noise.',
  },
  {
    id: 'agc',
    name: 'AGC (Auto Gain Control)',
    location: 'touchscreen',
    category: 'audio',
    description:
      'Automatically adjusts receiver gain to maintain consistent audio level regardless of signal strength. Settings include FAST (for CW), MID, and SLOW (for SSB voice). Can be turned OFF for weak signal work.',
    examTips:
      'AGC keeps audio level constant despite varying signal strength. Fast AGC is preferred for CW, slow for voice.',
  },
  {
    id: 'vox',
    name: 'VOX (Voice Operated Switch)',
    location: 'menu',
    category: 'misc',
    description:
      'Automatically keys the transmitter when you speak into the microphone. VOX gain controls sensitivity, VOX delay controls how long transmit continues after speech stops. Anti-VOX prevents speaker audio from triggering.',
    examTips:
      'VOX allows hands-free operation. Adjust gain and delay to prevent false triggering and to avoid cutting off words.',
  },
]

const categories: { value: RadioControl['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'tuning', label: 'Tuning' },
  { value: 'audio', label: 'Audio' },
  { value: 'mode', label: 'Mode' },
  { value: 'filter', label: 'Filter' },
  { value: 'power', label: 'Power' },
  { value: 'memory', label: 'Memory' },
  { value: 'display', label: 'Display' },
  { value: 'misc', label: 'Misc' },
]

export default function ControlsPage() {
  const [selectedCategory, setSelectedCategory] = useState<RadioControl['category'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredControls = useMemo(() => {
    return ic7300Controls.filter((control) => {
      const matchesCategory = selectedCategory === 'all' || control.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        control.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        control.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const controlsWithExamTips = filteredControls.filter((c) => c.examTips)

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
        <h1 className="text-2xl font-bold">Controls Reference</h1>
        <p className="text-muted-foreground">IC-7300 front panel, menu, and touchscreen controls</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search controls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              selectedCategory === category.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-border'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredControls.length} control{filteredControls.length !== 1 ? 's' : ''}
        {controlsWithExamTips.length > 0 && (
          <span className="ml-2 text-amber-600 dark:text-amber-400">
            ({controlsWithExamTips.length} with exam tips)
          </span>
        )}
      </p>

      {/* Controls grid */}
      {filteredControls.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredControls.map((control) => (
            <ControlCard key={control.id} control={control} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No controls found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
