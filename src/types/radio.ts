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

// Menu System Types
export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string
  /** Display name of the menu item */
  name: string
  /** Breadcrumb path to this item (e.g., ['SET', 'Display']) */
  path: string[]
  /** Detailed description of what this setting does */
  description: string
  /** Factory default value */
  defaultValue?: string
  /** Recommended value for new ham radio operators */
  recommendedValue?: string
  /** Whether this setting is relevant to ham radio license exams */
  examRelevant?: boolean
  /** Tips related to exam questions */
  examTips?: string
  /** Child menu items */
  children?: MenuItem[]
}

// Mode Guide Types
export interface ModeGuideSection {
  id: string
  title: string
  content: string
}

export interface ModeGuide {
  id: string
  name: string
  fullName: string
  overview: string
  sections: ModeGuideSection[]
  quickSetup: string[]
  commonSettings: { setting: string; value: string; reason: string }[]
  examTips: string[]
  relatedControlIds: string[]
}

// Feature Guide Types
export interface GuideStep {
  step: number
  instruction: string
  tip?: string
}

export interface FeatureGuide {
  id: string
  name: string
  description: string
  icon: string
  sections: {
    id: string
    title: string
    content: string
    steps?: GuideStep[]
  }[]
  quickTips: string[]
  examRelevance: string[]
  relatedControlIds: string[]
}

// Question-Control Mapping Types
export interface QuestionControlMapping {
  questionId: string
  controlIds: string[]
  relevance: 'direct' | 'related'
}
