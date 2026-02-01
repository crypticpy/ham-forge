/**
 * Interactive Learning Components
 *
 * Educational components for the Ham Radio License Study App.
 * Each component is designed to be:
 * - Fully accessible (keyboard navigation, screen reader support)
 * - Responsive across all device sizes
 * - Radio-specific and educational
 * - Visually engaging with thoughtful animations
 *
 * NOTE: These exports are maintained for backwards compatibility and type references.
 * For optimal performance, pages should use next/dynamic to load these components
 * on-demand rather than importing from this barrel file.
 *
 * @example Dynamic import (recommended):
 * ```typescript
 * import dynamic from 'next/dynamic'
 * const OhmsLawCalculator = dynamic(
 *   () => import('@/components/features/learning/interactive/ohms-law-calculator')
 *     .then(m => m.OhmsLawCalculator),
 *   { loading: () => <Loader />, ssr: false }
 * )
 * ```
 */

// Phase 1 Components
export { OhmsLawCalculator } from './ohms-law-calculator'
export { IonosphereVisualizer } from './ionosphere-visualizer'
export { PhoneticTrainer } from './phonetic-trainer'
export { BandPlanExplorer } from './band-plan-explorer'

// Phase 2 Components
export { DecibelCalculator } from './decibel-calculator'
export { FrequencyWavelengthConverter } from './frequency-wavelength-converter'
export { QCodeReference } from './q-code-reference'
export { PowerCalculator } from './power-calculator'

// Phase 4 Components
export { ModulationDemo } from './modulation-demo'
export { CircuitIdentifier } from './circuit-identifier'
export { RSTTrainer } from './rst-trainer'
export { QSOTrainer } from './qso-trainer'
