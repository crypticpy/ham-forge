# Implementation Plan: Interactive RF Spectrum Visualizer

Created: 2026-01-30
Status: PENDING APPROVAL

## Summary

Build an interactive radio frequency spectrum visualizer showing the full amateur radio spectrum from 160m (1.8 MHz) to 23cm (1300 MHz) with frequency/wavelength conversions, service types, and license class privileges (Technician/General/Extra). Add as a primary navigation element called "Spectrum".

## Scope

### In Scope

1. **Spectrum Data Layer**
   - Complete HF/VHF/UHF amateur band data (160m through 23cm)
   - Frequency to wavelength conversion utilities
   - License class privilege mappings for all bands
   - Service/traffic type categorization (CW, SSB, FM, Digital, Satellite, etc.)

2. **Interactive Visualization Component**
   - Logarithmic-scale spectrum display showing all amateur bands
   - Color-coded segments by license class (Tech/General/Extra)
   - Hover tooltips showing frequency, wavelength, modes, and privileges
   - Click to expand band details
   - Filter by license class to highlight accessible segments
   - Responsive design (mobile/desktop)

3. **Spectrum Page**
   - New page at `/spectrum`
   - Band selector for detailed view
   - Legend explaining colors, modes, and license classes
   - Wavelength/frequency converter tool

4. **Navigation Updates**
   - Add "Spectrum" to all three nav arrays (header.tsx, nav-links.tsx, mobile-nav.tsx)
   - Use `Waves` icon from lucide-react

### Out of Scope

- Real-time propagation data
- Band condition indicators
- Audio/signal visualization
- International band plans (US FCC Part 97 only)

## Prerequisites

- Existing band-plans.ts provides foundation (currently only 10m, 6m, 2m, 70cm)
- Need to expand with HF bands (160m, 80m, 60m, 40m, 30m, 20m, 17m, 15m, 12m) and additional VHF/UHF (1.25m, 33cm, 23cm)

## Parallel Execution Strategy

Work is divided into 3 parallel workstreams that don't conflict:

| Workstream    | Agent   | Files Owned                                                                              | Dependencies                    |
| ------------- | ------- | ---------------------------------------------------------------------------------------- | ------------------------------- |
| Data Layer    | Agent A | `src/data/radio/spectrum-data.ts`, `src/lib/frequency-utils.ts`, `src/types/spectrum.ts` | None                            |
| Visualization | Agent B | `src/components/features/spectrum/*.tsx`                                                 | Data layer (can mock initially) |
| Page & Nav    | Agent C | `src/app/(study)/spectrum/page.tsx`, nav files                                           | Components (sequential after B) |

### File Ownership Matrix

| File                                                     | Agent A | Agent B | Agent C |
| -------------------------------------------------------- | ------- | ------- | ------- |
| src/types/spectrum.ts                                    | ✅      | -       | -       |
| src/data/radio/spectrum-data.ts                          | ✅      | -       | -       |
| src/lib/frequency-utils.ts                               | ✅      | -       | -       |
| src/components/features/spectrum/spectrum-chart.tsx      | -       | ✅      | -       |
| src/components/features/spectrum/band-detail.tsx         | -       | ✅      | -       |
| src/components/features/spectrum/spectrum-legend.tsx     | -       | ✅      | -       |
| src/components/features/spectrum/frequency-converter.tsx | -       | ✅      | -       |
| src/components/features/spectrum/index.ts                | -       | ✅      | -       |
| src/app/(study)/spectrum/page.tsx                        | -       | -       | ✅      |
| src/components/layout/header.tsx                         | -       | -       | ✅      |
| src/components/layout/nav-links.tsx                      | -       | -       | ✅      |
| src/components/layout/mobile-nav.tsx                     | -       | -       | ✅      |

## Implementation Phases

### Phase 1: Data Layer & Types

**Objective**: Create complete amateur radio spectrum data with all bands and license privileges

**Parallel Tasks**:

1. **Task 1A**: Create spectrum types - Owns: `src/types/spectrum.ts`
   - `AmateurBand` interface (name, startFreq, endFreq, wavelength, allocations)
   - `BandAllocation` interface (freqRange, licenseClasses, modes, powerLimit, notes)
   - `LicenseClass` type ('novice' | 'technician' | 'general' | 'advanced' | 'extra')
   - `ServiceType` type (CW, SSB, FM, Digital, Satellite, ATV, etc.)

2. **Task 1B**: Create frequency utilities - Owns: `src/lib/frequency-utils.ts`
   - `freqToWavelength(freqKHz)` - Convert frequency to wavelength in meters
   - `wavelengthToFreq(meters)` - Convert wavelength to frequency
   - `formatFrequency(freqKHz)` - Human-readable format (kHz/MHz/GHz)
   - `formatWavelength(meters)` - Human-readable format (m/cm)
   - `getBandName(freqKHz)` - Get band name from frequency

3. **Task 1C**: Create complete spectrum data - Owns: `src/data/radio/spectrum-data.ts`
   - All 15+ amateur bands with complete FCC allocations
   - HF: 160m, 80m, 60m, 40m, 30m, 20m, 17m, 15m, 12m, 10m
   - VHF: 6m, 2m, 1.25m
   - UHF: 70cm, 33cm, 23cm
   - Each band with detailed privilege breakdowns by license class
   - Mode restrictions and power limits where applicable

**Files to Create**:

- `src/types/spectrum.ts` - Owner: Task 1A
- `src/lib/frequency-utils.ts` - Owner: Task 1B
- `src/data/radio/spectrum-data.ts` - Owner: Task 1C

**Phase Verification**:

- [ ] All band data compiles without TypeScript errors
- [ ] Frequency conversion utilities have unit tests
- [ ] Data covers all US amateur bands

---

### Phase 2: Visualization Components

**Objective**: Build interactive spectrum visualization components

**Parallel Tasks**:

1. **Task 2A**: Main spectrum chart - Owns: `src/components/features/spectrum/spectrum-chart.tsx`
   - Horizontal bar visualization of entire spectrum
   - Logarithmic scale to show HF through UHF proportionally
   - Color-coded segments by license class
   - Hover state shows tooltip with details
   - Click to select band for detailed view
   - License class filter (highlight Tech/General/Extra segments)
   - Responsive: horizontal scroll on mobile

2. **Task 2B**: Band detail panel - Owns: `src/components/features/spectrum/band-detail.tsx`
   - Expanded view of single band
   - Linear frequency scale showing all allocations
   - Mode icons/labels for each segment
   - Privilege indicators (colored bars by license)
   - Notes and calling frequencies
   - Wavelength display

3. **Task 2C**: Legend and converter - Owns: `src/components/features/spectrum/spectrum-legend.tsx`, `src/components/features/spectrum/frequency-converter.tsx`
   - Legend explaining color codes (license classes, modes)
   - Interactive frequency/wavelength converter
   - Input field for frequency, shows wavelength and band
   - Quick reference for common calling frequencies

4. **Task 2D**: Component index - Owns: `src/components/features/spectrum/index.ts`
   - Barrel export for all spectrum components

**Files to Create**:

- `src/components/features/spectrum/spectrum-chart.tsx` - Owner: Task 2A
- `src/components/features/spectrum/band-detail.tsx` - Owner: Task 2B
- `src/components/features/spectrum/spectrum-legend.tsx` - Owner: Task 2C
- `src/components/features/spectrum/frequency-converter.tsx` - Owner: Task 2C
- `src/components/features/spectrum/index.ts` - Owner: Task 2D

**Phase Verification**:

- [ ] Components render without errors
- [ ] Interactive hover/click states work
- [ ] Responsive on mobile viewport
- [ ] Accessible (keyboard navigation, ARIA labels)

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 3: Page & Navigation Integration

**Objective**: Create spectrum page and add to primary navigation

**Sequential Tasks** (depends on Phase 2):

1. **Task 3A**: Create spectrum page - Owns: `src/app/(study)/spectrum/page.tsx`
   - Page header with title and description
   - License class filter selector (All / Technician / General / Extra)
   - Main SpectrumChart component
   - BandDetail panel (shown when band selected)
   - SpectrumLegend component
   - FrequencyConverter tool in sidebar/below
   - Quick facts about spectrum allocation

2. **Task 3B**: Update navigation - Owns: nav files
   - Add to `header.tsx` navLinks array: `{ href: '/spectrum', label: 'Spectrum' }`
   - Add to `nav-links.tsx` navItems array with `Waves` icon
   - Add to `mobile-nav.tsx` navItems array with `Waves` icon

**Files to Create**:

- `src/app/(study)/spectrum/page.tsx` - Owner: Task 3A

**Files to Modify**:

- `src/components/layout/header.tsx` - Add spectrum link - Owner: Task 3B
- `src/components/layout/nav-links.tsx` - Add spectrum link with icon - Owner: Task 3B
- `src/components/layout/mobile-nav.tsx` - Add spectrum link with icon - Owner: Task 3B

**Phase Verification**:

- [ ] Page loads at /spectrum
- [ ] Navigation shows Spectrum link on all screen sizes
- [ ] Active state works when on /spectrum route
- [ ] Page is responsive and accessible

**Phase Review Gate**:

- [ ] Run `final-review-completeness` agent
- [ ] Run `principal-code-reviewer` agent
- [ ] Address all critical/high issues before proceeding

---

### Phase 4: Tests & Polish

**Objective**: Add tests and final polish

**Parallel Tasks**:

1. **Task 4A**: Unit tests - Owns: `src/__tests__/lib/frequency-utils.test.ts`
   - Test frequency/wavelength conversions
   - Test format functions
   - Test band name lookup

2. **Task 4B**: Component tests - Owns: `src/__tests__/components/spectrum-chart.test.tsx`
   - Test rendering with mock data
   - Test hover/click interactions
   - Test filter functionality

**Files to Create**:

- `src/__tests__/lib/frequency-utils.test.ts` - Owner: Task 4A
- `src/__tests__/components/spectrum-chart.test.tsx` - Owner: Task 4B

**Phase Verification**:

- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Page works end-to-end

---

## Final Deliverable Review

**MANDATORY**: After all phases complete, run both review agents on the ENTIRE deliverable:

1. `final-review-completeness` - Full codebase scan for incomplete items
2. `principal-code-reviewer` - Comprehensive quality assessment

## Testing Strategy

### Unit Tests

- `src/__tests__/lib/frequency-utils.test.ts` - Conversion functions

### Integration Tests

- `src/__tests__/components/spectrum-chart.test.tsx` - Component interactions

### Manual Testing

- Verify all bands display correctly
- Test hover tooltips on each segment
- Test license class filtering
- Test on mobile viewport
- Verify accessibility with keyboard navigation

## Rollback Plan

- All new files can be deleted without affecting existing features
- Navigation changes are simple array additions, easily reverted
- No database or storage changes required

## Risks and Mitigations

| Risk                               | Likelihood | Impact | Mitigation                                           |
| ---------------------------------- | ---------- | ------ | ---------------------------------------------------- |
| Band data accuracy                 | Medium     | High   | Cross-reference with ARRL band plans and FCC Part 97 |
| Visualization complexity on mobile | Medium     | Medium | Use horizontal scroll, simplified mobile view        |
| Performance with many segments     | Low        | Low    | Use CSS-based rendering, not canvas                  |
| File conflict between agents       | Med        | High   | Clear file ownership matrix above                    |

## Open Questions

1. Should we include deprecated license classes (Novice, Advanced) for historical context?
   - Recommendation: Include as "legacy" with different visual treatment

2. Should clicking a band navigate to a dedicated band page or show inline detail?
   - Recommendation: Inline detail panel (faster, no page navigation)

3. Should we show band openings/propagation hints?
   - Recommendation: Out of scope for initial version, add as future enhancement

---

**USER: Please review this plan. Edit any section directly, then confirm to proceed.**
