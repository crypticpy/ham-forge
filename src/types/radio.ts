/**
 * Radio/Transceiver Types
 * Type definitions for ham radio transceivers, controls, and band plans
 */

export type BandName =
  | '160m'
  | '80m'
  | '60m'
  | '40m'
  | '30m'
  | '20m'
  | '17m'
  | '15m'
  | '12m'
  | '10m'
  | '6m'
  | '2m'
  | '70cm'

export interface FrequencyAllocation {
  startFreq: number // in kHz
  endFreq: number // in kHz
  licenseClass: ('technician' | 'general' | 'extra')[]
  modes: string[] // 'CW', 'SSB', 'Digital', 'FM', etc.
  notes?: string
}

export interface BandPlan {
  name: BandName
  startFreq: number // in kHz
  endFreq: number // in kHz
  allocations: FrequencyAllocation[]
}

export interface RadioControl {
  id: string
  name: string
  location: 'front-panel' | 'menu' | 'touchscreen'
  category: 'tuning' | 'audio' | 'mode' | 'filter' | 'power' | 'memory' | 'display' | 'misc'
  description: string
  examTips?: string // Tips for exam questions related to this control
  relatedQuestionIds?: string[]
}

export interface RadioMode {
  id: string
  name: string
  fullName: string
  description: string
  typicalUse: string
  bandwidth?: string
}
